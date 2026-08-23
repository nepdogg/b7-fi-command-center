/* B7 FI Command Center v0.78.0 — bounded shell/status/footer finishing patch.
   No MutationObserver. No recurring interval. Animation is CSS-only.
*/
(function(){
'use strict';
window.VERSION='0.78.0';
const $=(s,r=document)=>r.querySelector(s);

function text(el){return (el?.textContent||'').trim()}
function fleetCount(){
  const pools=[window.filteredFleetMessages,window.fleetMessages,window.fleetAlerts,window.currentFleetMessages];
  for(const p of pools) if(Array.isArray(p) && p.length) return p.length;
  const t=text($('#opsTickerText'));
  return t && !/loading fleet status/i.test(t) ? 1 : 0;
}
function ensureTracer(bar,cls){
  if(!bar || bar.querySelector('.'+cls)) return;
  const i=document.createElement('i');
  i.className='v78-perimeter-tracer '+cls;
  i.setAttribute('aria-hidden','true');
  bar.appendChild(i);
}
function ensureTracers(){
  for(const bar of [$('#topActionBar'),$('#operationsBar')]){
    if(!bar)continue;
    ensureTracer(bar,'v78-tracer-cw');
    ensureTracer(bar,'v78-tracer-ccw');
  }
}
function ensureFooter(){
  const f=$('footer.v57-footer');
  const app=$('main#app');
  if(!f||!app)return;
  // Footer is structurally after page content, not inside the header/status stack.
  if(f.previousElementSibling!==app) app.insertAdjacentElement('afterend',f);
  if(!f.querySelector('.v74-footer-brand') || !f.querySelector('.v74-footer-system')){
    f.innerHTML=`
      <div class="v74-footer-admin"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div>
      <strong id="appVersionLabel" class="v74-footer-version">B7 FI COMMAND CENTER v0.78.0</strong>
      <div class="v74-footer-brand"><img src="assets/kla-plus-official.png" alt="KLA+"></div>
      <div class="v74-footer-system"><div class="v74-footer-live"><span class="v74-footer-dot" aria-hidden="true"></span><span>Local Production Mode</span></div><span class="v74-footer-sync">SharePoint live sync pending</span></div>
      <div class="v74-footer-location">Building 7 · Final Integration · Operations</div>`;
  }
  const version=$('#appVersionLabel'); if(version) version.textContent='B7 FI COMMAND CENTER v0.78.0';
  const btn=$('#administrationCenterFooter');
  if(btn && !btn.dataset.v78Bound){
    btn.dataset.v78Bound='1';
    btn.addEventListener('click',()=>{
      const nav=document.querySelector('[data-view="admincenter"],[data-view="admin"]');
      if(nav){nav.click();return;}
      if(typeof window.setView==='function') window.setView('admincenter');
    });
  }
}
function normalizeStack(){
  const stack=$('.header-status-stack'),fleet=$('#operationsBar'),toolbar=$('#floatingActions');
  if(stack&&fleet&&toolbar&&fleet.parentElement!==stack) stack.insertBefore(fleet,toolbar);
  const sum=$('.v65-fleet-summary',fleet);
  if(sum) sum.setAttribute('data-v78-count',String(Math.max(1,fleetCount())));
}
function run(){normalizeStack();ensureTracers();ensureFooter()}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
// Bounded startup retries only for legacy startup renderers.
setTimeout(run,180);
setTimeout(run,760);
})();
