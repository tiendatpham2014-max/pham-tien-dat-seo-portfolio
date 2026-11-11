# Dat Pham signature logo

**Tên để nhắc lại:** `dat-pham-signature`

## File đang dùng trên website

| File | Mục đích |
| --- | --- |
| `dat-pham-signature-source.png` | Nét ký đã làm sạch, nền trong suốt (2172×724, ~397 KB). **File duy nhất tải trên website cho cả 3 chỗ**: header (114×38), Contact (250×84) và ảnh nền hiệu ứng viết từng nét ở splash (`src/components/sections/SignatureWriting.tsx`). Màu trắng trên nền tối là nhờ filter CSS trong `src/styles/10-navigation.css` và `src/styles/250-editorial-layout.css`; nền sáng dùng filter có sẵn trong cùng 2 file đó. Giữ file này để chỉnh sửa hoặc dựng lại về sau; cũng là nguồn cho `scripts/build-favicons.py`. |

## Cách hiệu ứng viết từng nét hoạt động

`src/components/sections/SignatureWriting.tsx` là SVG inline: 9 đường nét làm mặt nạ
để lần lượt hiện ra ảnh chữ ký, tổng ~1,09 giây rồi hiện nguyên ảnh. Hiệu ứng chạy
khi component mount (mỗi lần tải trang) và tắt với `prefers-reduced-motion: reduce`.
Không dùng cache-buster `?v=Date.now()` nữa — trước đây nó bắt trình duyệt tải lại
toàn bộ file 533 KB mỗi lần vào trang chỉ để restart animation.

Đường đi của bút là bản phỏng theo ảnh, không khẳng định đúng thứ tự viết tay thật.

## Tạo lại

Chạy `node scripts/build-signature-animation.mjs` để sinh lại
`src/components/sections/SignatureWriting.tsx` từ dữ liệu nét bút trong script.
Script KHÔNG sinh lại file SVG nặng nữa: các file `dat-pham-signature-*.svg` cũ
(nhúng PNG base64, ~530 KB/file) đã xóa ngày 2026-11-11 vì trình duyệt cache
được file PNG dùng chung và bản dark/light chỉ khác nhau một filter màu.

Để tạo lại GIF xem trước, chạy thêm `node scripts/build-signature-animation.mjs --frames`
rồi `python scripts/encode-signature-preview.py` (cần Pillow). GIF tạo ra không
đưa vào `public/` nữa.
