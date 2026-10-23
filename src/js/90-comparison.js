function updateComparison(){
  const slider=$("#compare-slider"),value=Number(slider.value);
  $("#compare-wipe").style.setProperty("--split",value+"%");
  slider.setAttribute("aria-valuetext",language==="vi"?(100-value)+"% kỳ trước, "+value+"% kỳ sau":(100-value)+"% earlier period, "+value+"% later period");
}
