import { copy } from "@/content/portfolio";
import { all, get } from "./dom";
import { reducedMotion, state } from "./state";

let focusTimer: ReturnType<typeof setTimeout> | undefined;

export function closeMenu(returnFocus = false) {
  if (!state.menuOpen) return;
  state.menuOpen = false;
  document.body.classList.remove("menu-open");
  const toggle = get<HTMLButtonElement>("#menu-toggle");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", copy[state.language].menuOpen);
  get("#mobile-nav").inert = true;
  get("#menu-backdrop").hidden = true;
  if (focusTimer) clearTimeout(focusTimer);
  if (returnFocus) toggle.focus();
}

function openMenu() {
  if (state.menuOpen) return;
  state.menuOpen = true;
  document.body.classList.add("menu-open");
  const toggle = get<HTMLButtonElement>("#menu-toggle");
  toggle.setAttribute("aria-expanded", "true");
  toggle.setAttribute("aria-label", copy[state.language].menuClose);
  get("#mobile-nav").inert = false;
  get("#menu-backdrop").hidden = false;
  const focusFirst = () => { if (state.menuOpen) get<HTMLAnchorElement>("#mobile-nav a").focus(); };
  requestAnimationFrame(focusFirst);
  focusTimer = setTimeout(focusFirst, reducedMotion() ? 0 : 380);
}

export function initMobileMenu(signal: AbortSignal) {
  get("#menu-toggle").addEventListener("click", () => state.menuOpen ? closeMenu(true) : openMenu(), { signal });
  get("#menu-backdrop").addEventListener("click", () => closeMenu(true), { signal });
  get("#mobile-nav").addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const links = all<HTMLAnchorElement>("#mobile-nav a");
    const first = links[0], last = links.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }, { signal });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && state.menuOpen) closeMenu(true); }, { signal });
  all<HTMLAnchorElement>("#mobile-nav a").forEach((link) => link.addEventListener("click", () => closeMenu(), { signal }));
  window.matchMedia("(min-width: 1025px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  }, { signal });
  signal.addEventListener("abort", () => { if (focusTimer) clearTimeout(focusTimer); }, { once: true });
}
