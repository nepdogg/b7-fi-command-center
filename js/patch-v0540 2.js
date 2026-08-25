/* B7 FI Command Center v0.54.0 — Final Center Architecture Test */
(function(){
'use strict';
window.VERSION='0.54.0';

const CENTER_META={
 home:['OPERATIONS CENTER','#B07A20','176,122,32'],
 toolcenter:['TOOL CENTER','#FF9F1C','255,159,28'],
 shipping:['SHIPPING CENTER','#00B8D4','0,184,212'],
 priorities:['PRIORITY CENTER','#35A853','53,168,83'],
 statuscenter:['STATUS CENTER','#F57C00','245,124,0'],
 meetingcenter:['MEETING CENTER','#1976D2','25,118,210'],
 actions:['ACTION CENTER','#E53935','229,57,53'],
 referencecenter:['REFERENCE CENTER','#00A79D','0,167,157'],
 admincenter:['ADMINISTRATION CENTER','#7E8796','126,135,150']
};
let centerView='home', internalTab={toolcenter:'quarter',priorities:'weekday',statuscenter:'morning',referencecenter:'knowledge',admincenter:'admin'};
const baseSet=window.setView;

function setTheme(v){
 const m=CENTER_META[v]||CENTER_META.home;
 document.body.dataset.theme=v;
 document.documentElement.style.setProperty('--accent',m[1]);
 document.documentElement.style.setProperty('--accent-rgb',m[2]);
 document.body.style.setProperty('--accent',m[1]);
 document.body.style.setProperty('--accent-rgb',m[2]);
 ['--live-page-accent','--fleet-accent'].forEach(k=>document.body.style.setProperty(k,m[1]));
 ['--live-page-rgb','--fleet-rgb'].forEach(k=>document.body.style.setProperty(k,m[2]));
 document.querySelectorAll('.nav-btn').forEach(b=>{
   const on=b.dataset.view===v;b.classList.toggle('active',on);b.setAttribute('aria-current',on?'page':'false');
 });
 try{setHeaderContext(m[0],'')}catch(e){}
 const t=document.querySelector('.header-page-title');if(t)t.textContent=m[0];
 const sub=document.querySelector('.header-page-sub');if(sub)sub.textContent='';
 const ver=document.getElementById('appVersionLabel');if(ver)ver.textContent='B7 FI Command Center v0.54.0';
}
function tabs(items,active,cb){
 const wrap=document.createElement('div');wrap.className='center-tabs540';
 wrap.innerHTML=items.map(x=>`<button class="btn ${x[0]===active?'primary':''}" data-tab="${x[0]}">${x[1]}</button>`).join('');
 app.insertAdjacentElement('afterbegin',wrap);
 wrap.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>cb(b.dataset.tab));
}
function cleanup(){
 document.querySelectorAll('#app>.page-title,#app>.report-header').forEach((e,i)=>{if(i===0)e.style.display='none'});
}
function renderTool(tab=internalTab.toolcenter){
 internalTab.toolcenter=tab; centerView='toolcenter';
 if(tab==='quarter') countdown(); else archive();
 setTheme('toolcenter'); cleanup();
 const q=(typeof state!=='undefined'&&state.quarter)||'CY26Q3';
 tabs([['quarter',q+' TOOLS'],['archive','TOOL ARCHIVE']],tab,renderTool);
}
function renderPriority(tab=internalTab.priorities){
 internalTab.priorities=tab; centerView='priorities';
 if(tab==='weekday') daily(); else weekend();
 setTheme('priorities'); cleanup();
 tabs([['weekday','WEEKDAY'],['weekend','WEEKEND']],tab,renderPriority);
}
function renderStatus(tab=internalTab.statuscenter){
 internalTab.statuscenter=tab; centerView='statuscenter';
 if(tab==='morning') meeting(); else leadsPage();
 setTheme('statuscenter'); cleanup();
 tabs([['morning','MORNING STATUS'],['extra','LEADS EXTRA STATUS']],tab,renderStatus);
}
function renderReference(tab=internalTab.referencecenter){
 internalTab.referencecenter=tab; centerView='referencecenter';
 if(tab==='knowledge') knowledgePage51(); else referencesPage();
 setTheme('referencecenter'); cleanup();
 tabs([['knowledge','FI KNOWLEDGE'],['files','REFERENCE FILES']],tab,renderReference);
}
function renderAdmin(tab=internalTab.admincenter){
 internalTab.admincenter=tab; centerView='admincenter';
 if(tab==='admin') admin(); else if(tab==='data') sharedData(); else wallboard();
 setTheme('admincenter'); cleanup();
 tabs([['admin','ADMIN HOME'],['data','DATA & BACKUP'],['wallboard','WALLBOARD CONFIGURATION']],tab,renderAdmin);
}
function addReport(){
 if(!['home','toolcenter','shipping','priorities','statuscenter','meetingcenter','actions'].includes(centerView))return;
 const bar=document.querySelector('.page-toolbar');
 if(bar&&!bar.querySelector('.report-btn530')){
   const b=document.createElement('button');b.className='btn report-btn530';b.textContent='REPORT';b.onclick=window.openReport530;bar.appendChild(b);
 }
}
window.setView=function(v){
 window.scrollTo(0,0);
 if(v==='toolcenter')renderTool();
 else if(v==='priorities')renderPriority();
 else if(v==='statuscenter')renderStatus();
 else if(v==='referencecenter')renderReference();
 else if(v==='admincenter')renderAdmin();
 else {
   centerView=v;
   const legacy=v==='shipping'?'shipping':v==='meetingcenter'?'meetingcenter':v==='actions'?'actions':'home';
   baseSet(legacy);
   setTheme(v);
   cleanup();
 }
 setTimeout(addReport,0);
};
document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>window.setView(b.dataset.view));

