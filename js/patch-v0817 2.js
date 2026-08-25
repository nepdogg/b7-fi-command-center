/* B7 FI Command Center v0.80.17 — Alert System Lockdown */
(function(){
'use strict';
const VERSION='0.80.17';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=document.body?.dataset?.liveViewerOnly==='true';
const SEV={red:{key:'critical',label:'CRITICAL'},orange:{key:'attention',label:'ATTENTION'},yellow:{key:'reminder',label:'REMINDER'},blue:{key:'information',label:'INFORMATION'},green:{key:'normal',label:'NORMAL'}};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isoToday=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
let leadTimer=null,systemTimer=null,leadIndex=0,systemIndex=0,lastLead='',lastSystem='';

function setVersion(){
 document.title=viewerOnly?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
 const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function actionKey(a){return a?.id||`auto:${a?.toolId||'general'}:${String(a?.text||'').replace(/\s+/g,' ').slice(0,180)}`}
function migrateControl(k){
 window.state.actionDisplay=window.state.actionDisplay||{};
 if(window.state.actionDisplay[k])return window.state.actionDisplay[k];
 if(k.startsWith('manual:')){const bare=k.slice(7);if(window.state.actionDisplay[bare]){window.state.actionDisplay[k]=window.state.actionDisplay[bare];delete window.state.actionDisplay[bare];return window.state.actionDisplay[k]}}
 return null;
}
function controlFor(k,a){
 let d=migrateControl(k);
 if(!d)d=window.state.actionDisplay[k]={show:true,seconds:a?.severity==='red'?15:a?.severity==='orange'?10:a?.severity==='blue'?6:8,order:999,assignee:'',pin:false,ack:false,displayUntil:'while-open'};
 return d;
}
function firstSeenDays(k){const x=window.state?.actionFirstSeen?.[k];return x?Math.max(0,Math.floor((Date.now()-new Date(x).getTime())/86400000)):0}
function severityFor(a,k){const d=controlFor(k,a);if(d.forceSeverity)return d.forceSeverity;let s=a?.severity||'yellow';if(a?.manual||String(a?.id||'').startsWith('manual:'))return s;const age=firstSeenDays(k);if(s==='yellow'&&age>=2)s='red';else if(s==='yellow'&&age>=1)s='orange';else if(s==='orange'&&age>=1)s='red';return s}
function leadQueue(){
 let raw=[];try{raw=typeof window.v3Alerts==='function'?(window.v3Alerts()||[]):[]}catch(e){}
 return raw.map(a=>{const k=actionKey(a),d=controlFor(k,a);return {...a,_k:k,_d:d,_sev:severityFor(a,k)}}).filter(a=>{
   const d=a._d;if(d.show===false)return false;
   if(d.displayUntil&&d.displayUntil!=='while-open'&&/^\d{4}-\d{2}-\d{2}$/.test(d.displayUntil)&&isoToday()>d.displayUntil)return false;
   return !a.complete;
 }).sort((a,b)=>(Number(b._d.pin)-Number(a._d.pin))||((Number(a._d.order)||999)-(Number(b._d.order)||999))||(({red:0,orange:1,yellow:2,blue:3}[a._sev]??4)-({red:0,orange:1,yellow:2,blue:3}[b._sev]??4)));
}
function systemQueue(){
 let list=[];try{list=typeof window.fleetStatusEntries==='function'?(window.fleetStatusEntries()||[]):[]}catch(e){}
 return list.map(x=>{const t=String(x.text||'');let s='blue';const m=t.match(/BEHIND\s+(\d+)\s+CHECKLIST/i);if(/BLOCKING|CRITICAL/i.test(t)||(m&&Number(m[1])>=4))s='red';else if(m)s='orange';else if(/TARGET NOT SET|AT RISK|OVERDUE/i.test(t))s='yellow';else if(/ON SCHEDULE|SHIPPED|COMPLETE/i.test(t))s='green';else if(/AHEAD/i.test(t))s='blue';return {...x,_sev:s}})
}
function ensureShell(bar,title){
 if(!bar)return null;
 if(!bar.querySelector('.v817-status-left')||!bar.querySelector('.v817-status-message')||!bar.querySelector('.v817-status-count')){
   bar.replaceChildren();
   const left=document.createElement('div');left.className='v817-status-left';left.innerHTML=`<span class="v817-status-lamp" aria-hidden="true"></span><div class="v817-status-copy"><strong class="v817-status-title">${title}</strong><span class="v817-status-severity">NORMAL</span></div>`;
   const msg=document.createElement('button');msg.type='button';msg.className='v817-status-message';
   const count=document.createElement('div');count.className='v817-status-count';
   bar.append(left,msg,count);
 }
 const ttl=bar.querySelector('.v817-status-title');if(ttl)ttl.textContent=title;
 return bar;
}
function paint(bar,title,sev,message,countText,onClick){
 bar=ensureShell(bar,title);if(!bar)return;const info=SEV[sev]||SEV.green;bar.dataset.v817Severity=info.key;bar.dataset.status=info.key;
 const s=bar.querySelector('.v817-status-severity');if(s)s.textContent=info.label;
 const m=bar.querySelector('.v817-status-message');if(m){m.textContent=String(message||'');m.disabled=!onClick;m.onclick=onClick||null}
 const c=bar.querySelector('.v817-status-count');if(c)c.textContent=String(countText||'');
}
function renderLead(reset=false){
 clearTimeout(leadTimer);const q=leadQueue();if(reset)leadIndex=0;
 if(!q.length){leadIndex=0;paint($('#topActionBar'),'LEAD ALERTS','green','NO ACTIVE LEAD ALERTS','0 OPEN');syncDiag(q);return}
 leadIndex=((leadIndex%q.length)+q.length)%q.length;const a=q[leadIndex],d=a._d;lastLead=a._k;
 const owner=d.assignee&&!String(a.text||'').includes('Owner ')?` · Owner ${d.assignee}`:'';
 paint($('#topActionBar'),'LEAD ALERTS',a._sev,`${a.text||''}${owner}`,`← OPEN ${leadIndex+1} OF ${q.length}`,()=>typeof window.actionTarget==='function'&&window.actionTarget(a));syncDiag(q);
 leadTimer=setTimeout(()=>{const next=leadQueue();if(!next.length)return renderLead(true);const p=next.findIndex(x=>x._k===lastLead);leadIndex=((p<0?leadIndex:p)+1)%next.length;renderLead(false)},Math.max(3,Math.min(60,Number(d.seconds)||8))*1000);
}
function renderSystem(reset=false){
 clearTimeout(systemTimer);const q=systemQueue();if(reset)systemIndex=0;
 if(!q.length){systemIndex=0;paint($('#operationsBar'),'SYSTEM STATUS','green','ALL ACTIVE SYSTEMS WITHIN CURRENT STATUS RULES','0 OPEN');return}
 systemIndex=((systemIndex%q.length)+q.length)%q.length;const a=q[systemIndex];lastSystem=`${a.toolId||''}|${a.text||''}`;
 paint($('#operationsBar'),'SYSTEM STATUS',a._sev,a.text||'SYSTEM STATUS AVAILABLE',`← OPEN ${systemIndex+1} OF ${q.length}`,()=>a.toolId&&typeof window.toolStatus==='function'&&window.toolStatus(a.toolId));
 systemTimer=setTimeout(()=>{const next=systemQueue();if(!next.length)return renderSystem(true);const p=next.findIndex(x=>`${x.toolId||''}|${x.text||''}`===lastSystem);systemIndex=((p<0?systemIndex:p)+1)%next.length;renderSystem(false)},8000);
}
function viewerMount(){
 if(!document.body.classList.contains('v802-live-status'))return;
 const mount=$('#v802StatusMount'),lead=$('#topActionBar'),sys=$('#operationsBar');if(!mount||!lead||!sys)return;
 if(lead.parentElement!==mount)mount.appendChild(lead);if(sys.parentElement!==mount)mount.appendChild(sys);if(lead.nextElementSibling!==sys)mount.insertBefore(lead,sys);if(viewerOnly)$('#v802Exit')?.remove();
 ensureShell(lead,'LEAD ALERTS');ensureShell(sys,'SYSTEM STATUS');
}
function refresh(reset=true){viewerMount();renderLead(reset);renderSystem(reset);setVersion()}
window.B7AlertEngine817={refresh,refreshLead:renderLead,refreshSystem:renderSystem,leadQueue,systemQueue};
/* All later legacy calls resolve to no-op; older lexical renderers are guarded in their source files for this build. */
window.renderTopActionBar=function(){};window.updateOperationsBar=function(){};

function cardKey(card){return String(card?.dataset?.auto51||'')}
function isManual(card){return /^manual:/.test(cardKey(card))}
function manualId(card){return cardKey(card).replace(/^manual:/,'')}
function persistCard(card){
 const k=cardKey(card);if(!k)return false;window.state.actionDisplay=window.state.actionDisplay||{};const d=window.state.actionDisplay[k]||(window.state.actionDisplay[k]={});
 d.assignee=card.querySelector('.ac-owner51')?.value.trim()||'';d.show=(card.querySelector('.ac-show51')?.value||'on')==='on';d.seconds=Number(card.querySelector('.ac-sec51')?.value)||8;d.order=Number(card.querySelector('.ac-order51')?.value)||999;d.pin=!!card.querySelector('.ac-pin51')?.checked;d.ack=!!card.querySelector('.ac-ack51')?.checked;
 const mode=card.querySelector('.ac-until-mode51')?.value||'while-open',custom=card.querySelector('.ac-until51')?.value||'';d.displayUntil=mode==='while-open'?'while-open':mode==='today'?isoToday():(custom||'while-open');window.state.actionDisplay[k]=d;card.classList.toggle('v817-alert-off',!d.show);return true;
}
function saveNow(){try{if(typeof window.save==='function')window.save()}catch(e){}renderLead(true);renderSystem(false);syncDiag()}
function deleteManual(card){
 const id=manualId(card);if(!id||!confirm('Permanently delete this manually-created alert/task? This cannot be undone.'))return;
 window.state.manualReminders=(window.state.manualReminders||[]).filter(x=>String(x.id)!==id);delete window.state.actionDisplay?.[`manual:${id}`];delete window.state.actionDisplay?.[id];saveNow();rerenderActions();
}
function resolveManual(card){
 const id=manualId(card),r=(window.state.manualReminders||[]).find(x=>String(x.id)===id);if(!r)return;const note=prompt('Optional resolution note:','');if(note===null)return;
 window.state.actionHistory=Array.isArray(window.state.actionHistory)?window.state.actionHistory:[];window.state.actionHistory.unshift({...JSON.parse(JSON.stringify(r)),historyId:'hist'+Date.now(),resolvedAt:new Date().toISOString(),resolutionNote:note});r.complete=true;r.resolvedAt=new Date().toISOString();saveNow();rerenderActions();
}
function rerenderActions(){if(window.B7Renderers58?.actionCenter){window.B7Renderers58.actionCenter();setTimeout(enhanceActions,0)}else if(typeof window.setView==='function')window.setView('actions')}
function syncDiag(q=leadQueue()){
 const host=$('#v817QueueDiag');if(!host)return;const c={red:0,orange:0,yellow:0,blue:0};q.forEach(x=>c[x._sev]=(c[x._sev]||0)+1);host.innerHTML=`<strong>ACTIVE LEAD ALERTS: ${q.length}</strong> · Critical ${c.red||0} · Attention ${c.orange||0} · Reminder ${c.yellow||0} · Information ${c.blue||0}`;
}
function enhanceActions(){
 if(document.body.dataset.center!=='action')return;
 $$('.auto-action51[data-auto51]').forEach(card=>{
   const controls=card.querySelector('.auto-controls51');if(!controls)return;const k=cardKey(card),manual=isManual(card),d=controlFor(k,{severity:card.classList.contains('red')?'red':card.classList.contains('orange')?'orange':card.classList.contains('blue')?'blue':'yellow'});
   const showLabel=controls.querySelector('.ac-show51')?.closest('label');if(showLabel){const node=Array.from(showLabel.childNodes).find(n=>n.nodeType===Node.TEXT_NODE);if(node)node.nodeValue='Lead Alerts'}
   card.classList.toggle('v817-alert-off',d.show===false);
   let row=card.querySelector('.v817-card-actions');if(!row){row=document.createElement('div');row.className='v817-card-actions';card.appendChild(row)}
   row.replaceChildren();const note=document.createElement('span');note.className='v817-card-note';note.textContent=manual?'MANUAL · USER CONTROLLED':'AUTO · CLEARS ONLY FROM TOOL / WORKFLOW';row.appendChild(note);
   const save=document.createElement('button');save.className='btn small primary v817-save';save.textContent='SAVE CHANGES';save.onclick=e=>{e.preventDefault();persistCard(card);saveNow();enhanceActions()};row.appendChild(save);
   if(manual){const resolve=document.createElement('button');resolve.className='btn small v817-resolve';resolve.textContent='RESOLVE';resolve.onclick=e=>{e.preventDefault();persistCard(card);resolveManual(card)};row.appendChild(resolve);const del=document.createElement('button');del.className='btn small danger v817-delete';del.textContent='DELETE';del.onclick=e=>{e.preventDefault();deleteManual(card)};row.appendChild(del)}
 });
 if(!$('#v817QueueDiag')){const summary=$('.action-summary-grid');if(summary)summary.insertAdjacentHTML('afterend','<div id="v817QueueDiag" class="v817-queue-diag"></div>')}
 syncDiag();
 const saveAll=$('#v815SaveAll');if(saveAll)saveAll.onclick=e=>{e.preventDefault();let n=0;$$('.auto-action51[data-auto51]').forEach(c=>{if(persistCard(c))n++});saveNow();setTimeout(()=>{rerenderActions()},20)};
}

const priorSetView=window.setView;if(typeof priorSetView==='function')window.setView=function(v){const out=priorSetView.apply(this,arguments);setTimeout(()=>{viewerMount();refresh(true);if(v==='actions')enhanceActions()},90);return out};
/* v0.80.15 created bare manual control keys. Migrate them once. */
function migrateManualKeys(){(window.state.manualReminders||[]).forEach(r=>{const full='manual:'+r.id;if(!window.state.actionDisplay?.[full]&&window.state.actionDisplay?.[r.id]){window.state.actionDisplay[full]=window.state.actionDisplay[r.id];delete window.state.actionDisplay[r.id]}})}
let viewerObserver=null;
function watchViewer(){if(!viewerOnly)return;const app=$('#app');if(!app||viewerObserver)return;viewerObserver=new MutationObserver(()=>{const mount=$('#v802StatusMount');if(!mount)return;const lead=$('#topActionBar'),sys=$('#operationsBar');if(lead?.parentElement!==mount||sys?.parentElement!==mount){viewerMount();renderLead(false);renderSystem(false)}});viewerObserver.observe(app,{childList:true});}
function boot(){migrateManualKeys();viewerMount();refresh(true);enhanceActions();watchViewer();[120,420,1100].forEach(ms=>setTimeout(()=>{viewerMount();refresh(false);enhanceActions()},ms))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('storage',()=>{migrateManualKeys();refresh(true)});
})();
