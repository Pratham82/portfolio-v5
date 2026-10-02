import { Page } from "@playwright/test";

import { expect, test } from "./fixtures";
import { BLOG_SLUG, LINK_SLUG, settle, trackErrors } from "./helpers";

const tab = (page: Page, name: string) =>
  page.getByTestId("home-tabs").getByRole("link", { name, exact: true });

const group = (page: Page, name: string) =>
  page
    .getByTestId("home-tab-groups")
    .getByRole("button", { name, exact: true });

const expectSelected = (page: Page, name: string) =>
  expect(tab(page, name)).toHaveAttribute("aria-current", "page");

const expectGroup = (page: Page, name: string) =>
  expect(group(page, name)).toHaveAttribute("aria-pressed", "true");

test.describe("home tabs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await settle(page);
  });

  test("defaults to Work > Experience", async ({ page }) => {
    await expectGroup(page, "Work");
    await expectSelected(page, "Experience");
  });

  test("clicking a tab selects it and shows its section", async ({ page }) => {
    await tab(page, "Blogs").click();
    await expect(page).toHaveURL(/\/blogs$/);
    await expectSelected(page, "Blogs");
    await expect(page.locator('a[href^="/blogs/"]').first()).toBeVisible();

    await group(page, "Personal").click();
    await expect(page).toHaveURL(/\/now$/);
    await expectGroup(page, "Personal");
    await expectSelected(page, "Now");

    await tab(page, "Links").click();
    await expect(page).toHaveURL(/\/links$/);
    await expectSelected(page, "Links");
    await expect(page.locator('a[href^="/links/"]').first()).toBeVisible();

    for (const name of ["About", "Uses"]) {
      await tab(page, name).click();
      await expectSelected(page, name);
    }

    // Switching back restores the tab last open in that group.
    await group(page, "Work").click();
    await expect(page).toHaveURL(/\/blogs$/);
    await expectSelected(page, "Blogs");

    for (const name of ["Projects", "Skills", "Experience"]) {
      await tab(page, name).click();
      await expectSelected(page, name);
    }
  });

  test("keyboard shortcuts switch tabs", async ({ page }) => {
    await page.keyboard.press("p");
    await expect(page).toHaveURL(/\/projects$/);
    await expectSelected(page, "Projects");
    await page.keyboard.press("b");
    await expectSelected(page, "Blogs");
    await page.keyboard.press("s");
    await expectSelected(page, "Skills");
    await page.keyboard.press("1");
    await expectSelected(page, "Experience");
  });

  test("browser back returns to the previous tab", async ({ page }) => {
    await tab(page, "Skills").click();
    await expect(page).toHaveURL(/\/skills$/);
    await group(page, "Personal").click();
    await expect(page).toHaveURL(/\/now$/);

    await page.goBack();
    await expect(page).toHaveURL(/\/skills$/);
    await expectGroup(page, "Work");
    await expectSelected(page, "Skills");
  });
});

for (const [path, groupName, tabName] of [
  ["/now", "Personal", "Now"],
  ["/games", "Personal", "Games"],
  ["/skills", "Work", "Skills"],
  ["/experience", "Work", "Experience"],
  ["/home", "Work", "Experience"],
] as const) {
  test(`direct load of ${path} opens ${groupName} > ${tabName}`, async ({
    page,
  }) => {
    await page.goto(path);
    await settle(page);
    await expectGroup(page, groupName);
    await expectSelected(page, tabName);
  });
}

test("links back button returns to the Links tab", async ({ page }) => {
  await page.goto(`/links/${LINK_SLUG}`);
  await settle(page);
  await page.getByRole("button", { name: /back to links/ }).click();

  await expect(page).toHaveURL(/\/links$/);
  await expectSelected(page, "Links");
});

test("blog back button returns to the Blogs tab", async ({ page }) => {
  await page.goto(`/blogs/${BLOG_SLUG}`);
  await settle(page);
  await page.getByRole("button", { name: "back" }).click();

  await expect(page).toHaveURL(/\/blogs$/);
  await expectSelected(page, "Blogs");
});

test("old /home?from=blog links redirect to /blogs", async ({ page }) => {
  await page.goto("/home?from=blog");
  await settle(page);
  await expect(page).toHaveURL(/\/blogs(\?|$)/);
  await expectSelected(page, "Blogs");
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

test("home shows contributions and the Skills tab without errors", async ({
  page,
}) => {
  const errors = trackErrors(page);
  await page.goto("/");
  await settle(page);

  // One <rect> per day in the contributions grid, shown without a toggle.
  await expect(page.locator("svg rect").nth(50)).toBeAttached({
    timeout: 15_000,
  });

  await tab(page, "Skills").click();
  await expect(page).toHaveURL(/\/skills$/);
  await expect(
    page.getByRole("heading", { name: "Skills", exact: true }),
  ).toBeVisible();
  await settle(page);

  expect(errors).toEqual([]);
});

test("resume link comes from Sanity", async ({ page }) => {
  await page.goto("/");
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

  const categories = page.getByTestId("home-tab-content").locator("button");
  await expect(categories.first()).toHaveAttribute("aria-pressed", "true");

  const second = categories.nth(1);
  await second.click();
  await expect(second).toHaveAttribute("aria-pressed", "true");
  await expect(categories.first()).toHaveAttribute("aria-pressed", "false");
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("floating menu switches home tabs", async ({ page }) => {
    await page.goto("/");
    await settle(page);

    await page.getByRole("button", { name: "Toggle Menu" }).click();
    // The desktop tab bar is hidden at this width; pick the visible menu link.
    await page
      .getByRole("link", { name: "Projects", exact: true })
      .and(page.locator(":visible"))
      .click();

    await expect(page).toHaveURL(/\/projects$/);
    await expect(
      page.getByRole("heading", { name: "Projects", exact: true }),
    ).toBeVisible();
  });
});
