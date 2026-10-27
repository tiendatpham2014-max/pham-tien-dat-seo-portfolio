import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phạm Tiến Đạt (Dat Pham) — SEO Executive | Portfolio",
  description:
    "Portfolio của Phạm Tiến Đạt, SEO Executive tại Primas Group. Tối ưu hóa Search Intent, Technical SEO, Core Web Vitals và AI cho thị trường quốc tế.",
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
  authors: [{ name: "Phạm Tiến Đạt", url: "https://datpham.io.vn" }],
  creator: "Phạm Tiến Đạt",
  publisher: "Phạm Tiến Đạt",
  metadataBase: new URL("https://datpham.io.vn"),
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
    title: "Phạm Tiến Đạt (Dat Pham) — SEO Executive | Portfolio",
    description:
      "Portfolio của Phạm Tiến Đạt, SEO Executive tại Primas Group. Tối ưu hóa Search Intent, Technical SEO, Core Web Vitals và AI cho thị trường quốc tế.",
    type: "profile",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "https://datpham.io.vn/",
    siteName: "Phạm Tiến Đạt SEO Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phạm Tiến Đạt (Dat Pham) — SEO Executive | Portfolio",
    description:
      "Portfolio của Phạm Tiến Đạt, SEO Executive tại Primas Group. Tối ưu hóa Search Intent, Technical SEO, Core Web Vitals và AI cho thị trường quốc tế.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://datpham.io.vn/#person",
      "name": "Phạm Tiến Đạt",
      "alternateName": "Dat Pham",
      "jobTitle": "SEO Executive",
      "telephone": "+84912995691",
      "email": "tiendatpham2014@gmail.com",
      "url": "https://datpham.io.vn",
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
      "@id": "https://datpham.io.vn/#website",
      "url": "https://datpham.io.vn/",
      "name": "Phạm Tiến Đạt — SEO Executive Portfolio",
      "publisher": {
        "@id": "https://datpham.io.vn/#person",
      },
      "inLanguage": ["vi", "en"],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://datpham.io.vn/#webpage",
      "url": "https://datpham.io.vn/",
      "name": "Phạm Tiến Đạt (Dat Pham) — SEO Executive Portfolio",
      "description":
        "Portfolio của Phạm Tiến Đạt, SEO Executive tại Primas Group. Tối ưu hóa Search Intent, Technical SEO, Core Web Vitals và AI cho thị trường quốc tế.",
      "mainEntity": {
        "@id": "https://datpham.io.vn/#person",
      },
      "about": {
        "@id": "https://datpham.io.vn/#person",
      },
      "isPartOf": {
        "@id": "https://datpham.io.vn/#website",
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
              'try{if(localStorage.getItem("dat-seo-theme")==="light"){document.documentElement.dataset.theme="light";document.querySelector(\'meta[name="theme-color"]\').content="#f8fafc"}}catch{}',
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
