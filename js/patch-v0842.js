/* B7 FI Command Center v0.80.42 — Standard/Mini Tool Card system.
   Tool Center mini cards are photo-less compact versions of the Live Status card.
   All six workflow positions are always reserved and read the same master tool record.
*/
(function(){'use strict';
const VERSION='0.80.42',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function getTools(){try{return tools||[]}catch(e){return[]}} function byId(id){return getTools().find(t=>String(t.id)===String(id))}
function pct(fn,t){try{return Math.max(0,Math.min(100,Math.round(fn(t)||0)))}catch(e){return 0}}
function fi(t){try{return pct(routeProgress,t)}catch(e){return 0}} function admin(t){try{return pct(adminProgress,t)}catch(e){return 0}}
function micro(t){try{return typeof microScheduleInfo==='function'?microScheduleInfo(t):null}catch(e){return null}}
function pack(t){try{return typeof packingProgress==='function'?pct(packingProgress,t):0}catch(e){return 0}}
function fmtD(v){try{return typeof fmt==='function'?fmt(v):(v||'—')}catch(e){return v||'—'}}
function reqNorm(v){const s=String(v??'TBD').trim().toLowerCase();if(s==='yes'||s==='required')return'yes';if(s==='no'||s==='not required'||s==='n/a'||s==='na')return'no';return'tbd'}
function sourcePct(s){return ({'not started':0,'preparing':15,'pre-source in progress':35,'ready for ca':55,'with ca team':72,'source complete':90,'returned to fi':100,'complete':100,'completed':100})[String(s||'not started').toLowerCase()]??0}
function strPct(s){return ({'not started':0,'requirements pending':10,'requirements received':25,'testing':55,'submitted to ca':75,'customer approval pending':90,'complete':100,'completed':100})[String(s||'not started').toLowerCase()]??0}
function req(t,type){const required=reqNorm(t[type+'Required']),status=String(t[type+'Status']||'Not Started');if(required==='no')return{label:'NOT REQUIRED',pct:0,on:false};if(required==='tbd')return{label:'TBD',pct:0,on:false};const p=type==='source'?sourcePct(status):strPct(status);return{label:`${status.toUpperCase()} · ${p}%`,pct:p,on:true}}
function latestPlan(t){const h=Array.isArray(t?.changeHistory)&&t.changeHistory.length?t.changeHistory[0]:null,type=String(h?.type||'').toLowerCase();if(type.includes('pull')||t?.pullIn)return{cls:'pull',txt:'↑ PULL IN'};if(type.includes('push')||t?.pushOut)return{cls:'push',txt:'↓ PUSH OUT'};if(type.includes('ship date'))return{cls:'date',txt:'SHIP DATE CHANGED'};return null}
function row(label,value,p,cls='',active=true,meta=''){return `<div class="v842-progress ${cls} ${active?'active':'inactive'}"><div class="v842-progress-head"><span>${esc(label)}</span><b>${esc(value)}</b></div><div class="v842-track"><i style="width:${active?p:0}%"></i></div>${meta?`<small>${esc(meta)}</small>`:''}</div>`}
function status(t){try{return typeof statusFor==='function'?statusFor(t):(t.quarterStatus||'In FI')}catch(e){return t.quarterStatus||'In FI'}}
function render(card,t){const fp=fi(t),ap=admin(t),mi=micro(t),pp=pack(t),sr=req(t,'source'),str=req(t,'str'),pl=latestPlan(t),st=status(t);let packStarted=pp>0||/packing|shipped/i.test(String(t.quarterStatus||''));
 const model=t.model||t.toolType||'—',customer=t.customer||'—',so=t.so||t.salesOrder||'—',driver=t.driver||t.assignedDriver||'Unassigned',room=t.room||t.cleanroom||'—';
 card.classList.add('v842-mini-tool-card');
 card.innerHTML=`<div class="v842-head"><div><div class="v842-utid">${esc(t.id||t.utid)}</div><div class="v842-sub"><b>${esc(model)}</b> · ${esc(customer)}</div></div><span class="v842-status">${esc(String(st).toUpperCase())}</span></div>${pl?`<div class="v842-plan ${pl.cls}">${esc(pl.txt)}</div>`:'<div class="v842-plan-placeholder">NO PLAN CHANGE</div>'}<div class="v842-progress-grid">${row('FI TESTING',fp?fp+'%':'NOT STARTED',fp,'fi',fp>0,t.checklist||t.currentChecklist||'')}${row('LEAD / ADMIN',ap?ap+'%':'NOT STARTED',ap,'admin',ap>0)}${row('MICRO SCHEDULE',mi?.set?(mi.plannedPct+'%'):'TARGET NOT SET',mi?.set?mi.plannedPct:0,'micro',!!mi?.set,mi?.set?(mi.label||mi.target||''):'')}${row('PACKING / SHIPPING',packStarted?(pp+'%'):'NOT STARTED',pp,'packing',packStarted,t.schedule?.status||'')}${row('CUSTOMER SOURCE',sr.label,sr.pct,'source',sr.on)}${row('STR',str.label,str.pct,'str',str.on)}</div><div class="v842-fields"><div><span>SALES ORDER</span><b>${esc(so)}</b></div><div><span>SHIP DATE</span><b>${esc(fmtD(t.ship||t.shipDate))}</b></div><div><span>DRIVER</span><b>${esc(driver)}</b></div><div><span>CLEANROOM</span><b>${esc(room)}${t.bay?' / '+esc(t.bay):''}</b></div></div>`;
}
function enhance(){stamp();$$('[data-v837-tool]').forEach(c=>{const t=byId(c.dataset.v837Tool);if(t)render(c,t)})}
const prior=window.setView;if(typeof prior==='function'){window.setView=function(){const r=prior.apply(this,arguments);[0,40,120].forEach(ms=>setTimeout(enhance,ms));return r};try{setView=window.setView}catch(e){}}
function boot(){[0,150,400].forEach(ms=>setTimeout(enhance,ms))}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
