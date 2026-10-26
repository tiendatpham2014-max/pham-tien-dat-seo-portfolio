import { metricData } from "@/content/gsc";
import { all, get, text } from "./dom";
import { state, type Metric } from "./state";

export function formatMetric(value: number, unit: "integer" | "percent" | "decimal") {
  const locale = state.language === "vi" ? "vi-VN" : "en-US";
  if (unit === "integer") return new Intl.NumberFormat(locale).format(value);
  if (unit === "percent") return `${new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}%`;
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
}

export function renderMetric() {
  const item = metricData[state.currentMetric];
  text("#metric-title", item.title[state.language]);
  text("#metric-before", formatMetric(item.before, item.unit));
  text("#metric-after", formatMetric(item.after, item.unit));
  get("#meter-before").style.width = `${item.beforeWidth}%`;
  get("#meter-after").style.width = `${item.afterWidth}%`;
  text("#metric-reading", item.reading[state.language]);
  all<HTMLButtonElement>("[data-metric]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.metric === state.currentMetric)));
}

export function initMetrics(signal: AbortSignal) {
  all<HTMLButtonElement>("[data-metric]").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.metric && button.dataset.metric in metricData) {
      state.currentMetric = button.dataset.metric as Metric;
      renderMetric();
    }
  }, { signal }));
  renderMetric();
}
