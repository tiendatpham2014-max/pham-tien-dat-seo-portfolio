import { expect, test } from "@playwright/test";

const layoutCases = [
  { route: "/", language: "vi", theme: "dark", width: 390, height: 844 },
  { route: "/", language: "vi", theme: "light", width: 1280, height: 800 },
  { route: "/en/", language: "en", theme: "dark", width: 1280, height: 800 },
  { route: "/en/", language: "en", theme: "light", width: 390, height: 844 },
  { route: "/en/", language: "en", theme: "light", width: 768, height: 1024 },
];

for (const { route, language, theme, width, height } of layoutCases) {
  test(`${language}/${theme} layout at ${width}×${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript((nextTheme) => localStorage.setItem("dat-seo-theme", nextTheme), theme);
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveAttribute("lang", language);
    if (theme === "light") await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    else await expect(page.locator("html")).not.toHaveAttribute("data-theme", "light");
    await expect(page.locator("#hero-title")).toHaveText(language === "vi" ? /phạm tiến đạt/i : /dat pham/i);
    await expect(page.locator("#intro-splash")).toBeHidden();
    await expect(page.locator(".brand-signature")).toHaveAttribute("src", /signature-mark\.svg$/);
    await expect(page.locator(".intro-signature")).toHaveCount(1);
    if (theme === "light") {
      expect(await page.locator(".brand-signature").evaluate((image) => getComputedStyle(image).filter)).not.toBe("none");
    }
    await page.evaluate(() => document.fonts.ready);

    const layout = await page.evaluate(() => {
      const heading = document.querySelector("#hero-title");
      const header = document.querySelector(".site-header");
      const contact = document.querySelector("#contact");
      const rect = heading.getBoundingClientRect();
      return {
        viewport: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        heroCenter: rect.left + rect.width / 2,
        heroVisible: rect.width > 0 && rect.height > 0,
        headerBottom: header.getBoundingClientRect().bottom,
        contactHeight: contact.getBoundingClientRect().height,
      };
    });
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewport + 2);
    expect(Math.abs(layout.heroCenter - layout.viewport / 2)).toBeLessThan(25);
    expect(layout.heroVisible).toBe(true);
    expect(layout.headerBottom).toBeLessThan(height / 3);
    expect(layout.contactHeight).toBeGreaterThan(100);
    await expect(page.locator("#contact a[href^='mailto:']")).toHaveCount(1);
    await expect(page.locator("#contact a[href*='linkedin.com']")).toHaveCount(1);
  });
}

test("VI/EN and dark/light controls preserve the current theme", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator("#theme-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.locator("a[data-lang='en']").click();
  await expect(page).toHaveURL(/\/en\//);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("#hero-title")).toHaveText(/dat pham/i);
});

for (const { route, width } of [{ route: "/", width: 1280 }, { route: "/en/", width: 390 }]) {
  test(`${route} scene handoff reverses and evidence remains interactive at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#intro-splash")).toBeHidden({ timeout: 8_000 });

    const atlas = await page.locator("#atlas").evaluate((section) => ({
      top: section.getBoundingClientRect().top + scrollY,
      travel: section.offsetHeight - section.querySelector(".atlas-sticky").offsetHeight,
    }));
    await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), atlas.top + atlas.travel * .98);
    await expect.poll(() => page.locator("#atlas").evaluate((section) => Number(section.style.getPropertyValue("--atlas-outro")))).toBeGreaterThan(.8);

    const workTop = await page.locator("#work").evaluate((section) => section.getBoundingClientRect().top + scrollY);
    await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), workTop - 80);
    await expect.poll(() => page.locator("#work").evaluate((section) => Number(section.style.getPropertyValue("--work-entry")))).toBeGreaterThan(.95);
    await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), workTop - 800 * 1.2);
    await expect.poll(() => page.locator("#work").evaluate((section) => Number(section.style.getPropertyValue("--work-entry")))).toBeLessThan(.05);

    await page.locator(".evidence-poster").scrollIntoViewIfNeeded();
    const metric = page.locator(".evidence-poster-metric");
    await metric.evaluate((element) => { element.dataset.testIdentity = "same-node"; });
    await expect.poll(() => metric.locator(".evidence-poster-bar b").first().evaluate((bar) => bar.getBoundingClientRect().width)).toBeGreaterThan(1);
    await page.locator(".evidence-poster-picker button").nth(2).click();
    await expect(page.locator(".evidence-poster-picker button").nth(2)).toHaveAttribute("aria-pressed", "true");
    await expect(metric).toHaveAttribute("data-test-identity", "same-node");
    await expect(metric).toHaveClass(/evidence-poster-ctr/);
    await expect.poll(() => metric.locator(".evidence-poster-bar b").first().evaluate((bar) => bar.getBoundingClientRect().width)).toBeGreaterThan(1);
  });
}

