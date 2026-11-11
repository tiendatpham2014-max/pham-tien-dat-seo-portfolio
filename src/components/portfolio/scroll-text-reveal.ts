const revealSelector = ".about-copy,.atlas-scene-header,.journey-heading,.skill-sequence-intro,.section-head,.article-card,.contact-editorial";
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
  const work = document.querySelector<HTMLElement>("#work");
  const workProfile = work?.querySelector<HTMLElement>(".project-profile");
  const workSignal = work?.querySelector<HTMLElement>(".case-signal");
  const workWords = Array.from(work?.querySelectorAll<HTMLElement>(".work-title-word") ?? []);
  const workRows = Array.from(work?.querySelectorAll<HTMLElement>(".project-profile-list li") ?? []);
  let rowCenters = workRows.map((row) => row.offsetTop + row.offsetHeight / 2);
  let frame = 0;
  let lastHero = "";
  let lastWork = "";

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
    const workTop = work?.getBoundingClientRect().top;
    const workSignalTop = workSignal?.getBoundingClientRect().top;
    const workStacked = window.innerWidth <= 1150;
    const workRowTops = workStacked ? workRows.map((row) => row.getBoundingClientRect().top) : [];
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
    }

    if (work && workProfile && workTop !== undefined) {
      // One short scroll scene: the title arrives word by word as the signal visits each role.
      const progress = clamp((height * .93 - workTop) / (height * .76));
      const key = `${Math.round(progress * 1000)}:${Math.round(workSignalTop ?? 0)}:${workRowTops.map((top) => Math.round(top)).join(":")}`;
      if (key !== lastWork) {
        lastWork = key;
        const set = (name: string, value: number) => work.style.setProperty(name, String(Math.round(value * 1000) / 1000));
        set("--work-kicker-opacity", smooth((progress - .04) / .16));
        work.style.setProperty("--work-kicker-shift", `${Math.round((1 - smooth((progress - .04) / .16)) * 18)}px`);
        set("--work-intro-opacity", smooth((progress - .24) / .28));
        work.style.setProperty("--work-intro-shift", `${Math.round((1 - smooth((progress - .24) / .28)) * 30)}px`);
        set("--work-profile-opacity", smooth((progress - .18) / .26));
        work.style.setProperty("--work-profile-shift", `${Math.round((1 - smooth((progress - .18) / .26)) * 26)}px`);
        set("--work-field-opacity", smooth((progress - .05) / .22) * .78);
        work.style.setProperty("--work-field-shift", `${Math.round(-85 + progress * 170)}px`);
        set("--work-signal-scale", smooth((height * .84 - (workSignalTop ?? height)) / (height * .26)));
        workWords.forEach((word, index) => {
          const reveal = smooth((progress - .055 - index * .055) / .2);
          word.style.setProperty("--work-word-opacity", String(Math.round(reveal * 1000) / 1000));
          word.style.setProperty("--work-word-shift", `${Math.round((1 - reveal) * 35)}px`);
        });
        const rowReveals = workRows.map((row, index) => {
          const reveal = workStacked
            ? smooth((height * .79 - workRowTops[index]) / (height * .11))
            : smooth((progress - .27 - index * .13) / .18);
          const active = workStacked
            ? reveal * clamp(1 - Math.abs(height * .7 - workRowTops[index]) / (height * .15))
            : clamp(1 - Math.abs(progress - (.43 + index * .13)) / .13);
          row.style.setProperty("--work-row-opacity", String(Math.round(reveal * 1000) / 1000));
          row.style.setProperty("--work-row-shift", `${Math.round((1 - reveal) * 24)}px`);
          row.style.setProperty("--work-row-active", String(Math.round(active * 1000) / 1000));
          return reveal;
        });
        const detail = workStacked
          ? smooth(((rowReveals[rowReveals.length - 1] ?? 1) - .45) / .55)
          : smooth((progress - .72) / .18);
        set("--work-detail-opacity", detail);
        work.style.setProperty("--work-detail-shift", `${Math.round((1 - detail) * 16)}px`);
        const first = rowCenters[0] ?? 0;
        const last = rowCenters[rowCenters.length - 1] ?? first;
        const revealedRows = rowReveals.reduce((total, value) => total + value, 0);
        const beam = workStacked ? smooth((revealedRows - 1) / 3) : smooth((progress - .27) / .52);
        workProfile.style.setProperty("--work-beam-y", `${Math.round(first + (last - first) * beam)}px`);
        const beamOpacity = workStacked
          ? smooth(revealedRows / .6) * (1 - smooth((revealedRows - 3.7) / .3))
          : smooth((progress - .2) / .16) * (1 - smooth((progress - .86) / .12));
        workProfile.style.setProperty("--work-beam-opacity", String(Math.round(beamOpacity * 1000) / 1000));
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
  window.addEventListener("resize", () => { rowCenters = workRows.map((row) => row.offsetTop + row.offsetHeight / 2); lastWork = ""; schedule(); }, { signal });
  document.fonts?.ready.then(() => { if (!signal.aborted) { rowCenters = workRows.map((row) => row.offsetTop + row.offsetHeight / 2); lastWork = ""; schedule(); } });

  return () => {
    window.cancelAnimationFrame(frame);
    targets.forEach(({ element }) => {
      for (const name of ["title", "copy", "detail"]) {
        element.style.removeProperty(`--text-${name}-opacity`);
        element.style.removeProperty(`--text-${name}-shift`);
      }
    });
    hero?.style.removeProperty("--hero-scroll-opacity");
    if (work) {
      for (const name of ["--work-kicker-opacity", "--work-kicker-shift", "--work-intro-opacity", "--work-intro-shift", "--work-profile-opacity", "--work-profile-shift", "--work-field-opacity", "--work-field-shift", "--work-signal-scale", "--work-detail-opacity", "--work-detail-shift"]) {
        work.style.removeProperty(name);
      }
    }
    workWords.forEach((word) => { word.style.removeProperty("--work-word-opacity"); word.style.removeProperty("--work-word-shift"); });
    workRows.forEach((row) => { for (const name of ["--work-row-opacity", "--work-row-shift", "--work-row-active"]) row.style.removeProperty(name); });
    workProfile?.style.removeProperty("--work-beam-y");
    workProfile?.style.removeProperty("--work-beam-opacity");
  };
}
