import { Page } from "@playwright/test";

import { expect, test } from "./fixtures";
import { BLOG_SLUG, settle } from "./helpers";

const tab = (page: Page, name: string) =>
  page.getByTestId("home-tabs").getByRole("button", { name, exact: true });

const expectSelected = (page: Page, name: string) =>
  expect(tab(page, name)).toHaveClass(/font-bold/);

test.describe("home tabs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/home");
    await settle(page);
  });

  test("defaults to Experience", async ({ page }) => {
    await expectSelected(page, "Experience");
  });

  test("clicking a tab selects it and shows its section", async ({ page }) => {
    await tab(page, "Blogs").click();
    await expectSelected(page, "Blogs");
    await expect(page.locator('a[href^="/blogs/"]').first()).toBeVisible();

    await tab(page, "Links").click();
    await expectSelected(page, "Links");
    await expect(page.locator('a[href^="/links/"]').first()).toBeVisible();

    for (const name of ["Projects", "About", "Uses", "Experience"]) {
      await tab(page, name).click();
      await expectSelected(page, name);
    }
  });

  test("keyboard shortcuts switch tabs", async ({ page }) => {
    await page.keyboard.press("p");
    await expectSelected(page, "Projects");
    await page.keyboard.press("b");
    await expectSelected(page, "Blogs");
    await page.keyboard.press("1");
    await expectSelected(page, "Experience");
  });
});

test("blog back button returns to the Blogs tab", async ({ page }) => {
  await page.goto(`/blogs/${BLOG_SLUG}`);
  await settle(page);
  await page.getByRole("button", { name: "back" }).click();

  await expect(page).toHaveURL(/\/home$/);
  await expectSelected(page, "Blogs");
});

// Pages Router bug: on a direct load, router.query is empty when the
// mount-only effect runs. Fixed by the App Router migration (useSearchParams).
test.fixme("direct load of /home?from=blog opens the Blogs tab", async ({
  page,
}) => {
  await page.goto("/home?from=blog");
  await settle(page);
  await expectSelected(page, "Blogs");
  await expect(page).toHaveURL(/\/home$/);
});

test("theme toggle flips the dark class", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/home");
  await settle(page);

  const html = page.locator("html");
  const toggle = page.getByRole("button", { name: "Toggle Theme" });
  const wasDark = (await html.getAttribute("class"))?.includes("dark");

  await toggle.click();
  if (wasDark) await expect(html).not.toHaveClass(/\bdark\b/);
  else await expect(html).toHaveClass(/\bdark\b/);
});

test("blog post renders highlighted code with a copy button", async ({
  page,
}) => {
  await page.goto(`/blogs/${BLOG_SLUG}`);
  await settle(page);

  await expect(page.locator("pre code.hljs").first()).toBeVisible();
  await expect(page.locator("pre .copy-btn").first()).toBeVisible();
});

test("/api/now-playing responds with the expected shape", async ({
  request,
}) => {
  const res = await request.get("/api/now-playing");
  const body = await res.json();

  if (res.ok()) expect(body).toHaveProperty("isPlaying");
  else {
    expect(res.status()).toBe(500);
    expect(body).toHaveProperty("error");
  }
});
