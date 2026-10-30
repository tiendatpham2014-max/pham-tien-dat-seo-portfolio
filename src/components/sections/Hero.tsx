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
    <div className="hero-main">
      <h1 id="hero-title" className="hero-name" data-i18n="heroName">Phạm Tiến Đạt</h1>
      <p className="hero-role" data-i18n="role">SEO Executive</p>
    </div>

    <div className="hero-bottom">
      <div className="hero-bottom-links">
        <a href="mailto:tiendatpham2014@gmail.com">Email ↗</a>
        <a href="https://www.linkedin.com/in/ph%E1%BA%A1m-ti%E1%BA%BFn-%C4%91%E1%BA%A1t-b9a157444/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href="https://primas.net/author/datpt/" target="_blank" rel="noopener noreferrer" data-i18n="footerAuthor">Trang tác giả ↗</a>
      </div>
      <a className="hero-scroll" href="#about" data-i18n="scrollHint">Cuộn để khám phá ↓</a>
    </div>
  </div>
</section>
    </>
  );
}
