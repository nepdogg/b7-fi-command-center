/* B7 FI Command Center v0.80.64 — Operations responsiveness hotfix.
   Fixes v0.80.63 navigation MutationObserver render loop.
   No Lead Alerts/System Status behavior is modified here. */
(function(){'use strict';
const VERSION='0.80.64';
const $=(s,r=document)=>r.querySelector(s);
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function stamp(){
  const live=document.body?.dataset?.liveViewerOnly==='true';
  const wanted=live?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  if(document.title!==wanted) document.title=wanted;
  const v=$('#appVersionLabel');
  const label=`B7 FI COMMAND CENTER V${VERSION}`;
  if(v && v.textContent!==label) v.textContent=label;
}
function killDuplicateToolbar(){
  const duplicate=$('#b7PageToolbar');
  if(!duplicate)return;
  if(duplicate.getAttribute('aria-hidden')!=='true') duplicate.setAttribute('aria-hidden','true');
  if(duplicate.style.getPropertyValue('display')!=='none' || duplicate.style.getPropertyPriority('display')!=='important'){
    duplicate.style.setProperty('display','none','important');
  }
}
function updateCenterLabels(){
  const n=$('.main-nav [data-view="toolcenter"]');
  if(n && n.textContent.trim()!=='UPDATE CENTER') n.textContent='UPDATE CENTER';
}
function settle(){stamp();killDuplicateToolbar();updateCenterLabels();}
let queued=false;
function queueSettle(){
  if(queued)return; queued=true;
  requestAnimationFrame(()=>{queued=false;settle();});
}
function boot(){
  settle();
  /* Route/navigation changes can rebuild the header. Re-check only on real user/route events.
     Do not observe the entire DOM: v0.80.63 did that and could repeatedly mutate its own label. */
  window.addEventListener('hashchange',queueSettle,{passive:true});
  window.addEventListener('popstate',queueSettle,{passive:true});
  document.addEventListener('click',()=>setTimeout(queueSettle,0),{passive:true});
  [120,450,1200].forEach(ms=>setTimeout(settle,ms));
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
