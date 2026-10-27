import { all, get } from "./dom";
import { reducedMotion, state } from "./state";

let timer: ReturnType<typeof setTimeout> | undefined;
let focusTimer: ReturnType<typeof setTimeout> | undefined;

export function stopSkillTimer() {
  if (timer) clearTimeout(timer);
  timer = undefined;
  get(".skill-tabs").classList.remove("is-autoplay");
}

function canAutoSkill() {
  return state.skillVisible && !state.skillHover && !state.skillFocus &&
    !state.manualSkill && !reducedMotion() && document.visibilityState === "visible";
}

export function scheduleSkillTimer() {
  stopSkillTimer();
  if (!canAutoSkill()) return;
  void get(".skill-tabs").offsetWidth;
  get(".skill-tabs").classList.add("is-autoplay");
  timer = setTimeout(() => activateSkill(state.currentSkill + 1), 7000);
}

export function activateSkill(index: number, user = false) {
  const tabs = all<HTMLButtonElement>("[data-skill]");
  const panels = all(".skill-panels [role=tabpanel]");
  state.currentSkill = (index + tabs.length) % tabs.length;
  tabs.forEach((tab, i) => {
    tab.setAttribute("aria-selected", String(i === state.currentSkill));
    tab.tabIndex = i === state.currentSkill ? 0 : -1;
  });
  panels.forEach((panel, i) => { panel.hidden = i !== state.currentSkill; });
  stopSkillTimer();
  if (user) {
    state.manualSkill = true; // Permanently respect user's manual selection
  } else {
    scheduleSkillTimer();
  }
}

export function initSkills(signal: AbortSignal) {
  const tabs = all<HTMLButtonElement>("[data-skill]");
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateSkill(index, true), { signal });
    tab.addEventListener("keydown", (event) => {
      let next = index;
      if (event.key === "ArrowRight") next = index + 1;
      else if (event.key === "ArrowLeft") next = index - 1;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else if (event.key === " " || event.key === "Enter") {
        event.preventDefault(); activateSkill(index, true); return;
      } else return;
      event.preventDefault(); activateSkill(next, true); tabs[state.currentSkill].focus();
    }, { signal });
  });
  get("#skills").addEventListener("mouseenter", () => { state.skillHover = true; stopSkillTimer(); }, { signal });
  get("#skills").addEventListener("mouseleave", () => {
    state.skillHover = false;
    scheduleSkillTimer();
  }, { signal });
  get("#skills").addEventListener("focusin", () => { state.skillFocus = true; stopSkillTimer(); }, { signal });
  get("#skills").addEventListener("focusout", () => {
    focusTimer = setTimeout(() => {
      state.skillFocus = get("#skills").contains(document.activeElement);
      scheduleSkillTimer();
    }, 0);
  }, { signal });
  document.addEventListener("visibilitychange", () => {
    document.body.classList.toggle("page-hidden", document.hidden);
    scheduleSkillTimer();
  }, { signal });
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", scheduleSkillTimer, { signal });
  signal.addEventListener("abort", () => {
    stopSkillTimer();
    if (focusTimer) clearTimeout(focusTimer);
  }, { once: true });
}
