"use client";

import { useCopy } from "@/components/site-preferences";

export function BattleBots() {
  const words = useCopy();

  return (
    <section className="battlebots section-space" id="battlebots" aria-labelledby="battlebots-title">
      <div className="shell battlebots-shell">
        <div className="battlebots-header">
          <div className="battlebots-heading">
            <p className="battlebots-eyebrow">{words.battleEyebrow}</p>
            <h2 id="battlebots-title">Battle<span>Bots</span><i>.</i></h2>
          </div>
          <div className="battlebots-intro">
            <p className="battlebots-team">{words.battleTeam}</p>
            <p>{words.battleIntro}</p>
          </div>
        </div>

        <div className="battlebots-output-heading">
          <span>{words.battleOutputLabel}</span>
        </div>
        <div className="battlebots-outputs">
          {words.battleOutputs.map((output, index) => (
            <article className="battlebots-output" key={index}>
              <span className="battlebots-output-index" aria-hidden="true">0{index + 1}</span>
              <h3>{output.title}</h3>
              <p>{output.detail}</p>
            </article>
          ))}
        </div>

        <div className="battlebots-maintenance">
          <h3>{words.battleMaintenanceLabel}</h3>
          <p>{words.battleMaintenance}</p>
        </div>
      </div>
    </section>
  );
}
