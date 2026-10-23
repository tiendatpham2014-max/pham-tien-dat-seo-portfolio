const searchScene=$("#search-scene"),searchWords=$$("[data-scene-word]"),searchDescriptions=$$("[data-scene-description]");
function updateSearchScene(){
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const bounds=searchScene.getBoundingClientRect();
  const distance=Math.max(1,bounds.height-window.innerHeight);
  const progress=Math.max(0,Math.min(1,-bounds.top/distance));
  const phase=progress*2;
  const active=Math.max(0,Math.min(2,Math.round(phase)));
  searchWords.forEach((word,index)=>{
    const delta=index-phase;
    const magnitude=Math.abs(delta);
    word.style.opacity=String(Math.max(0,1-magnitude*1.25));
    word.style.transform=`translate3d(${(delta*17).toFixed(2)}vw,${(delta*6).toFixed(2)}vh,0) scale(${Math.max(.82,1-magnitude*.12).toFixed(3)})`;
    word.classList.toggle("is-current",index===active);
  });
  searchDescriptions.forEach((description,index)=>description.classList.toggle("is-current",index===active));
  $("#search-scene-count").textContent=String(active+1).padStart(2,"0")+" / 03";
  $(".search-scene-rule i").style.width=(progress*100).toFixed(1)+"%";
}
