# CONTENT_ARCHITECTURE — Đánh giá 9 mẫu và kế hoạch nội dung mở rộng (v4)

> **Tài liệu quyết định, không phải bộ reference.** Đã đánh giá trên dữ liệu đang có trong `dist/index.html`, `docs/brief.md`, `docs/evidence.md`, `docs/CONTENT_SPEC.md`. Codex không cần crawl web để triển khai. File này ưu tiên **nội dung có giá trị hơn việc lấp đủ block**.
>
> **Nguyên tắc:** CV là nguồn xác minh một số mốc và trách nhiệm, **không phải khuôn nội dung của cả portfolio**. Portfolio có thể và nên trình bày cách suy nghĩ, công việc, quy trình, bằng chứng và bài viết thật ngoài CV.

## A. Quyết định cho từng nhóm thiết kế

| Nhóm UI đã chọn | Đánh giá so với dữ liệu hiện tại | Quyết định | Nội dung sẽ dùng / không được làm |
|---|---|---|---|
| Navigation 15 | Cần thiết; đủ section hiện hữu | **Giữ** | Điều hướng đúng các section thực sự hiển thị. Không tạo menu dẫn đến section trống. |
| Hero 22 | Cần thiết; dữ liệu hiện có đủ | **Giữ** | Giới thiệu cá nhân, định vị SEO, 2 CTA. Copy mới có thể viết theo nền tảng nghề nghiệp đã biết; không nhét KPI sitewide vào hero như thành tích cá nhân. |
| Features 4 | Hữu ích nhưng có thể trùng nội dung CV/kinh nghiệm | **Giữ, viết lại theo năng lực** | 4 tab Technical / Content / Analytics / Workflow; mỗi tab mô tả câu hỏi giải quyết, cách làm, đầu ra, công cụ có bằng chứng. Không trình bày như 4 chức danh hoặc chứng chỉ. |
| Features 17 | **Không phù hợp nguyên bản**: thế giới, múi giờ, bình minh/văn phòng không có dữ liệu tương ứng; dễ lặp timeline của How It Works 4 | **Chỉ mượn chuyển động rất nhẹ, không giữ globe** | Biến thành hành trình nghề nghiệp ngắn 3 mốc **hoặc** career rail tĩnh. Không vẽ bản đồ, quốc gia, văn phòng, thời gian dự án, global operations bịa ra. Không dùng thêm một timeline phức tạp nếu section Process đã là timeline. |
| Social Proof 11 | Có 3 bài blog thật, **không có testimonial thật** | **Dùng kiểu card/rail, đổi chức năng thành Published Writing** | 3 bài Primas, topic, link gốc; viết mô tả theo tiêu đề/chủ đề đã có. Không dùng quote, avatar khách hàng, lượt thích, số lượt đọc, ngày đăng không xác minh. |
| Comparison 7 | Có dữ liệu thật Q3/2025 vs Q3/2026; dạng *image wipe* không phải cách tối ưu nhất để đọc KPI | **Có điều kiện** | Dùng visual đối chiếu hai kỳ như một lớp tương tác phụ **chỉ nếu** dữ liệu vẫn dễ đọc và so sánh công bằng. Bắt buộc có bảng đầy đủ; nếu thanh kéo khiến số liệu khó đọc, **bỏ thanh kéo**, thay bằng two-column toggle/table rõ ràng. Không ép ví dụ trước-sau về kết quả cá nhân. |
| How It Works 4 | **Rất phù hợp**: không cần KPI mới | **Giữ, chủ động viết nội dung** | 3 bước nghề nghiệp chung: Research & Audit → Implement & Optimize → Measure & Iterate; checklist là phương pháp, không phải tuyên bố đã hoàn thành cho một khách hàng. |
| Contact 3 | Cần thiết; có 3 địa chỉ/kênh thật | **Giữ** | Email, LinkedIn, Phone. Không tạo form không backend, booking link giả. |
| Footer 11 | Bản 5 cột hơi thừa với portfolio một trang | **Thu nhỏ** | Wordmark, 2–3 nhóm link thật và back-to-top. Không thêm Policy/Terms hay các page không tồn tại chỉ để đủ cột. |

**Kết luận thiết kế:** Không bắt buộc phải có 9 section riêng hoặc copy đúng hình thức của cả 9 mẫu. Điều bắt buộc là **giải quyết mục đích của mỗi khu vực nếu nó mang lại giá trị**. Được giảm bớt hiệu ứng, đổi dạng trình bày hoặc bỏ block phụ nếu không đủ dữ liệu / tạo trùng lặp. Giữ Navigation, Hero, Evidence, Skills, Writing, Process, Experience, Contact và Footer thành câu chuyện hoàn chỉnh; Comparison là cách hiển thị trong Evidence, không nhất thiết là section riêng.

