import {
  type AuthorizationPayload,
  exchangeAccessCodeForAuthTokens,
  exchangeNpssoForAccessCode,
  getPurchasedGames,
  getUserPlayedGames,
  getUserTitles,
  getUserTrophiesForSpecificTitle,
  getUserTrophyProfileSummary,
  type TrophyTitle,
} from "psn-api";

import type {
  GamePlatform,
  IGamesData,
  ILibraryGame,
  ITrophyCounts,
  ITrophyTitle,
} from "@/interface/games.interface";

const PSN_NPSSO = process.env.PSN_NPSSO;

/** How many recently played games the Recent tab shows. */
const RECENT_COUNT = 6;
/** PSN rejects more than 5 title IDs per trophy lookup. */
const TITLE_ID_BATCH = 5;
const PAGE_SIZE = 200;
/** Refresh the access token this long before PSN says it expires. */
const TOKEN_EXPIRY_MARGIN_MS = 5 * 60 * 1000;

// Access tokens last an hour. Reuse one for as long as this server instance
// lives; the NPSSO itself can be exchanged again until it expires (~2 months).
let cachedAuth: { payload: AuthorizationPayload; expiresAt: number } | null =
  null;

const getAuth = async (npsso: string): Promise<AuthorizationPayload> => {
  if (cachedAuth && Date.now() < cachedAuth.expiresAt) {
    return cachedAuth.payload;
  }

  const accessCode = await exchangeNpssoForAccessCode(npsso);
  const { accessToken, expiresIn } =
    await exchangeAccessCodeForAuthTokens(accessCode);
  cachedAuth = {
    payload: { accessToken },
    expiresAt: Date.now() + expiresIn * 1000 - TOKEN_EXPIRY_MARGIN_MS,
  };

  return cachedAuth.payload;
};

/** "PT150H6M42S" → 150.1 */
const durationToHours = (duration: string): number => {
  const match = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(duration);
  if (!match) return 0;
  const [, h = "0", m = "0", s = "0"] = match;
  return Math.round((+h + +m / 60 + +s / 3600) * 10) / 10;
};

/** `ps5_native_game` → PS5, `ps4_game` → PS4, `pspc_game` → PC. */
const categoryToPlatform = (category: string): GamePlatform => {
  if (category.startsWith("ps5")) return "PS5";
  if (category.startsWith("pspc")) return "PC";
  return "PS4";
};

