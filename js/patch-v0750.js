/* B7 FI Command Center v0.75.0 — stable shell polish
   No MutationObserver. No recurring timers. Only bounded startup passes.
*/
(function(){
'use strict';
window.VERSION='0.75.0';
const $=(s,r=document)=>r.querySelector(s);

function ensurePerimeter(bar){
  if(!bar || bar.querySelector('.v75-perimeter-tracer')) return;
  const tracer=document.createElement('i');
  tracer.className='v75-perimeter-tracer';
  tracer.setAttribute('aria-hidden','true');
  bar.appendChild(tracer);
}

function ensureStatusFrames(){
  ensurePerimeter($('#topActionBar'));
  ensurePerimeter($('#operationsBar'));
}

function ensureFooter(){
  const f=$('footer.v57-footer');
  if(!f)return;
  if(f.dataset.v75Footer!=='1'){
    f.dataset.v75Footer='1';
    f.innerHTML=`
      <div class="v74-footer-admin"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div>
      <strong id="appVersionLabel" class="v74-footer-version">B7 FI COMMAND CENTER v0.75.0</strong>
      <div class="v74-footer-brand"><img src="assets/kla-plus-official.png" alt="KLA+"></div>
      <div class="v74-footer-system"><div class="v74-footer-live"><span class="v74-footer-dot" aria-hidden="true"></span><span>Local Production Mode</span></div><span class="v74-footer-sync">SharePoint live sync pending</span></div>
      <div class="v74-footer-location">Building 7 · Final Integration · Operations</div>`;
  }
  const btn=$('#administrationCenterFooter');
  if(btn && !btn.dataset.v75Bound){
    btn.dataset.v75Bound='1';
    btn.addEventListener('click',()=>{
      const nav=document.querySelector('[data-view="admincenter"],[data-view="admin"]');
      if(nav){nav.click();return;}
      if(typeof window.setView==='function')window.setView('admincenter');
    });
  }
  const version=$('#appVersionLabel');
  if(version)version.textContent='B7 FI COMMAND CENTER v0.75.0';
}

function run(){ensureStatusFrames();ensureFooter();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});
else run();
setTimeout(run,120);
setTimeout(run,600);
})();
