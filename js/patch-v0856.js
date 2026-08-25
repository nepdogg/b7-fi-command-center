/* B7 FI Command Center v0.80.56 — Single Visible Navigation Authority
   The legacy toolbar remains available to existing workflows, but is hidden.
   This file is the ONLY visible page-navigation/action renderer.
   LEFT = pages/views. RIGHT = contextual actions.
*/
(function(){'use strict';
const VERSION='0.80.56';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION; window.VERSION=VERSION;
const CENTER={
 home:{title:'OPERATIONS CENTER',accent:'#2477ad',rgb:'36,119,173',view:'home'},
 tool:{title:'TOOL CENTER',accent:'#8e5ae8',rgb:'142,90,232',view:'toolcenter'},
 shipping:{title:'SHIPPING CENTER',accent:'#27ae60',rgb:'39,174,96',view:'shipping'},
 priority:{title:'PRIORITY CENTER',accent:'#d4a72c',rgb:'212,167,44',view:'priorities'},
 status:{title:'STATUS CENTER',accent:'#f28c28',rgb:'242,140,40',view:'statuscenter'},
 meeting:{title:'MEETING CENTER',accent:'#f28c28',rgb:'242,140,40',view:'meetingcenter'},
 action:{title:'ACTION CENTER',accent:'#ef4b4b',rgb:'239,75,75',view:'actions'},
 reference:{title:'REFERENCE CENTER',accent:'#e94a9a',rgb:'233,74,154',view:'referencecenter'},
 search:{title:'SEARCH CENTER',accent:'#536dfe',rgb:'83,109,254',view:'searchcenter'}
};
const MAIN_TO_CENTER={home:'home',toolcenter:'tool',shipping:'shipping',priorities:'priority',statuscenter:'status',meetingcenter:'meeting',actions:'action',referencecenter:'reference',searchcenter:'search'};
let S={center:'home',sub:'home',mode:'view',toolId:null,meeting:'LEADS MEETING'};
let visibleBar=null, legacyBar=null, enforcing=false;
const legacySetView=window.setView;
const currentToolStatus=window.toolStatus, currentToolAdmin=window.toolAdmin;
function quarter(){try{return String(window.getB7ActiveQuarter?.()||window.quarterLabel?.()||'CY26Q3').toUpperCase()}catch(e){return'CY26Q3'}}
function text(b){return String(b?.textContent||'').trim().toUpperCase()}
function proxy(label,re){
 const buttons=$$('#floatingActions button'); let b=null;
 if(label)b=buttons.find(x=>text(x)===String(label).toUpperCase());
 if(!b&&re)b=buttons.find(x=>re.test(String(x.textContent||'').trim()));
 if(b){b.click();return true} return false;
}
function clickBody(re){const b=$$('#app button').find(x=>re.test(String(x.textContent||'').trim())); if(b){b.click();return true}return false}
function mk(label,fn,active=false,danger=false){const b=document.createElement('button');b.type='button';b.className='btn b7v856-btn'+(active?' primary':'')+(danger?' danger':'');b.textContent=label;b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();fn?.()});return b}
function hideLegacy(){legacyBar=$('#floatingActions');if(!legacyBar)return;legacyBar.classList.add('b7v856-legacy-toolbar');legacyBar.setAttribute('aria-hidden','true');
 if(!visibleBar){visibleBar=document.createElement('div');visibleBar.id='b7PageToolbar';visibleBar.className='floating-actions page-toolbar b7v856-toolbar';visibleBar.setAttribute('aria-label','Page navigation and actions');legacyBar.insertAdjacentElement('afterend',visibleBar)}}
