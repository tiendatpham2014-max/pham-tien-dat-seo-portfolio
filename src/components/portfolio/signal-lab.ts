import { copy } from "@/content/portfolio";
import { all, get, text } from "./dom";
import { state } from "./state";

export function renderSignal(animate = false) {
  const lab = get(".signal-lab");
  const steps = all<HTMLButtonElement>("[data-signal-step]");
  lab.style.setProperty("--signal-progress", String(state.currentSignal / (steps.length - 1)));
  lab.dataset.signalPhase = String(state.currentSignal);
  steps.forEach((button, index) => button.setAttribute("aria-pressed", String(index === state.currentSignal)));
  all(".signal-flow span").forEach((node, index) => node.classList.toggle("is-active", index === state.currentSignal));
  const index = String(state.currentSignal + 1).padStart(2, "0");
  text("#signal-count", `${index} / ${String(steps.length).padStart(2, "0")}`);
  text("#signal-index", index);
  text("#signal-question", copy[state.language].signalQuestions[state.currentSignal]);
  text("#signal-detail", copy[state.language].signalDetails[state.currentSignal]);
  text("#signal-outcome", copy[state.language].signalOutcomes[state.currentSignal]);
  if (animate && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    all("#signal-question,#signal-detail,#signal-outcome").forEach((node, order) => {
      node.animate(
        [{ opacity: 0.2, transform: "translateY(9px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 330 + order * 70, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
    });
  }
}

export function initSignalLab(signal: AbortSignal) {
  const steps = all<HTMLButtonElement>("[data-signal-step]");
  steps.forEach((button, index) => button.addEventListener("click", () => {
    state.currentSignal = index;
    renderSignal(true);
  }, { signal }));
  get("#signal-next").addEventListener("click", () => {
    state.currentSignal = (state.currentSignal + 1) % steps.length;
    renderSignal(true);
  }, { signal });
  renderSignal();
}
