import type { CSSProperties } from "react";

export function Evidence() {
  return (
    <>
<section className="work section-space dark-section" id="work" aria-labelledby="work-title">
  <div className="shell">
    <div className="section-head">
      <div>
        <span className="section-label" data-i18n="workLabel">Case Study / Dự án thực tế</span>
        <h2 className="display-heading" id="work-title" data-i18n="workTitle">Altus Entertainment (US) · Tăng trưởng Clicks +27,1%</h2>
        <div className="project-meta-pills" role="list" aria-label="Chi tiết dự án" data-i18n-aria="projectMetaAria">
          <span className="meta-pill" role="listitem"><strong data-i18n="pillClientLabel">Khách hàng</strong>: <span data-i18n="pillClientValue">Altus Entertainment</span></span>
          <span className="meta-pill" role="listitem"><strong data-i18n="pillMarketLabel">Thị trường</strong>: <span data-i18n="pillMarketValue">US Entertainment</span></span>
          <span className="meta-pill" role="listitem"><strong data-i18n="pillTimelineLabel">Thời gian</strong>: <span data-i18n="pillTimelineValue">Q3/2025 vs Q3/2026</span></span>
          <span className="meta-pill" role="listitem"><strong data-i18n="pillFocusLabel">Trọng tâm</strong>: <span data-i18n="pillFocusValue">Search Intent &amp; On-page</span></span>
          <span className="meta-pill highlight" role="listitem"><strong data-i18n="pillGrowthLabel">Tăng trưởng</strong>: <span data-i18n="pillGrowthValue">+27,1% Clicks</span></span>
        </div>
        <p className="case-attribution-badge" data-i18n="sitewideDisclaimer">
          Lưu ý minh bạch: Đây là kết quả tăng trưởng cấp website của toàn đội ngũ, không quy riêng thành tích cá nhân duy nhất.
        </p>
      </div>
      <p data-i18n="workIntro">Case study thực tế về nghiên cứu Search Intent, tối ưu On-page và ứng dụng AI phân tích dữ liệu cho Altus Entertainment tại Mỹ (Q3/2025 vs Q3/2026).</p>
    </div>

    <div className="metric-stage">
      <div className="metric-stage-top">
        <div>
          <span className="section-label" data-i18n="metricLensLabel">Góc đọc dữ liệu</span>
          <h3 id="metric-title" data-i18n="metricTitle">Lượt nhấp từ tìm kiếm</h3>
        </div>
        <div className="metric-picker" role="group" aria-label="Chọn chỉ số">
          <button type="button" data-metric="clicks" aria-pressed="true" data-i18n="metricClicks">Clicks</button>
          <button type="button" data-metric="impressions" aria-pressed="false" data-i18n="metricImpressions">Impressions</button>
          <button type="button" data-metric="ctr" aria-pressed="false">CTR</button>
          <button type="button" data-metric="position" aria-pressed="false" data-i18n="metricPosition">Vị trí</button>
        </div>
      </div>
      <div className="metric-comparison" aria-live="polite">
        <div className="period-card">
          <span data-i18n="period2025">Q3/2025 · kỳ trước</span>
          <strong id="metric-before">13.795</strong>
          <div className="meter"><span id="meter-before" style={{ width: "78.6%" }} /></div>
        </div>
        <div className="period-card">
          <span data-i18n="period2026">Q3/2026 · kỳ sau</span>
          <strong id="metric-after">17.540</strong>
          <div className="meter"><span id="meter-after" style={{ width: "100%" }} /></div>
        </div>
      </div>
      <p className="metric-reading" id="metric-reading">+3.745 lượt nhấp (+27,1%)</p>
    </div>

    <div className="compare-wrap">
      <div className="compare-caption">
        <span className="section-label" data-i18n="compareLabel">So sánh trực quan</span>
        <span data-i18n="compareHint">Kéo đường chia để xem hai kỳ dữ liệu</span>
      </div>
      <div className="compare-wipe" id="compare-wipe" style={{ "--split": "50%" } as CSSProperties}>
        <div className="compare-layer compare-before" aria-hidden="true">
          <span className="compare-period">Q3/2025</span>
          <div className="compare-bars">
            <div className="compare-bar-row">
              <span className="bar-tag">Clicks</span>
              <i style={{ "--bar": "78.6%" } as CSSProperties}><em data-i18n="wipeBeforeClicks">13.795</em></i>
            </div>
            <div className="compare-bar-row">
              <span className="bar-tag">Impressions</span>
              <i style={{ "--bar": "100%" } as CSSProperties}><em data-i18n="wipeBeforeImp">1.358.505</em></i>
            </div>
            <div className="compare-bar-row">
              <span className="bar-tag">CTR</span>
              <i style={{ "--bar": "75%" } as CSSProperties}><em data-i18n="wipeBeforeCtr">1,02%</em></i>
            </div>
          </div>
        </div>
        <div className="compare-layer compare-after" aria-hidden="true">
          <span className="compare-period">Q3/2026</span>
          <div className="compare-bars">
            <div className="compare-bar-row">
              <span className="bar-tag">Clicks</span>
              <i style={{ "--bar": "100%" } as CSSProperties}><em data-i18n="wipeAfterClicks">17.540 (+27,1%)</em></i>
            </div>
            <div className="compare-bar-row">
              <span className="bar-tag">Impressions</span>
              <i style={{ "--bar": "95%" } as CSSProperties}><em data-i18n="wipeAfterImp">1.290.541 (−5,0%)</em></i>
            </div>
            <div className="compare-bar-row">
              <span className="bar-tag">CTR</span>
              <i style={{ "--bar": "100%" } as CSSProperties}><em data-i18n="wipeAfterCtr">1,36% (+0,34 điểm %)</em></i>
            </div>
          </div>
        </div>
        <div className="compare-divider" aria-hidden="true"><span>↔</span></div>
        <input
          id="compare-slider"
          type="range"
          min={0}
          max={100}
          defaultValue={50}
          aria-label="Kéo để so sánh Q3/2025 và Q3/2026"
          aria-valuetext="50% kỳ trước, 50% kỳ sau"
        />
      </div>
      <div className="compare-legend" aria-hidden="true">
        <span>Clicks</span>
        <span>Impressions</span>
        <span>CTR</span>
      </div>
    </div>

    <details className="data-table-toggle">
      <summary>
        <span data-i18n="toggleTable">Xem bảng số liệu chi tiết GSC (6 chỉ số đầy đủ) ↓</span>
      </summary>
      <div className="data-table-wrap">
        <table className="data-table">
          <caption data-i18n="tableCaption">Toàn bộ chỉ số GSC trong hai kỳ, ở cấp website</caption>
          <thead>
            <tr>
              <th scope="col" data-i18n="tableMetric">Chỉ số</th>
              <th scope="col">Q3/2025</th>
              <th scope="col">Q3/2026</th>
              <th scope="col" data-i18n="tableChange">Thay đổi</th>
            </tr>
          </thead>
          <tbody>
            <tr><th scope="row" data-i18n="tableClicks">Organic clicks</th><td data-value={13795}>13.795</td><td data-value={17540}>17.540</td><td data-i18n="changeClicks">+27,1%</td></tr>
            <tr><th scope="row" data-i18n="tableImpressions">Impressions</th><td data-value={1358505}>1.358.505</td><td data-value={1290541}>1.290.541</td><td data-i18n="changeImpressions">−5,0%</td></tr>
            <tr><th scope="row">CTR</th><td data-percent="1.02">1,02%</td><td data-percent="1.36">1,36%</td><td data-i18n="changeCtr">+0,34 điểm %</td></tr>
            <tr><th scope="row" data-i18n="tablePosition">Vị trí trung bình</th><td data-decimal={28}>28,0</td><td data-decimal={23}>23,0</td><td data-i18n="changePosition">Cải thiện 5,0 vị trí</td></tr>
            <tr><th scope="row" data-i18n="tableNonbrand">Non-brand clicks*</th><td data-value={13030}>13.030</td><td data-value={17184}>17.184</td><td data-i18n="changeNonbrand">+31,9%</td></tr>
            <tr><th scope="row" data-i18n="tableNonbrandCtr">Non-brand CTR*</th><td data-percent="0.96">0,96%</td><td data-percent="1.33">1,33%</td><td data-i18n="changeNonbrandCtr">+0,37 điểm %</td></tr>
          </tbody>
        </table>
      </div>
    </details>

    <div className="case-notes">
      <p data-i18n="caseContribution"><strong>Vai trò:</strong> Nghiên cứu Search Intent, tối ưu On-page, cấu trúc Content và phân tích GSC tại Primas Group.</p>
      <p data-i18n="sitewideDisclaimer"><strong>Lưu ý minh bạch:</strong> Đây là kết quả tăng trưởng cấp website của toàn đội ngũ, không quy riêng thành tích cá nhân duy nhất.</p>
      <p data-i18n="nonbrandFootnote"><strong>* Non-brand:</strong> Chỉ số ước tính sau khi loại bỏ các truy vấn chứa từ khóa thương hiệu.</p>
      <p data-i18n="caseSource"><strong>Nguồn:</strong> Google Search Console · Web · Q3/2025 vs Q3/2026 (92 ngày mỗi kỳ). Vị trí trung bình theo lượt hiển thị.</p>
    </div>
  </div>
</section>
    </>
  );
}