/** Folds "EA SPORTS FC™ 27" and "EA SPORTS FC 27" into one key. */
const nameKey = (name: string) =>
  name
    .toLowerCase()
    .replace(/[™®©]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Newest first; games I haven't played sort last. */
const byLastPlayed = (a: ILibraryGame, b: ILibraryGame) =>
  (b.lastPlayed ?? "").localeCompare(a.lastPlayed ?? "");

const toCounts = (counts: ITrophyCounts): ITrophyCounts => ({
  platinum: counts.platinum,
  gold: counts.gold,
  silver: counts.silver,
  bronze: counts.bronze,
});

const toTrophyTitle = (title: TrophyTitle): ITrophyTitle => ({
  id: title.npCommunicationId,
  name: title.trophyTitleName.replace(/\s+Trophies$/i, ""),
  iconUrl: title.trophyTitleIconUrl,
  platform: title.trophyTitlePlatform,
  progress: title.progress,
  earned: toCounts(title.earnedTrophies),
  defined: toCounts(title.definedTrophies),
  lastUpdated: title.lastUpdatedDateTime,
});

const getAllPlayedGames = async (auth: AuthorizationPayload) => {
  const games = [];
  let offset: number | null = 0;
  while (offset !== null) {
    const page = await getUserPlayedGames(auth, "me", {
      limit: PAGE_SIZE,
      offset,
    });
    games.push(...page.titles);
    offset = page.nextOffset || null;
  }
  // The list also holds media apps (Netflix, Spotify, ...).
  return games.filter((game) => game.category.endsWith("_game"));
};

const getAllTrophyTitles = async (auth: AuthorizationPayload) => {
  const titles: TrophyTitle[] = [];
  let offset: number | undefined = 0;
  while (offset !== undefined) {
    const page = await getUserTitles(auth, "me", { limit: PAGE_SIZE, offset });
    titles.push(...page.trophyTitles);
    offset = page.nextOffset;
  }
  return titles;
};

/**
 * Maps each title ID to its trophy set. Names differ between the two APIs
 * ("Alan Wake 2" vs "Alan Wake II"), so this asks PSN instead of guessing.
 */
const getTrophyProgressByTitleId = async (
  auth: AuthorizationPayload,
  titleIds: string[],
) => {
  const batches: string[] = [];
  for (let i = 0; i < titleIds.length; i += TITLE_ID_BATCH) {
    batches.push(titleIds.slice(i, i + TITLE_ID_BATCH).join(","));
  }

  const responses = await Promise.allSettled(
    batches.map((npTitleIds) =>
      getUserTrophiesForSpecificTitle(auth, "me", { npTitleIds }),
    ),
  );

  const progress = new Map<string, number>();
  for (const response of responses) {
    if (response.status !== "fulfilled") continue;
    for (const { npTitleId, trophyTitles } of response.value.titles) {
      if (trophyTitles[0]) progress.set(npTitleId, trophyTitles[0].progress);
    }
  }
  return progress;
};

/** Owned games, minus pre-orders and expired PS Plus claims. */
const getOwnedGames = async (auth: AuthorizationPayload) => {
  const { data } = await getPurchasedGames(auth, { size: 500, start: 0 });
  return data.purchasedTitlesRetrieve.games.filter(
    (game) => game.isActive && !game.isPreOrder,
  );
};

/**
 * Loads my PlayStation profile on the server. Returns `null` (and logs) when
 * `PSN_NPSSO` is unset or expired, or PSN fails, so pages still render.
 */
export const getGamesData = async (): Promise<IGamesData | null> => {
  if (!PSN_NPSSO) {
    console.warn("psn: PSN_NPSSO is not set; skipping PlayStation data");
    return null;
  }

  try {
    const auth = await getAuth(PSN_NPSSO);
    const [summary, played, trophyTitles, owned] = await Promise.all([
      getUserTrophyProfileSummary(auth, "me"),
      getAllPlayedGames(auth),
      getAllTrophyTitles(auth),
      // The library still works from played games if this one fails.
      getOwnedGames(auth).catch((error) => {
        console.error("psn: purchased games:", error);
        return [];
      }),
    ]);
    const progressByTitleId = await getTrophyProgressByTitleId(
      auth,
      played.map((game) => game.titleId),
    );

    // A game played on both PS4 and PS5 shows up twice; merge them into one.
    const playedByName = new Map<string, ILibraryGame>();
    for (const game of played) {
      const entry: ILibraryGame = {
        titleId: game.titleId,
        name: game.name.replace(/\s*\(PlayStation®\s*\d\)$/, ""),
        imageUrl: game.imageUrl,
        platform: categoryToPlatform(game.category),
        hours: durationToHours(game.playDuration),
        lastPlayed: game.lastPlayedDateTime,
        trophyProgress: progressByTitleId.get(game.titleId),
      };
      const key = nameKey(entry.name);
      const existing = playedByName.get(key);
      if (!existing) {
        playedByName.set(key, entry);
        continue;
      }
      const latest = byLastPlayed(existing, entry) <= 0 ? existing : entry;
      playedByName.set(key, {
        ...latest,
        hours:
          Math.round(((existing.hours ?? 0) + (entry.hours ?? 0)) * 10) / 10,
        trophyProgress:
          existing.trophyProgress === undefined
            ? entry.trophyProgress
            : Math.max(existing.trophyProgress, entry.trophyProgress ?? 0),
      });
    }
    const playedGames = [...playedByName.values()];

    // A played game's concept lists every edition's title ID, which catches
    // owned copies sold under another name ("Days Gone: Remastered").
    const playedTitleIds = new Set(
      played.flatMap((game) => [
        game.titleId,
        ...(game.concept?.titleIds ?? []),
      ]),
    );
    // Owned games appear once per platform version; keep one per name.
    const seen = new Set(playedByName.keys());
    const unplayedGames: ILibraryGame[] = [];
    for (const game of owned) {
      const key = nameKey(game.name);
      if (playedTitleIds.has(game.titleId) || seen.has(key)) continue;
      seen.add(key);
      unplayedGames.push({
        titleId: game.titleId,
        name: game.name,
        imageUrl: game.image.url,
        platform: game.platform === "PS5" ? "PS5" : "PS4",
        psPlus: game.membership === "PS_PLUS",
      });
    }

    return {
      summary: {
        level: Number(summary.trophyLevel),
        progress: summary.progress,
        tier: summary.tier,
        earned: toCounts(summary.earnedTrophies),
      },
      recent: [...playedGames].sort(byLastPlayed).slice(0, RECENT_COUNT),
      library: [
        ...[...playedGames].sort((a, b) => (b.hours ?? 0) - (a.hours ?? 0)),
        ...unplayedGames.sort((a, b) => a.name.localeCompare(b.name)),
      ],
      trophies: trophyTitles
        .map(toTrophyTitle)
        .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated)),
    };
  } catch (error) {
    cachedAuth = null;
    console.error("psn:", error);
    return null;
  }
};
