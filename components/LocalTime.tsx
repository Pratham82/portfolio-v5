"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
});

/** Refresh often enough that the minute never looks stale. */
const TICK_MS = 15_000;

/**
 * My local time, so visitors in other time zones know when I'll reply.
 * Rendered only in the browser (the server's clock would be stale in cached
 * HTML and cause a hydration mismatch).
 */
const LocalTime = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = setInterval(update, TICK_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    // Fixed width so the header doesn't shift when the time appears.
    <span
      data-volatile
      className="hidden min-w-32 text-right font-mono text-xs text-muted-foreground sm:inline-block"
    >
      {time && (
        <>
          <time>{time}</time> in Mumbai
        </>
      )}
    </span>
  );
};

export default LocalTime;
