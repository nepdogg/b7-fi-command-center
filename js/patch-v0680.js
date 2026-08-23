/* B7 FI Command Center v0.68.0 — status beacons + universal reference access */
(function(){
'use strict'; window.VERSION='0.68.0';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
let localRefUrl=null;
function severityFromAction(){const c=$('#topActionCurrent'); if(!c)return 'normal'; const t=(c.className+' '+c.textContent).toLowerCase(); if(t.includes('critical'))return 'critical';if(t.includes('attention'))return 'attention';if(t.includes('reminder')||t.includes('next action'))return 'reminder';if(t.includes('information'))return 'information';return 'normal'}
function fleetSeverity(){const t=($('#opsTickerText')?.textContent||'').toLowerCase();if(/blocked|behind [4-9]|behind [1-9][0-9]|critical/.test(t))return 'critical';if(/behind|overdue/.test(t))return 'attention';if(/at risk|risk/.test(t))return 'reminder';if(/ahead/.test(t))return 'information';if(/on schedule|complete|shipped/.test(t))return 'good';return 'normal'}
function paintBeacons(){const a=$('#v66ActionStatusLabel');if(a){a.dataset.status=severityFromAction();a.innerHTML='<span class="v68-lamp" aria-hidden="true"></span><strong>ACTION STATUS</strong>'}const f=$('.v65-fleet-label');if(f){f.dataset.status=fleetSeverity();f.innerHTML='<span class="v68-lamp" aria-hidden="true"></span><b>FLEET STATUS</b>'}}
function compactAction(){const all=$('#topActionAll');if(all)all.remove();const cur=$('#topActionCurrent');if(!cur)return;const count=$('.top-action-count',cur),open=$('.top-action-open',cur);if(count&&open){let m=(count.textContent||'').match(/(\d+)\s*\/\s*(\d+)/);if(m){open.textContent=`← OPEN ${m[1]} OF ${m[2]}`;count.remove()}}}
function universalReference(){if(document.body.dataset.center!=='reference')return;const bar=$('#floatingActions');if(!bar)return;const filesBtn=$$('[data-v57tab]',bar).find(b=>/REFERENCE FILES/i.test(b.textContent||''));if(!filesBtn||!filesBtn.classList.contains('primary'))return;
 const app=$('#app');if(!app||app.dataset.v68Universal==='1')return;app.dataset.v68Universal='1';
 app.innerHTML=`<section class="v68-file-access"><div class="v68-file-card"><div class="v68-file-title">FILE ACCESS</div><div class="v68-file-sub">Open a shared/network/SharePoint file by URL or select a file from this computer.</div><div class="v68-url-row"><input id="v68FileUrl" type="text" placeholder="Paste file, SharePoint, or network URL…" autocomplete="off"><button id="v68OpenUrl" class="btn primary">OPEN URL</button></div><div class="v68-or">OR</div><label class="btn primary v68-local-btn">SELECT LOCAL FILE<input id="v68LocalFile" type="file" hidden></label><div id="v68CurrentFile" class="v68-current" hidden><span class="v68-current-label">CURRENT FILE</span><strong id="v68CurrentName"></strong><div><button id="v68OpenCurrent" class="btn">OPEN / VIEW</button><button id="v68ChangeFile" class="btn">CHANGE FILE</button><button id="v68CloseFile" class="btn">CLOSE</button></div></div></div></section>`;
 const url=$('#v68FileUrl'), input=$('#v68LocalFile'), current=$('#v68CurrentFile'),name=$('#v68CurrentName');let target='';
 function show(n,u){target=u;name.textContent=n;current.hidden=false}
 $('#v68OpenUrl').onclick=()=>{let u=url.value.trim();if(!u)return; if(!/^[a-z][a-z0-9+.-]*:/i.test(u)&&!u.startsWith('\\\\'))u='https://'+u;show(u,u);window.open(u,'_blank','noopener')};
 input.onchange=()=>{let f=input.files&&input.files[0];if(!f)return;if(localRefUrl)URL.revokeObjectURL(localRefUrl);localRefUrl=URL.createObjectURL(f);show(f.name,localRefUrl)};
 $('#v68OpenCurrent').onclick=()=>target&&window.open(target,'_blank');$('#v68ChangeFile').onclick=()=>input.click();$('#v68CloseFile').onclick=()=>{if(localRefUrl){URL.revokeObjectURL(localRefUrl);localRefUrl=null}target='';input.value='';url.value='';current.hidden=true};
}
function footer(){const v=$('#appVersionLabel');if(v)v.textContent='B7 FI COMMAND CENTER v0.68.0';const r=$('.v66-footer-right');if(r){const b=$('b',r);if(b&&/COMMAND CENTER/i.test(b.textContent))b.remove()}}
function stabilize(){compactAction();paintBeacons();universalReference();footer()}
// v0.80.1 performance: legacy continuous observers/painter removed; later framework owns status bars.
setTimeout(stabilize,300);
})();
