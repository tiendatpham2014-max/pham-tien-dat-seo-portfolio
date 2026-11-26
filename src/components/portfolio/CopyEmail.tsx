"use client";
import { useEffect, useRef, useState } from "react";
import type { Language } from "@/content/portfolio";

export function CopyEmail({ language = "en" }: { language?: Language }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const copy = async () => {
    try { await navigator.clipboard.writeText("tiendatpham2014@gmail.com"); setStatus("copied"); }
    catch { setStatus("failed"); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 5000);
  };
  const text = language === "vi" ? {idle:"Sao chép email",copied:"Đã sao chép",failed:"Chọn địa chỉ để sao chép:"} : {idle:"Copy email",copied:"Email copied",failed:"Select the address to copy:"};
  return <span className="copy-email"><button type="button" onClick={copy}>{status === "copied" ? text.copied : text.idle}</button>
    <span className={status === "failed" ? "copy-email-fallback" : "sr-only"} role="status">{status === "failed" ? <>{text.failed} <input aria-label="Email" readOnly value="tiendatpham2014@gmail.com" onFocus={event => event.currentTarget.select()} /></> : status === "copied" ? text.copied : ""}</span>
  </span>;
}
