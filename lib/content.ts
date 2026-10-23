export type Locale = 'vi' | 'en';

export const articles = [
  {
    topic: 'IVR',
    title: '5 Key Benefits of Interactive Voice Response (IVR)',
    href: 'https://primas.net/5-key-benefits-of-interactive-voice-response-ivr/'
  },
  {
    topic: 'CTI',
    title: 'Simple Reasons Why Your Business Need Computer Telephony Integration?',
    href: 'https://primas.net/simple-reasons-why-your-business-need-computer-telephony-integration/'
  },
  {
    topic: 'CX',
    title: 'Best 5 Customer Experience (CX) Solutions to Watch in 2026',
    href: 'https://primas.net/best-5-customer-experience-cx-solutions-to-watch-in-2026/'
  }
] as const;

export const content = {
  vi: {
    nav: { approach: 'Cách làm', case: 'Dữ liệu', writing: 'Bài viết', experience: 'Kinh nghiệm', contact: 'Liên hệ' },
    menuOpen: 'Mở menu', menuClose: 'Đóng menu', skip: 'Đi tới nội dung',
    heroTop: 'Tìm đúng.', heroBottom: 'Đo rõ.',
    heroIntro: 'Phạm Tiến Đạt — SEO Executive. Tôi tìm hiểu nhu cầu tìm kiếm, phát triển nội dung phù hợp và theo dõi điều thực sự thay đổi sau khi xuất bản.',
    heroAction: 'Xem dữ liệu dự án', heroAside: 'Nội dung · Cấu trúc trang · Hiệu suất tìm kiếm',
    approachTitle: 'Bắt đầu từ người đọc.',
    approachLead: 'Một trang có ích khi trả lời đúng điều người tìm kiếm cần. Tôi dùng nghiên cứu từ khóa và dữ liệu hiệu suất để quyết định nên viết, cập nhật hay cải thiện trang nào.',
    approachItems: [
      { title: 'Tìm nhu cầu', text: 'Đọc truy vấn, mục đích tìm kiếm và khoảng trống nội dung trước khi lên cấu trúc.' },
      { title: 'Làm nội dung', text: 'Xây dựng bài viết và tối ưu các trang chủ đề, danh mục, địa điểm cho người đọc thật.' },
      { title: 'Đo thay đổi', text: 'Theo dõi clicks, impressions, CTR và vị trí trên Google Search Console sau triển khai.' }
    ],
    caseTitle: 'Tăng trưởng có dữ liệu.',
    caseIntro: 'Một website dịch vụ giải trí tại Mỹ, so sánh cùng kỳ Quý III/2025 và Quý III/2026. Tên khách hàng được giữ riêng.',
    caseFigureCaption: 'Lượt nhấp organic toàn website tăng từ 13.795 lên 17.540, tương đương +27,1%. Đây là kết quả của website và cả đội ngũ, không quy riêng cho tôi.',
    caseSource: 'Nguồn: Google Search Console · Search type: Web · 01/07–30/09 mỗi năm · 92 ngày/kỳ.',
    metricsTitle: 'Xem đủ bức tranh.',
    metricsIntro: 'Chọn từng chỉ số để so sánh hai kỳ. Impressions giảm 5,0% dù clicks tăng; dữ liệu được giữ nguyên bối cảnh.',
    metricLabels: { clicks: 'Lượt nhấp', nonbrand: 'Không thương hiệu', ctr: 'CTR', impressions: 'Hiển thị', position: 'Vị trí TB' },
    metricUnits: { clicks: 'lượt nhấp', nonbrand: 'lượt nhấp không thương hiệu', ctr: 'điểm phần trăm', impressions: 'lượt hiển thị', position: 'bậc cải thiện' },
    previous: 'Quý III/2025', current: 'Quý III/2026',
    metricFoot: 'Nhóm không thương hiệu = tổng website trừ truy vấn chứa tên thương hiệu; cách tính này có thể bỏ sót biến thể tên. Vị trí trung bình là số liệu GSC, số nhỏ hơn là tốt hơn.',
    workTitle: 'Phần việc của tôi.',
    workIntro: 'Các con số ở trên là kết quả cấp website. Công việc cá nhân của tôi nằm ở nghiên cứu, nội dung và tối ưu trang:',
    workItems: [
      ['Nghiên cứu nhu cầu tìm kiếm', 'Search intent và nhóm chủ đề'],
      ['Phát triển nội dung', 'Bài viết, trang chủ đề và danh mục'],
      ['Tối ưu on-page', 'Cấu trúc, thông tin và liên kết nội bộ'],
      ['Theo dõi hiệu suất', 'GSC và các ưu tiên cập nhật']
    ],
    writingTitle: 'Bài viết đã xuất bản.',
    writingIntro: 'Ba bài viết tiếng Anh về trải nghiệm khách hàng và công nghệ contact center, xuất bản tại Primas dưới tên Dat Pham.',
    authorLink: 'Xem trang tác giả Dat Pham',
    experienceTitle: 'Hành trình làm SEO.',
    experienceIntro: 'Từ thực tập đến SEO Executive tại Primas Group.',
    roles: [
      { period: '11/2024 – hiện tại', title: 'SEO Executive', text: 'Nghiên cứu, triển khai nội dung SEO cho dự án quốc tế; cải thiện on-page và theo dõi hiệu suất tìm kiếm.' },
      { period: '05/2024 – 10/2024', title: 'Cộng tác viên SEO', text: 'Phát triển bài viết và trang nội dung theo nhóm chủ đề; rà soát, cập nhật thông tin theo nhu cầu dự án.' },
      { period: '11/2023 – 04/2024', title: 'Thực tập sinh SEO', text: 'Bắt đầu với nghiên cứu từ khóa, biên tập và các nguyên tắc SEO qua công việc thực tế.' }
    ],
    skillsTitle: 'Những công cụ trong công việc.',
    skills: ['Google Search Console', 'GA4', 'WordPress', 'Semrush', 'Screaming Frog'],
    contactTitle: 'Cùng làm SEO tốt hơn.',
    contactText: 'Nếu bạn cần người làm nội dung biết đặt câu hỏi và đọc dữ liệu, tôi sẵn sàng trò chuyện.',
    city: 'TP. Hồ Chí Minh, Việt Nam', emailAction: 'Gửi email', linkedIn: 'LinkedIn', backTop: 'Về đầu trang',
    footerNote: 'Phạm Tiến Đạt · SEO Executive',
    title: 'Phạm Tiến Đạt — SEO Executive',
    description: 'Portfolio SEO của Phạm Tiến Đạt: cách làm nội dung, số liệu GSC cấp website, bài viết tại Primas và kinh nghiệm làm việc.'
  },
  en: {
    nav: { approach: 'Approach', case: 'Evidence', writing: 'Writing', experience: 'Experience', contact: 'Contact' },
    menuOpen: 'Open menu', menuClose: 'Close menu', skip: 'Skip to content',
    heroTop: 'Find intent.', heroBottom: 'Show impact.',
    heroIntro: 'Pham Tien Dat — SEO Executive. I study search needs, develop useful content, and measure what changes after publication.',
    heroAction: 'Explore the case', heroAside: 'Content · Page structure · Search performance',
    approachTitle: 'Start with the reader.',
    approachLead: 'A useful page answers what the searcher came to understand. I combine keyword research with performance data to decide what to write, update, or improve.',
    approachItems: [
      { title: 'Understand demand', text: 'Read queries, intent, and content gaps before defining a page structure.' },
      { title: 'Build content', text: 'Develop articles and improve topic, category, and location pages for real readers.' },
      { title: 'Measure change', text: 'Track clicks, impressions, CTR, and position in Google Search Console after publication.' }
    ],
    caseTitle: 'Growth in the data.',
    caseIntro: 'A confidential US entertainment services website, comparing Q3 2025 with Q3 2026.',
    caseFigureCaption: 'Sitewide organic clicks rose from 13,795 to 17,540, up 27.1%. These are results for the website and team, not outcomes attributed solely to me.',
    caseSource: 'Source: Google Search Console · Web search · July 1–September 30 each year · 92 days per period.',
    metricsTitle: 'See the full picture.',
    metricsIntro: 'Select a metric to compare the two periods. Impressions declined by 5.0% while clicks rose; both changes matter.',
    metricLabels: { clicks: 'Clicks', nonbrand: 'Non-brand clicks', ctr: 'CTR', impressions: 'Impressions', position: 'Avg. position' },
    metricUnits: { clicks: 'clicks', nonbrand: 'non-brand clicks', ctr: 'percentage points', impressions: 'impressions', position: 'positions better' },
    previous: 'Q3 2025', current: 'Q3 2026',
    metricFoot: 'Non-brand = site total minus queries containing the brand name; this heuristic may miss spelling variants. Average position comes from GSC, where a lower number is better.',
    workTitle: 'My part in the work.',
    workIntro: 'The figures above describe the whole website. My contribution was in research, content, and page improvements:',
    workItems: [
      ['Search demand research', 'Intent and topic groups'],
      ['Content development', 'Articles, topic and category pages'],
      ['On-page improvement', 'Structure, information, internal links'],
      ['Performance review', 'GSC and update priorities']
    ],
    writingTitle: 'Published writing.',
    writingIntro: 'Three English articles on customer experience and contact center technology, published at Primas under the name Dat Pham.',
    authorLink: 'See Dat Pham’s author page',
    experienceTitle: 'My SEO journey.',
    experienceIntro: 'From intern to SEO Executive at Primas Group.',
    roles: [
      { period: 'Nov 2024 – present', title: 'SEO Executive', text: 'Research and develop SEO content for international projects, improve on-page elements, and monitor search performance.' },
      { period: 'May 2024 – Oct 2024', title: 'SEO Contributor', text: 'Developed articles and pages around topic groups, reviewing and updating information for project needs.' },
      { period: 'Nov 2023 – Apr 2024', title: 'SEO Intern', text: 'Started with keyword research, editing, and practical SEO fundamentals.' }
    ],
    skillsTitle: 'Tools in my workflow.',
    skills: ['Google Search Console', 'GA4', 'WordPress', 'Semrush', 'Screaming Frog'],
    contactTitle: 'Let’s make SEO useful.',
    contactText: 'If you need someone who asks good content questions and reads the data, I would welcome a conversation.',
    city: 'Ho Chi Minh City, Vietnam', emailAction: 'Send an email', linkedIn: 'LinkedIn', backTop: 'Back to top',
    footerNote: 'Pham Tien Dat · SEO Executive',
    title: 'Pham Tien Dat — SEO Executive',
    description: 'SEO portfolio of Pham Tien Dat: content approach, sitewide GSC evidence, published Primas writing, and experience.'
  }
} as const;

export type Content = typeof content.vi | typeof content.en;
