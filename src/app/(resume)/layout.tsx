import "../globals.css";
export default function ResumeLayout({children}:Readonly<{children:React.ReactNode}>) {
  return <html lang="en" suppressHydrationWarning><head>
    <meta name="theme-color" content="#101b2b" />
    <script dangerouslySetInnerHTML={{__html:'try{var t=localStorage.getItem("dat-seo-theme");document.documentElement.dataset.theme=t==="light"||(!t&&matchMedia("(prefers-color-scheme: light)").matches)?"light":"dark";document.querySelector(\'meta[name="theme-color"]\').content=document.documentElement.dataset.theme==="light"?"#f7f9fb":"#101b2b"}catch(e){}'}} />
  </head><body>{children}</body></html>;
}
