"use client";

import { copy } from "@/content/portfolio";
import { useSitePreferences } from "@/components/site-preferences";
import { state } from "@/components/portfolio/state";

const links = [
  ["about", "navAbout"], ["atlas", "navAtlas"], ["work", "navWork"],
  ["journey", "navJourney"], ["skills", "navSkills"],
  ["writing", "navWriting"], ["contact", "navContact"],
] as const;

export function Navigation() {
  const { language, theme, changeLanguage, changeTheme } = useSitePreferences();
  const words = copy[language];
  const themeLabel = language === "vi"
    ? theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"
    : theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <>
      <header className="site-header" id="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label={words.brandAria}>
            <img src="/branding/dat-pham-signature-writing.svg" alt="Phạm Tiến Đạt" className="brand-signature brand-dark" width={114} height={38} />
            <img src="/branding/dat-pham-signature-writing-light.svg" alt="Phạm Tiến Đạt" className="brand-signature brand-light" width={114} height={38} />
          </a>
          <nav className="desktop-nav" id="desktop-nav" aria-label={words.navigation}>
            {links.map(([id, key]) => <a href={`#${id}`} key={id}>{words[key]}</a>)}
            <span className="nav-indicator" aria-hidden="true" />
          </nav>
          <div className="header-actions">
            <div className="language-switch" role="group" aria-label="Language">
              <button type="button" data-lang="vi" aria-pressed={language === "vi"} onClick={() => changeLanguage("vi")}>VI</button>
              <span aria-hidden="true">/</span>
              <button type="button" data-lang="en" aria-pressed={language === "en"} onClick={() => changeLanguage("en")}>EN</button>
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
        {links.map(([id, key]) => <a href={`#${id}`} key={id}>{words[key]}</a>)}
      </nav>
    </>
  );
}
