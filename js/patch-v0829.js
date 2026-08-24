/* B7 FI Command Center v0.80.29 — Operations / Live Status final cleanup.
   - Exactly one Current Quarter Shipping Progress rail in each live view.
   - Standalone viewer removes redundant large KLA tool-card artwork.
   - Standalone bottom rail: KLA+ mathematically centered; carousel controls anchored right.
   - Preserve deterministic Operations toolbar and compact one-screen viewer behavior.
*/
(function(){
'use strict';
const VERSION='0.80.29',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
function quarter(){try{if(typeof window.B7ActiveQuarter==='function')return window.B7ActiveQuarter()}catch(e){}const d=new Date(),q=Math.floor(d.getMonth()/3)+1;return `CY${String(d.getFullYear()).slice(-2)}Q${q}`}
function counts(){let list=[];try{list=window.B7LiveStatusCore?.activeTools?.()||[]}catch(e){}let c={infi:0,packing:0,waiting:0,shipped:0};try{c=window.B7LiveStatusCore?.metricCounts?.(list)||c}catch(e){}return {list,c,pct:list.length?Math.round((Number(c.shipped)||0)/list.length*100):0}}
function progressMarkup(){const {pct}=counts();return `<div class="v829-quarter-progress"><div class="v829-quarter-progress-head"><span>Current Quarter Shipping Progress</span><b>${pct}% Shipped</b></div><div class="v829-progress-track"><i style="width:${pct}%"></i></div></div>`}
function setVersion(){window.VERSION=VERSION;document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function normalizeLiveSummary(root){if(!root)return;const metrics=$$('.v802-live-metrics .v802-live-metric',root);if(metrics[0]){const label=$('span',metrics[0]);if(label)label.textContent=`${quarter()} TOOLS`}
  // Remove every progress rail injected by the prior parity/finalization patches, then add exactly one.
  $$('.v827-quarter-progress,.v828-quarter-progress,.v829-quarter-progress',root).forEach(n=>n.remove());
  const grid=$('.v802-live-metrics',root);if(grid)grid.insertAdjacentHTML('afterend',progressMarkup());
}
function removeKicker(root){$$('.v802-tool-kicker',root||document).forEach(n=>n.remove())}
function ensureStandaloneBrand(root){if(!document.body.classList.contains('v802-live-status'))return;const foot=$('.v802-carousel-foot',root||document);if(!foot)return;$$('.v827-control-brand,.v828-control-brand,.v829-control-brand',foot).forEach(n=>n.remove());const brand=document.createElement('img');brand.className='v829-control-brand';brand.src='assets/kla-plus-official.png';brand.alt='KLA+';foot.appendChild(brand)}
function finalizeStandalone(){if(!document.body.classList.contains('v802-live-status'))return;const shell=$('.v803-live-shell');if(!shell)return;$('.v802-live-top',shell)?.remove();normalizeLiveSummary(shell);removeKicker(shell);ensureStandaloneBrand(shell);document.body.classList.add('v829-live-final')}
function lockOpsToolbar(){if(document.body.dataset.center!=='home')return;const bar=$('#floatingActions');if(!bar)return;bar.classList.add('v828-ops-toolbar-lock','v829-ops-toolbar-lock');const open=$('#v826OpenCurrentTool'),shot=$('#v825Screenshot'),report=$('#v825Report');if(open){open.style.gridColumn='1';open.style.justifySelf='start'}if(shot){shot.style.gridColumn='2';shot.style.justifySelf='end'}if(report){report.style.gridColumn='3';report.style.justifySelf='end'}}
function finalizeOperations(){if(document.body.dataset.center!=='home')return;const title=$('#headerPageTitle');if(title)title.textContent=`OPERATIONS CENTER — ${quarter()}`;const root=$('.v825-operations-live');if(!root)return;normalizeLiveSummary(root);removeKicker(root);lockOpsToolbar();document.body.classList.add('v828-operations-final','v829-operations-final')}
function apply(){setVersion();finalizeStandalone();finalizeOperations()}
const prior=window.setView;if(typeof prior==='function')window.setView=function(){const r=prior.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,120);return r};
document.addEventListener('b7fi:live-tool-change',()=>setTimeout(()=>{if(document.body.dataset.center==='home')lockOpsToolbar();if(document.body.classList.contains('v802-live-status')){removeKicker();ensureStandaloneBrand(document)}},0));
function startup(){setVersion();setTimeout(apply,60);setTimeout(apply,280);setTimeout(apply,700)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
