import { get } from "./dom";
import { state } from "./state";

const STORAGE_KEY = "dat-seo-theme";

export function updateThemeColor() {
  get<HTMLMetaElement>('meta[name="theme-color"]').content = state.theme === "dark" ? "#101827" : "#f8fafc";
}

export function setTheme(theme: "dark" | "light", persist = true) {
  state.theme = theme;
  if (theme === "light") document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  updateThemeColor();
  if (persist) try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* Storage may be unavailable. */ }
}

