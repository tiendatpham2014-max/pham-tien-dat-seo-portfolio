"use client";

import { useCopy } from "@/components/site-preferences";

const articles = [
  {
    label: "Primas / IVR",
    title: "5 Key Benefits of Interactive Voice Response (IVR)",
    url: "https://primas.net/5-key-benefits-of-interactive-voice-response-ivr/",
  },
  {
    label: "Primas / CTI",
    title: "Simple Reasons Why Your Business Need Computer Telephony Integration?",
    url: "https://primas.net/simple-reasons-why-your-business-need-computer-telephony-integration/",
  },
  {
    label: "Primas / CX",
    title: "Best 5 Customer Experience (CX) Solutions to Watch in 2026",
    url: "https://primas.net/best-5-customer-experience-cx-solutions-to-watch-in-2026/",
  },
  {
    label: "Primas / Software",
    title: "Best 2024 Trending Software Solutions for Businesses",
    url: "https://primas.net/best-2024-trending-software-solutions-for-businesses/",
  },
];

export function Writing() {
  const words = useCopy();
  return (
    <section className="writing section-space" id="writing" aria-labelledby="writing-title">
      <div className="shell">
        <div className="section-head">
          <h2 className="display-heading" id="writing-title">{words.writingTitle}</h2>
          <p>{words.writingIntro}</p>
        </div>
        <div className="article-rail" id="article-rail">
          {articles.map((article, index) => (
            <a className="article-card" href={article.url} target="_blank" rel="noopener noreferrer" key={article.url}>
              <span className="article-top"><span className="article-index">0{index + 1}</span>{article.label}</span>
              <strong>{article.title}</strong>
              <span className="article-link">{words.readArticle}</span>
            </a>
          ))}
        </div>
        <div className="writing-footer">
          <a className="text-link" href="https://primas.net/author/datpt/" target="_blank" rel="noopener noreferrer">{words.authorLink}</a>
          <span>04 / PRIMAS.NET</span>
        </div>
      </div>
    </section>
  );
}
