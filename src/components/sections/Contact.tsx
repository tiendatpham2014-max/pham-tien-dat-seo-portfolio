"use client";

import { CopyEmail } from "@/components/portfolio/CopyEmail";
import { useCopy, useSitePreferences } from "@/components/site-preferences";

export function Contact() {
  const words = useCopy();
  const { language } = useSitePreferences();
  return (
    <section className="contact section-space dark-section" id="contact" aria-labelledby="contact-title">
      <div className="shell contact-editorial">
        <h2 className="display-heading" id="contact-title">{words.contactTitle}</h2>
        <p className="contact-intro-text">{words.contactIntro}</p>
        <div className="contact-editorial-links">
          <CopyEmail language={language} />
          <a href="/resume/">{language === "vi" ? "Xem Resume (EN)" : "View resume"}</a>
          <a href="mailto:tiendatpham2014@gmail.com">Email ↗</a>
          <a href="https://www.linkedin.com/in/ph%E1%BA%A1m-ti%E1%BA%BFn-%C4%91%E1%BA%A1t-b9a157444/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
        <div className="contact-signature" aria-hidden="true">
          <img src="/branding/dat-pham-signature-source.png" alt="" width={250} height={84} loading="lazy" />
        </div>
      </div>
    </section>
  );
}
