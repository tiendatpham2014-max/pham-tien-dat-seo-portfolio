# Bản đồ source Next.js

Hai URL tĩnh nằm trong `src/app/(vi)/page.tsx` (`/`) và `src/app/(en)/en/page.tsx` (`/en/`). Chúng dùng chung `src/app/portfolio-page.tsx`; layout và metadata theo ngôn ngữ ở `src/app/portfolio-layout.tsx`. Mỗi section có component riêng trong `src/components/sections/`; các hành vi client nằm trong `src/components/portfolio/`. Copy VI/EN ở `src/content/portfolio.ts`, số liệu GSC ở `src/content/gsc.ts`. CSS theo phần ở `src/styles/`, được nạp theo thứ tự từ `src/app/globals.css`.

| Tính năng | Component | Hành vi | CSS / dữ liệu |
| --- | --- | --- | --- |
| Điều hướng, VI/EN, light/dark | `Navigation.tsx` | `site-preferences.tsx`, `navigation.ts`, `language.ts`, `theme.ts`, `mobile-menu.ts` | `10-navigation.css`, `198-theme-control.css`, `200-light-theme.css`, `portfolio.ts` |
| Hero | `Hero.tsx` | `hero-waves.ts` | `20-hero.css`, `220-editorial-composition.css`, `portfolio.ts` |
| Giới thiệu và khoảng ảnh riêng | `About.tsx` | Copy VI/EN | `25-about.css`, `250-editorial-layout.css`, `portfolio.ts` |
| Mô hình SEO 3D | `SearchAtlas.tsx`, `SearchAtlasCanvas.tsx` | Cuộn, kéo và chọn giai đoạn trong React | `240-search-atlas.css`, `search-atlas.ts` |
| GSC, chọn chỉ số, so sánh | `Evidence.tsx` | `metrics.ts`, `comparison.ts` | `40-evidence.css`, `120-comparison.css`, `gsc.ts` |
| Chuyên môn theo cuộn | `Skills.tsx` | Cuộn trang thay nội dung trong một khung cố định | `260-scroll-sections.css`, `270-pinned-skills.css`, `portfolio.ts` |
| Bài viết | `Writing.tsx` | Bốn link bài viết thật, trình bày gọn | `70-writing.css`, `260-scroll-sections.css` |
| Hành trình theo cuộn | `Journey.tsx` | `scroll-stories.ts` | `196-career-horizon-scene.css` |
| Liên hệ và footer | `Contact.tsx`, `Footer.tsx` | Copy VI/EN | `90-contact-footer.css`, `130-contact-motion.css` |

`src/components/site-preferences.tsx` khởi tạo `init.ts` sau khi React hydrate và giữ trạng thái VI/EN, theme trong React. Các module DOM trong `src/components/portfolio/` giữ trạng thái tương tác còn lại ở `state.ts` và truy cập DOM qua `dom.ts`; listener/observer được dọn khi component unmount. `src/styles/00-foundation.css` là nền typography và token; các file responsive/motion còn lại được nhập từ `globals.css`.

## Quy trình sửa một phần

1. Sửa component, module tương tác và CSS tương ứng; nếu đổi chữ, sửa cả VI/EN trong `src/content/portfolio.ts`.
2. Kiểm tra dữ kiện trong `docs/evidence.md` và `docs/CONTENT_SPEC.md`; nội dung thiếu bằng chứng giữ trong `docs/CONTENT_GAPS.md`.
3. Chạy `npm run check`, `npm run build` và xem desktop/mobile bằng `npm run dev` hoặc `npm run preview`.
4. Commit source và tài liệu liên quan. Không commit `.next/` hoặc `out/`.

Không lưu ảnh chụp GSC gốc, URL khách hàng hay dữ liệu định danh trong repo. `docs/IMPLEMENTATION_DECISIONS.md` ghi cách áp dụng ý tưởng từ React Bits và minwang.dev; CSS và TypeScript là mã của dự án.
