import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const branding = join(root, 'public', 'branding');
const png = await readFile(join(branding, 'dat-pham-signature-source.png'));
const source = `data:image/png;base64,${png.toString('base64')}`;

// Hand-traced pen routes. They only reveal pixels from the original PNG; the
// displayed signature itself is never replaced by these approximate paths.
export const strokes = [
  { name: 'D loop', d: 'M 338 279 C 300 248 299 210 332 177 C 414 112 568 92 681 98 C 819 103 891 158 882 232 C 868 332 761 410 616 485 C 467 557 296 602 185 600', width: 62, start: 0.15, duration: 1.30 },
  { name: 'D stem', d: 'M 487 250 C 469 317 431 427 398 503', width: 46, start: 1.47, duration: 0.35 },
  { name: 'D bar', d: 'M 274 398 C 348 341 462 327 561 340 C 642 350 694 359 746 359', width: 44, start: 1.84, duration: 0.40 },
  { name: 'a', d: 'M 859 407 C 837 383 803 394 784 417 C 765 439 779 470 803 469 C 832 468 847 435 856 409 C 841 435 841 458 874 461', width: 48, start: 2.26, duration: 0.47 },
  { name: 't stem', d: 'M 992 307 C 978 351 957 408 932 466 C 917 486 892 469 892 450', width: 49, start: 2.75, duration: 0.37 },
  { name: 't crossbar', d: 'M 878 377 C 945 370 1026 371 1093 373', width: 40, start: 3.14, duration: 0.27 },
  { name: 'P stem', d: 'M 1194 267 C 1167 333 1128 443 1086 503', width: 51, start: 3.43, duration: 0.34 },
  { name: 'P loop', d: 'M 1136 225 C 1174 175 1255 153 1312 167 C 1382 180 1421 215 1384 265 C 1343 319 1229 367 1140 391', width: 49, start: 3.79, duration: 0.62 },
  { name: 'underline', d: 'M 81 675 C 378 604 755 552 1117 519 C 1447 485 1800 466 2140 475', width: 54, start: 4.43, duration: 1.25 },
];

const total = 5.77;
const finish = 0.32;

function pathLength(d) {
  const values = d.match(/-?\d+(?:\.\d+)?/g).map(Number);
  let x = values[0];
  let y = values[1];
  let length = 0;
  for (let i = 2; i < values.length; i += 6) {
    const [x1, y1, x2, y2, x3, y3] = values.slice(i, i + 6);
    let px = x;
    let py = y;
    for (let step = 1; step <= 100; step++) {
      const t = step / 100;
      const q = 1 - t;
      const nx = q*q*q*x + 3*q*q*t*x1 + 3*q*t*t*x2 + t*t*t*x3;
      const ny = q*q*q*y + 3*q*q*t*y1 + 3*q*t*t*y2 + t*t*t*y3;
      length += Math.hypot(nx - px, ny - py);
      px = nx;
      py = ny;
    }
    x = x3;
    y = y3;
  }
  return Math.ceil(length + 2);
}

function colorMatrix(hex) {
  const c = hex.match(/[0-9a-f]{2}/gi).map((part) => (parseInt(part, 16) / 255).toFixed(5));
  return `0 0 0 0 ${c[0]}  0 0 0 0 ${c[1]}  0 0 0 0 ${c[2]}  0 0 0 1 0`;
}

function strokePath(stroke, index, frameTime) {
  const length = pathLength(stroke.d);
  const duration = `${stroke.duration}s`;
  const delay = `${stroke.start}s`;
  const progress = frameTime === undefined ? 0 : Math.max(0, Math.min(1, (frameTime - stroke.start) / stroke.duration));
  const offset = Math.round((1 - progress) * length * 100) / 100;
  const style = frameTime === undefined
    ? `style="animation:write ${duration} ${delay} linear forwards"`
    : '';
  return `<path class="stroke stroke-${index}" d="${stroke.d}" fill="none" stroke="#fff" stroke-width="${stroke.width}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${length} ${length}" stroke-dashoffset="${offset}" ${style}/>`;
}

function buildSvg(ink, frameTime) {
  const animated = frameTime === undefined;
  const maskPaths = strokes.map((stroke, index) => strokePath(stroke, index, frameTime)).join('\n');
  const finalOpacity = frameTime === undefined ? 0 : Math.max(0, Math.min(1, (frameTime - total) / finish));
  const traceOpacity = 1 - finalOpacity;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2172 724" role="img" aria-label="Chữ ký Đạt P được viết theo từng nét">
  <defs>
    <filter id="ink" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${colorMatrix(ink)}"/></filter>
    <mask id="written" maskUnits="userSpaceOnUse" x="0" y="0" width="2172" height="724" style="mask-type:alpha">${maskPaths}</mask>
    <image id="signature-source" href="${source}" width="2172" height="724"/>
  </defs>
  ${animated ? `<style>
    @keyframes write { to { stroke-dashoffset:0 } }
    @keyframes revealFinal { to { opacity:1 } }
    @keyframes hideTrace { to { opacity:0 } }
    .final { opacity:0; animation:revealFinal ${finish}s ${total}s linear forwards }
    .trace { animation:hideTrace ${finish}s ${total}s linear forwards }
    @media (prefers-reduced-motion:reduce) {
      .stroke,.trace,.final { animation:none!important }
      .trace { opacity:0!important }
      .final { opacity:1!important }
    }
  </style>` : ''}
  <use class="trace" href="#signature-source" filter="url(#ink)" mask="url(#written)" opacity="${traceOpacity}"/>
  <use class="final" href="#signature-source" filter="url(#ink)" opacity="${finalOpacity}"/>
</svg>`;
}

await writeFile(join(branding, 'dat-pham-signature-writing.svg'), buildSvg('#F4F5F1'));
await writeFile(join(branding, 'dat-pham-signature-writing-light.svg'), buildSvg('#101827'));

if (process.argv.includes('--frames')) {
  const { default: sharp } = await import('sharp');
  const output = join(root, 'out', 'signature-animation-frames');
  const { mkdir } = await import('node:fs/promises');
  await mkdir(output, { recursive: true });
  const fps = 25;
  for (let frame = 0; frame <= Math.ceil((total + finish + .25) * fps); frame++) {
    const time = frame / fps;
    const svg = buildSvg('#F4F5F1', time);
    const background = `<svg xmlns="http://www.w3.org/2000/svg" width="1086" height="362"><rect width="100%" height="100%" fill="#101827"/></svg>`;
    const sig = await sharp(Buffer.from(svg)).resize(1086, 362).png().toBuffer();
    await sharp(Buffer.from(background)).composite([{ input: sig }]).png().toFile(join(output, `${String(frame).padStart(3, '0')}.png`));
  }
  console.log(output);
}
