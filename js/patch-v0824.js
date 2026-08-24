/* B7 FI Command Center v0.80.24 — final frame/layout guard */
(function(){
'use strict';
const VERSION='0.80.24';
const $=(s,r=document)=>r.querySelector(s);
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
function normalize(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const label=$('#appVersionLabel'); if(label) label.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
  if(!document.body.classList.contains('v802-live-status')){
    const header=$('.sticky-header'), nav=$('.sticky-header>.main-nav'), stack=$('#b7StatusStack');
    if(header&&nav&&stack&&(stack.parentElement!==header||stack.previousElementSibling!==nav)) nav.insertAdjacentElement('afterend',stack);
    const hs=$('.sticky-header>.header-status-stack');
    if(hs){
      const legacyA=$('#topActionBar'),legacyS=$('#operationsBar');
      if(legacyA&&legacyA.parentElement!==hs) hs.prepend(legacyA);
      if(legacyS&&legacyS.parentElement!==hs) hs.insertBefore(legacyS,$('#floatingActions'));
    }
  }
}
const prior=window.setView;
if(typeof prior==='function'&&!prior.__v824){
  const wrapped=function(){const out=prior.apply(this,arguments);requestAnimationFrame(normalize);setTimeout(normalize,80);return out};
  wrapped.__v824=true;window.setView=wrapped;
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{normalize();setTimeout(normalize,140)},{once:true});
else {normalize();setTimeout(normalize,140)}
window.B7Frame824={normalize};
})();