## B. Trục nội dung đề xuất — không biến website thành CV

1. **Who I am — Hero:** Tôi theo đuổi SEO từ việc hiểu người tìm kiếm, xây nội dung hữu ích đến kiểm tra hiệu suất. Một câu định vị + CTA; không liệt kê chức danh như CV.
2. **How I think — Editorial approach:** Quan điểm về search intent, chất lượng trang và bằng chứng. Viết mới được vì là góc nhìn/phương pháp nghề nghiệp, không phải sự kiện lịch sử.
3. **Selected work — Evidence:** Một case có số liệu sitewide xác minh; giải thích vai trò tham gia, dữ liệu và giới hạn attribution. Không kéo căng thành nhiều case không có bằng chứng.
4. **How I work — Process:** Nêu quy trình có tính tổng quát, checklist cụ thể. Đây là **nội dung mới do AI được phép tự viết**, miễn không diễn giải thành kết quả đã đạt.
5. **What I can work on — Skills:** Năng lực diễn giải qua vấn đề/cách tiếp cận/đầu ra, khác với timeline công việc. **Không copy nguyên bullet CV**.
6. **What I have published — Writing:** Bài viết thật như bằng chứng đầu ra; không tạo lời khen, khách hàng hoặc social engagement.
7. **Where I grew — Experience:** Timeline ngắn 3 vai trò ở cùng đơn vị; đặt mốc thời gian chính xác, không lặp y nguyên content của Skills.
8. **Contact + Footer:** Điều hướng và hành động thật, gọn.

**Gợi ý cân bằng nội dung:** Khoảng 50–60% không gian dành cho case / workflow / writing / problem-solving; Career/Experience ngắn gọn. Đây là tỷ trọng biên tập ước lượng, không phải KPI kỹ thuật.

## C. Ngân hàng copy mới — ĐƯỢC PHÉP SỬ DỤNG TRỰC TIẾP

Các đoạn dưới đây là **nội dung giới thiệu tư duy/quy trình**, không phải chứng cứ về thành tựu. Có thể biên tập lại để phù hợp layout và tone `Muted Editorial`. Viết đủ VI/EN.

### C1. Hero positioning / định vị
- VI headline phụ: `SEO bắt đầu từ điều người dùng thực sự cần.`
- EN: `SEO starts with what people actually need.`
- VI microcopy: `Tôi kết nối nhu cầu tìm kiếm, nội dung và dữ liệu để đưa ra quyết định tối ưu có cơ sở.`
- EN: `I connect search intent, content and evidence to make more informed SEO decisions.`
- CTA: `Xem công việc` / `Explore my work`; `Liên hệ` / `Get in touch`.

### C2. Editorial principle / tư duy làm việc
- VI heading: `Không chỉ tối ưu để được tìm thấy.`
- EN heading: `Beyond getting found.`
- VI body: `Một trang có thể thu hút lượt hiển thị nhưng vẫn chưa trả lời đúng nhu cầu. Tôi thường bắt đầu bằng cách xem người đọc đang tìm gì, trang hiện tại hứa hẹn điều gì và dữ liệu cho thấy khoảng cách ở đâu. Từ đó, việc thay đổi nội dung hay cấu trúc mới có lý do rõ ràng.`
- EN body: `A page can earn impressions and still miss the reader's need. I start by examining the intent behind a search, what the page promises and where performance signals suggest a gap. That gives content and structural changes a clear purpose.`
- Small note VI/EN: `Search intent · Content quality · Technical clarity · Measurement`.

### C3. Mini editorial insights / các câu hỏi công việc, không coi là dự án hoàn thành
Chỉ chọn **2 hoặc 3**, có thể xếp thành hàng nhỏ trong Process/Skills; **không tạo thêm một section nếu lặp**.

**Topic A — Crawl & index**
- VI title: `Trang này có thực sự nên được index?`
- EN: `Does this page deserve to be indexed?`
- VI body: `Tôi xem khả năng crawl, nội dung hữu ích, mức độ trùng lặp và mục đích tìm kiếm trước khi đề xuất giữ, hợp nhất, noindex hay cải thiện một nhóm trang.`
- EN body: `I look at crawlability, usefulness, duplication and intent before recommending whether a page group should be improved, consolidated or kept out of the index.`

**Topic B — Content mapping**
- VI title: `Một từ khóa chưa đủ để quyết định cấu trúc trang.`
- EN: `One keyword rarely defines a page.`
- VI body: `Nhóm truy vấn, search intent và vai trò từng URL giúp xác định nên tạo nội dung mới, cập nhật trang có sẵn hay tránh nội dung trùng lặp.`
- EN body: `Query groups, search intent and each URL's role help determine whether to create, improve or consolidate content.`

