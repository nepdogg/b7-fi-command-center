/* B7 FI Command Center v0.80.46 — Tool Center navigation + archive + lifecycle finalization.
   - Tool Center toolbar: navigation left, actions right.
   - Tool Archive gets a dedicated, working route (not Tool Countdown).
   - Canonical tool lifecycle: Waiting to be Handed to FI, In FI, Packing and Shipping, Shipped, Archive.
   - Archive is a lifecycle status, never delete.
   - Tool Center summary uses fixed placeholders and current lifecycle state.
*/
(function(){'use strict';
const VERSION='0.80.46',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function allTools(){try{return Array.isArray(tools)?tools:[]}catch(e){return[]}}
function q(){try{return String(quarterLabel()).toUpperCase()}catch(e){return'CY26Q3'}}
function btn(label,fn,primary=false,danger=false){const b=document.createElement('button');b.type='button';b.className=`btn${primary?' primary':''}${danger?' danger':''}`;b.textContent=label;b.onclick=fn;return b}
function shot(){try{return window.enterScreenshotMode?.()}catch(e){}window.print()}
function report(){window.print()}
function setToolTheme(title){document.body.dataset.center='toolfinal';document.body.dataset.theme='toolcenter';document.documentElement.style.setProperty('--page-accent','#8b5cf6');document.documentElement.style.setProperty('--page-accent-rgb','139,92,246');const h=$('#headerPageTitle');if(h)h.textContent=title;$$('.main-nav .nav-btn').forEach(x=>x.classList.toggle('active',x.dataset.view==='toolcenter'))}
function toolbar(active='tools',mode='list',toolId=''){
 const bar=$('#floatingActions');if(!bar)return;bar.className='floating-actions page-toolbar v837-page-toolbar v846-toolbar';bar.innerHTML='';
 const l=document.createElement('div'),r=document.createElement('div');l.className='v837-toolbar-left v846-nav-left';r.className='v837-toolbar-right v846-actions-right';
 l.append(btn(`${q()} TOOLS`,()=>window.setView('toolcenter'),active==='tools'));l.append(btn('TOOL COUNTDOWN',()=>window.setView('countdown'),active==='countdown'));l.append(btn('TOOL ARCHIVE',renderArchive,active==='archive'));
 if(mode==='detail'){r.append(btn('EDIT TOOL',()=>window.toolAdmin(toolId),true),btn('SCREENSHOT',shot),btn('REPORT',report));}
 else if(mode==='archive'){r.append(btn('SCREENSHOT',shot),btn('REPORT',report));}
 else {r.append(btn('ADD TOOL',()=>window.toolAdmin(),true),btn('SCREENSHOT',shot),btn('REPORT',report));}
 bar.append(l,r);
}
function fmt(v){try{return window.fmt?window.fmt(v):(v||'—')}catch(e){return v||'—'}}
function renderArchive(){
 setToolTheme('TOOL ARCHIVE');
 const list=allTools().filter(t=>String(t.quarterStatus)==='Archive').sort((a,b)=>String(b.archiveDate||b.ship||'').localeCompare(String(a.archiveDate||a.ship||'')));
 const app=$('#app');if(!app)return;
 app.innerHTML=`<div class="report-screen v846-archive"><section class="panel"><div class="subsection-title"><div><h2>TOOL ARCHIVE</h2><p class="helper">Archived tools are retained as historical records. Click any tool to open its Tool page.</p></div><strong>${list.length} ARCHIVED</strong></div><div class="table-wrap"><table class="report-table"><thead><tr><th>UTID</th><th>Tool / Model</th><th>Customer</th><th>Sales Order</th><th>Ship Date</th><th>Quarter</th><th>Archived</th></tr></thead><tbody>${list.map(t=>`<tr class="v846-archive-row" data-v846-tool="${esc(t.id)}"><td><b>${esc(t.id)}</b></td><td>${esc(t.codename||'—')} · ${esc(t.model||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(t.so||'—')}</td><td>${esc(fmt(t.ship))}</td><td>${esc(t.quarter||'—')}</td><td>${esc(fmt(t.archiveDate))}</td></tr>`).join('')||'<tr><td colspan="7" class="gray">No archived tools yet.</td></tr>'}</tbody></table></div></section></div>`;
 $$('[data-v846-tool]').forEach(x=>x.onclick=()=>window.toolStatus(x.dataset.v846Tool));toolbar('archive','archive');try{sessionStorage.setItem('b7.route',JSON.stringify({kind:'view',view:'archive'}))}catch(e){}
}
function lifecycleStatus(t){let s=String(t?.quarterStatus||'Waiting for FI');if(s==='Waiting to be Handed to FI')s='Waiting for FI';if(s==='Packing'||s==='Packing / Shipping')s='Packing and Shipping';return s}
function currentSummary(){
 const quarter=q(),active=allTools().filter(t=>lifecycleStatus(t)!=='Archive'&&String(t.originalQuarter||t.quarter||'').toUpperCase()===quarter);
 const count=s=>active.filter(t=>lifecycleStatus(t)===s).length;
 return {waiting:count('Waiting for FI'),infi:count('In FI'),packing:count('Packing and Shipping'),shipped:count('Shipped')};
}
function repairSummary(){const grid=$('.v845-summary-grid,.v837-summary-grid');if(!grid)return;const s=currentSummary();const cards=$$('.v845-metric',grid);cards.forEach(c=>{const lab=c.querySelector('span')?.textContent?.trim();const val=c.querySelector('strong');if(!val)return;if(lab==='WAITING FI')val.textContent=s.waiting;if(lab==='IN FI')val.textContent=s.infi;if(lab==='PACKING')val.textContent=s.packing;if(lab==='SHIPPED')val.textContent=s.shipped});}
function repairStatusSelect(){const sel=$('#tm-status');if(!sel)return;let cur=sel.value;if(cur==='Packing'||cur==='Packing / Shipping')cur='Packing and Shipping';const opts=[['Waiting for FI','Waiting to be Handed to FI'],['In FI','In FI'],['Packing and Shipping','Packing and Shipping'],['Shipped','Shipped'],['Archive','Archive']];sel.innerHTML=opts.map(([v,l])=>`<option value="${v}" ${v===cur?'selected':''}>${l}</option>`).join('');}
function repairMiniStatus(){ $$('.v842-mini-tool-card').forEach(card=>{const id=card.closest('[data-v837-tool]')?.dataset.v837Tool;const t=allTools().find(x=>String(x.id)===String(id));if(!t)return;const s=lifecycleStatus(t),badge=$('.v842-status',card);if(badge)badge.textContent=s==='Waiting for FI'?'WAITING FOR FI':s.toUpperCase();card.classList.toggle('v843-packing',s==='Packing and Shipping')}) }
function enforceToolbar(){const title=String($('#headerPageTitle')?.textContent||'');if(!/TOOL CENTER|TOOL ARCHIVE|TOOL \d+/.test(title))return;if(/TOOL ARCHIVE/.test(title))toolbar('archive','archive');else if(/TOOL \d+/.test(title)){const m=title.match(/TOOL\s+(\d+)/);toolbar('tools','detail',m?.[1]||'')}else if(/COUNTDOWN/.test($('#app')?.textContent||''))toolbar('countdown');else toolbar('tools');}
const priorSetView=window.setView;if(typeof priorSetView==='function'){window.setView=function(v){if(v==='archive'){renderArchive();return}const r=priorSetView.apply(this,arguments);[0,50,160].forEach(ms=>setTimeout(()=>{repairSummary();enforceToolbar()},ms));return r};try{setView=window.setView}catch(e){}}
const priorToolAdmin=window.toolAdmin;if(typeof priorToolAdmin==='function'){window.toolAdmin=function(){const r=priorToolAdmin.apply(this,arguments);[0,50,150].forEach(ms=>setTimeout(()=>{repairStatusSelect();enforceToolbar()},ms));return r};try{toolAdmin=window.toolAdmin}catch(e){}}
const priorToolStatus=window.toolStatus;if(typeof priorToolStatus==='function'){window.toolStatus=function(id){const r=priorToolStatus.apply(this,arguments);[0,50,150].forEach(ms=>setTimeout(()=>{enforceToolbar();repairMiniStatus()},ms));return r};try{toolStatus=window.toolStatus}catch(e){}}
function refresh(){stamp();repairStatusSelect();repairSummary();repairMiniStatus();enforceToolbar()}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if((b.textContent||'').trim().toUpperCase()==='TOOL ARCHIVE'){e.preventDefault();e.stopImmediatePropagation();renderArchive()}},true);
function boot(){[0,100,300,700].forEach(ms=>setTimeout(refresh,ms))}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
