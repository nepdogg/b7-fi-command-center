/* B7 FI Command Center v0.51.0 — Friday Field-Test Consolidated */
(function(){
'use strict';
const VERSION='0.51.2';
const esc51=(v)=>typeof esc==='function'?esc(String(v??'')):String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nowISO51=()=>new Date().toISOString();
const today51=()=>{let d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const fmtTime51=(d)=>new Date(d).toLocaleString();

function ensure51(){
 state.morningLastUpdatedAt=state.morningLastUpdatedAt||'';
 state.actionDisplay=state.actionDisplay||{};
 state.actionFirstSeen=state.actionFirstSeen||{};
 state.meetingCenter=state.meetingCenter||{
   templates:[
    {id:'leads',name:'Leads Meeting',recurring:true},
    {id:'orb',name:'ORB Meeting',recurring:true},
    {id:'fe-options',name:'FE Options Meeting',recurring:true},
    {id:'cell',name:'Cell Meeting',recurring:true}
   ],
   records:[]
 };
 state.referenceShortcuts=state.referenceShortcuts||[
  {id:'wafer-log',name:'Wafer Log',description:'Live SharePoint wafer log / transactions.',url:'',active:true},
  {id:'legacy-status',name:'Legacy B7 FI Status Spreadsheet',description:'Original live B7 FI status workbook.',url:'',active:true},
  {id:'legacy-notes-link',name:'Legacy FI Status / Notes Word Document',description:'Original live working notes document.',url:'',active:true}
 ];
 state.escalationRecords=state.escalationRecords||{};
 state.knowledgeRecent=Array.isArray(state.knowledgeRecent)?state.knowledgeRecent:[];
 state.toolExceptions=state.toolExceptions||{};
 state.exceptionTypes=Array.isArray(state.exceptionTypes)?state.exceptionTypes:[
  {id:'no-cables',label:'NO CABLES',severity:'orange'},
  {id:'no-chiller',label:'NO CHILLER',severity:'orange'},
  {id:'special-packing',label:'SPECIAL PACKING',severity:'yellow'},
  {id:'special-wafers',label:'SPECIAL WAFERS',severity:'yellow'},
  {id:'customer-specific',label:'CUSTOMER REQUIREMENT',severity:'blue'}
 ];
}
ensure51();

/* ---------------- Professional header / page themes ---------------- */
const theme51={
 home:['#e4b84d','228,184,77'],countdown:['#e4b84d','228,184,77'],shipping:['#40c7d5','64,199,213'],
 customer:['#8a78e6','138,120,230'],daily:['#41c77b','65,199,123'],meeting:['#ef9a4a','239,154,74'],
 meetingcenter:['#5a9fe8','90,159,232'],leads:['#b778ea','183,120,234'],weekend:['#9975de','153,117,222'],
 workspace:['#6b82e8','107,130,232'],systems:['#55b7b8','85,183,184'],actions:['#ff6b55','255,107,85'],
 wallboard:['#e4b84d','228,184,77'],knowledge:['#53c5ad','83,197,173'],references:['#48c9ba','72,201,186'],
 archive:['#8d98a8','141,152,168'],shared:['#5c8be8','92,139,232'],admin:['#aeb9c6','174,185,198']
};
function syncTheme51(){
 let th=document.body.dataset.theme||view||'home', pair=theme51[th]||theme51.home;
 document.body.style.setProperty('--accent',pair[0]);
 document.body.style.setProperty('--accent-rgb',pair[1]);
 document.body.style.setProperty('--live-page-accent',pair[0]);
 document.body.style.setProperty('--live-page-rgb',pair[1]);
 document.body.style.setProperty('--fleet-accent',pair[0]);
 document.body.style.setProperty('--fleet-rgb',pair[1]);
}
new MutationObserver(syncTheme51).observe(document.body,{attributes:true,attributeFilter:['data-theme']});

/* ---------------- Morning status = master daily editing console ---------------- */
function morningList51(){
 if(typeof orderedMorningTools==='function')return orderedMorningTools();
 let a=tools.filter(t=>!['Shipped','Archive'].includes(t.quarterStatus));
 return a;
}
function routeOptions51(t,selected){
 let r=typeof routeFor==='function'?routeFor(t):[];
 return r.map(x=>`<option value="${esc51(x[0])}" ${x[0]===selected?'selected':''}>${esc51(x[0])} — ${esc51(x[1]||'')}</option>`).join('');
}
function morningAdmin51(){
 let a=morningList51();
 return `<section class="panel morning-master51">
  <div class="subsection-title"><div><h3>Morning / Shift Quick Update</h3><p class="helper">Master daily edit view. UTID and Model are locked identity fields; all operational fields update the same Tool record used throughout the Command Center.</p></div><div class="morning-save-status51">${state.morningLastUpdatedAt?`Last Saved ${esc51(fmtTime51(state.morningLastUpdatedAt))}`:'Not saved in this session yet'}</div></div>
  <div class="morning-card-list51">${a.map((t,i)=>{
    let mi=typeof microScheduleInfo==='function'?microScheduleInfo(t):null;
    return `<article class="morning-edit-card51" data-m51="${esc51(t.id)}" data-old-ship="${esc51(t.ship||'')}" data-old-customer="${esc51(t.customer||'')}" data-old-so="${esc51(t.so||'')}" data-old-driver="${esc51(t.driver||'')}" data-old-room="${esc51(t.room||'')}" data-old-bay="${esc51(t.bay||'')}">
      <div class="morning-card-head51"><span class="order51">${i+1}</span><div><b>${esc51(t.id)}</b><small>${esc51(t.model)} · ${esc51(t.codename)}</small></div><span class="morning-updated51">${t.lastUpdatedAt?`Updated ${esc51(fmtTime51(t.lastUpdatedAt))}`:'No update timestamp'}</span></div>
      <div class="morning-fields51">
       <div class="form-group lock51"><label>UTID</label><input value="${esc51(t.id)}" disabled></div>
       <div class="form-group lock51"><label>Model</label><input value="${esc51(t.model)}" disabled></div>
       <div class="form-group"><label>Customer</label><input class="m51-customer" value="${esc51(t.customer||'')}"></div>
       <div class="form-group"><label>Sales Order</label><input class="m51-so" value="${esc51(t.so||'')}"></div>
       <div class="form-group"><label>Customer / MFG Ship Date</label><input class="m51-ship" type="date" value="${esc51(t.ship||'')}"></div>
       <div class="form-group"><label>Location</label><div class="inline51"><select class="m51-room">${['CR1','CR2','CR3'].map(x=>`<option ${x===t.room?'selected':''}>${x}</option>`).join('')}</select><input class="m51-bay" placeholder="Bay" value="${esc51(t.bay||'')}"></div></div>
       <div class="form-group"><label>SW Version</label><input class="m51-sw" value="${esc51(t.sw||'')}"></div>
       <div class="form-group"><label>Assigned Lead / Driver</label><input class="m51-driver" value="${esc51(t.driver||'')}"></div>
       <div class="form-group wide2"><label>Actual Current Checklist</label><select class="m51-check">${routeOptions51(t,t.checklist)}</select></div>
       <div class="form-group wide2 micro51"><label>Micro Schedule Target</label><select class="m51-micro"><option value="">Target Not Set</option>${routeOptions51(t,t.microTargetChecklist)}</select><small>${mi?.set?esc51(mi.label):'Set the planned checklist during status preparation.'}</small></div>
       <div class="form-group"><label>Lamp Hours</label><input class="m51-lamp" inputmode="numeric" value="${esc51(String(t.lamp??''))}"></div>
       <div class="form-group"><label>Lamp State</label><select class="m51-lampstate"><option ${t.lampState!=='OFF'?'selected':''}>ON</option><option ${t.lampState==='OFF'?'selected':''}>OFF</option></select></div>
       <div class="form-group status51"><label>Latest Status</label><textarea class="m51-status" rows="5">${esc51(t.activity||'')}</textarea></div>
       <div class="form-group status51"><label>Notes</label><textarea class="m51-notes" rows="5">${esc51(t.notes||'')}</textarea></div>
      </div>
     </article>`;
  }).join('')}</div>
  <div class="actions sticky-save51"><button id="saveMorning51Top" class="btn primary">Save All Morning Updates</button><span id="morningConfirm51" class="save-confirm51"></span></div>
 </section>`;
}
function recordField51(t,label,oldV,newV){
 if(String(oldV??'')===String(newV??''))return;
 if(typeof recordChange==='function')recordChange(t,label,oldV,newV,'Morning Quick Update');
 else {t.changeHistory=Array.isArray(t.changeHistory)?t.changeHistory:[];t.changeHistory.unshift({at:nowISO51(),field:label,oldValue:oldV,newValue:newV,reason:'Morning Quick Update'})}
}
function saveMorning51(){
 let n=0, at=nowISO51();
 document.querySelectorAll('[data-m51]').forEach(r=>{
  let t=tools.find(x=>x.id===r.dataset.m51);if(!t)return;
  let customer=r.querySelector('.m51-customer').value.trim(),so=r.querySelector('.m51-so').value.trim(),ship=r.querySelector('.m51-ship').value;
  let room=r.querySelector('.m51-room').value,bay=r.querySelector('.m51-bay').value.trim(),driver=r.querySelector('.m51-driver').value.trim();
  recordField51(t,'Customer',t.customer,customer);recordField51(t,'Sales Order',t.so,so);recordField51(t,'Ship Date',t.ship,ship);
  recordField51(t,'Location',`${t.room||''}/${t.bay||''}`,`${room}/${bay}`);recordField51(t,'Assigned Driver',t.driver,driver);
  Object.assign(t,{customer,so,ship,room,bay,driver,sw:r.querySelector('.m51-sw').value.trim(),
   lamp:Number(String(r.querySelector('.m51-lamp').value).replace(/[^0-9.]/g,''))||0,lampState:r.querySelector('.m51-lampstate').value,
   activity:r.querySelector('.m51-status').value,notes:r.querySelector('.m51-notes').value});
  let ck=r.querySelector('.m51-check').value;
  if(ck&&ck!==t.checklist){
    if(typeof applyMorningChecklistTransition==='function')applyMorningChecklistTransition(t,ck,'Complete'); else t.checklist=ck;
  }
  let micro=r.querySelector('.m51-micro').value;
  if(micro!==t.microTargetChecklist){recordField51(t,'Micro Schedule Target',t.microTargetChecklist||'',micro);t.microTargetChecklist=micro;t.microTargetUpdatedAt=at}
  t.lastUpdatedAt=at;n++;
 });
 state.morningLastUpdatedAt=at;save();
 let c=document.getElementById('morningConfirm51');if(c)c.textContent=`✓ ${n} systems updated · ${new Date(at).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})}`;
 setTimeout(()=>admin('meeting'),900);
}

/* Preserve user-defined Morning Status order when opening Quick Update. */
const oldAdmin51=admin;
admin=function(section='home'){
 oldAdmin51(section);
 if(section==='meeting'){
   let b=document.getElementById('adminBody');if(b)b.innerHTML=morningAdmin51();
   let btn=document.getElementById('saveMorning51Top');if(btn)btn.onclick=saveMorning51;
   actions([{label:'Save Morning Updates',primary:true,fn:saveMorning51},{label:'Morning Status',fn:()=>setView('meeting')},{label:'Administration',fn:()=>admin('home')}],false);
 }
};

/* Add Micro Schedule target to Morning Status itself for instant comparison. */
const oldMorning51=morning;
morning=function(){
 oldMorning51();
 document.querySelectorAll('.v21-meeting-row').forEach(row=>{
   let id=row.querySelector('.meeting-main')?.textContent.trim().split(/\s/)[0],t=tools.find(x=>x.id===id);
   if(!t||row.querySelector('.morning-micro51'))return;
   let mi=typeof microScheduleInfo==='function'?microScheduleInfo(t):null,chip=document.createElement('div');
   chip.className=`morning-micro51 ${mi?.className||'unset'}`;
   chip.innerHTML=`<span>MICRO TARGET</span><b>${esc51(mi?.target||'—')}</b><small>${esc51(mi?.label||'TARGET NOT SET')}</small>`;
   row.querySelector('.meeting-content')?.appendChild(chip);
 });
 let strip=document.querySelector('.meeting-control-strip');
 if(strip&&state.morningLastUpdatedAt&&!strip.querySelector('.morning-global-updated51')){
   strip.querySelector('div')?.insertAdjacentHTML('beforeend',`<span class="morning-global-updated51">Last tool update: ${esc51(fmtTime51(state.morningLastUpdatedAt))}</span>`);
 }
};

/* ---------------- Action Center: automatic task display control + aging ---------------- */
function actionKey51(a){return a.id||`auto:${a.toolId||'general'}:${String(a.text||'').replace(/\s+/g,' ').slice(0,180)}`}
function control51(a){
 let k=actionKey51(a);
 if(!state.actionFirstSeen[k])state.actionFirstSeen[k]=nowISO51();
 let d=state.actionDisplay[k]||(state.actionDisplay[k]={show:true,seconds:a.severity==='red'?15:a.severity==='orange'?10:a.severity==='blue'?6:8,order:999,assignee:'',pin:false,ack:false,displayUntil:'while-open'});
 return {k,d};
}
function ageDays51(k){let x=state.actionFirstSeen[k];if(!x)return 0;return Math.max(0,Math.floor((Date.now()-new Date(x).getTime())/86400000))}
function displaySeverity51(a,k){
 let d=state.actionDisplay[k]||{}, age=ageDays51(k);
 if(a.manual)return a.severity||'yellow';
 let s=a.severity||'yellow';
 /* Testable default aging engine: generated Reminder -> Attention Day 1 -> Critical Day 2;
    generated Attention -> Critical Day 1; generated Critical stays Critical and visibly ages. */
 if(s==='yellow'&&age>=2)s='red'; else if(s==='yellow'&&age>=1)s='orange'; else if(s==='orange'&&age>=1)s='red';
 return d.forceSeverity||s;
}
function allGenerated51(){
 let raw=[];try{raw=(v3Alerts()||[])}catch(e){}
 return raw.map(a=>{let {k,d}=control51(a);return {...a,_key51:k,_ctl51:d,_severity51:displaySeverity51(a,k),_age51:ageDays51(k)}})
}
function tickerItems51(){
 return allGenerated51().filter(a=>{
  let d=a._ctl51;if(d.show===false)return false;
  if(d.displayUntil&&d.displayUntil!=='while-open'&&/^\d{4}-\d{2}-\d{2}$/.test(d.displayUntil)&&today51()>d.displayUntil)return false;
  return true;
 }).sort((a,b)=>(Number(b._ctl51.pin)-Number(a._ctl51.pin))||((a._ctl51.order||999)-(b._ctl51.order||999)));
}
let tickerIndex51=0,tickerTimer51=null,renderingTicker51=false;
function severityLabel51(s){return s==='red'?'CRITICAL':s==='orange'?'ATTENTION':s==='blue'?'INFORMATION':'REMINDER'}
function renderTicker51(reset=false){
 let bar=document.getElementById('topActionBar');if(!bar)return;
 let items=tickerItems51();
 if(!items.length){renderingTicker51=true;bar.innerHTML='<div class="top-action-clear">✓ B7 FI ACTIONS · No active status-bar actions</div>';renderingTicker51=false;return}
 if(reset)tickerIndex51=0;tickerIndex51%=items.length;let a=items[tickerIndex51],ctl=a._ctl51,s=a._severity51,age=a._age51;
 let ageText=s==='red'&&age>0?` · ${age===1?'DAY 1':`OVERDUE ${age} DAYS`}`:'';
 let owner=ctl.assignee?` · OWNER: ${ctl.assignee}`:'';
 renderingTicker51=true;
 bar.innerHTML=`<button class="top-action-current v51 ${s} ${s==='red'&&age>=2&&!ctl.ack?'critical-pulse51':''}" id="tickerOpen51"><span class="top-action-label">${s==='red'?'●':s==='orange'?'▲':s==='blue'?'ⓘ':'◆'} B7 FI ${severityLabel51(s)}${ageText}</span><strong>${esc51(a.text||'')}${esc51(owner)}</strong><span class="top-action-count">${tickerIndex51+1} / ${items.length} · ${ctl.seconds||8}s</span><span class="top-action-open">OPEN →</span></button><button id="tickerAll51" class="top-action-all">ALL ${items.length}</button>`;
 renderingTicker51=false;
 document.getElementById('tickerOpen51').onclick=()=>{if(typeof actionTarget==='function')actionTarget(a)};
 document.getElementById('tickerAll51').onclick=()=>setView('actions');
 clearTimeout(tickerTimer51);
 tickerTimer51=setTimeout(()=>{tickerIndex51=(tickerIndex51+1)%items.length;renderTicker51(false)},Math.max(3,Math.min(60,Number(ctl.seconds)||8))*1000);
}
const tickerObserver51=new MutationObserver(()=>{if(!renderingTicker51)setTimeout(()=>renderTicker51(false),0)});
setTimeout(()=>{let b=document.getElementById('topActionBar');if(b){tickerObserver51.observe(b,{childList:true,subtree:true});renderTicker51(true)}},100);

function actionControlHtml51(a){
 let {k,d}=control51(a),s=displaySeverity51(a,k),age=ageDays51(k);
 return `<div class="auto-action51 ${s}" data-auto51="${esc51(k)}">
   <button class="auto-open51" data-open-auto51="${esc51(k)}"><span class="auto-sev51">${severityLabel51(s)}${s==='red'&&age?` · DAY ${age}`:''}</span><b>${esc51(a.text||'')}</b><small>${a.manual?'MANUAL':'AUTO'}${d.assignee?` · Assigned: ${esc51(d.assignee)}`:''}</small></button>
   <div class="auto-controls51">
    <label>Assigned Lead<input class="ac-owner51" value="${esc51(d.assignee||'')}" placeholder="Optional"></label>
    <label>Status Bar<select class="ac-show51"><option value="on" ${d.show!==false?'selected':''}>ON</option><option value="off" ${d.show===false?'selected':''}>OFF</option></select></label>
    <label>Display<select class="ac-sec51">${[5,8,10,15,20,30,60].map(x=>`<option value="${x}" ${Number(d.seconds)===x?'selected':''}>${x} sec</option>`).join('')}</select></label>
    <label>Order<input class="ac-order51" type="number" min="1" value="${Number(d.order)||999}"></label>
    <label>Until<select class="ac-until-mode51"><option value="while-open" ${d.displayUntil==='while-open'?'selected':''}>While Open</option><option value="today" ${d.displayUntil===today51()?'selected':''}>Today</option><option value="custom">Custom Date</option></select></label>
    <label>Custom End<input class="ac-until51" type="date" value="${/^\d{4}-/.test(d.displayUntil||'')?d.displayUntil:''}"></label>
    <label class="check51"><input class="ac-pin51" type="checkbox" ${d.pin?'checked':''}> Pin</label>
    <label class="check51"><input class="ac-ack51" type="checkbox" ${d.ack?'checked':''}> Acknowledge / Working</label>
    <button class="btn small primary ac-save51">Save Display</button>
   </div>
  </div>`;
}
function actionCenter51(){
 setHeaderContext('ACTION CENTER','Automatic operational memory · assignment · status-bar control');
 let a=allGenerated51(),groups=[['red','CRITICAL'],['orange','ATTENTION'],['yellow','REMINDERS / NEXT ACTIONS'],['blue','INFORMATION']];
 app.innerHTML=`<div class="action-summary-grid">${groups.map(([s,l])=>`<div class="action-summary ${s}"><span>${l}</span><strong>${a.filter(x=>x._severity51===s).length}</strong></div>`).join('')}</div>
 <section class="panel action-rules51"><div><h3>Automatic Alert Aging</h3><p>Generated tasks begin at their normal category and automatically become harder to ignore while unresolved. Reminder → Attention on Day 1 → Critical on Day 2. Attention → Critical on Day 1. Critical items gain stronger aging treatment; Day 2+ pulses briefly when displayed unless acknowledged.</p></div></section>
 <div class="action-center-grid">${groups.map(([s,l])=>`<section class="panel action-group"><h3>${l}</h3>${a.filter(x=>x._severity51===s).map(actionControlHtml51).join('')||'<div class="notice">No items in this group.</div>'}</section>`).join('')}</div>
 <section class="panel"><div class="subsection-title"><h3>Add Manual Reminder / Information</h3><p class="helper">Manual items keep the category selected by the creator. Automatic tool tasks remain generated by the Command Center.</p></div>
  <div class="manual-reminder-form"><select id="mrTool51"><option value="">General</option>${(typeof current==='function'?current():tools).map(t=>`<option value="${esc51(t.id)}">${esc51(t.id)} · ${esc51(t.codename)}</option>`).join('')}</select>
   <select id="mrSeverity51"><option value="yellow">Reminder</option><option value="orange">Attention</option><option value="red">Critical</option><option value="blue">Information</option></select>
   <input id="mrText51" placeholder="Reminder / follow-up / information"><button id="mrAdd51" class="btn primary">Add</button></div>
 </section>`;
 let byKey=new Map(a.map(x=>[x._key51,x]));
 document.querySelectorAll('[data-auto51]').forEach(card=>{
  let a=byKey.get(card.dataset.auto51);if(!a)return;
  card.querySelector('.auto-open51').onclick=()=>typeof actionTarget==='function'&&actionTarget(a);
  card.querySelector('.ac-save51').onclick=()=>{
   let d=state.actionDisplay[a._key51]||{};
   d.assignee=card.querySelector('.ac-owner51').value.trim();d.show=card.querySelector('.ac-show51').value==='on';
   d.seconds=Number(card.querySelector('.ac-sec51').value)||8;d.order=Number(card.querySelector('.ac-order51').value)||999;
   d.pin=card.querySelector('.ac-pin51').checked;d.ack=card.querySelector('.ac-ack51').checked;
   let mode=card.querySelector('.ac-until-mode51').value,custom=card.querySelector('.ac-until51').value;
   d.displayUntil=mode==='while-open'?'while-open':mode==='today'?today51():(custom||'while-open');
   state.actionDisplay[a._key51]=d;save();renderTicker51(true);actionCenter51();
  };
 });
 let add=document.getElementById('mrAdd51');if(add)add.onclick=()=>{
  let text=document.getElementById('mrText51').value.trim();if(!text)return;
  state.manualReminders=Array.isArray(state.manualReminders)?state.manualReminders:[];
  let sev=document.getElementById('mrSeverity51').value,id='mr'+Date.now();
  state.manualReminders.unshift({id,toolId:document.getElementById('mrTool51').value,severity:sev,text,complete:false,createdAt:nowISO51()});
  save();actionCenter51();renderTicker51(true);
 };
 actions([{label:'Morning Status',fn:()=>setView('meeting')},{label:'Lead Workspace',fn:()=>setView('workspace')},{label:'Tools',fn:()=>setView('systems')}],false);
}

/* ---------------- Knowledge Base: category -> collapsed note -> expanded detail ---------------- */
function kbCategories51(){
 let a=Array.isArray(state.knowledgeNotes)?state.knowledgeNotes:[];
 return [...new Set(a.map(n=>n.category||'General Reference'))].sort();
}
function markRecent51(id){
 state.knowledgeRecent=[id,...state.knowledgeRecent.filter(x=>x!==id)].slice(0,10);save();
}
function kbRow51(n){
 return `<details class="kb-note51" data-kb51="${esc51(n.id)}"><summary><span>${n.favorite?'★':'☆'}</span><b>${esc51(n.title||'Untitled Reference')}</b><small>${n.partNumber?`PN ${esc51(n.partNumber)} · `:''}${esc51(n.toolModel||'')}${n.updatedAt?` · Updated ${new Date(n.updatedAt).toLocaleDateString()}`:''}</small></summary>
 <div class="kb-detail51">${n.value?`<div class="kb-value51"><span>QUICK REFERENCE</span><b>${esc51(n.value)}</b></div>`:''}${n.notes?`<div class="kb-body51">${esc51(n.notes).replace(/\n/g,'<br>')}</div>`:''}${n.tags?`<div class="kb-tags51">${esc51(n.tags)}</div>`:''}
 <div class="actions"><button class="btn small kb-edit51">Edit</button><button class="btn small kb-copy51">Copy</button><button class="btn small kb-fav51">${n.favorite?'Unfavorite':'Favorite'}</button></div></div></details>`;
}
function knowledgePage51(){
 view='knowledge';document.body.dataset.theme='knowledge';setHeaderContext('FI KNOWLEDGE BASE','Special Notes · Quick Reference');
 let a=Array.isArray(state.knowledgeNotes)?state.knowledgeNotes:[],fav=a.filter(n=>n.favorite),recent=state.knowledgeRecent.map(id=>a.find(n=>n.id===id)).filter(Boolean);
 app.innerHTML=`<div class="report-screen kb-page51">${reportHeader('FI KNOWLEDGE BASE / SPECIAL NOTES','Fast searchable electronic reference manual for FI knowledge.')}
 <section class="panel kb-toolbar51"><div class="kb-search51"><input id="kbQ51" type="search" placeholder="Search title, part number, notes or tags…"><button id="kbAdd51" class="btn primary">+ Add Reference Note</button></div><div class="kb-stats51">${a.length} notes · ${fav.length} favorites</div></section>
 ${fav.length?`<section class="panel kb-section51"><h3>★ FAVORITES · ${fav.length}</h3>${fav.map(kbRow51).join('')}</section>`:''}
 ${recent.length?`<section class="panel kb-section51 recent51"><h3>RECENTLY USED · ${recent.length}</h3>${recent.slice(0,5).map(kbRow51).join('')}</section>`:''}
 <div id="kbCatHost51">${kbCategories51().map(cat=>{let x=a.filter(n=>(n.category||'General Reference')===cat);return `<details class="panel kb-category51" open><summary>${esc51(cat.toUpperCase())} · ${x.length} NOTE${x.length===1?'':'S'}</summary><div>${x.map(kbRow51).join('')}</div></details>`}).join('')||'<div class="notice">No notes yet. Use + Add Reference Note.</div>'}</div></div>`;
 function wire(){
  document.querySelectorAll('.kb-note51').forEach(d=>{
   d.ontoggle=()=>{if(d.open)markRecent51(d.dataset.kb51)};
   let n=a.find(x=>x.id===d.dataset.kb51);if(!n)return;
   d.querySelector('.kb-copy51')?.addEventListener('click',async e=>{e.preventDefault();let txt=[n.title,n.partNumber&&`Part Number: ${n.partNumber}`,n.value,n.notes].filter(Boolean).join('\n');try{await navigator.clipboard.writeText(txt)}catch(err){prompt('Copy reference:',txt)}});
   d.querySelector('.kb-fav51')?.addEventListener('click',e=>{e.preventDefault();n.favorite=!n.favorite;save();knowledgePage51()});
   d.querySelector('.kb-edit51')?.addEventListener('click',e=>{e.preventDefault();if(typeof openKbEditor49==='function')openKbEditor49(n.id);else alert('Use Administration / existing editor to edit this note in this build.')});
  });
 }
 wire();
 let q=document.getElementById('kbQ51');if(q)q.oninput=()=>{
  let s=q.value.toLowerCase().trim();
  document.querySelectorAll('.kb-note51').forEach(d=>{let n=a.find(x=>x.id===d.dataset.kb51),hay=[n?.title,n?.partNumber,n?.toolModel,n?.value,n?.notes,n?.tags].join(' ').toLowerCase();d.style.display=!s||hay.includes(s)?'':'none';if(s&&hay.includes(s))d.open=true});
 };
 let add=document.getElementById('kbAdd51');if(add)add.onclick=()=>{setView('knowledge');setTimeout(()=>{if(typeof openKbEditor49==='function')openKbEditor49('');else alert('Use the existing Knowledge Base Add Reference Note control in Administration.')},0)};
 actions([{label:'Reference Center',primary:true,fn:()=>setView('references')},{label:'Lead Workspace',fn:()=>setView('workspace')}],false);
}

/* ---------------- Reference Center: shortcuts + planning file previews ---------------- */
function referenceShortcuts51(){
 return `<section class="panel ref-live51"><div class="subsection-title"><div><h3>LIVE SHAREPOINT / FI RESOURCES</h3><p class="helper">Permanent links replace browser favorites. Configure each URL once.</p></div></div><div class="ref-short-grid51">
 ${state.referenceShortcuts.filter(x=>x.active!==false).map(x=>`<article class="ref-short51" data-refshort51="${esc51(x.id)}"><div><b>${esc51(x.name)}</b><p>${esc51(x.description||'')}</p></div><input class="ref-url51" value="${esc51(x.url||'')}" placeholder="Paste SharePoint URL"><div class="actions"><button class="btn small ref-save51">Save Link</button><button class="btn small primary ref-open51" ${x.url?'':'disabled'}>Open Live File</button></div></article>`).join('')}
 </div></section>
 <section class="panel ref-kb-card51" id="openKnowledge51"><div><span>COMMAND CENTER REFERENCE</span><h3>FI Knowledge Base</h3><p>Part numbers, procedures, recurring information, troubleshooting and special FI notes.</p></div><b>OPEN KNOWLEDGE BASE →</b></section>`;
}
const oldReferences51=referencesPage;
referencesPage=function(){
 oldReferences51();
 let dash=document.querySelector('.reference-dashboard');
 if(dash){
  dash.insertAdjacentHTML('afterbegin',referenceShortcuts51());
  let h=dash.querySelector('.reference-dashboard-head h2');if(h)h.textContent='FI Reference Center';
  let p=dash.querySelector('.reference-dashboard-head p');if(p)p.textContent='One doorway to live SharePoint resources, manager-supplied planning files, legacy references and the FI Knowledge Base.';
 }
 document.getElementById('openKnowledge51')?.addEventListener('click',()=>setView('knowledge'));
 document.querySelectorAll('[data-refshort51]').forEach(card=>{
  let x=state.referenceShortcuts.find(y=>y.id===card.dataset.refshort51);if(!x)return;
  card.querySelector('.ref-save51').onclick=()=>{x.url=card.querySelector('.ref-url51').value.trim();save();referencesPage()};
  card.querySelector('.ref-open51').onclick=()=>{if(x.url)window.open(x.url,'_blank')};
 });
 actions([{label:'FI Knowledge Base',primary:true,fn:()=>setView('knowledge')},{label:'Tool Countdown',fn:()=>setView('countdown')},{label:'Shipping Schedule',fn:()=>setView('shipping')}],false);
};

/* Offline-safe basic DOCX preview: extracts Word document.xml from the ZIP and renders paragraphs/tables.
   No cloud service or external CDN is required for DOCX text preview. */
async function inflateRaw51(bytes){
 if(!('DecompressionStream' in window))throw new Error('This browser cannot decompress DOCX locally.');
 let ds=new DecompressionStream('deflate-raw'),ab=await new Response(new Blob([bytes]).stream().pipeThrough(ds)).arrayBuffer();return new Uint8Array(ab);
}
async function zipFile51(file,nameWanted){
 let data=new Uint8Array(await file.arrayBuffer()),dv=new DataView(data.buffer),sig=0x06054b50,e=-1;
 for(let i=data.length-22;i>=Math.max(0,data.length-65557);i--){if(dv.getUint32(i,true)===sig){e=i;break}}
 if(e<0)throw new Error('DOCX ZIP directory not found.');
 let count=dv.getUint16(e+10,true),pos=dv.getUint32(e+16,true);
 for(let n=0;n<count;n++){
  if(dv.getUint32(pos,true)!==0x02014b50)break;
  let method=dv.getUint16(pos+10,true),csize=dv.getUint32(pos+20,true),nlen=dv.getUint16(pos+28,true),elen=dv.getUint16(pos+30,true),clen=dv.getUint16(pos+32,true),off=dv.getUint32(pos+42,true);
  let name=new TextDecoder().decode(data.slice(pos+46,pos+46+nlen));
  if(name===nameWanted){
    let ln=dv.getUint16(off+26,true),le=dv.getUint16(off+28,true),start=off+30+ln+le,comp=data.slice(start,start+csize);
    return method===0?comp:method===8?await inflateRaw51(comp):Promise.reject(new Error('Unsupported DOCX compression.'));
  }
  pos+=46+nlen+elen+clen;
 }
 throw new Error(`${nameWanted} not found.`);
}
async function previewDocx51(file,box){
 try{
  let bytes=await zipFile51(file,'word/document.xml'),xml=new TextDecoder().decode(bytes),doc=new DOMParser().parseFromString(xml,'application/xml');
  let ns='http://schemas.openxmlformats.org/wordprocessingml/2006/main',blocks=[];
  let body=doc.getElementsByTagNameNS(ns,'body')[0];
  [...body.children].forEach(el=>{
   if(el.localName==='p'){
    let text=[...el.getElementsByTagNameNS(ns,'t')].map(t=>t.textContent).join('');
    if(text.trim())blocks.push(`<p>${esc51(text)}</p>`);
   }else if(el.localName==='tbl'){
    let rows=[...el.getElementsByTagNameNS(ns,'tr')].map(tr=>`<tr>${[...tr.getElementsByTagNameNS(ns,'tc')].map(tc=>`<td>${esc51([...tc.getElementsByTagNameNS(ns,'t')].map(t=>t.textContent).join(' '))}</td>`).join('')}</tr>`).join('');
    blocks.push(`<table>${rows}</table>`);
   }
  });
  box.innerHTML=`<div class="docx-preview51"><div class="docx-search51"><input type="search" placeholder="Search legacy notes…"></div><div class="docx-body51">${blocks.join('')||'<p>No readable text found.</p>'}</div></div>`;
  let q=box.querySelector('input'),bodyEl=box.querySelector('.docx-body51'),original=bodyEl.innerHTML;
  q.oninput=()=>{let s=q.value.trim();bodyEl.innerHTML=original;if(!s)return;let walker=document.createTreeWalker(bodyEl,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{let i=n.nodeValue.toLowerCase().indexOf(s.toLowerCase());if(i>=0){let frag=document.createDocumentFragment();frag.append(n.nodeValue.slice(0,i));let mark=document.createElement('mark');mark.textContent=n.nodeValue.slice(i,i+s.length);frag.append(mark,n.nodeValue.slice(i+s.length));n.replaceWith(frag)}})};
 }catch(e){box.innerHTML=`<div class="notice bad">DOCX preview could not render: ${esc51(e.message)}. Open Original is still available.</div>`}
}
const oldRefsDocx51=referencesPage;
referencesPage=function(){
 oldRefsDocx51();
 setTimeout(()=>{
  let s=typeof referenceSession!=='undefined'?referenceSession.legacyNotes:null,box=document.getElementById('legacyPreview47');
  if(s&&box&&/\.docx$/i.test(s.file.name||''))previewDocx51(s.file,box);
 },0);
};

/* ---------------- Lead Workspace cleanup ---------------- */
const oldWorkspace51=workspace;
workspace=function(tab='tasks'){
 oldWorkspace51(tab);
 setTimeout(()=>{
  [...document.querySelectorAll('#app button')].forEach(b=>{if(b.textContent.trim()==='Reference')b.remove()});
  let refHeading=[...document.querySelectorAll('#app h3')].find(h=>h.textContent.trim()==='FI Knowledge Base / Special Notes'||h.textContent.trim()==='Reference');
  if(refHeading&&tab!=='tasks')setView('knowledge');
 },0);
};

/* ---------------- Weekend screenshot/report cleanup ---------------- */
const oldWeekend51=weekend;
weekend=function(){
 oldWeekend51();
 [...document.querySelectorAll('#app h3')].forEach(h=>{if(h.textContent.trim()==='B7 WEEKEND TOOL PRIORITIES')h.remove()});
};

/* ---------------- Meeting Center: recurring + ad-hoc meetings ---------------- */
function saveMeetingCenter51(rec){
 let i=state.meetingCenter.records.findIndex(x=>x.id===rec.id);if(i>=0)state.meetingCenter.records[i]=rec;else state.meetingCenter.records.unshift(rec);save();
}
function meetingEditor51(rec){
 let a=tools.filter(t=>!['Archive'].includes(t.quarterStatus));
 app.innerHTML=`<div class="report-screen">${reportHeader(rec.title,`Meeting workspace · ${fmtTime51(rec.startedAt)}`)}
 <section class="panel generic-meeting51"><div class="subsection-title"><div><h3>${esc51(rec.title)}</h3><p class="helper">Take notes, link tool-specific notes, create actions, and preserve the meeting history.</p></div><button id="saveMeet51" class="btn primary">Save Meeting</button></div>
 <textarea id="meetNotes51" rows="12" placeholder="General meeting notes…">${esc51(rec.notes||'')}</textarea>
 <div class="meeting-link-action51"><select id="meetTool51"><option value="">General / No Tool</option>${a.map(t=>`<option value="${esc51(t.id)}">${esc51(t.id)} · ${esc51(t.codename)}</option>`).join('')}</select><input id="meetAction51" placeholder="Action item from this meeting"><input id="meetOwner51" placeholder="Assigned lead"><button id="addMeetAction51" class="btn">+ Add Action</button></div>
 <div class="meeting-action-history51">${(rec.actions||[]).map(x=>`<div><b>${esc51(x.title)}</b><span>${esc51(x.toolId||'General')} · ${esc51(x.assignee||'Unassigned')}</span></div>`).join('')||'<span class="gray">No actions created from this meeting.</span>'}</div>
 </section></div>`;
 document.getElementById('saveMeet51').onclick=()=>{rec.notes=document.getElementById('meetNotes51').value;rec.updatedAt=nowISO51();saveMeetingCenter51(rec);meetingCenter51()};
 document.getElementById('addMeetAction51').onclick=()=>{
  let title=document.getElementById('meetAction51').value.trim();if(!title)return;
  let toolId=document.getElementById('meetTool51').value,assignee=document.getElementById('meetOwner51').value.trim(),id='mca'+Date.now();
  rec.actions=Array.isArray(rec.actions)?rec.actions:[];rec.actions.push({id,title,toolId,assignee,status:'Open',createdAt:nowISO51()});
  state.workspaceTasks=Array.isArray(state.workspaceTasks)?state.workspaceTasks:[];state.workspaceTasks.unshift({id,title,toolId,assignee,status:'Open',priority:'Normal',source:`Meeting Center · ${rec.title}`,createdAt:nowISO51(),showTicker:true,tickerSeconds:8});
  saveMeetingCenter51(rec);meetingEditor51(rec);
 };
 actions([{label:'Meeting Center',fn:meetingCenter51},{label:'Action Center',fn:()=>setView('actions')}],false);
}
function startMeeting51(templateId='',title=''){
 let t=state.meetingCenter.templates.find(x=>x.id===templateId),rec={id:'meet'+Date.now(),templateId,title:title||t?.name||'Ad-hoc Meeting',startedAt:nowISO51(),updatedAt:nowISO51(),notes:'',actions:[]};saveMeetingCenter51(rec);meetingEditor51(rec);
}
function meetingCenter51(){
 view='meetingcenter';document.body.dataset.theme='meetingcenter';setHeaderContext('MEETING CENTER','Recurring + ad-hoc meeting notebook');
 let recs=state.meetingCenter.records||[];
 app.innerHTML=`<div class="report-screen">${reportHeader('B7 FI MEETING CENTER','Start any meeting immediately, create actions, and keep searchable history.')}
 <section class="panel start-now51"><div><h3>START MEETING NOW</h3><p>Use this for an unexpected meeting without configuring anything first.</p></div><input id="adhocTitle51" placeholder="Meeting name"><button id="adhocStart51" class="btn primary">+ Start Meeting Now</button></section>
 <section class="meeting-template-grid51">${state.meetingCenter.templates.map(t=>`<button data-template51="${esc51(t.id)}" class="meeting-template51"><span>RECURRING</span><b>${esc51(t.name)}</b><small>Start new meeting →</small></button>`).join('')}</section>
 <section class="panel"><h3>Meeting History</h3>${recs.slice(0,30).map(r=>`<details class="meeting-record51"><summary><b>${esc51(r.title)}</b><span>${esc51(fmtTime51(r.startedAt))} · ${(r.actions||[]).length} actions</span></summary><div><p>${esc51(r.notes||'No notes').replace(/\n/g,'<br>')}</p><div class="actions"><button class="btn small" data-openmeet51="${esc51(r.id)}">Open / Edit</button><button class="btn small" data-addmeetaction51="${esc51(r.id)}">+ Action</button></div></div></details>`).join('')||'<div class="notice">No Meeting Center history yet.</div>'}</section></div>`;
 document.getElementById('adhocStart51').onclick=()=>startMeeting51('',document.getElementById('adhocTitle51').value.trim()||'Ad-hoc Meeting');
 document.querySelectorAll('[data-template51]').forEach(b=>b.onclick=()=>startMeeting51(b.dataset.template51));
 document.querySelectorAll('[data-openmeet51]').forEach(b=>b.onclick=()=>{let r=recs.find(x=>x.id===b.dataset.openmeet51);if(r)meetingEditor51(r)});
 document.querySelectorAll('[data-addmeetaction51]').forEach(b=>b.onclick=()=>{let r=recs.find(x=>x.id===b.dataset.addmeetaction51);if(r)meetingEditor51(r)});
 actions([{label:'+ Start Meeting Now',primary:true,fn:()=>startMeeting51('','Ad-hoc Meeting')},{label:'Morning Status',fn:()=>setView('meeting')}],false);
}

/* ---------------- Tool escalation / POA history ---------------- */
function escalationPanel51(t){
 let escal=(t.ncs||[]).filter(n=>typeof isEscalatedNc==='function'&&isEscalatedNc(n));
 if(!escal.length)return'';
 return `<section class="panel escalation-panel51"><div class="subsection-title"><div><h3>Escalation Meetings / POA</h3><p class="helper">Meeting and POA history remains attached to this tool / NC until resolution.</p></div></div>${escal.map(n=>{
  let key=`${t.id}:${n.id}`,r=state.escalationRecords[key]||(state.escalationRecords[key]={toolId:t.id,ncId:n.id,meetings:[],poa:[]});
  return `<details class="escalation-record51" open data-eskey51="${esc51(key)}"><summary><b>${esc51(n.id)} · ESCALATED</b><span>Day ${n.days||1} · ${r.meetings.length} meetings · ${r.poa.length} POA revisions</span></summary><div><p>${esc51(n.desc||'')}</p><div class="actions"><button class="btn small esc-meeting51">+ Escalation Meeting</button><button class="btn small esc-poa51">+ POA Revision</button></div>${r.meetings.slice().reverse().map(m=>`<div class="esc-history51"><b>${esc51(fmtTime51(m.at))}</b><div>${esc51(m.notes).replace(/\n/g,'<br>')}</div></div>`).join('')}${r.poa.slice().reverse().map((p,i)=>`<div class="poa-history51"><b>POA · ${esc51(fmtTime51(p.at))}</b><div>${esc51(p.text).replace(/\n/g,'<br>')}</div></div>`).join('')}</div></details>`;
 }).join('')}</section>`;
}
const oldToolStatus51=toolStatus;
toolStatus=function(id){
 oldToolStatus51(id);
 setTimeout(()=>{
  let t=tools.find(x=>x.id===id),host=document.querySelector('.report-screen');if(!t||!host||document.querySelector('.escalation-panel51'))return;
  host.insertAdjacentHTML('beforeend',escalationPanel51(t));
  document.querySelectorAll('[data-eskey51]').forEach(d=>{
   let r=state.escalationRecords[d.dataset.eskey51];if(!r)return;
   d.querySelector('.esc-meeting51').onclick=()=>{let notes=prompt('Escalation meeting notes:','');if(!notes)return;r.meetings.push({at:nowISO51(),notes});save();toolStatus(t.id)};
   d.querySelector('.esc-poa51').onclick=()=>{let text=prompt('POA revision / engineering direction:','');if(!text)return;r.poa.push({at:nowISO51(),text});save();toolStatus(t.id)};
  });
 },0);
};

/* ---------------- Home enhancements ---------------- */
function enhanceHome51(){
 if(view!=='home')return;
 let grid=document.querySelector('.home-grid500');if(!grid)return;
 if(!grid.querySelector('[data-home-view="meetingcenter"]'))grid.insertAdjacentHTML('beforeend',`<button class="home-card500" data-home-view="meetingcenter"><span>MEETING CENTER</span><strong>NOTES</strong><small>Leads · ORB · FE Options · Cell · Ad-hoc</small><b>OPEN →</b></button>`);
 grid.querySelectorAll('[data-home-view]').forEach(b=>b.onclick=()=>setView(b.dataset.homeView));
}

/* ---------------- Router finalization ---------------- */
const oldSetView51=setView;
setView=function(v){
 if(v==='meetingcenter'){window.scrollTo(0,0);meetingCenter51();syncTheme51();return}
 if(v==='knowledge'){window.scrollTo(0,0);knowledgePage51();syncTheme51();return}
 if(v==='actions'){window.scrollTo(0,0);view='actions';document.body.dataset.theme='actions';document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='actions'));actionCenter51();syncTheme51();return}
 oldSetView51(v);
 setTimeout(()=>{syncTheme51();enhanceHome51();renderTicker51(false)},0);
};
const oldRender51=render;
render=function(){
 if(view==='meetingcenter'){meetingCenter51();return}
 if(view==='knowledge'){knowledgePage51();return}
 if(view==='actions'){actionCenter51();return}
 oldRender51();
 setTimeout(()=>{syncTheme51();enhanceHome51();renderTicker51(false)},0);
};
document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>setView(b.dataset.view));