/* Home: retain the original page but remove passive/redundant cards and create
   a larger clickable operational launch grid. */
function rebuildHome(){
 if(centerView!=='home')return;
 setTheme('home');
 const grid=document.querySelector('.home500 .home-grid500,.home-grid500');
 if(!grid||grid.dataset.v540)return;
 grid.dataset.v540='1';
 const cards=[
 ['toolcenter','TOOL COUNTDOWN','Current quarter fleet, shipped, remaining, waiting and packing','OPEN TOOL CENTER →'],
 ['actions','ACTION CENTER','All tasks, assignments, alerts and status-bar actions','OPEN ACTION CENTER →'],
 ['shipping','SHIPPING CENTER','Packing, handoffs and shipping readiness','OPEN SHIPPING CENTER →'],
 ['priorities','PRIORITY CENTER','Weekday and weekend team priorities','OPEN PRIORITY CENTER →'],
 ['statuscenter','STATUS CENTER','Morning status and leads extra status','OPEN STATUS CENTER →'],
 ['meetingcenter','MEETING CENTER','Recurring meetings, notes, actions and history','OPEN MEETING CENTER →'],
 ['referencecenter','REFERENCE CENTER','FI knowledge and reference files','OPEN REFERENCE CENTER →'],
 ['admin-wall','WALLBOARD','Launch and configure operations display','OPEN WALLBOARD →'],
 ['admin-data','DATA & BACKUP','Backup, shared data and sync controls','OPEN DATA & BACKUP →']
 ];
 grid.innerHTML=cards.map(c=>`<button class="home-card500 cc-live-card512 home-card540" data-dest="${c[0]}"><span>${c[1]}</span><strong>${c[2]}</strong><b>${c[3]}</b></button>`).join('');
 grid.querySelectorAll('[data-dest]').forEach(b=>b.onclick=()=>{
   const d=b.dataset.dest;
   if(d==='admin-wall'){setView('admincenter');setTimeout(()=>renderAdmin('wallboard'),0)}
   else if(d==='admin-data'){setView('admincenter');setTimeout(()=>renderAdmin('data'),0)}
   else setView(d);
 });
 /* Remove passive top KPI strip if present; Tool Countdown card is the fleet summary entry. */
 document.querySelectorAll('.home500 .home-kpis500,.home500 .summary-grid500,.home500 .metric-grid').forEach(e=>e.remove());
}
setTimeout(()=>{centerView='home';setTheme('home');rebuildHome();addReport()},120);

/* Tool Center summary: baseline + exception-state terminology. */
function toolSummaryLabels(){
 if(centerView!=='toolcenter')return;
 const q=(typeof state!=='undefined'&&state.quarter)||'CY26Q3';
 document.querySelectorAll('#app .metric-card,#app .summary-card').forEach(card=>{
   const txt=card.textContent.trim().toUpperCase();
   const label=card.querySelector('.label,.metric-label,.gray,small');
   if(!label)return;
   if(txt.includes('ORIGINAL PLAN'))label.textContent=q+' TOOLS';
   if(txt.includes('CURRENT PLAN')){label.textContent='UPDATED '+q;card.classList.toggle('dormant540',/\b0\b/.test(txt)===false && txt.includes(q) ? false : true)}
   if(txt.includes('PULLED'))card.classList.toggle('dormant540',/\b0\b/.test(txt));
   if(txt.includes('PUSHED'))card.classList.toggle('dormant540',/\b0\b/.test(txt));
 });
}
const obs=new MutationObserver(()=>{if(centerView==='home')rebuildHome();if(centerView==='toolcenter')toolSummaryLabels();});
obs.observe(document.getElementById('app'),{childList:true,subtree:true});
})();