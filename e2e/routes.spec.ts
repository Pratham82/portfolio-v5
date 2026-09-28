import { expect, test } from "@playwright/test";

import { ROUTES, settle, stableScreenshot, trackErrors } from "./helpers";

test("/ redirects to /home", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/home$/);
});

for (const route of ROUTES) {
  test.describe(route, () => {
    test("renders without errors", async ({ page }) => {
      const errors = trackErrors(page);
      const sanityApiCalls: string[] = [];
      page.on("request", (req) => {
        if (req.url().includes(".api.sanity.io"))
          sanityApiCalls.push(req.url());
      });
      const response = await page.goto(route);

      expect(response?.status()).toBe(200);
      await settle(page);
      await expect(page.locator("body")).not.toBeEmpty();
      expect(errors).toEqual([]);
      // Sanity content is fetched at build time, never from the browser.
      expect(sanityApiCalls).toEqual([]);
    });

    for (const colorScheme of ["light", "dark"] as const) {
      test(`matches ${colorScheme} screenshot`, async ({ page }) => {
        await page.emulateMedia({ colorScheme });
        // The site defaults to dark, so pick the theme explicitly.
        await page.addInitScript((theme) => {
          localStorage.setItem("theme", theme);
        }, colorScheme);
        await page.goto(route);
        await settle(page);

        await expect(page).toHaveScreenshot(stableScreenshot(page));
      });
    }
  });
}
