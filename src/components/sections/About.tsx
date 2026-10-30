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
            Nền tảng Ngôn ngữ Anh Thương mại giúp tôi làm việc với nội dung cho thị trường quốc tế.
          </p>
          <p className="about-focus" data-i18n="aboutFocus">Search intent / On-page / Measurement</p>
          <a className="about-next" href="#journey" data-i18n="aboutNext">Xem hành trình nghề nghiệp ↓</a>
        </div>
      </div>
    </section>
  );
}
