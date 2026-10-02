/** Spotify top artists and tracks, roughly the last 4 weeks. */
export interface ITopItems {
  artists: { id: string; name: string; imageUrl?: string; url: string }[];
  tracks: {
    id: string;
    name: string;
    artist: string;
    imageUrl?: string;
    url: string;
  }[];
}

/** WakaTime totals for the last 7 days. */
export interface ICodingStats {
  totalSeconds: number;
  dailyAverageSeconds: number;
  /** One entry per day, oldest first. */
  days: { date: string; seconds: number }[];
  /** Top languages by share of coding time, 0–100. */
  languages: { name: string; percent: number; seconds: number }[];
}

export interface IFixture {
  id: number;
  home: { id: number; name: string; score?: number };
  away: { id: number; name: string; score?: number };
  utcTime: string;
  competition: string;
  url: string;
}

/** Where a club sits in one competition's table. */
export interface IStanding {
  competition: string;
  position: number;
  teamCount: number;
  played: number;
  points: number;
  goalDiff: number;
  /** Short label for the table zone, e.g. "UCL spot" or "Relegation zone". */
  zone?: string;
  url: string;
}

/** One club's next match, latest results and table positions (FotMob). */
export interface ITeamFixtures {
  id: number;
  name: string;
  crestUrl: string;
  next?: IFixture;
  /** Latest finished matches, newest first. */
  recent: IFixture[];
  /** League first, then Champions League (and any other table it's in). */
  standings: IStanding[];
}

/** A diary entry from Letterboxd. */
export interface IFilm {
  title: string;
  year?: number;
  /** 0.5–5 stars; absent when I didn't rate it. */
  rating?: number;
  /** When I logged it on Letterboxd (RSS pubDate), ISO 8601. */
  addedAt: string;
  /** YYYY-MM-DD, as entered on Letterboxd. */
  watchedDate?: string;
  rewatch: boolean;
  posterUrl?: string;
  url: string;
}

/** One of my Letterboxd top 4 (picked in Sanity, poster from TMDB). */
export type IFavouriteFilm = Pick<
  IFilm,
  "title" | "year" | "posterUrl" | "url"
>;

/** Everything the Now page renders; each live widget is `null` when unavailable. */
export interface INowData {
  topItems: ITopItems | null;
  coding: ICodingStats | null;
  football: ITeamFixtures[] | null;
  films: IFilm[] | null;
  favouriteFilms: IFavouriteFilm[] | null;
}
