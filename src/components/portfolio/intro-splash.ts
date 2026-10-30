import { reducedMotion } from "./state";
import { getLenis } from "./smooth-scroll";

export function initIntroSplash(signal: AbortSignal) {
  const splash = document.getElementById("intro-splash");
  const backdrop = document.getElementById("intro-splash-backdrop");
  const mark = document.getElementById("intro-splash-mark");
  const brand = document.querySelector<HTMLElement>(".brand");

  if (!splash || !mark || !brand) return;

  // React may replay effects in development. Restore the splash before each setup.
  splash.style.removeProperty("display");
  splash.style.removeProperty("pointer-events");

  let scrollLocked = true;
  const preventScroll = (e: Event) => {
    if (scrollLocked) e.preventDefault();
  };
  const preventScrollKeys = (e: KeyboardEvent) => {
    if (scrollLocked && ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space", "Home", "End"].includes(e.code)) {
      e.preventDefault();
    }
  };

  window.addEventListener("wheel", preventScroll, { passive: false, signal });
  window.addEventListener("touchmove", preventScroll, { passive: false, signal });
  window.addEventListener("keydown", preventScrollKeys, { signal });
  const cleanup = () => {
    scrollLocked = false;
    getLenis()?.start();
    document.documentElement.classList.remove("intro-playing");
    splash.style.display = "none";
    splash.style.pointerEvents = "none";
    brand.style.opacity = "1";
    brand.style.pointerEvents = "auto";
    window.dispatchEvent(new CustomEvent("portfolio:intro-complete"));
  };

  if (reducedMotion() || (location.hash && location.hash !== "#top") || typeof mark.animate !== "function") {
    cleanup();
    return;
  }

  window.scrollTo(0, 0);
  getLenis()?.stop();
  getLenis()?.scrollTo(0, { immediate: true });

  // Force restart the SVG signature animation on every page load and refresh (F5)
  // This bypasses browser image caching that freezes SVG CSS @keyframes on subsequent views
  const images = splash.querySelectorAll<HTMLImageElement>(".intro-signature");
  const cacheBuster = Date.now();
  images.forEach((img) => {
    const rawSrc = img.getAttribute("src") || img.src;
    const clean = rawSrc.split("?")[0];
    img.src = `${clean}?v=${cacheBuster}`;
  });

  // Engage active intro state
  splash.setAttribute("data-active", "true");
  document.documentElement.classList.add("intro-playing");
  brand.style.opacity = "0";
  brand.style.pointerEvents = "none";

  // Safety fallback in case tab is in background or animation stalls
  const failsafeTimer = window.setTimeout(() => {
    if (!signal.aborted) cleanup();
  }, 3800);

  // Flight sequence starts at ~2.06s when signature drawing strokes complete
  const flourishTimer = window.setTimeout(() => {
    if (signal.aborted) return;

    // 1. Subtle micro-scale impulse as the pen finishes
    mark.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.035)" },
      ],
      { duration: 80, easing: "ease-out", fill: "forwards" }
    );

    // 2. Flight to the header logo position
    const flightTimer = window.setTimeout(() => {
      if (signal.aborted) return;

      const isLight = document.documentElement.dataset.theme === "light";
      const targetImg = brand.querySelector<HTMLImageElement>(
        isLight ? ".brand-light" : ".brand-dark"
      ) || brand;

      const markRect = mark.getBoundingClientRect();
      const targetRect = targetImg.getBoundingClientRect();

      // Robust fallback coordinates for iOS Safari / initial layout before dimensions settle
      const targetWidth = targetRect.width > 0 ? targetRect.width : (window.innerWidth < 768 ? 96 : 114);
      const targetHeight = targetRect.height > 0 ? targetRect.height : 38;
      const targetLeft = targetRect.width > 0 ? targetRect.left : 20;
      const targetTop = targetRect.height > 0 ? targetRect.top : 20;

      const markWidth = markRect.width > 0 ? markRect.width : (window.innerWidth < 768 ? 260 : 340);
      const markHeight = markRect.height > 0 ? markRect.height : markWidth * (724 / 2172);
      const markLeft = markRect.width > 0 ? markRect.left : (window.innerWidth - markWidth) / 2;
      const markTop = markRect.height > 0 ? markRect.top : (window.innerHeight - markHeight) / 2;

      const deltaX = (targetLeft + targetWidth / 2) - (markLeft + markWidth / 2);
      const deltaY = (targetTop + targetHeight / 2) - (markTop + markHeight / 2);
      const scale = targetWidth / markWidth;

      try {
        // Animate signature flight from center to top-left brand position
        const flightAnim = mark.animate(
          [
            { transform: "scale(1.035) translate(0, 0)" },
            { transform: `translate(${deltaX}px, ${deltaY}px) scale(${scale})` },
          ],
          {
            duration: 420,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "forwards",
          }
        );

        // Smoothly dissolve the frosted glass backdrop to unveil the sharp hero section
        if (backdrop) {
          backdrop.animate(
            [
              { opacity: 1 },
              { opacity: 0 },
            ],
            {
              duration: 400,
              delay: 40,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              fill: "forwards",
            }
          );
        }

        flightAnim.onfinish = () => {
          if (signal.aborted) return;

          // Reveal the real header brand logo
          brand.style.opacity = "1";
          brand.style.pointerEvents = "auto";

          // Cross-fade the mark as real header logo takes over
          mark.animate(
            [
              { opacity: 1 },
              { opacity: 0 },
            ],
            { duration: 90, fill: "forwards" }
          ).onfinish = () => {
            window.clearTimeout(failsafeTimer);
            cleanup();
          };
        };
      } catch {
        cleanup();
      }
    }, 80);

    signal.addEventListener("abort", () => {
      window.clearTimeout(flightTimer);
    });
  }, 2060);

  signal.addEventListener("abort", () => {
    window.clearTimeout(failsafeTimer);
    window.clearTimeout(flourishTimer);
    cleanup();
  });
}
