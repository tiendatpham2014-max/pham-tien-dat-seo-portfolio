import type { Language } from "@/content/portfolio";
import { positionIndicator } from "./navigation";

// Browser metadata and legacy interaction state stay here. React renders visible copy.
export function setLanguage(next: Language) {
  const canonicalUrl = `https://datpham.io.vn${next === "vi" ? "/" : "/en/"}`;
  document.documentElement.lang = next;
  document.title = next === "vi"
    ? "Phạm Tiến Đạt (Dat Pham) — SEO Executive | Portfolio"
    : "Dat Pham (Pham Tien Dat) — SEO Executive | Portfolio";
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (description) description.content = next === "vi"
    ? "Hồ sơ năng lực của Phạm Tiến Đạt, SEO Executive tại Primas Group — kết hợp chuyên môn ngôn ngữ thương mại, Technical SEO và AI tối ưu tìm kiếm quốc tế."
    : "SEO Executive portfolio of Dat Pham at Primas Group — bridging business English, technical SEO, Core Web Vitals, and AI workflows for international search.";
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
  document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);
  document.querySelector<HTMLMetaElement>('meta[property="og:locale"]')?.setAttribute("content", next === "vi" ? "vi_VN" : "en_US");
  for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
    document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", document.title);
  }
  for (const selector of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) {
    document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", description?.content ?? "");
  }
  requestAnimationFrame(positionIndicator);
  try { localStorage.setItem("dat-seo-language", next); } catch { /* Storage may be unavailable. */ }
}
