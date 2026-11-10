import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "@playwright/test";

const port = 4271;
const origin = `http://127.0.0.1:${port}`;
const preview = spawn(process.execPath, ["scripts/preview-export.mjs"], {
  cwd: resolve("."),
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore",
});

async function waitForPreview() {
  for (let attempt = 0; attempt < 60; attempt++) {
    if (preview.exitCode !== null) throw new Error("Static preview exited before capture.");
    try {
      if ((await fetch(origin)).ok) return;
    } catch { /* The server is still starting. */ }
    await delay(100);
  }
  throw new Error("Static preview did not start in time.");
}

let browser;
try {
  await waitForPreview();
  browser = await chromium.launch({
    headless: true,
    ...(process.env.SOCIAL_PREVIEW_BROWSER ? { channel: process.env.SOCIAL_PREVIEW_BROWSER } : {}),
  });
  for (const { route, filename } of [
    { route: "/", filename: "og-image.png" },
    { route: "/en/", filename: "og-image-en.png" },
  ]) {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
      reducedMotion: "no-preference",
    });
    await page.addInitScript(() => localStorage.setItem("dat-seo-theme", "dark"));
    await page.goto(origin + route, { waitUntil: "domcontentloaded" });
    await page.locator("#intro-splash").waitFor({ state: "hidden", timeout: 10_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    const image = await page.screenshot({ type: "png", animations: "disabled", caret: "hide" });
    if (image.byteLength < 20_000) throw new Error(`Captured ${route} social preview looks incomplete.`);
    await writeFile(resolve("public", filename), image);
    console.log(`Updated public/${filename} from ${route} (${image.byteLength} bytes).`);
    await page.close();
  }
} finally {
  await browser?.close();
  preview.kill();
}
