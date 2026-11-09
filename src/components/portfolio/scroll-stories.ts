import { all } from "./dom";
import { updateActiveSection } from "./navigation";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};
const chapterIds = ["about", "atlas", "work", "journey", "skills", "writing", "contact"];
const setProgress = (element: HTMLElement, property: string, value: number) => {
  const next = value.toFixed(4);
  if (element.style.getPropertyValue(property) !== next) element.style.setProperty(property, next);
};

function updateChapterTransitions() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const height = Math.max(1, window.innerHeight);
  const chapters = chapterIds.map((id) => document.getElementById(id));
  const positions = chapters.map((chapter) => chapter?.getBoundingClientRect());
  const signature = document.querySelector<HTMLElement>(".contact-signature");
  const signatureTop = signature?.getBoundingClientRect().top;
  chapters.forEach((chapter, index) => {
    const rect = positions[index];
    if (!chapter || !rect) return;
    // A chapter takes over while its top crosses the lower half of the viewport.
    const enter = clamp((height * .94 - rect.top) / (height * .62));
    const leave = clamp((rect.bottom - height * .08) / (height * .54));
    const surface = clamp(rect.top / (height * .55));
    setProgress(chapter, "--chapter-enter", enter);
    setProgress(chapter, "--chapter-leave", leave);
    setProgress(chapter, "--chapter-surface", surface);
  });
  if (signature && signatureTop !== undefined) {
    // Keep the handwritten mark tied to the same scroll direction as the chapters.
    const progress = smooth((height * .9 - signatureTop) / (height * .42));
    setProgress(signature, "--signature-progress", progress);
  }
}

function getCareerState(stages: HTMLElement[]) {
  const journey = document.querySelector("#journey");
  if (!journey) return { progress: 0, active: 0 };
  const rect = journey.getBoundingClientRect();
  const travel = Math.max(1, rect.height - window.innerHeight);
  const rawProgress = Math.max(0, Math.min(1, -rect.top / travel));

  // Complete sun arc within first 88% of scroll
  const progress = Math.max(0, Math.min(1, rawProgress / 0.88));

  let active = 0;
  if (rawProgress >= 0.58) {
    active = 2;
  } else if (rawProgress >= 0.28) {
    active = 1;
  } else {
    active = 0;
  }

  return { progress, active };
}

export function updateScenes() {
  document.querySelector(".site-header")?.classList.toggle("is-scrolled", window.scrollY > 24);
  updateActiveSection();
  updateChapterTransitions();
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
