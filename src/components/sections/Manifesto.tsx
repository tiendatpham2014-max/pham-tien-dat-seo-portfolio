export function Manifesto() {
  return (
    <section className="manifesto" id="about" aria-labelledby="about-title">
      <div className="shell manifesto-layout">
        <div className="manifesto-content">
          <h2 id="about-title" data-i18n="aboutTitle">Chào, tôi là Đạt.</h2>
          <p className="manifesto-lead" data-i18n="heroStatement">Tôi kết nối nhu cầu tìm kiếm, nội dung và dữ liệu để cải thiện organic search.</p>
          <p data-i18n="aboutBody">Từ bài viết kỹ thuật tiếng Anh đến các dự án SEO quốc tế, tôi quan tâm đến việc biến tín hiệu tìm kiếm thành quyết định nội dung có thể kiểm chứng.</p>
        </div>
        <figure className="manifesto-visual">
          <div className="manifesto-art" aria-hidden="true">
            <span className="manifesto-art-word">DAT PHAM</span>
            <img src="/branding/dat-pham-signature-writing.svg" width="540" height="180" alt="" />
          </div>
          <figcaption data-i18n="aboutCaption">Phạm Tiến Đạt · SEO Executive</figcaption>
        </figure>
        <div className="manifesto-after">
          <div className="manifesto-principles">
            <div><h3 data-i18n="aboutPrincipleOneTitle">Hiểu nhu cầu.</h3><p data-i18n="aboutPrincipleOneBody">Đọc truy vấn và bối cảnh trước khi chọn từ khóa hay định dạng trang.</p></div>
            <div><h3 data-i18n="aboutPrincipleTwoTitle">Làm rõ trang.</h3><p data-i18n="aboutPrincipleTwoBody">Kết nối cấu trúc nội dung với tín hiệu kỹ thuật và trải nghiệm đọc.</p></div>
            <div><h3 data-i18n="aboutPrincipleThreeTitle">Đo trong bối cảnh.</h3><p data-i18n="aboutPrincipleThreeBody">Dùng GSC để đặt câu hỏi tiếp theo, không chỉ để trưng bày một con số.</p></div>
          </div>
          <a className="manifesto-next" href="#journey" data-i18n="aboutNext">Xem hành trình nghề nghiệp ↗</a>
        </div>
      </div>
    </section>
  );
}
