import { existsSync, readFileSync } from "node:fs";
import { resolve, sep } from "node:path";

const outputDir = resolve(process.argv[2] ?? "out");
const siteOrigin = "https://datpham.io.vn";
const issues = [];
const assert = (condition, message) => { if (!condition) issues.push(message); };
const attribute = (tag, name) => {
  const match = tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return match?.[2] ?? null;
};

let checkedAssets = 0;
let checkedAnchors = 0;
for (const { language, path, titleName } of [
  { language: "vi", path: "/", titleName: "Phạm Tiến Đạt" },
  { language: "en", path: "/en/", titleName: "Dat Pham" },
]) {
  const pagePath = resolve(outputDir, path === "/" ? "index.html" : "en/index.html");
  if (!existsSync(pagePath)) {
    issues.push(`Static export missing: ${pagePath}.`);
    continue;
  }
  const html = readFileSync(pagePath, "utf8");
  const tags = (name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(([tag]) => tag);
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]));
  const label = `${language.toUpperCase()} ${path}`;
  const canonicalUrl = `${siteOrigin}${path}`;

  assert(tags("h1").length === 1, `${label}: expected exactly one H1.`);
  assert((html.match(/<h1\b[^>]*>(.*?)<\/h1>/i)?.[1] ?? "").includes(titleName), `${label}: hero copy is not rendered in the route language.`);
  assert(attribute(tags("html")[0] ?? "", "lang") === language, `${label}: wrong HTML lang.`);
  assert((html.match(/<title>(.*?)<\/title>/i)?.[1] ?? "").includes(titleName), `${label}: wrong title.`);
  const meta = tags("meta");
  assert(meta.some((tag) => attribute(tag, "name") === "description" && attribute(tag, "content")), `${label}: missing description.`);
  assert(meta.some((tag) => attribute(tag, "name") === "googlebot" && /(?:^|,)\s*max-image-preview:none\s*(?:,|$)/i.test(attribute(tag, "content") ?? "")), `${label}: Google image previews must be disabled.`);
  assert(meta.some((tag) => attribute(tag, "property") === "og:image" && attribute(tag, "content")), `${label}: missing OG image.`);
  assert(meta.some((tag) => attribute(tag, "name") === "twitter:image" && attribute(tag, "content")), `${label}: missing Twitter image.`);
  const links = tags("link");
  assert(links.some((tag) => attribute(tag, "rel") === "canonical" && attribute(tag, "href") === canonicalUrl), `${label}: wrong canonical.`);
  for (const [alternateLanguage, alternateUrl] of [["vi", `${siteOrigin}/`], ["en", `${siteOrigin}/en/`], ["x-default", `${siteOrigin}/`]]) {
    assert(links.some((tag) => attribute(tag, "rel") === "alternate" && attribute(tag, "hrefLang") === alternateLanguage && attribute(tag, "href") === alternateUrl), `${label}: missing ${alternateLanguage} alternate.`);
  }

  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  assert(jsonLd.length > 0, `${label}: missing structured data.`);
  for (const [, value] of jsonLd) {
    try {
      const data = JSON.parse(value);
      const profile = data["@graph"]?.find((entry) => entry["@type"] === "ProfilePage");
      assert(profile?.url === canonicalUrl && profile?.inLanguage === language, `${label}: wrong ProfilePage URL or language.`);
      assert(profile?.mainEntity?.["@type"] === "Person" && profile.mainEntity.name === "Phạm Tiến Đạt", `${label}: ProfilePage needs a named Person mainEntity.`);
      assert(data["@graph"]?.some((entry) => entry["@id"] === profile?.mainEntity?.["@id"] && entry["@type"] === "Person"), `${label}: ProfilePage mainEntity must resolve to the person node.`);
    } catch { issues.push(`${label}: invalid JSON-LD.`); }
  }

  for (const tag of [...tags("a"), ...links, ...tags("script"), ...tags("img")]) {
    const raw = attribute(tag, "href") ?? attribute(tag, "src");
    if (!raw || /^(mailto:|tel:|data:|javascript:)/i.test(raw)) continue;
    let target;
    try { target = new URL(raw.replaceAll("&amp;", "&"), canonicalUrl); }
    catch { issues.push(`${label}: invalid URL ${raw}`); continue; }
    if (target.origin !== siteOrigin) continue;
    if (target.hash && target.pathname === path) {
      const id = decodeURIComponent(target.hash.slice(1));
      if (id) { checkedAnchors++; assert(ids.has(id), `${label}: missing anchor #${id}.`); }
    }
    const pathname = decodeURIComponent(target.pathname);
    if (pathname === "/") continue;
    const candidate = resolve(outputDir, pathname.replace(/^\/+/, ""));
    assert(candidate.startsWith(outputDir + sep), `${label}: asset path escapes export: ${pathname}`);
    if (!candidate.startsWith(outputDir + sep)) continue;
    checkedAssets++;
    assert(existsSync(candidate) || existsSync(resolve(candidate, "index.html")) || existsSync(`${candidate}.html`), `${label}: missing local asset or route: ${pathname}`);
  }
}

const robotsPath = resolve(outputDir, "robots.txt");
const sitemapPath = resolve(outputDir, "sitemap.xml");
assert(existsSync(robotsPath), "robots.txt is missing.");
assert(existsSync(sitemapPath), "sitemap.xml is missing.");
if (existsSync(robotsPath)) {
  assert(readFileSync(robotsPath, "utf8").includes(`${siteOrigin}/sitemap.xml`), "robots.txt does not point to the sitemap.");
}
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf8");
  for (const path of ["/", "/en/"]) {
    assert(sitemap.includes(`<loc>${siteOrigin}${path}</loc>`), `sitemap.xml is missing ${path}.`);
  }
  for (const language of ["vi", "en"]) {
    assert((sitemap.match(new RegExp(`hreflang="${language}"`, "g")) ?? []).length === 2, `sitemap.xml is missing reciprocal ${language} alternates.`);
  }
}

if (issues.length) {
  console.error(`Static site audit failed (${issues.length}):\n${issues.map((issue) => `  - ${issue}`).join("\n")}`);
  process.exit(1);
}
console.log(`Static site audit passed: VI/EN metadata, structured data, sitemap, robots, ${checkedAnchors} anchors and ${checkedAssets} local references.`);
