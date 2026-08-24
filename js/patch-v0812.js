/* B7 FI Command Center v0.80.12 — viewer status parity, calm glow framework, critical lead alert escalation. */
(function(){
'use strict';
const VERSION='0.80.12';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s);
const viewerOnly=document.body?.dataset.liveViewerOnly==='true';
const quarterViews={toolcenter:'TOOL CENTER',shipping:'SHIPPING CENTER',priorities:'PRIORITY CENTER',statuscenter:'STATUS CENTER'};

function activeQuarter(){
  try{if(typeof window.getB7ActiveQuarter==='function')return window.getB7ActiveQuarter()}catch(e){}
  const d=new Date();return `CY${String(d.getFullYear()).slice(-2)}Q${Math.floor(d.getMonth()/3)+1}`;
}
function versionAndQuarter(view){
  const label=$('#appVersionLabel');if(label)label.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
  if(!viewerOnly)document.title=`B7 FI Command Center v${VERSION}`;
  if(document.body.classList.contains('v802-live-status')){const q=$('#v804LiveQuarter');if(q)q.textContent=activeQuarter();return}
  const title=$('#headerPageTitle');if(!title)return;
  let key=String(view||$('.main-nav .nav-btn.active')?.dataset?.view||'').toLowerCase();
  if(key==='tool')key='toolcenter';if(key==='priority')key='priorities';if(key==='status')key='statuscenter';
  if(quarterViews[key])title.textContent=`${quarterViews[key]} — ${activeQuarter()}`;
}
function exactText(root,from,to){
  if(!root)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
  while((n=w.nextNode()))if(String(n.nodeValue||'').trim().toUpperCase()===from)n.nodeValue=to;
}
function normalizeBars(){
  const lead=$('#topActionBar'),sys=$('#operationsBar');
  if(lead){exactText(lead,'ACTION STATUS','LEAD ALERTS');const t=lead.querySelector('.v72-beacon-title,.v70-action-beacon b,.v70-action-beacon strong');if(t)t.textContent='LEAD ALERTS'}
  if(sys){exactText(sys,'FLEET STATUS','SYSTEM STATUS');const t=sys.querySelector('.v72-beacon-title,.v65-fleet-label b,.v65-fleet-label strong,.ops-ticker-label');if(t)t.textContent='SYSTEM STATUS'}
}
function ensureViewerPair(){
  if(!viewerOnly||!document.body.classList.contains('v802-live-status'))return;
  const mount=$('#v802StatusMount'),lead=$('#topActionBar'),sys=$('#operationsBar');if(!mount)return;
  if(lead&&lead.parentElement!==mount)mount.appendChild(lead);
  if(sys&&sys.parentElement!==mount)mount.appendChild(sys);
  if(lead&&sys&&lead.nextElementSibling!==sys)mount.insertBefore(lead,sys);
  const exit=$('#v802Exit');if(exit)exit.remove();
  normalizeBars();
}
function reconcile(view){normalizeBars();ensureViewerPair();versionAndQuarter(view)}
function bounded(view){requestAnimationFrame(()=>reconcile(view));[120,650,1600,3200].forEach(ms=>setTimeout(()=>reconcile(view),ms))}

/* Viewer-only: use the normal Live Status renderer once, then ignore later legacy route changes.
   Final bounded reconciliation restores the same two shared status bars after old startup timers finish. */
if(viewerOnly){
  const renderLive=window.setView;
  function bootViewer(){
    document.body.classList.add('v808-viewer-only');document.title='B7 FI Live Status';
    if(typeof renderLive==='function')renderLive.call(window,'livestatus');
    const stableSetView=window.setView;
    window.setView=function(v){
      const k=String(v||'').toLowerCase();
      if(k==='livestatus'||k==='live-status')return stableSetView?stableSetView.call(window,'livestatus'):undefined;
      return undefined;
    };
    bounded('livestatus');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootViewer,{once:true});else bootViewer();
  window.addEventListener('storage',()=>{try{if(typeof renderLive==='function')renderLive.call(window,'livestatus')}catch(e){}bounded('livestatus')});
}else{
  const prev=window.setView;
  window.setView=function(v){const out=prev?prev.call(window,v):undefined;bounded(v);scheduleCriticalCheck();return out};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>bounded(''),{once:true});else bounded('');
}

/* Critical popup: only in the editable Command Center, never in either Live Status display. */
let criticalTimer=null;const shown=new Set();
function visibleCritical(){
  if(viewerOnly||document.body.classList.contains('v802-live-status'))return null;
  const bar=$('#topActionBar');if(!bar)return null;
  const beacon=bar.querySelector('[data-status]');const sev=String(beacon?.dataset?.status||bar.dataset.status||'').toLowerCase();
  if(!['red','critical'].includes(sev))return null;
  const msg=(bar.querySelector('.v70-action-message,.top-action-current strong')?.textContent||'').trim();if(!msg)return null;
  let raw=[];try{raw=typeof window.v3Alerts==='function'?(window.v3Alerts()||[]):[]}catch(e){}
  const a=raw.find(x=>msg.includes(String(x.text||'').trim())||String(x.text||'').trim().includes(msg));
  if(!a)return {message:msg,key:`visible:${msg}`};
  const key=a.id||`auto:${a.toolId||'general'}:${String(a.text||'').replace(/\s+/g,' ').slice(0,180)}`;
  const ctl=window.state?.actionDisplay?.[key];if(ctl?.ack)return null;
  return {message:String(a.text||msg),key,alert:a};
}
function closePopup(){document.querySelector('.v812-critical-backdrop')?.remove()}
function showCriticalPopup(info){
  if(!info||shown.has(info.key)||document.querySelector('.v812-critical-backdrop'))return;shown.add(info.key);
  const back=document.createElement('div');back.className='v812-critical-backdrop';
  back.innerHTML=`<section class="v812-critical-modal" role="alertdialog" aria-modal="true" aria-label="Critical Lead Alert"><div class="v812-critical-head"><i class="v812-critical-lamp"></i><div><strong>LEAD ALERTS</strong><br><span>CRITICAL — REQUIRES ATTENTION</span></div></div><div class="v812-critical-body"></div><div class="v812-critical-actions"><button type="button" class="primary" data-v812-ack>ACKNOWLEDGE / WORKING</button><button type="button" data-v812-open>OPEN ACTION CENTER</button><button type="button" data-v812-later>REMIND ME LATER</button></div></section>`;
  back.querySelector('.v812-critical-body').textContent=info.message;
  back.querySelector('[data-v812-ack]').onclick=()=>{try{window.state.actionDisplay=window.state.actionDisplay||{};window.state.actionDisplay[info.key]=window.state.actionDisplay[info.key]||{};window.state.actionDisplay[info.key].ack=true;if(typeof window.save==='function')window.save()}catch(e){}closePopup();bounded('')};
  back.querySelector('[data-v812-open]').onclick=()=>{closePopup();try{window.setView('actions')}catch(e){}};
  back.querySelector('[data-v812-later]').onclick=()=>{closePopup();shown.delete(info.key);criticalTimer=setTimeout(()=>{const x=visibleCritical();if(x)showCriticalPopup(x)},5*60*1000)};
  document.body.appendChild(back);
}
function scheduleCriticalCheck(){
  if(viewerOnly||document.body.classList.contains('v802-live-status'))return;
  clearTimeout(criticalTimer);criticalTimer=setTimeout(()=>{const info=visibleCritical();if(info)showCriticalPopup(info)},30000);
}
if(!viewerOnly){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scheduleCriticalCheck,{once:true});else scheduleCriticalCheck()}
})();
