# FULL PROMPT TIẾNG VIỆT CHO CODEX — SEO PORTFOLIO v4

> Tài liệu lưu trữ từ pack yêu cầu ban đầu. Các chỉ dẫn về static HTML/CSS/JS và `dist/` đã được thay bằng yêu cầu mới: source Next.js/React/TypeScript trong `src/`, xuất tĩnh ra `out/`. Xem `README.md` và `docs/SOURCE_MAP.md` để làm việc hiện tại.

**Repository:** `tiendatpham2014-max/pham-tien-dat-seo-portfolio` (hiện private)

**File kèm theo:** `SEO_Portfolio_Codex_Pack_v4.zip`

**Mục tiêu:** Trực tiếp redesign và xây dựng hoàn chỉnh SEO Portfolio của Phạm Tiến Đạt (Dat Pham) từ source hiện có. Tôi muốn website là một **portfolio chuyên môn với nội dung có chiều sâu, không phải bản CV kéo dài**. Kết quả cuối cùng phải có website chạy thực tế, branch GitHub chứa code mới, và bản Preview/Staging nếu có thể tạo an toàn.

## 1. Chuẩn bị và dọn nguồn thiết kế cũ

1. Mở repo hiện có, đọc cấu trúc source/cấu hình và kiểm tra các thay đổi đang có; không xóa công việc chưa commit của người khác.
2. Nếu nhận ZIP, giải nén **nội dung bên trong** vào gốc repo, merge thư mục `docs/` và thay `AGENTS.md` bằng bản v4. Không tạo thêm thư mục bao ngoài; không ghi đè `dist/index.html` bằng file ZIP.
3. Xóa **chỉ tài liệu reference design cũ**: `docs/references.md` và `docs/design-direction.json` (nếu tồn tại), cùng các link/hướng dẫn crawl reference đã hết hiệu lực trong tài liệu khác. Không xóa source website, assets, `docs/brief.md`, `docs/evidence.md`, package/hosting config.
4. Không truy cập lại 9 link React Bits, không đi tìm source Pro hay research thêm template. Bộ Markdown mới đã chuyển các ý tưởng đó thành specification local.

## 2. Đọc các file theo đúng thứ tự

- `AGENTS.md`
- `docs/CONTENT_ARCHITECTURE.md` **(quan trọng nhất về lựa chọn và mở rộng nội dung)**
- `docs/CONTENT_SPEC.md`
- `docs/CONTENT_GAPS.md`
- `docs/DESIGN_SPEC.md`
- `docs/MOTION_SPEC.md`
- `docs/QA_CHECKLIST.md`
- `docs/brief.md`, `docs/evidence.md`, `dist/index.html` và các file chạy website hiện tại.

**Chú ý:** CV chỉ cung cấp những thông tin nghề nghiệp đã xác minh. Nó **không giới hạn tất cả nội dung có thể xuất hiện trên website**. Được phép viết thêm nội dung chuyên môn mang tính diễn giải, phương pháp, tư duy SEO, phần giới thiệu và chú giải, miễn không bịa dữ kiện hay case đã làm.

## 3. Đánh giá từng mẫu và quyết định phần nào thực sự có ích

Dùng bảng đánh giá trong `CONTENT_ARCHITECTURE.md`. Tôi không yêu cầu phải ép 9 block thành 9 section tách biệt.

- **Giữ** Navigation 15, Hero 22, Features 4, How It Works 4, Contact 3.
- **Chuyển cách dùng** Social Proof 11 thành danh sách/carousel 3 bài blog thật. Không tạo testimonial giả.
- **Đơn giản hóa** Footer 11 thành 2–3 nhóm link thật; không tạo 5 cột chỉ để giống mẫu.
- **Không sao chép nguyên Features 17** dạng địa cầu, múi giờ, văn phòng vì portfolio chưa có dữ kiện tương ứng. Chỉ dùng career timeline/rail nếu nó giúp người xem hiểu quá trình nghề nghiệp. Tránh trùng animation với How It Works.
- **Comparison 7 là tùy điều kiện**: chỉ dựng thanh kéo nếu thật sự có ích khi đọc dữ liệu hai kỳ. Nếu thanh kéo khiến số liệu bị che, dùng bảng và đồ họa đối chiếu dễ đọc hơn. Không làm slider giả hoặc biến dữ liệu sitewide thành thành tích cá nhân.

