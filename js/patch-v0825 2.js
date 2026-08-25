/* B7 FI Command Center v0.80.33 — Operations Live Dashboard + shared viewer data sync.
   - Operations Center becomes the live operational dashboard (no redundant home cards).
   - Standalone live-status-view consumes the same canonical state as the Command Center.
   - Same-origin tabs synchronize through BroadcastChannel + storage events.
*/
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'0.80.33';
const STATE_KEY='b7fi-v0210-state';
const SNAP_KEY='b7fi-live-status-snapshot-v1';
const CHANNEL='b7fi-live-sync-v1';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
const priorSetView=window.setView;
let bc=null;
let applying=false;

function setVersion(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel'); if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function clone(x){try{return JSON.parse(JSON.stringify(x))}catch(e){return null}}
function canonicalState(){
  try{
    if(typeof state!=='undefined'&&state&&Array.isArray(state.tools))return clone(state);
  }catch(e){}
  try{return JSON.parse(localStorage.getItem(STATE_KEY)||'null')}catch(e){return null}
}
function currentQueues(){
  try{
    const e=window.B7StatusEngine820;
    if(e)return {
      lead:(e.leadQueue?.()||[]).map(a=>({key:a._k||a.id||'',text:a.text||'',severity:a._sev||a.severity||'blue'})),
      system:(e.systemQueue?.()||[]).map(a=>({toolId:a.toolId||'',text:a.text||'',severity:a._sev||a.severity||'blue'}))
    };
  }catch(e){}
  return {lead:[],system:[]};
}
function buildSnapshot(){
  const st=canonicalState(); if(!st)return null;
  const q=currentQueues();
  return {schema:1,version:VERSION,updatedAt:new Date().toISOString(),state:st,leadQueue:q.lead,systemQueue:q.system};
}
function publishSnapshot(){
  if(viewerOnly()||applying)return;
  const snap=buildSnapshot(); if(!snap)return;
  try{localStorage.setItem(SNAP_KEY,JSON.stringify(snap))}catch(e){}
  try{bc?.postMessage({type:'snapshot',snapshot:snap})}catch(e){}
}
function readSnapshot(){try{return JSON.parse(localStorage.getItem(SNAP_KEY)||'null')}catch(e){return null}}
function applyCanonicalState(st){
  if(!st||!Array.isArray(st.tools))return false;
  applying=true;
  try{
    /* app-v0300 declares state/tools in the shared global lexical environment. */
    try{state=clone(st);tools=state.tools}catch(e){}
    try{localStorage.setItem(STATE_KEY,JSON.stringify(st))}catch(e){}
    return true;
  }finally{applying=false}
}
function refreshViewerFromShared(snapshot){
  if(!viewerOnly())return;
  const snap=snapshot||readSnapshot();
  let st=snap?.state||null;
  if(!st){try{st=JSON.parse(localStorage.getItem(STATE_KEY)||'null')}catch(e){}}
  if(!st){
    const lead=$('#b7LeadAlertsBar .b7s-message span'); if(lead)lead.textContent='COMMAND CENTER DATA UNAVAILABLE';
    const sys=$('#b7SystemStatusBar .b7s-message span'); if(sys)sys.textContent='COMMAND CENTER DATA UNAVAILABLE';
    return;
  }
  applyCanonicalState(st);
  try{window.B7StatusEngine820?.refreshAll?.(true)}catch(e){}
  try{window.B7LiveStatusCore?.drawTool?.()}catch(e){}
}
function initSync(){
  try{
    if('BroadcastChannel'in window){
      bc=new BroadcastChannel(CHANNEL);
      bc.onmessage=e=>{
        const d=e.data||{};
        if(d.type==='request'&&!viewerOnly())publishSnapshot();
        if(d.type==='snapshot'&&viewerOnly())refreshViewerFromShared(d.snapshot);
      };
    }
  }catch(e){}
  window.addEventListener('storage',e=>{
    if(viewerOnly()&&(e.key===STATE_KEY||e.key===SNAP_KEY))refreshViewerFromShared(e.key===SNAP_KEY?readSnapshot():null);
  });
  if(viewerOnly()){
    refreshViewerFromShared();
    try{bc?.postMessage({type:'request'})}catch(e){}
  }else publishSnapshot();
}

function activeQuarter(){
  try{if(typeof window.B7ActiveQuarter==='function')return window.B7ActiveQuarter()}catch(e){}
  const d=new Date(),q=Math.floor(d.getMonth()/3)+1;return `CY${String(d.getFullYear()).slice(-2)}Q${q}`;
}
function ensureOpsPageActions(){
  const bar=$('#floatingActions');if(!bar)return;
  bar.style.display='flex';
  bar.innerHTML='<span id="v825CurrentSystem" class="v825-current-system">CURRENT SYSTEM: —</span>'+
    '<button type="button" id="v825Screenshot" class="btn v825-page-action">SCREENSHOT</button>'+
    '<button type="button" id="v825Report" class="btn v825-page-action">REPORT</button>';
  $('#v825Screenshot').onclick=()=>{
    try{window.B7LiveStatusCore?.setPaused?.(true)}catch(e){}
    try{if(typeof window.enterScreenshot==='function')window.enterScreenshot();else{document.body.classList.add('screenshot-mode');const x=$('#screenshotExit');if(x)x.style.display='block'}}catch(e){}
  };
  $('#v825Report').onclick=()=>window.print();
  updateCurrentSystem();
}
function updateCurrentSystem(){
  const el=$('#v825CurrentSystem');if(!el)return;
  let t=null;try{t=window.B7LiveStatusCore?.currentTool?.()}catch(e){}
  const id=t?.utid||t?.id||'—';el.textContent=`CURRENT SYSTEM: ${id}`;
}
function operationsMarkup(){
  let list=[];try{list=window.B7LiveStatusCore?.activeTools?.()||[]}catch(e){}
  let c={infi:0,packing:0,waiting:0,shipped:0};try{c=window.B7LiveStatusCore?.metricCounts?.(list)||c}catch(e){}
  return `<section class="v825-operations-live" aria-label="Operations Center live status">
    <div class="v825-quarter-strip"><strong>${activeQuarter()}</strong><span>LIVE OPERATIONS</span></div>
    <div class="v802-live-metrics">
      <div class="v802-live-metric"><span>Active Tools</span><b>${list.length}</b></div>
      <div class="v802-live-metric"><span>In FI</span><b>${c.infi}</b></div>
      <div class="v802-live-metric"><span>Packing</span><b>${c.packing}</b></div>
      <div class="v802-live-metric"><span>Waiting</span><b>${c.waiting}</b></div>
      <div class="v802-live-metric"><span>Shipped</span><b>${c.shipped}</b></div>
    </div>
    <div class="v802-carousel v825-operations-carousel"><div id="v802ToolHost"></div>
      <div class="v802-carousel-foot"><span><i class="v802-live-dot"></i>LIVE LOCAL DATA</span>
        <div class="v802-carousel-controls"><button id="v802Prev" title="Previous tool" aria-label="Previous tool">◀</button><button id="v802Pause" title="Pause rotation">PAUSE</button><button id="v802Next" title="Next tool" aria-label="Next tool">▶</button></div><b id="v802Counter"></b>
      </div>
    </div>
  </section>`;
}
function wireOperationsCarousel(){
  const core=window.B7LiveStatusCore;if(!core)return;
  $('#v802Prev')?.addEventListener('click',()=>{core.previous?.();updateCurrentSystem()});
  $('#v802Next')?.addEventListener('click',()=>{core.next?.();updateCurrentSystem()});
  $('#v802Pause')?.addEventListener('click',e=>{const paused=core.togglePause?.();e.currentTarget.textContent=paused?'RESUME':'PAUSE'});
  core.drawTool?.();core.schedule?.();updateCurrentSystem();
}
function renderOperations(){
  /* Let the legacy route perform its normal Center bookkeeping, then replace only the page body. */
  try{priorSetView?.call(window,'home')}catch(e){}
  document.body.classList.remove('v802-live-status','v801-live-status');
  document.body.classList.add('v825-operations-dashboard');
  document.body.dataset.center='home';
  const title=$('#headerPageTitle');if(title)title.textContent='OPERATIONS CENTER';
  $$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='home'));
  try{window.B7StatusEngine820?.mount?.();window.B7StatusEngine820?.refreshAll?.(true)}catch(e){}
  const app=$('#app');if(app){app.innerHTML=operationsMarkup();app.dataset.rendered='true'}
  ensureOpsPageActions();wireOperationsCarousel();setVersion();publishSnapshot();
}
function leaveOperations(){
  if(!document.body.classList.contains('v825-operations-dashboard'))return;
  document.body.classList.remove('v825-operations-dashboard');
  try{window.B7LiveStatusCore?.stopTimer?.()}catch(e){}
}
window.setView=function(v){
  const key=String(v||'').toLowerCase();
  if(key==='home'||key==='operations'||key==='operationscenter'){renderOperations();return}
  leaveOperations();
  const out=priorSetView?priorSetView.call(window,v):undefined;
  setTimeout(()=>{setVersion();publishSnapshot()},0);
  return out;
};

document.addEventListener('b7fi:live-tool-change',()=>updateCurrentSystem());
/* Save is the one authoritative point for publishing changed data to viewer tabs. */
if(typeof window.save==='function'){
  const oldSave=window.save;
  window.save=function(){const r=oldSave.apply(this,arguments);queueMicrotask(()=>{publishSnapshot();if(viewerOnly())refreshViewerFromShared()});return r};
}
function startup(){
  setVersion();initSync();
  if(viewerOnly()){
    /* The viewer keeps the existing Live Status layout, but its data is always refreshed from the Command Center snapshot/state. */
    setTimeout(()=>refreshViewerFromShared(),60);
    setTimeout(()=>refreshViewerFromShared(),350);
  }else{
    setTimeout(()=>{if((document.body.dataset.center||'home')==='home')renderOperations();else publishSnapshot()},80);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
