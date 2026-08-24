/* B7 FI Command Center v0.80.26 — Operations Center cleanup + contextual tool navigation.
   - Operations Center toolbar becomes contextual navigation, not generic Page Actions.
   - Current rotating system becomes a real navigation button that follows the carousel.
   - Remove visible alert queue diagnostics from normal Action Center use.
   - Put active quarter on the Active Tools card; remove redundant CYxxQx / LIVE OPERATIONS strip.
*/
(function(){
'use strict';
const VERSION='0.80.26';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';

function setVersion(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function activeQuarter(){
  try{if(typeof window.B7ActiveQuarter==='function')return window.B7ActiveQuarter()}catch(e){}
  const d=new Date(),q=Math.floor(d.getMonth()/3)+1;return `CY${String(d.getFullYear()).slice(-2)}Q${q}`;
}
function currentTool(){try{return window.B7LiveStatusCore?.currentTool?.()||null}catch(e){return null}}
function currentId(){const t=currentTool();return t?.utid||t?.id||'—'}
function openCurrentTool(){
  const t=currentTool();if(!t)return;
  try{
    if(typeof window.B7LiveStatusCore?.openToolModal==='function'){
      window.B7LiveStatusCore.openToolModal(t);return;
    }
  }catch(e){}
  /* Fallback: go to Tool Center and select/edit this system if the legacy app exposes that route. */
  try{window.setView?.('toolcenter')}catch(e){}
}
function styleOperationsToolbar(){
  if(document.body.dataset.center!=='home')return;
  const bar=$('#floatingActions');if(!bar)return;
  bar.classList.add('v826-operations-toolbar');
  let btn=$('#v826OpenCurrentTool');
  if(!btn){
    btn=document.createElement('button');
    btn.type='button';btn.id='v826OpenCurrentTool';btn.className='btn v826-current-tool-btn';
    btn.addEventListener('click',openCurrentTool);
    bar.prepend(btn);
  }
  btn.textContent=`OPEN TOOL ${currentId()}`;
  /* Remove the old non-interactive label from v0.80.25 if it is still present. */
  $('#v825CurrentSystem')?.remove();
  /* Keep screenshot/report controls, but the toolbar is now contextual navigation, not PAGE ACTIONS. */
  const shot=$('#v825Screenshot'),report=$('#v825Report');
  if(shot)shot.classList.add('v826-context-action');
  if(report)report.classList.add('v826-context-action');
}
function updateOpsLabels(){
  if(document.body.dataset.center!=='home')return;
  styleOperationsToolbar();
  const metrics=$$('.v825-operations-live .v802-live-metric');
  if(metrics[0]){
    const s=metrics[0].querySelector('span');if(s)s.textContent=`${activeQuarter()} ACTIVE TOOLS`;
  }
  $('.v825-quarter-strip')?.remove();
}
function removeDiagnostics(){
  ['#v817QueueDiag','#v819QueueDiag','#b7xQueueDiag','.v819-queue-diag','.v817-queue-diag','.b7x-queue-diag'].forEach(sel=>$$ (sel).forEach(el=>el.remove()));
  /* Defensive cleanup for duplicated diagnostic rows inserted after the summary grid. */
  $$('.action-summary-grid + div').forEach(el=>{
    if(/ACTIVE LEAD ALERTS\s*:/i.test(el.textContent||''))el.remove();
  });
}
function afterRender(){
  setVersion();removeDiagnostics();
  if(document.body.dataset.center==='home')updateOpsLabels();
}

/* Keep the dynamic tool button synchronized with the rotating carousel. */
document.addEventListener('b7fi:live-tool-change',()=>{
  if(document.body.dataset.center==='home')styleOperationsToolbar();
});

/* Wrap the latest setView without replacing the v0.80.25 Operations implementation. */
const prevSetView=window.setView;
if(typeof prevSetView==='function'){
  window.setView=function(v){
    const r=prevSetView.apply(this,arguments);
    setTimeout(afterRender,0);setTimeout(afterRender,80);
    return r;
  };
}

/* Re-run after the Operations Center's own delayed startup render. */
function startup(){
  setVersion();
  setTimeout(afterRender,100);
  setTimeout(afterRender,450);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
