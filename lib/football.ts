import type { IFixture, ITeamFixtures } from "@/interface/now.interface";

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

type FotmobTeam = {
  fixtures: {
    allFixtures: { fixtures: FotmobFixture[]; nextMatch?: FotmobFixture };
  };
};

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
  const { fixtures } = (await res.json()) as FotmobTeam;
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
