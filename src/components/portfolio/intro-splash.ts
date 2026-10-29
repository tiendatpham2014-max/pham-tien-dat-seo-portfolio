import { reducedMotion } from "./state";

export function initIntroSplash(signal: AbortSignal) {
  const splash = document.getElementById("intro-splash");
  const backdrop = document.getElementById("intro-splash-backdrop");
  const mark = document.getElementById("intro-splash-mark");
  const brand = document.querySelector<HTMLElement>(".brand");

  if (!splash || !mark || !brand) return;

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
    document.documentElement.classList.remove("intro-playing");
    splash.style.display = "none";
    splash.style.pointerEvents = "none";
    brand.style.opacity = "1";
    brand.style.pointerEvents = "auto";
    window.dispatchEvent(new CustomEvent("portfolio:intro-complete"));
  };

  if (reducedMotion() || typeof mark.animate !== "function") {
    cleanup();
    return;
  }

  // Engage active intro state
  splash.setAttribute("data-active", "true");
  document.documentElement.classList.add("intro-playing");
  brand.style.opacity = "0";
  brand.style.pointerEvents = "none";

  // Safety fallback in case tab is in background or animation stalls
  const failsafeTimer = window.setTimeout(() => {
    if (!signal.aborted) cleanup();
  }, 2600);

  // Flight sequence starts at ~1.42s when signature drawing strokes complete
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

      if (!markRect.width || !targetRect.width) {
        cleanup();
        return;
      }

      const deltaX = (targetRect.left + targetRect.width / 2) - (markRect.left + markRect.width / 2);
      const deltaY = (targetRect.top + targetRect.height / 2) - (markRect.top + markRect.height / 2);
      const scale = targetRect.width / markRect.width;

      // Animate signature flight from center to top-left brand position
      const flightAnim = mark.animate(
        [
          { transform: "scale(1.035) translate(0, 0)" },
          { transform: `translate(${deltaX}px, ${deltaY}px) scale(${scale})` },
        ],
        {
          duration: 380,
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
            duration: 380,
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
    }, 80);

    signal.addEventListener("abort", () => {
      window.clearTimeout(flightTimer);
    });
  }, 1420);

  signal.addEventListener("abort", () => {
    window.clearTimeout(failsafeTimer);
    window.clearTimeout(flourishTimer);
    cleanup();
  });
}
