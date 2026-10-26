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
      <div className="hero-overline" data-i18n="heroOverline">TỪ NHU CẦU TÌM KIẾM ĐẾN NỘI DUNG VÀ DỮ LIỆU</div>
      <h1 id="hero-title" data-i18n="heroName">Phạm Tiến Đạt</h1>
      <p className="hero-statement" data-i18n="heroStatement">SEO bắt đầu từ điều người dùng thực sự cần.</p>
      <p className="hero-description" data-i18n="heroDescription">Tôi kết nối nhu cầu tìm kiếm, chất lượng nội dung và dữ liệu để đưa ra quyết định tối ưu có cơ sở.</p>
      <div className="hero-actions"><a className="button primary" href="#work" data-i18n="viewWork">Xem công việc <span aria-hidden="true">↗</span></a><a className="text-link" href="#contact" data-i18n="getInTouch">Liên hệ <span aria-hidden="true">↗</span></a></div>
      <div className="signal-lab" data-signal-phase={0} aria-label="Cách tiếp cận SEO: từ nhu cầu tìm kiếm, qua nội dung đến tín hiệu dữ liệu">
        <div className="signal-lab-top"><span className="signal-live"><i aria-hidden="true" /><span data-i18n="signalLabel">Bản đồ tư duy SEO</span></span><button className="signal-next" id="signal-next" type="button" aria-label="Xem bước tiếp theo"><span id="signal-count">01 / 03</span><span className="signal-next-arrow" aria-hidden="true">→</span></button></div>
        <div className="signal-situation"><span data-i18n="signalSituationLabel">TÌNH HUỐNG MINH HỌA</span><p data-i18n="signalSituation">Một trang có hiển thị, nhưng người tìm chưa chọn.</p></div>
        <div className="signal-focus"><span className="signal-focus-index" id="signal-index" aria-hidden="true">01</span><div><span className="signal-focus-label" data-i18n="signalQuestionLabel">CÂU HỎI CẦN GIẢI</span><h2 id="signal-question">Người tìm đang cần gì?</h2></div></div>
        <p className="signal-detail" id="signal-detail" aria-live="polite">Đọc nhóm truy vấn và trang đích trước khi chọn hướng tối ưu.</p>
        <div className="signal-flow" aria-hidden="true"><span className="is-active" /><span /><span /></div>
        <div className="signal-steps" role="group" aria-label="Các lớp quyết định SEO"><button type="button" data-signal-step={0} aria-pressed="true" data-i18n="signalIntent">Nhu cầu tìm kiếm</button><button type="button" data-signal-step={1} aria-pressed="false" data-i18n="signalContent">Nội dung</button><button type="button" data-signal-step={2} aria-pressed="false" data-i18n="signalEvidence">Dữ liệu</button></div>
        <div className="signal-outcome"><span data-i18n="signalOutcomeLabel">ĐẦU RA</span><strong id="signal-outcome">Nhóm truy vấn theo mục đích tìm kiếm.</strong></div>
      </div>
    </div>
    <div className="hero-bottom"><span data-i18n="heroBottom">Một portfolio về cách nghĩ, cách làm và bằng chứng.</span><a href="#approach" data-i18n="scrollHint">Cuộn để khám phá ↓</a></div>
  </div>
</section>

    </>
  );
}
