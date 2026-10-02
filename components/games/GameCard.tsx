import Image from "next/image";

import UsesLink from "@/components/uses/UsesLink";

type GameCardProps = {
  name: string;
  imageUrl?: string;
  /** Short mono line under the name, e.g. `PS5 · 150h`. */
  meta?: string;
  note?: string;
  /** Trophy progress, 0–100; draws a thin bar under the cover. */
  progress?: number;
  url?: string;
};

const GameCard = ({
  name,
  imageUrl,
  meta,
  note,
  progress,
  url,
}: GameCardProps) => (
  <UsesLink url={url} label={name} className="group block h-full p-3">
    <div className="relative aspect-square overflow-hidden rounded-md border bg-muted">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(min-width: 640px) 160px, 45vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center text-3xl opacity-40 grayscale"
        >
          🎮
        </span>
      )}
    </div>
    {progress !== undefined && (
      <div
        role="progressbar"
        aria-label={`${name} trophy progress`}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2 h-1 overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-foreground/70"
          style={{ width: `${progress}%` }}
        />
      </div>
    )}
    <p className="mt-2 line-clamp-2 text-sm font-medium text-foreground">
      {name}
    </p>
    {meta && <p className="font-mono text-xs text-muted-foreground">{meta}</p>}
    {note && <p className="text-xs text-muted-foreground">{note}</p>}
  </UsesLink>
);

export default GameCard;
