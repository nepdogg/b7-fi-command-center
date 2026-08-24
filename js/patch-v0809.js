/* B7 FI Command Center v0.80.33 — shared status naming + Live viewer parity + automatic active-quarter titles.
   Bounded reconciliation only: no MutationObserver, no setInterval, no recurring polling. */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'0.80.33';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const QUARTER_TITLES={
  toolcenter:'TOOL CENTER',
  shipping:'SHIPPING CENTER',
  priorities:'PRIORITY CENTER',
  statuscenter:'STATUS CENTER'
};

function autoQuarter(){
  /* Calendar-year quarters are the normal automatic source.  A future Administration
     manual override can set B7_ACTIVE_QUARTER or state.config.activeQuarterOverride. */
  try{
    const explicit=String(window.B7_ACTIVE_QUARTER||'').trim().toUpperCase();
    if(/^CY\d{2}Q[1-4]$/.test(explicit))return explicit;
  }catch(e){}
  try{
    const override=String(window.state?.config?.activeQuarterOverride||'').trim().toUpperCase();
    if(/^CY\d{2}Q[1-4]$/.test(override))return override;
  }catch(e){}
  const d=new Date();
  const yy=String(d.getFullYear()).slice(-2);
  const q=Math.floor(d.getMonth()/3)+1;
  return `CY${yy}Q${q}`;
}
window.getB7ActiveQuarter=autoQuarter;

function syncVersion(){
  const label=$('#appVersionLabel');
  if(label)label.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
  if(!document.body.dataset.liveViewerOnly)document.title=`B7 FI Command Center v${VERSION}`;
}

function replaceExactText(root,from,to){
  if(!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let n;
  while((n=walker.nextNode())){
    if(String(n.nodeValue||'').trim().toUpperCase()===from)n.nodeValue=n.nodeValue.replace(/\S(?:.*\S)?/,to);
  }
}
function normalizeStatusNames(){
  const lead=$('#topActionBar'),system=$('#operationsBar');
  if(lead){
    const preferred=lead.querySelector('.v72-beacon-title,.v70-action-beacon b,.v70-action-beacon strong,.v66-action-status-label strong,.v69-action-status-label strong');
    if(preferred)preferred.textContent='LEAD ALERTS';
    replaceExactText(lead,'ACTION STATUS','LEAD ALERTS');
  }
  if(system){
    const preferred=system.querySelector('.v72-beacon-title,.v65-fleet-label b,.v65-fleet-label strong,.ops-ticker-label');
    if(preferred)preferred.textContent='SYSTEM STATUS';
    replaceExactText(system,'FLEET STATUS','SYSTEM STATUS');
  }
}

function ensureLiveStatusPair(){
  if(!document.body.classList.contains('v802-live-status'))return;
  const mount=$('#v802StatusMount'),lead=$('#topActionBar'),system=$('#operationsBar');
  if(!mount)return;
  /* Live Status and viewer-only Live Status must have the same two shared bars,
     in the same order. Re-parent only when needed. */
  if(lead&&lead.parentElement!==mount)mount.appendChild(lead);
  if(system&&system.parentElement!==mount)mount.appendChild(system);
  if(lead&&system&&lead.nextElementSibling!==system)mount.insertBefore(lead,system);
  normalizeStatusNames();
  const q=$('#v804LiveQuarter');if(q)q.textContent=autoQuarter();
}

function applyQuarterTitle(view){
  if(document.body.classList.contains('v802-live-status')){
    const q=$('#v804LiveQuarter');if(q)q.textContent=autoQuarter();
    return;
  }
  const title=$('#headerPageTitle');if(!title)return;
  let key=String(view||'').toLowerCase();
  const aliases={tool:'toolcenter',priority:'priorities',status:'statuscenter'};
  key=aliases[key]||key;
  if(!QUARTER_TITLES[key]){
    /* Infer the current Center from the active nav when legacy renderers omit view. */
    const active=$('.main-nav .nav-btn.active');
    const inferred=String(active?.dataset?.view||'').toLowerCase();
    key=aliases[inferred]||inferred;
  }
  if(QUARTER_TITLES[key])title.textContent=`${QUARTER_TITLES[key]} — ${autoQuarter()}`;
}

function reconcile(view){
  syncVersion();
  normalizeStatusNames();
  ensureLiveStatusPair();
  applyQuarterTitle(view);
}
function boundedReconcile(view){
  requestAnimationFrame(()=>reconcile(view));
  [90,320,900].forEach(ms=>setTimeout(()=>reconcile(view),ms));
}

const previousSetView=window.setView;
window.setView=function(v){
  const result=previousSetView?previousSetView(v):undefined;
  boundedReconcile(v);
  return result;
};

/* Older ticker renderers can rebuild the label during a user navigation or ticker click.
   Correct only after those explicit interactions; no continuous observer/polling. */
document.addEventListener('click',e=>{
  if(e.target.closest('.nav-btn,.v57-live-card,#v802Exit,#topActionBar,#operationsBar'))boundedReconcile(e.target.closest('.nav-btn')?.dataset?.view||'');
},true);

function startup(){boundedReconcile('')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
