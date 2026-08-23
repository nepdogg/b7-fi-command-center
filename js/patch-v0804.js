/* B7 FI Command Center v0.80.5 — active-quarter identity + Live Status spacing polish. */
(function(){
'use strict';
window.VERSION='0.80.5';
const $=(s,r=document)=>r.querySelector(s);
const QUARTER_CENTERS={toolcenter:'TOOL CENTER',shipping:'SHIPPING CENTER',priorities:'PRIORITY CENTER',statuscenter:'STATUS CENTER'};
function currentQuarter(){
  /* One shared quarter identity. Prefer an explicit app setting when one is added,
     otherwise infer the dominant/current tool quarter and finally fall back to CY26Q3. */
  if(window.B7_ACTIVE_QUARTER)return String(window.B7_ACTIVE_QUARTER);
  try{
    if(window.state&&state.config&&state.config.activeQuarter)return String(state.config.activeQuarter);
  }catch(e){}
  try{
    const list=(typeof tools!=='undefined'&&Array.isArray(tools))?tools:[];
    const counts={};
    list.forEach(t=>{const q=String(t.quarter||'').trim();if(/^CY\d{2}Q[1-4]$/i.test(q)&&!/^archive$/i.test(String(t.quarterStatus||t.status||'')))counts[q]=(counts[q]||0)+1});
    const best=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];if(best)return best[0];
  }catch(e){}
  return 'CY26Q3';
}
window.getB7ActiveQuarter=currentQuarter;
function viewName(){
 const b=document.body;
 const raw=(b.dataset.center||b.dataset.theme||'').toLowerCase();
 const map={tool:'toolcenter',shipping:'shipping',priority:'priorities',priorities:'priorities',status:'statuscenter'};
 return map[raw]||raw;
}
function decorateQuarterTitle(v){
 const title=$('#headerPageTitle');if(!title)return;
 const key=QUARTER_CENTERS[v]?v:viewName();
 if(QUARTER_CENTERS[key])title.textContent=`${QUARTER_CENTERS[key]} — ${currentQuarter()}`;
}
function version(){const l=$('#appVersionLabel');if(l)l.textContent='B7 FI COMMAND CENTER V0.80.5';document.title='B7 FI Command Center v0.80.5'}
/* Wrap the newest setView last so quarter-aware titles survive older theme renderers. */
const previousSetView=window.setView;
window.setView=function(v){
 const r=previousSetView?previousSetView(v):undefined;
 if(v!=='livestatus'&&v!=='live-status')requestAnimationFrame(()=>{decorateQuarterTitle(v);version()});
 return r;
};
/* Live Status is rendered by v0.80.3. Inject the quarter into its top rail after render. */
document.addEventListener('click',()=>{requestAnimationFrame(()=>{
 if(!document.body.classList.contains('v802-live-status'))return;
 const top=$('.v803-live-shell .v802-live-top');if(!top)return;
 let q=$('#v804LiveQuarter');if(!q){q=document.createElement('div');q.id='v804LiveQuarter';q.className='v804-live-quarter';top.prepend(q)}q.textContent=currentQuarter();
})},true);
/* Also cover programmatic Live Status entry. */
const liveObserver=new MutationObserver(()=>{
 if(!document.body.classList.contains('v802-live-status'))return;
 const top=$('.v803-live-shell .v802-live-top');if(!top)return;
 let q=$('#v804LiveQuarter');if(!q){q=document.createElement('div');q.id='v804LiveQuarter';q.className='v804-live-quarter';top.prepend(q)}q.textContent=currentQuarter();
 liveObserver.disconnect();
});
function armLiveObserver(){try{liveObserver.observe(document.body,{childList:true,subtree:true})}catch(e){}}
const wrapped=window.setView;
window.setView=function(v){if(v==='livestatus'||v==='live-status')armLiveObserver();return wrapped(v)};
function startup(){version();decorateQuarterTitle(viewName())}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
