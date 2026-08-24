/* B7 FI Command Center v0.80.45 — current plan state + reversible plan changes.
   - Adds PLANNED <quarter> metric derived from current active plan state.
   - Pull In / Push Out counters count only currently-active deltas vs original plan.
   - Adds REVERSE LATEST PLAN CHANGE on the Master Tool editor.
   - Reversal restores the immediately previous ship date/quarter, preserves audit history,
     and removes/reverts live badges and counters automatically.
   - Brings the same quarter summary metrics to Operations / standalone Live Status.
*/
(function(){'use strict';
const VERSION='0.80.45',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function stamp(){document.title=(document.body?.dataset?.liveViewerOnly==='true'?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`);const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function allTools(){try{return Array.isArray(tools)?tools:[]}catch(e){return[]}}
function qFromDate(v){const m=String(v||'').match(/^(\d{4})-(\d{2})/);return m?`CY${m[1].slice(-2)}Q${Math.floor((+m[2]-1)/3)+1}`:''}
function quarter(){try{if(typeof quarterLabel==='function')return String(quarterLabel()).toUpperCase()}catch(e){};try{if(typeof window.B7ActiveQuarter==='function')return String(window.B7ActiveQuarter()).toUpperCase()}catch(e){};return'CY26Q3'}
function splitValue(v){const a=String(v||'').split('·').map(x=>x.trim());return{ship:a[0]||'',quarter:a[1]||''}}
function baseline(t){return{ship:t?.originalShip||t?.ship||t?.shipDate||'',quarter:String(t?.originalQuarter||qFromDate(t?.originalShip)||t?.quarter||qFromDate(t?.ship||t?.shipDate)||'').toUpperCase()}}
function current(t){return{ship:t?.ship||t?.shipDate||'',quarter:String(t?.quarter||qFromDate(t?.ship||t?.shipDate)||'').toUpperCase()}}
function quarterIndex(q){const m=String(q||'').match(/^CY(\d{2})Q([1-4])$/i);return m?Number(m[1])*4+Number(m[2]):-1}
function planDelta(t){const b=baseline(t),c=current(t);if(b.quarter&&c.quarter&&b.quarter!==c.quarter){const bi=quarterIndex(b.quarter),ci=quarterIndex(c.quarter);return{kind:ci<bi?'pull':'push',old:b,new:c}}if(b.ship&&c.ship&&b.ship!==c.ship)return{kind:'date',old:b,new:c};return null}
function activePlanHistory(t){const hist=Array.isArray(t?.changeHistory)?t.changeHistory:[];return hist.find(h=>!h?.reversedAt&&!/^Reversal$/i.test(String(h?.type||''))&&/MFG Ship\s*\/\s*Quarter|Ship Date|Quarter/i.test(String(h?.field||''))&&String(h?.oldValue??'')!==String(h?.newValue??''))||null}
function planInfo(t){const d=planDelta(t);if(!d)return null;const h=activePlanHistory(t);if(d.kind==='pull')return{kind:'pull',label:'↑ PULL IN',title:`PULLED INTO ${d.new.quarter}`,detail:`${d.old.quarter} → ${d.new.quarter}`,history:h};if(d.kind==='push')return{kind:'push',label:'↓ PUSH OUT',title:`PUSHED OUT TO ${d.new.quarter}`,detail:`${d.old.quarter} → ${d.new.quarter}`,history:h};return{kind:'date',label:'SHIP DATE CHANGED',title:'SHIP DATE CHANGED',detail:`${d.old.ship} → ${d.new.ship}`,history:h}}
function isPulled(t,q){const d=planDelta(t);return !!d&&d.kind==='pull'&&d.new.quarter===q}
function isPushed(t,q){const d=planDelta(t);return !!d&&d.kind==='push'&&d.old.quarter===q}
function baselineCount(q){return allTools().filter(t=>String(t.quarterStatus||'')!=='Archive'&&baseline(t).quarter===q).length}
function plannedCount(q){return baselineCount(q)+allTools().filter(t=>isPulled(t,q)).length-allTools().filter(t=>isPushed(t,q)).length}
function metric(label,value,cls,always=false,activeOverride){const active=activeOverride!=null?activeOverride:(always||Number(value)>0);return `<div class="metric v845-metric ${cls} ${active?'v845-active':'v845-inactive'}"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`}
function status(t){try{return typeof statusFor==='function'?String(statusFor(t)):String(t?.quarterStatus||'Waiting for FI')}catch(e){return String(t?.quarterStatus||'Waiting for FI')}}
function isPacking(t){const s=status(t).toLowerCase(),ss=String(t?.schedule?.status||'').toLowerCase();return s.includes('pack')||(ss&&!/n\/a|not started|complete/.test(ss)&&/(progress|pack|active|updated)/.test(ss))}
function summaryData(q){const list=allTools().filter(t=>String(t.quarterStatus||'')!=='Archive'&&baseline(t).quarter===q);const waiting=list.filter(t=>status(t)==='Waiting for FI').length,infi=list.filter(t=>status(t)==='In FI').length,packing=list.filter(isPacking).length,shipped=list.filter(t=>status(t)==='Shipped').length,pulled=allTools().filter(t=>isPulled(t,q)).length,pushed=allTools().filter(t=>isPushed(t,q)).length,base=baselineCount(q),planned=plannedCount(q);return{q,list,waiting,infi,packing,shipped,pulled,pushed,base,planned}}
function summaryHtml(d){return metric(`${d.q} TOOLS`,d.base,'v845-total',true)+metric(`PLANNED ${d.q} TOOLS`,d.planned,'v845-planned',false,d.planned!==d.base)+metric('WAITING FI',d.waiting,'v845-waiting')+metric('IN FI',d.infi,'v845-infi')+metric('PACKING',d.packing,'v845-packing')+metric('SHIPPED',d.shipped,'v845-shipped')+metric(`PULLED INTO ${d.q}`,d.pulled,'v845-pulled')+metric('PUSHED OUT',d.pushed,'v845-pushed')}
function enhanceToolCenterSummary(){const dash=$('.v837-tool-dashboard'),grid=dash&&$('.v837-summary-grid',dash);if(!grid)return;const d=summaryData(quarter());grid.classList.add('v845-summary-grid');grid.innerHTML=summaryHtml(d)}
function enhanceLiveSummary(){const q=quarter(),d=summaryData(q);$$('.v802-live-metrics').forEach(grid=>{grid.classList.add('v845-live-summary');grid.innerHTML=summaryHtml(d)})}
function enhanceFullPlanBadge(){const t=(()=>{try{return window.B7LiveStatusCore?.currentTool?.()||null}catch(e){return null}})();const host=$('#v802ToolHost');if(!host||!t)return;$$('.v835-plan-change',host).forEach(x=>x.remove());const p=planInfo(t);if(!p)return;const identity=$('.v805-tool-identity',host);if(identity)identity.insertAdjacentHTML('afterbegin',`<div class="v835-plan-change ${esc(p.kind)}"><span>PLAN CHANGE</span><b>${esc(p.title)}</b><small>${esc(p.detail)}</small></div>`)}
function enhanceMiniPlanBadges(){$$('.v842-mini-tool-card').forEach(card=>{const id=card.closest('[data-v837-tool]')?.dataset.v837Tool||card.dataset.v837Tool;const t=allTools().find(x=>String(x.id)===String(id));if(!t)return;const p=planInfo(t),slot=$('.v842-plan,.v842-plan-placeholder',card);if(slot){slot.className=p?`v842-plan ${p.kind}`:'v842-plan-placeholder';slot.textContent=p?p.label:'NO PLAN CHANGE';slot.style.display=p?'':'none'}})}
function editorId(){const m=String($('#headerPageTitle')?.textContent||'').match(/TOOL\s+(\d+)/i);return m?m[1]:''}
function toolById(id){return allTools().find(t=>String(t.id)===String(id))}
function renderLatestPlanBox(){const master=$('.v838-master-tool');if(!master)return;const id=editorId(),t=toolById(id),p=t&&planInfo(t);$('#v845LatestPlan')?.remove();if(!p)return;const plan=$('#tm-plan-type')?.closest('.v838-subsection');if(!plan)return;$('#v841LatestPlan')?.remove();const box=document.createElement('div');box.id='v845LatestPlan';box.className=`v845-latest-plan ${p.kind}`;box.innerHTML=`<div><span>CURRENT ACTIVE PLAN CHANGE</span><b>${esc(p.title)}</b><small>${esc(p.detail)}</small></div><button type="button" id="v845ReversePlan" class="btn danger">REVERSE LATEST PLAN CHANGE</button>`;const helper=plan.querySelector('.helper');if(helper)helper.after(box);else plan.prepend(box);$('#v845ReversePlan').onclick=()=>reverseLatest(id)}
function reverseLatest(id){const t=toolById(id);if(!t)return;const h=activePlanHistory(t);if(!h)return alert('There is no active plan change to reverse.');const old=splitValue(h.oldValue),cur=current(t);if(!confirm(`Reverse latest plan change for Tool ${id}?\n\nRestore ${old.ship||'previous ship date'} · ${old.quarter||'previous quarter'}?`))return;
  const before=`${cur.ship} · ${cur.quarter}`;if(old.ship)t.ship=old.ship;if(old.quarter)t.quarter=old.quarter;h.reversedAt=new Date().toISOString();h.reversedBy='Plan Reversal';t.changeHistory=t.changeHistory||[];t.changeHistory.unshift({field:'Plan Reversal',oldValue:before,newValue:`${t.ship} · ${t.quarter}`,type:'Reversal',reason:`Reversed ${h.type||'plan change'}`,changedAt:new Date().toISOString()});
  // Rebuild legacy convenience flags from the new current delta.
  t.pullIn='';t.pulledInFrom='';t.pushOut='';t.nextQuarter='';const d=planDelta(t);if(d?.kind==='pull'){t.pullIn=t.ship;t.pulledInFrom=d.old.quarter}else if(d?.kind==='push'){t.pushOut=t.ship;t.nextQuarter=t.quarter}
  try{save()}catch(e){console.error(e);return alert('Could not save the reversal.')}try{sessionStorage.setItem('b7.v841.saveNotice',JSON.stringify({id,at:Date.now()}))}catch(e){};try{window.toolAdmin(id)}catch(e){location.reload()}}
function enhanceEditor(){renderLatestPlanBox()}
function refresh(){stamp();enhanceToolCenterSummary();enhanceLiveSummary();enhanceFullPlanBadge();enhanceMiniPlanBadges();enhanceEditor()}
const prior=window.setView;if(typeof prior==='function'){window.setView=function(){const r=prior.apply(this,arguments);[0,50,150,320].forEach(ms=>setTimeout(refresh,ms));return r};try{setView=window.setView}catch(e){}}
if(typeof window.toolAdmin==='function'){const p=window.toolAdmin;window.toolAdmin=function(){const r=p.apply(this,arguments);[0,40,140].forEach(ms=>setTimeout(refresh,ms));return r};try{toolAdmin=window.toolAdmin}catch(e){}}
if(typeof window.toolStatus==='function'){const p=window.toolStatus;window.toolStatus=function(){const r=p.apply(this,arguments);[0,40,140].forEach(ms=>setTimeout(refresh,ms));return r};try{toolStatus=window.toolStatus}catch(e){}}
document.addEventListener('b7fi:live-tool-change',()=>setTimeout(refresh,0));
function boot(){[0,100,300,700].forEach(ms=>setTimeout(refresh,ms))}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
