export function Writing() {
  return (
    <>
<section className="writing section-space" id="writing" aria-labelledby="writing-title">
  <div className="shell"><div className="section-head"><div><span className="section-label" data-i18n="writingLabel">Published writing</span><h2 className="display-heading" id="writing-title" data-i18n="writingTitle">Bài viết đã xuất bản.</h2></div><p data-i18n="writingIntro">Ba bài viết tiếng Anh về IVR, CTI và trải nghiệm khách hàng, xuất bản dưới tên Dat Pham tại Primas.</p></div>
    <div className="rail-controls"><span data-i18n="railHint">Vuốt hoặc dùng mũi tên để xem bài viết</span><div><button type="button" id="rail-prev" aria-label="Bài trước">←</button><button type="button" id="rail-next" aria-label="Bài tiếp theo">→</button></div></div>
    <div className="article-rail" id="article-rail">
      <a className="article-card" href="https://primas.net/5-key-benefits-of-interactive-voice-response-ivr/" target="_blank" rel="noopener noreferrer"><span className="article-top">Primas / IVR <span aria-hidden="true">↗</span></span><strong>5 Key Benefits of Interactive Voice Response (IVR)</strong><p data-i18n="articleIvr">Về lợi ích của hệ thống trả lời thoại tương tác trong trải nghiệm khách hàng.</p><span className="article-link" data-i18n="readArticle">Đọc bài viết ↗</span></a>
      <a className="article-card" href="https://primas.net/simple-reasons-why-your-business-need-computer-telephony-integration/" target="_blank" rel="noopener noreferrer"><span className="article-top">Primas / CTI <span aria-hidden="true">↗</span></span><strong>Simple Reasons Why Your Business Need Computer Telephony Integration?</strong><p data-i18n="articleCti">Về lý do doanh nghiệp quan tâm đến tích hợp điện thoại và máy tính.</p><span className="article-link" data-i18n="readArticle">Đọc bài viết ↗</span></a>
      <a className="article-card" href="https://primas.net/best-5-customer-experience-cx-solutions-to-watch-in-2026/" target="_blank" rel="noopener noreferrer"><span className="article-top">Primas / CX <span aria-hidden="true">↗</span></span><strong>Best 5 Customer Experience (CX) Solutions to Watch in 2026</strong><p data-i18n="articleCx">Về các hướng giải pháp trải nghiệm khách hàng được đề cập cho năm 2026.</p><span className="article-link" data-i18n="readArticle">Đọc bài viết ↗</span></a>
    </div>
    <div className="writing-footer"><a className="text-link" href="https://primas.net/author/datpt/" target="_blank" rel="noopener noreferrer" data-i18n="authorLink">Xem trang tác giả ↗</a><span id="rail-status" aria-live="polite">1 / 3</span></div>
  </div>
</section>

    </>
  );
}
