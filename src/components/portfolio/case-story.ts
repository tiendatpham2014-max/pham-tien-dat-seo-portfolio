import { all } from "./dom";
import { reducedMotion } from "./state";

export function updateCaseStory() {
  const section = document.querySelector<HTMLElement>(".case-story");
  if (!section || reducedMotion()) return;

  const rect = section.getBoundingClientRect();
  const travel = Math.max(1, rect.height - window.innerHeight);
  const progress = Math.max(0, Math.min(1, -rect.top / travel));
  const position = progress * 2;
  const active = Math.min(2, Math.floor(progress * 3));

  section.style.setProperty("--story-progress", progress.toFixed(4));
  section.dataset.storyStep = String(active);

  all("[data-story-visual]").forEach((element, index) => {
    const visual = element as HTMLElement;
    const offset = index - position;
    const opacity = Math.max(0, Math.min(1, 1 - Math.abs(offset) * 1.4));
    visual.style.setProperty("--visual-offset", offset.toFixed(4));
    visual.style.setProperty("--visual-opacity", opacity.toFixed(3));
  });

  all("[data-story-chapter]").forEach((chapter, index) => {
    chapter.classList.toggle("is-current", index === active);
  });
}
