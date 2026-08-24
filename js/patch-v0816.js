/* B7 FI Command Center v0.80.16 — unified Lead Alerts/System Status rotation + Action lifecycle stabilization. */
(function(){
'use strict';
const VERSION='0.80.16';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=document.body?.dataset?.liveViewerOnly==='true';
const SEV={red:{key:'critical',label:'CRITICAL'},orange:{key:'attention',label:'ATTENTION'},yellow:{key:'reminder',label:'REMINDER'},blue:{key:'information',label:'INFORMATION'},green:{key:'normal',label:'NORMAL'}};
const esc=(v)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
let leadIndex=0,systemIndex=0,leadTimer=null,systemTimer=null;
let lastLeadKey='',lastSystemKey='';

function actionKey(a){return a?.id||`auto:${a?.toolId||'general'}:${String(a?.text||'').replace(/\s+/g,' ').slice(0,180)}`}
function ageDays(k){const x=window.state?.actionFirstSeen?.[k];return x?Math.max(0,Math.floor((Date.now()-new Date(x).getTime())/86400000)):0}
function leadSeverity(a,k){const d=window.state?.actionDisplay?.[k]||{};if(d.forceSeverity)return d.forceSeverity;let s=a?.severity||'yellow';if(a?.manual)return s;const age=ageDays(k);if(s==='yellow'&&age>=2)s='red';else if(s==='yellow'&&age>=1)s='orange';else if(s==='orange'&&age>=1)s='red';return s}
function ctlFor(k,a){window.state.actionDisplay=window.state.actionDisplay||{};let d=window.state.actionDisplay[k];if(!d){d=window.state.actionDisplay[k]={show:true,seconds:a?.severity==='red'?15:a?.severity==='orange'?10:a?.severity==='blue'?6:8,order:999,assignee:'',pin:false,ack:false,displayUntil:'while-open'}}return d}
function leadQueue(){
 let raw=[];try{raw=typeof window.v3Alerts==='function'?(window.v3Alerts()||[]):[]}catch(e){}
 return raw.map(a=>{const k=actionKey(a),d=ctlFor(k,a);return {...a,_k:k,_d:d,_sev:leadSeverity(a,k)}}).filter(a=>{
   const d=a._d;if(d.show===false)return false;
   if(d.displayUntil&&d.displayUntil!=='while-open'&&/^\d{4}-\d{2}-\d{2}$/.test(d.displayUntil)&&today()>d.displayUntil)return false;
   return true;
 }).sort((a,b)=>(Number(b._d.pin)-Number(a._d.pin))||((Number(a._d.order)||999)-(Number(b._d.order)||999))||(({red:0,orange:1,yellow:2,blue:3}[a._sev]||4)-({red:0,orange:1,yellow:2,blue:3}[b._sev]||4)));
}
function systemQueue(){
 let list=[];try{list=typeof window.fleetStatusEntries==='function'?(window.fleetStatusEntries()||[]):[]}catch(e){}
 return list.map(x=>{const text=String(x.text||'');let sev='blue';const m=text.match(/BEHIND\s+(\d+)\s+CHECKLIST/i);if(/BLOCKING|CRITICAL/i.test(text)||(m&&Number(m[1])>=4))sev='red';else if(m)sev='orange';else if(/TARGET NOT SET|AT RISK|OVERDUE/i.test(text))sev='yellow';else if(/ON SCHEDULE|SHIPPED|COMPLETE/i.test(text))sev='green';else if(/AHEAD/i.test(text))sev='blue';return {...x,_sev:sev}});
}
function sevInfo(s){return SEV[s]||SEV.green}
function shell(bar,title,sev,message,countText,click){
 if(!bar)return;const info=sevInfo(sev);bar.dataset.v816Severity=info.key;bar.dataset.status=info.key;
 bar.innerHTML=`<div class="v816-status-left"><span class="v816-status-lamp" aria-hidden="true"></span><div class="v816-status-copy"><strong>${title}</strong><span>${info.label}</span></div></div><button type="button" class="v816-status-message">${esc(message)}</button><div class="v816-status-count">${esc(countText)}</div>`;
 const b=bar.querySelector('.v816-status-message');if(click)b.onclick=click;else b.disabled=true;
}
function renderLead(reset=false){
 if(window.B7AlertEngine817)return;
 clearTimeout(leadTimer);const q=leadQueue();if(reset)leadIndex=0;if(!q.length){leadIndex=0;shell($('#topActionBar'),'LEAD ALERTS','green','NO ACTIVE LEAD ALERTS','0 OPEN');syncQueueDiag(q);return}
 leadIndex%=q.length;const a=q[leadIndex],k=a._k,d=a._d;lastLeadKey=k;const owner=d.assignee?` · Owner ${d.assignee}`:'';shell($('#topActionBar'),'LEAD ALERTS',a._sev,`${a.text||''}${owner}`,`← OPEN ${leadIndex+1} OF ${q.length}`,()=>{if(typeof window.actionTarget==='function')window.actionTarget(a)});syncQueueDiag(q);
 leadTimer=setTimeout(()=>{const next=leadQueue();if(!next.length){renderLead(true);return}const pos=Math.max(0,next.findIndex(x=>x._k===lastLeadKey));leadIndex=(pos+1)%next.length;renderLead(false)},Math.max(3,Math.min(60,Number(d.seconds)||8))*1000);
}
function renderSystem(reset=false){
 if(window.B7AlertEngine817)return;
 clearTimeout(systemTimer);const q=systemQueue();if(reset)systemIndex=0;if(!q.length){systemIndex=0;shell($('#operationsBar'),'SYSTEM STATUS','green','ALL ACTIVE SYSTEMS WITHIN CURRENT STATUS RULES','0 OPEN');return}
 systemIndex%=q.length;const a=q[systemIndex];lastSystemKey=`${a.toolId}|${a.text}`;shell($('#operationsBar'),'SYSTEM STATUS',a._sev,a.text||'SYSTEM STATUS AVAILABLE',`← OPEN ${systemIndex+1} OF ${q.length}`,()=>{if(a.toolId&&typeof window.toolStatus==='function')window.toolStatus(a.toolId)});
 systemTimer=setTimeout(()=>{const next=systemQueue();if(!next.length){renderSystem(true);return}const pos=Math.max(0,next.findIndex(x=>`${x.toolId}|${x.text}`===lastSystemKey));systemIndex=(pos+1)%next.length;renderSystem(false)},8000);
}
function ensureViewerMount(){if(!document.body.classList.contains('v802-live-status'))return;const mount=$('#v802StatusMount');if(!mount)return;const lead=$('#topActionBar'),sys=$('#operationsBar');if(lead&&lead.parentElement!==mount)mount.appendChild(lead);if(sys&&sys.parentElement!==mount)mount.appendChild(sys);if(lead&&sys&&lead.nextElementSibling!==sys)mount.insertBefore(lead,sys);if(viewerOnly)$('#v802Exit')?.remove()}
function syncQueueDiag(q=leadQueue()){
 const host=$('#v816QueueDiag');if(!host)return;const counts={red:0,orange:0,yellow:0,blue:0};q.forEach(x=>counts[x._sev]=(counts[x._sev]||0)+1);host.textContent=`LEAD ALERTS QUEUE: ${q.length} · Critical ${counts.red||0} · Attention ${counts.orange||0} · Reminder ${counts.yellow||0} · Information ${counts.blue||0}`;
}
function refreshAll(reset=true){ensureViewerMount();renderLead(reset);renderSystem(reset);const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
window.B7AlertEngine816={refreshLead:renderLead,refreshSystem:renderSystem,refreshAll,leadQueue,systemQueue};
/* Neutralize older interval callbacks that otherwise overwrite the unified bars. */
window.renderTopActionBar=function(){};window.updateOperationsBar=function(){};window.operationalAlerts=function(){return []};

/* Action Center lifecycle + testing controls. */
function isManualCard(card){return String(card?.dataset?.auto51||'').startsWith('manual:')}
function reminderId(card){return String(card?.dataset?.auto51||'').replace(/^manual:/,'')}
function persistCard(card){
 if(!card?.dataset?.auto51)return;const k=card.dataset.auto51;window.state.actionDisplay=window.state.actionDisplay||{};const d=window.state.actionDisplay[k]||(window.state.actionDisplay[k]={});
 d.assignee=card.querySelector('.ac-owner51')?.value.trim()||'';d.show=(card.querySelector('.ac-show51')?.value||'on')==='on';d.seconds=Number(card.querySelector('.ac-sec51')?.value)||8;d.order=Number(card.querySelector('.ac-order51')?.value)||999;d.pin=!!card.querySelector('.ac-pin51')?.checked;d.ack=!!card.querySelector('.ac-ack51')?.checked;const mode=card.querySelector('.ac-until-mode51')?.value||'while-open',custom=card.querySelector('.ac-until51')?.value||'';d.displayUntil=mode==='while-open'?'while-open':mode==='today'?today():(custom||'while-open');card.classList.toggle('v816-alert-off',!d.show);
}
function saveState(){try{if(typeof window.save==='function')window.save()}catch(e){}refreshAll(true)}
function resolveManual(card){const id=reminderId(card),r=(window.state.manualReminders||[]).find(x=>x.id===id);if(!r)return;const note=prompt('Optional resolution note:','')??'';window.state.actionHistory=Array.isArray(window.state.actionHistory)?window.state.actionHistory:[];window.state.actionHistory.unshift({...JSON.parse(JSON.stringify(r)),resolvedAt:new Date().toISOString(),resolutionNote:note,historyId:'hist'+Date.now()});r.complete=true;r.resolvedAt=new Date().toISOString();saveState();rerenderActions()}
function deleteManual(card){const id=reminderId(card);if(!confirm('Permanently delete this manually-created task? This is only for mistakes or test messages.'))return;window.state.manualReminders=(window.state.manualReminders||[]).filter(x=>x.id!==id);delete window.state.actionDisplay?.['manual:'+id];saveState();rerenderActions()}
function reopenHistory(id){const h=(window.state.actionHistory||[]).find(x=>x.historyId===id);if(!h)return;const reason=prompt('Reason for reopening:','')??'';const r=(window.state.manualReminders||[]).find(x=>x.id===h.id);if(r){r.complete=false;r.reopenedAt=new Date().toISOString();r.reopenReason=reason}else{window.state.manualReminders=window.state.manualReminders||[];window.state.manualReminders.unshift({...h,complete:false,resolvedAt:'',reopenedAt:new Date().toISOString(),reopenReason:reason})}const k='manual:'+h.id;window.state.actionDisplay=window.state.actionDisplay||{};window.state.actionDisplay[k]={...(window.state.actionDisplay[k]||{}),show:true,ack:false,working:false};saveState();rerenderActions()}
function historyHtml(){const h=window.state.actionHistory||[];if(!h.length)return'';return `<section class="panel v816-history"><div class="subsection-title"><h3>ACTION / ALERT HISTORY</h3><span>${h.length} resolved manual action${h.length===1?'':'s'}</span></div>${h.slice(0,50).map(x=>`<div class="v816-history-row"><div><b>${esc((x.toolId?'TOOL '+x.toolId+' — ':'')+(x.text||''))}</b><small>Resolved ${x.resolvedAt?new Date(x.resolvedAt).toLocaleString():'—'}${x.resolutionNote?` · ${esc(x.resolutionNote)}`:''}</small></div><button class="btn small v816-reopen" data-history-id="${esc(x.historyId)}">REOPEN ACTION</button></div>`).join('')}</section>`}
function rerenderActions(){if(window.B7Renderers58?.actionCenter){window.B7Renderers58.actionCenter();setTimeout(enhanceActionCenter,0)}else if(typeof window.setView==='function')window.setView('actions')}
function enhanceActionCenter(){
 if(document.body.dataset.center!=='action')return;const app=$('#app');if(!app)return;
 $$('.auto-action51[data-auto51]').forEach(card=>{
   const controls=card.querySelector('.auto-controls51');if(!controls)return;const manual=isManualCard(card);card.classList.toggle('v816-manual',manual);card.classList.toggle('v816-auto',!manual);
   const open=card.querySelector('.auto-open51');if(open){let meta=open.querySelector('.v816-origin');if(!meta){meta=document.createElement('span');meta.className='v816-origin';open.appendChild(meta)}meta.textContent=manual?'MANUAL · USER CONTROLLED':'AUTO · CLEARS FROM TOOL WORKFLOW'}
   const save=controls.querySelector('.ac-save51');if(save){save.textContent='SAVE CHANGES';save.onclick=e=>{e.preventDefault();persistCard(card);saveState();rerenderActions()}}
   if(manual&&!controls.querySelector('.v816-resolve')){const r=document.createElement('button');r.className='btn small v816-resolve';r.textContent='RESOLVE';r.onclick=e=>{e.preventDefault();persistCard(card);resolveManual(card)};controls.appendChild(r);const d=document.createElement('button');d.className='btn small danger v816-delete';d.textContent='DELETE';d.onclick=e=>{e.preventDefault();deleteManual(card)};controls.appendChild(d)}
   const d=window.state.actionDisplay?.[card.dataset.auto51];if(d)card.classList.toggle('v816-alert-off',d.show===false);
 });
 if(!$('#v816QueueDiag')){const summary=$('.action-summary-grid',app);if(summary)summary.insertAdjacentHTML('afterend','<div id="v816QueueDiag" class="v816-queue-diag"></div>')}
 if(!$('#v816HistoryMount')){const div=document.createElement('div');div.id='v816HistoryMount';div.innerHTML=historyHtml();app.appendChild(div);$$('.v816-reopen',div).forEach(b=>b.onclick=()=>reopenHistory(b.dataset.historyId))}
 syncQueueDiag();
}
if(window.B7Renderers58?.actionCenter){const old=window.B7Renderers58.actionCenter;window.B7Renderers58.actionCenter=function(){const x=old.apply(this,arguments);setTimeout(enhanceActionCenter,0);return x}}
const priorSetView=window.setView;if(typeof priorSetView==='function')window.setView=function(v){const x=priorSetView.apply(this,arguments);setTimeout(()=>{ensureViewerMount();refreshAll(true);if(v==='actions')enhanceActionCenter()},30);return x};

/* Save changes should immediately rebuild both queues. */
const priorSave=window.save;if(typeof priorSave==='function')window.save=function(){const x=priorSave.apply(this,arguments);queueMicrotask(()=>refreshAll(true));return x};
function boot(){ensureViewerMount();refreshAll(true);setTimeout(()=>{ensureViewerMount();refreshAll(true);enhanceActionCenter()},140);setTimeout(()=>{ensureViewerMount();refreshAll(false)},700)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
