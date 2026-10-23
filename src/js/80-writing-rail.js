function updateRail(){
  const rail=$("#article-rail"),cards=$$(".article-card");
  const nearest=cards.reduce((best,card,index)=>Math.abs(card.offsetLeft-rail.offsetLeft-rail.scrollLeft)<Math.abs(cards[best].offsetLeft-rail.offsetLeft-rail.scrollLeft)?index:best,0);
  $("#rail-status").textContent=(nearest+1)+" / "+cards.length;
  $("#rail-prev").disabled=rail.scrollLeft<5;
  $("#rail-next").disabled=rail.scrollLeft>=rail.scrollWidth-rail.clientWidth-5;
}
function moveRail(direction){
  const rail=$("#article-rail"),card=$(".article-card"),gap=parseFloat(getComputedStyle(rail).gap)||0;
  rail.scrollBy({left:direction*(card.getBoundingClientRect().width+gap),behavior:reduced.matches?"instant":"smooth"});
}
