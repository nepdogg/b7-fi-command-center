/* B7 FI Command Center v0.80.33 — final status placement/parity guard */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'0.80.33';
const $=(s,r=document)=>r.querySelector(s);
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
function setVersion(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel'); if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function placeStatus(){
  const stack=$('#b7StatusStack'); if(!stack){setVersion();return;}
  if(document.body.classList.contains('v802-live-status')){
    const mount=$('#v802StatusMount');
    if(mount && stack.parentElement!==mount) mount.appendChild(stack);
    if(viewerOnly()) $('#v802Exit')?.remove();
  }else{
    const header=$('.sticky-header'), nav=$('.sticky-header>.main-nav');
    if(header&&nav&&(stack.parentElement!==header||stack.previousElementSibling!==nav)){
      nav.insertAdjacentElement('afterend',stack);
    }
  }
  setVersion();
}
function settle(){placeStatus();}
/* Bounded post-render correction only. Rotation itself now mounts to the same locations
   in patch-v0820, so no observer/interval is needed. */
const prior=window.setView;
if(typeof prior==='function'&&!prior.__v823){
  const wrapped=function(){const out=prior.apply(this,arguments);requestAnimationFrame(settle);setTimeout(settle,70);return out};
  wrapped.__v823=true;window.setView=wrapped;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{settle();setTimeout(settle,140)},{once:true});
else {settle();setTimeout(settle,140)}
document.addEventListener('click',e=>{if(e.target.closest('[data-view="livestatus"],[data-view="live-status"],#v802Exit'))setTimeout(settle,100)});
window.B7StatusPlacement823={settle,placeStatus};
})();
