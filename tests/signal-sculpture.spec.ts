import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("signal sculpture morphs, settles and sends finite pulses", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const studio = page.getByRole("region", {
    name: "Complexity, with a shape.",
  });
  await studio.scrollIntoViewIfNeeded();
  await expect(
    studio.getByRole("button", { name: "Signal", exact: true }),
  ).toBeEnabled();
  await studio.getByRole("button", { name: "Signal", exact: true }).click();
  await expect(studio.locator('[role="status"]')).toContainText(
    "flowing ribbon",
  );
  await studio.getByRole("button", { name: "System", exact: true }).click();
  await expect(studio.locator(".signal-instrument")).toHaveAttribute(
    "data-form",
    "system",
  );
  await expect(
    studio.getByRole("link", { name: "Explore failure and recovery" }),
  ).toHaveAttribute("href", "/projects/cloudcrew");
  await studio.getByRole("button", { name: "Send a pulse" }).click();
  await expect(studio.locator('[role="status"]')).toContainText("Pulse 1 sent");
  await page.mouse.move(0, 0);
  await expect(studio.locator("canvas")).toHaveAttribute(
    "data-running",
    "false",
    { timeout: 6000 },
  );
  const draws = await studio.locator("canvas").getAttribute("data-draws");
  await page.waitForTimeout(200);
  expect(await studio.locator("canvas").getAttribute("data-draws")).toBe(draws);
  await studio.getByRole("button", { name: "Reset sculpture" }).click();
  await expect(
    studio.getByRole("button", { name: "Structure", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(errors).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
  await studio.screenshot({
    path: test.info().outputPath("signal-studio.png"),
  });
});

test("sculpture animation pauses manually and offscreen", async ({ page }) => {
  await page.goto("/");
  const studio = page.locator(".signal-studio");
  await studio.scrollIntoViewIfNeeded();
  await studio.getByRole("button", { name: "Animate for 20s" }).click();
  await expect(
    studio.getByRole("button", { name: "Pause sculpture" }),
  ).toBeVisible();
  await studio.getByRole("button", { name: "Pause sculpture" }).click();
  await expect(
    studio.getByRole("button", { name: "Animate for 20s" }),
  ).toBeVisible();
  await studio.getByRole("button", { name: "Animate for 20s" }).click();
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(
    studio.getByRole("button", { name: "Animate for 20s" }),
  ).toHaveCount(1);
  await expect(studio.locator("canvas")).toHaveAttribute(
    "data-running",
    "false",
  );
});

test("sculpture stops at its time limit and on a live reduced-motion change", async ({
  page,
}) => {
  test.setTimeout(40000);
  await page.goto("/");
  const studio = page.locator(".signal-studio");
  await studio.getByRole("button", { name: "Animate for 20s" }).click();
  await expect(
    studio.getByRole("button", { name: "Pause sculpture" }),
  ).toBeVisible();
  await expect(
    studio.getByRole("button", { name: "Animate for 20s" }),
  ).toBeVisible({ timeout: 25000 });
  await studio.getByRole("button", { name: "Animate for 20s" }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(
    studio.getByRole("button", { name: "Animate for 20s" }),
  ).toBeDisabled();
  await expect(studio.locator("canvas")).toHaveAttribute(
    "data-running",
    "false",
  );
});

test("reduced motion and no-JavaScript have honest static alternatives", async ({
  page,
  browser,
}) => {
  const hydrationErrors: string[] = [];
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /hydrat|server rendered/i.test(message.text())
    )
      hydrationErrors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const studio = page.locator(".signal-studio");
  await studio.scrollIntoViewIfNeeded();
  await expect(
    studio.getByRole("button", { name: "Animate for 20s" }),
  ).toBeDisabled();
  await studio.getByRole("button", { name: "Signal", exact: true }).click();
  await expect(studio.locator('[role="status"]')).toContainText(
    "Reduced motion: static forms",
  );
  await studio.getByRole("button", { name: "Send a pulse" }).click();
  await expect(studio.locator("canvas")).toHaveAttribute(
    "data-running",
    "false",
  );
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("/");
  await expect(staticPage.locator(".signal-fallback")).toBeVisible();
  await expect(staticPage.locator(".hero-last")).toContainText("make sense.");
  await expect(
    staticPage
      .locator(".signal-studio")
      .getByRole("link", { name: "Skip to the projects" }),
  ).toHaveAttribute("href", "#work");
  await context.close();
  expect(hydrationErrors).toEqual([]);
});
