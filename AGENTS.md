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
7. `docs/brief.md`, `docs/evidence.md`, `src/app/page.tsx`, `src/content/portfolio.ts`, `package.json` và hosting config để đối chiếu nguồn.

## Quy tắc ra quyết định nội dung/UI
- Portfolio nên cho thấy **cách nghĩ, cách làm, dự án, bằng chứng, bài viết và kinh nghiệm**, không chỉ là CV web.
- Chỉ bắt buộc phải hiện các **chức năng nội dung có giá trị**; 9 link là 9 ý tưởng thiết kế, không bắt buộc 9 block/animation nguyên bản.
- Features 17 là nguồn chính cho cảnh hành trình nghề nghiệp: giữ bầu trời tối, vầng sáng di chuyển trên đường cong địa cầu và ba mốc sáng theo cuộn. Gắn mốc vào ba vai trò thật; không giả tạo văn phòng, múi giờ hoặc phạm vi làm việc toàn cầu.
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
- Không xóa `docs/brief.md`, `docs/evidence.md`, content/evidence/spec mới, source Next.js, assets, package và hosting config.

## Nguồn tham khảo thiết kế
- Chủ portfolio đã yêu cầu đối chiếu trực tiếp chín preview React Bits Pro và minwang.dev. Xem bản công khai để hiểu bố cục, màu và hành vi; không sao chép mã trả phí hoặc asset của nguồn.
- `docs/DARK_REFERENCE_PASS.md` ghi ánh xạ mới từ nguồn sang từng phần của portfolio.

## Công nghệ
- Source hiện dùng Next.js App Router, React và TypeScript. `src/app/` chứa trang/layout, `src/components/sections/` chứa từng section, `src/components/portfolio/` chứa từng tương tác, `src/content/` chứa copy VI/EN và dữ liệu GSC, `src/styles/` chứa CSS theo phần.
- `npm run build` xuất site tĩnh ra `out/`; không commit `out/`. Chạy local bằng `npm run dev` (127.0.0.1:4173), kiểm tra bằng `npm run check` và `npm run build` trước khi push. Font và giấy phép ở `public/fonts/`.
- Giữ chức năng, i18n, metric/attribution, link, bảo mật, asset và hosting config. Lưu ý bản public vẫn thể hiện vai trò SEO Executive đang tiếp diễn tại thời điểm 23/10/2026.

## Art direction
- React Bits là nguồn tham khảo chính cho bố cục và chuyển động. minwang.dev chỉ là nguồn phụ cho nhịp typography/cảnh cuộn. Hướng màu hiện tại là dark navy, xen nền than; chữ trắng ngà, nhấn mint tiết chế, tương phản rõ.
- Không lặp thẻ xếp/lật ở nhiều section. Hành trình dùng horizon theo Features 17; GSC đổi chỉ số phẳng và giữ wipe của Comparison 7.
- Chuyển động theo cuộn là phần kể chuyện chính. Vẫn bảo đảm reduced-motion, keyboard/touch và nội dung đọc được khi JavaScript không chạy.

## Quy tắc dữ liệu
- Không bịa kết quả cá nhân từ KPI sitewide; không giấu impressions giảm.
- Không bịa dự án đã triển khai, khách hàng, testimonial, screenshots, publication dates, chứng chỉ, thời hạn dự án, trang pháp lý hoặc trang liên kết.
- Không đưa client URL/exports định danh vào public source; các demo/gợi ý còn thiếu phải được đánh dấu chờ trong `docs/CONTENT_GAPS.md`.

## Live và GitHub Desktop

- Phát triển từ source Next.js trong checkout GitHub này; bảo đảm bản đưa lên Site được build từ cùng source. Không lấy bản HTML/CSS/JS cũ làm nguồn chỉnh sửa song song.
- Sau mỗi lần deploy live, xác nhận trạng thái deployment là `succeeded` và URL đang chạy. Chỉ sau đó tạo **commit cục bộ** trong checkout GitHub Desktop trên nhánh `main` bằng `npm run commit:after-live -- --version N --deployment-id ID --url URL --message "Mô tả thay đổi"`.
- Trước khi chạy lệnh, xem `git status` và diff để chắc chắn chỉ gồm source/tài liệu của lần cập nhật đó. Script stage source, cấu hình và tài liệu, bỏ qua `out/`, `.next/`, `node_modules/`; nếu không có thay đổi thì không tạo commit rỗng.
- **Không tự `git push`, bấm Push origin, tạo PR hoặc đồng bộ GitHub remote.** Người dùng sẽ tự upload bằng GitHub Desktop sau khi xem commit. Nếu deploy thất bại hoặc chưa xác minh, không tạo commit mang nhãn live.
- Giữ nguyên chế độ truy cập của Site và GitHub trừ khi người dùng yêu cầu đổi. Báo cáo bằng tiếng Việt: phiên bản live, commit cục bộ, nhánh hiện tại, các file chính đã đổi và trạng thái chưa push.
