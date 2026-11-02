export function About() {
  return (
    <section className="about section-space" id="about" aria-labelledby="about-title">
      <div className="shell about-layout">
        <div className="about-copy">
          <h2 className="display-heading" id="about-title" data-i18n="aboutTitle">Xin chào, tôi là Đạt.</h2>
          <p className="about-lead" data-i18n="aboutLead">
            Tôi kết nối nhu cầu tìm kiếm với nội dung, cấu trúc trang và dữ liệu để đưa ra quyết định SEO có cơ sở.
          </p>
          <p className="about-bio" data-i18n="aboutBio">
            Nền tảng Ngôn ngữ Anh Thương mại giúp tôi làm việc với nội dung cho thị trường quốc tế — chuyển hóa ý định tìm kiếm thành cấu trúc trang chuẩn xác và tăng trưởng bền vững.
          </p>
          <a className="about-next" href="#journey" data-i18n="aboutNext">Xem hành trình nghề nghiệp ↓</a>
        </div>

        <div className="about-pillars" aria-label="Trọng tâm năng lực">
          <article className="about-pillar-card">
            <h3 data-i18n="pillarOneTitle">Thế mạnh chuyên môn</h3>
            <p data-i18n="pillarOneDesc">Search Intent Mapping, Topic Clusters, On-page Architecture, Core Web Vitals và xử lý rào cản crawl/index.</p>
          </article>
          <article className="about-pillar-card">
            <h3 data-i18n="pillarTwoTitle">Dự án thực tế</h3>
            <p data-i18n="pillarTwoDesc">Altus Entertainment US (+27,1% Clicks), landing pages BattleBots US và 4 bài blog kỹ thuật trên Primas.net.</p>
          </article>
          <article className="about-pillar-card">
            <h3 data-i18n="pillarThreeTitle">Tự động hóa AI &amp; MCP</h3>
            <p data-i18n="pillarThreeDesc">Ứng dụng Claude, GPT, Hermes Agent và giao thức MCP tự động hóa phân loại intent và trích xuất dữ liệu SEO.</p>
          </article>
        </div>
      </div>

      <div className="shell">
        <div className="about-stack-bar" aria-label="Bộ công cụ chuyên môn">
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
  );
}
