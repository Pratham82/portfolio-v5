import type { ICodingStats } from "@/interface/now.interface";

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
const API = "https://wakatime.com/api/v1/users/current";
/** How many languages the Now page lists. */
const LANGUAGE_COUNT = 5;

type StatsResponse = {
  data: {
    total_seconds?: number;
    daily_average?: number;
    is_up_to_date?: boolean;
    languages?: { name: string; percent: number; total_seconds: number }[];
  };
};

type SummariesResponse = {
  data: { range: { date: string }; grand_total: { total_seconds: number } }[];
};

const wakatime = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${API}${path}`, {
    headers: {
      // WakaTime takes the API key as the Basic auth username.
      Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY ?? "").toString("base64")}`,
    },
  });
  if (!res.ok) {
    throw new Error(`${path} (${res.status}): ${await res.text()}`);
  }
  return res.json();
};

/**
 * My coding time for the last 7 days from WakaTime. Returns `null` (and logs)
 * when `WAKATIME_API_KEY` is unset or WakaTime fails.
 */
export const getCodingStats = async (): Promise<ICodingStats | null> => {
  if (!WAKATIME_API_KEY) {
    console.warn(
      "wakatime: WAKATIME_API_KEY is not set; skipping coding stats",
    );
    return null;
  }

  try {
    const [{ data: stats }, { data: days }] = await Promise.all([
      wakatime<StatsResponse>("/stats/last_7_days"),
      wakatime<SummariesResponse>("/summaries?range=last_7_days"),
    ]);
    // Right after a new key or a quiet week, WakaTime is still computing
    // stats and leaves the totals out; fall back to the daily summaries.
    const totalSeconds =
      stats.total_seconds ??
      days.reduce((sum, day) => sum + day.grand_total.total_seconds, 0);

    return {
      totalSeconds,
      dailyAverageSeconds: stats.daily_average ?? totalSeconds / 7,
      days: days.map((day) => ({
        date: day.range.date,
        seconds: day.grand_total.total_seconds,
      })),
      languages: (stats.languages ?? [])
        .filter((language) => language.total_seconds > 0)
        .slice(0, LANGUAGE_COUNT)
        .map((language) => ({
          name: language.name,
          percent: Math.round(language.percent),
          seconds: language.total_seconds,
        })),
    };
  } catch (error) {
    console.error("wakatime:", error);
    return null;
  }
};
