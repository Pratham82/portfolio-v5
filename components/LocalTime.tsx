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

/**
 * My local time in IST, shown next to my location so visitors in other time
 * zones know when I'll reply. Rendered only in the browser (the server's
 * clock would be stale in cached HTML and cause a hydration mismatch).
 */
const LocalTime = ({ className }: { className?: string }) => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = setInterval(update, TICK_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      data-volatile
      title="My local time (IST)"
      className={cn("font-mono text-muted-foreground", className)}
    >
      {time && (
        <>
          · <time className="font-semibold text-foreground/85">{time}</time> IST
        </>
      )}
    </span>
  );
};

export default LocalTime;
