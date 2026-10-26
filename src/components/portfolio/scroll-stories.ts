import { all, get, text } from "./dom";
import { updateActiveSection } from "./navigation";
import { updateSearchScene } from "./search-scene";

function getSceneState(items: HTMLElement[]) {
  const focus = window.innerHeight * 0.56;
  const centers = items.map((item) => {
    const rect = item.getBoundingClientRect();
    return rect.top + rect.height / 2;
  });
  if (!centers.length) return { progress: 0, active: 0 };
  let progress = 0;
  for (let index = 0; index < centers.length - 1; index++) {
    const portion = Math.max(0, Math.min(1, (focus - centers[index]) / (centers[index + 1] - centers[index])));
    if (focus >= centers[index]) progress = (index + portion) / (centers.length - 1);
  }
  if (focus >= centers[centers.length - 1]) progress = 1;
  const active = centers.reduce((best, center, index) =>
    Math.abs(center - focus) < Math.abs(centers[best] - focus) ? index : best, 0);
  return { progress, active };
}

export function updateScenes() {
  updateActiveSection();
  const stages = all(".career-stage, .career-stage-card");
  if (stages.length) {
    const journeyEl = document.querySelector<HTMLElement>("#journey");
    if (journeyEl) {
      journeyEl.style.setProperty("--sun-x", "85%");
      journeyEl.style.setProperty("--sun-y", "78%");
    }
  }

  const evidenceSteps = all(".evidence-chapters article");
  if (evidenceSteps.length) {
    const evidence = getSceneState(evidenceSteps);
    evidenceSteps.forEach((step, index) => step.classList.toggle("is-current", index === evidence.active));
    all("[data-evidence-card]").forEach((card, index) => card.classList.toggle("is-current", index === evidence.active));
    const countEl = document.querySelector("#evidence-count");
    if (countEl) text("#evidence-count", `${String(evidence.active + 1).padStart(2, "0")} / 03`);
  }
  updateSearchScene();
}

let sceneFrame: number | null = null;

export function scheduleSceneUpdate() {
  if (sceneFrame !== null) return;
  sceneFrame = requestAnimationFrame(() => { sceneFrame = null; updateScenes(); });
}

export function initScrollStories(signal: AbortSignal) {
  window.addEventListener("scroll", scheduleSceneUpdate, { passive: true, signal });
  window.addEventListener("resize", scheduleSceneUpdate, { signal });
  updateScenes();
  signal.addEventListener("abort", () => {
    if (sceneFrame !== null) cancelAnimationFrame(sceneFrame);
    sceneFrame = null;
  }, { once: true });
}
