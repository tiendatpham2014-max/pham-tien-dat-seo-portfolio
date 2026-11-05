"use client";

import { useCopy } from "@/components/site-preferences";

export function About() {
  const words = useCopy();
  return (
    <section className="about section-space" id="about" aria-labelledby="about-title">
      <div className="shell about-layout">
        <div className="about-copy">
          <span className="rebuild-index" aria-hidden="true">01 / ABOUT</span>
          <h2 className="display-heading" id="about-title">{words.aboutTitle}</h2>
          <p className="about-lead">{words.aboutLead}</p>
          <p className="about-bio">{words.aboutBio}</p>
          <a className="about-next" href="#atlas">{words.aboutNext}</a>
        </div>
        <div className="about-image-space" aria-hidden="true" />
      </div>
      <div className="about-chapter-bridge" aria-hidden="true" />
    </section>
  );
}
