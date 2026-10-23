# Quyết định triển khai v4

| Section | Nguồn | Nhóm mẫu | Quyết định |
| --- | --- | --- | --- |
| Navigation | CONTENT_SPEC §2 | Navigation 15 | Giữ; underline theo section, drawer mobile |
| Hero | CONTENT_SPEC §1, copy bank C1 | Hero 22 | Mesh dịu, entrance có nhịp và sơ đồ luồng Intent → Content → Evidence chạy liên tục; không dùng KPI làm thành tích cá nhân |
| Editorial approach | CONTENT_ARCHITECTURE C2–C3 | Introduction / Features | Viết mới góc nhìn và ba câu hỏi nghề nghiệp |
| Evidence | evidence.md, CONTENT_SPEC §4 | Comparison 7 | Ba chương đọc dữ liệu GSC cấp website với chỉ số phẳng đổi theo cuộn, tiếp theo là hai kỳ, biểu đồ wipe, bộ chọn chỉ số và bảng đầy đủ |
| Process | CONTENT_SPEC §5, copy bank C4 | How It Works 4 | Ba giai đoạn phương pháp, có câu hỏi và checklist |
| Skills | CONTENT_ARCHITECTURE C5 | Features 4 | Bốn tab Problem → Approach → Typical output |
| Writing | CONTENT_SPEC §7 | Social Proof 11 | Đổi thành rail ba bài thật, không testimonial |
| Experience | CONTENT_SPEC §8 | Features 17 | Ba mốc nghề nghiệp thật với bầu trời tối, vầng sáng chạy trên mép địa cầu và nhãn đang xem đồng bộ với vị trí cuộn |
| Contact | CONTENT_SPEC §9 | Contact 3 | Ba kênh thật với icon card lớn và hover có chuyển động, không form giả |
| Footer | CONTENT_SPEC §9 | Footer 11 | Hai nhóm link thật và back-to-top |

Phần Hero, Editorial Approach, Process, Skills và mô tả chủ đề bài viết là nội dung biên tập/phương pháp VI/EN, không phải case đạt KPI. Các case cần bằng chứng tiếp tục nằm trong CONTENT_GAPS.md.

Đường hướng thị giác lấy màu và độ sáng từ DESIGN_SPEC v4. Bộ draw của design-taste-frontend gợi ý ẩn dụ giấy/hồ sơ; không dùng các hình ảnh và bố cục phụ thuộc ảnh vì portfolio chưa có tư liệu thật được phép công khai. Website dùng chữ, nhịp dàn trang và số liệu thật để tạo bản sắc.

Ảnh GSC do chủ portfolio gửi ngày 23/10/2026 chỉ dùng để tham khảo cấu trúc giao diện phân tích hiệu suất. Ảnh có thông tin định danh, không đưa vào source hoặc bản live, không suy ra dữ liệu theo ngày từ đường biểu đồ trong ảnh. Bản công khai chỉ hiển thị số liệu Q3/2025–Q3/2026 đã được xác nhận. Chứng chỉ và ảnh cá nhân không nằm trong kế hoạch công khai theo yêu cầu riêng tư.

Sau phản hồi trực tiếp của chủ portfolio, đã mở preview động của cả 9 URL React Bits Pro được gửi ngày 23/10/2026, rồi xem thêm minwang.dev. React Bits là nguồn chính. Cơ chế chuyển động được tái tạo bằng CSS/JavaScript thuần từ quan sát bố cục và tương tác: mesh và entrance; horizon nghề nghiệp chạy theo cuộn; GSC chuyển chỉ số phẳng; tab tự chuyển có điều kiện; rail bài viết; icon cards; footer sitemap gọn; wipe kéo/keyboard; underline chạy; timeline checklist. Không sao chép mã React hoặc nội dung demo của nguồn tham khảo. Wipe là một lớp hình trực quan, còn bảng chỉ số đầy đủ luôn đọc được.

## Cập nhật theo yêu cầu giao diện tối

`docs/DARK_REFERENCE_PASS.md` ghi lại lần đối chiếu mới. Nền navy (`#142039`) là trường màu chính, còn cảnh chuyển chữ dùng than `#1a1b1b`. Bổ sung cảnh Nhu cầu → Nội dung → Đo lường chạy theo cuộn giữa góc nhìn nghề nghiệp và bằng chứng GSC. Theo ưu tiên mới ngày 24/10, ba thẻ vai trò được thay bằng đường chân trời lấy cảm hứng từ Features 17. Vầng sáng bám tiến trình đọc và ba mốc nghề nghiệp thật. Mã và dữ liệu tiếp tục thuộc source dự án, không dùng asset trả phí hay nội dung demo.
