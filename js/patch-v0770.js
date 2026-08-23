/* B7 FI Command Center v0.77.0 — bounded shell/status finishing patch.
   No MutationObserver. No recurring interval.
*/
(function(){
'use strict';
window.VERSION='0.77.0';
const $=(s,r=document)=>r.querySelector(s);
function text(el){return (el?.textContent||'').trim()}
function fleetCount(){
  const candidates=[window.filteredFleetMessages,window.fleetMessages,window.fleetAlerts,window.currentFleetMessages];
  for(const c of candidates)if(Array.isArray(c)&&c.length)return c.length;
  const ticker=text($('#opsTickerText'));
  return ticker && !/loading fleet status/i.test(ticker) ? 1 : 0;
}
function finish(){
  const f=$('#operationsBar'), stack=$('.header-status-stack'), toolbar=$('#floatingActions');
  if(f&&stack&&toolbar&&f.parentElement!==stack)stack.insertBefore(f,toolbar);
  const sum=$('.v65-fleet-summary',f);
  if(sum)sum.setAttribute('data-v77-count',String(Math.max(1,fleetCount())));
  const version=$('#appVersionLabel');if(version)version.textContent='B7 FI COMMAND CENTER v0.77.0';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',finish,{once:true});else finish();
setTimeout(finish,220);
setTimeout(finish,850);
})();
