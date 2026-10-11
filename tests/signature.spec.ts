import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("signature desk, atlas and personal stack remain accessible", async ({
  page,
}) => {
  await page.goto("/");
  const desk = page.getByLabel("Explore three engineering projects");
  await expect(desk.getByRole("link")).toHaveCount(3);
  await expect(desk.getByRole("link", { name: /Mindplay/ })).toHaveAttribute(
    "href",
    "/projects/mindplay",
  );
  await page.getByRole("button", { name: "Map view", exact: true }).click();
  const atlas = page.getByRole("region", { name: "Project atlas" });
  await expect(atlas.getByRole("link")).toHaveCount(6);
  await atlas.getByRole("button", { name: "Security", exact: true }).click();
  await expect(atlas.locator('li[data-connected="true"]')).toHaveCount(1);
  await expect(atlas.locator('li[data-connected="true"]')).toContainText(
    "CipherRelay",
  );
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole("button", { name: "Cards", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(6);
  const snapshots = page.getByLabel("Outside the IDE", { exact: true });
  await expect(snapshots.getByRole("heading")).toHaveText("Perfume collecting");
  await snapshots.getByRole("button", { name: "Next interest" }).click();
  await expect(snapshots.getByRole("heading")).toHaveText("Gaming");
  await snapshots.getByRole("button", { name: "Previous interest" }).click();
  await expect(snapshots.getByRole("heading")).toHaveText("Perfume collecting");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
  await snapshots.screenshot({
    path: test.info().outputPath("personal-snapshots.png"),
  });
});

test("signature effects respect reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect
    .poll(() =>
      page
        .locator(".signature-word")
        .evaluate((el) => getComputedStyle(el, "::after").animationName),
    )
    .toBe("none");
  await page.getByRole("button", { name: "Look inside" }).first().click();
  await expect
    .poll(() =>
      page
        .locator(".surface-system-reveal")
        .first()
        .evaluate((el) => getComputedStyle(el).animationName),
    )
    .toBe("none");
  await page.getByRole("button", { name: "Map view", exact: true }).click();
  await expect(
    page.getByRole("region", { name: "Project atlas" }),
  ).toBeVisible();
});
