import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phạm Tiến Đạt — SEO Executive",
  description:
    "Phạm Tiến Đạt — SEO Executive. Tư duy về search intent, nội dung, dữ liệu GSC và các bài viết đã xuất bản.",
  metadataBase: new URL("https://pham-tien-dat-seo.bloomybowl64.chatgpt.site"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Phạm Tiến Đạt — SEO Executive",
    description:
      "SEO bắt đầu từ điều người dùng thực sự cần. Kết nối search intent, nội dung và tín hiệu Google Search Console.",
    type: "profile",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "Phạm Tiến Đạt SEO Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phạm Tiến Đạt — SEO Executive",
    description:
      "SEO bắt đầu từ điều người dùng thực sự cần. Kết nối search intent, nội dung và tín hiệu Google Search Console.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site/#person",
      "name": "Phạm Tiến Đạt",
      "jobTitle": "SEO Executive",
      "worksFor": {
        "@type": "Organization",
        "name": "Primas Group",
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Thành phố Hồ Chí Minh",
        "addressCountry": "VN",
      },
      "sameAs": [
        "https://www.linkedin.com/in/ph%E1%BA%A1m-ti%E1%BA%BFn-%C4%91%E1%BA%A1t-b9a157444/",
      ],
      "knowsAbout": [
        "Search Engine Optimization",
        "Technical SEO",
        "Search Intent Analysis",
        "Google Search Console",
        "Content Strategy",
        "On-Page SEO",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site/#webpage",
      "url": "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site/",
      "name": "Phạm Tiến Đạt — SEO Executive Portfolio",
      "description":
        "Portfolio của Phạm Tiến Đạt, SEO Executive. Tư duy về search intent, nội dung, dữ liệu GSC và các bài viết đã xuất bản.",
      "about": {
        "@id": "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site/#person",
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
