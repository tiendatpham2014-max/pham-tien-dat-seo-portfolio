let currentSignal=0;

function renderSignal(animate=false){
  const lab=$(".signal-lab");
  const steps=$$("[data-signal-step]");
  lab.style.setProperty("--signal-progress",String(currentSignal/(steps.length-1)));
  lab.dataset.signalPhase=String(currentSignal);
  steps.forEach((button,index)=>{
    button.setAttribute("aria-pressed",String(index===currentSignal));
  });
  $$(".signal-flow span").forEach((node,index)=>node.classList.toggle("is-active",index===currentSignal));
  const index=String(currentSignal+1).padStart(2,"0");
  $("#signal-count").textContent=index+" / "+String(steps.length).padStart(2,"0");
  $("#signal-index").textContent=index;
  $("#signal-question").textContent=copy[language].signalQuestions[currentSignal];
  $("#signal-detail").textContent=copy[language].signalDetails[currentSignal];
  $("#signal-outcome").textContent=copy[language].signalOutcomes[currentSignal];
  if(animate&&window.matchMedia("(prefers-reduced-motion: no-preference)").matches){
    $$("#signal-question,#signal-detail,#signal-outcome").forEach((node,order)=>{
      node.animate([{opacity:.2,transform:"translateY(9px)"},{opacity:1,transform:"translateY(0)"}],{duration:330+order*70,easing:"cubic-bezier(.2,.8,.2,1)"});
    });
  }
}

function initSignalLab(){
  const steps=$$("[data-signal-step]");
  steps.forEach((button,index)=>{
    button.addEventListener("click",()=>{
      currentSignal=index;
      renderSignal(true);
    });
  });
  $("#signal-next").addEventListener("click",()=>{
    currentSignal=(currentSignal+1)%steps.length;
    renderSignal(true);
  });
  renderSignal();
}
