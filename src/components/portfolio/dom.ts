export function get<T extends HTMLElement = HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    return document.createElement("div") as unknown as T;
  }
  return element;
}

export function all<T extends HTMLElement = HTMLElement>(selector: string): T[] {
  return Array.from(document.querySelectorAll<T>(selector));
}

export function text(selector: string, value: string) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}
