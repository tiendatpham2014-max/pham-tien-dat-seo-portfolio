function getSceneState(items){
  const focus=window.innerHeight*.56;
  const centers=items.map(item=>{const rect=item.getBoundingClientRect();return rect.top+rect.height/2});
  let progress=0;
  for(let index=0;index<centers.length-1;index++){
    const portion=Math.max(0,Math.min(1,(focus-centers[index])/(centers[index+1]-centers[index])));
    if(focus>=centers[index])progress=(index+portion)/(centers.length-1);
  }
  if(focus>=centers.at(-1))progress=1;
  const active=centers.reduce((best,center,index)=>Math.abs(center-focus)<Math.abs(centers[best]-focus)?index:best,0);
  return{progress,active};
}
const careerStages=$$(".career-stage"),evidenceSteps=$$(".evidence-chapters article");
function getCareerState(){
  const rect=$("#journey").getBoundingClientRect();
  const travel=Math.max(1,rect.height-window.innerHeight);
  const progress=Math.max(0,Math.min(1,-rect.top/travel));
  return{progress,active:Math.round(progress*(careerStages.length-1))};
}
function updateScenes(){
  updateActiveSection();
  const career=getCareerState();
  const journey=$("#journey"),route=$(".career-route");
  journey.style.setProperty("--career-progress",career.progress.toFixed(4));
  route.style.setProperty("--career-progress",career.progress.toFixed(4));
  const orbitX=(45+70*career.progress)/160;
  route.style.setProperty("--sun-y",(75+70*(1-Math.sqrt(1-(2*orbitX-1)**2))).toFixed(2)+"%");
  careerStages.forEach((stage,index)=>stage.classList.toggle("is-current",index===career.active));
  const evidence=getSceneState(evidenceSteps);
  evidenceSteps.forEach((step,index)=>step.classList.toggle("is-current",index===evidence.active));
  $$("[data-evidence-card]").forEach((card,index)=>card.classList.toggle("is-current",index===evidence.active));
  $("#evidence-count").textContent=String(evidence.active+1).padStart(2,"0")+" / 03";
  updateSearchScene();
}
let sceneFrame=null;
function scheduleSceneUpdate(){
  if(sceneFrame!==null)return;
  sceneFrame=requestAnimationFrame(()=>{sceneFrame=null;updateScenes()});
}
