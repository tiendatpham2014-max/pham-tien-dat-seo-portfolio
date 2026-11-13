"use client";

import { IntroSplash } from "@/components/sections/IntroSplash";
import { SitePreferences, useCopy, useSitePreferences } from "@/components/site-preferences";
import { SkipLink } from "@/components/sections/SkipLink";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import type { Language } from "@/content/portfolio";

function ShowcaseContent() {
  const words = useCopy();
  const { language } = useSitePreferences();
  const homeHref = language === "vi" ? "/" : "/en/";

  return (
    <>
      <SkipLink />
      <Navigation />
      <main id="main">
        <section className="shell showcase-page">
          <p className="showcase-back">
            <a href={homeHref}>{words.showcaseBack}</a>
          </p>
          <h1 className="showcase-title">{words.showcaseTitle}</h1>
          <p className="showcase-car">{words.showcaseCar}</p>
          <p className="showcase-intro">{words.showcaseIntro}</p>
          <iframe
            src="/showcase/bmw-m4-csl/app/"
            title={words.showcaseCar}
            className="showcase-frame"
            allowFullScreen
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export function ShowcaseBmw({ language }: { language: Language }) {
  return (
    <SitePreferences initialLanguage={language}>
      <IntroSplash />
      <ShowcaseContent />
    </SitePreferences>
  );
}
