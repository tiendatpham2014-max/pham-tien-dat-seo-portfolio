function positionIndicator(){
  const nav=$("#desktop-nav"),active=nav.querySelector('a[aria-current="location"]'),indicator=nav.querySelector(".nav-indicator");
  if(!active){indicator.style.width="0";return}
  const a=active.getBoundingClientRect(),n=nav.getBoundingClientRect();
  indicator.style.width=a.width+"px";indicator.style.transform="translateX("+(a.left-n.left)+"px)";
}
function setActiveSection(id){
  $$("#desktop-nav a").forEach(link=>link.getAttribute("href")==="#"+id?link.setAttribute("aria-current","location"):link.removeAttribute("aria-current"));
  positionIndicator();
}
