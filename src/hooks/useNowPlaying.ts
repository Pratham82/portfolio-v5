// hooks/useNowPlaying.ts
import { useEffect, useState } from "react";

import { NowPlayingSuccessResponse } from "@/interface/spotify.interface";

/** Matches the route's 30s cache (CACHE_SECONDS in app/api/now-playing). */
const POLL_INTERVAL_MS = 30_000;

/**
 * Polls /api/now-playing while `enabled` is true and the tab is visible.
 * It fetches straight away when it starts or the tab becomes visible again.
 */
const useNowPlaying = (enabled = true) => {
  const [data, setData] = useState<NowPlayingSuccessResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const fetchNowPlaying = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/now-playing");
        if (!res.ok) throw new Error("Failed to fetch now playing");
        const json = await res.json();

        if (json && json.isPlaying) {
          setData(json);
          localStorage.setItem("LAST_PLAYED", JSON.stringify(json));
        } else {
          const cached = localStorage.getItem("LAST_PLAYED");
          if (cached) {
            const cachedData = JSON.parse(cached);
            const finalData = {
              ...cachedData,
              isPlaying: false,
            };
            setData(finalData);
          } else {
            setData(json);
          }
        }
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error fetching now playing");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    let interval: ReturnType<typeof setInterval> | undefined;

    const start = () => {
      if (interval) return;
      fetchNowPlaying();
      interval = setInterval(fetchNowPlaying, POLL_INTERVAL_MS);
    };
    const stop = () => {
      clearInterval(interval);
      interval = undefined;
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [enabled]);

  return { data, loading, error };
};

export default useNowPlaying;
