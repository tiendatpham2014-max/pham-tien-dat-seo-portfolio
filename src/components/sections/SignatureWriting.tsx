// Chữ ký viết từng nét (inline SVG).
// Đường nét và timing được tạo bởi scripts/build-signature-animation.mjs
// từ cùng dữ liệu nét bút; ảnh nền là /branding/dat-pham-signature-source.png
// (tách ra khỏi file SVG để trình duyệt cache được, thay vì nhúng base64).
// Animation CSS chạy khi component mount (mỗi lần tải trang), nên không cần
// cache-buster ?v=Date.now() để restart nữa.
export function SignatureWriting() {
  return (
    <svg
      className="intro-signature"
      viewBox="0 0 2172 724"
      role="img"
      aria-label="Chữ ký Đạt P được viết theo từng nét"
    >
      <defs>
        <filter id="ink" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.95686  0 0 0 0 0.96078  0 0 0 0 0.94510  0 0 0 1 0"
          />
        </filter>
        <mask
          id="written"
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="2172"
          height="724"
        >
      <path className="stroke stroke-0" d="M 338 279 C 300 248 299 210 332 177 C 414 112 568 92 681 98 C 819 103 891 158 882 232 C 868 332 761 410 616 485 C 467 557 296 602 185 600" fill="none" stroke="#fff" strokeWidth="62" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1587 1587" strokeDashoffset="1587" style={{ animation: "write 0.246s 0.028s linear forwards" }} />
      <path className="stroke stroke-1" d="M 487 250 C 469 317 431 427 398 503" fill="none" stroke="#fff" strokeWidth="46" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="271 271" strokeDashoffset="271" style={{ animation: "write 0.066s 0.278s linear forwards" }} />
      <path className="stroke stroke-2" d="M 274 398 C 348 341 462 327 561 340 C 642 350 694 359 746 359" fill="none" stroke="#fff" strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="489 489" strokeDashoffset="489" style={{ animation: "write 0.076s 0.348s linear forwards" }} />
      <path className="stroke stroke-3" d="M 859 407 C 837 383 803 394 784 417 C 765 439 779 470 803 469 C 832 468 847 435 856 409 C 841 435 841 458 874 461" fill="none" stroke="#fff" strokeWidth="48" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="315 315" strokeDashoffset="315" style={{ animation: "write 0.089s 0.427s linear forwards" }} />
      <path className="stroke stroke-4" d="M 992 307 C 978 351 957 408 932 466 C 917 486 892 469 892 450" fill="none" stroke="#fff" strokeWidth="49" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="230 230" strokeDashoffset="230" style={{ animation: "write 0.07s 0.52s linear forwards" }} />
      <path className="stroke stroke-5" d="M 878 377 C 945 370 1026 371 1093 373" fill="none" stroke="#fff" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="218 218" strokeDashoffset="218" style={{ animation: "write 0.051s 0.594s linear forwards" }} />
      <path className="stroke stroke-6" d="M 1194 267 C 1167 333 1128 443 1086 503" fill="none" stroke="#fff" strokeWidth="51" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="263 263" strokeDashoffset="263" style={{ animation: "write 0.064s 0.648s linear forwards" }} />
      <path className="stroke stroke-7" d="M 1136 225 C 1174 175 1255 153 1312 167 C 1382 180 1421 215 1384 265 C 1343 319 1229 367 1140 391" fill="none" stroke="#fff" strokeWidth="49" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="629 629" strokeDashoffset="629" style={{ animation: "write 0.117s 0.716s linear forwards" }} />
      <path className="stroke stroke-8" d="M 81 675 C 378 604 755 552 1117 519 C 1447 485 1800 466 2140 475" fill="none" stroke="#fff" strokeWidth="54" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2076 2076" strokeDashoffset="2076" style={{ animation: "write 0.236s 0.837s linear forwards" }} />
        </mask>
        <image
          id="signature-source"
          href="/branding/dat-pham-signature-source.png"
          width="2172"
          height="724"
        />
      </defs>
      <style>{`
    @keyframes write { to { stroke-dashoffset:0 } }
    @keyframes revealFinal { to { opacity:1 } }
    @keyframes hideTrace { to { opacity:0 } }
    .stroke { will-change:stroke-dashoffset;-webkit-transform:translateZ(0) }
    .final { opacity:0; animation:revealFinal 0.06s 1.091s linear forwards }
    .trace { animation:hideTrace 0.06s 1.091s linear forwards }
    @media (prefers-reduced-motion:reduce) {
      .stroke,.trace,.final { animation:none!important }
      .trace { opacity:0!important }
      .final { opacity:1!important }
    }
  `}</style>
      <use
        className="trace"
        href="#signature-source"
        filter="url(#ink)"
        mask="url(#written)"
        opacity="1"
      />
      <use
        className="final"
        href="#signature-source"
        filter="url(#ink)"
        opacity="0"
      />
    </svg>
  );
}