**Topic C — Measurement**
- VI title: `Tăng một chỉ số không đồng nghĩa mọi thứ đều tốt hơn.`
- EN: `A rising metric is not the whole story.`
- VI body: `Tôi đặt clicks, impressions, CTR, vị trí trung bình và cơ cấu trang trong cùng bối cảnh để tránh kết luận quá nhanh từ một con số.`
- EN body: `I interpret clicks, impressions, CTR, average position and the changing page mix together rather than relying on one positive number.`

### C4. Process — nội dung có thể viết mới không cần input
Use the existing process copy in `CONTENT_SPEC.md` as a base, but enrich the *meaning* of each step, not the quantity of icons:
- `Nghiên cứu & kiểm tra / Research & audit`: **Question:** `Người tìm kiếm muốn giải quyết điều gì, và website đang cản trở ở đâu?` / `What is the searcher trying to solve, and what might be holding the site back?`
- `Triển khai & tối ưu / Implement & optimize`: **Question:** `Thay đổi nào có khả năng tăng giá trị cho trang mà vẫn nhất quán với mục tiêu tìm kiếm?` / `Which changes could make the page more useful while matching its search purpose?`
- `Đo lường & cải tiến / Measure & iterate`: **Question:** `Dữ liệu sau triển khai cho thấy điều gì, và cần kiểm tra thêm điều gì?` / `What do the next signals show, and what should be investigated further?`
Add to each step a small label `Câu hỏi tôi đặt ra / The question I ask` so visitor understands this is a thinking framework, not project milestones.

### C5. Features — tab copy model (khác CV)
For each tab present the trio **Problem → Approach → Deliverable**, with no invented artifacts or outcomes. Use this concise example copy or improve phrasing:

| Tab | Problem / Vấn đề | Approach / Cách tiếp cận | Typical output / Đầu ra dạng công việc |
|---|---|---|---|
| Technical SEO | `Trang khó crawl/index hoặc trùng lặp.` / `Pages may be hard to crawl, index or distinguish.` | `Kiểm tra URL, indexability, canonical, sitemap và các mẫu trang.` / `Review URL patterns, indexability, canonicals and sitemaps.` | `Danh sách vấn đề và hướng xử lý.` / `An issue list and prioritized recommendations.` |
| Content Strategy | `Nội dung chưa khớp search intent.` / `Content may miss the searcher's intent.` | `Nhóm keyword, xác định page intent, làm brief và on-page.` / `Cluster queries, map intent and refine briefs/on-page content.` | `Keyword map, content brief hoặc cập nhật trang.` / `Keyword map, brief or page improvement plan.` |
| Analytics | `Dữ liệu tăng giảm nhưng nguyên nhân chưa rõ.` / `Metrics move without a clear explanation.` | `So sánh GSC/GA4 theo giai đoạn, truy vấn, URL và nhóm trang.` / `Compare periods, queries, URLs and page groups in GSC/GA4.` | `Bản đọc dữ liệu và giả thuyết cần kiểm chứng.` / `A performance reading and testable hypotheses.` |
| Workflow | `Dữ liệu URL lặp lại, khó đối chiếu thủ công.` / `Repetitive URL data is hard to reconcile manually.` | `Chuẩn hóa, đối chiếu và kiểm tra bằng Sheets/Apps Script.` / `Normalize, match and review with Sheets/Apps Script.` | `Bảng đối chiếu hoặc quy trình xử lý lặp lại.` / `A reconciled sheet or repeatable workflow.` |

Write as **scope / approach** (`I can work on`, `I review`) rather than asserting that a particular deliverable was shipped on a particular client project.

### C6. Writing — 3 real article topic blurbs (không tóm tắt bài chưa đọc)
- IVR article — VI: `Bài viết về lợi ích của hệ thống trả lời thoại tương tác trong trải nghiệm khách hàng.` EN: `A piece exploring the benefits of interactive voice response for customer experience.`
- CTI article — VI: `Nội dung giới thiệu lý do doanh nghiệp quan tâm đến tích hợp điện thoại và máy tính.` EN: `An overview of why businesses consider computer telephony integration.`
- CX solutions article — VI: `Bài tổng quan về các hướng giải pháp trải nghiệm khách hàng được đề cập cho năm 2026.` EN: `An overview of customer-experience solution options discussed for 2026.`
These are title-derived topic descriptions; avoid inventing what a specific article concludes without reading its body. Keep titles and links exact as in `CONTENT_SPEC.md`.

## D. Những nội dung NÊN ĐỂ CHỜ DỮ LIỆU NGƯỜI DÙNG — không tự viết ra sự kiện

These are **non-blocking future content modules**. Do not show empty cards or lorem ipsum to public visitors. Record pending items in `docs/CONTENT_GAPS.md`; if code scaffolding is useful, keep these draft objects disabled/hidden until validated.

