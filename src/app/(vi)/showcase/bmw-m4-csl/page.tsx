import type { Metadata } from "next";
import { ShowcaseBmw } from "../../../showcase-bmw";

export const metadata: Metadata = {
  title: "Đam mê xe của Đạt — BMW M4 CSL 3D | Phạm Tiến Đạt",
  description:
    "Mô hình 3D tương tác của BMW M4 CSL (G82) 2023: xoay 360°, đổi màu sơn, mở cửa, ca-pô, cốp sau, X-ray và nổ tung để xem chi tiết từng bộ phận.",
  alternates: {
    canonical: "/showcase/bmw-m4-csl/",
    languages: {
      vi: "/showcase/bmw-m4-csl/",
      en: "/en/showcase/bmw-m4-csl/",
      "x-default": "/showcase/bmw-m4-csl/",
    },
  },
  openGraph: {
    title: "Đam mê xe của Đạt — BMW M4 CSL 3D",
    description:
      "Mô hình 3D tương tác của BMW M4 CSL (G82) 2023: xoay 360°, đổi màu sơn, mở cửa, ca-pô, cốp sau, X-ray và nổ tung.",
    url: "https://datpham.io.vn/showcase/bmw-m4-csl/",
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đam mê xe của Đạt — BMW M4 CSL 3D",
    description:
      "Mô hình 3D tương tác của BMW M4 CSL (G82) 2023: xoay 360°, đổi màu sơn, mở cửa, ca-pô, cốp sau, X-ray và nổ tung.",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ShowcaseBmw language="vi" />;
}