/* Add branded report header to generated report windows through the existing Report Center button. */

/* ---------------- v0.51.2 Global navigation-state + home-card polish ---------------- */
function syncActiveNav512(targetView){
 const v=targetView||view||document.body.dataset.theme||'home';
 document.querySelectorAll('.nav-btn').forEach(btn=>{
   const active=btn.dataset.view===v;
   btn.classList.toggle('active',active);
   btn.setAttribute('aria-current',active?'page':'false');
 });
}

/* Keep active navigation correct even for pages rendered directly by patched functions. */
const _meetingCenter512=meetingCenter51;
meetingCenter51=function(){
 _meetingCenter512();
 syncActiveNav512('meetingcenter');
};

const _knowledge512=knowledgePage51;
knowledgePage51=function(){
 _knowledge512();
 syncActiveNav512('knowledge');
};

const _references512=referencesPage;
referencesPage=function(){
 _references512();
 syncActiveNav512('references');
};

const _actionCenter512=actionCenter51;
actionCenter51=function(){
 _actionCenter512();
 syncActiveNav512('actions');
};

const _admin512=admin;
admin=function(section='home'){
 _admin512(section);
 syncActiveNav512('admin');
};

const _workspace512=workspace;
workspace=function(tab='tasks'){
 _workspace512(tab);
 syncActiveNav512('workspace');
};

