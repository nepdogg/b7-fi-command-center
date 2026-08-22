/* B7 FI Command Center v0.63.0 — navigation reliability / global chrome / status workflow */
(function(){
'use strict';
window.VERSION='0.63.0';
const C={home:['#176FA8','23,111,168'],tool:['#8E5AE8','142,90,232'],shipping:['#27AE60','39,174,96'],priority:['#D4A72C','212,167,44'],status:['#F28C28','242,140,40'],meeting:['#19B9D1','25,185,209'],action:['#E54848','229,72,72'],reference:['#E94A9A','233,74,154'],admin:['#A6AFBC','166,175,188']};
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
function center(){return document.body.dataset.center||'home'}
function hardTheme(){
 const k=center(),c=C[k]||C.home;
 document.documentElement.style.setProperty('--center-color',c[0]);document.documentElement.style.setProperty('--center-rgb',c[1]);
 ['--accent','--page-accent','--fleet-accent','--live-page-accent'].forEach(v=>document.documentElement.style.setProperty(v,c[0]));
 ['--accent-rgb','--page-accent-rgb','--fleet-rgb','--live-page-rgb'].forEach(v=>document.documentElement.style.setProperty(v,c[1]));
 document.body.style.setProperty('--center-color',c[0]);document.body.style.setProperty('--center-rgb',c[1]);
 const ob=$('#operationsBar'),ft=$('footer.v57-footer'); if(ob){ob.style.setProperty('border-color',c[0],'important')} if(ft){ft.style.setProperty('border-color',c[0],'important')}
 const v=$('#appVersionLabel');if(v)v.textContent='B7 FI Command Center v0.63.0';
}
function btn(label,fn,primary=false,cls=''){
 const b=document.createElement('button');b.className='btn '+cls+(primary?' primary':'');b.textContent=label;b.dataset.worktab='page-action';b.onclick=fn;return b;
}
function screenshot(){try{ if(typeof window.enterScreenshot==='function')window.enterScreenshot(); else {document.body.classList.add('screenshot-mode');const x=$('#screenshotExit');if(x)x.style.display='block'} }catch(e){document.body.classList.add('screenshot-mode')}}
function ensureGlobalActions(){
 const bar=$('#floatingActions');if(!bar)return;
 // Mark every page-bar control as application navigation/action so Read Only mode never swallows it.
 $$(':scope > button',bar).forEach(b=>{b.dataset.worktab=b.dataset.worktab||'page-action';b.style.pointerEvents='auto'});
 if(!$$(':scope > button',bar).some(b=>/SCREENSHOT/i.test(b.textContent))) bar.appendChild(btn('SCREENSHOT',screenshot,false,'v63-screenshot v62-page-action'));
 if(!$$(':scope > button',bar).some(b=>/^REPORT$/i.test(b.textContent))){
   bar.appendChild(btn('REPORT',()=>window.print(),false,'v57-report-btn v62-page-action'));
 }
 // Nav left, actions right. Screenshot and Report are always the final two normal-page actions.
 const all=$$(':scope > button',bar);
 all.forEach(b=>{b.classList.remove('v63-nav','v63-action','v63-first-action'); if(b.dataset.v57tab)b.classList.add('v63-nav'); else b.classList.add('v63-action')});
 const nav=all.filter(b=>b.classList.contains('v63-nav')), act=all.filter(b=>b.classList.contains('v63-action'));
 [...nav,...act].forEach(b=>bar.appendChild(b));
 if(act.length)act[0].classList.add('v63-first-action');
 const shot=act.find(b=>/SCREENSHOT/i.test(b.textContent)),report=act.find(b=>/^REPORT$/i.test(b.textContent)); if(shot)bar.appendChild(shot);if(report)bar.appendChild(report);
 // Editors end CANCEL | SAVE CHANGES; screenshot/report are not needed inside a focused editor.
 if(document.body.classList.contains('v61-focused-editor')){
   if(shot)shot.remove();if(report)report.remove();
   const a=$$(':scope > button',bar),can=a.find(b=>/^CANCEL$/i.test(b.textContent)),save=a.find(b=>/^SAVE CHANGES$/i.test(b.textContent));
   if(can&&save){bar.append(can,save);can.classList.add('v63-first-action')}
 }
}
function statusBar(){
 if(center()!=='status'||document.body.classList.contains('v61-focused-editor'))return;
 const bar=$('#floatingActions');if(!bar)return;
 // Capture the working handlers before rebuilding the bar.
 const old=$$(':scope > button',bar);
 const morning=old.find(b=>/^(MORNING STATUS|WEEKDAY MORNING STATUS)$/i.test(b.textContent));
 const extra=old.find(b=>/^LEADS EXTRA STATUS$/i.test(b.textContent));
 const weekend=old.find(b=>/^WEEKEND MORNING STATUS$/i.test(b.textContent));
 const quick=old.find(b=>/MORNING QUICK UPDATE/i.test(b.textContent));
 const report=old.find(b=>/^REPORT$/i.test(b.textContent));
 if(!morning||!extra||!weekend)return;
 bar.innerHTML='';
 const click=x=>()=>x&&x.click();
 const n1=btn('WEEKDAY MORNING STATUS',click(morning),morning.classList.contains('primary'),'v63-nav');n1.dataset.v57tab='morning';
 const n2=btn('LEADS EXTRA STATUS',click(extra),extra.classList.contains('primary'),'v63-nav');n2.dataset.v57tab='extra';
 const n3=btn('WEEKEND MORNING STATUS',click(weekend),weekend.classList.contains('primary'),'v63-nav');n3.dataset.v57tab='weekend';
 bar.append(n1,n2,n3);
 bar.append(btn('UPDATE WEEKDAY MORNING STATUS',quick?click(quick):()=>{if(typeof window.admin==='function')window.admin('meeting')},true,'v63-action v63-first-action'));
 bar.append(btn('UPDATE LEADS EXTRA STATUS',()=>{if(typeof window.leadsExtraPage==='function')window.leadsExtraPage(true);else extra.click()},false,'v63-action'));
 bar.append(btn('UPDATE WEEKEND MORNING STATUS',()=>{weekend.click();setTimeout(()=>{const e=$$('#floatingActions button').find(b=>/EDIT WEEKEND STATUS/i.test(b.textContent));if(e)e.click()},80)},false,'v63-action'));
 bar.append(btn('SCREENSHOT',screenshot,false,'v63-action v63-screenshot'));
 bar.append(btn('REPORT',report?click(report):()=>window.print(),false,'v63-action v57-report-btn'));
}
function cleanStatusContent(){if(center()==='status')$$('#app button').forEach(b=>{if(/RESET TOOL TYPE\s*\/\s*SERIAL ORDER/i.test(b.textContent))b.remove()})}
function uppercase(){ $$('.main-nav button,#floatingActions button').forEach(b=>{b.style.textTransform='uppercase'}); const t=$('#headerPageTitle');if(t)t.style.textTransform='uppercase' }
function decorate(){hardTheme();statusBar();ensureGlobalActions();cleanStatusContent();uppercase()}
let busy=false;new MutationObserver(()=>{if(busy)return;busy=true;requestAnimationFrame(()=>{decorate();busy=false})}).observe(document.body,{childList:true,subtree:true});
setTimeout(decorate,120);
})();
