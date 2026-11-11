import { all, text } from "./dom";
import { resetState, reducedMotion } from "./state";
import { initMobileMenu } from "./mobile-menu";
import { initScrollStories } from "./scroll-stories";
import { positionIndicator } from "./navigation";
import { initHeroWaves } from "./hero-waves";
import { initIntroSplash } from "./intro-splash";
import { initSmoothScroll } from "./smooth-scroll";
import { initScrollTextReveal } from "./scroll-text-reveal";
import { initBattleBotsReveal } from "./battlebots-reveal";

export function initPortfolio() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  resetState();
  const controller = new AbortController();
  const { signal } = controller;

  initSmoothScroll(signal);
  initIntroSplash(signal);
  initMobileMenu(signal);
  initHeroWaves(signal);
  initScrollStories(signal);
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

  // No hover replay for the header signature: the mark is a static image
  // (it has no stroke animation), and the CSS :hover scale in
  // 10-navigation.css already gives the hover feedback. Reloading it with
  // ?t=Date.now() only re-downloaded ~500 KB for no visual change.

  window.addEventListener("resize", positionIndicator, { signal });
  const cleanupTextReveal = !reducedMotion() ? initScrollTextReveal(signal) : undefined;
  const cleanupBattleBots = !reducedMotion() ? initBattleBotsReveal(signal) : undefined;
  if (cleanupTextReveal) {
    document.body.classList.add("js-motion");
  }
  document.fonts?.ready.then(() => { if (!signal.aborted) positionIndicator(); });

  return () => {
    controller.abort();
    cleanupTextReveal?.();
    cleanupBattleBots?.();
    document.body.classList.remove("js-motion", "menu-open", "page-hidden");
  };
}
