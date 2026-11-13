import { expect, test } from "@playwright/test";

const cases = [
  { home: "/", route: "/showcase/bmw-m4-csl/", language: "vi", title: "Đam mê xe của Đạt" },
  { home: "/en/", route: "/en/showcase/bmw-m4-csl/", language: "en", title: "Dat’s passion for cars" },
];

for (const { home, route, language, title } of cases) {
  test(`BMW page is standalone at ${route}`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", language);
    await expect(page.locator("h1")).toHaveText(title);
    await expect(page.locator("#stage")).toBeVisible();
    await expect(page.locator("iframe")).toHaveCount(0);
    await expect(page.locator(".showcase-nav a").first()).toHaveAttribute("href", home);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://datpham.io.vn${route}`);
    expect(await page.locator(".rail").evaluate((el) => getComputedStyle(el).overflowY)).toBe("visible");
    const model = await page.request.get("/showcase/bmw-m4-csl/app/assets/car.glb");
    expect(model.status()).toBe(200);
    expect(errors).toEqual([]);
  });

  test(`Homepage ${home} links from Nav to the BMW page`, async ({ page }) => {
    await page.goto(home, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#about .about-showcase")).toHaveCount(0);
    await expect(page.locator(".hero-social .hero-garage")).toHaveCount(0);
    await expect(page.locator(".desktop-nav .nav-garage")).toHaveAttribute("href", route);
    await expect(page.locator(".mobile-nav .nav-garage")).toHaveAttribute("href", route);
  });
}

test("BMW theme switch preserves selected theme", async ({ page }) => {
  await page.goto("/showcase/bmw-m4-csl/", { waitUntil: "domcontentloaded" });
  await page.locator("#theme-toggle").click();
  const theme = await page.locator("html").getAttribute("data-theme");
  expect(["dark", "light"]).toContain(theme);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
});

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