function actions(){const L=[],R=[]; const l=(x)=>L.push(x),r=(x)=>R.push(x);
 if(S.center==='home'){
   r(mk(S.toolId?`OPEN TOOL ${S.toolId}`:'OPEN TOOL —',()=>S.toolId&&window.toolStatus?.(S.toolId)));r(mk('SCREENSHOT',shot));r(mk('REPORT',report));
 }
 if(S.center==='tool'){
   l(mk(`${quarter()} TOOLS`,()=>route('tool','tools'),S.sub==='tools'));l(mk('TOOL COUNTDOWN',()=>route('tool','countdown'),S.sub==='countdown'));l(mk('TOOL ARCHIVE',()=>route('tool','archive'),S.sub==='archive'));
   if(S.mode==='edit'){
     r(mk('SAVE TOOL',()=>{if(!proxy('SAVE TOOL',/^SAVE TOOL$/i))proxy('SAVE',/^SAVE/i); setTimeout(()=>{S.mode='view';render()},80)},true));
     r(mk('CANCEL',()=>{if(!proxy('CANCEL',/^CANCEL$/i)){S.toolId?window.toolStatus?.(S.toolId):route('tool','tools')} S.mode='view';setTimeout(render,60)}));
     if(S.toolId)r(mk('DELETE TOOL',()=>{if(!proxy('DELETE TOOL',/^DELETE TOOL$/i))clickBody(/^DELETE TOOL$/i)},false,true));
   } else if(S.sub==='archive'){
     r(mk('ARCHIVE TOOL',()=>{S.mode='edit';proxy('ARCHIVE TOOL',/^ARCHIVE TOOL$/i);setTimeout(render,40)},true));r(mk('SCREENSHOT',shot));r(mk('REPORT',report));
   } else if(S.sub==='detail'&&S.toolId){
     r(mk('EDIT TOOL',()=>window.toolAdmin?.(S.toolId),true));r(mk('SCREENSHOT',shot));r(mk('REPORT',report));
   } else {
     r(mk('ADD TOOL',()=>window.toolAdmin?.(),true));r(mk('SCREENSHOT',shot));r(mk('REPORT',report));
   }
 }
 if(S.center==='shipping'){
   if(S.mode==='edit'){r(mk('SAVE',()=>{proxy('SAVE',/^SAVE$/i);setTimeout(()=>{S.mode='view';render()},60)},true));r(mk('CANCEL',()=>{proxy('CANCEL',/^CANCEL$/i);S.mode='view';setTimeout(()=>route('shipping','shipping'),40)}));}
   else {r(mk('EDIT SHIP SCHEDULE',()=>{S.mode='edit';proxy('EDIT SHIP SCHEDULE',/^EDIT (SHIP|TOOL) SCHEDULE/i);setTimeout(render,40)},true));r(mk('SCREENSHOT',shot));r(mk('REPORT',report));}
 }
 if(S.center==='priority'){
   l(mk('WEEKDAY PRIORITIES',()=>route('priority','weekday'),S.sub==='weekday'));l(mk('WEEKEND PRIORITIES',()=>route('priority','weekend'),S.sub==='weekend'));
   if(S.mode==='edit'){r(mk('SAVE',()=>{proxy('SAVE',/^SAVE$/i);S.mode='view';setTimeout(()=>route('priority',S.sub),60)},true));r(mk('CANCEL',()=>{proxy('CANCEL',/^CANCEL$/i);S.mode='view';setTimeout(()=>route('priority',S.sub),40)}));}
   else {const label=S.sub==='weekend'?'EDIT WEEKEND PRIORITIES':'EDIT WEEKDAY PRIORITIES';r(mk(label,()=>{S.mode='edit';proxy(label,new RegExp('^'+label.replace(/ /g,'\\s+')+'$','i'));setTimeout(render,40)},true));r(mk('SCREENSHOT',shot));r(mk('REPORT',report));}
 }
 if(S.center==='status'){
   l(mk('WEEKDAY MORNING STATUS',()=>route('status','weekday'),S.sub==='weekday'));l(mk('LEADS EXTRA STATUS',()=>route('status','extra'),S.sub==='extra'));l(mk('WEEKEND MORNING STATUS',()=>route('status','weekend'),S.sub==='weekend'));
   if(S.mode==='edit'){r(mk('SAVE',()=>{proxy('SAVE',/^SAVE$/i);S.mode='view';setTimeout(()=>route('status',S.sub),70)},true));r(mk('CANCEL',()=>{proxy('CANCEL',/^CANCEL$/i);S.mode='view';setTimeout(()=>route('status',S.sub),50)}));}
   else {const label=S.sub==='extra'?'EDIT LEADS EXTRA STATUS':S.sub==='weekend'?'EDIT WEEKEND MORNING STATUS':'EDIT WEEKDAY MORNING STATUS';r(mk(label,()=>{S.mode='edit';proxy(label,new RegExp('^'+label.replace(/ /g,'\\s+')+'$','i'));setTimeout(render,50)},true));r(mk('SCREENSHOT',shot));r(mk('REPORT',report));}
 }
 if(S.center==='meeting'){
   ['LEADS MEETING','ORB MEETING','FE OPTIONS MEETING','CELL MEETING'].forEach(m=>l(mk(m,()=>{S.meeting=m;proxy(m,new RegExp('^'+m+'$','i'));setTimeout(()=>{hideMeetingCards();render()},30)},S.meeting===m)));
   if(S.mode==='edit'){r(mk('SAVE',()=>{if(!proxy('SAVE',/^SAVE/i))clickBody(/^SAVE/i);S.mode='view';setTimeout(()=>route('meeting','history'),80)},true));r(mk('CANCEL',()=>{proxy('CANCEL',/^CANCEL$/i);S.mode='view';setTimeout(()=>route('meeting','history'),40)}));}
   else {r(mk(`START ${S.meeting}`,()=>{S.mode='edit';if(!proxy(`START ${S.meeting}`,new RegExp('^START .*MEETING','i'))){startMeetingFromBody(S.meeting)}setTimeout(render,50)},true));r(mk('SCREENSHOT',shot));r(mk('REPORT',report));}
 }
 if(S.center==='action'){
   if(S.mode==='edit'){r(mk('SAVE',()=>{proxy('SAVE',/^SAVE$/i);S.mode='view';setTimeout(()=>route('action','actions'),80)},true));r(mk('CANCEL',()=>{proxy('CANCEL',/^CANCEL$/i);S.mode='view';setTimeout(()=>route('action','actions'),40)}));}
   else {r(mk('ADD ALERT',()=>{S.mode='edit';proxy('ADD ALERT',/^ADD ALERT$/i);setTimeout(render,40)},true));r(mk('SCREENSHOT',shot));r(mk('REPORT',report));}
 }
 if(S.center==='reference'){
   l(mk('FI KNOWLEDGE',()=>route('reference','knowledge'),S.sub==='knowledge'));l(mk('REFERENCE FILES',()=>route('reference','files'),S.sub==='files'));
   if(S.mode==='edit'){r(mk('SAVE',()=>{proxy('SAVE',/^SAVE$/i);S.mode='view';setTimeout(()=>route('reference',S.sub),60)},true));r(mk('CANCEL',()=>{proxy('CANCEL',/^CANCEL$/i);S.mode='view';setTimeout(()=>route('reference',S.sub),40)}));}
   else if(S.sub==='files'){r(mk('LOAD FILE',()=>proxy('LOAD FILE',/^LOAD FILE$/i),true));r(mk('SCREENSHOT',shot));r(mk('REPORT',report));}
   else {r(mk('ADD REFERENCE NOTE',()=>{S.mode='edit';proxy('ADD REFERENCE NOTE',/^ADD REFERENCE NOTE$/i);setTimeout(render,40)},true));r(mk('SCREENSHOT',shot));r(mk('REPORT',report));}
 }
 if(S.center==='search'){r(mk('SCREENSHOT',shot));r(mk('REPORT',report));}
 return [L,R];
}
function render(){hideLegacy();if(!visibleBar)return;const [L,R]=actions();visibleBar.innerHTML='';const left=document.createElement('div'),right=document.createElement('div');left.className='b7v856-left';right.className='b7v856-right';L.forEach(b=>left.appendChild(b));R.forEach(b=>right.appendChild(b));visibleBar.append(left,right);enforceVisual();}
function shot(){try{window.enterScreenshotMode?.();return}catch(e){}try{window.enterScreenshot?.();return}catch(e){}window.print()}
function report(){try{window.openReport530?.();return}catch(e){}window.print()}
function enforceVisual(){if(enforcing)return;enforcing=true;const cfg=CENTER[S.center]||CENTER.home;
 document.documentElement.style.setProperty('--page-accent',cfg.accent);document.documentElement.style.setProperty('--page-accent-rgb',cfg.rgb);document.documentElement.style.setProperty('--center-color',cfg.accent);document.documentElement.style.setProperty('--center-rgb',cfg.rgb);
 const navMap={home:'home',tool:'toolcenter',shipping:'shipping',priority:'priorities',status:'statuscenter',meeting:'meetingcenter',action:'actions',reference:'referencecenter',search:'searchcenter'};
 $$('.main-nav .nav-btn').forEach(b=>{const on=b.dataset.view===navMap[S.center];b.classList.toggle('active',on);b.setAttribute('aria-current',on?'page':'false')});
 const title=$('#headerPageTitle');if(title){let t=cfg.title;if(['home','tool','shipping','priority','status'].includes(S.center))t+=` — ${quarter()}`;if(S.center==='tool'&&S.sub==='archive')t='TOOL ARCHIVE';if(S.center==='tool'&&S.mode==='edit'&&S.toolId)t=`TOOL ${S.toolId} — EDIT`;if(title.textContent!==t)title.textContent=t}
 document.body.dataset.center=S.center==='tool'?'toolfinal':S.center;document.body.dataset.theme=S.center==='tool'?'toolcenter':S.center;enforcing=false;}
