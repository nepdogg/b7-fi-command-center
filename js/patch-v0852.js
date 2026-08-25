/* B7 FI Command Center v0.80.52 — Tool Center + Administration stabilization.
   - Restores Administration Home access to full Data & Backup / Entra-SharePoint tools.
   - Keeps Tool Center page navigation fixed left and page actions fixed right.
   - Tool Countdown removes redundant in-page title/description.
   - Tool Archive is a clean list with ARCHIVE TOOL -> CANCEL / SAVE workflow.
   - Archive changes the master tool lifecycle record and preserves history/data.
*/
(function(){'use strict';
const VERSION='0.80.52';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function q(){try{return String(window.getB7ActiveQuarter?.()||window.quarterLabel?.()||'CY26Q3').toUpperCase()}catch(e){return'CY26Q3'}}
function toolsAll(){try{return Array.isArray(window.tools)?window.tools:(Array.isArray(tools)?tools:[])}catch(e){return[]}}
function saveMaster(){try{return window.save?.()}catch(e){try{return save()}catch(_){}}}
function fmt(v){if(!v)return'—';try{const d=new Date(String(v).slice(0,10)+'T00:00:00');return isNaN(d)?String(v):d.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}catch(e){return String(v)}}
function btn(label,fn,primary=false){const b=document.createElement('button');b.type='button';b.className='btn'+(primary?' primary':'');b.textContent=label;b.onclick=fn;return b}
function shot(){try{if(typeof window.enterScreenshotMode==='function')return window.enterScreenshotMode()}catch(e){}window.print()}
function report(){window.print()}
function setTheme(title,kind='tool'){
 document.body.dataset.center=kind==='admin'?'admin':'toolfinal';document.body.dataset.theme=kind==='admin'?'admin':'toolcenter';
 const accent=kind==='admin'?'#a6afbc':'#8b5cf6',rgb=kind==='admin'?'166,175,188':'139,92,246';
 document.documentElement.style.setProperty('--page-accent',accent);document.documentElement.style.setProperty('--page-accent-rgb',rgb);
 const h=$('#headerPageTitle');if(h)h.textContent=title;
 $$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',kind==='tool'&&b.dataset.view==='toolcenter'));
}
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function toolNav(active){return [
 btn(`${q()} TOOLS`,()=>window.setView?.('toolcenter'),active==='tools'),
 btn('TOOL COUNTDOWN',()=>window.setView?.('countdown'),active==='countdown'),
 btn('TOOL ARCHIVE',renderArchive,active==='archive')
]}
function toolToolbar(active,mode='normal'){
 const bar=$('#floatingActions');if(!bar)return;bar.className='floating-actions page-toolbar v852-toolbar';bar.innerHTML='';
 const left=document.createElement('div'),right=document.createElement('div');left.className='v852-nav-left';right.className='v852-actions-right';toolNav(active).forEach(b=>left.append(b));
 if(mode==='archive-edit')right.append(btn('CANCEL',renderArchive),btn('SAVE',saveArchive,true));
 else if(active==='archive')right.append(btn('ARCHIVE TOOL',renderArchiveMode,true),btn('SCREENSHOT',shot),btn('REPORT',report));
 else right.append(btn('ADD TOOL',()=>window.toolAdmin?.(),true),btn('SCREENSHOT',shot),btn('REPORT',report));
 bar.append(left,right);
}
function activeTools(){return toolsAll().filter(t=>String(t.quarterStatus||'').toLowerCase()!=='archive')}
function archivedTools(){return toolsAll().filter(t=>String(t.quarterStatus||'').toLowerCase()==='archive')}
function openTool(id){if(typeof window.toolStatus==='function')window.toolStatus(id)}
function archiveRows(list){return list.map(t=>`<tr class="v852-open-tool" data-id="${esc(t.id||t.utid)}"><td><b>${esc(t.id||t.utid)}</b></td><td>${esc(t.codename||t.codeName||'—')}</td><td>${esc(t.model||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(t.so||t.salesOrder||'—')}</td><td>${esc(fmt(t.ship||t.shipDate))}</td><td>${esc(t.quarter||'—')}</td><td>${esc(fmt(t.archiveDate))}</td></tr>`).join('')}
function renderArchive(){
 setTheme('TOOL ARCHIVE');const app=$('#app');if(!app)return;const list=archivedTools();
 app.innerHTML=`<div class="v852-simple-page"><div class="table-wrap"><table class="report-table v852-archive-table"><thead><tr><th>UTID</th><th>CODE NAME</th><th>MODEL</th><th>CUSTOMER</th><th>SALES ORDER</th><th>SHIP DATE</th><th>QUARTER</th><th>ARCHIVED</th></tr></thead><tbody>${archiveRows(list)||'<tr><td colspan="8" class="gray">No archived tools.</td></tr>'}</tbody></table></div></div>`;
 toolToolbar('archive');$$('.v852-open-tool',app).forEach(r=>r.onclick=()=>openTool(r.dataset.id));
}
function renderArchiveMode(){
 setTheme('TOOL ARCHIVE');const app=$('#app');if(!app)return;const list=activeTools();
 app.innerHTML=`<div class="v852-simple-page"><div class="table-wrap"><table class="report-table"><thead><tr><th>UTID</th><th>CODE NAME</th><th>MODEL</th><th>CUSTOMER</th><th>CURRENT STATUS</th><th>NEW STATUS</th></tr></thead><tbody>${list.map(t=>`<tr><td><b>${esc(t.id||t.utid)}</b></td><td>${esc(t.codename||t.codeName||'—')}</td><td>${esc(t.model||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(t.quarterStatus||'Waiting to be Handed to FI')}</td><td><select class="v852-archive-select" data-id="${esc(t.id||t.utid)}"><option value="">No Change</option><option value="Archive">Archive</option></select></td></tr>`).join('')||'<tr><td colspan="6" class="gray">No active tools available to archive.</td></tr>'}</tbody></table></div><div id="v852Notice" class="v852-notice" aria-live="polite"></div></div>`;
 toolToolbar('archive','archive-edit');
}
function saveArchive(){
 const ids=$$('.v852-archive-select').filter(s=>s.value==='Archive').map(s=>String(s.dataset.id));
 if(!ids.length){const n=$('#v852Notice');if(n){n.textContent='No changes to save.';n.classList.add('show')}return}
 const today=new Date().toISOString().slice(0,10);toolsAll().forEach(t=>{if(ids.includes(String(t.id||t.utid))){t.quarterStatus='Archive';t.archiveDate=today;t.status='Archive'}});saveMaster();
 try{document.dispatchEvent(new CustomEvent('b7fi:tool-records-updated',{detail:{reason:'archive',ids}}))}catch(e){}
 renderArchive();const note=document.createElement('div');note.className='v852-ack';note.textContent=ids.length===1?`✓ Tool ${ids[0]} moved to Archive`:`✓ ${ids.length} tools moved to Archive`;$('#app')?.prepend(note);setTimeout(()=>note.remove(),4200);
}
function cleanCountdown(){
 const app=$('#app');if(!app||!/TOOL COUNTDOWN/i.test(app.textContent||''))return;setTheme(`TOOL CENTER — ${q()}`);
 /* Remove redundant content title/helper only; keep table and page shell. */
 $$('h1,h2,h3',app).forEach(h=>{if(new RegExp(`^${q()}\\s+TOOL COUNTDOWN$`,'i').test((h.textContent||'').trim())||/^TOOL COUNTDOWN$/i.test((h.textContent||'').trim()))h.remove()});
 $$('.helper,p.gray,p',app).forEach(p=>{if(/Fast quarter view|Click any tool to open its master Tool page/i.test(p.textContent||''))p.remove()});
 toolToolbar('countdown');
}
function adminToolbar(active='home'){
 const bar=$('#floatingActions');if(!bar)return;bar.className='floating-actions page-toolbar v852-toolbar';bar.innerHTML='';
 const left=document.createElement('div'),right=document.createElement('div');left.className='v852-nav-left';right.className='v852-actions-right';
 left.append(btn('ADMIN HOME',renderAdminHome,active==='home'),btn('DATA & BACKUP',renderAdminData,active==='data'));
 right.append(btn('SCREENSHOT',shot),btn('REPORT',report));bar.append(left,right);
}
function renderAdminHome(){
 setTheme('ADMINISTRATION CENTER','admin');const app=$('#app');if(!app)return;
 app.innerHTML=`<div class="v852-admin-home">
   <section class="panel v852-admin-hero"><div><span class="eyebrow">DATA PROTECTION & INTEGRATION</span><h2>Administration Center</h2><p class="gray">Protect Command Center data before archive/delete tests and manage Entra / SharePoint connection settings.</p></div></section>
   <div class="v852-admin-grid">
    <button class="v852-admin-card" id="v852Backup"><b>DATA & BACKUP</b><span>Export full backup · Restore backup · Migration CSV</span><em>OPEN DATA & BACKUP →</em></button>
    <button class="v852-admin-card" id="v852Entra"><b>ENTRA / SHAREPOINT</b><span>Tenant ID · Client/Application ID · SharePoint readiness</span><em>OPEN ENTRA SETTINGS →</em></button>
    <button class="v852-admin-card" id="v852Legacy"><b>ADMINISTRATION TOOLS</b><span>Tool admin · priorities · shipping · configuration</span><em>OPEN ADMIN TOOLS →</em></button>
   </div></div>`;
 adminToolbar('home');$('#v852Backup').onclick=renderAdminData;$('#v852Entra').onclick=renderAdminData;$('#v852Legacy').onclick=renderLegacyAdmin;
}
function renderAdminData(){
 setTheme('ADMINISTRATION CENTER','admin');
 try{if(typeof window.sharedData==='function')window.sharedData();else if(typeof sharedData==='function')sharedData();else throw new Error('Data & Backup renderer unavailable');}
 catch(e){const app=$('#app');if(app)app.innerHTML=`<div class="panel"><h2>Data & Backup</h2><p class="gray">${esc(e.message)}</p></div>`}
 adminToolbar('data');
}
function renderLegacyAdmin(){
 setTheme('ADMINISTRATION CENTER','admin');
 try{if(typeof window.admin==='function')window.admin('home');else if(typeof admin==='function')admin('home');}
 catch(e){const app=$('#app');if(app)app.innerHTML=`<div class="panel"><h2>Administration Tools</h2><p class="gray">${esc(e.message)}</p></div>`}
 adminToolbar('home');
}
/* Capture Tool Center subnavigation so late legacy handlers cannot replace these pages. */
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const text=String(b.textContent||'').trim().toUpperCase();
 if(text==='TOOL ARCHIVE'){e.preventDefault();e.stopImmediatePropagation();renderArchive();return}
 if(text==='TOOL COUNTDOWN'){setTimeout(cleanCountdown,0);setTimeout(cleanCountdown,100);return}
},true);
/* Footer Administration button is authoritative. */
document.addEventListener('click',e=>{const b=e.target.closest('#administrationCenterFooter');if(!b)return;e.preventDefault();e.stopImmediatePropagation();renderAdminHome()},true);
const priorSetView=window.setView;
if(typeof priorSetView==='function'){
 window.setView=function(v){
   if(v==='archive'){renderArchive();return}
   if(v==='admincenter'||v==='admin'){renderAdminHome();return}
   if(v==='shared'){renderAdminData();return}
   const out=priorSetView.apply(this,arguments);
   if(v==='countdown')[0,60,180,500].forEach(ms=>setTimeout(cleanCountdown,ms));
   return out;
 };try{setView=window.setView}catch(e){}
}
function boot(){stamp();const app=$('#app');if(app&&/TOOL COUNTDOWN/i.test(app.textContent||''))cleanCountdown()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
