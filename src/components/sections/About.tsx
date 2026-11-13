"use client";

import { useCopy, useSitePreferences } from "@/components/site-preferences";

export function About() {
  const words = useCopy();
  const { language } = useSitePreferences();
  return (
    <section className="about section-space" id="about" aria-labelledby="about-title">
      <div className="shell about-layout">
        <div className="about-copy">
          <h2 className="display-heading" id="about-title">{words.aboutTitle}</h2>
          <p className="about-lead">{words.aboutLead}</p>
          <p className="about-bio">{words.aboutBio}</p>
          <a className="about-next" href="#atlas">{words.aboutNext}</a>
          <p className="about-showcase">
            <a href={language === "vi" ? "/showcase/bmw-m4-csl/" : "/en/showcase/bmw-m4-csl/"}>{words.showcaseLink}</a>
          </p>
        </div>
        <div className="about-image-space" aria-hidden="true" />
      </div>
      <div className="about-chapter-bridge" aria-hidden="true" />
    </section>
  );
}
