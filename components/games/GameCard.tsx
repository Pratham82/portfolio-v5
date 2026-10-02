import Image from "next/image";

import { ClockIcon, TrophyIcon } from "@phosphor-icons/react";

import UsesLink from "@/components/uses/UsesLink";
import { GamePlatform } from "@/interface/games.interface";

import PlatformBadge from "./PlatformBadge";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Read in UTC, so the server and browser render the same text.
const formatDate = (iso: string) => {
  const date = new Date(iso);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
};

/** 0 → "<1m", 0.63 → "38m", 2.39 → "2.4h", 150.11 → "150h" */
const formatHours = (hours: number) => {
  const minutes = Math.round(hours * 60);
  if (minutes < 1) return "<1m";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 10) return `${Math.round(hours * 10) / 10}h`;
  return `${Math.round(hours)}h`;
};

type GameCardProps = {
  name: string;
  imageUrl?: string;
  platform?: GamePlatform;
  /** Total playtime; `null` marks an owned game I haven't played. */
  hours?: number | null;
  lastPlayed?: string;
  /** Trophy progress, 0–100. */
  progress?: number;
  psPlus?: boolean;
  note?: string;
  url?: string;
};

const GameCard = ({
  name,
  imageUrl,
  platform,
  hours,
  lastPlayed,
  progress,
  psPlus,
  note,
  url,
}: GameCardProps) => (
  <UsesLink url={url} label={name} className="group block h-full p-3">
    <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(min-width: 640px) 200px, 45vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center text-3xl opacity-40 grayscale"
        >
          🎮
        </span>
      )}

      {platform && (
        <PlatformBadge platform={platform} className="absolute left-2 top-2" />
      )}
      {psPlus && (
        <span className="absolute right-2 top-2 rounded-[3px] bg-black/70 px-1.5 py-0.5 font-mono text-[10px] font-medium text-white backdrop-blur-sm">
          PS Plus
        </span>
      )}

      {progress !== undefined && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/75 to-transparent"
          />
          <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 font-mono text-[11px] font-medium text-white">
            <TrophyIcon aria-hidden weight="fill" className="size-3" />
            {progress}%
          </span>
          <div
            role="progressbar"
            aria-label={`${name} trophy progress`}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="absolute inset-x-0 bottom-0 h-1 bg-white/20"
          >
            <div
              className="h-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>

    <p
      title={name}
      className="mt-2.5 line-clamp-2 text-sm font-medium text-foreground"
    >
      {name}
    </p>

    {hours !== undefined && (
      <p className="mt-0.5 flex items-center gap-x-1.5 font-mono text-xs text-muted-foreground">
        {hours === null ? (
          "Not played yet"
        ) : (
          <>
            <span className="flex items-center gap-1">
              <ClockIcon aria-hidden className="size-3" />
              {formatHours(hours)}
            </span>
            {lastPlayed && (
              <>
                <span aria-hidden>·</span>
                <time dateTime={lastPlayed}>{formatDate(lastPlayed)}</time>
              </>
            )}
          </>
        )}
      </p>
    )}
    {note && <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>}
  </UsesLink>
);

export default GameCard;
