/* B7 FI Command Center v0.80.8 — shared Live Status + dedicated viewer-only entry.
   The normal Operations Center Live Status remains an in-app read-only view.
   live-status-view.html boots directly into the same display with no route back to editing screens. */
(function(){
'use strict';
const VERSION='0.80.8';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s);
const viewerOnly=document.body && document.body.dataset.liveViewerOnly==='true';

function syncVersion(){
  const label=$('#appVersionLabel');
  if(label)label.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
  if(!viewerOnly)document.title=`B7 FI Command Center v${VERSION}`;
}

/* Last wrapper in the chain: preserve existing Center behavior but make the
   application version come from one final source after every internal navigation. */
const inheritedSetView=window.setView;
window.setView=function(v){
  if(viewerOnly && v!=='livestatus' && v!=='live-status')v='livestatus';
  const result=inheritedSetView?inheritedSetView(v):undefined;
  requestAnimationFrame(()=>{
    syncVersion();
    if(viewerOnly)lockViewer();
  });
  return result;
};

function lockViewer(){
  if(!viewerOnly)return;
  document.body.classList.add('v808-viewer-only');
  const exit=$('#v802Exit');
  if(exit)exit.remove();
  document.title='B7 FI Live Status';
  /* Keep a direct viewer refresh on Live Status instead of the Command Center. */
  if(!document.body.classList.contains('v802-live-status') && inheritedSetView){
    inheritedSetView('livestatus');
    requestAnimationFrame(()=>{const e=$('#v802Exit');if(e)e.remove()});
  }
}

function startup(){
  syncVersion();
  if(viewerOnly){
    document.body.classList.add('v808-viewer-only');
    if(inheritedSetView)inheritedSetView('livestatus');
    requestAnimationFrame(lockViewer);
    setTimeout(lockViewer,120);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
