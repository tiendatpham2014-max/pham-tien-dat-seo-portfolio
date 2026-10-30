import { all, get } from "./dom";
import { sections, state } from "./state";

export function positionIndicator() {
  const nav = get("#desktop-nav");
  const active = nav.querySelector<HTMLAnchorElement>('a[aria-current="location"]');
  const indicator = get("#desktop-nav .nav-indicator");
  if (!active) { indicator.style.width = "0"; return; }
  const item = active.getBoundingClientRect();
  const bounds = nav.getBoundingClientRect();
  indicator.style.width = `${item.width}px`;
  indicator.style.transform = `translateX(${item.left - bounds.left}px)`;
}

function setActiveSection(id: string) {
  if (id === "proof") id = "work";
  const header = document.querySelector<HTMLElement>("#site-header");
  if (header) header.dataset.surface = id === "contact" ? "contact" : window.scrollY < window.innerHeight * 0.55 ? "hero" : "content";
  if (state.activeSection === id) return;
  state.activeSection = id;
  all<HTMLAnchorElement>("#desktop-nav a").forEach((link) => {
    if (link.getAttribute("href") === `#${id}`) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  positionIndicator();
}

export function updateActiveSection() {
  const focus = window.innerHeight * 0.45;
  const current = sections.find((id) => {
    const rect = document.getElementById(id)?.getBoundingClientRect();
    return rect && rect.top <= focus && rect.bottom > focus;
  }) ?? "";
  setActiveSection(current);
}
