import { get, all, text } from "./dom";
import { resetState, reducedMotion, state } from "./state";
import { initTheme } from "./theme";
import { initSignalLab } from "./signal-lab";
import { initMetrics } from "./metrics";
import { initMobileMenu } from "./mobile-menu";
import { initSkills, scheduleSkillTimer } from "./skills";
import { initWritingRail, updateRail } from "./writing-rail";
import { initComparison } from "./comparison";
import { initScrollStories } from "./scroll-stories";
import { initLanguage } from "./language";
import { positionIndicator } from "./navigation";
import { initHeroWaves } from "./hero-waves";
import { initJourneyHorizon } from "./journey";

export function initPortfolio() {
  resetState();
  const controller = new AbortController();
  const { signal } = controller;
  const observers: IntersectionObserver[] = [];

  initTheme(signal);
  initMobileMenu(signal);
  initHeroWaves(signal);
  initSignalLab(signal);
  initMetrics(signal);
  initComparison(signal);
  initSkills(signal);
  initWritingRail(signal);
  initScrollStories(signal);
  initLanguage(signal);
  initJourneyHorizon(signal);
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

  window.addEventListener("resize", positionIndicator, { signal });
  if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver((entries) => {
      state.skillVisible = entries[0].isIntersecting;
      if (!signal.aborted) scheduleSkillTimer();
    }, { threshold: 0.4 });
    skillObserver.observe(get("#skills"));
    observers.push(skillObserver);

    const processObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        get(".process-path").classList.add("is-visible");
        processObserver.disconnect();
      }
    }, { threshold: 0.2 });
    processObserver.observe(get("#process"));
    observers.push(processObserver);

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
      all(".process-step,.section-head,.approach-grid,.insight-row article,.case-overview,.metric-stage,.period-card,.compare-wrap,.skill-layout,.article-card,.contact-heading,.contact-methods a")
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
