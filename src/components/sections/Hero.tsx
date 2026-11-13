"use client";

import { useCopy } from "@/components/site-preferences";

export function Hero() {
  const words = useCopy();
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-waves-bg" aria-hidden="true">
        <canvas id="hero-waves-canvas" />
        <div className="waves-glow" />
        <div className="waves-grain" />
      </div>

      <div className="shell hero-inner">
        <div className="hero-main hero-clean-main">
          <h1 id="hero-title" className="hero-name">{words.heroName}</h1>
          <p className="hero-job-title">{words.heroJobTitle}</p>
          <p className="hero-tagline">{words.heroTagline}</p>
        </div>

        <div className="hero-bottom hero-clean-bottom">
          <div className="hero-social" aria-label={words.heroSocialAria}>
            <a href="mailto:tiendatpham2014@gmail.com">Email ↗</a>
            <a href="https://www.linkedin.com/in/ph%E1%BA%A1m-ti%E1%BA%BFn-%C4%91%E1%BA%A1t-b9a157444/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </div>
          <a className="hero-scroll-cue" href="#about">{words.scrollHint}</a>
        </div>
      </div>
    </section>
  );
}
