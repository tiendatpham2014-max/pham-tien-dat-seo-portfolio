export function Process() {
  return (
    <>
<section className="process section-space" id="process" aria-labelledby="process-title">
  <div className="shell">
    <div className="section-head">
      <div>
        <span className="section-label" data-i18n="processLabel">Phương pháp làm việc</span>
        <h2 className="display-heading" id="process-title" data-i18n="processTitle">Từ câu hỏi đến vòng cải tiến.</h2>
      </div>
      <p data-i18n="processIntro">Ba giai đoạn tiếp cận công việc SEO thực tế — bấm vào từng giai đoạn để xem chi tiết checklist và câu hỏi giải quyết.</p>
    </div>

    <div className="process-accordion" role="region" aria-label="Quy trình thực thi SEO">
      <details className="process-item" name="process">
        <summary className="process-summary">
          <div className="process-title-group">
            <span className="step-num">01</span>
            <h3 data-i18n="stepOneTitle">Nghiên cứu &amp; kiểm tra</h3>
          </div>
          <div className="process-peek-group">
            <span className="process-peek" data-i18n="stepOnePeek">Audit kỹ thuật, search intent &amp; cấu trúc URL</span>
            <span className="process-icon" aria-hidden="true">+</span>
          </div>
        </summary>
        <div className="process-content">
          <div className="process-content-inner">
            <div className="process-question-block">
              <span className="micro-label" data-i18n="questionLabel">Câu hỏi giải quyết</span>
              <p className="step-question" data-i18n="stepOneQuestion">Người tìm kiếm muốn giải quyết điều gì, và website đang cản trở ở đâu?</p>
            </div>
            <div className="process-checklist-block">
              <span className="micro-label" data-i18n="processChecklist">Việc cần kiểm tra</span>
              <ul>
                <li data-i18n="stepOneA">Search intent &amp; nhóm từ khóa</li>
                <li data-i18n="stepOneB">Crawl, indexability &amp; cấu trúc URL</li>
                <li data-i18n="stepOneC">Trang đích so với nhu cầu tìm kiếm</li>
              </ul>
            </div>
          </div>
        </div>
      </details>

      <details className="process-item" name="process">
        <summary className="process-summary">
          <div className="process-title-group">
            <span className="step-num">02</span>
            <h3 data-i18n="stepTwoTitle">Triển khai &amp; tối ưu</h3>
          </div>
          <div className="process-peek-group">
            <span className="process-peek" data-i18n="stepTwoPeek">Content brief, on-page SEO &amp; internal links</span>
            <span className="process-icon" aria-hidden="true">+</span>
          </div>
        </summary>
        <div className="process-content">
          <div className="process-content-inner">
            <div className="process-question-block">
              <span className="micro-label" data-i18n="questionLabel">Câu hỏi giải quyết</span>
              <p className="step-question" data-i18n="stepTwoQuestion">Thay đổi nào làm trang hữu ích hơn mà vẫn khớp mục đích tìm kiếm?</p>
            </div>
            <div className="process-checklist-block">
              <span className="micro-label" data-i18n="processChecklist">Việc cần kiểm tra</span>
              <ul>
                <li data-i18n="stepTwoA">Content brief &amp; on-page</li>
                <li data-i18n="stepTwoB">Internal links &amp; điều hướng nội dung</li>
                <li data-i18n="stepTwoC">Khuyến nghị technical SEO</li>
              </ul>
            </div>
          </div>
        </div>
      </details>

      <details className="process-item" name="process">
        <summary className="process-summary">
          <div className="process-title-group">
            <span className="step-num">03</span>
            <h3 data-i18n="stepThreeTitle">Đo lường &amp; cải tiến</h3>
          </div>
          <div className="process-peek-group">
            <span className="process-peek" data-i18n="stepThreePeek">Theo dõi GSC/GA4 &amp; tự động hóa AI</span>
            <span className="process-icon" aria-hidden="true">+</span>
          </div>
        </summary>
        <div className="process-content">
          <div className="process-content-inner">
            <div className="process-question-block">
              <span className="micro-label" data-i18n="questionLabel">Câu hỏi giải quyết</span>
              <p className="step-question" data-i18n="stepThreeQuestion">Dữ liệu sau triển khai cho thấy gì, và còn điều gì cần kiểm tra?</p>
            </div>
            <div className="process-checklist-block">
              <span className="micro-label" data-i18n="processChecklist">Việc cần kiểm tra</span>
              <ul>
                <li data-i18n="stepThreeA">Theo dõi clicks, impressions &amp; CTR</li>
                <li data-i18n="stepThreeB">Đọc theo trang, truy vấn &amp; thời gian</li>
                <li data-i18n="stepThreeC">Ưu tiên vòng tối ưu tiếp theo &amp; quy trình AI</li>
              </ul>
            </div>
          </div>
        </div>
      </details>
    </div>
  </div>
</section>
    </>
  );
}
