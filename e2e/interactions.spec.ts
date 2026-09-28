import { Page, expect, test } from "@playwright/test";

import { BLOG_SLUG, LINK_SLUG, settle, trackErrors } from "./helpers";

const tab = (page: Page, name: string) =>
  page.getByTestId("home-tabs").getByRole("button", { name, exact: true });

const expectSelected = (page: Page, name: string) =>
  expect(tab(page, name)).toHaveAttribute("aria-pressed", "true");

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

test("links back button returns to the Links tab", async ({ page }) => {
  await page.goto(`/links/${LINK_SLUG}`);
  await settle(page);
  await page.getByRole("button", { name: /back to links/ }).click();

  await expect(page).toHaveURL(/\/home$/);
  await expectSelected(page, "Links");
});

test("blog back button returns to the Blogs tab", async ({ page }) => {
  await page.goto(`/blogs/${BLOG_SLUG}`);
  await settle(page);
  await page.getByRole("button", { name: "back" }).click();

  await expect(page).toHaveURL(/\/home$/);
  await expectSelected(page, "Blogs");
});

test("direct load of /home?from=blog opens the Blogs tab", async ({ page }) => {
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

test("home mini tabs render their widgets without errors", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/home");
  await settle(page);

  const miniTab = (label: string) =>
    page.getByRole("button", { name: new RegExp(label) });

  await miniTab("Contributions").click();
  // One <rect> per day in the contributions grid.
  await expect(page.locator("svg rect").nth(50)).toBeAttached({
    timeout: 15_000,
  });

  await miniTab("Now Playing").click();
  await miniTab("Skills").click();
  await settle(page);

  expect(errors).toEqual([]);
});

test("resume link comes from Sanity", async ({ page }) => {
  await page.goto("/home");
  const resume = page.getByRole("link", { name: /resume/i });
  await expect(resume).toHaveAttribute("href", /^https?:\/\//);
});

test("blog MDX images load", async ({ page }) => {
  await page.goto("/blogs/system-design-framework");
  const image = page.getByRole("img", {
    name: "Frontend System Design Template",
  });

  await expect(image).toBeVisible();
  await expect
    .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth))
    .toBeGreaterThan(0);
});

test("projects category filter switches categories", async ({ page }) => {
  await page.goto("/projects");
  await settle(page);

  const categories = page.locator("main button");
  await expect(categories.first()).toHaveAttribute("aria-pressed", "true");

  const second = categories.nth(1);
  await second.click();
  await expect(second).toHaveAttribute("aria-pressed", "true");
  await expect(categories.first()).toHaveAttribute("aria-pressed", "false");
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("floating menu switches home tabs", async ({ page }) => {
    await page.goto("/home");
    await settle(page);

    await page.getByRole("button", { name: "Toggle Menu" }).click();
    await page.getByRole("button", { name: "Projects", exact: true }).click();

    await expect(
      page.getByRole("heading", { name: "Projects", exact: true }),
    ).toBeVisible();
  });
});
