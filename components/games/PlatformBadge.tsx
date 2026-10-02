import { GamePlatform } from "@/interface/games.interface";
import { cn } from "@/lib/utils";

const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";

/**
 * Box-art colors: PS5 cases have a white header with a black wordmark, PS4
 * cases a PlayStation-blue one with a white wordmark. Brand colors, so they
 * stay the same in both themes.
 */
const BADGES: Partial<
  Record<
    GamePlatform,
    { logo: string; className: string; markClassName: string }
  >
> = {
  PS5: {
    logo: "playstation5",
    className: "bg-white",
    markClassName: "bg-black",
  },
  PS4: {
    logo: "playstation4",
    className: "bg-[#003791]",
    markClassName: "bg-white",
  },
};

type PlatformBadgeProps = {
  platform: GamePlatform;
  className?: string;
};

const PlatformBadge = ({ platform, className }: PlatformBadgeProps) => {
  const badge = BADGES[platform];

  if (!badge) {
    return (
      <span
        className={cn(
          "rounded-[3px] bg-black/70 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white backdrop-blur-sm",
          className,
        )}
      >
        {platform}
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={platform}
      className={cn(
        "flex items-center rounded-[3px] px-1.5 py-1 shadow-sm ring-1 ring-black/10",
        badge.className,
        className,
      )}
    >
      {/* The wordmark spans the logo's full width, centered in a square. */}
      <span
        aria-hidden
        className={cn("h-[7px] w-8", badge.markClassName)}
        style={{
          maskImage: `url(${SIMPLE_ICONS_CDN}/${badge.logo})`,
          maskSize: "100% auto",
          maskPosition: "center",
          maskRepeat: "no-repeat",
        }}
      />
    </span>
  );
};

export default PlatformBadge;
