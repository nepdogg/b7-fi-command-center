/* B7 FI Command Center v0.80.50 — Tool Center workflow lock + shared status language.
   - Final Tool Center page-toolbar convention: navigation left, actions right, no center/duplicates.
   - Tool Center workflows: quarter setup (Add Tool), active Tool editing, quarter-close bulk archive.
   - One Master Tool record remains the source of truth; saves emit a universal tool-record update event.
   - Tool Center + Operations/Live Status use the same 8 KPI boxes and status-color borders.
   - Restores OPERATIONS CENTER — <quarter> title.
   - Repairs Meeting Center top-navigation routing through the mature Meeting renderer.
*/
(function(){'use strict';
const VERSION='0.80.50';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;

function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function q(){try{return String(window.getB7ActiveQuarter?.()||window.quarterLabel?.()||'CY26Q3').toUpperCase()}catch(e){return'CY26Q3'}}
function stamp(){document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function allTools(){try{return Array.isArray(window.tools)?window.tools:(Array.isArray(tools)?tools:[])}catch(e){return[]}}
function lifecycle(t){let s=String(t?.quarterStatus||'Waiting for FI');if(s==='Waiting to be Handed to FI')s='Waiting for FI';if(s==='Packing'||s==='Packing / Shipping')s='Packing and Shipping';return s}
function shot(){try{if(typeof window.enterScreenshotMode==='function')return window.enterScreenshotMode()}catch(e){}window.print()}
function report(){window.print()}
function button(label,fn,primary=false,danger=false){const b=document.createElement('button');b.type='button';b.className=`btn${primary?' primary':''}${danger?' danger':''}`;b.textContent=label;b.onclick=fn;return b}
function setToolTheme(title){
  document.body.dataset.center='toolfinal';document.body.dataset.theme='toolcenter';
  document.documentElement.style.setProperty('--page-accent','#8b5cf6');document.documentElement.style.setProperty('--page-accent-rgb','139,92,246');
  const h=$('#headerPageTitle');if(h)h.textContent=title;
  $$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='toolcenter'));
}
function navButtons(active){return [
  button(`${q()} TOOLS`,()=>window.setView?.('toolcenter'),active==='tools'),
  button('TOOL COUNTDOWN',()=>window.setView?.('countdown'),active==='countdown'),
  button('TOOL ARCHIVE',()=>window.setView?.('archive'),active==='archive')
]}
function routeKind(){
  const title=String($('#headerPageTitle')?.textContent||'').trim().toUpperCase();
  const text=String($('#app')?.textContent||'').toUpperCase();
  if(/^ADD TOOL\b/.test(title)||/NEW TOOL RECORD/.test(text))return {kind:'add',active:'tools'};
  if(/—\s*EDIT\b/.test(title)||/EDITING TOOL/.test(text))return {kind:'edit',active:'tools',id:(title.match(/TOOL\s+(\w+)/)||[])[1]||''};
  if(/^TOOL\s+\w+/.test(title)&&!/CENTER/.test(title))return {kind:'detail',active:'tools',id:(title.match(/TOOL\s+(\w+)/)||[])[1]||''};
  if(/TOOL ARCHIVE/.test(title)||/\bTOOL ARCHIVE\b/.test(text))return {kind:'archive',active:'archive'};
  if(/TOOL COUNTDOWN/.test(text))return {kind:'countdown',active:'countdown'};
  if(/TOOL CENTER/.test(title)||document.body?.dataset?.theme==='toolcenter')return {kind:'tools',active:'tools'};
  return null;
}
function existingAction(label){return $$('#floatingActions button').find(b=>String(b.textContent||'').trim().toUpperCase()===label)}
function bulkArchive(){
  const eligible=allTools().filter(t=>lifecycle(t)==='Shipped'&&lifecycle(t)!=='Archive');
  if(!eligible.length){alert('There are no Shipped tools ready to archive.');return}
  const ids=eligible.map(t=>t.id||t.utid).join(', ');
  if(!confirm(`Archive ${eligible.length} shipped tool${eligible.length===1?'':'s'}?\n\n${ids}\n\nThe Tool records and history will be retained in Tool Archive.`))return;
  const today=new Date().toISOString().slice(0,10);
  eligible.forEach(t=>{t.quarterStatus='Archive';t.archiveDate=t.archiveDate||today});
  try{window.save?.()}catch(e){try{save()}catch(_){} }
  document.dispatchEvent(new CustomEvent('b7fi:tool-records-updated',{detail:{reason:'bulk-archive',ids:eligible.map(t=>t.id)}}));
  window.setView?.('archive');
}
function rebuildToolToolbar(){
  if(viewerOnly())return;
  const ctx=routeKind();if(!ctx)return;
  const bar=$('#floatingActions');if(!bar)return;
  /* Preserve bound Save/Delete/Cancel elements before clearing the toolbar. */
  const preserved={save:existingAction('SAVE TOOL'),del:existingAction('DELETE TOOL'),cancel:existingAction('CANCEL')};
  bar.className='floating-actions page-toolbar v850-tool-toolbar';bar.innerHTML='';
  const left=document.createElement('div'),right=document.createElement('div');left.className='v850-tool-nav';right.className='v850-tool-actions';
  navButtons(ctx.active).forEach(b=>left.appendChild(b));
  if(ctx.kind==='tools'||ctx.kind==='countdown'){
    right.append(button('ADD TOOL',()=>window.toolAdmin?.(),true),button('SCREENSHOT',shot),button('REPORT',report));
  }else if(ctx.kind==='archive'){
    right.append(button('ARCHIVE TOOLS',bulkArchive,true),button('SCREENSHOT',shot),button('REPORT',report));
  }else if(ctx.kind==='detail'){
    right.append(button('EDIT TOOL',()=>window.toolAdmin?.(ctx.id),true),button('SCREENSHOT',shot),button('REPORT',report));
  }else if(ctx.kind==='add'||ctx.kind==='edit'){
    const cancel=preserved.cancel||button('CANCEL',()=>ctx.kind==='edit'?window.toolStatus?.(ctx.id):window.setView?.('toolcenter'));
    right.append(cancel);
    if(preserved.save)right.append(preserved.save);
    if(ctx.kind==='edit'&&preserved.del)right.append(preserved.del);
  }
  bar.append(left,right);
}

const KPI_CLASS={
  'CY26Q3 TOOLS':'total','PLANNED CY26Q3 TOOLS':'planned','WAITING FI':'waiting','IN FI':'infi','PACKING':'packing','SHIPPED':'shipped',
  'PULLED INTO CY26Q3':'pullin','PUSHED OUT':'pushout'
};
function kpiKind(label){label=String(label||'').trim().toUpperCase();if(/^CY\d{2}Q[1-4] TOOLS$/.test(label))return'total';if(/^PLANNED CY\d{2}Q[1-4] TOOLS$/.test(label))return'planned';if(/^PULLED INTO CY\d{2}Q[1-4]$/.test(label))return'pullin';return KPI_CLASS[label]||''}
function styleSummaries(){
  $$('.v849-summary,.v845-summary-grid,.v845-live-summary,.v837-summary-grid.v844-summary-grid').forEach(grid=>{
    grid.classList.add('v850-summary');
    $$('.metric,.v845-metric',grid).forEach(card=>{
      const label=$('span',card)?.textContent||'',kind=kpiKind(label),value=Number(String($('strong',card)?.textContent||'0').replace(/[^0-9.-]/g,''))||0;
      [...card.classList].filter(x=>x.startsWith('v850-kpi-')).forEach(x=>card.classList.remove(x));
      if(kind)card.classList.add(`v850-kpi-${kind}`);
      const conditional=['planned','packing','pullin','pushout'].includes(kind);
      let active=value>0;
      if(kind==='planned'){
        const totalCard=$$('.metric,.v845-metric',grid).find(c=>kpiKind($('span',c)?.textContent)==='total');
        const total=Number(String($('strong',totalCard)?.textContent||'0').replace(/[^0-9.-]/g,''))||0;active=value!==total;
      }
      card.classList.toggle('v850-kpi-muted',conditional&&!active);
    });
  });
}

function setCenterTitle(view){
  if(viewerOnly())return;
  const h=$('#headerPageTitle');if(!h)return;
  const map={home:`OPERATIONS CENTER — ${q()}`,toolcenter:`TOOL CENTER — ${q()}`,systems:`TOOL CENTER — ${q()}`,shipping:`SHIPPING CENTER — ${q()}`,priorities:`PRIORITY CENTER — ${q()}`,statuscenter:`STATUS CENTER — ${q()}`,meetingcenter:'MEETING CENTER',actions:'ACTION CENTER',referencecenter:'REFERENCE CENTER',searchcenter:'SEARCH CENTER'};
  if(map[view]&&!/^TOOL\s+\w+/i.test(h.textContent||''))h.textContent=map[view];
}
function openMeeting(){
  try{if(typeof window.B7Renderers58?.meetingCenter==='function'){window.B7Renderers58.meetingCenter();}}
  catch(e){return window.setView?.('statuscenter')}
  document.body.dataset.theme='meeting';document.body.dataset.center='meeting';
  $$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='meetingcenter'));
  const h=$('#headerPageTitle');if(h)h.textContent='MEETING CENTER';
}

