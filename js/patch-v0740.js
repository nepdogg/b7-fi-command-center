/* B7 FI Command Center v0.74.0 — move Fleet Status into top Command Awareness Zone */
(function(){
'use strict';
window.VERSION='0.74.0';
const $=(s,r=document)=>r.querySelector(s);
let moving=false;
function moveFleetTop(){
  if(moving)return;
  const stack=$('.header-status-stack'), action=$('#topActionBar'), fleet=$('#operationsBar'), toolbar=$('#floatingActions');
  if(!stack||!action||!fleet||!toolbar)return;
  moving=true;
  try{
    if(fleet.parentElement!==stack || fleet.previousElementSibling!==action) stack.insertBefore(fleet,toolbar);
  }finally{moving=false}
}
function footer(){
  const f=$('footer.v57-footer'); if(!f)return;
  if(f.dataset.v74Footer!=='1'){
    f.dataset.v74Footer='1';
    f.innerHTML=`
      <div class="v74-footer-admin"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div>
      <strong id="appVersionLabel" class="v74-footer-version">B7 FI COMMAND CENTER v0.74.0</strong>
      <div class="v74-footer-brand"><img src="assets/kla-plus-official.png" alt="KLA+"></div>
      <div class="v74-footer-system"><div class="v74-footer-live"><span class="v74-footer-dot" aria-hidden="true"></span><span>Local Production Mode</span></div><span id="opsSync">SharePoint live sync pending</span></div>
      <div class="v74-footer-location">Building 7 · Final Integration · Operations</div>`;
  }
  const a=$('#administrationCenterFooter'); if(a)a.onclick=()=>{if(typeof window.setView==='function')window.setView('admincenter')};
  const v=$('#appVersionLabel'); if(v)v.textContent='B7 FI COMMAND CENTER v0.74.0';
}
function centerFleetMessage(){
  const ticker=$('.v65-fleet-ticker'), text=$('#opsTickerText');
  if(ticker){ticker.style.display='flex';ticker.style.alignItems='center';ticker.style.justifyContent='center';ticker.style.textAlign='center'}
  if(text){text.style.textAlign='center';text.style.margin='0';text.style.padding='0'}
}
function run(){moveFleetTop();footer();centerFleetMessage()}
const stack=$('.header-status-stack'); if(stack)new MutationObserver(()=>requestAnimationFrame(run)).observe(stack,{childList:true,subtree:false});
setTimeout(run,40);setTimeout(run,180);setTimeout(run,600);setInterval(run,2200);
})();
