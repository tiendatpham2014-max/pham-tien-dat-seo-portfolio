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
    title: "2024 Trending Software Solutions for Businesses",
    url: "https://primas.net/best-2024-trending-software-solutions-for-businesses/",
  },
];

export function Writing() {
  return (
    <section className="writing section-space" id="writing" aria-labelledby="writing-title">
      <div className="shell">
        <div className="section-head">
          <h2 className="display-heading" id="writing-title" data-i18n="writingTitle">Bài viết đã xuất bản.</h2>
          <p data-i18n="writingIntro">Bốn bài viết tiếng Anh dưới tên Dat Pham tại Primas.</p>
        </div>
        <div className="rail-controls">
          <span data-i18n="railHint">Vuốt hoặc dùng mũi tên để xem bài viết</span>
          <div>
            <button type="button" id="rail-prev" aria-label="Bài trước" data-i18n-aria="railPrev">←</button>
            <button type="button" id="rail-next" aria-label="Bài tiếp theo" data-i18n-aria="railNext">→</button>
          </div>
        </div>
        <div className="article-rail" id="article-rail">
          {articles.map((article) => (
            <a className="article-card" href={article.url} target="_blank" rel="noopener noreferrer" key={article.url}>
              <span className="article-top">{article.label} <span aria-hidden="true">↗</span></span>
              <strong>{article.title}</strong>
              <span className="article-link" data-i18n="readArticle">Đọc bài viết ↗</span>
            </a>
          ))}
        </div>
        <div className="writing-footer">
          <a className="text-link" href="https://primas.net/author/datpt/" target="_blank" rel="noopener noreferrer" data-i18n="authorLink">Xem trang tác giả ↗</a>
          <span id="rail-status" aria-live="polite">1 / 4</span>
        </div>
      </div>
    </section>
  );
}
