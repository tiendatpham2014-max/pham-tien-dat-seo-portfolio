import { IntroSplash } from "@/components/sections/IntroSplash";
import { SitePreferences } from "@/components/site-preferences";
import { SkipLink } from "@/components/sections/SkipLink";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Evidence } from "@/components/sections/Evidence";
import { Skills } from "@/components/sections/Skills";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SearchAtlas } from "@/components/sections/SearchAtlas";
import type { Language } from "@/content/portfolio";

export function PortfolioPage({ language }: { language: Language }) {
  return (
    <SitePreferences initialLanguage={language}>
      <IntroSplash />
      <SkipLink />
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <SearchAtlas />
        <Evidence />
        <Journey />
        <Skills />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </SitePreferences>
  );
}
