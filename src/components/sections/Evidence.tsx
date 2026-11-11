"use client";

import { Fragment } from "react";
import { useCopy, useSitePreferences } from "@/components/site-preferences";
import { formatMetric } from "@/components/portfolio/metrics";

function labelledNote(value: string) {
  const separator = value.indexOf(":");
  if (separator < 0) return value;
  return <><strong>{value.slice(0, separator + 1)}</strong>{value.slice(separator + 1)}</>;
}

export function Evidence() {
  const words = useCopy();
  const { language } = useSitePreferences();
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
      <div className="work-signal-field" aria-hidden="true" />
      <div className="shell">
        <div className="case-cover">
          <div className="case-cover-intro">
            <p className="case-cover-label">{words.workEyebrow}</p>
            <h2 className="display-heading" id="work-title">
              {words.workTitle.split(" ").map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  {index > 0 ? " " : null}<span className="work-title-word">{word}</span>
                </Fragment>
              ))}
            </h2>
            <p>{words.workIntro}</p>
          </div>
        </div>

        <aside className="project-profile" aria-labelledby="work-role-title">
          <div className="project-profile-head">
            <h3 id="work-role-title">{words.workRoleLabel}</h3>
            <span>{words.workAgencyLabel}</span>
          </div>
          <ol className="project-profile-list">
            {words.workTasks.map((task, index) => (
              <li key={task}><span>0{index + 1}</span><strong>{task}</strong></li>
            ))}
          </ol>
        </aside>

        <details className="data-table-toggle">
          <summary><span>{words.toggleTable}</span><small>{words.evidenceCount}</small></summary>
          <div className="evidence-detail-intro">
            <p>{words.workScope}</p>
            <p>{labelledNote(words.sitewideDisclaimer)}</p>
          </div>
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
          <div className="case-notes">
            <p>{labelledNote(words.nonbrandFootnote)}</p>
            <p>{labelledNote(words.caseSource)}</p>
          </div>
        </details>
      </div>
    </section>
  );
}