**Nguyên tắc chính:** Chọn giao diện phục vụ nội dung. Không chế thêm dữ liệu để đủ component.

## 4. Chủ động mở rộng nội dung vượt ngoài CV

**Bạn phải trực tiếp xây dựng nội dung bổ sung**, không chỉ bê mô tả công việc từ CV lên site:

1. Viết phần định vị Hero và quan điểm nghề nghiệp rõ ràng, có cả VI/EN.
2. Viết phần Editorial Approach thể hiện tư duy search intent, content quality, technical clarity và cách đọc dữ liệu; dùng copy bank đã viết tại `CONTENT_ARCHITECTURE.md` và biên tập để tự nhiên.
3. Viết How It Works thành ba giai đoạn: Research & Audit → Implement & Optimize → Measure & Iterate, với câu hỏi nghề nghiệp và checklist cụ thể. Nêu rõ đây là phương pháp làm việc, không phải claim một case đã triển khai.
4. Viết các tab Skills theo cấu trúc **Problem → Approach → Typical output**, khác với phần kinh nghiệm. Kỹ năng cần giải thích người xem có thể hiểu công việc giải quyết điều gì.
5. Giới thiệu ba bài viết Primas đã xuất bản bằng các mô tả chủ đề ngắn; giữ nguyên tiêu đề và link thật.
6. Giữ một case GSC có dữ liệu thực Q3/2025 và Q3/2026, bao gồm cả impressions giảm, nguồn, attribution team-level và những hạn chế cần đọc kèm.
7. Experience chỉ cần tóm tắt 3 giai đoạn Intern → Contributor → Executive ở cùng doanh nghiệp; không kéo dài thành CV dạng bullet.
8. Có thể thêm 2–3 SEO editorial insights ngắn nếu giúp phần chuyên môn phong phú hơn; không thêm nếu trùng nội dung Process/Skills.

**Nội dung mới phải được viết vào website thực tế**, không chỉ liệt kê trong báo cáo. Đảm bảo câu chữ tự nhiên cho cả VI và EN.

## 5. Xử lý dữ liệu còn thiếu: giữ slot chờ, KHÔNG bịa và KHÔNG chặn triển khai

Một số ý tưởng có tiềm năng nhưng chưa đủ bằng chứng hoặc quyền công bố:
- Mini case category + location landing pages và chiến lược indexability.
- Workflow Google Sheets/Apps Script xử lý dữ liệu URL.
- Case nội dung B2B tech/AI voicebot có deliverable cụ thể ngoài 3 blog đã có.
- Thời gian từng dự án, hình ảnh dashboard/crawl/worksheet thật, testimonials, certificates, hình cá nhân.

Hãy cập nhật `docs/CONTENT_GAPS.md` với **những gì cần tôi cung cấp** để có thể thêm sau. Nếu cần scaffolding trong code, để trạng thái chưa xuất bản/không render. **Không tạo section trống, lorem ipsum, mockup data hay card Coming Soon trên website public**; không giả rằng một đề xuất đã được triển khai xong.

Không hỏi tôi từng dữ liệu không thiết yếu rồi dừng tiến độ. Dùng những nội dung đã đủ căn cứ để hoàn thiện bản hiện tại; báo cáo những phần có thể cải thiện khi tôi gửi thêm dữ liệu.

## 6. Art direction: dịu mắt, hài hòa, không quá sáng