const _weekend512=weekend;
weekend=function(){
 _weekend512();
 syncActiveNav512('weekend');
};

const _morning512=morning;
morning=function(){
 _morning512();
 syncActiveNav512('meeting');
};

const _toolStatus512=toolStatus;
toolStatus=function(id){
 _toolStatus512(id);
 syncActiveNav512('systems');
};

/* Final router guard: active state always follows the requested view. */
const _setView512=setView;
setView=function(v){
 _setView512(v);
 setTimeout(()=>syncActiveNav512(v),0);
};

/* Every clickable Home live card uses the same interaction language as Tool Countdown cards. */
function homeHoverPolish512(){
 document.querySelectorAll('.home-card500,.home500 .metric-card,.home500 [data-home-view]').forEach(card=>{
   if(card.dataset.hover512==='1')return;
   card.dataset.hover512='1';
   card.classList.add('cc-live-card512');
 });
}
const _enhanceHome512=enhanceHome51;
enhanceHome51=function(){
 _enhanceHome512();
 homeHoverPolish512();
};

/* Initial sync */
setTimeout(()=>{syncActiveNav512(view||'home');homeHoverPolish512();},120);

document.title=`B7 FI Command Center v${VERSION}`;
let ver=document.getElementById('appVersionLabel');if(ver)ver.textContent=`B7 FI Command Center v${VERSION}`;
/* index.html must always open on Operations Home.
   Navigation can still move to Tool Countdown normally after startup. */
try{
  view='home';
  document.body.dataset.theme='home';
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='home'));
  render();
}catch(e){}
setTimeout(()=>{syncTheme51();enhanceHome51();renderTicker51(true)},100);
})();