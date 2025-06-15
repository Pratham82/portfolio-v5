// hooks/useNowPlaying.ts
import { useEffect, useState } from "react";

import { NowPlayingSuccessResponse } from "../../pages/api/now-playing";

const useNowPlaying = () => {
  const [data, setData] = useState<NowPlayingSuccessResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchNowPlaying();
    // every 1 minute:
    const interval = setInterval(fetchNowPlaying, 60000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};

export default useNowPlaying;
