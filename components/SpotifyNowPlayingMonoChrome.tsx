import Image from "next/image";

import { motion } from "motion/react";

type SpotifyNowPlayingCardProps = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
};

const SpotifyNowPlayingCard = (props: SpotifyNowPlayingCardProps) => {
  if (!props?.isPlaying && !props?.title) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-4 flex h-20 max-w-sm items-center justify-center rounded-xl border bg-card/40 px-4 py-3"
      >
        <div className="flex items-center space-x-2 text-muted-foreground">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-sm font-medium">Not playing</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="my-4 flex h-20 max-w-sm items-center rounded-xl border bg-card/40 px-4 py-3 text-card-foreground"
    >
      {/* Album Art */}
      <motion.div whileHover={{ scale: 1.05 }} className="shrink-0 mr-3">
        <Image
          src={props?.albumImageUrl}
          alt={`${props?.album} album cover`}
          width={52}
          height={52}
          className="rounded-md"
        />
      </motion.div>

      {/* Track Details */}
      <div className="flex-1 min-w-0 mr-3">
        <motion.p
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="mb-0.5 truncate font-mono text-xs text-muted-foreground"
        >
          {props?.isPlaying ? "Now Playing" : "Last Played"}
        </motion.p>
        <motion.h3
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-0.5 truncate text-sm font-medium leading-tight"
        >
          <a
            href={props?.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-all duration-200"
          >
            {props?.title}
          </a>
        </motion.h3>

        <motion.p
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="truncate text-xs text-muted-foreground"
        >
          {props?.artist} • {props?.album}
        </motion.p>
      </div>

      {props?.isPlaying ? (
        <div className="flex items-end space-x-0.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 rounded-full bg-foreground"
              animate={{
                height: [6, 12, 6],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center w-5 h-5"
        >
          {/* White paused button icon */}
          <div className="flex space-x-1">
            <div className="size-3 rounded-xs bg-muted-foreground" />
            {/* <div className="w-1.5 h-4 bg-white rounded-xs" /> */}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SpotifyNowPlayingCard;
