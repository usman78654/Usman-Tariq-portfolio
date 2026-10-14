import { expect, test } from "@playwright/test";

test("footer letter ripple follows the source lines without crossing the contact divider", async ({
  page,
}, info) => {
  await page.goto("/");
  const phrase = page.locator(".contact-heading > em");
  await expect(phrase).toHaveText("something useful.");
  await expect(page.locator(".contact-heading")).toHaveAttribute(
    "href",
    /^mailto:/,
  );
  if (info.project.name === "mobile") {
    await expect(phrase.locator(".kinetic-letter-copy")).toHaveCount(0);
    await phrase.scrollIntoViewIfNeeded();
    expect(
      await phrase.evaluate(
        (el) =>
          el.getBoundingClientRect().bottom <
          document.querySelector(".contact-bottom")!.getBoundingClientRect()
            .top,
      ),
    ).toBe(true);
    return;
  }
  for (const width of [1440, 1024, 768, 640, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.mouse.move(0, 0);
    await phrase.scrollIntoViewIfNeeded();
    await phrase.hover();
    await expect(phrase).toHaveAttribute("data-kinetic-active", "true");
    for (const time of [0, 180, 320, 460]) {
      const geometry = await phrase.evaluate((element, time) => {
        for (const animation of element.getAnimations({ subtree: true })) {
          animation.pause();
          animation.currentTime = time;
        }
        const node = element.firstChild!;
        let offset = 0;
        const positions = Array.from(
          element.querySelectorAll(".kinetic-letter-word"),
          (word) => {
            const text = Array.from(
              word.querySelectorAll<HTMLElement>(".kinetic-letter"),
              (letter) => letter.dataset.letter,
            ).join("");
            const range = document.createRange();
            range.setStart(node, offset);
            range.setEnd(node, offset + text.length);
            offset += text.length + 1;
            return {
              original: range.getBoundingClientRect().top,
              copy: word.getBoundingClientRect().top,
            };
          },
        );
        const divider = document
          .querySelector(".contact-bottom")!
          .getBoundingClientRect().top;
        const letters = Array.from(
          element.querySelectorAll(".kinetic-letter"),
          (letter) => letter.getBoundingClientRect().bottom,
        );
        return {
          positions,
          divider,
          lowest: Math.max(...letters),
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      }, time);
      // Relative line placement is independent of font ascent/line-box metrics.
      expect(
        Math.abs(
          geometry.positions[1].copy -
            geometry.positions[0].copy -
            (geometry.positions[1].original - geometry.positions[0].original),
        ),
      ).toBeLessThan(1);
      expect(geometry.lowest).toBeLessThan(geometry.divider - 8);
      expect(geometry.overflow).toBe(false);
    }
    if (width === 1440 || width === 320)
      await page
        .locator("#contact")
        .screenshot({ path: info.outputPath(`footer-ripple-${width}.png`) });
    await page.mouse.move(0, 0);
    await expect(phrase).not.toHaveAttribute("data-kinetic-active", "true");
  }
});

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
    ["Reliability", ["claimguard", "forgequeue", "ecommerce-qa"]],
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