- Phong cách **Muted Editorial**: warm stone, soft ivory, deep slate điểm nhấn, muted teal và dusty lavender rất hạn chế.
- Không nền trắng gắt, neon, gradient chói, glow mạnh hay hiệu ứng nảy quá nhiều.
- Hero flowing mesh nhẹ, mờ, chuyển động chậm; không che mất headline.
- Giữ chữ dễ đọc, hierarchy tốt, whitespace hợp lý; không chuyển cả site thành dark mode.
- Các section phải liền mạch, không có cảm giác chín component demo ghép rời.

## 7. Công nghệ và animation

- Source hiện tại dùng HTML/CSS/JavaScript thuần trong `dist/index.html`. Giữ static stack; không tự đổi sang React/Next/Vite, không thêm thư viện không cần thiết.
- Chỉ triển khai animation tương ứng với thành phần thực sự được sử dụng theo `MOTION_SPEC.md`: nav active underline, hero mesh, reveal, tabs, blog rail, process path, contact hover; comparison drag **nếu** được chọn; career horizon **chỉ nếu** không thừa.
- Đảm bảo hover/focus, keyboard/touch, mobile drawer, `prefers-reduced-motion`, không che nội dung khi JS tắt.
- Bảo toàn dữ liệu GSC thật, content song ngữ, các link và privacy rules.

## 8. Triển khai, chạy và kiểm thử

1. Lập sơ đồ ngắn section → nguồn dữ liệu → nhóm mẫu → quyết định giữ/đổi/loại trong quá trình nội bộ, sau đó **triển khai luôn**, không dừng để chờ phê duyệt từng section.
2. Cập nhật source, CSS, JS, copy VI/EN và tương tác thực tế.
3. Chạy local bằng `npm run dev` và kiểm tra được trang tại `http://localhost:4173` (hoặc cổng tương ứng).
4. Test navigation, menu mobile, tabs, carousel/card rail, case comparison, contact links, VI/EN, responsive các kích thước phổ biến, keyboard, reduced motion và lỗi console.
5. Soát `QA_CHECKLIST.md`, sửa các lỗi phát hiện; nếu thiếu công cụ kiểm tra thì báo trung thực phần chưa kiểm chứng.

## 9. GitHub và Preview sau khi hoàn thiện

**Tôi cho phép bạn push source sau khi hoàn tất kiểm thử, nhưng CHỈ lên nhánh mới dành cho redesign.**

- Tạo branch ví dụ `feature/seo-portfolio-redesign-v4`, commit toàn bộ source và spec đã chỉnh, push branch lên repository private hiện tại.
- **Không** push thẳng `main`, không merge/đổi visibility repository, không xóa các nhánh khác.
- Triển khai **Preview/Staging** nếu có môi trường an toàn, tách biệt production, và kiểm tra đường link thực tế. Không sửa hoặc thay thế production nếu chưa được tôi đồng ý.
- Nếu không thể deploy staging, cung cấp cách chạy local/preview thật; không tạo URL giả, không tuyên bố đã deploy nếu chưa được xác minh.

## 10. Báo cáo kết quả bằng tiếng Việt

Bàn giao:
1. Danh sách section thực tế đã dựng và lý do giữ/đơn giản hóa/bỏ các mẫu dư thừa.
2. Những nội dung **mới soạn bổ sung ngoài CV**, chỉ rõ chúng là diễn giải chuyên môn chứ không phải case có KPI.
3. Những content slot còn thiếu tại `CONTENT_GAPS.md` và chính xác tôi cần cung cấp gì để xuất bản sau.
4. Những file đã chỉnh/sửa/xóa, kèm danh sách legacy reference đã loại bỏ.
5. Các chức năng và kết quả test thực tế (cái nào kiểm chứng được, cái nào chưa).
6. URL GitHub branch, link Preview/Staging nếu có, hoặc cách xem local.
7. Lỗi còn lại hoặc khác biệt đáng kể so với spec (nếu có).

**Kết quả tôi mong muốn không phải CV có animation, mà là một SEO Portfolio có câu chuyện, tư duy nghề nghiệp, ví dụ công việc và bằng chứng đáng tin; giao diện nhẹ nhàng, mượt và dùng được.**
