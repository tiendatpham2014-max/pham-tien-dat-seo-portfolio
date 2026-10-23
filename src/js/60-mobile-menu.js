function closeMenu(returnFocus=false){
  if(!menuOpen)return;
  menuOpen=false;document.body.classList.remove("menu-open");$("#menu-toggle").setAttribute("aria-expanded","false");$("#menu-toggle").setAttribute("aria-label",copy[language].menuOpen);$("#mobile-nav").inert=true;$("#menu-backdrop").hidden=true;
  if(returnFocus)$("#menu-toggle").focus();
}
function openMenu(){
  if(menuOpen)return;
  menuOpen=true;document.body.classList.add("menu-open");$("#menu-toggle").setAttribute("aria-expanded","true");$("#menu-toggle").setAttribute("aria-label",copy[language].menuClose);$("#mobile-nav").inert=false;$("#menu-backdrop").hidden=false;
  const focusFirst=()=>{if(menuOpen)$("#mobile-nav a").focus()};
  requestAnimationFrame(focusFirst);
  setTimeout(focusFirst,reduced.matches?0:380);
}
