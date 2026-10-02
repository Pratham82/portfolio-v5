import type {
  IFixture,
  IStanding,
  ITeamFixtures,
} from "@/interface/now.interface";

/** FotMob team IDs (from the team page URL, fotmob.com/teams/<id>/...). */
const TEAMS = [
  { id: 8456, name: "Man City" },
  { id: 8633, name: "Real Madrid" },
];
const RECENT_COUNT = 3;
const FOTMOB = "https://www.fotmob.com";

type FotmobFixture = {
  id: number;
  pageUrl: string;
  home: { id: number; name: string; score?: number };
  away: { id: number; name: string; score?: number };
  tournament?: { name?: string };
  status: {
    utcTime: string;
    finished?: boolean;
    cancelled?: boolean;
  };
};

type FotmobTableRow = {
  id: number;
  idx: number;
  played: number;
  pts: number;
  goalConDiff: number;
};

type FotmobTable = {
  data: {
    leagueName: string;
    pageUrl: string;
    legend?: { tKey?: string; title: string; indices: number[] }[];
    table?: { all?: FotmobTableRow[] };
  };
};

type FotmobTeam = {
  fixtures: {
    allFixtures: { fixtures: FotmobFixture[]; nextMatch?: FotmobFixture };
  };
  table?: FotmobTable[];
};

/** FotMob's zone keys, shortened; unknown zones fall back to FotMob's title. */
const ZONE_LABELS: Record<string, string> = {
  championsleague: "UCL spot",
  europaleague: "UEL spot",
  europa_conference_league: "UECL spot",
  q1of8finals: "Round of 16 spot",
  q1of16finals: "Playoff spot",
  relegation: "Relegation zone",
};

const toStandings = (tables: FotmobTable[], teamId: number): IStanding[] =>
  tables.flatMap(({ data }) => {
    const rows = data.table?.all ?? [];
    const row = rows.find((r) => r.id === teamId);
    if (!row) return [];
    // Legend indices are 0-based positions; idx is 1-based.
    const zone = data.legend?.find((z) => z.indices.includes(row.idx - 1));
    return [
      {
        competition: data.leagueName,
        position: row.idx,
        teamCount: rows.length,
        played: row.played,
        points: row.pts,
        goalDiff: row.goalConDiff,
        zone: zone ? (ZONE_LABELS[zone.tKey ?? ""] ?? zone.title) : undefined,
        url: `${FOTMOB}${data.pageUrl}`,
      },
    ];
  });

const toFixture = (fixture: FotmobFixture, withScore: boolean): IFixture => ({
  id: fixture.id,
  home: {
    id: fixture.home.id,
    name: fixture.home.name,
    score: withScore ? fixture.home.score : undefined,
  },
  away: {
    id: fixture.away.id,
    name: fixture.away.name,
    score: withScore ? fixture.away.score : undefined,
  },
  utcTime: fixture.status.utcTime,
  competition: fixture.tournament?.name ?? "",
  url: `${FOTMOB}${fixture.pageUrl}`,
});

export const crestUrl = (teamId: number) =>
  `https://images.fotmob.com/image_resources/logo/teamlogo/${teamId}.png`;

const getTeam = async ({
  id,
  name,
}: (typeof TEAMS)[number]): Promise<ITeamFixtures> => {
  // FotMob's own site API: unofficial, no key. The response is ~700 KB,
  // under Next's 2 MB fetch-cache limit.
  const res = await fetch(`${FOTMOB}/api/data/teams?id=${id}`, {
    headers: { "User-Agent": "Mozilla/5.0 (pratham82.in)" },
  });
  if (!res.ok) throw new Error(`team ${id} (${res.status})`);
  const { fixtures, table = [] } = (await res.json()) as FotmobTeam;
  const { fixtures: all, nextMatch } = fixtures.allFixtures;

  const recent = all
    .filter((fixture) => fixture.status.finished && !fixture.status.cancelled)
    .sort((a, b) => b.status.utcTime.localeCompare(a.status.utcTime))
    .slice(0, RECENT_COUNT)
    .map((fixture) => toFixture(fixture, true));

  return {
    id,
    name,
    crestUrl: crestUrl(id),
    next: nextMatch ? toFixture(nextMatch, false) : undefined,
    recent,
    standings: toStandings(table, id),
  };
};

/**
 * Next match and latest results for my clubs, from FotMob. A club that fails
 * is left out; returns `null` (and logs) when none load.
 */
export const getFootball = async (): Promise<ITeamFixtures[] | null> => {
  const results = await Promise.allSettled(TEAMS.map(getTeam));
  const teams = results.flatMap((result) => {
    if (result.status === "fulfilled") return [result.value];
    console.error("football:", result.reason);
    return [];
  });
  return teams.length ? teams : null;
};
