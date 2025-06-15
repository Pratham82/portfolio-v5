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
        setData(json);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error fetching now playing");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();

    // Optionally poll every 30 seconds:
    const interval = setInterval(fetchNowPlaying, 30000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};

export default useNowPlaying;
