export const searchAtlasCopy = {
  vi: {
    title: "Từ tín hiệu tìm kiếm đến quyết định rõ ràng.",
    intro: "Một bản đồ phương pháp: đi qua từng lớp dữ liệu, ý định và cấu trúc trước khi chọn việc cần làm.",
    instruction: "Cuộn để chuyển bước · kéo để xoay",
    steps: [
      { name: "Truy vấn", description: "Bắt đầu từ những gì người dùng thực sự tìm kiếm, thay vì đoán nhu cầu từ góc nhìn của website." },
      { name: "Ý định", description: "Nhóm truy vấn theo mục đích và xác định trang nào nên giải quyết từng nhu cầu." },
      { name: "Cấu trúc", description: "Sắp xếp nội dung, liên kết và yếu tố kỹ thuật để thông tin dễ tìm và dễ hiểu." },
      { name: "Đo lường", description: "Đọc bốn tín hiệu trong GSC — lượt nhấp, hiển thị, CTR và vị trí — cùng phạm vi dữ liệu trước khi kết luận." },
      { name: "Quyết định", description: "Chọn thay đổi có cơ sở, triển khai, rồi quay lại đo kết quả và điều chỉnh." },
    ],
  },
  en: {
    title: "From search signals to clear decisions.",
    intro: "A map of the method: move through data, intent, and page structure before deciding what to change.",
    instruction: "Scroll through steps · drag to rotate",
    steps: [
      { name: "Queries", description: "Start with what people actually search for, rather than assuming their needs from the site's perspective." },
      { name: "Intent", description: "Group queries by purpose and identify the page that should answer each need." },
      { name: "Structure", description: "Organize content, links, and technical elements so information is easy to find and understand." },
      { name: "Measurement", description: "Read four GSC signals — clicks, impressions, CTR, and position — alongside the scope of the data before drawing a conclusion." },
      { name: "Decision", description: "Choose a supported change, implement it, then measure the outcome and adjust." },
    ],
  },
} as const;
