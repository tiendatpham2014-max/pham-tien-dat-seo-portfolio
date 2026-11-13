"use client";

import type { MouseEvent } from "react";
import { copy, type Language } from "@/content/portfolio";
import { useSitePreferences } from "@/components/site-preferences";
import { state } from "@/components/portfolio/state";

const links = [
  ["about", "navAbout"], ["atlas", "navAtlas"], ["work", "navWork"],
  ["journey", "navJourney"], ["skills", "navSkills"],
  ["writing", "navWriting"], ["contact", "navContact"],
] as const;

export function Navigation({ isShowcase = false }: { isShowcase?: boolean }) {
  const { language, theme, changeLanguage, changeTheme } = useSitePreferences();
  const words = copy[language];
  const homeHref = language === "vi" ? "/" : "/en/";
  const garageHref = language === "vi" ? "/showcase/bmw-m4-csl/" : "/en/showcase/bmw-m4-csl/";
  const sectionHref = (id: string) => isShowcase ? `${homeHref}#${id}` : `#${id}`;
  const languageHref = (next: Language) => isShowcase
    ? next === "vi" ? "/showcase/bmw-m4-csl/" : "/en/showcase/bmw-m4-csl/"
    : next === "vi" ? "/" : "/en/";
  const themeLabel = language === "vi"
    ? theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"
    : theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  const switchLanguage = (event: MouseEvent<HTMLAnchorElement>, next: Language) => {
    if (isShowcase || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    changeLanguage(next);
  };

  return (
    <>
      <header className="site-header" id="site-header">
        <div className="shell header-inner">
          <a className="brand" href={isShowcase ? homeHref : "#top"} aria-label={words.brandAria}>
            <img src="/branding/dat-pham-signature-source.png" alt="Phạm Tiến Đạt" className="brand-signature" width={114} height={38} />
          </a>
          <nav className="desktop-nav" id="desktop-nav" aria-label={words.navigation}>
            {links.map(([id, key]) => <a href={sectionHref(id)} key={id}>{words[key]}</a>)}
            <a className="nav-garage" href={garageHref}>{words.heroGarage}</a>
            <span className="nav-indicator" aria-hidden="true" />
          </nav>
          <div className="header-actions">
            <div className="language-switch" role="group" aria-label="Language">
              <a href={languageHref("vi")} data-lang="vi" aria-current={language === "vi" ? "page" : undefined} onClick={(event) => switchLanguage(event, "vi")}>VI</a>
              <span aria-hidden="true">/</span>
              <a href={languageHref("en")} data-lang="en" aria-current={language === "en" ? "page" : undefined} onClick={(event) => switchLanguage(event, "en")}>EN</a>
            </div>
            <button className="theme-toggle" id="theme-toggle" type="button" aria-label={themeLabel} title={themeLabel} onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}>
              <svg className="theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx={12} cy={12} r="3.5" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
              <svg className="theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.2 15.5A8.5 8.5 0 0 1 8.5 3.8 8.5 8.5 0 1 0 20.2 15.5Z" /></svg>
            </button>
            <button className="menu-toggle" id="menu-toggle" type="button" aria-controls="mobile-nav" aria-expanded="false" aria-label={state.menuOpen ? words.menuClose : words.menuOpen}><span /><span /></button>
          </div>
        </div>
      </header>
      <div className="menu-backdrop" id="menu-backdrop" hidden />
      <nav className="mobile-nav" id="mobile-nav" aria-label={words.mobileNavigation} inert>
        {links.map(([id, key]) => <a href={sectionHref(id)} key={id}>{words[key]}</a>)}
        <a className="nav-garage" href={garageHref}>{words.heroGarage}</a>
      </nav>
    </>
  );
}
