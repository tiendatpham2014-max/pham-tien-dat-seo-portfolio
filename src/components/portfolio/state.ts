import type { Language } from "@/content/portfolio";
import type { metricData } from "@/content/gsc";

export type Metric = keyof typeof metricData;

export const state = {
  language: "vi" as Language,
  theme: "dark" as "dark" | "light",
  currentMetric: "clicks" as Metric,
  menuOpen: false,
  currentSignal: 0,
  activeSection: "",
};

export const sections = ["work", "process", "skills", "writing", "journey", "contact"] as const;

export function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function resetState() {
  state.language = "vi";
  state.theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  state.currentMetric = "clicks";
  state.menuOpen = false;
  state.currentSignal = 0;
  state.activeSection = "";
}

