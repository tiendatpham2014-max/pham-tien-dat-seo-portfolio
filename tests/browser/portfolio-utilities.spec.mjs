import { expect, test } from "@playwright/test";

const email = "tiendatpham2014@gmail.com";
async function start(page, route, theme, reduced = true) {
  await page.addInitScript(value => localStorage.setItem("dat-seo-theme", value), theme);
  await page.emulateMedia({ reducedMotion: reduced ? "reduce" : "no-preference" });
  await page.goto(route, { waitUntil: "domcontentloaded" });
  if (route !== "/resume/") await expect(page.locator("#intro-splash")).toBeHidden({timeout:8000});
}
for (const { route, theme, width, height } of [
  {route:"/",theme:"dark",width:1440,height:900},
  {route:"/en/",theme:"light",width:1440,height:900},
  {route:"/",theme:"light",width:390,height:844},
  {route:"/en/",theme:"dark",width:768,height:1024},
]) test("Contact CTA and copy email " + route + theme + width, async ({page,context}) => {
  await page.setViewportSize({width,height});
  await context.grantPermissions(["clipboard-read","clipboard-write"]);
  await start(page,route,theme);
  const copy = page.locator("#contact .copy-email button");
  await copy.scrollIntoViewIfNeeded();
  const styles = await page.locator("#contact .contact-editorial-links").evaluate(group => {
    const describe = e => { const s=getComputedStyle(e);return {height:e.getBoundingClientRect().height,radius:s.borderRadius,background:s.backgroundColor,padding:s.padding,font:s.fontSize}; };
    return {button:describe(group.querySelector("button")),link:describe(group.querySelector("a"))};
  });
  expect(Math.abs(styles.button.height-styles.link.height)).toBeLessThan(1);
  for(const key of ["radius","background","padding","font"]) expect(styles.button[key]).toBe(styles.link[key]);
  await copy.click();
  await expect(copy).toHaveText(route==="/"?"Đã sao chép":"Email copied");
  expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe(email);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
});

test("Resume metadata, download and stable desktop actions",async({page,context})=>{
  await context.grantPermissions(["clipboard-read","clipboard-write"]);
  await page.setViewportSize({width:1440,height:900});
  await start(page,"/resume/","dark");
  await expect(page.locator("html")).toHaveAttribute("lang","en");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href","https://datpham.io.vn/resume/");
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content",/SEO/);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
  await expect(page.locator('link[rel="icon"][type="image/png"]').first()).toHaveAttribute("href","/favicon-32x32.png");
  const topRows = () => page.locator(".resume-actions").evaluate(group=>[...group.querySelectorAll("a,button")].map(e=>Math.round(e.getBoundingClientRect().top)));
  let tops=await topRows();expect(new Set(tops).size).toBe(1);
  await page.getByRole("button",{name:"Copy email",exact:true}).click();
  tops=await topRows();expect(new Set(tops).size).toBe(1);
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content","#101b2b");
  await page.getByRole("button",{name:"Switch to light theme"}).click();
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content","#f7f9fb");
  const download=page.waitForEvent("download");
  await page.getByRole("link",{name:"Download PDF",exact:true}).click();
  expect((await download).suggestedFilename()).toBe("dat-pham-resume-en.pdf");
  const pdf=await page.request.get("/resume/dat-pham-resume-en.pdf");
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0,5).toString()).toBe("%PDF-");
});

test("Resume real browser A4 print keeps all sections",async({page},testInfo)=>{
  await start(page,"/resume/","dark");
  await page.emulateMedia({media:"print"});
  await page.evaluate(()=>document.fonts.ready);
  await expect(page.locator(".resume-actions")).toBeHidden();
  const pdf=await page.pdf({path:testInfo.outputPath("resume-print-a4.pdf"),format:"A4",preferCSSPageSize:true,printBackground:true});
  expect(pdf.subarray(0,5).toString()).toBe("%PDF-");
  expect(pdf.toString("latin1").match(/\/Type\s*\/Page\b/g)?.length).toBe(1);
  expect(await page.locator("html").evaluate(e=>getComputedStyle(e).colorScheme)).toBe("light");
  for(const section of ["#experience","#projects","#resume-skills"]) await expect(page.locator(section)).toBeVisible();
});

test("Copy email failure offers selectable email",async({page})=>{
  await page.addInitScript(()=>Object.defineProperty(navigator,"clipboard",{value:{writeText:()=>Promise.reject(new Error("denied"))},configurable:true}));
  await start(page,"/resume/","light");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content","#f7f9fb");
  await page.getByRole("button",{name:"Copy email",exact:true}).click();
  await expect(page.getByRole("textbox",{name:"Email",exact:true})).toHaveValue(email);
});

for(const {route,theme} of [{route:"/",theme:"light"},{route:"/en/",theme:"dark"}])
test("Mobile workflow and Skills shortcut "+route,async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await start(page,route,theme,false);
  const shortcuts=page.locator(".skill-shortcuts button");
  await expect(shortcuts).toHaveCount(4);
  await shortcuts.nth(3).click();
  await expect(shortcuts.nth(3)).toHaveAttribute("aria-current","step");
  const current=page.locator(".skill-sequence-item.is-current");
  await expect(current.locator(".workflow-tool")).toHaveCount(1);
  await current.locator("summary").click();
  const requests=[];
  page.on("request",request=>{if(request.url().includes(".example"))requests.push(request.url());});
  await current.locator('button[type="submit"]').click();
  await expect(current.locator(".workflow-results li")).toHaveCount(3);
  await expect(current.locator(".workflow-results")).toContainText("https://shop.example/products?size=M");
  expect(await current.locator(".workflow-results").evaluate(e=>e.scrollHeight-e.clientHeight)).toBeLessThanOrEqual(1);
  expect(requests).toEqual([]);
  await current.locator("textarea").fill("javascript:alert(1)\nhttps://EXAMPLE.com/Case?utm_source=x&q=Keep#anchor\nhttps://example.com/Case?q=Keep\nhttps://example.com/case?q=Keep");
  await current.locator('button[type="submit"]').click();
  const output=await current.locator(".workflow-results").innerText();
  expect(output).toContain(route==="/"?"Không hợp lệ":"Invalid");
  expect(output).toContain(route==="/"?"Trùng lặp":"Duplicate");
  expect(output).toContain("https://example.com/Case?q=Keep");
  expect(output).toContain("https://example.com/case?q=Keep");
  await shortcuts.nth(0).click();
  await expect(shortcuts.nth(0)).toHaveAttribute("aria-current","step");
  await expect(page.locator(".skill-sequence-item.is-current .diagram-label")).toHaveCount(3);
});

test("Atlas guide is usable by keyboard and dismisses with Escape",async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await start(page,"/en/","dark",false);
  const target=await page.locator("#atlas").evaluate(section=>{
    const top=scrollY+section.getBoundingClientRect().top;
    const distance=section.offsetHeight-section.querySelector(".atlas-sticky").offsetHeight;
    return top+distance/2;
  });
  await page.evaluate(y=>scrollTo({top:y,behavior:"instant"}),target);
  await expect(page.locator("#atlas")).toHaveAttribute("data-stage","2");
  const toggle=page.locator(".atlas-guide-toggle");
  await toggle.focus();await toggle.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded","true");
  await page.getByRole("button",{name:"Internal link",exact:true}).click();
  await expect(page.locator("#atlas-node-note")).toContainText("not an actual client link graph");
  await page.getByRole("button",{name:"Internal link",exact:true}).press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded","false");
});
