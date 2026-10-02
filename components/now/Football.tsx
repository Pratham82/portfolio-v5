import Image from "next/image";

import { SoccerBallIcon } from "@phosphor-icons/react";

import { IFixture, ITeamFixtures } from "@/interface/now.interface";
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

const RESULT_STYLES: Record<Result, string> = {
  W: "bg-foreground text-background",
  D: "bg-muted text-foreground",
  L: "border text-muted-foreground",
};

const opponentOf = (fixture: IFixture, teamId: number) =>
  fixture.home.id === teamId
    ? `vs ${fixture.away.name}`
    : `at ${fixture.home.name}`;

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
                  "grid size-5 shrink-0 place-items-center rounded font-mono text-[10px] font-semibold",
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
