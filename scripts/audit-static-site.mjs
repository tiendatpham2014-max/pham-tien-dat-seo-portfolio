import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, sep } from "node:path";

const outputDir = resolve(process.argv[2] ?? "out");
const siteOrigin = "https://datpham.io.vn";
const socialImageUrl = (filename) => {
  const hash = createHash("sha256").update(readFileSync(resolve("public", filename))).digest("hex").slice(0, 12);
  return `${siteOrigin}/${filename}?v=${hash}`;
};
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
  const expectedSocialImage = socialImageUrl(language === "vi" ? "og-image.png" : "og-image-en.png");

  assert(tags("h1").length === 1, `${label}: expected exactly one H1.`);
  assert((html.match(/<h1\b[^>]*>(.*?)<\/h1>/i)?.[1] ?? "").includes(titleName), `${label}: hero copy is not rendered in the route language.`);
  assert(attribute(tags("html")[0] ?? "", "lang") === language, `${label}: wrong HTML lang.`);
  assert((html.match(/<title>(.*?)<\/title>/i)?.[1] ?? "").includes(titleName), `${label}: wrong title.`);
  const meta = tags("meta");
  assert(meta.some((tag) => attribute(tag, "name") === "description" && attribute(tag, "content")), `${label}: missing description.`);
  assert(meta.some((tag) => attribute(tag, "name") === "googlebot" && /(?:^|,)\s*max-image-preview:none\s*(?:,|$)/i.test(attribute(tag, "content") ?? "")), `${label}: Google image previews must be disabled.`);
  assert(meta.some((tag) => attribute(tag, "property") === "og:image" && attribute(tag, "content") === expectedSocialImage), `${label}: social image URL does not match the current screenshot.`);
  assert(meta.some((tag) => attribute(tag, "name") === "twitter:image" && attribute(tag, "content") === expectedSocialImage), `${label}: Twitter image URL does not match the current screenshot.`);
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


const resumePath = resolve(outputDir, "resume/index.html");
assert(existsSync(resumePath), "Resume: static HTML is missing.");
if (existsSync(resumePath)) {
  const html = readFileSync(resumePath, "utf8");
  const tags = (name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(([tag]) => tag);
  const meta = tags("meta"), links = tags("link");
  assert(attribute(tags("html")[0] ?? "", "lang") === "en", "Resume: HTML language must be English.");
  assert(tags("h1").length === 1 && /Dat Pham/.test(html.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1] ?? ""), "Resume: expected one named H1.");
  assert(links.some(tag => attribute(tag,"rel")==="canonical" && attribute(tag,"href")===siteOrigin+"/resume/"), "Resume: canonical URL is wrong.");
  for (const name of ["description","robots","googlebot","theme-color"]) assert(meta.some(tag=>attribute(tag,"name")===name && attribute(tag,"content")), `Resume: missing ${name} metadata.`);
  assert(meta.some(tag=>attribute(tag,"property")==="og:description" && attribute(tag,"content")), "Resume: Open Graph description is missing.");
  assert(meta.some(tag=>attribute(tag,"name")==="googlebot" && (attribute(tag,"content")??"").includes("max-image-preview:none")), "Resume: Google image preview policy is missing.");
  assert(links.some(tag=>attribute(tag,"rel")==="apple-touch-icon"), "Resume: Apple touch icon is missing.");
  assert(links.some(tag=>attribute(tag,"rel")==="icon" && attribute(tag,"type")==="image/png"), "Resume: PNG icon fallback is missing.");
  const data = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let profileFound=false;
  for (const [,value] of data) {
    try {
      const schema=JSON.parse(value);
      if(schema["@type"]==="ProfilePage") profileFound=schema.url===siteOrigin+"/resume/" && schema.inLanguage==="en" && schema.mainEntity?.["@type"]==="Person" && schema.mainEntity?.name==="Phạm Tiến Đạt";
    } catch { issues.push("Resume: invalid structured data."); }
  }
  assert(profileFound,"Resume: a named Person mainEntity is required.");
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match=>match[1]));
  for(const tag of [...tags("a"),...links,...tags("script")]) {
    const raw=attribute(tag,"href")??attribute(tag,"src");
    if(!raw||/^(mailto:|tel:|data:)/i.test(raw))continue;
    const target=new URL(raw.replaceAll("&amp;","&"),siteOrigin+"/resume/");
    if(target.origin!==siteOrigin)continue;
    if(target.pathname==="/resume/" && target.hash)assert(ids.has(target.hash.slice(1)),`Resume: missing anchor ${target.hash}.`);
    const asset=resolve(outputDir,decodeURIComponent(target.pathname).replace(/^\/+/,""));
    assert(asset.startsWith(outputDir+sep), "Resume: reference escapes static output.");
    if(asset.startsWith(outputDir+sep))assert(existsSync(asset)||existsSync(resolve(asset,"index.html")),`Resume: missing reference ${target.pathname}.`);
  }
  assert(html.includes('href="/resume/dat-pham-resume-en.pdf"'),"Resume: PDF download link is missing.");
}
const resumePdf=resolve(outputDir,"resume/dat-pham-resume-en.pdf");
assert(existsSync(resumePdf),"Resume: public PDF is missing.");
if(existsSync(resumePdf)) {
  const bytes=readFileSync(resumePdf);
  assert(bytes.length>1000 && bytes.subarray(0,5).toString()==="%PDF-" && bytes.subarray(-64).toString().includes("%%EOF"),"Resume: invalid or truncated PDF.");
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
  for (const path of ["/", "/en/", "/showcase/bmw-m4-csl/", "/en/showcase/bmw-m4-csl/", "/resume/"]) {
    assert(sitemap.includes(`<loc>${siteOrigin}${path}</loc>`), `sitemap.xml is missing ${path}.`);
  }
  for (const language of ["vi", "en"]) {
    assert((sitemap.match(new RegExp(`hreflang="${language}"`, "g")) ?? []).length === 4, `sitemap.xml is missing reciprocal ${language} alternates.`);
  }
}

if (issues.length) {
  console.error(`Static site audit failed (${issues.length}):\n${issues.map((issue) => `  - ${issue}`).join("\n")}`);
  process.exit(1);
}
console.log(`Static site audit passed: VI/EN + Resume/PDF metadata, structured data, sitemap, robots, ${checkedAnchors} anchors and ${checkedAssets} local references.`);
