# Nguồn tham khảo và phần đã áp dụng

Các URL React Bits dưới đây là nguồn tham khảo chính cho bố cục và chuyển động; minwang.dev chỉ là nguồn phụ cho nhịp chữ/cảnh cuộn. Website dùng component React, CSS và TypeScript của dự án; không đưa mã nguồn, hình ảnh hoặc nội dung demo trả phí vào repo. `docs/IMPLEMENTATION_DECISIONS.md` ghi quyết định chi tiết và `docs/SOURCE_MAP.md` chỉ nơi sửa code.

| Tham khảo | Phần tương ứng trong website | Cách áp dụng |
| --- | --- | --- |
| [Hero 22](https://pro.reactbits.dev/docs/blocks/hero-section/hero-22) | Hero | Chữ tên cỡ lớn, entrance có nhịp, nền mesh dịu và sơ đồ Intent → Content → Evidence |
| [Features 17](https://pro.reactbits.dev/docs/blocks/features/features-17) | Kinh nghiệm | Bầu trời tối, đường cong địa cầu, vầng sáng di chuyển theo cuộn và ba mốc nghề nghiệp thật; không dựng văn phòng/múi giờ giả |
| [Features 4](https://pro.reactbits.dev/docs/blocks/features/features-4) | Chuyên môn | Bốn tab Problem → Approach → Typical output với nội dung nghề nghiệp thật |
| [Social Proof 11](https://pro.reactbits.dev/docs/blocks/social-proof/social-proof-11) | Bài viết | Rail ba bài đã xuất bản; không tạo testimonial giả |
| [Contact 3](https://pro.reactbits.dev/docs/blocks/contact/contact-3) | Liên hệ | Ba kênh liên hệ thật và chuyển động hover |
| [Footer 11](https://pro.reactbits.dev/docs/blocks/footer/footer-11) | Footer | Hai nhóm liên kết có thật và back-to-top |
| [Comparison 7](https://pro.reactbits.dev/docs/blocks/comparison/comparison-7) | GSC | Bộ chọn chỉ số, hai kỳ, wipe kéo được bằng chuột/chạm/bàn phím và bảng số liệu đầy đủ |
| [Navigation 15](https://pro.reactbits.dev/docs/blocks/navigation/navigation-15) | Điều hướng | Underline theo section, menu mobile và chuyển VI/EN |
| [How It Works 4](https://pro.reactbits.dev/docs/blocks/how-it-works/how-it-works-4) | Quy trình | Ba bước phương pháp với câu hỏi và checklist; không mô tả thành case đã thực hiện |
| [minwang.dev](https://minwang.dev/) | Cảnh chữ | Nguồn phụ cho typography cỡ lớn và nhịp scene theo cuộn |

Ảnh GSC chủ portfolio gửi chỉ được dùng để tham khảo giao diện phân tích hiệu suất. Ảnh, URL website và các con số 16 tháng trong ảnh không thuộc repository. Dữ liệu công khai là phép so sánh Q3/2025–Q3/2026 đã xác minh trong `docs/evidence.md`.

## Đối chiếu preview ngày 23/10/2026

- Hero 22: nền mesh chuyển động dưới thông điệp lớn. Bản portfolio giữ nền mềm, bổ sung sơ đồ ba lớp SEO có thể bấm để đọc rõ ý nghĩa từng bước.
- Features 4: danh sách tab tự chuyển, có panel chi tiết. Bản portfolio giữ bốn nhóm chuyên môn thật và dừng tự chuyển khi người xem tự chọn, hover hoặc focus.
- Comparison 7: đường chia kéo giữa hai trạng thái. Bản portfolio dùng hai quý GSC có số liệu thật, vẫn có bảng đầy đủ để không phụ thuộc vào hiệu ứng.
- Features 17: cảnh “follow the sun” có mép địa cầu sáng và ba nhãn thay phiên nổi bật. Bản portfolio giữ hình thức đó cho ba mốc nghề nghiệp đã xác minh, thay văn phòng và múi giờ bằng vai trò/ngày thật.
- How It Works 4: các mốc đi cùng checklist. Bản portfolio dùng ba giai đoạn phương pháp SEO, không gắn ngày giả cho dự án.
- Social Proof 11, Contact 3, Footer 11 và Navigation 15 lần lượt được diễn giải bằng rail ba bài thật, ba kênh liên hệ thật, footer liên kết thật và gạch chân điều hướng di chuyển.
- minwang.dev: nguồn phụ cho chữ lớn và cảnh cuộn; không lấy ảnh chân dung hay chứng chỉ. GSC chuyển số liệu phẳng theo cuộn để tránh lặp thẻ xếp lớp.

Không dùng mã nguồn hoặc nội dung demo của các mẫu React Bits Pro. Những phần cần dữ liệu riêng vẫn chỉ ghi trong `CONTENT_GAPS.md`.
