import { existsSync, readFileSync } from "node:fs";
import { resolve, sep } from "node:path";

const outputDir = resolve(process.argv[2] ?? "out");
const pagePath = resolve(outputDir, "index.html");
const siteOrigin = "https://datpham.io.vn";
const issues = [];
const assert = (condition, message) => {
  if (!condition) issues.push(message);
};

if (!existsSync(pagePath)) {
  console.error(`Static export missing: ${pagePath}. Run npm run build first.`);
  process.exit(1);
}

const html = readFileSync(pagePath, "utf8");
const attribute = (tag, name) => {
  const match = tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return match?.[2] ?? null;
};
const tags = (name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(([tag]) => tag);
const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]));

assert(tags("h1").length === 1, `Expected exactly one H1; found ${tags("h1").length}.`);
assert(attribute(tags("html")[0] ?? "", "lang") === "vi", "HTML needs a Vietnamese default lang attribute.");

const title = html.match(/<title>(.*?)<\/title>/i)?.[1] ?? "";
assert(title.includes("Phạm Tiến Đạt"), "The page title is missing the portfolio owner's name.");
const meta = tags("meta");
assert(meta.some((tag) => attribute(tag, "name") === "description" && attribute(tag, "content")), "Meta description is missing.");
assert(meta.some((tag) => attribute(tag, "property") === "og:image" && attribute(tag, "content")), "Open Graph image is missing.");
assert(meta.some((tag) => attribute(tag, "name") === "twitter:image" && attribute(tag, "content")), "Twitter image is missing.");

const canonicalTag = tags("link").find((tag) => attribute(tag, "rel") === "canonical");
const canonical = canonicalTag && attribute(canonicalTag, "href");
assert(canonical === `${siteOrigin}/`, `Canonical URL should be ${siteOrigin}/; found ${canonical || "none"}.`);

const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
assert(jsonLd.length > 0, "JSON-LD structured data is missing.");
for (const [, value] of jsonLd) {
  try { JSON.parse(value); } catch { issues.push("JSON-LD is not valid JSON."); }
}

let checkedAssets = 0;
let checkedAnchors = 0;
for (const tag of [...tags("a"), ...tags("link"), ...tags("script"), ...tags("img")]) {
  const raw = attribute(tag, "href") ?? attribute(tag, "src");
  if (!raw || /^(mailto:|tel:|data:|javascript:)/i.test(raw)) continue;
  let target;
  try { target = new URL(raw.replaceAll("&amp;", "&"), `${siteOrigin}/`); }
  catch { issues.push(`Invalid URL in export: ${raw}`); continue; }
  if (target.origin !== siteOrigin) continue;

  if (target.hash && (target.pathname === "/" || target.pathname === "")) {
    const id = decodeURIComponent(target.hash.slice(1));
    if (id) {
      checkedAnchors++;
      assert(ids.has(id), `Link target #${id} does not exist.`);
    }
  }

  const pathname = decodeURIComponent(target.pathname);
  if (pathname === "/") continue;
  const relative = pathname.replace(/^\/+/, "");
  const candidate = resolve(outputDir, relative);
  assert(candidate.startsWith(outputDir + sep), `Asset path escapes static export: ${pathname}`);
  if (!candidate.startsWith(outputDir + sep)) continue;
  const present = existsSync(candidate) || existsSync(resolve(candidate, "index.html")) || existsSync(`${candidate}.html`);
  checkedAssets++;
  assert(present, `Local asset or route is missing: ${pathname}`);
}

const robotsPath = resolve(outputDir, "robots.txt");
const sitemapPath = resolve(outputDir, "sitemap.xml");
assert(existsSync(robotsPath), "robots.txt is missing from the export.");
assert(existsSync(sitemapPath), "sitemap.xml is missing from the export.");
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, "utf8");
  assert(robots.includes(`${siteOrigin}/sitemap.xml`), "robots.txt does not point to the canonical sitemap.");
}
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf8");
  assert(sitemap.includes(`<loc>${siteOrigin}/</loc>`), "sitemap.xml does not contain the canonical homepage.");
}

if (issues.length) {
  console.error(`Static site audit failed (${issues.length}):\n${issues.map((issue) => `  - ${issue}`).join("\n")}`);
  process.exit(1);
}
console.log(`Static site audit passed: metadata, structured data, sitemap, robots, ${checkedAnchors} anchors and ${checkedAssets} local references.`);
