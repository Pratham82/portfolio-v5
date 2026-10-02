import { motion } from "motion/react";
import { SiSpotify } from "react-icons/si";

import type { NowPlayingSuccessResponse } from "@/interface/spotify.interface";
import { cn } from "@/lib/utils";

type NowPlayingPillProps = {
  track: NowPlayingSuccessResponse | null;
  className?: string;
};

const EqualizerBars = () => (
  <span className="flex h-3 items-end gap-0.5" aria-hidden>
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-0.5 rounded-full bg-foreground"
        animate={{ height: [4, 10, 4] }}
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

/** What I'm listening to on Spotify (or last listened to), as a small link. */
const NowPlayingPill = ({ track, className }: NowPlayingPillProps) => {
  // Nothing playing and nothing cached: the API returns no track details.
  if (!track?.title) return null;

  return (
    <motion.a
      data-volatile
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      title={`${track.isPlaying ? "Now playing" : "Last played"}: ${track.title} — ${track.artist}`}
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-card/40 px-2 py-0.5 align-middle font-mono text-[10px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:text-xs",
        className,
      )}
    >
      {/* Always shown, so it's clear where the track comes from. */}
      <SiSpotify className="shrink-0 text-foreground/85" size={12} />
      {!track.isPlaying && <span className="shrink-0">Last played</span>}
      <span className="min-w-0 max-w-[14rem] truncate text-foreground/85">
        {track.title} — {track.artist}
      </span>
      {track.isPlaying && <EqualizerBars />}
    </motion.a>
  );
};

export default NowPlayingPill;
