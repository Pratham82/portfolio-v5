import { expect, test } from "./fixtures";
import { ROUTES, settle, stableScreenshot, trackErrors } from "./helpers";

test("/ redirects to /home", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/home$/);
});

for (const route of ROUTES) {
  test.describe(route, () => {
    test("renders without errors", async ({ page }) => {
      const errors = trackErrors(page);
      const response = await page.goto(route);

      expect(response?.status()).toBe(200);
      await settle(page);
      await expect(page.locator("body")).not.toBeEmpty();
      expect(errors).toEqual([]);
    });

    for (const colorScheme of ["light", "dark"] as const) {
      test(`matches ${colorScheme} screenshot`, async ({ page }) => {
        await page.emulateMedia({ colorScheme });
        await page.goto(route);
        await settle(page);

        await expect(page).toHaveScreenshot(stableScreenshot(page));
      });
    }
  });
}
