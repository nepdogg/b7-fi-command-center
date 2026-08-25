/* B7 FI Command Center v0.55.0 — Operations Center Simplification */
(function(){
'use strict';
window.VERSION='0.55.0';

function removeAdminNav(){
  document.querySelectorAll('.main-nav .admin-nav,[data-view="admincenter"].nav-btn').forEach(el=>el.remove());
}
function ensureFooterAdmin(){
  const foot=document.querySelector('body > footer'); if(!foot)return;
  let b=document.getElementById('footerAdminCenter550');
  if(!b){
    b=document.createElement('button'); b.id='footerAdminCenter550'; b.className='footer-admin550';
    b.textContent='ADMINISTRATION CENTER'; b.onclick=()=>window.setView('admincenter');
    const first=foot.firstElementChild; if(first) first.insertAdjacentElement('afterend',b); else foot.appendChild(b);
  }
}
function isHome(){return document.body.dataset.theme==='home';}
function simplifyHome(){
  if(!isHome())return;
  document.body.classList.add('operations-home550');
  // The Operations Center live cards ARE its navigation; no secondary Page Actions bar.
  const toolbar=document.getElementById('floatingActions'); if(toolbar){toolbar.innerHTML='';toolbar.style.display='none';}
  const grid=document.querySelector('.home500 .home-grid500,.home-grid500'); if(!grid)return;
  const cards=[
   ['toolcenter','TOOL COUNTDOWN','Current-quarter fleet · shipped · remaining · waiting · packing','OPEN TOOL CENTER →'],
   ['actions','ACTION CENTER','Tasks · assignments · alerts · status-bar actions','OPEN ACTION CENTER →'],
   ['shipping','SHIPPING CENTER','Packing · physical handoffs · shipping readiness','OPEN SHIPPING CENTER →'],
   ['priorities','PRIORITY CENTER','Weekday · weekend · team priorities','OPEN PRIORITY CENTER →'],
   ['statuscenter','STATUS CENTER','Morning status · leads extra status','OPEN STATUS CENTER →'],
   ['meetingcenter','MEETING CENTER','Meetings · notes · actions · history','OPEN MEETING CENTER →'],
   ['referencecenter','REFERENCE CENTER','FI knowledge · procedures · reference files','OPEN REFERENCE CENTER →'],
   ['admin-wall','WALLBOARD','Launch the live operations display','OPEN WALLBOARD →'],
   ['admin-data','DATA & BACKUP','Backup · shared data · synchronization controls','OPEN DATA & BACKUP →']
  ];
  grid.innerHTML=cards.map(c=>`<button class="home-card500 cc-live-card512 home-card540 home-card550" data-dest550="${c[0]}"><span>${c[1]}</span><strong>${c[2]}</strong><b>${c[3]}</b></button>`).join('');
  grid.querySelectorAll('[data-dest550]').forEach(b=>b.onclick=()=>{
    const d=b.dataset.dest550;
    if(d==='admin-wall'){window.setView('admincenter');setTimeout(()=>{document.querySelector('[data-tab="wallboard"]')?.click()},20);}
    else if(d==='admin-data'){window.setView('admincenter');setTimeout(()=>{document.querySelector('[data-tab="data"]')?.click()},20);}
    else window.setView(d);
  });
  // Remove all passive/static KPI blocks from prior versions.
  document.querySelectorAll('.home500 .home-hero500,.home500 .home-kpis500,.home500 .summary-grid500,.home500 .metric-grid').forEach(e=>e.remove());
}
function restoreToolbarOffHome(){
  if(isHome())return;
  document.body.classList.remove('operations-home550');
  const toolbar=document.getElementById('floatingActions'); if(toolbar)toolbar.style.display='';
}
function chrome(){
  removeAdminNav(); ensureFooterAdmin();
  const ver=document.getElementById('appVersionLabel'); if(ver)ver.textContent='B7 FI Command Center v0.55.0';
  if(isHome())simplifyHome(); else restoreToolbarOffHome();
}
const priorSet=window.setView;
window.setView=function(v){
  const r=priorSet(v);
  setTimeout(chrome,0); setTimeout(chrome,80);
  return r;
};
removeAdminNav();ensureFooterAdmin();
const observer=new MutationObserver(()=>{clearTimeout(window.__cc550);window.__cc550=setTimeout(chrome,0)});
observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['data-theme']});
setTimeout(chrome,100);
})();
