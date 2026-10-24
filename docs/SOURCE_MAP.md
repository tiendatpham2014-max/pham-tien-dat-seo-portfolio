# Bản đồ source

`src/` là nơi chỉnh sửa. `scripts/build.mjs` ghép các file theo thứ tự số ở đầu tên và xuất `dist/index.html`, `dist/style.css`, `dist/app.js`. Việc tách file không đổi stack hoặc cơ chế chạy của website.

| Tính năng | HTML | CSS | JavaScript | Dữ liệu / quyết định |
| --- | --- | --- | --- | --- |
| Điều hướng, VI/EN, Light/Dark | `src/html/00-document-open.html`, `10-navigation.html` | `src/css/10-navigation.css`, `198-theme-control.css`, `200-light-theme.css`, responsive | `src/js/00-copy.js`, `22-theme.js`, `40-navigation.js`, `50-language.js`, `60-mobile-menu.js`, `110-init.js` | Dark mặc định; lựa chọn theme được lưu trên máy người xem |
| Hero, sơ đồ Intent → Content → Evidence | `30-hero.html` | `20-hero.css`, `110-motion.css` | `00-copy.js`, `110-init.js` | `docs/DESIGN_SPEC.md`, `docs/MOTION_SPEC.md` |
| Cách tiếp cận | `40-approach.html` | `30-approach.css` | `00-copy.js` | `docs/CONTENT_ARCHITECTURE.md` |
| Cảnh chữ theo cuộn | `45-search-scene.html` | `185-dark-direction.css`, `190-search-scene.css` | `105-search-scene.js`, `100-scroll-stories.js` | `docs/DARK_REFERENCE_PASS.md` |
| GSC và so sánh | `50-evidence.html` | `40-evidence.css`, `120-comparison.css`, `150-evidence-story.css`, `195-evidence-story.css` | `10-gsc-data.js`, `30-metrics.js`, `90-comparison.js`, `100-scroll-stories.js` | `docs/evidence.md`; chỉ số ở cấp website, chuyển cảnh phẳng |
| Quy trình SEO | `60-process.html` | `50-process.css`, `110-motion.css` | `00-copy.js`, `110-init.js` | Nội dung phương pháp, không phải case riêng |
| Tab kỹ năng | `70-skills.html` | `60-skills.css` | `70-skills.js`, `110-init.js` | `docs/CONTENT_SPEC.md` |
| Bài viết thật | `80-writing.html` | `70-writing.css` | `80-writing-rail.js`, `110-init.js` | Liên kết trong `docs/evidence.md` |
| Kinh nghiệm theo cuộn | `90-journey.html` | `196-career-horizon-scene.css` | `100-scroll-stories.js` | Features 17: chân trời là nền tràn toàn section và chính là dòng thời gian; từng vai trò xuất hiện cùng vầng sáng theo cuộn, không có cột timeline riêng |
| Liên hệ và footer | `100-contact.html`, `110-document-close.html` | `90-contact-footer.css`, `130-contact-motion.css` | `00-copy.js` | Kênh liên hệ thật |
| Responsive, reduced motion | Tất cả section | `100-responsive-base.css`, `140-responsive-motion.css`, `170-responsive-stories.css` | `20-state.js`, `110-init.js` | `docs/QA_CHECKLIST.md` |

Các file `src/js/20-state.js`, `src/css/00-foundation.css` và `src/html/00-document-open.html` chứa phần dùng chung. Font và giấy phép nằm trong `dist/fonts/`. File `dist/` được commit để có thể chạy và đối chiếu ngay, nhưng thay đổi cần bắt đầu ở `src/`.

## Cách sửa một phần

1. Sửa fragment HTML/CSS/JS liên quan, cùng copy VI/EN trong `src/js/00-copy.js` khi có chữ mới.
2. Đối chiếu dữ kiện trong `docs/evidence.md` và `docs/CONTENT_SPEC.md`; nội dung thiếu bằng chứng để ở `docs/CONTENT_GAPS.md`.
3. Chạy `npm run build` rồi `npm run check` và xem ở localhost.
4. Commit file nguồn, tài liệu liên quan và `dist/` trong cùng thay đổi để dễ truy vết.

Không lưu ảnh chụp GSC gốc, URL website khách hàng hay dữ liệu định danh trong repo. `docs/IMPLEMENTATION_DECISIONS.md` ghi phần nào lấy ý tưởng từ React Bits và minwang.dev, còn mã tương tác là CSS/JavaScript của dự án.
