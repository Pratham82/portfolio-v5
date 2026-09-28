import { extractText, getDocumentProxy } from "unpdf";

import type { WorkHighlight } from "@/interface/about.interface";

/**
 * Re-download the resume at most once a day. Pages still revalidate hourly
 * for Sanity content; they reuse this cached response in between.
 */
const RESUME_REVALIDATE = 86400;

export type ResumeJob = {
  companyName: string;
  position: string;
  location: string;
  /** ISO date (yyyy-mm-dd), first of the month. */
  startDate: string;
  /** ISO date, or null while the role is current. */
  endDate: string | null;
  highlights: WorkHighlight[];
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTH_YEAR = `(?:${MONTHS.join("|")}) \\d{4}`;

// "Blitz Electric · Senior Software Engineer (Frontend) June 2024 – June 2025 (Remote)"
const JOB_HEADER = new RegExp(
  `^(.+?) · (.+?) (${MONTH_YEAR}) [–-] (Present|${MONTH_YEAR}) \\((.+)\\)$`,
);
const BULLET = /^·\s*/;
// "Mobile Seller Platform: Built…" → a short bold label before the colon.
const LABELLED = /^([^:.]{2,40}):\s+(.+)$/;
// The next section's heading, e.g. "Technical Skills" or "Education": up to
// four Title Case words and no punctuation. Wrapped bullet lines don't match.
const SECTION_HEADING = /^[A-Z][A-Za-z&]*(?: [A-Z&][A-Za-z&]*){0,3}$/;

/** Google Drive share links → direct download URL. Other URLs pass through. */
export const toDirectDownloadUrl = (link: string): string => {
  const id =
    link.match(/drive\.google\.com\/file\/d\/([\w-]+)/)?.[1] ??
    link.match(/drive\.google\.com\/.*[?&]id=([\w-]+)/)?.[1];

  return id
    ? `https://drive.usercontent.google.com/download?id=${id}&export=download`
    : link;
};

const toIsoDate = (monthYear: string): string => {
  const [month, year] = monthYear.split(" ");
  const monthNumber = String(MONTHS.indexOf(month) + 1).padStart(2, "0");

  return `${year}-${monthNumber}-01`;
};

const toHighlight = (bullet: string): WorkHighlight => {
  const match = bullet.match(LABELLED);

  return match ? { label: match[1], text: match[2] } : { text: bullet };
};

/**
 * In a current role with several clients, the first client listed is the
 * current one. Mark it unless the resume already marks one "(Current)".
 */
const markCurrentClient = (highlights: WorkHighlight[]): WorkHighlight[] => {
  if (highlights.some(({ label }) => label?.includes("(Current)"))) {
    return highlights;
  }
  const first = highlights.findIndex(({ label }) => label);

  return highlights.map((highlight, index) =>
    index === first
      ? { ...highlight, label: `${highlight.label} (Current)` }
      : highlight,
  );
};

/**
 * Parses the "Experience" section of the resume's extracted text. Returns an
 * empty array if the section or its job headers can't be found.
 */
export const parseResumeExperience = (text: string): ResumeJob[] => {
  const lines = text.split("\n").map((line) => line.trim());
  const start = lines.indexOf("Experience");
  if (start === -1) return [];

  const jobs: ResumeJob[] = [];
  let bullets: string[] = [];

  const flush = () => {
    const job = jobs.at(-1);
    if (job) {
      const highlights = bullets.map(toHighlight);
      job.highlights =
        job.endDate === null ? markCurrentClient(highlights) : highlights;
    }
    bullets = [];
  };

  for (const line of lines.slice(start + 1)) {
    if (!line) continue;

    const header = line.match(JOB_HEADER);
    if (header) {
      flush();
      const [, companyName, position, from, to, location] = header;
      jobs.push({
        companyName,
        position,
        location,
        startDate: toIsoDate(from),
        endDate: to === "Present" ? null : toIsoDate(to),
        highlights: [],
      });
    } else if (BULLET.test(line)) {
      bullets.push(line.replace(BULLET, ""));
    } else if (jobs.length && SECTION_HEADING.test(line)) {
      break;
    } else if (bullets.length) {
      // A wrapped continuation of the previous bullet.
      bullets[bullets.length - 1] += ` ${line}`;
    }
  }
  flush();

  return jobs;
};

/**
 * Fetches the resume PDF and parses its work experience. Returns null (and
 * logs) on any failure, so callers can fall back to CMS data.
 */
export const getResumeExperience = async (
  resumeLink: string,
): Promise<ResumeJob[] | null> => {
  if (!resumeLink) return null;

  try {
    const response = await fetch(toDirectDownloadUrl(resumeLink), {
      next: { revalidate: RESUME_REVALIDATE },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const bytes = new Uint8Array(await response.arrayBuffer());
    // Drive serves an HTML page instead of the file when it isn't public.
    if (new TextDecoder().decode(bytes.slice(0, 5)) !== "%PDF-") {
      throw new Error("response is not a PDF (is the file shared publicly?)");
    }

    const pdf = await getDocumentProxy(bytes);
    const { text } = await extractText(pdf, { mergePages: true });
    const jobs = parseResumeExperience(text);
    if (!jobs.length)
      throw new Error("no jobs found in the Experience section");

    return jobs;
  } catch (error) {
    console.error("resume: falling back to CMS work experience:", error);
    return null;
  }
};