| Draft ID | Nội dung có giá trị nếu được xác minh | Cần người dùng cung cấp | Cách hiển thị khi chưa có |
|---|---|---|---|
| `CASE_02` | Mini case về nhóm page category + location, vấn đề indexability và cách ra quyết định SEO | Cho phép công khai/tên ẩn danh; mô tả vai trò cá nhân; **trạng thái** chỉ đề xuất, đã triển khai hay đo lường; bằng chứng/ảnh đã che thông tin nếu có | **Không render card case thực chiến**. Có thể dùng câu hỏi tổng quát `Trang này có nên được index?` tại mục editorial insights, không gọi là case hoàn thành |
| `CASE_03` | Workflow tối ưu dữ liệu URL / Google Sheets / Apps Script | Ví dụ input/output an toàn công khai; phần nào chính tay làm; tình trạng áp dụng thực tế; kết quả nếu muốn định lượng | Chỉ mô tả phương pháp, không gọi đây là tool đã triển khai thực tế nếu chưa xác minh |
| `CASE_04` | Case content SEO cho B2B technology / AI voicebot | 1–2 brief, mục tiêu, URL công khai, vai trò và nội dung được phép công bố; số liệu nếu có | Chỉ dùng 3 bài published writing đã xác minh, không bịa KPI Primas |
| `PROJECT_DURATION` | Giai đoạn/timeline từng dự án, ngoài timeline nghề nghiệp | Tên dự án được phép nêu, mốc bắt đầu/kết thúc, trạng thái | Không hiển thị durations/sprint bars tự chế; chỉ hiện mốc nghề nghiệp đã biết |
| `VISUAL_ASSETS` | Ảnh báo cáo GSC, audit, mẫu brief, worksheet, code demo | Ảnh tự sở hữu, đã được che tên miền/account/dữ liệu nhạy cảm; quyền đăng tải | Không tạo ảnh chụp/dashboard giả; dùng typography/cards sạch |
| `EXTERNAL_PROOF` | Testimonial, chứng nhận, giải thưởng | Quote thật có consent / link chứng nhận / tài liệu xác minh | Không render testimonial/award section |
| `PERSONAL_MEDIA` | Chân dung cá nhân, project video | Ảnh/video do người dùng cung cấp, quyền sử dụng | Không dùng stock photo / ảnh người tạo bằng AI |

**Quan trọng:** Các chỗ `CASE_02`... là *content slot dành cho lần cập nhật sau*, **không phải yêu cầu tạo section trống trên website public**. Nếu thích người xem thấy nội dung tương lai, chỉ có thể dùng `Coming soon / Sẽ cập nhật` trong một khu vực thật sự có ngữ cảnh và người dùng đã đồng ý; mặc định không hiển thị.

## E. Quy tắc quyết định trước khi code

1. **Inventory:** Map nội dung thật trong repo + `CONTENT_SPEC.md` vào các vị trí UI.
2. **Reduce:** Với block trùng chức năng, chọn cách trình bày đơn giản nhất, không gắn một animation chỉ vì reference có nó.
3. **Author:** Viết thêm câu chữ VI/EN tại mục C và các mô tả methodology/content skills khi chúng là nội dung biên tập, không phải lịch sử khách hàng.
4. **Separate:** Đặt mọi `CASE_02`/KPI/ảnh/testimonial chưa xác minh vào `CONTENT_GAPS.md`, không vào bản public.
5. **Build:** Tạo website hoàn chỉnh bằng dữ liệu sẵn có, **không hỏi người dùng trước mỗi chỗ thiếu**. Các thiếu hụt không thiết yếu không được chặn hoàn thành.
6. **Disclose:** Báo cáo ngắn phần nội dung tự viết mới, phần đã xác minh và những slot cần người dùng bổ sung sau.

## F. Ưu tiên tối giản khi thiết kế

- Nếu Experiences với Process đều có timeline chấm nối trùng nhau, giữ timeline được nhấn hơn cho **Process**, còn Experience dùng career list/editorial rail tĩnh hoặc reveal một lần.
- Nếu Comparison wipe che số liệu, thay bằng bảng/bars công bằng có thể đọc nhanh. Dữ liệu và bối cảnh được ưu tiên hơn việc mô phỏng slider.
- Nếu Footer 5 cột làm rỗng nội dung, thu xuống 2–3 nhóm; không thêm link bịa.
- Nếu article carousel có chỉ 3 bài và trên desktop hiển thị đủ cả 3, cho phép card grid/rail với nút phù hợp; không ép autoplay giả tạo.
- Nếu Skills 4 tab quá dày trên mobile, chuyển sang accessible accordion ở breakpoint nhỏ, giữ nội dung và thao tác.
- Nếu các animation làm site mất cảm giác dịu, ưu tiên readability/contrast/performance.
