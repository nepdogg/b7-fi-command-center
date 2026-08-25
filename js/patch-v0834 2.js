/* B7 FI Command Center v0.80.34 — conditional Customer Source / STR mini progress bars on shared live tool cards. */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'0.80.34';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function stamp(){
  window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function normRequired(v){const s=String(v??'TBD').trim().toLowerCase();if(s==='yes'||s==='required')return'yes';if(s==='no'||s==='not required'||s==='n/a'||s==='na')return'no';return'tbd'}
function sourcePct(status){
  const s=String(status||'Not Started').trim().toLowerCase();
  const map={
    'not started':0,'preparing':15,'pre-source in progress':35,'ready for ca':55,
    'with ca team':72,'source complete':90,'returned to fi':100,'complete':100,'completed':100
  };return map[s]??0;
}
function strPct(status){
  const s=String(status||'Not Started').trim().toLowerCase();
  const map={
    'not started':0,'requirements pending':10,'requirements received':25,'testing':55,
    'submitted to ca':75,'customer approval pending':90,'complete':100,'completed':100
  };return map[s]??0;
}
function displayState(required,status){
  const req=normRequired(required);
  if(req==='no')return{req,state:'NOT REQUIRED',pct:null,active:false};
  if(req==='tbd')return{req,state:'TBD',pct:null,active:false};
  const st=String(status||'Not Started').trim()||'Not Started';
  return{req,state:st.toUpperCase(),pct:0,active:true};
}
function miniRow(label,required,status,pctFn,tone){
  const d=displayState(required,status);if(d.active)d.pct=pctFn(status);
  return `<div class="v834-mini-req ${tone} ${d.active?'active':'inactive'}"><div class="v834-mini-req-head"><span>${esc(label)}</span><b>${esc(d.state)}${d.active?` · ${Math.round(d.pct)}%`:''}</b></div>${d.active?`<div class="v834-mini-req-track"><i style="width:${Math.max(0,Math.min(100,d.pct))}%"></i></div>`:''}</div>`;
}
function renderRequirements(t){
  return `<div class="v834-mini-requirements" aria-label="Conditional special requirements">${miniRow('CUSTOMER SOURCE',t?.sourceRequired,t?.sourceStatus,sourcePct,'source')}${miniRow('STR',t?.strRequired,t?.strStatus,strPct,'str')}</div>`;
}
function applyTool(t){
  const host=$('#v802ToolHost');if(!host||!t)return;
  const identity=$('.v805-tool-identity',host);if(!identity)return;
  $$('.v834-mini-requirements',host).forEach(x=>x.remove());
  const old=$('.v807-requirements',host);if(old)old.remove();
  identity.insertAdjacentHTML('beforeend',renderRequirements(t));
}
function currentTool(){try{return window.B7LiveStatusCore?.currentTool?.()||null}catch(e){return null}}
function apply(){stamp();const t=currentTool();if(t)applyTool(t)}
document.addEventListener('b7fi:live-tool-change',e=>{const t=e.detail?.tool||currentTool();requestAnimationFrame(()=>{stamp();if(t)applyTool(t)})});
const prior=window.setView;if(typeof prior==='function')window.setView=function(){const r=prior.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,100);return r};
function startup(){stamp();setTimeout(apply,80);setTimeout(apply,320)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
