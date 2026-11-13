"use client";

import { useCopy, useSitePreferences } from "@/components/site-preferences";

export function Footer({ isShowcase = false }: { isShowcase?: boolean }) {
  const words = useCopy();
  const { language } = useSitePreferences();
  const homeHref = language === "vi" ? "/" : "/en/";
  const sectionHref = (id: string) => isShowcase ? `${homeHref}#${id}` : `#${id}`;

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div>
            <a className="footer-name" href={sectionHref("top")}>Phạm Tiến Đạt</a>
            <p>{words.footerLine}</p>
          </div>
          <div className="footer-links">
            <div>
              <span>{words.footerExplore}</span>
              <a href={sectionHref("work")}>{words.navWork}</a>
              <a href={sectionHref("skills")}>{words.navSkills}</a>
              <a href={sectionHref("writing")}>{words.navWriting}</a>
            </div>
            <div>
              <span>{words.footerConnect}</span>
              <a href={sectionHref("journey")}>{words.navJourney}</a>
              <a href={sectionHref("contact")}>{words.navContact}</a>
              <a href="https://primas.net/author/datpt/" target="_blank" rel="nofollow noopener noreferrer">{words.footerAuthor}</a>
              <a href="https://www.linkedin.com/in/ph%E1%BA%A1m-ti%E1%BA%BFn-%C4%91%E1%BA%A1t-b9a157444/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© <span id="year">2026</span> Phạm Tiến Đạt</span>
          <a href={sectionHref("top")}>{words.backTop}</a>
        </div>
      </div>
    </footer>
  );
}
