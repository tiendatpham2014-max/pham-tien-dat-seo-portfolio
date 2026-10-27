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

function getCareerState(stages: HTMLElement[]) {
  const journey = document.querySelector("#journey");
  if (!journey) return { progress: 0, active: 0 };
  const rect = journey.getBoundingClientRect();
  const travel = Math.max(1, rect.height - window.innerHeight);
  const rawProgress = Math.max(0, Math.min(1, -rect.top / travel));

  // Complete sun arc within first 78% of scroll, giving the final SEO Executive stage
  // a generous stationary buffer (nearly 1.5 viewport heights) to comfortably read before Contact enters
  const progress = Math.max(0, Math.min(1, rawProgress / 0.78));

  let active = 0;
  if (rawProgress >= 0.48) {
    active = 2;
  } else if (rawProgress >= 0.20) {
    active = 1;
  } else {
    active = 0;
  }

  return { progress, active };
}

export function updateScenes() {
  updateActiveSection();
  const stages = all(".career-stage");
  if (stages.length) {
    const career = getCareerState(stages);
    const journey = document.querySelector<HTMLElement>("#journey");
    const route = document.querySelector<HTMLElement>(".career-route");
    if (journey && route) {
      journey.style.setProperty("--career-progress", career.progress.toFixed(4));
      route.style.setProperty("--career-progress", career.progress.toFixed(4));
      const orbitX = (45 + 70 * career.progress) / 160;
      route.style.setProperty("--sun-y", `${(75 + 70 * (1 - Math.sqrt(1 - (2 * orbitX - 1) ** 2))).toFixed(2)}%`);
      stages.forEach((stage, index) => stage.classList.toggle("is-current", index === career.active));
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
