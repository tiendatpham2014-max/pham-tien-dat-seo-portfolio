import { get } from "./dom";

export function updateComparison() {
  const slider = document.querySelector<HTMLInputElement>("#compare-slider");
  const wipe = document.querySelector<HTMLElement>("#compare-wipe");
  if (!slider || !wipe) return;
  const value = Number(slider.value);
  wipe.style.setProperty("--split", `${value}%`);
  slider.setAttribute("aria-valuetext", document.documentElement.lang === "vi"
    ? `${100 - value}% kỳ trước, ${value}% kỳ sau`
    : `${100 - value}% earlier period, ${value}% later period`);
}

export function initComparison(signal: AbortSignal) {
  const slider = document.querySelector<HTMLInputElement>("#compare-slider");
  const wipe = document.querySelector<HTMLElement>("#compare-wipe");
  if (!slider || !wipe) return;

  const setSplit = (value: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(value)));
    slider.value = String(clamped);
    wipe.style.setProperty("--split", `${clamped}%`);
    slider.setAttribute("aria-valuetext", document.documentElement.lang === "vi"
      ? `${100 - clamped}% kỳ trước, ${clamped}% kỳ sau`
      : `${100 - clamped}% earlier period, ${clamped}% later period`);
  };

  slider.addEventListener("input", updateComparison, { signal });

  // Direct touch, S-Pen & pointer drag support for tablets and mobile
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let isHorizontal: boolean | null = null;

  const updateFromPointer = (clientX: number) => {
    const rect = wipe.getBoundingClientRect();
    if (!rect.width) return;
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setSplit(pct);
  };

  wipe.addEventListener("pointerdown", (e: PointerEvent) => {
    if (!e.isPrimary || (e.pointerType === "mouse" && e.button !== 0)) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    isHorizontal = null;
    try {
      wipe.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    updateFromPointer(e.clientX);
  }, { signal });

  wipe.addEventListener("pointermove", (e: PointerEvent) => {
    if (!isDragging) return;
    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);

    if (isHorizontal === null && (dx > 4 || dy > 4)) {
      isHorizontal = dx >= dy;
    }

    if (isHorizontal) {
      updateFromPointer(e.clientX);
    }
  }, { signal });

  const endDrag = (e: PointerEvent) => {
    if (!isDragging) return;
    isDragging = false;
    isHorizontal = null;
    try {
      if (wipe.hasPointerCapture(e.pointerId)) {
        wipe.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  };

  wipe.addEventListener("pointerup", endDrag, { signal });
  wipe.addEventListener("pointercancel", endDrag, { signal });

  updateComparison();
}
