/* B7 FI Command Center v0.80.33 — Framework Lock */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'0.80.33';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const viewToCenter={home:'operations',toolcenter:'tool',shipping:'shipping',priorities:'priority',statuscenter:'status',meetingcenter:'meeting',actions:'action',referencecenter:'reference',searchcenter:'search',admincenter:'admin'};
const centerToView={operations:'home',tool:'toolcenter',shipping:'shipping',priority:'priorities',status:'statuscenter',meeting:'meetingcenter',action:'actions',reference:'referencecenter',search:'searchcenter',admin:'admincenter'};
let localObjectUrl='';
function label(b){return (b?.textContent||'').trim().replace(/^\+\s*/,'').toUpperCase()}
function isActionLabel(t){return /^(EDIT|UPDATE|ADD|START|SCREENSHOT|REPORT|CANCEL|SAVE|OPEN|REFRESH|REPLACE|CHANGE|CLOSE)/.test(t)}
function fleetKind(){const t=($('#opsTickerText')?.textContent||'').toLowerCase();if(/blocked|critical|behind\s+(?:[4-9]|\d{2,})/.test(t))return 'critical';if(/behind|overdue/.test(t))return 'attention';if(/at risk|risk/.test(t))return 'reminder';if(/ahead/.test(t))return 'information';if(/on schedule|complete|shipped/.test(t))return 'good';return 'normal'}
function paintFleet(){const l=$('.v65-fleet-label');if(!l)return;l.dataset.status=fleetKind();if(!$('.v70-fleet-lamp',l))l.insertAdjacentHTML('afterbegin','<span class="v70-fleet-lamp" aria-hidden="true"></span>');}
function ensureVersion(){const v=$('#appVersionLabel');if(v)v.textContent='B7 FI COMMAND CENTER v0.79.0';const r=$('.v66-footer-right');if(r){$$('b',r).forEach(b=>{if(/COMMAND CENTER/i.test(b.textContent||''))b.remove()})}}
function removeBodyDuplicates(){
 const c=document.body.dataset.center||'';
 if(c==='meeting')$$('#app .start-now51').forEach(x=>x.remove());
 if(c==='reference')$$('#app button').forEach(b=>{if(/^ADD REFERENCE NOTE$/i.test(label(b)))b.style.display='none'});
 if(c==='status')$$('#app button').forEach(b=>{if(/RESET TOOL TYPE\s*\/\s*SERIAL ORDER/i.test(b.textContent||''))b.remove()});
}
function toolbarRules(){
 const bar=$('#floatingActions');if(!bar)return;
 let buttons=$$(':scope > button',bar);
 // Never allow legacy Operations fillers.
 buttons.forEach(b=>{if(/^(OVERVIEW|PAGE ACTIONS)$/i.test(label(b)))b.remove()});
 buttons=$$(':scope > button',bar);
 const c=document.body.dataset.center||'';
 // Reference Center has exactly two local destinations. Keep existing handlers by renaming/removing only.
 if(c==='reference'){
   buttons.forEach(b=>{
     let t=label(b);
     if(t==='FI KNOWLEDGE BASE')b.textContent='FI KNOWLEDGE';
     t=label(b);
     const keep=/^(FI KNOWLEDGE|REFERENCE FILES|ADD REFERENCE NOTE|SCREENSHOT|REPORT)$/.test(t);
     if(!keep)b.remove();
   });
   buttons=$$(':scope > button',bar);
   const refFiles=buttons.find(b=>label(b)==='REFERENCE FILES');
   const filesActive=!!refFiles?.classList.contains('primary');
   buttons.forEach(b=>{if(filesActive&&label(b)==='ADD REFERENCE NOTE')b.remove()});
 }
 if(c==='search')buttons.forEach(b=>{if(label(b)==='ALL RESULTS')b.remove()});
 if(c==='home')buttons.forEach(b=>{if(label(b)!=='SCREENSHOT'&&label(b)!=='REPORT')b.remove()});
 buttons=$$(':scope > button',bar);
 // Classify without replacing nodes so original click handlers remain intact.
 buttons.forEach(b=>{b.classList.remove('v70-page-nav','v70-page-action','v70-first-action');b.disabled=false;b.style.pointerEvents='auto';let t=label(b);let nav=!!b.dataset.v57tab;
   if(c==='tool'&&/^(CY26Q3 TOOLS|TOOL ARCHIVE)$/.test(t))nav=true;
   if(c==='priority'&&/^(WEEKDAY|WEEKEND)$/.test(t))nav=true;
   if(c==='status'&&/^(WEEKDAY MORNING STATUS|MORNING STATUS|LEADS EXTRA STATUS|WEEKEND MORNING STATUS)$/.test(t))nav=true;
   if(c==='reference'&&/^(FI KNOWLEDGE|REFERENCE FILES)$/.test(t))nav=true;
   if(c==='action'&&/^(ALL(?:\s+\d+)?|CRITICAL(?:\s+\d+)?|ATTENTION(?:\s+\d+)?|REMINDERS?(?:\s+\d+)?|INFORMATION(?:\s+\d+)?)$/.test(t))nav=true;
   if(isActionLabel(t)&&!/^OPEN\s/.test(t))nav=false;
   b.classList.add(nav?'v70-page-nav':'v70-page-action');
 });
 const nav=buttons.filter(b=>b.classList.contains('v70-page-nav'));
 const acts=buttons.filter(b=>b.classList.contains('v70-page-action'));
 // Keep screenshot/report final; all other actions immediately before them.
 const shot=acts.find(b=>label(b)==='SCREENSHOT'), rep=acts.find(b=>label(b)==='REPORT');
 const other=acts.filter(b=>b!==shot&&b!==rep);
 [...nav,...other,shot,rep].filter(Boolean).forEach(b=>bar.appendChild(b));
 const first=other[0]||shot||rep;if(first)first.classList.add('v70-first-action');
}
function universalReference(){
 if((document.body.dataset.center||'')!=='reference')return;
 const bar=$('#floatingActions');if(!bar)return;
 const files=$$(':scope > button',bar).find(b=>label(b)==='REFERENCE FILES');
 if(!files||!files.classList.contains('primary'))return;
 const app=$('#app');if(!app||app.dataset.v70Universal==='1')return;app.dataset.v70Universal='1';
 app.innerHTML=`<section class="v70-file-access"><div class="v70-file-card"><div class="v70-file-title">FILE ACCESS</div><div class="v70-file-sub">Open one reference file from a URL or this computer.</div><div class="v70-url-row"><input id="v70FileUrl" type="text" placeholder="Paste file, SharePoint, or network URL…" autocomplete="off"><button id="v70OpenUrl" class="btn primary">OPEN URL</button></div><div class="v70-or">OR</div><label class="btn primary v70-local-btn">SELECT LOCAL FILE<input id="v70LocalFile" type="file" hidden></label><div id="v70Current" class="v70-current" hidden><span class="v70-current-label">CURRENT FILE</span><strong id="v70CurrentName"></strong><div><button id="v70OpenCurrent" class="btn">OPEN / VIEW</button><button id="v70ChangeFile" class="btn">CHANGE FILE</button><button id="v70CloseFile" class="btn">CLOSE</button></div><div id="v70Preview" class="v70-preview"><div class="v70-preview-note">Select a local file or enter a URL.</div></div></div></div></section>`;
 const url=$('#v70FileUrl'), inp=$('#v70LocalFile'), cur=$('#v70Current'), nm=$('#v70CurrentName'), prev=$('#v70Preview');let target='';
 function show(name,u){target=u;nm.textContent=name;cur.hidden=false}
 function previewLocal(f,u){prev.innerHTML='';const ext=(f.name.split('.').pop()||'').toLowerCase();if(f.type.startsWith('image/')){const im=document.createElement('img');im.src=u;prev.appendChild(im);return}if(f.type==='application/pdf'||ext==='pdf'){const fr=document.createElement('iframe');fr.src=u;fr.title=f.name;prev.appendChild(fr);return}if(f.type.startsWith('text/')||['txt','csv','log','json','xml','md'].includes(ext)){const rd=new FileReader();rd.onload=()=>{const pre=document.createElement('pre');pre.textContent=String(rd.result||'');prev.replaceChildren(pre)};rd.readAsText(f);return}prev.innerHTML='<div class="v70-preview-note">Inline preview is not available for this file type in the static browser build. Use OPEN / VIEW to open the original file.</div>'}
 $('#v70OpenUrl').onclick=()=>{let u=url.value.trim();if(!u)return;if(!/^[a-z][a-z0-9+.-]*:/i.test(u)&&!u.startsWith('\\\\'))u='https://'+u;show(u,u);prev.innerHTML='<div class="v70-preview-note">URL loaded. Browser/SharePoint security may require OPEN / VIEW for the original file.</div>'};
 inp.onchange=()=>{const f=inp.files&&inp.files[0];if(!f)return;if(localObjectUrl)URL.revokeObjectURL(localObjectUrl);localObjectUrl=URL.createObjectURL(f);show(f.name,localObjectUrl);previewLocal(f,localObjectUrl)};
 $('#v70OpenCurrent').onclick=()=>target&&window.open(target,'_blank','noopener');$('#v70ChangeFile').onclick=()=>inp.click();$('#v70CloseFile').onclick=()=>{if(localObjectUrl){URL.revokeObjectURL(localObjectUrl);localObjectUrl=''}target='';inp.value='';url.value='';cur.hidden=true;prev.innerHTML=''};
}
function syncUrl(view){try{const u=new URL(location.href);const c=viewToCenter[view]||'operations';u.searchParams.set('center',c);history.replaceState({center:c},'',u)}catch(e){}}
function restoreUrl(){try{const c=new URL(location.href).searchParams.get('center');const v=centerToView[c];if(v&&typeof window.setView==='function')window.setView(v)}catch(e){}}
function stabilize(){toolbarRules();removeBodyDuplicates();paintFleet();ensureVersion();universalReference()}
// Wrap setView once: URL becomes refresh-safe and framework normalization follows every Center change.
const prior=window.setView;if(typeof prior==='function'){window.setView=function(v){const r=prior(v);syncUrl(v);setTimeout(stabilize,0);setTimeout(stabilize,80);return r}}
// Main navigation always uses the wrapped router.
$$('.main-nav .nav-btn').forEach(b=>{b.onclick=()=>window.setView(b.dataset.view)});
// v0.80.1 performance: legacy continuous observers/painter removed.
setTimeout(()=>{restoreUrl();stabilize()},360);
})();
