import { expect, test } from "@playwright/test";

test("kinetic details are finite mouse accents with stable semantic text and targets", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const phrase = page.locator(".hero-last > em");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "make sense.",
  );
  await expect(phrase).toHaveText("make sense.");

  if (info.project.name === "mobile") {
    await expect(page.locator(".kinetic-letter-copy")).toHaveCount(0);
    await expect(page.locator(".kinetic-edge")).toHaveCount(0);
  } else {
    await expect(page.locator(".kinetic-letter-copy")).toHaveCount(2);
    await expect(phrase.locator(".kinetic-letter-copy")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    await phrase.hover();
    await expect(phrase).toHaveAttribute("data-kinetic-active", "true");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "make sense.",
    );
    // Staying over the phrase does not start an endless animation.
    await expect(phrase).not.toHaveAttribute("data-kinetic-active", "true");
    const card = page.locator(".project-card").first();
    await card.hover();
    await expect(card).toHaveAttribute("data-edge-active", "true");

    const cv = page.locator(".resume-card").first();
    await cv.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    const before = await cv.boundingBox();
    await cv.hover();
    await expect(cv).toHaveAttribute("data-edge-active", "true");
    const after = await cv.boundingBox();
    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    expect(Math.abs(after!.y - before!.y)).toBeLessThan(0.5);
    expect(Math.abs(after!.x - before!.x)).toBeLessThan(0.5);
  }
  expect(errors).toEqual([]);
});

test("live reduced-motion changes clean up decorative DOM and preserve atlas navigation", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  if (info.project.name === "desktop") {
    await expect(page.locator(".kinetic-letter-copy")).toHaveCount(2);
    await page.locator(".project-card").first().hover();
    await expect(page.locator(".kinetic-edge")).toHaveCount(9);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".kinetic-letter-copy")).toHaveCount(0);
  await expect(page.locator(".kinetic-edge")).toHaveCount(0);
  await expect(page.locator(".hero-last > em")).toHaveText("make sense.");
  await page.getByRole("button", { name: "Map view", exact: true }).click();
  const atlas = page.getByRole("region", { name: "Project atlas" });
  await atlas.getByRole("button", { name: "Security", exact: true }).click();
  await expect(atlas.locator(".atlas-line-active")).toHaveCount(1);
  expect(
    await atlas
      .locator(".atlas-line-active")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  const cipher = atlas.getByRole("link", { name: /CipherRelay/ });
  await cipher.focus();
  await expect(cipher).toBeFocused();
  await expect(cipher).toHaveAttribute("href", "/projects/cipherrelay");
  await page.getByRole("button", { name: "Cards", exact: true }).click();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".kinetic-letter-copy")).toHaveCount(
    info.project.name === "desktop" ? 2 : 0,
  );
  await expect(page.locator(".project-card")).toHaveCount(6);
  if (info.project.name === "desktop") {
    const remounted = page.locator(".project-card").first();
    await remounted.hover();
    await expect(remounted).toHaveAttribute("data-edge-active", "true");
  }
  expect(errors).toEqual([]);
});

test("atlas traces truthful theme mappings and adapts to its container", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("button", { name: "Map view", exact: true }).click();
  const atlas = page.getByRole("region", { name: "Project atlas" });
  const connectors = atlas.locator(".atlas-connectors");
  await expect(atlas.getByRole("link")).toHaveCount(6);
  await expect(connectors.locator(".atlas-line-base")).toHaveCount(6);
  await expect(connectors).toHaveAttribute("aria-hidden", "true");

  for (const [theme, paths] of [
    ["Reliability", ["claimguard", "cloudcrew", "ecommerce-qa"]],
    ["AI & interaction", ["clearstep", "claimguard", "mindplay"]],
    ["Security", ["cipherrelay"]],
  ] as const) {
    await atlas.getByRole("button", { name: theme, exact: true }).click();
    await expect(
      atlas.getByRole("button", { name: theme, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(connectors.locator(".atlas-line-active")).toHaveCount(
      paths.length,
    );
    await expect
      .poll(async () =>
        atlas
          .locator('li[data-connected="true"] a')
          .evaluateAll((links) =>
            links.map((link) => link.getAttribute("href")).sort(),
          ),
      )
      .toEqual(paths.map((slug) => `/projects/${slug}`).sort());
    expect(
      await connectors
        .locator(".atlas-line-active")
        .first()
        .evaluate(
          (element) => getComputedStyle(element).animationIterationCount,
        ),
    ).toBe("1");
  }

  const geometry = await connectors.evaluate((svg) => ({
    viewBox: svg.getAttribute("viewBox"),
    paths: Array.from(svg.querySelectorAll("path"), (path) =>
      path.getAttribute("d"),
    ),
  }));
  expect(geometry.viewBox).not.toMatch(/NaN|Infinity/);
  expect(geometry.paths.length).toBe(7);
  for (const path of geometry.paths) {
    expect(path).toMatch(/^M /);
    expect(path).not.toMatch(/NaN|Infinity/);
  }
  const cipher = atlas.getByRole("link", { name: /CipherRelay/ });
  await cipher.focus();
  await expect(connectors.locator('g[data-focused="true"]')).toHaveCount(1);

  await atlas
    .getByRole("button", { name: "AI & interaction", exact: true })
    .click();
  await atlas.screenshot({ path: info.outputPath("project-atlas.png") });
  // The narrow presentation is selected by atlas width, not user-agent detection.
  await atlas.evaluate((element) => {
    (element as HTMLElement).style.width = "min(100%, 600px)";
  });
  await expect(connectors).not.toBeVisible();
  await expect
    .poll(async () =>
      atlas.evaluate((element) => element.scrollWidth <= element.clientWidth),
    )
    .toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(atlas.getByRole("link")).toHaveCount(6);
  expect(errors).toEqual([]);
});
