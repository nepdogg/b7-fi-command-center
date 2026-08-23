/* B7 FI Command Center v0.80.1 — final framework polish. No observers or recurring timers. */
(function(){
'use strict'; window.VERSION='0.80.1'; const $=(s,r=document)=>r.querySelector(s);
function footer(){const f=$('footer.v57-footer'),app=$('main#app');if(!f||!app)return;if(f.previousElementSibling!==app)app.insertAdjacentElement('afterend',f);f.innerHTML=`<div class="v80-footer-left"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div><div class="v80-footer-center"><img src="assets/kla-plus-official.png" alt="KLA+"></div><div class="v80-footer-right"><div class="v80-footer-mode">Local Production Mode · SharePoint live sync pending</div><div id="appVersionLabel" class="v80-footer-version">B7 FI COMMAND CENTER V0.80.1</div></div>`;const b=$('#administrationCenterFooter');if(b&&!b.dataset.v80){b.dataset.v80='1';b.onclick=()=>{const n=document.querySelector('[data-view="admincenter"],[data-view="admin"]');if(n)n.click();else if(typeof window.setView==='function')window.setView('admincenter')}}}
function labels(){const a=$('#topActionBar .v72-beacon-title'),s=$('#operationsBar .v72-beacon-title');if(a)a.textContent='LEAD ALERTS';if(s)s.textContent='SYSTEM STATUS'}
function liveCard(){document.querySelectorAll('.v57-live-card').forEach(b=>{const title=b.querySelector('span');if(!title)return;if(/^WALLBOARD$/i.test(title.textContent.trim())){title.textContent='LIVE STATUS CENTER';const strong=b.querySelector('strong');const open=b.querySelector('b');if(strong)strong.textContent='Live B7 FI operational status display';if(open)open.textContent='OPEN LIVE STATUS CENTER →';}})}
function run(){footer();labels();liveCard()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
setTimeout(run,180);setTimeout(run,760);setTimeout(run,1600);
document.addEventListener('click',e=>{if(e.target.closest('.nav-btn'))setTimeout(liveCard,40)});
})();
