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
  get<HTMLMetaElement>('meta[name="theme-color"]').content = state.theme === "dark" ? "#101827" : "#f8fafc";
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

  // Listen to OS/browser dark/light theme switch if user hasn't explicitly set localStorage
  if (window.matchMedia) {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    media.addEventListener("change", (e) => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setTheme(e.matches ? "light" : "dark");
        }
      } catch {}
    }, { signal });
  }

  updateThemeControl();
}
