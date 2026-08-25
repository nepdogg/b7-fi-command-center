/* B7 FI Command Center v0.80.51 — Tool Center framework finalization.
   - Countdown removes helper description.
   - Archive becomes a clean historical list.
   - ARCHIVE TOOL opens a deliberate archive-selection mode.
   - Archive mode uses CANCEL / SAVE with explicit save acknowledgement.
   - Archive is a master-record lifecycle change; all active views update from the same tools[] records.
*/
(function(){'use strict';
const VERSION='0.80.51';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function q(){try{return String(window.getB7ActiveQuarter?.()||window.quarterLabel?.()||'CY26Q3').toUpperCase()}catch(e){return'CY26Q3'}}
function allTools(){try{return Array.isArray(window.tools)?window.tools:(Array.isArray(tools)?tools:[])}catch(e){return[]}}
function saveAll(){try{window.save?.()}catch(e){try{save()}catch(_){}}}
function shot(){try{if(typeof window.enterScreenshotMode==='function')return window.enterScreenshotMode()}catch(e){}window.print()}
function btn(label,fn,primary=false){const b=document.createElement('button');b.type='button';b.className='btn'+(primary?' primary':'');b.textContent=label;b.onclick=fn;return b}
function setTheme(title){document.body.dataset.center='toolfinal';document.body.dataset.theme='toolcenter';const h=$('#headerPageTitle');if(h)h.textContent=title;$$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='toolcenter'))}
function nav(active){return [btn(`${q()} TOOLS`,()=>window.setView?.('toolcenter'),active==='tools'),btn('TOOL COUNTDOWN',()=>window.setView?.('countdown'),active==='countdown'),btn('TOOL ARCHIVE',renderArchive,active==='archive')]}
function toolbar(active,mode='normal'){
 const bar=$('#floatingActions');if(!bar)return;bar.className='floating-actions page-toolbar v850-tool-toolbar v851-tool-toolbar';bar.innerHTML='';
 const left=document.createElement('div'),right=document.createElement('div');left.className='v850-tool-nav';right.className='v850-tool-actions';nav(active).forEach(x=>left.append(x));
 if(mode==='archive-edit'){right.append(btn('CANCEL',renderArchive),btn('SAVE',saveArchive,true));}
 else if(active==='archive'){right.append(btn('ARCHIVE TOOL',renderArchiveMode,true),btn('SCREENSHOT',shot),btn('REPORT',()=>window.print()));}
 else {right.append(btn('ADD TOOL',()=>window.toolAdmin?.(),true),btn('SCREENSHOT',shot),btn('REPORT',()=>window.print()));}
 bar.append(left,right);
}
function activeTools(){return allTools().filter(t=>String(t.quarterStatus||'')!=='Archive')}
function archivedTools(){return allTools().filter(t=>String(t.quarterStatus||'')==='Archive')}
function fmt(v){if(!v)return'—';try{const d=new Date(v+'T00:00:00');return isNaN(d)?v:d.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}catch(e){return v}}
function openTool(id){if(typeof window.toolStatus==='function')window.toolStatus(id)}
function archiveTable(list){return `<div class="table-wrap"><table class="report-table v851-archive-table"><thead><tr><th>UTID</th><th>CODE NAME</th><th>MODEL</th><th>CUSTOMER</th><th>SALES ORDER</th><th>SHIP DATE</th><th>QUARTER</th><th>ARCHIVED</th></tr></thead><tbody>${list.map(t=>`<tr class="v851-open-tool" data-id="${esc(t.id)}"><td><b>${esc(t.id)}</b></td><td>${esc(t.codename||'—')}</td><td>${esc(t.model||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(t.so||'—')}</td><td>${esc(fmt(t.ship))}</td><td>${esc(t.quarter||'—')}</td><td>${esc(fmt(t.archiveDate))}</td></tr>`).join('')||'<tr><td colspan="8" class="gray v851-empty">No archived tools.</td></tr>'}</tbody></table></div>`}
function renderArchive(){setTheme('TOOL ARCHIVE');const app=$('#app');if(!app)return;const list=archivedTools();app.innerHTML=`<div class="report-screen v851-archive"><section class="panel v851-flat-panel">${archiveTable(list)}</section></div>`;toolbar('archive');$$('.v851-open-tool',app).forEach(r=>r.onclick=()=>openTool(r.dataset.id));}
function renderArchiveMode(){setTheme('TOOL ARCHIVE — SELECT TOOL');const app=$('#app');if(!app)return;const list=activeTools();app.innerHTML=`<div class="report-screen v851-archive-mode"><section class="panel v851-flat-panel"><div class="table-wrap"><table class="report-table"><thead><tr><th>UTID</th><th>CODE NAME</th><th>MODEL</th><th>CUSTOMER</th><th>CURRENT STATUS</th><th>FI STATUS</th></tr></thead><tbody>${list.map(t=>`<tr><td><b>${esc(t.id)}</b></td><td>${esc(t.codename||'—')}</td><td>${esc(t.model||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(t.quarterStatus||'Waiting for FI')}</td><td><select class="v851-archive-select" data-id="${esc(t.id)}"><option value="">${esc(t.quarterStatus||'Waiting for FI')}</option><option value="Archive">Archive</option></select></td></tr>`).join('')||'<tr><td colspan="6" class="gray v851-empty">No active tools available to archive.</td></tr>'}</tbody></table></div><div id="v851ArchiveNotice" class="v851-save-notice" aria-live="polite"></div></section></div>`;toolbar('archive','archive-edit');}
function saveArchive(){const selected=$$('.v851-archive-select').filter(s=>s.value==='Archive');if(!selected.length){const n=$('#v851ArchiveNotice');if(n){n.textContent='No changes to save.';n.className='v851-save-notice show neutral'}return}
 const ids=selected.map(s=>s.dataset.id),today=new Date().toISOString().slice(0,10);allTools().forEach(t=>{if(ids.includes(String(t.id))){t.quarterStatus='Archive';t.archiveDate=today}});saveAll();
 try{document.dispatchEvent(new CustomEvent('b7fi:tool-records-updated',{detail:{reason:'archive',ids}}))}catch(e){}
 renderArchive();setTimeout(()=>{const app=$('#app');if(!app)return;const note=document.createElement('div');note.className='v851-global-ack';note.textContent=ids.length===1?`✓ Tool ${ids[0]} moved to Archive`:`✓ ${ids.length} tools moved to Archive`;app.prepend(note);setTimeout(()=>note.remove(),4200)},20);
}
function cleanCountdown(){const app=$('#app');if(!app)return;const text=String(app.textContent||'').toUpperCase();if(!text.includes('TOOL COUNTDOWN'))return;setTheme(`TOOL CENTER — ${q()}`);toolbar('countdown');$$('.helper',app).forEach(p=>{if(/Fast quarter view/i.test(p.textContent||''))p.remove()});}
/* Override archive route after legacy renderers. */
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const tx=String(b.textContent||'').trim().toUpperCase();if(tx==='TOOL ARCHIVE'){e.preventDefault();e.stopImmediatePropagation();renderArchive()}},true);
const priorSetView=window.setView;if(typeof priorSetView==='function'){window.setView=function(v){if(v==='archive'){renderArchive();return}const out=priorSetView.apply(this,arguments);if(v==='countdown')[0,60,180,500].forEach(ms=>setTimeout(cleanCountdown,ms));return out};try{setView=window.setView}catch(e){}}
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function boot(){stamp();const app=$('#app');if(app&&/TOOL COUNTDOWN/i.test(app.textContent||''))cleanCountdown();if(app&&/TOOL ARCHIVE/i.test(app.textContent||''))renderArchive()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
