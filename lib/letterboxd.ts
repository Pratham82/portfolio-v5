import type { IFilm } from "@/interface/now.interface";

const LETTERBOXD_USER = "Pratham82";
const FEED_URL = `https://letterboxd.com/${LETTERBOXD_USER}/rss/`;

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

/**
 * My latest Letterboxd diary entries from the public RSS feed. List posts in
 * the feed are skipped. Returns `null` (and logs) on failure.
 */
export const getRecentFilms = async (limit = 8): Promise<IFilm[] | null> => {
  try {
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

      const year = field(item, "letterboxd:filmYear");
      const rating = field(item, "letterboxd:memberRating");
      films.push({
        title,
        year: year ? Number(year) : undefined,
        rating: rating ? Number(rating) : undefined,
        watchedDate: field(item, "letterboxd:watchedDate"),
        rewatch: field(item, "letterboxd:rewatch") === "Yes",
        posterUrl: /<img src="([^"]+)"/.exec(
          field(item, "description") ?? "",
        )?.[1],
        url:
          field(item, "link") ?? `https://letterboxd.com/${LETTERBOXD_USER}/`,
      });
      if (films.length === limit) break;
    }

    return films;
  } catch (error) {
    console.error("letterboxd:", error);
    return null;
  }
};
