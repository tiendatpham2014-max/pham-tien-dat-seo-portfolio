"use client";
import { useEffect, useState } from "react";
import { CopyEmail } from "./CopyEmail";
export function ResumeActions() {
  const [light,setLight]=useState(false);
  useEffect(()=>setLight(document.documentElement.dataset.theme==="light"),[]);
  const toggle=()=>{const next=!light;setLight(next);document.documentElement.dataset.theme=next?"light":"dark";try{localStorage.setItem("dat-seo-theme",next?"light":"dark");}catch{}};
  return <div className="resume-actions"><a href="/resume/dat-pham-resume-en.pdf" download>Download PDF</a><button type="button" onClick={()=>window.print()}>Print</button><CopyEmail /><button type="button" aria-label={light?"Switch to dark theme":"Switch to light theme"} onClick={toggle}>{light?"Dark":"Light"}</button></div>;
}
