export function get<T extends HTMLElement = HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing portfolio element: ${selector}`);
  return element;
}

export function all<T extends HTMLElement = HTMLElement>(selector: string): T[] {
  return Array.from(document.querySelectorAll<T>(selector));
}

export function text(selector: string, value: string) {
  get(selector).textContent = value;
}
