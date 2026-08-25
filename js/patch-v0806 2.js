/* B7 FI Command Center v0.80.33 — Live Status lock + persistent footer/version guard.
   Bounded updates only: no MutationObserver and no recurring interval. */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'0.80.33';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s);
function syncVersion(){
  const el=$('#appVersionLabel');
  if(el)el.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
  document.title=`B7 FI Command Center v${VERSION}`;
}
function rebuildFooter(){
  if(document.body.classList.contains('v802-live-status'))return;
  const footer=$('footer.v57-footer'),app=$('main#app');
  if(!footer||!app)return;
  if(footer.previousElementSibling!==app)app.insertAdjacentElement('afterend',footer);
  footer.innerHTML=`<div class="v80-footer-left"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div><div class="v80-footer-center"><img src="assets/kla-plus-official.png" alt="KLA+"></div><div class="v80-footer-right"><div class="v80-footer-mode">Local Production Mode · SharePoint live sync pending</div><div id="appVersionLabel" class="v80-footer-version">B7 FI COMMAND CENTER V${VERSION}</div></div>`;
  const b=$('#administrationCenterFooter');
  if(b)b.onclick=()=>{const n=document.querySelector('[data-view="admincenter"],[data-view="admin"]');if(n)n.click();else if(typeof window.setView==='function')window.setView('admincenter')};
}
function normalizeLive(){
  if(!document.body.classList.contains('v802-live-status'))return;
  const mount=$('#v802StatusMount');
  if(mount){mount.style.removeProperty('height');mount.style.removeProperty('min-height');}
  const lead=$('#topActionBar .v72-beacon-title')||$('#topActionBar .v70-action-beacon b')||$('#topActionBar .v70-action-beacon strong');
  const sys=$('#operationsBar .v72-beacon-title')||$('#operationsBar .v65-fleet-label b')||$('#operationsBar .v65-fleet-label strong');
  if(lead)lead.textContent='LEAD ALERTS';
  if(sys)sys.textContent='SYSTEM STATUS';
}
function settle(){syncVersion();rebuildFooter();normalizeLive()}
const previousSetView=window.setView;
window.setView=function(v){
  const r=previousSetView?previousSetView(v):undefined;
  [0,60,220,700].forEach(ms=>setTimeout(settle,ms));
  return r;
};
/* Navigation clicks can trigger legacy renderers outside setView; bounded correction only. */
document.addEventListener('click',e=>{
  if(e.target.closest('.nav-btn,.v57-live-card,#v802Exit'))[0,80,300].forEach(ms=>setTimeout(settle,ms));
},true);
function startup(){settle();setTimeout(settle,180);setTimeout(settle,760)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
