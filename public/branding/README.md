# Dat Pham signature logo

**Tên để nhắc lại:** `dat-pham-signature-logo`

File chính là [`dat-pham-signature-logo.svg`](./dat-pham-signature-logo.svg), dành cho nền tối của website. File SVG tự chứa chữ ký, có nền trong suốt và có thể đưa thẳng lên GitHub hoặc dùng trong `public/branding/` của Next.js.

| File | Mục đích |
| --- | --- |
| `dat-pham-signature-logo.svg` | Logo đầy đủ trên nền tối |
| `dat-pham-signature-logo-light.svg` | Logo đầy đủ trên nền sáng |
| `dat-pham-signature-mark.svg` | Chỉ chữ ký, gọn cho header nền tối |
| `dat-pham-signature-mark-light.svg` | Chỉ chữ ký, gọn cho header nền sáng |
| `dat-pham-signature-source.png` | Nét ký đã làm sạch, nền trong suốt |
| `dat-pham-signature-preview.png` | Ảnh xem trước các biến thể |
| `dat-pham-signature-writing.svg` | Bản chữ ký viết từng nét trên nền tối |
| `dat-pham-signature-writing-light.svg` | Bản chữ ký viết từng nét trên nền sáng |
| `dat-pham-signature-writing-preview.gif` | Ảnh động xem nhanh |
| `signature-animation-demo.html` | Trang thử riêng, có nút **Ký lại** |

Chữ ký trong SVG là ảnh PNG độ phân giải cao được nhúng trực tiếp, chưa phải đường vector thuần. Giữ file `source.png` để có thể chỉnh sửa hoặc dựng lại về sau. Logo chưa được gắn vào giao diện website ở thay đổi này.

Hai file `writing.svg` dùng các đường nét SVG làm mặt nạ để lần lượt hiện ra **cùng ảnh chữ ký nguồn**. Khi chuyển động kết thúc, ảnh nguồn hiện nguyên vẹn. Hiệu ứng chạy một lần khi tải và tắt với `prefers-reduced-motion: reduce`. Có thể dùng trong Next.js bằng `<img src="/branding/dat-pham-signature-writing.svg" alt="Chữ ký Đạt P" />` (bản `-light.svg` cho nền sáng). Đường đi của bút là bản phỏng theo ảnh, không khẳng định đúng thứ tự viết tay thật.

Tạo lại tài sản động bằng `node scripts/build-signature-animation.mjs`. Để tạo lại GIF xem trước, chạy thêm `node scripts/build-signature-animation.mjs --frames` rồi `python scripts/encode-signature-preview.py` (cần Pillow).
