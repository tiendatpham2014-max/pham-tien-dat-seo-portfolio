import type { CSSProperties } from "react";

export function Journey() {
  return (
    <>
<section className="journey" id="journey" aria-labelledby="journey-title">
  <div className="journey-sticky">
    <div className="career-route" aria-hidden="true">
      <div className="career-sky" />
      <div className="career-dawn" />
      <div className="career-planet" />
      <div className="career-rim" />
      <div className="career-sun" />
      <div className="career-horizon-markers"><span /><span /><span /></div>
    </div>
    <div className="shell journey-scene">
      <div className="journey-heading">
        <span className="section-label" data-i18n="journeyLabel">Hành trình</span>
        <h2 className="display-heading" id="journey-title" data-i18n="journeyTitle">Ba giai đoạn, một hướng đi.</h2>
        <p className="journey-intro" data-i18n="journeyIntro">Từ nghiên cứu từ khóa và bài viết đầu tiên đến công việc kết nối nội dung, kỹ thuật và hiệu suất tìm kiếm.</p>
      </div>
      <div className="career-stages" aria-label="Các giai đoạn nghề nghiệp">
        <article className="career-stage is-current" style={{ "--stage-shift": "-10%" } as CSSProperties}>
          <span className="career-stage-date" data-i18n="dateIntern">11/2023–04/2024</span>
          <h3 data-i18n="internTitle">Thực tập sinh SEO</h3>
          <p className="career-org">Primas Group</p>
          <p data-i18n="internBody">Xây nền tảng về nghiên cứu từ khóa, biên tập bài SEO và nguyên tắc tối ưu qua công việc thực tế.</p>
        </article>
        <article className="career-stage" style={{ "--stage-shift": "-50%" } as CSSProperties}>
          <span className="career-stage-date" data-i18n="dateContributor">05/2024–10/2024</span>
          <h3 data-i18n="contributorTitle">Cộng tác viên SEO</h3>
          <p className="career-org">Primas Group</p>
          <p data-i18n="contributorBody">Phát triển nội dung theo nhóm chủ đề, rà soát nguồn và điều chỉnh bài viết theo yêu cầu dự án.</p>
        </article>
        <article className="career-stage" style={{ "--stage-shift": "-90%" } as CSSProperties}>
          <span className="career-stage-date" data-i18n="dateExecutive">11/2024–hiện tại</span>
          <h3>SEO Executive</h3>
          <p className="career-org">Primas Group</p>
          <p data-i18n="executiveBody">Nghiên cứu nội dung cho dự án quốc tế, tối ưu on-page, phân tích GSC và tham gia cải thiện cấu trúc website.</p>
        </article>
      </div>
    </div>
  </div>
</section>

    </>
  );
}
