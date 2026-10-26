let currentSignal=0;

function renderSignal(){
  const lab=$(".signal-lab");
  const steps=$$("[data-signal-step]");
  lab.style.setProperty("--signal-progress",String(currentSignal/(steps.length-1)));
  steps.forEach((button,index)=>{
    button.setAttribute("aria-pressed",String(index===currentSignal));
  });
  $$(".signal-flow span").forEach((node,index)=>node.classList.toggle("is-active",index===currentSignal));
  $("#signal-count").textContent=String(currentSignal+1).padStart(2,"0")+" / "+String(steps.length).padStart(2,"0");
  $("#signal-detail").textContent=copy[language].signalDetails[currentSignal];
}

function initSignalLab(){
  const steps=$$("[data-signal-step]");
  steps.forEach((button,index)=>{
    button.addEventListener("click",()=>{
      currentSignal=index;
      renderSignal();
    });
  });
  $("#signal-next").addEventListener("click",()=>{
    currentSignal=(currentSignal+1)%steps.length;
    renderSignal();
  });
  renderSignal();
}
