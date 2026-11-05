export function IntroSplash() {
  return (
    <div className="intro-splash" id="intro-splash" aria-hidden="true">
      <div className="intro-splash-backdrop" id="intro-splash-backdrop" />
      <div className="intro-splash-mark" id="intro-splash-mark">
        <img
          src="/branding/dat-pham-signature-writing.svg"
          alt=""
          className="intro-signature"
          width={360}
          height={120}
        />
      </div>
    </div>
  );
}
