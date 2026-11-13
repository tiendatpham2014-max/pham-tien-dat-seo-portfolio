import { expect, test } from "@playwright/test";

const cases = [
  { home: "/", route: "/showcase/bmw-m4-csl/", language: "vi" },
  { home: "/en/", route: "/en/showcase/bmw-m4-csl/", language: "en" },
];

for (const { home, route, language } of cases) {
  test(`BMW showcase loads from ${route} without a client error`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(route, { waitUntil: "domcontentloaded" });

    await expect(page.locator(".showcase-title")).toBeVisible();
    await expect(page.locator(".showcase-frame")).toHaveAttribute("src", "/showcase/bmw-m4-csl/app/");
    await expect(page.frameLocator(".showcase-frame").locator("#stage")).toBeVisible({ timeout: 15_000 });
    await expect(page.locator("#desktop-nav a").first()).toHaveAttribute("href", `${home}#about`);
    await expect(page.locator(".footer-links a").first()).toHaveAttribute("href", `${home}#work`);
    await expect(page.locator('[data-lang="en"]')).toHaveAttribute("href", "/en/showcase/bmw-m4-csl/");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://datpham.io.vn${route}`);
    await expect(page.locator("html")).toHaveAttribute("lang", language);
    expect(errors).toEqual([]);
  });

  test(`Homepage ${home} links to the BMW showcase`, async ({ page }) => {
    await page.goto(home, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#about .about-showcase a")).toHaveAttribute("href", route);
  });
}

for (const { width, height, maxFont } of [
  { width: 768, height: 560, maxFont: 24 },
  { width: 390, height: 640, maxFont: 22 },
]) test(`Menu stays compact and scrollable at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#intro-splash")).toBeHidden({ timeout: 6_000 });
  await page.locator("#menu-toggle").click();
  const menu = page.locator("#mobile-nav");
  await expect(menu).toBeVisible();
  await expect.poll(() => menu.evaluate((element) => element.getBoundingClientRect().right)).toBeLessThanOrEqual(width);
  const metrics = await menu.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      right: rect.right,
      fontSize: parseFloat(getComputedStyle(element.querySelector("a")).fontSize),
      overflowY: getComputedStyle(element).overflowY,
    };
  });
  expect(metrics.width).toBeLessThanOrEqual(360);
  expect(metrics.right).toBeLessThanOrEqual(width);
  expect(metrics.fontSize).toBeLessThanOrEqual(maxFont);
  expect(metrics.overflowY).toBe("auto");
});
