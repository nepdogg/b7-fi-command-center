/* B7 FI Command Center v0.80.33 — final Operations/Live Status edge + toolbar lock. */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'0.80.33';
const $=(s,r=document)=>r.querySelector(s);
function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function stamp(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel'); if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function lockOperationsToolbar(){
  if(document.body?.dataset?.center!=='home')return;
  const bar=$('#floatingActions'); if(!bar)return;
  bar.classList.add('v832-page-nav-lock');
  const open=$('#v826OpenCurrentTool',bar), shot=$('#v825Screenshot',bar), report=$('#v825Report',bar);
  if(open){open.style.setProperty('order','1','important');open.style.setProperty('margin-right','auto','important');open.style.setProperty('margin-left','0','important')}
  if(shot){shot.style.setProperty('order','90','important');shot.style.setProperty('margin-left','0','important')}
  if(report){report.style.setProperty('order','91','important');report.style.setProperty('margin-left','0','important')}
}
function apply(){stamp();lockOperationsToolbar()}
const prior=window.setView;
if(typeof prior==='function')window.setView=function(){const r=prior.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,120);return r};
document.addEventListener('b7fi:live-tool-change',()=>setTimeout(lockOperationsToolbar,0));
function startup(){apply();setTimeout(apply,100);setTimeout(apply,350)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
