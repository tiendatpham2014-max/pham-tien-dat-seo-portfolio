# Phạm Tiến Đạt — SEO Portfolio

Portfolio SEO song ngữ (VI/EN), xây bằng HTML, CSS và JavaScript thuần. Không có build step hoặc package runtime.

## Chạy local

Yêu cầu Node.js 20+. Chạy lệnh npm run dev, sau đó mở http://localhost:4173. Server chỉ lắng nghe trên 127.0.0.1.

## Cấu trúc

| File | Vai trò |
| --- | --- |
| dist/index.html | Nội dung semantic và bản tiếng Việt mặc định |
| dist/style.css | Art direction Muted Editorial, responsive, motion và reduced motion |
| dist/app.js | Bản dịch tiếng Anh, bộ chọn GSC, tabs, navigation, menu và article rail |
| dist/fonts/ | Be Vietnam Pro tự lưu cùng source và giấy phép |
| dev-server.mjs | Preview static, không phụ thuộc thư viện |
| .openai/hosting.json | Cấu hình static Sites; giữ project ID hiện có |
| docs/CONTENT_ARCHITECTURE.md | Quyết định nội dung và đánh giá các nhóm UI |
| docs/CONTENT_SPEC.md, docs/evidence.md | Dữ liệu được phép công bố và giới hạn diễn giải |
| docs/CONTENT_GAPS.md | Dữ liệu cần chủ portfolio xác minh trước khi thêm case |
| docs/DESIGN_SPEC.md, docs/MOTION_SPEC.md, docs/QA_CHECKLIST.md | Spec và tiêu chí kiểm thử |

## Nguyên tắc nội dung

Case GSC so sánh Q3/2025 và Q3/2026 ở cấp toàn website, chịu ảnh hưởng của cả đội ngũ và thay đổi số trang. Impressions giảm 5,0% được trình bày cùng với clicks tăng 27,1%. Các đoạn về phương pháp SEO, câu hỏi nghề nghiệp và phạm vi kỹ năng là nội dung diễn giải, không được đọc như KPI cá nhân hay case đã triển khai.

Ba liên kết bài viết Primas và thông tin liên hệ là các URL đã có trong source trước redesign. Các dự án, ảnh báo cáo, testimonial hoặc chứng chỉ chưa xác minh không được hiển thị trên site.

Giấy phép font nằm tại dist/fonts/LICENSE.txt.
