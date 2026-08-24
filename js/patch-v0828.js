/* B7 FI Command Center v0.80.28 — finalize Operations + standalone Live Status parity.
   - Standalone viewer receives the compact quarter/progress/control-rail design.
   - Operations toolbar positions are deterministic after refresh/render.
   - Operations carousel removes redundant KLA system image; footer/header already brand the Command Center.
   - Dedicated Live Status retains one KLA+ mark in the control rail only.
*/
(function(){
'use strict';
const VERSION='0.80.28',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
function quarter(){try{if(typeof window.B7ActiveQuarter==='function')return window.B7ActiveQuarter()}catch(e){}const d=new Date(),q=Math.floor(d.getMonth()/3)+1;return `CY${String(d.getFullYear()).slice(-2)}Q${q}`}
function setVersion(){window.VERSION=VERSION;document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function dataCounts(){let list=[];try{list=window.B7LiveStatusCore?.activeTools?.()||[]}catch(e){}let c={infi:0,packing:0,waiting:0,shipped:0};try{c=window.B7LiveStatusCore?.metricCounts?.(list)||c}catch(e){};const pct=list.length?Math.round((Number(c.shipped)||0)/list.length*100):0;return {list,c,pct}}
function progressMarkup(){const {pct}=dataCounts();return `<div class="v828-quarter-progress"><div class="v828-quarter-progress-head"><span>Current Quarter Shipping Progress</span><b>${pct}% Shipped</b></div><div class="v828-progress-track"><i style="width:${pct}%"></i></div></div>`}
function normalizeMetrics(root){const metrics=$$('.v802-live-metrics .v802-live-metric',root);if(metrics[0]){const label=metrics[0].querySelector('span');if(label)label.textContent=`${quarter()} TOOLS`}const grid=$('.v802-live-metrics',root);if(grid){const old=grid.nextElementSibling;if(old?.classList?.contains('v827-quarter-progress')||old?.classList?.contains('v828-quarter-progress'))old.remove();grid.insertAdjacentHTML('afterend',progressMarkup())}}
function removeKicker(root){$$('.v802-tool-kicker',root).forEach(n=>n.remove())}
function ensureViewerControlBrand(root){if(!viewerOnly()&&!document.body.classList.contains('v802-live-status'))return;const foot=$('.v802-carousel-foot',root);if(!foot)return;$$('.v827-control-brand,.v828-control-brand',foot).forEach(n=>n.remove());const controls=$('.v802-carousel-controls',foot);if(!controls)return;const img=document.createElement('img');img.className='v828-control-brand';img.src='assets/kla-plus-official.png';img.alt='KLA+';controls.before(img)}
function compactStandalone(){if(!document.body.classList.contains('v802-live-status'))return;const shell=$('.v803-live-shell');if(!shell)return;$('.v802-live-top',shell)?.remove();normalizeMetrics(shell);removeKicker(shell);ensureViewerControlBrand(shell)}
function lockOperationsToolbar(){if(document.body.dataset.center!=='home')return;const bar=$('#floatingActions');if(!bar)return;bar.classList.add('v828-ops-toolbar-lock');const open=$('#v826OpenCurrentTool');const shot=$('#v825Screenshot');const report=$('#v825Report');if(open){open.style.gridColumn='1';open.style.justifySelf='start'}if(shot){shot.style.gridColumn='2';shot.style.justifySelf='end'}if(report){report.style.gridColumn='3';report.style.justifySelf='end'}}
function finalizeOperations(){if(document.body.dataset.center!=='home')return;const title=$('#headerPageTitle');if(title)title.textContent=`OPERATIONS CENTER — ${quarter()}`;const root=$('.v825-operations-live');if(!root)return;normalizeMetrics(root);removeKicker(root);lockOperationsToolbar();document.body.classList.add('v828-operations-final')}
function apply(){setVersion();compactStandalone();finalizeOperations()}
const prior=window.setView;if(typeof prior==='function')window.setView=function(){const r=prior.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,120);return r};
document.addEventListener('b7fi:live-tool-change',()=>{setTimeout(()=>{if(document.body.dataset.center==='home')lockOperationsToolbar();if(document.body.classList.contains('v802-live-status')){removeKicker();ensureViewerControlBrand(document)}},0)});
function startup(){setVersion();setTimeout(apply,80);setTimeout(apply,350);setTimeout(apply,900)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
