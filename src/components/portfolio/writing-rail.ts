import { all, get, text } from "./dom";
import { reducedMotion } from "./state";

export function updateRail() {
  const rail = get("#article-rail");
  const cards = all(".article-card");
  if (!cards.length) return;
  const nearest = cards.reduce((best, card, index) =>
    Math.abs(card.offsetLeft - rail.offsetLeft - rail.scrollLeft) <
    Math.abs(cards[best].offsetLeft - rail.offsetLeft - rail.scrollLeft) ? index : best, 0);
  text("#rail-status", `${nearest + 1} / ${cards.length}`);
  get<HTMLButtonElement>("#rail-prev").disabled = rail.scrollLeft < 5;
  get<HTMLButtonElement>("#rail-next").disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 5;
}

function moveRail(direction: number) {
  const rail = get("#article-rail");
  const card = get(".article-card");
  const gap = parseFloat(getComputedStyle(rail).gap) || 0;
  rail.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reducedMotion() ? "instant" : "smooth" });
}

export function initWritingRail(signal: AbortSignal) {
  get("#rail-prev").addEventListener("click", () => moveRail(-1), { signal });
  get("#rail-next").addEventListener("click", () => moveRail(1), { signal });
  get("#article-rail").addEventListener("scroll", () => requestAnimationFrame(updateRail), { passive: true, signal });
  window.addEventListener("resize", updateRail, { signal });
  updateRail();
}
