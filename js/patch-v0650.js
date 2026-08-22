/* B7 FI Command Center v0.65.0 — status/footer architecture + toolbar reliability */
(function(){
'use strict';
window.VERSION='0.65.0';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const COLORS={home:['#176FA8','23,111,168'],tool:['#8E5AE8','142,90,232'],shipping:['#27AE60','39,174,96'],priority:['#D4A72C','212,167,44'],status:['#F28C28','242,140,40'],meeting:['#19B9D1','25,185,209'],action:['#E54848','229,72,72'],reference:['#E94A9A','233,74,154'],search:['#4F6BFF','79,107,255'],admin:['#A6AFBC','166,175,188']};

function currentCenter(){return document.body.dataset.center||'home'}
function theme(){
  const c=COLORS[currentCenter()]||COLORS.home;
  ['--center-color','--accent','--page-accent','--fleet-accent','--live-page-accent'].forEach(v=>{document.documentElement.style.setProperty(v,c[0]);document.body.style.setProperty(v,c[0])});
  ['--center-rgb','--accent-rgb','--page-accent-rgb','--fleet-rgb','--live-page-rgb'].forEach(v=>{document.documentElement.style.setProperty(v,c[1]);document.body.style.setProperty(v,c[1])});
  const v=$('#appVersionLabel');if(v)v.textContent='B7 FI COMMAND CENTER v0.65.0';
}
function screenshot(){
  try{if(typeof window.enterScreenshot==='function')return window.enterScreenshot()}catch(e){}
  document.body.classList.add('screenshot-mode');const x=$('#screenshotExit');if(x)x.style.display='block';
}
function make(label,fn,cls=''){
  const b=document.createElement('button');b.type='button';b.className='btn '+cls;b.textContent=label;b.dataset.worktab='page-action';b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();fn&&fn()});return b;
}

/* Bottom bar is now operational only: Fleet Status. System/admin state belongs in footer. */
function rebuildFleetBar(){
  const bar=$('#operationsBar');if(!bar)return;
  if(!bar.dataset.v65){
    const tickerText=$('#opsTickerText'); const task=$('#opsTaskCount'); const presence=$('#opsPresence');
    const ticker=tickerText?tickerText.textContent:'Loading fleet status…';
    const tasks=task?task.textContent:'0 open actions';
    const pres=presence?presence.textContent:'Context: fleet overview';
    bar.innerHTML=`<div class="v65-fleet-label"><b>FLEET STATUS</b></div><div class="ops-ticker v65-fleet-ticker"><span id="opsTickerText">${ticker}</span></div><div class="ops-summary v65-fleet-summary"><span id="opsTaskCount">${tasks}</span><span class="ops-divider">•</span><span id="opsPresence">${pres}</span></div>`;
    bar.dataset.v65='1';
  }
}

/* Footer is reserved for system / administration information. */
function rebuildFooter(){
  const f=$('footer.v57-footer');if(!f)return;
  if(!f.dataset.v65){
    f.innerHTML=`<div class="v65-footer-version"><strong id="appVersionLabel">B7 FI COMMAND CENTER v0.65.0</strong></div>
      <div class="v65-footer-admin"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div>
      <div class="v65-footer-system"><span class="ops-live-dot"></span><b>COMMAND CENTER</b><span id="opsSync">Local Production Mode · SharePoint live sync pending</span></div>
      <div class="v65-footer-location">Building 7 · Final Integration · Operations</div>`;
    f.dataset.v65='1';
    const a=$('#administrationCenterFooter');if(a)a.onclick=()=>window.setView('admincenter');
  }
}

function normalizeSearch(){
  if(currentCenter()!=='search')return;
  const title=$('#headerPageTitle');if(title)title.textContent='SEARCH CENTER';
  $$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='searchcenter'));
  const bar=$('#floatingActions');if(!bar)return;
  $$(':scope > button',bar).forEach(b=>{if(/^ALL RESULTS$/i.test((b.textContent||'').trim()))b.remove()});
}

/* Repair sticky page controls. Keep native handlers, but make the bar the top click layer. */
function toolbar(){
  const bar=$('#floatingActions');if(!bar)return;
  bar.style.pointerEvents='auto';
  $$(':scope > button',bar).forEach(b=>{
    b.disabled=false;b.style.pointerEvents='auto';b.style.textTransform='uppercase';b.dataset.worktab=b.dataset.worktab||'page-action';
  });
  if(currentCenter()==='home'){bar.style.display='none';return}
  bar.style.display='flex';
  if(document.body.classList.contains('v61-focused-editor')) return;
  if(!$$(':scope > button',bar).some(b=>/^SCREENSHOT$/i.test((b.textContent||'').trim())))bar.appendChild(make('SCREENSHOT',screenshot,'v65-action'));
  if(!$$(':scope > button',bar).some(b=>/^REPORT$/i.test((b.textContent||'').trim())))bar.appendChild(make('REPORT',()=>window.print(),'v65-action'));
  const all=$$(':scope > button',bar);
  all.forEach(b=>b.classList.remove('v65-nav','v65-action','v65-first-action'));
  const nav=all.filter(b=>b.dataset.v57tab), acts=all.filter(b=>!b.dataset.v57tab);
  nav.forEach(b=>b.classList.add('v65-nav'));acts.forEach(b=>b.classList.add('v65-action'));
  const shot=acts.find(b=>/^SCREENSHOT$/i.test((b.textContent||'').trim())), rep=acts.find(b=>/^REPORT$/i.test((b.textContent||'').trim()));
  const other=acts.filter(b=>b!==shot&&b!==rep);
  [...nav,...other,shot,rep].filter(Boolean).forEach(b=>bar.appendChild(b));
  const first=other[0]||shot||rep;if(first)first.classList.add('v65-first-action');
}

/* Meeting Center: sticky START NEW MEETING is the only page-level start control. */
function meeting(){
  if(currentCenter()!=='meeting'||document.body.classList.contains('v61-focused-editor'))return;
  const bar=$('#floatingActions');if(!bar)return;
  $$(':scope > button',bar).forEach(b=>{if(/START MEETING/i.test(b.textContent||''))b.textContent='START NEW MEETING'});
  const start=$('#app .start-now51');if(start)start.remove();
}

function shell(){theme();rebuildFleetBar();rebuildFooter();normalizeSearch();meeting();toolbar();
  $$('.main-nav .nav-btn,#floatingActions button').forEach(b=>b.style.textTransform='uppercase');
  const h=$('#headerPageTitle');if(h)h.style.textTransform='uppercase';
}
let busy=false;
new MutationObserver(()=>{if(busy)return;busy=true;requestAnimationFrame(()=>{busy=false;shell()})}).observe(document.body,{subtree:true,childList:true});
setTimeout(shell,120);
})();
