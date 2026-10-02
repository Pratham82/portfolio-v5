import { CodeIcon } from "@phosphor-icons/react";

import { ICodingStats } from "@/interface/now.interface";
import { formatDay, formatDuration } from "@/src/utils/formatIst";

import Widget from "./Widget";

const CodingStats = ({ coding }: { coding: ICodingStats }) => {
  const busiest = Math.max(...coding.days.map((day) => day.seconds), 1);

  return (
    <Widget
      id="coding"
      title="Coding this week"
      icon={<CodeIcon />}
      source={{ label: "WakaTime", url: "https://wakatime.com" }}
    >
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 rounded-xl border bg-card/40 px-4 py-3">
        <div>
          <p className="text-2xl font-semibold tracking-tight">
            {formatDuration(coding.totalSeconds)}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            last 7 days · {formatDuration(coding.dailyAverageSeconds)}/day avg
          </p>
        </div>
        {/* One bar per day, scaled to the busiest day. */}
        <div className="flex h-12 items-end gap-1.5" aria-hidden>
          {coding.days.map((day) => (
            <div
              key={day.date}
              title={`${formatDay(day.date)}: ${formatDuration(day.seconds)}`}
              className="w-3 rounded-sm bg-foreground/70"
              style={{
                height: `${Math.max((day.seconds / busiest) * 100, 4)}%`,
              }}
            />
          ))}
        </div>
      </div>

      {coding.languages.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2.5">
          {coding.languages.map((language) => (
            <li key={language.name} className="flex items-center gap-3">
              <span className="w-24 shrink-0 truncate text-sm text-foreground">
                {language.name}
              </span>
              <div
                role="progressbar"
                aria-label={`${language.name} share of coding time`}
                aria-valuenow={language.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                className="h-1 flex-1 overflow-hidden rounded-full bg-muted"
              >
                <div
                  className="h-full rounded-full bg-foreground/70"
                  style={{ width: `${language.percent}%` }}
                />
              </div>
              <span className="w-28 shrink-0 whitespace-nowrap text-right font-mono text-xs text-muted-foreground">
                {formatDuration(language.seconds)} · {language.percent}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </Widget>
  );
};

export default CodingStats;
