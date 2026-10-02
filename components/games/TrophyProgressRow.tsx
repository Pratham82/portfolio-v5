import Image from "next/image";

import { ITrophyCounts, ITrophyTitle } from "@/interface/games.interface";

const total = (counts: ITrophyCounts) =>
  counts.platinum + counts.gold + counts.silver + counts.bronze;

const TrophyProgressRow = ({ title }: { title: ITrophyTitle }) => (
  <div className="flex items-center gap-3 p-3">
    <span className="relative size-11 shrink-0 overflow-hidden rounded-md border bg-muted">
      <Image
        src={title.iconUrl}
        alt=""
        fill
        sizes="44px"
        className="object-cover"
      />
    </span>
    <div className="min-w-0 flex-1">
      <div className="flex items-baseline justify-between gap-2">
        <p className="truncate text-sm font-medium text-foreground">
          {title.name}
        </p>
        <p className="shrink-0 font-mono text-xs text-muted-foreground">
          {total(title.earned)}/{total(title.defined)}
        </p>
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <div
          role="progressbar"
          aria-label={`${title.name} trophy progress`}
          aria-valuenow={title.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1 flex-1 overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-foreground/70"
            style={{ width: `${title.progress}%` }}
          />
        </div>
        <span className="w-20 shrink-0 text-right font-mono text-xs text-muted-foreground">
          {title.platform.split(",")[0]} · {title.progress}%
        </span>
      </div>
    </div>
  </div>
);

export default TrophyProgressRow;
