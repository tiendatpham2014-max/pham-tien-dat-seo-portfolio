window.addEventListener("scroll",scheduleSceneUpdate,{passive:true});
window.addEventListener("resize",scheduleSceneUpdate);
$("#theme-toggle").addEventListener("click",()=>setTheme(theme==="dark"?"light":"dark"));
$$("[data-lang]").forEach(button=>button.addEventListener("click",()=>setLanguage(button.dataset.lang)));
$("#compare-slider").addEventListener("input",updateComparison);
$$("[data-metric]").forEach(button=>button.addEventListener("click",()=>{currentMetric=button.dataset.metric;renderMetric()}));
$("#menu-toggle").addEventListener("click",()=>menuOpen?closeMenu(true):openMenu());
$("#menu-backdrop").addEventListener("click",()=>closeMenu(true));
$("#mobile-nav").addEventListener("keydown",event=>{if(event.key!=="Tab")return;const links=$$("#mobile-nav a"),first=links[0],last=links.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&menuOpen)closeMenu(true)});
$$('#mobile-nav a').forEach(link=>link.addEventListener("click",()=>closeMenu()));
const tabs=$$("[data-skill]");
tabs.forEach((tab,index)=>{tab.addEventListener("click",()=>activateSkill(index,true));tab.addEventListener("keydown",event=>{let next=index;if(event.key==="ArrowRight")next=index+1;else if(event.key==="ArrowLeft")next=index-1;else if(event.key==="Home")next=0;else if(event.key==="End")next=tabs.length-1;else if(event.key===" "||event.key==="Enter"){event.preventDefault();activateSkill(index,true);return}else return;event.preventDefault();activateSkill(next,true);tabs[currentSkill].focus()})});
$("#skills").addEventListener("mouseenter",()=>{skillHover=true;stopSkillTimer()});
$("#skills").addEventListener("mouseleave",()=>{skillHover=false;scheduleSkillTimer()});
$("#skills").addEventListener("focusin",()=>{skillFocus=true;stopSkillTimer()});
$("#skills").addEventListener("focusout",()=>{setTimeout(()=>{skillFocus=$("#skills").contains(document.activeElement);scheduleSkillTimer()},0)});
document.addEventListener("visibilitychange",()=>{document.body.classList.toggle("page-hidden",document.hidden);scheduleSkillTimer()});reduced.addEventListener?.("change",scheduleSkillTimer);
$("#rail-prev").addEventListener("click",()=>moveRail(-1));$("#rail-next").addEventListener("click",()=>moveRail(1));$("#article-rail").addEventListener("scroll",()=>requestAnimationFrame(updateRail),{passive:true});window.addEventListener("resize",()=>{positionIndicator();updateRail()});
$("#year").textContent=new Date().getFullYear();
initSignalLab();
try{setLanguage(localStorage.getItem("dat-seo-language")||"vi")}catch{setLanguage("vi")}
document.documentElement.classList.remove("no-js");
updateRail();
updateScenes();
if("IntersectionObserver"in window){
  const sectionObserver=new IntersectionObserver(entries=>{const seen=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(seen.length)setActiveSection(seen[0].target.id)},{rootMargin:"-25% 0px -55% 0px",threshold:[0,.1,.25,.5]});
  sections.forEach(id=>sectionObserver.observe(document.getElementById(id)));
  const skillObserver=new IntersectionObserver(entries=>{skillVisible=entries[0].isIntersecting;scheduleSkillTimer()},{threshold:.4});skillObserver.observe($("#skills"));
  const processObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){$(".process-path").classList.add("is-visible");processObserver.disconnect()}},{threshold:.2});processObserver.observe($("#process"));
  if(!reduced.matches){
    document.body.classList.add("js-motion");
    const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target)}})},{threshold:.08,rootMargin:"0px 0px -5% 0px"});
    $$(".process-step,.section-head,.approach-grid,.insight-row article,.case-overview,.metric-stage,.period-card,.compare-wrap,.skill-layout,.article-card,.contact-heading,.contact-methods a").forEach(item=>revealObserver.observe(item));
  }
}
document.fonts?.ready.then(positionIndicator);
