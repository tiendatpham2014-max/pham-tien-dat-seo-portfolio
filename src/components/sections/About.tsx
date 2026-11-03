export function About() {
  return (
    <section className="about section-space" id="about" aria-labelledby="about-title">
      <div className="shell about-layout">
        <div className="about-copy">
          <span className="rebuild-index" aria-hidden="true">01 / ABOUT</span>
          <h2 className="display-heading" id="about-title" data-i18n="aboutTitle">Chào bạn, mình là Đạt.</h2>
          <p className="about-lead" data-i18n="aboutLead">
            Mình tìm điểm gặp nhau giữa điều người ta đang tìm, nội dung trên trang và dữ liệu thực tế để chọn hướng làm SEO phù hợp.
          </p>
          <p className="about-bio" data-i18n="aboutBio">
            Nền tảng Ngôn ngữ Anh Thương mại giúp mình làm việc với nội dung cho thị trường quốc tế.
          </p>
          <a className="about-next" href="#atlas" data-i18n="aboutNext">Xem cách mình làm SEO ↓</a>
        </div>
        <div className="about-image-space" aria-hidden="true" />
      </div>
    </section>
  );
}
