// Demo screenshots for the signature fix: splash mid-write, splash done,
// header logo, and Contact signature — desktop + mobile, dark + light.
// Usage: node scripts/shot-signature-demo.mjs  (serves out/ on 127.0.0.1:4179)
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const PORT = 4179;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const OUT = "signature-demo";

const server = spawn(process.execPath, ["scripts/preview-export.mjs"], {
  env: { ...process.env, PORT: String(PORT) },
  stdio: "ignore",
});

async function waitForServer() {
  for (let i = 0; i < 40; i++) {
    try {
      if ((await fetch(ORIGIN)).ok) return;
    } catch { /* starting */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("preview server did not start");
}

try {
  await waitForServer();
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  // 1. Desktop dark, splash mid-write (~0.5s after load)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/01-desktop-dark-splash-midwrite.png` });
  // 2. Desktop dark, splash finished (hero visible, header logo in place)
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${OUT}/02-desktop-dark-hero.png` });
  // 3. Contact signature, desktop dark
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/03-desktop-dark-contact.png` });
  // 4. Mobile dark, hero after splash
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${OUT}/04-mobile-dark-hero.png` });
  // 5. Mobile dark, splash mid-write on reload (proves the animation restarts)
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/05-mobile-dark-splash-midwrite.png` });
  // 6. Desktop light, hero after splash (light-theme filter on the logo)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => localStorage.setItem("dat-seo-theme", "light"));
  await page.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${OUT}/06-desktop-light-hero.png` });

  await browser.close();
  console.log(`screenshots in ${OUT}/`);
} finally {
  server.kill();
}
