function activateSkill(index,user=false){
  const tabs=$$("[data-skill]"),panels=$$(".skill-panels [role=tabpanel]");
  currentSkill=(index+tabs.length)%tabs.length;
  tabs.forEach((tab,i)=>{tab.setAttribute("aria-selected",String(i===currentSkill));tab.tabIndex=i===currentSkill?0:-1});
  panels.forEach((panel,i)=>panel.hidden=i!==currentSkill);
  if(user){manualSkill=true;stopSkillTimer()}
  else scheduleSkillTimer();
}
function stopSkillTimer(){clearTimeout(skillTimer);skillTimer=null;$(".skill-tabs").classList.remove("is-autoplay")}
function canAutoSkill(){return skillVisible&&!skillHover&&!skillFocus&&!manualSkill&&!reduced.matches&&document.visibilityState==="visible"}
function scheduleSkillTimer(){
  stopSkillTimer();
  if(!canAutoSkill())return;
  void $(".skill-tabs").offsetWidth;
  $(".skill-tabs").classList.add("is-autoplay");
  skillTimer=setTimeout(()=>activateSkill(currentSkill+1),7000);
}
