import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

await mkdir('public', { recursive: true });
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="315" fill="#e8e9e4"/>
  <rect y="315" width="1200" height="315" fill="#405b4b"/>
  <text x="62" y="100" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#1b2520">Phạm Tiến Đạt · SEO Executive</text>
  <text x="62" y="298" font-family="Arial, sans-serif" font-size="154" font-weight="700" letter-spacing="-4" fill="#1b2520">Tìm đúng.</text>
  <text x="62" y="473" font-family="Arial, sans-serif" font-size="154" font-weight="700" letter-spacing="-4" fill="#f3f5ef">Đo rõ.</text>
  <text x="62" y="566" font-family="Arial, sans-serif" font-size="29" fill="#f3f5ef">Nội dung · Cấu trúc trang · Hiệu suất tìm kiếm</text>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/og-cover.png');
