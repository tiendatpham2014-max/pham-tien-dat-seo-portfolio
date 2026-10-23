# CONTENT_GAPS — Các dữ liệu để bổ sung sau (không phải backlog cản build)

**Tình trạng hiện tại:** Các module dưới đây chưa có đủ chứng cứ / quyền công bố trong source portfolio hiện có. Codex không được tự dựng thành case study đã hoàn thành hoặc tự phát minh số liệu. Không render các phần trống trên website thật.

## Ưu tiên bổ sung

| Mức ưu tiên | Slot | Dữ liệu cần xác nhận | Kết quả sẽ có khi bổ sung |
|---|---|---|---|
| Cao | `CASE_02` — Category × Location technical SEO | Có thể công khai đến mức nào? Vấn đề, phạm vi/trách nhiệm của tôi, trạng thái đề xuất/triển khai, bài học hoặc bằng chứng (đã ẩn thông tin nhạy cảm) | Một card hoặc trang case thứ hai, không cần KPI nếu minh bạch trạng thái |
| Cao | `CASE_03` — Sheets / Apps Script URL workflow | Ví dụ sheet input → logic → output (ẩn URL/tài khoản), phần mình thực sự xây và áp dụng | Mini case có minh họa thao tác và giải thích lợi ích, không cần bịa số giờ tiết kiệm |
| Trung bình | `CASE_04` — B2B content | 1–2 URL, brief/outline được quyền chia sẻ, vai trò cụ thể, kết quả nếu có | Content project case kết nối với các bài blog công khai |
| Trung bình | `VISUAL_ASSETS` | Ảnh chart GSC đã che tên website; screenshot Screaming Frog/Sheets; ảnh thuộc quyền sử dụng | Minh họa thật cho case, thay vì hình mockup giả |
| Thấp | `PROJECT_DURATION` | Ngày bắt đầu/kết thúc cho dự án cụ thể | Timeline tiến độ dự án thực, chỉ thêm khi có ít nhất một dự án có mốc tin cậy |
| Tùy chọn | `EXTERNAL_PROOF`, `PERSONAL_MEDIA` | Bằng chứng thật và quyền sử dụng | Testimonial, chứng chỉ, ảnh cá nhân nếu muốn bổ sung |

## Mẫu thông tin để người dùng cung cấp khi cập nhật sau

```yaml
id: CASE_02
public_label_vi: ""             # Tên ngắn hiển thị, có thể ẩn danh
public_label_en: ""
can_disclose: false              # Chỉ true khi chủ sở hữu đồng ý
status: "unverified"            # proposal | implemented | measured
problem: ""                     # Vấn đề thật
my_role: ""                     # Công việc cá nhân thực sự tham gia
approach: ""                    # Những bước đã đề xuất/thực hiện
outputs: []                     # Deliverable đã có thật
proof_links_or_files: []         # Link/ảnh có quyền sử dụng
verified_metrics: []            # Để trống nếu không có
reviewed_by_user: false
```

**Quy tắc xuất bản:** Chỉ bật một case mới khi `can_disclose: true`, `reviewed_by_user: true` và các câu sự kiện có nguồn xác minh. Nếu không có số liệu, vẫn có thể viết case định tính trung thực, phân biệt rõ recommendation và implementation.

## Danh sách việc đã có thể xuất bản ngay (không cần người dùng cung cấp thêm)

- Hero SEO positioning VI/EN.
- Editorial point of view về search intent, content và việc đọc dữ liệu.
- GSC case Q3/2025 vs Q3/2026 với bối cảnh team/sitewide và impressions giảm.
- 3-step SEO working process được mô tả là phương pháp.
- 4 SEO skills tabs diễn giải theo Problem → Approach → Typical output.
- 3 bài viết Primas đã được liên kết trong source.
- Career progression 3 vai trò, cùng công ty.
- Email, LinkedIn, Phone và Footer links thật.

## Ghi nhận sau bản redesign v4

Bản public hiện chỉ có một case GSC đã đủ số liệu và ba bài viết Primas có URL thật. Những slot trong bảng trên **không có card hoặc mục “sắp ra mắt”** trên website.

Để xuất bản thêm một case, vui lòng gửi một bản ngắn gồm: (1) tên công khai hoặc cách ẩn danh; (2) vấn đề và phạm vi trang; (3) việc Đạt trực tiếp làm so với đề xuất của đội; (4) trạng thái đề xuất / đã triển khai / đã đo lường; (5) đầu ra hoặc URL/ảnh đã được che thông tin và có quyền đăng; (6) kỳ đo và cách lấy số nếu có KPI. Case không có KPI vẫn có thể dùng nếu các sự kiện trên được xác nhận.

Với ảnh dashboard, crawl hoặc worksheet, cần bản đã xóa domain, account, dữ liệu truy vấn nhạy cảm và thông tin khách hàng; xác nhận quyền dùng công khai. Với testimonial hoặc ảnh cá nhân, cần nội dung/ảnh gốc và sự đồng ý đăng tải. Chưa có các tài liệu này thì giữ nguyên trạng thái không xuất bản.
