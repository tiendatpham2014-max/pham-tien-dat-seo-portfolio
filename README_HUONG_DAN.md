# SEO Portfolio Codex Pack v4 — Content-first, Muted Editorial

**Điểm mới:** không ép 9 mẫu React Bits thành 9 block; có **đánh giá mức độ phù hợp**, copy mới VI/EN vượt ngoài CV và danh sách dữ liệu người dùng có thể bổ sung về sau. Giữ phong cách dịu/trầm, cấm crawl reference thiết kế, hỗ trợ Git branch + staging preview.

## Cấu trúc ZIP

```text
SEO_Portfolio_Codex_Pack_v4/
├── AGENTS.md                    # Thay file cũ trong repo
├── CODEX_START_PROMPT.md        # FULL PROMPT tiếng Việt
├── README_HUONG_DAN.md
└── docs/
    ├── CONTENT_ARCHITECTURE.md  # BẢNG ĐÁNH GIÁ 9 MẪU + copy VI/EN mới
    ├── CONTENT_GAPS.md          # Cần người dùng bổ sung gì về sau
    ├── CONTENT_SPEC.md          # Dữ liệu thật & giới hạn claim
    ├── DESIGN_SPEC.md           # Bố cục content-first, tông muted
    ├── MOTION_SPEC.md           # Animation có điều kiện, giảm dư thừa
    └── QA_CHECKLIST.md          # Test UI + nội dung mới + bảo mật
```

## Cách gửi Codex

1. Mở repo `tiendatpham2014-max/pham-tien-dat-seo-portfolio` trong Codex.
2. Đính kèm file ZIP v4, hoặc copy **nội dung bên trong** ZIP vào gốc repository (ghi đè `AGENTS.md`, merge `docs/`).
3. Dán nguyên nội dung `CODEX_START_PROMPT.md` cho Codex.
4. Codex phải đọc file nội dung mới trước design/motion, dọn `docs/references.md` và `docs/design-direction.json` cũ, implement website, test thật, push **nhánh riêng** và tạo preview nếu không tác động production.

## Phân biệt 3 loại nội dung

- **Dữ kiện xác minh:** nghề nghiệp, bài viết thật, GSC Q3/2025 và Q3/2026, contact; không được bịa.
- **Nội dung biên tập mới:** SEO point of view, cách xử lý vấn đề, checklist quy trình, mô tả skills; Codex phải chủ động viết vào site.
- **Chưa có bằng chứng:** project category × location, Apps Script workflow, hình báo cáo, KPIs khác, testimonial; **chỉ để trong `CONTENT_GAPS.md`**, không hiện card trống trên site.

## Giới hạn

- Không dùng lại link React Bits hoặc source trả phí; spec mô tả giải pháp thiết kế tương đương do mình xây dựng.
- Không đổi stack static thành React chỉ để chạy animation.
- Không tự ý push `main`, merge PR, thay đổi private/public hay deploy production.
- Không cần đủ 9 animation nếu dư, trùng hoặc thiếu dữ liệu thật. Nội dung đúng và hữu ích quan trọng hơn số lượng hiệu ứng.
