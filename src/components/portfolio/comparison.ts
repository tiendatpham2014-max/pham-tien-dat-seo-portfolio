import { get } from "./dom";
import { state } from "./state";

export function updateComparison() {
  const slider = get<HTMLInputElement>("#compare-slider");
  const value = Number(slider.value);
  get("#compare-wipe").style.setProperty("--split", `${value}%`);
  slider.setAttribute("aria-valuetext", state.language === "vi"
    ? `${100 - value}% kỳ trước, ${value}% kỳ sau`
    : `${100 - value}% earlier period, ${value}% later period`);
}

export function initComparison(signal: AbortSignal) {
  get("#compare-slider").addEventListener("input", updateComparison, { signal });
  updateComparison();
}
