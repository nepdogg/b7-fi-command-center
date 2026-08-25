/* B7 FI Command Center v0.52.3 — Frame + Theme Consistency Fix */
(function(){
'use strict';

const PAGE_COLORS_523={
  home:         ['#9B6A1A','155,106,26'],   // darker bronze
  countdown:    ['#FF9F1C','255,159,28'],   // vivid amber-orange
  shipping:     ['#00BCD4','0,188,212'],    // cyan
  customer:     ['#7E57C2','126,87,194'],   // violet
  daily:        ['#2EAD63','46,173,99'],     // green
  meeting:      ['#F57C00','245,124,0'],     // orange
  meetingcenter:['#1976D2','25,118,210'],    // strong blue
  leads:        ['#C218D4','194,24,212'],     // magenta
  weekend:      ['#8E5BD9','142,91,217'],    // purple
  workspace:    ['#3F51B5','63,81,181'],     // royal blue
  systems:      ['#4B879E','75,135,158'],    // steel blue
  actions:      ['#E74C3C','231,76,60'],     // red/coral
  wallboard:    ['#7CB342','124,179,66'],     // lime green
  knowledge:    ['#16A085','22,160,133'],    // emerald teal
  references:   ['#00A7A5','0,167,165'],     // turquoise
  archive:      ['#6E7B8B','110,123,139'],   // slate
  shared:       ['#4B4FD8','75,79,216'],      // indigo
  admin:        ['#8E98A8','142,152,168']    // silver gray
};

function currentTheme523(){
  return document.body.dataset.theme || window.view || 'home';
}
function applyTheme523(){
  const key=currentTheme523();
  const p=PAGE_COLORS_523[key] || PAGE_COLORS_523.home;
  const style=document.documentElement.style;
  const bstyle=document.body.style;
  ['--accent','--live-page-accent','--fleet-accent'].forEach(k=>{style.setProperty(k,p[0]);bstyle.setProperty(k,p[0])});
  ['--accent-rgb','--live-page-rgb','--fleet-rgb'].forEach(k=>{style.setProperty(k,p[1]);bstyle.setProperty(k,p[1])});

  // Force shared chrome to current page color even if legacy page CSS tries to override it.
  document.querySelectorAll('.operations-bar,.page-toolbar,.top-action-bar').forEach(el=>{
    el.style.setProperty('--accent',p[0]);
    el.style.setProperty('--accent-rgb',p[1]);
  });

  const ver=document.getElementById('appVersionLabel');
  if(ver) ver.textContent='B7 FI Command Center v0.52.3';
}

function syncNav523(){
  const v=currentTheme523();
  document.querySelectorAll('.nav-btn').forEach(btn=>{
    const active=btn.dataset.view===v;
    btn.classList.toggle('active',active);
    btn.setAttribute('aria-current',active?'page':'false');
  });
}

function frame523(){
  applyTheme523();
  syncNav523();
  const ops=document.getElementById('operationsBar');
  const foot=document.querySelector('body > footer');
  if(ops && foot && ops.nextElementSibling!==foot) ops.insertAdjacentElement('afterend',foot);
}

/* Re-apply after route/theme changes and after patched pages render. */
new MutationObserver(()=>setTimeout(frame523,0))
  .observe(document.body,{attributes:true,attributeFilter:['data-theme']});

if(typeof setView==='function'){
  const oldSet=setView;
  setView=function(v){
    oldSet(v);
    setTimeout(frame523,0);
    setTimeout(frame523,80);
  };
  document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>setView(b.dataset.view));
}
if(typeof render==='function'){
  const oldRender=render;
  render=function(){
    oldRender();
    setTimeout(frame523,0);
    setTimeout(frame523,80);
  };
}

/* Final guard for direct-rendered patched pages such as Home, Meeting Center,
   Action Center and FI Knowledge Base. */
const directFns=['meetingCenter51','knowledgePage51','actionCenter51','enhanceHome51'];
directFns.forEach(name=>{
  if(typeof window[name]==='function'){
    const old=window[name];
    window[name]=function(){
      const r=old.apply(this,arguments);
      setTimeout(frame523,0);
      setTimeout(frame523,80);
      return r;
    };
  }
});

setInterval(applyTheme523,1000); // lightweight consistency guard while testing
setTimeout(frame523,60);
setTimeout(frame523,250);
})();