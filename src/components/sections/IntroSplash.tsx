import { SignatureWriting } from "./SignatureWriting";

export function IntroSplash() {
  return (
    <div className="intro-splash" id="intro-splash" aria-hidden="true">
      <div className="intro-splash-backdrop" id="intro-splash-backdrop" />
      <div className="intro-splash-mark" id="intro-splash-mark">
        <SignatureWriting />
      </div>
    </div>
  );
}
