/* B7 FI Command Center v0.80.14 — permanent status shells + viewer parity. */
(function(){
'use strict';
const VERSION='0.80.14';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s);
const viewerOnly=document.body?.dataset?.liveViewerOnly==='true';
const LABEL={critical:'CRITICAL',attention:'ATTENTION',reminder:'REMINDER',information:'INFORMATION','on-track':'ON TRACK',normal:'NORMAL'};
const COLOR_TO_SEV={red:'critical',critical:'critical',orange:'attention',attention:'attention',yellow:'reminder',reminder:'reminder',blue:'information',information:'information',green:'on-track',good:'on-track','on-track':'on-track',normal:'normal'};
let repairing=false;
let leadRef=$('#topActionBar');
let systemRef=$('#operationsBar');

function normSev(v){return COLOR_TO_SEV[String(v||'').trim().toLowerCase()]||''}
function visibleSeverity(bar){
  if(!bar)return'normal';
  const status=bar.querySelector('.v72-beacon-status');
  const byText=normSev(status?.textContent);
  if(byText)return byText;
  const holder=bar.querySelector('.v70-action-beacon,.v65-fleet-label,[data-status]');
  const byData=normSev(holder?.dataset?.status||bar.dataset?.status||bar.dataset?.v813Severity||bar.dataset?.v814Severity);
  if(byData)return byData;
  const cls=[...bar.classList,...(holder?[...holder.classList]:[])];
  for(const c of cls){const s=normSev(c);if(s)return s}
  return'normal';
}
function beaconHtml(title,sev,lampClass){return `<span class="${lampClass}" aria-hidden="true"></span><span class="v814-beacon-copy"><strong class="v72-beacon-title">${title}</strong><span class="v72-beacon-status">${LABEL[sev]||'NORMAL'}</span></span>`}
function ensureLeadShell(bar){
  if(!bar)return;
  const sev=visibleSeverity(bar);
  let beacon=bar.querySelector('.v70-action-beacon');
  if(!beacon){beacon=document.createElement('div');beacon.className='v70-action-beacon';bar.prepend(beacon)}
  beacon.dataset.status=sev;
  if(!beacon.querySelector('.v72-beacon-title')||beacon.querySelector('.v72-beacon-title')?.textContent!=='LEAD ALERTS')beacon.innerHTML=beaconHtml('LEAD ALERTS',sev,'v70-beacon-lamp');
  else {const st=beacon.querySelector('.v72-beacon-status');const want=LABEL[sev]||'NORMAL';if(st&&st.textContent!==want)st.textContent=want}

  let current=bar.querySelector('.top-action-current');
  let msg=bar.querySelector('.v70-action-message');
  let nav=bar.querySelector('.v70-action-nav');
  if(!current){
    const clear=bar.querySelector('.v70-action-clear,.top-action-clear');
    current=document.createElement('div');current.className='top-action-current v814-action-current';
    msg=document.createElement('strong');msg.className='v70-action-message';msg.textContent=(clear?.textContent||'NO ACTIVE LEAD ALERTS').trim();
    nav=document.createElement('span');nav.className='v70-action-nav';nav.textContent='';
    current.append(msg,nav);clear?.remove();bar.appendChild(current);
  } else {
    msg=msg||current.querySelector('strong');
    if(msg&&!msg.classList.contains('v70-action-message'))msg.classList.add('v70-action-message');
    if(!msg){msg=document.createElement('strong');msg.className='v70-action-message';msg.textContent='NO ACTIVE LEAD ALERTS';current.appendChild(msg)}
    nav=nav||current.querySelector('.v70-action-nav');
    if(!nav){nav=document.createElement('span');nav.className='v70-action-nav';nav.textContent='';current.appendChild(nav)}
  }
  bar.dataset.v814Severity=sev;
}
function ensureSystemShell(bar){
  if(!bar)return;
  const sev=visibleSeverity(bar);
  let label=bar.querySelector('.v65-fleet-label');
  if(!label){label=document.createElement('div');label.className='v65-fleet-label';bar.prepend(label)}
  label.dataset.status=sev;
  if(!label.querySelector('.v72-beacon-title')||label.querySelector('.v72-beacon-title')?.textContent!=='SYSTEM STATUS')label.innerHTML=beaconHtml('SYSTEM STATUS',sev,'v70-fleet-lamp');
  else {const st=label.querySelector('.v72-beacon-status');const want=LABEL[sev]||'NORMAL';if(st&&st.textContent!==want)st.textContent=want}

  let ticker=bar.querySelector('.v65-fleet-ticker');
  if(!ticker){ticker=document.createElement('div');ticker.className='ops-ticker v65-fleet-ticker';const span=document.createElement('span');span.id='opsTickerText';span.textContent='Loading system status…';ticker.appendChild(span);bar.appendChild(ticker)}
  let tickerText=ticker.querySelector('#opsTickerText');
  if(!tickerText){tickerText=document.createElement('span');tickerText.id='opsTickerText';tickerText.textContent=(ticker.textContent||'').trim();ticker.replaceChildren(tickerText)}

  let summary=bar.querySelector('.v65-fleet-summary');
  if(!summary){summary=document.createElement('div');summary.className='ops-summary v65-fleet-summary';summary.innerHTML='<span class="v814-system-count">← OPEN 1 OF 1</span>';bar.appendChild(summary)}
  bar.dataset.v814Severity=sev;
}
function statusStyle(bar){
  if(!bar)return;
  const sev=visibleSeverity(bar);
  bar.dataset.v814Severity=sev;
  const label=bar.querySelector('.v70-action-beacon,.v65-fleet-label');if(label)label.dataset.status=sev;
  const status=bar.querySelector('.v72-beacon-status');const want=LABEL[sev]||'NORMAL';if(status&&status.textContent!==want)status.textContent=want;
}
function normalizePair(){
  if(repairing)return;repairing=true;
  try{
    leadRef=leadRef||$('#topActionBar');systemRef=systemRef||$('#operationsBar');
    ensureLeadShell(leadRef);ensureSystemShell(systemRef);statusStyle(leadRef);statusStyle(systemRef);
    const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
  }finally{repairing=false}
}

/* A rotating message may rewrite a bar's children. Observe only the two bars and repair the permanent shell. */
function watchBar(bar){
  if(!bar||bar.dataset.v814Watch)return;bar.dataset.v814Watch='1';
  let queued=false;
  const obs=new MutationObserver(()=>{
    if(repairing||queued)return;queued=true;
    requestAnimationFrame(()=>{queued=false;normalizePair()});
  });
  obs.observe(bar,{childList:true,subtree:true,characterData:true});
}

/* Standalone viewer: always retain the same two actual status nodes. No route/render duplication. */
function ensureViewerPair(){
  if(!viewerOnly||!document.body.classList.contains('v802-live-status'))return;
  const mount=$('#v802StatusMount');if(!mount)return;
  leadRef=leadRef||$('#topActionBar');systemRef=systemRef||$('#operationsBar');
  if(leadRef&&leadRef.parentElement!==mount)mount.prepend(leadRef);
  if(systemRef&&systemRef.parentElement!==mount)mount.appendChild(systemRef);
  if(leadRef&&systemRef&&leadRef.nextElementSibling!==systemRef)mount.insertBefore(leadRef,systemRef);
  $('#v802Exit')?.remove();
  normalizePair();watchBar(leadRef);watchBar(systemRef);
}
function boot(){
  normalizePair();watchBar(leadRef);watchBar(systemRef);ensureViewerPair();
  [100,350,900,1800,3600].forEach(ms=>setTimeout(()=>{ensureViewerPair();normalizePair()},ms));
}

const priorSetView=window.setView;
if(typeof priorSetView==='function'){
  window.setView=function(v){const out=priorSetView.apply(this,arguments);requestAnimationFrame(()=>{ensureViewerPair();normalizePair();watchBar(leadRef);watchBar(systemRef)});return out};
}
if(viewerOnly){
  /* Legacy code can move a bar out of the viewer mount. Watch only parent/child changes, not styling/text. */
  const bodyObs=new MutationObserver(()=>{
    if(!document.body.classList.contains('v802-live-status'))return;
    const mount=$('#v802StatusMount');if(!mount)return;
    if((leadRef&&leadRef.parentElement!==mount)||(systemRef&&systemRef.parentElement!==mount))requestAnimationFrame(ensureViewerPair);
  });
  bodyObs.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
