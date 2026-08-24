/* B7 FI Command Center v0.80.37 — Tool Center canonical landing/detail workflow cleanup.
   Goals:
   - Restore Tool Center as the live-card/current-quarter dashboard.
   - Keep Tool Countdown as a separate quick-list page.
   - Make every tool link resolve to the same purple Tool Center detail page.
   - Make Tool Detail toolbar functional and deterministic.
   - Preserve the complete Tool editor as the source-of-truth editor.
   - Keep nav on the left and page actions on the right without legacy toolbar reordering.
*/
(function(){
'use strict';
const VERSION='0.80.37';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const priorSetView=window.setView;
const priorToolStatus=window.toolStatus;
const priorToolAdmin=window.toolAdmin;
const quickCountdown=window.countdown;

window.B7_APP_VERSION=VERSION; window.VERSION=VERSION;
function stamp(){
  document.title=`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel'); if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function qLabel(){
  try{if(typeof quarterLabel==='function')return quarterLabel()}catch(e){}
  const counts={}; try{(tools||[]).forEach(t=>{if(t.quarter)counts[t.quarter]=(counts[t.quarter]||0)+1})}catch(e){}
  return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0]||'CY26Q3';
}
function remember(route){
  try{sessionStorage.setItem('b7.route',JSON.stringify(route));history.replaceState(route,'',location.pathname+'#'+encodeURIComponent(JSON.stringify(route)))}catch(e){}
}
function toolTheme(title){
  const b=document.body;
  /* toolfinal intentionally bypasses the old v0.80.33 toolbar observer. */
  b.dataset.center='toolfinal'; b.dataset.theme='toolcenter';
  document.documentElement.style.setProperty('--page-accent','#8b5cf6');
  document.documentElement.style.setProperty('--page-accent-rgb','139,92,246');
  document.documentElement.style.setProperty('--center-color','#8b5cf6');
  document.documentElement.style.setProperty('--center-rgb','139,92,246');
  b.style.setProperty('--page-accent','#8b5cf6');b.style.setProperty('--page-accent-rgb','139,92,246');
  $$('.main-nav .nav-btn').forEach(x=>x.classList.toggle('active',x.dataset.view==='toolcenter'));
  const h=$('#headerPageTitle');if(h)h.textContent=title||`TOOL CENTER — ${qLabel()}`;
}
function shot(){try{if(typeof window.enterScreenshotMode==='function')return window.enterScreenshotMode()}catch(e){}try{if(typeof window.enterScreenshot==='function')return window.enterScreenshot()}catch(e){}window.print()}
function report(){window.print()}
function btn(label,fn,primary=false,danger=false){const b=document.createElement('button');b.type='button';b.className=`btn${primary?' primary':''}${danger?' danger':''}`;b.textContent=label;b.onclick=fn;return b}
function toolbar(left,right){
  const bar=$('#floatingActions');if(!bar)return;
  bar.className='floating-actions page-toolbar v837-page-toolbar';bar.innerHTML='';
  const l=document.createElement('div'),r=document.createElement('div');l.className='v837-toolbar-left';r.className='v837-toolbar-right';
  left.filter(Boolean).forEach(x=>l.appendChild(x));right.filter(Boolean).forEach(x=>r.appendChild(x));bar.append(l,r);
}
function statusFor(t){return String(t?.quarterStatus||'Waiting for FI')}
function progress(t){try{return typeof routeProgress==='function'?routeProgress(t):0}catch(e){return 0}}
function adminPct(t){try{return typeof adminProgress==='function'?adminProgress(t):0}catch(e){return 0}}
function micro(t){try{return typeof microScheduleInfo==='function'?microScheduleInfo(t):null}catch(e){return null}}
function fmtDate(v){try{return typeof fmt==='function'?fmt(v):(v||'—')}catch(e){return v||'—'}}
function qStateLocal(t){const s=statusFor(t).toLowerCase();return s.includes('ship')?'shipped':s.includes('waiting')?'waiting':'infi'}
function toolCard(t){
  const rp=progress(t),ap=adminPct(t),mi=micro(t),st=statusFor(t),cls=qStateLocal(t);
  const statusLabel=st==='Waiting for FI'?'WAITING FOR FI':st.toUpperCase();
  return `<article class="system-card v3-system-card v837-tool-card ${cls==='shipped'?'shipped-card':cls==='waiting'?'waiting-card':'infi-card'}" data-v837-tool="${esc(t.id)}" tabindex="0" role="button">
    <div class="system-head"><div><div class="system-id v3-system-id">${esc(t.id)}</div><div><span class="model-badge">${esc(t.model||'—')}</span> <span class="gray">${esc(t.customer||'—')}</span></div></div><span class="state-chip ${cls}">${esc(statusLabel)}</span></div>
    <div class="progress-row"><div class="progress-label"><span>ACTUAL FI PROGRESS</span><b>${rp}%</b></div><div class="track"><div class="fill" style="width:${rp}%"></div></div><div class="card-progress-meta"><span>${esc(t.checklist||'—')}</span><span>${esc(t.driver||'Unassigned')}</span></div></div>
    <div class="progress-row micro-progress ${esc(mi?.className||'unset')}"><div class="progress-label"><span>MICRO SCHEDULE</span><b>${mi?.set?mi.plannedPct+'%':'—'}</b></div><div class="track"><div class="fill micro" style="width:${mi?.set?mi.plannedPct:0}%"></div></div><div class="card-progress-meta"><span>${esc(mi?.set?(mi.target||'Target set'):'Target not set')}</span><span>${esc(mi?.label||'')}</span></div></div>
    <div class="progress-row"><div class="progress-label"><span>LEAD / ADMIN</span><b>${ap}%</b></div><div class="track"><div class="fill admin" style="width:${ap}%"></div></div><div class="card-progress-meta"><span>${esc(t.room||'—')}${t.bay?' / '+esc(t.bay):''}</span><span>MFG ${esc(fmtDate(t.ship))}</span></div></div>
  </article>`;
}
function renderToolDashboard(){
  remember({kind:'view',view:'toolcenter'});toolTheme(`TOOL CENTER — ${qLabel()}`);
  let list=[];try{list=typeof pageTools==='function'?pageTools('countdown'):(tools||[]).filter(t=>t.quarterStatus!=='Archive')}catch(e){list=[]}
  const q=qLabel(),waiting=list.filter(t=>statusFor(t)==='Waiting for FI').length,infi=list.filter(t=>statusFor(t)==='In FI').length,shipped=list.filter(t=>statusFor(t)==='Shipped').length;
  const groups={};list.forEach(t=>(groups[t.codename||'Other']??=[]).push(t));
  const pct=list.length?Math.round(shipped/list.length*100):0;
  const app=$('#app');if(!app)return;
  app.innerHTML=`<div class="report-screen v837-tool-dashboard">
    <div class="v837-summary-grid">
      <div class="metric"><span>${esc(q)} TOOLS</span><strong>${list.length}</strong></div>
      <div class="metric"><span>WAITING FI</span><strong>${waiting}</strong></div>
      <div class="metric"><span>IN FI</span><strong>${infi}</strong></div>
      <div class="metric"><span>SHIPPED</span><strong>${shipped}</strong></div>
    </div>
    <div class="quarter-progress v837-quarter-progress"><div class="progress-label"><span>Current Quarter Shipping Progress</span><b>${pct}% Shipped</b></div><div class="track"><div class="fill" style="width:${pct}%;background:var(--good)"></div></div></div>
    <div class="v837-tool-groups">${Object.entries(groups).sort((a,b)=>a[0].localeCompare(b[0])).map(([name,arr])=>{const w=arr.filter(t=>statusFor(t)==='Waiting for FI').length,i=arr.filter(t=>statusFor(t)==='In FI').length,s=arr.filter(t=>statusFor(t)==='Shipped').length;return `<section class="tool-section v3-tool-section"><div class="tool-section-head"><h2 class="tool-section-title">${esc(name)}</h2><div class="family-counts"><div><span>TOTAL</span><b>${arr.length}</b></div><div class="family-waiting"><span>WAITING FI</span><b>${w}</b></div><div class="family-infi"><span>IN FI</span><b>${i}</b></div><div class="family-shipped"><span>SHIPPED</span><b>${s}</b></div></div></div><div class="system-grid v3-system-grid">${arr.slice().sort((a,b)=>String(a.ship||'9').localeCompare(String(b.ship||'9'))).map(toolCard).join('')}</div></section>`}).join('')}</div>
  </div>`;
  $$('[data-v837-tool]').forEach(c=>{const go=()=>window.toolStatus(c.dataset.v837Tool);c.onclick=go;c.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}}});
  toolbar([
    btn(`${q} TOOLS`,renderToolDashboard,true),
    btn('TOOL COUNTDOWN',renderQuickCountdown),
    btn('TOOL ARCHIVE',()=>window.setView('archive'))
  ],[
    btn('ADD TOOL',()=>window.toolAdmin(),true),btn('SCREENSHOT',shot),btn('REPORT',report)
  ]);
}
function renderQuickCountdown(){
  remember({kind:'view',view:'countdown'});
  if(typeof quickCountdown==='function')quickCountdown();
  toolTheme(`TOOL CENTER — ${qLabel()}`);
  toolbar([
    btn(`${qLabel()} TOOLS`,renderToolDashboard),btn('TOOL COUNTDOWN',renderQuickCountdown,true),btn('TOOL ARCHIVE',()=>window.setView('archive'))
  ],[btn('ADD TOOL',()=>window.toolAdmin(),true),btn('SCREENSHOT',shot),btn('REPORT',report)]);
}
function finalizeArchive(){
  toolTheme(`TOOL CENTER — ${qLabel()}`);
  toolbar([
    btn(`${qLabel()} TOOLS`,renderToolDashboard),btn('TOOL COUNTDOWN',renderQuickCountdown),btn('TOOL ARCHIVE',()=>window.setView('archive'),true)
  ],[btn('ADD TOOL',()=>window.toolAdmin(),true),btn('SCREENSHOT',shot),btn('REPORT',report)]);
}
function finalizeDetail(id){
  const t=(typeof tools!=='undefined'?tools:[]).find(x=>String(x.id)===String(id));
  toolTheme(`TOOL ${id}`);remember({kind:'tool',id:String(id)});
  toolbar([
    btn(`← BACK TO ${qLabel()} TOOLS`,renderToolDashboard)
  ],[
    btn('EDIT THIS TOOL',()=>window.toolAdmin(id),true),
    btn('CUSTOMER REQUIREMENTS',()=>{try{window.setView('customer')}catch(e){window.toolAdmin(id)}}),
    btn('SCREENSHOT',shot),btn('REPORT',report)
  ]);
  /* Any detail-page links rendered by older layers should always re-enter the canonical tool route. */
  if(t){$$('[data-tool],[data-open-countdown-tool]').forEach(x=>{const tid=x.dataset.tool||x.dataset.openCountdownTool;if(tid)x.onclick=()=>window.toolStatus(tid)})}
}
function finalizeEditor(id){
  toolTheme(id?`TOOL ${id} — EDIT`:'ADD TOOL');remember({kind:'editTool',id:id?String(id):'',tab:'basic'});
  const bar=$('#floatingActions');if(!bar)return;
  /* Keep the core Save/Delete buttons themselves so their closure-bound save handlers remain intact. */
  const old=$$('button',bar);const save=old.find(b=>/SAVE TOOL/i.test(b.textContent));const del=old.find(b=>/DELETE TOOL/i.test(b.textContent));
  toolbar([
    id?btn(`← BACK TO TOOL ${id}`,()=>window.toolStatus(id)):btn(`← BACK TO ${qLabel()} TOOLS`,renderToolDashboard)
  ],[
    id?null:btn('CANCEL',renderToolDashboard),save||null,del||null
  ]);
}
window.toolStatus=function(id){
  const r=typeof priorToolStatus==='function'?priorToolStatus.apply(this,arguments):undefined;
  finalizeDetail(String(id));setTimeout(()=>finalizeDetail(String(id)),60);return r;
};
window.toolAdmin=function(id,tab){
  const r=typeof priorToolAdmin==='function'?priorToolAdmin.apply(this,arguments):undefined;
  setTimeout(()=>finalizeEditor(id?String(id):''),20);setTimeout(()=>finalizeEditor(id?String(id):''),120);return r;
};
window.setView=function(v){
  if(v==='toolcenter'||v==='systems'){renderToolDashboard();return}
  if(v==='countdown'){renderQuickCountdown();return}
  const r=typeof priorSetView==='function'?priorSetView.apply(this,arguments):undefined;
  if(v==='archive')setTimeout(finalizeArchive,20);
  return r;
};
/* Main nav should always enter the live-card Tool Center dashboard. */
const toolNav=$('.main-nav .nav-btn[data-view="toolcenter"]');if(toolNav)toolNav.onclick=()=>renderToolDashboard();
function restoreFinal(){
  stamp();let route=null;try{route=location.hash.length>2?JSON.parse(decodeURIComponent(location.hash.slice(1))):JSON.parse(sessionStorage.getItem('b7.route')||'null')}catch(e){}
  if(route?.kind==='view'&&route.view==='toolcenter')renderToolDashboard();
  else if(route?.kind==='view'&&route.view==='countdown')renderQuickCountdown();
  else if(route?.kind==='tool'&&route.id)window.toolStatus(route.id);
  else if(route?.kind==='editTool')window.toolAdmin(route.id||undefined,route.tab||'basic');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(restoreFinal,220),{once:true});else setTimeout(restoreFinal,220);
stamp();
})();
