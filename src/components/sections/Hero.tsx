export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-waves-bg" aria-hidden="true">
        <canvas id="hero-waves-canvas" />
        <div className="waves-glow" />
        <div className="waves-grain" />
      </div>

      <div className="shell hero-inner">
        <div className="hero-main hero-clean-main">
          <h1 id="hero-title" className="hero-name" data-i18n="heroName">Phạm Tiến Đạt</h1>
          <p className="hero-job-title" data-i18n="heroJobTitle">SEO Executive · Search Intent &amp; Technical SEO</p>
          <p className="hero-tagline" data-i18n="heroTagline">Tối ưu hóa tìm kiếm tự nhiên &amp; kiến trúc On-page cho thị trường quốc tế</p>
        </div>

        <div className="hero-bottom hero-clean-bottom">
          <div className="hero-social" aria-label="Liên hệ" data-i18n-aria="heroSocialAria">
            <a href="mailto:tiendatpham2014@gmail.com">Email ↗</a>
            <a href="https://www.linkedin.com/in/ph%E1%BA%A1m-ti%E1%BA%BFn-%C4%91%E1%BA%A1t-b9a157444/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </div>
          <a className="hero-scroll-cue" href="#about" data-i18n="scrollHint">Cuộn để tìm hiểu ↓</a>
        </div>
      </div>
    </section>
  );
}
