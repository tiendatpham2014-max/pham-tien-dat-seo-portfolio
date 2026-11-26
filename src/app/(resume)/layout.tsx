import "../globals.css";
export default function ResumeLayout({children}:Readonly<{children:React.ReactNode}>) {
  return <html lang="en" suppressHydrationWarning><head>
    <script dangerouslySetInnerHTML={{__html:'try{var t=localStorage.getItem("dat-seo-theme");document.documentElement.dataset.theme=t==="light"||(!t&&matchMedia("(prefers-color-scheme: light)").matches)?"light":"dark"}catch(e){}'}} />
  </head><body>{children}</body></html>;
}
