/* B7 FI Command Center v0.80.49 — shared summary polish + canonical tool identity.
   - Tool Center and Live Status use the same compact 8-box summary presentation.
   - Summary labels and values are centered; values are larger for faster scanning.
   - Full Live Status/Operations cards use UTID -> Code Name -> Model identity.
   - Code Name is added to the structured field boxes without removing any existing field.
   - Tool Center Mini Cards use the same UTID -> Code Name -> Model identity and add Code Name to their field grid.
   - Presentation-only patch: does not alter master tool data or working alert navigation.
*/
(function(){'use strict';
const VERSION='0.80.49',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function stamp(){document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function allTools(){try{return Array.isArray(tools)?tools:[]}catch(e){return[]}}
function byId(id){return allTools().find(t=>String(t.id||t.utid)===String(id))}
function safe(v,f='—'){return v===undefined||v===null||String(v).trim()===''?f:String(v)}
function fmtD(v){try{return typeof fmt==='function'?fmt(v):safe(v)}catch(e){return safe(v)}}
function modelOf(t){return safe(t?.model||t?.toolType||t?.type)}
function codeOf(t){return safe(t?.codename||t?.codeName||t?.toolCode||t?.productCode,'—')}
function fieldPairs(t){return [
  ['UTID',t?.utid||t?.id],
  ['MODEL',modelOf(t)],
  ['CODE NAME',codeOf(t)],
  ['CUSTOMER',t?.customer],
  ['SALES ORDER',t?.salesOrder||t?.so],
  ['CURRENT CHECKLIST',t?.currentChecklist||t?.checklist],
  ['SHIP DATE',t?.shipDate||t?.ship],
  ['DRIVER',t?.driver||t?.assignedDriver],
  ['CLEANROOM',t?.cleanroom||t?.room||t?.location],
  ['PHASE',t?.quarterStatus||t?.status]
]}
function enhanceSummary(){
  $$('.v845-summary-grid,.v845-live-summary,.v837-summary-grid.v844-summary-grid').forEach(g=>g.classList.add('v849-summary'));
}
function enhanceFullCard(t){
  const host=$('#v802ToolHost');if(!host||!t)return;
  const identity=$('.v805-tool-identity',host);
  if(identity){
    const kicker=$('.v802-tool-kicker',identity);if(kicker)kicker.style.display='none';
    const h=$('h2',identity);if(h)h.textContent=safe(t.utid||t.id,'SYSTEM');
    let sub=$('.v802-tool-sub',identity);
    if(sub){sub.innerHTML=`<span class="v849-code-name">${esc(codeOf(t))}</span><span class="v849-model-name">${esc(modelOf(t))}</span>`;}
  }
  const grid=$('.v802-tool-grid',host);
  if(grid){
    grid.classList.add('v849-full-fields');
    grid.innerHTML=fieldPairs(t).map(([k,v])=>`<div class="v802-tool-field"><span>${esc(k)}</span><b>${esc(k==='SHIP DATE'?fmtD(v):safe(v))}</b></div>`).join('');
  }
}
function miniId(card){return card.closest('[data-v837-tool]')?.dataset.v837Tool||card.dataset.v837Tool||''}
function enhanceMiniCard(card,t){
  if(!card||!t)return;
  const head=$('.v842-head',card);if(head){
    const left=head.firstElementChild;
    if(left){
      let ident=$('.v849-mini-identity',left);
      if(!ident){ident=document.createElement('div');ident.className='v849-mini-identity';left.appendChild(ident)}
      ident.innerHTML=`<span class="v849-mini-code">${esc(codeOf(t))}</span><span class="v849-mini-model">${esc(modelOf(t))}</span>`;
    }
  }
  const fields=$('.v842-fields',card);if(fields){
    const current=[
      ['CODE NAME',codeOf(t)],
      ['MODEL',modelOf(t)],
      ['CUSTOMER',t.customer],
      ['SALES ORDER',t.salesOrder||t.so],
      ['SHIP DATE',t.shipDate||t.ship],
      ['DRIVER',t.driver||t.assignedDriver],
      ['CLEANROOM',t.cleanroom||t.room||t.location]
    ];
    fields.classList.add('v849-mini-fields');
    fields.innerHTML=current.map(([k,v])=>`<div><span>${esc(k)}</span><b>${esc(k==='SHIP DATE'?fmtD(v):safe(v))}</b></div>`).join('');
  }
}
function enhanceMiniCards(){
  $$('.v842-mini-tool-card').forEach(card=>{const t=byId(miniId(card));if(t)enhanceMiniCard(card,t)});
}
function currentLiveTool(){
  try{const t=window.B7LiveStatusCore?.currentTool?.();if(t)return t}catch(e){}
  const id=String($('#v802ToolHost .v805-tool-identity h2')?.textContent||'').trim();return id?byId(id):null;
}
function refresh(){stamp();enhanceSummary();enhanceMiniCards();const t=currentLiveTool();if(t)enhanceFullCard(t)}

document.addEventListener('b7fi:live-tool-change',ev=>{setTimeout(()=>{enhanceFullCard(ev.detail?.tool||currentLiveTool());enhanceSummary()},0)});
const priorSetView=window.setView;if(typeof priorSetView==='function'){window.setView=function(){const r=priorSetView.apply(this,arguments);[0,50,150,320].forEach(ms=>setTimeout(refresh,ms));return r};try{setView=window.setView}catch(e){}}
const priorToolStatus=window.toolStatus;if(typeof priorToolStatus==='function'){window.toolStatus=function(){const r=priorToolStatus.apply(this,arguments);[0,40,120].forEach(ms=>setTimeout(refresh,ms));return r};try{toolStatus=window.toolStatus}catch(e){}}
const priorToolAdmin=window.toolAdmin;if(typeof priorToolAdmin==='function'){window.toolAdmin=function(){const r=priorToolAdmin.apply(this,arguments);[0,40,120].forEach(ms=>setTimeout(refresh,ms));return r};try{toolAdmin=window.toolAdmin}catch(e){}}
function boot(){[0,120,350,800].forEach(ms=>setTimeout(refresh,ms))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
