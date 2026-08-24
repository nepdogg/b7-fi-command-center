/* B7 FI Command Center v0.80.43 — Tool Center Mini Card refinement.
   Four-across desktop density, Model/Customer in the core field grid,
   and Tool Status badge/left accent use the same fleet-status color language.
*/
(function(){'use strict';
const VERSION='0.80.43',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function statusClass(text){const s=String(text||'').toLowerCase();if(s.includes('ship'))return'v843-shipped';if(s.includes('pack'))return'v843-packing';if(s.includes('wait'))return'v843-waiting';return'v843-infi'}
function refine(){stamp();$$('.v842-mini-tool-card').forEach(card=>{
  const st=card.querySelector('.v842-status')?.textContent||'';
  card.classList.remove('v843-waiting','v843-infi','v843-packing','v843-shipped');card.classList.add(statusClass(st));
  const sub=card.querySelector('.v842-sub');
  const fields=card.querySelector('.v842-fields');
  if(sub&&fields&&!fields.querySelector('[data-v843="model"]')){
    const parts=sub.textContent.split('·').map(x=>x.trim());
    const model=parts[0]||'—',customer=parts.slice(1).join(' · ')||'—';
    const a=document.createElement('div');a.dataset.v843='model';a.innerHTML=`<span>MODEL</span><b></b>`;a.querySelector('b').textContent=model;
    const b=document.createElement('div');b.dataset.v843='customer';b.innerHTML=`<span>CUSTOMER</span><b></b>`;b.querySelector('b').textContent=customer;
    fields.prepend(b);fields.prepend(a);sub.remove();
  }
})}
const prior=window.setView;if(typeof prior==='function'){window.setView=function(){const r=prior.apply(this,arguments);[0,40,120,250].forEach(ms=>setTimeout(refine,ms));return r};try{setView=window.setView}catch(e){}}
function boot(){[0,150,400,800].forEach(ms=>setTimeout(refine,ms))}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
