import { createHmac, randomUUID } from "node:crypto";

import type { IFavouriteFilm, IFilm } from "@/interface/now.interface";
import { toIstDate } from "@/src/utils/formatIst";

const LETTERBOXD_USER = "Pratham82";
const FEED_URL = `https://letterboxd.com/${LETTERBOXD_USER}/rss/`;

/** My Letterboxd member ID (from the public `GET /search?input=pratham82`). */
const MEMBER_ID = "1dGNl";
const API_BASE = "https://api.letterboxd.com/api/v0/";

// ── Official API ────────────────────────────────────────────────────────
// Access is by request (letterboxd.com/api-beta). Without a key the top 4
// is hidden and Recently watched falls back to the public RSS feed.

type LbImage = { sizes: { width: number; height: number; url: string }[] };
type LbLink = { type: string; url: string };
type LbFilmSummary = {
  name: string;
  releaseYear?: number;
  poster?: LbImage;
  links?: LbLink[];
};
type LbLogEntry = {
  film: LbFilmSummary;
  whenCreated: string;
  rating?: number;
  diaryDetails?: { diaryDate: string; rewatch: boolean };
  links?: LbLink[];
};

/**
 * A signed GET: `apikey`, `nonce` and `timestamp` go in the query, and the
 * `Authorization: Signature` header is the hex HMAC-SHA256 of
 * `GET\0<url>\0` (empty body), keyed with the API secret.
 */
const letterboxdApi = async <T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T | null> => {
  const key = process.env.LETTERBOXD_API_KEY;
  const secret = process.env.LETTERBOXD_API_SECRET;
  if (!key || !secret) return null;

  const url = new URL(path, API_BASE);
  for (const [name, value] of Object.entries(params)) {
    url.searchParams.set(name, value);
  }
  url.searchParams.set("apikey", key);
  url.searchParams.set("nonce", randomUUID());
  url.searchParams.set("timestamp", String(Math.floor(Date.now() / 1000)));
  const signature = createHmac("sha256", secret)
    .update(`GET\0${url.toString()}\0`)
    .digest("hex");

  // The nonce makes every URL unique, so the fetch cache can't help; the
  // Now page's ISR (1h) limits how often this runs.
  const res = await fetch(url, {
    headers: { Authorization: `Signature ${signature}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`${path} (${res.status})`);
  return (await res.json()) as T;
};

/** The poster size closest to (at least) 300px wide. */
const posterUrl = (poster?: LbImage) => {
  const sizes = [...(poster?.sizes ?? [])].sort((a, b) => a.width - b.width);
  return (sizes.find((size) => size.width >= 300) ?? sizes.at(-1))?.url;
};

const letterboxdUrl = (links?: LbLink[]) =>
  links?.find((link) => link.type === "letterboxd")?.url;

/** My four favourite films, in profile order. `null` without an API key. */
export const getFavouriteFilms = async (): Promise<IFavouriteFilm[] | null> => {
  try {
    const member = await letterboxdApi<{ favoriteFilms?: LbFilmSummary[] }>(
      `member/${MEMBER_ID}`,
    );
    if (!member?.favoriteFilms?.length) return null;

    return member.favoriteFilms.map((film) => ({
      title: film.name,
      year: film.releaseYear,
      posterUrl: posterUrl(film.poster),
      url:
        letterboxdUrl(film.links) ??
        `https://letterboxd.com/${LETTERBOXD_USER}/`,
    }));
  } catch (error) {
    console.error("letterboxd:", error);
    return null;
  }
};

/** Diary entries from the API; `null` without an API key. */
const getRecentFilmsFromApi = async (): Promise<IFilm[] | null> => {
  const page = await letterboxdApi<{ items: LbLogEntry[] }>("log-entries", {
    member: MEMBER_ID,
    memberRelationship: "Owner",
    perPage: "20",
  });
  if (!page) return null;

  return (
    page.items
      // Reviews without a watch date aren't diary entries.
      .filter((entry) => entry.diaryDetails)
      .map((entry) => ({
        title: entry.film.name,
        year: entry.film.releaseYear,
        rating: entry.rating || undefined,
        addedAt: entry.whenCreated,
        watchedDate: entry.diaryDetails?.diaryDate,
        rewatch: entry.diaryDetails?.rewatch ?? false,
        posterUrl: posterUrl(entry.film.poster),
        url:
          letterboxdUrl(entry.links) ??
          letterboxdUrl(entry.film.links) ??
          `https://letterboxd.com/${LETTERBOXD_USER}/`,
      }))
  );
};

// ── Public RSS feed (fallback) ──────────────────────────────────────────

/** Text of the first `<tag>` in `xml`, with CDATA and entities undone. */
const field = (xml: string, tag: string) => {
  const match = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`).exec(xml);
  if (!match) return undefined;
  return match[1]
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .trim();
};

/** Diary entries from the public RSS feed. List posts are skipped. */
const getRecentFilmsFromRss = async (): Promise<IFilm[]> => {
  const res = await fetch(FEED_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (pratham82.in)" },
  });
  if (!res.ok) throw new Error(`feed (${res.status})`);
  const xml = await res.text();

  const films: IFilm[] = [];
  for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const title = field(item, "letterboxd:filmTitle");
    // Lists and other non-diary posts have no film title.
    if (!title) continue;

    const pubDate = field(item, "pubDate");
    const addedAt = pubDate ? new Date(pubDate) : null;
    if (!addedAt || Number.isNaN(addedAt.getTime())) continue;

    const year = field(item, "letterboxd:filmYear");
    const rating = field(item, "letterboxd:memberRating");
    films.push({
      title,
      year: year ? Number(year) : undefined,
      rating: rating ? Number(rating) : undefined,
      addedAt: addedAt.toISOString(),
      watchedDate: field(item, "letterboxd:watchedDate"),
      rewatch: field(item, "letterboxd:rewatch") === "Yes",
      posterUrl: /<img src="([^"]+)"/.exec(
        field(item, "description") ?? "",
      )?.[1],
      url: field(item, "link") ?? `https://letterboxd.com/${LETTERBOXD_USER}/`,
    });
  }

  return films;
};

/**
 * My latest diary entries, most recently watched first: from the API when a
 * key is set, otherwise from the RSS feed. Returns `null` (and logs) on
 * failure.
 */
export const getRecentFilms = async (limit = 8): Promise<IFilm[] | null> => {
  try {
    const films =
      (await getRecentFilmsFromApi().catch((error) => {
        console.error("letterboxd api, using RSS:", error);
        return null;
      })) ?? (await getRecentFilmsFromRss());

    // Both sources list films by when I logged them; show them by when I
    // watched them instead. Same day: the one logged later first.
    const watchedOn = (film: IFilm) =>
      film.watchedDate ?? toIstDate(film.addedAt);
    return films
      .sort(
        (a, b) =>
          watchedOn(b).localeCompare(watchedOn(a)) ||
          b.addedAt.localeCompare(a.addedAt),
      )
      .slice(0, limit);
  } catch (error) {
    console.error("letterboxd:", error);
    return null;
  }
};
