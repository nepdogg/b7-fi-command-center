/* B7 FI Command Center v0.80.1 — framework lock candidate.
   Bounded startup normalization only; no MutationObserver and no recurring timer.
*/
(function(){
'use strict';
window.VERSION='0.80.1';
const $=(s,r=document)=>r.querySelector(s);

function txt(el){return (el&&el.textContent||'').trim();}
function fleetCount(){
  const pools=[window.filteredFleetMessages,window.fleetMessages,window.fleetAlerts,window.currentFleetMessages];
  for(const p of pools){ if(Array.isArray(p) && p.length) return p.length; }
  const t=txt($('#opsTickerText'));
  return t && !/loading (fleet|system) status/i.test(t) ? 1 : 0;
}
function renameStatusLabels(){
  const a=$('#topActionBar .v70-action-beacon');
  if(a){
    const title=a.querySelector('.v72-beacon-title') || a.querySelector('b,strong');
    if(title) title.textContent='LEAD ALERTS';
  }
  const f=$('#operationsBar .v65-fleet-label');
  if(f){
    const title=f.querySelector('.v72-beacon-title') || f.querySelector('b,strong');
    if(title) title.textContent='SYSTEM STATUS';
  }
}
function normalizeFleetCounter(){
  const s=$('#operationsBar .v65-fleet-summary');
  if(s) s.setAttribute('data-v79-count',String(Math.max(1,fleetCount())));
}
function buildFooter(){
  const footer=$('footer.v57-footer');
  const app=$('main#app');
  if(!footer||!app)return;
  if(footer.previousElementSibling!==app) app.insertAdjacentElement('afterend',footer);
  footer.innerHTML=`
    <div class="v79-footer-left">
      <button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button>
    </div>
    <div class="v79-footer-center"><img src="assets/kla-plus-official.png" alt="KLA+"></div>
    <div class="v79-footer-right">
      <div class="v79-footer-mode"><span class="v79-footer-dot" aria-hidden="true"></span><span>Local Production Mode</span></div>
      <div id="appVersionLabel" class="v79-footer-version">B7 FI COMMAND CENTER v0.80.1</div>
    </div>`;
  const btn=$('#administrationCenterFooter');
  if(btn && !btn.dataset.v79Bound){
    btn.dataset.v79Bound='1';
    btn.addEventListener('click',()=>{
      const nav=document.querySelector('[data-view="admincenter"],[data-view="admin"]');
      if(nav){nav.click();return;}
      if(typeof window.setView==='function') window.setView('admincenter');
    });
  }
}
function ensureStack(){
  const stack=$('.header-status-stack'), fleet=$('#operationsBar'), toolbar=$('#floatingActions');
  if(stack&&fleet&&toolbar&&fleet.parentElement!==stack) stack.insertBefore(fleet,toolbar);
}
function run(){ensureStack();renameStatusLabels();normalizeFleetCounter();buildFooter();}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
// Legacy renderers complete asynchronously during startup; bounded retries only.
setTimeout(run,180);
setTimeout(run,760);
setTimeout(run,1600);
})();
