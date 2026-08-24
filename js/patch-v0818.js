/* B7 FI Command Center v0.80.18 — Alert System Lockdown II */
(function(){
'use strict';
const VERSION='0.80.18';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=document.body?.dataset?.liveViewerOnly==='true';
let repairQueued=false, viewerQueued=false;

function setVersion(){
  document.title=viewerOnly?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel'); if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function engine(){return window.B7AlertEngine817||null}
function repaint(reset=false){
  const e=engine(); if(!e)return;
  try{e.refreshLead(!!reset);e.refreshSystem(!!reset)}catch(err){}
  setVersion();
}
function validShell(bar,title){
  if(!bar)return false;
  return bar.querySelector('.v817-status-left')&&bar.querySelector('.v817-status-message')&&bar.querySelector('.v817-status-count')&&bar.querySelector('.v817-status-title')?.textContent.trim()===title;
}
function scheduleRepair(){
  if(repairQueued)return; repairQueued=true;
  requestAnimationFrame(()=>{
    repairQueued=false;
    const lead=$('#topActionBar'),sys=$('#operationsBar');
    if(!validShell(lead,'LEAD ALERTS')||!validShell(sys,'SYSTEM STATUS'))repaint(false);
  });
}
function watchBar(id){
  const bar=$(id); if(!bar||bar.dataset.v818Watch)return;
  bar.dataset.v818Watch='1';
  new MutationObserver(scheduleRepair).observe(bar,{childList:true,subtree:true});
}

/* Viewer-only pages always own two visible status shells, even when queues are empty. */
function ensureViewerBars(){
  if(!viewerOnly||!document.body.classList.contains('v802-live-status'))return;
  const mount=$('#v802StatusMount'); if(!mount)return;
  let lead=$('#topActionBar'),sys=$('#operationsBar');
  if(lead&&lead.parentElement!==mount)mount.prepend(lead);
  if(sys&&sys.parentElement!==mount)mount.appendChild(sys);
  if(lead&&sys&&lead.nextElementSibling!==sys)mount.insertBefore(lead,sys);
  $('#v802Exit')?.remove();
  repaint(false); watchBar('#topActionBar');watchBar('#operationsBar');
}
function scheduleViewer(){
  if(!viewerOnly||viewerQueued)return;viewerQueued=true;
  requestAnimationFrame(()=>{viewerQueued=false;ensureViewerBars()});
}
if(viewerOnly){
  new MutationObserver(scheduleViewer).observe(document.body,{childList:true,subtree:true});
}

/* One eligibility rule for status-bar display and critical popup. */
function activeLeadQueue(){try{return engine()?.leadQueue?.()||[]}catch(e){return[]}}
function popupEligible(message){
  const msg=String(message||'').trim(); if(!msg)return null;
  return activeLeadQueue().find(a=>a._sev==='red'&&!a._d?.ack&&(msg.includes(String(a.text||'').trim())||String(a.text||'').trim().includes(msg)))||null;
}
/* Legacy popup can still wake from an old scheduled timeout. Reject it if that alert is OFF/acknowledged/not active. */
if(!viewerOnly){
  new MutationObserver(records=>{
    for(const rec of records)for(const n of rec.addedNodes){
      if(!(n instanceof Element))continue;
      const modal=n.matches?.('.v812-critical-backdrop')?n:n.querySelector?.('.v812-critical-backdrop');
      if(!modal)continue;
      const text=modal.querySelector('.v812-critical-body')?.textContent||'';
      if(!popupEligible(text)){modal.remove();continue}
      const later=modal.querySelector('[data-v812-later]'); if(later)later.title='Remind again in 30 minutes if still active';
    }
  }).observe(document.body,{childList:true});
}

/* Action Center persistence + manual lifecycle buttons. */
function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function key(card){return String(card?.dataset?.auto51||'')}
function isManual(card){return key(card).startsWith('manual:')}
function control(card){
  const k=key(card); if(!k)return null;
  window.state.actionDisplay=window.state.actionDisplay||{};
  return window.state.actionDisplay[k]||(window.state.actionDisplay[k]={show:true,seconds:8,order:999,assignee:'',pin:false,ack:false,displayUntil:'while-open'});
}
function persist(card){
  const d=control(card); if(!d)return false;
  d.assignee=card.querySelector('.ac-owner51')?.value.trim()||'';
  d.show=(card.querySelector('.ac-show51')?.value||'on')==='on';
  d.seconds=Math.max(3,Number(card.querySelector('.ac-sec51')?.value)||8);
  d.order=Number(card.querySelector('.ac-order51')?.value)||999;
  d.pin=!!card.querySelector('.ac-pin51')?.checked;
  d.ack=!!card.querySelector('.ac-ack51')?.checked;
  const mode=card.querySelector('.ac-until-mode51')?.value||'while-open', custom=card.querySelector('.ac-until51')?.value||'';
  d.displayUntil=mode==='while-open'?'while-open':mode==='today'?today():(custom||'while-open');
  window.state.actionDisplay[key(card)]=d;
  card.classList.toggle('v818-alert-off',d.show===false);
  return true;
}
function saveState(){try{if(typeof window.save==='function')window.save()}catch(e){} repaint(true)}
function rerenderActions(){
  if(window.B7Renderers58?.actionCenter){window.B7Renderers58.actionCenter();setTimeout(enhanceActions,0)}
  else if(typeof window.setView==='function')window.setView('actions');
}
function deleteManual(card){
  if(!isManual(card))return;
  const id=key(card).slice(7); if(!confirm('Permanently delete this manually-created alert/task? This cannot be undone.'))return;
  window.state.manualReminders=(window.state.manualReminders||[]).filter(r=>String(r.id)!==id);
  delete window.state.actionDisplay?.[key(card)];delete window.state.actionDisplay?.[id];
  saveState();rerenderActions();
}
function resolveManual(card){
  if(!isManual(card))return;
  const id=key(card).slice(7), r=(window.state.manualReminders||[]).find(x=>String(x.id)===id);if(!r)return;
  const note=prompt('Optional resolution note:','');if(note===null)return;
  window.state.actionHistory=Array.isArray(window.state.actionHistory)?window.state.actionHistory:[];
  window.state.actionHistory.unshift({...JSON.parse(JSON.stringify(r)),historyId:'hist'+Date.now(),resolvedAt:new Date().toISOString(),resolutionNote:note});
  r.complete=true;r.resolvedAt=new Date().toISOString();saveState();rerenderActions();
}
function addActionRow(card){
  let row=card.querySelector('.v818-actions'); if(!row){row=document.createElement('div');row.className='v818-actions';card.appendChild(row)}
  row.replaceChildren();
  const note=document.createElement('span');note.className='v818-rule';note.textContent=isManual(card)?'MANUAL · USER CONTROLLED':'AUTO · CLEARS ONLY FROM TOOL / WORKFLOW';row.appendChild(note);
  const save=document.createElement('button');save.type='button';save.className='btn small primary';save.textContent='SAVE CHANGES';save.addEventListener('click',e=>{e.preventDefault();persist(card);saveState();enhanceActions()});row.appendChild(save);
  if(isManual(card)){
    const resolve=document.createElement('button');resolve.type='button';resolve.className='btn small v818-resolve';resolve.textContent='RESOLVE';resolve.addEventListener('click',e=>{e.preventDefault();persist(card);resolveManual(card)});row.appendChild(resolve);
    const del=document.createElement('button');del.type='button';del.className='btn small v818-delete';del.textContent='DELETE';del.addEventListener('click',e=>{e.preventDefault();deleteManual(card)});row.appendChild(del);
  }
}
function enhanceActions(){
  if(document.body.dataset.center!=='action')return;
  $$('.auto-action51[data-auto51]').forEach(card=>{
    const d=control(card); if(!d)return;
    card.classList.toggle('v818-alert-off',d.show===false);
    const show=card.querySelector('.ac-show51'); if(show)show.value=d.show===false?'off':'on';
    const old=card.querySelector('.ac-save51');if(old)old.style.display='none';
    addActionRow(card);
  });
  let diag=$('#v818QueueDiag'); if(!diag){const summary=$('.action-summary-grid');if(summary){diag=document.createElement('div');diag.id='v818QueueDiag';diag.className='v818-diag';summary.insertAdjacentElement('afterend',diag)}}
  if(diag){const q=activeLeadQueue(),c={red:0,orange:0,yellow:0,blue:0};q.forEach(a=>c[a._sev]=(c[a._sev]||0)+1);diag.textContent=`ACTIVE LEAD ALERTS: ${q.length} · CRITICAL ${c.red||0} · ATTENTION ${c.orange||0} · REMINDER ${c.yellow||0} · INFORMATION ${c.blue||0}`}
  const saveAll=$('#v815SaveAll');if(saveAll)saveAll.onclick=e=>{e.preventDefault();$$('.auto-action51[data-auto51]').forEach(persist);saveState();rerenderActions()};
}

/* keep the current shell version after internal navigation and rerenders */
const prevSet=window.setView;
if(typeof prevSet==='function')window.setView=function(v){const out=prevSet.apply(this,arguments);requestAnimationFrame(()=>{setVersion();repaint(true);if(v==='actions')enhanceActions();if(viewerOnly)ensureViewerBars()});return out};

function boot(){
  setVersion(); repaint(true); watchBar('#topActionBar');watchBar('#operationsBar');ensureViewerBars();enhanceActions();
  [100,450,1200].forEach(ms=>setTimeout(()=>{setVersion();if(viewerOnly)ensureViewerBars();scheduleRepair();enhanceActions()},ms));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('storage',()=>{repaint(true);if(viewerOnly)ensureViewerBars()});
})();
