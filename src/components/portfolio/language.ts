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
  document.title = next === "vi"
    ? "Phạm Tiến Đạt (Dat Pham) — SEO Executive | Portfolio"
    : "Dat Pham (Pham Tien Dat) — SEO Executive | Portfolio";
  get<HTMLMetaElement>('meta[name="description"]').content = next === "vi"
    ? "Portfolio của Phạm Tiến Đạt, SEO Executive tại Primas Group. Tối ưu hóa Search Intent, Technical SEO, Core Web Vitals và AI cho thị trường quốc tế."
    : "Portfolio of Dat Pham, SEO Executive at Primas Group. Optimizing Search Intent, Technical SEO, Core Web Vitals, and AI workflows for global markets.";
  const dictionary = copy[next] as Record<string, string | readonly string[]>;
  all("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (key && typeof dictionary[key] === "string") element.textContent = dictionary[key] as string;
  });
  all("[data-i18n-aria]").forEach((element) => {
    const key = (element as HTMLElement).dataset.i18nAria;
    if (key && typeof dictionary[key] === "string") element.setAttribute("aria-label", dictionary[key] as string);
  });
  all<HTMLButtonElement>("[data-lang]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.lang === next)));
  get("#menu-toggle").setAttribute("aria-label", copy[next][state.menuOpen ? "menuClose" : "menuOpen"]);
  updateThemeControl();
  const brand = document.querySelector(".brand");
  if (brand) brand.setAttribute("aria-label", next === "vi" ? "Phạm Tiến Đạt — đầu trang" : "Dat Pham — home");
  const insight = document.querySelector(".insight-row");
  if (insight) insight.setAttribute("aria-label", next === "vi" ? "Các câu hỏi trong công việc SEO" : "Questions I ask in SEO work");
  const signalLab = document.querySelector(".signal-lab");
  if (signalLab) {
    signalLab.setAttribute("aria-label", copy[next].signalAria);
    const steps = document.querySelector(".signal-steps");
    if (steps) steps.setAttribute("aria-label", copy[next].signalStepsAria);
    const nextBtn = document.querySelector("#signal-next");
    if (nextBtn) nextBtn.setAttribute("aria-label", copy[next].signalNext);
    renderSignal();
  }
  const deskNav = document.querySelector("#desktop-nav");
  if (deskNav) deskNav.setAttribute("aria-label", copy[next].navigation);
  const mobNav = document.querySelector("#mobile-nav");
  if (mobNav) mobNav.setAttribute("aria-label", copy[next].mobileNavigation);
  const metricPicker = document.querySelector(".metric-picker");
  if (metricPicker) metricPicker.setAttribute("aria-label", copy[next].metricsLabel);
  const compareSlider = document.querySelector("#compare-slider");
  if (compareSlider) compareSlider.setAttribute("aria-label", copy[next].compareSlider);
  updateComparison();
  const skillTabs = document.querySelector(".skill-tabs");
  if (skillTabs) skillTabs.setAttribute("aria-label", copy[next].skillsTablist);
  const railPrev = document.querySelector("#rail-prev");
  if (railPrev) railPrev.setAttribute("aria-label", copy[next].railPrev);
  const railNext = document.querySelector("#rail-next");
  if (railNext) railNext.setAttribute("aria-label", copy[next].railNext);
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
