"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
});

/** Refresh often enough that the minute never looks stale. */
const TICK_MS = 15_000;
/** IST is UTC+5:30 all year (India has no daylight saving). */
const IST_OFFSET_MINUTES = 330;

/** "9h 30m ahead of you", or `null` when the visitor is on IST too. */
const describeOffset = (date: Date): string | null => {
  // getTimezoneOffset() is UTC minus local, so negate it to get local minus UTC.
  const diff = IST_OFFSET_MINUTES + date.getTimezoneOffset();
  if (diff === 0) return null;
  const hours = Math.floor(Math.abs(diff) / 60);
  const minutes = Math.abs(diff) % 60;
  const amount = [hours && `${hours}h`, minutes && `${minutes}m`]
    .filter(Boolean)
    .join(" ");
  return `${amount} ${diff > 0 ? "ahead of" : "behind"} you`;
};

/**
 * My local time in IST, shown next to my location so visitors in other time
 * zones know when I'll reply. Rendered only in the browser (the server's
 * clock would be stale in cached HTML and cause a hydration mismatch).
 */
const LocalTime = ({ className }: { className?: string }) => {
  const [time, setTime] = useState<string | null>(null);
  const [offset, setOffset] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(formatter.format(now));
      setOffset(describeOffset(now));
    };
    update();
    const interval = setInterval(update, TICK_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      data-volatile
      title="My local time (IST)"
      className={cn("text-muted-foreground", className)}
    >
      {time && (
        <>
          · <time className="font-semibold text-foreground/85">{time}</time> IST
          {offset && ` (${offset})`}
        </>
      )}
    </span>
  );
};

export default LocalTime;
