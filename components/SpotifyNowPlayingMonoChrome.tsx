import { motion } from "framer-motion";
import Image from "next/image";

type SpotifyNowPlayingCardProps = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
};

const SpotifyNowPlayingCard = (props: SpotifyNowPlayingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-lg px-4 py-3 max-w-sm mx-auto shadow-md h-20 flex items-center my-4"
    >
      {/* Album Art */}
      <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0 mr-3">
        <Image
          src={props?.albumImageUrl}
          alt={`${props?.album} album cover`}
          width={52}
          height={52}
          className="rounded-md shadow"
        />
      </motion.div>

      {/* Track Details */}
      <div className="flex-1 min-w-0 mr-3">
        <motion.p
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="text-xs font-medium mb-0.5 truncate text-neutral-500 dark:text-neutral-400"
        >
          {props?.isPlaying ? "Now Playing" : "Last Played"}
        </motion.p>
        <motion.h3
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-semibold text-sm leading-tight mb-0.5 truncate"
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
          className="text-xs truncate text-neutral-600 dark:text-neutral-400"
        >
          {props?.artist} • {props?.album}
        </motion.p>
      </div>

      {props?.isPlaying ? (
        <div className="flex items-end space-x-0.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-neutral-800 dark:bg-neutral-100 rounded-full"
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
            <div className="w-4 h-4 bg-white rounded-sm" />
            {/* <div className="w-1.5 h-4 bg-white rounded-sm" /> */}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SpotifyNowPlayingCard;
