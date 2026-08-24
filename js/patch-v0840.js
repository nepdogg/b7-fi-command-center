/* B7 FI Command Center v0.80.40 — Final Tool Center navigation/workflow lock.
   - Tool Center landing remains the quarter live-card dashboard.
   - Tool Countdown remains a compact clickable summary.
   - Tool Archive remains the archive view.
   - One canonical purple Tool page is used everywhere.
   - View mode: read-only Tool page with EDIT TOOL action.
   - Edit/Add mode: same complete Tool page, editable, with CANCEL/SAVE and DELETE only for existing tools.
   - Tool Center page navigation is always left; page actions are always right.
*/
(function(){
'use strict';
const VERSION='0.80.40';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const priorToolStatus=window.toolStatus;
const priorToolAdmin=window.toolAdmin;
const priorSetView=window.setView;
const priorCountdown=window.countdown;
window.B7_APP_VERSION=VERSION; window.VERSION=VERSION;

function stamp(){
  document.title=`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel'); if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function qLabel(){try{return typeof quarterLabel==='function'?quarterLabel():'CY26Q3'}catch(e){return 'CY26Q3'}}
function shot(){try{if(typeof window.enterScreenshotMode==='function')return window.enterScreenshotMode()}catch(e){}try{if(typeof window.enterScreenshot==='function')return window.enterScreenshot()}catch(e){}window.print()}
function report(){window.print()}
function btn(label,fn,primary=false,danger=false){const b=document.createElement('button');b.type='button';b.className=`btn${primary?' primary':''}${danger?' danger':''}`;b.textContent=label;b.onclick=fn;return b}
function toolbar(left,right){
  const bar=$('#floatingActions'); if(!bar)return;
  bar.className='floating-actions page-toolbar v840-page-toolbar';bar.innerHTML='';
  const l=document.createElement('div'),r=document.createElement('div');l.className='v840-toolbar-left';r.className='v840-toolbar-right';
  left.filter(Boolean).forEach(x=>l.appendChild(x));right.filter(Boolean).forEach(x=>r.appendChild(x));bar.append(l,r);
}
function toolTheme(title){
  const b=document.body;b.dataset.center='toolfinal';b.dataset.theme='toolcenter';
  document.documentElement.style.setProperty('--page-accent','#8b5cf6');document.documentElement.style.setProperty('--page-accent-rgb','139,92,246');
  document.documentElement.style.setProperty('--center-color','#8b5cf6');document.documentElement.style.setProperty('--center-rgb','139,92,246');
  $$('.main-nav .nav-btn').forEach(x=>x.classList.toggle('active',x.dataset.view==='toolcenter'));
  const h=$('#headerPageTitle');if(h)h.textContent=title;
}
function navButtons(active){
  return [
    btn(`${qLabel()} TOOLS`,()=>window.setView('toolcenter'),active==='tools'),
    btn('TOOL COUNTDOWN',()=>window.setView('countdown'),active==='countdown'),
    btn('TOOL ARCHIVE',()=>window.setView('archive'),active==='archive')
  ];
}
function toolIdFromPage(){const h=($('#headerPageTitle')?.textContent||'').match(/TOOL\s+(\d+)/i);return h?h[1]:''}
function remember(route){try{sessionStorage.setItem('b7.route',JSON.stringify(route));history.replaceState(route,'',location.pathname+'#'+encodeURIComponent(JSON.stringify(route)))}catch(e){}}
function setReadOnly(on){
  const root=$('.v838-master-tool'); if(!root)return;
  root.classList.toggle('v840-readonly',on);
  $$('input,select,textarea,button',root).forEach(el=>{
    if(el.id==='v838AddNc'||el.classList.contains('v838-remove-nc')){el.style.display=on?'none':'';return;}
    if(el.matches('input,select,textarea')){
      if(on){el.dataset.v840WasDisabled=el.disabled?'1':'0';el.disabled=true;}
      else if(el.dataset.v840WasDisabled==='0')el.disabled=false;
    }
  });
}
function readOnlyTool(id){
  const r=priorToolStatus.apply(this,arguments);
  toolTheme(`TOOL ${id}`);remember({kind:'tool',id:String(id)});
  setReadOnly(true);
  toolbar(navButtons(''),[
    btn('EDIT TOOL',()=>window.toolAdmin(id),true),btn('SCREENSHOT',shot),btn('REPORT',report)
  ]);
  // A few legacy layers repaint after render. Re-assert only a bounded number of times.
  [40,140].forEach(ms=>setTimeout(()=>{if(toolIdFromPage()===String(id)){toolTheme(`TOOL ${id}`);setReadOnly(true);toolbar(navButtons(''),[btn('EDIT TOOL',()=>window.toolAdmin(id),true),btn('SCREENSHOT',shot),btn('REPORT',report)])}},ms));
  return r;
}
function editableTool(id){
  const r=priorToolAdmin.apply(this,arguments);
  const existing=!!id;toolTheme(existing?`TOOL ${id} — EDIT`:'ADD TOOL');remember({kind:existing?'editTool':'addTool',id:existing?String(id):''});
  setReadOnly(false);
  const bar=$('#floatingActions');
  const legacyButtons=bar?$$('button',bar):[];
  const save=legacyButtons.find(b=>/SAVE TOOL/i.test(b.textContent));
  const del=legacyButtons.find(b=>/DELETE TOOL/i.test(b.textContent));
  if(save)save.textContent='SAVE TOOL';
  if(del)del.textContent='DELETE TOOL';
  const cancel=btn('CANCEL',()=>existing?window.toolStatus(id):window.setView('toolcenter'));
  toolbar(navButtons(''),[cancel,save||null,existing?(del||null):null]);
  // destructive action is visible only here, and stays visually separated.
  if(del){del.classList.add('danger','v840-delete-tool');del.title=`Delete Tool ${id}`;}
  [40,140].forEach(ms=>setTimeout(()=>{
    if((existing&&toolIdFromPage()===String(id))||(!existing&&/ADD TOOL/i.test($('#headerPageTitle')?.textContent||''))){
      toolTheme(existing?`TOOL ${id} — EDIT`:'ADD TOOL');setReadOnly(false);
      const current=$('#floatingActions');const bs=current?$$('button',current):[];
      const s=bs.find(b=>/SAVE TOOL/i.test(b.textContent))||save,d=bs.find(b=>/DELETE TOOL/i.test(b.textContent))||del;
      toolbar(navButtons(''),[btn('CANCEL',()=>existing?window.toolStatus(id):window.setView('toolcenter')),s||null,existing?(d||null):null]);
      if(d){d.classList.add('danger','v840-delete-tool')}
    }
  },ms));
  return r;
}
window.toolStatus=readOnlyTool;window.toolAdmin=editableTool;
try{toolStatus=readOnlyTool}catch(e){} try{toolAdmin=editableTool}catch(e){}

function finalizeTopLevel(view){
  toolTheme(`TOOL CENTER — ${qLabel()}`);remember({kind:'view',view});
  toolbar(navButtons(view==='toolcenter'?'tools':view),[
    btn('ADD TOOL',()=>window.toolAdmin(),true),btn('SCREENSHOT',shot),btn('REPORT',report)
  ]);
}
window.setView=function(v){
  const r=priorSetView.apply(this,arguments);
  if(v==='toolcenter'||v==='systems')finalizeTopLevel('toolcenter');
  else if(v==='countdown')finalizeTopLevel('countdown');
  else if(v==='archive')finalizeTopLevel('archive');
  return r;
};
try{setView=window.setView}catch(e){}

// Ensure the Tool Countdown quick summary remains clickable into the canonical Tool page.
if(typeof priorCountdown==='function'){
  window.countdown=function(){const r=priorCountdown.apply(this,arguments);finalizeTopLevel('countdown');$$('[data-tool],[data-open-countdown-tool]').forEach(x=>{const id=x.dataset.tool||x.dataset.openCountdownTool;if(id)x.onclick=()=>window.toolStatus(id)});return r};
  try{countdown=window.countdown}catch(e){}
}

function boot(){stamp();
  // Restore Tool routes in the new final workflow after all legacy startup layers settle.
  setTimeout(()=>{let route=null;try{route=location.hash.length>2?JSON.parse(decodeURIComponent(location.hash.slice(1))):JSON.parse(sessionStorage.getItem('b7.route')||'null')}catch(e){}
    if(route?.kind==='tool'&&route.id)window.toolStatus(route.id);
    else if(route?.kind==='editTool'&&route.id)window.toolAdmin(route.id);
    else if(route?.kind==='addTool')window.toolAdmin();
  },420);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
