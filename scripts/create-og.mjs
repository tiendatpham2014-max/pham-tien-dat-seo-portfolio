import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

await mkdir('public', { recursive: true });
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#102018"/>
  <path d="M-80 378L1230 85" stroke="#426d4c" stroke-width="6"/>
  <path d="M300 665L1330 395" stroke="#426d4c" stroke-width="4"/>
  <text x="72" y="82" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#b8f279">SEO Executive</text>
  <text x="72" y="274" font-family="Arial, sans-serif" font-size="166" font-weight="700" letter-spacing="-8" fill="#f3f5ef">Phạm</text>
  <text x="135" y="452" font-family="Arial, sans-serif" font-size="166" font-weight="700" letter-spacing="-8" fill="#f3f5ef">Tiến Đạt</text>
  <text x="72" y="566" font-family="Arial, sans-serif" font-size="30" fill="#f3f5ef">Tìm đúng. Đo rõ. · phamtien-dat-seo portfolio</text>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/og-cover.png');
