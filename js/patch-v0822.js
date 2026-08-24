/* B7 FI Command Center v0.80.22 — placement, Live Status parity, Tool editor recovery */
(function(){
'use strict';
const VERSION='0.80.22';
const $=(s,r=document)=>r.querySelector(s);

function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function setVersion(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const label=$('#appVersionLabel');
  if(label) label.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}

/* Do not touch alert queues/content. Only enforce where the already-working
   permanent v0.80.20 status shell lives and remove legacy status placeholders. */
function placeStatus(){
  const stack=$('#b7StatusStack');
  if(!stack){setVersion();return}
  if(document.body.classList.contains('v802-live-status')){
    const mount=$('#v802StatusMount');
    if(mount && stack.parentElement!==mount) mount.appendChild(stack);
    if(mount){
      Array.from(mount.children).forEach(node=>{
        if(node!==stack){
          node.style.setProperty('display','none','important');
          node.style.setProperty('height','0','important');
          node.style.setProperty('min-height','0','important');
        }
      });
    }
    if(viewerOnly()) $('#v802Exit')?.remove();
  }else{
    const header=$('.sticky-header');
    const nav=$('.sticky-header>.main-nav');
    if(header && nav){
      if(stack.parentElement!==header || stack.previousElementSibling!==nav){
        nav.insertAdjacentElement('afterend',stack);
      }
    }
  }
  setVersion();
}

/* Restore the complete Tool editor navigation that an older focused-editor
   layer hides. The actual editor/checklist workflow remains the original
   working toolAdmin implementation; this only restores access to its tabs. */
function restoreToolEditor(){
  if(!document.body.classList.contains('v61-focused-editor') || document.body.dataset.center!=='tool') return;
  const tabs=$('#app .admin-tabs');
  if(tabs){
    tabs.style.setProperty('display','flex','important');
    tabs.style.setProperty('position','relative','important');
    tabs.style.setProperty('top','auto','important');
  }
}

function settle(){placeStatus();restoreToolEditor()}

/* Wrap navigation/tool editing only for bounded post-render placement. No
   observers and no recurring interval are introduced. */
const priorSetView=window.setView;
if(typeof priorSetView==='function' && !priorSetView.__v822){
  const wrapped=function(){
    const out=priorSetView.apply(this,arguments);
    requestAnimationFrame(settle);
    setTimeout(settle,60);
    return out;
  };
  wrapped.__v822=true;
  window.setView=wrapped;
}

const priorToolAdmin=window.toolAdmin;
if(typeof priorToolAdmin==='function' && !priorToolAdmin.__v822){
  const wrappedTool=function(){
    const out=priorToolAdmin.apply(this,arguments);
    requestAnimationFrame(settle);
    setTimeout(settle,50);
    return out;
  };
  wrappedTool.__v822=true;
  window.toolAdmin=wrappedTool;
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',()=>{settle();setTimeout(settle,120)},{once:true});
}else{
  settle();setTimeout(settle,120);
}

/* Live Status is built after routing; one bounded pass after opening it is
   enough to align the shared status component with the viewer shell. */
document.addEventListener('click',e=>{
  if(e.target.closest('[data-view="livestatus"],[data-view="live-status"],#v802Exit')){
    setTimeout(settle,90);
  }
});

window.B7StatusPlacement822={settle,placeStatus,restoreToolEditor};
})();
