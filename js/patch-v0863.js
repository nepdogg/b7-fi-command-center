/* B7 FI Command Center v0.80.63 — Operations Center finalization + navigation stabilization.
   No Lead Alerts/System Status behavior is modified here. */
(function(){'use strict';
const VERSION='0.80.63';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function stamp(){
  const live=document.body?.dataset?.liveViewerOnly==='true';
  document.title=live?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
/* Earlier stabilization builds temporarily created a second visible toolbar. Keep v0.80.60's
   #floatingActions as the single page-navigation/action authority on every Center. */
function killDuplicateToolbar(){
  const duplicate=$('#b7PageToolbar');
  if(duplicate){duplicate.setAttribute('aria-hidden','true');duplicate.style.setProperty('display','none','important')}
}
function normalizeToolbar(){
  killDuplicateToolbar();
  const bar=$('#floatingActions');if(!bar)return;
  /* v0.80.60 will populate v860-left/right. If an older patch writes into the bar again,
     ask the latest route/render authority to settle it without creating another writer. */
  if(!bar.querySelector('.v860-left')&&!bar.querySelector('.v855-left')){
    try{window.dispatchEvent(new Event('resize'))}catch(e){}
  }
}
function updateCenterLabels(){
  const n=$('.main-nav [data-view="toolcenter"]');if(n)n.textContent='UPDATE CENTER';
}
let observer=null;
function watch(){
  observer?.disconnect();
  observer=new MutationObserver(()=>queueMicrotask(()=>{killDuplicateToolbar();updateCenterLabels()}));
  observer.observe(document.body,{childList:true,subtree:true});
}
function boot(){
  stamp();killDuplicateToolbar();updateCenterLabels();watch();
  [80,250,700].forEach(ms=>setTimeout(()=>{stamp();killDuplicateToolbar();updateCenterLabels()},ms));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
