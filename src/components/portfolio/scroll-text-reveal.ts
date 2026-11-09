const revealSelector = ".about-copy,.atlas-scene-header,.journey-heading,.case-cover-intro,.evidence-poster,.skill-sequence-intro,.section-head,.article-card,.contact-editorial";
const stickySections = new Set(["atlas-scene-header", "journey-heading", "skill-sequence-intro"]);

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

type RevealTarget = { element: HTMLElement; exitElement: HTMLElement; lastKey: string };

export function initScrollTextReveal(signal: AbortSignal) {
  const targets: RevealTarget[] = Array.from(document.querySelectorAll<HTMLElement>(revealSelector), (element) => ({
    element,
    exitElement: [...stickySections].some((name) => element.classList.contains(name))
      ? element.closest<HTMLElement>("section") ?? element
      : element,
    lastKey: "",
  }));
  const hero = document.querySelector<HTMLElement>(".hero-inner");
  let frame = 0;
  let lastHero = "";

  const update = () => {
    frame = 0;
    const height = Math.max(window.innerHeight, 1);
    const distance = window.innerWidth <= 650 ? 26 : 42;

    // Read layout first, then write styles, to avoid forced layouts on each frame.
    const measurements = targets.map((target) => {
      const rect = target.element.getBoundingClientRect();
      const exitRect = target.exitElement === target.element ? rect : target.exitElement.getBoundingClientRect();
      return { target, top: rect.top, bottom: exitRect.bottom };
    });
    for (const { target, top, bottom } of measurements) {
      // The title enters between 90% and 58% of the viewport; copy follows it.
      const entrance = clamp((height * .9 - top) / (height * .32));
      // Keep the story readable until its bottom approaches the top edge.
      const exit = smooth((bottom - height * .02) / (height * .22));
      const key = `${Math.round(entrance * 1000)}:${Math.round(exit * 1000)}:${distance}`;
      if (key === target.lastKey) continue;
      target.lastKey = key;

      const titleIn = smooth(entrance / .72);
      const copyIn = smooth((entrance - .18) / .82);
      const detailIn = smooth((entrance - .38) / .62);
      const layers = [
        ["title", titleIn],
        ["copy", copyIn],
        ["detail", detailIn],
      ] as const;
      for (const [name, entry] of layers) {
        target.element.style.setProperty(`--text-${name}-opacity`, String(Math.round(entry * exit * 1000) / 1000));
        target.element.style.setProperty(`--text-${name}-shift`, `${Math.round(((1 - entry) * distance - (1 - exit) * distance * .55) * 10) / 10}px`);
      }
      if (target.element.classList.contains("evidence-poster")) {
        target.element.style.setProperty("--evidence-scale", (0.96 + detailIn * exit * 0.04).toFixed(4));
      }
    }

    if (hero) {
      const opacity = String(Math.round(smooth(1 - (window.scrollY - height * .12) / (height * .38)) * 1000) / 1000);
      if (opacity !== lastHero) {
        hero.style.setProperty("--hero-scroll-opacity", opacity);
        lastHero = opacity;
      }
    }
  };
  const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
  update();
  window.addEventListener("scroll", schedule, { passive: true, signal });
  window.addEventListener("resize", schedule, { signal });
  document.fonts?.ready.then(() => { if (!signal.aborted) schedule(); });

  return () => {
    window.cancelAnimationFrame(frame);
    targets.forEach(({ element }) => {
      element.style.removeProperty("--evidence-scale");
      for (const name of ["title", "copy", "detail"]) {
        element.style.removeProperty(`--text-${name}-opacity`);
        element.style.removeProperty(`--text-${name}-shift`);
      }
    });
    hero?.style.removeProperty("--hero-scroll-opacity");
  };
}
