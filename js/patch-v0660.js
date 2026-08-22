/* B7 FI Command Center v0.66.0 — final shared-shell framework stabilization */
(function(){
'use strict';
window.VERSION='0.66.0';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const COLORS={home:['#176FA8','23,111,168','OPERATIONS CENTER'],tool:['#8E5AE8','142,90,232','TOOL CENTER'],shipping:['#27AE60','39,174,96','SHIPPING CENTER'],priority:['#D4A72C','212,167,44','PRIORITY CENTER'],status:['#F28C28','242,140,40','STATUS CENTER'],meeting:['#19B9D1','25,185,209','MEETING CENTER'],action:['#E54848','229,72,72','ACTION CENTER'],reference:['#E94A9A','233,74,154','REFERENCE CENTER'],search:['#4F6BFF','79,107,255','SEARCH CENTER'],admin:['#A6AFBC','166,175,188','ADMINISTRATION CENTER']};

function center(){return document.body.dataset.center||'home'}
function applyTheme(){
  const c=COLORS[center()]||COLORS.home;
  ['--center-color','--accent','--page-accent','--fleet-accent','--live-page-accent'].forEach(v=>{document.documentElement.style.setProperty(v,c[0]);document.body.style.setProperty(v,c[0])});
  ['--center-rgb','--accent-rgb','--page-accent-rgb','--fleet-rgb','--live-page-rgb'].forEach(v=>{document.documentElement.style.setProperty(v,c[1]);document.body.style.setProperty(v,c[1])});
  const title=$('#headerPageTitle'); if(title) title.textContent=c[2];
  const ver=$('#appVersionLabel'); if(ver) ver.textContent='B7 FI COMMAND CENTER v0.66.0';
  $$('.main-nav .nav-btn').forEach(b=>{
    const map={home:'home',toolcenter:'tool',shipping:'shipping',priorities:'priority',statuscenter:'status',meetingcenter:'meeting',actions:'action',referencecenter:'reference',searchcenter:'search'};
    b.classList.toggle('active',map[b.dataset.view]===center());
  });
}

function screenshot(){
  try{ if(typeof window.enterScreenshot==='function') return window.enterScreenshot(); }catch(e){}
  document.body.classList.add('screenshot-mode'); const x=$('#screenshotExit'); if(x)x.style.display='block';
}
function btn(label,fn,cls=''){
  const b=document.createElement('button'); b.type='button'; b.className='btn '+cls; b.textContent=label; b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();fn&&fn()}); return b;
}

/* ACTION STATUS gets its own permanent label without mutating the ticker itself. */
function actionStatusLabel(){
  const stack=$('.header-status-stack'), top=$('#topActionBar'); if(!stack||!top)return;
  let label=$('#v66ActionStatusLabel');
  if(!label){label=document.createElement('div');label.id='v66ActionStatusLabel';label.className='v66-action-status-label';label.innerHTML='<strong>ACTION STATUS</strong>';stack.insertBefore(label,top)}
}

/* Operations Center now keeps the same secondary-bar geometry as every other Center. */
function homeToolbar(){
  const bar=$('#floatingActions'); if(!bar)return;
  if(center()!=='home')return;
  bar.style.display='flex';
  if(!bar.dataset.v66home){
    bar.innerHTML='';
    const overview=btn('OVERVIEW',()=>window.setView('home'),'primary v66-page-nav'); overview.dataset.v57tab='overview';
    bar.append(overview,btn('SCREENSHOT',screenshot,'v66-page-action v66-first-action'),btn('REPORT',()=>window.print(),'v66-page-action'));
    bar.dataset.v66home='1';
  }
}

/* Ensure every page toolbar is the top click layer and normalise left-nav/right-action geometry. */
function toolbar(){
  const bar=$('#floatingActions'); if(!bar)return;
  if(center()==='home')homeToolbar();
  bar.style.pointerEvents='auto'; bar.style.display='flex';
  $$(':scope > button',bar).forEach(b=>{b.disabled=false;b.style.pointerEvents='auto';b.style.textTransform='uppercase';b.style.position='relative';b.style.zIndex='2002'});
  if(document.body.classList.contains('v61-focused-editor')){
    const buttons=$$(':scope > button',bar); const cancel=buttons.find(b=>/^CANCEL$/i.test(b.textContent||'')); const save=buttons.find(b=>/^SAVE CHANGES$/i.test(b.textContent||''));
    buttons.forEach(b=>b.classList.remove('v66-page-nav','v66-page-action','v66-first-action'));
    if(cancel){cancel.classList.add('v66-page-action','v66-first-action');bar.appendChild(cancel)}
    if(save){save.classList.add('v66-page-action');bar.appendChild(save)}
    return;
  }
  const all=$$(':scope > button',bar);
  let shot=all.find(b=>/^SCREENSHOT$/i.test((b.textContent||'').trim()));
  let report=all.find(b=>/^REPORT$/i.test((b.textContent||'').trim()));
  if(!shot){shot=btn('SCREENSHOT',screenshot,'v66-page-action');bar.appendChild(shot)}
  if(!report){report=btn('REPORT',()=>window.print(),'v66-page-action');bar.appendChild(report)}
  const now=$$(':scope > button',bar);
  now.forEach(b=>b.classList.remove('v66-page-nav','v66-page-action','v66-first-action'));
  const nav=now.filter(b=>b.dataset.v57tab), actions=now.filter(b=>!b.dataset.v57tab);
  nav.forEach(b=>b.classList.add('v66-page-nav')); actions.forEach(b=>b.classList.add('v66-page-action'));
  const others=actions.filter(b=>b!==shot&&b!==report);
  [...nav,...others,shot,report].filter(Boolean).forEach(b=>bar.appendChild(b));
  const first=others[0]||shot||report; if(first)first.classList.add('v66-first-action');
}

/* Footer mirrors the header: admin/system on left, KLA in the center, deployment state on right. */
function footer(){
  const f=$('footer.v57-footer');if(!f)return;
  if(!f.dataset.v66){
    f.innerHTML=`
      <div class="v66-footer-left">
        <button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button>
        <strong id="appVersionLabel">B7 FI COMMAND CENTER v0.66.0</strong>
      </div>
      <div class="v66-footer-center"><img src="assets/kla-plus-official.png" alt="KLA+" class="v66-footer-kla"></div>
      <div class="v66-footer-right">
        <div><b>COMMAND CENTER</b> <span id="opsSync">Local Production Mode · SharePoint live sync pending</span></div>
        <div>Building 7 · Final Integration · Operations</div>
      </div>`;
    f.dataset.v66='1';
  }
  const a=$('#administrationCenterFooter'); if(a)a.onclick=()=>window.setView('admincenter');
}

/* Keep Search Center simple until category filters are genuinely implemented. */
function searchCleanup(){
  if(center()!=='search')return;
  const bar=$('#floatingActions'); if(bar)$$(':scope > button',bar).forEach(b=>{if(/^ALL RESULTS$/i.test((b.textContent||'').trim()))b.remove()});
}

function shell(){
  applyTheme(); actionStatusLabel(); footer(); searchCleanup(); toolbar();
  $$('.main-nav .nav-btn,#floatingActions button').forEach(b=>b.style.textTransform='uppercase');
  const h=$('#headerPageTitle');if(h)h.style.textTransform='uppercase';
}
let busy=false;
/* v0.67: legacy body observer disabled */
setTimeout(shell,220);
})();
