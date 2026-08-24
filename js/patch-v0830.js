/* B7 FI Command Center v0.80.33 — tool-photo bay + final live spacing support. */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'0.80.33';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function setVersion(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const label=$('#appVersionLabel');
  if(label) label.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function normalizePhotoBay(root=document){
  $$('.v802-tool-visual',root).forEach(visual=>{
    const img=$('img',visual);
    if(!img)return;
    const src=String(img.getAttribute('src')||img.src||'').toLowerCase();
    const fallback=src.includes('kla-plus-official.png');
    visual.classList.toggle('v830-photo-fallback',fallback);
    let ph=$('.v830-tool-photo-placeholder',visual);
    if(fallback){
      if(!ph){ph=document.createElement('div');ph.className='v830-tool-photo-placeholder';ph.textContent='TOOL PHOTO';visual.appendChild(ph)}
    }else if(ph){ph.remove()}
  });
}
function apply(){setVersion();normalizePhotoBay()}
const prior=window.setView;
if(typeof prior==='function') window.setView=function(){const r=prior.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,120);return r};
document.addEventListener('b7fi:live-tool-change',()=>setTimeout(()=>normalizePhotoBay(),0));
function startup(){apply();setTimeout(apply,80);setTimeout(apply,300)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
