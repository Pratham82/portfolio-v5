import Image from "next/image";

import { SoccerBallIcon } from "@phosphor-icons/react";

import { IFixture, IStanding, ITeamFixtures } from "@/interface/now.interface";
import { cn } from "@/lib/utils";
import { formatIst } from "@/src/utils/formatIst";

import Widget from "./Widget";

type Result = "W" | "D" | "L";

const resultFor = (fixture: IFixture, teamId: number): Result => {
  const isHome = fixture.home.id === teamId;
  const ours = (isHome ? fixture.home.score : fixture.away.score) ?? 0;
  const theirs = (isHome ? fixture.away.score : fixture.home.score) ?? 0;
  if (ours > theirs) return "W";
  return ours === theirs ? "D" : "L";
};

// Tinted chips with the letter inside, so the result reads without color too.
const RESULT_STYLES: Record<Result, string> = {
  W: "bg-win/15 text-win",
  D: "bg-muted text-muted-foreground",
  L: "bg-loss/15 text-loss",
};

const opponentOf = (fixture: IFixture, teamId: number) =>
  fixture.home.id === teamId
    ? `vs ${fixture.away.name}`
    : `at ${fixture.home.name}`;

/** 1 → "1st", 2 → "2nd", 11 → "11th", 22 → "22nd" */
const ordinal = (n: number) => {
  const teen = n % 100 >= 11 && n % 100 <= 13;
  const suffix = teen ? "th" : (["th", "st", "nd", "rd"][n % 10] ?? "th");
  return `${n}${suffix}`;
};

const SubHeading = ({ children }: { children: string }) => (
  <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
    {children}
  </p>
);

/**
 * Tints a standings row by how high the club sits in the table, relative to
 * its size (so 8th of 36 counts as near the top): green, yellow, amber, red.
 */
const rankStyle = ({ position, teamCount }: IStanding) => {
  const share = teamCount > 1 ? (position - 1) / (teamCount - 1) : 0;
  if (share <= 0.2) return "bg-win/10 [--rank:var(--win)]";
  if (share <= 0.5) return "bg-rank-mid/10 [--rank:var(--rank-mid)]";
  if (share <= 0.8) return "bg-rank-low/10 [--rank:var(--rank-low)]";
  return "bg-loss/10 [--rank:var(--loss)]";
};

const StandingRow = ({ standing }: { standing: IStanding }) => (
  <li>
    <a
      href={standing.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-3 rounded-lg px-2.5 py-1.5 hover:underline",
        rankStyle(standing),
      )}
    >
      <span className="w-9 shrink-0 font-mono text-base font-semibold text-(--rank)">
        {ordinal(standing.position)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm text-foreground">
          {standing.competition}
        </span>
        <span className="block truncate font-mono text-[11px] text-muted-foreground">
          of {standing.teamCount}
          {standing.zone && ` · ${standing.zone}`}
        </span>
      </span>
      <span className="shrink-0 text-right font-mono text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">{standing.points}</span>{" "}
        pts · {standing.played}P
      </span>
    </a>
  </li>
);

const TeamCard = ({ team }: { team: ITeamFixtures }) => (
  <div className="rounded-xl border bg-card/40 p-4">
    <div className="mb-3 flex items-center gap-2.5">
      <Image
        src={team.crestUrl}
        alt=""
        width={28}
        height={28}
        className="size-7 object-contain"
      />
      <h3 className="font-medium text-foreground">{team.name}</h3>
    </div>

    {team.next && (
      <a
        href={team.next.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 block rounded-lg bg-muted/60 px-3 py-2 transition-colors hover:bg-accent"
      >
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Next · {team.next.competition}
        </p>
        <p className="text-sm font-medium text-foreground">
          {opponentOf(team.next, team.id)}
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          {formatIst(team.next.utcTime)} IST
        </p>
      </a>
    )}

    <SubHeading>Recent</SubHeading>
    <ul className="flex flex-col gap-1.5">
      {team.recent.map((fixture) => {
        const result = resultFor(fixture, team.id);
        return (
          <li key={fixture.id}>
            <a
              href={fixture.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:underline"
            >
              <span
                aria-label={{ W: "Win", D: "Draw", L: "Loss" }[result]}
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-md font-mono text-xs font-bold",
                  RESULT_STYLES[result],
                )}
              >
                {result}
              </span>
              <span className="min-w-0 flex-1 truncate text-foreground">
                {fixture.home.name} {fixture.home.score}–{fixture.away.score}{" "}
                {fixture.away.name}
              </span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {formatIst(fixture.utcTime, false)}
              </span>
            </a>
          </li>
        );
      })}
    </ul>

    {team.standings.length > 0 && (
      <div className="mt-4">
        <SubHeading>Standings</SubHeading>
        <ul className="flex flex-col gap-1.5">
          {team.standings.map((standing) => (
            <StandingRow key={standing.competition} standing={standing} />
          ))}
        </ul>
      </div>
    )}
  </div>
);

const Football = ({ teams }: { teams: ITeamFixtures[] }) => (
  <Widget
    id="football"
    title="Football"
    icon={<SoccerBallIcon />}
    source={{ label: "FotMob", url: "https://www.fotmob.com" }}
  >
    <div className="grid gap-3 sm:grid-cols-2">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  </Widget>
);

export default Football;
