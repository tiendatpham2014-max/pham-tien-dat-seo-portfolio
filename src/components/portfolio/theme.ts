import { get } from "./dom";
import { state } from "./state";

const STORAGE_KEY = "dat-seo-theme";

export function updateThemeControl() {
  const label = state.language === "vi"
    ? state.theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"
    : state.theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  const button = get<HTMLButtonElement>("#theme-toggle");
  button.setAttribute("aria-label", label);
  button.title = label;
  get<HTMLMetaElement>('meta[name="theme-color"]').content = state.theme === "dark" ? "#101827" : "#f5f3ed";
}

export function setTheme(theme: "dark" | "light") {
  state.theme = theme;
  if (theme === "light") document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  updateThemeControl();
  try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* Storage may be unavailable. */ }
}

export function initTheme(signal: AbortSignal) {
  state.theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  get("#theme-toggle").addEventListener("click", () => setTheme(state.theme === "dark" ? "light" : "dark"), { signal });
  updateThemeControl();
}
