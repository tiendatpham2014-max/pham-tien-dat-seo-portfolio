import { get, all, text } from "./dom";
import { resetState, reducedMotion, state } from "./state";
import { initTheme } from "./theme";
import { initMetrics } from "./metrics";
import { initMobileMenu } from "./mobile-menu";
import { initSkills, scheduleSkillTimer } from "./skills";
import { initWritingRail, updateRail } from "./writing-rail";
import { initComparison } from "./comparison";
import { initScrollStories } from "./scroll-stories";
import { initLanguage } from "./language";
import { positionIndicator } from "./navigation";
import { initHeroWaves } from "./hero-waves";
import { initIntroSplash } from "./intro-splash";
import { initSmoothScroll } from "./smooth-scroll";

export function initPortfolio() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  resetState();
  const controller = new AbortController();
  const { signal } = controller;
  const observers: IntersectionObserver[] = [];

  initTheme(signal);
  initSmoothScroll(signal);
  initIntroSplash(signal);
  initMobileMenu(signal);
  initHeroWaves(signal);
  initMetrics(signal);
  initComparison(signal);
  initSkills(signal);
  initWritingRail(signal);
  initScrollStories(signal);
  initLanguage(signal);
  all(".contact-methods a").forEach((card) => {
    card.addEventListener("pointermove", (e: Event) => {
      const pe = e as PointerEvent;
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = pe.clientX - rect.left;
      const y = pe.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    }, { signal });
  });
  text("#year", String(new Date().getFullYear()));
  document.documentElement.classList.remove("no-js");

  const brand = document.querySelector<HTMLElement>(".brand");
  if (brand) {
    let lastReplay = 0;
    brand.addEventListener("mouseenter", () => {
      const now = performance.now();
      if (now - lastReplay < 1600) return;
      lastReplay = now;
      const images = brand.querySelectorAll<HTMLImageElement>(".brand-signature");
      images.forEach((img) => {
        const clean = img.src.split("?")[0];
        img.src = `${clean}?t=${Date.now()}`;
      });
    }, { signal });
  }

  window.addEventListener("resize", positionIndicator, { signal });
  if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver((entries) => {
      state.skillVisible = entries[0].isIntersecting;
      if (!signal.aborted) scheduleSkillTimer();
    }, { threshold: 0.15 });
    skillObserver.observe(get("#skills"));
    observers.push(skillObserver);

    if (!reducedMotion()) {
      document.body.classList.add("js-motion");
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
      all(".section-head,.about-intro-grid,.about-stack-bar,.case-overview,.metric-stage,.period-card,.compare-wrap,.skill-layout,.article-card,.contact-heading,.contact-methods a")
        .forEach((element) => revealObserver.observe(element));
      observers.push(revealObserver);
    }
  }
  document.fonts?.ready.then(() => { if (!signal.aborted) { positionIndicator(); updateRail(); } });

  return () => {
    controller.abort();
    observers.forEach((observer) => observer.disconnect());
    document.body.classList.remove("js-motion", "menu-open", "page-hidden");
  };
}
