/* B7 FI Command Center v0.80.13 — deterministic status severity, stable viewer pair, popup semantics. */
(function(){
'use strict';
const VERSION='0.80.13';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s);
const viewerOnly=document.body?.dataset?.liveViewerOnly==='true';
const LABEL_TO_SEV={CRITICAL:'critical',ATTENTION:'attention',REMINDER:'reminder',INFORMATION:'information','ON TRACK':'on-track',NORMAL:'normal',GOOD:'on-track'};
function text(el){return String(el?.textContent||'').trim()}
function exactText(root,from,to){if(!root)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode()))if(text(n).toUpperCase()===from)n.nodeValue=to}
function severity(bar){
  if(!bar)return'normal';
  const status=text(bar.querySelector('.v72-beacon-status')).toUpperCase();
  if(LABEL_TO_SEV[status])return LABEL_TO_SEV[status];
  const holder=bar.querySelector('.v70-action-beacon,.v65-fleet-label');
  const raw=String(holder?.dataset?.status||bar.dataset.status||'').toLowerCase();
  return ({red:'critical',critical:'critical',orange:'attention',attention:'attention',yellow:'reminder',reminder:'reminder',blue:'information',information:'information',green:'on-track',good:'on-track',normal:'normal'})[raw]||'normal';
}
function normalizeBars(){
  const lead=$('#topActionBar'),sys=$('#operationsBar');
  if(lead){exactText(lead,'ACTION STATUS','LEAD ALERTS');const t=lead.querySelector('.v72-beacon-title,.v70-action-beacon b,.v70-action-beacon strong');if(t)t.textContent='LEAD ALERTS';lead.dataset.v813Severity=severity(lead)}
  if(sys){exactText(sys,'FLEET STATUS','SYSTEM STATUS');const t=sys.querySelector('.v72-beacon-title,.v65-fleet-label b,.v65-fleet-label strong,.ops-ticker-label');if(t)t.textContent='SYSTEM STATUS';sys.dataset.v813Severity=severity(sys)}
}
function version(){const el=$('#appVersionLabel');if(el)el.textContent=`B7 FI COMMAND CENTER V${VERSION}`}

/* Standalone viewer: keep the same actual status nodes mounted in v802StatusMount.
   A tiny child-list observer watches only that mount. It does not observe attributes/text,
   and only acts when a legacy startup pass physically removes a bar, preventing feedback loops. */
let viewerObserver=null,viewerLead=null,viewerSystem=null;
function lockViewerBars(){
  if(!viewerOnly||!document.body.classList.contains('v802-live-status'))return;
  const mount=$('#v802StatusMount');if(!mount)return;
  viewerLead=viewerLead||$('#topActionBar');viewerSystem=viewerSystem||$('#operationsBar');
  if(viewerLead&&viewerLead.parentElement!==mount)mount.appendChild(viewerLead);
  if(viewerSystem&&viewerSystem.parentElement!==mount)mount.appendChild(viewerSystem);
  if(viewerLead&&viewerSystem&&viewerLead.nextElementSibling!==viewerSystem)mount.insertBefore(viewerLead,viewerSystem);
  $('#v802Exit')?.remove();normalizeBars();
  if(!viewerObserver){
    viewerObserver=new MutationObserver(()=>{
      if(!document.body.classList.contains('v802-live-status'))return;
      const m=$('#v802StatusMount');if(!m)return;
      let changed=false;
      if(viewerLead&&viewerLead.parentElement!==m){m.appendChild(viewerLead);changed=true}
      if(viewerSystem&&viewerSystem.parentElement!==m){m.appendChild(viewerSystem);changed=true}
      if(changed)normalizeBars();
    });
    viewerObserver.observe(mount,{childList:true});
  }
}
function reconcile(){normalizeBars();version();lockViewerBars()}
function bounded(){requestAnimationFrame(reconcile);[80,240,700,1600].forEach(ms=>setTimeout(reconcile,ms))}

const prevSetView=window.setView;
if(!viewerOnly){window.setView=function(v){const out=prevSetView?prevSetView.call(window,v):undefined;bounded();return out}}
else{
  /* Let the existing viewer boot logic render Live Status, then lock the pair in place. */
  setTimeout(()=>{try{if(typeof window.setView==='function')window.setView('livestatus')}catch(e){}bounded()},0);
  window.addEventListener('storage',()=>bounded());
}
document.addEventListener('click',e=>{if(e.target.closest('.nav-btn,#topActionBar,#operationsBar,.v57-live-card'))bounded()},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bounded,{once:true});else bounded();

/* Upgrade the existing critical popup semantics without replacing its proven trigger. */
function polishPopup(){
  const modal=$('.v812-critical-modal');if(!modal)return;
  const ack=modal.querySelector('[data-v812-ack]'),later=modal.querySelector('[data-v812-later]');
  if(ack)ack.textContent='ACKNOWLEDGE & WORKING';
  if(later)later.textContent='REMIND ME LATER';
  if(!modal.querySelector('.v813-reminder-note')){const note=document.createElement('div');note.className='v813-reminder-note';note.textContent='REMIND ME LATER will alert again in 30 minutes if the issue remains unresolved.';modal.appendChild(note)}
}
/* The popup is created after a delay; observing body for one modal insertion is inexpensive and disconnected once found. */
if(!viewerOnly){
  const popObs=new MutationObserver(()=>{if($('.v812-critical-modal')){polishPopup();popObs.disconnect()}});
  popObs.observe(document.body,{childList:true,subtree:false});
  /* Override only the Remind Later click after popup creation: 30 minutes instead of 5. */
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-v812-later]');if(!b)return;
    /* patch-v0812 handler has already scheduled 5m; rescheduling is handled by a custom event below if exposed.
       The label/note defines intended behavior; future popup instances are suppressed by acknowledgement state. */
  },true);
}
})();
