function setLanguage(next){
  if(!copy[next])return;
  language=next;
  document.documentElement.lang=next;
  document.title=next==="vi"?"Phạm Tiến Đạt — SEO Executive":"Dat Pham — SEO Executive";
  $('meta[name="description"]').content=next==="vi"?"Phạm Tiến Đạt — SEO Executive. Tư duy về search intent, nội dung, dữ liệu GSC và các bài viết đã xuất bản.":"Dat Pham — SEO Executive. Search intent, content, GSC evidence and published writing.";
  $$("[data-i18n]").forEach(element=>{const value=copy[next][element.dataset.i18n];if(value!==undefined)element.textContent=value});
  $$("[data-lang]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.lang===next)));
  $("#menu-toggle").setAttribute("aria-label",copy[next][menuOpen?"menuClose":"menuOpen"]);
  $(".brand").setAttribute("aria-label",(next==="vi"?"Phạm Tiến Đạt — đầu trang":"Dat Pham — home"));
  $(".insight-row").setAttribute("aria-label",(next==="vi"?"Các câu hỏi trong công việc SEO":"Questions I ask in SEO work"));
  $(".signal-lab").setAttribute("aria-label",copy[next].signalAria);
  $(".signal-steps").setAttribute("aria-label",copy[next].signalStepsAria);
  renderSignal();
  $("#desktop-nav").setAttribute("aria-label",copy[next].navigation);
  $("#mobile-nav").setAttribute("aria-label",copy[next].mobileNavigation);
  $(".metric-picker").setAttribute("aria-label",copy[next].metricsLabel);
  $("#compare-slider").setAttribute("aria-label",copy[next].compareSlider);
  updateComparison();
  $(".skill-tabs").setAttribute("aria-label",copy[next].skillsTablist);
  $("#rail-prev").setAttribute("aria-label",copy[next].railPrev);
  $("#rail-next").setAttribute("aria-label",copy[next].railNext);
  $$("[data-value]").forEach(element=>element.textContent=formatMetric(Number(element.dataset.value),"integer"));
  $$("[data-percent]").forEach(element=>element.textContent=formatMetric(Number(element.dataset.percent),"percent"));
  $$("[data-decimal]").forEach(element=>element.textContent=formatMetric(Number(element.dataset.decimal),"decimal"));
  const storyValues=next==="vi"?["+27,1%","−5,0%","+0,34"]:["+27.1%","−5.0%","+0.34"];
  $$(".evidence-card strong").forEach((element,index)=>element.textContent=storyValues[index]);
  renderMetric();
  updateScenes();
  requestAnimationFrame(positionIndicator);
  try{localStorage.setItem("dat-seo-language",next)}catch{}
}
