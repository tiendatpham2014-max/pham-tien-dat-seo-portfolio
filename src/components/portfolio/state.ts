
export const state = {
  theme: "dark" as "dark" | "light",
  menuOpen: false,
  currentSignal: 0,
  activeSection: "",
};

export const sections = ["about", "atlas", "work", "journey", "skills", "writing", "contact"] as const;

export function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function resetState() {
  state.theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  state.menuOpen = false;
  state.currentSignal = 0;
  state.activeSection = "";
}
