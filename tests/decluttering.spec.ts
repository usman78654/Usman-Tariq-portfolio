import { test, expect } from "@playwright/test";

test("selected work follows the hero without Signal Studio; repair remains readable", async ({
  page,
}, info) => {
  await page.goto("/");
  await expect(page.locator(".signal-studio")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Send a pulse" })).toHaveCount(
    0,
  );
  await expect(page.locator(".hero-atmosphere")).toHaveCount(1);
  await expect(page.locator(".hero img")).toHaveCount(0);
  await expect(page.locator(".hero-project-entry .desk-card")).toHaveCount(3);
  expect(
    await page.locator(".hero").evaluate((el) => el.nextElementSibling?.id),
  ).toBe("work");
  await expect(
    page.locator(".portrait-sticker, .discipline-strip, .interest-tags"),
  ).toHaveCount(0);
  const claim = page.locator(".project-card").filter({
    has: page.getByRole("heading", { name: "ClaimGuard", exact: true }),
  });
  await expect(claim.locator(".verdict")).toHaveCount(0);
  await expect(claim.locator(".claim-source")).toContainText(
    "Three-year warranty",
  );
  await claim.getByRole("button", { name: "Show targeted repair" }).click();
  await expect(claim.locator(".repaired-sentence")).toHaveText(
    "The warranty lasts three years.",
  );
  await expect(claim.locator(".preview-caption")).toContainText(
    "Fictional sample",
  );
  await claim.screenshot({ path: info.outputPath("claimguard-clean.png") });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.locator(".hero").scrollIntoViewIfNeeded();
  await page.screenshot({ path: info.outputPath("clean-hero.png") });
});
