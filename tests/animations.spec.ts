import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("static content survives without JavaScript and normal motion has no looping hero", async ({
  browser,
  page,
}, info) => {
  await page.goto("/");
  await page.locator(".hero-bottom > span").scrollIntoViewIfNeeded();
  await expect(page.locator(".hero-bottom > span")).toHaveAttribute(
    "data-motion-entered",
    "true",
  );
  expect(
    await page
      .locator(".hero-star")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page
      .locator(".hero-bottom > span")
      .evaluate(
        (el) => getComputedStyle(el, "::after").animationIterationCount,
      ),
  ).toBe("1");
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: info.project.use.viewport,
  });
  const staticPage = await context.newPage();
  await staticPage.goto("http://127.0.0.1:3000/");
  await expect(staticPage.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(staticPage.locator(".project-card")).toHaveCount(6);
  await staticPage.goto("http://127.0.0.1:3000/projects/mindplay");
  await expect(
    staticPage.getByRole("heading", { name: "Follow the flow." }),
  ).toBeVisible();
  await expect(staticPage.getByText("94.4% / 160 trials").last()).toBeVisible();
  await context.close();
});

test("all nine projects have truthful, manually navigable engineering explanations", async ({
  page,
}, info) => {
  for (const slug of [
    "clearstep",
    "claimguard",
    "cloudcrew",
    "cipherrelay",
    "mindplay",
    "cross-browser-qa",
    "ecommerce-qa",
    "edime",
    "rag-pipeline",
  ]) {
    await page.goto(`/projects/${slug}`);
    await page.getByRole("button", { name: /Look inside/ }).click();
    const walk = page.getByRole("region", { name: /engineering walkthrough/ });
    await expect(
      walk.getByText("ILLUSTRATIVE EXPLANATION / NOT A LIVE SYSTEM"),
    ).toBeVisible();
    await expect(walk.locator(".walk-node[aria-current='step']")).toHaveCount(
      1,
    );
    await expect(
      walk.getByRole("button", { name: "Play explanation" }),
    ).toBeVisible();
    while (
      await walk.getByRole("button", { name: "Next step", exact: true }).count()
    ) {
      await walk
        .getByRole("button", { name: "Next step", exact: true })
        .click();
    }
    await expect(
      walk.getByRole("button", { name: "Explanation complete" }),
    ).toBeDisabled();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (slug === "mindplay") {
      await expect(
        walk.getByText("Blink detector", { exact: true }),
      ).toBeVisible();
      await expect(walk.getByText(/clinical usefulness/)).toBeVisible();
      await walk.screenshot({
        path: info.outputPath("mindplay-explanation.png"),
      });
    }
    await walk.getByRole("button", { name: "Reset explanation" }).click();
    await expect(walk.getByText(/STEP 1 \//)).toBeVisible();
  }
});

test("finite playback can pause, reset, and stop when the explanation leaves view", async ({
  page,
}) => {
  await page.goto("/projects/clearstep");
  await page.getByRole("button", { name: /Look inside/ }).click();
  const walk = page.getByRole("region", { name: /engineering walkthrough/ });
  await walk.getByRole("button", { name: "Play explanation" }).click();
  await expect(
    walk.getByRole("heading", { name: "Extract in the browser" }),
  ).toBeVisible({ timeout: 5000 });
  await walk.getByRole("button", { name: "Pause explanation" }).click();
  await page.waitForTimeout(2800);
  await expect(
    walk.getByRole("heading", { name: "Extract in the browser" }),
  ).toBeVisible();
  await walk.getByRole("button", { name: "Reset explanation" }).click();
  await walk.getByRole("button", { name: "Play explanation" }).click();
  await page.locator("#lessons").scrollIntoViewIfNeeded();
  await expect(
    walk.getByRole("button", { name: "Play explanation" }),
  ).toBeAttached();
  await page.locator(".case-hero").scrollIntoViewIfNeeded();
  await walk.getByRole("button", { name: "Play explanation" }).click();
  await expect(
    walk.getByRole("button", { name: "Explanation complete" }),
  ).toBeDisabled({ timeout: 11000 });
  await expect(
    walk.getByRole("button", { name: "Play explanation" }),
  ).toBeEnabled();
});

test("source-to-output emphasis, targeted repair, result counts, and case navigation", async ({
  page,
}, info) => {
  await page.goto("/");
  await expect(page.locator(".filter-result-count")).toHaveText(
    "6 projects shown",
  );
  const clearstep = page.locator(".project-card").first();
  await clearstep.getByRole("button", { name: "Reveal the checklist" }).click();
  await expect(clearstep.locator(".document-demo")).toHaveAttribute(
    "data-analyzed",
    "true",
  );
  await expect(clearstep.locator(".deadline-result")).toHaveText(
    "Deadline: 20 November",
  );
  const claim = page.locator(".project-card").nth(1);
  const surrounding = await claim
    .locator(".repair-example p > span:not(.repaired-sentence)")
    .allTextContents();
  await claim.getByRole("button", { name: "Show targeted repair" }).click();
  await expect(claim.locator(".repaired-sentence")).toHaveText(
    "The warranty lasts three years.",
  );
  expect(
    await claim
      .locator(".repair-example p > span:not(.repaired-sentence)")
      .allTextContents(),
  ).toEqual(surrounding);
  await claim.getByRole("button", { name: "Reset repair example" }).click();
  await expect(claim.locator(".repaired-sentence")).toHaveText(
    "The warranty lasts two years.",
  );
  await page
    .getByRole("button", { name: "Cloud & DevOps", exact: true })
    .click();
  await expect(page.locator(".filter-result-count")).toHaveText(
    "2 projects shown",
  );
  await page.goto("/projects/claimguard");
  await page
    .locator(".case-nav")
    .getByRole("link", { name: "Evidence", exact: true })
    .click();
  await expect(page.locator(".case-nav a[aria-current='location']")).toHaveText(
    "Evidence",
  );
  await expect(page.locator(".case-position-marker")).toHaveCount(1);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.screenshot({ path: info.outputPath("case-position.png") });
});

test("reduced motion disables automatic sequences and preserves keyboard/manual controls", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects/mindplay");
  await page.getByRole("button", { name: /Look inside/ }).click();
  const walk = page.getByRole("region", { name: /engineering walkthrough/ });
  await expect(
    walk.getByRole("button", { name: "Play explanation" }),
  ).toBeDisabled();
  const next = walk.getByRole("button", { name: "Next step", exact: true });
  await next.focus();
  await page.keyboard.press("Enter");
  await expect(
    walk.getByRole("heading", { name: "Three parallel input branches" }),
  ).toBeVisible();
  expect(
    await walk
      .locator(".is-active .connector-signal")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.goto("/");
  expect(
    await page
      .locator(".hero-bottom > span")
      .evaluate((el) => getComputedStyle(el, "::after").animationName),
  ).toBe("none");
  expect(
    await page.locator(".hero h1").evaluate((el) => el.getAnimations().length),
  ).toBe(0);
  expect(
    await page
      .locator(".hero-star")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});
