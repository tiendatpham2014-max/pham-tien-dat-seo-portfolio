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
    <div className="hero-meta"><span data-i18n="role">SEO Executive</span><span data-i18n="location">TP. Hồ Chí Minh, Việt Nam</span></div>
    <div className="hero-main">
      <div className="hero-overline" data-i18n="heroOverline">SEO EXECUTIVE · PRIMAS GROUP</div>
      <h1 id="hero-title" data-i18n="heroName">Phạm Tiến Đạt</h1>
      <p className="hero-statement" data-i18n="heroStatement">Tối ưu Organic Search, Search Intent & Cấu trúc Nội dung.</p>
      <p className="hero-description" data-i18n="heroDescription">Hơn 2 năm thực chiến kết nối nhu cầu tìm kiếm, chất lượng nội dung và dữ liệu Google Search Console cho các dự án giải trí và dịch vụ tại thị trường Mỹ & Quốc tế.</p>
      <div className="hero-actions"><a className="button primary" href="#work" data-i18n="viewWork">Xem dự án & Bằng chứng <span aria-hidden="true">↗</span></a><a className="text-link" href="#contact" data-i18n="getInTouch">Liên hệ trao đổi <span aria-hidden="true">↗</span></a></div>
      <div className="executive-snapshot" aria-label="Hồ sơ tóm tắt kinh nghiệm và năng lực chuyên môn">
        <div className="snapshot-top">
          <span className="signal-live"><i aria-hidden="true" /><span data-i18n="snapshotActionLabel">Hồ sơ nghề nghiệp tóm tắt</span></span>
          <span className="snapshot-tag" data-i18n="snapshotRoleProgression">Thực tập sinh → CTV → SEO Executive</span>
        </div>
        <div className="snapshot-grid">
          <div className="snapshot-col">
            <span className="snapshot-label" data-i18n="snapshotOrgLabel">TỔ CHỨC & THỜI GIAN</span>
            <strong data-i18n="snapshotOrg">Primas Group · 11/2023 → Hiện tại</strong>
          </div>
          <div className="snapshot-col">
            <span className="snapshot-label" data-i18n="snapshotMarketLabel">THỊ TRƯỜNG & NGÔN NGỮ</span>
            <strong data-i18n="snapshotMarket">Mỹ (US) & Quốc tế · Tiếng Anh & Tiếng Việt</strong>
          </div>
          <div className="snapshot-col wide">
            <span className="snapshot-label" data-i18n="snapshotFocusLabel">THẾ MẠNH CHUYÊN MÔN</span>
            <p data-i18n="snapshotFocus">Search Intent Mapping, On-page & Technical SEO, Phân tích GSC</p>
          </div>
        </div>
      </div>
    </div>
    <div className="hero-bottom"><span data-i18n="heroBottom">Hồ sơ năng lực, bằng chứng GSC và kinh nghiệm thực tế.</span><a href="#work" data-i18n="scrollHint">Cuộn để xem dự án ↓</a></div>
  </div>
</section>

    </>
  );
}
