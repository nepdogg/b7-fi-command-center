/* B7 FI Command Center v0.80.2 — Live Status display refinement + read-only tool modal. */
(function(){
'use strict';
window.VERSION='0.80.2';
const $=(s,r=document)=>r.querySelector(s);
let liveTimer=null, liveIndex=0, livePaused=false, modalWasPaused=false;
let statusHome=null;
const oldSetView=window.setView;
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function safe(v,f='—'){return v===undefined||v===null||String(v).trim()===''?f:String(v)}
function toolsList(){try{return (typeof tools!=='undefined'&&Array.isArray(tools))?tools:[]}catch(e){return []}}
function activeTools(){return toolsList().filter(t=>!/^archive$/i.test(String(t.quarterStatus||t.status||'')))}
function progress(t){
 try{if(typeof routeProgress==='function')return Math.max(0,Math.min(100,Number(routeProgress(t))||0))}catch(e){}
 const candidates=[t.progress,t.fiProgress,t.testingProgress,t.percentComplete,t.completion];
 for(const v of candidates){const n=Number(v);if(Number.isFinite(n))return Math.max(0,Math.min(100,n<=1?n*100:n))}return 0;
}
function imageFor(t){const key=String(t.toolType||t.model||t.type||'').trim(),map=window.B7_PRODUCT_IMAGES||{};return map[key]||t.productImage||t.image||'assets/kla-plus-official.png'}
function fmtDate(v){try{return typeof fmt==='function'?fmt(v):safe(v)}catch(e){return safe(v)}}
function metricCounts(list){const c={shipped:0,infi:0,packing:0,waiting:0};list.forEach(t=>{const s=String(t.quarterStatus||t.status||'').toLowerCase();if(s.includes('shipped'))c.shipped++;else if(s.includes('packing'))c.packing++;else if(s.includes('in fi')||s==='fi')c.infi++;else if(s.includes('waiting'))c.waiting++});return c}
function fields(t){return [['UTID',t.utid||t.id],['Tool / Model',t.toolType||t.model||t.type],['Customer',t.customer],['Sales Order',t.salesOrder||t.so],['Current Checklist',t.currentChecklist||t.checklist],['Ship Date',t.shipDate||t.ship],['Driver',t.driver||t.assignedDriver],['Cleanroom',t.cleanroom||t.room||t.location],['Phase',t.quarterStatus||t.status]]}
function stopTimer(){if(liveTimer){clearTimeout(liveTimer);liveTimer=null}}
function schedule(){stopTimer();if(livePaused||!document.body.classList.contains('v802-live-status')||$('#v802ToolModal'))return;liveTimer=setTimeout(()=>{const list=activeTools();if(list.length){liveIndex=(liveIndex+1)%list.length;drawTool()}schedule()},12000)}
function statusBarsToLive(){
 const mount=$('#v802StatusMount'),top=$('#topActionBar'),sys=$('#operationsBar'),home=$('.sticky-header .header-status-stack');
 if(!mount||!top||!sys)return;
 if(!statusHome&&home)statusHome=home;
 mount.append(top,sys);
}
function statusBarsHome(){
 if(!statusHome)statusHome=$('.sticky-header .header-status-stack');
 const top=$('#topActionBar'),sys=$('#operationsBar'),toolbar=$('#floatingActions');
 if(statusHome&&top&&sys){statusHome.insertBefore(top,toolbar||null);statusHome.insertBefore(sys,toolbar||null)}
}
function closeModal(){const m=$('#v802ToolModal');if(!m)return;m.remove();livePaused=modalWasPaused;const p=$('#v802Pause');if(p)p.textContent=livePaused?'RESUME':'PAUSE';if(!livePaused)schedule()}
function readOnlyWorkflow(t){
 let route='',lead='';
 try{if(typeof routeWorkflow==='function')route=routeWorkflow(t,false)}catch(e){}
 try{if(typeof leadWorkflow==='function')lead=leadWorkflow(t,false)}catch(e){}
 return {route,lead};
}
function openToolModal(t){
 if(!t)return;modalWasPaused=livePaused;livePaused=true;stopTimer();
 const old=$('#v802ToolModal');if(old)old.remove();
 const p=progress(t),wf=readOnlyWorkflow(t);
 let rc={done:'—',total:'—'},lc={done:'—',total:'—'};
 try{if(typeof routeCounts==='function')rc=routeCounts(t)}catch(e){}
 try{if(typeof leadCounts==='function')lc=leadCounts(t)}catch(e){}
 const ncs=Array.isArray(t.ncs)?t.ncs:[];
 const modal=document.createElement('div');modal.id='v802ToolModal';modal.className='v802-tool-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label',`Tool ${safe(t.id||t.utid)} detail`);
 modal.innerHTML=`<div class="v802-tool-modal-card"><button type="button" class="v802-modal-close" aria-label="Close tool detail">×</button><div class="v802-modal-scroll"><div class="report-screen v802-readonly-detail"><div class="v802-detail-head"><div><span>TOOL DETAIL · READ ONLY</span><h2>${esc(safe(t.id||t.utid,'SYSTEM'))} · ${esc(safe(t.model||t.toolType))}</h2><p>${esc([t.codename,t.customer,t.room||t.cleanroom].filter(Boolean).join(' · ')||'B7 Final Integration')}</p></div><div class="v802-readonly-badge">DISPLAY ONLY</div></div><div class="metric-grid"><div class="metric"><span>MFG Ship Date</span><strong>${esc(fmtDate(t.ship||t.shipDate))}</strong></div><div class="metric"><span>Current Checklist</span><strong>${esc(safe(t.checklist||t.currentChecklist))}</strong></div><div class="metric"><span>Tool Progress</span><strong>${Math.round(p)}%</strong><small>${esc(String(rc.done))}/${esc(String(rc.total))} complete</small></div><div class="metric"><span>Lead / Admin</span><strong>${esc(String(lc.done))}/${esc(String(lc.total))}</strong><small>complete / applicable</small></div><div class="metric"><span>Tool Status</span><strong>${esc(safe(t.quarterStatus||t.status))}</strong></div></div><div class="tool-status-grid"><div class="tool-status-block"><h3>Tool Information</h3>${[['Product Family',t.family],['Code Name',t.codename],['Model',t.model||t.toolType],['UTID',t.id||t.utid],['Sales Order',t.so||t.salesOrder],['Customer',t.customer],['Cleanroom',t.room||t.cleanroom],['Bay',t.bay],['Assignment',t.driver||t.assignedDriver],['SW Version',t.sw],['FI Process',t.process],['Lamp Hours',t.lamp]].map(([k,v])=>`<div class="kv"><span>${esc(k)}</span><strong>${esc(safe(v))}</strong></div>`).join('')}</div><div class="tool-status-block"><h3>FI Status / Issues</h3>${[['Current Checklist',t.checklist||t.currentChecklist],['Latest Status',t.activity],['POA',t.poa],['Escalation Meeting',t.escalationMeeting],['Waivers',t.waivers],['Open NCs',ncs.map(n=>`${safe(n.id,'')} ${safe(n.state,'')}`.trim()).filter(Boolean).join(', ')||'None']].map(([k,v])=>`<div class="kv"><span>${esc(k)}</span><strong>${esc(safe(v))}</strong></div>`).join('')}</div><div class="tool-status-block"><h3>Shipping Schedule</h3>${[['Schedule',t.schedule?`${safe(t.schedule.publish,'')} / ${safe(t.schedule.status,'')}`:'—'],['Subsystems',t.schedule&&fmtDate(t.schedule.subsystems)],['Cable Kit',t.schedule&&fmtDate(t.schedule.cables)],['Accessories',t.schedule&&fmtDate(t.schedule.accessories)],['MST',t.schedule&&fmtDate(t.schedule.mst)],['IS',t.schedule&&fmtDate(t.schedule.is)],['Notes',t.schedule&&t.schedule.notes]].map(([k,v])=>`<div class="kv"><span>${esc(k)}</span><strong>${esc(safe(v))}</strong></div>`).join('')}</div></div>${wf.route||wf.lead?`<div class="progress-board">${wf.route?`<div class="progress-panel"><h3>FI Checklist Route</h3>${wf.route}</div>`:''}${wf.lead?`<div class="progress-panel"><h3>Lead / Admin Workflow</h3>${wf.lead}</div>`:''}</div>`:''}</div></div></div>`;
 document.body.appendChild(modal);
 modal.querySelector('.v802-modal-close').onclick=closeModal;
 modal.addEventListener('mousedown',e=>{if(e.target===modal)closeModal()});
 modal.querySelector('.v802-modal-close').focus();
}
function drawTool(){
 const host=$('#v802ToolHost'),list=activeTools(),counter=$('#v802Counter');if(!host)return;
 if(counter)counter.textContent=list.length?`${liveIndex+1} OF ${list.length}`:'0 TOOLS';
 if(!list.length){host.innerHTML='<div class="v802-empty">No active tools. Add or activate tools in Tool Center to populate Live Status.</div>';return}
 liveIndex=(liveIndex+list.length)%list.length;const t=list[liveIndex],p=progress(t),title=safe(t.utid||t.id,'SYSTEM'),subtitle=[t.toolType||t.model||t.type,t.customer].filter(Boolean).join(' · ');
 host.innerHTML=`<button type="button" class="v802-tool-slide" aria-label="Open read-only detail for tool ${esc(title)}"><div class="v802-tool-visual"><img src="${esc(imageFor(t))}" alt="${esc(safe(t.toolType||t.model||'KLA system'))}"></div><div class="v802-tool-body"><div class="v802-tool-kicker">ACTIVE B7 FI SYSTEM</div><h2>${esc(title)}</h2><div class="v802-tool-sub">${esc(subtitle||'B7 Final Integration')}</div><div class="v802-tool-grid">${fields(t).map(([k,v])=>`<div class="v802-tool-field"><span>${esc(k)}</span><b>${esc(k==='Ship Date'?fmtDate(v):safe(v))}</b></div>`).join('')}</div><div class="v802-progress"><div class="v802-progress-top"><span>FI TESTING PROGRESS</span><b>${Math.round(p)}%</b></div><div class="v802-progress-track"><div class="v802-progress-fill" style="width:${p}%"></div></div></div><div class="v802-open-hint">CLICK SYSTEM FOR READ-ONLY TOOL DETAIL</div></div></button>`;
 const img=host.querySelector('img');if(img)img.onerror=()=>{img.onerror=null;img.src='assets/kla-plus-official.png'};
 host.querySelector('.v802-tool-slide').onclick=()=>openToolModal(t);
}
function renderLive(){
 document.body.classList.remove('v801-live-status');document.body.classList.add('v802-live-status');stopTimer();window.scrollTo(0,0);
 const app=$('main#app');if(!app)return;const list=activeTools(),c=metricCounts(list);liveIndex=Math.min(liveIndex,Math.max(0,list.length-1));
 app.innerHTML=`<section class="v802-live"><div class="v802-live-top"><img class="v802-live-brand" src="assets/kla-plus-official.png" alt="KLA+"><button id="v802Exit" class="v802-live-exit">← RETURN TO B7 FI COMMAND CENTER</button></div><div id="v802StatusMount" class="header-status-stack v802-live-status-stack"></div><div class="v802-live-metrics"><div class="v802-live-metric"><span>Active Tools</span><b>${list.length}</b></div><div class="v802-live-metric"><span>In FI</span><b>${c.infi}</b></div><div class="v802-live-metric"><span>Packing</span><b>${c.packing}</b></div><div class="v802-live-metric"><span>Waiting</span><b>${c.waiting}</b></div><div class="v802-live-metric"><span>Shipped</span><b>${c.shipped}</b></div></div><div class="v802-carousel"><div id="v802ToolHost"></div><div class="v802-carousel-foot"><span><i class="v802-live-dot"></i>LIVE LOCAL DATA</span><div class="v802-carousel-controls"><button id="v802Prev" title="Previous tool" aria-label="Previous tool">◀</button><button id="v802Pause" title="Pause rotation">PAUSE</button><button id="v802Next" title="Next tool" aria-label="Next tool">▶</button></div><b id="v802Counter"></b></div></div></section>`;
 statusBarsToLive();
 $('#v802Exit').onclick=()=>window.setView('home');
 $('#v802Prev').onclick=()=>{const n=activeTools().length;if(n){liveIndex=(liveIndex-1+n)%n;drawTool()}schedule()};
 $('#v802Next').onclick=()=>{const n=activeTools().length;if(n){liveIndex=(liveIndex+1)%n;drawTool()}schedule()};
 $('#v802Pause').onclick=e=>{livePaused=!livePaused;e.currentTarget.textContent=livePaused?'RESUME':'PAUSE';if(livePaused)stopTimer();else schedule()};
 drawTool();schedule();
}
function leaveLive(){if(!document.body.classList.contains('v802-live-status'))return;stopTimer();closeModal();statusBarsHome();document.body.classList.remove('v802-live-status');livePaused=false}
window.setView=function(v){
 if(v==='livestatus'||v==='live-status'){renderLive();return}
 leaveLive();const r=oldSetView?oldSetView(v):undefined;requestAnimationFrame(()=>{const label=$('#appVersionLabel');if(label)label.textContent='B7 FI COMMAND CENTER V0.80.2'});return r;
};
/* Ensure the Operations Live Status card routes to the dedicated display even if a legacy handler is still attached. */
document.addEventListener('click',e=>{const card=e.target.closest('.v57-live-card');if(!card)return;const text=(card.textContent||'').toUpperCase();if(text.includes('LIVE STATUS CENTER')){e.preventDefault();e.stopImmediatePropagation();window.setView('livestatus')}},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#v802ToolModal'))closeModal()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopTimer();else if(document.body.classList.contains('v802-live-status')&&!livePaused)schedule()});
function startup(){const label=$('#appVersionLabel');if(label)label.textContent='B7 FI COMMAND CENTER V0.80.2';document.title='B7 FI Command Center v0.80.2'}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
