import type { Metadata } from "next";
import { ShowcaseBmw } from "../../../../showcase-bmw";

export const metadata: Metadata = {
  title: "Dat's Passion for Cars — BMW M4 CSL 3D | Dat Pham",
  description:
    "An interactive 3D model of the BMW M4 CSL (G82) 2023: rotate 360°, change the paint, open the doors, hood and trunk, and use X-ray and exploded view to explore every part.",
  alternates: {
    canonical: "/en/showcase/bmw-m4-csl/",
    languages: {
      vi: "/showcase/bmw-m4-csl/",
      en: "/en/showcase/bmw-m4-csl/",
      "x-default": "/showcase/bmw-m4-csl/",
    },
  },
  openGraph: {
    title: "Dat's Passion for Cars — BMW M4 CSL 3D",
    description:
      "An interactive 3D model of the BMW M4 CSL (G82) 2023: rotate 360°, change the paint, open the doors, hood and trunk, and use X-ray and exploded view.",
    url: "https://datpham.io.vn/en/showcase/bmw-m4-csl/",
    type: "website",
    locale: "en_US",
    alternateLocale: ["vi_VN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dat's Passion for Cars — BMW M4 CSL 3D",
    description:
      "An interactive 3D model of the BMW M4 CSL (G82) 2023: rotate 360°, change the paint, open the doors, hood and trunk, and use X-ray and exploded view.",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ShowcaseBmw language="en" />;
}
