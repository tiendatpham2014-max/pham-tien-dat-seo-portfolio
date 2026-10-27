import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phạm Tiến Đạt (Dat Pham) — SEO Executive | Portfolio Tối Ưu Search Intent & AI SEO",
  description:
    "Portfolio của Phạm Tiến Đạt, SEO Executive tại Primas Group. Hơn 2 năm thực chiến tối ưu Search Intent, Technical SEO, Core Web Vitals và AI-Driven SEO cho Altus Entertainment tại thị trường Mỹ.",
  keywords: [
    "Phạm Tiến Đạt",
    "Dat Pham",
    "SEO Executive",
    "Primas Group",
    "Altus Entertainment",
    "Technical SEO",
    "Core Web Vitals",
    "Search Intent Mapping",
    "Google Search Console",
    "AI SEO",
    "Model Context Protocol",
    "SEO Portfolio",
  ],
  authors: [{ name: "Phạm Tiến Đạt", url: "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site" }],
  creator: "Phạm Tiến Đạt",
  publisher: "Phạm Tiến Đạt",
  metadataBase: new URL("https://pham-tien-dat-seo.bloomybowl64.chatgpt.site"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Phạm Tiến Đạt (Dat Pham) — SEO Executive Portfolio",
    description:
      "Tối ưu hóa tìm kiếm tự nhiên, Search Intent & Cấu trúc Nội dung. Case study Altus Entertainment tăng trưởng 27,1% Clicks tại thị trường Mỹ.",
    type: "profile",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "Phạm Tiến Đạt SEO Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phạm Tiến Đạt (Dat Pham) — SEO Executive Portfolio",
    description:
      "Tối ưu hóa tìm kiếm tự nhiên, Search Intent & Cấu trúc Nội dung. Case study Altus Entertainment tăng trưởng 27,1% Clicks tại thị trường Mỹ.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site/#person",
      "name": "Phạm Tiến Đạt",
      "alternateName": "Dat Pham",
      "jobTitle": "SEO Executive",
      "telephone": "+84912995691",
      "email": "tiendatpham2014@gmail.com",
      "worksFor": {
        "@type": "Organization",
        "name": "Primas Group",
        "url": "https://primas.net",
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Trường Cao đẳng Công nghệ Thủ Đức (TDC)",
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Thành phố Hồ Chí Minh",
        "addressCountry": "VN",
      },
      "sameAs": [
        "https://www.linkedin.com/in/ph%E1%BA%A1m-ti%E1%BA%BFn-%C4%91%E1%BA%A1t-b9a157444/",
        "https://primas.net/author/datpt/",
      ],
      "knowsAbout": [
        "Search Engine Optimization (SEO)",
        "Technical SEO & Core Web Vitals",
        "Search Intent Analysis",
        "Content Strategy & Business English",
        "Google Search Console & GA4",
        "AI-Augmented SEO (Claude, GPT, MCP)",
        "Semrush, Ahrefs & Screaming Frog",
        "Altus Entertainment SEO Growth",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site/#website",
      "url": "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site/",
      "name": "Phạm Tiến Đạt — SEO Executive Portfolio",
      "publisher": {
        "@id": "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site/#person",
      },
      "inLanguage": ["vi", "en"],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site/#webpage",
      "url": "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site/",
      "name": "Phạm Tiến Đạt (Dat Pham) — SEO Executive Portfolio",
      "description":
        "Portfolio của Phạm Tiến Đạt, SEO Executive. Tư duy về search intent, nội dung, dữ liệu GSC và các bài viết đã xuất bản.",
      "about": {
        "@id": "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site/#person",
      },
      "isPartOf": {
        "@id": "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site/#website",
      },
      "inLanguage": ["vi", "en"],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className="no-js" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#101827" />
        <link
          rel="preload"
          href="/fonts/be-vietnam-pro-vietnamese-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/be-vietnam-pro-vietnamese-600-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage.getItem("dat-seo-theme")==="light"){document.documentElement.dataset.theme="light";document.querySelector(\'meta[name="theme-color"]\').content="#f5f3ed"}}catch{}',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
