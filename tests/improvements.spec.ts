import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("curated flagships, previews, CV chooser, and clipboard feedback", async ({
  page,
}, info) => {
  await page.goto("/");
  const cards = page.locator(".project-card");
  await expect(
    cards.first().getByRole("heading", { name: "ClearStep" }),
  ).toBeVisible();
  await expect(
    cards.nth(1).getByRole("heading", { name: "ClaimGuard" }),
  ).toBeVisible();
  await cards
    .first()
    .getByRole("button", { name: "Reveal the checklist" })
    .click();
  await expect(cards.first().getByText("Deadline: 20 November")).toBeVisible();
  await cards.first().getByRole("button", { name: "Look inside" }).click();
  await cards
    .first()
    .getByRole("button", { name: "Validate the output", exact: true })
    .click();
  await expect(
    cards.first().getByText(/Invalid model output gets one repair attempt/),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Cloud & DevOps", exact: true })
    .click();
  await expect(
    cards.first().getByRole("heading", { name: "ForgeQueue" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "SQA & Testing", exact: true })
    .click();
  await expect(
    cards.first().getByRole("heading", { name: "Before checkout ships" }),
  ).toBeVisible();
  await page.locator(".cv-chooser summary").click();
  await expect(page.locator(".cv-chooser-options a")).toHaveCount(3);
  await expect(page.locator(".cv-chooser-options a").last()).toHaveAttribute(
    "download",
    "",
  );
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("Denied");
        },
      },
    }),
  );
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(
    page.getByText("Could not copy. Use the email link instead."),
  ).toBeVisible();
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => {} },
    }),
  );
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByText("Email copied.")).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole("button", { name: "All work", exact: true }).click();
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".filter-indicator")
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .toBe("none");
  await page.screenshot({ path: info.outputPath("selected-work.png") });
});

test("retrieval, seeded QA, and stale worker scenarios", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Retrieve passages" }).click();
  await expect(page.locator(".retrieval-results h4").first()).toHaveText(
    "Lease recovery",
  );
  await page.getByLabel("Sample question").fill("nothing matches here");
  await page.getByRole("button", { name: "Retrieve passages" }).click();
  await expect(page.getByText(/No lexical matches/)).toBeVisible();
  await page.getByRole("button", { name: "Reset retrieval" }).click();
  await page.getByRole("button", { name: "Seeded QA bug" }).click();
  await page.getByRole("button", { name: "Run ownership test" }).click();
  await expect(page.locator(".test-verdict")).toContainText("FAIL");
  await page.getByRole("button", { name: "Apply ownership check" }).click();
  await page.getByRole("button", { name: "Run ownership test" }).click();
  await expect(page.locator(".test-verdict")).toContainText("PASS");
  await page.getByRole("button", { name: "Reset QA" }).click();
  await expect(page.locator(".qa-fixture")).toContainText(
    "Missing (seeded bug)",
  );
  const playground = page.locator("#playground");
  await playground
    .getByRole("button", { name: "Stale worker returns" })
    .click();
  for (let i = 0; i < 4; i++)
    await playground.getByRole("button", { name: "Next step" }).click();
  await expect(playground.getByRole("heading", { level: 3 })).toHaveText(
    "The stale write is rejected",
  );
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("notes, recorded evidence, and case navigation", async ({
  page,
  request,
}, info) => {
  for (const slug of [
    "a-queue-without-another-service",
    "encrypted-does-not-mean-invisible",
    "fast-is-not-ready-to-ship",
  ]) {
    const response = await request.get(`/notes/${slug}`);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("Read the repository source");
  }
  await page.goto("/notes/fast-is-not-ready-to-ship");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.goto("/projects/ecommerce-qa");
  await page.getByRole("link", { name: "Evidence", exact: true }).click();
  await expect(page).toHaveURL(/#evidence$/);
  const video = page.getByLabel("Recorded ProShop QA walkthrough");
  await expect(video).toHaveAttribute("preload", "none");
  await expect(video).not.toHaveAttribute("autoplay", /.*/);
  expect(
    (await request.get("/projects/proshop-qa-walkthrough.webm")).status(),
  ).toBe(200);
  await page
    .getByRole("heading", { name: "Evidence over adjectives." })
    .scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("heading", { name: "Evidence over adjectives." }),
  ).toBeInViewport();
  await page.screenshot({ path: info.outputPath("qa-evidence.png") });
  await page.goto("/projects/claimguard");
  await expect(
    page.getByText(/configured Anthropic path has not been exercised/),
  ).toBeVisible();
});
