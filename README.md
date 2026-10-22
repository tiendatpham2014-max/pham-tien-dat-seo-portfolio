# Phạm Tiến Đạt · SEO portfolio

Portfolio song ngữ cho SEO Executive, xây lại từ bản HTML tĩnh. Nội dung tuân theo `docs/brief.md`, `docs/evidence.md` và `docs/references.md` của repository gốc.

## Công nghệ

| Thành phần | Vai trò |
| --- | --- |
| Next.js 16 App Router + static export | Tạo hai trang `/` và `/en/` có HTML, metadata và canonical riêng; xuất bản dạng tĩnh |
| React 19 + TypeScript | Thành phần giao diện và trạng thái menu/bảng số liệu có kiểu dữ liệu |
| Be Vietnam Pro (self-host qua Fontsource) | Font có glyph tiếng Việt đầy đủ, không phụ thuộc yêu cầu font từ bên ngoài |
| Morphicons + Lucide | Chuyển động biểu tượng mở/đóng menu |
| React Bits AnimatedContent (source-owned, giấy phép MIT) + GSAP | Hiệu ứng xuất hiện theo cuộn; tôn trọng `prefers-reduced-motion` |
| CSS thuần | Grid, bố cục responsive, chuyển tông theo từng chương, focus và hover |
| Sharp | Tạo ảnh Open Graph 1200 × 630 từ `scripts/create-og.mjs` |

## Thiết kế và nội dung

Hero hai mảng màu và chữ lớn đặt trọng tâm vào công việc SEO: hiểu nhu cầu tìm kiếm và đo thay đổi. Nhịp cuộn, typography lớn và các đoạn nội dung kiểu editorial lấy cảm hứng từ các trang trong `docs/references.md`; phần tương tác được dùng cho bảng số liệu GSC thật. Không dùng ảnh khách hàng, thành tích bịa, hay biểu đồ gán kết quả cấp website cho một cá nhân.

Bảng case so sánh GSC Quý III/2025 với Quý III/2026 theo tài liệu nguồn. Clicks, impressions, CTR, vị trí và nhóm non-brand đều giữ bối cảnh, gồm giới hạn của cách tính non-brand. Ba liên kết bài viết trỏ về bài đã xuất bản trên Primas.

## Chạy và build

```bash
npm ci
npm run dev
npm run build
```

`npm run build` tạo `out/` cho Sites static hosting. Cấu hình project nằm tại `.openai/hosting.json`. Cần xem lại bản preview và diff trước khi deploy live theo `AGENTS.md` của repository.

## Đã kiểm tra

- Build production và TypeScript.
- Giao diện VI/EN ở 320, 360, 390, 430, 760, 768 và 1440px, không cuộn ngang.
- Menu mobile, nhãn mở/đóng, nút chỉ số GSC, định dạng số theo ngôn ngữ.
- Metadata, canonical, hreflang, Open Graph, robots và sitemap.
- Focus hiển thị, skip link và cài đặt giảm chuyển động.
