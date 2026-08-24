/* B7 FI Command Center v0.80.44
   - Repairs v0.80.43 load regression via clean index references.
   - Completes Tool Center summary placeholders: Waiting, In FI, Packing, Shipped,
     Pulled Into current quarter, Pushed Out.
   - Zero-count workflow/change cards remain present but visually disabled.
   - Keeps v0.80.43 Mini Tool Card density/status coloring active.
*/
(function(){'use strict';
const VERSION='0.80.44',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function allTools(){try{return Array.isArray(tools)?tools:[]}catch(e){return[]}}
function currentQuarter(){
  const h=$('#headerPageTitle')?.textContent||'';
  const m=h.match(/CY\d{2}Q[1-4]/i);if(m)return m[0].toUpperCase();
  try{if(typeof quarterLabel==='function')return String(quarterLabel()).toUpperCase()}catch(e){}
  const counts={};allTools().forEach(t=>{const q=String(t.quarter||'').toUpperCase();if(q)counts[q]=(counts[q]||0)+1});
  return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0]||'CY26Q3';
}
function status(t){let s='';try{s=typeof statusFor==='function'?statusFor(t):t.quarterStatus}catch(e){s=t.quarterStatus}return String(s||'Waiting for FI')}
function isPacking(t){const s=status(t).toLowerCase();if(s.includes('pack'))return true;const sch=String(t?.schedule?.status||'').toLowerCase();return sch.includes('pack')&&!sch.includes('not started')&&!sch.includes('n/a')}
function latestHistory(t){return Array.isArray(t?.changeHistory)&&t.changeHistory.length?t.changeHistory[0]:null}
function historyType(t){const h=latestHistory(t);return String(h?.type||'').toLowerCase()}
function qVal(obj,key){return String(obj?.[key]||'').toUpperCase()}
function isPulledInto(t,q){
  const h=latestHistory(t),type=historyType(t);
  if(type.includes('pull')){
    const nq=qVal(h,'newQuarter')||qVal(h?.new,'quarter')||String(t.quarter||'').toUpperCase();
    return !nq||nq===q;
  }
  return !!t?.pullIn && String(t.quarter||'').toUpperCase()===q;
}
function isPushedOut(t,q){
  const h=latestHistory(t),type=historyType(t);
  if(type.includes('push')){
    const oq=qVal(h,'oldQuarter')||qVal(h?.old,'quarter')||String(t.originalQuarter||'').toUpperCase();
    return !oq||oq===q;
  }
  return !!t?.pushOut || (!!t?.nextQuarter && String(t.nextQuarter).toUpperCase()!==q);
}
function metric(label,value,cls,always=false){const active=always||Number(value)>0;return `<div class="metric ${cls} ${active?'v844-active':'v844-inactive'}"><span>${label}</span><strong>${value}</strong></div>`}
function enhanceSummary(){
  stamp();const dash=$('.v837-tool-dashboard');if(!dash)return;
  const grid=$('.v837-summary-grid',dash);if(!grid)return;
  const q=currentQuarter();let list=[];
  try{list=typeof pageTools==='function'?pageTools('countdown'):allTools().filter(t=>String(t.quarterStatus||'')!=='Archive')}catch(e){list=allTools()}
  const waiting=list.filter(t=>status(t)==='Waiting for FI').length;
  const infi=list.filter(t=>status(t)==='In FI').length;
  const packing=list.filter(isPacking).length;
  const shipped=list.filter(t=>status(t)==='Shipped').length;
  const pulled=allTools().filter(t=>isPulledInto(t,q)).length;
  const pushed=allTools().filter(t=>isPushedOut(t,q)).length;
  grid.classList.add('v844-summary-grid');
  grid.innerHTML=
    metric(`${q} TOOLS`,list.length,'v844-total',true)+
    metric('WAITING FI',waiting,'v844-waiting')+
    metric('IN FI',infi,'v844-infi')+
    metric('PACKING',packing,'v844-packing')+
    metric('SHIPPED',shipped,'v844-shipped')+
    metric(`PULLED INTO ${q}`,pulled,'v844-pulled')+
    metric('PUSHED OUT',pushed,'v844-pushed');
}
function statusClass(text){const s=String(text||'').toLowerCase();if(s.includes('ship'))return'v843-shipped';if(s.includes('pack'))return'v843-packing';if(s.includes('wait'))return'v843-waiting';return'v843-infi'}
function repairCards(){
  $$('.v842-mini-tool-card').forEach(card=>{
    const st=card.querySelector('.v842-status')?.textContent||'';
    card.classList.remove('v843-waiting','v843-infi','v843-packing','v843-shipped');card.classList.add(statusClass(st));
    const sub=card.querySelector('.v842-sub'),fields=card.querySelector('.v842-fields');
    if(sub&&fields&&!fields.querySelector('[data-v843="model"]')){
      const parts=sub.textContent.split('·').map(x=>x.trim()),model=parts[0]||'—',customer=parts.slice(1).join(' · ')||'—';
      const a=document.createElement('div');a.dataset.v843='model';a.innerHTML='<span>MODEL</span><b></b>';a.querySelector('b').textContent=model;
      const b=document.createElement('div');b.dataset.v843='customer';b.innerHTML='<span>CUSTOMER</span><b></b>';b.querySelector('b').textContent=customer;
      fields.prepend(b);fields.prepend(a);sub.remove();
    }
  });
}
function refine(){stamp();enhanceSummary();repairCards()}
const prior=window.setView;if(typeof prior==='function'){
  window.setView=function(){const r=prior.apply(this,arguments);[0,40,120,260].forEach(ms=>setTimeout(refine,ms));return r};try{setView=window.setView}catch(e){}
}
function boot(){[0,120,320,700].forEach(ms=>setTimeout(refine,ms))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
