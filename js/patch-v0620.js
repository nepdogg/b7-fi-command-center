/* B7 FI Command Center v0.62.0 — Center Navigation / Page Actions Standardization */
(function(){
'use strict';
window.VERSION='0.62.0';
const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const ACTION_RX=/^(EDIT |\+?\s*ADD |\+?\s*START |MORNING QUICK UPDATE|LEAD WORKSPACE|REPORT$|CANCEL$|SAVE CHANGES$)/i;
function version62(){let v=qs('#appVersionLabel');if(v)v.textContent='B7 FI Command Center v0.62.0'}
function proxyButton(label,source,primary=false){
 const b=document.createElement('button');b.className='btn v62-page-action'+(primary?' primary':'');b.textContent=label;
 b.onclick=()=>source.click();return b;
}
function normalizeToolbar62(){
 const bar=qs('#floatingActions'); if(!bar||document.body.dataset.center==='home')return;
 let buttons=qsa(':scope > button',bar);
 // Remove obsolete/cross-Center controls that slipped in from legacy renderers.
 buttons.forEach(b=>{let t=b.textContent.trim();if(/^(Administration|Administration Center|Tools|Tool Countdown|Shipping Schedule|Reference Center)$/i.test(t)&&!b.dataset.v57tab)b.remove()});
 buttons=qsa(':scope > button',bar);
 buttons.forEach(b=>{b.classList.remove('v62-page-nav','v62-page-action','v62-first-action');
   if(b.dataset.v57tab)b.classList.add('v62-page-nav'); else b.classList.add('v62-page-action');
 });
 // Move page actions to the right while keeping Center sub-navigation on the left.
 const nav=buttons.filter(b=>b.classList.contains('v62-page-nav'));
 const acts=buttons.filter(b=>b.classList.contains('v62-page-action'));
 [...nav,...acts].forEach(b=>bar.appendChild(b));
 if(acts[0])acts[0].classList.add('v62-first-action');
 // Keep Save Changes as the final editor action, Cancel directly before it.
 let save=acts.find(b=>/^SAVE CHANGES$/i.test(b.textContent.trim())), cancel=acts.find(b=>/^CANCEL$/i.test(b.textContent.trim()));
 if(cancel&&save){bar.append(cancel,save);cancel.classList.add('v62-first-action');acts.forEach(b=>{if(b!==cancel)b.classList.remove('v62-first-action')})}
}
function promoteReferenceAdd62(){
 if(document.body.dataset.center!=='reference')return;
 const bar=qs('#floatingActions');if(!bar)return;
 const src=qs('#kbAdd51');
 if(src&&!qsa(':scope > button',bar).some(b=>/ADD REFERENCE NOTE/i.test(b.textContent))){bar.appendChild(proxyButton('+ ADD REFERENCE NOTE',src,true));src.classList.add('v62-content-global-action')}
 // Reference Center only owns its two destinations plus page actions.
 qsa(':scope > button',bar).forEach(b=>{let t=b.textContent.trim();if(!b.dataset.v57tab&&!/ADD REFERENCE NOTE|REPORT|CANCEL|SAVE CHANGES/i.test(t))b.remove()});
}
function promoteMeetingStart62(){
 if(document.body.dataset.center!=='meeting'||document.body.classList.contains('v61-focused-editor'))return;
 const bar=qs('#floatingActions');if(!bar)return;const src=qs('#adhocStart51');
 if(src&&!qsa(':scope > button',bar).some(b=>/START MEETING NOW/i.test(b.textContent)))bar.appendChild(proxyButton('+ START MEETING NOW',src,true));
}
function hideDuplicateEditorControls62(){
 if(!document.body.classList.contains('v61-focused-editor'))return;
 qsa('#app #saveCountdown,#app #saveShipping,#app #savePriority,#app #saveMorning,#app .actions > button').forEach(b=>{
   if(/save|apply countdown/i.test((b.id||'')+' '+b.textContent))b.classList.add('v62-content-global-action');
 });
}
function classifyLegacyActions62(){
 const bar=qs('#floatingActions');if(!bar)return;
 qsa(':scope > button',bar).forEach(b=>{if(!b.dataset.v57tab&&ACTION_RX.test(b.textContent.trim()))b.classList.add('v62-page-action')});
}
function decorate62(){version62();promoteReferenceAdd62();promoteMeetingStart62();hideDuplicateEditorControls62();classifyLegacyActions62();normalizeToolbar62()}
let busy=false;/* v0.67 legacy body observer disabled */
setTimeout(decorate62,80);
})();
