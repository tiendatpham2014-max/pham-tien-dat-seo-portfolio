import { all } from "./dom";

export function initJourneyHorizon(signal: AbortSignal) {
  const cards = all<HTMLElement>(".career-stage-card");
  const journey = document.querySelector<HTMLElement>("#journey");
  if (!cards.length || !journey) return;

  const positions = [
    { x: "18%", y: "58%" },
    { x: "50%", y: "52%" },
    { x: "82%", y: "58%" },
  ];

  function setStage(index: number) {
    cards.forEach((card, i) => card.classList.toggle("is-active", i === index));
    journey!.style.setProperty("--sun-x", positions[index].x);
    journey!.style.setProperty("--sun-y", positions[index].y);
  }

  cards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => setStage(index), { signal });
    card.addEventListener("click", () => setStage(index), { signal });
  });

  const grid = document.querySelector(".journey-stages-grid");
  if (grid) {
    grid.addEventListener("scroll", () => {
      const scrollLeft = grid.scrollLeft;
      const cardWidth = cards[0]?.offsetWidth || 1;
      const index = Math.min(2, Math.max(0, Math.round(scrollLeft / cardWidth)));
      setStage(index);
    }, { passive: true, signal });
  }

  setStage(2); // Mặc định ở mốc SEO Executive hiện tại
}