test("Vietnamese headings keep their diacritics after the text reveal", async ({ page }) => {
  await page.setViewportSize({ width: 625, height: 800 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#intro-splash")).toBeHidden({ timeout: 8_000 });
  await expect(page.locator("#hero-title")).toHaveCSS("clip-path", "none");
  await expect(page.locator("#hero-title")).toHaveCSS("overflow", "visible");
  await page.locator("#about").evaluate((section) => window.scrollTo({ top: section.offsetTop, behavior: "instant" }));
  await expect(page.locator("#about-title")).toHaveCSS("opacity", "1");
  await expect(page.locator("#about-title")).toHaveCSS("clip-path", "none");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#hero-title")).toHaveCSS("clip-path", "none");
});

for (const { route, width } of [{ route: "/", width: 1280 }, { route: "/en/", width: 390 }]) {
  test(`${route} text reveal follows scroll in both directions at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#intro-splash")).toBeHidden({ timeout: 8_000 });
    const bounds = await page.locator(".about-copy").evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY };
    });
    const opacity = async () => page.locator("#about-title").evaluate((element) => Number(getComputedStyle(element).opacity));
    const go = async (top) => {
      await page.evaluate((position) => window.scrollTo({ top: position, behavior: "instant" }), top);
      await page.waitForTimeout(100);
    };

    await go(bounds.top - 800 * .99);
    expect(await opacity()).toBeLessThan(.05);
    await go(bounds.top - 800 * .74);
    expect(await opacity()).toBeGreaterThan(.2);
    expect(await opacity()).toBeLessThan(.95);
    await go(bounds.top - 800 * .49);
    expect(await opacity()).toBeGreaterThan(.98);
    await go(bounds.bottom - 800 * .01);
    expect(await opacity()).toBeLessThan(.05);
    await go(bounds.top - 800 * .49);
    expect(await opacity()).toBeGreaterThan(.98);
  });
}

test("signature animation restarts when the page is refreshed", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".intro-signature")).toHaveAttribute("src", /\?v=\d+$/);
  const firstSource = await page.locator(".intro-signature").getAttribute("src");
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator(".intro-signature")).toHaveAttribute("src", /\?v=\d+$/);
  expect(await page.locator(".intro-signature").getAttribute("src")).not.toBe(firstSource);
  await expect(page.locator("#intro-splash")).toBeHidden({ timeout: 8_000 });
});

test("scroll swaps four Skills chapters in one stage and advances the atlas", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#intro-splash")).toBeHidden({ timeout: 8_000 });
  await expect(page.locator("#skills")).toHaveClass(/is-scroll-enhanced/);

  for (const [sectionId, count, selector] of [
    ["skills", 4, ".skill-sequence-item.is-current"],
    ["atlas", 5, null],
  ]) {
    const dimensions = await page.locator(`#${sectionId}`).evaluate((section) => ({
      top: section.getBoundingClientRect().top + window.scrollY,
      travel: section.offsetHeight - section.querySelector(section.id === "skills" ? ".skill-sequence" : ".atlas-sticky").offsetHeight,
    }));
    for (let index = 0; index < count; index++) {
      const progress = (index + 0.5) / count;
      await page.evaluate((target) => window.scrollTo({ top: target, behavior: "instant" }), dimensions.top - (sectionId === "skills" ? 78 : 0) + dimensions.travel * progress);
      if (sectionId === "skills") {
        await expect(page.locator(`#${sectionId} ${selector}`)).toHaveCount(1);
        await expect.poll(() => page.locator(`#${sectionId} ${selector}`).evaluate((item) => [...item.parentElement.children].indexOf(item))).toBe(index);
        await expect(page.locator("#skills .skill-sequence-item[aria-hidden='false']")).toHaveCount(1);
      } else {
        await expect(page.locator("#atlas")).toHaveAttribute("data-stage", String(index));
      }
    }
  }
  await expect.poll(() => page.locator("#atlas").evaluate((section) =>
    section.querySelector(".atlas-canvas")?.classList.contains("is-ready") ||
    getComputedStyle(section.querySelector(".atlas-fallback")).visibility !== "hidden"
  )).toBe(true);
});

test("reduced motion keeps all four skill groups readable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#intro-splash")).toBeHidden();
  await expect(page.locator("#skills")).not.toHaveClass(/is-scroll-enhanced/);
  await expect(page.locator("#skills .skill-sequence-item")).toHaveCount(4);
  await expect(page.locator("#atlas .atlas-mobile article")).toHaveCount(5);
});
