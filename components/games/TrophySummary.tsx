import { TrophyIcon } from "@phosphor-icons/react";

import { ITrophySummary } from "@/interface/games.interface";

const GRADES = ["platinum", "gold", "silver", "bronze"] as const;

const TrophySummary = ({ summary }: { summary: ITrophySummary }) => (
  <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border bg-card/40 px-4 py-3">
    <div className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-lg border bg-card">
        <TrophyIcon aria-hidden weight="duotone" className="size-5" />
      </span>
      <div>
        <p className="font-mono text-xs text-muted-foreground">Trophy level</p>
        <p className="text-lg font-semibold leading-tight">{summary.level}</p>
      </div>
    </div>
    <div
      role="progressbar"
      aria-label="Progress to next trophy level"
      aria-valuenow={summary.progress}
      aria-valuemin={0}
      aria-valuemax={100}
      className="hidden h-1 w-24 overflow-hidden rounded-full bg-muted sm:block"
    >
      <div
        className="h-full rounded-full bg-foreground/70"
        style={{ width: `${summary.progress}%` }}
      />
    </div>
    <dl className="flex gap-5">
      {GRADES.map((grade) => (
        <div key={grade}>
          <dt className="font-mono text-xs capitalize text-muted-foreground">
            {grade}
          </dt>
          <dd className="font-mono text-sm font-medium">
            {summary.earned[grade]}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

export default TrophySummary;
