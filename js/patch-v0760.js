/* B7 FI Command Center v0.76.0 — stable shared shell/status/footer polish.
   No MutationObserver. No recurring interval. Pure CSS motion only.
*/
(function(){
'use strict';
window.VERSION='0.76.0';
const $=(s,r=document)=>r.querySelector(s);

function ensureTwinTracers(bar){
  if(!bar)return;
  bar.querySelectorAll('.v76-perimeter-tracer').forEach((n,i)=>{ if(i>1)n.remove(); });
  if(!bar.querySelector('.v76-tracer-a')){
    const a=document.createElement('i');a.className='v76-perimeter-tracer v76-tracer-a';a.setAttribute('aria-hidden','true');bar.appendChild(a);
  }
  if(!bar.querySelector('.v76-tracer-b')){
    const b=document.createElement('i');b.className='v76-perimeter-tracer v76-tracer-b';b.setAttribute('aria-hidden','true');bar.appendChild(b);
  }
}

function ensureFooter(){
  const f=$('footer.v57-footer');
  if(!f)return;
  // Rebuild only when the approved five-region footer is missing.
  if(!f.querySelector('.v74-footer-brand') || !f.querySelector('.v74-footer-system')){
    f.innerHTML=`
      <div class="v74-footer-admin"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div>
      <strong id="appVersionLabel" class="v74-footer-version">B7 FI COMMAND CENTER v0.76.0</strong>
      <div class="v74-footer-brand"><img src="assets/kla-plus-official.png" alt="KLA+"></div>
      <div class="v74-footer-system"><div class="v74-footer-live"><span class="v74-footer-dot" aria-hidden="true"></span><span>Local Production Mode</span></div><span class="v74-footer-sync">SharePoint live sync pending</span></div>
      <div class="v74-footer-location">Building 7 · Final Integration · Operations</div>`;
  }
  const version=$('#appVersionLabel');if(version)version.textContent='B7 FI COMMAND CENTER v0.76.0';
  const btn=$('#administrationCenterFooter');
  if(btn && !btn.dataset.v76Bound){
    btn.dataset.v76Bound='1';
    btn.addEventListener('click',()=>{
      const nav=document.querySelector('[data-view="admincenter"],[data-view="admin"]');
      if(nav){nav.click();return;}
      if(typeof window.setView==='function')window.setView('admincenter');
    });
  }
}

function normalizeStatusGeometry(){
  const fleet=$('#operationsBar');
  const stack=$('.header-status-stack');
  const action=$('#topActionBar');
  const toolbar=$('#floatingActions');
  if(stack&&action&&fleet&&toolbar&&fleet.parentElement!==stack)stack.insertBefore(fleet,toolbar);
  const ft=$('.v65-fleet-ticker');
  const txt=$('#opsTickerText');
  if(ft){ft.style.border='0';ft.style.boxShadow='none';}
  if(txt){txt.style.border='0';txt.style.boxShadow='none';txt.style.background='transparent';}
}

function run(){
  normalizeStatusGeometry();
  ensureTwinTracers($('#topActionBar'));
  ensureTwinTracers($('#operationsBar'));
  ensureFooter();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
// Bounded startup retries only; older startup patches finish shortly after DOM ready.
setTimeout(run,180);
setTimeout(run,760);
})();
