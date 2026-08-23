/* B7 FI Command Center v0.69.0 — stable Action Status + Operations toolbar cleanup */
(function(){
'use strict';
window.VERSION='0.69.0';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
let normalizing=false;
function center(){return document.body.dataset.center||'home'}
function parseCount(text){const m=String(text||'').match(/(\d+)\s*\/\s*(\d+)/);return m?{i:m[1],n:m[2]}:null}
function statusKind(cur){const t=((cur?.className||'')+' '+(cur?.textContent||'')).toLowerCase();if(t.includes('critical')||t.includes(' red'))return 'critical';if(t.includes('attention')||t.includes(' orange'))return 'attention';if(t.includes('reminder')||t.includes('next action')||t.includes(' yellow'))return 'reminder';if(t.includes('information')||t.includes(' blue'))return 'information';return 'normal'}
function normalizeActionBar(){
 if(normalizing)return; const bar=$('#topActionBar'); if(!bar)return; normalizing=true;
 try{
   let label=$('#v66ActionStatusLabel',bar);
   if(!label){label=document.createElement('div');label.id='v66ActionStatusLabel';label.className='v66-action-status-label';bar.prepend(label)}
   const cur=$('#topActionCurrent',bar)||$('.top-action-current',bar);
   if(cur){
     const oldLabel=$('.top-action-label',cur)?.textContent?.trim()||'';
     const oldMessage=$('strong',cur)?.textContent?.trim()||'';
     const count=parseCount($('.top-action-count',cur)?.textContent||$('.v69-nav',cur)?.textContent||'');
     const kind=statusKind(cur);
     label.dataset.status=kind;
     label.innerHTML='<span class="v69-lamp" aria-hidden="true"></span><strong>ACTION STATUS</strong>';
     if(cur.dataset.v69Normalized!=='1' || !$('.v69-message',cur)){
       const nav=count?`← OPEN ${count.i} OF ${count.n}`:'← OPEN';
       cur.innerHTML=`<span class="v69-severity">${oldLabel}</span><strong class="v69-message">${oldMessage}</strong><span class="v69-nav">${nav}</span>`;
       cur.dataset.v69Normalized='1';
     }
   }else{
     label.dataset.status='normal';label.innerHTML='<span class="v69-lamp" aria-hidden="true"></span><strong>ACTION STATUS</strong>';
   }
   const all=$('#topActionAll',bar)||$('.top-action-all',bar); if(all)all.remove();
 } finally {normalizing=false}
}
function cleanupOperationsToolbar(){
 if(center()!=='home')return; const bar=$('#floatingActions'); if(!bar)return;
 $$(':scope > button',bar).forEach(b=>{const t=(b.textContent||'').trim(); if(/^OVERVIEW$/i.test(t))b.remove()});
 let shot=$$(':scope > button',bar).find(b=>/^SCREENSHOT$/i.test((b.textContent||'').trim()));
 let report=$$(':scope > button',bar).find(b=>/^REPORT$/i.test((b.textContent||'').trim()));
 $$(':scope > button',bar).forEach(b=>{const t=(b.textContent||'').trim();if(!/^SCREENSHOT$|^REPORT$/i.test(t))b.remove()});
 if(shot)shot.classList.add('v69-home-action'); if(report)report.classList.add('v69-home-action');
}
function version(){const v=$('#appVersionLabel');if(v)v.textContent='B7 FI COMMAND CENTER v0.69.0'}
function stabilize(){normalizeActionBar();cleanupOperationsToolbar();version()}
// v0.80.1 performance: continuous DOM observers removed; navigation wrapper below performs bounded cleanup.
const oldSet=window.setView;if(typeof oldSet==='function'){window.setView=function(v){const r=oldSet(v);setTimeout(stabilize,40);setTimeout(stabilize,160);return r}}
setTimeout(stabilize,350);
})();
