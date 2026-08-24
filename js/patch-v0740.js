/* B7 FI Command Center v0.80.33 — stable top status stack hotfix
   IMPORTANT: no MutationObserver, no recurring re-parent loop, no polling timer.
   The header/status/footer shell is persistent in this SPA, so these changes are applied once.
*/
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'0.80.33';
const $=(s,r=document)=>r.querySelector(s);

function moveFleetTopOnce(){
  const stack=$('.header-status-stack');
  const action=$('#topActionBar');
  const fleet=$('#operationsBar');
  const toolbar=$('#floatingActions');
  if(!stack||!action||!fleet||!toolbar)return;
  if(fleet.parentElement!==stack || fleet.previousElementSibling!==action){
    stack.insertBefore(fleet,toolbar);
  }
}

function buildFooterOnce(){
  const f=$('footer.v57-footer');
  if(!f)return;
  if(f.dataset.v74Footer!=='1'){
    f.dataset.v74Footer='1';
    f.innerHTML=`
      <div class="v74-footer-admin"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div>
      <strong id="appVersionLabel" class="v74-footer-version">B7 FI COMMAND CENTER v0.74.1</strong>
      <div class="v74-footer-brand"><img src="assets/kla-plus-official.png" alt="KLA+"></div>
      <div class="v74-footer-system"><div class="v74-footer-live"><span class="v74-footer-dot" aria-hidden="true"></span><span>Local Production Mode</span></div><span class="v74-footer-sync">SharePoint live sync pending</span></div>
      <div class="v74-footer-location">Building 7 · Final Integration · Operations</div>`;
  }
  const a=$('#administrationCenterFooter');
  if(a && !a.dataset.v74Bound){
    a.dataset.v74Bound='1';
    a.addEventListener('click',()=>{
      const nav=document.querySelector('[data-view="admincenter"]');
      if(nav){nav.click();return;}
      if(typeof window.setView==='function')window.setView('admincenter');
    });
  }
  const v=$('#appVersionLabel');
  if(v)v.textContent='B7 FI COMMAND CENTER v0.74.1';
}

function centerFleetMessageOnce(){
  const ticker=$('.v65-fleet-ticker');
  const text=$('#opsTickerText');
  if(ticker){
    ticker.style.display='flex';
    ticker.style.alignItems='center';
    ticker.style.justifyContent='center';
    ticker.style.textAlign='center';
  }
  if(text){
    text.style.textAlign='center';
    text.style.margin='0';
    text.style.padding='0';
  }
}

function applyStableShell(){
  moveFleetTopOnce();
  buildFooterOnce();
  centerFleetMessageOnce();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',applyStableShell,{once:true});
}else{
  applyStableShell();
}
// Small bounded retries only for scripts that finish initial rendering after DOM ready.
setTimeout(applyStableShell,120);
setTimeout(applyStableShell,500);
})();
