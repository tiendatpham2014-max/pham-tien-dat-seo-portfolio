export function CaseStory() {
  return (
    <section className="case-story" id="work" aria-labelledby="case-story-title">
      <div className="case-story-sticky">
        <div className="case-story-atmosphere" aria-hidden="true">
          <div className="case-story-visuals">
            <div className="case-story-visual case-story-visual-intent" data-story-visual>
              <span className="sheet-topline" data-i18n="storyVisualSearchLabel">TÌM KIẾM / 01</span>
              <strong className="sheet-word">Intent</strong>
              <div className="sheet-query-lines">
                <span data-i18n="storyVisualQueryOne">Người dùng đang tìm gì?</span>
                <span data-i18n="storyVisualQueryTwo">Trang nào đang trả lời?</span>
                <span data-i18n="storyVisualQueryThree">Khoảng cách nằm ở đâu?</span>
              </div>
              <span className="sheet-bottomline" data-i18n="storyVisualSearchFooter">Ý định tìm kiếm · Nhóm truy vấn</span>
            </div>
            <div className="case-story-visual case-story-visual-page" data-story-visual>
              <span className="sheet-topline" data-i18n="storyVisualPageLabel">TRANG / 02</span>
              <strong className="sheet-word">On-page</strong>
              <div className="sheet-page-diagram">
                <span />
                <span />
                <span />
                <span />
              </div>
              <span className="sheet-bottomline" data-i18n="storyVisualPageFooter">Nội dung · Cấu trúc · Kỹ thuật</span>
            </div>
            <div className="case-story-visual case-story-visual-proof" data-story-visual>
              <span className="sheet-topline">GSC / Q3 2025 → Q3 2026</span>
              <strong className="sheet-result" data-i18n="storyGrowth">+27,1%</strong>
              <div className="sheet-data">
                <span data-i18n="storyBeforeClicks">13.795</span><span className="sheet-data-arrow">→</span><strong data-i18n="storyAfterClicks">17.540</strong>
              </div>
              <span className="sheet-bottomline" data-i18n="storyVisualResult">Clicks +27,1% · Impressions −5,0%</span>
            </div>
          </div>
        </div>

        <div className="shell case-story-layout">
          <div className="case-story-topline">
            <span data-i18n="storyProject">Altus Entertainment · US</span>
            <span data-i18n="storyScroll">Cuộn để đi qua dự án</span>
          </div>
          <div className="case-story-copy">
            <h2 id="case-story-title" className="case-story-title" data-i18n="storyTitle">Dự án.</h2>
            <div className="case-story-chapters">
              <article className="case-story-chapter is-current" data-story-chapter>
                <h3 data-i18n="storyIntentTitle">Bắt đầu từ nhu cầu.</h3>
                <p data-i18n="storyIntentBody">Nghiên cứu ý định tìm kiếm và nhóm truy vấn để xác định trang nào cần được cải thiện.</p>
              </article>
              <article className="case-story-chapter" data-story-chapter>
                <h3 data-i18n="storyPageTitle">Làm rõ giá trị của trang.</h3>
                <p data-i18n="storyPageBody">Rà soát nội dung, cấu trúc on-page và tín hiệu kỹ thuật, rồi ưu tiên thay đổi phù hợp.</p>
              </article>
              <article className="case-story-chapter" data-story-chapter>
                <h3 data-i18n="storyProofTitle">Đọc kết quả trong bối cảnh.</h3>
                <p data-i18n="storyProofBody">GSC ghi nhận clicks tăng 27,1% giữa hai kỳ Q3; impressions giảm 5,0%. Đây là số liệu cấp website của đội ngũ.</p>
              </article>
            </div>
            <a className="case-story-link" href="#proof" data-i18n="storyEvidenceLink">Xem số liệu và vai trò cụ thể ↗</a>
          </div>
          <div className="case-story-progress" aria-hidden="true"><span /><span /><span /></div>
        </div>
      </div>
    </section>
  );
}