function callSet(v){try{return legacySetView?.call(window,v)}catch(e){try{return window.setView?.(v)}catch(_){}}}
function route(center,sub){S={...S,center,sub,mode:'view',toolId:null};window.scrollTo(0,0);let v=CENTER[center]?.view||'home';
 if(center==='tool')v=sub==='countdown'?'countdown':sub==='archive'?'archive':'toolcenter';
 if(center==='priority')v=sub==='weekend'?'weekend':'priorities';
 if(center==='status')v=sub==='extra'?'leads':'statuscenter';
 if(center==='reference')v=sub==='files'?'references':'referencecenter';
 callSet(v);[0,25,90,220,600].forEach(ms=>setTimeout(()=>{hideLegacy();enforceVisual();render();if(center==='meeting')hideMeetingCards();},ms));
 if(center==='status'&&sub==='weekend')setTimeout(()=>{proxy('WEEKEND MORNING STATUS',/^WEEKEND MORNING STATUS$/i);setTimeout(()=>{S.center='status';S.sub='weekend';enforceVisual();render()},50)},120);
}
function startMeetingFromBody(m){const key=m.replace(' MEETING','');const card=$$('#app button,#app .meeting-template51,#app [role="button"]').find(x=>String(x.textContent||'').toUpperCase().includes(key)&&/START|MEETING/.test(String(x.textContent||'').toUpperCase()));if(card)card.click();}
function hideMeetingCards(){if(S.center!=='meeting')return;$$('#app .meeting-template-grid51,#app .start-now51,#app .meeting-template51').forEach(x=>x.style.display='none');const heads=$$('#app h2,#app h3').filter(x=>/B7 FI MEETING CENTER/i.test(x.textContent));heads.forEach(h=>{const p=h.parentElement;if(p&&!/Meeting History/i.test(p.textContent||''))p.classList.add('b7v856-meeting-intro')});}
function inferInitial(){const active=$('.main-nav .nav-btn.active')?.dataset.view;const c=MAIN_TO_CENTER[active]||'home';S.center=c;S.sub=c==='tool'?'tools':c==='priority'?'weekday':c==='status'?'weekday':c==='reference'?'knowledge':c;}
/* Route global navigation before the older document-level capture handlers. */
window.addEventListener('click',e=>{const b=e.target.closest?.('.main-nav .nav-btn');if(!b)return;const c=MAIN_TO_CENTER[b.dataset.view];if(!c)return;e.preventDefault();e.stopImmediatePropagation();route(c,c==='tool'?'tools':c==='priority'?'weekday':c==='status'?'weekday':c==='reference'?'knowledge':c==='meeting'?'history':c);},true);
/* Wrap tool pages so context actions remain deterministic. */
if(typeof currentToolStatus==='function'){window.toolStatus=function(id){S={...S,center:'tool',sub:'detail',mode:'view',toolId:String(id)};const o=currentToolStatus.apply(this,arguments);[0,30,120].forEach(ms=>setTimeout(render,ms));return o};try{toolStatus=window.toolStatus}catch(e){}}
if(typeof currentToolAdmin==='function'){window.toolAdmin=function(id){S={...S,center:'tool',sub:'tools',mode:'edit',toolId:id?String(id):null};const o=currentToolAdmin.apply(this,arguments);[0,30,120].forEach(ms=>setTimeout(render,ms));return o};try{toolAdmin=window.toolAdmin}catch(e){}}
function monitor(){const nav=$('.main-nav'),title=$('#headerPageTitle');const cb=()=>queueMicrotask(()=>{enforceVisual();hideLegacy()});if(nav)new MutationObserver(cb).observe(nav,{attributes:true,subtree:true,attributeFilter:['class','aria-current']});if(title)new MutationObserver(cb).observe(title,{childList:true,characterData:true,subtree:true});}
function boot(){document.title=`B7 FI Command Center v${VERSION}`;const vl=$('#appVersionLabel');if(vl)vl.textContent=`B7 FI COMMAND CENTER V${VERSION}`;inferInitial();hideLegacy();monitor();render();setInterval(()=>{hideLegacy();enforceVisual()},1200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
