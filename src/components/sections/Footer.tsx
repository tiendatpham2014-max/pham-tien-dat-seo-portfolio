"use client";

import { useCopy } from "@/components/site-preferences";

export function Footer() {
  const words = useCopy();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div>
            <a className="footer-name" href="#top">Phạm Tiến Đạt</a>
            <p>{words.footerLine}</p>
          </div>
          <div className="footer-links">
            <div>
              <span>{words.footerExplore}</span>
              <a href="#work">{words.navWork}</a>
              <a href="#skills">{words.navSkills}</a>
              <a href="#writing">{words.navWriting}</a>
            </div>
            <div>
              <span>{words.footerConnect}</span>
              <a href="#journey">{words.navJourney}</a>
              <a href="#contact">{words.navContact}</a>
              <a href="https://primas.net/author/datpt/" target="_blank" rel="noopener noreferrer">{words.footerAuthor}</a>
              <a href="https://www.linkedin.com/in/ph%E1%BA%A1m-ti%E1%BA%BFn-%C4%91%E1%BA%A1t-b9a157444/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© <span id="year">2026</span> Phạm Tiến Đạt</span>
          <a href="#top">{words.backTop}</a>
        </div>
      </div>
    </footer>
  );
}
