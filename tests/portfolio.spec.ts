import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage, CV downloads, and accessibility", async ({
  page,
  request,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "make sense",
  );
  await expect(
    page.getByRole("img", { name: "Portrait of Usman Tariq" }),
  ).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  for (const name of ["Software-AI", "Cloud-DevOps", "SQA"]) {
    const response = await request.get(`/resume/Usman-Tariq-${name}-CV.pdf`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  }
  await page
    .getByRole("button", { name: "SQA & Testing", exact: true })
    .click();
  await expect(page).toHaveURL(/focus=qa/);
  await expect(page.locator(".project-card")).toHaveCount(2);
  await expect(
    page.getByRole("link", { name: /Open the matching CV/ }),
  ).toHaveAttribute("href", "/resume/Usman-Tariq-SQA-CV.pdf");
  const a11y = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(a11y.violations).toEqual([]);
  expect(errors).toEqual([]);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await page.screenshot({
    path: testInfo.outputPath("homepage.png"),
    fullPage: true,
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath("hero.png") });
});

test("shareable filters, search, and history", async ({ page }) => {
  await page.goto("/projects?focus=cloud");
  await expect(page.locator(".project-card")).toHaveCount(2);
  await expect(
    page.getByRole("button", { name: "Cloud & DevOps", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "SQA & Testing", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.goBack();
  await expect(
    page.getByRole("button", { name: "Cloud & DevOps", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("searchbox", { name: "Search projects" })
    .fill("postgresql");
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card h3")).toHaveText("CloudCrew");
  await page.getByRole("searchbox").fill("unmatched-query");
  await expect(
    page.getByRole("heading", { name: "No projects match that search." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".project-card")).toHaveCount(9);
});

test("all case-study routes and accurate security boundaries", async ({
  page,
  request,
}, testInfo) => {
  for (const slug of [
    "clearstep",
    "claimguard",
    "cloudcrew",
    "cipherrelay",
    "cross-browser-qa",
    "edime",
    "rag-pipeline",
    "ecommerce-qa",
    "mindplay",
  ]) {
    const response = await request.get(`/projects/${slug}`);
    expect(response.status(), slug).toBe(200);
    expect(await response.text()).toContain("Follow the flow.");
  }
  await page.goto("/projects/cipherrelay");
  await expect(
    page.getByRole("link", { name: /Open my Cloud & DevOps CV/ }),
  ).toHaveAttribute("href", "/resume/Usman-Tariq-Cloud-DevOps-CV.pdf");
  await expect(
    page.getByText(
      "Static identity ECDH means the protocol has no forward secrecy.",
      { exact: true },
    ),
  ).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("case-study.png"),
    fullPage: true,
  });
  const missing = await page.goto("/projects/does-not-exist");
  expect(missing?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: /Explore the work/ }),
  ).toBeVisible();
});

test("recovery walkthrough, reset, and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const playground = page.locator("#playground");
  await expect(playground.getByRole("heading", { level: 3 })).toHaveText(
    "Submit a task",
  );
  for (const title of [
    "A worker claims it",
    "Imagine the worker stops",
    "Another worker takes over",
    "The result is saved",
  ]) {
    await playground.getByRole("button", { name: "Next step" }).click();
    await expect(playground.getByRole("heading", { level: 3 })).toHaveText(
      title,
    );
  }
  await expect(
    playground.getByRole("button", { name: "Walkthrough complete" }),
  ).toBeDisabled();
  await playground.getByRole("button", { name: "Reset" }).click();
  await expect(playground.getByRole("heading", { level: 3 })).toHaveText(
    "Submit a task",
  );
  expect(
    await page
      .locator(".hero-star")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});
