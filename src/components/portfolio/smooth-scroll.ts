import Lenis from "lenis";
import { reducedMotion } from "./state";

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function initSmoothScroll(signal: AbortSignal) {
  if (reducedMotion()) return;

  const lenis = new Lenis({
    lerp: 0.1, // Smooth luxurious momentum (lirunghi style)
    smoothWheel: true,
    syncTouch: false, // Keep native touch scroll on mobile devices for 60-120fps responsiveness
    wheelMultiplier: 0.95,
  });

  lenisInstance = lenis;

  let rafId: number;
  function raf(time: number) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  // Smooth scroll for in-page anchor links
  const handleAnchorClick = (e: MouseEvent) => {
    const anchor = (e.target as Element).closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    if (href === "#top") {
      e.preventDefault();
      lenis.scrollTo(0, { duration: 1.2 });
      history.pushState(null, "", " ");
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.2 });
      history.pushState(null, "", href);
    }
  };

  document.addEventListener("click", handleAnchorClick, { signal });

  signal.addEventListener("abort", () => {
    cancelAnimationFrame(rafId);
    lenis.destroy();
    lenisInstance = null;
  });
}
