/* B7 FI Command Center v0.80.35 — live-card plan-change indicator + Operations editable tool navigation.
   - Shows latest ship-plan exception next to UTID/model only when a change exists.
   - Pull In / Push Out / ship-date-only changes derive from countdown plan-change history.
   - Operations carousel opens the actual Tool Detail page; standalone Live Status remains read-only.
*/
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'0.80.35';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
function stamp(){
  window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function currentTool(){try{return window.B7LiveStatusCore?.currentTool?.()||null}catch(e){return null}}
function fmtDate(v){
  if(!v)return''; const s=String(v).trim();
  const m=s.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!m)return s;
  try{return new Date(Number(m[1]),Number(m[2])-1,Number(m[3])).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}catch(e){return s}
}
function splitPlanValue(v){
  const a=String(v||'').split('·').map(x=>x.trim());return{date:a[0]||'',quarter:a[1]||''};
}
function quarterFromShip(v){
  const m=String(v||'').match(/^(\d{4})-(\d{2})/);if(!m)return'';
  return `CY${String(m[1]).slice(-2)}Q${Math.floor((Number(m[2])-1)/3)+1}`;
}
function latestPlanChange(t){
  if(!t)return null;
  const hist=Array.isArray(t.changeHistory)?t.changeHistory:[];
  const h=hist.find(x=>/MFG Ship\s*\/\s*Quarter|Ship Date|Quarter/i.test(String(x.field||'')) && String(x.oldValue??'')!==String(x.newValue??''));
  if(h){
    const old=splitPlanValue(h.oldValue), neu=splitPlanValue(h.newValue);
    const type=String(h.type||'').toUpperCase();
    if(type.includes('PULL'))return{kind:'pull',title:`PULLED INTO ${neu.quarter||t.quarter||quarterFromShip(t.ship)||'CURRENT QUARTER'}`,detail:[old.quarter,neu.quarter].filter(Boolean).join(' → ')||`${fmtDate(old.date)} → ${fmtDate(neu.date)}`};
    if(type.includes('PUSH'))return{kind:'push',title:`PUSHED OUT${neu.quarter?` TO ${neu.quarter}`:''}`,detail:[old.quarter,neu.quarter].filter(Boolean).join(' → ')||`${fmtDate(old.date)} → ${fmtDate(neu.date)}`};
    if(old.date&&neu.date&&old.date!==neu.date)return{kind:'date',title:'SHIP DATE CHANGED',detail:`${fmtDate(old.date)} → ${fmtDate(neu.date)}`};
    if(old.quarter&&neu.quarter&&old.quarter!==neu.quarter)return{kind:'date',title:'QUARTER CHANGED',detail:`${old.quarter} → ${neu.quarter}`};
  }
  const origShip=t.originalShip||'', curShip=t.ship||t.shipDate||'';
  const oq=t.originalQuarter||quarterFromShip(origShip), cq=t.quarter||quarterFromShip(curShip);
  if(oq&&cq&&oq!==cq){
    return{kind:'date',title:'PLAN CHANGED',detail:`${oq} → ${cq}`};
  }
  if(origShip&&curShip&&origShip!==curShip)return{kind:'date',title:'SHIP DATE CHANGED',detail:`${fmtDate(origShip)} → ${fmtDate(curShip)}`};
  return null;
}
function renderPlan(t){
  const p=latestPlanChange(t);if(!p)return'';
  return `<div class="v835-plan-change ${esc(p.kind)}"><span>PLAN CHANGE</span><b>${esc(p.title)}</b><small>${esc(p.detail)}</small></div>`;
}
function applyPlan(t){
  const host=$('#v802ToolHost');if(!host||!t)return;
  const identity=$('.v805-tool-identity',host);if(!identity)return;
  $$('.v835-plan-change',identity).forEach(x=>x.remove());
  const html=renderPlan(t);if(html)identity.insertAdjacentHTML('afterbegin',html);
}
function openOperationsTool(t){
  if(!t)return;const id=t.id||t.utid;if(!id)return;
  try{if(typeof toolStatus==='function'){toolStatus(String(id));return}}catch(e){}
  try{window.toolStatus?.(String(id));return}catch(e){}
  try{window.setView?.('toolcenter')}catch(e){}
}
function bindCard(t){
  const host=$('#v802ToolHost');const slide=$('.v802-tool-slide',host);if(!slide||!t)return;
  const hint=$('.v802-open-hint',slide);
  if(viewerOnly()){
    if(hint)hint.textContent='CLICK SYSTEM FOR READ-ONLY TOOL DETAIL';
    return; // preserve the existing read-only modal handler
  }
  if(document.body.dataset.center==='home'||document.body.classList.contains('v825-operations-dashboard')){
    if(hint)hint.textContent='CLICK SYSTEM TO OPEN TOOL DETAIL';
    slide.setAttribute('aria-label',`Open tool ${t.id||t.utid||''} detail`);
    slide.onclick=e=>{e.preventDefault();openOperationsTool(t)};
  }
}
function apply(t=currentTool()){stamp();if(!t)return;applyPlan(t);bindCard(t)}
document.addEventListener('b7fi:live-tool-change',e=>{const t=e.detail?.tool||currentTool();requestAnimationFrame(()=>apply(t))});
const priorSetView=window.setView;if(typeof priorSetView==='function')window.setView=function(){const r=priorSetView.apply(this,arguments);setTimeout(()=>apply(),0);setTimeout(()=>apply(),120);return r};
function startup(){stamp();setTimeout(()=>apply(),100);setTimeout(()=>apply(),360)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
