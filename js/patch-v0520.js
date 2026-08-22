/* B7 FI Command Center v0.52.0 — Simplified Page Identity */
(function(){
'use strict';
window.VERSION='0.52.0';

const pageTitles={
 home:'OPERATIONS HOME',
 shipping:'SHIPPING SCHEDULE', customer:'CUSTOMER REQUIREMENTS', daily:'WEEKDAY PRIORITIES',
 meeting:'MORNING STATUS', meetingcenter:'MEETING CENTER', leads:'LEADS EXTRA STATUS',
 weekend:'WEEKEND PRIORITIES', workspace:'LEAD WORKSPACE', systems:'TOOLS', actions:'ACTION CENTER',
 wallboard:'WALLBOARD', knowledge:'FI KNOWLEDGE BASE', references:'REFERENCE FILES', archive:'ARCHIVE',
 shared:'SHARED DATA', admin:'ADMINISTRATION'
};
function simpleTitle(v){
 if(v==='countdown') return `${typeof quarterLabel==='function'?quarterLabel():'CURRENT QUARTER'} TOOL SHIPPING COUNTDOWN`;
 return pageTitles[v]||String(v||'OPERATIONS').toUpperCase();
}
function applySimpleIdentity(v){
 const t=simpleTitle(v||window.view||'home');
 const title=document.getElementById('headerPageTitle'), sub=document.getElementById('headerPageSub');
 if(title) title.textContent=t;
 if(sub){sub.textContent='';sub.style.display='none'}
 document.title=`B7 FI Command Center · ${t}`;
}

/* Header title is now the only page-level identity. */
if(typeof setHeaderContext==='function'){
 const prior=setHeaderContext;
 setHeaderContext=function(title,sub=''){
   const v=window.view||document.body.dataset.theme||'home';
   prior(simpleTitle(v),'');
 };
}

/* Remove only redundant top-of-page report titles; subsection titles remain intact. */
function removeRedundantPageHeading(v){
 const screen=document.querySelector('#app > .report-screen, #app .report-screen');
 if(!screen)return;
 const first=screen.querySelector(':scope > .report-title');
 if(first) first.remove();
}
function polish(v){
 const current=v||window.view||document.body.dataset.theme||'home';
 applySimpleIdentity(current);
 removeRedundantPageHeading(current);
 const ver=document.getElementById('appVersionLabel');
 if(ver)ver.textContent='B7 FI Command Center v0.52.0';
}

/* Wrap routing without changing operational behavior. */
if(typeof setView==='function'){
 const priorSetView=setView;
 setView=function(v){priorSetView(v);setTimeout(()=>polish(v),0)};
 document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>setView(b.dataset.view));
}
if(typeof render==='function'){
 const priorRender=render;
 render=function(){priorRender();setTimeout(()=>polish(window.view||document.body.dataset.theme),0)};
}

/* Direct patched pages can bypass render(), so observe page replacement too. */
const app=document.getElementById('app');
if(app)new MutationObserver(()=>setTimeout(()=>polish(window.view||document.body.dataset.theme),0)).observe(app,{childList:true});

/* Start and remain visually identified as Operations Home on index load. */
setTimeout(()=>polish('home'),40);
})();
