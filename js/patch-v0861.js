/* B7 FI Command Center v0.80.62 — Operations responsiveness hotfix.
   Fixes v0.80.61 render loop while retaining Operations family summaries,
   lifecycle colors and automatic product photos.
   Lead Alerts/System Status logic is intentionally untouched.
*/
(function(){'use strict';
const VERSION='0.80.62';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
const PHOTO={zephyr:'assets/tool-zephyr.png',regera:'assets/tool-regera-celestiq.png',celestiq:'assets/tool-regera-celestiq.png',macan:'assets/tool-29xx-family.png',boxster:'assets/tool-29xx-family.png',panamera:'assets/tool-29xx-family.png',vanquish:'assets/tool-29xx-family.png',targa:'assets/tool-29xx-family.png',taycan:'assets/tool-29xx-family.png'};
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function toolsList(){try{return Array.isArray(window.tools)?window.tools:[]}catch(e){return[]}}
function activeTools(){try{const x=window.B7LiveStatusCore?.activeTools?.();if(Array.isArray(x))return x}catch(e){}return toolsList().filter(t=>!/^archive$/i.test(String(t.quarterStatus||t.status||'')))}
function currentTool(){try{return window.B7LiveStatusCore?.currentTool?.()||null}catch(e){return null}}
function family(t){return String(t?.codename||t?.codeName||t?.toolType||t?.type||t?.model||'Other').trim()||'Other'}
function familyKey(t){const s=family(t).toLowerCase();for(const k of Object.keys(PHOTO))if(s.includes(k))return k;return ''}
function photoFor(t){return PHOTO[familyKey(t)]||''}
function state(t){const s=String(t?.quarterStatus||t?.status||'').toLowerCase();if(s.includes('ship'))return'shipped';if(s.includes('pack'))return'packing';if(s.includes('waiting'))return'waiting';if(s.includes('in fi')||s==='fi')return'infi';return'other'}
function counts(list){const c={total:list.length,waiting:0,infi:0,packing:0,shipped:0};list.forEach(t=>{const k=state(t);if(k in c)c[k]++});return c}
function familyOrder(name){const order=['Zephyr','Regera','Celestiq','Targa','Panamera','Boxster','Macan','Vanquish','Taycan'];const i=order.findIndex(x=>x.toLowerCase()===String(name).toLowerCase());return i<0?99:i}
function groups(){const g={};activeTools().forEach(t=>{const f=family(t);(g[f]??=[]).push(t)});return Object.entries(g).sort((a,b)=>familyOrder(a[0])-familyOrder(b[0])||a[0].localeCompare(b[0]))}
function card(label,value,kind){return `<div class="v861-family-kpi v861-kpi-${kind}"><span>${esc(label)}</span><b>${value}</b></div>`}
function familyMarkup(){const list=activeTools(), entries=groups();return `<section class="v861-family-section" aria-label="Tool family live countdown"><div class="v861-family-header"><strong>TOOL FAMILY LIVE STATUS</strong><span>${list.length} CURRENT TOOLS</span></div><div class="v861-family-list">${entries.map(([name,items])=>{const c=counts(items);return `<article class="v861-family-row"><h3>${esc(name)}</h3><div class="v861-family-kpis">${card('TOTAL',c.total,'total')}${card('WAITING FI',c.waiting,'waiting')}${card('IN FI',c.infi,'infi')}${card('PACKING',c.packing,'packing')}${card('SHIPPED',c.shipped,'shipped')}</div></article>`}).join('')||'<div class="v861-family-empty">No active tools for this quarter.</div>'}</div></section>`}
function operationsRoot(){return $('.v825-operations-live')||$('.v803-live-shell')||$('.v802-live')}
function onOperations(){return document.body.classList.contains('v825-operations-dashboard')||document.body.classList.contains('v802-live-status')||document.body.dataset.center==='home'}
function installFamilySection(){if(!onOperations())return;const root=operationsRoot();if(!root)return;const old=$('.v861-family-section',root);const html=familyMarkup();if(old){if(old.dataset.snapshot===html)return;const wrap=document.createElement('div');wrap.innerHTML=html;const n=wrap.firstElementChild;n.dataset.snapshot=html;old.replaceWith(n)}else{const carousel=$('.v802-carousel',root);if(carousel){carousel.insertAdjacentHTML('beforebegin',html);const n=$('.v861-family-section',root);if(n)n.dataset.snapshot=html}}}
function colorSummaryBoxes(){if(!onOperations())return;const roots=$$('.v825-operations-live .v802-live-metrics,.v825-operations-live .v849-summary,.v825-operations-live .v845-summary-grid,.v803-live-shell .v802-live-metrics,.v802-live>.v802-live-metrics');roots.forEach(root=>Array.from(root.children).forEach(el=>{const label=String(el.querySelector('span')?.textContent||'').trim().toUpperCase();let k='neutral';if(/TOOLS|ACTIVE/.test(label)&&!/PLANNED/.test(label))k='total';if(/WAITING/.test(label))k='waiting';if(/^IN FI$/.test(label))k='infi';if(/PACKING/.test(label))k='packing';if(/SHIPPED/.test(label))k='shipped';const cls='v861-kpi-'+k;if(!el.classList.contains(cls)){el.classList.remove('v861-kpi-total','v861-kpi-waiting','v861-kpi-infi','v861-kpi-packing','v861-kpi-shipped','v861-kpi-neutral');el.classList.add(cls)}}))}
function installPhoto(tArg){if(!onOperations())return;const t=tArg||currentTool();if(!t)return;$$('.v802-tool-visual').forEach(v=>{const src=photoFor(t);if(!src)return;let img=$('img',v);if(!img){img=document.createElement('img');v.prepend(img)}if(img.getAttribute('src')!==src){img.src=src;img.alt=`${family(t)} product`;img.onerror=()=>{img.onerror=null;img.removeAttribute('src');v.classList.add('v830-photo-fallback')}}v.classList.remove('v830-photo-fallback');$('.v830-tool-photo-placeholder',v)?.remove()})}
function addAliasToCard(tArg){if(!onOperations())return;const t=tArg||currentTool();const body=$('.v802-tool-body');if(!body)return;$('.v861-alias',body)?.remove();if(!t?.alias)return;const h=$('h2',body);if(h)h.insertAdjacentHTML('afterend',`<div class="v861-alias">ALIAS · ${esc(t.alias)}</div>`)}
function stamp(){document.title=document.body?.dataset?.liveViewerOnly==='true'?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const x=$('#appVersionLabel');if(x)x.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
let refreshTimer=0;
function refresh(t){clearTimeout(refreshTimer);refreshTimer=setTimeout(()=>{stamp();if(!onOperations())return;installFamilySection();colorSummaryBoxes();installPhoto(t);addAliasToCard(t)},30)}
const priorSetView=window.setView;if(typeof priorSetView==='function'){window.setView=function(){const r=priorSetView.apply(this,arguments);refresh();setTimeout(refresh,180);return r};try{setView=window.setView}catch(e){}}
document.addEventListener('b7fi:live-tool-change',e=>refresh(e.detail?.tool));
document.addEventListener('b7fi:tool-records-updated',()=>refresh());
function boot(){stamp();refresh();setTimeout(refresh,350);setTimeout(refresh,900)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
