const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
/** India has no daylight saving, so IST is always UTC+5:30. */
const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;

/**
 * Formats a UTC timestamp in IST, e.g. "Sat 11 Oct, 21:00". Built from
 * numbers rather than `Intl`, so the server and every browser render exactly
 * the same text (no hydration mismatch).
 */
export const formatIst = (iso: string, withTime = true) => {
  const ist = new Date(new Date(iso).getTime() + IST_OFFSET_MS);
  const date = `${WEEKDAYS[ist.getUTCDay()]} ${ist.getUTCDate()} ${MONTHS[ist.getUTCMonth()]}`;
  if (!withTime) return date;
  const hours = String(ist.getUTCHours()).padStart(2, "0");
  const minutes = String(ist.getUTCMinutes()).padStart(2, "0");
  return `${date}, ${hours}:${minutes}`;
};

/** "2026-09-27" → "27 Sep" */
export const formatDay = (isoDate: string) => {
  const [, month, day] = isoDate.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]}`;
};

/** 45000 → "12h 30m", 1800 → "30m" */
export const formatDuration = (seconds: number) => {
  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!hours) return `${minutes}m`;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
};
