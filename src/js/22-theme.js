const THEME_STORAGE_KEY="dat-seo-theme";
let theme=document.documentElement.dataset.theme==="light"?"light":"dark";
function updateThemeControl(){
  const label=language==="vi"
    ?theme==="dark"?"Chuyển sang giao diện sáng":"Chuyển sang giao diện tối"
    :theme==="dark"?"Switch to light theme":"Switch to dark theme";
  const button=$("#theme-toggle");
  button.setAttribute("aria-label",label);
  button.title=label;
  $('meta[name="theme-color"]').content=theme==="dark"?"#101827":"#f5f3ed";
}
function setTheme(next){
  theme=next==="light"?"light":"dark";
  if(theme==="light")document.documentElement.dataset.theme="light";
  else delete document.documentElement.dataset.theme;
  updateThemeControl();
  try{localStorage.setItem(THEME_STORAGE_KEY,theme)}catch{}
}
