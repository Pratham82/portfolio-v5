import { Page, test as base } from "@playwright/test";

const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
};

/**
 * Sanity's CORS allowlist only includes localhost:3000, but tests run on
 * another port. Proxy Sanity calls through Playwright (no CORS in Node).
 * Remove once Sanity is fetched server-side (refresh Phase 5).
 */
const proxySanity = async (page: Page) => {
  await page.route("https://*.api.sanity.io/**", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers: CORS_HEADERS });
      return;
    }
    // Sanity also rejects disallowed origins on the actual request.
    const { origin: _origin, ...headers } = route.request().headers();
    const response = await route.fetch({ headers });
    await route.fulfill({
      response,
      headers: { ...response.headers(), ...CORS_HEADERS },
    });
  });
};

export const test = base.extend({
  page: async ({ page }, use) => {
    await proxySanity(page);
    await use(page);
    await page.unrouteAll({ behavior: "ignoreErrors" });
  },
});

export { expect } from "@playwright/test";
