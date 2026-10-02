export type GamePlatform = "PS5" | "PS4" | "PS3" | "Vita" | "PC";

export interface ITrophyCounts {
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
}

/** Overall PSN trophy profile (`getUserTrophyProfileSummary`). */
export interface ITrophySummary {
  level: number;
  /** Percent towards the next level. */
  progress: number;
  /** 1–10: Bronze (1–3), Silver (4–6), Gold (7–9), Platinum (10). */
  tier: number;
  earned: ITrophyCounts;
}

/** A trophy set and how far through it I am. */
export interface ITrophyTitle {
  id: string;
  name: string;
  iconUrl: string;
  platform: string;
  /** Percent of the set earned, 0–100. */
  progress: number;
  earned: ITrophyCounts;
  defined: ITrophyCounts;
  lastUpdated: string;
}

/** A game in the library: played, owned, or both. */
export interface ILibraryGame {
  titleId: string;
  name: string;
  imageUrl: string;
  platform: GamePlatform;
  /** Total playtime in hours; absent for games I own but haven't played. */
  hours?: number;
  lastPlayed?: string;
  /** Trophy progress for this exact title, when it has a trophy set. */
  trophyProgress?: number;
  /** Claimed through PS Plus rather than bought. */
  psPlus?: boolean;
}

export interface IGamesData {
  summary: ITrophySummary;
  /** Most recently played games, newest first. */
  recent: ILibraryGame[];
  /** Played games (by playtime), then owned-but-unplayed (by name). */
  library: ILibraryGame[];
  /** Trophy sets, most recently updated first. */
  trophies: ITrophyTitle[];
}

/** Hand-picked favourites from `src/data/games.json`. */
export interface IFavouriteGame {
  name: string;
  platform?: GamePlatform;
  note?: string;
  /** Path under `public/` or an `image.api.playstation.com` URL. */
  image?: string;
  /** Store page or homepage; the card links out when set. */
  url?: string;
}
