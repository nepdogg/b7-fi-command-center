/* B7 FI Command Center v0.80.39 — authoritative Center theme + Tool plan-change UX cleanup.
   - One authoritative Center theme is re-applied after every Center navigation.
   - Tool Center can no longer inherit Status/Shipping/etc. accent colors.
   - Quarter / Ship Plan clearly separates current values from NEW values.
   - New ship date / quarter are applied to the master Tool record on Save.
   - Empty Tool Plan Change History is hidden.
   - Custom Fields placeholder is removed from the Tool page; configuration belongs in Administration.
*/
(function(){
'use strict';
const VERSION='0.80.39';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION; window.VERSION=VERSION;

const THEMES={
  home:{name:'OPERATIONS CENTER',color:'#176FA8',rgb:'23,111,168',views:['home']},
  tool:{name:'TOOL CENTER',color:'#8E5AE8',rgb:'142,90,232',views:['toolcenter','systems','countdown','archive']},
  shipping:{name:'SHIPPING CENTER',color:'#27AE60',rgb:'39,174,96',views:['shipping']},
  priority:{name:'PRIORITY CENTER',color:'#D4A72C',rgb:'212,167,44',views:['priorities','daily','weekend']},
  status:{name:'STATUS CENTER',color:'#F28C28',rgb:'242,140,40',views:['statuscenter','meeting','leads']},
  meeting:{name:'MEETING CENTER',color:'#19B9D1',rgb:'25,185,209',views:['meetingcenter']},
  action:{name:'ACTION CENTER',color:'#E54848',rgb:'229,72,72',views:['actions']},
  reference:{name:'REFERENCE CENTER',color:'#E94A9A',rgb:'233,74,154',views:['referencecenter','knowledge','references']},
  search:{name:'SEARCH CENTER',color:'#536DFE',rgb:'83,109,254',views:['searchcenter','search']},
  admin:{name:'ADMINISTRATION CENTER',color:'#A6AFBC',rgb:'166,175,188',views:['admincenter','admin','shared','wallboard']}
};
function quarter(){try{return typeof quarterLabel==='function'?quarterLabel():'CY26Q3'}catch(e){return'CY26Q3'}}
function keyForView(v){v=String(v||'').toLowerCase();for(const [k,t] of Object.entries(THEMES))if(t.views.includes(v))return k;return v in THEMES?v:'home'}
function isMasterTool(){return !!document.querySelector('.v838-master-tool') || /^TOOL\s+\d+/i.test(($('#headerPageTitle')?.textContent||'').trim())}
function applyTheme(key,titleOverride){
  key=keyForView(key); const t=THEMES[key]||THEMES.home;
  document.body.dataset.center=key==='tool'&&isMasterTool()?'toolfinal':key;
  document.body.dataset.theme=key==='tool'?'toolcenter':key;
  const roots=[document.documentElement,document.body];
  roots.forEach(r=>{
    ['--accent','--center-color','--page-accent','--fleet-accent','--live-page-accent'].forEach(p=>r.style.setProperty(p,t.color));
    ['--accent-rgb','--center-rgb','--page-accent-rgb','--fleet-rgb','--live-page-rgb'].forEach(p=>r.style.setProperty(p,t.rgb));
  });
  $$('.main-nav .nav-btn').forEach(b=>{
    const active=keyForView(b.dataset.view)===key;
    b.classList.toggle('active',active); b.setAttribute('aria-current',active?'page':'false');
  });
  const h=$('#headerPageTitle');
  if(h){
    if(titleOverride) h.textContent=titleOverride;
    else if(!isMasterTool()) h.textContent=(key==='tool'?`${t.name} — ${quarter()}`:t.name);
  }
  document.title=`B7 FI Command Center v${VERSION}`;
  const ver=$('#appVersionLabel'); if(ver)ver.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
window.B7ApplyCenterTheme=applyTheme;

/* Wrap the canonical router. Bounded re-application wins over late legacy render callbacks
   without observers, intervals, or permanent polling. */
const priorSetView=window.setView;
if(typeof priorSetView==='function'){
  window.setView=function(v){
    const k=keyForView(v); const out=priorSetView.apply(this,arguments);
    [0,30,120].forEach(ms=>setTimeout(()=>applyTheme(k),ms));
    return out;
  };
  try{setView=window.setView}catch(e){}
}
$$('.main-nav .nav-btn').forEach(b=>b.onclick=()=>window.setView(b.dataset.view));

function dateDisplay(v){if(!v)return'—';const m=String(v).match(/^(\d{4})-(\d{2})-(\d{2})$/);return m?`${m[2]}/${m[3]}/${m[1]}`:v}
function planMode(){return $('#tm-plan-type')?.value||'No Change'}
function updatePlanControls(){
  const type=planMode(), ns=$('#v839-new-ship'), nq=$('#v839-new-quarter');
  if(!ns||!nq)return;
  const no=type==='No Change', dateOnly=type==='Ship Date Change';
  ns.disabled=no; nq.disabled=no||dateOnly;
  ns.closest('.form-group')?.classList.toggle('v839-disabled',no);
  nq.closest('.form-group')?.classList.toggle('v839-disabled',no||dateOnly);
  if(dateOnly){const q=$('#tm-quarter'); if(q)nq.value=q.value;}
}
function enhanceMaster(){
  const master=$('.v838-master-tool'); if(!master)return;
  applyTheme('tool',$('#headerPageTitle')?.textContent||undefined);
  const planType=$('#tm-plan-type'); if(!planType)return;
  const quarterSelect=$('#tm-quarter');
  const oldShip=$('#tm-original-ship'); const oldQuarter=$('#tm-original-quarter');
  const currentShip=$('#tm-ship')?.value||oldShip?.value||'';
  const currentQuarter=quarterSelect?.value||oldQuarter?.value||quarter();
  const grid=planType.closest('.form-grid');
  if(grid && !$('#v839-new-ship')){
    /* Current values are context only. The new values are the editable plan-change inputs. */
    if(quarterSelect){quarterSelect.disabled=true;quarterSelect.closest('.form-group').querySelector('label').textContent='Current Quarter';}
    if(oldShip){oldShip.closest('.form-group').style.display='none';}
    if(oldQuarter){oldQuarter.closest('.form-group').style.display='none';}
    const planGroup=planType.closest('.form-group');
    const cur=document.createElement('div');cur.className='form-group';cur.innerHTML=`<label>Current MFG Ship Date</label><input type="text" value="${dateDisplay(currentShip)}" disabled>`;
    grid.insertBefore(cur,planGroup);
    const ns=document.createElement('div');ns.className='form-group';ns.innerHTML=`<label>New MFG Ship Date</label><input id="v839-new-ship" type="date" value="">`;
    const nq=document.createElement('div');nq.className='form-group';nq.innerHTML=`<label>New Quarter</label><select id="v839-new-quarter">${quarterSelect?quarterSelect.innerHTML:''}</select>`;
    nq.querySelector('select').value=currentQuarter;
    planGroup.after(ns,nq);
    const helper=planType.closest('.v838-subsection')?.querySelector('.helper');
    if(helper)helper.textContent='Change the plan here once. Tool Countdown, Shipping Center, Operations Center and Live Status update from this Tool record.';
    planType.addEventListener('change',updatePlanControls);
    updatePlanControls();
  }
  const hist=$('#tool-section-history');
  if(hist && /No plan changes recorded/i.test(hist.textContent||''))hist.remove();
  $$('.v838-admin-note').forEach(x=>{if(/Custom Fields/i.test(x.textContent||''))x.remove()});
}
function applyPendingPlanChange(){
  const master=$('.v838-master-tool'); if(!master)return;
  const type=planMode(), ns=$('#v839-new-ship'), nq=$('#v839-new-quarter'), ship=$('#tm-ship'), q=$('#tm-quarter');
  if(!ship||!q||type==='No Change')return;
  if(ns && ns.value)ship.value=ns.value;
  if(type==='Pull In'||type==='Push Out'||type==='Quarter Change'){
    if(nq && nq.value)q.value=nq.value;
  }
}
/* Capture Save before the master page's existing onclick handler collects the Tool fields. */
document.addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!b)return;
  if($('.v838-master-tool') && /^SAVE TOOL$/i.test((b.textContent||'').trim())) applyPendingPlanChange();
},true);

/* Wrap canonical Tool routes so refresh/direct links also get the cleaned UI. */
function wrapTool(fn){return function(){const out=fn.apply(this,arguments);[0,20,80].forEach(ms=>setTimeout(enhanceMaster,ms));return out}}
if(typeof window.toolStatus==='function'){window.toolStatus=wrapTool(window.toolStatus);try{toolStatus=window.toolStatus}catch(e){}}
if(typeof window.toolAdmin==='function'){window.toolAdmin=wrapTool(window.toolAdmin);try{toolAdmin=window.toolAdmin}catch(e){}}
if(typeof window.B7OpenMasterTool==='function'){const o=window.B7OpenMasterTool;window.B7OpenMasterTool=function(){const out=o.apply(this,arguments);[0,20,80].forEach(ms=>setTimeout(enhanceMaster,ms));return out}}

function boot(){
  document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
  [0,80,260].forEach(ms=>setTimeout(()=>{
    enhanceMaster();
    if(isMasterTool())applyTheme('tool',$('#headerPageTitle')?.textContent||undefined);
    else {const active=$('.main-nav .nav-btn.active');applyTheme(keyForView(active?.dataset.view||document.body.dataset.theme||'home'));}
  },ms));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
