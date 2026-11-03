import type { Language } from "@/content/portfolio";

export function formatMetric(value: number, unit: "integer" | "percent" | "decimal", language: Language) {
  const locale = language === "vi" ? "vi-VN" : "en-US";
  if (unit === "integer") return new Intl.NumberFormat(locale).format(value);
  if (unit === "percent") return `${new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}%`;
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
}
