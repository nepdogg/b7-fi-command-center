/* B7 FI Command Center v0.80.33 — quarter-aware Operations + compact Live Status parity. */
(function(){
'use strict';
const VERSION='0.80.27',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
function quarter(){try{if(typeof window.B7ActiveQuarter==='function')return window.B7ActiveQuarter()}catch(e){} const d=new Date(),q=Math.floor(d.getMonth()/3)+1;return `CY${String(d.getFullYear()).slice(-2)}Q${q}`}
function setVersion(){window.VERSION=VERSION;document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function counts(){let list=[];try{list=window.B7LiveStatusCore?.activeTools?.()||[]}catch(e){};let c={infi:0,packing:0,waiting:0,shipped:0};try{c=window.B7LiveStatusCore?.metricCounts?.(list)||c}catch(e){};return {list,c,pct:list.length?Math.round((Number(c.shipped)||0)/list.length*100):0}}
function progress(){const {pct}=counts();return `<div class="v827-quarter-progress"><div><span>Current Quarter Shipping Progress</span><b>${pct}% Shipped</b></div><div class="v827-progress-track"><i style="width:${pct}%"></i></div></div>`}
function tuneMetrics(root=document){const metrics=$$('.v802-live-metrics .v802-live-metric',root);if(metrics[0]){const s=metrics[0].querySelector('span');if(s)s.textContent=`${quarter()} TOOLS`} const grid=root.querySelector?.('.v802-live-metrics');if(grid&&!grid.nextElementSibling?.classList?.contains('v827-quarter-progress'))grid.insertAdjacentHTML('afterend',progress())}
function tuneTool(root=document){$$('.v802-tool-kicker',root).forEach(x=>x.remove())}
function tuneControl(root=document){const foot=root.querySelector?.('.v802-carousel-foot');if(!foot||foot.querySelector('.v827-control-brand'))return;const controls=foot.querySelector('.v802-carousel-controls');if(controls){const brand=document.createElement('img');brand.className='v827-control-brand';brand.src='assets/kla-plus-official.png';brand.alt='KLA+';controls.before(brand)}}
function tuneLive(){if(!document.body.classList.contains('v802-live-status'))return;const shell=$('.v803-live-shell');if(!shell)return;$('.v802-live-top',shell)?.remove();tuneMetrics(shell);tuneTool(shell);tuneControl(shell)}
function tuneOperations(){if(document.body.dataset.center!=='home')return;const title=$('#headerPageTitle');if(title)title.textContent=`OPERATIONS CENTER — ${quarter()}`;const root=$('.v825-operations-live');if(!root)return;tuneMetrics(root);tuneTool(root)}
function apply(){setVersion();tuneLive();tuneOperations()}
const prev=window.setView;if(typeof prev==='function')window.setView=function(){const r=prev.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,100);return r};
document.addEventListener('b7fi:live-tool-change',()=>{setTimeout(()=>{tuneTool();tuneControl();},0)});
function startup(){setVersion();setTimeout(apply,120);setTimeout(apply,500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
