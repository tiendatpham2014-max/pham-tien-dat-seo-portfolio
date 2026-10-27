export function Approach() {
  return (
    <>
<section className="approach section-space" id="approach" aria-labelledby="approach-title">
  <div className="shell approach-grid">
    <div>
      <span className="section-label" data-i18n="approachLabel">Triết lý làm việc</span>
      <h2 className="display-heading" id="approach-title" data-i18n="approachTitle">Hiểu đúng search intent trước khi viết hay tối ưu.</h2>
    </div>
    <div className="approach-copy">
      <p className="lead" data-i18n="approachLead">Lượt hiển thị cao là vô nghĩa nếu nội dung không giải quyết được vấn đề thực tế của người tìm kiếm.</p>
      <p data-i18n="approachBody">Tôi kết hợp nghiên cứu từ khóa với phân tích hành vi người dùng, cấu trúc nội dung theo search intent và dùng dữ liệu GSC để liên tục kiểm chứng hiệu quả.</p>
      <div className="approach-principles">
        <span>Search intent</span>
        <span>Content architecture</span>
        <span>Technical clarity</span>
        <span>Measurement &amp; AI</span>
      </div>
    </div>
  </div>
  <div className="shell insight-row" aria-label="Các câu hỏi trong công việc SEO">
    <details className="insight-card" name="insights">
      <summary className="insight-summary">
        <span className="insight-num">01</span>
        <h3 data-i18n="insightOneTitle">Trang này có thực sự nên được index?</h3>
        <span className="insight-icon" aria-hidden="true">+</span>
      </summary>
      <p className="insight-body" data-i18n="insightOneBody">Khả năng crawl, nội dung hữu ích và mức độ trùng lặp cần được đọc cùng mục đích tìm kiếm.</p>
    </details>

    <details className="insight-card" name="insights">
      <summary className="insight-summary">
        <span className="insight-num">02</span>
        <h3 data-i18n="insightTwoTitle">Một từ khóa chưa đủ để quyết định cấu trúc trang.</h3>
        <span className="insight-icon" aria-hidden="true">+</span>
      </summary>
      <p className="insight-body" data-i18n="insightTwoBody">Nhóm truy vấn và vai trò của từng URL giúp chọn tạo mới, cập nhật hay hợp nhất nội dung.</p>
    </details>

    <details className="insight-card" name="insights">
      <summary className="insight-summary">
        <span className="insight-num">03</span>
        <h3 data-i18n="insightThreeTitle">Tăng một chỉ số không có nghĩa mọi thứ đều tốt hơn.</h3>
        <span className="insight-icon" aria-hidden="true">+</span>
      </summary>
      <p className="insight-body" data-i18n="insightThreeBody">Clicks, impressions, CTR và vị trí cần được đặt trong cùng bối cảnh trước khi kết luận.</p>
    </details>
  </div>
</section>
    </>
  );
}
