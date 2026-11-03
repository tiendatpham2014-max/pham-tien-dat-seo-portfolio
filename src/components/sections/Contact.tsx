"use client";

import { useCopy } from "@/components/site-preferences";

export function Contact() {
  const words = useCopy();
  return (
    <section className="contact section-space dark-section" id="contact" aria-labelledby="contact-title">
      <div className="shell contact-editorial">
        <span className="rebuild-index" aria-hidden="true">07 / CONTACT</span>
        <h2 className="display-heading" id="contact-title">{words.contactTitle}</h2>
        <p className="contact-intro-text">{words.contactIntro}</p>
        <div className="contact-editorial-links">
          <a href="mailto:tiendatpham2014@gmail.com">Email ↗</a>
          <a href="https://www.linkedin.com/in/ph%E1%BA%A1m-ti%E1%BA%BFn-%C4%91%E1%BA%A1t-b9a157444/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
        <div className="contact-signature" aria-hidden="true">
          <img src="/branding/dat-pham-signature-writing.svg" alt="" className="contact-signature-dark" width={250} height={84} />
          <img src="/branding/dat-pham-signature-writing-light.svg" alt="" className="contact-signature-light" width={250} height={84} />
        </div>
      </div>
    </section>
  );
}
