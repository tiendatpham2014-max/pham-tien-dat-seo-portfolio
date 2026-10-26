import { all, get, text } from "./dom";
import { reducedMotion } from "./state";

export function updateSearchScene() {
  if (reducedMotion()) return;
  const bounds = get("#search-scene").getBoundingClientRect();
  const words = all("[data-scene-word]");
  const descriptions = all("[data-scene-description]");
  const distance = Math.max(1, bounds.height - window.innerHeight);
  const progress = Math.max(0, Math.min(1, -bounds.top / distance));
  const phase = progress * 2;
  const active = Math.max(0, Math.min(2, Math.round(phase)));
  words.forEach((word, index) => {
    const delta = index - phase;
    const magnitude = Math.abs(delta);
    word.style.opacity = String(Math.max(0, 1 - magnitude * 1.25));
    word.style.transform = `translate3d(${(delta * 17).toFixed(2)}vw,${(delta * 6).toFixed(2)}vh,0) scale(${Math.max(0.82, 1 - magnitude * 0.12).toFixed(3)})`;
    word.classList.toggle("is-current", index === active);
  });
  descriptions.forEach((description, index) => description.classList.toggle("is-current", index === active));
  text("#search-scene-count", `${String(active + 1).padStart(2, "0")} / 03`);
  get(".search-scene-rule i").style.width = `${(progress * 100).toFixed(1)}%`;
}
