import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("ForgeQueue is curated without duplicate archive entries or invented runtime evidence", async ({
  page,
}, info) => {
  await page.goto("/");
  await expect(page.locator(".project-card")).toHaveCount(6);
  const card = page.locator(".project-card").nth(2);
  await expect(
    card.getByRole("heading", { name: "ForgeQueue", exact: true }),
  ).toBeVisible();
  await expect(card.locator(".preview-caption")).toContainText(
    "not a live run",
  );
  await expect(
    page.locator(".engineering-desk").getByRole("link", { name: /ForgeQueue/ }),
  ).toHaveAttribute("href", "/projects/forgequeue");
  await card.screenshot({ path: info.outputPath("forgequeue-card.png") });
  await card.getByRole("button", { name: "Look inside" }).click();
  await expect(
    card.getByRole("region", { name: "ForgeQueue engineering walkthrough" }),
  ).toBeVisible();
  await page.goto("/projects/forgequeue");
  await expect(
    page.getByText(/Solo project: backend workflow engine/),
  ).toBeVisible();
  await expect(page.getByText(/reviewed October 14, 2026/)).toBeVisible();
  await expect(
    page.getByText(/checked-in load baseline is pending/),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Report workflow tests" }),
  ).toHaveAttribute("href", /integration\/report_demo_test.go$/);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
  await page.goto("/projects");
  await expect(page.locator(".project-card")).toHaveCount(10);
  await expect(
    page.locator(".archive-list a[href$='/Forgequeue']"),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "CloudCrew", exact: true }),
  ).toBeVisible();
});
