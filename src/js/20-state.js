const sections=["work","process","skills","writing","journey","contact"];
let language="vi",currentMetric="clicks",currentSkill=0,manualSkill=false,skillTimer=null,skillVisible=false,skillHover=false,skillFocus=false,menuOpen=false;
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
const $=selector=>document.querySelector(selector);
const $$=selector=>Array.from(document.querySelectorAll(selector));
