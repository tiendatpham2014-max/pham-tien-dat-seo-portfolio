export function Hero() {
  return (
    <>
<section className="hero" id="top" aria-labelledby="hero-title">
  <div className="hero-waves-bg" aria-hidden="true">
    <canvas id="hero-waves-canvas" />
    <div className="waves-glow" />
    <div className="waves-grain" />
  </div>
  <div className="shell hero-inner">
    <div className="hero-meta">
      <span className="hero-badge-pill">
        <span className="badge-pulse" aria-hidden="true" />
        <span data-i18n="heroBadge">SEO Executive @ Primas Group</span>
      </span>
      <span data-i18n="location">TP. Hồ Chí Minh, Việt Nam</span>
    </div>

    <div className="hero-main">
      <div className="hero-salutation">
        <span className="hero-greeting" data-i18n="heroGreeting">Xin chào, tôi là</span>
        <h1 id="hero-title" className="hero-name" data-i18n="heroName">Phạm Tiến Đạt</h1>
      </div>

      <p className="hero-statement" data-i18n="heroStatement">
        SEO Executive tại Primas Group, chuyên tối ưu tìm kiếm tự nhiên &amp; cấu trúc nội dung cho thị trường quốc tế.
      </p>

      <p className="hero-description" data-i18n="heroDescription">
        Tôi kết nối nhu cầu tìm kiếm thực tế của người dùng với chất lượng nội dung và dữ liệu Google Search Console — biến các tín hiệu tìm kiếm thành tăng trưởng bền vững.
      </p>

      <div className="hero-meta-bar" role="list" aria-label="Thông tin nghề nghiệp">
        <div className="meta-item" role="listitem">
          <span className="meta-label" data-i18n="metaOrgLabel">Hiện tại:</span>
          <strong data-i18n="metaOrg">Primas Group (11/2023 → nay)</strong>
        </div>
        <div className="meta-item" role="listitem">
          <span className="meta-label" data-i18n="metaMarketLabel">Thị trường:</span>
          <strong data-i18n="metaMarket">Mỹ (US) &amp; Quốc tế</strong>
        </div>
        <div className="meta-item" role="listitem">
          <span className="meta-label" data-i18n="metaFocusLabel">Trọng tâm:</span>
          <strong data-i18n="metaFocus">Search Intent · On-page · GSC</strong>
        </div>
      </div>

      <div className="hero-actions">
        <a className="button primary" href="#work" data-i18n="viewWork">Xem dự án &amp; Bằng chứng <span aria-hidden="true">↗</span></a>
        <a className="text-link" href="#contact" data-i18n="getInTouch">Liên hệ trao đổi <span aria-hidden="true">↗</span></a>
      </div>
    </div>

    <div className="hero-bottom">
      <span data-i18n="heroBottom">Hồ sơ năng lực, bằng chứng GSC và kinh nghiệm thực tế.</span>
      <a href="#approach" data-i18n="scrollHint">Cuộn để khám phá ↓</a>
    </div>
  </div>
</section>
    </>
  );
}
