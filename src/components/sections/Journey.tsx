"use client";

import type { CSSProperties } from "react";
import { useCopy } from "@/components/site-preferences";

export function Journey() {
  const words = useCopy();
  return (
    <>
<section className="journey" id="journey" aria-labelledby="journey-title">
  <div className="journey-sticky">
    <div className="career-route" aria-hidden="true">
      <div className="career-sky" />
      <div className="career-dawn" />
      <div className="career-planet" />
      <div className="career-rim" />
      <div className="career-sun" />
      <div className="career-horizon-markers"><span /><span /><span /></div>
    </div>
    <div className="shell journey-scene">
      <div className="journey-heading">
        <h2 className="display-heading" id="journey-title">{words.journeyTitle}</h2>
        <p className="journey-intro">{words.journeyIntro}</p>
      </div>
      <div className="career-stages" aria-label={words.careerStagesAria}>
        <article className="career-stage is-current" style={{ "--stage-shift": "-10%" } as CSSProperties}>
          <h3>{words.internTitle}</h3>
          <p className="career-org">Primas Group <span className="org-sep">·</span> <time>{words.dateIntern}</time></p>
          <p>{words.internBody}</p>
        </article>
        <article className="career-stage" style={{ "--stage-shift": "-50%" } as CSSProperties}>
          <h3>{words.contributorTitle}</h3>
          <p className="career-org">Primas Group <span className="org-sep">·</span> <time>{words.dateContributor}</time></p>
          <p>{words.contributorBody}</p>
        </article>
        <article className="career-stage" style={{ "--stage-shift": "-90%" } as CSSProperties}>
          <h3>SEO Executive</h3>
          <p className="career-org">Primas Group <span className="org-sep">·</span> <time>{words.dateExecutive}</time></p>
          <p>{words.executiveBody}</p>
        </article>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
