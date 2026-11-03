export function About() {
  return (
    <section className="about section-space" id="about" aria-labelledby="about-title">
      <div className="shell about-layout">
        <div className="about-copy">
          <span className="rebuild-index" aria-hidden="true">01 / ABOUT</span>
          <h2 className="display-heading" id="about-title" data-i18n="aboutTitle">Chào bạn, mình là Đạt.</h2>
          <p className="about-lead" data-i18n="aboutLead">
            Mình tìm hiểu người dùng đang tìm gì, xem trang đã đáp ứng được chưa, rồi dựa vào dữ liệu để chọn bước cải thiện.
          </p>
          <p className="about-bio" data-i18n="aboutBio">
            Nền tảng Ngôn ngữ Anh Thương mại giúp mình biên tập nội dung cho thị trường quốc tế.
          </p>
          <a className="about-next" href="#atlas" data-i18n="aboutNext">Xem cách mình làm SEO ↓</a>
        </div>
        <div className="about-image-space" aria-hidden="true" />
      </div>
    </section>
  );
}
