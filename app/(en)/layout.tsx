import type { Metadata } from 'next';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import '../globals.css';
import { content } from '@/lib/content';

const site = 'https://pham-tien-dat-seo.bloomybowl64.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: content.en.title,
  description: content.en.description,
  alternates: { canonical: '/en/', languages: { vi: '/', en: '/en/' } },
  openGraph: { type: 'website', locale: 'en_US', title: content.en.title, description: content.en.description, url: '/en/', images: [{ url: '/og-cover.png', width: 1200, height: 630, alt: 'Pham Tien Dat — SEO Executive' }] },
  twitter: { card: 'summary_large_image', title: content.en.title, description: content.en.description, images: ['/og-cover.png'] },
  robots: { index: true, follow: true }
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
