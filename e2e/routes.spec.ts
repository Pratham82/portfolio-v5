import { expect, test } from "./fixtures";
import { ROUTES, settle, stableScreenshot, trackErrors } from "./helpers";

/** APIs behind the Now page widgets; only the server may call them. */
const THIRD_PARTY_DATA_HOSTS = [
  "api.spotify.com/v1/me/top",
  "wakatime.com/api",
  "fotmob.com/api",
  "letterboxd.com/pratham82/rss",
];

test("/ renders the home without redirecting", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(/\/$/);
});

for (const route of ROUTES) {
  test.describe(route, () => {
    test("renders without errors", async ({ page }) => {
      const errors = trackErrors(page);
      const sanityApiCalls: string[] = [];
      const psnApiCalls: string[] = [];
      const thirdPartyDataCalls: string[] = [];
      page.on("request", (req) => {
        if (req.url().includes(".api.sanity.io"))
          sanityApiCalls.push(req.url());
        if (req.url().includes("m.np.playstation.com"))
          psnApiCalls.push(req.url());
        if (THIRD_PARTY_DATA_HOSTS.some((host) => req.url().includes(host)))
          thirdPartyDataCalls.push(req.url());
      });
      const response = await page.goto(route);

      expect(response?.status()).toBe(200);
      await settle(page);
      await expect(page.locator("body")).not.toBeEmpty();
      expect(errors).toEqual([]);
      // Sanity content is fetched at build time, never from the browser.
      expect(sanityApiCalls).toEqual([]);
      // PSN is only called on the server; the NPSSO never reaches the browser.
      expect(psnApiCalls).toEqual([]);
      // Same for the Now page widgets.
      expect(thirdPartyDataCalls).toEqual([]);
    });

    for (const colorScheme of ["light", "dark"] as const) {
      test(`matches ${colorScheme} screenshot`, async ({ page }) => {
        await page.emulateMedia({ colorScheme });
        // The site defaults to dark, so pick the theme explicitly.
        await page.addInitScript((theme) => {
          localStorage.setItem("theme", theme);
        }, colorScheme);
        // Live Spotify would show or hide the /home card (and change the page
        // height) depending on what's playing, so pin it to a fixed track.
        await page.route("**/api/now-playing", (r) =>
          r.fulfill({
            json: {
              isPlaying: false,
              title: "Song",
              artist: "Artist",
              album: "Album",
              albumImageUrl: "",
              songUrl: "https://open.spotify.com",
            },
          }),
        );
        await page.goto(route);
        await settle(page);

        await expect(page).toHaveScreenshot(stableScreenshot(page));
      });
    }
  });
}
