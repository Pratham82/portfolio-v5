import fs from "fs";
import path from "path";

import matter from "gray-matter";

import type { INowData } from "@/interface/now.interface";

import { getFootball } from "./football";
import { getRecentFilms } from "./letterboxd";
import { renderMdx } from "./mdx";
import { getTopItems } from "./spotify";
import { getCodingStats } from "./wakatime";

const NOW_PATH = path.join(process.cwd(), "content/now.mdx");

/**
 * `NOW_LIVE_WIDGETS=off` skips every third-party call, so e2e screenshots
 * don't change with my listening, coding or football results.
 */
const LIVE_WIDGETS = process.env.NOW_LIVE_WIDGETS !== "off";

/** The hand-written Now text, rendered on the server. */
export const getNowContent = async () => {
  const { content, data } = matter(fs.readFileSync(NOW_PATH, "utf-8"));
  // YAML reads an unquoted 2026-10-02 as a Date.
  const updated =
    data.updated instanceof Date
      ? data.updated.toISOString().slice(0, 10)
      : String(data.updated ?? "");
  return { updated, content: await renderMdx(content) };
};

/** Every live widget on the Now page; each one is `null` if its source fails. */
export const getNowData = async (): Promise<INowData> => {
  if (!LIVE_WIDGETS) {
    return { topItems: null, coding: null, football: null, films: null };
  }

  const [topItems, coding, football, films] = await Promise.all([
    getTopItems(),
    getCodingStats(),
    getFootball(),
    getRecentFilms(),
  ]);
  return { topItems, coding, football, films };
};
