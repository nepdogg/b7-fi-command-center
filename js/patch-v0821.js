/* B7 FI Command Center v0.80.21 — status placement / duplicate-container cleanup only */
(function(){
'use strict';
const VERSION='0.80.21';
const $=(s,r=document)=>r.querySelector(s);

function version(){
  const viewer=document.body?.dataset?.liveViewerOnly==='true';
  document.title=viewer?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const label=$('#appVersionLabel');
  if(label) label.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}

function cleanLiveMount(){
  if(!document.body.classList.contains('v802-live-status')) return;
  const mount=$('#v802StatusMount');
  const stack=$('#b7StatusStack');
  if(!mount||!stack) return;
  if(stack.parentElement!==mount) mount.appendChild(stack);
  /* The mount is status-only. Remove stale generated/legacy children instead of letting
     them reserve two blank bar rows. The globally-retained legacy IDs may be recreated
     later by old code, so only remove nodes currently inside this live-only mount. */
  Array.from(mount.children).forEach(node=>{
    if(node!==stack) node.remove();
  });
  const exit=$('#v802Exit');
  if(document.body?.dataset?.liveViewerOnly==='true' && exit) exit.remove();
}

function cleanCommandMount(){
  if(document.body.classList.contains('v802-live-status')) return;
  const host=$('.sticky-header .header-status-stack');
  const stack=$('#b7StatusStack');
  const toolbar=$('#floatingActions');
  if(!host||!stack) return;
  /* Physically enforce the framework order, not just CSS order. */
  if(stack.parentElement!==host) host.appendChild(stack);
  if(toolbar && toolbar.parentElement===host){
    host.insertBefore(stack,toolbar);
  }else if(host.firstElementChild!==stack){
    host.prepend(stack);
  }
}

function place(){
  version();
  if(document.body.classList.contains('v802-live-status')) cleanLiveMount();
  else cleanCommandMount();
}

/* Wrap navigation once so every Center route restores the same status location. */
const prior=window.setView;
if(typeof prior==='function' && !prior.__v821){
  const wrapped=function(){
    const out=prior.apply(this,arguments);
    requestAnimationFrame(place);
    setTimeout(place,40);
    return out;
  };
  wrapped.__v821=true;
  window.setView=wrapped;
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{
  place();
  setTimeout(place,100);
},{once:true});
else { place(); setTimeout(place,100); }

/* Live Status is rebuilt when entering the view; give that render one bounded placement pass. */
document.addEventListener('click',e=>{
  if(e.target.closest('[data-view="livestatus"],[data-view="live-status"]')){
    setTimeout(place,80);
  }
});

window.B7StatusPlacement821={place,cleanLiveMount,cleanCommandMount};
})();
