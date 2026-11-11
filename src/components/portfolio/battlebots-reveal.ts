const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

export function initBattleBotsReveal(signal: AbortSignal) {
  const section = document.querySelector<HTMLElement>(".battlebots");
  if (!section) return;

  const parts = [
    section.querySelector<HTMLElement>(".battlebots-header"),
    ...section.querySelectorAll<HTMLElement>(".battlebots-output"),
    section.querySelector<HTMLElement>(".battlebots-maintenance"),
  ].filter((part): part is HTMLElement => Boolean(part));
  let frame = 0;

  const update = () => {
    frame = 0;
    const height = Math.max(window.innerHeight, 1);
    const measurements = parts.map((part) => ({ part, top: part.getBoundingClientRect().top }));
    measurements.forEach(({ part, top }, index) => {
      const reveal = ease((height * .88 - top) / (height * .23));
      const direction = index % 2 === 0 ? -1 : 1;
      part.style.setProperty("--battle-reveal", String(Math.round(reveal * 1000) / 1000));
      part.style.setProperty("--battle-shift-x", `${Math.round((1 - reveal) * direction * 34)}px`);
      part.style.setProperty("--battle-shift-y", `${Math.round((1 - reveal) * 22)}px`);
    });
    section.classList.add("battlebots-motion");
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener("scroll", schedule, { passive: true, signal });
  window.addEventListener("resize", schedule, { passive: true, signal });
  update();

  return () => {
    if (frame) cancelAnimationFrame(frame);
    section.classList.remove("battlebots-motion");
    parts.forEach((part) => {
      part.style.removeProperty("--battle-reveal");
      part.style.removeProperty("--battle-shift-x");
      part.style.removeProperty("--battle-shift-y");
    });
  };
}
