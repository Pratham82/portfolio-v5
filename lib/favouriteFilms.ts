import type { IFavouriteFilm } from "@/interface/now.interface";
import { nowFavouriteFilms } from "@/src/graphql/queries";

import { sanityQuery } from "./sanity/client";

const TMDB_API = "https://api.themoviedb.org/3/";
const TMDB_POSTER = "https://image.tmdb.org/t/p/w342";
/** Posters rarely change; look each film up at most once a day. */
const TMDB_REVALIDATE = 86_400;

type SanityFavouriteFilm = {
  title: string | null;
  year: number | null;
  letterboxdUrl: string | null;
};

/**
 * Accepts either TMDB credential from themoviedb.org/settings/api: the v4
 * "API Read Access Token" (a JWT, sent as a Bearer token) or the v3 "API Key"
 * (sent as `api_key`).
 */
const tmdbFetch = async <T>(path: string, params: Record<string, string>) => {
  const key = process.env.TMDB_API_KEY;
  if (!key) return null;

  const isReadToken = key.startsWith("eyJ");
  const url = new URL(path, TMDB_API);
  for (const [name, value] of Object.entries(params)) {
    url.searchParams.set(name, value);
  }
  if (!isReadToken) url.searchParams.set("api_key", key);

  const res = await fetch(url, {
    headers: isReadToken ? { Authorization: `Bearer ${key}` } : undefined,
    next: { revalidate: TMDB_REVALIDATE },
  });
  if (!res.ok) throw new Error(`tmdb ${path} (${res.status})`);
  return (await res.json()) as T;
};

type TmdbSearch = { results: { poster_path: string | null }[] };

/** The TMDB poster for a title, matched on release year when there is one. */
const findPoster = async (title: string, year?: number) => {
  const search = (params: Record<string, string>) =>
    tmdbFetch<TmdbSearch>("search/movie", { query: title, ...params });

  let found = await search(year ? { primary_release_year: String(year) } : {});
  // A year that's off by one (festival vs. release) shouldn't lose the poster.
  if (year && !found?.results.length) found = await search({});
  const path = found?.results.find((r) => r.poster_path)?.poster_path;
  return path ? `${TMDB_POSTER}${path}` : undefined;
};

/**
 * My Letterboxd top 4, picked in Sanity (Now → Favourite films), with posters
 * from TMDB. Letterboxd's API isn't open to personal projects and its profile
 * page blocks servers, so this is the source. A film still shows (without a
 * poster) if TMDB is unset or fails. `null` when none are picked.
 */
export const getFavouriteFilms = async (): Promise<IFavouriteFilm[] | null> => {
  try {
    const { allNowPage } = await sanityQuery<{
      allNowPage: { favouriteFilms: SanityFavouriteFilm[] | null }[];
    }>(nowFavouriteFilms);
    const films = (allNowPage[0]?.favouriteFilms ?? []).filter(
      (film): film is SanityFavouriteFilm & { title: string } => !!film.title,
    );
    if (!films.length) return null;

    return await Promise.all(
      films.slice(0, 4).map(async (film) => ({
        title: film.title,
        year: film.year ?? undefined,
        posterUrl: await findPoster(film.title, film.year ?? undefined).catch(
          (error) => {
            console.error("tmdb:", error);
            return undefined;
          },
        ),
        url:
          film.letterboxdUrl ??
          `https://letterboxd.com/search/${encodeURIComponent(film.title)}/`,
      })),
    );
  } catch (error) {
    console.error("favourite films:", error);
    return null;
  }
};
