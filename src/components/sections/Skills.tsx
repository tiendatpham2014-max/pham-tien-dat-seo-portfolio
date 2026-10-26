export function Skills() {
  return (
    <>
<section className="skills section-space" id="skills" aria-labelledby="skills-title">
  <div className="shell"><div className="section-head"><div><span className="section-label" data-i18n="skillsLabel">Năng lực</span><h2 className="display-heading" id="skills-title" data-i18n="skillsTitle">Vấn đề. Cách làm. Đầu ra.</h2></div><p data-i18n="skillsIntro">Thay vì liệt kê công cụ, phần này cho thấy từng nhóm công việc giải quyết điều gì.</p></div>
    <div className="skill-layout"><div className="skill-tabs" role="tablist" aria-label="Các nhóm năng lực SEO">
        <button type="button" role="tab" id="tab-technical" aria-controls="panel-technical" aria-selected="true" tabIndex={0} data-skill="technical" data-i18n="skillTechnical">Technical SEO</button>
        <button type="button" role="tab" id="tab-content" aria-controls="panel-content" aria-selected="false" tabIndex={-1} data-skill="content" data-i18n="skillContent">Chiến lược nội dung</button>
        <button type="button" role="tab" id="tab-analytics" aria-controls="panel-analytics" aria-selected="false" tabIndex={-1} data-skill="analytics" data-i18n="skillAnalytics">Phân tích dữ liệu</button>
        <button type="button" role="tab" id="tab-workflow" aria-controls="panel-workflow" aria-selected="false" tabIndex={-1} data-skill="workflow" data-i18n="skillWorkflow">Quy trình &amp; tự động hóa</button>
        <span className="skill-progress" aria-hidden="true" />
      </div><div className="skill-panels">
        <article role="tabpanel" id="panel-technical" aria-labelledby="tab-technical" tabIndex={0}><span className="panel-kicker">Technical SEO</span><h3 data-i18n="technicalHeadline">Tìm rào cản trước khi thêm nội dung.</h3><dl><div><dt data-i18n="problem">Vấn đề</dt><dd data-i18n="technicalProblem">Trang khó crawl, index hoặc phân biệt với trang trùng lặp.</dd></div><div><dt data-i18n="approach">Cách tiếp cận</dt><dd data-i18n="technicalApproach">Kiểm tra mẫu URL, indexability, canonical, sitemap và cấu trúc trang.</dd></div><div><dt data-i18n="output">Đầu ra dạng công việc</dt><dd data-i18n="technicalOutput">Danh sách vấn đề và khuyến nghị được ưu tiên.</dd></div></dl><p className="tool-line">Screaming Frog · GSC · URL patterns</p></article>
        <article role="tabpanel" id="panel-content" aria-labelledby="tab-content" tabIndex={0} hidden><span className="panel-kicker">Content Strategy</span><h3 data-i18n="contentHeadline">Khớp trang với nhu cầu tìm kiếm.</h3><dl><div><dt data-i18n="problem">Vấn đề</dt><dd data-i18n="contentProblem">Nội dung hiện tại chưa trả lời đúng search intent.</dd></div><div><dt data-i18n="approach">Cách tiếp cận</dt><dd data-i18n="contentApproach">Nhóm truy vấn, xác định vai trò từng trang, biên tập brief và on-page.</dd></div><div><dt data-i18n="output">Đầu ra dạng công việc</dt><dd data-i18n="contentOutput">Keyword map, content brief hoặc kế hoạch cập nhật trang.</dd></div></dl><p className="tool-line">Keyword mapping · Content briefs · Internal links</p></article>
        <article role="tabpanel" id="panel-analytics" aria-labelledby="tab-analytics" tabIndex={0} hidden><span className="panel-kicker">Analytics</span><h3 data-i18n="analyticsHeadline">Đặt biến động trong bối cảnh.</h3><dl><div><dt data-i18n="problem">Vấn đề</dt><dd data-i18n="analyticsProblem">Chỉ số tăng giảm nhưng nguyên nhân chưa rõ.</dd></div><div><dt data-i18n="approach">Cách tiếp cận</dt><dd data-i18n="analyticsApproach">So sánh kỳ, truy vấn, URL và nhóm trang trong GSC/GA4.</dd></div><div><dt data-i18n="output">Đầu ra dạng công việc</dt><dd data-i18n="analyticsOutput">Bản đọc dữ liệu và giả thuyết cần kiểm chứng.</dd></div></dl><p className="tool-line">Google Search Console · GA4 · Semrush</p></article>
        <article role="tabpanel" id="panel-workflow" aria-labelledby="tab-workflow" tabIndex={0} hidden><span className="panel-kicker">Workflow</span><h3 data-i18n="workflowHeadline">Giảm thao tác lặp lại trong dữ liệu SEO.</h3><dl><div><dt data-i18n="problem">Vấn đề</dt><dd data-i18n="workflowProblem">Dữ liệu URL khó làm sạch và đối chiếu thủ công.</dd></div><div><dt data-i18n="approach">Cách tiếp cận</dt><dd data-i18n="workflowApproach">Chuẩn hóa, ghép và kiểm tra dữ liệu bằng Sheets/Apps Script.</dd></div><div><dt data-i18n="output">Đầu ra dạng công việc</dt><dd data-i18n="workflowOutput">Bảng đối chiếu hoặc quy trình xử lý có thể lặp lại.</dd></div></dl><p className="tool-line">Google Sheets · Apps Script · URL cleanup</p></article>
      </div></div>
  </div>
</section>

    </>
  );
}
