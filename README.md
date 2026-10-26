# Phạm Tiến Đạt — SEO Portfolio

Portfolio SEO song ngữ VI/EN, viết bằng **Next.js, React và TypeScript**. Mỗi section, hiệu ứng, nhóm CSS và dữ liệu nội dung có file nguồn riêng để xem lịch sử thay đổi trên GitHub.

## Chạy và build

Yêu cầu Node.js 20.9+ và npm.

```bash
npm ci
npm run dev      # http://127.0.0.1:4173
npm run check    # kiểm tra TypeScript
npm run build    # xuất site tĩnh vào out/
npm run preview  # xem bản build ở http://127.0.0.1:4173
```

Lệnh preview cần chạy sau build. `out/`, `.next/` và `node_modules/` là sản phẩm sinh ra, không commit. Cấu hình `.openai/hosting.json` trỏ tới `out/`. Font Be Vietnam Pro và giấy phép nằm trong `public/fonts/`.

## Nơi chỉnh sửa

| Đường dẫn | Mục đích |
| --- | --- |
| `src/app/layout.tsx`, `page.tsx` | Metadata, cấu trúc trang và thứ tự section |
| `src/components/sections/` | Component React của từng section: Hero, Evidence, Skills, Journey, Contact… |
| `src/components/portfolio/` | Các module tương tác: theme, VI/EN, chỉ số GSC, tab, menu, cảnh cuộn, rail bài viết… |
| `src/content/portfolio.ts` | Toàn bộ copy VI/EN |
| `src/content/gsc.ts` | Chỉ số và cách diễn giải GSC |
| `src/styles/` | CSS tách theo section, responsive và motion |
| `public/fonts/` | Font tự lưu và giấy phép |
| `docs/SOURCE_MAP.md` | Bản đồ tính năng → file nguồn |
| `docs/evidence.md`, `docs/CONTENT_SPEC.md` | Dữ liệu đã xác minh và giới hạn diễn giải |
| `docs/CONTENT_GAPS.md` | Nội dung còn thiếu bằng chứng, không xuất bản |

Website được xuất tĩnh bằng `output: "export"` trong `next.config.ts`. Các tương tác chạy ở client qua `PortfolioShell`; HTML nội dung chính được Next.js render sẵn để vẫn đọc được khi JavaScript không chạy.

## Sau khi đưa bản mới lên live

GitHub Desktop đọc commit từ Git ở thư mục này. Sau khi xác nhận deployment của Site đã **succeeded**, Codex kiểm tra diff, giữ checkout ở nhánh `main` rồi tạo commit cục bộ:

```bash
npm run commit:after-live -- --version 16 --deployment-id appgdep_... --url https://pham-tien-dat-seo.bloomybowl64.chatgpt.site --message "Mô tả ngắn thay đổi"
```

Thay `16` và `appgdep_...` bằng số phiên bản và deployment ID thật vừa nhận từ Sites. Lệnh chỉ tạo commit trong máy; **không push**. Sau đó mở GitHub Desktop, xem commit ở tab **History**, rồi tự bấm **Push origin** khi muốn upload. Nếu deployment chưa thành công thì chưa chạy lệnh. Source Next.js và bản build đưa lên Site phải xuất phát từ cùng lần chỉnh sửa; `out/` và `.next/` không được commit.

## Ranh giới dữ liệu công khai

Case GSC so sánh Q3/2025 và Q3/2026 ở cấp toàn website: clicks tăng 27,1%, impressions giảm 5,0%. Kết quả chịu ảnh hưởng của đội ngũ và số trang thay đổi, không quy cho một cá nhân. Ảnh GSC gốc, URL định danh website, ảnh cá nhân và chứng chỉ không có trong source công khai. Ba bài viết Primas và các kênh liên hệ dùng liên kết đã xác minh.

Các case, testimonial và KPI chưa có bằng chứng được giữ trong `docs/CONTENT_GAPS.md`. `README_HUONG_DAN.md` và `CODEX_START_PROMPT.md` là tài liệu pack đầu vào để truy vết yêu cầu ban đầu; quy trình hiện tại nằm ở README này.