/* One-source-of-truth save event. All views continue to read the same tools[] master records. */
const priorSave=window.save;
if(typeof priorSave==='function'&&!priorSave.__v850){
  const wrapped=function(){const out=priorSave.apply(this,arguments);try{document.dispatchEvent(new CustomEvent('b7fi:tool-records-updated',{detail:{reason:'save',at:Date.now()}}))}catch(e){}return out};wrapped.__v850=true;window.save=wrapped;try{save=wrapped}catch(e){}
}

document.addEventListener('b7fi:tool-records-updated',()=>{[0,80,220].forEach(ms=>setTimeout(()=>{styleSummaries();rebuildToolToolbar()},ms))});
/* Meeting Center gets an explicit route so later legacy wrappers cannot send it to Status Center. */
document.addEventListener('click',e=>{const b=e.target.closest('.main-nav .nav-btn[data-view="meetingcenter"]');if(!b||viewerOnly())return;e.preventDefault();e.stopImmediatePropagation();openMeeting()},true);

const priorSetView=window.setView;
if(typeof priorSetView==='function'){
  window.setView=function(v){
    if(v==='meetingcenter'&&!viewerOnly()){openMeeting();return}
    const out=priorSetView.apply(this,arguments);
    [0,50,160,420,900].forEach(ms=>setTimeout(()=>{setCenterTitle(v);styleSummaries();rebuildToolToolbar()},ms));
    return out;
  };try{setView=window.setView}catch(e){}
}
const priorToolStatus=window.toolStatus;if(typeof priorToolStatus==='function'){window.toolStatus=function(){const out=priorToolStatus.apply(this,arguments);[0,70,220,500].forEach(ms=>setTimeout(()=>{styleSummaries();rebuildToolToolbar()},ms));return out};try{toolStatus=window.toolStatus}catch(e){}}
const priorToolAdmin=window.toolAdmin;if(typeof priorToolAdmin==='function'){window.toolAdmin=function(){const out=priorToolAdmin.apply(this,arguments);[0,70,220,500].forEach(ms=>setTimeout(()=>{styleSummaries();rebuildToolToolbar()},ms));return out};try{toolAdmin=window.toolAdmin}catch(e){}}

function boot(){
  stamp();
  const active=$('.main-nav .nav-btn.active')?.dataset.view||'home';
  [0,120,350,800,1400].forEach(ms=>setTimeout(()=>{setCenterTitle(active);styleSummaries();rebuildToolToolbar()},ms));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
