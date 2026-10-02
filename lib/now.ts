import type { INowData } from "@/interface/now.interface";
import { nowPage } from "@/src/graphql/queries";

import { getFootball } from "./football";
import { getRecentFilms } from "./letterboxd";
import { renderMdx } from "./mdx";
import { sanityQuery } from "./sanity/client";
import { getTopItems } from "./spotify";
import { getCodingStats } from "./wakatime";

/**
 * `NOW_LIVE_WIDGETS=off` skips every third-party call, so e2e screenshots
 * don't change with my listening, coding or football results.
 */
const LIVE_WIDGETS = process.env.NOW_LIVE_WIDGETS !== "off";

/** The hand-written Now text from Sanity, rendered on the server. */
export const getNowContent = async () => {
  const { allNowPage } = await sanityQuery<{
    allNowPage: { updated: string | null; body: string | null }[];
  }>(nowPage);
  const [page] = allNowPage;

  return {
    updated: page?.updated ?? "",
    content: await renderMdx(page?.body ?? ""),
  };
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
