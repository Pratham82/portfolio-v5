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

/** One club's next match and latest results (FotMob). */
export interface ITeamFixtures {
  id: number;
  name: string;
  crestUrl: string;
  next?: IFixture;
  /** Latest finished matches, newest first. */
  recent: IFixture[];
}

/** A diary entry from Letterboxd. */
export interface IFilm {
  title: string;
  year?: number;
  /** 0.5–5 stars; absent when I didn't rate it. */
  rating?: number;
  watchedDate?: string;
  rewatch: boolean;
  posterUrl?: string;
  url: string;
}

/** Everything the Now page renders; each live widget is `null` when unavailable. */
export interface INowData {
  topItems: ITopItems | null;
  coding: ICodingStats | null;
  football: ITeamFixtures[] | null;
  films: IFilm[] | null;
}
