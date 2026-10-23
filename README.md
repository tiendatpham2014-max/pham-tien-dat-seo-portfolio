# Phạm Tiến Đạt — SEO Portfolio

Portfolio SEO song ngữ (VI/EN), xây bằng HTML, CSS và JavaScript thuần. `src/` là nguồn để chỉnh sửa; lệnh build không dùng thư viện ngoài và tạo ba file tĩnh trong `dist/`.

## Chạy và kiểm tra

Yêu cầu Node.js 20+.

```bash
npm run build   # tạo dist/index.html, dist/style.css, dist/app.js từ src/
npm run check   # kiểm tra dist khớp source và cú pháp JavaScript
npm run dev     # build rồi chạy localhost:4173
```

Server local chỉ lắng nghe trên `127.0.0.1`. Thay đổi nội dung, kiểu dáng hoặc tương tác trong `src/`, chạy `npm run build`, rồi commit cả `src/` và `dist/`. Font tự lưu và giấy phép nằm trong `dist/fonts/`.

## Cấu trúc để theo dõi thay đổi

| Nơi sửa | Nội dung |
| --- | --- |
| `src/html/` | Từng section: hero, cách tiếp cận, GSC, quy trình, kỹ năng, bài viết, kinh nghiệm, liên hệ; cùng đầu/cuối tài liệu |
| `src/css/` | Kiểu dáng theo section, motion và responsive |
| `src/js/` | Copy VI/EN, dữ liệu GSC, điều hướng, tab, rail bài viết, so sánh, hai cảnh cuộn và khởi tạo |
| `scripts/build.mjs` | Ghép các phần theo thứ tự cố định thành `dist/`; `--check` báo lỗi nếu bản dựng cũ |
| `dist/` | Bản tĩnh hoàn chỉnh để preview hoặc triển khai; font và giấy phép |
| `docs/SOURCE_MAP.md` | Bản đồ tính năng → file nguồn và quy tắc chỉnh sửa |
| `docs/evidence.md`, `docs/CONTENT_SPEC.md` | Số liệu được phép công bố và giới hạn diễn giải |
| `docs/CONTENT_GAPS.md` | Dữ liệu còn chờ xác minh, không hiển thị trên website |
| `docs/IMPLEMENTATION_DECISIONS.md` | Quyết định UI/motion và cách dùng nguồn tham khảo |
| `docs/REFERENCE_MAP.md` | Các URL tham khảo do chủ portfolio gửi và phần đã áp dụng |
| `.openai/hosting.json` | Cấu hình Site hiện có, lưu để đối chiếu; lệnh build không triển khai live |

## Ranh giới dữ liệu công khai

Case GSC so sánh Q3/2025 và Q3/2026 ở cấp toàn website: clicks tăng 27,1%, impressions giảm 5,0%. Kết quả chịu ảnh hưởng của đội ngũ và số trang thay đổi, không quy cho một cá nhân. Ảnh GSC gốc, URL định danh website, ảnh cá nhân và chứng chỉ không được đưa vào repo hoặc bản công khai. `docs/evidence.md` ghi rõ nguồn số liệu và giới hạn suy luận.

Ba liên kết bài viết Primas và thông tin liên hệ đã có trong source trước redesign. Những case, testimonial và KPI chưa có bằng chứng được giữ trong `docs/CONTENT_GAPS.md`.

`README_HUONG_DAN.md` và `CODEX_START_PROMPT.md` là tài liệu của pack đầu vào, được giữ lại để truy vết yêu cầu ban đầu; quy trình sửa source hiện tại nằm ở README này.
