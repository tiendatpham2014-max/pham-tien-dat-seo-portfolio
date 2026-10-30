import { IntroSplash } from "@/components/sections/IntroSplash";
import { PortfolioShell } from "@/components/portfolio-shell";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Evidence } from "@/components/sections/Evidence";
import { Skills } from "@/components/sections/Skills";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <IntroSplash />
      <a className="skip-link" href="#main" data-i18n="skip">Đi tới nội dung</a>
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Journey />
        <Evidence />
        <Skills />
        <Writing />
        <Contact />
      </main>
      <Footer />
      <PortfolioShell />
    </>
  );
}
