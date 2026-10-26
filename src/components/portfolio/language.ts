import { copy, type Language } from "@/content/portfolio";
import { all, get, text } from "./dom";
import { state } from "./state";
import { renderSignal } from "./signal-lab";
import { renderMetric, formatMetric } from "./metrics";
import { updateComparison } from "./comparison";
import { updateThemeControl } from "./theme";
import { updateScenes } from "./scroll-stories";
import { positionIndicator } from "./navigation";

export function setLanguage(next: Language) {
  state.language = next;
  document.documentElement.lang = next;
  document.title = next === "vi" ? "Phạm Tiến Đạt — SEO Executive" : "Dat Pham — SEO Executive";
  get<HTMLMetaElement>('meta[name="description"]').content = next === "vi"
    ? "Phạm Tiến Đạt — SEO Executive. Tư duy về search intent, nội dung, dữ liệu GSC và các bài viết đã xuất bản."
    : "Dat Pham — SEO Executive. Search intent, content, GSC evidence and published writing.";
  const dictionary = copy[next] as Record<string, string | readonly string[]>;
  all("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (key && typeof dictionary[key] === "string") element.textContent = dictionary[key] as string;
  });
  all<HTMLButtonElement>("[data-lang]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.lang === next)));
  get("#menu-toggle").setAttribute("aria-label", copy[next][state.menuOpen ? "menuClose" : "menuOpen"]);
  updateThemeControl();
  get(".brand").setAttribute("aria-label", next === "vi" ? "Phạm Tiến Đạt — đầu trang" : "Dat Pham — home");
  get(".insight-row").setAttribute("aria-label", next === "vi" ? "Các câu hỏi trong công việc SEO" : "Questions I ask in SEO work");
  get(".signal-lab").setAttribute("aria-label", copy[next].signalAria);
  get(".signal-steps").setAttribute("aria-label", copy[next].signalStepsAria);
  get("#signal-next").setAttribute("aria-label", copy[next].signalNext);
  renderSignal();
  get("#desktop-nav").setAttribute("aria-label", copy[next].navigation);
  get("#mobile-nav").setAttribute("aria-label", copy[next].mobileNavigation);
  get(".metric-picker").setAttribute("aria-label", copy[next].metricsLabel);
  get("#compare-slider").setAttribute("aria-label", copy[next].compareSlider);
  updateComparison();
  get(".skill-tabs").setAttribute("aria-label", copy[next].skillsTablist);
  get("#rail-prev").setAttribute("aria-label", copy[next].railPrev);
  get("#rail-next").setAttribute("aria-label", copy[next].railNext);
  all("[data-value]").forEach((element) => { element.textContent = formatMetric(Number(element.dataset.value), "integer"); });
  all("[data-percent]").forEach((element) => { element.textContent = formatMetric(Number(element.dataset.percent), "percent"); });
  all("[data-decimal]").forEach((element) => { element.textContent = formatMetric(Number(element.dataset.decimal), "decimal"); });
  const storyValues = next === "vi" ? ["+27,1%", "−5,0%", "+0,34"] : ["+27.1%", "−5.0%", "+0.34"];
  all(".evidence-card strong").forEach((element, index) => { element.textContent = storyValues[index]; });
  renderMetric();
  updateScenes();
  requestAnimationFrame(positionIndicator);
  try { localStorage.setItem("dat-seo-language", next); } catch { /* Storage may be unavailable. */ }
}

export function initLanguage(signal: AbortSignal) {
  all<HTMLButtonElement>("[data-lang]").forEach((button) => button.addEventListener("click", () => {
    const next = button.dataset.lang;
    if (next === "vi" || next === "en") setLanguage(next);
  }, { signal }));
  let stored: string | null = null;
  try { stored = localStorage.getItem("dat-seo-language"); } catch { /* Storage may be unavailable. */ }
  setLanguage(stored === "en" ? "en" : "vi");
}
