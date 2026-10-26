import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phạm Tiến Đạt — SEO Executive",
  description:
    "Phạm Tiến Đạt — SEO Executive. Tư duy về search intent, nội dung, dữ liệu GSC và các bài viết đã xuất bản.",
  metadataBase: new URL("https://pham-tien-dat-seo.bloomybowl64.chatgpt.site"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className="no-js" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#101827" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage.getItem("dat-seo-theme")==="light"){document.documentElement.dataset.theme="light";document.querySelector(\'meta[name="theme-color"]\').content="#f5f3ed"}}catch{}',
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
