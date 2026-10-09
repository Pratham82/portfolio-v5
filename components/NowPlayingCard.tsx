import Image from "next/image";

import { motion } from "motion/react";
import { SiSpotify } from "react-icons/si";

import type { NowPlayingSuccessResponse } from "@/interface/spotify.interface";
import { cn } from "@/lib/utils";

type NowPlayingCardProps = {
  track: NowPlayingSuccessResponse | null;
  className?: string;
};

const EqualizerBars = () => (
  <span className="flex h-3 items-end gap-0.5" aria-hidden>
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-0.5 rounded-full bg-foreground"
        animate={{ height: [4, 12, 4] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeInOut",
        }}
      />
    ))}
  </span>
);

/** What I'm listening to on Spotify (or last listened to), as a small card. */
const NowPlayingCard = ({ track, className }: NowPlayingCardProps) => {
  // Nothing playing and nothing cached: the API returns no track details.
  if (!track?.title) return null;

  return (
    <motion.a
      data-volatile
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex w-full h-20 max-w-sm items-center gap-3 rounded-sm border border-border bg-card/40 p-3 text-card-foreground transition-colors hover:bg-accent",
        className,
      )}
    >
      {track.albumImageUrl && (
        <Image
          src={track.albumImageUrl}
          alt={`${track.album} album cover`}
          width={52}
          height={52}
          className="size-14 shrink-0 rounded-xs object-cover"
        />
      )}

      <div className="min-w-0 flex-1">
        <p className="mb-0.5 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <SiSpotify className="shrink-0" size={11} />
          {track.isPlaying ? "Now playing" : "Last played"}
        </p>
        <p className="truncate text-sm font-medium leading-tight">
          {track.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {track.artist} • {track.album}
        </p>
      </div>

      {track.isPlaying ? (
        <EqualizerBars />
      ) : (
        <span className="size-3 shrink-0 rounded-xs bg-muted-foreground" />
      )}
    </motion.a>
  );
};

export default NowPlayingCard;
