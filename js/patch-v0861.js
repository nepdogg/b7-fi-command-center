/* B7 FI Command Center v0.80.61 — Operations Center completion.
   - Adds live tool-family countdown summaries to Operations/Live Status.
   - Color-codes quarter/family lifecycle boxes consistently.
   - Adds automatic product photos to live carousel cards.
   - Leaves Lead Alerts/System Status logic and markup untouched.
*/
(function(){'use strict';
const VERSION='0.80.61';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
const PHOTO={zephyr:'assets/tool-zephyr.png',regera:'assets/tool-regera-celestiq.png',celestiq:'assets/tool-regera-celestiq.png',macan:'assets/tool-29xx-family.png',boxster:'assets/tool-29xx-family.png',panamera:'assets/tool-29xx-family.png',vanquish:'assets/tool-29xx-family.png',targa:'assets/tool-29xx-family.png',taycan:'assets/tool-29xx-family.png'};
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function toolsList(){try{return Array.isArray(window.tools)?window.tools:(Array.isArray(tools)?tools:[])}catch(e){return[]}}
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
function familyMarkup(){const entries=groups();return `<section class="v861-family-section" aria-label="Tool family live countdown"><div class="v861-family-header"><strong>TOOL FAMILY LIVE STATUS</strong><span>${activeTools().length} CURRENT TOOLS</span></div><div class="v861-family-list">${entries.map(([name,list])=>{const c=counts(list);return `<article class="v861-family-row"><h3>${esc(name)}</h3><div class="v861-family-kpis">${card('TOTAL',c.total,'total')}${card('WAITING FI',c.waiting,'waiting')}${card('IN FI',c.infi,'infi')}${card('PACKING',c.packing,'packing')}${card('SHIPPED',c.shipped,'shipped')}</div></article>`}).join('')||'<div class="v861-family-empty">No active tools for this quarter.</div>'}</div></section>`}
function installFamilySection(){const root=$('.v825-operations-live')||$('.v803-live-shell')||$('.v802-live');if(!root)return;let section=$('.v861-family-section',root);if(section)section.outerHTML=familyMarkup();else{const carousel=$('.v802-carousel',root);if(carousel)carousel.insertAdjacentHTML('beforebegin',familyMarkup())}}
function colorSummaryBoxes(){
  const roots=$$('.v825-operations-live .v802-live-metrics,.v825-operations-live .v849-summary,.v825-operations-live .v845-summary-grid,.v803-live-shell .v802-live-metrics,.v802-live>.v802-live-metrics');
  roots.forEach(root=>{Array.from(root.children).forEach(el=>{const label=String(el.querySelector('span')?.textContent||'').trim().toUpperCase();el.classList.remove('v861-kpi-total','v861-kpi-waiting','v861-kpi-infi','v861-kpi-packing','v861-kpi-shipped','v861-kpi-neutral');let k='neutral';if(/TOOLS|ACTIVE/.test(label)&&!/PLANNED/.test(label))k='total';if(/WAITING/.test(label))k='waiting';if(/^IN FI$/.test(label))k='infi';if(/PACKING/.test(label))k='packing';if(/SHIPPED/.test(label))k='shipped';el.classList.add('v861-kpi-'+k)})});
}
function installPhoto(){const t=currentTool();if(!t)return;$$('.v802-tool-visual').forEach(v=>{let img=$('img',v);const src=photoFor(t);if(!src)return;if(!img){img=document.createElement('img');v.prepend(img)}if(!String(img.getAttribute('src')||'').includes(src)){img.src=src;img.alt=`${family(t)} product`;img.onerror=()=>{img.onerror=null;img.removeAttribute('src');v.classList.add('v830-photo-fallback')}}v.classList.remove('v830-photo-fallback');$('.v830-tool-photo-placeholder',v)?.remove()});
}
function addAliasToCard(){const t=currentTool();if(!t||!t.alias)return;const body=$('.v802-tool-body');if(!body||$('.v861-alias',body))return;const h=$('h2',body);if(h)h.insertAdjacentHTML('afterend',`<div class="v861-alias">ALIAS · ${esc(t.alias)}</div>`)}
function refresh(){installFamilySection();colorSummaryBoxes();installPhoto();addAliasToCard();stamp()}
function stamp(){document.title=document.body?.dataset?.liveViewerOnly==='true'?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const x=$('#appVersionLabel');if(x)x.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
const priorSetView=window.setView;if(typeof priorSetView==='function'){window.setView=function(){const r=priorSetView.apply(this,arguments);[0,60,180,500].forEach(ms=>setTimeout(refresh,ms));return r};try{setView=window.setView}catch(e){}}
document.addEventListener('b7fi:live-tool-change',()=>{setTimeout(refresh,0);setTimeout(refresh,80)});
document.addEventListener('b7fi:tool-records-updated',()=>{setTimeout(refresh,40);setTimeout(refresh,180)});
const obs=new MutationObserver(()=>{if(document.body.classList.contains('v825-operations-dashboard')||document.body.classList.contains('v802-live-status'))queueMicrotask(refresh)});
function boot(){stamp();const app=$('#app');if(app)obs.observe(app,{childList:true,subtree:true});[80,260,800].forEach(ms=>setTimeout(refresh,ms))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
