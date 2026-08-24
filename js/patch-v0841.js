/* B7 FI Command Center v0.80.41 — Tool live-card state parity + save acknowledgement.
   - Tool Center live cards consume the same master-tool exception state used by Operations/Live Status.
   - Adds compact badges for plan changes, Customer Source, STR, and Packing without replacing lifecycle state.
   - Master Tool editor provides explicit Unsaved / Saving / Saved / No changes feedback.
   - Latest saved plan change is shown read-only in the editor so the Plan Change Type dropdown remains a NEW action.
*/
(function(){
'use strict';
const VERSION='0.80.41';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
window.B7_APP_VERSION=VERSION; window.VERSION=VERSION;

function stamp(){
  document.title=`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel'); if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function getTools(){try{return tools||[]}catch(e){return[]}}
function byId(id){return getTools().find(t=>String(t.id)===String(id))}
function latestPlan(t){
  const h=Array.isArray(t?.changeHistory)&&t.changeHistory.length?t.changeHistory[0]:null;
  const type=String(h?.type||'').toLowerCase();
  if(type.includes('pull'))return {kind:'pull',label:'↑ PULL IN',detail:h};
  if(type.includes('push'))return {kind:'push',label:'↓ PUSH OUT',detail:h};
  if(type.includes('ship date'))return {kind:'date',label:'DATE CHANGED',detail:h};
  if(type.includes('quarter'))return {kind:'date',label:'PLAN CHANGED',detail:h};
  if(t?.pushOut)return {kind:'push',label:'↓ PUSH OUT',detail:null};
  if(t?.pullIn)return {kind:'pull',label:'↑ PULL IN',detail:null};
  return null;
}
function packingActive(t){
  const qs=String(t?.quarterStatus||'').toLowerCase();
  const ps=String(t?.schedule?.status||'').toLowerCase();
  return qs.includes('packing') || ['in progress','updated','packing','active'].some(x=>ps.includes(x));
}
function sourceActive(t){return String(t?.sourceRequired||'').toLowerCase()==='yes'}
function strActive(t){return String(t?.strRequired||'').toLowerCase()==='yes'}
function badgeHtml(t){
  const out=[],p=latestPlan(t);
  if(p){
    let title='';
    if(p.detail)title=`${p.detail.oldValue||''} → ${p.detail.newValue||''}${p.detail.reason?' · '+p.detail.reason:''}`;
    out.push(`<span class="v841-state-badge plan ${p.kind}" title="${esc(title)}">${esc(p.label)}</span>`);
  }
  if(sourceActive(t))out.push(`<span class="v841-state-badge source" title="Customer Source: ${esc(t.sourceStatus||'Not Started')}">SOURCE</span>`);
  if(strActive(t))out.push(`<span class="v841-state-badge str" title="STR: ${esc(t.strStatus||'Not Started')}">STR</span>`);
  if(packingActive(t))out.push(`<span class="v841-state-badge packing" title="Packing / Shipping: ${esc(t.schedule?.status||t.quarterStatus||'Active')}">PACKING</span>`);
  return out.length?`<div class="v841-card-badges" aria-label="Tool exceptions and special workflows">${out.join('')}</div>`:'';
}
function enhanceToolCards(){
  $$('[data-v837-tool]').forEach(card=>{
    const id=card.dataset.v837Tool,t=byId(id); if(!t)return;
    card.querySelector('.v841-card-badges')?.remove();
    const head=card.querySelector('.system-head'); if(head)head.insertAdjacentHTML('afterend',badgeHtml(t));
  });
}

function toast(text,kind='saved'){
  let n=$('#v841Toast'); if(!n){n=document.createElement('div');n.id='v841Toast';document.body.appendChild(n)}
  n.className=`v841-toast ${kind}`;n.textContent=text;n.classList.add('show');
  clearTimeout(n._hide);n._hide=setTimeout(()=>n.classList.remove('show'),2600);
}
function saveState(text,kind){
  let el=$('#v841SaveState');
  if(!el){
    const right=$('.v840-toolbar-right,.v838-toolbar-right,.v837-toolbar-right'); if(!right)return;
    el=document.createElement('span');el.id='v841SaveState';right.prepend(el);
  }
  el.className=`v841-save-state ${kind||''}`;el.textContent=text;
}
function toolIdFromHeader(){const m=String($('#headerPageTitle')?.textContent||'').match(/TOOL\s+(\d+)/i);return m?m[1]:''}
function installSaveUx(){
  const master=$('.v838-master-tool');
  const edit=/—\s*EDIT/i.test($('#headerPageTitle')?.textContent||'') || /ADD TOOL/i.test($('#headerPageTitle')?.textContent||'');
  if(!master||!edit||master.dataset.v841SaveUx==='1')return;
  master.dataset.v841SaveUx='1'; let dirty=false;
  saveState('SAVED','saved');
  const mark=e=>{
    if(e?.target?.matches('input,select,textarea')){dirty=true;master.dataset.v841Dirty='1';saveState('UNSAVED CHANGES','dirty')}
  };
  master.addEventListener('input',mark,true);master.addEventListener('change',mark,true);
  document.addEventListener('click',function saveGate(e){
    if(!master.isConnected){document.removeEventListener('click',saveGate,true);return}
    const b=e.target.closest('button');if(!b||!/^SAVE TOOL$/i.test((b.textContent||'').trim()))return;
    if(!dirty){e.preventDefault();e.stopImmediatePropagation();saveState('NO CHANGES TO SAVE','neutral');toast('No changes to save','neutral');return}
    saveState('SAVING…','saving');
    try{sessionStorage.setItem('b7.v841.saveNotice',JSON.stringify({id:toolIdFromHeader(),at:Date.now()}))}catch(_){ }
  },true);
}
function showSavedNotice(){
  let n=null;try{n=JSON.parse(sessionStorage.getItem('b7.v841.saveNotice')||'null')}catch(e){}
  if(!n)return;
  if(Date.now()-Number(n.at||0)>4000){try{sessionStorage.removeItem('b7.v841.saveNotice')}catch(e){};return}
  try{sessionStorage.removeItem('b7.v841.saveNotice')}catch(e){}
  toast(`Saved Tool ${n.id||''}`.trim(),'saved');
}
function enhanceLatestPlan(){
  const master=$('.v838-master-tool');if(!master)return;
  const id=toolIdFromHeader(),t=byId(id),p=latestPlan(t);
  $('#v841LatestPlan')?.remove();
  if(!p)return;
  const plan=$('#tm-plan-type')?.closest('.v838-subsection'); if(!plan)return;
  const h=p.detail||{};
  const box=document.createElement('div');box.id='v841LatestPlan';box.className=`v841-latest-plan ${p.kind}`;
  box.innerHTML=`<span>LATEST PLAN CHANGE</span><b>${esc(p.label.replace(/[↑↓]/g,'').trim())}</b><small>${esc(h.oldValue||'')} ${h.oldValue||h.newValue?'→':''} ${esc(h.newValue||'')}${h.reason?` · ${esc(h.reason)}`:''}</small>`;
  const helper=plan.querySelector('.helper'); if(helper)helper.after(box);else plan.prepend(box);
}
function enhance(){stamp();enhanceToolCards();installSaveUx();enhanceLatestPlan();showSavedNotice()}

/* Wrap final Tool Center dashboard and tool routes after v0.80.40 so cards/save state are enhanced after every render. */
const priorSetView=window.setView, priorStatus=window.toolStatus, priorAdmin=window.toolAdmin;
if(typeof priorSetView==='function'){
  window.setView=function(){const out=priorSetView.apply(this,arguments);[0,30,100].forEach(ms=>setTimeout(enhance,ms));return out};
  try{setView=window.setView}catch(e){}
}
if(typeof priorStatus==='function'){
  window.toolStatus=function(){const out=priorStatus.apply(this,arguments);[0,30,100].forEach(ms=>setTimeout(enhance,ms));return out};
  try{toolStatus=window.toolStatus}catch(e){}
}
if(typeof priorAdmin==='function'){
  window.toolAdmin=function(){const out=priorAdmin.apply(this,arguments);[0,30,120].forEach(ms=>setTimeout(enhance,ms));return out};
  try{toolAdmin=window.toolAdmin}catch(e){}
}

function boot(){[0,120,360].forEach(ms=>setTimeout(enhance,ms))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
