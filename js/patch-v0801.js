/* B7 FI Command Center v0.80.1 — performance/stability hotfix + real Live Status Center. */
(function(){
'use strict';
window.VERSION='0.80.1';
const $=(s,r=document)=>r.querySelector(s);
let liveTimer=null, liveIndex=0, livePaused=false;
function safe(v,f='—'){return v===undefined||v===null||String(v).trim()===''?f:String(v)}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function getTools(){try{return (typeof tools!=='undefined'&&Array.isArray(tools))?tools:[]}catch(e){return []}}
function activeTools(){return getTools().filter(t=>!/^archive$/i.test(String(t.quarterStatus||t.status||'')))}
function toolProgress(t){
 const candidates=[t.progress,t.fiProgress,t.testingProgress,t.percentComplete,t.completion];
 for(const v of candidates){const n=Number(v);if(Number.isFinite(n))return Math.max(0,Math.min(100,n<=1?n*100:n))}
 return 0;
}
function toolImage(t){
 const key=String(t.toolType||t.model||t.type||'').trim();
 const map=window.B7_PRODUCT_IMAGES||{};
 return map[key]||t.productImage||t.image||'assets/kla-plus-official.png';
}
function fields(t){
 return [
  ['UTID',t.utid||t.id],['Tool / Model',t.toolType||t.model||t.type],['Customer',t.customer],
  ['Sales Order',t.salesOrder||t.so],['Current Checklist',t.currentChecklist||t.checklist],['Ship Date',t.shipDate],
  ['Driver',t.driver||t.assignedDriver],['Cleanroom',t.cleanroom||t.location],['Phase',t.quarterStatus||t.status]
 ];
}
function footer(){
 const f=$('footer.v57-footer'),app=$('main#app');if(!f||!app)return;
 if(f.previousElementSibling!==app)app.insertAdjacentElement('afterend',f);
 f.innerHTML='<div class="v80-footer-left"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div><div class="v80-footer-center"><img src="assets/kla-plus-official.png" alt="KLA+"></div><div class="v80-footer-right"><div class="v80-footer-mode">Local Production Mode · SharePoint live sync pending</div><div id="appVersionLabel" class="v80-footer-version">B7 FI COMMAND CENTER V0.80.1</div></div>';
 const b=$('#administrationCenterFooter');if(b)b.onclick=()=>window.setView&&window.setView('admincenter');
}
function stopLiveTimer(){if(liveTimer){clearTimeout(liveTimer);liveTimer=null}}
function leaveLive(){stopLiveTimer();document.body.classList.remove('v801-live-status');livePaused=false}
function scheduleLive(){stopLiveTimer();if(livePaused||!document.body.classList.contains('v801-live-status'))return;liveTimer=setTimeout(()=>{const list=activeTools();if(list.length){liveIndex=(liveIndex+1)%list.length;drawLiveTool()}scheduleLive()},12000)}
function metricCounts(list){
 const c={shipped:0,infi:0,packing:0,waiting:0};
 list.forEach(t=>{const s=String(t.quarterStatus||t.status||'').toLowerCase();if(s.includes('shipped'))c.shipped++;else if(s.includes('packing'))c.packing++;else if(s.includes('in fi')||s==='fi')c.infi++;else if(s.includes('waiting'))c.waiting++});return c;
}
function drawLiveTool(){
 const host=$('#v801ToolHost');if(!host)return;const list=activeTools();
 const count=$('#v801Counter');if(count)count.textContent=list.length?`${liveIndex+1} OF ${list.length}`:'0 TOOLS';
 if(!list.length){host.innerHTML='<div class="v801-tool-body"><div class="v801-tool-kicker">SYSTEM STATUS</div><h2>No active tools</h2><div class="v801-tool-sub">Add or activate tools in Tool Center to populate the Live Status carousel.</div></div>';return}
 liveIndex=(liveIndex+list.length)%list.length;const t=list[liveIndex],p=toolProgress(t);const title=safe(t.utid||t.id,'SYSTEM');const subtitle=[t.toolType||t.model||t.type,t.customer].filter(Boolean).join(' · ');
 host.innerHTML=`<div class="v801-tool-slide"><div class="v801-tool-visual"><img src="${esc(toolImage(t))}" alt="${esc(safe(t.toolType||t.model||'KLA system'))}"></div><div class="v801-tool-body"><div class="v801-tool-kicker">ACTIVE B7 FI SYSTEM</div><h2>${esc(title)}</h2><div class="v801-tool-sub">${esc(subtitle||'B7 Final Integration')}</div><div class="v801-tool-grid">${fields(t).map(([k,v])=>`<div class="v801-tool-field"><span>${esc(k)}</span><b>${esc(safe(v))}</b></div>`).join('')}</div><div class="v801-progress"><div class="v801-progress-top"><span>FI TESTING PROGRESS</span><b>${Math.round(p)}%</b></div><div class="v801-progress-track"><div class="v801-progress-fill" style="width:${p}%"></div></div></div></div></div>`;
 const img=host.querySelector('img');if(img)img.onerror=()=>{img.onerror=null;img.src='assets/kla-plus-official.png'};
}
function renderLiveStatus(){
 leaveLive();document.body.classList.add('v801-live-status');window.scrollTo(0,0);const app=$('main#app');if(!app)return;
 const list=activeTools(),c=metricCounts(list);liveIndex=Math.min(liveIndex,Math.max(0,list.length-1));
 app.innerHTML=`<section class="v801-live"><div class="v801-live-top"><img class="v801-live-brand" src="assets/kla-plus-official.png" alt="KLA+"><button id="v801Exit" class="v801-live-exit">← COMMAND CENTER</button></div><div class="v801-live-title"><h1>B7 FINAL INTEGRATION — LIVE STATUS</h1><p>Read-only operational display</p></div><div class="v801-live-metrics"><div class="v801-live-metric"><span>Active Tools</span><b>${list.length}</b></div><div class="v801-live-metric"><span>In FI</span><b>${c.infi}</b></div><div class="v801-live-metric"><span>Packing</span><b>${c.packing}</b></div><div class="v801-live-metric"><span>Waiting</span><b>${c.waiting}</b></div><div class="v801-live-metric"><span>Shipped</span><b>${c.shipped}</b></div></div><div class="v801-carousel"><div class="v801-carousel-head"><strong>TOOLS CAROUSEL</strong><div class="v801-carousel-controls"><button id="v801Prev" title="Previous tool">◀</button><button id="v801Pause" title="Pause rotation">PAUSE</button><button id="v801Next" title="Next tool">▶</button></div></div><div id="v801ToolHost"></div><div class="v801-carousel-foot"><span><i class="v801-live-dot"></i>LIVE LOCAL DATA</span><b id="v801Counter"></b></div></div></section>`;
 $('#v801Exit').onclick=()=>{leaveLive();oldSetView('home')};
 $('#v801Prev').onclick=()=>{const n=activeTools().length;if(n){liveIndex=(liveIndex-1+n)%n;drawLiveTool()}scheduleLive()};
 $('#v801Next').onclick=()=>{const n=activeTools().length;if(n){liveIndex=(liveIndex+1)%n;drawLiveTool()}scheduleLive()};
 $('#v801Pause').onclick=e=>{livePaused=!livePaused;e.currentTarget.textContent=livePaused?'RESUME':'PAUSE';if(livePaused)stopLiveTimer();else scheduleLive()};
 drawLiveTool();scheduleLive();
}
const oldSetView=window.setView;
window.setView=function(v){if(v==='livestatus'||v==='live-status'){renderLiveStatus();return}leaveLive();const r=oldSetView?oldSetView(v):undefined;requestAnimationFrame(footer);return r};
/* Convert the Operations card into a real Live Status route, even when legacy renderers rebuild it. */
document.addEventListener('click',e=>{const card=e.target.closest('.v57-live-card');if(!card)return;const text=(card.textContent||'').toUpperCase();if(card.dataset.dest==='wallboard'&&text.includes('LIVE STATUS CENTER')){e.preventDefault();e.stopImmediatePropagation();window.setView('livestatus')}},true);
/* Pause costly decorative animation when the tab is not visible. */
document.addEventListener('visibilitychange',()=>document.body.classList.toggle('v801-tab-hidden',document.hidden));
function startup(){footer();document.title='B7 FI Command Center v0.80.1'}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
requestAnimationFrame(startup);
})();
