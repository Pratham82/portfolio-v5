import { test as base } from "@playwright/test";

export { expect } from "@playwright/test";

/** A year of made-up contributions in the github-contributions-api v4 shape. */
const contributions = () => {
  const days = Array.from({ length: 365 }, (_, i) => {
    const date = new Date(Date.now() - (364 - i) * 86_400_000);
    const count = (i * 7) % 5;
    return { date: date.toISOString().slice(0, 10), count, level: count % 5 };
  });
  return { total: { lastYear: days.length }, contributions: days };
};

/**
 * Every page under the home layout shows the GitHub calendar. Serve it fixed
 * data, so parallel tests don't get rate limited (429) by the public API.
 */
export const test = base.extend<{ githubCalendar: void }>({
  githubCalendar: [
    async ({ page }, use) => {
      await page.route("https://github-contributions-api.jogruber.de/**", (r) =>
        r.fulfill({ json: contributions() }),
      );
      await use();
    },
    { auto: true },
  ],
});
