import { expect, test } from "@playwright/test";

import { parseResumeExperience, toDirectDownloadUrl } from "../lib/resume";

import { settle } from "./helpers";

const RESUME_TEXT = [
  "Prathamesh Mali",
  "Summary",
  "Senior Frontend Engineer with 5+ years of experience.",
  "Experience",
  "Publicis Sapient · Senior Frontend Engineer July 2025 – Present (Mumbai)",
  "· lululemon (Current): Lead a frontend pod within lululemon’s checkout team, handling technical discussions, code",
  "reviews, sprint planning, and unblocking the team where needed.",
  "· Own the promotions and discounts domain within checkout.",
  "Edstem Technologies · Software Developer July 2021 – April 2022 (Remote)",
  "· Lead IAS: Worked on the student-facing quiz module in Angular Ionic.",
  "leadiasacademy.com",
  "Technical Skills",
  "Languages TypeScript, JavaScript",
].join("\n");

test.describe("resume parser", () => {
  test("parses jobs, dates, labels and wrapped bullets", () => {
    const jobs = parseResumeExperience(RESUME_TEXT);

    expect(jobs).toEqual([
      {
        companyName: "Publicis Sapient",
        position: "Senior Frontend Engineer",
        location: "Mumbai",
        startDate: "2025-07-01",
        endDate: null,
        highlights: [
          {
            label: "lululemon (Current)",
            text: "Lead a frontend pod within lululemon’s checkout team, handling technical discussions, code reviews, sprint planning, and unblocking the team where needed.",
          },
          { text: "Own the promotions and discounts domain within checkout." },
        ],
      },
      {
        companyName: "Edstem Technologies",
        position: "Software Developer",
        location: "Remote",
        startDate: "2021-07-01",
        endDate: "2022-04-01",
        highlights: [
          {
            label: "Lead IAS",
            text: "Worked on the student-facing quiz module in Angular Ionic. leadiasacademy.com",
          },
        ],
      },
    ]);
  });

  test("marks the first client of a current role as current", () => {
    const [job] = parseResumeExperience(
      [
        "Experience",
        "Publicis Sapient · Senior Frontend Engineer July 2025 – Present (Mumbai)",
        "· CPA Australia: Own Next.js code generation.",
        "· Built a Figma pipeline.",
        "· lululemon: Led a checkout pod.",
      ].join("\n"),
    );

    expect(job.highlights.map(({ label }) => label)).toEqual([
      "CPA Australia (Current)",
      undefined,
      "lululemon",
    ]);
  });

  test("returns no jobs without an Experience section", () => {
    expect(parseResumeExperience("Summary\nSomething else")).toEqual([]);
  });

  test("turns Drive share links into direct downloads", () => {
    expect(
      toDirectDownloadUrl(
        "https://drive.google.com/file/d/abc_123-XYZ/view?usp=sharing",
      ),
    ).toBe(
      "https://drive.usercontent.google.com/download?id=abc_123-XYZ&export=download",
    );
    expect(toDirectDownloadUrl("https://example.com/cv.pdf")).toBe(
      "https://example.com/cv.pdf",
    );
  });
});

test("experience cards expand to show bullet points", async ({ page }) => {
  await page.goto("/experience");
  await settle(page);

  const firstCard = page.locator("main article").first();
  await firstCard.getByRole("button").click();
  await expect(firstCard.locator("li").first()).toBeVisible();
});
