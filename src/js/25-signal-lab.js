let currentSignal=0;

function renderSignal(){
  const lab=$(".signal-lab");
  lab.style.setProperty("--signal-progress",String(currentSignal/2));
  $$("[data-signal-step]").forEach((button,index)=>{
    button.setAttribute("aria-pressed",String(index===currentSignal));
  });
  $$(".signal-flow span").forEach((node,index)=>node.classList.toggle("is-active",index===currentSignal));
  $("#signal-detail").textContent=copy[language].signalDetails[currentSignal];
}

function initSignalLab(){
  $$("[data-signal-step]").forEach((button,index)=>{
    button.addEventListener("click",()=>{
      currentSignal=index;
      renderSignal();
    });
  });
  renderSignal();
}
