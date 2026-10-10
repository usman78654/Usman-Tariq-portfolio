import { expect, test } from "@playwright/test";

test("Mindplay walkthrough is opt-in, playable, and distinguished from evaluation", async ({
  page,
}, info) => {
  await page.goto("/projects/mindplay");
  await expect(page.getByText("94.4% / 160 trials").first()).toBeVisible();
  await page.getByRole("button", { name: "Watch video" }).click();
  const video = page.getByLabel("Mindplay visual workflow walkthrough").first();
  await expect(video).toHaveAttribute("preload", "none");
  await expect(video).toHaveAttribute("controls", "");
  await expect(video).not.toHaveAttribute("autoplay", /.*/);
  await video.evaluate((node: HTMLVideoElement) => node.load());
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.readyState))
    .toBeGreaterThanOrEqual(2);
  expect(
    await video.evaluate((node: HTMLVideoElement) => node.duration),
  ).toBeGreaterThan(19);
  await video.evaluate((node: HTMLVideoElement) => node.play());
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(0);
  await video.evaluate((node: HTMLVideoElement) => node.pause());
  await expect(
    page.getByText(/illustrated concept walkthrough/).first(),
  ).toBeVisible();
  await page.screenshot({ path: info.outputPath("mindplay-video.png") });
  await page.getByRole("button", { name: /Look inside/ }).click();
  await expect(
    page.getByText("Command arbitration", { exact: true }).first(),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Mindplay", exact: true }),
  ).toBeVisible();
});
