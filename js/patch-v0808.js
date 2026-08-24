/* B7 FI Command Center v0.80.33 — standalone Live Status viewer boot.
   Viewer-only entry uses the exact same Live Status renderer as the Command Center,
   but boots it ONCE and removes only the Return control. No delayed rerender/re-parent pass. */
(function(){
'use strict';
const viewerOnly=document.body && document.body.dataset.liveViewerOnly==='true';
if(!viewerOnly)return;

function viewerBoot(){
  document.body.classList.add('v808-viewer-only');
  document.title='B7 FI Live Status';
  /* Call the FINAL setView wrapper after every script has loaded. This renders the
     shared Lead Alerts + System Status stack once and prevents a second render from
     deleting the already re-parented status bars. */
  if(typeof window.setView==='function' && !document.body.classList.contains('v802-live-status')){
    window.setView('livestatus');
  }
  requestAnimationFrame(()=>{
    const exit=document.getElementById('v802Exit');
    if(exit)exit.remove();
  });
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',viewerBoot,{once:true});
else queueMicrotask(viewerBoot);
})();
