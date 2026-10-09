/** Mumbai, for the weather shown next to my location on the home hero. */
const API =
  "https://api.open-meteo.com/v1/forecast?latitude=19.076&longitude=72.8777&current=temperature_2m,weather_code,is_day&timezone=Asia/Kolkata";
/** Re-fetch every 30 minutes; Open-Meteo updates current conditions about that often. */
const REVALIDATE = 1800;

export type Weather = {
  /** °C, rounded. */
  temperature: number;
  /** WMO weather interpretation code (0 = clear sky, 3 = overcast, ...). */
  code: number;
  isDay: boolean;
};

type ForecastResponse = {
  current?: { temperature_2m?: number; weather_code?: number; is_day?: number };
};

/**
 * Current weather in Mumbai from Open-Meteo, which needs no API key. Returns
 * `null` (and logs) when the request fails.
 */
export const getMumbaiWeather = async (): Promise<Weather | null> => {
  try {
    const res = await fetch(API, { next: { revalidate: REVALIDATE } });
    if (!res.ok) {
      throw new Error(`Open-Meteo (${res.status}): ${await res.text()}`);
    }
    const { current }: ForecastResponse = await res.json();
    if (typeof current?.temperature_2m !== "number") return null;
    return {
      temperature: Math.round(current.temperature_2m),
      code: current.weather_code ?? 0,
      isDay: current.is_day !== 0,
    };
  } catch (error) {
    console.error("Failed to fetch the Mumbai weather:", error);
    return null;
  }
};
