import { Page } from "@playwright/test";

export const BLOG_SLUG = "fetch-api-blog";
export const LINK_SLUG = "system-design";

export const ROUTES = [
  "/home",
  "/about",
  "/experience",
  "/projects",
  "/uses",
  "/games",
  "/now",
  "/blogs",
  `/blogs/${BLOG_SLUG}`,
  "/links",
  `/links/${LINK_SLUG}`,
  "/guides/ai-guide",
];

// Vercel Analytics only exists on Vercel; Spotify can legitimately be unavailable.
const IGNORED_RESOURCES = ["/_vercel/insights/", "/api/now-playing"];

/** Collects console errors and uncaught page errors while a test runs. */
export const trackErrors = (page: Page) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const source = msg.location().url;
    if (IGNORED_RESOURCES.some((path) => source.includes(path))) return;
    errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
};

/** Waits until client-side data has loaded and entry animations have settled. */
export const settle = async (page: Page) => {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(800);
};

/** Screenshot options that hide pixels which change on every run. */
export const stableScreenshot = (page: Page) => ({
  fullPage: true,
  // The animated background is a full-viewport fixed canvas; hide rather than mask it.
  style: "canvas { visibility: hidden !important; }",
  // Scrambling title text, and the local-time clock on /home.
  mask: [page.locator("h1 span"), page.locator("[data-volatile]")],
});
