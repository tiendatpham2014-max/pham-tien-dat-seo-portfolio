import type { Language } from "@/content/portfolio";
import { updateComparison } from "./comparison";
import { positionIndicator } from "./navigation";

// Browser metadata and legacy interaction state stay here. React renders visible copy.
export function setLanguage(next: Language) {
  document.documentElement.lang = next;
  document.title = next === "vi"
    ? "Phạm Tiến Đạt (Dat Pham) — SEO Executive | Portfolio"
    : "Dat Pham (Pham Tien Dat) — SEO Executive | Portfolio";
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (description) description.content = next === "vi"
    ? "Hồ sơ năng lực của Phạm Tiến Đạt, SEO Executive tại Primas Group — kết hợp chuyên môn ngôn ngữ thương mại, Technical SEO và AI tối ưu tìm kiếm quốc tế."
    : "SEO Executive portfolio of Dat Pham at Primas Group — bridging business English, technical SEO, Core Web Vitals, and AI workflows for international search.";
  updateComparison();
  requestAnimationFrame(positionIndicator);
  try { localStorage.setItem("dat-seo-language", next); } catch { /* Storage may be unavailable. */ }
}
