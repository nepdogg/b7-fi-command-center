/* B7 FI Command Center v0.53.0 — Consolidated Workflow Test */
(function(){
'use strict';

const CONSOLIDATED_META={
 toolcenter:['TOOLS','systems'], priorities:['PRIORITIES','daily'], leadcenter:['LEAD CENTER','workspace'],
 referencecenter:['FI REFERENCE CENTER','knowledge'], admincenter:['ADMINISTRATION','admin']
};
const OLD_SET_VIEW_530=window.setView;
const OLD_RENDER_530=window.render;

function activeNav530(v){
 document.querySelectorAll('.nav-btn').forEach(b=>{
   const on=b.dataset.view===v;
   b.classList.toggle('active',on); b.setAttribute('aria-current',on?'page':'false');
 });
}
function title530(t){
 try{setHeaderContext(t,'')}catch(e){}
 const title=document.querySelector('.header-page-title'); if(title)title.textContent=t;
 const sub=document.querySelector('.header-page-sub'); if(sub)sub.textContent='';
}
function tabs530(items,active){
 return `<div class="consolidated-tabs530">${items.map(x=>`<button class="btn ${x[0]===active?'primary':''}" data-consolidated-tab="${x[0]}">${x[1]}</button>`).join('')}</div>`;
}
function wireTabs530(fn){
 document.querySelectorAll('[data-consolidated-tab]').forEach(b=>b.onclick=()=>fn(b.dataset.consolidatedTab));
}
function stripDuplicate530(){
 document.querySelectorAll('#app .page-title,#app .report-header').forEach((el,i)=>{ if(i===0) el.classList.add('hide-duplicate530') });
}

/* Existing page renderers are retained; consolidated pages simply provide a
   smaller navigation architecture and internal views. */
function tools530(tab='quarter'){
 view='toolcenter'; document.body.dataset.theme='toolcenter'; activeNav530('toolcenter');
 if(tab==='quarter') countdown();
 else if(tab==='active') systems();
 else archive();
 title530('TOOLS');
 app.insertAdjacentHTML('afterbegin',tabs530([['quarter','CURRENT QUARTER'],['active','ALL ACTIVE TOOLS'],['archive','ARCHIVE']],tab));
 wireTabs530(tools530); stripDuplicate530(); addReport530();
}
function priorities530(tab='weekday'){
 view='priorities'; document.body.dataset.theme='priorities'; activeNav530('priorities');
 if(tab==='weekday') daily(); else weekend();
 title530('PRIORITIES');
 app.insertAdjacentHTML('afterbegin',tabs530([['weekday','WEEKDAY'],['weekend','WEEKEND']],tab));
 wireTabs530(priorities530); stripDuplicate530(); addReport530();
}
function leadCenter530(tab='actions'){
 view='leadcenter'; document.body.dataset.theme='leadcenter'; activeNav530('leadcenter');
 if(tab==='actions') workspace(); else leadsPage();
 title530('LEAD CENTER');
 app.insertAdjacentHTML('afterbegin',tabs530([['actions','LEAD ACTIONS'],['status','EXTRA STATUS']],tab));
 wireTabs530(leadCenter530); stripDuplicate530(); addReport530();
}
function referenceCenter530(tab='knowledge'){
 view='referencecenter'; document.body.dataset.theme='referencecenter'; activeNav530('referencecenter');
 if(tab==='knowledge') knowledgePage51(); else referencesPage();
 title530('FI REFERENCE CENTER');
 app.insertAdjacentHTML('afterbegin',tabs530([['knowledge','KNOWLEDGE'],['files','REFERENCE FILES']],tab));
 wireTabs530(referenceCenter530); stripDuplicate530();
}
function adminCenter530(tab='admin'){
 view='admincenter'; document.body.dataset.theme='admincenter'; activeNav530('admincenter');
 if(tab==='admin') admin();
 else if(tab==='data') sharedData();
 else wallboard();
 title530('ADMINISTRATION');
 app.insertAdjacentHTML('afterbegin',tabs530([['admin','ADMIN HOME'],['data','DATA & BACKUP'],['wallboard','WALLBOARD CONFIGURATION']],tab));
 wireTabs530(adminCenter530); stripDuplicate530();
}

/* Context report control for operational pages. */
function reportName530(){
 const t=(document.querySelector('.header-page-title')?.textContent||'B7 FI Command Center').trim();
 return t+' Report';
}
function cleanReport530(){
 document.body.classList.toggle('report-preview530');
}
function copyReport530(){
 const txt=(document.querySelector('#app')?.innerText||'').replace(/\n{3,}/g,'\n\n').trim();
 navigator.clipboard?.writeText(txt).then(()=>alert('Current page report text copied to the clipboard.')).catch(()=>alert('Copy is not available in this browser. Use Print / PDF or Screenshot.'));
}
function emailReport530(){
 const subject=encodeURIComponent('B7 FI Command Center — '+reportName530());
 const body=encodeURIComponent('B7 FI Command Center report prepared from '+reportName530()+'.\n\nUse the generated screenshot/PDF as the attachment.');
 location.href='mailto:?subject='+subject+'&body='+body;
}
window.openReport530=function(){
 let old=document.getElementById('reportModal530'); if(old)old.remove();
 document.body.insertAdjacentHTML('beforeend',`<div class="modal-backdrop report-modal530" id="reportModal530"><div class="modal-card"><div class="modal-head"><div><b>REPORT</b><div class="gray">${reportName530()}</div></div><button class="btn" id="closeReport530">Close</button></div><div class="report-options530"><button class="btn primary" id="previewReport530">Screenshot View</button><button class="btn" id="copyReport530">Copy</button><button class="btn" id="emailReport530">Email</button><button class="btn" id="printReport530">Print / PDF</button></div><p class="gray">Screenshot View hides application controls for a clean visual capture. Email opens your mail application; attach the screenshot or PDF you generate.</p></div></div>`);
 document.getElementById('closeReport530').onclick=()=>document.getElementById('reportModal530').remove();
 document.getElementById('previewReport530').onclick=()=>{document.getElementById('reportModal530').remove();cleanReport530()};
 document.getElementById('copyReport530').onclick=copyReport530;
 document.getElementById('emailReport530').onclick=emailReport530;
 document.getElementById('printReport530').onclick=()=>window.print();
}
function addReport530(){
 const operational=['home','toolcenter','shipping','priorities','meeting','meetingcenter','leadcenter','actions'];
 if(!operational.includes(document.body.dataset.theme))return;
 const bar=document.querySelector('.page-toolbar');
 if(bar && !bar.querySelector('.report-btn530')){
   const b=document.createElement('button'); b.className='btn report-btn530'; b.textContent='REPORT'; b.onclick=openReport530; bar.appendChild(b);
 }
}

/* Home launch cards: Wallboard and Backup/Data. */
function enhanceHome530(){
 if(document.body.dataset.theme!=='home')return;
 title530('OPERATIONS HOME');
 let grid=document.querySelector('.home500 .home-grid500,.home-grid500');
 if(!grid)return;
 if(!grid.querySelector('[data-home-special="wallboard"]')){
   grid.insertAdjacentHTML('beforeend',`<button class="home-card500 cc-live-card512" data-home-special="wallboard"><span>WALLBOARD</span><strong>READY</strong><small>Launch operations display mode</small><b>OPEN →</b></button>
   <button class="home-card500 cc-live-card512" data-home-special="backup"><span>DATA & BACKUP</span><strong>PROTECTED</strong><small>Backup, shared data & sync controls</small><b>OPEN →</b></button>`);
   grid.querySelector('[data-home-special="wallboard"]').onclick=()=>adminCenter530('wallboard');
   grid.querySelector('[data-home-special="backup"]').onclick=()=>adminCenter530('data');
 }
 addReport530();
}

/* Customer Requirements is no longer a main destination.
   Existing customer requirement data/workflows remain attached to tool records. */

window.setView=function(v){
 window.scrollTo(0,0);
 if(v==='toolcenter') return tools530();
 if(v==='priorities') return priorities530();
 if(v==='leadcenter') return leadCenter530();
 if(v==='referencecenter') return referenceCenter530();
 if(v==='admincenter') return adminCenter530();
 OLD_SET_VIEW_530(v);
 setTimeout(()=>{activeNav530(v);addReport530();if(v==='home')enhanceHome530()},0);
};
document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>window.setView(b.dataset.view));

/* Theme aliases so consolidated pages have distinct global colors. */
const themeColors={
 toolcenter:['#FF9F1C','255,159,28'], priorities:['#2EAD63','46,173,99'],
 leadcenter:['#3F51B5','63,81,181'], referencecenter:['#00A7A5','0,167,165'],
 admincenter:['#8E98A8','142,152,168']
};
function theme530(){
 const p=themeColors[document.body.dataset.theme]; if(!p)return;
 ['--accent','--live-page-accent','--fleet-accent'].forEach(k=>{document.documentElement.style.setProperty(k,p[0]);document.body.style.setProperty(k,p[0])});
 ['--accent-rgb','--live-page-rgb','--fleet-rgb'].forEach(k=>{document.documentElement.style.setProperty(k,p[1]);document.body.style.setProperty(k,p[1])});
}
new MutationObserver(()=>setTimeout(()=>{theme530();addReport530()},0)).observe(document.body,{attributes:true,attributeFilter:['data-theme']});
setInterval(theme530,800);

/* Existing Home should remain startup view. */
setTimeout(()=>{if(document.body.dataset.theme==='home'){enhanceHome530()} theme530();},150);
})();
document.addEventListener('click',function(e){if(document.body.classList.contains('report-preview530')&&e.clientX>window.innerWidth-220&&e.clientY>window.innerHeight-80)document.body.classList.remove('report-preview530')});
