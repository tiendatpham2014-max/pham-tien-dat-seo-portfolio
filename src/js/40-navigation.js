function positionIndicator(){
  const nav=$("#desktop-nav"),active=nav.querySelector('a[aria-current="location"]'),indicator=nav.querySelector(".nav-indicator");
  if(!active){indicator.style.width="0";return}
  const a=active.getBoundingClientRect(),n=nav.getBoundingClientRect();
  indicator.style.width=a.width+"px";indicator.style.transform="translateX("+(a.left-n.left)+"px)";
}
function setActiveSection(id){
  if(currentActiveSection===id)return;
  currentActiveSection=id;
  $$("#desktop-nav a").forEach(link=>link.getAttribute("href")==="#"+id?link.setAttribute("aria-current","location"):link.removeAttribute("aria-current"));
  positionIndicator();
}
let currentActiveSection="";
function updateActiveSection(){
  const focus=window.innerHeight*.45;
  const current=sections.find(id=>{const rect=document.getElementById(id).getBoundingClientRect();return rect.top<=focus&&rect.bottom>focus})||"";
  setActiveSection(current);
}
