/* B7 FI Command Center v0.80.48 — Tool Center finalization / actionable alerts.
   - Restores the shared compact 8-box quarter summary on Tool Center + Live Status.
   - Structurally enforces Tool Center page-navigation left / page-actions right.
   - Makes Lead Alerts and System Status messages clickable in the editable Command Center.
   - Lead alerts route through their source target; System Status opens the affected Tool.
   - Standalone Live Status remains read-only/non-navigating.
*/
(function(){'use strict';
const VERSION='0.80.48',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function stamp(){document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function toolContext(){const h=String($('#headerPageTitle')?.textContent||'').toUpperCase();return document.body?.dataset?.center==='toolfinal'||document.body?.dataset?.theme==='toolcenter'||/TOOL CENTER|TOOL ARCHIVE|^TOOL\s+\d+/.test(h)}
const leftRx=/^(CY\d{2}Q[1-4]\s+TOOLS|TOOL COUNTDOWN|TOOL ARCHIVE|←\s*BACK\b|BACK TO\b)/i;
function normalizeToolToolbar(){
  if(!toolContext())return;const bar=$('#floatingActions');if(!bar)return;
  bar.classList.add('v847-tool-toolbar');
  let left=bar.querySelector('.v847-toolbar-left,.v846-nav-left,.v837-toolbar-left');
  let right=bar.querySelector('.v847-toolbar-right,.v846-actions-right,.v837-toolbar-right');
  if(!left){left=document.createElement('div');left.className='v847-toolbar-left';bar.prepend(left)}else left.classList.add('v847-toolbar-left');
  if(!right){right=document.createElement('div');right.className='v847-toolbar-right';bar.append(right)}else right.classList.add('v847-toolbar-right');
  const buttons=$$('button',bar);
  buttons.forEach(b=>{const text=String(b.textContent||'').trim();const target=leftRx.test(text)?left:right;if(b.parentElement!==target)target.appendChild(b)});
  if(left.parentElement!==bar)bar.prepend(left);if(right.parentElement!==bar)bar.append(right);
  if(left.nextElementSibling!==right){bar.appendChild(right)}
}
function norm(s){return String(s||'').replace(/\s+/g,' ').trim().toUpperCase()}
function engine(){return window.B7StatusEngine820||window.B7AlertEngine817||null}
function findDisplayed(queue,text){const d=norm(text);return (queue||[]).find(a=>{const t=norm(a?.text);return t&&(d===t||d.startsWith(t)||d.includes(t))})||null}
function goLead(el){
  const e=engine(),q=typeof e?.leadQueue==='function'?e.leadQueue():[];const a=findDisplayed(q,el.textContent);if(!a){if(typeof window.setView==='function')window.setView('actions');return}
  if(typeof window.actionTarget==='function'){window.actionTarget(a);return}
  if(a.toolId&&typeof window.toolStatus==='function'){window.toolStatus(a.toolId);return}
  if(a.view&&typeof window.setView==='function')window.setView(a.view);else if(typeof window.setView==='function')window.setView('actions');
}
function goSystem(el){
  const e=engine(),q=typeof e?.systemQueue==='function'?e.systemQueue():[];const a=findDisplayed(q,el.textContent);if(a?.toolId&&typeof window.toolStatus==='function'){window.toolStatus(a.toolId);return}
  const m=String(el.textContent||'').match(/TOOL\s+(\d+)/i);if(m&&typeof window.toolStatus==='function'){window.toolStatus(m[1]);return}
  if(typeof window.setView==='function')window.setView('toolcenter');
}
function decorateAlerts(){
  if(viewerOnly())return;
  const lead=$('#b7LeadAlertsBar .b7s-message,#topActionBar .v817-status-message');
  const sys=$('#b7SystemStatusBar .b7s-message,#operationsBar .v817-status-message');
  [[lead,'Open the source of this lead alert'],[sys,'Open the affected tool']].forEach(([el,title])=>{if(!el)return;el.setAttribute('role','button');el.setAttribute('tabindex','0');el.setAttribute('title',title);el.setAttribute('aria-label',`${title}: ${String(el.textContent||'').trim()}`)})
}
function activateAlert(el){if(viewerOnly())return;const bar=el.closest('#b7LeadAlertsBar,#topActionBar,#b7SystemStatusBar,#operationsBar');if(!bar)return;if(bar.id==='b7LeadAlertsBar'||bar.id==='topActionBar')goLead(el);else goSystem(el)}
document.addEventListener('click',ev=>{const el=ev.target.closest('.b7s-message,.v817-status-message');if(!el||viewerOnly())return;ev.preventDefault();ev.stopPropagation();activateAlert(el)},true);
document.addEventListener('keydown',ev=>{if(ev.key!=='Enter'&&ev.key!==' ')return;const el=ev.target.closest('.b7s-message,.v817-status-message');if(!el||viewerOnly())return;ev.preventDefault();activateAlert(el)},true);
function refresh(){stamp();normalizeToolToolbar();decorateAlerts()}
const priorSetView=window.setView;if(typeof priorSetView==='function'){window.setView=function(){const r=priorSetView.apply(this,arguments);[0,40,120,260].forEach(ms=>setTimeout(refresh,ms));return r};try{setView=window.setView}catch(e){}}
const priorToolStatus=window.toolStatus;if(typeof priorToolStatus==='function'){window.toolStatus=function(){const r=priorToolStatus.apply(this,arguments);[0,40,120].forEach(ms=>setTimeout(refresh,ms));return r};try{toolStatus=window.toolStatus}catch(e){}}
const priorToolAdmin=window.toolAdmin;if(typeof priorToolAdmin==='function'){window.toolAdmin=function(){const r=priorToolAdmin.apply(this,arguments);[0,40,120].forEach(ms=>setTimeout(refresh,ms));return r};try{toolAdmin=window.toolAdmin}catch(e){}}
function boot(){[0,100,300,700].forEach(ms=>setTimeout(refresh,ms))}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
