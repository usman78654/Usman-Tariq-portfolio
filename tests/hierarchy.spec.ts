import { test, expect } from "@playwright/test";

test("section context and project grouping remain readable", async ({
  page,
}, info) => {
  await page.goto("/");
  for (const selector of [
    ".hero-bottom > span",
    "#work .section-heading .eyebrow",
    ".approach > .eyebrow",
    ".playground-intro > .eyebrow",
    ".simulation-top > span:first-child",
    ".project-eyebrow > span:first-child",
  ]) {
    expect(
      await page
        .locator(selector)
        .first()
        .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
    ).toBeGreaterThanOrEqual(14);
  }
  for (const selector of [
    ".project-eyebrow > span:last-child",
    ".simulation-top > span:last-child",
  ]) {
    expect(
      await page
        .locator(selector)
        .first()
        .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
    ).toBeGreaterThanOrEqual(12);
  }
  const cards = page.locator(".project-card");
  await expect(cards).toHaveCount(6);
  for (const card of await cards.all()) {
    expect(
      await card.evaluate((el) =>
        parseFloat(getComputedStyle(el).borderTopWidth),
      ),
    ).toBeGreaterThanOrEqual(1);
  }
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await cards.nth(1).scrollIntoViewIfNeeded();
  await page.screenshot({ path: info.outputPath("project-boundaries.png") });
  await page.locator("#playground").scrollIntoViewIfNeeded();
  await page.screenshot({ path: info.outputPath("playground-labels.png") });
});
