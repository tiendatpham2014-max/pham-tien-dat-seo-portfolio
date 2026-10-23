# Phạm Tiến Đạt · SEO portfolio

Portfolio song ngữ cho SEO Executive, xây lại từ bản HTML tĩnh. Nội dung tuân theo `docs/brief.md`, `docs/evidence.md` và `docs/references.md` của repository gốc.

## Công nghệ

| Thành phần | Vai trò |
| --- | --- |
| Next.js 16 App Router + static export | Tạo hai trang `/` và `/en/` có HTML, metadata và canonical riêng; xuất bản dạng tĩnh |
| React 19 + TypeScript | Thành phần tương tác: sân khấu quy trình, phép so sánh GSC, trình khám phá bài viết và menu |
| Be Vietnam Pro (self-host qua Fontsource) | Font có glyph tiếng Việt đầy đủ, không phụ thuộc yêu cầu font từ bên ngoài |
| Morphicons + Lucide | Chuyển động biểu tượng mở/đóng menu |
| React Bits AnimatedContent (source-owned, giấy phép MIT) + GSAP ScrollTrigger | Hiệu ứng xuất hiện và co chữ tên theo cuộn; tôn trọng `prefers-reduced-motion` |
| CSS thuần | Grid, bố cục responsive, chuyển tông theo từng chương, focus và hover |
| Sharp | Tạo ảnh Open Graph 1200 × 630 từ `scripts/create-og.mjs` |

## Thiết kế và nội dung

Hero đặt tên làm hình khối chính, với luồng tín hiệu chuyển động. Một sân khấu sticky mô phỏng ba bước truy vấn → nội dung → đo lường; hình minh họa là đồ họa tự dựng, còn số liệu ở bước cuối lấy từ case GSC thật. Bảng GSC có thể kéo để so sánh hai kỳ và đổi năm chỉ số. Khu vực bài viết có tab và bản xem trước liên kết đến bài đã xuất bản. Không dùng ảnh khách hàng, thành tích bịa, hay biểu đồ gán kết quả cấp website cho một cá nhân.

Các nguồn tham khảo được xem trực tiếp: `trantrongnhan.com` (hệ thống hình khối chuyển động quanh chân dung), `hiennv.com` (nhịp mở đầu), `shaders.com` (chuyển động nền), `impeccable.style` (tương tác so sánh kéo), và `minwang.dev` (chữ lớn và kể chuyện bằng cuộn). Chỉ mượn nguyên tắc phù hợp với portfolio SEO.

Bảng case so sánh GSC Quý III/2025 với Quý III/2026 theo tài liệu nguồn. Clicks, impressions, CTR, vị trí và nhóm non-brand đều giữ bối cảnh, gồm giới hạn của cách tính non-brand. Ba liên kết bài viết trỏ về bài đã xuất bản trên Primas.

## Chạy và build

```bash
npm ci
npm run dev
npm run build
```

`npm run build` tạo `out/` cho Sites static hosting. Cấu hình project nằm tại `.openai/hosting.json`.

## Đã kiểm tra

- Build production và TypeScript.
- Giao diện desktop VI, phần quy trình sticky, nút chỉ số GSC, trình chọn bài viết và định dạng số theo ngôn ngữ.
- Metadata, canonical, hreflang, Open Graph, robots và sitemap.
- Focus hiển thị, skip link và cài đặt giảm chuyển động trong CSS/component.
