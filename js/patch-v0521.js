/* B7 FI Command Center v0.52.1 — Interface Cleanup + Frame Finalization */
(function(){
'use strict';
window.VERSION='0.52.1';

const ACCENTS={
 home:['#e4b84d','228,184,77'],countdown:['#e4b84d','228,184,77'],shipping:['#49cbd3','73,203,211'],
 customer:['#55a4f6','85,164,246'],daily:['#46c77b','70,199,123'],meeting:['#ef9a4a','239,154,74'],
 meetingcenter:['#5a9fe8','90,159,232'],leads:['#bb78ef','187,120,239'],weekend:['#a77ae8','167,122,232'],
 workspace:['#7b8cff','123,140,255'],systems:['#6e9fbd','110,159,189'],actions:['#ff7a59','255,122,89'],
 wallboard:['#e4b84d','228,184,77'],knowledge:['#55c7ad','85,199,173'],references:['#2ec9b7','46,201,183'],
 archive:['#8b96a5','139,150,165'],shared:['#4b8dff','75,141,255'],admin:['#b8c1cc','184,193,204']
};
function themeName(){return document.body.dataset.theme||window.view||'home'}
function syncFrameAccent521(){
 const pair=ACCENTS[themeName()]||ACCENTS.home;
 document.body.style.setProperty('--fleet-accent',pair[0]);
 document.body.style.setProperty('--fleet-rgb',pair[1]);
 document.body.style.setProperty('--live-page-accent',pair[0]);
 document.body.style.setProperty('--live-page-rgb',pair[1]);
}

function cleanInstructionalChrome521(){
 const v=window.view||themeName();
 /* Lead Workspace: page title lives in the header; controls should start immediately. */
 if(v==='workspace'){
   const panel=document.querySelector('#app > .panel');
   if(panel){
     const tabs=panel.querySelector('.workspace-tabs');
     if(tabs && tabs.querySelectorAll('button').length<=1) tabs.remove();
     [...panel.children].forEach(el=>{
       if(el.matches('h3') && /Lead Workspace\s*\/\s*Action Center/i.test(el.textContent)) el.remove();
       else if(el.matches('p.helper') && /shared task engine|manager requests|priority controls/i.test(el.textContent)) el.remove();
     });
   }
 }
 /* Action Center: the aging engine works automatically; no permanent explainer is needed. */
 document.querySelectorAll('.action-rules51').forEach(x=>x.remove());

 /* Wallboard: keep the live-ready indicator and rotation controls, remove tutorial copy. */
 if(v==='wallboard'){
   document.querySelectorAll('.wallboard-intro h2,.wallboard-intro > p').forEach(x=>x.remove());
   document.querySelectorAll('.wallboard-setup > .panel').forEach(p=>{
     const h=p.querySelector(':scope > h3');
     if(h && /Wallboard behavior/i.test(h.textContent)) p.remove();
   });
 }
 /* Archive: header already says ARCHIVE. */
 if(v==='archive'){
   document.querySelectorAll('#app h2,#app .report-title').forEach(x=>{
     if(/B7 FI TOOL ARCHIVE|TOOL ARCHIVE/i.test(x.textContent||'')) x.remove();
   });
 }
 /* Reference Center: remove second page identity/explainer while retaining functional file cards. */
 if(v==='references'){
   document.querySelectorAll('.reference-dashboard-head').forEach(x=>x.remove());
 }
 /* Admin launch cards: labels are sufficient; descriptions are redundant. */
 if(v==='admin') document.querySelectorAll('.admin-launch > span').forEach(x=>x.remove());

 /* Shared Data: retain diagnostic labels and controls, remove only tutorial prose. */
 if(v==='shared'){
   document.querySelectorAll('.shared-hero p.gray,.shared-grid section > p.gray').forEach(x=>x.remove());
 }
 const ver=document.getElementById('appVersionLabel'); if(ver) ver.textContent='B7 FI Command Center v0.52.1';
 syncFrameAccent521();
}

/* Footer belongs after Fleet Status, not above it. */
function placeFooter521(){
 const ops=document.getElementById('operationsBar'), foot=document.querySelector('body > footer');
 if(ops&&foot&&ops.nextElementSibling!==foot) ops.insertAdjacentElement('afterend',foot);
}

const app=document.getElementById('app');
if(app) new MutationObserver(()=>setTimeout(cleanInstructionalChrome521,0)).observe(app,{childList:true,subtree:false});
new MutationObserver(()=>{syncFrameAccent521();setTimeout(cleanInstructionalChrome521,0)}).observe(document.body,{attributes:true,attributeFilter:['data-theme']});

/* Route guard for direct patched pages. */
if(typeof setView==='function'){
 const prior=setView;
 setView=function(v){prior(v);setTimeout(()=>{syncFrameAccent521();cleanInstructionalChrome521();placeFooter521()},0)};
 document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>setView(b.dataset.view));
}
if(typeof render==='function'){
 const prior=render;
 render=function(){prior();setTimeout(()=>{syncFrameAccent521();cleanInstructionalChrome521();placeFooter521()},0)};
}

setTimeout(()=>{syncFrameAccent521();cleanInstructionalChrome521();placeFooter521()},80);
})();
