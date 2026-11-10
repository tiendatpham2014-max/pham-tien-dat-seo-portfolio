import { expect, test } from "@playwright/test";

for (const { route, theme, width, height } of [
  { route: "/", theme: "dark", width: 390, height: 844 },
  { route: "/en/", theme: "light", width: 768, height: 1024 },
  { route: "/", theme: "dark", width: 1920, height: 1080 },
  { route: "/en/", theme: "light", width: 2560, height: 1440 },
]) {
  test(`3D scroll stays live at ${width}×${height} in ${theme} ${route}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.addInitScript((nextTheme) => localStorage.setItem("dat-seo-theme", nextTheme), theme);
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#intro-splash")).toBeHidden({ timeout: 8_000 });

    const atlas = await page.locator("#atlas").evaluate((section) => ({
      top: section.getBoundingClientRect().top + scrollY,
      travel: section.offsetHeight - section.querySelector(".atlas-sticky").offsetHeight,
    }));
    for (const [progress, stage] of [[.25, "1"], [.75, "3"], [.99, "4"]]) {
      await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), atlas.top + atlas.travel * progress);
      await expect(page.locator("#atlas")).toHaveAttribute("data-stage", stage);
      await expect(page.locator(".atlas-station[aria-hidden='false'] h3")).toBeVisible();
    }
    await expect(page.locator(".atlas-canvas")).toHaveClass(/is-ready/);
    const canvas = await page.locator(".atlas-canvas canvas").evaluate((element) => ({
      width: element.getBoundingClientRect().width,
      height: element.getBoundingClientRect().height,
      pixels: element.width * element.height,
      overflow: document.documentElement.scrollWidth - innerWidth,
    }));
    expect(canvas.width).toBeGreaterThan(width * .7);
    expect(canvas.height).toBeGreaterThan(height * .5);
    expect(canvas.pixels).toBeLessThanOrEqual(6_100_000);
    expect(canvas.overflow).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);

    if (width === 1920) {
      await page.setViewportSize({ width: 3840, height: 2160 });
      const fullscreen = await page.locator("#atlas").evaluate((section) => ({
        top: section.getBoundingClientRect().top + scrollY,
        travel: section.offsetHeight - section.querySelector(".atlas-sticky").offsetHeight,
      }));
      await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), fullscreen.top + fullscreen.travel * .99);
      await expect(page.locator("#atlas")).toHaveAttribute("data-stage", "4");
      await expect.poll(() => page.locator(".atlas-canvas canvas").evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThan(3800);
      const pixels = await page.locator(".atlas-canvas canvas").evaluate((element) => element.width * element.height);
      expect(pixels).toBeLessThanOrEqual(6_100_000);
      expect(errors).toEqual([]);
    }
  });
}
