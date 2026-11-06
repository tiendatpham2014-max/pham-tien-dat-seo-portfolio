"use client";

import { useState } from "react";
import { metricData } from "@/content/gsc";
import { useCopy, useSitePreferences } from "@/components/site-preferences";
import { formatMetric } from "@/components/portfolio/metrics";

type FeaturedMetric = "clicks" | "impressions" | "ctr";

function labelledNote(value: string) {
  const separator = value.indexOf(":");
  if (separator < 0) return value;
  return <><strong>{value.slice(0, separator + 1)}</strong>{value.slice(separator + 1)}</>;
}

export function Evidence() {
  const words = useCopy();
  const { language } = useSitePreferences();
  const [activeMetric, setActiveMetric] = useState<FeaturedMetric>("clicks");
  const posterMetrics = [
    { key: "clicks", label: language === "vi" ? "Lượt nhấp" : "Clicks", change: words.changeClicks },
    { key: "impressions", label: language === "vi" ? "Hiển thị" : "Impressions", change: words.changeImpressions },
    { key: "ctr", label: "CTR", change: words.changeCtr },
  ] as const;
  const featuredMetric = posterMetrics.find(({ key }) => key === activeMetric) ?? posterMetrics[0];
  const featuredData = metricData[featuredMetric.key];
  const tableRows = [
    { label: words.tableClicks, before: 13795, after: 17540, unit: "integer", change: words.changeClicks },
    { label: words.tableImpressions, before: 1358505, after: 1290541, unit: "integer", change: words.changeImpressions },
    { label: "CTR", before: 1.02, after: 1.36, unit: "percent", change: words.changeCtr },
    { label: words.tablePosition, before: 28, after: 23, unit: "decimal", change: words.changePosition },
    { label: words.tableNonbrand, before: 13030, after: 17184, unit: "integer", change: words.changeNonbrand },
    { label: words.tableNonbrandCtr, before: .96, after: 1.33, unit: "percent", change: words.changeNonbrandCtr },
  ] as const;

  return (
    <section className="work section-space dark-section" id="work" aria-labelledby="work-title">
      <div className="shell">
        <div className="case-cover">
          <div className="case-cover-intro">
            <p className="case-cover-label">{words.workEyebrow}</p>
            <h2 className="display-heading" id="work-title">{words.workTitle}</h2>
            <p>{words.workIntro}</p>
          </div>
        </div>

        <div className="evidence-poster">
          <div className="evidence-poster-lead">
            <span className="evidence-poster-period">Q3/2025 <span aria-hidden="true">↔</span> Q3/2026</span>
            <strong className={featuredMetric.key === "impressions" ? "is-negative" : ""} key={featuredMetric.key}>{featuredMetric.change}</strong>
            <span className="evidence-poster-label">{featuredMetric.label}</span>
            <p>{words.workScope}</p>
          </div>
          <div className="evidence-poster-metrics">
            <div className="evidence-poster-picker" role="group" aria-label={words.metricsLabel}>
              {posterMetrics.map(({ key, label, change }) => (
                <button key={key} type="button" aria-pressed={activeMetric === key} onClick={() => setActiveMetric(key)}>
                  <span>{label}</span><strong>{change}</strong>
                </button>
              ))}
            </div>
            <div className={`evidence-poster-metric evidence-poster-${featuredMetric.key}`} aria-live="polite">
              <div className="evidence-poster-bar"><span>2025</span><i><b style={{ width: `${featuredData.beforeWidth}%` }} /></i><em>{formatMetric(featuredData.before, featuredData.unit, language)}</em></div>
              <div className="evidence-poster-bar"><span>2026</span><i><b style={{ width: `${featuredData.afterWidth}%` }} /></i><em>{formatMetric(featuredData.after, featuredData.unit, language)}</em></div>
              <p>{featuredData.reading[language]}</p>
            </div>
          </div>
        </div>

        <details className="data-table-toggle">
          <summary><span>{words.toggleTable}</span></summary>
          <div className="data-table-wrap">
            <table className="data-table">
              <caption>{words.tableCaption}</caption>
              <thead><tr><th scope="col">{words.tableMetric}</th><th scope="col">Q3/2025</th><th scope="col">Q3/2026</th><th scope="col">{words.tableChange}</th></tr></thead>
              <tbody>
                {tableRows.map((row) => <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td data-label="2025">{formatMetric(row.before, row.unit, language)}</td>
                  <td data-label="2026">{formatMetric(row.after, row.unit, language)}</td>
                  <td data-label={words.tableChange}>{row.change}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </details>

        <div className="case-notes">
          <p>{labelledNote(words.caseContribution)}</p>
          <p>{labelledNote(words.sitewideDisclaimer)}</p>
          <p>{labelledNote(words.nonbrandFootnote)}</p>
          <p>{labelledNote(words.caseSource)}</p>
        </div>
      </div>
    </section>
  );
}
