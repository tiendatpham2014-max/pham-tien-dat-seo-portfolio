export function About() {
  return (
    <>
<section className="about section-space" id="about" aria-labelledby="about-title">
  <div className="shell">
    <div className="about-intro-grid">
      <div className="about-headline">
        <h2 className="display-heading" id="about-title" data-i18n="aboutTitle">
          Xin chào, tôi là Đạt.
        </h2>
        <p className="about-lead" data-i18n="aboutLead">
          Tôi là SEO Executive tại Primas Group, chuyên tối ưu hóa tìm kiếm tự nhiên, cấu trúc On-page và quy trình tự động hóa AI cho các nền tảng thị trường Mỹ (US) &amp; quốc tế.
        </p>
        <p className="about-bio" data-i18n="aboutBio">
          Nền tảng Cử nhân Ngôn ngữ Anh Thương mại (TDC) mang lại cho tôi lợi thế lớn trong việc thấu hiểu sâu sắc cách người dùng bản ngữ tư duy và tìm kiếm — chuyển hóa ý định tìm kiếm thành cấu trúc trang chuẩn xác và tăng trưởng thứ hạng bền vững.
        </p>
      </div>

      <div className="about-pillars">
        <article className="about-pillar-card">
          <h3 data-i18n="pillarOneTitle">Thế mạnh chuyên môn</h3>
          <p data-i18n="pillarOneDesc">
            Search Intent Mapping, phân cụm chủ đề, kiến trúc On-page, tối ưu Core Web Vitals (LCP, CLS) và xử lý rào cản kỹ thuật crawl/index.
          </p>
        </article>

        <article className="about-pillar-card">
          <h3 data-i18n="pillarTwoTitle">Dự án đã thực hiện</h3>
          <p data-i18n="pillarTwoDesc">
            Tham gia SEO Altus Entertainment US (lượt nhấp toàn website tăng 27,1% theo GSC), phát triển landing page BattleBots và viết 4 bài tiếng Anh trên Primas.net.
          </p>
        </article>

        <article className="about-pillar-card">
          <h3 data-i18n="pillarThreeTitle">Tự động hóa bằng AI &amp; MCP</h3>
          <p data-i18n="pillarThreeDesc">
            Ứng dụng Claude, GPT, Hermes Agent và giao thức Model Context Protocol (MCP) để tự động hóa trích xuất dữ liệu, phân loại intent và audit SEO.
          </p>
        </article>
      </div>
    </div>

    <div className="about-stack-bar">
      <span className="stack-label" data-i18n="stackLabel">Vũ khí chuyên môn:</span>
      <div className="stack-badges">
        <span>Ahrefs</span>
        <span>Semrush</span>
        <span>Google Search Console</span>
        <span>GA4</span>
        <span>Screaming Frog</span>
        <span>Core Web Vitals</span>
        <span>Claude &amp; GPT</span>
        <span>Hermes Agent</span>
        <span>MCP</span>
        <span>WordPress</span>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
