"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { metricData } from "@/content/gsc";
import { useCopy, useSitePreferences } from "@/components/site-preferences";
import { formatMetric } from "@/components/portfolio/metrics";

type Metric = keyof typeof metricData;

function labelledNote(value: string) {
  const separator = value.indexOf(":");
  if (separator < 0) return value;
  return <><strong>{value.slice(0, separator + 1)}</strong>{value.slice(separator + 1)}</>;
}

export function Evidence() {
  const words = useCopy();
  const { language } = useSitePreferences();
  const [activeMetric, setActiveMetric] = useState<Metric>("clicks");
  const metric = metricData[activeMetric];
  const posterMetrics = [
    { key: "clicks", label: language === "vi" ? "Lượt nhấp" : "Clicks", change: words.changeClicks },
    { key: "impressions", label: language === "vi" ? "Hiển thị" : "Impressions", change: words.changeImpressions },
    { key: "ctr", label: "CTR", change: words.changeCtr },
  ] as const;
  const featuredMetric = posterMetrics.find(({ key }) => key === activeMetric) ?? posterMetrics[0];
  const featuredData = metricData[featuredMetric.key];
  return (
    <>
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
          {posterMetrics.map(({ key, label, change }) => <button key={key} type="button" aria-pressed={activeMetric === key} onClick={() => setActiveMetric(key)}><span>{label}</span><strong>{change}</strong></button>)}
        </div>
        <div className={`evidence-poster-metric evidence-poster-${featuredMetric.key}`} key={featuredMetric.key} aria-live="polite">
          <div className="evidence-poster-bar"><span>2025</span><i><b style={{ width: `${featuredData.beforeWidth}%` }} /></i><em>{formatMetric(featuredData.before, featuredData.unit, language)}</em></div>
          <div className="evidence-poster-bar"><span>2026</span><i><b style={{ width: `${featuredData.afterWidth}%` }} /></i><em>{formatMetric(featuredData.after, featuredData.unit, language)}</em></div>
          <p>{featuredData.reading[language]}</p>
        </div>
      </div>
    </div>

    <details className="case-explore">
      <summary>{words.exploreData}<span aria-hidden="true">↗</span></summary>
      <div className="case-explore-content">
    <div className="metric-stage">
      <div className="metric-stage-top">
        <div>
          <h3 id="metric-title">{metric.title[language]}</h3>
        </div>
        <div className="metric-picker" role="group" aria-label={words.metricsLabel}>
          <button type="button" data-metric="clicks" aria-pressed={activeMetric === "clicks"} onClick={() => setActiveMetric("clicks")}>{words.metricClicks}</button>
          <button type="button" data-metric="impressions" aria-pressed={activeMetric === "impressions"} onClick={() => setActiveMetric("impressions")}>{words.metricImpressions}</button>
          <button type="button" data-metric="ctr" aria-pressed={activeMetric === "ctr"} onClick={() => setActiveMetric("ctr")}>CTR</button>
          <button type="button" data-metric="position" aria-pressed={activeMetric === "position"} onClick={() => setActiveMetric("position")}>{words.metricPosition}</button>
        </div>
      </div>
      <div className="metric-comparison" aria-live="polite">
        <div className="period-card">
          <span>{words.period2025}</span>
          <strong id="metric-before">{formatMetric(metric.before, metric.unit, language)}</strong>
          <div className="meter"><span id="meter-before" style={{ width: `${metric.beforeWidth}%` }} /></div>
        </div>
        <div className="period-card">
          <span>{words.period2026}</span>
          <strong id="metric-after">{formatMetric(metric.after, metric.unit, language)}</strong>
          <div className="meter"><span id="meter-after" style={{ width: `${metric.afterWidth}%` }} /></div>
        </div>
      </div>
      <p className="metric-reading" id="metric-reading">{metric.reading[language]}</p>
    </div>

    <div className="compare-wrap">
      <div className="compare-caption">
        <span className="section-label">{words.compareLabel}</span>
        <span>{words.compareHint}</span>
      </div>
      <div className="compare-wipe" id="compare-wipe" style={{ "--split": "50%" } as CSSProperties}>
        <div className="compare-layer compare-before">
          <span className="compare-period">Q3/2025</span>
          <div className="compare-bars">
            <div className="compare-bar-row">
              <span className="bar-tag">Clicks</span>
              <i style={{ "--bar": "78.6%" } as CSSProperties}><em>{words.wipeBeforeClicks}</em></i>
            </div>
            <div className="compare-bar-row">
              <span className="bar-tag">Impressions</span>
              <i style={{ "--bar": "100%" } as CSSProperties}><em>{words.wipeBeforeImp}</em></i>
            </div>
            <div className="compare-bar-row">
              <span className="bar-tag">CTR</span>
              <i style={{ "--bar": "75%" } as CSSProperties}><em>{words.wipeBeforeCtr}</em></i>
            </div>
          </div>
        </div>
        <div className="compare-layer compare-after">
          <span className="compare-period">Q3/2026</span>
          <div className="compare-bars">
            <div className="compare-bar-row">
              <span className="bar-tag">Clicks</span>
              <i style={{ "--bar": "100%" } as CSSProperties}><em>{words.wipeAfterClicks}</em></i>
            </div>
            <div className="compare-bar-row">
              <span className="bar-tag">Impressions</span>
              <i style={{ "--bar": "95%" } as CSSProperties}><em>{words.wipeAfterImp}</em></i>
            </div>
            <div className="compare-bar-row">
              <span className="bar-tag">CTR</span>
              <i style={{ "--bar": "100%" } as CSSProperties}><em>{words.wipeAfterCtr}</em></i>
            </div>
          </div>
        </div>
        <div className="compare-divider" aria-hidden="true"><span>↔</span></div>
        <input
          id="compare-slider"
          type="range"
          min={0}
          max={100}
          defaultValue={50}
          aria-label={words.compareSlider}
        />
      </div>
      <div className="compare-legend" aria-hidden="true">
        <span>Clicks</span>
        <span>Impressions</span>
        <span>CTR</span>
      </div>
    </div>
      </div>
    </details>

    <details className="data-table-toggle">
      <summary>
        <span>{words.toggleTable}</span>
      </summary>
      <div className="data-table-wrap">
        <table className="data-table">
          <caption>{words.tableCaption}</caption>
          <thead>
            <tr>
              <th scope="col">{words.tableMetric}</th>
              <th scope="col">Q3/2025</th>
              <th scope="col">Q3/2026</th>
              <th scope="col">{words.tableChange}</th>
            </tr>
          </thead>
          <tbody>
            <tr><th scope="row">{words.tableClicks}</th><td>{formatMetric(13795, "integer", language)}</td><td>{formatMetric(17540, "integer", language)}</td><td>{words.changeClicks}</td></tr>
            <tr><th scope="row">{words.tableImpressions}</th><td>{formatMetric(1358505, "integer", language)}</td><td>{formatMetric(1290541, "integer", language)}</td><td>{words.changeImpressions}</td></tr>
            <tr><th scope="row">CTR</th><td>{formatMetric(1.02, "percent", language)}</td><td>{formatMetric(1.36, "percent", language)}</td><td>{words.changeCtr}</td></tr>
            <tr><th scope="row">{words.tablePosition}</th><td>{formatMetric(28, "decimal", language)}</td><td>{formatMetric(23, "decimal", language)}</td><td>{words.changePosition}</td></tr>
            <tr><th scope="row">{words.tableNonbrand}</th><td>{formatMetric(13030, "integer", language)}</td><td>{formatMetric(17184, "integer", language)}</td><td>{words.changeNonbrand}</td></tr>
            <tr><th scope="row">{words.tableNonbrandCtr}</th><td>{formatMetric(0.96, "percent", language)}</td><td>{formatMetric(1.33, "percent", language)}</td><td>{words.changeNonbrandCtr}</td></tr>
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
    </>
  );
}
