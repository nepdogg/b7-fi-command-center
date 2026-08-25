/* B7 FI Command Center v0.80.11 — standalone Live Status viewer route lock.
   The viewer-only entry is a dedicated display. Once loaded, legacy Command Center
   startup/navigation code is not allowed to route it back to a normal Center.
   No MutationObserver, interval, or recurring polling is used. */
(function(){
'use strict';
const VERSION='0.80.11';
window.VERSION=VERSION;
const viewerOnly=document.body && document.body.dataset.liveViewerOnly==='true';
if(!viewerOnly)return;
const $=(s,r=document)=>r.querySelector(s);
let booted=false;
let rendering=false;

function normalizeViewer(){
  document.title='B7 FI Live Status';
  document.body.classList.add('v808-viewer-only');
  const exit=$('#v802Exit');
  if(exit)exit.remove();
  const lead=$('#topActionBar');
  const system=$('#operationsBar');
  const mount=$('#v802StatusMount');
  if(mount){
    if(lead && lead.parentElement!==mount)mount.appendChild(lead);
    if(system && system.parentElement!==mount)mount.appendChild(system);
    if(lead && system && lead.nextElementSibling!==system)mount.insertBefore(lead,system);
  }
  const leadTitle=lead?.querySelector('.v72-beacon-title,.v70-action-beacon b,.v70-action-beacon strong,.v66-action-status-label strong,.v69-action-status-label strong');
  const sysTitle=system?.querySelector('.v72-beacon-title,.v65-fleet-label b,.v65-fleet-label strong,.ops-ticker-label');
  if(leadTitle)leadTitle.textContent='LEAD ALERTS';
  if(sysTitle)sysTitle.textContent='SYSTEM STATUS';
}

/* Capture the complete renderer chain only after every prior patch has loaded. */
const liveRenderer=window.setView;
if(typeof liveRenderer!=='function')return;

function forceLive(){
  if(rendering)return;
  rendering=true;
  try{
    liveRenderer.call(window,'livestatus');
    booted=true;
    normalizeViewer();
  } finally {
    rendering=false;
  }
}

/* Viewer-only page has one legal route. This prevents delayed legacy startup code
   from calling home/operations and moving SYSTEM STATUS back into the hidden shell. */
window.setView=function(v){
  const key=String(v||'').toLowerCase();
  if(!booted || key==='livestatus' || key==='live-status'){
    forceLive();
    return;
  }
  normalizeViewer();
};

/* Block legacy main-navigation clicks if hidden shell controls are ever reached. */
document.addEventListener('click',function(e){
  if(e.target.closest('.main-nav,.v57-live-card,#administrationCenterFooter')){
    e.preventDefault();
    e.stopImmediatePropagation();
  }
},true);

function start(){
  forceLive();
  requestAnimationFrame(normalizeViewer);
  setTimeout(normalizeViewer,120);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
})();
