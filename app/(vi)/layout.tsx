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
  title: content.vi.title,
  description: content.vi.description,
  alternates: { canonical: '/', languages: { vi: '/', en: '/en/' } },
  openGraph: { type: 'website', locale: 'vi_VN', title: content.vi.title, description: content.vi.description, url: '/', images: [{ url: '/og-cover.png', width: 1200, height: 630, alt: 'Phạm Tiến Đạt — SEO Executive' }] },
  twitter: { card: 'summary_large_image', title: content.vi.title, description: content.vi.description, images: ['/og-cover.png'] },
  robots: { index: true, follow: true }
};

export default function VietnameseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
