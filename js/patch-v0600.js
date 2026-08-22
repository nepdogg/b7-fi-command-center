/* B7 FI Command Center v0.60.0
   Authoritative router + theme controller.
   This replaces the v0.52-v0.56 stacked shell patches that caused route flicker.
*/
(function(){
'use strict';
window.VERSION='0.60.0';

const CENTER={
  home:      {name:'OPERATIONS CENTER', color:'#176FA8', rgb:'23,111,168'},
  tool:      {name:'TOOL CENTER',       color:'#8E5AE8', rgb:'142,90,232'},
  shipping:  {name:'SHIPPING CENTER',   color:'#27AE60', rgb:'39,174,96'},
  priority:  {name:'PRIORITY CENTER',   color:'#D4A72C', rgb:'212,167,44'},
  status:    {name:'STATUS CENTER',     color:'#F28C28', rgb:'242,140,40'},
  meeting:   {name:'MEETING CENTER',    color:'#19B9D1', rgb:'25,185,209'},
  action:    {name:'ACTION CENTER',     color:'#E54848', rgb:'229,72,72'},
  reference: {name:'REFERENCE CENTER',  color:'#E94A9A', rgb:'233,74,154'},
  admin:     {name:'ADMINISTRATION CENTER',color:'#A6AFBC',rgb:'166,175,188'}
};
const NAV_VIEW={
  home:'home',toolcenter:'tool',shipping:'shipping',priorities:'priority',
  statuscenter:'status',meetingcenter:'meeting',actions:'action',referencecenter:'reference'
};
let currentCenter='home';
let centerTabs={tool:'quarter',priority:'weekday',status:'morning',reference:'knowledge',admin:'home'};

function qQuarter(){
  try{
    if(typeof quarterLabel==='function') return quarterLabel();
    if(window.state && state.quarter) return state.quarter;
  }catch(e){}
  return 'CY26Q3';
}
function setCenterTheme(key){
  currentCenter=key;
  document.body.classList.toggle('v58-home-center',key==='home');
  const c=CENTER[key]||CENTER.home;
  document.body.dataset.center=key;
  document.body.dataset.theme=key; // semantic only; no legacy observer remains
  document.documentElement.style.setProperty('--accent',c.color);
  document.documentElement.style.setProperty('--accent-rgb',c.rgb);
  document.documentElement.style.setProperty('--center-color',c.color);
  document.documentElement.style.setProperty('--center-rgb',c.rgb);
  document.documentElement.style.setProperty('--page-accent',c.color);
  document.documentElement.style.setProperty('--page-accent-rgb',c.rgb);
  document.documentElement.style.setProperty('--fleet-accent',c.color);
  document.documentElement.style.setProperty('--fleet-rgb',c.rgb);
  document.documentElement.style.setProperty('--live-page-accent',c.color);
  document.documentElement.style.setProperty('--live-page-rgb',c.rgb);
  document.body.style.setProperty('--accent',c.color);
  document.body.style.setProperty('--accent-rgb',c.rgb);
  document.body.style.setProperty('--page-accent',c.color);
  document.body.style.setProperty('--page-accent-rgb',c.rgb);
  document.body.style.setProperty('--fleet-accent',c.color);
  document.body.style.setProperty('--fleet-rgb',c.rgb);
  document.body.style.setProperty('--live-page-accent',c.color);
  document.body.style.setProperty('--live-page-rgb',c.rgb);

  const title=document.getElementById('headerPageTitle');
  if(title) title.textContent=c.name;
  document.title='B7 FI Command Center · '+c.name;

  document.querySelectorAll('.main-nav .nav-btn').forEach(b=>{
    const active=NAV_VIEW[b.dataset.view]===key;
    b.classList.toggle('active',active);
    b.setAttribute('aria-current',active?'page':'false');
  });
  const af=document.getElementById('administrationCenterFooter');
  if(af) af.classList.toggle('active',key==='admin');
  const ver=document.getElementById('appVersionLabel');
  if(ver) ver.textContent='B7 FI Command Center v0.60.0';
}
function cleanLegacyHeading(){
  const candidates=document.querySelectorAll('#app .report-title,#app > .page-title,#app .page-head');
  candidates.forEach((el,i)=>{ if(i===0) el.classList.add('v57-hide-duplicate-title'); });
}
function centerTabsHtml(items,active){
  return `<div class="v57-center-tabs">${items.map(x=>
    `<button class="btn ${x[0]===active?'primary':''}" data-v57tab="${x[0]}">${x[1]}</button>`
  ).join('')}</div>`;
}
function installTabs(items,active,fn){
  /* v0.60: Center sub-navigation belongs in the single page navigation bar,
     not in a second row inside page content. */
  const bar=document.getElementById('floatingActions');
  if(!bar)return;
  bar.querySelectorAll('[data-v57tab]').forEach(b=>b.remove());
  const frag=document.createDocumentFragment();
  items.forEach(x=>{
    const b=document.createElement('button');
    b.className='btn v60-center-nav '+(x[0]===active?'primary':'');
    b.dataset.v57tab=x[0]; b.textContent=x[1]; b.onclick=()=>fn(x[0]);
    frag.appendChild(b);
  });
  bar.prepend(frag);
}
function removeLegacyActionButtons(){
  const bar=document.getElementById('floatingActions');
  if(!bar)return;
  [...bar.querySelectorAll('button,a')].forEach(b=>{
    const t=(b.textContent||'').trim().toLowerCase();
    if(['tools','administration','morning status','lead workspace','screenshot mode','generate full report'].includes(t)) b.remove();
  });
}
function ensureReportButton(){
  if(['home','reference','admin'].includes(currentCenter)) return;
  const bar=document.getElementById('floatingActions');
  if(!bar)return;
  if(!bar.querySelector('.v57-report-btn')){
    const b=document.createElement('button');
    b.className='btn v57-report-btn';b.textContent='REPORT';
    b.onclick=openReport57;bar.appendChild(b);
  }
}
function postRender(key){
  setCenterTheme(key);
  const actionBar=document.getElementById('floatingActions');
  if(actionBar) actionBar.style.display='';
  cleanLegacyHeading();
  removeLegacyActionButtons();
  ensureReportButton();
}
function renderHome(){
  setCenterTheme('home');
  const all=(typeof tools!=='undefined'?tools:[]);
  const active=all.filter(t=>!['Archive'].includes(t.quarterStatus));
  const shipped=active.filter(t=>t.quarterStatus==='Shipped').length;
  const inFi=active.filter(t=>t.quarterStatus==='In FI').length;
  const packing=active.filter(t=>t.quarterStatus==='Packing').length;
  const waiting=active.filter(t=>/Waiting/i.test(t.quarterStatus||'')).length;
  let actionCount=0,critical=0,attention=0;
  try{
    const aa=typeof allGenerated51==='function'?allGenerated51():[];
    actionCount=aa.length; critical=aa.filter(x=>(x._severity51||'')==='red').length; attention=aa.filter(x=>(x._severity51||'')==='orange').length;
  }catch(e){}
  const cards=[
    ['tool','TOOL CENTER',`${qQuarter()} · ${active.length} tools · ${shipped} shipped · ${inFi} in FI · ${packing} packing · ${waiting} waiting`,'OPEN TOOL CENTER →'],
    ['action','ACTION CENTER',`${actionCount} open actions · ${critical} critical · ${attention} attention`,'OPEN ACTION CENTER →'],
    ['shipping','SHIPPING CENTER','Packing · physical handoffs · shipping readiness','OPEN SHIPPING CENTER →'],
    ['priority','PRIORITY CENTER','Weekday · weekend · team priorities','OPEN PRIORITY CENTER →'],
    ['status','STATUS CENTER','Morning status · leads extra status','OPEN STATUS CENTER →'],
    ['meeting','MEETING CENTER','Meetings · notes · actions · history','OPEN MEETING CENTER →'],
    ['reference','REFERENCE CENTER','FI knowledge · procedures · reference files','OPEN REFERENCE CENTER →'],
    ['wallboard','WALLBOARD','Launch the live operations display','OPEN WALLBOARD →'],
    ['backup','DATA & BACKUP','Backup · shared data · synchronization controls','OPEN DATA & BACKUP →']
  ];
  app.innerHTML=`<section class="v57-operations-grid">${cards.map(c=>{
    const k=c[0]==='wallboard'||c[0]==='backup'?'admin':c[0];
    const cc=CENTER[k]||CENTER.home;
    return `<button class="v57-live-card" data-dest="${c[0]}" style="--card-color:${cc.color};--card-rgb:${cc.rgb}">
      <span>${c[1]}</span><strong>${c[2]}</strong><b>${c[3]}</b>
    </button>`;
  }).join('')}</section>`;
  document.querySelectorAll('.v57-live-card').forEach(b=>b.onclick=()=>{
    const d=b.dataset.dest;
    if(d==='wallboard') renderAdmin('wallboard');
    else if(d==='backup') renderAdmin('data');
    else route57(d);
  });
  const bar=document.getElementById('floatingActions');
  if(bar){bar.innerHTML='';bar.style.display='none';}
}
function renderTool(tab=centerTabs.tool){
  centerTabs.tool=tab;
  if(tab==='archive') archive(); else countdown();
  postRender('tool');
  installTabs([['quarter',qQuarter()+' TOOLS'],['archive','TOOL ARCHIVE']],tab,renderTool);
  renameToolSummary57();
}
function renameToolSummary57(){
  const q=qQuarter();
  const boxes=[...document.querySelectorAll('#app .overall-box,#app .metric-card,#app .summary-card')];
  boxes.forEach(box=>{
    const txt=box.textContent.toUpperCase();
    const label=box.querySelector('.label,.metric-label,small');
    if(!label)return;
    if(txt.includes('ORIGINAL PLAN')||txt.includes('TOTAL TOOLS')) label.textContent=q+' TOOLS';
    if(txt.includes('CURRENT PLAN')) label.textContent='UPDATED '+q;
    if((txt.includes('PULLED')||txt.includes('PUSHED')) && /\b0\b/.test(txt)) box.classList.add('v57-dormant');
    if(txt.includes('CURRENT PLAN') && /\b25\b/.test(txt)) box.classList.add('v57-dormant');
  });
}
function renderShipping(){
  shipping();postRender('shipping');
}
function renderPriority(tab=centerTabs.priority){
  centerTabs.priority=tab;
  if(tab==='weekend') weekend(); else daily();
  postRender('priority');
  installTabs([['weekday','WEEKDAY'],['weekend','WEEKEND']],tab,renderPriority);
}
function renderStatus(tab=centerTabs.status){
  centerTabs.status=tab;
  if(tab==='extra') leadsExtraPage(false); else morning();
  postRender('status');
  installTabs([['morning','MORNING STATUS'],['extra','LEADS EXTRA STATUS']],tab,renderStatus);
}
function renderMeeting(){
  if(window.B7Renderers58&&B7Renderers58.meetingCenter) B7Renderers58.meetingCenter(); else throw new Error('Meeting Center renderer unavailable');
  postRender('meeting');
}
function renderAction(){
  if(window.B7Renderers58&&B7Renderers58.actionCenter) B7Renderers58.actionCenter(); else throw new Error('Action Center renderer unavailable');
  postRender('action');
}
function renderReference(tab=centerTabs.reference){
  centerTabs.reference=tab;
  if(tab==='files') referencesPage(); else if(window.B7Renderers58&&B7Renderers58.knowledge) B7Renderers58.knowledge(); else throw new Error('Reference Center renderer unavailable');
  postRender('reference');
  installTabs([['knowledge','FI KNOWLEDGE'],['files','REFERENCE FILES']],tab,renderReference);
}
function renderAdmin(tab=centerTabs.admin){
  centerTabs.admin=tab;
  if(tab==='data') sharedData();
  else if(tab==='wallboard') wallboardPage();
  else admin();
  postRender('admin');
  installTabs([['home','ADMIN HOME'],['data','DATA & BACKUP'],['wallboard','WALLBOARD CONFIGURATION']],tab,renderAdmin);
}
function route57(dest){
  window.scrollTo(0,0);
  if(dest==='home')renderHome();
  else if(dest==='tool')renderTool();
  else if(dest==='shipping')renderShipping();
  else if(dest==='priority')renderPriority();
  else if(dest==='status')renderStatus();
  else if(dest==='meeting')renderMeeting();
  else if(dest==='action')renderAction();
  else if(dest==='reference')renderReference();
  else if(dest==='admin')renderAdmin();
}
window.setView=function(v){
  const map={home:'home',toolcenter:'tool',shipping:'shipping',priorities:'priority',statuscenter:'status',
             meetingcenter:'meeting',actions:'action',referencecenter:'reference',admincenter:'admin',
             countdown:'tool',systems:'tool',archive:'tool',daily:'priority',weekend:'priority',
             meeting:'status',leads:'status',knowledge:'reference',references:'reference',
             shared:'admin',admin:'admin',wallboard:'admin'};
  route57(map[v]||v);
};
document.querySelectorAll('.main-nav .nav-btn').forEach(b=>b.onclick=()=>window.setView(b.dataset.view));
const adminFooter=document.getElementById('administrationCenterFooter');
if(adminFooter)adminFooter.onclick=()=>renderAdmin('home');

/* Clean report workflow: no legacy screenshot/full-report buttons. */
function reportTitle57(){return CENTER[currentCenter]?.name||'B7 FI COMMAND CENTER'}
function openReport57(){
  document.getElementById('v57ReportModal')?.remove();
  document.body.insertAdjacentHTML('beforeend',`<div id="v57ReportModal" class="v57-report-modal">
   <div class="v57-report-card"><div class="v57-report-head"><div><b>REPORT</b><span>${reportTitle57()}</span></div><button id="v57ReportClose" class="btn">Close</button></div>
   <div class="v57-report-options"><button id="v57CleanView" class="btn primary">Screenshot View</button><button id="v57Copy" class="btn">Copy</button><button id="v57Email" class="btn">Email</button><button id="v57Print" class="btn">Print / PDF</button></div>
   <p class="gray">Screenshot View hides application controls for a clean visual capture. Email opens your mail application; attach the screenshot or PDF.</p></div></div>`);
  v57ReportClose.onclick=()=>v57ReportModal.remove();
  v57CleanView.onclick=()=>{v57ReportModal.remove();document.body.classList.add('v57-clean-report')};
  v57Copy.onclick=()=>navigator.clipboard?.writeText(app.innerText||'');
  v57Email.onclick=()=>location.href='mailto:?subject='+encodeURIComponent('B7 FI Command Center — '+reportTitle57());
  v57Print.onclick=()=>window.print();
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.body.classList.remove('v57-clean-report')});
document.addEventListener('click',e=>{
 if(document.body.classList.contains('v57-clean-report') && e.target.closest('.v57-clean-exit')) document.body.classList.remove('v57-clean-report');
});

/* Keep footer physically after live Fleet Status bar. */
const ops=document.getElementById('operationsBar'), foot=document.querySelector('body>footer');
if(ops&&foot&&ops.nextElementSibling!==foot)ops.insertAdjacentElement('afterend',foot);

/* Start once on Operations Center. No timers, no route/theme observers, no second render. */
requestAnimationFrame(()=>renderHome());
})();