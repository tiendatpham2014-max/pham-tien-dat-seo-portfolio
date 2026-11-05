import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { chromium } from "@playwright/test";

if (!existsSync("out/index.html")) {
  console.error("Build the static site with npm run build before the performance audit.");
  process.exit(1);
}

const reportDir = resolve(".perf-reports");
const port = 4174;
const origin = `http://127.0.0.1:${port}`;
const chromePath = [
  process.env.CHROME_PATH,
  chromium.executablePath(),
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].find((path) => path && existsSync(path));

if (!chromePath) {
  console.error("Chromium was not found. Run npx playwright install chromium.");
  process.exit(1);
}

const server = spawn(process.execPath, ["scripts/preview-export.mjs"], {
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore",
});

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      if ((await fetch(origin)).ok) return;
    } catch { /* The preview server is still starting. */ }
    await new Promise((done) => setTimeout(done, 250));
  }
  throw new Error("The static preview server did not start.");
}

try {
  await waitForServer();
  await mkdir(reportDir, { recursive: true });
  const chrome = await chromeLauncher.launch({ chromePath, chromeFlags: ["--headless=new", "--no-sandbox"] });
  try {
    const result = await lighthouse(`${origin}/`, {
      port: chrome.port,
      logLevel: "error",
      output: "json",
      onlyCategories: ["performance"],
      formFactor: "mobile",
    });
    if (!result) throw new Error("Lighthouse did not return a result.");
    const { lhr } = result;
    const summary = {
      route: "/",
      device: "simulated mobile",
      score: Math.round((lhr.categories.performance.score ?? 0) * 100),
      lcpMs: Math.round(lhr.audits["largest-contentful-paint"].numericValue),
      tbtMs: Math.round(lhr.audits["total-blocking-time"].numericValue),
      cls: Number(lhr.audits["cumulative-layout-shift"].numericValue.toFixed(3)),
      transferKiB: Math.round(lhr.audits["total-byte-weight"].numericValue / 1024),
    };
    await writeFile(resolve(reportDir, "mobile-vi.json"), JSON.stringify(lhr, null, 2));
    await writeFile(resolve(reportDir, "summary.json"), JSON.stringify(summary, null, 2) + "\n");
    console.log(`Lighthouse mobile VI: score ${summary.score}, LCP ${summary.lcpMs}ms, TBT ${summary.tbtMs}ms, CLS ${summary.cls}, transfer ${summary.transferKiB}KiB.`);
    console.log("Lab data only; INP requires real user interactions and field data.");
    if (summary.transferKiB > 3200 || summary.cls > 0.1) {
      throw new Error("Mobile performance budget exceeded: transfer must stay at or below 3200KiB and CLS at or below 0.1.");
    }
  } finally {
    await chrome.kill();
  }
} finally {
  server.kill();
}
// Lighthouse may retain open diagnostic handles after Chrome has exited.
process.exit(0);
