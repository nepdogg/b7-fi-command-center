/* B7 FI Command Center v0.56.0 — Centered KLA Header + Final Center Palette */
(function(){
'use strict';
window.VERSION='0.56.0';
const COLORS={
 home:['OPERATIONS CENTER','#B88920','184,137,32'],
 toolcenter:['TOOL CENTER','#7C4DFF','124,77,255'],
 shipping:['SHIPPING CENTER','#20B86A','32,184,106'],
 priorities:['PRIORITY CENTER','#3478F6','52,120,246'],
 statuscenter:['STATUS CENTER','#F28C28','242,140,40'],
 meetingcenter:['MEETING CENTER','#20B8D8','32,184,216'],
 actions:['ACTION CENTER','#E5484D','229,72,77'],
 referencecenter:['REFERENCE CENTER','#E052A0','224,82,160'],
 admincenter:['ADMINISTRATION CENTER','#A7AFBA','167,175,186']
};
function headerStructure(){
 const lock=document.querySelector('.header-lockup'); if(!lock)return;
 const brand=lock.querySelector('.kla-brand-block'), app=lock.querySelector('.header-app-name'), page=lock.querySelector('.header-page-lockup');
 if(app&&brand&&page && lock.firstElementChild!==app){ lock.append(app,brand,page); }
}
function palette(){
 const th=document.body.dataset.theme||'home', m=COLORS[th]||COLORS.home;
 document.documentElement.style.setProperty('--accent',m[1]);document.documentElement.style.setProperty('--accent-rgb',m[2]);
 document.body.style.setProperty('--accent',m[1]);document.body.style.setProperty('--accent-rgb',m[2]);
 ['--live-page-accent','--fleet-accent'].forEach(k=>document.body.style.setProperty(k,m[1]));
 ['--live-page-rgb','--fleet-rgb'].forEach(k=>document.body.style.setProperty(k,m[2]));
 const t=document.getElementById('headerPageTitle');if(t)t.textContent=m[0];
 const s=document.getElementById('headerPageSub');if(s)s.textContent='';
 const ver=document.getElementById('appVersionLabel');if(ver)ver.textContent='B7 FI Command Center v0.56.0';
}
function homeCards(){
 if(document.body.dataset.theme!=='home')return;
 document.querySelectorAll('.home-card550').forEach(card=>{
   const d=card.dataset.dest550||'';
   const map={toolcenter:'toolcenter',actions:'actions',shipping:'shipping',priorities:'priorities',statuscenter:'statuscenter',meetingcenter:'meetingcenter',referencecenter:'referencecenter','admin-wall':'admincenter','admin-data':'admincenter'};
   const key=map[d]||'home', c=COLORS[key]; card.style.setProperty('--card-accent',c[1]);card.style.setProperty('--card-rgb',c[2]);
   if(d==='toolcenter'){
     const label=card.querySelector('span'); if(label)label.textContent='TOOL CENTER';
     const open=card.querySelector('b'); if(open)open.textContent='OPEN TOOL CENTER →';
   }
 });
}
function sync(){headerStructure();palette();homeCards();}
const old=window.setView;
window.setView=function(v){const r=old(v);setTimeout(sync,0);setTimeout(sync,80);return r};
new MutationObserver(()=>{clearTimeout(window.__v560);window.__v560=setTimeout(sync,0)}).observe(document.body,{attributes:true,childList:true,subtree:true,attributeFilter:['data-theme']});
setTimeout(sync,50);setTimeout(sync,180);
})();
