# Bản đồ source Next.js

Trang nằm trong `src/app/page.tsx`. Mỗi section có component riêng trong `src/components/sections/`; các hành vi chạy trên client được tách trong `src/components/portfolio/`. Copy VI/EN ở `src/content/portfolio.ts`, số liệu GSC ở `src/content/gsc.ts`. CSS theo phần ở `src/styles/`, được nạp theo thứ tự từ `src/app/globals.css`.

| Tính năng | Component | Hành vi | CSS / dữ liệu |
| --- | --- | --- | --- |
| Điều hướng, VI/EN, light/dark | `Navigation.tsx` | `navigation.ts`, `language.ts`, `theme.ts`, `mobile-menu.ts` | `10-navigation.css`, `198-theme-control.css`, `200-light-theme.css`, `portfolio.ts` |
| Hero và bản đồ tư duy SEO | `Hero.tsx` | `signal-lab.ts` | `20-hero.css`, `197-seo-decision-lab.css`, `portfolio.ts` |
| Góc nhìn nghề nghiệp | `Approach.tsx` | Copy VI/EN | `30-approach.css`, `portfolio.ts` |
| Cảnh chữ theo cuộn | `SearchScene.tsx` | `search-scene.ts`, `scroll-stories.ts` | `190-search-scene.css` |
| GSC, chọn chỉ số, so sánh | `Evidence.tsx` | `metrics.ts`, `comparison.ts`, `scroll-stories.ts` | `40-evidence.css`, `120-comparison.css`, `150-evidence-story.css`, `195-evidence-story.css`, `gsc.ts` |
| Quy trình SEO | `Process.tsx` | Reveal trong `init.ts` | `50-process.css`, `110-motion.css` |
| Tab chuyên môn | `Skills.tsx` | `skills.ts` | `60-skills.css`, `portfolio.ts` |
| Bài viết | `Writing.tsx` | `writing-rail.ts` | `70-writing.css` |
| Hành trình theo cuộn | `Journey.tsx` | `scroll-stories.ts` | `196-career-horizon-scene.css` |
| Liên hệ và footer | `Contact.tsx`, `Footer.tsx` | Copy VI/EN | `90-contact-footer.css`, `130-contact-motion.css` |

`src/components/portfolio-shell.tsx` khởi tạo `init.ts` sau khi React hydrate. Các module trong `src/components/portfolio/` giữ trạng thái dùng chung ở `state.ts` và truy cập DOM qua `dom.ts`; listener/observer được dọn khi component unmount. `src/styles/00-foundation.css` là nền typography và token; các file responsive/motion còn lại được nhập từ `globals.css`.

## Quy trình sửa một phần

1. Sửa component, module tương tác và CSS tương ứng; nếu đổi chữ, sửa cả VI/EN trong `src/content/portfolio.ts`.
2. Kiểm tra dữ kiện trong `docs/evidence.md` và `docs/CONTENT_SPEC.md`; nội dung thiếu bằng chứng giữ trong `docs/CONTENT_GAPS.md`.
3. Chạy `npm run check`, `npm run build` và xem desktop/mobile bằng `npm run dev` hoặc `npm run preview`.
4. Commit source và tài liệu liên quan. Không commit `.next/` hoặc `out/`.

Không lưu ảnh chụp GSC gốc, URL khách hàng hay dữ liệu định danh trong repo. `docs/IMPLEMENTATION_DECISIONS.md` ghi cách áp dụng ý tưởng từ React Bits và minwang.dev; CSS và TypeScript là mã của dự án.
