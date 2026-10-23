# AGENTS — Phạm Tiến Đạt SEO Portfolio (v4, content-first)

## Mục tiêu
Redesign trực tiếp website SEO Portfolio song ngữ hiện có. **Không coi CV là giới hạn nội dung**: dùng dữ liệu nghề nghiệp đã xác minh, viết thêm nội dung về tư duy/quy trình SEO, giữ những case đòi bằng chứng thành backlog rõ ràng. Giao tiếp/báo cáo bằng tiếng Việt. Copy trên site phải tự nhiên cả VI/EN, chính xác và chuyên nghiệp.

## Thứ tự đọc bắt buộc
1. `docs/CONTENT_ARCHITECTURE.md` — **đánh giá thực tế của 9 mẫu; quyết định giữ/chuyển/thu gọn/bỏ**; copy gợi ý VI/EN.
2. `docs/CONTENT_SPEC.md` — các dữ kiện, kết quả GSC, nghề nghiệp, các link thực tế và giới hạn phát biểu.
3. `docs/CONTENT_GAPS.md` — mục chưa có bằng chứng, chỉ đưa vào danh sách chờ, **không render card trống**.
4. `docs/DESIGN_SPEC.md` — hệ thống bố cục và visual direction.
5. `docs/MOTION_SPEC.md` — tương tác được chọn; không triển khai hiệu ứng cho thành phần bị bỏ.
6. `docs/QA_CHECKLIST.md` — tiêu chí nghiệm thu.
7. `docs/brief.md`, `docs/evidence.md`, `dist/index.html`, `package.json`, `dev-server.mjs`, hosting config để đối chiếu nguồn.

## Quy tắc ra quyết định nội dung/UI
- Portfolio nên cho thấy **cách nghĩ, cách làm, dự án, bằng chứng, bài viết và kinh nghiệm**, không chỉ là CV web.
- Chỉ bắt buộc phải hiện các **chức năng nội dung có giá trị**; 9 link là 9 ý tưởng thiết kế, không bắt buộc 9 block/animation nguyên bản.
- Features 17 (globe/office timezone) không có dữ liệu phù hợp: **không giả tạo thế giới/văn phòng**, có thể chỉ dùng career rail tĩnh/tinh tế.
- Features 4 dùng cho Problem → Approach → Typical output, không lặp timeline việc làm.
- How It Works 4: nội dung phương pháp SEO do AI soạn được, không phải lời khẳng định hoàn tất ở khách hàng cụ thể.
- Comparison 7: dùng dữ liệu thật; nếu slider làm số liệu khó đọc, **chuyển sang thẻ so sánh/bảng**. Không ép hiệu ứng chỉ vì reference có nó.
- Social Proof 11 là kiểu trình bày 3 bài viết thật, không testimonial giả.
- Footer 11 rút gọn 2–3 nhóm link thật; không thêm cột trống.
- Những ý tưởng case/category-location/Apps Script/B2B chưa đủ dữ liệu cần đưa vào `CONTENT_GAPS.md`; chỉ hiển thị khi người dùng xác minh và cho phép công bố.
- Các đoạn content trong `CONTENT_ARCHITECTURE.md` về góc nhìn và quy trình **được phép soạn, điều chỉnh và xuất bản**; không mô tả chúng thành case study đã hoàn thành hay KPI đạt được.

## Dọn tài liệu design cũ
- Xóa `docs/references.md` và `docs/design-direction.json` khỏi repo nếu tồn tại; không tạo placeholder.
- Bỏ link/instructions yêu cầu crawl reference thiết kế cũ trong tài liệu khác; chỉ gỡ phần lỗi thời, bảo toàn thông tin dự án.
- Không xóa `docs/brief.md`, `docs/evidence.md`, content/evidence/spec mới, source, assets, package và hosting config.

## Không crawl web tham khảo thiết kế
- Không mở React Bits / demo / reference websites / tìm mã nguồn trả phí. Thông số UI và animation đã quy định trong local docs.
- Được chạy localhost, kiểm tra UI thực tế, chạy git/GitHub và quy trình staging theo lệnh deploy bên dưới. Không hiểu lệnh cấm crawl là cấm test hoặc cấm push branch.

## Công nghệ
- Source thực tế là static HTML/CSS/JS trong `src/`, ghép thành `dist/` bằng `npm run build`; không phải React.
- Chạy local bằng `npm run dev` (127.0.0.1:4173). Chạy `npm run check` trước khi push. Không tự chuyển stack, không thêm dependency không cần thiết.
- Giữ chức năng, i18n, metric/attribution, link, bảo mật, asset và hosting config. Lưu ý bản public vẫn thể hiện vai trò SEO Executive đang tiếp diễn tại thời điểm 23/10/2026.

## Art direction
- Muted Editorial: warm stone, soft ivory, deep slate có chọn lọc, muted teal/lavender rất ít, không pure white/neon/glow mạnh; chữ tương phản rõ.
- Animation tinh tế, tập trung hỗ trợ đọc; tránh 2 timeline cùng animated mạnh; accessibility, reduced-motion, keyboard/touch bắt buộc.

## Quy tắc dữ liệu
- Không bịa kết quả cá nhân từ KPI sitewide; không giấu impressions giảm.
- Không bịa dự án đã triển khai, khách hàng, testimonial, screenshots, publication dates, chứng chỉ, thời hạn dự án, trang pháp lý hoặc trang liên kết.
- Không đưa client URL/exports định danh vào public source; các demo/gợi ý còn thiếu phải được đánh dấu chờ trong `docs/CONTENT_GAPS.md`.

## Push và preview
- Người dùng **cho phép Codex hoàn thiện rồi tạo nhánh redesign riêng, commit/push nhánh đó, và tạo preview/staging nếu có cách triển khai an toàn**.
- **Không** push vào `main`, merge PR, đổi private/public, bật GitHub Pages công khai, đổi config production hoặc thay thế deploy production hiện tại nếu chưa được cho phép riêng.
- Nếu không thể deploy preview an toàn, cung cấp local preview + hướng dẫn chạy; đừng báo một URL không xác minh.
- Báo cáo bằng tiếng Việt: những phần giữ/bỏ và lý do, copy bổ sung, chỗ chờ data, thay đổi source, kiểm thử thật, nhánh GitHub và preview (nếu có).
