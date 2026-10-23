function formatMetric(value,unit){
  const locale=language==="vi"?"vi-VN":"en-US";
  if(unit==="integer")return new Intl.NumberFormat(locale).format(value);
  if(unit==="percent")return new Intl.NumberFormat(locale,{minimumFractionDigits:2,maximumFractionDigits:2}).format(value)+"%";
  return new Intl.NumberFormat(locale,{minimumFractionDigits:1,maximumFractionDigits:1}).format(value);
}
function renderMetric(){
  const item=metricData[currentMetric];
  $("#metric-title").textContent=item.title[language];
  $("#metric-before").textContent=formatMetric(item.before,item.unit);
  $("#metric-after").textContent=formatMetric(item.after,item.unit);
  $("#meter-before").style.width=item.beforeWidth+"%";
  $("#meter-after").style.width=item.afterWidth+"%";
  $("#metric-reading").textContent=item.reading[language];
  $$("[data-metric]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.metric===currentMetric)));
}
