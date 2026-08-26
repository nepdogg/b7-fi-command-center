/* B7 FI Command Center v1.0.3 consolidated runtime. ONE JavaScript payload. */
window.B7_APP_VERSION='1.0.3'; window.VERSION='1.0.3';
const __B7_NATIVE_MO = window.MutationObserver;
window.MutationObserver = class B7LegacyObserverDisabled { constructor(){ } observe(){ } disconnect(){ } takeRecords(){ return []; } };

/* ===== SOURCE: js/app-v0300.js ===== */
const APP_VERSION='1.0.3';
const PRODUCT_FAMILY='29XX';
const PRODUCT_CATALOG={"Regera": ["D10H", "D10L", "D10M", "R900", "R900M", "R905", "R905i", "R905iSens", "R905t"], "Celestiq": ["D11H", "D11L", "D11M", "R910", "R910M", "R915", "R915i", "R915t"], "Zephyr": ["C200", "C205", "C300", "C305"], "Panamera": ["2935", "2935i", "2935Lite", "2935Lite_TI", "2935LiteS", "2935LiteSE", "2935t"], "Targa": ["2955", "2955i", "2955t", "D8L", "D8H", "D8M"], "Taycan": ["2965", "2965t", "2965C", "D8H_EP", "D8L_EP", "D8M_EP"], "Macan": ["2930XR", "2935iXR", "2935tXR", "2935XR", "D7XR"], "Boxster": ["2915S2"], "Vanquish": ["2905", "2915"]};
const QUARTERS=["CY26Q1", "CY26Q2", "CY26Q3", "CY26Q4", "CY27Q1", "CY27Q2", "CY27Q3", "CY27Q4", "CY28Q1", "CY28Q2", "CY28Q3", "CY28Q4", "CY29Q1", "CY29Q2", "CY29Q3", "CY29Q4", "CY30Q1", "CY30Q2", "CY30Q3", "CY30Q4"];
const LEAD_TASKS=["Issued system wafers", "Notified planning team to transact wafers", "Updated wafer log sheet", "Requested lamp", "Create tool team chat", "Request cal chips", "Request DSW65F wafers", "Create MFG options file", "Does system require customer source", "Request options", "Does system have correct loader", "Is CTD data complete", "Notify CA team to review CTD data", "Has CA team scheduled ship meeting", "Is ship meeting completed", "Request ship kit", "Request POD", "Create ship schedule", "Notify shipping team about the ship schedule", "Antivirus data complete", "Ironman complete", "System powered down", "Options received", "POD received", "Ship kit received", "Sent AV data to CA team", "Customer source started", "Customer source completed", "System OK to power down", "Pre-source checklist completed", "Options testing completed", "CCL completed", "FACTD completed", "CCL sent to CA team", "Sent customer options files to CA team", "Sent FACTD files to CA team", "Sent system serial label to CA team", "Created customer options files", "Created IMPACT options files", "Created RC options files", "Created Install upgrade options files", "Create options DVDs", "Print out system serial labels", "Print out QA checklist", "Print out prepack labels"];
const DEFAULT_TASK_CHOICES=['Not Started','In Progress','Waiting','Complete','N/A'];
const DEFAULT_LEAD_CONFIG=LEAD_TASKS.map((label,i)=>({id:'lead_'+String(i+1).padStart(3,'0'),label,options:[...DEFAULT_TASK_CHOICES],active:true,countProgress:true}));
const CORE_FIELD_DEFS=[
 ['utid','UTID'],['salesOrder','Sales Order'],['customer','Customer'],['cleanroom','Cleanroom'],['assignment','Tool Assignment'],['shipDate','MFG Ship Date'],['swVersion','SW Version'],['fiProcess','FI Process'],['lampHours','Lamp Hours'],['latestStatus','Latest Status'],['currentChecklist','Current Checklist'],['toolStatus','Tool Status']
];
function defaultConfig(){return {leadTasks:clone(DEFAULT_LEAD_CONFIG),customFields:[],labels:Object.fromEntries(CORE_FIELD_DEFS),nextCustomId:1,nextLeadId:LEAD_TASKS.length+1}}
function normalizeConfig(c){c=c||defaultConfig();c.leadTasks=Array.isArray(c.leadTasks)&&c.leadTasks.length?c.leadTasks:clone(DEFAULT_LEAD_CONFIG);c.customFields=Array.isArray(c.customFields)?c.customFields:[];c.labels={...Object.fromEntries(CORE_FIELD_DEFS),...(c.labels||{})};c.nextCustomId=c.nextCustomId||1;c.nextLeadId=c.nextLeadId||100;return c}
function lbl(key,fallback){return state?.config?.labels?.[key]||fallback||key}
const ROUTES={
'29XX':[['FI_130_010','Calibrations Prep'],['FI_130_025','IR Screening and Imaging'],['FI_130_030','Reference Calibrations'],['FI_130_050','DBB/Global Storage Config & Verifications'],['FI_140_010','Noise Prep'],['FI_140_020','Noise Floor Testing'],['FI_140_030','Stage Accuracy Testing'],['FI_150_010','Reference Matching & Focus curve Check'],['FI_150_020','Focus Cals for Rest of BFBB'],['FI_150_030','Clipping check and Core IP calibrations'],['FI_150_040','200x BF Colors Matching'],['FI_150_050','200x BF Colors Polarized Matching'],['FI_160_010','BFBB Non-Polarized Matching'],['FI_160_020','BFBB Polarized Matching'],['FI_160_030','Non BFBB Matching'],['FI_160_040','Flex Aperture Matching'],['FI_160_045','Sensitivity & A/R-Full Conformance'],['FI_160_050','Pinpoint'],['FI_170_010','290x Superset Optics Fingerprint Data'],['FI_180_010','TDI Contour Metrics for Brightfield Broadband'],['FI_180_030','Fingerprint & MHC Prep'],['FI_180_040','Matching Health Check Data'],['FI_180_050','Fingerprint and Noise Data'],['FI_180_060','Conformance Data Collection'],['FI_190_010','System Verification'],['FI_190_020','Options'],['FI_190_030','Documentation Verification'],['FI_190_040','Final Preps and Checks'],['FI_190_045','Pre-source requirements'],['FI_190_050','Prepack prep and power down'],['FI_200_010','Inspection Station Pre-pack'],['FI_200_020','Thermal Rack Pre-pack'],['FI_200_040','PDU Rack Pre-pack'],['FI_200_050','IMC Rack Pre-pack'],['FI_200_055','IMC Rack Blower Pre-pack'],['FI_200_060','CI Pre-pack'],['FI_200_070','Autoloader Pre-pack'],['FI_200_080','Accessory Pre-pack'],['FI_200_090','Prepack Final Audit']],
'Celestiq':[['R91x_130_10','Tool Config & Verifications'],['R91x_130_20','IR Screening & Imaging'],['R91x_130_30','System HC & Calibrations'],['R91x_130_40','GS Configuration & verifications'],['R91x_140_10','Noise Prep'],['R91x_140_20','Noise Floor Testing'],['R91x_140_30','Stage Accuracy Test'],['R91x_150_10','REF Matching'],['R91x_150_20','Clipping check and Core IP calibrations'],['R91x_150_30','BFBB Matching'],['R91x_150_40','BFColors Matching'],['R91x_150_50','Non-BF & DF Matching'],['R91x_150_60','Flex Matching'],['R91x_160_10','Sensitivity DEF Inspections'],['R91x_160_20','Stage Conformance Inspections'],['R91x_160_30','System CTD Inspections'],['R91x_160_40','Design Based Inspections'],['R91x_170_10','Stage HC'],['R91x_170_20','AutoFocus & Image Acq'],['R91x_170_30','Illuminator'],['R91x_170_40','Image Path'],['R91x_180_10','System Verifications'],['R91x_180_20','Options Install & Testing'],['R91x_180_30','Final Verifications'],['R91x_180_40','PreSource'],['R91x_190_10','Data Back up & Clean up'],['R91x_190_20','Prepack Prep & Power down'],['R91x_200_10','Safety Labels & System Draining'],['R91x_200_20','System Power Off'],['R91x_200_30','Stage & Optics tie down'],['R91x_200_40','Thermal Rack / Laser / Chiller Draining'],['R91x_200_50','Aux Racks & Blowers'],['R91x_200_60','Autoloader & CI'],['R91x_200_70','Accessories'],['R91x_200_80','Inspection Station / MST Install'],['R91x_200_90','Bagging IS']],
'Regera':[['R9xx_130_10','Tool Config & Verifications'],['R9xx_130_20','IR Screening & Imaging'],['R9xx_130_30','System HC & Calibrations'],['R9xx_130_40','GS Configuration & verifications'],['R9xx_140_10','Noise Prep'],['R9xx_140_20','Noise Floor Testing'],['R9xx_140_30','Stage Accuracy Test'],['R9xx_150_10','REF Matching'],['R9xx_150_20','Clipping check and Core IP calibrations'],['R9xx_150_30','BFBB Matching'],['R9xx_150_40','BFColors Matching'],['R9xx_150_50','Non-BF & DF Matching'],['R9xx_150_60','Flex Matching'],['R9xx_160_10','Sensitivity DEF Inspections'],['R9xx_160_20','Stage Conformance Inspections'],['R9xx_160_30','System CTD Inspections'],['R9xx_160_40','Design Based Inspections'],['R9xx_170_10','Stage HC'],['R9xx_170_20','AutoFocus & Image Acq'],['R9xx_170_30','Illuminator'],['R9xx_170_40','Image Path'],['R9xx_180_10','System Verifications'],['R9xx_180_20','Options Install & Testing'],['R9xx_180_30','Final Verifications'],['R9xx_180_40','PreSource'],['R9xx_190_10','Data Back up & Clean up'],['R9xx_190_20','Prepack Prep & Power down'],['R9xx_200_10','Safety Labels & System Draining'],['R9xx_200_20','System Power Off'],['R9xx_200_30','Stage & Optics tie down'],['R9xx_200_40','Thermal Rack / Laser / Chiller Draining'],['R9xx_200_50','Aux Racks & Blowers'],['R9xx_200_60','Autoloader & CI'],['R9xx_200_70','Accessories'],['R9xx_200_80','Inspection Station / MST Install'],['R9xx_200_90','Bagging IS']]
};

// Workbook route rule: Regera and Celestiq have dedicated routes; all other code names use the standard 29XX route.
const KEY='b7fi-v0210-state', OLD_STATE_KEYS=['b7fi-v0190-state','b7fi-v0180-state','b7fi-v0170-state','b7fi-v0160-state','b7fi-v0150-state','b7fi-v0140-state','b7fi-v0130-state','b7fi-v0120-state','b7fi-v0110-state','b7fi-v0100-state','b7fi-v090-state','b7fi-v080-state','b7fi-v070-state','b7fi-v060-state'], OLD_TOOL_KEYS=['b7fi-v050-tools','b7fi-v042-tools','b7fi-v04-tools'];
const $=s=>document.querySelector(s), app=$('#app'), floating=$('#floatingActions');
const EDIT_LOCK_KEY='b7fi-edit-lock-v1';
const SESSION_ID=sessionStorage.getItem('b7fi-edit-session-id')||('sess_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8));
sessionStorage.setItem('b7fi-edit-session-id',SESSION_ID);
// v1.0.1: Microsoft Lists/shared-data architecture no longer uses a global edit lock.
let editMode=true,editorName=sessionStorage.getItem('b7fi-editor-name')||'',editHeartbeat=null;
function readEditLock(){try{return JSON.parse(localStorage.getItem(EDIT_LOCK_KEY)||'null')}catch(e){return null}}
function currentEditLock(){let l=readEditLock();if(l&&Date.now()-Number(l.lastSeen||0)>120000){localStorage.removeItem(EDIT_LOCK_KEY);l=null}return l}
function renderEditControls(){let h=document.getElementById('editControlBar');if(!h)return;let l=currentEditLock();if(l&&l.sessionId===SESSION_ID&&!editMode){editMode=true;editorName=l.user||editorName||'Editor';startEditHeartbeat()}let own=editMode&&(!l||l.sessionId===SESSION_ID),busy=l&&l.sessionId!==SESSION_ID,resumable=busy&&editorName&&String(l.user||'').trim().toLowerCase()===editorName.trim().toLowerCase();h.innerHTML=`<div class="edit-control-left"><span class="edit-mode-pill ${own?'editing':busy?'busy':'readonly'}">${own?'● EDIT MODE':busy?'● READ ONLY — EDITING IN USE':'● READ ONLY'}</span><span class="edit-mode-note">${own?`Editing enabled for ${esc(editorName)}`:busy?`Currently being edited by ${esc(l.user||'another user')}`:'Viewing only — changes are blocked'}</span></div><div class="edit-control-actions">${own?'<button id="releaseEditingBtn" class="btn">Release Editing</button>':busy?(resumable?'<button id="resumeEditingBtn" class="btn primary">Resume My Editing</button>':'<button class="btn primary" disabled>Editing In Use</button>'):'<button id="enableEditingBtn" class="btn primary">Enable Editing</button>'}</div>`;let e=document.getElementById('enableEditingBtn');if(e)e.onclick=enableEditing;let m=document.getElementById('resumeEditingBtn');if(m)m.onclick=resumeEditing;let r=document.getElementById('releaseEditingBtn');if(r)r.onclick=releaseEditing}
function applyEditMode(){document.body.classList.toggle('edit-mode-active',editMode);document.body.classList.toggle('read-only-mode',!editMode);renderEditControls()}
function startEditHeartbeat(){if(editHeartbeat)clearInterval(editHeartbeat);editHeartbeat=setInterval(()=>{if(editMode)localStorage.setItem(EDIT_LOCK_KEY,JSON.stringify({sessionId:SESSION_ID,user:editorName,lastSeen:Date.now()}))},30000)}
function enableEditing(){let l=currentEditLock();if(l&&l.sessionId!==SESSION_ID){if(editorName&&String(l.user||'').trim().toLowerCase()===editorName.trim().toLowerCase())return resumeEditing();alert(`Editing is currently in use by ${l.user||'another user'} on this browser profile.`);return}let n=editorName||prompt('Enter your name for Edit Mode:','');if(!n)return;editorName=n.trim();if(!editorName)return;sessionStorage.setItem('b7fi-editor-name',editorName);editMode=true;localStorage.setItem(EDIT_LOCK_KEY,JSON.stringify({sessionId:SESSION_ID,user:editorName,lastSeen:Date.now()}));startEditHeartbeat();applyEditMode()}
function resumeEditing(){let l=currentEditLock();if(!l)return enableEditing();if(!editorName||String(l.user||'').trim().toLowerCase()!==editorName.trim().toLowerCase()){alert(`Editing is currently in use by ${l.user||'another user'}.`);return}editMode=true;localStorage.setItem(EDIT_LOCK_KEY,JSON.stringify({sessionId:SESSION_ID,user:editorName,lastSeen:Date.now()}));startEditHeartbeat();applyEditMode()}
function releaseEditing(){editMode=false;if(editHeartbeat)clearInterval(editHeartbeat);editHeartbeat=null;let l=currentEditLock();if(!l||l.sessionId===SESSION_ID)localStorage.removeItem(EDIT_LOCK_KEY);applyEditMode()}

const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const fmt=d=>d&&/^\d{4}-\d{2}-\d{2}$/.test(d)?new Date(d+'T12:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}):(d||'—');
const fmtShort=d=>d&&/^\d{4}-\d{2}-\d{2}$/.test(d)?new Date(d+'T12:00:00').toLocaleDateString(undefined,{weekday:'short',month:'numeric',day:'numeric'}):(d||'—');
const clone=x=>JSON.parse(JSON.stringify(x));
function routeFor(t){return ROUTES[t.codename==='Regera'?'Regera':t.codename==='Celestiq'?'Celestiq':'29XX']||[]}
function routeProgress(t){
 let r=routeFor(t),i=r.findIndex(x=>x[0]===t.checklist);
 if(t.quarterStatus==='Shipped')return 100;
 return i<0?0:pct(i+1,r.length)
}
function mstApplicable(t){return t.codename==='Regera'||t.codename==='Celestiq'}
function syncCurrentChecklist(t){
 let r=routeFor(t);
 let active=r.filter(x=>(t.checklistStates?.[x[0]]||'Need to Complete')==='In Progress');
 let next=r.find(x=>(t.checklistStates?.[x[0]]||'Need to Complete')==='Need to Complete');
 let chosen=active.length?active[active.length-1]:(next||r[r.length-1]);
 if(chosen)t.checklist=chosen[0]
}
function activeChecklists(t){return routeFor(t).filter(x=>(t.checklistStates?.[x[0]]||'Need to Complete')==='In Progress')}
function isEscalatedNc(n){return String(n.state||'').toLowerCase().includes('escalat')}
function morningNcs(t){let chosen=new Set(t.morningNcIds||[]);return (t.ncs||[]).filter(n=>isEscalatedNc(n)||chosen.has(n.id))}
function setReducedProcess(t,on){t.process=on?'Reduced Process':'Full Process';if(on&&!t.reducedProcessDate)t.reducedProcessDate=new Date().toISOString().slice(0,10)}
function nextNcId(t){let nums=(t.ncs||[]).map(n=>Number(String(n.id||'').replace(/\D/g,''))).filter(Number.isFinite);return `NC#${nums.length?Math.max(...nums)+1:1}`}
function addToolNc(t,id,desc,state='Open'){id=(id||'').trim()||nextNcId(t);desc=(desc||'').trim();if(!desc)return {ok:false,msg:'Enter an NC description.'};if((t.ncs||[]).some(n=>n.id===id))return {ok:false,msg:`${id} already exists on this Tool.`};t.ncs=t.ncs||[];t.ncs.push({id,desc,state,days:state==='Escalated'?1:0,blocking:false});t.morningNcIds=t.morningNcIds||[];if(!t.morningNcIds.includes(id))t.morningNcIds.push(id);return {ok:true,id}}
function escalateToolNc(t,id,days=1){let n=(t.ncs||[]).find(x=>x.id===id);if(!n)return;n.state='Escalated';n.days=Math.max(1,Number(days)||1);t.morningNcIds=t.morningNcIds||[];if(!t.morningNcIds.includes(id))t.morningNcIds.push(id)}
function deescalateToolNc(t,id){
 let n=(t.ncs||[]).find(x=>x.id===id);if(!n)return;
 n.state='Open';n.days=0
}

function morningChecklistOptions(t){
 return routeFor(t).map(x=>`<option value="${esc(x[0])}" ${x[0]===t.checklist?'selected':''}>${esc(x[0])} — ${esc(x[1])}</option>`).join('')
}
function applyMorningChecklistTransition(t,newCode,previousAction){
 let oldCode=t.checklist;
 if(!t.checklistStates)t.checklistStates={};
 if(newCode===oldCode){
  if(!t.checklistStates[newCode]||t.checklistStates[newCode]==='Need to Complete')t.checklistStates[newCode]='In Progress';
  syncCurrentChecklist(t);return
 }
 if(oldCode){
  if(previousAction==='Complete')t.checklistStates[oldCode]='Complete';
  else if(previousAction==='Skipped')t.checklistStates[oldCode]='Skipped';
  else if(previousAction==='N/A')t.checklistStates[oldCode]='N/A';
  else if(previousAction==='Keep In Progress')t.checklistStates[oldCode]='In Progress'
 }
 t.checklistStates[newCode]='In Progress';
 t.checklist=newCode
}


function checkName(t){return routeFor(t).find(x=>x[0]===t.checklist)?.[1]||''}
function makeAdmin(p=0){let o={},n=Math.round(LEAD_TASKS.length*p/100);LEAD_TASKS.forEach((x,i)=>o[x]=i<n?'Complete':'Not Started');return o}
function syncToolConfig(t,config){t.custom=t.custom||{};t.leadAdmin=t.leadAdmin||{};(config.leadTasks||[]).forEach(task=>{if(t.leadAdmin[task.id]==null){let legacy=t.admin?.[task.label];t.leadAdmin[task.id]=legacy||'Not Started'}});return t}
function activeLeadTasks(){return (state.config.leadTasks||[]).filter(x=>x.active!==false)}
function defaultTool(){return {id:'',family:'29XX',codename:'Panamera',model:'2935',quarter:'CY26Q3',customer:'N/A',so:'N/A',ship:'',pullIn:'',pushOut:'',nextQuarter:'',pulledInFrom:'',quarterStatus:'Waiting for FI',room:'CR1',bay:'',archiveDate:'',driver:'Unassigned',weekdayAssignment:'',weekendAssignment:'',dailyPriority:null,weekendPriority:null,sw:'',process:'Full Process',morningNcIds:[],reducedProcessDate:'',lamp:0,notes:'',activity:'',checklist:'FI_130_010',checklistStates:{},escalationMeeting:'N/A',poa:'N/A',fiStatus:'Progressing',waivers:'',ncs:[],admin:makeAdmin(0),leadAdmin:{},custom:{},schedule:{publish:'N/A',status:'N/A',subsystems:'',cables:'',accessories:'',mst:'N/A',is:'',notes:''}}}
const SAMPLE=[
 Object.assign(defaultTool(),{id:'1350660',codename:'Targa',model:'2955t',quarter:'CY26Q3',customer:'TSMC F14',so:'170761',ship:'2026-09-07',quarterStatus:'In FI',room:'CR3',driver:'Bryan',weekdayAssignment:'Bryan',weekendAssignment:'Bryan',dailyPriority:1,weekendPriority:2,sw:'23.0.360',process:'Reduced Process',lamp:104,activity:'Installing and testing options.',checklist:'FI_190_020',admin:makeAdmin(68),schedule:{publish:'Published',status:'Updated',subsystems:'2026-09-03',cables:'2026-09-03',accessories:'2026-09-03',mst:'N/A',is:'2026-09-04',notes:'On schedule'}}),
 Object.assign(defaultTool(),{id:'1450074',codename:'Celestiq',model:'D11H',quarter:'CY26Q3',customer:'SK HYNIX R3 ICHON',so:'174836',ship:'2026-08-24',quarterStatus:'In FI',room:'CR1',driver:'Cymon',weekdayAssignment:'Cymon',weekendAssignment:'Cymon',dailyPriority:2,weekendPriority:1,sw:'29.0.060',lamp:200,activity:'Troubleshooting AirWiggle. Rerunning AirWiggle after TB audit.',checklist:'R91x_140_10',fiStatus:'Performing POA',poa:'Performing latest POA',admin:makeAdmin(34),ncs:[{id:'NC#73',desc:'SelfTest > IDA > filter test failing',state:'Open',days:0,blocking:false},{id:'NC#86',desc:'Escalated issue',state:'Escalated',days:2,blocking:false}],schedule:{publish:'N/A',status:'In Progress',subsystems:'',cables:'',accessories:'',mst:'',is:'',notes:''}}),
 Object.assign(defaultTool(),{id:'RG72',codename:'Regera',model:'D10H',quarter:'CY26Q3',customer:'Hynix',so:'169491',ship:'2026-08-10',quarterStatus:'Shipped',room:'CR1',driver:'FI Team',dailyPriority:null,weekendPriority:null,sw:'',activity:'Packing complete.',checklist:'R9xx_200_90',admin:makeAdmin(100),schedule:{publish:'Complete',status:'Completed',subsystems:'2026-08-07',cables:'2026-08-07',accessories:'2026-08-07',mst:'2026-08-10',is:'2026-08-11',notes:'Completed'}}),
 Object.assign(defaultTool(),{id:'1350627',codename:'Panamera',model:'2935',quarter:'CY26Q3',customer:'Hangzhou',so:'N/A',ship:'2026-12-22',quarterStatus:'Waiting for FI',room:'CR2',driver:'Phillip',dailyPriority:3,weekendPriority:3,activity:'Scheduled for FI handoff.',checklist:'FI_130_010'})
];
function normalize(t){
 let d=defaultTool(),n=Object.assign(d,t||{});
 n.schedule=Object.assign(defaultTool().schedule,t?.schedule||{});
 n.admin=Object.assign(makeAdmin(0),t?.admin||{});
 if(!n.customer)n.customer='N/A';if(!n.so)n.so='N/A';if(!n.driver)n.driver='Unassigned';n.ncs=t?.ncs||[];n.morningNcIds=Array.isArray(t?.morningNcIds)?t.morningNcIds:[];n.checklistStates=n.checklistStates||{};if(!n.schedule.publish||n.schedule.publish==='Draft')n.schedule.publish=n.schedule.publish==='Draft'?'Drafting':'N/A';if(n.schedule.publish==='Complete')n.schedule.publish='Published';if(!['N/A','Drafting','Created','Published'].includes(n.schedule.publish))n.schedule.publish='N/A';
 if(!n.codename){
  if(n.family==='Regera'||n.model?.startsWith('R9'))n.codename='Regera';
  else if(n.family==='Celestiq'||n.model?.startsWith('D11'))n.codename='Celestiq';
  else n.codename='Panamera'
 }
 n.family='29XX';
 if(n.quarterStatus==='Active in FI')n.quarterStatus='In FI';
 if(n.quarterStatus==='Waiting for FI handoff'||n.quarterStatus==='Planned')n.quarterStatus='Waiting for FI';
 if(n.quarterStatus==='Waiting to be Handed to FI')n.quarterStatus='Waiting for FI';
 if(n.quarterStatus==='Packing'||n.quarterStatus==='Packing / Shipping')n.quarterStatus='Packing and Shipping';
 if(!['Waiting for FI','In FI','Packing and Shipping','Shipped','Archive'].includes(n.quarterStatus))n.quarterStatus='In FI';
 let r=routeFor(n),legacyIndex=Math.max(0,r.findIndex(x=>x[0]===n.checklist));
 if(!Object.keys(n.checklistStates).length){
  r.forEach((x,i)=>n.checklistStates[x[0]]=n.quarterStatus==='Shipped'?'Complete':i<legacyIndex?'Complete':i===legacyIndex?'In Progress':'Need to Complete')
 }else{
  r.forEach(x=>{if(!n.checklistStates[x[0]])n.checklistStates[x[0]]='Need to Complete'})
 }
 if(!mstApplicable(n))n.schedule.mst='N/A';
 syncCurrentChecklist(n);
 return n
}
function loadState(){
 for(const k of [KEY,...OLD_STATE_KEYS]){try{let s=JSON.parse(localStorage.getItem(k)||'null');if(s&&s.tools){s.config=normalizeConfig(s.config);s.tools=(s.tools||[]).map(normalize).map(t=>syncToolConfig(t,s.config));s.weekday=s.weekday||{title:'B7 WEEKDAY PRIORITIES',notes:''};s.weekend=s.weekend||{title:'B7 WEEKEND PRIORITIES',volunteers:[]};s.workspaceTasks=s.workspaceTasks||[];s.workspaceRefs=s.workspaceRefs||[];s.reusable=s.reusable||{drivers:['Unassigned'],bays:[],customers:['N/A'],salesOrders:['N/A']};return s}}catch(e){}}
 for(const k of OLD_TOOL_KEYS){try{let a=JSON.parse(localStorage.getItem(k)||'null');if(Array.isArray(a)){let c=defaultConfig();return {tools:a.map(normalize).map(t=>syncToolConfig(t,c)),weekday:{title:'B7 WEEKDAY PRIORITIES',notes:''},weekend:{title:'B7 WEEKEND PRIORITIES',volunteers:[]},config:c}}}catch(e){}}
 let c=defaultConfig();return {tools:SAMPLE.map(normalize).map(t=>syncToolConfig(t,c)),weekday:{title:'B7 WEEKDAY PRIORITIES',notes:''},weekend:{title:'B7 WEEKEND PRIORITIES',volunteers:[{name:'Vinh',sat:'6am to 12pm',sun:'',notes:''},{name:'Quoc',sat:'6am to 4pm',sun:'',notes:''},{name:'Singapore team',sat:'6am to XXXX',sun:'6am to XXXX',notes:'Coverage based on volunteer list'}]},config:c}
}
let state=loadState(),tools=state.tools,view='countdown',selectedId=null;
// v1.0.1: normal Command Center controls are available immediately.
// Microsoft Lists/SharePoint permissions will govern shared-data editing instead of a browser-local lock.
(function(){
  localStorage.removeItem(EDIT_LOCK_KEY);
  editMode=true;
  document.body.classList.add('edit-mode-active');
  document.body.classList.remove('read-only-mode');
})();
state.workspaceTasks=state.workspaceTasks||[];state.workspaceRefs=state.workspaceRefs||[];state.reusable=state.reusable||{drivers:['Unassigned'],bays:[],customers:['N/A'],salesOrders:['N/A']};state.shared={mode:'local',siteUrl:'https://kla-my.sharepoint.com/personal/neptune_garcia_kla_com',listName:'B7 FI Command Center',listUrl:'',tenantId:'',clientId:'',lastImport:'',lastImportCount:0,lastFile:'',autoSyncSeconds:15,lastConnectionTest:'',lastConnectionResult:'',...(state.shared||{})};state.localAudit=Array.isArray(state.localAudit)?state.localAudit:[];
function save(){state.tools=tools;state.config=normalizeConfig(state.config);state.lastLocalChange=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(state));setTimeout(updateOperationsBar,0)}
function current(){return tools.filter(t=>t.quarterStatus!=='Archive')}
function waitingTools(){return tools.filter(t=>t.quarterStatus==='Waiting for FI')}
function inFiTools(){return tools.filter(t=>t.quarterStatus==='In FI')}
function packingTools(){return tools.filter(t=>t.quarterStatus==='Packing and Shipping')}
function shippedTools(){return tools.filter(t=>t.quarterStatus==='Shipped')}
function toolPageTools(){return tools.filter(t=>['In FI','Packing and Shipping','Shipped'].includes(t.quarterStatus))}
function archiveTools(){return tools.filter(t=>t.quarterStatus==='Archive')}
function lifecycleBadge(t){let s=qState(t);return `<span class="lifecycle-badge ${s}">${t.quarterStatus==='Waiting for FI'?'WAITING TO BE HANDED TO FI':t.quarterStatus==='In FI'?'IN FI':t.quarterStatus==='Packing and Shipping'?'PACKING AND SHIPPING':t.quarterStatus==='Shipped'?'SHIPPED':'ARCHIVE'}</span>`}
function lifecycleClass(status){
  return status==='Waiting for FI'?'waiting':
         status==='In FI'?'infi':
         status==='Packing and Shipping'?'packing':
         status==='Shipped'?'shipped':'archive';
}
function lifecycleSelect(t,cls='cd-status'){
  return `<select class="${cls} lifecycle-select ${lifecycleClass(t.quarterStatus)}">
    <option value="Waiting for FI" ${t.quarterStatus==='Waiting for FI'?'selected':''}>Waiting to be Handed to FI</option>
    <option value="In FI" ${t.quarterStatus==='In FI'?'selected':''}>In FI</option>
    <option value="Packing and Shipping" ${t.quarterStatus==='Packing and Shipping'?'selected':''}>Packing and Shipping</option>
    <option value="Shipped" ${t.quarterStatus==='Shipped'?'selected':''}>Shipped</option>
    <option value="Archive" ${t.quarterStatus==='Archive'?'selected':''}>Archive</option>
  </select>`;
}

function pageTools(page){
  switch(page){
    case 'countdown': return tools.filter(t=>t.quarterStatus!=='Archive');
    case 'systems': return tools.filter(t=>t.quarterStatus==='In FI'||t.quarterStatus==='Shipped');
    case 'morning': return tools.filter(t=>t.quarterStatus==='In FI');
    case 'weekday': return tools.filter(t=>t.quarterStatus==='In FI');
    case 'weekend': return tools.filter(t=>t.quarterStatus==='In FI');
    case 'shipping': return tools.filter(t=>t.quarterStatus==='In FI'||t.quarterStatus==='Packing and Shipping'||(t.quarterStatus==='Shipped'&&(t.schedule?.publish!=='N/A'||t.schedule?.subsystems||t.schedule?.is)));
    case 'archive': return tools.filter(t=>t.quarterStatus==='Archive');
    default: return tools.filter(t=>t.quarterStatus!=='Archive');
  }
}

function quarterLabel(){let c={};tools.forEach(t=>c[t.quarter]=(c[t.quarter]||0)+1);return Object.entries(c).sort((a,b)=>b[1]-a[1])[0]?.[0]||'Quarter Not Set'}
function pct(a,b){return b?Math.round(a/b*100):0}
function qState(t){return t.quarterStatus==='Archive'?'archived':t.quarterStatus==='Shipped'?'shipped':t.quarterStatus==='Packing and Shipping'?'packing':t.quarterStatus==='Waiting for FI'?'waiting':'infi'}
function tone(t){if(t.quarterStatus==='Shipped')return'good';if(t.fiStatus==='Line Down'||t.ncs.some(n=>n.blocking))return'bad';if(t.fiStatus==='Performing POA'||/trouble|waiting/i.test(t.activity))return'warn';return'good'}
function adminProgress(t){let tasks=activeLeadTasks().filter(x=>x.countProgress!==false);if(t.quarterStatus==='Shipped')return 100;let i=tasks.findIndex(x=>x.id===t.currentLeadAdminTask);return i<0?0:pct(i+1,tasks.length)}
function routeIndex(t){return Math.max(0,routeFor(t).findIndex(x=>x[0]===t.checklist))}
function routeCounts(t){
 let r=routeFor(t),vals=r.map(x=>t.checklistStates?.[x[0]]||'Need to Complete');
 let applicable=vals.filter(v=>v!=='N/A'&&v!=='Skipped');
 return {done:applicable.filter(v=>v==='Complete').length,total:applicable.length,current:vals.filter(v=>v==='In Progress').length}
}
function leadCounts(t){let tasks=activeLeadTasks().filter(x=>x.countProgress!==false),applicable=tasks.filter(x=>(t.leadAdmin?.[x.id]??'Not Started')!=='N/A'),done=applicable.filter(x=>(t.leadAdmin?.[x.id]??'Not Started')==='Complete').length;return {done,total:applicable.length}}
function checklistVisual(v){
 if(v==='Complete')return {cls:'done',icon:'✓'};
 if(v==='In Progress')return {cls:'current',icon:'●'};
 if(v==='Skipped')return {cls:'skipped',icon:'—'};
 if(v==='N/A')return {cls:'na',icon:'—'};
 return {cls:'need',icon:'✕'}
}
function routeWorkflow(t,editable=false){
 let r=routeFor(t);
 return `<div class="workflow-list">${r.map((x,i)=>{
  let val=t.checklistStates?.[x[0]]||'Need to Complete',v=checklistVisual(val);
  return `<div class="workflow-step ${v.cls}"><span class="step-icon">${v.icon}</span><span class="step-name"><b>${esc(x[0])}</b><span class="step-sub">${esc(x[1])}</span></span><span class="step-state">${editable?`<select class="check-state-select" data-check-code="${esc(x[0])}">${['Need to Complete','In Progress','Complete','Skipped','N/A'].map(o=>`<option ${o===val?'selected':''}>${o}</option>`).join('')}</select>`:esc(val)}</span></div>`
 }).join('')}</div>`
}
function leadWorkflow(t,editable=false){
 let tasks=activeLeadTasks();
 return `<div class="workflow-list">${tasks.map((task,i)=>{
  let val=t.leadAdmin?.[task.id]??'Not Started';
  let done=val==='Complete',na=val==='N/A',working=['In Progress','Waiting','Requested','Scheduled'].includes(val);
  let cls=done?'done':na?'na':working?'current':'need',icon=done?'✓':na?'—':working?'●':'✕';
  return `<div class="workflow-step ${cls}"><span class="step-icon">${icon}</span><span class="step-name"><span class="order-pill">${i+1}</span> ${esc(task.label)}</span><span class="step-state">${editable?leadStateControl(task,val):esc(val)}</span></div>`
 }).join('')}</div>`
}
function leadStateControl(task,val){let opts=(task.options?.length?task.options:DEFAULT_TASK_CHOICES);return `<select class="task-state" data-task-id="${esc(task.id)}">${opts.map(o=>`<option ${o===val?'selected':''}>${esc(o)}</option>`).join('')}</select>`}
function customFieldValueControl(field,t){let v=t.custom?.[field.id]??'',id='cf_'+field.id;if(field.type==='Dropdown'){if(field.allowCustom){return `<input id="${id}" data-custom-id="${esc(field.id)}" list="list_${esc(field.id)}" value="${esc(v)}"><datalist id="list_${esc(field.id)}">${(field.options||[]).map(o=>`<option value="${esc(o)}"></option>`).join('')}</datalist>`}return `<select id="${id}" data-custom-id="${esc(field.id)}"><option value=""></option>${(field.options||[]).map(o=>`<option ${o===v?'selected':''}>${esc(o)}</option>`).join('')}</select>`}let typ=field.type==='Number'?'number':field.type==='Date'?'date':'text';return `<input id="${id}" type="${typ}" data-custom-id="${esc(field.id)}" value="${esc(v)}">`}
function customStatusBlock(t){let fs=(state.config.customFields||[]).filter(f=>f.active!==false&&f.showStatus!==false);if(!fs.length)return'';return `<div class="tool-status-block"><h3>Additional Fields</h3><div class="tool-status-extra">${fs.map(f=>kv(f.label,t.custom?.[f.id]||'—')).join('')}</div></div>`}
function page(title,desc,k=''){return ''}
function reportHeader(title,sub=''){return `<div class="report-title"><h2>${esc(title)}</h2>${sub?`<p>${esc(sub)}</p>`:''}</div>`}
function actions(items,shot=true){let a=[...items];if(shot)a.push({label:'Screenshot Mode',fn:enterScreenshot});floating.innerHTML=a.map((x,i)=>`<button class="btn ${x.primary?'primary':''}" data-act="${i}">${x.label}</button>`).join('');a.forEach((x,i)=>floating.querySelector(`[data-act="${i}"]`).onclick=x.fn);updateOperationsBar()}
function enterScreenshot(){document.body.classList.add('screenshot-mode');let b=$('#screenshotExit');b.style.display='block';setTimeout(()=>{if(document.body.classList.contains('screenshot-mode'))b.style.display='none'},1800)}function exitScreenshot(){document.body.classList.remove('screenshot-mode');$('#screenshotExit').style.display=''}$('#screenshotExit').onclick=exitScreenshot;document.addEventListener('keydown',e=>{if(e.key==='Escape')exitScreenshot()});
function setView(v){window.scrollTo({top:0,left:0,behavior:'auto'});view=v;document.body.dataset.theme=v==='systems'?'systems':v;document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===v));render();window.scrollTo(0,0)}document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>setView(b.dataset.view));
function typeGroups(){let g={};pageTools('countdown').forEach(t=>(g[t.codename]??=[]).push(t));return Object.entries(g).sort((a,b)=>a[0].localeCompare(b[0]))}
function countdown(){let active=pageTools('countdown'),total=active.length,sh=active.filter(t=>t.quarterStatus==='Shipped').length,need=total-sh;app.innerHTML=page('Quarter Tool Shipping Countdown','Digital version of the wall countdown, with the remaining workload broken down by product code name.','QUARTER PLAN')+`<div class="report-screen">${reportHeader(`${quarterLabel()} TOOL SHIPPING COUNTDOWN`)}<div class="overall-countdown"><div class="overall-box"><div class="label">Total Tools</div><span class="number">${total}</span></div><div class="overall-box need"><div class="label">Need to Ship</div><span class="number">${need}</span></div><div class="overall-box shipped"><div class="label">Shipped</div><span class="number">${sh}</span></div></div><div class="quarter-progress"><div class="progress-label"><span>Quarter Shipping Progress</span><b>${pct(sh,total)}% Shipped</b></div><div class="track"><div class="fill" style="width:${pct(sh,total)}%;background:var(--good)"></div></div></div>${typeGroups().map(([name,a])=>{let ss=a.filter(t=>t.quarterStatus==='Shipped').length,w=a.filter(t=>t.quarterStatus==='Waiting for FI').length,i=a.filter(t=>t.quarterStatus==='In FI').length;return `<section class="type-section"><div class="type-header"><div><h3>${esc(name)}</h3></div><div class="type-summary"><div class="type-count"><small>Total</small><b>${a.length}</b></div><div class="type-count need"><small>Need to Ship</small><b>${a.length-ss}</b></div><div class="type-count waiting"><small>Waiting FI</small><b>${w}</b></div><div class="type-count infi"><small>In FI</small><b>${i}</b></div><div class="type-count shipped"><small>Shipped</small><b>${ss}</b></div></div></div><div class="countdown-card-grid">${a.sort((x,y)=>(x.ship||'9').localeCompare(y.ship||'9')).map(t=>`<div class="countdown-card ${qState(t)}"><div class="cc-head"><div><div class="cc-id">${esc(t.id)}</div><b>${esc(t.model)}</b><div class="gray">${esc(t.customer)}</div></div>${t.quarterStatus==='Shipped'?'<span class="complete-mark"><span class="check">✓</span> SHIPPED</span>':`<span class="state-chip ${qState(t)}">${t.quarterStatus==='Waiting for FI'?'WAITING FI':'IN FI'}</span>`}</div><div class="cc-meta"><div><span>MFG Ship Date</span><b>${fmt(t.ship)}</b></div><div><span>Sales Order</span><b>${esc(t.so)}</b></div></div></div>`).join('')}</div></section>`}).join('')}</div>`;actions([{label:'Edit Tool Countdown',primary:true,fn:()=>admin('countdown')},{label:'Administration',fn:()=>setView('admin')}])}
function shipping(){let a=pageTools('shipping');app.innerHTML=page('Shipping Schedule','Screenshot-ready shipping plans generated from Shipping Schedule Admin.','SHIPPING COORDINATION')+`<div class="report-screen">${reportHeader('B7 FI SHIPPING SCHEDULES')}${a.map(t=>{let complete=t.schedule.publish==='Complete'||t.quarterStatus==='Shipped',placeholder=t.quarterStatus==='In FI'&&t.schedule.publish==='N/A'&&!t.schedule.subsystems&&!t.schedule.cables&&!t.schedule.accessories&&!t.schedule.is;return `<div class="shipping-plan ${complete?'complete':''} ${placeholder?'placeholder':''}"><div class="shipping-plan-head"><h3>SHIPPING PLAN FOR ${esc(t.codename.toUpperCase())} ${esc(t.id)}</h3>${complete?'<span class="complete-mark"><span class="check">✓</span> COMPLETE</span>':placeholder?'<span class="badge">N/A · NOT CREATED</span>':`<span class="badge info">${esc(t.schedule.publish||'N/A')} · ${esc(t.schedule.status||'N/A')}</span>`}</div><div style="overflow:auto"><table class="shipping-table"><thead><tr><th>System</th><th>Subsystems - Handoff</th><th>Cable Kit - Handoff</th><th>Accessories - Handoff</th><th>MST Install</th><th>IS - Handoff</th><th>Notes</th></tr></thead><tbody><tr><td>${esc(t.id)}</td><td>${t.schedule.subsystems?fmtShort(t.schedule.subsystems):'<span class="placeholder-value">N/A</span>'}</td><td>${t.schedule.cables?fmtShort(t.schedule.cables):'<span class="placeholder-value">N/A</span>'}</td><td>${t.schedule.accessories?fmtShort(t.schedule.accessories):'<span class="placeholder-value">N/A</span>'}</td><td>${mstApplicable(t)?(t.schedule.mst&&t.schedule.mst!=='N/A'?fmtShort(t.schedule.mst):'<span class="placeholder-value">N/A</span>'):'N/A'}</td><td>${t.schedule.is?fmtShort(t.schedule.is):'<span class="placeholder-value">N/A</span>'}</td><td>${esc(t.schedule.notes||'')}</td></tr></tbody></table></div></div>`}).join('')||'<div class="notice">No active FI tools or completed shipping schedules.</div>'}</div>`;actions([{label:'Edit Shipping Schedules',primary:true,fn:()=>admin('shipping')},{label:'Administration',fn:()=>setView('admin')}])}
function priorityRows(type){let key=type==='weekend'?'weekendPriority':'dailyPriority',assignment=type==='weekend'?'weekendAssignment':'weekdayAssignment';return pageTools(type==='weekend'?'weekend':'weekday').slice().sort((a,b)=>(a[key]??999)-(b[key]??999)||(a.ship||'9999').localeCompare(b.ship||'9999')).map(t=>`<tr><td>${t[key]?`<span class="priority-num">${t[key]}</span>`:`<span class="unprioritized">Unprioritized</span>`}</td><td><b>${esc(t.id)}</b></td><td>${esc(t.model)}</td><td>${esc(t.so||'N/A')}</td><td>${esc(t.customer||'N/A')}</td><td>${fmt(t.ship)}</td><td>${esc(t.room)}</td><td>${esc(t[assignment]||t.driver||'Unassigned')}</td><td class="notes-cell">${esc(type==='weekend'?(t.weekendNotes||''):(t.priorityNotes||t.activity||''))}</td></tr>`).join('')}
function priorityTable(type){return `<div class="table-wrap"><table class="report-table priority-table"><thead><tr><th>Priority</th><th>${esc(lbl('utid','UTID'))}</th><th>Model</th><th>${esc(lbl('salesOrder','Sales Order'))}</th><th>${esc(lbl('customer','Customer'))}</th><th>${esc(lbl('shipDate','Ship Date'))}</th><th>${esc(lbl('cleanroom','Cleanroom'))}</th><th>${esc(lbl('assignment','Tool Assignments'))}</th><th>Notes</th></tr></thead><tbody>${priorityRows(type)}</tbody></table></div>`}
function daily(){app.innerHTML=page('Weekday Priorities','Automatically generated from the current tool records and weekday priority order.','WEEKDAY OPERATIONS')+`<div class="report-screen">${reportHeader(state.weekday.title||'B7 WEEKDAY PRIORITIES')}${priorityTable('daily')}</div>`;actions([{label:'Edit Weekday Priorities',primary:true,fn:()=>admin('daily')},{label:'Administration',fn:()=>setView('admin')}])}
function volunteerTable(){let v=state.weekend.volunteers||[];return `<div class="table-wrap"><table class="report-table volunteer-table"><thead><tr><th>Weekend Volunteers</th><th>Saturday Hours</th><th>Sunday Hours</th><th>Notes</th></tr></thead><tbody>${v.map(x=>`<tr><td><b>${esc(x.name)}</b></td><td>${esc(x.sat)}</td><td>${esc(x.sun)}</td><td>${esc(x.notes)}</td></tr>`).join('')||'<tr><td colspan="4">No volunteer schedule entered.</td></tr>'}</tbody></table></div>`}
function weekend(){app.innerHTML=page('Weekend Priorities','Weekend volunteer coverage first, then the priority plan built around the available crew.','WEEKEND OPERATIONS')+`<div class="report-screen">${reportHeader(state.weekend.title||'B7 WEEKEND PRIORITIES')}${volunteerTable()}<div style="height:16px"></div>${priorityTable('weekend')}</div>`;actions([{label:'Edit Weekend Plan',primary:true,fn:()=>admin('weekend')},{label:'Administration',fn:()=>setView('admin')}])}
function morning(){
 let a=pageTools('morning').sort((x,y)=>(x.dailyPriority??999)-(y.dailyPriority??999));
 app.innerHTML=`<div class="report-screen">${reportHeader('B7 FI MORNING STATUS')}${a.map(t=>{
  let visible=morningNcs(t),normal=visible.filter(n=>!isEscalatedNc(n)),escal=visible.filter(isEscalatedNc),active=activeChecklists(t);
  let checklistText=active.length?active.map(x=>`${x[0]}: ${x[1]}`).join(' + '):`${t.checklist}: ${checkName(t)}`;
  return `<div class="meeting-row"><div class="meeting-main">${esc(t.id)} (${esc(t.room)}${t.bay?' / '+esc(t.bay):''}) (${esc(t.model)} - ${esc(t.codename)}) (SW: ${esc(t.sw||'—')}) ${esc(checklistText)} (${esc(t.customer)}, ${fmt(t.ship)}) <span class="morning-lamp">(Lamp Hours: ${t.lamp||0})</span> ${t.process==='Reduced Process'?'<span class="reduced-process-flag">REDUCED PROCESS</span>':''}</div><ul class="meeting-bullets"><li class="morning-status-line">${esc(t.activity||'No latest status entered.')}</li>${normal.map(n=>`<li class="morning-open-nc">${esc(n.id)}: ${esc(n.desc)}</li>`).join('')}${escal.map(n=>`<li class="morning-escalated">Escalated ${esc(n.id)}${n.days?` - ${n.days} Days`:''}: ${esc(n.desc)}</li>`).join('')}</ul></div>`}).join('')}</div>`;
 actions([{label:'Morning Quick Update',primary:true,fn:()=>admin('meeting')},{label:'Administration',fn:()=>setView('admin')}])
}
function systems(){
 let groups={};pageTools('systems').forEach(t=>(groups[t.codename]??=[]).push(t));
 app.innerHTML=`${Object.entries(groups).sort((a,b)=>a[0].localeCompare(b[0])).map(([name,arr])=>`<section class="tool-section"><div class="tool-section-head"><h2 class="tool-section-title">${esc(name)}</h2><span class="tool-section-count">${arr.length} tool${arr.length===1?'':'s'}</span></div><div class="system-grid">${arr.map(t=>{let rc=routeCounts(t),lc=leadCounts(t),status=t.quarterStatus;return `<div class="system-card ${status==='Shipped'?'shipped-card':status==='Waiting for FI'?'waiting-card':'infi-card'}" data-tool="${esc(t.id)}"><div class="system-head"><div><div class="system-id">${esc(t.id)}</div><div class="gray">${esc(t.model)} · ${esc(t.customer)}</div></div>${status==='Shipped'?'<span class="complete-mark"><span class="check">✓</span> SHIPPED</span>':`<span class="state-chip ${qState(t)}">${status==='Waiting for FI'?'WAITING FOR FI':'IN FI'}</span>`}</div><div class="progress-row"><div class="progress-label"><span>TOOL PROGRESS</span><b>${routeProgress(t)}%</b></div><div class="track"><div class="fill" style="width:${routeProgress(t)}%"></div></div><div class="card-progress-meta"><span>${rc.done} complete</span><span>${rc.current} in progress</span></div></div><div class="progress-row"><div class="progress-label"><span>LEAD / ADMIN</span><b>${adminProgress(t)}%</b></div><div class="track"><div class="fill admin" style="width:${adminProgress(t)}%"></div></div><div class="card-progress-meta"><span>${lc.done} complete</span><span>${lc.total} applicable</span></div></div><div class="card-meta"><div><span>Assignment</span><strong>${esc(t.driver)}</strong></div><div><span>Location</span><strong>${esc(t.room)}${t.bay?' / '+esc(t.bay):''}</strong></div><div><span>Active Checklist</span><strong>${activeChecklists(t).map(x=>x[0]).join(', ')||'—'}</strong></div><div><span>MFG Ship</span><strong>${fmt(t.ship)}</strong></div></div></div>`}).join('')}</div></section>`).join('')}`;
 document.querySelectorAll('[data-tool]').forEach(x=>x.onclick=()=>toolStatus(x.dataset.tool));
 actions([{label:'Add Tool',primary:true,fn:()=>toolAdmin()},{label:'Administration',fn:()=>setView('admin')}],false)
}

function taskVisual(s){return s==='Completed'?'complete':s==='In Progress'?'progress':'need'}
function linkedLeadTaskLabel(id){let x=activeLeadTasks().find(t=>t.id===id);return x?x.label:''}
function applyWorkspaceLink(task){if(!task.toolId||!task.leadTaskId)return;let t=tools.find(x=>x.id===task.toolId);if(!t)return;t.leadAdmin=t.leadAdmin||{};t.leadAdmin[task.leadTaskId]=task.status==='Completed'?'Complete':task.status==='In Progress'?'In Progress':'Not Started'}
function syncWorkspaceFromTools(){state.workspaceTasks.forEach(task=>{if(!task.toolId||!task.leadTaskId)return;let t=tools.find(x=>x.id===task.toolId);if(!t)return;let v=t.leadAdmin?.[task.leadTaskId];if(v==='Complete')task.status='Completed';else if(['In Progress','Waiting','Requested','Scheduled'].includes(v))task.status='In Progress'})}
function workspace(tab='tasks'){
 syncWorkspaceFromTools();
 let active=state.workspaceTasks.filter(x=>x.status!=='Completed'),done=state.workspaceTasks.filter(x=>x.status==='Completed');
 app.innerHTML=`<div class="panel"><div class="workspace-tabs"><button class="btn ${tab==='tasks'?'primary':''}" data-worktab="tasks">Tasks</button><button class="btn ${tab==='reference'?'primary':''}" data-worktab="reference">Reference</button></div>${tab==='tasks'?`<h3>Lead Workspace</h3><p class="helper">Your running task list for Teams messages, manager requests, Tool follow-ups and anything else you need to remember.</p><div class="workspace-toolbar"><div class="workspace-quick"><input id="ws-new-title" placeholder="Quick task — e.g. Request POD"><select id="ws-new-tool"><option value="">General / No Tool</option>${current().map(t=>`<option value="${esc(t.id)}">${esc(t.id)} · ${esc(t.codename)} ${esc(t.model)}</option>`).join('')}</select><select id="ws-new-link"><option value="">No linked Lead/Admin task</option>${activeLeadTasks().map(x=>`<option value="${esc(x.id)}">${esc(x.label)}</option>`).join('')}</select><button id="ws-add" class="btn primary">+ Add Task</button></div></div><div class="workspace-list">${[...active,...done].map(task=>`<div class="workspace-task ${taskVisual(task.status)}" data-wstask="${esc(task.id)}"><select class="ws-status"><option ${task.status==='Need to Complete'?'selected':''}>Need to Complete</option><option ${task.status==='In Progress'?'selected':''}>In Progress</option><option ${task.status==='Completed'?'selected':''}>Completed</option></select><div><b>${esc(task.title)}</b><div class="gray">${task.toolId?`Tool ${esc(task.toolId)}`:'General'}${task.leadTaskId?` · ${esc(linkedLeadTaskLabel(task.leadTaskId))}`:''}</div></div><select class="ws-tool"><option value="">General</option>${current().map(t=>`<option value="${esc(t.id)}" ${task.toolId===t.id?'selected':''}>${esc(t.id)}</option>`).join('')}</select><select class="ws-link"><option value="">Standalone</option>${activeLeadTasks().map(x=>`<option value="${esc(x.id)}" ${task.leadTaskId===x.id?'selected':''}>${esc(x.label)}</option>`).join('')}</select><button class="btn small danger ws-delete">Delete</button></div>`).join('')||'<div class="notice">No workspace tasks yet.</div>'}</div>`:`<h3>Reference</h3><p class="helper">Permanent ship-kit, part-number, procedure, training, error-code and other reference information.</p><div class="workspace-toolbar"><input id="ref-search" placeholder="Search reference..."><button id="ref-add-toggle" class="btn primary">+ Add Reference</button></div><div id="ref-editor" class="reference-card" style="display:none;margin-bottom:12px"><div class="reference-editor"><select id="ref-category"><option>Ship Kits</option><option>Part Numbers</option><option>Tool Information</option><option>Procedures</option><option>Training</option><option>Error Codes</option><option>Wafer Information</option><option>Contacts</option><option>Other</option></select><input id="ref-title" placeholder="Reference title"><textarea id="ref-body" placeholder="Information / notes"></textarea><button id="ref-save" class="btn primary">Save Reference</button></div></div><div class="workspace-reference-grid">${state.workspaceRefs.map(r=>`<div class="reference-card" data-ref="${esc(r.id)}"><div class="gray">${esc(r.category)}</div><h4>${esc(r.title)}</h4><pre>${esc(r.body)}</pre><button class="btn small danger ref-delete">Delete</button></div>`).join('')||'<div class="notice">No reference entries yet.</div>'}</div>`}</div>`;
 document.querySelectorAll('[data-worktab]').forEach(b=>b.onclick=()=>workspace(b.dataset.worktab));
 if(tab==='tasks'){
  $('#ws-add').onclick=()=>{let title=$('#ws-new-title').value.trim();if(!title)return;let task={id:'w'+Date.now(),title,status:'Need to Complete',toolId:$('#ws-new-tool').value,leadTaskId:$('#ws-new-link').value};state.workspaceTasks.unshift(task);applyWorkspaceLink(task);save();workspace('tasks')};
  document.querySelectorAll('[data-wstask]').forEach(row=>{let task=state.workspaceTasks.find(x=>x.id===row.dataset.wstask);row.querySelector('.ws-status').onchange=e=>{task.status=e.target.value;applyWorkspaceLink(task);save();workspace('tasks')};row.querySelector('.ws-tool').onchange=e=>{task.toolId=e.target.value;applyWorkspaceLink(task);save()};row.querySelector('.ws-link').onchange=e=>{task.leadTaskId=e.target.value;applyWorkspaceLink(task);save()};row.querySelector('.ws-delete').onclick=()=>{state.workspaceTasks=state.workspaceTasks.filter(x=>x.id!==task.id);save();workspace('tasks')}})
 }else{
  $('#ref-add-toggle').onclick=()=>$('#ref-editor').style.display=$('#ref-editor').style.display==='none'?'block':'none';
  $('#ref-save').onclick=()=>{let title=$('#ref-title').value.trim(),body=$('#ref-body').value.trim();if(!title&&!body)return;state.workspaceRefs.unshift({id:'r'+Date.now(),category:$('#ref-category').value,title:title||'Untitled',body});save();workspace('reference')};
  $('#ref-search').oninput=e=>{let q=e.target.value.toLowerCase();document.querySelectorAll('[data-ref]').forEach(c=>c.style.display=c.innerText.toLowerCase().includes(q)?'':'none')};
  document.querySelectorAll('[data-ref]').forEach(c=>c.querySelector('.ref-delete').onclick=()=>{state.workspaceRefs=state.workspaceRefs.filter(x=>x.id!==c.dataset.ref);save();workspace('reference')})
 }
 actions([{label:'+ Quick Task',primary:true,fn:()=>workspace('tasks')},{label:'Tools',fn:()=>setView('systems')}],false)
}
function archive(){
 let a=pageTools('archive');
 app.innerHTML=`${reportHeader('B7 FI TOOL ARCHIVE')}<div class="archive-grid">${a.map(t=>`<div class="archive-card" data-tool="${esc(t.id)}"><h4>${esc(t.id)} · ${esc(t.model)}</h4><div class="gray">${esc(t.codename)} · ${esc(t.customer)}</div>${kv('Quarter',t.quarter)}${kv('MFG Ship Date',fmt(t.ship))}${kv('Cleanroom',t.room)}${kv('Bay',t.bay||'—')}${kv('Sales Order',t.so)}</div>`).join('')||'<div class="notice">No archived tools yet.</div>'}</div>`;
 document.querySelectorAll('[data-tool]').forEach(x=>x.onclick=()=>toolStatus(x.dataset.tool));
 actions([{label:'Tools',fn:()=>setView('systems')},{label:'Administration',fn:()=>setView('admin')}])
}
function kv(k,v){return `<div class="kv"><span>${k}</span><b>${v||'—'}</b></div>`}
function toolStatus(id){let t=tools.find(x=>x.id===id);if(!t)return;selectedId=id;document.body.dataset.theme='systems';let rc=routeCounts(t),lc=leadCounts(t);app.innerHTML=page(`${esc(t.id)} · ${esc(t.model)}`,`${esc(t.codename)} · ${esc(t.customer)} · ${esc(t.room)}`,'INDIVIDUAL TOOL STATUS')+`<div class="report-screen">${reportHeader(`${t.id} TOOL STATUS`,`${t.model} · ${t.codename} · ${t.customer}`)}<div class="metric-grid"><div class="metric"><span>${esc(lbl('shipDate','MFG Ship Date'))}</span><strong style="font-size:20px">${fmt(t.ship)}</strong></div><div class="metric"><span>${esc(lbl('currentChecklist','Current Checklist'))}</span><strong style="font-size:18px">${esc(t.checklist)}</strong><small>${esc(checkName(t))}</small></div><div class="metric"><span>Tool Progress</span><strong>${routeProgress(t)}%</strong><small>${rc.done}/${rc.total} completed</small></div><div class="metric"><span>Lead / Admin</span><strong>${adminProgress(t)}%</strong><small>${lc.done}/${lc.total} applicable</small></div><div class="metric"><span>Tool Status</span><strong style="font-size:18px" class="${qState(t)==='shipped'?'green-text':qState(t)==='waiting'?'red-text':qState(t)==='infi'?'yellow-text':'gray'}">${esc(t.quarterStatus)}</strong></div></div><div class="tool-status-grid"><div class="tool-status-block"><h3>Tool Information</h3>${kv('Product Family',t.family)}${kv('Code Name',t.codename)}${kv('Model',t.model)}${kv(lbl('utid','UTID'),t.id)}${kv(lbl('salesOrder','Sales Order'),t.so)}${kv(lbl('customer','Customer'),t.customer)}${kv(lbl('cleanroom','Cleanroom'),t.room)}${kv('Bay',t.bay)}${kv(lbl('assignment','Tool Assignment'),t.driver)}${kv(lbl('swVersion','SW Version'),t.sw)}${kv(lbl('fiProcess','FI Process'),t.process)}${kv(lbl('lampHours','Lamp Hours'),String(t.lamp||0))}</div><div class="tool-status-block"><h3>FI Status / Issues</h3>${kv(lbl('currentChecklist','Current Checklist'),`${t.checklist} — ${checkName(t)}`)}${kv(lbl('latestStatus','Latest Status'),t.activity)}${kv('POA',t.poa)}${kv('Escalation Meeting',t.escalationMeeting)}${kv('Waivers',t.waivers)}${kv('Open NCs',t.ncs.map(n=>n.id+' '+n.state).join(', ')||'None')}</div><div class="tool-status-block"><h3>Shipping Schedule</h3>${kv('Schedule',t.schedule.publish+' / '+t.schedule.status)}${kv('Subsystems',fmt(t.schedule.subsystems))}${kv('Cable Kit',fmt(t.schedule.cables))}${kv('Accessories',fmt(t.schedule.accessories))}${kv('MST',mstApplicable(t)?fmt(t.schedule.mst):'N/A')}${kv('IS',fmt(t.schedule.is))}${kv('Notes',t.schedule.notes)}</div>${customStatusBlock(t)}</div><div class="progress-board"><div class="progress-panel"><h3>FI Checklist Route · ${rc.done}/${rc.total} Complete</h3>${routeWorkflow(t)}</div><div class="progress-panel"><h3>Lead / Admin Workflow · ${lc.done}/${lc.total} Complete</h3>${leadWorkflow(t,false)}</div></div></div>`;actions([{label:'Edit This Tool',primary:true,fn:()=>toolAdmin(t.id)},{label:'Back to Tools',fn:()=>setView('systems')}])}
function admin(section='home'){view='admin';document.body.dataset.theme='admin';document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='admin'));let tabs=[['home','Admin Home'],['tools','Tool Admin'],['countdown','Countdown'],['shipping','Shipping'],['daily','Weekday'],['meeting','Morning'],['weekend','Weekend'],['config','Configuration']];app.innerHTML=page('Administration','Edit the shared master data behind every clean status/report page.','CONTROL & EDITING')+`<div class="admin-tabs">${tabs.map(x=>`<button class="admin-tab ${section===x[0]?'active':''}" data-admin="${x[0]}">${x[1]}</button>`).join('')}</div><div id="adminBody"></div>`;document.querySelectorAll('[data-admin]').forEach(x=>x.onclick=()=>admin(x.dataset.admin));renderAdmin(section);actions([{label:'Add Tool',primary:true,fn:()=>toolAdmin()},{label:'Tool Countdown',fn:()=>setView('countdown')}],false)}
function renderAdmin(s){let b=$('#adminBody');if(s==='home')b.innerHTML=`<div class="admin-launch-grid">${[['tools','Universal Tool Admin','Complete master tool record and both progress tracks.'],['countdown','Tool Countdown Admin','Quarter plan, pull-in/push-out and three-state shipping status.'],['shipping','Shipping Schedule Admin','Create/publish/update handoff schedules.'],['daily','Weekday Priorities Admin','Order and assign the normal full-crew weekday plan.'],['meeting','Morning Quick Update','Fast update of tool status before the manager meeting.'],['weekend','Weekend Plan Admin','Enter volunteers/hours first, then build weekend priorities.'],['config','Configuration','Rename fields, add/reorder Lead tasks, edit dropdowns and add custom Tool fields.']].map(x=>`<div class="admin-launch" data-open="${x[0]}"><strong>${x[1]}</strong><span>${x[2]}</span></div>`).join('')}</div>`;if(s==='tools')b.innerHTML=`<div class="panel"><div class="subsection-title"><h3>Universal Tool Admin</h3><button id="newTool" class="btn primary">Add Tool</button></div><div class="table-wrap"><table class="report-table"><thead><tr><th>${esc(lbl('utid','UTID'))}</th><th>Code Name</th><th>Model</th><th>${esc(lbl('customer','Customer'))}</th><th>${esc(lbl('shipDate','MFG Ship'))}</th><th>Status</th><th></th></tr></thead><tbody>${tools.map(t=>`<tr><td><b>${esc(t.id)}</b></td><td>${esc(t.codename)}</td><td>${esc(t.model)}</td><td>${esc(t.customer)}</td><td>${fmt(t.ship)}</td><td>${esc(t.quarterStatus)}</td><td><button class="btn small" data-edit="${esc(t.id)}">Edit</button></td></tr>`).join('')}</tbody></table></div></div>`;if(s==='countdown')b.innerHTML=countdownAdmin();if(s==='shipping')b.innerHTML=shippingAdmin();if(s==='daily')b.innerHTML=priorityAdmin('daily');if(s==='meeting')b.innerHTML=morningAdmin();if(s==='weekend')b.innerHTML=weekendAdmin();if(s==='config')b.innerHTML=configPage();document.querySelectorAll('[data-open]').forEach(x=>x.onclick=()=>admin(x.dataset.open));document.querySelectorAll('[data-edit]').forEach(x=>x.onclick=()=>toolAdmin(x.dataset.edit));if($('#newTool'))$('#newTool').onclick=()=>toolAdmin();wireAdmin(s)}
function listInput(value,list,id,cls=''){return `<input ${id?`id="${id}"`:''} class="${cls}" list="${list}" value="${esc(value)}">`}
function datalist(id,values){return `<datalist id="${id}">${[...new Set(values.filter(Boolean))].map(x=>`<option value="${esc(x)}"></option>`).join('')}</datalist>`}
function remembered(key){return tools.map(t=>t[key]).filter(Boolean)}
function codenameOptions(v){return Object.keys(PRODUCT_CATALOG).map(x=>`<option value="${x}" ${x===v?'selected':''}>${x}</option>`).join('')}
function modelOptions(code,v){let a=[...(PRODUCT_CATALOG[code]||[])];if(v&&!a.includes(v))a.push(v);return a.map(x=>`<option value="${esc(x)}" ${x===v?'selected':''}>${esc(x)}</option>`).join('')}
function quarterOptions(v){let a=[...QUARTERS];if(v&&!a.includes(v))a.push(v);return a.map(x=>`<option value="${x}" ${x===v?'selected':''}>${x}</option>`).join('')}
function countdownAdmin(){return `<div class="panel"><h3>Quarter Tool Shipping Countdown Admin</h3><p class="helper">Workbook fields are included. Product Model is limited by Code Name. Other text values can be entered manually.</p><div class="table-wrap"><table class="report-table compact-form-table countdown-admin-table"><thead><tr><th>Quarter</th><th>Family</th><th>Code Name</th><th>Model</th><th>Customer</th><th>Sales Order</th><th>UTID</th><th>MFG Ship Date</th><th>Pull-In Date</th><th>Pulled In From Quarter</th><th>Push-Out Date</th><th>Pushed Out To Quarter</th><th>Status</th></tr></thead><tbody>${tools.map(t=>`<tr data-cd="${esc(t.id)}"><td><select class="cd-quarter">${quarterOptions(t.quarter)}</select></td><td>29XX</td><td><select class="cd-code">${codenameOptions(t.codename)}</select></td><td><select class="cd-model">${modelOptions(t.codename,t.model)}</select></td><td><input class="cd-customer" list="customers" value="${esc(t.customer)}"></td><td><input class="cd-so" list="salesOrders" value="${esc(t.so)}"></td><td><input class="cd-id" value="${esc(t.id)}"></td><td><input class="cd-ship" type="date" value="${esc(t.ship)}"></td><td><input class="cd-pull" type="date" value="${esc(t.pullIn)}"></td><td><input class="cd-from" list="quarters" value="${esc(t.pulledInFrom)}"></td><td><input class="cd-push" type="date" value="${esc(t.pushOut)}"></td><td><input class="cd-next" list="quarters" value="${esc(t.nextQuarter)}"></td><td>${lifecycleSelect(t)}</td></tr>`).join('')}</tbody></table></div>${datalist('customers',[...new Set(['N/A',...(state.reusable.customers||[]),...remembered('customer')])])}${datalist('salesOrders',[...new Set(['N/A',...(state.reusable.salesOrders||[]),...remembered('so')])])}${datalist('quarters',QUARTERS)}<div class="actions" style="margin-top:12px"><button id="saveCountdown" class="btn primary">Save Countdown Changes</button></div></div>`}
function shippingAdmin(){return `<div class="panel"><h3>Shipping Schedule Admin</h3><div class="table-wrap"><table class="report-table compact-form-table"><thead><tr><th>System</th><th>MFG Ship</th><th>Code Name</th><th>Cleanroom</th><th>Publish</th><th>Schedule Status</th><th>Subsystems</th><th>Cable Kit</th><th>Accessories</th><th>MST</th><th>IS</th><th>Notes</th></tr></thead><tbody>${tools.filter(t=>t.quarterStatus==='In FI'||t.quarterStatus==='Shipped').map(t=>`<tr data-sh="${esc(t.id)}"><td><b>${esc(t.id)}</b></td><td>${fmt(t.ship)}</td><td>${esc(t.codename)}</td><td>${esc(t.room)}</td><td><select class="sh-pub">${['N/A','Drafting','Created','Published'].map(x=>`<option ${t.schedule.publish===x?'selected':''}>${x}</option>`).join('')}</select></td><td><select class="sh-stat"><option ${t.schedule.status==='N/A'?'selected':''}>N/A</option><option ${t.schedule.status==='In Progress'?'selected':''}>In Progress</option><option ${t.schedule.status==='Updated'?'selected':''}>Updated</option><option ${t.schedule.status==='Completed'?'selected':''}>Completed</option></select></td><td><input class="sh-sub" type="date" value="${esc(t.schedule.subsystems)}"></td><td><input class="sh-cab" type="date" value="${esc(t.schedule.cables)}"></td><td><input class="sh-acc" type="date" value="${esc(t.schedule.accessories)}"></td><td>${mstApplicable(t)?`<input class="sh-mst" type="date" value="${esc(t.schedule.mst==='N/A'?'':t.schedule.mst)}">`:`<input type="date" class="sh-mst" value="N/A" disabled>`}</td><td><input class="sh-is" type="date" value="${esc(t.schedule.is)}"></td><td><input class="sh-note" value="${esc(t.schedule.notes)}"></td></tr>`).join('')}</tbody></table></div><div class="actions" style="margin-top:12px"><button id="saveShipping" class="btn primary">Save Shipping Schedules</button></div></div>`}
function priorityOptions(v){return `<option value="">None</option>`+Array.from({length:50},(_,i)=>i+1).map(n=>`<option value="${n}" ${n===v?'selected':''}>${n}</option>`).join('')}
function routeOptions(t){let a=routeFor(t);return a.map(x=>`<option value="${x[0]}" ${x[0]===t.checklist?'selected':''}>${x[0]} — ${x[1]}</option>`).join('')}
function priorityAdmin(type){let key=type==='weekend'?'weekendPriority':'dailyPriority',ass=type==='weekend'?'weekendAssignment':'weekdayAssignment',notes=type==='weekend'?'weekendNotes':'priorityNotes';return `<div class="panel"><div class="form-group" style="max-width:600px"><label>Report Title</label><input id="priorityTitle" value="${esc(type==='weekend'?state.weekend.title:state.weekday.title)}"></div><div class="table-wrap"><table class="report-table compact-form-table"><thead><tr><th>UTID</th><th>Priority</th><th>Model</th><th>Sales Order</th><th>Customer</th><th>Ship Date</th><th>Cleanroom</th><th>Tool Assignment</th><th>Notes</th></tr></thead><tbody>${inFiTools().map(t=>`<tr data-pr="${esc(t.id)}"><td><b>${esc(t.id)}</b></td><td><select class="pr-num">${priorityOptions(t[key])}</select></td><td>${esc(t.model)}</td><td>${esc(t.so)}</td><td>${esc(t.customer)}</td><td>${fmt(t.ship)}</td><td><input class="pr-room" list="rooms" value="${esc(t.room)}"></td><td><input class="pr-ass" list="people" value="${esc(t[ass]||t.driver)}"></td><td><input class="pr-note" value="${esc(t[notes]||'')}"></td></tr>`).join('')}</tbody></table></div>${datalist('rooms',['CR1','CR2','CR3',...remembered('room')])}${datalist('people',[...remembered('driver'),...remembered('weekdayAssignment'),...remembered('weekendAssignment'),...(state.weekend.volunteers||[]).map(x=>x.name)])}<div class="actions" style="margin-top:12px"><button id="savePriority" data-type="${type}" class="btn primary">Save ${type==='weekend'?'Weekend':'Weekday'} Priorities</button></div></div>`}
function volunteerAdmin(){let v=state.weekend.volunteers||[];return `<div class="panel"><div class="subsection-title"><h3>Weekend Volunteers / Hours</h3><button id="addVolunteer" class="btn">+ Add Volunteer</button></div><div class="table-wrap"><table class="report-table"><thead><tr><th>Name</th><th>Saturday Hours</th><th>Sunday Hours</th><th>Notes</th><th></th></tr></thead><tbody id="volRows">${v.map((x,i)=>volRow(x,i)).join('')}</tbody></table></div></div>`}
function volRow(x,i){return `<tr data-vol="${i}"><td><input class="vol-name" list="peopleMemory" value="${esc(x.name)}"></td><td><input class="vol-sat" value="${esc(x.sat)}"></td><td><input class="vol-sun" value="${esc(x.sun)}"></td><td><input class="vol-note" value="${esc(x.notes)}"></td><td><button class="btn danger small vol-remove">Remove</button></td></tr>`}
function weekendAdmin(){return `${volunteerAdmin()}${datalist('peopleMemory',[...remembered('driver'),...remembered('weekdayAssignment'),...remembered('weekendAssignment'),...(state.weekend.volunteers||[]).map(x=>x.name)])}${priorityAdmin('weekend')}`}
function morningAdmin(){return `<div class="panel"><h3>Morning Quick Update</h3><p class="helper">Make fast meeting-status changes here. Morning visibility and escalation are independent: an NC can stay on the Tool record without appearing in the meeting, and an escalated NC can be de-escalated when resolved.</p><div class="table-wrap"><table class="report-table compact-form-table morning-update-table"><thead><tr><th class="utid-col">UTID</th><th class="location-col">Location</th><th class="sw-col">SW Version</th><th class="checklist-col">Current / Next Checklist</th><th class="previous-col">Previous Checklist Action</th><th class="lamp-col">Lamp Hours</th><th class="status-col">Latest Status</th><th class="nc-col">Morning NCs</th><th class="process-col">Reduced Process</th></tr></thead><tbody>${inFiTools().map(t=>`<tr data-m="${esc(t.id)}" data-old-check="${esc(t.checklist)}"><td><b>${esc(t.id)}</b></td><td><div class="location-fields"><select class="m-room">${['CR1','CR2','CR3'].map(x=>`<option ${x===t.room?'selected':''}>${x}</option>`).join('')}</select><input class="m-bay" placeholder="Bay" value="${esc(t.bay||'')}"></div></td><td><input class="m-sw" list="swMemory" value="${esc(t.sw)}"></td><td><div class="checklist-quick"><select class="m-check">${morningChecklistOptions(t)}</select><div class="checklist-current-note">Current: ${esc(t.checklist)} · ${esc(t.checklistStates?.[t.checklist]||'In Progress')}</div><button type="button" class="btn small quick-detail-btn" data-edit-morning-tool="${esc(t.id)}">Detailed Checklists</button></div></td><td><div class="previous-action-wrap"><select class="m-prev-action"><option>Complete</option><option>Skipped</option><option>Keep In Progress</option><option>N/A</option></select><div class="previous-label">Used only when selecting a different checklist. Current: ${esc(t.checklist)}</div></div></td><td><input class="m-lamp" type="number" value="${t.lamp||0}"></td><td><input class="m-act" list="activityMemory" value="${esc(t.activity)}"></td><td><div class="morning-nc-list">${(t.ncs||[]).map(n=>`<div class="morning-nc-choice ${isEscalatedNc(n)?'escalated':''}" data-nc-row="${esc(n.id)}"><span class="nc-main"><b>${esc(n.id)}</b> — ${esc(n.desc)}<small>${isEscalatedNc(n)?`Escalated — Day ${n.days||1}`:'Open NC'}</small></span><div class="nc-state-controls"><label class="nc-state-check"><input class="m-nc" type="checkbox" value="${esc(n.id)}" ${(t.morningNcIds||[]).includes(n.id)||isEscalatedNc(n)?'checked':''}><span>Show Morning</span></label><label class="nc-state-check ${isEscalatedNc(n)?'escalated-on':''}"><input class="m-escalated" type="checkbox" value="${esc(n.id)}" ${isEscalatedNc(n)?'checked':''}><span>Escalated</span></label><label class="nc-day-control"><span>Days</span><input class="m-escalation-days" type="number" min="1" value="${isEscalatedNc(n)?(n.days||1):1}" ${isEscalatedNc(n)?'':'disabled'}></label></div></div>`).join('')||'<span class="gray">No NCs on Tool record.</span>'}</div><div class="nc-actions"><button type="button" class="btn small nc-action-btn" data-add-nc="${esc(t.id)}">+ Add NC</button></div><div class="nc-inline-editor hidden" data-nc-editor="${esc(t.id)}"><div class="nc-create-top"><div class="nc-create-field"><label>NC #</label><input class="new-nc-id" placeholder="NC #"></div><div class="nc-create-field"><label>Status</label><select class="new-nc-state"><option>Open</option><option>Escalated</option></select></div></div><div class="nc-create-description"><label>NC Description</label><textarea class="new-nc-desc" placeholder="Enter the NC description"></textarea></div><div class="nc-new-escalation-days"><label>Escalation Days</label><input class="new-nc-days" type="number" min="1" value="1"></div><div class="inline-actions"><button type="button" class="btn small primary save-inline-nc">Add NC</button><button type="button" class="btn small cancel-inline-nc">Cancel</button></div></div></td><td class="process-col"><label class="reduced-process-control ${t.process==='Reduced Process'?'active':''}"><input class="m-reduced" type="checkbox" ${t.process==='Reduced Process'?'checked':''}><span>Reduced Process</span></label></td></tr>`).join('')}</tbody></table></div>${datalist('swMemory',remembered('sw'))}${datalist('activityMemory',remembered('activity'))}<div class="actions" style="margin-top:16px"><button id="saveMorning" class="btn primary">Save Morning Updates</button></div></div>`}
function configPage(){let c=state.config;return `<div class="config-note"><b>Future-proof configuration:</b> Lead/Admin tasks and custom Tool fields use stable internal IDs. Renaming a field changes its display name without deleting saved tool values. Core system fields are protected, but their display labels can be renamed.</div><section class="config-section panel"><h3>Core Tool Field Display Names</h3><p class="gray">Rename labels only. The underlying universal field stays the same everywhere.</p><div class="table-wrap"><table class="report-table config-table"><thead><tr><th>System Field</th><th>Display Name</th><th>Protection</th></tr></thead><tbody>${CORE_FIELD_DEFS.map(([id,def])=>`<tr data-core="${id}"><td><code>${id}</code></td><td><input class="core-label wide-input" value="${esc(c.labels[id]||def)}"></td><td><span class="protected">Protected data field</span></td></tr>`).join('')}</tbody></table></div></section><section class="config-section panel"><div class="subsection-title"><div><h3>Lead / Admin Workflow Builder</h3><p class="gray">This order becomes the Lead/Admin sequence shown on every Tool page and drives the Lead/Admin progress bar.</p></div><button id="addLeadTask" class="btn">+ Add Task</button></div><div class="table-wrap"><table class="report-table config-table"><thead><tr><th>#</th><th>Task / Field Name</th><th>Dropdown Choices</th><th>Progress?</th><th>Active?</th><th>Actions</th></tr></thead><tbody id="leadConfigRows">${c.leadTasks.map((t,i)=>leadConfigRow(t,i)).join('')}</tbody></table></div></section><section class="config-section panel"><div class="subsection-title"><div><h3>Custom Tool Fields</h3><p class="gray">Add extra universal fields without changing code. Values are stored once per Tool and shown everywhere that uses the field.</p></div><button id="addCustomField" class="btn">+ Add Field</button></div><div class="table-wrap"><table class="report-table config-table"><thead><tr><th>#</th><th>Field Name</th><th>Section</th><th>Type</th><th>Dropdown Choices</th><th>Manual Entry?</th><th>Show on Tool Status?</th><th>Active?</th><th>Actions</th></tr></thead><tbody id="customConfigRows">${c.customFields.map((f,i)=>customConfigRow(f,i)).join('')}</tbody></table></div></section><div class="actions"><button id="saveConfig" class="btn primary">Save Configuration</button></div>`}
function leadConfigRow(t,i){return `<tr data-lead-id="${esc(t.id)}"><td><span class="order-pill">${i+1}</span></td><td><input class="lead-label wide-input" value="${esc(t.label)}"></td><td><input class="lead-options choices-input" value="${esc((t.options||DEFAULT_TASK_CHOICES).join(' | '))}"></td><td><input class="lead-progress" type="checkbox" ${t.countProgress!==false?'checked':''}></td><td><input class="lead-active" type="checkbox" ${t.active!==false?'checked':''}></td><td><div class="config-actions"><button class="btn small cfg-up" data-kind="lead" data-i="${i}">↑</button><button class="btn small cfg-down" data-kind="lead" data-i="${i}">↓</button><button class="btn danger small cfg-del" data-kind="lead" data-i="${i}">Delete</button></div></td></tr>`}
function customConfigRow(f,i){return `<tr data-custom-id="${esc(f.id)}"><td><span class="order-pill">${i+1}</span></td><td><input class="cf-label wide-input" value="${esc(f.label)}"></td><td><select class="cf-section"><option ${f.section==='Tool Information'?'selected':''}>Tool Information</option><option ${f.section==='Tool Progress'?'selected':''}>Tool Progress</option><option ${f.section==='Lead / Admin'?'selected':''}>Lead / Admin</option><option ${f.section==='Shipping'?'selected':''}>Shipping</option><option ${f.section==='Other'?'selected':''}>Other</option></select></td><td><select class="cf-type"><option ${f.type==='Text'?'selected':''}>Text</option><option ${f.type==='Number'?'selected':''}>Number</option><option ${f.type==='Date'?'selected':''}>Date</option><option ${f.type==='Dropdown'?'selected':''}>Dropdown</option></select></td><td><input class="cf-options choices-input" value="${esc((f.options||[]).join(' | '))}"></td><td><input class="cf-manual" type="checkbox" ${f.allowCustom!==false?'checked':''}></td><td><input class="cf-status" type="checkbox" ${f.showStatus!==false?'checked':''}></td><td><input class="cf-active" type="checkbox" ${f.active!==false?'checked':''}></td><td><div class="config-actions"><button class="btn small cfg-up" data-kind="custom" data-i="${i}">↑</button><button class="btn small cfg-down" data-kind="custom" data-i="${i}">↓</button><button class="btn danger small cfg-del" data-kind="custom" data-i="${i}">Delete</button></div></td></tr>`}
function collectConfigFromDom(){document.querySelectorAll('[data-core]').forEach(r=>state.config.labels[r.dataset.core]=r.querySelector('.core-label').value.trim()||r.dataset.core);let lead=[];document.querySelectorAll('[data-lead-id]').forEach(r=>lead.push({id:r.dataset.leadId,label:r.querySelector('.lead-label').value.trim()||'Untitled Task',options:r.querySelector('.lead-options').value.split('|').map(x=>x.trim()).filter(Boolean),countProgress:r.querySelector('.lead-progress').checked,active:r.querySelector('.lead-active').checked}));state.config.leadTasks=lead;let custom=[];document.querySelectorAll('[data-custom-id]').forEach(r=>custom.push({id:r.dataset.customId,label:r.querySelector('.cf-label').value.trim()||'Untitled Field',section:r.querySelector('.cf-section').value,type:r.querySelector('.cf-type').value,options:r.querySelector('.cf-options').value.split('|').map(x=>x.trim()).filter(Boolean),allowCustom:r.querySelector('.cf-manual').checked,showStatus:r.querySelector('.cf-status').checked,active:r.querySelector('.cf-active').checked}));state.config.customFields=custom;tools.forEach(t=>syncToolConfig(t,state.config))}
function moveConfig(kind,i,delta){collectConfigFromDom();let a=kind==='lead'?state.config.leadTasks:state.config.customFields,j=i+delta;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];renderAdmin('config')}
function deleteConfig(kind,i){collectConfigFromDom();let a=kind==='lead'?state.config.leadTasks:state.config.customFields,item=a[i];if(!item)return;if(!confirm(`Deactivate/delete ${item.label}? Existing saved values will be preserved internally where possible.`))return;a.splice(i,1);renderAdmin('config')}
function wireConfig(){if($('#addLeadTask'))$('#addLeadTask').onclick=()=>{collectConfigFromDom();let id='lead_custom_'+state.config.nextLeadId++;state.config.leadTasks.push({id,label:'New Lead / Admin Task',options:[...DEFAULT_TASK_CHOICES],active:true,countProgress:true});tools.forEach(t=>t.leadAdmin[id]='Not Started');renderAdmin('config')};if($('#addCustomField'))$('#addCustomField').onclick=()=>{collectConfigFromDom();let id='custom_'+state.config.nextCustomId++;state.config.customFields.push({id,label:'New Tool Field',section:'Other',type:'Dropdown',options:['Not Started','Complete','N/A'],allowCustom:true,showStatus:true,active:true});tools.forEach(t=>t.custom[id]='');renderAdmin('config')};document.querySelectorAll('.cfg-up').forEach(b=>b.onclick=()=>moveConfig(b.dataset.kind,Number(b.dataset.i),-1));document.querySelectorAll('.cfg-down').forEach(b=>b.onclick=()=>moveConfig(b.dataset.kind,Number(b.dataset.i),1));document.querySelectorAll('.cfg-del').forEach(b=>b.onclick=()=>deleteConfig(b.dataset.kind,Number(b.dataset.i)));if($('#saveConfig'))$('#saveConfig').onclick=()=>{collectConfigFromDom();save();alert('Configuration saved. Tool pages now use the updated field names, task order, and dropdown choices.');admin('config')}}
function wireAdmin(s){if(s==='config'){wireConfig();return}if($('#saveCountdown'))$('#saveCountdown').onclick=()=>{document.querySelectorAll('[data-cd]').forEach(r=>{let t=tools.find(x=>x.id===r.dataset.cd),old=t.id;t.quarter=r.querySelector('.cd-quarter').value;t.codename=r.querySelector('.cd-code').value;t.model=r.querySelector('.cd-model').value;t.customer=r.querySelector('.cd-customer').value;t.so=r.querySelector('.cd-so').value;t.id=r.querySelector('.cd-id').value.trim();t.ship=r.querySelector('.cd-ship').value;t.pullIn=r.querySelector('.cd-pull').value;t.pushOut=r.querySelector('.cd-push').value;t.nextQuarter=r.querySelector('.cd-next').value;t.pulledInFrom=r.querySelector('.cd-from').value;t.quarterStatus=r.querySelector('.cd-status').value});save();setView('countdown')};document.querySelectorAll('.cd-code').forEach(sel=>sel.onchange=()=>{let r=sel.closest('tr');r.querySelector('.cd-model').innerHTML=modelOptions(sel.value,'')});if($('#saveShipping'))$('#saveShipping').onclick=()=>{document.querySelectorAll('[data-sh]').forEach(r=>{let t=tools.find(x=>x.id===r.dataset.sh);t.schedule.publish=r.querySelector('.sh-pub').value;t.schedule.status=r.querySelector('.sh-stat').value;t.schedule.subsystems=r.querySelector('.sh-sub').value;t.schedule.cables=r.querySelector('.sh-cab').value;t.schedule.accessories=r.querySelector('.sh-acc').value;t.schedule.mst=mstApplicable(t)?r.querySelector('.sh-mst').value:'N/A';t.schedule.is=r.querySelector('.sh-is').value;t.schedule.notes=r.querySelector('.sh-note').value;});save();setView('shipping')};if($('#savePriority'))$('#savePriority').onclick=()=>{let type=$('#savePriority').dataset.type,key=type==='weekend'?'weekendPriority':'dailyPriority',ass=type==='weekend'?'weekendAssignment':'weekdayAssignment',notes=type==='weekend'?'weekendNotes':'priorityNotes',rows=[...document.querySelectorAll('[data-pr]')],nums=rows.map(r=>r.querySelector('.pr-num').value).filter(Boolean);if(new Set(nums).size!==nums.length)return alert('Each priority number can only be used once on this list.');rows.forEach(r=>{let t=tools.find(x=>x.id===r.dataset.pr);t[key]=r.querySelector('.pr-num').value?Number(r.querySelector('.pr-num').value):null;t.room=r.querySelector('.pr-room').value;t[ass]=r.querySelector('.pr-ass').value;t[notes]=r.querySelector('.pr-note').value});if(type==='weekend')state.weekend.title=$('#priorityTitle').value;else state.weekday.title=$('#priorityTitle').value;if(type==='weekend'){state.weekend.volunteers=[...document.querySelectorAll('[data-vol]')].map(r=>({name:r.querySelector('.vol-name').value,sat:r.querySelector('.vol-sat').value,sun:r.querySelector('.vol-sun').value,notes:r.querySelector('.vol-note').value})).filter(x=>x.name)}save();setView(type==='weekend'?'weekend':'daily')};if($('#addVolunteer')){$('#addVolunteer').onclick=()=>{$('#volRows').insertAdjacentHTML('beforeend',volRow({name:'',sat:'',sun:'',notes:''},Date.now()));wireVolRemove()};wireVolRemove()}if($('#saveMorning'))$('#saveMorning').onclick=()=>{document.querySelectorAll('[data-m]').forEach(r=>{let t=tools.find(x=>x.id===r.dataset.m);if(!t)return;t.room=r.querySelector('.m-room').value;t.bay=r.querySelector('.m-bay').value.trim();t.sw=r.querySelector('.m-sw').value;t.lamp=Number(r.querySelector('.m-lamp').value)||0;t.activity=r.querySelector('.m-act').value;t.morningNcIds=[...r.querySelectorAll('.m-nc:checked')].map(x=>x.value);r.querySelectorAll('[data-nc-row]').forEach(nr=>{let id=nr.dataset.ncRow,escBox=nr.querySelector('.m-escalated'),days=nr.querySelector('.m-escalation-days');if(escBox.checked)escalateToolNc(t,id,days.value);else deescalateToolNc(t,id)});setReducedProcess(t,r.querySelector('.m-reduced').checked);applyMorningChecklistTransition(t,r.querySelector('.m-check').value,r.querySelector('.m-prev-action').value)});save();setView('meeting')};document.querySelectorAll('[data-edit-morning-tool]').forEach(x=>x.onclick=()=>toolAdmin(x.dataset.editMorningTool));document.querySelectorAll('[data-add-nc]').forEach(btn=>btn.onclick=()=>{let ed=document.querySelector(`[data-nc-editor="${btn.dataset.addNc}"]`);if(ed)ed.classList.remove('hidden')});
document.querySelectorAll('.cancel-inline-nc').forEach(btn=>btn.onclick=()=>btn.closest('.nc-inline-editor').classList.add('hidden'));
document.querySelectorAll('.new-nc-state').forEach(sel=>sel.onchange=()=>{let ed=sel.closest('.nc-inline-editor'),days=ed.querySelector('.nc-new-escalation-days');days.classList.toggle('visible',sel.value==='Escalated')});
document.querySelectorAll('.m-escalated').forEach(box=>box.onchange=()=>{let row=box.closest('[data-nc-row]'),days=row.querySelector('.m-escalation-days');days.disabled=!box.checked;if(box.checked&&(!days.value||Number(days.value)<1))days.value=1});
document.querySelectorAll('.save-inline-nc').forEach(btn=>btn.onclick=()=>{let ed=btn.closest('.nc-inline-editor'),row=btn.closest('[data-m]'),t=tools.find(x=>x.id===row.dataset.m);if(!t)return;let state=ed.querySelector('.new-nc-state').value,days=Number(ed.querySelector('.new-nc-days').value)||1;let result=addToolNc(t,ed.querySelector('.new-nc-id').value,ed.querySelector('.new-nc-desc').value,state);if(!result.ok)return alert(result.msg);if(state==='Escalated')escalateToolNc(t,result.id,days);if(!t.morningNcIds.includes(result.id))t.morningNcIds.push(result.id);save();admin('meeting')});if($('#saveReusableLists'))$('#saveReusableLists').onclick=()=>{let vals=id=>[...new Set($(id).value.split(/\r?\n/).map(x=>x.trim()).filter(Boolean))];state.reusable.drivers=[...new Set(['Unassigned',...vals('#cfg-drivers')])];state.reusable.bays=vals('#cfg-bays');state.reusable.customers=[...new Set(['N/A',...vals('#cfg-customers')])];state.reusable.salesOrders=[...new Set(['N/A',...vals('#cfg-salesorders')])];save();alert('Reusable lists saved.')} ;
}
function wireVolRemove(){document.querySelectorAll('.vol-remove').forEach(b=>b.onclick=()=>b.closest('tr').remove())}
function field(label,id,val,type='text',list=''){return `<div class="form-group"><label>${label}</label><input id="${id}" type="${type}" ${list?`list="${list}"`:''} value="${esc(val)}"></div>`}
function toolAdmin(id){let original=id?tools.find(x=>x.id===id):null,t=original?clone(original):defaultTool();document.body.dataset.theme='admin';app.innerHTML=page(original?`Update Tool ${esc(t.id)}`:'Add Tool','Complete master Tool record. Changes feed all generated reports.','TOOL ADMIN')+`<div class="admin-tabs"><button class="admin-tab active" data-tab="basic">Tool Information</button><button class="admin-tab" data-tab="fi">Tool Progress</button><button class="admin-tab" data-tab="lead">Lead / Admin</button><button class="admin-tab" data-tab="shipping">Shipping</button><button class="admin-tab" data-tab="issues">NCs</button><button class="admin-tab" data-tab="custom">Custom Fields</button></div><div id="taBody"></div>`;let tab='basic';function collect(){if($('#ta-id')){t.id=$('#ta-id').value.trim();t.codename=$('#ta-code').value;t.model=$('#ta-model').value;t.so=$('#ta-so').value;t.customer=$('#ta-customer').value;t.room=$('#ta-room').value;t.bay=$('#ta-bay').value;t.quarterStatus=$('#ta-qstatus').value;t.driver=$('#ta-driver').value;t.ship=$('#ta-ship').value;t.sw=$('#ta-sw').value;t.process=$('#ta-process').value;t.lamp=Number($('#ta-lamp').value)||0;t.notes=$('#ta-notes').value;t.activity=$('#ta-act').value}if($('#ta-check')){t.checklist=$('#ta-check').value;t.escalationMeeting=$('#ta-escalation').value;t.poa=$('#ta-poa').value;t.fiStatus=$('#ta-fistat').value;t.waivers=$('#ta-waivers').value}document.querySelectorAll('[data-check-code]').forEach(x=>t.checklistStates[x.dataset.checkCode]=x.value);syncCurrentChecklist(t);document.querySelectorAll('[data-task-id]').forEach(x=>t.leadAdmin[x.dataset.taskId]=x.value);document.querySelectorAll('[data-custom-id]').forEach(x=>t.custom[x.dataset.customId]=x.value);if($('#sch-pub')){t.schedule.publish=$('#sch-pub').value;t.schedule.status=$('#sch-stat').value;t.schedule.subsystems=$('#sch-sub').value;t.schedule.cables=$('#sch-cab').value;t.schedule.accessories=$('#sch-acc').value;t.schedule.mst=$('#sch-mst').value;t.schedule.is=$('#sch-is').value;t.schedule.notes=$('#sch-notes').value}if(document.querySelector('.nc-card'))t.ncs=[...document.querySelectorAll('.nc-card')].map(r=>({id:r.querySelector('.nid').value,desc:r.querySelector('.ndesc').value,state:r.querySelector('.nstate').value,days:Number(r.querySelector('.ndays').value)||0,blocking:r.querySelector('.nblock').checked})).filter(n=>n.id||n.desc)}function draw(){let b=$('#taBody');if(tab==='basic')b.innerHTML=`<div class="panel"><div class="form-grid"><div class="form-group"><label>Product Family</label><input value="29XX" disabled></div><div class="form-group"><label>Code Name</label><select id="ta-code">${codenameOptions(t.codename)}</select></div><div class="form-group"><label>Model</label><select id="ta-model">${modelOptions(t.codename,t.model)}</select></div>${field(lbl('utid','UTID'),'ta-id',t.id)}${field(lbl('salesOrder','Sales Order'),'ta-so',t.so)}${field(lbl('customer','Customer'),'ta-customer',t.customer,'text','customerMemory')}<div class="form-group"><label>${esc(lbl('cleanroom','Cleanroom'))}</label><select id="ta-room">${['CR1','CR2','CR3'].map(x=>`<option ${x===t.room?'selected':''}>${x}</option>`).join('')}</select></div>${field('Cleanroom Bay','ta-bay',t.bay,'text','bayMemory')}<div class="form-group"><label>${esc(lbl('toolStatus','Tool Status'))}</label><select id="ta-qstatus"><option value="Waiting for FI" ${t.quarterStatus==='Waiting for FI'?'selected':''}>Waiting to be Handed to FI</option><option value="In FI" ${t.quarterStatus==='In FI'?'selected':''}>In FI</option><option value="Shipped" ${t.quarterStatus==='Shipped'?'selected':''}>Shipped</option><option value="Archive" ${t.quarterStatus==='Archive'?'selected':''}>Archive</option></select></div>${field(lbl('assignment','Tool Assignment'),'ta-driver',t.driver,'text','peopleMemory')}${field(lbl('shipDate','MFG Ship Date'),'ta-ship',t.ship,'date')}${field(lbl('swVersion','SW Version'),'ta-sw',t.sw,'text','swMemory')}<div class="form-group"><label>${esc(lbl('fiProcess','FI Process'))}</label><select id="ta-process"><option ${t.process==='Full Process'?'selected':''}>Full Process</option><option ${t.process==='Reduced Process'?'selected':''}>Reduced Process</option></select></div>${field(lbl('lampHours','Lamp Hours'),'ta-lamp',t.lamp,'number')}<div class="form-group wide"><label>Notes</label><textarea id="ta-notes">${esc(t.notes)}</textarea></div><div class="form-group wide"><label>${esc(lbl('latestStatus','Latest Status'))}</label><textarea id="ta-act">${esc(t.activity)}</textarea></div></div>${datalist('customerMemory',remembered('customer'))}${datalist('bayMemory',[...new Set([...(state.reusable.bays||[]),...remembered('bay')])])}${datalist('driverMemory',[...new Set(['Unassigned',...(state.reusable.drivers||[]),...remembered('driver')])])}${datalist('customerMemory',[...new Set(['N/A',...(state.reusable.customers||[]),...remembered('customer')])])}${datalist('salesOrderMemory',[...new Set(['N/A',...(state.reusable.salesOrders||[]),...remembered('so')])])}${datalist('codeNameMemory',[...new Set(remembered('codename'))])}${datalist('modelMemory',[...new Set(remembered('model'))])}${datalist('peopleMemory',[...remembered('driver'),...(state.weekend.volunteers||[]).map(x=>x.name)])}${datalist('swMemory',remembered('sw'))}</div>`;if(tab==='fi')b.innerHTML=`<div class="panel"><div class="metric-grid"><div class="metric"><span>Tool Progress</span><strong>${routeProgress(t)}%</strong><small>${esc(t.checklist)}</small></div></div><div class="form-grid"><div class="form-group"><label>${esc(lbl('currentChecklist','Active Checklist Summary'))}</label><select id="ta-check">${routeOptions(t)}</select><div class="field-preview">Use the ordered checklist states below as the source of truth. More than one checklist may be In Progress.</div></div>${field('Open NCs / details are managed on NC tab','noop','See NC tab','text')}<div class="form-group"><label>Escalation Meeting</label><select id="ta-escalation"><option ${t.escalationMeeting==='N/A'?'selected':''}>N/A</option><option ${t.escalationMeeting==='Yes'?'selected':''}>Yes</option></select></div><div class="form-group"><label>POA</label><select id="ta-poa"><option ${t.poa==='N/A'?'selected':''}>N/A</option><option ${t.poa==='Completed latest POA'?'selected':''}>Completed latest POA</option><option ${t.poa==='Performing latest POA'?'selected':''}>Performing latest POA</option></select></div><div class="form-group"><label>Status</label><select id="ta-fistat"><option ${t.fiStatus==='Progressing'?'selected':''}>Progressing</option><option ${t.fiStatus==='Performing POA'?'selected':''}>Performing POA</option><option ${t.fiStatus==='Line Down'?'selected':''}>Line Down</option></select></div><div class="form-group wide"><label>Waivers</label><textarea id="ta-waivers">${esc(t.waivers)}</textarea></div></div><h3 style="margin-top:18px">Ordered FI Checklist Route</h3>${routeWorkflow(t,true)}</div>`;if(tab==='lead')b.innerHTML=`<div class="panel"><div class="metric-grid"><div class="metric"><span>Lead / Admin Progress</span><strong>${adminProgress(t)}%</strong><small>Ordered workflow from Configuration</small></div></div>${leadWorkflow(t,true)}</div>`;if(tab==='custom'){let fs=(state.config.customFields||[]).filter(f=>f.active!==false);b.innerHTML=`<div class="panel"><h3>Configurable Tool Fields</h3><p class="gray">These fields were added from Administration → Configuration. Values are universal for this Tool.</p><div class="custom-field-grid">${fs.map(f=>`<div class="form-group"><label>${esc(f.label)}</label>${customFieldValueControl(f,t)}<div class="field-preview">${esc(f.section)} · ${esc(f.type)}${f.allowCustom?' · manual entry allowed':''}</div></div>`).join('')||'<p class="gray">No custom fields have been configured.</p>'}</div></div>`;}if(tab==='shipping')b.innerHTML=`<div class="panel"><div class="form-grid"><div class="form-group"><label>Publish Status</label><select id="sch-pub"><option ${t.schedule.publish==='Draft'?'selected':''}>Draft</option><option ${t.schedule.publish==='Published'?'selected':''}>Published</option><option ${t.schedule.publish==='Complete'?'selected':''}>Complete</option></select></div><div class="form-group"><label>Ship Schedule</label><select id="sch-stat"><option ${t.schedule.status==='In Progress'?'selected':''}>In Progress</option><option ${t.schedule.status==='Updated'?'selected':''}>Updated</option><option ${t.schedule.status==='Completed'?'selected':''}>Completed</option></select></div>${field('Subsystems Handoff','sch-sub',t.schedule.subsystems,'date')}${field('Cable Kit Handoff','sch-cab',t.schedule.cables,'date')}${field('Accessories Handoff','sch-acc',t.schedule.accessories,'date')}${mstApplicable(t)?field('MST Install','sch-mst',t.schedule.mst==='N/A'?'':t.schedule.mst,'date'):`<div class="form-group"><label>MST Install</label><div class="mst-na">N/A — Not required for ${esc(t.codename)}</div><input id="sch-mst" type="hidden" value="N/A"></div>`}${field('IS Handoff','sch-is',t.schedule.is,'date')}<div class="form-group wide"><label>Notes</label><textarea id="sch-notes">${esc(t.schedule.notes)}</textarea></div></div></div>`;if(tab==='issues')b.innerHTML=`<div class="panel"><div class="subsection-title"><h3>Open / Escalated NCs</h3><button id="addNc" class="btn">+ Add NC</button></div><div id="ncList">${t.ncs.map((n,i)=>ncRow(n,i)).join('')||'<p class="gray">No critical NCs tracked.</p>'}</div></div>`;if($('#ta-code'))$('#ta-code').onchange=()=>{$('#ta-model').innerHTML=modelOptions($('#ta-code').value,'')};if($('#addNc'))$('#addNc').onclick=()=>{collect();t.ncs.push({id:'',desc:'',state:'Open',days:0,blocking:false});draw()};document.querySelectorAll('.nc-remove').forEach(x=>x.onclick=()=>{collect();t.ncs.splice(Number(x.dataset.i),1);draw()})}function ncRow(n,i){return `<div class="nc-card"><div class="form-grid">${field2('NC #','nid',n.id)}${field2('Description','ndesc',n.desc)}<div class="form-group"><label>Status</label><select class="nstate"><option ${n.state==='Open'?'selected':''}>Open</option><option ${n.state==='Troubleshooting'?'selected':''}>Troubleshooting</option><option ${n.state==='Escalated'?'selected':''}>Escalated</option><option ${n.state==='POA In Progress'?'selected':''}>POA In Progress</option><option ${n.state==='Waiver Pending'?'selected':''}>Waiver Pending</option><option ${n.state==='Closed'?'selected':''}>Closed</option><option ${n.state==='Waived'?'selected':''}>Waived</option></select></div>${field2('Escalation Days','ndays',n.days,'number')}</div><label><input class="nblock" type="checkbox" ${n.blocking?'checked':''}> Blocking FI progression</label> <button class="btn danger small nc-remove" data-i="${i}">Remove</button></div>`}document.querySelectorAll('[data-tab]').forEach(x=>x.onclick=()=>{collect();tab=x.dataset.tab;document.querySelectorAll('[data-tab]').forEach(y=>y.classList.toggle('active',y===x));draw()});draw();actions([{label:'Save Tool',primary:true,fn:()=>{collect();if(!t.id)return alert('UTID is required.');if(!original&&tools.some(x=>x.id===t.id))return alert('That UTID already exists.');if(t.quarterStatus==='Archive'&&!t.archiveDate)t.archiveDate=new Date().toISOString().slice(0,10);if(original)tools[tools.findIndex(x=>x.id===original.id)]=normalize(t);else tools.push(normalize(t));save();toolStatus(t.id)}},{label:'Delete Tool',fn:()=>{if(original&&confirm('Delete this tool record?')){tools=tools.filter(x=>x.id!==original.id);save();setView('systems')}}},{label:'Administration',fn:()=>admin('tools')}],false)}
function field2(label,cls,val,type='text'){return `<div class="form-group"><label>${label}</label><input class="${cls}" type="${type}" value="${esc(val)}"></div>`}

function enhanceDateInputs(){
  document.querySelectorAll('input').forEach(i=>{
    let key=((i.id||'')+' '+(i.className||'')+' '+(i.name||'')+' '+(i.placeholder||'')).toLowerCase();
    if(i.type==='text' && /(date|ship|pull|push|mst|handoff|source|meeting)/.test(key) && !/(status|notes|customer|order)/.test(key)){
      try{i.type='date'}catch(e){}
    }
  });
}

function csvRows(text){
  const rows=[];let row=[],cell='',q=false;
  for(let i=0;i<text.length;i++){let c=text[i];if(q){if(c==='"'&&text[i+1]==='"'){cell+='"';i++}else if(c==='"')q=false;else cell+=c}else{if(c==='"')q=true;else if(c===','){row.push(cell);cell=''}else if(c==='\n'){row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell=''}else cell+=c}}
  if(cell.length||row.length){row.push(cell.replace(/\r$/,''));rows.push(row)}return rows.filter(r=>r.some(x=>String(x).trim()!==''));
}
function normHeader(x){return String(x||'').trim().toLowerCase().replace(/[\s_\/.-]+/g,'')}
function rowValue(obj,...names){for(const n of names){const k=Object.keys(obj).find(x=>normHeader(x)===normHeader(n));if(k!=null&&String(obj[k]??'').trim()!=='')return String(obj[k]).trim()}return ''}
function listStatusToLifecycle(v){let x=String(v||'').trim().toLowerCase();if(x.includes('archive'))return'Archive';if(x.includes('ship'))return'Shipped';if(x.includes('waiting'))return'Waiting for FI';if(x.includes('in fi')||x==='infi')return'In FI';return'Waiting for FI'}
function parseListDate(v){if(!v)return'';let d=new Date(v);if(!isNaN(d))return d.toISOString().slice(0,10);let m=String(v).match(/(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})/);if(m){let y=m[3].length===2?'20'+m[3]:m[3];return `${y}-${m[1].padStart(2,'0')}-${m[2].padStart(2,'0')}`}return''}
function importMicrosoftListCsv(text,fileName='Microsoft Lists CSV'){
  const rows=csvRows(text);if(rows.length<2)throw new Error('No data rows were found in the CSV.');const h=rows[0];let added=0,updated=0,skipped=0;
  rows.slice(1).forEach(r=>{let o={};h.forEach((x,i)=>o[x]=r[i]??'');let id=rowValue(o,'UTID','Title');if(!id){skipped++;return}let existing=tools.find(t=>String(t.id)===id);let t=existing?clone(existing):defaultTool();
    t.id=id;t.codename=rowValue(o,'Code Name','CodeName')||t.codename;t.model=rowValue(o,'Model')||t.model;t.customer=rowValue(o,'Customer')||'N/A';t.so=rowValue(o,'Sales Order','SalesOrder')||'N/A';t.ship=parseListDate(rowValue(o,'MFG Ship Date','MFGShipDate'))||t.ship;t.quarter=rowValue(o,'Quarter')||t.quarter;t.driver=rowValue(o,'Driver','Tool Assignment')||t.driver;
    let loc=rowValue(o,'Cleanroom Location','Cleanroom');if(loc){let mm=loc.match(/\b(CR[123])\b/i);if(mm)t.room=mm[1].toUpperCase();let bay=loc.replace(/\bCR[123]\b/ig,'').replace(/^\s*[-–,:]\s*/,'').trim();if(bay)t.bay=bay}
    t.quarterStatus=listStatusToLifecycle(rowValue(o,'FI Status','Tool Status'));t.lamp=Number(rowValue(o,'Lamp Hours'))||0;t.activity=rowValue(o,'Latest Activity','Latest Status')||t.activity;
    let ck=rowValue(o,'Current Checklist');if(ck)t.checklist=ck;t.listFields={...(t.listFields||{}),...o};t.sharedSource='Microsoft Lists CSV';t.sharedImportedAt=new Date().toISOString();
    if(existing){tools[tools.findIndex(x=>x===existing)]=normalize(t);updated++}else{tools.push(normalize(t));added++}
  });
  state.shared={...(state.shared||{}),mode:'list-csv',lastImport:new Date().toISOString(),lastImportCount:added+updated,lastFile:fileName};save();return{added,updated,skipped};
}
function downloadListTemplate(){
  const headers=['Title','UTID','Code Name','FI Status','Model','Customer','Sales Order','MFG Ship Date','Quarter','Family','Driver','Cleanroom Location','Current Checklist','Tool Progress','Lead / Admin Progress','Lamp Hours','Latest Activity','Critical NCs','Escalated NCs','Escalation Days','POA Status','POA Details','Ship Meeting','Ship Meeting Date','Customer Source Required','Customer Source Start Date','Pre-Source Checklist','CTD Review','Options Requested','Options Cage Setup','Options Arrival','Wafer Kit Transacted','Wafer Kit Issued','Wafer Log Updated','MFG Options File Created','Material Options Tracker Created','Impact File Created','Install File Created','RC File Created','Customer Options File Created'];
  let blob=new Blob([headers.join(',')+'\n'],{type:'text/csv'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='B7-FI-Microsoft-Lists-Column-Template.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);
}
function downloadBlob(name,content,type='application/octet-stream'){
  const blob=new Blob([content],{type}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),800)
}
function safeFileStamp(){return new Date().toISOString().replace(/[:.]/g,'-')}
function exportFullBackup(){
  state.tools=tools;state.config=normalizeConfig(state.config);
  const payload={schema:'B7-FI-COMMAND-CENTER-BACKUP',schemaVersion:1,appVersion:'1.0.3',exportedAt:new Date().toISOString(),state};
  downloadBlob(`B7-FI-Command-Center-Full-Backup-${safeFileStamp()}.json`,JSON.stringify(payload,null,2),'application/json');
}
async function importFullBackup(file){
  const raw=JSON.parse(await file.text()),incoming=raw?.schema==='B7-FI-COMMAND-CENTER-BACKUP'?raw.state:raw;
  if(!incoming||!Array.isArray(incoming.tools))throw new Error('This file does not contain a valid B7 FI Command Center state.');
  if(!confirm(`Import this backup? It contains ${incoming.tools.length} tools. Your current local data will be replaced after a safety backup is downloaded.`))return false;
  exportFullBackup();
  incoming.config=normalizeConfig(incoming.config);incoming.tools=incoming.tools.map(normalize).map(t=>syncToolConfig(t,incoming.config));
  incoming.workspaceTasks=incoming.workspaceTasks||[];incoming.workspaceRefs=incoming.workspaceRefs||[];incoming.reusable=incoming.reusable||{drivers:['Unassigned'],bays:[],customers:['N/A'],salesOrders:['N/A']};
  incoming.shared={...state.shared,...(incoming.shared||{}),mode:'local'};state=incoming;tools=state.tools;save();return true
}
function csvEscape(v){let s=String(v??'');return /[",\n\r]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s}
function exportMigrationCsv(){
 const headers=['Title','UTID','Code Name','FI Status','Model','Customer','Sales Order','MFG Ship Date','Quarter','Family','Driver','Cleanroom Location','Current Checklist','Tool Progress','Lead / Admin Progress','Lamp Hours','Latest Activity','Critical NCs','Escalated NCs','Escalation Days','POA Status','POA Details','Ship Meeting','Ship Meeting Date','Customer Source Required','Customer Source Start Date','Pre-Source Checklist','CTD Review','Options Requested','Options Cage Setup','Options Arrival','Wafer Kit Transacted','Wafer Kit Issued','Wafer Log Updated','MFG Options File Created','Material Options Tracker Created','Impact File Created','Install File Created','RC File Created','Customer Options File Created'];
 const rows=tools.map(t=>{let critical=(t.ncs||[]).filter(n=>n.blocking&&!['closed','waived'].includes(String(n.state).toLowerCase())).map(n=>`${n.id||''} ${n.desc||''}`.trim()).join(' | ');let escs=(t.ncs||[]).filter(n=>String(n.state).toLowerCase().includes('escalat'));let leadByLabel=Object.fromEntries(activeLeadTasks().map(x=>[String(x.label).toLowerCase(),t.leadAdmin?.[x.id]||'']));let findLead=(...keys)=>{for(const k of keys){let e=Object.entries(leadByLabel).find(([x])=>x.includes(k));if(e)return e[1]}return''};return [t.id,t.id,t.codename,t.quarterStatus,t.model,t.customer,t.so,t.ship,t.quarter,t.family,t.driver,[t.room,t.bay].filter(Boolean).join(' '),t.checklist,routeProgress(t),adminProgress(t),t.lamp,t.activity,critical,escs.map(n=>n.id).join(' | '),Math.max(0,...escs.map(n=>Number(n.days)||0)),t.poa,t.waivers,findLead('ship meeting completed','ship meeting'),'',findLead('customer source'),'',findLead('pre-source checklist'),findLead('ctd'),findLead('request options'),findLead('options cage'),findLead('options received'),findLead('transact wafers'),findLead('issued system wafers'),findLead('wafer log'),findLead('mfg options file'),findLead('material options'),findLead('impact options'),findLead('install upgrade'),findLead('rc options'),findLead('customer options')].map(csvEscape)});
 downloadBlob(`B7-FI-Local-to-Microsoft-Lists-${safeFileStamp()}.csv`,[headers.map(csvEscape).join(','),...rows.map(r=>r.join(','))].join('\n'),'text/csv');
}
function normalizedSiteUrl(){return String(state.shared?.siteUrl||'').trim().replace(/\/$/,'')}
function listRestUrl(top=5){let site=normalizedSiteUrl(),name=String(state.shared?.listName||'B7 FI Command Center').replace(/'/g,"''");return `${site}/_api/web/lists/getbytitle('${encodeURIComponent(name).replace(/%20/g,' ')}')/items?$top=${top}`}
async function testDirectSharePoint(){
 const sh=state.shared||(state.shared={});sh.siteUrl=$('#spSiteUrl')?.value.trim()||sh.siteUrl;sh.listName=$('#spListName')?.value.trim()||sh.listName;sh.tenantId=$('#spTenantId')?.value.trim()||'';sh.clientId=$('#spClientId')?.value.trim()||'';sh.lastConnectionTest=new Date().toISOString();save();
 const box=$('#spTestResult');if(box)box.innerHTML='<div class="notice">Testing direct browser access…</div>';
 try{let r=await fetch(listRestUrl(3),{method:'GET',credentials:'include',headers:{'Accept':'application/json;odata=nometadata'}});let body=await r.text();if(!r.ok)throw new Error(`HTTP ${r.status} ${r.statusText}: ${body.slice(0,280)}`);let data=JSON.parse(body);let count=Array.isArray(data?.value)?data.value.length:0;sh.lastConnectionResult=`SUCCESS — SharePoint REST returned ${count} item(s).`;sh.mode='sharepoint-direct-test';save();if(box)box.innerHTML=`<div class="success-box"><b>DIRECT REST TEST SUCCEEDED.</b><br>SharePoint returned ${count} item(s). This browser can reach the List with the current session.</div>`;updateOperationsBar()}
 catch(e){sh.lastConnectionResult=`FAILED — ${e.message||e}`;sh.mode='local';save();if(box)box.innerHTML=`<div class="diagnostic-fail"><b>Direct REST test did not connect.</b><br>${esc(e.message||String(e))}<br><small>This is still a useful result. A file:// or OneDrive-launched page is commonly blocked by browser CORS/authentication rules. Keep the exact message for the next integration step.</small></div>`;updateOperationsBar()}
}
function saveIntegrationConfig(){state.shared.siteUrl=$('#spSiteUrl')?.value.trim()||state.shared.siteUrl;state.shared.listName=$('#spListName')?.value.trim()||state.shared.listName;state.shared.tenantId=$('#spTenantId')?.value.trim()||'';state.shared.clientId=$('#spClientId')?.value.trim()||'';save();let x=$('#configSaveResult');if(x)x.innerHTML='<div class="success-box">Integration configuration saved locally. No secret is stored.</div>'}
function diagnosticReport(){let sh=state.shared||{};return [`B7 FI Command Center v1.0.3 Diagnostic Report`,`Generated: ${new Date().toISOString()}`,`Browser: ${navigator.userAgent}`,`Page protocol: ${location.protocol}`,`Page location: ${location.href}`,`Local tools: ${tools.length}`,`Current tools: ${current().length}`,`Waiting for FI: ${waitingTools().length}`,`In FI: ${inFiTools().length}`,`Shipped: ${shippedTools().length}`,`Archived: ${archiveTools().length}`,`Workspace tasks: ${(state.workspaceTasks||[]).length}`,`Last local change: ${state.lastLocalChange||'none'}`,`SharePoint site: ${sh.siteUrl||'not set'}`,`List name: ${sh.listName||'not set'}`,`Client ID present: ${sh.clientId?'yes':'no'}`,`Tenant ID present: ${sh.tenantId?'yes':'no'}`,`Last connection test: ${sh.lastConnectionTest||'none'}`,`Last connection result: ${sh.lastConnectionResult||'not tested'}`].join('\n')}
async function copyDiagnosticReport(){let report=diagnosticReport();try{await navigator.clipboard.writeText(report);alert('Diagnostic report copied to clipboard.')}catch(e){downloadBlob(`B7-FI-Diagnostic-${safeFileStamp()}.txt`,report,'text/plain')}}
function openMicrosoftList(){let site=normalizedSiteUrl(),name=encodeURIComponent(state.shared?.listName||'B7 FI Command Center');if(!site)return alert('Enter the SharePoint site URL first.');window.open(`${site}/Lists/${name}/AllItems.aspx`,'_blank')}
function sharedData(){
  let sh=state.shared||{};let imported=tools.filter(t=>t.sharedSource).length;let protocol=location.protocol;let readiness=(sh.clientId&&sh.tenantId)?'APP IDs ENTERED':'WAITING FOR IT DETAILS';
  app.innerHTML=`<div class="panel shared-hero"><div><span class="eyebrow">SHARED DATA & MIGRATION LAB · v1.0.1</span><h2>Shared Data</h2><p class="gray">Use the Command Center normally in Local Production Mode today. This page protects that data and gives tomorrow's one-shot SharePoint/Entra test a complete diagnostic path.</p></div><div class="sync-card"><span class="sync-dot ${sh.mode==='sharepoint-direct-test'?'ready':'local'}"></span><div><b>${sh.mode==='sharepoint-direct-test'?'SHAREPOINT TEST CONNECTED':'LOCAL PRODUCTION MODE'}</b><small>${sh.lastConnectionResult?esc(sh.lastConnectionResult):'Local data is authoritative until live SharePoint sync is validated'}</small></div></div></div>
  <div class="shared-grid"><section class="panel"><h3>1 · Protect Today's Local Command Center Data</h3><p class="gray">Do this before and after major tool updates. The full backup preserves tools, Lead/Admin workflow, priorities, workspace tasks, configuration and references.</p><div class="shared-actions"><button id="fullBackupBtn" class="btn primary">Export Full Backup JSON</button><label class="btn file-btn">Import Full Backup<input id="fullBackupInput" type="file" accept=".json,application/json" hidden></label><button id="migrationCsvBtn" class="btn">Export Microsoft Lists Migration CSV</button></div><div id="backupResult"></div><div class="metric-grid compact-metrics"><div class="metric"><span>Local Tools</span><strong>${tools.length}</strong><small>Preserved for later migration</small></div><div class="metric"><span>Last Local Change</span><strong style="font-size:16px">${state.lastLocalChange?new Date(state.lastLocalChange).toLocaleTimeString():'—'}</strong><small>${state.lastLocalChange?new Date(state.lastLocalChange).toLocaleDateString():'No saved change yet'}</small></div><div class="metric"><span>Page Protocol</span><strong style="font-size:16px">${esc(protocol)}</strong><small>${protocol==='file:'?'OneDrive/local-file launch':'Hosted launch'}</small></div></div></section>
  <section class="panel"><h3>2 · Entra / SharePoint Readiness</h3><div class="integration-row"><span>KLA Entra request</span><b class="good-text">APPROVED / IT FULFILLMENT</b></div><div class="integration-row"><span>App Type</span><b>Internal integration</b></div><div class="integration-row"><span>Requested permission</span><b>Read-Write</b></div><div class="integration-row"><span>App registration values</span><b class="${sh.clientId&&sh.tenantId?'good-text':'warn-text'}">${readiness}</b></div><p class="gray">Do not paste a client secret into this browser application. If IT supplies a secret, keep it out of these files and show us the instructions (with the secret hidden).</p></section></div>
  <div class="panel"><h3>3 · Tomorrow's SharePoint Connection Test</h3><p class="gray">The site and List are prefilled from the environment you tested at work. If IT has supplied Tenant ID and Client/Application ID by tomorrow, you can record them here for the next authenticated build. This version does not fake authentication.</p><div class="integration-config-grid"><label>SharePoint Site URL<input id="spSiteUrl" value="${esc(sh.siteUrl||'')}"></label><label>Microsoft List Name<input id="spListName" value="${esc(sh.listName||'B7 FI Command Center')}"></label><label>Tenant ID (optional for tomorrow)<input id="spTenantId" value="${esc(sh.tenantId||'')}" placeholder="Enter only if IT provides it"></label><label>Client / Application ID (optional)<input id="spClientId" value="${esc(sh.clientId||'')}" placeholder="Enter only if IT provides it"></label></div><div class="shared-actions"><button id="saveIntConfigBtn" class="btn">Save Integration Configuration</button><button id="directRestTestBtn" class="btn primary">Test Direct SharePoint REST</button><button id="openListBtn" class="btn">Open Microsoft List</button><button id="copyDiagBtn" class="btn">Copy Diagnostic Report</button></div><div id="configSaveResult"></div><div id="spTestResult">${sh.lastConnectionResult?`<div class="diagnostic-history"><b>Last test:</b> ${esc(sh.lastConnectionResult)}<br><small>${esc(sh.lastConnectionTest||'')}</small></div>`:''}</div></div>
  <div class="shared-grid"><section class="panel"><h3>4 · Existing CSV Bridge</h3><p class="gray">This remains available as the guaranteed fallback. Export the Microsoft List to CSV and import it here; mapped records feed Tool Countdown, Tools, Morning Status and other pages.</p><div class="shared-actions"><label class="btn primary file-btn">Import Microsoft List CSV<input id="listCsvInput" type="file" accept=".csv,text/csv" hidden></label><button id="listTemplateBtn" class="btn">Download Column Template</button></div><div id="listImportResult" class="import-result"></div></section><section class="panel"><h3>5 · Integration Status</h3><div class="integration-row"><span>Local Command Center</span><b class="good-text">READY</b></div><div class="integration-row"><span>Full local backup / restore</span><b class="good-text">READY</b></div><div class="integration-row"><span>Migration CSV export</span><b class="good-text">READY</b></div><div class="integration-row"><span>Microsoft List CSV import</span><b class="good-text">READY</b></div><div class="integration-row"><span>Direct REST diagnostic</span><b class="good-text">READY TO TEST</b></div><div class="integration-row"><span>Authenticated Entra live sync</span><b class="warn-text">WAITING FOR IT FULFILLMENT DETAILS</b></div><div class="integration-row"><span>Auto-sync / multi-user presence</span><b class="warn-text">NEXT PHASE</b></div></section></div>`;
  $('#fullBackupBtn').onclick=exportFullBackup;$('#migrationCsvBtn').onclick=exportMigrationCsv;$('#saveIntConfigBtn').onclick=saveIntegrationConfig;$('#directRestTestBtn').onclick=testDirectSharePoint;$('#openListBtn').onclick=openMicrosoftList;$('#copyDiagBtn').onclick=copyDiagnosticReport;
  $('#fullBackupInput').onchange=async()=>{let file=$('#fullBackupInput').files?.[0];if(!file)return;try{if(await importFullBackup(file)){let b=$('#backupResult');if(b)b.innerHTML='<div class="success-box">Backup restored successfully. Reloading Command Center…</div>';setTimeout(()=>location.reload(),600)}}catch(e){alert('Could not import backup: '+e.message)}};
  let f=$('#listCsvInput');if(f)f.onchange=async()=>{let file=f.files?.[0];if(!file)return;try{let result=importMicrosoftListCsv(await file.text(),file.name);let box=$('#listImportResult');if(box)box.innerHTML=`<div class="success-box">Imported successfully: <b>${result.added}</b> new, <b>${result.updated}</b> updated, <b>${result.skipped}</b> skipped. Open Tool Countdown or Tools to verify the data.</div>`}catch(e){alert('Could not import CSV: '+e.message)}};
  $('#listTemplateBtn').onclick=downloadListTemplate;
  actions([{label:'Export Backup',primary:true,fn:exportFullBackup},{label:'Tool Countdown',fn:()=>setView('countdown')},{label:'Administration',fn:()=>setView('admin')}],false)
}
let opsTickerIndex=0;
function operationalAlerts(){
  let alerts=[];
  (state.workspaceTasks||[]).filter(x=>x.status!=='Completed').forEach(x=>alerts.push({priority:x.status==='In Progress'?2:3,text:`${x.toolId?'TOOL '+x.toolId:'GENERAL'} — ${x.title} · ${x.status}`}));
  current().forEach(t=>{
    (activeLeadTasks()||[]).forEach(task=>{let v=t.leadAdmin?.[task.id]||'Not Started',low=String(v).toLowerCase();if(!['complete','completed','done','n/a','na'].includes(low))alerts.push({priority:low.includes('progress')?2:1,text:`TOOL ${t.id} — ${task.label}: ${v}`})});
    let escalated=(t.ncs||[]).filter(n=>String(n.state).toLowerCase().includes('escalat'));escalated.forEach(n=>alerts.push({priority:5,text:`TOOL ${t.id} — Escalated NC ${n.id||''}${n.days?` · ${n.days} day${Number(n.days)===1?'':'s'}`:''}`}));
    let critical=(t.ncs||[]).filter(n=>n.blocking&& !['closed','waived'].includes(String(n.state).toLowerCase()));critical.forEach(n=>alerts.push({priority:6,text:`TOOL ${t.id} — BLOCKING NC ${n.id||''}: ${n.desc||n.state}`}));
  });
  return alerts.sort((a,b)=>b.priority-a.priority).slice(0,120)
}
function updateOperationsBar(){
  let bar=document.getElementById('operationsBar');if(!bar)return;
  let alerts=operationalAlerts(),open=(state.workspaceTasks||[]).filter(x=>x.status!=='Completed').length;
  let tc=document.getElementById('opsTaskCount');if(tc)tc.textContent=`${open} workspace task${open===1?'':'s'} · ${alerts.length} pending items`;
  let sync=document.getElementById('opsSync');if(sync){let sh=state.shared||{};sync.textContent=sh.mode==='sharepoint-direct-test'?'SharePoint REST test connected':sh.lastImport?`List CSV imported ${new Date(sh.lastImport).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`:'Local Production Mode · SharePoint live sync pending'}
  let pr=document.getElementById('opsPresence');if(pr)pr.textContent=state.shared?.mode==='sharepoint-direct-test'?'SharePoint reachable · presence not enabled yet':'Presence: available after authenticated live Lists connection';
  let tx=document.getElementById('opsTickerText');if(tx){if(!alerts.length)tx.textContent='No pending Lead / Admin items — all tracked work is complete';else{opsTickerIndex%=alerts.length;tx.textContent=alerts[opsTickerIndex].text}}
}
function rotateOperationsTicker(){let tx=document.getElementById('opsTickerText');if(!tx)return;let alerts=operationalAlerts();if(!alerts.length){updateOperationsBar();return}tx.style.opacity='.15';setTimeout(()=>{opsTickerIndex=(opsTickerIndex+1)%alerts.length;updateOperationsBar();tx.style.opacity='1'},180)}
/* v1.0.1: legacy System Status interval disabled; unified alert engine owns rotation. */
function render(){renderEditControls();setTimeout(enhanceDateInputs,0);setTimeout(updateOperationsBar,0);if(view==='countdown')countdown();else if(view==='shipping')shipping();else if(view==='daily')daily();else if(view==='meeting')morning();else if(view==='weekend')weekend();else if(view==='workspace')workspace();else if(view==='systems')systems();else if(view==='archive')archive();else if(view==='shared')sharedData();else admin()}

document.addEventListener('click',e=>{if(editMode)return;const el=e.target.closest('button,input,select,textarea');if(!el)return;if(el.id==='enableEditingBtn'||el.id==='resumeEditingBtn'||el.id==='releaseEditingBtn'||el.closest('.edit-control-bar'))return;if(el.matches('.nav-btn,[data-view],.admin-tab,[data-admin],[data-worktab]'))return;const text=(el.textContent||'').trim().toLowerCase();const allowed=['administration','tool countdown','tools','morning status','weekday priorities','weekend priorities','shipping schedule','archive','shared data','lead workspace','tasks','reference','screenshot mode'];if(el.tagName==='BUTTON'&&allowed.includes(text))return;e.preventDefault();e.stopImmediatePropagation();alert('Read Only mode is active. Click Enable Editing in the header before making changes.');},true);

document.addEventListener('change',e=>{
  if(e.target.matches('.lifecycle-select')){
    e.target.classList.remove('waiting','infi','shipped','archive');
    e.target.classList.add(lifecycleClass(e.target.value));
  }
});


/* =========================================================
   v1.0.1 CONSOLIDATION BUILD
   Design lock + rapid operations workflow + action center
   ========================================================= */
const V0300_PAGE_META={
 countdown:['TOOL COUNTDOWN','countdown'],shipping:['SHIPPING SCHEDULE','shipping'],daily:['WEEKDAY PRIORITIES','daily'],meeting:['MORNING STATUS','meeting'],
 leads:['LEADS EXTRA STATUS','leads'],weekend:['WEEKEND PRIORITIES','weekend'],workspace:['LEAD WORKSPACE','workspace'],systems:['TOOLS','systems'],archive:['ARCHIVE','archive'],
 references:['REFERENCE FILES','references'],actions:['ACTION CENTER','actions'],wallboard:['WALLBOARD','wallboard'],shared:['SHARED DATA','shared'],admin:['ADMINISTRATION','admin']
};
const DEFAULT_SUPPLEMENTALS=[
 {id:'supp_lamp_swap',label:'Lamp Swap',repeatable:true,defaultSteps:10,active:true},
 {id:'supp_daily_monitor',label:'Daily Monitor',repeatable:true,defaultSteps:8,active:true},
 {id:'supp_other',label:'Other Supplemental Checklist',repeatable:true,defaultSteps:1,active:true}
];
let referenceSession={micro:null,shipping:null,b7:null};
function ensureV0300State(){
 state.leadsExtra=Array.isArray(state.leadsExtra)?state.leadsExtra:[];
 state.manualReminders=Array.isArray(state.manualReminders)?state.manualReminders:[];
 state.supplementalConfig=Array.isArray(state.supplementalConfig)&&state.supplementalConfig.length?state.supplementalConfig:clone(DEFAULT_SUPPLEMENTALS);
 state.referenceFiles=state.referenceFiles||{micro:{name:'',loadedAt:''},shipping:{name:'',loadedAt:''},b7:{name:'',loadedAt:''}};
 tools.forEach(t=>{
   if(t.lampState==null)t.lampState='ON';
   if(typeof t.lamp==='string'){
     let s=t.lamp; if(/off/i.test(s))t.lampState='OFF'; let m=s.match(/\d+(?:\.\d+)?/);t.lamp=m?Number(m[0]):0;
   }
   t.supplementals=Array.isArray(t.supplementals)?t.supplementals:[];
   t.supplementalHistory=Array.isArray(t.supplementalHistory)?t.supplementalHistory:[];
 });
 state.appVersion='1.0.3';
}
ensureV0300State();
function displayLamp(t){let n=(t.lamp===0||t.lamp)?String(t.lamp):'';return t.lampState==='OFF'?(n?`${n} / OFF`:'OFF'):(n||'0')}
function activeSupplementals(t){return (t.supplementals||[]).filter(x=>x.status!=='Complete')}
function supplementalPct(t){let a=t.supplementals||[],required=a.filter(x=>x.status!=='N/A');if(!required.length)return 0;let total=required.reduce((s,x)=>s+(Number(x.totalSteps)||1),0),done=required.reduce((s,x)=>s+Math.min(Number(x.completedSteps)||0,Number(x.totalSteps)||1),0);return pct(done,total)}
function supplementalSummary(t){let a=activeSupplementals(t);if(!a.length)return 'None active';return a.map(x=>`${x.label}${x.status==='In Progress'?' · IN PROGRESS':''}`).join(' + ')}
function setHeaderContext(title,sub=''){
 let titleEl=document.getElementById('headerPageTitle'),subEl=document.getElementById('headerPageSub');
 if(titleEl)titleEl.textContent=title||''; if(subEl){subEl.textContent=sub||'';subEl.style.display=sub?'block':'none'}
 document.title=`B7 FI Command Center · ${title||'Operations'}`;
}
function setThemeFor(v){let m=V0300_PAGE_META[v]||[String(v||'').toUpperCase(),v];document.body.dataset.theme=m[1]||v;setHeaderContext(m[0]||'')}
const _oldSetView=setView;
setView=function(v){window.scrollTo({top:0,left:0,behavior:'auto'});view=v;setThemeFor(v);document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===v));render();window.scrollTo(0,0)};
document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>setView(b.dataset.view));

function actionTarget(a){if(a.toolId)openToolAction(a.toolId,a.tab||'basic');else if(a.view)setView(a.view)}
function openToolAction(id,tab='basic'){toolAdmin(id);setTimeout(()=>{let b=document.querySelector(`[data-tab="${tab}"]`);if(b)b.click()},40)}
function v3Alerts(){
 let out=[];let today=new Date();today.setHours(0,0,0,0);
 (state.manualReminders||[]).filter(x=>!x.complete).forEach(x=>out.push({severity:x.severity||'yellow',priority:x.severity==='red'?10:x.severity==='orange'?7:4,text:`${x.toolId?'TOOL '+x.toolId+' — ':''}${x.text}`,toolId:x.toolId||'',tab:x.tab||'basic',id:'manual:'+x.id}));
 tools.filter(t=>t.quarterStatus==='In FI'||t.quarterStatus==='Waiting for FI').forEach(t=>{
   (t.ncs||[]).filter(n=>!['closed','waived'].includes(String(n.state).toLowerCase())).forEach(n=>{if(n.blocking)out.push({severity:'red',priority:12,text:`TOOL ${t.id} — BLOCKING NC ${n.id||''}: ${n.desc||n.state}`,toolId:t.id,tab:'issues'});else if(isEscalatedNc(n))out.push({severity:'red',priority:11,text:`TOOL ${t.id} — Escalated ${n.id||'NC'}${n.days?` · Day ${n.days}`:''}`,toolId:t.id,tab:'issues'})});
   activeSupplementals(t).forEach(s=>out.push({severity:'orange',priority:8,text:`TOOL ${t.id} — ${s.label.toUpperCase()} ${s.status||'IN PROGRESS'}${s.totalSteps?` · ${s.completedSteps||0}/${s.totalSteps}`:''}`,toolId:t.id,tab:'fi'}));
   if(t.quarterStatus==='In FI'&&(!t.driver||t.driver==='Unassigned'))out.push({severity:'yellow',priority:5,text:`TOOL ${t.id} — Driver / assignment is unassigned`,toolId:t.id,tab:'basic'});
   if(t.quarterStatus==='In FI'&&t.ship){let d=new Date(t.ship+'T00:00:00'),days=Math.round((d-today)/86400000);if(days>=0&&days<=7&&(!t.schedule||t.schedule.publish==='N/A'))out.push({severity:days<=2?'orange':'yellow',priority:days<=2?8:6,text:`TOOL ${t.id} — Ships ${days===0?'TODAY':days===1?'TOMORROW':`in ${days} days`} · Shipping schedule not created`,toolId:t.id,tab:'shipping'})}
   let first=t.quarterStatus==='In FI'?(activeLeadTasks()||[]).find(task=>!['Complete','N/A'].includes(t.leadAdmin?.[task.id]||'Not Started')):null;if(first)out.push({severity:'yellow',priority:3,text:`TOOL ${t.id} — Lead/Admin next: ${first.label}`,toolId:t.id,tab:'lead'});
 });
 return out.sort((a,b)=>b.priority-a.priority);
}
function severityIcon(s){return s==='red'?'●':s==='orange'?'▲':s==='yellow'?'◆':'●'}
let actionTickerIndex=0;
function renderTopActionBar(){let bar=document.getElementById('topActionBar');if(!bar)return;let a=v3Alerts();if(!a.length){bar.innerHTML=`<div class="top-action-clear">✓ ACTION CENTER · No generated critical/attention items</div>`;return}actionTickerIndex%=a.length;let x=a[actionTickerIndex];bar.innerHTML=`<button id="topActionCurrent" class="top-action-current ${x.severity}"><span class="top-action-label">${severityIcon(x.severity)} B7 FI ACTIONS</span><strong>${esc(x.text)}</strong><span class="top-action-count">${actionTickerIndex+1} / ${a.length}</span><span class="top-action-open">OPEN →</span></button><button id="topActionAll" class="top-action-all">ALL ${a.length}</button>`;$('#topActionCurrent').onclick=()=>actionTarget(x);$('#topActionAll').onclick=()=>setView('actions')}
/* v1.0.1: legacy Lead Alerts interval disabled; unified alert engine owns rotation. */
const _oldUpdateOperationsBar=updateOperationsBar;
updateOperationsBar=function(){
 let alerts=v3Alerts();let bar=document.getElementById('operationsBar');if(!bar)return;
 let sync=document.getElementById('opsSync');if(sync)sync.textContent=(state.shared?.mode==='sharepoint-direct-test'?'SharePoint reachable':'Local Production Mode · SharePoint live sync pending');
 let tx=document.getElementById('opsTickerText');if(tx){let x=alerts[actionTickerIndex%Math.max(1,alerts.length)];tx.textContent=x?x.text:'No outstanding generated actions'}
 let tc=document.getElementById('opsTaskCount');if(tc)tc.textContent=`${alerts.length} open action${alerts.length===1?'':'s'}`;
 let pr=document.getElementById('opsPresence');if(pr){let t=selectedId&&tools.find(x=>x.id===selectedId);pr.textContent=t?`CURRENT TOOL: ${t.id} · ${t.codename} · ${t.model}`:'Context: fleet overview'}
 renderTopActionBar();
};

function actionCenter(){setHeaderContext('ACTION CENTER','What needs attention across B7 FI');let a=v3Alerts();let groups=[['red','CRITICAL'],['orange','ATTENTION'],['yellow','REMINDERS / NEXT ACTIONS'],['blue','INFORMATION']];app.innerHTML=`<div class="action-summary-grid">${groups.slice(0,3).map(([s,l])=>`<div class="action-summary ${s}"><span>${l}</span><strong>${a.filter(x=>x.severity===s).length}</strong></div>`).join('')}<div class="action-summary total"><span>TOTAL OPEN</span><strong>${a.length}</strong></div></div><div class="action-center-grid">${groups.map(([s,l])=>{let aa=a.filter(x=>x.severity===s);return `<section class="panel action-group"><h3>${l}</h3>${aa.map((x,i)=>`<button class="action-item ${s}" data-action-index="${a.indexOf(x)}"><span>${severityIcon(s)}</span><b>${esc(x.text)}</b><span>OPEN →</span></button>`).join('')||'<div class="notice">No items in this group.</div>'}</section>`}).join('')}</div><div class="panel"><div class="subsection-title"><h3>Manual Reminder</h3></div><div class="manual-reminder-form"><select id="mrTool"><option value="">General</option>${current().map(t=>`<option value="${esc(t.id)}">${esc(t.id)} · ${esc(t.codename)}</option>`).join('')}</select><select id="mrSeverity"><option value="yellow">Reminder</option><option value="orange">Attention</option><option value="red">Critical</option></select><input id="mrText" placeholder="Reminder / follow-up"><button id="mrAdd" class="btn primary">Add Reminder</button></div></div>`;
 document.querySelectorAll('[data-action-index]').forEach(b=>b.onclick=()=>actionTarget(a[Number(b.dataset.actionIndex)]));$('#mrAdd').onclick=()=>{let text=$('#mrText').value.trim();if(!text)return;state.manualReminders.unshift({id:'mr'+Date.now(),toolId:$('#mrTool').value,severity:$('#mrSeverity').value,text,complete:false,createdAt:new Date().toISOString()});save();actionCenter()};actions([{label:'Morning Status',fn:()=>setView('meeting')},{label:'Tools',fn:()=>setView('systems')}],false)}

function countdownV3(){setHeaderContext('TOOL COUNTDOWN',quarterLabel());let active=pageTools('countdown'),total=active.length,sh=active.filter(t=>t.quarterStatus==='Shipped').length,need=total-sh;app.innerHTML=`<div class="report-screen">${reportHeader(`${quarterLabel()} TOOL SHIPPING COUNTDOWN`)}<div class="overall-countdown"><div class="overall-box"><div class="label">Total Tools</div><span class="number">${total}</span></div><div class="overall-box need"><div class="label">Need to Ship</div><span class="number">${need}</span></div><div class="overall-box shipped"><div class="label">Shipped</div><span class="number">${sh}</span></div></div><div class="quarter-progress"><div class="progress-label"><span>Quarter Shipping Progress</span><b>${pct(sh,total)}% Shipped</b></div><div class="track"><div class="fill" style="width:${pct(sh,total)}%;background:var(--good)"></div></div></div>${typeGroups().map(([name,a])=>{let ss=a.filter(t=>t.quarterStatus==='Shipped').length,w=a.filter(t=>t.quarterStatus==='Waiting for FI').length,i=a.filter(t=>t.quarterStatus==='In FI').length;return `<section class="type-section v3-type"><div class="type-header"><div class="type-name-wrap"><h3>${esc(name)}</h3></div><div class="type-summary four-state"><div class="type-count"><small>Total</small><b>${a.length}</b></div><div class="type-count waiting"><small>Waiting FI</small><b>${w}</b></div><div class="type-count infi"><small>In FI</small><b>${i}</b></div><div class="type-count shipped"><small>Shipped</small><b>${ss}</b></div></div></div><div class="countdown-card-grid v3-countdown-grid">${a.sort((x,y)=>(x.ship||'9').localeCompare(y.ship||'9')).map(t=>`<div class="countdown-card v3-countdown-card ${qState(t)}" data-count-tool="${esc(t.id)}"><div class="cc-head"><div><div class="cc-id v3-utid">${esc(t.id)}</div><span class="model-badge">${esc(t.model)}</span><div class="cc-customer">${esc(t.customer)}</div></div>${t.quarterStatus==='Shipped'?'<span class="complete-mark"><span class="check">✓</span> SHIPPED</span>':`<span class="state-chip ${qState(t)}">${t.quarterStatus==='Waiting for FI'?'WAITING FI':'IN FI'}</span>`}</div><div class="cc-meta"><div><span>MFG Ship</span><b>${fmt(t.ship)}</b></div><div><span>Sales Order</span><b>${esc(t.so)}</b></div></div></div>`).join('')}</div></section>`}).join('')}</div>`;document.querySelectorAll('[data-count-tool]').forEach(x=>x.onclick=()=>toolStatus(x.dataset.countTool));actions([{label:'Edit Tool Countdown',primary:true,fn:()=>admin('countdown')},{label:'Administration',fn:()=>setView('admin')}])}
countdown=countdownV3;

function systemsV3(){setHeaderContext('TOOLS','Operational fleet overview');let list=pageTools('systems'),groups={};list.forEach(t=>(groups[t.codename]??=[]).push(t));app.innerHTML=`<div class="tools-filter-bar"><input id="toolSearch" placeholder="Search UTID, model, customer, assignment…"><select id="toolStatusFilter"><option value="">All Statuses</option><option>Waiting for FI</option><option>In FI</option><option>Shipped</option></select></div><div id="toolsGroups">${Object.entries(groups).sort((a,b)=>a[0].localeCompare(b[0])).map(([name,arr])=>`<section class="tool-section v3-tool-section"><div class="tool-section-head"><h2 class="tool-section-title">${esc(name)}</h2><span class="tool-section-count">${arr.length} tool${arr.length===1?'':'s'}</span></div><div class="system-grid v3-system-grid">${arr.map(t=>{let rc=routeCounts(t),lc=leadCounts(t),sp=supplementalPct(t);return `<div class="system-card v3-system-card ${t.quarterStatus==='Shipped'?'shipped-card':t.quarterStatus==='Waiting for FI'?'waiting-card':'infi-card'}" data-tool="${esc(t.id)}" data-search="${esc([t.id,t.model,t.customer,t.driver,t.codename,t.quarterStatus].join(' ').toLowerCase())}" data-status="${esc(t.quarterStatus)}"><div class="system-head"><div><div class="system-id v3-system-id">${esc(t.id)}</div><div><span class="model-badge">${esc(t.model)}</span> <span class="gray">${esc(t.customer)}</span></div></div>${t.quarterStatus==='Shipped'?'<span class="complete-mark"><span class="check">✓</span> SHIPPED</span>':`<span class="state-chip ${qState(t)}">${t.quarterStatus==='Waiting for FI'?'WAITING FI':'IN FI'}</span>`}</div><div class="progress-row"><div class="progress-label"><span>TOOL PROGRESS</span><b>${routeProgress(t)}%</b></div><div class="track"><div class="fill" style="width:${routeProgress(t)}%"></div></div><div class="card-progress-meta"><span>${rc.done} complete</span><span>${rc.current} in progress</span></div></div><div class="progress-row supplemental-progress"><div class="progress-label"><span>SUPPLEMENTAL</span><b>${sp}%</b></div><div class="track"><div class="fill supplemental" style="width:${sp}%"></div></div><div class="card-progress-meta"><span>${esc(supplementalSummary(t))}</span><span>${activeSupplementals(t).length} active</span></div></div><div class="progress-row"><div class="progress-label"><span>LEAD / ADMIN</span><b>${adminProgress(t)}%</b></div><div class="track"><div class="fill admin" style="width:${adminProgress(t)}%"></div></div><div class="card-progress-meta"><span>${lc.done} complete</span><span>${lc.total} applicable</span></div></div><div class="card-meta"><div><span>Assignment</span><strong>${esc(t.driver)}</strong></div><div><span>Location</span><strong>${esc(t.room)}${t.bay?' / '+esc(t.bay):''}</strong></div><div><span>Primary Checklist</span><strong>${activeChecklists(t).map(x=>x[0]).join(', ')||t.checklist||'—'}</strong></div><div><span>MFG Ship</span><strong>${fmt(t.ship)}</strong></div></div></div>`}).join('')}</div></section>`).join('')}</div>`;
 function filter(){let q=$('#toolSearch').value.toLowerCase(),s=$('#toolStatusFilter').value;document.querySelectorAll('.v3-system-card').forEach(c=>c.style.display=(!q||c.dataset.search.includes(q))&&(!s||c.dataset.status===s)?'':'none')};$('#toolSearch').oninput=filter;$('#toolStatusFilter').onchange=filter;document.querySelectorAll('[data-tool]').forEach(x=>x.onclick=()=>toolStatus(x.dataset.tool));actions([{label:'Add Tool',primary:true,fn:()=>toolAdmin()},{label:'Administration',fn:()=>setView('admin')}],false)}
systems=systemsV3;

function shippingPlanBlock(t){let complete=t.schedule?.publish==='Published'&&t.schedule?.status==='Completed'||t.quarterStatus==='Shipped';return `<div class="shipping-plan ${complete?'complete':''}"><div class="shipping-plan-head"><h3>SHIPPING PLAN FOR ${esc(t.codename.toUpperCase())} ${esc(t.id)}</h3>${complete?'<span class="complete-mark"><span class="check">✓</span> COMPLETE</span>':`<span class="badge info">${esc(t.schedule?.publish||'N/A')} · ${esc(t.schedule?.status||'N/A')}</span>`}</div><div style="overflow:auto"><table class="shipping-table"><thead><tr><th>System</th><th>Subsystems - Handoff</th><th>Cable Kit - Handoff</th><th>Accessories - Handoff</th><th>MST Install</th><th>IS - Handoff</th><th>Notes</th></tr></thead><tbody><tr><td>${esc(t.id)}</td><td>${t.schedule?.subsystems?fmtShort(t.schedule.subsystems):'N/A'}</td><td>${t.schedule?.cables?fmtShort(t.schedule.cables):'N/A'}</td><td>${t.schedule?.accessories?fmtShort(t.schedule.accessories):'N/A'}</td><td>${mstApplicable(t)?(t.schedule?.mst&&t.schedule.mst!=='N/A'?fmtShort(t.schedule.mst):'N/A'):'N/A'}</td><td>${t.schedule?.is?fmtShort(t.schedule.is):'N/A'}</td><td>${esc(t.schedule?.notes||'')}</td></tr></tbody></table></div></div>`}
function supplementalPanel(t){let all=t.supplementals||[],hist=t.supplementalHistory||[];return `<section class="supplemental-panel"><div class="supplemental-head"><div><h3>Supplemental / Special Checklists</h3><p>Temporary checklists run alongside the primary FI route. Completing one returns the tool to its primary checklist.</p></div><div class="supplemental-start"><select id="suppType">${state.supplementalConfig.filter(x=>x.active!==false).map(x=>`<option value="${esc(x.id)}">${esc(x.label)}</option>`).join('')}</select><button id="suppStart" class="btn">+ Start Checklist</button></div></div>${all.map((s,i)=>`<div class="supp-row ${String(s.status).toLowerCase().replace(/\s/g,'-')}" data-supp="${i}"><div><b>${esc(s.label)}</b><small>Return to: ${esc(s.returnChecklist||t.checklist||'—')}</small></div><div class="supp-progress"><div class="track"><div class="fill supplemental" style="width:${pct(s.completedSteps||0,s.totalSteps||1)}%"></div></div><span>${s.completedSteps||0}/${s.totalSteps||1}</span></div><select class="supp-state"><option ${s.status==='In Progress'?'selected':''}>In Progress</option><option ${s.status==='Waiting'?'selected':''}>Waiting</option><option ${s.status==='Complete'?'selected':''}>Complete</option></select><input class="supp-done" type="number" min="0" max="${s.totalSteps||1}" value="${s.completedSteps||0}"><button class="btn small supp-save">Save</button></div>`).join('')||'<div class="notice">No supplemental checklist has been started for this tool.</div>'}${hist.length?`<details class="supp-history"><summary>Completed supplemental history (${hist.length})</summary>${hist.slice().reverse().map(h=>`<div>${esc(h.label)} · completed ${h.completedAt?new Date(h.completedAt).toLocaleString():''} · returned to ${esc(h.returnChecklist||'—')}</div>`).join('')}</details>`:''}</section>`}
function toolStatusV3(id){let t=tools.find(x=>x.id===id);if(!t)return;selectedId=id;document.body.dataset.theme='systems';setHeaderContext(`TOOL ${t.id}`,`${t.codename} · ${t.model} · ${t.customer}`);let rc=routeCounts(t),lc=leadCounts(t);app.innerHTML=`<div class="report-screen">${reportHeader(`${t.id} TOOL STATUS`,`${t.model} · ${t.codename} · ${t.customer}`)}<div class="metric-grid"><div class="metric"><span>MFG Ship Date</span><strong style="font-size:20px">${fmt(t.ship)}</strong></div><div class="metric"><span>Primary Checklist</span><strong style="font-size:18px">${esc(t.checklist)}</strong><small>${esc(checkName(t))}</small></div><div class="metric"><span>Tool Progress</span><strong>${routeProgress(t)}%</strong><small>${rc.done}/${rc.total} completed</small></div><div class="metric"><span>Supplemental</span><strong>${supplementalPct(t)}%</strong><small>${esc(supplementalSummary(t))}</small></div><div class="metric"><span>Lead / Admin</span><strong>${adminProgress(t)}%</strong><small>${lc.done}/${lc.total} applicable</small></div><div class="metric"><span>Tool Status</span><strong style="font-size:18px" class="${qState(t)==='shipped'?'green-text':qState(t)==='waiting'?'red-text':'yellow-text'}">${esc(t.quarterStatus)}</strong></div></div><div class="tool-status-grid v3-tool-status-grid"><div class="tool-status-block"><h3>Tool Information</h3>${kv('Product Family',t.family)}${kv('Code Name',t.codename)}${kv('Model',t.model)}${kv('UTID',t.id)}${kv('Sales Order',t.so)}${kv('Customer',t.customer)}${kv('Cleanroom',t.room)}${kv('Bay',t.bay)}${kv('Tool Assignment',t.driver)}${kv('SW Version',t.sw)}${kv('FI Process',t.process)}${kv('Lamp Hours',displayLamp(t))}</div><div class="tool-status-block fi-status-large"><h3>FI Status / Issues</h3>${kv('Current Checklist',`${t.checklist} — ${checkName(t)}`)}${kv('Latest Status',t.activity)}${kv('Active Supplemental',supplementalSummary(t))}${kv('POA',t.poa)}${kv('Escalation Meeting',t.escalationMeeting)}${kv('Waivers',t.waivers)}${kv('Open NCs',t.ncs.map(n=>n.id+' '+n.state).join(', ')||'None')}<div class="tool-notes-block"><span>Notes</span><p>${esc(t.notes||'No notes entered.')}</p></div></div></div>${shippingPlanBlock(t)}${supplementalPanel(t)}<div class="progress-board"><div class="progress-panel"><h3>FI Checklist Route · ${rc.done}/${rc.total} Complete</h3>${routeWorkflow(t)}</div><div class="progress-panel"><h3>Lead / Admin Workflow · ${lc.done}/${lc.total} Complete</h3>${leadWorkflow(t,false)}</div></div></div>`;
 if($('#suppStart'))$('#suppStart').onclick=()=>{let cfg=state.supplementalConfig.find(x=>x.id===$('#suppType').value);if(!cfg)return;t.supplementals.push({id:'si'+Date.now(),typeId:cfg.id,label:cfg.label,status:'In Progress',completedSteps:0,totalSteps:cfg.defaultSteps||1,returnChecklist:t.checklist,startedAt:new Date().toISOString()});if(cfg.label==='Lamp Swap')t.lampState='OFF';save();toolStatusV3(t.id)};
 document.querySelectorAll('[data-supp]').forEach(row=>{row.querySelector('.supp-save').onclick=()=>{let i=Number(row.dataset.supp),s=t.supplementals[i];s.status=row.querySelector('.supp-state').value;s.completedSteps=Math.max(0,Number(row.querySelector('.supp-done').value)||0);if(s.status==='Complete'){s.completedSteps=s.totalSteps||1;s.completedAt=new Date().toISOString();t.supplementalHistory.push(clone(s));t.supplementals.splice(i,1)}save();toolStatusV3(t.id)}});
 actions([{label:'Edit This Tool',primary:true,fn:()=>toolAdmin(t.id)},{label:'Back to Tools',fn:()=>setView('systems')}])}
toolStatus=toolStatusV3;

const _toolAdminV21=toolAdmin;
toolAdmin=function(id){_toolAdminV21(id);let t=id?tools.find(x=>x.id===id):null;selectedId=t?.id||null;setHeaderContext(t?`EDIT ${t.id}`:'ADD TOOL',t?`${t.codename} · ${t.model} · ${t.customer}`:'New tool record');let banner=document.createElement('div');banner.className='tool-edit-identity';banner.innerHTML=t?`<div><span>EDITING TOOL</span><strong>${esc(t.id)}</strong></div><div><b>${esc(t.codename)} · ${esc(t.model)}</b><small>${esc(t.customer)} · ${esc(t.room)} · ${esc(t.driver)}</small></div><div><b>${esc(t.quarterStatus)}</b><small>Ship ${fmt(t.ship)}</small></div>`:`<div><span>NEW TOOL</span><strong>Unsaved</strong></div><div><b>Create a new B7 FI tool record</b></div>`;app.prepend(banner);
 // upgrade lamp input to text + ON/OFF selector without breaking old collector
 let lamp=$('#ta-lamp');if(lamp){lamp.type='text';lamp.value=String(t?.lamp??'');let wrap=lamp.closest('.form-group');if(wrap&&!wrap.querySelector('.lamp-state-select')){let sel=document.createElement('select');sel.className='lamp-state-select';sel.innerHTML=`<option value="ON" ${t?.lampState!=='OFF'?'selected':''}>ON</option><option value="OFF" ${t?.lampState==='OFF'?'selected':''}>OFF</option>`;wrap.appendChild(sel)} }
};

const _saveV21=save;
save=function(){
  let lampSel=document.querySelector('.lamp-state-select');
  if(lampSel&&selectedId){let t=tools.find(x=>x.id===selectedId);if(t)t.lampState=lampSel.value}
  _saveV21();
  setTimeout(()=>{let tick=document.querySelector('.ops-ticker');if(tick){tick.onclick=()=>{let a=v3Alerts(),x=a[actionTickerIndex%Math.max(1,a.length)];if(x)actionTarget(x)}}},0);
};

function leadsExtraPage(edit=false){setHeaderContext('LEADS EXTRA STATUS',edit?'Editing prioritized lead handoff':'Lead / manager handoff');let rows=state.leadsExtra||[];if(!edit){app.innerHTML=`<div class="report-screen leads-extra-report">${reportHeader(`B7 FI LEADS EXTRA STATUS — ${new Date().toLocaleDateString()}`)}<div class="table-wrap"><table class="report-table leads-table"><thead><tr><th>Priority</th><th>UTID</th><th>Cleanroom</th><th>Notes</th></tr></thead><tbody>${rows.slice().sort((a,b)=>(a.priority||999)-(b.priority||999)).map(r=>`<tr><td><span class="priority-num">${r.priority||'—'}</span></td><td><b>${esc(r.utid||'')}</b></td><td>${esc(r.cleanroom||'')}</td><td class="lead-notes">${esc(r.notes||'').replace(/\n/g,'<br>')}</td></tr>`).join('')||'<tr><td colspan="4">No Leads Extra Status lines yet.</td></tr>'}</tbody></table></div></div>`;actions([{label:'Edit Leads Extra Status',primary:true,fn:()=>leadsExtraPage(true)}])}else{let active=current().filter(t=>t.quarterStatus!=='Shipped');app.innerHTML=`<div class="panel"><div class="subsection-title"><h3>Edit Leads Extra Status</h3><button id="leAdd" class="btn">+ Add Line</button></div><p class="helper">Priority, UTID and Cleanroom use controlled selections. Notes is the free-text update field. Removing a line never deletes the Tool.</p><div id="leRows" class="leads-editor">${rows.map((r,i)=>leadEditRow(r,i,active)).join('')}</div><div class="actions"><button id="leSave" class="btn primary">Save All Changes</button><button id="leCancel" class="btn">Cancel</button></div></div>`;wireLeadsEditor(active)} }
function leadEditRow(r,i,active){let used=(state.leadsExtra||[]).map(x=>Number(x.priority)).filter(Boolean);let opts=['<option value="">None</option>',...Array.from({length:30},(_,j)=>j+1).filter(n=>n===Number(r.priority)||!used.includes(n)).map(n=>`<option value="${n}" ${n===Number(r.priority)?'selected':''}>${n}</option>`)];return `<div class="lead-edit-row" data-le="${i}"><select class="le-priority">${opts.join('')}</select><select class="le-utid"><option value="">Select Tool</option>${active.map(t=>`<option value="${esc(t.id)}" ${t.id===r.utid?'selected':''}>${esc(t.id)} · ${esc(t.codename)} ${esc(t.model)}</option>`).join('')}</select><select class="le-room">${['CR1','CR2','CR3'].map(x=>`<option ${x===r.cleanroom?'selected':''}>${x}</option>`).join('')}</select><textarea class="le-notes" placeholder="Lead / manager update">${esc(r.notes||'')}</textarea><div class="lead-row-actions"><button class="btn small le-up">↑</button><button class="btn small le-down">↓</button><button class="btn small danger le-delete">Delete</button></div></div>`}
function collectLeadsEditor(){return [...document.querySelectorAll('[data-le]')].map(row=>({priority:row.querySelector('.le-priority').value?Number(row.querySelector('.le-priority').value):null,utid:row.querySelector('.le-utid').value,cleanroom:row.querySelector('.le-room').value,notes:row.querySelector('.le-notes').value})).filter(x=>x.utid||x.notes)}
function wireLeadsEditor(active){$('#leAdd').onclick=()=>{state.leadsExtra=collectLeadsEditor();state.leadsExtra.push({priority:null,utid:'',cleanroom:'CR1',notes:''});leadsExtraPage(true)};document.querySelectorAll('[data-le]').forEach((row,i)=>{row.querySelector('.le-utid').onchange=e=>{let t=tools.find(x=>x.id===e.target.value);if(t)row.querySelector('.le-room').value=t.room};row.querySelector('.le-delete').onclick=()=>{state.leadsExtra=collectLeadsEditor();state.leadsExtra.splice(i,1);leadsExtraPage(true)};row.querySelector('.le-up').onclick=()=>{state.leadsExtra=collectLeadsEditor();if(i>0)[state.leadsExtra[i-1],state.leadsExtra[i]]=[state.leadsExtra[i],state.leadsExtra[i-1]];leadsExtraPage(true)};row.querySelector('.le-down').onclick=()=>{state.leadsExtra=collectLeadsEditor();if(i<state.leadsExtra.length-1)[state.leadsExtra[i+1],state.leadsExtra[i]]=[state.leadsExtra[i],state.leadsExtra[i+1]];leadsExtraPage(true)}});$('#leSave').onclick=()=>{let a=collectLeadsEditor(),nums=a.map(x=>x.priority).filter(Boolean);if(new Set(nums).size!==nums.length)return alert('Each Leads Extra Status priority can only be used once.');state.leadsExtra=a;save();leadsExtraPage(false)};$('#leCancel').onclick=()=>leadsExtraPage(false)}

function referenceCard(type,label,description,editable=false){let meta=state.referenceFiles[type]||{},sess=referenceSession[type];return `<section class="reference-file-card"><div class="reference-file-head"><div><h3>${label}</h3><p>${description}</p></div><span class="reference-mode">${editable?'OPEN / EDIT IN EXCEL':'REFERENCE · READ ONLY'}</span></div><div class="reference-file-meta"><b>${esc(sess?.file?.name||meta.name||'No file loaded')}</b><span>${meta.loadedAt?`Last selected ${new Date(meta.loadedAt).toLocaleString()}`:'Select the current workbook'}</span></div><div class="reference-file-actions"><label class="btn primary file-btn">${meta.name?'Replace':'Load'} ${label}<input class="ref-file-input" data-ref-type="${type}" type="file" accept=".xlsx,.xls,.xlsm,.csv,.tsv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv,text/tab-separated-values" hidden></label><button class="btn ref-open" data-ref-open="${type}" ${sess?'':'disabled'}>Open Original</button><button class="btn ref-refresh" data-ref-refresh="${type}" ${sess?'':'disabled'}>Refresh Preview</button></div><div class="reference-preview" id="preview-${type}"><div class="reference-preview-empty">${sess?'Rendering workbook…':'Select a workbook and it will automatically display here.'}</div></div></section>`}
let sheetJsLoader=null;
function ensureSheetJs(){if(window.XLSX)return Promise.resolve(window.XLSX);if(sheetJsLoader)return sheetJsLoader;sheetJsLoader=new Promise((resolve,reject)=>{let sc=document.createElement('script');sc.src='https://cdn.sheetjs.com/xlsx-1.0.1/package/dist/xlsx.full.min.js';sc.onload=()=>window.XLSX?resolve(window.XLSX):reject(new Error('Spreadsheet reader did not initialize.'));sc.onerror=()=>reject(new Error('Could not load the spreadsheet reader. Your network may block cdn.sheetjs.com.'));document.head.appendChild(sc)});return sheetJsLoader}
async function readReferenceWorkbook(file){let ext=(file.name.split('.').pop()||'').toLowerCase();if(ext==='csv'||ext==='tsv'){let text=await file.text();let sep=ext==='tsv'?'\t':',';let rows=text.split(/\r?\n/).map(line=>{let out=[],cur='',q=false;for(let i=0;i<line.length;i++){let ch=line[i];if(ch==='"'){if(q&&line[i+1]==='"'){cur+='"';i++}else q=!q}else if(ch===sep&&!q){out.push(cur);cur=''}else cur+=ch}out.push(cur);return out});return {kind:'rows',names:[file.name],sheets:{[file.name]:rows}}}let XLSX=await ensureSheetJs();let data=await file.arrayBuffer();let wb=XLSX.read(data,{type:'array',cellDates:true,cellStyles:true});return {kind:'xlsx',wb,names:wb.SheetNames}}
function rowsToTable(rows){let max=Math.max(1,...rows.map(r=>r.length));return `<table class="sheet-preview-table"><tbody>${rows.map((r,ri)=>`<tr data-sheet-row="${ri}">${Array.from({length:max},(_,ci)=>`<td>${esc(r[ci]??'')}</td>`).join('')}</tr>`).join('')}</tbody></table>`}
function xlColor(v){if(!v)return'';if(typeof v==='string')return v.startsWith('#')?v:'#'+v.replace(/^FF/i,'');let rgb=v.rgb||v.fgColor?.rgb||v.bgColor?.rgb;if(rgb){rgb=String(rgb).replace(/^FF/i,'');return '#'+rgb.slice(-6)}return''}
function xlBorder(side){if(!side||!side.style)return'';let c=xlColor(side.color)||'#666';let w=/thick|medium/i.test(side.style)?'2px':'1px';let st=/dash|dot/i.test(side.style)?'dashed':'solid';return `${w} ${st} ${c}`}
function cellStyleAttr(cell){let s=cell&&cell.s;if(!s||typeof s!=='object')return'';let out=[];let font=s.font||{},fill=s.fill||{},align=s.alignment||{},border=s.border||{};let fg=xlColor(fill.fgColor||fill);if(fg)out.push(`background-color:${fg}`);let fc=xlColor(font.color);if(fc)out.push(`color:${fc}`);if(font.bold)out.push('font-weight:700');if(font.italic)out.push('font-style:italic');if(font.sz)out.push(`font-size:${Math.max(8,Math.min(28,font.sz))}px`);if(font.name)out.push(`font-family:${String(font.name).replace(/[;:{}]/g,'')},Arial,sans-serif`);if(font.underline)out.push('text-decoration:underline');if(align.horizontal)out.push(`text-align:${align.horizontal==='centerContinuous'?'center':align.horizontal}`);if(align.vertical)out.push(`vertical-align:${align.vertical}`);if(align.wrapText)out.push('white-space:pre-wrap');let bt=xlBorder(border.top),br=xlBorder(border.right),bb=xlBorder(border.bottom),bl=xlBorder(border.left);if(bt)out.push(`border-top:${bt}`);if(br)out.push(`border-right:${br}`);if(bb)out.push(`border-bottom:${bb}`);if(bl)out.push(`border-left:${bl}`);return out.join(';')}
function renderStyledSheet(sh){let XLSX=window.XLSX,ref=sh['!ref'];if(!ref)return '<table class="sheet-preview-table"><tbody></tbody></table>';let range=XLSX.utils.decode_range(ref),merges=sh['!merges']||[],skip=new Set(),mergeMap=new Map();merges.forEach(m=>{mergeMap.set(`${m.s.r}:${m.s.c}`,m);for(let r=m.s.r;r<=m.e.r;r++)for(let c=m.s.c;c<=m.e.c;c++)if(r!==m.s.r||c!==m.s.c)skip.add(`${r}:${c}`)});let cols=sh['!cols']||[],rows=sh['!rows']||[];let colgroup='<colgroup>'+Array.from({length:range.e.c-range.s.c+1},(_,i)=>{let c=cols[range.s.c+i]||{},w=c.wpx||(c.width?c.width*7:c.wch?c.wch*7.2:90);return `<col style="width:${Math.max(28,Math.min(520,w))}px">`}).join('')+'</colgroup>';let body='';for(let r=range.s.r;r<=range.e.r;r++){let rh=rows[r]||{},h=rh.hpx||(rh.hpt?rh.hpt*96/72:0);body+=`<tr${h?` style="height:${Math.max(16,h)}px"`:''}>`;for(let c=range.s.c;c<=range.e.c;c++){let key=`${r}:${c}`;if(skip.has(key))continue;let addr=XLSX.utils.encode_cell({r,c}),cell=sh[addr],m=mergeMap.get(key),txt='';if(cell){try{txt=cell.w!=null?cell.w:XLSX.utils.format_cell(cell)}catch(_){txt=cell.v??''}}let attrs='';if(m){attrs+=` rowspan="${m.e.r-m.s.r+1}" colspan="${m.e.c-m.s.c+1}"`}let style=cellStyleAttr(cell);body+=`<td${attrs}${style?` style="${style}"`:''}>${esc(txt??'')}</td>`}body+='</tr>'}return `<table class="sheet-preview-table">${colgroup}<tbody>${body}</tbody></table>`}
function renderWorkbookSheet(model,name,box){let html='';if(model.kind==='xlsx'){let sh=model.wb.Sheets[name];html=renderStyledSheet(sh)}else html=rowsToTable(model.sheets[name]||[]);box.querySelector('.sheet-preview-stage').innerHTML=html;let table=box.querySelector('table');if(table)table.classList.add('sheet-preview-table');box.querySelectorAll('.sheet-tab').forEach(x=>x.classList.toggle('active',x.dataset.sheet===name));let f=box.querySelector('.sheet-filter');if(f)f.value=''}
function applySheetFilter(box,q){q=(q||'').trim().toLowerCase();let rows=[...box.querySelectorAll('.sheet-preview-table tr')];rows.forEach((r,i)=>{if(i===0){r.style.display='';return}r.style.display=!q||r.textContent.toLowerCase().includes(q)?'':'none'})}
async function previewReference(type){let s=referenceSession[type],box=$(`#preview-${type}`);if(!s||!box)return;box.innerHTML='<div class="reference-preview-loading">Reading workbook…</div>';try{let model=await readReferenceWorkbook(s.file);if(!model.names.length)throw new Error('No worksheets were found in this file.');box.innerHTML=`<div class="sheet-preview-toolbar"><div class="sheet-tabs">${model.names.map((n,i)=>`<button class="sheet-tab ${i===0?'active':''}" data-sheet="${esc(n)}">${esc(n)}</button>`).join('')}</div><input class="sheet-filter" type="search" placeholder="Filter visible rows…"><span class="sheet-preview-note">Browser preview · read only</span></div><div class="sheet-preview-stage"></div>`;renderWorkbookSheet(model,model.names[0],box);box.querySelectorAll('.sheet-tab').forEach(t=>t.onclick=()=>renderWorkbookSheet(model,t.dataset.sheet,box));box.querySelector('.sheet-filter').oninput=e=>applySheetFilter(box,e.target.value)}catch(err){box.innerHTML=`<div class="reference-preview-error"><b>Preview could not be loaded.</b><br>${esc(err.message||String(err))}<div class="reference-preview-note">XLSX/XLS preview uses the SheetJS browser reader. CSV/TSV preview works without an external library.</div></div>`}}
function referencesPage(){setHeaderContext('REFERENCE FILES','Micro Schedule · Shipping Tracker · B7 FI Status');app.innerHTML=`<div class="reference-dashboard"><div class="reference-dashboard-head"><h2>Operations Reference Files</h2><p>Load a workbook and it will automatically display inside the Command Center. Worksheet tabs, scrolling and row filtering are available in the read-only browser view. Open Original remains available for exact Excel formatting and full Excel functionality.</p></div>${referenceCard('micro','Micro Schedule','Manager-provided schedule used to gauge tool progress and priority. Read-only reference.')}${referenceCard('shipping','Shipping Tracker','Manager-provided source for UTID, sales order, customer, ship date and planning data. Read-only reference.')}${referenceCard('b7','B7 FI Status','Legacy B7 FI operational workbook. Keep available during the Command Center transition.',true)}</div>`;document.querySelectorAll('.ref-file-input').forEach(inp=>inp.onchange=()=>{let f=inp.files?.[0];if(!f)return;let type=inp.dataset.refType;if(referenceSession[type]?.url)URL.revokeObjectURL(referenceSession[type].url);referenceSession[type]={file:f,url:URL.createObjectURL(f)};state.referenceFiles[type]={name:f.name,loadedAt:new Date().toISOString()};save();referencesPage();setTimeout(()=>previewReference(type),0)});document.querySelectorAll('[data-ref-open]').forEach(b=>b.onclick=()=>{let s=referenceSession[b.dataset.refOpen];if(!s)return alert('Reload/select this workbook in the current browser session first.');window.open(s.url,'_blank')});document.querySelectorAll('[data-ref-refresh]').forEach(b=>b.onclick=()=>previewReference(b.dataset.refRefresh));Object.keys(referenceSession).forEach(type=>{if(referenceSession[type])setTimeout(()=>previewReference(type),0)});actions([{label:'Tool Countdown',fn:()=>setView('countdown')},{label:'Shipping Schedule',fn:()=>setView('shipping')}],false)}

function priorityOptionsUnique(v,key){let used=new Set(inFiTools().map(t=>Number(t[key])).filter(Boolean));return `<option value="">None</option>`+Array.from({length:50},(_,i)=>i+1).filter(n=>n===Number(v)||!used.has(n)).map(n=>`<option value="${n}" ${n===Number(v)?'selected':''}>${n}</option>`).join('')}
const _priorityAdminV21=priorityAdmin;
priorityAdmin=function(type){let key=type==='weekend'?'weekendPriority':'dailyPriority',ass=type==='weekend'?'weekendAssignment':'weekdayAssignment',notes=type==='weekend'?'weekendNotes':'priorityNotes';let html=`<div class="panel"><div class="form-group" style="max-width:600px"><label>Report Title</label><input id="priorityTitle" value="${esc(type==='weekend'?state.weekend.title:state.weekday.title)}"></div><div class="table-wrap"><table class="report-table compact-form-table"><thead><tr><th>UTID</th><th>Priority</th><th>Model</th><th>Sales Order</th><th>Customer</th><th>Ship Date</th><th>Cleanroom</th><th>Tool Assignment</th><th>Notes</th></tr></thead><tbody>${inFiTools().map(t=>`<tr data-pr="${esc(t.id)}"><td><b>${esc(t.id)}</b></td><td><select class="pr-num">${priorityOptionsUnique(t[key],key)}</select></td><td>${esc(t.model)}</td><td>${esc(t.so)}</td><td>${esc(t.customer)}</td><td>${fmt(t.ship)}</td><td><input class="pr-room" list="rooms" value="${esc(t.room)}"></td><td><input class="pr-ass" list="people" value="${esc(t[ass]||t.driver)}"></td><td><input class="pr-note" value="${esc(t[notes]||'')}"></td></tr>`).join('')}</tbody></table></div>${datalist('rooms',['CR1','CR2','CR3',...remembered('room')])}${datalist('people',[...remembered('driver'),...remembered('weekdayAssignment'),...remembered('weekendAssignment'),...(state.weekend.volunteers||[]).map(x=>x.name)])}<div class="actions" style="margin-top:12px"><button id="savePriority" data-type="${type}" class="btn primary">Save ${type==='weekend'?'Weekend':'Weekday'} Priorities</button></div></div>`;return html}
function wirePriorityDynamic(){let sels=[...document.querySelectorAll('.pr-num')];function sync(){let vals=sels.map(x=>x.value).filter(Boolean);sels.forEach(sel=>[...sel.options].forEach(o=>{if(!o.value){o.disabled=false;return}o.disabled=o.value!==sel.value&&vals.includes(o.value)}))}sels.forEach(sel=>sel.onchange=sync);sync()}

function rapidCountdownAddBox(){return `<div class="rapid-add-panel"><div><h3>Rapid Tool Intake</h3><p>Add upcoming tools without leaving Countdown Admin. Save & Add Another keeps this intake form ready for the next system.</p></div><div class="rapid-add-grid"><select id="raQuarter">${quarterOptions(quarterLabel())}</select><select id="raCode">${codenameOptions('Panamera')}</select><select id="raModel">${modelOptions('Panamera','2935')}</select><input id="raCustomer" placeholder="Customer" value="N/A"><input id="raSO" placeholder="Sales Order" value="N/A"><input id="raUTID" placeholder="UTID"><input id="raShip" type="date"><select id="raStatus"><option value="Waiting for FI">Waiting for FI</option><option value="In FI">In FI</option></select></div><div class="actions"><button id="raSaveAnother" class="btn primary">Save & Add Another</button><button id="raSaveDone" class="btn">Save & Return to Countdown</button></div></div>`}
const _countdownAdminV21=countdownAdmin;
countdownAdmin=function(){return rapidCountdownAddBox()+_countdownAdminV21().replace('Save Countdown Changes','Save All Countdown Changes')}
function wireRapidAdd(){if(!$('#raCode'))return;$('#raCode').onchange=()=>$('#raModel').innerHTML=modelOptions($('#raCode').value,'');function add(again){let id=$('#raUTID').value.trim();if(!id)return alert('UTID is required.');if(tools.some(t=>t.id===id))return alert('That UTID already exists.');let t=defaultTool();Object.assign(t,{id,quarter:$('#raQuarter').value,codename:$('#raCode').value,model:$('#raModel').value,customer:$('#raCustomer').value||'N/A',so:$('#raSO').value||'N/A',ship:$('#raShip').value,quarterStatus:$('#raStatus').value});tools.push(normalize(t));save();if(again)admin('countdown');else setView('countdown')}$('#raSaveAnother').onclick=()=>add(true);$('#raSaveDone').onclick=()=>add(false)}

function morningAdminV3(){return `<div class="panel"><div class="subsection-title"><div><h3>Morning / Shift Quick Update</h3><p class="helper">Work straight down the latest shift-status email. Save All updates the master Tool records used everywhere else.</p></div></div><div class="table-wrap"><table class="report-table morning-v3-table"><thead><tr><th>UTID</th><th>Location</th><th>SW</th><th>Primary Checklist</th><th>Lamp Hours</th><th>Lamp State</th><th>Latest Status</th><th>Notes</th><th>NC Summary</th></tr></thead><tbody>${inFiTools().map(t=>`<tr data-m3="${esc(t.id)}"><td><b>${esc(t.id)}</b><small>${esc(t.codename)} · ${esc(t.model)}</small></td><td><select class="m3-room">${['CR1','CR2','CR3'].map(x=>`<option ${x===t.room?'selected':''}>${x}</option>`).join('')}</select><input class="m3-bay" placeholder="Bay" value="${esc(t.bay||'')}"></td><td><input class="m3-sw" value="${esc(t.sw||'')}"></td><td><select class="m3-check">${routeOptions(t)}</select></td><td><input class="m3-lamp" inputmode="numeric" value="${esc(String(t.lamp??''))}"></td><td><select class="m3-lampstate"><option value="ON" ${t.lampState!=='OFF'?'selected':''}>ON</option><option value="OFF" ${t.lampState==='OFF'?'selected':''}>OFF</option></select></td><td><textarea class="m3-status">${esc(t.activity||'')}</textarea></td><td><textarea class="m3-notes">${esc(t.notes||'')}</textarea></td><td><div class="m3-nc">${(t.ncs||[]).filter(n=>!['Closed','Waived'].includes(n.state)).map(n=>`<span class="badge ${isEscalatedNc(n)?'bad':'info'}">${esc(n.id)} ${esc(n.state)}</span>`).join(' ')||'<span class="gray">None</span>'}</div><button class="btn small" data-m3-edit="${esc(t.id)}">Open Tool</button></td></tr>`).join('')}</tbody></table></div><div class="actions"><button id="m3Save" class="btn primary">Save All Changes</button></div></div>`}
morningAdmin=morningAdminV3;

const _adminV21=admin;
admin=function(section='home'){view='admin';document.body.dataset.theme='admin';setHeaderContext('ADMINISTRATION',section==='home'?'Command Center configuration':section.toUpperCase());document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='admin'));let tabs=[['home','Admin Home'],['tools','Tool Admin'],['countdown','Countdown'],['shipping','Shipping'],['daily','Weekday'],['meeting','Morning'],['weekend','Weekend'],['config','Configuration']];app.innerHTML=`<div class="admin-tabs">${tabs.map(x=>`<button class="admin-tab ${section===x[0]?'active':''}" data-admin="${x[0]}">${x[1]}</button>`).join('')}</div><div id="adminBody"></div>`;document.querySelectorAll('[data-admin]').forEach(x=>x.onclick=()=>admin(x.dataset.admin));renderAdmin(section);if(section==='countdown')wireRapidAdd();if(section==='daily'||section==='weekend')setTimeout(wirePriorityDynamic,0);if(section==='meeting'){let btn=$('#m3Save');if(btn)btn.onclick=()=>{document.querySelectorAll('[data-m3]').forEach(r=>{let t=tools.find(x=>x.id===r.dataset.m3);if(!t)return;t.room=r.querySelector('.m3-room').value;t.bay=r.querySelector('.m3-bay').value.trim();t.sw=r.querySelector('.m3-sw').value;t.lamp=Number(String(r.querySelector('.m3-lamp').value).replace(/[^0-9.]/g,''))||0;t.lampState=r.querySelector('.m3-lampstate').value;t.activity=r.querySelector('.m3-status').value;t.notes=r.querySelector('.m3-notes').value;let ck=r.querySelector('.m3-check').value;if(ck!==t.checklist)applyMorningChecklistTransition(t,ck,'Complete')});save();setView('meeting')};document.querySelectorAll('[data-m3-edit]').forEach(b=>b.onclick=()=>toolAdmin(b.dataset.m3Edit))}actions([{label:'Add Tool',primary:true,fn:()=>toolAdmin()},{label:'Tool Countdown',fn:()=>setView('countdown')}],false)}

const _renderAdminV21=renderAdmin;
renderAdmin=function(s){_renderAdminV21(s);if(s==='home'){let grid=document.querySelector('.admin-launch-grid');if(grid){grid.insertAdjacentHTML('beforeend',`<div class="admin-launch" id="openLeadsAdmin"><strong>Leads Extra Status</strong><span>Prioritized lead / manager handoff with controlled dropdowns and editable Notes.</span></div><div class="admin-launch" id="openActionCenter"><strong>Action Center</strong><span>Generated reminders, critical issues and manual follow-ups.</span></div><div class="admin-launch" id="openReferenceFiles"><strong>Reference Files</strong><span>Micro Schedule, Shipping Tracker and B7 FI Status workbooks.</span></div>`);$('#openLeadsAdmin').onclick=()=>leadsExtraPage(true);$('#openActionCenter').onclick=()=>setView('actions');$('#openReferenceFiles').onclick=()=>setView('references')}}}

const _wireAdminV21=wireAdmin;
wireAdmin=function(s){if(s==='meeting'){return} _wireAdminV21(s);if(s==='countdown')wireRapidAdd();if(s==='daily'||s==='weekend')setTimeout(wirePriorityDynamic,0)}

function renderV3(){renderEditControls();setTimeout(enhanceDateInputs,0);setTimeout(updateOperationsBar,0);if(view==='countdown')countdown();else if(view==='shipping'){setHeaderContext('SHIPPING SCHEDULE');shipping()}else if(view==='daily'){setHeaderContext('WEEKDAY PRIORITIES');daily()}else if(view==='meeting'){setHeaderContext('MORNING STATUS');morning()}else if(view==='leads')leadsExtraPage(false);else if(view==='weekend'){setHeaderContext('WEEKEND PRIORITIES');weekend()}else if(view==='workspace'){setHeaderContext('LEAD WORKSPACE');workspace()}else if(view==='systems')systems();else if(view==='archive'){setHeaderContext('ARCHIVE');archive()}else if(view==='references')referencesPage();else if(view==='actions')actionCenter();else if(view==='wallboard')wallboardPage();else if(view==='shared'){setHeaderContext('SHARED DATA');sharedData()}else admin()}
render=renderV3;

// v0.30 backup metadata
exportFullBackup=function(){state.tools=tools;state.config=normalizeConfig(state.config);ensureV0300State();const payload={schema:'B7-FI-COMMAND-CENTER-BACKUP',schemaVersion:2,appVersion:'1.0.3',exportedAt:new Date().toISOString(),state};downloadBlob(`B7-FI-Command-Center-Full-Backup-${safeFileStamp()}.json`,JSON.stringify(payload,null,2),'application/json')}



/* =========================================================
   v1.0.1 ACTION / FLEET / MICRO-SCHEDULE CONSOLIDATION
   ========================================================= */
function ensureV0305ToolState(){
  tools.forEach(t=>{
    if(t.microTargetChecklist==null)t.microTargetChecklist='';
    if(t.microTargetUpdatedAt==null)t.microTargetUpdatedAt='';
  });
  state.appVersion='1.0.3';
}
ensureV0305ToolState();

function microScheduleInfo(t){
  let r=routeFor(t), actualIndex=r.findIndex(x=>x[0]===t.checklist), targetIndex=r.findIndex(x=>x[0]===t.microTargetChecklist);
  if(t.quarterStatus==='Shipped')return {set:true,targetIndex:r.length-1,actualIndex:r.length-1,plannedPct:100,delta:0,label:'SHIPPED',className:'on',target:t.microTargetChecklist||t.checklist||'—'};
  if(targetIndex<0)return {set:false,targetIndex:-1,actualIndex,plannedPct:0,delta:null,label:'TARGET NOT SET',className:'unset',target:'—'};
  let plannedPct=pct(targetIndex+1,r.length),delta=actualIndex<0?targetIndex+1:targetIndex-actualIndex;
  if(delta>0)return {set:true,targetIndex,actualIndex,plannedPct,delta,label:`BEHIND ${delta} CHECKLIST${delta===1?'':'S'}`,className:'behind',target:r[targetIndex][0]};
  if(delta<0)return {set:true,targetIndex,actualIndex,plannedPct,delta,label:`AHEAD ${Math.abs(delta)} CHECKLIST${Math.abs(delta)===1?'':'S'}`,className:'ahead',target:r[targetIndex][0]};
  return {set:true,targetIndex,actualIndex,plannedPct,delta:0,label:'ON SCHEDULE',className:'on',target:r[targetIndex][0]};
}
function microTargetOptions(t){
  return `<option value="">Not Set</option>`+routeFor(t).map(x=>`<option value="${esc(x[0])}" ${x[0]===t.microTargetChecklist?'selected':''}>${esc(x[0])} — ${esc(x[1])}</option>`).join('');
}
function scheduleStatusBadge(t){let m=microScheduleInfo(t);return `<span class="schedule-chip ${m.className}">${esc(m.label)}</span>`}
function supplementalCardBlock(t){
  let active=activeSupplementals(t); if(!active.length)return '';
  let sp=supplementalPct(t);
  return `<div class="progress-row supplemental-progress active-only"><div class="progress-label"><span>SUPPLEMENTAL / SPECIAL</span><b>${sp}%</b></div><div class="track"><div class="fill supplemental" style="width:${sp}%"></div></div><div class="card-progress-meta"><span>${esc(supplementalSummary(t))}</span><span>${active.length} active</span></div></div>`;
}

/* Action Center is the single source of truth for the top status bar. */
actionTarget=function(a){if(a.view)setView(a.view);else if(a.toolId)openToolAction(a.toolId,a.tab||'basic')};
v3Alerts=function(){
  let out=[],today=new Date();today.setHours(0,0,0,0);syncWorkspaceFromTools();
  (state.manualReminders||[]).filter(x=>!x.complete).forEach(x=>out.push({severity:x.severity||'yellow',priority:x.severity==='red'?10:x.severity==='orange'?7:4,text:`${x.toolId?'TOOL '+x.toolId+' — ':''}${x.text}`,toolId:x.toolId||'',tab:x.tab||'basic',id:'manual:'+x.id,source:'manual'}));
  (state.workspaceTasks||[]).filter(x=>x.status!=='Completed').forEach(x=>out.push({severity:x.status==='In Progress'?'orange':'yellow',priority:x.status==='In Progress'?7:5,text:`LEAD WORKSPACE · ${x.toolId?'TOOL '+x.toolId+' — ':'GENERAL — '}${x.title} · ${x.status}`,view:'workspace',id:'workspace:'+x.id,source:'workspace'}));
  tools.filter(t=>t.quarterStatus==='In FI'||t.quarterStatus==='Waiting for FI').forEach(t=>{
    (t.ncs||[]).filter(n=>!['closed','waived'].includes(String(n.state).toLowerCase())).forEach(n=>{if(n.blocking)out.push({severity:'red',priority:12,text:`TOOL ${t.id} — BLOCKING NC ${n.id||''}: ${n.desc||n.state}`,toolId:t.id,tab:'issues',source:'nc'});else if(isEscalatedNc(n))out.push({severity:'red',priority:11,text:`TOOL ${t.id} — Escalated ${n.id||'NC'}${n.days?` · Day ${n.days}`:''}`,toolId:t.id,tab:'issues',source:'nc'})});
    activeSupplementals(t).forEach(s=>out.push({severity:'orange',priority:8,text:`TOOL ${t.id} — ${s.label.toUpperCase()} ${s.status||'IN PROGRESS'}${s.totalSteps?` · ${s.completedSteps||0}/${s.totalSteps}`:''}`,toolId:t.id,tab:'fi',source:'supplemental'}));
    let mi=microScheduleInfo(t);if(mi.set&&mi.delta>0)out.push({severity:mi.delta>=2?'orange':'yellow',priority:mi.delta>=2?9:6,text:`TOOL ${t.id} — BEHIND MICRO SCHEDULE · Actual ${t.checklist||'—'} / Planned ${mi.target} · ${mi.delta} checklist${mi.delta===1?'':'s'} behind`,toolId:t.id,tab:'fi',source:'schedule'});
    if(t.quarterStatus==='In FI'&&(!t.driver||t.driver==='Unassigned'))out.push({severity:'yellow',priority:5,text:`TOOL ${t.id} — Driver / assignment is unassigned`,toolId:t.id,tab:'basic',source:'tool'});
    if(t.quarterStatus==='In FI'&&t.ship){let d=new Date(t.ship+'T00:00:00'),days=Math.round((d-today)/86400000);if(days>=0&&days<=7&&(!t.schedule||t.schedule.publish==='N/A'))out.push({severity:days<=2?'orange':'yellow',priority:days<=2?8:6,text:`TOOL ${t.id} — Ships ${days===0?'TODAY':days===1?'TOMORROW':`in ${days} days`} · Shipping schedule not created`,toolId:t.id,tab:'shipping',source:'shipping'})}
    let first=t.quarterStatus==='In FI'?(activeLeadTasks()||[]).find(task=>!['Complete','N/A'].includes(t.leadAdmin?.[task.id]||'Not Started')):null;if(first)out.push({severity:'yellow',priority:3,text:`TOOL ${t.id} — Lead/Admin next: ${first.label}`,toolId:t.id,tab:'lead',source:'lead'});
  });
  return out.sort((a,b)=>b.priority-a.priority);
};

/* Bottom bar = fleet health, not a duplicate Action Center ticker. */
function fleetStatusEntries(){
  return current().filter(t=>t.quarterStatus!=='Shipped').map(t=>{let m=microScheduleInfo(t),supp=activeSupplementals(t),suppText=supp.length?` · ${supp.map(s=>`${s.label.toUpperCase()} ${s.completedSteps||0}/${s.totalSteps||1}`).join(' + ')}`:'';return {toolId:t.id,className:m.className,text:`TOOL ${t.id} · ${t.checklist||'NO CHECKLIST'} · ${m.label}${suppText}`}});
}
updateOperationsBar=function(){
  let bar=document.getElementById('operationsBar');if(!bar)return;
  let fleet=fleetStatusEntries(),alerts=v3Alerts();
  let sync=document.getElementById('opsSync');if(sync)sync.textContent=(state.shared?.mode==='sharepoint-direct-test'?'SharePoint reachable':'Local Production Mode · SharePoint live sync pending');
  let tx=document.getElementById('opsTickerText'),ticker=document.querySelector('.ops-ticker');
  if(tx){if(!fleet.length){tx.textContent='No active FI tools';if(ticker)ticker.className='ops-ticker fleet-on'}else{opsTickerIndex%=fleet.length;let x=fleet[opsTickerIndex];tx.textContent=x.text;if(ticker){ticker.className=`ops-ticker fleet-${x.className}`;ticker.onclick=()=>toolStatus(x.toolId);ticker.title=`Open Tool ${x.toolId}`}}}
  let counts={ahead:0,on:0,behind:0,unset:0};fleet.forEach(x=>{if(x.className==='ahead')counts.ahead++;else if(x.className==='behind')counts.behind++;else if(x.className==='on')counts.on++;else counts.unset++});
  let tc=document.getElementById('opsTaskCount');if(tc)tc.textContent=`${fleet.length} active tool${fleet.length===1?'':'s'} · ${counts.behind} behind · ${counts.on} on schedule · ${counts.ahead} ahead`;
  let pr=document.getElementById('opsPresence');if(pr)pr.textContent=`${counts.unset} Micro Schedule target${counts.unset===1?'':'s'} not set`;
  renderTopActionBar();
};

/* Three permanent card bars: Actual, Micro Schedule, Lead/Admin. Supplemental is conditional. */
function systemsV5(){
  setHeaderContext('TOOLS','Actual vs Micro Schedule vs Lead/Admin');let list=pageTools('systems'),groups={};list.forEach(t=>(groups[t.codename]??=[]).push(t));
  app.innerHTML=`<div class="tools-filter-bar"><input id="toolSearch" placeholder="Search UTID, model, customer, assignment…"><select id="toolStatusFilter"><option value="">All Statuses</option><option>Waiting for FI</option><option>In FI</option><option>Shipped</option></select></div><div id="toolsGroups">${Object.entries(groups).sort((a,b)=>a[0].localeCompare(b[0])).map(([name,arr])=>`<section class="tool-section v3-tool-section"><div class="tool-section-head"><h2 class="tool-section-title">${esc(name)}</h2><span class="tool-section-count">${arr.length} tool${arr.length===1?'':'s'}</span></div><div class="system-grid v3-system-grid">${arr.map(t=>{let rc=routeCounts(t),lc=leadCounts(t),mi=microScheduleInfo(t);return `<div class="system-card v3-system-card ${t.quarterStatus==='Shipped'?'shipped-card':t.quarterStatus==='Waiting for FI'?'waiting-card':'infi-card'}" data-tool="${esc(t.id)}" data-search="${esc([t.id,t.model,t.customer,t.driver,t.codename,t.quarterStatus].join(' ').toLowerCase())}" data-status="${esc(t.quarterStatus)}"><div class="system-head"><div><div class="system-id v3-system-id">${esc(t.id)}</div><div><span class="model-badge">${esc(t.model)}</span> <span class="gray">${esc(t.customer)}</span></div></div>${t.quarterStatus==='Shipped'?'<span class="complete-mark"><span class="check">✓</span> SHIPPED</span>':`<span class="state-chip ${qState(t)}">${t.quarterStatus==='Waiting for FI'?'WAITING FI':'IN FI'}</span>`}</div><div class="progress-row"><div class="progress-label"><span>ACTUAL TOOL PROGRESS</span><b>${routeProgress(t)}%</b></div><div class="track"><div class="fill" style="width:${routeProgress(t)}%"></div></div><div class="card-progress-meta"><span>${rc.done} complete</span><span>${esc(t.checklist||'—')}</span></div></div><div class="progress-row micro-progress ${mi.className}"><div class="progress-label"><span>MICRO SCHEDULE / PLANNED</span><b>${mi.set?mi.plannedPct+'%':'—'}</b></div><div class="track"><div class="fill micro" style="width:${mi.plannedPct}%"></div></div><div class="card-progress-meta"><span>${mi.set?esc(mi.target):'Set target on Tool page'}</span>${scheduleStatusBadge(t)}</div></div><div class="progress-row"><div class="progress-label"><span>LEAD / ADMIN</span><b>${adminProgress(t)}%</b></div><div class="track"><div class="fill admin" style="width:${adminProgress(t)}%"></div></div><div class="card-progress-meta"><span>${lc.done} complete</span><span>${lc.total} applicable</span></div></div>${supplementalCardBlock(t)}<div class="card-meta"><div><span>Assignment</span><strong>${esc(t.driver)}</strong></div><div><span>Location</span><strong>${esc(t.room)}${t.bay?' / '+esc(t.bay):''}</strong></div><div><span>Primary Checklist</span><strong>${activeChecklists(t).map(x=>x[0]).join(', ')||t.checklist||'—'}</strong></div><div><span>MFG Ship</span><strong>${fmt(t.ship)}</strong></div></div></div>`}).join('')}</div></section>`).join('')}</div>`;
  function filter(){let q=$('#toolSearch').value.toLowerCase(),s=$('#toolStatusFilter').value;document.querySelectorAll('.v3-system-card').forEach(c=>c.style.display=(!q||c.dataset.search.includes(q))&&(!s||c.dataset.status===s)?'':'none')};$('#toolSearch').oninput=filter;$('#toolStatusFilter').onchange=filter;document.querySelectorAll('[data-tool]').forEach(x=>x.onclick=()=>toolStatus(x.dataset.tool));actions([{label:'Add Tool',primary:true,fn:()=>toolAdmin()},{label:'Administration',fn:()=>setView('admin')}],false);
}
systems=systemsV5;

function microSchedulePanel(t){let mi=microScheduleInfo(t);return `<section class="micro-schedule-panel"><div><h3>Micro Schedule Target</h3><p>Set where this tool should be on the FI route according to the current Micro Schedule. This does not change Actual Tool Progress.</p></div><div class="micro-schedule-controls"><select id="microTargetChecklist">${microTargetOptions(t)}</select><button id="microTargetSave" class="btn primary">Save Micro Schedule Target</button></div><div class="micro-schedule-readout"><div><span>Actual</span><b>${esc(t.checklist||'—')}</b></div><div><span>Planned</span><b>${esc(mi.target)}</b></div><div>${scheduleStatusBadge(t)}</div></div></section>`}
function toolStatusV5(id){
  let t=tools.find(x=>x.id===id);if(!t)return;ensureV0305ToolState();selectedId=id;document.body.dataset.theme='systems';setHeaderContext(`TOOL ${t.id}`,`${t.codename} · ${t.model} · ${t.customer}`);let rc=routeCounts(t),lc=leadCounts(t),mi=microScheduleInfo(t),activeSupp=activeSupplementals(t);
  app.innerHTML=`<div class="report-screen">${reportHeader(`${t.id} TOOL STATUS`,`${t.model} · ${t.codename} · ${t.customer}`)}<div class="metric-grid"><div class="metric"><span>MFG Ship Date</span><strong style="font-size:20px">${fmt(t.ship)}</strong></div><div class="metric"><span>Primary Checklist</span><strong style="font-size:18px">${esc(t.checklist)}</strong><small>${esc(checkName(t))}</small></div><div class="metric"><span>Actual Tool Progress</span><strong>${routeProgress(t)}%</strong><small>${rc.done}/${rc.total} completed</small></div><div class="metric"><span>Micro Schedule</span><strong>${mi.set?mi.plannedPct+'%':'—'}</strong><small>${esc(mi.label)}</small></div><div class="metric"><span>Lead / Admin</span><strong>${adminProgress(t)}%</strong><small>${lc.done}/${lc.total} applicable</small></div>${activeSupp.length?`<div class="metric"><span>Supplemental</span><strong>${supplementalPct(t)}%</strong><small>${esc(supplementalSummary(t))}</small></div>`:''}<div class="metric"><span>Tool Status</span><strong style="font-size:18px" class="${qState(t)==='shipped'?'green-text':qState(t)==='waiting'?'red-text':'yellow-text'}">${esc(t.quarterStatus)}</strong></div></div>${microSchedulePanel(t)}<div class="tool-status-grid v3-tool-status-grid"><div class="tool-status-block"><h3>Tool Information</h3>${kv('Product Family',t.family)}${kv('Code Name',t.codename)}${kv('Model',t.model)}${kv('UTID',t.id)}${kv('Sales Order',t.so)}${kv('Customer',t.customer)}${kv('Cleanroom',t.room)}${kv('Bay',t.bay)}${kv('Tool Assignment',t.driver)}${kv('SW Version',t.sw)}${kv('FI Process',t.process)}${kv('Lamp Hours',displayLamp(t))}</div><div class="tool-status-block fi-status-large"><h3>FI Status / Issues</h3>${kv('Current Checklist',`${t.checklist} — ${checkName(t)}`)}${kv('Latest Status',t.activity)}${kv('Micro Schedule Target',mi.target)}${kv('Schedule Position',mi.label)}${kv('Active Supplemental',supplementalSummary(t))}${kv('POA',t.poa)}${kv('Escalation Meeting',t.escalationMeeting)}${kv('Waivers',t.waivers)}${kv('Open NCs',t.ncs.map(n=>n.id+' '+n.state).join(', ')||'None')}<div class="tool-notes-block"><span>Notes</span><p>${esc(t.notes||'No notes entered.')}</p></div></div></div>${shippingPlanBlock(t)}${supplementalPanel(t)}<div class="progress-board"><div class="progress-panel"><h3>FI Checklist Route · ${rc.done}/${rc.total} Complete</h3>${routeWorkflow(t)}</div><div class="progress-panel"><h3>Lead / Admin Workflow · ${lc.done}/${lc.total} Complete</h3>${leadWorkflow(t,false)}</div></div></div>`;
  $('#microTargetSave').onclick=()=>{t.microTargetChecklist=$('#microTargetChecklist').value;t.microTargetUpdatedAt=new Date().toISOString();save();toolStatusV5(t.id)};
  if($('#suppStart'))$('#suppStart').onclick=()=>{let cfg=state.supplementalConfig.find(x=>x.id===$('#suppType').value);if(!cfg)return;t.supplementals.push({id:'si'+Date.now(),typeId:cfg.id,label:cfg.label,status:'In Progress',completedSteps:0,totalSteps:cfg.defaultSteps||1,returnChecklist:t.checklist,startedAt:new Date().toISOString()});if(cfg.label==='Lamp Swap')t.lampState='OFF';save();toolStatusV5(t.id)};
  document.querySelectorAll('[data-supp]').forEach(row=>{row.querySelector('.supp-save').onclick=()=>{let i=Number(row.dataset.supp),s=t.supplementals[i];s.status=row.querySelector('.supp-state').value;s.completedSteps=Math.max(0,Number(row.querySelector('.supp-done').value)||0);if(s.status==='Complete'){s.completedSteps=s.totalSteps||1;s.completedAt=new Date().toISOString();t.supplementalHistory.push(clone(s));t.supplementals.splice(i,1)}save();toolStatusV5(t.id)}});
  actions([{label:'Edit This Tool',primary:true,fn:()=>toolAdmin(t.id)},{label:'Back to Tools',fn:()=>setView('systems')}]);
  updateOperationsBar();
}
toolStatus=toolStatusV5;

/* v1.0.1 metadata */
exportFullBackup=function(){state.tools=tools;state.config=normalizeConfig(state.config);ensureV0300State();ensureV0305ToolState();const payload={schema:'B7-FI-COMMAND-CENTER-BACKUP',schemaVersion:3,appVersion:'1.0.3',exportedAt:new Date().toISOString(),state};downloadBlob(`B7-FI-Command-Center-Full-Backup-${safeFileStamp()}.json`,JSON.stringify(payload,null,2),'application/json')}

// Ensure page label and bars are initialized before first v0.30 render.
setThemeFor(view);

render();app.dataset.rendered='true';


/* =========================================================
   v1.0.1 WALLBOARD / LIVE DISPLAY MODE
   ========================================================= */
const WALLBOARD_DEFAULTS=[
  {view:'countdown',label:'Tool Countdown',seconds:25,enabled:true},
  {view:'actions',label:'Action Center',seconds:25,enabled:true},
  {view:'meeting',label:'Morning Status',seconds:35,enabled:true},
  {view:'daily',label:'Weekday Priorities',seconds:25,enabled:true},
  {view:'shipping',label:'Shipping Schedule',seconds:25,enabled:true},
  {view:'leads',label:'Leads Extra Status',seconds:25,enabled:true},
  {view:'systems',label:'Fleet / Tools Overview',seconds:35,enabled:true}
];
let wallboard={active:false,paused:false,index:0,timer:null,returnView:'countdown'};
function ensureWallboardConfig(){
  state.wallboard=state.wallboard||{};
  state.wallboard.slides=Array.isArray(state.wallboard.slides)&&state.wallboard.slides.length?state.wallboard.slides:clone(WALLBOARD_DEFAULTS);
  state.wallboard.autoRefreshSeconds=Number(state.wallboard.autoRefreshSeconds)||15;
}
ensureWallboardConfig();
function wallboardSlides(){ensureWallboardConfig();return state.wallboard.slides.filter(x=>x.enabled!==false)}
function wallboardPage(){
  setHeaderContext('WALLBOARD','Large-screen live operations display');ensureWallboardConfig();
  app.innerHTML=`<div class="wallboard-setup"><div class="wallboard-intro"><h2>B7 FI Live Wallboard</h2><p>Use a dedicated PC and large monitor to rotate through live Command Center status pages. Wallboard Mode is read-only and hides normal editing/navigation controls.</p><div class="wallboard-live-card"><b>● LIVE DISPLAY READY</b><span>Local test mode now · shared-data auto-update when Microsoft Lists sync is enabled</span></div></div><div class="panel"><h3>Rotation</h3><div class="wallboard-slide-list">${state.wallboard.slides.map((x,i)=>`<div class="wallboard-slide-row" data-wallrow="${i}"><label><input type="checkbox" class="wall-enabled" ${x.enabled!==false?'checked':''}> ${esc(x.label)}</label><label>Display <input type="number" class="wall-seconds" min="10" max="180" value="${Number(x.seconds)||25}"> sec</label></div>`).join('')}</div><div class="wallboard-start-row"><button id="wallStart" class="btn primary">Start Wallboard Mode</button><button id="wallFullscreen" class="btn">Start Full Screen</button></div></div><div class="panel"><h3>Wallboard behavior</h3><div class="wallboard-feature-grid"><div><b>AUTO ROTATION</b><span>Cycles only through enabled pages.</span></div><div><b>ACTION CENTER</b><span>Shows the same live actions used by the top B7 FI Actions bar.</span></div><div><b>FLEET STATUS</b><span>Bottom bar continues to show Actual vs Micro Schedule status.</span></div><div><b>READ ONLY</b><span>Editing controls are hidden while the wallboard is running.</span></div></div></div></div>`;
  document.querySelectorAll('[data-wallrow]').forEach(r=>{let i=Number(r.dataset.wallrow),e=r.querySelector('.wall-enabled'),sec=r.querySelector('.wall-seconds');e.onchange=()=>{state.wallboard.slides[i].enabled=e.checked;save()};sec.onchange=()=>{state.wallboard.slides[i].seconds=Math.max(10,Number(sec.value)||25);save()}});
  $('#wallStart').onclick=()=>startWallboard(false);$('#wallFullscreen').onclick=()=>startWallboard(true);
  actions([{label:'Start Wallboard',primary:true,fn:()=>startWallboard(false)},{label:'Tools',fn:()=>setView('systems')}],false)
}
function startWallboard(fullscreen){
  let slides=wallboardSlides();if(!slides.length)return alert('Enable at least one Wallboard page first.');
  wallboard.active=true;wallboard.paused=false;wallboard.index=0;wallboard.returnView=view==='wallboard'?'countdown':view;
  document.body.classList.add('wallboard-mode');document.getElementById('wallboardControls')?.classList.add('show');
  if(fullscreen&&document.documentElement.requestFullscreen)document.documentElement.requestFullscreen().catch(()=>{});
  showWallboardSlide(0);
}
function showWallboardSlide(index){
  let slides=wallboardSlides();if(!wallboard.active||!slides.length)return;wallboard.index=(index+slides.length)%slides.length;
  let slide=slides[wallboard.index];setView(slide.view);document.body.classList.add('wallboard-mode');document.getElementById('wallboardControls')?.classList.add('show');
  let live=document.getElementById('wallLive');if(live)live.textContent=`● LIVE · ${wallboard.index+1}/${slides.length} · ${slide.seconds}s`;
  if(wallboard.timer)clearTimeout(wallboard.timer);if(!wallboard.paused)wallboard.timer=setTimeout(()=>showWallboardSlide(wallboard.index+1),(Number(slide.seconds)||25)*1000);
}
function exitWallboard(){
  wallboard.active=false;wallboard.paused=false;if(wallboard.timer)clearTimeout(wallboard.timer);wallboard.timer=null;
  document.body.classList.remove('wallboard-mode');document.getElementById('wallboardControls')?.classList.remove('show');
  if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(()=>{});setView('wallboard');
}
function wireWallboardControls(){
  let p=$('#wallPrev'),n=$('#wallNext'),pa=$('#wallPause'),ex=$('#wallExit');if(!p)return;
  p.onclick=()=>showWallboardSlide(wallboard.index-1);n.onclick=()=>showWallboardSlide(wallboard.index+1);ex.onclick=exitWallboard;
  pa.onclick=()=>{wallboard.paused=!wallboard.paused;pa.textContent=wallboard.paused?'RESUME':'PAUSE';if(wallboard.timer)clearTimeout(wallboard.timer);wallboard.timer=null;if(!wallboard.paused)showWallboardSlide(wallboard.index)};
}
wireWallboardControls();
window.addEventListener('storage',e=>{if(!wallboard.active||e.key!==KEY)return;try{state=loadState();tools=state.tools;ensureV0300State();ensureV0305ToolState();ensureWallboardConfig();render()}catch(err){}});

// Centralized displayed build version.
(function applyAppVersion(){document.title=`B7 FI Command Center v${APP_VERSION}`;const el=document.getElementById('appVersionLabel');if(el)el.textContent=`B7 FI Command Center v${APP_VERSION}`;})();


/* ===== SOURCE: js/merge-bridge-v0400.js ===== */
/* B7 FI Command Center v1.0.3 merge bridge
 * Saves the v1.0.1 framework functions before the v1.0.1 workflow layer loads.
 */
window.__B7_V31_FRAMEWORK__={
  updateOperationsBar:typeof updateOperationsBar==='function'?updateOperationsBar:null,
  render:typeof render==='function'?render:null,
  v3Alerts:typeof v3Alerts==='function'?v3Alerts:null
};


/* ===== SOURCE: js/app-v0210-workflow.js ===== */
/*
 * B7 FI Operations v1.0.1 Workflow Reality Update
 * -------------------------------------------------
 * This file intentionally layers new workflow behavior on top of v1.0.1.
 * The original application remains intact so existing localStorage data keeps working.
 * New schema fields are added lazily and are safe for older saved tools.
 */

const V0210_PRIORITY={Critical:5,High:4,Normal:3,Low:2,Info:1};
const V0210_PRIORITY_CLASS={Critical:'critical',High:'high',Normal:'normal',Low:'low',Info:'info'};
const SOURCE_TASK_LABELS=['Customer source started','Customer source completed','Pre-source checklist completed'];
const STR_TASK_LABELS=['Does system require STR testing','Receive STR testing requirements from CA','Complete STR testing','Submit STR results to CA','STR customer approval received'];

function v0210Today(){return new Date().toISOString().slice(0,10)}
function quarterFromDate(d){
  if(!d||!/^\d{4}-\d{2}-\d{2}$/.test(d))return'';
  const [y,m]=d.split('-').map(Number);return `CY${String(y).slice(-2)}Q${Math.ceil(m/3)}`
}
function calendarQuarter(){return quarterFromDate(v0210Today())}
function serialKey(v){const n=Number(String(v||'').replace(/\D/g,''));return Number.isFinite(n)?n:999999999}
function stripDash(s){return String(s||'').trim().replace(/^[-–—•]\s*/,'').trim()}
function statusItems(text){
  let raw=String(text||'').replace(/\r/g,'').trim();if(!raw)return [];
  let lines=raw.split(/\n+/).map(stripDash).filter(Boolean);
  if(lines.length===1&&/\s[-–—]\s/.test(lines[0]))lines=lines[0].split(/\s[-–—]\s/).map(stripDash).filter(Boolean);
  return lines;
}
function statusHtml(text,empty='No latest status entered.'){
  let a=statusItems(text);if(!a.length)a=[empty];return `<ul class="v21-status-lines">${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`
}
function ensureV0210(){
  state.morningOrder=Array.isArray(state.morningOrder)?state.morningOrder:[];
  state.meetings=state.meetings||{};state.meetingHistory=Array.isArray(state.meetingHistory)?state.meetingHistory:[];
  state.tickerSettings=state.tickerSettings||{enabled:true};
  state.workspaceTasks=state.workspaceTasks||[];
  state.workspaceTasks.forEach((x,i)=>{
    if(x.status==='Need to Complete')x.status='Open';
    x.priority=x.priority||'Normal';x.assignee=x.assignee||'';x.due=x.due||'';x.notes=x.notes||'';x.source=x.source||'';
    x.showTicker=x.showTicker!==false;x.tickerOrder=Number(x.tickerOrder)||i+1;x.tickerSeconds=Math.max(3,Number(x.tickerSeconds)||8);
  });
  // Add STR Lead/Admin tasks exactly once.
  let labels=new Set((state.config.leadTasks||[]).map(x=>x.label));
  STR_TASK_LABELS.forEach(label=>{if(!labels.has(label)){let id='lead_str_'+(state.config.nextLeadId++);state.config.leadTasks.push({id,label,options:[...DEFAULT_TASK_CHOICES],active:true,countProgress:true});tools.forEach(t=>{t.leadAdmin=t.leadAdmin||{};t.leadAdmin[id]='Not Started'})}});
  tools.forEach(t=>{
    t.originalShip=t.originalShip||t.ship||'';t.originalQuarter=t.originalQuarter||t.quarter||quarterFromDate(t.ship)||'';
    t.originalCustomer=t.originalCustomer||t.customer||'N/A';t.originalSO=t.originalSO||t.so||'N/A';
    t.changeHistory=Array.isArray(t.changeHistory)?t.changeHistory:[];
    t.sourceRequired=t.sourceRequired||'TBD';t.sourceStatus=t.sourceStatus||'Not Started';
    t.sourceHandoff=t.sourceHandoff||'';t.sourceStart=t.sourceStart||'';t.sourceComplete=t.sourceComplete||'';
    t.strRequired=t.strRequired||'TBD';t.strStatus=t.strStatus||'Not Started';t.strDue=t.strDue||'';t.strNotes=t.strNotes||'';
    t.schedule=t.schedule||{};t.schedule.mat=t.schedule.mat||((t.codename==='Regera'||t.codename==='Celestiq')&&t.schedule.mst&&t.schedule.mst!=='N/A'?t.schedule.mst:'');
    t.schedule.done=t.schedule.done||{};
    ['subsystems','accessories','cables','mat','is'].forEach(k=>{if(t.schedule.done[k]==null)t.schedule.done[k]=false});
    if(!t.quarter&&t.ship)t.quarter=quarterFromDate(t.ship);
    applyRequirementApplicability(t,false);
  });
  save();
}

function taskByLabel(t,label){return (state.config.leadTasks||[]).find(x=>x.label===label)}
function setLeadByLabel(t,label,value){let task=taskByLabel(t,label);if(task){t.leadAdmin=t.leadAdmin||{};t.leadAdmin[task.id]=value}}
function applyRequirementApplicability(t,doSave=true){
  // The determination task counts as completed once Yes/No is known; follow-on tasks become N/A when not required.
  if(t.sourceRequired==='No'){
    setLeadByLabel(t,'Does system require customer source','Complete');SOURCE_TASK_LABELS.forEach(x=>setLeadByLabel(t,x,'N/A'));
  }else if(t.sourceRequired==='Yes'){
    setLeadByLabel(t,'Does system require customer source','Complete');SOURCE_TASK_LABELS.forEach(x=>{let task=taskByLabel(t,x);if(task&&t.leadAdmin?.[task.id]==='N/A')t.leadAdmin[task.id]='Not Started'});
  }
  if(t.strRequired==='No'){
    setLeadByLabel(t,'Does system require STR testing','Complete');STR_TASK_LABELS.slice(1).forEach(x=>setLeadByLabel(t,x,'N/A'));
  }else if(t.strRequired==='Yes'){
    setLeadByLabel(t,'Does system require STR testing','Complete');STR_TASK_LABELS.slice(1).forEach(x=>{let task=taskByLabel(t,x);if(task&&t.leadAdmin?.[task.id]==='N/A')t.leadAdmin[task.id]='Not Started'});
  }
  if(doSave)save();
}

function testingRoute(t){return routeFor(t).filter(x=>!/_200_/i.test(x[0]))}
routeProgress=function(t){
  let r=testingRoute(t),vals=r.map(x=>t.checklistStates?.[x[0]]||'Need to Complete').filter(v=>v!=='N/A'&&v!=='Skipped');
  return vals.length?pct(vals.filter(v=>v==='Complete').length,vals.length):0
};
routeCounts=function(t){
  let r=testingRoute(t),vals=r.map(x=>t.checklistStates?.[x[0]]||'Need to Complete').filter(v=>v!=='N/A'&&v!=='Skipped');
  return {done:vals.filter(v=>v==='Complete').length,current:vals.filter(v=>v==='In Progress').length,total:vals.length}
};
function packingActive(t){return t.quarterStatus==='In FI'&&(routeProgress(t)>=100||/_200_/i.test(t.checklist)||routeFor(t).some(x=>/_200_/i.test(x[0])&&['In Progress','Complete'].includes(t.checklistStates?.[x[0]])))}
function packingMilestones(t){
  return [
    {key:'subsystems',label:'Subsystems',date:t.schedule.subsystems},
    {key:'accessories',label:'Accessories',date:t.schedule.accessories},
    {key:'cables',label:'Cables',date:t.schedule.cables},
    {key:'mat',label:(t.codename==='Regera'||t.codename==='Celestiq')?'MAT Installed':'MAT',date:t.schedule.mat},
    {key:'is',label:'IS',date:t.schedule.is}
  ]
}
function packingProgress(t){let a=packingMilestones(t);return pct(a.filter(x=>t.schedule?.done?.[x.key]).length,a.length)}
function milestoneTone(m,t){if(t.schedule?.done?.[m.key])return'done';if(!m.date)return'unscheduled';let d=new Date(m.date+'T23:59:59'),now=new Date(),today=v0210Today();if(m.date<today)return'overdue';if(m.date===today)return'today';return'upcoming'}
function currentPhase(t){if(t.quarterStatus==='Shipped')return'SHIPPED';if(packingActive(t))return'200 PACKING';if(t.sourceRequired==='Yes'&&['Ready for CA','With CA Team','Customer Source / STR Active'].includes(t.sourceStatus))return'CUSTOMER SOURCE';return'FI TESTING'}

function recordChange(t,field,oldValue,newValue,reason=''){
  if(String(oldValue??'')===String(newValue??''))return;
  let type=field;
  if(field==='Ship Date'){
    let oq=quarterFromDate(oldValue),nq=quarterFromDate(newValue),oldD=oldValue?new Date(oldValue+'T12:00:00'):null,newD=newValue?new Date(newValue+'T12:00:00'):null;
    if(oq&&nq&&oq!==nq)type=nq>oq?`PUSHED TO ${nq}`:`PULLED INTO ${nq}`;
    else if(oldD&&newD)type=newD<oldD?'PULLED IN':'PUSHED OUT';
  } else if(field==='Customer') type='CUSTOMER CHANGE'; else if(field==='Sales Order')type='SALES ORDER CHANGE';
  t.changeHistory=t.changeHistory||[];t.changeHistory.unshift({id:'chg'+Date.now()+Math.random(),date:new Date().toISOString(),field,type,oldValue,newValue,reason});
  t.changeHistory=t.changeHistory.slice(0,100);
}
function latestChangeBadge(t){let c=t.changeHistory?.[0];if(!c)return'';let cls=/PULL/i.test(c.type)?'pull':/PUSH/i.test(c.type)?'push':'change';return `<span class="change-chip ${cls}" title="${esc(c.field)}: ${esc(c.oldValue)} → ${esc(c.newValue)}">${/PULL/i.test(c.type)?'↑':/PUSH/i.test(c.type)?'↓':'↻'} ${esc(c.type)}</span>`}

function defaultMorningOrder(a){return [...a].sort((x,y)=>x.codename.localeCompare(y.codename)||x.model.localeCompare(y.model)||serialKey(x.id)-serialKey(y.id))}
function orderedMorningTools(){
  let a=pageTools('morning'),base=defaultMorningOrder(a),ids=new Set(a.map(x=>x.id));state.morningOrder=(state.morningOrder||[]).filter(id=>ids.has(id));
  let map=new Map(a.map(t=>[t.id,t])),out=state.morningOrder.map(id=>map.get(id)).filter(Boolean),used=new Set(out.map(x=>x.id));base.forEach(t=>{if(!used.has(t.id))out.push(t)});return out
}
function moveMorning(id,delta){let a=orderedMorningTools().map(x=>x.id),i=a.indexOf(id),j=i+delta;if(i<0||j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];state.morningOrder=a;save();morning()}
function meetingRecord(){let d=v0210Today();return state.meetings[d]||(state.meetings[d]={date:d,notes:'',created:new Date().toISOString()})}
function archiveMeeting(){let r=meetingRecord();state.meetingHistory=state.meetingHistory.filter(x=>x.date!==r.date);state.meetingHistory.unshift({...clone(r),closed:new Date().toISOString()});save();morning()}
function addMorningTask(title,toolId=''){
  title=String(title||'').trim();if(!title)return;let rec=meetingRecord();state.workspaceTasks.unshift({id:'w'+Date.now(),title,status:'Open',toolId,leadTaskId:'',priority:'High',assignee:'',due:'',notes:'',source:`Morning Meeting ${rec.date}`,showTicker:true,tickerOrder:1,tickerSeconds:10});
  state.workspaceTasks.forEach((x,i)=>x.tickerOrder=i+1);save()
}

morning=function(){
  let a=orderedMorningTools(),rec=meetingRecord();
  app.innerHTML=`<div class="report-screen">${reportHeader('B7 FI MORNING STATUS')}<div class="meeting-control-strip"><div><b>${fmt(rec.date)}</b><span>${a.length} systems</span><span>${state.workspaceTasks.filter(x=>x.status!=='Completed').length} open actions</span></div><button id="resetMorningOrder" class="btn small">Reset Tool Type / Serial Order</button></div>${a.map((t,i)=>{
    let visible=morningNcs(t),normal=visible.filter(n=>!isEscalatedNc(n)),escal=visible.filter(isEscalatedNc),active=activeChecklists(t);
    let checklistText=packingActive(t)?'200 — Packing':active.length?active.map(x=>`${x[0]}: ${x[1]}`).join(' + '):`${t.checklist}: ${checkName(t)}`;
    return `<div class="meeting-row v21-meeting-row"><div class="meeting-order-controls"><span>${i+1}</span><button data-move="${esc(t.id)}" data-d="-1" ${i===0?'disabled':''}>↑</button><button data-move="${esc(t.id)}" data-d="1" ${i===a.length-1?'disabled':''}>↓</button></div><div class="meeting-content"><div class="meeting-main">${esc(t.id)} (${esc(t.room)}${t.bay?' / '+esc(t.bay):''}) (${esc(t.model)} - ${esc(t.codename)}) (SW: ${esc(t.sw||'—')}) ${esc(checklistText)} (${esc(t.customer)}, ${fmt(t.ship)}) <span class="morning-lamp">(Lamp Hours: ${t.lamp||0})</span> ${latestChangeBadge(t)} ${packingActive(t)?`<span class="phase-chip packing">PACKING ${packingProgress(t)}%</span>`:''} ${t.sourceRequired==='Yes'?`<span class="phase-chip source">SOURCE: ${esc(t.sourceStatus)}</span>`:''} ${t.strRequired==='Yes'?`<span class="phase-chip str">STR: ${esc(t.strStatus)}</span>`:''}</div>${statusHtml(t.activity)}<ul class="meeting-bullets">${normal.map(n=>`<li class="morning-open-nc">${esc(n.id)}: ${esc(n.desc)}</li>`).join('')}${escal.map(n=>`<li class="morning-escalated">Escalated ${esc(n.id)}${n.days?` - ${n.days} Days`:''}: ${esc(n.desc)}</li>`).join('')}</ul><button class="btn tiny add-tool-note" data-note-tool="${esc(t.id)}">+ Meeting Note for ${esc(t.id)}</button></div></div>`}).join('')}
  <section class="panel morning-notes-panel"><div class="subsection-title"><div><h3>Morning Meeting Notes · ${fmt(rec.date)}</h3><p class="gray">Capture the meeting first, then turn anything actionable into a Command Center task.</p></div><button id="archiveMeeting" class="btn">End / Save Meeting Snapshot</button></div><textarea id="meetingNotes" class="meeting-notes-area" placeholder="- Manager updates\n- Decisions\n- Follow-ups\n- Anything discussed during the meeting">${esc(rec.notes)}</textarea><div class="meeting-action-builder"><input id="meetingTaskTitle" placeholder="Action item from this meeting"><select id="meetingTaskTool"><option value="">General / No Tool</option>${a.map(t=>`<option value="${esc(t.id)}">${esc(t.id)} · ${esc(t.codename)}</option>`).join('')}</select><button id="meetingAddTask" class="btn primary">Add to Tasks</button></div><div class="meeting-history"><h4>Meeting History</h4>${state.meetingHistory.slice(0,10).map(x=>`<details><summary>${fmt(x.date)} · ${(x.notes||'').split('\n').filter(Boolean).length} note lines</summary>${statusHtml(x.notes,'No notes recorded.')}</details>`).join('')||'<span class="gray">No archived morning meetings yet.</span>'}</div></section></div>`;
  document.querySelectorAll('[data-move]').forEach(b=>b.onclick=()=>moveMorning(b.dataset.move,Number(b.dataset.d)));
  $('#resetMorningOrder').onclick=()=>{state.morningOrder=[];save();morning()};
  $('#meetingNotes').oninput=e=>{rec.notes=e.target.value;save()};
  $('#meetingAddTask').onclick=()=>{addMorningTask($('#meetingTaskTitle').value,$('#meetingTaskTool').value);$('#meetingTaskTitle').value='';updateOperationsBar()};
  $('#archiveMeeting').onclick=archiveMeeting;
  document.querySelectorAll('[data-note-tool]').forEach(b=>b.onclick=()=>{let text=prompt(`Meeting note for Tool ${b.dataset.noteTool}:`);if(!text)return;rec.notes+=(rec.notes?'\n':'')+`- [${b.dataset.noteTool}] ${stripDash(text)}`;save();morning()});
  actions([{label:'Morning Quick Update',primary:true,fn:()=>admin('meeting')},{label:'Lead Workspace / Actions',fn:()=>setView('workspace')},{label:'Administration',fn:()=>setView('admin')}])
};


// v0.21 shipping admin: the schedule itself is the packing control document.
shippingAdmin=function(){return `<div class="panel"><h3>Shipping Schedule / Packing Admin</h3><p class="helper">Set planned physical handoff dates here. During 200 Packing, mark actual deliveries directly from the Shipping Schedule page.</p><div class="table-wrap"><table class="report-table compact-form-table"><thead><tr><th>System</th><th>MFG Ship</th><th>Code Name</th><th>Subsystems</th><th>Accessories</th><th>Cables</th><th>MAT</th><th>IS</th><th>Notes</th></tr></thead><tbody>${tools.filter(t=>t.quarterStatus==='In FI'||t.quarterStatus==='Shipped').map(t=>`<tr data-sh21="${esc(t.id)}"><td><b>${esc(t.id)}</b></td><td>${fmt(t.ship)}</td><td>${esc(t.codename)}</td><td><input class="sh21-sub" type="date" value="${esc(t.schedule.subsystems)}"></td><td><input class="sh21-acc" type="date" value="${esc(t.schedule.accessories)}"></td><td><input class="sh21-cab" type="date" value="${esc(t.schedule.cables)}"></td><td><input class="sh21-mat" type="date" value="${esc(t.schedule.mat)}"><small>${t.codename==='Regera'||t.codename==='Celestiq'?'MAT Installed':'MAT Handoff'}</small></td><td><input class="sh21-is" type="date" value="${esc(t.schedule.is)}"></td><td><input class="sh21-note" value="${esc(t.schedule.notes||'')}"></td></tr>`).join('')}</tbody></table></div><div class="actions"><button id="saveShipping21" class="btn primary">Save Packing Schedule</button></div></div>`}

function priorityOptions21(v){return ['Critical','High','Normal','Low','Info'].map(x=>`<option ${v===x?'selected':''}>${x}</option>`).join('')}
function statusOptions21(v){return ['Open','In Progress','Waiting','Blocked','Completed'].map(x=>`<option ${v===x?'selected':''}>${x}</option>`).join('')}
workspace=function(tab='tasks'){
  syncWorkspaceFromTools();state.workspaceTasks.sort((a,b)=>(V0210_PRIORITY[b.priority]||0)-(V0210_PRIORITY[a.priority]||0)||(a.due||'9999').localeCompare(b.due||'9999')||(a.tickerOrder||999)-(b.tickerOrder||999));
  app.innerHTML=`<div class="panel"><div class="workspace-tabs"><button class="btn ${tab==='tasks'?'primary':''}" data-worktab="tasks">Action Center</button><button class="btn ${tab==='reference'?'primary':''}" data-worktab="reference">Reference</button></div>${tab==='tasks'?`<h3>Lead Workspace / Action Center</h3><p class="helper">One shared task engine for manager requests, Morning Meeting actions, Tool follow-ups and lead work. Priority controls both sorting and visual urgency.</p><div class="workspace-quick v21-task-create"><input id="ws-new-title" placeholder="Task"><input id="ws-new-assignee" placeholder="Assigned lead"><select id="ws-new-tool"><option value="">General / No Tool</option>${current().map(t=>`<option value="${esc(t.id)}">${esc(t.id)} · ${esc(t.codename)}</option>`).join('')}</select><select id="ws-new-priority">${priorityOptions21('Normal')}</select><input id="ws-new-due" type="date"><button id="ws-add" class="btn primary">+ Add Task</button></div><div class="workspace-list v21-task-list">${state.workspaceTasks.map(task=>`<div class="workspace-task v21-task ${V0210_PRIORITY_CLASS[task.priority]||'normal'} ${task.status==='Completed'?'complete':''}" data-wstask="${esc(task.id)}"><div class="task-priority-rail"></div><select class="ws-priority">${priorityOptions21(task.priority)}</select><select class="ws-status">${statusOptions21(task.status)}</select><div class="task-main"><b>${esc(task.title)}</b><div class="gray">${task.toolId?`Tool ${esc(task.toolId)}`:'General'}${task.assignee?` · ${esc(task.assignee)}`:''}${task.source?` · ${esc(task.source)}`:''}</div></div><input class="ws-assignee" value="${esc(task.assignee)}" placeholder="Lead"><input class="ws-due" type="date" value="${esc(task.due)}"><label class="ticker-check"><input class="ws-ticker" type="checkbox" ${task.showTicker?'checked':''}> Ticker</label><input class="ws-ticker-order" type="number" min="1" value="${task.tickerOrder||1}" title="Ticker order"><select class="ws-ticker-seconds"><option value="5" ${task.tickerSeconds===5?'selected':''}>5s</option><option value="8" ${task.tickerSeconds===8?'selected':''}>8s</option><option value="10" ${task.tickerSeconds===10?'selected':''}>10s</option><option value="15" ${task.tickerSeconds===15?'selected':''}>15s</option><option value="30" ${task.tickerSeconds===30?'selected':''}>30s</option></select><button class="btn small danger ws-delete">Delete</button></div>`).join('')||'<div class="notice">No action-center tasks yet.</div>'}</div>`:`<h3>Reference</h3><p class="helper">Reference content remains unchanged from v1.0.1.</p><div class="notice">Use the existing Reference tab in the prior build while this workflow test focuses on operational actions.</div>`}</div>`;
  document.querySelectorAll('[data-worktab]').forEach(b=>b.onclick=()=>workspace(b.dataset.worktab));
  if(tab==='tasks'){
    $('#ws-add').onclick=()=>{let title=$('#ws-new-title').value.trim();if(!title)return;state.workspaceTasks.unshift({id:'w'+Date.now(),title,status:'Open',toolId:$('#ws-new-tool').value,leadTaskId:'',priority:$('#ws-new-priority').value,assignee:$('#ws-new-assignee').value.trim(),due:$('#ws-new-due').value,notes:'',source:'Lead Workspace',showTicker:true,tickerOrder:1,tickerSeconds:8});state.workspaceTasks.forEach((x,i)=>x.tickerOrder=i+1);save();workspace('tasks')};
    document.querySelectorAll('[data-wstask]').forEach(row=>{let task=state.workspaceTasks.find(x=>x.id===row.dataset.wstask);let saveRow=()=>{task.priority=row.querySelector('.ws-priority').value;task.status=row.querySelector('.ws-status').value;task.assignee=row.querySelector('.ws-assignee').value.trim();task.due=row.querySelector('.ws-due').value;task.showTicker=row.querySelector('.ws-ticker').checked;task.tickerOrder=Number(row.querySelector('.ws-ticker-order').value)||1;task.tickerSeconds=Number(row.querySelector('.ws-ticker-seconds').value)||8;applyWorkspaceLink(task);save();restartOpsTicker()};row.querySelectorAll('select,input').forEach(x=>x.onchange=saveRow);row.querySelector('.ws-delete').onclick=()=>{state.workspaceTasks=state.workspaceTasks.filter(x=>x.id!==task.id);save();workspace('tasks')}})
  }
  actions([{label:'Morning Status',fn:()=>setView('meeting')},{label:'Tools',fn:()=>setView('systems')}],false)
};

function requirementChip(t){let a=[];if(t.sourceRequired==='Yes')a.push(`<span class="phase-chip source">SOURCE: ${esc(t.sourceStatus)}</span>`);if(t.strRequired==='Yes')a.push(`<span class="phase-chip str">STR: ${esc(t.strStatus)}</span>`);return a.join(' ')}
systems=function(){
  let groups={};pageTools('systems').forEach(t=>(groups[t.codename]??=[]).push(t));
  app.innerHTML=`${Object.entries(groups).sort((a,b)=>a[0].localeCompare(b[0])).map(([name,arr])=>`<section class="tool-section"><div class="tool-section-head"><h2 class="tool-section-title">${esc(name)}</h2><span class="tool-section-count">${arr.length} tool${arr.length===1?'':'s'}</span></div><div class="system-grid">${arr.sort((a,b)=>serialKey(a.id)-serialKey(b.id)).map(t=>{let rc=routeCounts(t),lc=leadCounts(t),status=t.quarterStatus,pack=packingActive(t);return `<div class="system-card ${status==='Shipped'?'shipped-card':status==='Waiting for FI'?'waiting-card':'infi-card'}" data-tool="${esc(t.id)}"><div class="system-head"><div><div class="system-id">${esc(t.id)}</div><div class="gray">${esc(t.model)} · ${esc(t.customer)}</div></div>${status==='Shipped'?'<span class="complete-mark"><span class="check">✓</span> SHIPPED</span>':`<span class="state-chip ${qState(t)}">${pack?'200 PACKING':status==='Waiting for FI'?'WAITING FOR FI':'IN FI'}</span>`}</div><div class="card-chip-row">${latestChangeBadge(t)} ${requirementChip(t)}</div><div class="progress-row"><div class="progress-label"><span>FI TESTING</span><b>${routeProgress(t)}%</b></div><div class="track"><div class="fill" style="width:${routeProgress(t)}%"></div></div><div class="card-progress-meta"><span>${rc.done} complete</span><span>${rc.total} applicable through 190</span></div></div>${pack?`<div class="progress-row packing-progress"><div class="progress-label"><span>PACKING / SHIPPING</span><b>${packingProgress(t)}%</b></div><div class="track"><div class="fill packing-fill" style="width:${packingProgress(t)}%"></div></div><div class="milestone-mini">${packingMilestones(t).map(m=>`<span class="${milestoneTone(m,t)}">${t.schedule.done[m.key]?'✓':'○'} ${esc(m.label)}</span>`).join('')}</div></div>`:''}<div class="progress-row"><div class="progress-label"><span>LEAD / ADMIN</span><b>${adminProgress(t)}%</b></div><div class="track"><div class="fill admin" style="width:${adminProgress(t)}%"></div></div><div class="card-progress-meta"><span>${lc.done} complete</span><span>${lc.total} applicable</span></div></div><div class="card-meta"><div><span>Assignment</span><strong>${esc(t.driver)}</strong></div><div><span>Location</span><strong>${esc(t.room)}${t.bay?' / '+esc(t.bay):''}</strong></div><div><span>Current Phase</span><strong>${currentPhase(t)}</strong></div><div><span>MFG Ship</span><strong>${fmt(t.ship)}</strong></div></div></div>`}).join('')}</div></section>`).join('')}`;
  document.querySelectorAll('[data-tool]').forEach(x=>x.onclick=()=>toolStatus(x.dataset.tool));actions([{label:'Add Tool',primary:true,fn:()=>toolAdmin()},{label:'Administration',fn:()=>setView('admin')}],false)
};

function historyHtml(t){return (t.changeHistory||[]).slice(0,8).map(c=>`<div class="change-history-row"><b>${esc(c.type)}</b><span>${esc(c.field)}: <s>${esc(c.oldValue||'—')}</s> → <strong>${esc(c.newValue||'—')}</strong></span><small>${new Date(c.date).toLocaleString()}${c.reason?' · '+esc(c.reason):''}</small></div>`).join('')||'<span class="gray">No recorded plan changes.</span>'}
function nextPackingHandoff(t){return packingMilestones(t).find(m=>!t.schedule.done[m.key])}
function saveRequirementPanel(t){
  t.sourceRequired=$('#req-source').value;t.sourceStatus=$('#req-source-status').value;t.sourceHandoff=$('#req-source-handoff').value;t.sourceStart=$('#req-source-start').value;t.sourceComplete=$('#req-source-complete').value;
  t.strRequired=$('#req-str').value;t.strStatus=$('#req-str-status').value;t.strDue=$('#req-str-due').value;t.strNotes=$('#req-str-notes').value;applyRequirementApplicability(t,false);save();toolStatus(t.id)
}
toolStatus=function(id){
  let t=tools.find(x=>x.id===id);if(!t)return;selectedId=id;document.body.dataset.theme='systems';let rc=routeCounts(t),lc=leadCounts(t),pack=packingActive(t),next=nextPackingHandoff(t);
  app.innerHTML=page(`${esc(t.id)} · ${esc(t.model)}`,`${esc(t.codename)} · ${esc(t.customer)} · ${esc(t.room)}`,'INDIVIDUAL TOOL STATUS')+`<div class="report-screen">${reportHeader(`${t.id} TOOL STATUS`,`${t.model} · ${t.codename} · ${t.customer}`)}<div class="metric-grid"><div class="metric"><span>MFG Ship Date</span><strong style="font-size:20px">${fmt(t.ship)}</strong>${latestChangeBadge(t)}</div><div class="metric"><span>Current Phase</span><strong style="font-size:18px">${currentPhase(t)}</strong><small>${pack?'200 route is managed by Shipping Schedule':esc(t.checklist)}</small></div><div class="metric"><span>FI Testing</span><strong>${routeProgress(t)}%</strong><small>${rc.done}/${rc.total} through 190</small></div>${pack?`<div class="metric"><span>Packing / Shipping</span><strong>${packingProgress(t)}%</strong><small>${next?`Next: ${esc(next.label)} · ${fmt(next.date)}`:'All handoffs complete'}</small></div>`:''}<div class="metric"><span>Lead / Admin</span><strong>${adminProgress(t)}%</strong><small>${lc.done}/${lc.total} applicable</small></div></div>
  ${pack?`<div class="packing-banner"><div><span class="eyebrow">HIDDEN PROGRESS CAPTURED</span><h3>200 PACKING ACTIVE</h3><p>FI testing is complete. Operational packing progress is now driven by the Shipping Schedule, not by individual 200 checklists.</p></div><button id="viewShippingForTool" class="btn primary">View Shipping Schedule for ${esc(t.id)}</button></div>`:''}
  <div class="tool-status-grid"><div class="tool-status-block"><h3>Tool Information</h3>${kv('Product Family',t.family)}${kv('Code Name',t.codename)}${kv('Model',t.model)}${kv('UTID',t.id)}${kv('Sales Order',t.so)}${kv('Customer',t.customer)}${kv('Cleanroom',t.room)}${kv('Bay',t.bay)}${kv('Tool Assignment',t.driver)}${kv('SW Version',t.sw)}${kv('Lamp Hours',String(t.lamp||0))}</div><div class="tool-status-block"><h3>FI Status / Issues</h3>${kv('Current Checklist',pack?'200 — Packing':`${t.checklist} — ${checkName(t)}`)}<div class="kv multiline-kv"><span>Latest Status</span>${statusHtml(t.activity)}</div>${kv('POA',t.poa)}${kv('Open NCs',t.ncs.map(n=>n.id+' '+n.state).join(', ')||'None')}</div><div class="tool-status-block"><h3>Customer Requirements</h3><div class="requirement-form"><label>Customer Source Required<select id="req-source"><option ${t.sourceRequired==='TBD'?'selected':''}>TBD</option><option ${t.sourceRequired==='Yes'?'selected':''}>Yes</option><option ${t.sourceRequired==='No'?'selected':''}>No</option></select></label><label>Source Status<select id="req-source-status">${['Not Started','Preparing','Pre-Source In Progress','Ready for CA','With CA Team','Source Complete','Returned to FI'].map(x=>`<option ${t.sourceStatus===x?'selected':''}>${x}</option>`).join('')}</select></label><label>CA Handoff<input id="req-source-handoff" type="date" value="${esc(t.sourceHandoff)}"></label><label>Source Start<input id="req-source-start" type="date" value="${esc(t.sourceStart)}"></label><label>Source Complete<input id="req-source-complete" type="date" value="${esc(t.sourceComplete)}"></label><label>STR Required<select id="req-str"><option ${t.strRequired==='TBD'?'selected':''}>TBD</option><option ${t.strRequired==='Yes'?'selected':''}>Yes</option><option ${t.strRequired==='No'?'selected':''}>No</option></select></label><label>STR Status<select id="req-str-status">${['Not Started','Requirements Pending','Requirements Received','Testing','Submitted to CA','Customer Approval Pending','Complete'].map(x=>`<option ${t.strStatus===x?'selected':''}>${x}</option>`).join('')}</select></label><label>STR Due Before<input id="req-str-due" type="date" value="${esc(t.strDue)}"></label><label class="wide">STR Notes<textarea id="req-str-notes">${esc(t.strNotes)}</textarea></label><button id="saveRequirements" class="btn primary">Save Customer Requirements</button></div></div></div>
  <div class="panel"><h3>Tool Plan Change History</h3>${historyHtml(t)}</div><div class="progress-board"><div class="progress-panel"><h3>FI Testing Route · ${rc.done}/${rc.total} Complete through 190</h3>${routeWorkflow(t)}</div><div class="progress-panel"><h3>Lead / Admin Workflow · ${lc.done}/${lc.total} Complete</h3>${leadWorkflow(t,false)}</div></div></div>`;
  if($('#saveRequirements'))$('#saveRequirements').onclick=()=>saveRequirementPanel(t);if($('#viewShippingForTool'))$('#viewShippingForTool').onclick=()=>{state.shippingFocus=t.id;save();setView('shipping');setTimeout(()=>document.querySelector(`[data-pack-tool="${CSS.escape(t.id)}"]`)?.scrollIntoView({behavior:'smooth',block:'center'}),100)};
  actions([{label:'Edit This Tool',primary:true,fn:()=>toolAdmin(t.id)},{label:'Customer Requirements',fn:()=>setView('customer')},{label:'Back to Tools',fn:()=>setView('systems')}])
};

function handoffSummary(t,m){let tone=milestoneTone(m,t);return `<div class="handoff-cell ${tone}"><label><input class="pack-done" data-pack="${esc(t.id)}" data-key="${m.key}" type="checkbox" ${t.schedule.done[m.key]?'checked':''}><span>${t.schedule.done[m.key]?'DELIVERED':tone==='today'?'DUE TODAY':tone==='overdue'?'OVERDUE':tone==='upcoming'?'UPCOMING':'UNSCHEDULED'}</span></label><b>${esc(m.label)}</b><small>${fmt(m.date)}</small></div>`}
shipping=function(){
  let a=pageTools('shipping').filter(t=>t.quarterStatus==='In FI'||t.quarterStatus==='Shipped');
  let packing=a.filter(packingActive),today=[];
  packing.forEach(t=>packingMilestones(t).forEach(m=>{if(!t.schedule.done[m.key]&&m.date===v0210Today())today.push({t,m})}));
  let todayHtml=today.length?`<div class="panel today-handoffs"><h3>Today's Packing Priorities</h3>${today.map(x=>`<div><b>${esc(x.t.id)}</b><span>${esc(x.m.label)}</span><strong>DUE TODAY</strong></div>`).join('')}</div>`:'';
  let packHtml=packing.map(t=>{
    let focus=state.shippingFocus===t.id?'focus':'';
    return `<section class="packing-tool-card ${focus}" data-pack-tool="${esc(t.id)}"><div class="packing-tool-head"><div><h3>${esc(t.id)} · ${esc(t.codename)} ${esc(t.model)}</h3><span>${esc(t.customer)} · MFG Ship ${fmt(t.ship)}</span></div><div class="packing-percent"><strong>${packingProgress(t)}%</strong><span>PACKING</span></div></div><div class="track"><div class="fill packing-fill" style="width:${packingProgress(t)}%"></div></div><div class="handoff-grid">${packingMilestones(t).map(m=>handoffSummary(t,m)).join('')}</div><div class="packing-note">${esc(t.schedule.notes||'')}</div></section>`;
  }).join('');
  if(!packHtml)packHtml='<div class="notice">No systems have entered 200 Packing yet. When FI testing reaches 100%, the tool will appear here automatically.</div>';
  let overdue=packing.reduce((n,t)=>n+packingMilestones(t).filter(m=>milestoneTone(m,t)==='overdue').length,0);
  app.innerHTML=page('Shipping Schedule','Packing is managed by physical handoff milestones. The 200 checklists remain required, but are no longer used as the operational packing-progress measure.','PACKING & SHIPPING CONTROL')+
    `<div class="report-screen">${reportHeader('B7 FI PACKING & SHIPPING CONTROL')}<div class="packing-summary-grid"><div class="metric"><span>Packing Now</span><strong>${packing.length}</strong></div><div class="metric"><span>Due Today</span><strong>${today.length}</strong></div><div class="metric"><span>Overdue</span><strong>${overdue}</strong></div></div>${todayHtml}${packHtml}</div>`;
  document.querySelectorAll('.pack-done').forEach(c=>c.onchange=()=>{let t=tools.find(x=>x.id===c.dataset.pack);if(!t)return;t.schedule.done[c.dataset.key]=c.checked;save();shipping()});
  actions([{label:'Edit Shipping Schedules',primary:true,fn:()=>admin('shipping')},{label:'Tools',fn:()=>setView('systems')},{label:'Administration',fn:()=>setView('admin')}])
};

function customerRequirements(){
  let a=tools.filter(t=>t.quarterStatus==='In FI'&&(t.sourceRequired==='Yes'||t.strRequired==='Yes'||t.sourceRequired==='TBD'||t.strRequired==='TBD'));
  let cards=a.map(t=>{
    let sourceClass=t.sourceRequired==='Yes'?'req-on':(t.sourceRequired==='No'?'req-na':'req-tbd');
    let strClass=t.strRequired==='Yes'?'req-on':(t.strRequired==='No'?'req-na':'req-tbd');
    let sourceDetail=t.sourceRequired==='Yes'?t.sourceStatus:(t.sourceRequired==='No'?'N/A':'Verify requirement');
    let strDetail=t.strRequired==='Yes'?t.strStatus:(t.strRequired==='No'?'N/A':'Verify requirement');
    return `<div class="customer-req-card" data-cust-tool="${esc(t.id)}"><div class="customer-req-head"><b>${esc(t.id)}</b><span>${esc(t.customer)} · ${esc(t.model)}</span></div><div class="req-columns"><div><span>Customer Source</span><strong class="${sourceClass}">${esc(t.sourceRequired)}</strong><small>${esc(sourceDetail)}</small></div><div><span>STR Testing</span><strong class="${strClass}">${esc(t.strRequired)}</strong><small>${esc(strDetail)}</small></div></div><button class="btn small open-customer-tool" data-id="${esc(t.id)}">Open Tool</button></div>`;
  }).join('');
  if(!cards)cards='<div class="notice">No active tools currently have customer-specific requirements.</div>';
  app.innerHTML=page('Customer Requirements','Customer-dependent Source and STR workflows are tracked separately from normal FI checklist progress.','CUSTOMER / CA WORKFLOWS')+`<div class="report-screen">${reportHeader('CUSTOMER REQUIREMENTS')}<div class="customer-req-grid">${cards}</div></div>`;
  document.querySelectorAll('.open-customer-tool').forEach(b=>b.onclick=()=>toolStatus(b.dataset.id));
  actions([{label:'Tools',fn:()=>setView('systems')},{label:'Lead Workspace',fn:()=>setView('workspace')}])
}

function currentQuarterMembership(t){return quarterFromDate(t.ship)||t.quarter}
function quarterMovementStats(q){let active=tools.filter(t=>t.quarterStatus!=='Archive'),orig=active.filter(t=>(t.originalQuarter||t.quarter)===q),curr=active.filter(t=>currentQuarterMembership(t)===q),pulled=active.filter(t=>(t.originalQuarter||t.quarter)!==q&&currentQuarterMembership(t)===q),pushed=active.filter(t=>(t.originalQuarter||t.quarter)===q&&currentQuarterMembership(t)!==q);return{orig,curr,pulled,pushed}}
countdown=function(){let q=calendarQuarter(),s=quarterMovementStats(q),sh=s.curr.filter(t=>t.quarterStatus==='Shipped').length,need=s.curr.length-sh;app.innerHTML=page('Quarter Tool Shipping Countdown','The current-quarter commitment changes automatically when MFG ship dates move across quarter boundaries. Tools remain active in FI even when removed from the current-quarter commitment.','QUARTER PLAN')+`<div class="report-screen">${reportHeader(`${q} TOOL SHIPPING COUNTDOWN`)}<div class="overall-countdown v21-countdown"><div class="overall-box"><div class="label">Original Plan</div><span class="number">${s.orig.length}</span></div><div class="overall-box"><div class="label">Current Plan</div><span class="number">${s.curr.length}</span></div><div class="overall-box need"><div class="label">Need to Ship</div><span class="number">${need}</span></div><div class="overall-box shipped"><div class="label">Shipped</div><span class="number">${sh}</span></div><div class="overall-box pull"><div class="label">Pulled Into ${q}</div><span class="number">${s.pulled.length}</span></div><div class="overall-box push"><div class="label">Pushed Out</div><span class="number">${s.pushed.length}</span></div></div><div class="quarter-progress"><div class="progress-label"><span>Current Quarter Shipping Progress</span><b>${pct(sh,s.curr.length)}% Shipped</b></div><div class="track"><div class="fill" style="width:${pct(sh,s.curr.length)}%;background:var(--good)"></div></div></div><section class="panel"><h3>Current ${q} Commitment</h3><div class="countdown-card-grid">${s.curr.sort((a,b)=>(a.ship||'9').localeCompare(b.ship||'9')).map(t=>`<div class="countdown-card ${qState(t)}"><div class="cc-head"><div><div class="cc-id">${esc(t.id)}</div><b>${esc(t.model)}</b><div class="gray">${esc(t.customer)}</div></div>${latestChangeBadge(t)}</div><div class="cc-meta"><div><span>MFG Ship Date</span><b>${fmt(t.ship)}</b>${t.originalShip&&t.originalShip!==t.ship?`<small>Original: ${fmt(t.originalShip)}</small>`:''}</div><div><span>Status</span><b>${esc(t.quarterStatus)}</b></div></div></div>`).join('')||'<div class="notice">No tools currently committed to this quarter.</div>'}</div></section>${s.pushed.length?`<section class="panel movement-panel"><h3>Still in FI — Pushed Out of ${q}</h3>${s.pushed.map(t=>`<div class="movement-row"><b>${esc(t.id)}</b><span>${fmt(t.originalShip)} → ${fmt(t.ship)}</span><strong>Now ${currentQuarterMembership(t)}</strong></div>`).join('')}</section>`:''}</div>`;actions([{label:'Edit Tool Countdown',primary:true,fn:()=>admin('countdown')},{label:'Tools',fn:()=>setView('systems')},{label:'Administration',fn:()=>setView('admin')}])}

const legacyCountdownAdmin=countdownAdmin,legacyWireAdmin=wireAdmin;
countdownAdmin=function(){return `<div class="panel"><h3>Quarter Tool Shipping Countdown Admin · Change History Enabled</h3><p class="helper">Update the current values. The Command Center preserves the old Ship Date, Customer and Sales Order and automatically records Pull-In / Push-Out / quarter movement.</p><div class="table-wrap"><table class="report-table compact-form-table countdown-admin-table"><thead><tr><th>UTID</th><th>Code Name</th><th>Customer</th><th>Sales Order</th><th>Current MFG Ship</th><th>Original MFG Ship</th><th>Current Quarter</th><th>Reason / Notes</th><th>Status</th></tr></thead><tbody>${tools.map(t=>`<tr data-cd21="${esc(t.id)}"><td><b>${esc(t.id)}</b></td><td>${esc(t.codename)}</td><td><input class="cd21-customer" value="${esc(t.customer)}"></td><td><input class="cd21-so" value="${esc(t.so)}"></td><td><input class="cd21-ship" type="date" value="${esc(t.ship)}"></td><td>${fmt(t.originalShip)}</td><td><b>${esc(currentQuarterMembership(t)||t.quarter)}</b></td><td><input class="cd21-reason" placeholder="Customer request / plan change / etc."></td><td>${lifecycleSelect(t,'cd21-status')}</td></tr>`).join('')}</tbody></table></div><div class="actions"><button id="saveCountdown21" class="btn primary">Save Changes + Record History</button></div></div>`}
wireAdmin=function(s){
  if(s==='countdown'){
    if($('#saveCountdown21'))$('#saveCountdown21').onclick=()=>{document.querySelectorAll('[data-cd21]').forEach(r=>{let t=tools.find(x=>x.id===r.dataset.cd21);if(!t)return;let reason=r.querySelector('.cd21-reason').value.trim(),newShip=r.querySelector('.cd21-ship').value,newCust=r.querySelector('.cd21-customer').value,newSO=r.querySelector('.cd21-so').value;recordChange(t,'Ship Date',t.ship,newShip,reason);recordChange(t,'Customer',t.customer,newCust,reason);recordChange(t,'Sales Order',t.so,newSO,reason);t.ship=newShip;t.customer=newCust;t.so=newSO;t.quarter=quarterFromDate(newShip)||t.quarter;t.quarterStatus=r.querySelector('.cd21-status').value});save();setView('countdown')};return
  }
  if(s==='shipping'){
    if($('#saveShipping21'))$('#saveShipping21').onclick=()=>{document.querySelectorAll('[data-sh21]').forEach(r=>{let t=tools.find(x=>x.id===r.dataset.sh21);if(!t)return;t.schedule.subsystems=r.querySelector('.sh21-sub').value;t.schedule.accessories=r.querySelector('.sh21-acc').value;t.schedule.cables=r.querySelector('.sh21-cab').value;t.schedule.mat=r.querySelector('.sh21-mat').value;t.schedule.is=r.querySelector('.sh21-is').value;t.schedule.notes=r.querySelector('.sh21-note').value;t.schedule.publish='Published';t.schedule.status='Updated'});save();setView('shipping')};return
  }
  return legacyWireAdmin(s)
};

function operationalAlerts21(){
  let taskAlerts=(state.workspaceTasks||[]).filter(x=>x.status!=='Completed'&&x.showTicker).sort((a,b)=>(a.tickerOrder||999)-(b.tickerOrder||999)||(V0210_PRIORITY[b.priority]||0)-(V0210_PRIORITY[a.priority]||0)).map(x=>({priority:V0210_PRIORITY[x.priority]||3,priorityName:x.priority||'Normal',duration:(x.tickerSeconds||8)*1000,text:`${x.priority?.toUpperCase()||'TASK'} · ${x.toolId?'TOOL '+x.toolId:'GENERAL'} — ${x.title}${x.due?' · DUE '+fmt(x.due):''}`}));
  let system=[];current().forEach(t=>{let escalated=(t.ncs||[]).filter(n=>isEscalatedNc(n));escalated.forEach(n=>system.push({priority:5,priorityName:'Critical',duration:10000,text:`TOOL ${t.id} — Escalated ${n.id||'NC'}${n.days?` · Day ${n.days}`:''}` }));if(t.strRequired==='Yes'&&t.strStatus!=='Complete'&&t.strDue)system.push({priority:4,priorityName:'High',duration:10000,text:`TOOL ${t.id} — STR ${t.strStatus} · Due ${fmt(t.strDue)}`})});return [...taskAlerts,...system].slice(0,120)
}
operationalAlerts=operationalAlerts21;
let v21OpsTimer=null,v21TickerIndex=0;
updateOperationsBar=function(){let bar=$('#operationsBar');if(!bar)return;let alerts=operationalAlerts21(),open=(state.workspaceTasks||[]).filter(x=>x.status!=='Completed').length;$('#opsTaskCount').textContent=`${open} open task${open===1?'':'s'} · ${alerts.length} ticker items`;let tx=$('#opsTickerText');if(tx){if(!alerts.length){tx.textContent='No active priority tasks';bar.dataset.priority='none'}else{v21TickerIndex%=alerts.length;let a=alerts[v21TickerIndex];tx.textContent=a.text;bar.dataset.priority=(a.priorityName||'Normal').toLowerCase()}}}
function restartOpsTicker(){if(v21OpsTimer)clearTimeout(v21OpsTimer);updateOperationsBar();let alerts=operationalAlerts21();if(!alerts.length)return;let a=alerts[v21TickerIndex%alerts.length],ms=Math.max(3000,a.duration||8000);v21OpsTimer=setTimeout(()=>{v21TickerIndex=(v21TickerIndex+1)%Math.max(1,operationalAlerts21().length);restartOpsTicker()},ms)}

const legacyRender=render;
render=function(){renderEditControls();setTimeout(enhanceDateInputs,0);setTimeout(updateOperationsBar,0);if(view==='countdown')countdown();else if(view==='shipping')shipping();else if(view==='daily')daily();else if(view==='meeting')morning();else if(view==='weekend')weekend();else if(view==='workspace')workspace();else if(view==='systems')systems();else if(view==='customer')customerRequirements();else if(view==='archive')archive();else if(view==='shared')sharedData();else admin()}

ensureV0210();restartOpsTicker();render();


/* ===== SOURCE: js/merge-compat-v0400.js ===== */
/*
 * B7 FI Command Center v1.0.3 Unified Master Compatibility Layer
 * ---------------------------------------------------------------
 * Functional baseline: v1.0.1 Weekend Operations Test
 * Visual / framework baseline: v1.0.1 Consolidated Test Build
 */
(function(){
  // Extend the page-theme framework to the v1.0.1 Customer Requirements page.
  try{ if(typeof V0300_PAGE_META!=='undefined') V0300_PAGE_META.customer=['CUSTOMER REQUIREMENTS','customer']; }catch(e){}

  // Stop the older workflow-only ticker timer. The v0.31 framework owns both
  // persistent bars: Action Center on top and Fleet Status at the bottom.
  try{ if(typeof v21OpsTimer!=='undefined'&&v21OpsTimer){clearTimeout(v21OpsTimer);v21OpsTimer=null;} }catch(e){}

  // Keep the v0.31 Action Center architecture while enriching Lead Workspace
  // actions with v1.0.1 priority / assignment / due-date semantics.
  const baseAlerts=(window.__B7_V31_FRAMEWORK__&&window.__B7_V31_FRAMEWORK__.v3Alerts)||
                   (typeof v3Alerts==='function'?v3Alerts:null);
  if(baseAlerts){
    v3Alerts=function(){
      let out=baseAlerts().filter(x=>x.source!=='workspace');
      const pmap={Critical:['red',12],High:['orange',9],Normal:['yellow',6],Low:['blue',3],Info:['blue',2]};
      const now=new Date();now.setHours(0,0,0,0);
      (state.workspaceTasks||[]).filter(x=>x.status!=='Completed').forEach(x=>{
        let [severity,priority]=pmap[x.priority]||pmap.Normal;
        if(x.due){let d=new Date(x.due+'T00:00:00');if(Number.isFinite(d.getTime())&&d<now){severity='red';priority=Math.max(priority,11)}}
        let detail=[];
        if(x.assignee)detail.push(`Owner ${x.assignee}`);
        if(x.due)detail.push(`Due ${typeof fmt==='function'?fmt(x.due):x.due}`);
        if(x.status)detail.push(x.status);
        out.push({severity,priority,text:`LEAD WORKSPACE · ${x.toolId?'TOOL '+x.toolId+' — ':'GENERAL — '}${x.title}${detail.length?' · '+detail.join(' · '):''}`,view:'workspace',id:'workspace:'+x.id,source:'workspace'});
      });
      // Surface customer-dependent workflows from v1.0.1 when they require attention.
      tools.filter(t=>t.quarterStatus!=='Shipped'&&t.quarterStatus!=='Archive').forEach(t=>{
        if(t.sourceRequired==='Yes'&&t.sourceStatus&&t.sourceStatus!=='Complete'&&t.sourceStatus!=='Completed')
          out.push({severity:'yellow',priority:5,text:`TOOL ${t.id} — CUSTOMER SOURCE · ${t.sourceStatus}`,toolId:t.id,tab:'basic',source:'customer'});
        if(t.strRequired==='Yes'&&t.strStatus&&t.strStatus!=='Complete'&&t.strStatus!=='Completed')
          out.push({severity:'orange',priority:8,text:`TOOL ${t.id} — STR · ${t.strStatus}${t.strDue?` · Due ${typeof fmt==='function'?fmt(t.strDue):t.strDue}`:''}`,toolId:t.id,tab:'basic',source:'str'});
      });
      const seen=new Set();
      return out.sort((a,b)=>(b.priority||0)-(a.priority||0)).filter(x=>{let k=x.id||x.text;if(seen.has(k))return false;seen.add(k);return true});
    };
  }

  // Restore v1.0.1's persistent-bar renderer. It uses the enriched v3Alerts
  // above and preserves Fleet Status rather than reverting to the old Lead/Admin footer ticker.
  if(window.__B7_V31_FRAMEWORK__&&window.__B7_V31_FRAMEWORK__.updateOperationsBar){
    updateOperationsBar=window.__B7_V31_FRAMEWORK__.updateOperationsBar;
  }

  // One render dispatcher for both branches.
  render=function(){
    if(typeof renderEditControls==='function')renderEditControls();
    if(typeof enhanceDateInputs==='function')setTimeout(enhanceDateInputs,0);
    setTimeout(()=>{try{updateOperationsBar()}catch(e){}},0);
    if(view==='countdown'){ if(typeof setHeaderContext==='function')setHeaderContext('TOOL COUNTDOWN',typeof calendarQuarter==='function'?calendarQuarter():''); countdown(); }
    else if(view==='shipping'){ if(typeof setHeaderContext==='function')setHeaderContext('SHIPPING SCHEDULE'); shipping(); }
    else if(view==='customer'){ if(typeof setHeaderContext==='function')setHeaderContext('CUSTOMER REQUIREMENTS','Customer Source · STR'); customerRequirements(); }
    else if(view==='daily'){ if(typeof setHeaderContext==='function')setHeaderContext('WEEKDAY PRIORITIES'); daily(); }
    else if(view==='meeting'){ if(typeof setHeaderContext==='function')setHeaderContext('MORNING STATUS'); morning(); }
    else if(view==='leads'){ leadsExtraPage(false); }
    else if(view==='weekend'){ if(typeof setHeaderContext==='function')setHeaderContext('WEEKEND PRIORITIES'); weekend(); }
    else if(view==='workspace'){ if(typeof setHeaderContext==='function')setHeaderContext('LEAD WORKSPACE'); workspace(); }
    else if(view==='systems'){ if(typeof setHeaderContext==='function')setHeaderContext('TOOLS'); systems(); }
    else if(view==='actions'){ actionCenter(); }
    else if(view==='wallboard'){ wallboardPage(); }
    else if(view==='references'){ referencesPage(); }
    else if(view==='archive'){ if(typeof setHeaderContext==='function')setHeaderContext('ARCHIVE'); archive(); }
    else if(view==='shared'){ if(typeof setHeaderContext==='function')setHeaderContext('SHARED DATA'); sharedData(); }
    else admin();
    try{document.getElementById('app').dataset.rendered='true'}catch(e){}
  };

  // Rebind navigation because v1.0.1 added Customer Requirements while the
  // v1.0.1 framework added Action Center / Wallboard / Reference Files / Leads Extra Status.
  document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>setView(b.dataset.view));

  // Unified version label.
  window.B7_UNIFIED_VERSION='1.0.3';
  try{
    state.appVersion='1.0.3';
    const el=document.getElementById('appVersionLabel');if(el)el.textContent='B7 FI Command Center v1.0.3';
    document.title='B7 FI Command Center v1.0.3';
  }catch(e){}

  try{updateOperationsBar()}catch(e){}
  render();
})();


/* ===== SOURCE: js/merge-fixes-v0410.js ===== */
/* B7 FI Command Center v1.0.3 — Unified QA Corrections */
(function(){
  const VERSION=window.B7_APP_VERSION||'1.0.3';

  function qOptions(selected){
    const now=calendarQuarter();
    const m=String(now).match(/^CY(\d{2})Q([1-4])$/);let arr=[];
    if(m){let y=Number(m[1]),q=Number(m[2]);for(let i=-2;i<=6;i++){let n=q+i,yy=y;while(n<1){n+=4;yy--}while(n>4){n-=4;yy++}arr.push(`CY${String(yy).padStart(2,'0')}Q${n}`)}}
    [selected,...tools.map(t=>t.quarter),...tools.map(t=>t.originalQuarter)].filter(Boolean).forEach(x=>arr.push(x));
    return [...new Set(arr)].map(x=>`<option value="${esc(x)}" ${x===selected?'selected':''}>${esc(x)}</option>`).join('');
  }

  // Explicit quarter selection is authoritative; ship date remains editable and can auto-suggest quarter.
  currentQuarterMembership=function(t){return t.quarter||quarterFromDate(t.ship)||''};

  function movementLabel(t,q){
    const oq=t.originalQuarter||quarterFromDate(t.originalShip)||'';const cq=currentQuarterMembership(t);
    if(oq!==q&&cq===q)return `<span class="change-chip pull">↑ PULLED IN</span>`;
    if(oq===q&&cq!==q)return `<span class="change-chip push">↓ PUSHED OUT</span>`;
    return latestChangeBadge(t)||'';
  }

function cardBadges42(t,q,pushed=false){
  const badges=[];
  const oq=t.originalQuarter||quarterFromDate(t.originalShip)||'';
  const cq=currentQuarterMembership(t);
  const movedShip=!!(t.originalShip&&t.ship&&t.originalShip!==t.ship);
  const customerChanged=!!(t.originalCustomer&&t.customer&&t.originalCustomer!==t.customer);
  const soChanged=!!(t.originalSO&&t.so&&t.originalSO!==t.so);
  const pulled=oq&&cq&&oq!==q&&cq===q;
  const pushedOut=oq===q&&cq&&cq!==q;
  const micro=(t.quarterStatus==='In FI'&&typeof microScheduleInfo==='function')?microScheduleInfo(t):null;

  if(String(t.process||'').toLowerCase().includes('reduced')) badges.push(['reduced','REDUCED PROCESS']);
  if(t.sourceRequired==='Yes') badges.push(['source','SOURCE REQUIRED']);
  if(t.strRequired==='Yes') badges.push(['str','STR REQUIRED']);
  if(typeof packingActive==='function'&&packingActive(t)) badges.push(['packing','PACKING ACTIVE']);
  if(movedShip) badges.push(['change','SHIP DATE CHANGED']);
  if(customerChanged) badges.push(['change','CUSTOMER CHANGED']);
  if(soChanged) badges.push(['change','SO CHANGED']);
  if(pulled) badges.push(['pull','PULLED IN']);
  if(pushed||pushedOut) badges.push(['push','PUSHED OUT']);
  if(micro){
    const label=String(micro.label||'').toUpperCase();
    if(micro.className==='behind') badges.push(['behind',label||'BEHIND']);
    else if(micro.className==='ahead') badges.push(['ahead',label||'AHEAD']);
    else if(micro.className==='on') badges.push(['on',label||'ON SCHEDULE']);
  }
  return badges.map(([c,l])=>`<span class="cc-badge ${c}">${esc(l)}</span>`).join('');
}

function countdownCard41(t,q,pushed=false){
  const oq=t.originalQuarter||quarterFromDate(t.originalShip)||'';
  const cq=currentQuarterMembership(t);
  const moved=(t.originalShip&&t.originalShip!==t.ship)||(oq&&cq&&oq!==cq);
  const isPacking=(typeof packingActive==='function'&&packingActive(t));
  const pulled=oq!==q&&cq===q;
  const micro=(t.quarterStatus==='In FI'&&typeof microScheduleInfo==='function')?microScheduleInfo(t):null;
  const fiPct=(typeof routeProgress==='function')?routeProgress(t):0;
  const phase=(typeof currentPhase==='function')?currentPhase(t):(isPacking?'200 PACKING':(t.quarterStatus||''));
  const badges=cardBadges42(t,q,pushed);
  return `<div class="countdown-card ${qState(t)} ${isPacking?'packing-tint':''} ${pulled?'pulled-card':''} ${pushed?'pushed-card':''}">
    <div class="cc-head">
      <div>
        <div class="cc-id">${esc(t.id)}</div>
        <b>${esc(t.model)}</b>
        <div class="gray">${esc(t.customer)}</div>
      </div>
      <div class="cc-status-stack">${movementLabel(t,q)}<span class="state-chip ${qState(t)}">${esc(t.quarterStatus||'')}</span></div>
    </div>
    <div class="cc-meta cc-meta-rich">
      <div><span>MFG Ship Date</span><b>${fmt(t.ship)}</b>${moved?`<small class="ship-move">${fmt(t.originalShip)} → ${fmt(t.ship)}</small>`:''}</div>
      <div><span>Sales Order</span><b>${esc(t.so||'N/A')}</b></div>
      <div><span>Current Phase</span><b>${esc(phase||'—')}</b></div>
      <div><span>Current Checklist</span><b>${esc(t.checklist||'—')}</b></div>
    </div>
    <div class="cc-progress-row">
      <div class="cc-progress-head"><span>FI Progress</span><b>${fiPct}%</b></div>
      <div class="cc-progress-track"><i style="width:${Math.max(0,Math.min(100,fiPct))}%"></i></div>
      ${micro?`<div class="cc-micro ${micro.className}">${esc(micro.label||'')}</div>`:''}
    </div>
    ${badges?`<div class="cc-badges">${badges}</div>`:''}
    ${moved?`<div class="quarter-movement-line"><span>Original ${esc(oq||'—')}</span><strong>${pushed?'PUSHED OUT →':'CURRENT →'} ${esc(cq||'—')}</strong></div>`:''}
  </div>`;
}
function familySummary41(name,arr,q){
    let waiting=arr.filter(t=>t.quarterStatus==='Waiting for FI').length,infi=arr.filter(t=>t.quarterStatus==='In FI').length,shipped=arr.filter(t=>t.quarterStatus==='Shipped').length;
    return `<section class="countdown-family"><div class="countdown-family-head"><h2>${esc(name)}</h2><div class="family-counts"><div><span>TOTAL</span><b>${arr.length}</b></div><div><span>WAITING FI</span><b>${waiting}</b></div><div><span>IN FI</span><b>${infi}</b></div><div><span>SHIPPED</span><b>${shipped}</b></div></div></div><div class="countdown-card-grid">${arr.sort((a,b)=>(a.ship||'9').localeCompare(b.ship||'9')||serialKey(a.id)-serialKey(b.id)).map(t=>countdownCard41(t,q,false)).join('')}</div></section>`;
  }
  countdown=function(){
    let q=calendarQuarter(),s=quarterMovementStats(q),sh=s.curr.filter(t=>t.quarterStatus==='Shipped').length,need=s.curr.length-sh,groups={};
    s.curr.forEach(t=>(groups[t.codename||'Other']??=[]).push(t));
    app.innerHTML=page('Quarter Tool Shipping Countdown','Quarter commitment, pull-in/push-out movement and tool-family status.','QUARTER PLAN')+`<div class="report-screen">${reportHeader(`${q} TOOL SHIPPING COUNTDOWN`)}
      <div class="overall-countdown v21-countdown"><div class="overall-box"><div class="label">Original Plan</div><span class="number">${s.orig.length}</span></div><div class="overall-box"><div class="label">Current Plan</div><span class="number">${s.curr.length}</span></div><div class="overall-box need"><div class="label">Need to Ship</div><span class="number">${need}</span></div><div class="overall-box shipped"><div class="label">Shipped</div><span class="number">${sh}</span></div><div class="overall-box pull"><div class="label">Pulled Into ${q}</div><span class="number">${s.pulled.length}</span></div><div class="overall-box push"><div class="label">Pushed Out</div><span class="number">${s.pushed.length}</span></div></div>
      <div class="quarter-progress"><div class="progress-label"><span>Current Quarter Shipping Progress</span><b>${pct(sh,s.curr.length)}% Shipped</b></div><div class="track"><div class="fill" style="width:${pct(sh,s.curr.length)}%;background:var(--good)"></div></div></div>
      <section class="panel"><h3>Current ${q} Commitment by Tool Type</h3>${Object.entries(groups).sort((a,b)=>a[0].localeCompare(b[0])).map(([name,arr])=>familySummary41(name,arr,q)).join('')||'<div class="notice">No tools currently committed to this quarter.</div>'}</section>
      ${s.pushed.length?`<section class="panel movement-panel"><h3>Still in FI — Pushed Out of ${q}</h3><p class="helper">These tools are no longer counted in the current-quarter commitment, but remain visible while still operationally relevant.</p><div class="countdown-card-grid pushed-grid">${s.pushed.sort((a,b)=>serialKey(a.id)-serialKey(b.id)).map(t=>countdownCard41(t,q,true)).join('')}</div></section>`:''}
    </div>`;
    actions([{label:'Edit Tool Countdown',primary:true,fn:()=>admin('countdown')},{label:'Tools',fn:()=>setView('systems')},{label:'Administration',fn:()=>setView('admin')}]);
  };

  countdownAdmin=function(){return `<div class="panel"><h3>Quarter Tool Shipping Countdown Admin · Change History Enabled</h3><p class="helper">Edit Current MFG Ship and Current Quarter. Ship-date changes automatically suggest the matching quarter, and you may override the quarter before saving. The Command Center records pull-in, push-out and ship-date history.</p><div class="table-wrap"><table class="report-table compact-form-table countdown-admin-table"><thead><tr><th>UTID</th><th>Code Name</th><th>Customer</th><th>Sales Order</th><th>Current MFG Ship</th><th>Original MFG Ship</th><th>Original Quarter</th><th>Current Quarter</th><th>Reason / Notes</th><th>Status</th></tr></thead><tbody>${tools.map(t=>`<tr data-cd41="${esc(t.id)}"><td><b>${esc(t.id)}</b></td><td>${esc(t.codename)}</td><td><input class="cd41-customer" value="${esc(t.customer)}"></td><td><input class="cd41-so" value="${esc(t.so)}"></td><td><input class="cd41-ship" type="date" value="${esc(t.ship)}"></td><td>${fmt(t.originalShip)}</td><td><b>${esc(t.originalQuarter||quarterFromDate(t.originalShip)||'—')}</b></td><td><select class="cd41-quarter">${qOptions(currentQuarterMembership(t))}</select></td><td><input class="cd41-reason" placeholder="Customer request / plan change / etc."></td><td>${lifecycleSelect(t,'cd41-status')}</td></tr>`).join('')}</tbody></table></div><div class="actions"><button id="saveCountdown41" class="btn primary">Save Changes + Record History</button></div></div>`};

  const wireAdminBefore41=wireAdmin;
  wireAdmin=function(s){
    if(s==='countdown'){
      document.querySelectorAll('[data-cd41]').forEach(r=>{let ship=r.querySelector('.cd41-ship'),q=r.querySelector('.cd41-quarter');if(ship)ship.onchange=()=>{let derived=quarterFromDate(ship.value);if(derived){if(![...q.options].some(o=>o.value===derived))q.insertAdjacentHTML('beforeend',`<option>${esc(derived)}</option>`);q.value=derived}}});
      if($('#saveCountdown41'))$('#saveCountdown41').onclick=()=>{document.querySelectorAll('[data-cd41]').forEach(r=>{let t=tools.find(x=>x.id===r.dataset.cd41);if(!t)return;let reason=r.querySelector('.cd41-reason').value.trim(),newShip=r.querySelector('.cd41-ship').value,newQ=r.querySelector('.cd41-quarter').value,newCust=r.querySelector('.cd41-customer').value,newSO=r.querySelector('.cd41-so').value,oldQ=currentQuarterMembership(t);recordChange(t,'Ship Date',t.ship,newShip,reason);recordChange(t,'Quarter',oldQ,newQ,reason);recordChange(t,'Customer',t.customer,newCust,reason);recordChange(t,'Sales Order',t.so,newSO,reason);if(oldQ!==newQ){t.changeHistory=t.changeHistory||[];t.changeHistory.unshift({date:new Date().toISOString(),type:newQ<oldQ?'PULL IN':'PUSH OUT',field:'Quarter',oldValue:oldQ,newValue:newQ,reason})}t.ship=newShip;t.quarter=newQ;t.customer=newCust;t.so=newSO;t.quarterStatus=r.querySelector('.cd41-status').value});save();setView('countdown')};return;
    }
    return wireAdminBefore41(s);
  };

  // Fleet schedule comparison only evaluates tools that are actually In FI.
  fleetStatusEntries=function(){return current().filter(t=>t.quarterStatus==='In FI').map(t=>{let m=microScheduleInfo(t),supp=activeSupplementals(t),suppText=supp.length?` · ${supp.map(s=>`${s.label.toUpperCase()} ${s.completedSteps||0}/${s.totalSteps||1}`).join(' + ')}`:'';return {toolId:t.id,className:m.className,text:`TOOL ${t.id} · ${t.checklist||'NO CHECKLIST'} · ${m.label}${suppText}`}})};
  updateOperationsBar=function(){
    let bar=document.getElementById('operationsBar');if(!bar)return;let fleet=fleetStatusEntries(),active=current().filter(t=>t.quarterStatus!=='Shipped').length;
    let sync=document.getElementById('opsSync');if(sync)sync.textContent=(state.shared?.mode==='sharepoint-direct-test'?'SharePoint reachable':'Local Production Mode · SharePoint live sync pending');
    let tx=document.getElementById('opsTickerText'),ticker=document.querySelector('.ops-ticker');if(tx){if(!fleet.length){tx.textContent='No tools currently In FI';if(ticker)ticker.className='ops-ticker fleet-on'}else{opsTickerIndex%=fleet.length;let x=fleet[opsTickerIndex];tx.textContent=x.text;if(ticker){ticker.className=`ops-ticker fleet-${x.className}`;ticker.onclick=()=>toolStatus(x.toolId);ticker.title=`Open Tool ${x.toolId}`}}}
    let counts={ahead:0,on:0,behind:0,unset:0};fleet.forEach(x=>{if(x.className==='ahead')counts.ahead++;else if(x.className==='behind')counts.behind++;else if(x.className==='on')counts.on++;else counts.unset++});
    let tc=document.getElementById('opsTaskCount');if(tc)tc.textContent=`${active} active tools · ${fleet.length} in FI · ${counts.behind} behind · ${counts.on} on schedule · ${counts.ahead} ahead`;
    let pr=document.getElementById('opsPresence');if(pr)pr.textContent=`${counts.unset} In-FI Micro Schedule target${counts.unset===1?'':'s'} not set`;
    renderTopActionBar();
  };

  function ncList41(t){let a=(t.ncs||[]).filter(n=>!['Closed','Waived'].includes(n.state));return a.length?`<div class="nc-display-list">${a.map(n=>`<div class="nc-display-row ${isEscalatedNc(n)?'escalated':''}"><b>${esc(n.id||'NC')}</b><span>${esc(n.state||'Open')}${n.days?` · Day ${n.days}`:''}</span><p>${esc(n.desc||'')}</p></div>`).join('')}</div>`:'<span class="gray">None</span>'}
  function customerReqInline41(t){return `<div class="tool-status-block customer-requirements-block"><h3>Customer Requirements</h3><div class="requirement-form"><label>Customer Source Required<select id="req-source"><option ${t.sourceRequired==='TBD'?'selected':''}>TBD</option><option ${t.sourceRequired==='Yes'?'selected':''}>Yes</option><option ${t.sourceRequired==='No'?'selected':''}>No</option></select></label><label>Source Status<select id="req-source-status">${['Not Started','Preparing','Pre-Source In Progress','Ready for CA','With CA Team','Source Complete','Returned to FI'].map(x=>`<option ${t.sourceStatus===x?'selected':''}>${x}</option>`).join('')}</select></label><label>CA Handoff<input id="req-source-handoff" type="date" value="${esc(t.sourceHandoff)}"></label><label>Source Start<input id="req-source-start" type="date" value="${esc(t.sourceStart)}"></label><label>Source Complete<input id="req-source-complete" type="date" value="${esc(t.sourceComplete)}"></label><label>STR Required<select id="req-str"><option ${t.strRequired==='TBD'?'selected':''}>TBD</option><option ${t.strRequired==='Yes'?'selected':''}>Yes</option><option ${t.strRequired==='No'?'selected':''}>No</option></select></label><label>STR Status<select id="req-str-status">${['Not Started','Requirements Pending','Requirements Received','Testing','Submitted to CA','Customer Approval Pending','Complete'].map(x=>`<option ${t.strStatus===x?'selected':''}>${x}</option>`).join('')}</select></label><label>STR Due Before<input id="req-str-due" type="date" value="${esc(t.strDue)}"></label><label class="wide">STR Notes<textarea id="req-str-notes">${esc(t.strNotes)}</textarea></label><button id="saveRequirements" class="btn primary">Save Customer Requirements</button></div></div>`}
  function shippingPlan41(t){let complete=t.quarterStatus==='Shipped'||packingMilestones(t).every(m=>t.schedule?.done?.[m.key]),next=nextPackingHandoff(t);return `<section class="shipping-detail-panel ${complete?'complete':''}"><div class="shipping-detail-head"><div><h3>Shipping Schedule / Packing</h3><p>${packingActive(t)?`200 PACKING ACTIVE${next?` · Next physical handoff: ${esc(next.label)} ${next.date?'· '+fmt(next.date):''}`:' · All physical handoffs complete'}`:'Physical handoff plan and packing status.'}</p></div><button id="openShipping41" class="btn primary">Open Shipping Schedule</button></div><div class="shipping-milestone-grid">${packingMilestones(t).map(m=>`<div class="shipping-milestone ${t.schedule?.done?.[m.key]?'done':''}"><span>${esc(m.label)}</span><b>${m.date?fmt(m.date):'N/A'}</b><small>${t.schedule?.done?.[m.key]?'✓ Complete':'○ Pending'}</small></div>`).join('')}</div>${t.schedule?.notes?`<div class="shipping-notes"><b>Shipping Notes</b><p>${esc(t.schedule.notes)}</p></div>`:''}</section>`}

  toolStatus=function(id){
    let t=tools.find(x=>x.id===id);if(!t)return;ensureV0305ToolState();selectedId=id;document.body.dataset.theme='systems';setHeaderContext(`TOOL ${t.id}`,`${t.codename} · ${t.model} · ${t.customer}`);let rc=routeCounts(t),lc=leadCounts(t),pack=packingActive(t),next=nextPackingHandoff(t),mi=microScheduleInfo(t),activeSupp=activeSupplementals(t);
    app.innerHTML=`<div class="report-screen">${reportHeader(`${t.id} TOOL STATUS`,`${t.model} · ${t.codename} · ${t.customer}`)}<div class="metric-grid"><div class="metric"><span>MFG Ship Date</span><strong style="font-size:20px">${fmt(t.ship)}</strong>${latestChangeBadge(t)}</div><div class="metric"><span>Current Phase</span><strong style="font-size:18px">${currentPhase(t)}</strong><small>${pack?'200 route managed by Shipping Schedule':esc(t.checklist)}</small></div><div class="metric"><span>FI Testing</span><strong>${routeProgress(t)}%</strong><small>${rc.done}/${rc.total} through 190</small></div><div class="metric"><span>Micro Schedule</span><strong>${mi.set?mi.plannedPct+'%':'—'}</strong><small>${esc(mi.label)}</small></div>${pack?`<div class="metric"><span>Packing / Shipping</span><strong>${packingProgress(t)}%</strong><small>${next?`Next: ${esc(next.label)}`:'All handoffs complete'}</small></div>`:''}<div class="metric"><span>Lead / Admin</span><strong>${adminProgress(t)}%</strong><small>${lc.done}/${lc.total} applicable</small></div>${activeSupp.length?`<div class="metric"><span>Supplemental</span><strong>${supplementalPct(t)}%</strong><small>${esc(supplementalSummary(t))}</small></div>`:''}</div>
      ${pack?`<div class="packing-banner"><div><span class="eyebrow">PACKING PHASE</span><h3>200 PACKING ACTIVE</h3><p>FI testing is complete. Operational packing progress is driven by physical Shipping Schedule handoffs.</p></div></div>`:''}
      <div class="tool-primary-grid"><div class="tool-status-block"><h3>Tool Information</h3>${kv('Product Family',t.family)}${kv('Code Name',t.codename)}${kv('Model',t.model)}${kv('UTID',t.id)}${kv('Sales Order',t.so)}${kv('Customer',t.customer)}${kv('Cleanroom',t.room)}${kv('Bay',t.bay)}${kv('Tool Assignment',t.driver)}${kv('SW Version',t.sw)}${kv('Lamp Hours',displayLamp(t))}</div><div class="tool-status-block fi-status-expanded"><h3>FI Status / Issues</h3>${kv('Current Checklist',pack?'200 — Packing':`${t.checklist} — ${checkName(t)}`)}<div class="status-large-block"><span>Latest Status</span>${statusHtml(t.activity)}</div><div class="status-large-block notes-large-block"><span>Notes</span><div>${esc(t.notes||'No notes entered.').replace(/\n/g,'<br>')}</div></div>${kv('POA',t.poa)}<div class="fi-nc-section"><span>Open / Escalated NCs</span>${ncList41(t)}</div></div></div>
      <div class="tool-secondary-grid">${microSchedulePanel(t)}${customerReqInline41(t)}</div>
      ${shippingPlan41(t)}
      <section class="panel tool-change-history"><h3>Tool Plan Change History</h3>${historyHtml(t)}</section>
      ${supplementalPanel(t)}
      <div class="progress-board"><div class="progress-panel"><h3>FI Testing Route · ${rc.done}/${rc.total} Complete through 190</h3>${routeWorkflow(t)}</div><div class="progress-panel"><h3>Lead / Admin Workflow · ${lc.done}/${lc.total} Complete</h3>${leadWorkflow(t,false)}</div></div></div>`;
    if($('#microTargetSave'))$('#microTargetSave').onclick=()=>{t.microTargetChecklist=$('#microTargetChecklist').value;t.microTargetUpdatedAt=new Date().toISOString();save();toolStatus(t.id)};
    if($('#saveRequirements'))$('#saveRequirements').onclick=()=>saveRequirementPanel(t);
    if($('#openShipping41'))$('#openShipping41').onclick=()=>{selectedId=t.id;setView('shipping');setTimeout(()=>{[...document.querySelectorAll('.shipping-plan')].find(x=>x.textContent.includes(t.id))?.scrollIntoView({behavior:'smooth',block:'center'})},100)};
    if($('#suppStart'))$('#suppStart').onclick=()=>{let cfg=state.supplementalConfig.find(x=>x.id===$('#suppType').value);if(!cfg)return;t.supplementals.push({id:'si'+Date.now(),typeId:cfg.id,label:cfg.label,status:'In Progress',completedSteps:0,totalSteps:cfg.defaultSteps||1,returnChecklist:t.checklist,startedAt:new Date().toISOString()});if(cfg.label==='Lamp Swap')t.lampState='OFF';save();toolStatus(t.id)};
    document.querySelectorAll('[data-supp]').forEach(row=>{row.querySelector('.supp-save').onclick=()=>{let i=Number(row.dataset.supp),s=t.supplementals[i];s.status=row.querySelector('.supp-state').value;s.completedSteps=Math.max(0,Number(row.querySelector('.supp-done').value)||0);if(s.status==='Complete'){s.completedSteps=s.totalSteps||1;s.completedAt=new Date().toISOString();t.supplementalHistory.push(clone(s));t.supplementals.splice(i,1)}save();toolStatus(t.id)}});
    actions([{label:'Edit This Tool',primary:true,fn:()=>toolAdmin(t.id)},{label:'Customer Requirements',fn:()=>setView('customer')},{label:'Back to Tools',fn:()=>setView('systems')},{label:'Screenshot Mode',fn:()=>toggleScreenshotMode?.()}]);
  };

  // Enlarge Latest Status and Notes editors wherever the universal Tool Admin basic tab is drawn.
  const toolAdminBefore41=toolAdmin;
  toolAdmin=function(id){toolAdminBefore41(id);setTimeout(()=>{let a=$('#ta-act'),n=$('#ta-notes');if(a){a.rows=8;a.classList.add('large-status-editor')}if(n){n.rows=8;n.classList.add('large-status-editor')}},0)};

  // Final framework spacing: preserve compact right-side action buttons while centering the row vertically.
  const oldRender41=render;
  render=function(){oldRender41();setTimeout(()=>{document.querySelectorAll('.page-toolbar').forEach(x=>x.classList.add('v041-page-toolbar'))},0)};

  document.title=`B7 FI Command Center v${VERSION}`;let ver=document.getElementById('appVersionLabel');if(ver)ver.textContent=`B7 FI Command Center v${VERSION}`;
  setTimeout(()=>{try{render()}catch(e){console.error('v1.0.1 rerender',e)}},0);
})();


/* ===== SOURCE: js/patch-v0430.js ===== */
/* B7 FI Command Center v1.0.3 — Countdown Lifecycle Finalization */
(function(){
const VERSION=window.B7_APP_VERSION||'1.0.3';
function quarterOpts(sel){
  const vals=[sel,...(typeof QUARTERS!=='undefined'?QUARTERS:[]),...tools.map(t=>t.quarter),...tools.map(t=>t.originalQuarter)].filter(Boolean);
  return [...new Set(vals)].map(x=>`<option value="${esc(x)}" ${x===sel?'selected':''}>${esc(x)}</option>`).join('');
}
function cardBadges(t,q,pushed){
  let b=[],oq=t.originalQuarter||quarterFromDate(t.originalShip)||'',cq=t.quarter||quarterFromDate(t.ship)||'';
  if(String(t.process||'').toLowerCase().includes('reduced'))b.push(['reduced','REDUCED PROCESS']);
  if(t.sourceRequired==='Yes')b.push(['source','SOURCE REQUIRED']);
  if(t.strRequired==='Yes')b.push(['str','STR REQUIRED']);
  if(typeof packingActive==='function'&&packingActive(t))b.push(['packing','PACKING ACTIVE']);
  if(t.originalShip&&t.ship&&t.originalShip!==t.ship)b.push(['change','SHIP DATE CHANGED']);
  if(t.originalCustomer&&t.customer!==t.originalCustomer)b.push(['change','CUSTOMER CHANGED']);
  if(t.originalSO&&t.so!==t.originalSO)b.push(['change','SO CHANGED']);
  if(oq&&cq&&oq!==q&&cq===q)b.push(['pull','PULLED IN']);
  if(pushed||(oq===q&&cq&&cq!==q))b.push(['push','PUSHED OUT']);
  return b.map(x=>`<span class="cc-badge ${x[0]}">${x[1]}</span>`).join('');
}
function progressBar(label,value,kind,detail){value=Math.max(0,Math.min(100,Number(value)||0));return `<div class="cc-progress-row ${kind}"><div class="cc-progress-head"><span>${label}</span><b>${value}%</b></div><div class="cc-progress-track"><i style="width:${value}%"></i></div>${detail?`<div class="cc-progress-detail">${esc(detail)}</div>`:''}</div>`}
function lifecycleCard(t,q,pushed=false){
  let waiting=t.quarterStatus==='Waiting for FI',shipped=t.quarterStatus==='Shipped',packing=!shipped&&typeof packingActive==='function'&&packingActive(t),infi=!waiting&&!shipped;
  let oq=t.originalQuarter||quarterFromDate(t.originalShip)||'',cq=t.quarter||quarterFromDate(t.ship)||'',badges=cardBadges(t,q,pushed),moved=t.originalShip&&t.ship&&t.originalShip!==t.ship;
  let status=shipped?'SHIPPED':waiting?'WAITING FOR FI':packing?'PACKING':'IN FI';
  let body='';
  if(waiting){
    body=`<div class="cc-meta cc-meta-rich waiting-meta"><div><span>MFG Ship Date</span><b>${fmt(t.ship)}</b></div><div><span>Sales Order</span><b>${esc(t.so||'N/A')}</b></div></div>`;
  }else if(shipped){
    let actual=t.actualShipDate||t.ship, plan=t.originalShip||t.ship;
    body=`<div class="cc-meta cc-meta-rich shipped-meta"><div><span>Planned Ship</span><b>${fmt(plan)}</b></div><div><span>Actual Ship</span><b>${fmt(actual)}</b></div><div><span>Sales Order</span><b>${esc(t.so||'N/A')}</b></div><div><span>Completion</span><b>FI ✓${typeof packingProgress==='function'&&packingProgress(t)>=100?' · PACKING ✓':''}</b></div></div>`;
  }else if(packing){
    let pp=typeof packingProgress==='function'?packingProgress(t):0,next=typeof nextPackingHandoff==='function'?nextPackingHandoff(t):null;
    body=`<div class="cc-meta cc-meta-rich"><div><span>MFG Ship Date</span><b>${fmt(t.ship)}</b></div><div><span>Sales Order</span><b>${esc(t.so||'N/A')}</b></div><div><span>FI Testing</span><b>100% COMPLETE</b></div><div><span>Next Handoff</span><b>${esc(next?.label||'Complete')}</b></div></div>${progressBar('Packing Progress',pp,'packing-progress',next?.label||'')}`;
  }else{
    let actual=typeof routeProgress==='function'?routeProgress(t):0,mi=typeof microScheduleInfo==='function'?microScheduleInfo(t):null;
    body=`<div class="cc-meta cc-meta-rich"><div><span>MFG Ship Date</span><b>${fmt(t.ship)}</b></div><div><span>Sales Order</span><b>${esc(t.so||'N/A')}</b></div><div><span>Current Phase</span><b>${esc(typeof currentPhase==='function'?currentPhase(t):'FI TESTING')}</b></div><div><span>Current Checklist</span><b>${esc(t.checklist||'—')}</b></div></div>${progressBar('Actual FI Progress',actual,'actual-progress',t.checklist||'')}${mi&&mi.set?progressBar('Micro Schedule Target',mi.plannedPct,'micro-progress',mi.target||''):`<div class="cc-micro unset">MICRO SCHEDULE TARGET NOT SET</div>`}${mi&&mi.set?`<div class="schedule-chip ${mi.className}">${esc(mi.label)}</div>`:''}`;
  }
  let lifeClass=waiting?'life-waiting':shipped?'life-shipped':packing?'life-packing':'life-infi';
  return `<article class="countdown-card lifecycle-card ${qState(t)} ${lifeClass} ${packing?'packing-tint':''} ${pushed?'pushed-card':''}" data-open-countdown-tool="${esc(t.id)}" tabindex="0" role="button" aria-label="Open tool ${esc(t.id)}"><div class="cc-head"><div><div class="cc-id">${esc(t.id)}</div><b>${esc(t.model)}</b><div class="gray">${esc(t.customer||'N/A')}</div></div><span class="state-chip lifecycle-shape ${lifeClass}">${status}</span></div>${body}${badges?`<div class="cc-badges">${badges}</div>`:''}${moved?`<div class="quarter-movement-line"><span>${fmt(t.originalShip)} → ${fmt(t.ship)}</span><strong>${esc(oq||'—')} → ${esc(cq||'—')}</strong></div>`:''}</article>`;
}
function familyBlock(name,arr,q){let w=arr.filter(t=>t.quarterStatus==='Waiting for FI').length,i=arr.filter(t=>t.quarterStatus==='In FI').length,s=arr.filter(t=>t.quarterStatus==='Shipped').length;return `<section class="countdown-family final-family"><div class="countdown-family-head"><h2>${esc(name)}</h2><div class="family-counts"><div class="family-total"><span>TOTAL</span><b>${arr.length}</b></div><div class="family-waiting"><span>WAITING FI</span><b>${w}</b></div><div class="family-infi"><span>IN FI</span><b>${i}</b></div><div class="family-shipped"><span>SHIPPED</span><b>${s}</b></div></div></div><div class="countdown-card-grid final-countdown-grid">${arr.sort((a,b)=>(a.ship||'9').localeCompare(b.ship||'9')).map(t=>lifecycleCard(t,q)).join('')}</div></section>`}
countdown=function(){
  let q=calendarQuarter(),s=quarterMovementStats(q),sh=s.curr.filter(t=>t.quarterStatus==='Shipped').length,need=s.curr.length-sh,g={};s.curr.forEach(t=>(g[t.codename||'Other']??=[]).push(t));
  app.innerHTML=page('Quarter Tool Shipping Countdown','Quarter commitment, pull-in/push-out movement and tool-family status.','QUARTER PLAN')+`<div class="report-screen">${reportHeader(`${q} TOOL SHIPPING COUNTDOWN`)}<div class="overall-countdown v21-countdown"><div class="overall-box"><div class="label">Original Plan</div><span class="number">${s.orig.length}</span></div><div class="overall-box"><div class="label">Current Plan</div><span class="number">${s.curr.length}</span></div><div class="overall-box need"><div class="label">Need to Ship</div><span class="number">${need}</span></div><div class="overall-box shipped"><div class="label">Shipped</div><span class="number">${sh}</span></div><div class="overall-box pull"><div class="label">Pulled Into ${q}</div><span class="number">${s.pulled.length}</span></div><div class="overall-box push"><div class="label">Pushed Out</div><span class="number">${s.pushed.length}</span></div></div><div class="quarter-progress"><div class="progress-label"><span>Current Quarter Shipping Progress</span><b>${pct(sh,s.curr.length)}% Shipped</b></div><div class="track"><div class="fill" style="width:${pct(sh,s.curr.length)}%;background:var(--good)"></div></div></div><section class="panel tool-type-panel">${Object.entries(g).sort((a,b)=>a[0].localeCompare(b[0])).map(([n,a])=>familyBlock(n,a,q)).join('')}</section>${s.pushed.length?`<section class="panel movement-panel"><h3>Still in FI — Pushed Out of ${q}</h3><div class="countdown-card-grid final-countdown-grid">${s.pushed.map(t=>lifecycleCard(t,q,true)).join('')}</div></section>`:''}</div>`;
  document.querySelectorAll('[data-open-countdown-tool]').forEach(c=>{let go=()=>toolStatus(c.dataset.openCountdownTool);c.onclick=go;c.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}}});
  actions([{label:'Edit Tool Countdown',primary:true,fn:()=>admin('countdown')},{label:'Tools',fn:()=>setView('systems')},{label:'Administration',fn:()=>setView('admin')}]);
};
countdownAdmin=function(){return `<div class="panel"><h3>Quarter Tool Shipping Countdown Admin · Plan Change Workflow</h3><p class="helper">Use New MFG Ship Date + New Quarter to record a Pull In or Push Out without overwriting history. Current values update only when the change is applied.</p><div class="table-wrap"><table class="report-table compact-form-table countdown-admin-table final-countdown-admin"><thead><tr><th>UTID</th><th>Code Name</th><th>Current MFG Ship</th><th>Current Quarter</th><th>Change Type</th><th>New MFG Ship Date</th><th>New Quarter</th><th>Reason / Notes</th><th>Status</th></tr></thead><tbody>${tools.map(t=>`<tr data-cd43="${esc(t.id)}"><td><b>${esc(t.id)}</b></td><td>${esc(t.codename)}</td><td><b>${fmt(t.ship)}</b><small class="admin-original">Original: ${fmt(t.originalShip)}</small></td><td><b>${esc(t.quarter||quarterFromDate(t.ship)||'—')}</b><small class="admin-original">Original: ${esc(t.originalQuarter||quarterFromDate(t.originalShip)||'—')}</small></td><td><select class="cd43-type"><option>No Change</option><option>Pull In</option><option>Push Out</option></select></td><td><input class="cd43-date" type="date" value=""></td><td><select class="cd43-quarter"><option value="">Select quarter</option>${quarterOpts(t.quarter||quarterFromDate(t.ship))}</select></td><td><input class="cd43-reason" placeholder="Customer request / plan change / etc."></td><td>${lifecycleSelect(t,'cd43-status')}</td></tr>`).join('')}</tbody></table></div><div class="actions"><button id="saveCountdown43" class="btn primary">Apply Countdown Changes</button></div></div>`};
const wire43=wireAdmin;
wireAdmin=function(s){if(s!=='countdown')return wire43(s);document.querySelectorAll('[data-cd43]').forEach(r=>{let d=r.querySelector('.cd43-date'),q=r.querySelector('.cd43-quarter');d.onchange=()=>{let v=quarterFromDate(d.value);if(v){if(![...q.options].some(o=>o.value===v))q.insertAdjacentHTML('beforeend',`<option value="${esc(v)}">${esc(v)}</option>`);q.value=v}}});let btn=$('#saveCountdown43');if(btn)btn.onclick=()=>{document.querySelectorAll('[data-cd43]').forEach(r=>{let t=tools.find(x=>x.id===r.dataset.cd43);if(!t)return;let type=r.querySelector('.cd43-type').value,newDate=r.querySelector('.cd43-date').value,newQ=r.querySelector('.cd43-quarter').value,reason=r.querySelector('.cd43-reason').value.trim(),status=r.querySelector('.cd43-status').value;if(type!=='No Change'&&(newDate||newQ)){let oldDate=t.ship,oldQ=t.quarter||quarterFromDate(t.ship)||'';newDate=newDate||oldDate;newQ=newQ||quarterFromDate(newDate)||oldQ;t.changeHistory=t.changeHistory||[];t.changeHistory.unshift({date:new Date().toISOString(),type:type.toUpperCase(),field:'MFG Ship / Quarter',oldValue:`${oldDate} · ${oldQ}`,newValue:`${newDate} · ${newQ}`,reason});if(typeof recordChange==='function'){recordChange(t,'Ship Date',oldDate,newDate,reason);recordChange(t,'Quarter',oldQ,newQ,reason)}t.ship=newDate;t.quarter=newQ}t.quarterStatus=status});save();setView('countdown')};};
const toolStatus43=toolStatus;toolStatus=function(id){toolStatus43(id);let t=tools.find(x=>x.id===id);if(!t)return;setTimeout(()=>{if(String(t.process||'').toLowerCase().includes('reduced')){let metrics=document.querySelector('.metric-grid');if(metrics&&!metrics.querySelector('.reduced-process-metric'))metrics.insertAdjacentHTML('beforeend','<div class="metric reduced-process-metric"><span>FI Process</span><strong>REDUCED PROCESS</strong><small>Reduced FI test route active</small></div>');let h=document.querySelector('.report-screen .report-header, .report-screen h2');if(h&&!document.querySelector('.reduced-process-banner'))h.insertAdjacentHTML('afterend','<div class="reduced-process-banner">REDUCED PROCESS ACTIVE</div>')}},0)};
document.title=`B7 FI Command Center v${VERSION}`;let v=document.getElementById('appVersionLabel');if(v)v.textContent=`B7 FI Command Center v${VERSION}`;setTimeout(()=>render(),0);
})();


/* ===== SOURCE: js/patch-v0450.js ===== */
/* B7 FI Command Center v1.0.3 — Status + Workflow Polish */
(function(){
  const VERSION=window.B7_APP_VERSION||'1.0.3';

  function clampPct(v){ return Math.max(0,Math.min(100,Number(v)||0)); }
  function sourcePct(status){
    const map={
      'Not Started':0,'Preparing':15,'Pre-Source In Progress':35,'Ready for CA':55,
      'With CA Team':72,'Source Complete':90,'Returned to FI':100
    };
    return map[status] ?? 0;
  }
  function strPct(status){
    const map={
      'Not Started':0,'Requirements Pending':15,'Requirements Received':30,'Testing':55,
      'Submitted to CA':70,'Customer Approval Pending':85,'Complete':100
    };
    return map[status] ?? 0;
  }
  function addMetricBar(metric,pct,tone){
    if(!metric || metric.querySelector('.metric-mini-track')) return;
    const track=document.createElement('div');
    track.className=`metric-mini-track ${tone||''}`;
    track.innerHTML=`<i style="width:${clampPct(pct)}%"></i>`;
    metric.appendChild(track);
  }
  function metricByLabel(label){
    return [...document.querySelectorAll('.metric-grid .metric')].find(m=>{
      const s=m.querySelector(':scope > span');
      return s && s.textContent.trim().toUpperCase()===label.toUpperCase();
    });
  }
  function requirementMetric(label,required,status,pct,tone){
    const m=document.createElement('div');
    m.className=`metric requirement-metric ${tone} ${required==='Yes'?'required':'not-required'}`;
    const state=required==='Yes' ? status : (required==='No'?'NOT REQUIRED':'TBD');
    m.innerHTML=`<span>${label}</span><strong>${required==='Yes'?'REQUIRED':state}</strong>
      <small>${required==='Yes'?state:'Requirement status'}</small>
      <div class="metric-mini-track ${tone}"><i style="width:${required==='Yes'?clampPct(pct):0}%"></i></div>`;
    return m;
  }
  function polishToolStatus45(t){
    // Reduced Process only belongs in the FI Process metric; remove duplicate banner.
    document.querySelectorAll('.reduced-process-banner').forEach(x=>x.remove());

    const grid=document.querySelector('.metric-grid');
    if(grid){
      const fi=metricByLabel('FI Testing'); if(fi) addMetricBar(fi,typeof routeProgress==='function'?routeProgress(t):0,'fi');
      const mi=typeof microScheduleInfo==='function'?microScheduleInfo(t):null;
      const ms=metricByLabel('Micro Schedule'); if(ms && mi?.set) addMetricBar(ms,mi.plannedPct,'micro');
      const la=metricByLabel('Lead / Admin'); if(la) addMetricBar(la,typeof adminProgress==='function'?adminProgress(t):0,'admin');
      const pk=metricByLabel('Packing / Shipping'); if(pk) addMetricBar(pk,typeof packingProgress==='function'?packingProgress(t):0,'packing');
      const su=metricByLabel('Supplemental'); if(su) addMetricBar(su,typeof supplementalPct==='function'?supplementalPct(t):0,'supp');

      // Surface Customer Source and STR where the user can see them immediately.
      if(!grid.querySelector('.source-summary-metric') && (t.sourceRequired==='Yes' || (t.sourceStatus && t.sourceStatus!=='Not Started'))){
        const m=requirementMetric('Customer Source',t.sourceRequired,t.sourceStatus,sourcePct(t.sourceStatus),'source');
        m.classList.add('source-summary-metric'); grid.appendChild(m);
      }
      if(!grid.querySelector('.str-summary-metric') && (t.strRequired==='Yes' || (t.strStatus && t.strStatus!=='Not Started'))){
        const m=requirementMetric('STR',t.strRequired,t.strStatus,strPct(t.strStatus),'str');
        m.classList.add('str-summary-metric'); grid.appendChild(m);
      }
    }

    // Make requirement state obvious in the detailed panel too.
    const req=document.querySelector('.customer-requirements-block');
    if(req && !req.querySelector('.requirement-summary-strip')){
      const strip=document.createElement('div');
      strip.className='requirement-summary-strip';
      strip.innerHTML=`<span class="${t.sourceRequired==='Yes'?'active':'muted'}">SOURCE: ${t.sourceRequired==='Yes'?esc(t.sourceStatus):esc(t.sourceRequired||'TBD')}</span>
        <span class="${t.strRequired==='Yes'?'active':'muted'}">STR: ${t.strRequired==='Yes'?esc(t.strStatus):esc(t.strRequired||'TBD')}</span>`;
      const h=req.querySelector('h3'); if(h) h.insertAdjacentElement('afterend',strip);
    }

    // Remove accidental duplicate page-action buttons (e.g. Screenshot Mode).
    const seen=new Set();
    document.querySelectorAll('.page-toolbar button').forEach(b=>{
      const key=b.textContent.trim().toLowerCase();
      if(seen.has(key)) b.remove(); else seen.add(key);
    });
  }

  const previousToolStatus=toolStatus;
  toolStatus=function(id){
    previousToolStatus(id);
    const t=tools.find(x=>x.id===id);
    if(!t)return;
    setTimeout(()=>polishToolStatus45(t),0);
  };

  // Re-apply polish after any render that returns to an already-selected Tool page.
  const previousRender=render;
  render=function(){
    previousRender();
    setTimeout(()=>{
      document.querySelectorAll('.page-toolbar button').forEach((b,i,arr)=>{
        const key=b.textContent.trim().toLowerCase();
        const first=arr.findIndex(x=>x.textContent.trim().toLowerCase()===key);
        if(first!==i)b.remove();
      });
    },0);
  };

  document.title=`B7 FI Command Center v${VERSION}`;
  const ver=document.getElementById('appVersionLabel');
  if(ver)ver.textContent=`B7 FI Command Center v${VERSION}`;
  setTimeout(()=>{try{render()}catch(e){console.error('v1.0.1 render',e)}},0);
})();

/* ===== SOURCE: js/patch-v0460.js ===== */
/* B7 FI Command Center v1.0.3 — Framework + Weekend Operations Polish */
(function(){
  const VERSION=window.B7_APP_VERSION||'1.0.3';

  /* ---------- Top Action Center ticker repair ---------- */
  let v46ActionIndex=0;
  function refreshTopActions46(advance=false){
    if(window.B7AlertEngine817)return;
    const bar=document.getElementById('topActionBar');
    if(!bar || typeof v3Alerts!=='function')return;
    const items=v3Alerts()||[];
    if(advance && items.length)v46ActionIndex=(v46ActionIndex+1)%items.length;
    if(!items.length){
      bar.innerHTML='<div class="top-action-clear">✓ B7 FI ACTIONS · No open generated actions</div>';
      return;
    }
    v46ActionIndex%=items.length;
    const x=items[v46ActionIndex];
    const icon=typeof severityIcon==='function'?severityIcon(x.severity):(x.severity==='red'?'●':x.severity==='orange'?'▲':'◆');
    bar.innerHTML=`<button id="v46TopActionCurrent" class="top-action-current ${x.severity||'yellow'}"><span class="top-action-label">${icon} B7 FI ACTIONS</span><strong>${esc(x.text||'')}</strong><span class="top-action-count">${v46ActionIndex+1} / ${items.length}</span><span class="top-action-open">OPEN →</span></button><button id="v46TopActionAll" class="top-action-all">ALL ${items.length}</button>`;
    const cur=document.getElementById('v46TopActionCurrent');
    const all=document.getElementById('v46TopActionAll');
    if(cur)cur.onclick=()=>typeof actionTarget==='function'&&actionTarget(x);
    if(all)all.onclick=()=>setView('actions');
  }
  setInterval(()=>refreshTopActions46(true),7000);

  /* ---------- Weekend date + volunteer helpers ---------- */
  function isoLocal(d){
    const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
  }
  function weekendPair46(value){
    let d=value?new Date(value+'T12:00:00'):new Date();
    if(Number.isNaN(d.getTime()))d=new Date();
    const day=d.getDay();
    const add=(6-day+7)%7; // selected Sat stays Sat; weekday/Sun advances to next Sat
    const sat=new Date(d); sat.setDate(d.getDate()+add);
    const sun=new Date(sat); sun.setDate(sat.getDate()+1);
    return {sat,sun,satISO:isoLocal(sat),sunISO:isoLocal(sun)};
  }
  function fmtWeekend46(d){
    return d.toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric',year:'numeric'});
  }
  function shortRange46(pair){
    const sm=pair.sat.toLocaleDateString(undefined,{month:'short',day:'numeric'});
    const em=pair.sun.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
    return `${sm}–${em}`;
  }
  function ensureWeekendDate46(){
    state.weekend=state.weekend||{};
    if(!state.weekend.weekendDate){
      const p=weekendPair46(new Date().toISOString().slice(0,10));
      state.weekend.weekendDate=p.satISO;
    }
    return weekendPair46(state.weekend.weekendDate);
  }
  function weekendVolunteerRows46(day){
    const arr=(state.weekend.volunteers||[]).filter(v=>String(v[day]||'').trim());
    if(!arr.length)return `<tr><td colspan="3" class="gray">No ${day==='sat'?'Saturday':'Sunday'} volunteers entered.</td></tr>`;
    return arr.map(v=>`<tr><td><b>${esc(v.name)}</b></td><td>${esc(v[day])}</td><td>${esc(v.notes||'')}</td></tr>`).join('');
  }

  /* New display: Saturday and Sunday are separate operational sections. */
  weekend=function(){
    const p=ensureWeekendDate46();
    const title=`B7 WEEKEND PRIORITIES · ${shortRange46(p)}`;
    state.weekend.title=title;
    app.innerHTML=page('Weekend Priorities','Saturday and Sunday coverage shown separately, followed by B7 weekend tool priorities.','WEEKEND OPERATIONS')+
      `<div class="report-screen">${reportHeader(title)}
        <div class="weekend-date-banner"><div><span>WEEKEND</span><b>${fmtWeekend46(p.sat)} · ${fmtWeekend46(p.sun)}</b></div><div><span>EMAIL SUBJECT</span><b>Weekend Volunteers Needed — ${shortRange46(p)}</b></div></div>
        <div class="weekend-volunteer-grid">
          <section class="panel weekend-day-panel saturday"><h3>SATURDAY VOLUNTEERS</h3><div class="weekend-day-date">${fmtWeekend46(p.sat)}</div><div class="table-wrap"><table class="report-table"><thead><tr><th>Volunteer</th><th>Hours</th><th>Notes</th></tr></thead><tbody>${weekendVolunteerRows46('sat')}</tbody></table></div></section>
          <section class="panel weekend-day-panel sunday"><h3>SUNDAY VOLUNTEERS</h3><div class="weekend-day-date">${fmtWeekend46(p.sun)}</div><div class="table-wrap"><table class="report-table"><thead><tr><th>Volunteer</th><th>Hours</th><th>Notes</th></tr></thead><tbody>${weekendVolunteerRows46('sun')}</tbody></table></div></section>
        </div>
        <section class="panel weekend-priority-section"><h3>B7 WEEKEND TOOL PRIORITIES</h3>${priorityTable('weekend')}</section>
      </div>`;
    actions([{label:'Edit Weekend Plan',primary:true,fn:()=>admin('weekend')},{label:'Administration',fn:()=>setView('admin')}]);
    refreshTopActions46(false);
  };

  function weekendAdminRows46(day){
    const arr=(state.weekend.volunteers||[]).filter(v=>String(v[day]||'').trim());
    return arr.map((v,i)=>`<tr data-v46-day="${day}" data-v46-key="${esc(v.name)}-${i}"><td><input class="v46-name" list="peopleMemory" value="${esc(v.name)}"></td><td><input class="v46-hours" placeholder="6am to 12pm" value="${esc(v[day])}"></td><td><input class="v46-notes" value="${esc(v.notes||'')}"></td><td><button type="button" class="btn danger small v46-remove">Remove</button></td></tr>`).join('');
  }
  function blankWeekendRow46(day){
    return `<tr data-v46-day="${day}"><td><input class="v46-name" list="peopleMemory" value=""></td><td><input class="v46-hours" placeholder="6am to 12pm" value=""></td><td><input class="v46-notes" value=""></td><td><button type="button" class="btn danger small v46-remove">Remove</button></td></tr>`;
  }

  const oldWeekendAdmin46=weekendAdmin;
  weekendAdmin=function(){
    const p=ensureWeekendDate46();
    const priorityHtml=priorityAdmin('weekend');
    return `<section class="panel weekend-admin-v46">
      <div class="weekend-admin-top">
        <div class="form-group"><label>Weekend Date</label><input id="v46WeekendDate" type="date" value="${p.satISO}"><small>Select any date; it automatically resolves to the upcoming Saturday/Sunday.</small></div>
        <div class="weekend-derived"><span>Saturday</span><b id="v46SatLabel">${fmtWeekend46(p.sat)}</b></div>
        <div class="weekend-derived"><span>Sunday</span><b id="v46SunLabel">${fmtWeekend46(p.sun)}</b></div>
        <div class="weekend-derived email"><span>Email Subject</span><b id="v46Subject">Weekend Volunteers Needed — ${shortRange46(p)}</b></div>
      </div>
    </section>
    <div class="weekend-admin-day-grid">
      <section class="panel"><div class="subsection-title"><h3>Saturday Volunteers</h3><button type="button" id="v46AddSat" class="btn">+ Add Saturday Volunteer</button></div><div class="table-wrap"><table class="report-table"><thead><tr><th>Name</th><th>Saturday Hours</th><th>Notes</th><th></th></tr></thead><tbody id="v46SatRows">${weekendAdminRows46('sat')}</tbody></table></div></section>
      <section class="panel"><div class="subsection-title"><h3>Sunday Volunteers</h3><button type="button" id="v46AddSun" class="btn">+ Add Sunday Volunteer</button></div><div class="table-wrap"><table class="report-table"><thead><tr><th>Name</th><th>Sunday Hours</th><th>Notes</th><th></th></tr></thead><tbody id="v46SunRows">${weekendAdminRows46('sun')}</tbody></table></div></section>
    </div>
    ${datalist('peopleMemory',[...remembered('driver'),...remembered('weekdayAssignment'),...remembered('weekendAssignment'),...(state.weekend.volunteers||[]).map(x=>x.name)])}
    <div class="v46-weekend-priority-wrap">${priorityHtml}</div>`;
  };

  function collectWeekendVolunteers46(){
    const map=new Map();
    document.querySelectorAll('[data-v46-day]').forEach(r=>{
      const name=r.querySelector('.v46-name').value.trim();
      const hours=r.querySelector('.v46-hours').value.trim();
      const notes=r.querySelector('.v46-notes').value.trim();
      if(!name)return;
      const key=name.toLowerCase();
      if(!map.has(key))map.set(key,{name,sat:'',sun:'',notes:''});
      const v=map.get(key),day=r.dataset.v46Day;
      v[day]=hours;
      if(notes)v.notes=notes;
    });
    return [...map.values()];
  }
  function wireWeekend46(){
    const date=document.getElementById('v46WeekendDate');
    if(date)date.onchange=()=>{
      const p=weekendPair46(date.value);
      date.value=p.satISO;
      const a=document.getElementById('v46SatLabel'),b=document.getElementById('v46SunLabel'),s=document.getElementById('v46Subject');
      if(a)a.textContent=fmtWeekend46(p.sat); if(b)b.textContent=fmtWeekend46(p.sun); if(s)s.textContent=`Weekend Volunteers Needed — ${shortRange46(p)}`;
    };
    const add=(day)=>{
      const body=document.getElementById(day==='sat'?'v46SatRows':'v46SunRows');
      if(body){body.insertAdjacentHTML('beforeend',blankWeekendRow46(day));wireWeekend46Remove();}
    };
    const sat=document.getElementById('v46AddSat'),sun=document.getElementById('v46AddSun');
    if(sat)sat.onclick=()=>add('sat'); if(sun)sun.onclick=()=>add('sun');
    wireWeekend46Remove();

    const saveBtn=document.getElementById('savePriority');
    if(saveBtn){
      saveBtn.onclick=()=>{
        const rows=[...document.querySelectorAll('[data-pr]')];
        const nums=rows.map(r=>r.querySelector('.pr-num').value).filter(Boolean);
        if(new Set(nums).size!==nums.length)return alert('Each priority number can only be used once on this list.');
        rows.forEach(r=>{
          const t=tools.find(x=>x.id===r.dataset.pr); if(!t)return;
          t.weekendPriority=r.querySelector('.pr-num').value?Number(r.querySelector('.pr-num').value):null;
          t.room=r.querySelector('.pr-room').value;
          t.weekendAssignment=r.querySelector('.pr-ass').value;
          t.weekendNotes=r.querySelector('.pr-note').value;
        });
        const p=weekendPair46(document.getElementById('v46WeekendDate')?.value);
        state.weekend.weekendDate=p.satISO;
        state.weekend.title=`B7 WEEKEND PRIORITIES · ${shortRange46(p)}`;
        state.weekend.volunteers=collectWeekendVolunteers46();
        save(); setView('weekend');
      };
    }
  }
  function wireWeekend46Remove(){
    document.querySelectorAll('.v46-remove').forEach(b=>b.onclick=()=>b.closest('tr').remove());
  }

  const oldWireAdmin46=wireAdmin;
  wireAdmin=function(s){
    oldWireAdmin46(s);
    if(s==='weekend')setTimeout(wireWeekend46,0);
  };

  /* Admin wrapper also wires after its own legacy wiring completes. */
  const oldAdmin46=admin;
  admin=function(section='home'){
    oldAdmin46(section);
    if(section==='weekend')setTimeout(()=>{
      const oldTitle=document.getElementById('priorityTitle');
      if(oldTitle)oldTitle.closest('.form-group')?.classList.add('v46-hide-report-title');
      wireWeekend46();
    },0);
    refreshTopActions46(false);
  };

  /* Keep the top ticker alive after every page render. */
  const oldRender46=render;
  render=function(){
    oldRender46();
    setTimeout(()=>refreshTopActions46(false),0);
  };

  document.title=`B7 FI Command Center v${VERSION}`;
  const ver=document.getElementById('appVersionLabel');
  if(ver)ver.textContent=`B7 FI Command Center v${VERSION}`;
  setTimeout(()=>{try{render();refreshTopActions46(false)}catch(e){console.error('v1.0.1 render',e)}},0);
})();

/* ===== SOURCE: js/patch-v0470.js ===== */
/* B7 FI Command Center v1.0.3 — Meeting Notes + Legacy Reference + Framework QA */
(function(){
const VERSION=window.B7_APP_VERSION||'1.0.3';
function today47(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function ensure47(){
 state.meetings=state.meetings||{}; state.meetingHistory=Array.isArray(state.meetingHistory)?state.meetingHistory:[];
 state.referenceFiles=state.referenceFiles||{};
 if(!state.referenceFiles.legacyNotes)state.referenceFiles.legacyNotes={name:'',loadedAt:''};
 if(typeof referenceSession!=='undefined'&&!('legacyNotes' in referenceSession))referenceSession.legacyNotes=null;
}
ensure47();
function morningRec47(){
 const d=today47(),r=state.meetings[d]||(state.meetings[d]={date:d,notes:'',created:new Date().toISOString()});
 r.toolNotes=r.toolNotes&&typeof r.toolNotes==='object'?r.toolNotes:{}; r.generalNotes=r.generalNotes||'';
 if(r.notes&&!r.generalNotes&&!Object.keys(r.toolNotes).length)r.generalNotes=r.notes;
 return r;
}
function snapshotText47(r,arr){let out=[];arr.forEach(t=>{let n=(r.toolNotes[t.id]||'').trim();if(n)out.push(`${t.id}\n${n}`)});if((r.generalNotes||'').trim())out.push(`GENERAL NOTES\n${r.generalNotes.trim()}`);return out.join('\n\n')}
function archive47(){let r=morningRec47(),a=typeof orderedMorningTools==='function'?orderedMorningTools():pageTools('morning');r.notes=snapshotText47(r,a);state.meetingHistory=state.meetingHistory.filter(x=>x.date!==r.date);state.meetingHistory.unshift({...clone(r),closed:new Date().toISOString()});save();morning()}
function hist47(x){
 let tn=x.toolNotes&&typeof x.toolNotes==='object'?x.toolNotes:{};let count=Object.values(tn).filter(v=>String(v||'').trim()).length+(String(x.generalNotes||'').trim()?1:0);
 let body=Object.entries(tn).filter(([,v])=>String(v||'').trim()).map(([id,v])=>`<div class="meeting-history-tool"><b>${esc(id)}</b><div>${esc(v).replace(/\n/g,'<br>')}</div></div>`).join('');
 if(x.generalNotes)body+=`<div class="meeting-history-tool general"><b>GENERAL NOTES</b><div>${esc(x.generalNotes).replace(/\n/g,'<br>')}</div></div>`;
 if(!body)body=typeof statusHtml==='function'?statusHtml(x.notes,'No notes recorded.'):`<div>${esc(x.notes||'No notes recorded.')}</div>`;
 return `<details><summary>${fmt(x.date)} · ${count} note section${count===1?'':'s'}</summary><div class="meeting-history-body">${body}</div></details>`
}
/* Preformatted morning notebook: every active tool is always ready for typing. */
morning=function(){
 let a=typeof orderedMorningTools==='function'?orderedMorningTools():pageTools('morning'),rec=morningRec47();
 app.innerHTML=`<div class="report-screen">${reportHeader('B7 FI MORNING STATUS')}<div class="meeting-control-strip"><div><b>${fmt(rec.date)}</b><span>${a.length} systems</span><span>${state.workspaceTasks.filter(x=>x.status!=='Completed').length} open actions</span></div><button id="resetMorningOrder" class="btn small">Reset Tool Type / Serial Order</button></div>${a.map((t,i)=>{let visible=morningNcs(t),normal=visible.filter(n=>!isEscalatedNc(n)),escal=visible.filter(isEscalatedNc),active=activeChecklists(t),checklistText=packingActive(t)?'200 — Packing':active.length?active.map(x=>`${x[0]}: ${x[1]}`).join(' + '):`${t.checklist}: ${checkName(t)}`;return `<div class="meeting-row v21-meeting-row"><div class="meeting-order-controls"><span>${i+1}</span><button data-move="${esc(t.id)}" data-d="-1" ${i===0?'disabled':''}>↑</button><button data-move="${esc(t.id)}" data-d="1" ${i===a.length-1?'disabled':''}>↓</button></div><div class="meeting-content"><div class="meeting-main">${esc(t.id)} (${esc(t.room)}${t.bay?' / '+esc(t.bay):''}) (${esc(t.model)} - ${esc(t.codename)}) (SW: ${esc(t.sw||'—')}) ${esc(checklistText)} (${esc(t.customer)}, ${fmt(t.ship)}) <span class="morning-lamp">(Lamp Hours: ${t.lamp||0})</span> ${typeof latestChangeBadge==='function'?latestChangeBadge(t):''} ${packingActive(t)?`<span class="phase-chip packing">PACKING ${packingProgress(t)}%</span>`:''} ${t.sourceRequired==='Yes'?`<span class="phase-chip source">SOURCE: ${esc(t.sourceStatus)}</span>`:''} ${t.strRequired==='Yes'?`<span class="phase-chip str">STR: ${esc(t.strStatus)}</span>`:''}</div>${statusHtml(t.activity)}<ul class="meeting-bullets">${normal.map(n=>`<li class="morning-open-nc">${esc(n.id)}: ${esc(n.desc)}</li>`).join('')}${escal.map(n=>`<li class="morning-escalated">Escalated ${esc(n.id)}${n.days?` - ${n.days} Days`:''}: ${esc(n.desc)}</li>`).join('')}</ul></div></div>`}).join('')}
 <section class="panel morning-notes-panel preformatted-notebook"><div class="subsection-title"><div><h3>Morning Meeting Notebook · ${fmt(rec.date)}</h3><p class="gray">Every active tool is preloaded. Type only where a note is needed; blank sections stay blank in the saved snapshot.</p></div><button id="archiveMeeting" class="btn">End / Save Meeting Snapshot</button></div><div class="meeting-note-grid">${a.map(t=>`<div class="tool-note-entry"><div class="tool-note-label"><b>${esc(t.id)}</b><span>${esc(t.codename)} · ${esc(t.model)} · ${esc(t.customer)}</span></div><textarea data-meeting-tool="${esc(t.id)}" rows="3" placeholder="Notes for ${esc(t.id)}…">${esc(rec.toolNotes[t.id]||'')}</textarea></div>`).join('')}</div><div class="general-note-entry"><div class="tool-note-label"><b>GENERAL NOTES</b><span>Items not tied to a specific tool</span></div><textarea id="meetingGeneralNotes" rows="4" placeholder="General meeting notes…">${esc(rec.generalNotes||'')}</textarea></div><div class="meeting-action-builder"><input id="meetingTaskTitle" placeholder="Action item from this meeting"><select id="meetingTaskTool"><option value="">General / No Tool</option>${a.map(t=>`<option value="${esc(t.id)}">${esc(t.id)} · ${esc(t.codename)}</option>`).join('')}</select><button id="meetingAddTask" class="btn primary">Add to Tasks</button></div><div class="meeting-history"><h4>Meeting History</h4>${state.meetingHistory.slice(0,20).map(hist47).join('')||'<span class="gray">No archived morning meetings yet.</span>'}</div></section></div>`;
 document.querySelectorAll('[data-move]').forEach(b=>b.onclick=()=>moveMorning(b.dataset.move,Number(b.dataset.d)));let reset=$('#resetMorningOrder');if(reset)reset.onclick=()=>{state.morningOrder=[];save();morning()};
 document.querySelectorAll('[data-meeting-tool]').forEach(x=>x.oninput=e=>{rec.toolNotes[e.target.dataset.meetingTool]=e.target.value;save()});let gn=$('#meetingGeneralNotes');if(gn)gn.oninput=e=>{rec.generalNotes=e.target.value;save()};
 let add=$('#meetingAddTask');if(add)add.onclick=()=>{addMorningTask($('#meetingTaskTitle').value,$('#meetingTaskTool').value);$('#meetingTaskTitle').value='';updateOperationsBar()};let ar=$('#archiveMeeting');if(ar)ar.onclick=archive47;
 actions([{label:'Morning Quick Update',primary:true,fn:()=>admin('meeting')},{label:'FI Knowledge Base',fn:()=>workspace('reference')},{label:'Lead Workspace / Actions',fn:()=>setView('workspace')},{label:'Administration',fn:()=>setView('admin')}]);
};

function legacyCard47(){let meta=state.referenceFiles.legacyNotes||{},sess=referenceSession.legacyNotes;return `<section class="reference-file-card legacy-reference-card"><div class="reference-file-head"><div><h3>Legacy FI Notes / Word Reference</h3><p>Your original working notes document. Keep it beside the new FI Knowledge Base during the transition.</p></div><span class="reference-mode">LEGACY REFERENCE · READ ONLY</span></div><div class="reference-file-meta"><b>${esc(sess?.file?.name||meta.name||'No legacy document loaded')}</b><span>${meta.loadedAt?`Last selected ${new Date(meta.loadedAt).toLocaleString()}`:'Select the current Word/PDF/TXT reference document'}</span></div><div class="reference-file-actions"><label class="btn primary file-btn">${meta.name?'Replace':'Load'} Legacy Notes<input id="legacyNotesInput47" type="file" accept=".doc,.docx,.pdf,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,text/plain" hidden></label><button id="legacyOpen47" class="btn" ${sess?'':'disabled'}>Open Original</button></div><div id="legacyPreview47" class="reference-preview"><div class="reference-preview-empty">${sess?'Document loaded.':'Select the legacy document to keep it available from Reference Files.'}</div></div></section>`}
function legacyPreview47(){let s=referenceSession.legacyNotes,b=$('#legacyPreview47');if(!s||!b)return;let n=(s.file.name||'').toLowerCase();if(n.endsWith('.pdf')||n.endsWith('.txt'))b.innerHTML=`<iframe class="legacy-doc-frame" src="${s.url}" title="Legacy FI Notes preview"></iframe>`;else b.innerHTML=`<div class="legacy-word-ready"><b>Word document ready for reference</b><p>${esc(s.file.name)}</p><p>Use <b>Open Original</b> to view the actual Word document in the browser/Word application. The Command Center keeps this reference read-only.</p></div>`}
const oldRefs47=referencesPage;
referencesPage=function(){oldRefs47();let dash=document.querySelector('.reference-dashboard');if(dash&&!document.querySelector('.legacy-reference-card'))dash.insertAdjacentHTML('beforeend',legacyCard47());let inp=$('#legacyNotesInput47');if(inp)inp.onchange=()=>{let f=inp.files?.[0];if(!f)return;if(referenceSession.legacyNotes?.url)URL.revokeObjectURL(referenceSession.legacyNotes.url);referenceSession.legacyNotes={file:f,url:URL.createObjectURL(f)};state.referenceFiles.legacyNotes={name:f.name,loadedAt:new Date().toISOString()};save();referencesPage();setTimeout(legacyPreview47,0)};let op=$('#legacyOpen47');if(op)op.onclick=()=>{let s=referenceSession.legacyNotes;if(!s)return alert('Reload/select the legacy document in this browser session first.');window.open(s.url,'_blank')};if(referenceSession.legacyNotes)setTimeout(legacyPreview47,0);actions([{label:'FI Knowledge Base',primary:true,fn:()=>workspace('reference')},{label:'Tool Countdown',fn:()=>setView('countdown')},{label:'Shipping Schedule',fn:()=>setView('shipping')}],false)};

/* Rename the existing permanent Reference workspace into the operational knowledge base. */
const oldWorkspace47=workspace;
workspace=function(tab='tasks'){oldWorkspace47(tab);if(tab==='reference'){let h=[...document.querySelectorAll('#app h3')].find(x=>x.textContent.trim()==='Reference');if(h)h.textContent='FI Knowledge Base / Special Notes';let p=h?.nextElementSibling;if(p&&p.classList.contains('helper'))p.textContent='Searchable permanent reference for part numbers, procedures, recurring reminders, wafer information, contacts, error codes and special FI notes.';actions([{label:'Action Center',fn:()=>workspace('tasks')},{label:'Reference Files',fn:()=>setView('references')},{label:'Administration',fn:()=>setView('admin')}],false)}};

/* Keep v0.46 ticker alive even after pages replaced by patch functions. */
const render47=render;render=function(){render47();setTimeout(()=>{try{if(typeof refreshTopActions46==='function')refreshTopActions46(false);else if(typeof renderTopActionBar==='function')renderTopActionBar();updateOperationsBar()}catch(e){}},0)};
document.title=`B7 FI Command Center v${VERSION}`;let v=document.getElementById('appVersionLabel');if(v)v.textContent=`B7 FI Command Center v${VERSION}`;setTimeout(()=>{try{render()}catch(e){console.error('v1.0.3',e)}},0);
})();


/* ===== SOURCE: js/patch-v0480.js ===== */
/* B7 FI Command Center v1.0.3 — Navigation + Statusbar QA */
(function(){
  const VERSION=window.B7_APP_VERSION||'1.0.3';
  let ticker48=0;

  function knowledgePage48(){
    view='knowledge';
    document.body.dataset.theme='knowledge';
    setHeaderContext('FI KNOWLEDGE BASE','Special Notes · Quick Reference');
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='knowledge'));
    workspace('reference');
    view='knowledge';
    document.body.dataset.theme='knowledge';
    setHeaderContext('FI KNOWLEDGE BASE','Special Notes · Quick Reference');
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='knowledge'));
    actions([
      {label:'Lead Workspace',fn:()=>setView('workspace')},
      {label:'Reference Files',fn:()=>setView('references')},
      {label:'Administration',fn:()=>setView('admin')}
    ],false);
    refreshTicker48(false);
    try{updateOperationsBar()}catch(e){}
  }

  const oldSetView48=setView;
  setView=function(v){
    if(v==='knowledge'){
      window.scrollTo({top:0,left:0,behavior:'auto'});
      knowledgePage48();
      return;
    }
    oldSetView48(v);
    setTimeout(()=>refreshTicker48(false),0);
  };

  function bindKnowledge48(){
    document.querySelectorAll('.nav-btn').forEach(b=>{
      if(b.dataset.view==='knowledge')b.onclick=()=>setView('knowledge');
    });
  }
  bindKnowledge48();

  const oldMorning48=morning;
  morning=function(){
    oldMorning48();
    document.querySelectorAll('.page-toolbar button').forEach(b=>{
      if(b.textContent.trim().toLowerCase()==='fi knowledge base')b.remove();
    });
    refreshTicker48(false);
  };

  function refreshTicker48(advance){
    if(window.B7AlertEngine817)return;
    const bar=document.getElementById('topActionBar');
    if(!bar || typeof v3Alerts!=='function')return;
    const items=v3Alerts()||[];
    if(advance && items.length)ticker48=(ticker48+1)%items.length;
    if(!items.length){
      bar.innerHTML='<div class="top-action-clear">✓ B7 FI ACTIONS · No generated critical / attention items</div>';
      return;
    }
    ticker48%=items.length;
    const x=items[ticker48];
    const icon=(typeof severityIcon==='function')
      ? severityIcon(x.severity)
      : (x.severity==='red'?'●':x.severity==='orange'?'▲':'◆');
    bar.innerHTML=
      `<button id="v48TopCurrent" class="top-action-current ${x.severity||'yellow'}">
        <span class="top-action-label">${icon} B7 FI ACTIONS</span>
        <strong>${esc(x.text||'')}</strong>
        <span class="top-action-count">${ticker48+1} / ${items.length}</span>
        <span class="top-action-open">OPEN →</span>
      </button>
      <button id="v48TopAll" class="top-action-all">ALL ${items.length}</button>`;
    const cur=document.getElementById('v48TopCurrent');
    const all=document.getElementById('v48TopAll');
    if(cur)cur.onclick=()=>typeof actionTarget==='function'&&actionTarget(x);
    if(all)all.onclick=()=>setView('actions');
  }

  setInterval(()=>refreshTicker48(true),7000);

  const oldRender48=render;
  render=function(){
    oldRender48();
    setTimeout(()=>{
      bindKnowledge48();
      refreshTicker48(false);
      try{updateOperationsBar()}catch(e){}
    },0);
  };

  const oldWeekend48=weekend;
  weekend=function(){
    oldWeekend48();
    document.querySelectorAll('.weekend-date-banner').forEach(x=>x.remove());
    refreshTicker48(false);
  };

  const oldWorkspace48=workspace;
  workspace=function(tab='tasks'){
    oldWorkspace48(tab);
    if(view==='knowledge' || (tab==='reference' && document.body.dataset.theme==='knowledge')){
      view='knowledge';
      document.body.dataset.theme='knowledge';
      setHeaderContext('FI KNOWLEDGE BASE','Special Notes · Quick Reference');
      document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='knowledge'));
    }
  };

  document.title=`B7 FI Command Center v${VERSION}`;
  const ver=document.getElementById('appVersionLabel');
  if(ver)ver.textContent=`B7 FI Command Center v${VERSION}`;
  setTimeout(()=>{
    bindKnowledge48();
    refreshTicker48(false);
    try{updateOperationsBar()}catch(e){}
  },0);
})();

/* ===== SOURCE: js/patch-v0490.js ===== */
/* B7 FI Command Center v1.0.3 — Knowledge Base + Framework Fix */
(function(){
  const VERSION=window.B7_APP_VERSION||'1.0.3';

  function ensureKnowledge49(){
    state.knowledgeNotes=Array.isArray(state.knowledgeNotes)?state.knowledgeNotes:[];
  }
  ensureKnowledge49();

  const KB_CATS=['Favorites','Part Numbers','Procedures','Wafer Information','Tool / Model Notes','Troubleshooting','Contacts','Shipping / Packing','Software / Versions','Customer Notes','General Reference'];

  function kbFiltered49(){
    ensureKnowledge49();
    const q=(document.getElementById('kbSearch49')?.value||'').trim().toLowerCase();
    const cat=document.getElementById('kbCategory49')?.value||'All Categories';
    return state.knowledgeNotes
      .filter(n=>cat==='All Categories' || (cat==='Favorites'?n.favorite:n.category===cat))
      .filter(n=>{
        if(!q)return true;
        return [n.title,n.category,n.tags,n.partNumber,n.toolModel,n.value,n.notes]
          .some(v=>String(v||'').toLowerCase().includes(q));
      })
      .sort((a,b)=>(Number(!!b.favorite)-Number(!!a.favorite)) ||
        String(a.category||'').localeCompare(String(b.category||'')) ||
        String(a.title||'').localeCompare(String(b.title||'')));
  }

  function kbCard49(n){
    return `<article class="kb-card49 ${n.favorite?'favorite':''}" data-kbid="${esc(n.id)}">
      <div class="kb-card-head49">
        <div>
          <span class="kb-cat49">${esc(n.category||'General Reference')}</span>
          <h3>${esc(n.title||'Untitled Reference')}</h3>
        </div>
        <button class="kb-fav49 ${n.favorite?'on':''}" title="Favorite">${n.favorite?'★':'☆'}</button>
      </div>
      <div class="kb-quick49">
        ${n.partNumber?`<div><span>PART NUMBER</span><b>${esc(n.partNumber)}</b></div>`:''}
        ${n.toolModel?`<div><span>TOOL / MODEL</span><b>${esc(n.toolModel)}</b></div>`:''}
        ${n.value?`<div><span>QUICK VALUE</span><b>${esc(n.value)}</b></div>`:''}
      </div>
      ${n.notes?`<div class="kb-notes49">${esc(n.notes).replace(/\n/g,'<br>')}</div>`:''}
      ${n.tags?`<div class="kb-tags49">${esc(n.tags)}</div>`:''}
      <div class="kb-card-actions49">
        <button class="btn small kb-copy49">Copy</button>
        <button class="btn small kb-edit49">Edit</button>
        <button class="btn small danger kb-delete49">Delete</button>
      </div>
    </article>`;
  }

  function kbEditor49(note=null){
    const n=note||{id:'',title:'',category:'General Reference',tags:'',partNumber:'',toolModel:'',value:'',notes:'',favorite:false};
    return `<section class="panel kb-editor49">
      <div class="subsection-title">
        <div><h3>${note?'Edit Reference Note':'Add Reference Note'}</h3><p class="helper">Store information you repeatedly need so it is searchable instead of buried in the legacy Word document.</p></div>
        <button id="kbCancel49" class="btn">Cancel</button>
      </div>
      <div class="kb-form49">
        <div class="form-group wide"><label>Title</label><input id="kbTitle49" value="${esc(n.title)}" placeholder="Example: B60 wafer part number"></div>
        <div class="form-group"><label>Category</label><select id="kbCatEdit49">${KB_CATS.filter(x=>x!=='Favorites').map(x=>`<option ${n.category===x?'selected':''}>${esc(x)}</option>`).join('')}</select></div>
        <div class="form-group"><label>Part Number (optional)</label><input id="kbPart49" value="${esc(n.partNumber)}"></div>
        <div class="form-group"><label>Tool / Model (optional)</label><input id="kbModel49" value="${esc(n.toolModel)}" placeholder="29XX, R915, 2955..."></div>
        <div class="form-group"><label>Quick Value / Reference</label><input id="kbValue49" value="${esc(n.value)}" placeholder="Short value you need quickly"></div>
        <div class="form-group wide"><label>Keywords / Tags</label><input id="kbTags49" value="${esc(n.tags)}" placeholder="lamp, wafer, packing, R915..."></div>
        <div class="form-group wide"><label>Detailed Notes / Instructions</label><textarea id="kbNotes49" class="kb-details49">${esc(n.notes)}</textarea></div>
        <label class="kb-favorite-check49"><input id="kbFavorite49" type="checkbox" ${n.favorite?'checked':''}> Favorite / Frequently Used</label>
      </div>
      <div class="actions"><button id="kbSave49" class="btn primary">${note?'Save Changes':'Add to Knowledge Base'}</button></div>
    </section>`;
  }

  function renderKnowledgeCards49(){
    const host=document.getElementById('kbCards49');
    if(!host)return;
    const items=kbFiltered49();
    host.innerHTML=items.length?items.map(kbCard49).join(''):`<div class="notice">No matching reference notes. Use + Add Reference Note to create one.</div>`;
    host.querySelectorAll('[data-kbid]').forEach(card=>{
      const n=state.knowledgeNotes.find(x=>x.id===card.dataset.kbid);
      if(!n)return;
      card.querySelector('.kb-fav49').onclick=()=>{n.favorite=!n.favorite;save();renderKnowledgeCards49()};
      card.querySelector('.kb-edit49').onclick=()=>openKbEditor49(n.id);
      card.querySelector('.kb-delete49').onclick=()=>{if(confirm(`Delete "${n.title}"?`)){state.knowledgeNotes=state.knowledgeNotes.filter(x=>x.id!==n.id);save();renderKnowledgeCards49()}};
      card.querySelector('.kb-copy49').onclick=async()=>{
        const txt=[n.title,n.partNumber&&`Part Number: ${n.partNumber}`,n.toolModel&&`Tool/Model: ${n.toolModel}`,n.value&&`Reference: ${n.value}`,n.notes].filter(Boolean).join('\n');
        try{await navigator.clipboard.writeText(txt);card.querySelector('.kb-copy49').textContent='Copied';setTimeout(()=>card.querySelector('.kb-copy49')&&(card.querySelector('.kb-copy49').textContent='Copy'),900)}
        catch(e){prompt('Copy reference:',txt)}
      };
    });
  }

  function openKbEditor49(id=''){
    const n=id?state.knowledgeNotes.find(x=>x.id===id):null;
    const host=document.getElementById('kbEditorHost49');
    if(!host)return;
    host.innerHTML=kbEditor49(n||null);
    host.scrollIntoView({behavior:'smooth',block:'start'});
    document.getElementById('kbCancel49').onclick=()=>{host.innerHTML=''};
    document.getElementById('kbSave49').onclick=()=>{
      const title=document.getElementById('kbTitle49').value.trim();
      if(!title)return alert('Title is required.');
      const obj={
        id:n?.id||('kb'+Date.now()),
        title,
        category:document.getElementById('kbCatEdit49').value,
        partNumber:document.getElementById('kbPart49').value.trim(),
        toolModel:document.getElementById('kbModel49').value.trim(),
        value:document.getElementById('kbValue49').value.trim(),
        tags:document.getElementById('kbTags49').value.trim(),
        notes:document.getElementById('kbNotes49').value.trim(),
        favorite:document.getElementById('kbFavorite49').checked,
        updatedAt:new Date().toISOString(),
        createdAt:n?.createdAt||new Date().toISOString()
      };
      if(n)state.knowledgeNotes[state.knowledgeNotes.findIndex(x=>x.id===n.id)]=obj;
      else state.knowledgeNotes.unshift(obj);
      save();host.innerHTML='';renderKnowledgeCards49();
    };
  }

  function knowledgePage49(){
    ensureKnowledge49();
    view='knowledge';
    document.body.dataset.theme='knowledge';
    setHeaderContext('FI KNOWLEDGE BASE','Special Notes · Quick Reference');
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='knowledge'));
    app.innerHTML=`<div class="report-screen knowledge-page49">
      ${reportHeader('FI KNOWLEDGE BASE / SPECIAL NOTES','Searchable permanent reference for part numbers, procedures, recurring information and FI knowledge.')}
      <section class="panel kb-toolbar49">
        <div class="kb-search49">
          <input id="kbSearch49" type="search" placeholder="Search title, part number, model, notes or tags...">
          <select id="kbCategory49"><option>All Categories</option>${KB_CATS.map(x=>`<option>${esc(x)}</option>`).join('')}</select>
          <button id="kbAdd49" class="btn primary">+ Add Reference Note</button>
        </div>
        <div class="kb-summary49"><span><b>${state.knowledgeNotes.length}</b> saved notes</span><span><b>${state.knowledgeNotes.filter(x=>x.favorite).length}</b> favorites</span><span>Legacy Word document remains available in Reference Files.</span></div>
      </section>
      <div id="kbEditorHost49"></div>
      <section class="panel">
        <div id="kbCards49" class="kb-grid49"></div>
      </section>
    </div>`;
    document.getElementById('kbSearch49').oninput=renderKnowledgeCards49;
    document.getElementById('kbCategory49').onchange=renderKnowledgeCards49;
    document.getElementById('kbAdd49').onclick=()=>openKbEditor49('');
    renderKnowledgeCards49();
    actions([{label:'Reference Files',fn:()=>setView('references')},{label:'Lead Workspace',fn:()=>setView('workspace')},{label:'Administration',fn:()=>setView('admin')}],false);
    syncFramework49();
  }

  const oldSetView49=setView;
  setView=function(v){
    if(v==='knowledge'){window.scrollTo(0,0);knowledgePage49();return}
    oldSetView49(v);
    setTimeout(syncFramework49,0);
  };

  function bindNav49(){
    document.querySelectorAll('.nav-btn').forEach(b=>{
      if(b.dataset.view==='knowledge')b.onclick=()=>setView('knowledge');
    });
  }

  /* Make the bottom bar always inherit the currently computed page accent.
     This avoids stale hard-coded page mappings. */
  function syncFramework49(){
    const body=getComputedStyle(document.body);
    const accent=(body.getPropertyValue('--accent')||'#e4b84d').trim();
    const rgb=(body.getPropertyValue('--accent-rgb')||'228,184,77').trim();
    document.documentElement.style.setProperty('--live-page-accent',accent);
    document.documentElement.style.setProperty('--live-page-rgb',rgb);
    document.body.style.setProperty('--fleet-accent',accent);
    document.body.style.setProperty('--fleet-rgb',rgb);

    const op=document.getElementById('operationsBar');
    if(op){
      op.style.setProperty('border-top-color',accent,'important');
      op.style.setProperty('border-bottom-color',accent,'important');
    }

    /* Remove old persistent blue box from Shared Data / other inactive nav controls. */
    document.querySelectorAll('.main-nav .nav-btn:not(.active)').forEach(b=>{
      b.style.removeProperty('outline');
      b.style.removeProperty('box-shadow');
    });
  }

  /* Preserve all normal render behavior, then re-sync framework visuals. */
  const oldRender49=render;
  render=function(){
    oldRender49();
    setTimeout(()=>{bindNav49();syncFramework49()},0);
  };

  /* Morning Status: Knowledge Base belongs in the main nav, not duplicated in Page Actions. */
  const oldMorning49=morning;
  morning=function(){
    oldMorning49();
    document.querySelectorAll('.page-toolbar button').forEach(b=>{
      if(b.textContent.trim().toLowerCase()==='fi knowledge base')b.remove();
    });
    syncFramework49();
  };

  document.title=`B7 FI Command Center v${VERSION}`;
  const ver=document.getElementById('appVersionLabel');
  if(ver)ver.textContent=`B7 FI Command Center v${VERSION}`;
  setTimeout(()=>{bindNav49();syncFramework49()},0);
})();

/* ===== SOURCE: js/patch-v0491.js ===== */
/* B7 FI Command Center v1.0.3 — Header / Page Actions Final Layout Fix */
(function(){
  const VERSION=window.B7_APP_VERSION||'1.0.3';

  function normalizeHeader491(){
    const stack=document.querySelector('.header-status-stack');
    const bar=document.getElementById('topActionBar');
    const toolbar=document.querySelector('.header-status-stack .page-toolbar');
    if(stack){
      stack.style.removeProperty('height');
      stack.style.removeProperty('max-height');
      stack.style.removeProperty('min-height');
    }
    if(bar){
      bar.style.removeProperty('top');
      bar.style.removeProperty('bottom');
      bar.style.removeProperty('transform');
      bar.style.removeProperty('margin-bottom');
    }
    if(toolbar){
      ['top','bottom','transform','margin-top','margin-bottom','position'].forEach(k=>toolbar.style.removeProperty(k));
    }
  }

  const oldRender491=render;
  render=function(){
    oldRender491();
    setTimeout(normalizeHeader491,0);
  };

  const oldActions491=actions;
  actions=function(){
    const r=oldActions491.apply(this,arguments);
    setTimeout(normalizeHeader491,0);
    return r;
  };

  document.title=`B7 FI Command Center v${VERSION}`;
  const ver=document.getElementById('appVersionLabel');
  if(ver)ver.textContent=`B7 FI Command Center v${VERSION}`;
  setTimeout(normalizeHeader491,0);
})();

/* ===== SOURCE: js/patch-v0492.js ===== */
/* B7 FI Command Center v1.0.3 — Action Center Manual Reminder Control */
(function(){
  const VERSION=window.B7_APP_VERSION||'1.0.3';
  const baseV3Alerts492=v3Alerts;

  function ensureManual492(){
    state.manualReminders=Array.isArray(state.manualReminders)?state.manualReminders:[];
    state.manualReminders.forEach(r=>{
      if(!('assignee' in r))r.assignee='';
      if(!('showTicker' in r))r.showTicker=true;
      if(!r.tickerMode)r.tickerMode='until-complete';
      if(!('tickerUntil' in r))r.tickerUntil='';
      if(!('updatedAt' in r))r.updatedAt=r.createdAt||new Date().toISOString();
    });
  }
  ensureManual492();

  function dayISO492(offset){
    const d=new Date(); d.setHours(12,0,0,0); d.setDate(d.getDate()+offset);
    return d.toISOString().slice(0,10);
  }
  function manualTickerActive492(r){
    if(r.complete || r.showTicker===false)return false;
    if(r.tickerMode==='until-complete' || !r.tickerMode)return true;
    if(r.tickerMode==='today')return dayISO492(0)<=String(r.tickerUntil||dayISO492(0));
    if(['1-day','3-days','7-days','custom'].includes(r.tickerMode)){
      return !r.tickerUntil || dayISO492(0)<=r.tickerUntil;
    }
    return true;
  }
  function manualAlert492(r){
    const owner=r.assignee?` · Lead: ${r.assignee}`:'';
    return {
      severity:r.severity||'yellow',
      priority:r.severity==='red'?10:r.severity==='orange'?7:r.severity==='blue'?2:4,
      text:`${r.toolId?'TOOL '+r.toolId+' — ':''}${r.text}${owner}`,
      toolId:r.toolId||'',
      tab:r.tab||'basic',
      id:'manual:'+r.id,
      manual:true,
      reminderId:r.id,
      assignee:r.assignee||''
    };
  }
  function allAlerts492(){
    ensureManual492();
    // Keep generated items from the existing engine, but rebuild manual reminders ourselves
    // so they can carry owner/ticker metadata without changing automatic tasks.
    const generated=(baseV3Alerts492()||[]).filter(x=>!String(x.id||'').startsWith('manual:'));
    const manual=state.manualReminders.filter(r=>!r.complete).map(manualAlert492);
    return [...generated,...manual].sort((a,b)=>(b.priority||0)-(a.priority||0));
  }
  function tickerAlerts492(){
    const all=allAlerts492();
    return all.filter(a=>{
      if(!a.manual)return true; // automatic conditions always remain visible while true
      const r=state.manualReminders.find(x=>x.id===a.reminderId);
      return r && manualTickerActive492(r);
    });
  }

  // Top B7 FI Actions continues using v3Alerts, but now only manual reminders obey ticker duration.
  v3Alerts=function(){return tickerAlerts492()};

  function leadChoices492(){
    let vals=[];
    try{vals.push(...remembered('driver'))}catch(e){}
    vals.push(...tools.map(t=>t.driver),...(state.workspaceTasks||[]).map(t=>t.assignee));
    return [...new Set(vals.map(x=>String(x||'').trim()).filter(x=>x && x!=='Unassigned'))].sort();
  }
  function durationLabel492(r){
    if(r.showTicker===false)return'Ticker: OFF';
    if(r.tickerMode==='until-complete')return'Ticker: Until Complete';
    if(r.tickerUntil)return`Ticker through ${fmt(r.tickerUntil)}`;
    return'Ticker: Timed';
  }
  function manualControlCard492(a){
    const r=state.manualReminders.find(x=>x.id===a.reminderId);
    if(!r)return'';
    return `<div class="action-item manual-action492 ${a.severity}" data-reminder-id="${esc(r.id)}">
      <span class="action-symbol">${severityIcon(a.severity)}</span>
      <div class="manual-main492">
        <b>${esc((r.toolId?'TOOL '+r.toolId+' — ':'')+r.text)}</b>
        <small>${r.assignee?`Assigned: ${esc(r.assignee)} · `:''}${esc(durationLabel492(r))}</small>
      </div>
      <div class="manual-controls492">
        <button class="btn small mrEdit492">Edit</button>
        <button class="btn small mrComplete492">Complete</button>
      </div>
    </div>`;
  }
  function generatedCard492(a,idx){
    return `<button class="action-item ${a.severity}" data-auto-index="${idx}">
      <span>${severityIcon(a.severity)}</span><b>${esc(a.text)}</b><span>OPEN →</span>
    </button>`;
  }
  function actionForm492(edit=null){
    const r=edit||{toolId:'',severity:'yellow',text:'',assignee:'',showTicker:true,tickerMode:'until-complete',tickerUntil:''};
    const leads=leadChoices492();
    return `<section class="panel manual-editor492">
      <div class="subsection-title"><h3>${edit?'Edit Manual Reminder':'Add Manual Reminder'}</h3>${edit?'<button id="mrCancel492" class="btn">Cancel</button>':''}</div>
      <div class="manual-grid492">
        <div class="form-group"><label>Tool</label><select id="mrTool492"><option value="">General / No Tool</option>${current().map(t=>`<option value="${esc(t.id)}" ${r.toolId===t.id?'selected':''}>${esc(t.id)} · ${esc(t.codename)}</option>`).join('')}</select></div>
        <div class="form-group"><label>Category</label><select id="mrSeverity492">
          <option value="red" ${r.severity==='red'?'selected':''}>Critical</option>
          <option value="orange" ${r.severity==='orange'?'selected':''}>Attention</option>
          <option value="yellow" ${r.severity==='yellow'?'selected':''}>Reminder / Next Action</option>
          <option value="blue" ${r.severity==='blue'?'selected':''}>Information</option>
        </select></div>
        <div class="form-group"><label>Assigned Lead</label><input id="mrLead492" list="mrLeadList492" value="${esc(r.assignee||'')}" placeholder="Optional"><datalist id="mrLeadList492">${leads.map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div>
        <div class="form-group"><label>Top Status Bar</label><select id="mrShowTicker492"><option value="yes" ${r.showTicker!==false?'selected':''}>Show</option><option value="no" ${r.showTicker===false?'selected':''}>Do Not Show</option></select></div>
        <div class="form-group"><label>Display Duration</label><select id="mrDuration492">
          <option value="until-complete" ${r.tickerMode==='until-complete'?'selected':''}>Until Completed</option>
          <option value="today" ${r.tickerMode==='today'?'selected':''}>Today Only</option>
          <option value="1-day" ${r.tickerMode==='1-day'?'selected':''}>1 Day</option>
          <option value="3-days" ${r.tickerMode==='3-days'?'selected':''}>3 Days</option>
          <option value="7-days" ${r.tickerMode==='7-days'?'selected':''}>7 Days</option>
          <option value="custom" ${r.tickerMode==='custom'?'selected':''}>Custom End Date</option>
        </select></div>
        <div class="form-group"><label>Display Through</label><input id="mrUntil492" type="date" value="${esc(r.tickerUntil||'')}"></div>
        <div class="form-group wide"><label>Reminder / Information</label><input id="mrText492" value="${esc(r.text||'')}" placeholder="Reminder, follow-up, information or handoff note"></div>
      </div>
      <div class="actions"><button id="mrSave492" class="btn primary">${edit?'Save Reminder':'Add Reminder'}</button></div>
    </section>`;
  }

  function calculateUntil492(mode,current=''){
    if(mode==='until-complete')return'';
    if(mode==='today')return dayISO492(0);
    if(mode==='1-day')return dayISO492(1);
    if(mode==='3-days')return dayISO492(3);
    if(mode==='7-days')return dayISO492(7);
    return current||'';
  }

  let editReminder492='';
  actionCenter=function(){
    ensureManual492();
    setHeaderContext('ACTION CENTER','Automatic operational alerts + controlled manual reminders');
    const a=allAlerts492();
    const groups=[['red','CRITICAL'],['orange','ATTENTION'],['yellow','REMINDERS / NEXT ACTIONS'],['blue','INFORMATION']];
    const manuals=new Set(a.filter(x=>x.manual).map(x=>x.id));

    app.innerHTML=`<div class="action-summary-grid">
      ${groups.slice(0,3).map(([s,l])=>`<div class="action-summary ${s}"><span>${l}</span><strong>${a.filter(x=>x.severity===s).length}</strong></div>`).join('')}
      <div class="action-summary total"><span>TOTAL OPEN</span><strong>${a.length}</strong></div>
    </div>
    <div class="action-center-grid">
      ${groups.map(([s,l])=>{
        const aa=a.filter(x=>x.severity===s);
        return `<section class="panel action-group"><h3>${l}</h3>
          ${aa.length?aa.map(x=>x.manual?manualControlCard492(x):generatedCard492(x,a.indexOf(x))).join(''):'<div class="notice">No items in this group.</div>'}
        </section>`;
      }).join('')}
    </div>
    <div id="mrEditorHost492">${actionForm492(editReminder492?state.manualReminders.find(x=>x.id===editReminder492):null)}</div>`;

    document.querySelectorAll('[data-auto-index]').forEach(b=>b.onclick=()=>actionTarget(a[Number(b.dataset.autoIndex)]));
    document.querySelectorAll('.mrEdit492').forEach(b=>b.onclick=()=>{
      editReminder492=b.closest('[data-reminder-id]').dataset.reminderId;
      actionCenter();
      document.getElementById('mrEditorHost492')?.scrollIntoView({behavior:'smooth',block:'center'});
    });
    document.querySelectorAll('.mrComplete492').forEach(b=>b.onclick=()=>{
      const id=b.closest('[data-reminder-id]').dataset.reminderId;
      const r=state.manualReminders.find(x=>x.id===id);
      if(r){r.complete=true;r.updatedAt=new Date().toISOString();save();editReminder492='';actionCenter();try{updateOperationsBar()}catch(e){}}
    });

    const dur=document.getElementById('mrDuration492'),until=document.getElementById('mrUntil492');
    if(dur&&until)dur.onchange=()=>{
      until.value=calculateUntil492(dur.value,until.value);
      until.disabled=dur.value!=='custom';
    };
    if(dur&&until){until.disabled=dur.value!=='custom';}

    const cancel=document.getElementById('mrCancel492');
    if(cancel)cancel.onclick=()=>{editReminder492='';actionCenter()};

    document.getElementById('mrSave492').onclick=()=>{
      const text=document.getElementById('mrText492').value.trim();
      if(!text)return alert('Reminder / information text is required.');
      const mode=document.getElementById('mrDuration492').value;
      const obj={
        id:editReminder492||('mr'+Date.now()),
        toolId:document.getElementById('mrTool492').value,
        severity:document.getElementById('mrSeverity492').value,
        text,
        assignee:document.getElementById('mrLead492').value.trim(),
        showTicker:document.getElementById('mrShowTicker492').value==='yes',
        tickerMode:mode,
        tickerUntil:calculateUntil492(mode,document.getElementById('mrUntil492').value),
        complete:false,
        createdAt:editReminder492?(state.manualReminders.find(x=>x.id===editReminder492)?.createdAt||new Date().toISOString()):new Date().toISOString(),
        updatedAt:new Date().toISOString()
      };
      if(editReminder492){
        const i=state.manualReminders.findIndex(x=>x.id===editReminder492);
        if(i>=0)state.manualReminders[i]=obj;
      }else state.manualReminders.unshift(obj);
      editReminder492='';
      save();actionCenter();try{updateOperationsBar()}catch(e){}
    };

    actions([{label:'Morning Status',fn:()=>setView('meeting')},{label:'Lead Workspace',fn:()=>setView('workspace')},{label:'Tools',fn:()=>setView('systems')}],false);
  };

  // Bottom bar should count all open Action Center items, not only ticker-visible manual reminders.
  const priorOps492=updateOperationsBar;
  updateOperationsBar=function(){
    priorOps492();
    const all=allAlerts492();
    const tc=document.getElementById('opsTaskCount');
    if(tc)tc.textContent=`${all.length} open action${all.length===1?'':'s'}`;
  };

  document.title=`B7 FI Command Center v${VERSION}`;
  const ver=document.getElementById('appVersionLabel');
  if(ver)ver.textContent=`B7 FI Command Center v${VERSION}`;
})();

/* ===== SOURCE: js/patch-v0500.js ===== */
/* B7 FI Command Center v1.0.3 — Home + Report Center + Meeting Actions + Exceptions QA */
(function(){
const VERSION=window.B7_APP_VERSION||'1.0.3';
const oldSetView500=setView;
const oldRender500=render;
const oldCountdown500=countdown;
const oldMorning500=morning;
const oldReferences500=referencesPage;

function ensure500(){
  state.toolExceptions=state.toolExceptions||{};
  state.exceptionTypes=Array.isArray(state.exceptionTypes)?state.exceptionTypes:[
    {id:'no-cables',label:'NO CABLES',severity:'orange'},
    {id:'no-chiller',label:'NO CHILLER',severity:'orange'},
    {id:'special-packing',label:'SPECIAL PACKING',severity:'yellow'},
    {id:'special-wafers',label:'SPECIAL WAFERS',severity:'yellow'},
    {id:'customer-specific',label:'CUSTOMER REQUIREMENT',severity:'blue'}
  ];
  state.meetingHistory=Array.isArray(state.meetingHistory)?state.meetingHistory:[];
  state.meetingActions=Array.isArray(state.meetingActions)?state.meetingActions:[];
}
ensure500();

function active500(){return typeof current==='function'?current():tools}
function counts500(){
 const a=active500(), q=a.filter(t=>!t.quarter||t.quarter===quarterLabel()||true);
 return {
  total:a.length,
  waiting:a.filter(t=>t.quarterStatus==='Waiting for FI').length,
  infi:a.filter(t=>t.quarterStatus==='In FI').length,
  shipped:a.filter(t=>t.quarterStatus==='Shipped').length,
  packing:a.filter(t=>typeof packingActive==='function'&&packingActive(t)).length,
  actions:(typeof v3Alerts==='function'?(v3Alerts()||[]):[]),
  tasks:(state.workspaceTasks||[]).filter(x=>x.status!=='Completed')
 }
}
function homeCard500(title,value,sub,viewName,cls=''){
 return `<button class="home-card500 ${cls}" data-home-view="${viewName}"><span>${esc(title)}</span><strong>${esc(String(value))}</strong><small>${esc(sub)}</small><b>OPEN →</b></button>`
}
function home500(){
 view='home'; document.body.dataset.theme='home';
 setHeaderContext('B7 FI COMMAND CENTER','Live Operations Overview · Command Home');
 document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='home'));
 const c=counts500(), crit=c.actions.filter(x=>x.severity==='red').length, att=c.actions.filter(x=>x.severity==='orange').length;
 app.innerHTML=`<div class="report-screen home500">
 ${reportHeader('B7 FI COMMAND CENTER · OPERATIONS HOME','Live operational launchpad for B7 Final Integration.')}
 <section class="home-hero500">
  <div><span>CURRENT FLEET</span><strong>${c.total}</strong><small>${c.infi} In FI · ${c.packing} Packing · ${c.waiting} Waiting · ${c.shipped} Shipped</small></div>
  <div><span>ACTION CENTER</span><strong>${c.actions.length}</strong><small>${crit} Critical · ${att} Attention</small></div>
  <div><span>OPEN LEAD TASKS</span><strong>${c.tasks.length}</strong><small>Lead Workspace + meeting follow-ups</small></div>
 </section>
 <section class="home-grid500">
  ${homeCard500('Tool Countdown',`${c.shipped} / ${c.total}`,'Quarter team progress','countdown','gold')}
  ${homeCard500('Morning Meeting','OPEN','Notebook · history · meeting actions','meeting','orange')}
  ${homeCard500('Action Center',c.actions.length,`${crit} critical · ${att} attention`,'actions','red')}
  ${homeCard500('Weekday Priorities','TODAY','Current B7 priorities','daily','green')}
  ${homeCard500('Weekend Priorities','WEEKEND','Saturday + Sunday volunteers','weekend','purple')}
  ${homeCard500('Shipping Schedule',c.packing,'Packing / active handoffs','shipping','cyan')}
  ${homeCard500('Tools',c.total,'All tool lifecycle cards','systems','blue')}
  ${homeCard500('Add Tool','+','New FI handoff','admin','silver')}
  ${homeCard500('FI Knowledge Base',(state.knowledgeNotes||[]).length,'Searchable FI reference','knowledge','teal')}
  <button class="home-card500 report" id="homeReport500"><span>REPORT CENTER</span><strong>FULL</strong><small>Visual Command Center report + all tools</small><b>GENERATE →</b></button>
 </section></div>`;
 document.querySelectorAll('[data-home-view]').forEach(b=>b.onclick=()=>setView(b.dataset.homeView));
 $('#homeReport500').onclick=()=>reportCenter500();
 actions([{label:'Tool Countdown',primary:true,fn:()=>setView('countdown')},{label:'Morning Meeting',fn:()=>setView('meeting')},{label:'Add Tool',fn:()=>setView('admin')},{label:'Generate Full Report',fn:reportCenter500}],false);
}

function reportCenter500(){
 const c=counts500();
 const rows=active500().map(t=>{
   let ex=(state.toolExceptions[t.id]||[]).filter(x=>x.active!==false).map(x=>x.label).join(', ');
   return `<tr><td><b>${esc(t.id)}</b></td><td>${esc(t.codename||'')}</td><td>${esc(t.model||'')}</td><td>${esc(t.customer||'')}</td><td>${esc(t.quarterStatus||'')}</td><td>${fmt(t.ship)}</td><td>${esc(t.checklist||'')}</td><td>${typeof fiProgress==='function'?fiProgress(t):0}%</td><td>${esc(t.driver||'')}</td><td>${esc(ex||'—')}</td></tr>`;
 }).join('');
 const w=window.open('','_blank');
 if(!w)return alert('The browser blocked the report window. Allow pop-ups for the Command Center and try again.');
 const date=new Date().toLocaleString();
 w.document.write(`<!doctype html><html><head><title>B7 FI Full Command Center Report</title><style>
 body{margin:0;background:#06111d;color:#eef6ff;font:12px Arial,sans-serif}.wrap{padding:28px}.head{border:1px solid #38516b;border-top:4px solid #e4b84d;padding:20px;background:#091827}.head h1{margin:0 0 5px;font-size:26px}.muted{color:#9bb0c4}.stats{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:16px 0}.stat{border:1px solid #31475d;background:#0a1929;padding:13px}.stat b{font-size:22px;display:block;margin-top:5px}h2{margin-top:28px;border-bottom:2px solid #e4b84d;padding-bottom:7px}table{width:100%;border-collapse:collapse;background:#081522}th,td{border:1px solid #2c4155;padding:7px;text-align:left;vertical-align:top}th{background:#10263a;color:#e4b84d}.tool{page-break-inside:avoid;border:1px solid #31475d;border-left:4px solid #55a4f6;background:#081522;padding:13px;margin:10px 0}.tool h3{margin:0 0 8px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.box{border:1px solid #263d53;padding:7px}.notes{white-space:pre-wrap;margin-top:8px;color:#dce8f4}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.no-print{display:none}.wrap{padding:12px}@page{size:landscape;margin:8mm}}
 </style></head><body><div class="wrap"><div class="head"><h1>B7 FI COMMAND CENTER · FULL OPERATIONS REPORT</h1><div class="muted">Generated ${esc(date)} · ${esc(quarterLabel())}</div></div>
 <div class="stats"><div class="stat">TOTAL TOOLS<b>${c.total}</b></div><div class="stat">WAITING FI<b>${c.waiting}</b></div><div class="stat">IN FI<b>${c.infi}</b></div><div class="stat">PACKING<b>${c.packing}</b></div><div class="stat">SHIPPED<b>${c.shipped}</b></div></div>
 <button class="no-print" onclick="window.print()" style="padding:10px 16px;font-weight:bold">PRINT / SAVE AS PDF</button>
 <h2>Tool Countdown / Fleet Summary</h2><table><thead><tr><th>UTID</th><th>Code Name</th><th>Model</th><th>Customer</th><th>Lifecycle</th><th>Ship Date</th><th>Checklist</th><th>FI Progress</th><th>Driver</th><th>Exceptions</th></tr></thead><tbody>${rows}</tbody></table>
 <h2>Action Center</h2>${(typeof v3Alerts==='function'?(v3Alerts()||[]):[]).map(a=>`<div class="tool"><b>${esc((a.severity||'').toUpperCase())}</b> · ${esc(a.text||'')}</div>`).join('')||'<div class="muted">No open actions.</div>'}
 <h2>Individual Tool Detail</h2>${active500().map(t=>`<section class="tool"><h3>${esc(t.id)} · ${esc(t.codename)} · ${esc(t.model)}</h3><div class="grid"><div class="box">Customer<br><b>${esc(t.customer||'—')}</b></div><div class="box">Ship Date<br><b>${fmt(t.ship)}</b></div><div class="box">Driver<br><b>${esc(t.driver||'—')}</b></div><div class="box">Lifecycle<br><b>${esc(t.quarterStatus||'—')}</b></div><div class="box">Current Checklist<br><b>${esc(t.checklist||'—')}</b></div><div class="box">FI Progress<br><b>${typeof fiProgress==='function'?fiProgress(t):0}%</b></div><div class="box">Customer Source<br><b>${esc(t.sourceRequired||'TBD')} · ${esc(t.sourceStatus||'')}</b></div><div class="box">STR<br><b>${esc(t.strRequired||'TBD')} · ${esc(t.strStatus||'')}</b></div></div><div class="notes"><b>Latest Status</b>\n${esc(t.activity||'—')}\n\n<b>Notes</b>\n${esc(t.notes||t.custom?.notes||'—')}</div></section>`).join('')}
 </div></body></html>`);
 w.document.close();
}

function meetingAction500(toolId,date){
 const title=prompt(`Action item${toolId?' for '+toolId:''}:`,'');
 if(!title)return;
 const assignee=prompt('Assign to lead (optional):','')||'';
 const id='mtg'+Date.now();
 state.workspaceTasks=state.workspaceTasks||[];
 state.workspaceTasks.unshift({id,title,toolId:toolId||'',assignee,status:'Not Started',priority:'Normal',source:`Morning Meeting ${date}`,created:new Date().toISOString()});
 state.meetingActions.unshift({id,title,toolId:toolId||'',assignee,date,status:'Open',created:new Date().toISOString()});
 save();
 alert('Action added to the meeting record and Lead Workspace / Action Center.');
 morning();
}
function enhanceMorning500(){
 const recDate=(typeof today47==='function'?today47():new Date().toISOString().slice(0,10));
 document.querySelectorAll('.tool-note-entry').forEach(box=>{
  if(box.querySelector('.meeting-action500'))return;
  const ta=box.querySelector('[data-meeting-tool]'); if(!ta)return;
  const b=document.createElement('button'); b.className='btn small meeting-action500'; b.textContent='+ Action Item';
  b.onclick=()=>meetingAction500(ta.dataset.meetingTool,recDate);
  box.querySelector('.tool-note-label')?.appendChild(b);
 });
 const g=document.querySelector('.general-note-entry .tool-note-label');
 if(g&&!g.querySelector('.meeting-action500')){
  const b=document.createElement('button');b.className='btn small meeting-action500';b.textContent='+ General Action';b.onclick=()=>meetingAction500('',recDate);g.appendChild(b)
 }
 // Add edit/action controls to saved meeting records.
 document.querySelectorAll('.meeting-history details').forEach((d,i)=>{
  if(d.querySelector('.history-controls500'))return;
  const hist=state.meetingHistory[i]; if(!hist)return;
  const ctl=document.createElement('div');ctl.className='history-controls500';
  ctl.innerHTML='<button class="btn small edit-hist500">Edit Meeting</button><button class="btn small action-hist500">+ Action</button>';
  d.appendChild(ctl);
  ctl.querySelector('.edit-hist500').onclick=()=>{
   state.meetings=state.meetings||{};
   state.meetings[hist.date]=JSON.parse(JSON.stringify(hist));
   save();
   alert(`Meeting ${hist.date} reopened. Its notes are loaded into the Morning Meeting notebook record. You can edit and save the snapshot again.`);
  };
  ctl.querySelector('.action-hist500').onclick=()=>meetingAction500('',hist.date);
 });
}

function exceptionsPanel500(){
 const t=typeof selectedTool==='function'?selectedTool():null;
 if(!t)return;
 const host=document.querySelector('.tool-detail-grid,.tool-detail-page,.system-detail');
 if(!host||document.querySelector('.exceptions500'))return;
 const active=state.toolExceptions[t.id]||[];
 const panel=document.createElement('section');panel.className='panel exceptions500';
 panel.innerHTML=`<div class="subsection-title"><div><h3>Tool Exceptions / Special Conditions</h3><p class="helper">Check unusual conditions that must remain visible on this tool.</p></div></div><div class="exception-grid500">${state.exceptionTypes.map(x=>{let on=active.some(a=>a.id===x.id&&a.active!==false);return `<label class="exception-check500 ${x.severity}"><input type="checkbox" data-ex500="${esc(x.id)}" ${on?'checked':''}><span>${esc(x.label)}</span></label>`}).join('')}</div><div class="actions"><button id="saveEx500" class="btn primary">Save Special Conditions</button></div>`;
 host.appendChild(panel);
 $('#saveEx500').onclick=()=>{
  state.toolExceptions[t.id]=[...panel.querySelectorAll('[data-ex500]:checked')].map(i=>{let x=state.exceptionTypes.find(y=>y.id===i.dataset.ex500);return {...x,active:true,updatedAt:new Date().toISOString()}});
  save();alert('Tool special conditions saved.');
 };
}

countdown=function(){
 oldCountdown500();
 const tb=document.querySelector('.page-toolbar');
 if(tb&&!document.getElementById('fullReport500')){
  const b=document.createElement('button');b.id='fullReport500';b.className='btn';b.textContent='Generate Full Report';b.onclick=reportCenter500;tb.appendChild(b)
 }
};
morning=function(){oldMorning500();setTimeout(enhanceMorning500,0)};

setView=function(v){
 if(v==='home'){window.scrollTo(0,0);home500();return}
 oldSetView500(v);
};
render=function(){
 if(view==='home'){home500();return}
 oldRender500();
 setTimeout(()=>{if(view==='meeting')enhanceMorning500();if(view==='systems')exceptionsPanel500()},0);
};
document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>setView(b.dataset.view));

document.body.dataset.theme=document.body.dataset.theme||'countdown';
document.title=`B7 FI Command Center v${VERSION}`;
const ver=document.getElementById('appVersionLabel');if(ver)ver.textContent=`B7 FI Command Center v${VERSION}`;
})();

/* ===== SOURCE: js/patch-v0510.js ===== */
/* B7 FI Command Center v1.0.3 — Friday Field-Test Consolidated */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
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
/* v1.0.1: legacy theme observer disabled; authoritative Center theme is controlled by patch-v0570.js. */

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
function leadOptions51(selected){
 let a=typeof activeLeadTasks==='function'?activeLeadTasks().filter(x=>x.countProgress!==false):[];
 return `<option value="">Not Set</option>`+a.map(x=>`<option value="${esc51(x.id)}" ${x.id===selected?'selected':''}>${esc51(x.label)}</option>`).join('');
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
       <div class="form-group wide2"><label>Current Lead / Admin Task</label><select class="m51-lead">${leadOptions51(t.currentLeadAdminTask||'')}</select><small>Primary Lead/Admin position used by the Command Center progress bar.</small></div>
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
  if(ck&&ck!==t.checklist){recordField51(t,'Current Checklist',t.checklist||'',ck);t.checklist=ck;}
  let micro=r.querySelector('.m51-micro').value;
  if(micro!==t.microTargetChecklist){recordField51(t,'Micro Schedule Target',t.microTargetChecklist||'',micro);t.microTargetChecklist=micro;t.microTargetUpdatedAt=at}
  let lead=r.querySelector('.m51-lead')?.value||'';
  if(lead!==String(t.currentLeadAdminTask||'')){recordField51(t,'Current Lead / Admin Task',t.currentLeadAdminTask||'',lead);t.currentLeadAdminTask=lead;}
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
 if(window.B7AlertEngine816){window.B7AlertEngine816.refreshLead(!!reset);return}
}

// v1.0.1 performance: ticker uses its own bounded rotation timer; no DOM observer.
setTimeout(()=>{let b=document.getElementById('topActionBar');if(b)renderTicker51(true)},100);

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

/* ---------------- v1.0.1 Global navigation-state + home-card polish ---------------- */
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

/* v1.0.1 bridge: expose mature Center renderers to the authoritative shell. */
window.B7Renderers58={
  meetingCenter: meetingCenter51,
  actionCenter: actionCenter51,
  knowledge: knowledgePage51
};
})();

/* ===== SOURCE: js/patch-v0600.js ===== */
/* B7 FI Command Center v1.0.3
   Authoritative router + theme controller.
   This replaces the v0.52-v0.56 stacked shell patches that caused route flicker.
*/
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';

const CENTER={
  home:      {name:'OPERATIONS CENTER', color:'#176FA8', rgb:'23,111,168'},
  tool:      {name:'TOOL CENTER',       color:'#8E5AE8', rgb:'142,90,232'},
  shipping:  {name:'SHIPPING CENTER',   color:'#27AE60', rgb:'39,174,96'},
  priority:  {name:'PRIORITY CENTER',   color:'#D4A72C', rgb:'212,167,44'},
  status:    {name:'STATUS CENTER',     color:'#F28C28', rgb:'242,140,40'},
  meeting:   {name:'MEETING CENTER',    color:'#19B9D1', rgb:'25,185,209'},
  action:    {name:'ACTION CENTER',     color:'#E54848', rgb:'229,72,72'},
  reference: {name:'REFERENCE CENTER',  color:'#E94A9A', rgb:'233,74,154'},
  admin:     {name:'ADMINISTRATION CENTER',color:'#A6AFBC',rgb:'166,175,188'}
};
const NAV_VIEW={
  home:'home',toolcenter:'tool',shipping:'shipping',priorities:'priority',
  statuscenter:'status',meetingcenter:'meeting',actions:'action',referencecenter:'reference'
};
let currentCenter='home';
let centerTabs={tool:'quarter',priority:'weekday',status:'morning',reference:'knowledge',admin:'home'};

function qQuarter(){
  try{
    if(typeof quarterLabel==='function') return quarterLabel();
    if(window.state && state.quarter) return state.quarter;
  }catch(e){}
  return 'CY26Q3';
}
function setCenterTheme(key){
  currentCenter=key;
  document.body.classList.toggle('v58-home-center',key==='home');
  const c=CENTER[key]||CENTER.home;
  document.body.dataset.center=key;
  document.body.dataset.theme=key; // semantic only; no legacy observer remains
  document.documentElement.style.setProperty('--accent',c.color);
  document.documentElement.style.setProperty('--accent-rgb',c.rgb);
  document.documentElement.style.setProperty('--center-color',c.color);
  document.documentElement.style.setProperty('--center-rgb',c.rgb);
  document.documentElement.style.setProperty('--page-accent',c.color);
  document.documentElement.style.setProperty('--page-accent-rgb',c.rgb);
  document.documentElement.style.setProperty('--fleet-accent',c.color);
  document.documentElement.style.setProperty('--fleet-rgb',c.rgb);
  document.documentElement.style.setProperty('--live-page-accent',c.color);
  document.documentElement.style.setProperty('--live-page-rgb',c.rgb);
  document.body.style.setProperty('--accent',c.color);
  document.body.style.setProperty('--accent-rgb',c.rgb);
  document.body.style.setProperty('--page-accent',c.color);
  document.body.style.setProperty('--page-accent-rgb',c.rgb);
  document.body.style.setProperty('--fleet-accent',c.color);
  document.body.style.setProperty('--fleet-rgb',c.rgb);
  document.body.style.setProperty('--live-page-accent',c.color);
  document.body.style.setProperty('--live-page-rgb',c.rgb);

  const title=document.getElementById('headerPageTitle');
  if(title) title.textContent=c.name;
  document.title='B7 FI Command Center v'+(window.B7_APP_VERSION||'1.0.3');

  document.querySelectorAll('.main-nav .nav-btn').forEach(b=>{
    const active=NAV_VIEW[b.dataset.view]===key;
    b.classList.toggle('active',active);
    b.setAttribute('aria-current',active?'page':'false');
  });
  const af=document.getElementById('administrationCenterFooter');
  if(af) af.classList.toggle('active',key==='admin');
  const ver=document.getElementById('appVersionLabel');
  if(ver) ver.textContent='B7 FI Command Center v1.0.3';
}
function cleanLegacyHeading(){
  const candidates=document.querySelectorAll('#app .report-title,#app > .page-title,#app .page-head');
  candidates.forEach((el,i)=>{ if(i===0) el.classList.add('v57-hide-duplicate-title'); });
}
function centerTabsHtml(items,active){
  return `<div class="v57-center-tabs">${items.map(x=>
    `<button class="btn ${x[0]===active?'primary':''}" data-v57tab="${x[0]}">${x[1]}</button>`
  ).join('')}</div>`;
}
function installTabs(items,active,fn){
  /* v0.60: Center sub-navigation belongs in the single page navigation bar,
     not in a second row inside page content. */
  const bar=document.getElementById('floatingActions');
  if(!bar)return;
  bar.querySelectorAll('[data-v57tab]').forEach(b=>b.remove());
  const frag=document.createDocumentFragment();
  items.forEach(x=>{
    const b=document.createElement('button');
    b.className='btn v60-center-nav '+(x[0]===active?'primary':'');
    b.dataset.v57tab=x[0]; b.textContent=x[1]; b.onclick=()=>fn(x[0]);
    frag.appendChild(b);
  });
  bar.prepend(frag);
}
function removeLegacyActionButtons(){
  const bar=document.getElementById('floatingActions');
  if(!bar)return;
  [...bar.querySelectorAll('button,a')].forEach(b=>{
    const t=(b.textContent||'').trim().toLowerCase();
    if(['tools','administration','morning status','lead workspace','screenshot mode','generate full report'].includes(t)) b.remove();
  });
}
function ensureReportButton(){
  if(['home','reference','admin'].includes(currentCenter)) return;
  const bar=document.getElementById('floatingActions');
  if(!bar)return;
  if(!bar.querySelector('.v57-report-btn')){
    const b=document.createElement('button');
    b.className='btn v57-report-btn';b.textContent='REPORT';
    b.onclick=openReport57;bar.appendChild(b);
  }
}
function postRender(key){
  setCenterTheme(key);
  const actionBar=document.getElementById('floatingActions');
  if(actionBar) actionBar.style.display='';
  cleanLegacyHeading();
  removeLegacyActionButtons();
  ensureReportButton();
}
function renderHome(){
  setCenterTheme('home');
  const all=(typeof tools!=='undefined'?tools:[]);
  const active=all.filter(t=>!['Archive'].includes(t.quarterStatus));
  const shipped=active.filter(t=>t.quarterStatus==='Shipped').length;
  const inFi=active.filter(t=>t.quarterStatus==='In FI').length;
  const packing=active.filter(t=>t.quarterStatus==='Packing').length;
  const waiting=active.filter(t=>/Waiting/i.test(t.quarterStatus||'')).length;
  let actionCount=0,critical=0,attention=0;
  try{
    const aa=typeof allGenerated51==='function'?allGenerated51():[];
    actionCount=aa.length; critical=aa.filter(x=>(x._severity51||'')==='red').length; attention=aa.filter(x=>(x._severity51||'')==='orange').length;
  }catch(e){}
  const cards=[
    ['tool','TOOL CENTER',`${qQuarter()} · ${active.length} tools · ${shipped} shipped · ${inFi} in FI · ${packing} packing · ${waiting} waiting`,'OPEN TOOL CENTER →'],
    ['action','ACTION CENTER',`${actionCount} open actions · ${critical} critical · ${attention} attention`,'OPEN ACTION CENTER →'],
    ['shipping','SHIPPING CENTER','Packing · physical handoffs · shipping readiness','OPEN SHIPPING CENTER →'],
    ['priority','PRIORITY CENTER','Weekday · weekend · team priorities','OPEN PRIORITY CENTER →'],
    ['status','STATUS CENTER','Morning status · leads extra status','OPEN STATUS CENTER →'],
    ['meeting','MEETING CENTER','Meetings · notes · actions · history','OPEN MEETING CENTER →'],
    ['reference','REFERENCE CENTER','FI knowledge · procedures · reference files','OPEN REFERENCE CENTER →'],
    ['wallboard','LIVE STATUS CENTER','Live B7 FI operational status display','OPEN LIVE STATUS CENTER →'],
    ['backup','DATA & BACKUP','Backup · shared data · synchronization controls','OPEN DATA & BACKUP →']
  ];
  app.innerHTML=`<section class="v57-operations-grid">${cards.map(c=>{
    const k=c[0]==='wallboard'||c[0]==='backup'?'admin':c[0];
    const cc=CENTER[k]||CENTER.home;
    return `<button class="v57-live-card" data-dest="${c[0]}" style="--card-color:${cc.color};--card-rgb:${cc.rgb}">
      <span>${c[1]}</span><strong>${c[2]}</strong><b>${c[3]}</b>
    </button>`;
  }).join('')}</section>`;
  document.querySelectorAll('.v57-live-card').forEach(b=>b.onclick=()=>{
    const d=b.dataset.dest;
    if(d==='wallboard') renderAdmin('wallboard');
    else if(d==='backup') renderAdmin('data');
    else route57(d);
  });
  const bar=document.getElementById('floatingActions');
  if(bar){bar.innerHTML='';bar.style.display='none';}
}
function renderTool(tab=centerTabs.tool){
  centerTabs.tool=tab;
  if(tab==='archive') archive(); else countdown();
  postRender('tool');
  installTabs([['quarter',qQuarter()+' TOOLS'],['archive','TOOL ARCHIVE']],tab,renderTool);
  renameToolSummary57();
}
function renameToolSummary57(){
  const q=qQuarter();
  const boxes=[...document.querySelectorAll('#app .overall-box,#app .metric-card,#app .summary-card')];
  boxes.forEach(box=>{
    const txt=box.textContent.toUpperCase();
    const label=box.querySelector('.label,.metric-label,small');
    if(!label)return;
    if(txt.includes('ORIGINAL PLAN')||txt.includes('TOTAL TOOLS')) label.textContent=q+' TOOLS';
    if(txt.includes('CURRENT PLAN')) label.textContent='UPDATED '+q;
    if((txt.includes('PULLED')||txt.includes('PUSHED')) && /\b0\b/.test(txt)) box.classList.add('v57-dormant');
    if(txt.includes('CURRENT PLAN') && /\b25\b/.test(txt)) box.classList.add('v57-dormant');
  });
}
function renderShipping(){
  shipping();postRender('shipping');
}
function renderPriority(tab=centerTabs.priority){
  centerTabs.priority=tab;
  if(tab==='weekend') weekend(); else daily();
  postRender('priority');
  installTabs([['weekday','WEEKDAY'],['weekend','WEEKEND']],tab,renderPriority);
}
function renderStatus(tab=centerTabs.status){
  centerTabs.status=tab;
  if(tab==='extra') leadsExtraPage(false); else morning();
  postRender('status');
  installTabs([['morning','MORNING STATUS'],['extra','LEADS EXTRA STATUS']],tab,renderStatus);
}
function renderMeeting(){
  if(window.B7Renderers58&&B7Renderers58.meetingCenter) B7Renderers58.meetingCenter(); else throw new Error('Meeting Center renderer unavailable');
  postRender('meeting');
}
function renderAction(){
  if(window.B7Renderers58&&B7Renderers58.actionCenter) B7Renderers58.actionCenter(); else throw new Error('Action Center renderer unavailable');
  postRender('action');
}
function renderReference(tab=centerTabs.reference){
  centerTabs.reference=tab;
  if(tab==='files') referencesPage(); else if(window.B7Renderers58&&B7Renderers58.knowledge) B7Renderers58.knowledge(); else throw new Error('Reference Center renderer unavailable');
  postRender('reference');
  installTabs([['knowledge','FI KNOWLEDGE'],['files','REFERENCE FILES']],tab,renderReference);
}
function renderAdmin(tab=centerTabs.admin){
  centerTabs.admin=tab;
  if(tab==='data') sharedData();
  else if(tab==='wallboard') wallboardPage();
  else admin();
  postRender('admin');
  installTabs([['home','ADMIN HOME'],['data','DATA & BACKUP'],['wallboard','WALLBOARD CONFIGURATION']],tab,renderAdmin);
}
function route57(dest){
  window.scrollTo(0,0);
  if(dest==='home')renderHome();
  else if(dest==='tool')renderTool();
  else if(dest==='shipping')renderShipping();
  else if(dest==='priority')renderPriority();
  else if(dest==='status')renderStatus();
  else if(dest==='meeting')renderMeeting();
  else if(dest==='action')renderAction();
  else if(dest==='reference')renderReference();
  else if(dest==='admin')renderAdmin();
}
window.setView=function(v){
  const map={home:'home',toolcenter:'tool',shipping:'shipping',priorities:'priority',statuscenter:'status',
             meetingcenter:'meeting',actions:'action',referencecenter:'reference',admincenter:'admin',
             countdown:'tool',systems:'tool',archive:'tool',daily:'priority',weekend:'priority',
             meeting:'status',leads:'status',knowledge:'reference',references:'reference',
             shared:'admin',admin:'admin',wallboard:'admin'};
  route57(map[v]||v);
};
document.querySelectorAll('.main-nav .nav-btn').forEach(b=>b.onclick=()=>window.setView(b.dataset.view));
const adminFooter=document.getElementById('administrationCenterFooter');
if(adminFooter)adminFooter.onclick=()=>renderAdmin('home');

/* Clean report workflow: no legacy screenshot/full-report buttons. */
function reportTitle57(){return CENTER[currentCenter]?.name||'B7 FI COMMAND CENTER'}
function openReport57(){
  document.getElementById('v57ReportModal')?.remove();
  document.body.insertAdjacentHTML('beforeend',`<div id="v57ReportModal" class="v57-report-modal">
   <div class="v57-report-card"><div class="v57-report-head"><div><b>REPORT</b><span>${reportTitle57()}</span></div><button id="v57ReportClose" class="btn">Close</button></div>
   <div class="v57-report-options"><button id="v57CleanView" class="btn primary">Screenshot View</button><button id="v57Copy" class="btn">Copy</button><button id="v57Email" class="btn">Email</button><button id="v57Print" class="btn">Print / PDF</button></div>
   <p class="gray">Screenshot View hides application controls for a clean visual capture. Email opens your mail application; attach the screenshot or PDF.</p></div></div>`);
  v57ReportClose.onclick=()=>v57ReportModal.remove();
  v57CleanView.onclick=()=>{v57ReportModal.remove();document.body.classList.add('v57-clean-report')};
  v57Copy.onclick=()=>navigator.clipboard?.writeText(app.innerText||'');
  v57Email.onclick=()=>location.href='mailto:?subject='+encodeURIComponent('B7 FI Command Center — '+reportTitle57());
  v57Print.onclick=()=>window.print();
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.body.classList.remove('v57-clean-report')});
document.addEventListener('click',e=>{
 if(document.body.classList.contains('v57-clean-report') && e.target.closest('.v57-clean-exit')) document.body.classList.remove('v57-clean-report');
});

/* Keep footer physically after live Fleet Status bar. */
const ops=document.getElementById('operationsBar'), foot=document.querySelector('body>footer');
if(ops&&foot&&ops.nextElementSibling!==foot)ops.insertAdjacentElement('afterend',foot);

/* Start once on Operations Center. No timers, no route/theme observers, no second render. */
requestAnimationFrame(()=>renderHome());
})();

/* ===== SOURCE: js/patch-v0610.js ===== */
/* B7 FI Command Center v1.0.3 — Global UX / Editor / Status workflow pass */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const COLORS={home:['#176FA8','23,111,168','OPERATIONS CENTER'],tool:['#8E5AE8','142,90,232','TOOL CENTER'],shipping:['#27AE60','39,174,96','SHIPPING CENTER'],priority:['#D4A72C','212,167,44','PRIORITY CENTER'],status:['#F28C28','242,140,40','STATUS CENTER'],meeting:['#19B9D1','25,185,209','MEETING CENTER'],action:['#E54848','229,72,72','ACTION CENTER'],reference:['#E94A9A','233,74,154','REFERENCE CENTER'],admin:['#A6AFBC','166,175,188','ADMINISTRATION CENTER']};
const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
function esc61(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function theme61(k){let c=COLORS[k]||COLORS.home;document.body.dataset.center=k;['--center-color','--accent','--page-accent','--fleet-accent','--live-page-accent'].forEach(v=>{document.documentElement.style.setProperty(v,c[0]);document.body.style.setProperty(v,c[0])});['--center-rgb','--accent-rgb','--page-accent-rgb','--fleet-rgb','--live-page-rgb'].forEach(v=>{document.documentElement.style.setProperty(v,c[1]);document.body.style.setProperty(v,c[1])});let t=qs('#headerPageTitle');if(t)t.textContent=c[2];qsa('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',({home:'home',toolcenter:'tool',shipping:'shipping',priorities:'priority',statuscenter:'status',meetingcenter:'meeting',actions:'action',referencecenter:'reference'}[b.dataset.view]===k)));let v=qs('#appVersionLabel');if(v)v.textContent='B7 FI Command Center v1.0.3'}
function bar61(buttons){let b=qs('#floatingActions');if(!b)return;b.style.display='';b.innerHTML='';buttons.forEach(x=>{let bt=document.createElement('button');bt.className='btn '+(x.primary?'primary':'')+(x.right?' v61-right':'');bt.textContent=x.label;bt.onclick=x.fn;b.appendChild(bt)})}
function returnViewFor(section){return {countdown:'toolcenter',shipping:'shipping',daily:'priorities',weekend:'weekend',meeting:'statuscenter',tools:'toolcenter',config:'admincenter'}[section]||'home'}
function centerForEdit(section){return {countdown:'tool',shipping:'shipping',daily:'priority',weekend:'priority',meeting:'status',tools:'tool',config:'admin'}[section]||'admin'}
function saveIdFor(section){return {countdown:'saveCountdown',shipping:'saveShipping',daily:'savePriority',weekend:'savePriority',meeting:'saveMorning'}[section]||''}
let legacyAdmin=window.admin;
window.admin=function(section='home'){
  if(section==='home'||section==='config') return legacyAdmin(section);
  const center=centerForEdit(section), back=returnViewFor(section);
  theme61(center);document.body.classList.add('v61-focused-editor');document.body.dataset.editorSection=section;
  app.innerHTML='<div id="adminBody" class="v61-editor-body"></div>';
  renderAdmin(section);
  let dirty=false;qsa('#app input,#app select,#app textarea').forEach(el=>{el.addEventListener('input',()=>dirty=true);el.addEventListener('change',()=>dirty=true)});
  const cancel=()=>{if(dirty&&!confirm('Discard unsaved changes?'))return;document.body.classList.remove('v61-focused-editor');delete document.body.dataset.editorSection;setView(back)};
  const saveId=saveIdFor(section);
  bar61([{label:'CANCEL',fn:cancel},{label:'SAVE CHANGES',primary:true,fn:()=>{let x=qs('#'+saveId);if(x)x.click();else alert('No save control is available for this editor.')}}]);
  qsa('.admin-tabs,.admin-launch-grid').forEach(x=>x.remove());
  decorate61();
};
let legacyToolAdmin=window.toolAdmin;
if(legacyToolAdmin)window.toolAdmin=function(id){legacyToolAdmin(id);theme61('tool');document.body.classList.add('v61-focused-editor');let b=qs('#floatingActions');if(b){qsa('button',b).forEach(x=>{if(/administration/i.test(x.textContent))x.remove()});let c=document.createElement('button');c.className='btn';c.textContent='CANCEL';c.onclick=()=>{if(confirm('Discard unsaved changes?'))setView('toolcenter')};b.prepend(c)}decorate61()};

function weekendStatus61(edit=false){theme61('status');document.body.classList.toggle('v61-focused-editor',edit);state.weekendMorningStatus=state.weekendMorningStatus||{lead:'',date:'',notes:'',updatedAt:''};let w=state.weekendMorningStatus;let wk=[...(typeof tools!=='undefined'?tools:[])].filter(t=>t.weekendPriority).sort((a,b)=>(a.weekendPriority||999)-(b.weekendPriority||999));
  if(edit){app.innerHTML=`<div class="v61-weekend-status"><h2>WEEKEND MORNING STATUS</h2><div class="v61-edit-grid"><label>Weekend Lead<input id="wmLead61" value="${esc61(w.lead)}"></label><label>Date<input id="wmDate61" type="date" value="${esc61(w.date)}"></label></div><label>Weekend Status Notes<textarea id="wmNotes61" rows="8">${esc61(w.notes)}</textarea></label><h3>Weekend Tool Priorities</h3>${weekendTable61(wk)}</div>`;let dirty=false;qsa('#app input,#app textarea').forEach(x=>x.oninput=()=>dirty=true);bar61([{label:'CANCEL',fn:()=>{if(dirty&&!confirm('Discard unsaved changes?'))return;weekendStatus61(false)}},{label:'SAVE CHANGES',primary:true,fn:()=>{w.lead=qs('#wmLead61').value.trim();w.date=qs('#wmDate61').value;w.notes=qs('#wmNotes61').value;w.updatedAt=new Date().toISOString();save();weekendStatus61(false)}}]);}
  else{app.innerHTML=`<div class="v61-weekend-status"><div class="v61-status-meta"><b>${esc61(w.date||'Weekend Morning Status')}</b><span>Weekend Lead: ${esc61(w.lead||'Not assigned')}</span>${w.updatedAt?`<span>Updated ${new Date(w.updatedAt).toLocaleString()}</span>`:''}</div>${w.notes?`<div class="v61-notes">${esc61(w.notes).replace(/\n/g,'<br>')}</div>`:''}<h3>Weekend Tool Priorities</h3>${weekendTable61(wk)}</div>`;statusNav61('weekend')}
  decorate61();
}
function weekendTable61(a){return `<div class="table-wrap"><table class="report-table"><thead><tr><th>Priority</th><th>UTID</th><th>Model</th><th>Customer</th><th>Ship Date</th><th>Assignment</th><th>Notes</th></tr></thead><tbody>${a.map(t=>`<tr><td>${t.weekendPriority||''}</td><td><b>${esc61(t.id)}</b></td><td>${esc61(t.model)}</td><td>${esc61(t.customer)}</td><td>${esc61(t.ship||'')}</td><td>${esc61(t.weekendAssignment||t.driver||'')}</td><td>${esc61(t.weekendNotes||'')}</td></tr>`).join('')||'<tr><td colspan="7">No weekend priorities assigned.</td></tr>'}</tbody></table></div>`}
function statusNav61(active){bar61([{label:'MORNING STATUS',primary:active==='morning',fn:()=>setView('statuscenter')},{label:'WEEKEND MORNING STATUS',primary:active==='weekend',fn:()=>weekendStatus61(false)},{label:'LEADS EXTRA STATUS',primary:active==='extra',fn:()=>{let b=qsa('#floatingActions [data-v57tab]');let x=b.find(y=>y.textContent.includes('LEADS'));if(x)x.click()}},{label:'EDIT WEEKEND STATUS',fn:()=>weekendStatus61(true)},{label:'REPORT',right:true,fn:()=>window.print()}])}

function actionNav61(){let b=qs('#floatingActions');if(!b)return;let sums={};qsa('.action-summary').forEach(x=>{let k=(qs('span',x)?.textContent||'').toUpperCase();sums[k]=qs('strong',x)?.textContent||'0'});bar61([{label:'ADD TASK',primary:true,fn:addTaskModal61},{label:`ALL ${Object.values(sums).reduce((a,x)=>a+(+x||0),0)}`,fn:()=>filterActions61('ALL')},{label:`CRITICAL ${sums.CRITICAL||0}`,fn:()=>filterActions61('CRITICAL')},{label:`ATTENTION ${sums.ATTENTION||0}`,fn:()=>filterActions61('ATTENTION')},{label:`REMINDERS ${sums['REMINDERS / NEXT ACTIONS']||0}`,fn:()=>filterActions61('REMINDERS')},{label:`INFORMATION ${sums.INFORMATION||0}`,fn:()=>filterActions61('INFORMATION')},{label:'REPORT',right:true,fn:()=>window.print()}])}
function filterActions61(k){qsa('.action-group').forEach(g=>{let h=(qs('h3',g)?.textContent||'').toUpperCase();g.style.display=(k==='ALL'||h.includes(k))?'':'none'})}
function addTaskModal61(){qs('#v61TaskModal')?.remove();document.body.insertAdjacentHTML('beforeend',`<div id="v61TaskModal" class="v61-modal"><div class="v61-modal-card"><h3>ADD TASK</h3><div class="v61-edit-grid"><label>Tool<select id="v61TaskTool"><option value="">General / No Tool</option>${(typeof tools!=='undefined'?tools:[]).map(t=>`<option value="${esc61(t.id)}">${esc61(t.id)} · ${esc61(t.model)}</option>`).join('')}</select></label><label>Category<select id="v61TaskSev"><option value="yellow">Reminder</option><option value="orange">Attention</option><option value="red">Critical</option><option value="blue">Information</option></select></label></div><label>Task<input id="v61TaskText" placeholder="Task / follow-up / information"></label><div class="actions"><button class="btn" id="v61TaskCancel">CANCEL</button><button class="btn primary" id="v61TaskAdd">ADD TASK</button></div></div></div>`);qs('#v61TaskCancel').onclick=()=>qs('#v61TaskModal').remove();qs('#v61TaskAdd').onclick=()=>{let text=qs('#v61TaskText').value.trim();if(!text)return;state.manualReminders=Array.isArray(state.manualReminders)?state.manualReminders:[];state.manualReminders.unshift({id:'mr'+Date.now(),toolId:qs('#v61TaskTool').value,severity:qs('#v61TaskSev').value,text,complete:false,createdAt:new Date().toISOString()});save();qs('#v61TaskModal').remove();setView('actions')}}

function dormantToolSummary61(){if(document.body.dataset.center!=='tool')return;let boxes=qsa('#app .overall-box,#app .metric,#app .metric-card,#app .summary-card');let pulled=0,pushed=0;boxes.forEach(x=>{let tx=x.textContent.toUpperCase(),n=parseInt((tx.match(/\b\d+\b/g)||[]).slice(-1)[0]||'0',10);if(tx.includes('PULLED'))pulled=n;if(tx.includes('PUSHED'))pushed=n});boxes.forEach(x=>{let tx=x.textContent.toUpperCase();if((tx.includes('PULLED')&&pulled===0)||(tx.includes('PUSHED')&&pushed===0)||(tx.includes('UPDATED')&&pulled===0&&pushed===0))x.classList.add('v61-dormant');else x.classList.remove('v61-dormant')})}
function removeShippingHelp61(){if(document.body.dataset.center!=='shipping')return;qsa('#app .notice').forEach(x=>{if(/No systems have entered 200 Packing/i.test(x.textContent))x.remove()})}
function genericEditor61(){let saveMeet=qs('#saveMeet51');if(saveMeet&&!document.body.classList.contains('v61-focused-editor')){document.body.classList.add('v61-focused-editor');theme61('meeting');bar61([{label:'CANCEL',fn:()=>setView('meetingcenter')},{label:'SAVE CHANGES',primary:true,fn:()=>saveMeet.click()}])}}
function decorate61(){let c=document.body.dataset.center||'home';theme61(c);removeShippingHelp61();dormantToolSummary61();genericEditor61();if(c==='action'){qsa('#app section.panel').forEach(s=>{if(/Add Manual Reminder/i.test(s.textContent))s.remove()});actionNav61()}if(c==='status'&&!document.body.classList.contains('v61-focused-editor')){let bar=qs('#floatingActions');if(bar&&!qs('.v61-weekend-btn',bar)){let btn=document.createElement('button');btn.className='btn v61-weekend-btn';btn.textContent='WEEKEND MORNING STATUS';btn.onclick=()=>weekendStatus61(false);let report=qsa('button',bar).find(x=>x.textContent.trim()==='REPORT');bar.insertBefore(btn,bar.firstChild)}}}

let oldSetView=window.setView;window.setView=function(v){document.body.classList.remove('v61-focused-editor');oldSetView(v);setTimeout(decorate61,0)};
// v1.0.1 performance: setView wrapper already decorates after navigation; continuous DOM observer removed.
setTimeout(decorate61,50);
})();


/* ===== SOURCE: js/patch-v0620.js ===== */
/* B7 FI Command Center v1.0.3 — Center Navigation / Page Actions Standardization */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const ACTION_RX=/^(EDIT |\+?\s*ADD |\+?\s*START |MORNING QUICK UPDATE|LEAD WORKSPACE|REPORT$|CANCEL$|SAVE CHANGES$)/i;
function version62(){let v=qs('#appVersionLabel');if(v)v.textContent='B7 FI Command Center v1.0.3'}
function proxyButton(label,source,primary=false){
 const b=document.createElement('button');b.className='btn v62-page-action'+(primary?' primary':'');b.textContent=label;
 b.onclick=()=>source.click();return b;
}
function normalizeToolbar62(){
 const bar=qs('#floatingActions'); if(!bar||document.body.dataset.center==='home')return;
 let buttons=qsa(':scope > button',bar);
 // Remove obsolete/cross-Center controls that slipped in from legacy renderers.
 buttons.forEach(b=>{let t=b.textContent.trim();if(/^(Administration|Administration Center|Tools|Tool Countdown|Shipping Schedule|Reference Center)$/i.test(t)&&!b.dataset.v57tab)b.remove()});
 buttons=qsa(':scope > button',bar);
 buttons.forEach(b=>{b.classList.remove('v62-page-nav','v62-page-action','v62-first-action');
   if(b.dataset.v57tab)b.classList.add('v62-page-nav'); else b.classList.add('v62-page-action');
 });
 // Move page actions to the right while keeping Center sub-navigation on the left.
 const nav=buttons.filter(b=>b.classList.contains('v62-page-nav'));
 const acts=buttons.filter(b=>b.classList.contains('v62-page-action'));
 [...nav,...acts].forEach(b=>bar.appendChild(b));
 if(acts[0])acts[0].classList.add('v62-first-action');
 // Keep Save Changes as the final editor action, Cancel directly before it.
 let save=acts.find(b=>/^SAVE CHANGES$/i.test(b.textContent.trim())), cancel=acts.find(b=>/^CANCEL$/i.test(b.textContent.trim()));
 if(cancel&&save){bar.append(cancel,save);cancel.classList.add('v62-first-action');acts.forEach(b=>{if(b!==cancel)b.classList.remove('v62-first-action')})}
}
function promoteReferenceAdd62(){
 if(document.body.dataset.center!=='reference')return;
 const bar=qs('#floatingActions');if(!bar)return;
 const src=qs('#kbAdd51');
 if(src&&!qsa(':scope > button',bar).some(b=>/ADD REFERENCE NOTE/i.test(b.textContent))){bar.appendChild(proxyButton('+ ADD REFERENCE NOTE',src,true));src.classList.add('v62-content-global-action')}
 // Reference Center only owns its two destinations plus page actions.
 qsa(':scope > button',bar).forEach(b=>{let t=b.textContent.trim();if(!b.dataset.v57tab&&!/ADD REFERENCE NOTE|REPORT|CANCEL|SAVE CHANGES/i.test(t))b.remove()});
}
function promoteMeetingStart62(){
 if(document.body.dataset.center!=='meeting'||document.body.classList.contains('v61-focused-editor'))return;
 const bar=qs('#floatingActions');if(!bar)return;const src=qs('#adhocStart51');
 if(src&&!qsa(':scope > button',bar).some(b=>/START MEETING NOW/i.test(b.textContent)))bar.appendChild(proxyButton('+ START MEETING NOW',src,true));
}
function hideDuplicateEditorControls62(){
 if(!document.body.classList.contains('v61-focused-editor'))return;
 qsa('#app #saveCountdown,#app #saveShipping,#app #savePriority,#app #saveMorning,#app .actions > button').forEach(b=>{
   if(/save|apply countdown/i.test((b.id||'')+' '+b.textContent))b.classList.add('v62-content-global-action');
 });
}
function classifyLegacyActions62(){
 const bar=qs('#floatingActions');if(!bar)return;
 qsa(':scope > button',bar).forEach(b=>{if(!b.dataset.v57tab&&ACTION_RX.test(b.textContent.trim()))b.classList.add('v62-page-action')});
}
function decorate62(){version62();promoteReferenceAdd62();promoteMeetingStart62();hideDuplicateEditorControls62();classifyLegacyActions62();normalizeToolbar62()}
let busy=false;/* v0.67 legacy body observer disabled */
setTimeout(decorate62,80);
})();


/* ===== SOURCE: js/patch-v0630.js ===== */
/* B7 FI Command Center v1.0.3 — navigation reliability / global chrome / status workflow */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const C={home:['#176FA8','23,111,168'],tool:['#8E5AE8','142,90,232'],shipping:['#27AE60','39,174,96'],priority:['#D4A72C','212,167,44'],status:['#F28C28','242,140,40'],meeting:['#19B9D1','25,185,209'],action:['#E54848','229,72,72'],reference:['#E94A9A','233,74,154'],search:['#4F6BFF','79,107,255'],admin:['#A6AFBC','166,175,188']};
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
function center(){return document.body.dataset.center||'home'}
function hardTheme(){
 const k=center(),c=C[k]||C.home;
 document.documentElement.style.setProperty('--center-color',c[0]);document.documentElement.style.setProperty('--center-rgb',c[1]);
 ['--accent','--page-accent','--fleet-accent','--live-page-accent'].forEach(v=>document.documentElement.style.setProperty(v,c[0]));
 ['--accent-rgb','--page-accent-rgb','--fleet-rgb','--live-page-rgb'].forEach(v=>document.documentElement.style.setProperty(v,c[1]));
 document.body.style.setProperty('--center-color',c[0]);document.body.style.setProperty('--center-rgb',c[1]);
 const ob=$('#operationsBar'),ft=$('footer.v57-footer'); if(ob){ob.style.setProperty('border-color',c[0],'important')} if(ft){ft.style.setProperty('border-color',c[0],'important')}
 const v=$('#appVersionLabel');if(v)v.textContent='B7 FI Command Center v1.0.3';
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
let busy=false;/* v0.67 legacy body observer disabled */
setTimeout(decorate,120);
})();


/* ===== SOURCE: js/patch-v0640.js ===== */
/* B7 FI Command Center v1.0.3 — Monday field-test shell stabilization + Search Center */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const SEARCH_COLOR='#4F6BFF', SEARCH_RGB='79,107,255';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

function setVars(color,rgb){
  ['--center-color','--accent','--page-accent','--fleet-accent','--live-page-accent'].forEach(v=>{document.documentElement.style.setProperty(v,color);document.body.style.setProperty(v,color)});
  ['--center-rgb','--accent-rgb','--page-accent-rgb','--fleet-rgb','--live-page-rgb'].forEach(v=>{document.documentElement.style.setProperty(v,rgb);document.body.style.setProperty(v,rgb)});
}
function setVersion(){const v=$('#appVersionLabel');if(v)v.textContent='B7 FI Command Center v1.0.3'}
function screenshot(){
  try{
    if(typeof window.enterScreenshot==='function') return window.enterScreenshot();
    document.body.classList.add('v57-clean-report');
  }catch(e){document.body.classList.add('v57-clean-report')}
}
function report(){
  const existing=$$('#floatingActions button').find(b=>/^REPORT$/i.test((b.textContent||'').trim()) && b._v64OriginalReport);
  if(existing) return existing._v64OriginalReport();
  if(typeof window.print==='function') window.print();
}
function mk(label,fn,cls=''){
  const b=document.createElement('button'); b.className='btn '+cls; b.textContent=label; b.type='button'; b.dataset.worktab='page-action'; b.onclick=fn; return b;
}
function enforceActionPair(){
  const bar=$('#floatingActions'); if(!bar || document.body.dataset.center==='home') return;
  const editor=document.body.classList.contains('v61-focused-editor');
  let buttons=$$(':scope > button',bar);
  buttons.forEach(b=>{b.style.pointerEvents='auto';b.disabled=false;b.style.textTransform='uppercase'});
  if(editor){
    const shot=buttons.find(b=>/^SCREENSHOT$/i.test(b.textContent)); if(shot)shot.remove();
    const rep=buttons.find(b=>/^REPORT$/i.test(b.textContent)); if(rep)rep.remove();
    buttons=$$(':scope > button',bar);
    const cancel=buttons.find(b=>/^CANCEL$/i.test(b.textContent));
    const save=buttons.find(b=>/^SAVE CHANGES$/i.test(b.textContent));
    if(cancel&&save){cancel.classList.add('v64-action-start');bar.append(cancel,save)}
    return;
  }
  let shot=buttons.find(b=>/^SCREENSHOT$/i.test((b.textContent||'').trim()));
  if(!shot){shot=mk('SCREENSHOT',screenshot,'v64-action');bar.appendChild(shot)}
  let rep=buttons.find(b=>/^REPORT$/i.test((b.textContent||'').trim()));
  if(!rep){rep=mk('REPORT',()=>window.print(),'v64-action');bar.appendChild(rep)}
  buttons=$$(':scope > button',bar);
  buttons.forEach(b=>b.classList.remove('v64-nav','v64-action','v64-action-start'));
  const nav=buttons.filter(b=>b.dataset.v57tab);
  const acts=buttons.filter(b=>!b.dataset.v57tab);
  nav.forEach(b=>b.classList.add('v64-nav'));
  acts.forEach(b=>b.classList.add('v64-action'));
  // Screenshot and Report are always the final two actions.
  const others=acts.filter(b=>b!==shot&&b!==rep);
  [...nav,...others,shot,rep].filter(Boolean).forEach(b=>bar.appendChild(b));
  const first=others[0]||shot||rep; if(first)first.classList.add('v64-action-start');
}

function fixMeeting(){
  if(document.body.dataset.center!=='meeting' || document.body.classList.contains('v61-focused-editor')) return;
  // The sticky page bar is the only Start Meeting control.
  const bodyStart=$('#app .start-now51'); if(bodyStart)bodyStart.remove();
  const bar=$('#floatingActions'); if(!bar)return;
  const start=$$(':scope > button',bar).find(b=>/START MEETING/i.test(b.textContent||''));
  if(start){start.textContent='START NEW MEETING';start.classList.add('v64-action')}
}

function fixStatus(){
  if(document.body.dataset.center!=='status' || document.body.classList.contains('v61-focused-editor')) return;
  // Remove obsolete reset control from the body.
  $$('#app button').forEach(b=>{if(/RESET TOOL TYPE\s*\/\s*SERIAL ORDER/i.test(b.textContent||''))b.remove()});
  const bar=$('#floatingActions'); if(!bar)return;
  const bs=$$(':scope > button',bar);
  const by=(re)=>bs.find(b=>re.test((b.textContent||'').trim()));
  const weekday=by(/^(WEEKDAY MORNING STATUS|MORNING STATUS)$/i), extra=by(/^LEADS EXTRA STATUS$/i), weekend=by(/^WEEKEND MORNING STATUS$/i);
  const updW=by(/^UPDATE WEEKDAY MORNING STATUS$/i), updE=by(/^UPDATE LEADS EXTRA STATUS$/i), updWE=by(/^UPDATE WEEKEND MORNING STATUS$/i);
  if(weekday&&extra&&weekend){
    weekday.textContent='WEEKDAY MORNING STATUS'; weekday.dataset.v57tab='morning';
    extra.dataset.v57tab='extra'; weekend.dataset.v57tab='weekend';
    bar.prepend(weekday,extra,weekend);
  }
  [updW,updE,updWE].filter(Boolean).forEach(b=>{b.removeAttribute('data-v57tab');bar.appendChild(b)});
}

function fixReference(){
  if(document.body.dataset.center!=='reference' || document.body.classList.contains('v61-focused-editor')) return;
  const bar=$('#floatingActions'); if(!bar)return;
  // Only Reference-Center-specific navigation/actions are allowed here.
  $$(':scope > button',bar).forEach(b=>{
    const t=(b.textContent||'').trim();
    if(/TOOL COUNTDOWN|SHIPPING SCHEDULE|REFERENCE CENTER$/i.test(t) && !/^\+?\s*ADD REFERENCE/i.test(t)) b.remove();
  });
  let add=$$(':scope > button',bar).find(b=>/ADD REFERENCE NOTE/i.test(b.textContent||''));
  if(!add){
    const contentAdd=$$('#app button').find(b=>/ADD REFERENCE NOTE/i.test(b.textContent||''));
    if(contentAdd){add=mk('ADD REFERENCE NOTE',()=>contentAdd.click(),'v64-action');bar.appendChild(add)}
  }
  if(add)add.textContent='ADD REFERENCE NOTE';
  // Duplicate page-level add button is removed from content; item-specific buttons remain.
  $$('#app button').forEach(b=>{if(/ADD REFERENCE NOTE/i.test(b.textContent||''))b.classList.add('v64-hide-page-action')});
}

function ensureSearchNav(){
  const nav=$('.main-nav'); if(!nav)return;
  let b=nav.querySelector('[data-view="searchcenter"]');
  if(!b){b=document.createElement('button');b.className='nav-btn';b.dataset.view='searchcenter';b.textContent='SEARCH CENTER';b.onclick=()=>window.setView('searchcenter');nav.appendChild(b)}
  b.textContent='SEARCH CENTER';
}
function flatten(obj,prefix='',out=[]){
  if(obj==null)return out;
  if(Array.isArray(obj)){obj.forEach((v,i)=>flatten(v,prefix?prefix+' '+(i+1):String(i+1),out));return out}
  if(typeof obj==='object'){Object.entries(obj).forEach(([k,v])=>flatten(v,prefix?prefix+' '+k:k,out));return out}
  const text=String(obj).trim(); if(text)out.push({path:prefix,text}); return out;
}
function searchRecords(){
  const rows=[];
  try{
    const s=typeof state!=='undefined'?state:JSON.parse(localStorage.getItem('b7fi-v0210-state')||'{}');
    (s.tools||[]).forEach(t=>rows.push({center:'TOOL CENTER',kind:'TOOL',title:`${t.id||''} · ${t.model||''} · ${t.codename||''}`,text:flatten(t).map(x=>x.text).join(' '),dest:'toolcenter'}));
    (s.workspaceTasks||[]).forEach(x=>rows.push({center:'ACTION CENTER',kind:'ACTION',title:x.title||x.task||x.text||'Action',text:flatten(x).map(y=>y.text).join(' '),dest:'actions'}));
    (s.manualReminders||[]).forEach(x=>rows.push({center:'ACTION CENTER',kind:'REMINDER',title:x.title||x.text||'Reminder',text:flatten(x).map(y=>y.text).join(' '),dest:'actions'}));
    (s.meetingHistory||[]).forEach(x=>rows.push({center:'MEETING CENTER',kind:'MEETING',title:x.name||x.title||'Meeting',text:flatten(x).map(y=>y.text).join(' '),dest:'meetingcenter'}));
    (s.knowledgeNotes||[]).forEach(x=>rows.push({center:'REFERENCE CENTER',kind:'REFERENCE',title:x.title||x.name||'Reference',text:flatten(x).map(y=>y.text).join(' '),dest:'referencecenter'}));
    (s.workspaceRefs||[]).forEach(x=>rows.push({center:'REFERENCE CENTER',kind:'REFERENCE',title:x.title||x.name||'Reference',text:flatten(x).map(y=>y.text).join(' '),dest:'referencecenter'}));
    // Status/priority data are also searchable even when not represented as separate records.
    ['weekday','weekend','leadsExtra'].forEach(k=>{if(s[k])rows.push({center:k==='leadsExtra'?'STATUS CENTER':'PRIORITY CENTER',kind:'STATUS',title:k==='weekday'?'Weekday Priorities':k==='weekend'?'Weekend Priorities':'Leads Extra Status',text:flatten(s[k]).map(y=>y.text).join(' '),dest:k==='leadsExtra'?'statuscenter':'priorities'})});
  }catch(e){}
  return rows;
}
function renderSearch(){
  document.body.classList.remove('v61-focused-editor');
  document.body.dataset.center='search'; document.body.dataset.theme='search'; setVars(SEARCH_COLOR,SEARCH_RGB);
  const title=$('#headerPageTitle');if(title)title.textContent='SEARCH CENTER'; document.title='B7 FI Command Center · SEARCH CENTER';
  $$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='searchcenter'));
  const app=$('#app');
  app.innerHTML=`<section class="v64-search"><div class="v64-searchbox"><input id="v64GlobalSearch" autocomplete="off" placeholder="SEARCH UTID, CUSTOMER, SALES ORDER, NC, CHECKLIST, NOTES, ACTIONS, MEETINGS, PART NUMBERS..."></div><div id="v64SearchMeta" class="v64-search-meta">SEARCH THE ENTIRE B7 FI COMMAND CENTER</div><div id="v64SearchResults" class="v64-search-results"></div></section>`;
  const bar=$('#floatingActions');if(bar){bar.style.display='flex';bar.innerHTML='';bar.append(mk('ALL RESULTS',()=>{},'primary v64-nav'));bar.firstChild.dataset.v57tab='all';bar.append(mk('SCREENSHOT',screenshot,'v64-action v64-action-start'),mk('REPORT',()=>window.print(),'v64-action'))}
  const records=searchRecords(), inp=$('#v64GlobalSearch'), res=$('#v64SearchResults'), meta=$('#v64SearchMeta');
  function draw(){
    const q=(inp.value||'').trim().toLowerCase(); if(!q){res.innerHTML='';meta.textContent='SEARCH THE ENTIRE B7 FI COMMAND CENTER';return}
    const words=q.split(/\s+/).filter(Boolean); const hits=records.filter(r=>words.every(w=>(r.title+' '+r.text+' '+r.center+' '+r.kind).toLowerCase().includes(w))).slice(0,100);
    meta.textContent=`${hits.length} RESULT${hits.length===1?'':'S'} FOR “${inp.value.trim()}”`;
    res.innerHTML=hits.map((r,i)=>`<button class="v64-search-result" data-i="${i}"><span>${r.center} · ${r.kind}</span><strong>${String(r.title).replace(/[<>]/g,'')}</strong><small>${String(r.text).replace(/[<>]/g,'').slice(0,220)}</small></button>`).join('')||'<div class="v64-no-results">NO MATCHING COMMAND CENTER RECORDS</div>';
    $$('.v64-search-result',res).forEach((b,i)=>b.onclick=()=>window.setView(hits[i].dest));
  }
  inp.addEventListener('input',draw); setTimeout(()=>inp.focus(),0); setVersion();
}

const oldSetView=window.setView;
window.setView=function(v){if(v==='searchcenter'||v==='search'){window.scrollTo(0,0);renderSearch();return}return oldSetView(v)};

function shell(){
  ensureSearchNav(); setVersion();
  if(document.body.dataset.center==='search') setVars(SEARCH_COLOR,SEARCH_RGB);
  fixMeeting(); fixStatus(); fixReference(); enforceActionPair();
  $$('.main-nav .nav-btn,#floatingActions button').forEach(b=>b.style.textTransform='uppercase');
  const ht=$('#headerPageTitle');if(ht)ht.style.textTransform='uppercase';
}
let scheduled=false;
/* v0.67: legacy body observer disabled */
setTimeout(shell,180);
})();


/* ===== SOURCE: js/patch-v0650.js ===== */
/* B7 FI Command Center v1.0.3 — status/footer architecture + toolbar reliability */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const COLORS={home:['#176FA8','23,111,168'],tool:['#8E5AE8','142,90,232'],shipping:['#27AE60','39,174,96'],priority:['#D4A72C','212,167,44'],status:['#F28C28','242,140,40'],meeting:['#19B9D1','25,185,209'],action:['#E54848','229,72,72'],reference:['#E94A9A','233,74,154'],search:['#4F6BFF','79,107,255'],admin:['#A6AFBC','166,175,188']};

function currentCenter(){return document.body.dataset.center||'home'}
function theme(){
  const c=COLORS[currentCenter()]||COLORS.home;
  ['--center-color','--accent','--page-accent','--fleet-accent','--live-page-accent'].forEach(v=>{document.documentElement.style.setProperty(v,c[0]);document.body.style.setProperty(v,c[0])});
  ['--center-rgb','--accent-rgb','--page-accent-rgb','--fleet-rgb','--live-page-rgb'].forEach(v=>{document.documentElement.style.setProperty(v,c[1]);document.body.style.setProperty(v,c[1])});
  const v=$('#appVersionLabel');if(v)v.textContent='B7 FI COMMAND CENTER v1.0.3';
}
function screenshot(){
  try{if(typeof window.enterScreenshot==='function')return window.enterScreenshot()}catch(e){}
  document.body.classList.add('screenshot-mode');const x=$('#screenshotExit');if(x)x.style.display='block';
}
function make(label,fn,cls=''){
  const b=document.createElement('button');b.type='button';b.className='btn '+cls;b.textContent=label;b.dataset.worktab='page-action';b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();fn&&fn()});return b;
}

/* Bottom bar is now operational only: Fleet Status. System/admin state belongs in footer. */
function rebuildFleetBar(){
  if(window.B7AlertEngine817)return;
  const bar=$('#operationsBar');if(!bar)return;
  if(!bar.dataset.v65){
    const tickerText=$('#opsTickerText'); const task=$('#opsTaskCount'); const presence=$('#opsPresence');
    const ticker=tickerText?tickerText.textContent:'Loading fleet status…';
    const tasks=task?task.textContent:'0 open actions';
    const pres=presence?presence.textContent:'Context: fleet overview';
    bar.innerHTML=`<div class="v65-fleet-label"><b>FLEET STATUS</b></div><div class="ops-ticker v65-fleet-ticker"><span id="opsTickerText">${ticker}</span></div><div class="ops-summary v65-fleet-summary"><span id="opsTaskCount">${tasks}</span><span class="ops-divider">•</span><span id="opsPresence">${pres}</span></div>`;
    bar.dataset.v65='1';
  }
}

/* Footer is reserved for system / administration information. */
function rebuildFooter(){
  const f=$('footer.v57-footer');if(!f)return;
  if(!f.dataset.v65){
    f.innerHTML=`<div class="v65-footer-version"><strong id="appVersionLabel">B7 FI COMMAND CENTER v1.0.3</strong></div>
      <div class="v65-footer-admin"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div>
      <div class="v65-footer-system"><span class="ops-live-dot"></span><b>COMMAND CENTER</b><span id="opsSync">Local Production Mode · SharePoint live sync pending</span></div>
      <div class="v65-footer-location">Building 7 · Final Integration · Operations</div>`;
    f.dataset.v65='1';
    const a=$('#administrationCenterFooter');if(a)a.onclick=()=>window.setView('admincenter');
  }
}

function normalizeSearch(){
  if(currentCenter()!=='search')return;
  const title=$('#headerPageTitle');if(title)title.textContent='SEARCH CENTER';
  $$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='searchcenter'));
  const bar=$('#floatingActions');if(!bar)return;
  $$(':scope > button',bar).forEach(b=>{if(/^ALL RESULTS$/i.test((b.textContent||'').trim()))b.remove()});
}

/* Repair sticky page controls. Keep native handlers, but make the bar the top click layer. */
function toolbar(){
  const bar=$('#floatingActions');if(!bar)return;
  bar.style.pointerEvents='auto';
  $$(':scope > button',bar).forEach(b=>{
    b.disabled=false;b.style.pointerEvents='auto';b.style.textTransform='uppercase';b.dataset.worktab=b.dataset.worktab||'page-action';
  });
  if(currentCenter()==='home'){bar.style.display='none';return}
  bar.style.display='flex';
  if(document.body.classList.contains('v61-focused-editor')) return;
  if(!$$(':scope > button',bar).some(b=>/^SCREENSHOT$/i.test((b.textContent||'').trim())))bar.appendChild(make('SCREENSHOT',screenshot,'v65-action'));
  if(!$$(':scope > button',bar).some(b=>/^REPORT$/i.test((b.textContent||'').trim())))bar.appendChild(make('REPORT',()=>window.print(),'v65-action'));
  const all=$$(':scope > button',bar);
  all.forEach(b=>b.classList.remove('v65-nav','v65-action','v65-first-action'));
  const nav=all.filter(b=>b.dataset.v57tab), acts=all.filter(b=>!b.dataset.v57tab);
  nav.forEach(b=>b.classList.add('v65-nav'));acts.forEach(b=>b.classList.add('v65-action'));
  const shot=acts.find(b=>/^SCREENSHOT$/i.test((b.textContent||'').trim())), rep=acts.find(b=>/^REPORT$/i.test((b.textContent||'').trim()));
  const other=acts.filter(b=>b!==shot&&b!==rep);
  [...nav,...other,shot,rep].filter(Boolean).forEach(b=>bar.appendChild(b));
  const first=other[0]||shot||rep;if(first)first.classList.add('v65-first-action');
}

/* Meeting Center: sticky START NEW MEETING is the only page-level start control. */
function meeting(){
  if(currentCenter()!=='meeting'||document.body.classList.contains('v61-focused-editor'))return;
  const bar=$('#floatingActions');if(!bar)return;
  $$(':scope > button',bar).forEach(b=>{if(/START MEETING/i.test(b.textContent||''))b.textContent='START NEW MEETING'});
  const start=$('#app .start-now51');if(start)start.remove();
}

function shell(){theme();rebuildFleetBar();rebuildFooter();normalizeSearch();meeting();toolbar();
  $$('.main-nav .nav-btn,#floatingActions button').forEach(b=>b.style.textTransform='uppercase');
  const h=$('#headerPageTitle');if(h)h.style.textTransform='uppercase';
}
let busy=false;
/* v0.67: legacy body observer disabled */
setTimeout(shell,120);
})();


/* ===== SOURCE: js/patch-v0660.js ===== */
/* B7 FI Command Center v1.0.3 — final shared-shell framework stabilization */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const COLORS={home:['#176FA8','23,111,168','OPERATIONS CENTER'],tool:['#8E5AE8','142,90,232','TOOL CENTER'],shipping:['#27AE60','39,174,96','SHIPPING CENTER'],priority:['#D4A72C','212,167,44','PRIORITY CENTER'],status:['#F28C28','242,140,40','STATUS CENTER'],meeting:['#19B9D1','25,185,209','MEETING CENTER'],action:['#E54848','229,72,72','ACTION CENTER'],reference:['#E94A9A','233,74,154','REFERENCE CENTER'],search:['#4F6BFF','79,107,255','SEARCH CENTER'],admin:['#A6AFBC','166,175,188','ADMINISTRATION CENTER']};

function center(){return document.body.dataset.center||'home'}
function applyTheme(){
  const c=COLORS[center()]||COLORS.home;
  ['--center-color','--accent','--page-accent','--fleet-accent','--live-page-accent'].forEach(v=>{document.documentElement.style.setProperty(v,c[0]);document.body.style.setProperty(v,c[0])});
  ['--center-rgb','--accent-rgb','--page-accent-rgb','--fleet-rgb','--live-page-rgb'].forEach(v=>{document.documentElement.style.setProperty(v,c[1]);document.body.style.setProperty(v,c[1])});
  const title=$('#headerPageTitle'); if(title) title.textContent=c[2];
  const ver=$('#appVersionLabel'); if(ver) ver.textContent='B7 FI COMMAND CENTER v1.0.3';
  $$('.main-nav .nav-btn').forEach(b=>{
    const map={home:'home',toolcenter:'tool',shipping:'shipping',priorities:'priority',statuscenter:'status',meetingcenter:'meeting',actions:'action',referencecenter:'reference',searchcenter:'search'};
    b.classList.toggle('active',map[b.dataset.view]===center());
  });
}

function screenshot(){
  try{ if(typeof window.enterScreenshot==='function') return window.enterScreenshot(); }catch(e){}
  document.body.classList.add('screenshot-mode'); const x=$('#screenshotExit'); if(x)x.style.display='block';
}
function btn(label,fn,cls=''){
  const b=document.createElement('button'); b.type='button'; b.className='btn '+cls; b.textContent=label; b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();fn&&fn()}); return b;
}

/* ACTION STATUS gets its own permanent label without mutating the ticker itself. */
function actionStatusLabel(){
  const stack=$('.header-status-stack'), top=$('#topActionBar'); if(!stack||!top)return;
  let label=$('#v66ActionStatusLabel');
  if(!label){label=document.createElement('div');label.id='v66ActionStatusLabel';label.className='v66-action-status-label';label.innerHTML='<strong>ACTION STATUS</strong>';stack.insertBefore(label,top)}
}

/* Operations Center now keeps the same secondary-bar geometry as every other Center. */
function homeToolbar(){
  const bar=$('#floatingActions'); if(!bar)return;
  if(center()!=='home')return;
  bar.style.display='flex';
  if(!bar.dataset.v66home){
    bar.innerHTML='';
    const overview=btn('OVERVIEW',()=>window.setView('home'),'primary v66-page-nav'); overview.dataset.v57tab='overview';
    bar.append(overview,btn('SCREENSHOT',screenshot,'v66-page-action v66-first-action'),btn('REPORT',()=>window.print(),'v66-page-action'));
    bar.dataset.v66home='1';
  }
}

/* Ensure every page toolbar is the top click layer and normalise left-nav/right-action geometry. */
function toolbar(){
  const bar=$('#floatingActions'); if(!bar)return;
  if(center()==='home')homeToolbar();
  bar.style.pointerEvents='auto'; bar.style.display='flex';
  $$(':scope > button',bar).forEach(b=>{b.disabled=false;b.style.pointerEvents='auto';b.style.textTransform='uppercase';b.style.position='relative';b.style.zIndex='2002'});
  if(document.body.classList.contains('v61-focused-editor')){
    const buttons=$$(':scope > button',bar); const cancel=buttons.find(b=>/^CANCEL$/i.test(b.textContent||'')); const save=buttons.find(b=>/^SAVE CHANGES$/i.test(b.textContent||''));
    buttons.forEach(b=>b.classList.remove('v66-page-nav','v66-page-action','v66-first-action'));
    if(cancel){cancel.classList.add('v66-page-action','v66-first-action');bar.appendChild(cancel)}
    if(save){save.classList.add('v66-page-action');bar.appendChild(save)}
    return;
  }
  const all=$$(':scope > button',bar);
  let shot=all.find(b=>/^SCREENSHOT$/i.test((b.textContent||'').trim()));
  let report=all.find(b=>/^REPORT$/i.test((b.textContent||'').trim()));
  if(!shot){shot=btn('SCREENSHOT',screenshot,'v66-page-action');bar.appendChild(shot)}
  if(!report){report=btn('REPORT',()=>window.print(),'v66-page-action');bar.appendChild(report)}
  const now=$$(':scope > button',bar);
  now.forEach(b=>b.classList.remove('v66-page-nav','v66-page-action','v66-first-action'));
  const nav=now.filter(b=>b.dataset.v57tab), actions=now.filter(b=>!b.dataset.v57tab);
  nav.forEach(b=>b.classList.add('v66-page-nav')); actions.forEach(b=>b.classList.add('v66-page-action'));
  const others=actions.filter(b=>b!==shot&&b!==report);
  [...nav,...others,shot,report].filter(Boolean).forEach(b=>bar.appendChild(b));
  const first=others[0]||shot||report; if(first)first.classList.add('v66-first-action');
}

/* Footer mirrors the header: admin/system on left, KLA in the center, deployment state on right. */
function footer(){
  const f=$('footer.v57-footer');if(!f)return;
  if(!f.dataset.v66){
    f.innerHTML=`
      <div class="v66-footer-left">
        <button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button>
        <strong id="appVersionLabel">B7 FI COMMAND CENTER v1.0.3</strong>
      </div>
      <div class="v66-footer-center"><img src="assets/kla-plus-official.png" alt="KLA+" class="v66-footer-kla"></div>
      <div class="v66-footer-right">
        <div><b>COMMAND CENTER</b> <span id="opsSync">Local Production Mode · SharePoint live sync pending</span></div>
        <div>Building 7 · Final Integration · Operations</div>
      </div>`;
    f.dataset.v66='1';
  }
  const a=$('#administrationCenterFooter'); if(a)a.onclick=()=>window.setView('admincenter');
}

/* Keep Search Center simple until category filters are genuinely implemented. */
function searchCleanup(){
  if(center()!=='search')return;
  const bar=$('#floatingActions'); if(bar)$$(':scope > button',bar).forEach(b=>{if(/^ALL RESULTS$/i.test((b.textContent||'').trim()))b.remove()});
}

function shell(){
  applyTheme(); actionStatusLabel(); footer(); searchCleanup(); toolbar();
  $$('.main-nav .nav-btn,#floatingActions button').forEach(b=>b.style.textTransform='uppercase');
  const h=$('#headerPageTitle');if(h)h.style.textTransform='uppercase';
}
let busy=false;
/* v0.67: legacy body observer disabled */
setTimeout(shell,220);
})();


/* ===== SOURCE: js/patch-v0670.js ===== */
/* B7 FI Command Center v1.0.3 — final framework/navigation stabilization */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const COLORS={home:['#176FA8','23,111,168','OPERATIONS CENTER'],tool:['#8E5AE8','142,90,232','TOOL CENTER'],shipping:['#27AE60','39,174,96','SHIPPING CENTER'],priority:['#D4A72C','212,167,44','PRIORITY CENTER'],status:['#F28C28','242,140,40','STATUS CENTER'],meeting:['#19B9D1','25,185,209','MEETING CENTER'],action:['#E54848','229,72,72','ACTION CENTER'],reference:['#E94A9A','233,74,154','REFERENCE CENTER'],search:['#4F6BFF','79,107,255','SEARCH CENTER'],admin:['#A6AFBC','166,175,188','ADMINISTRATION CENTER']};
function center(){return document.body.dataset.center||'home'}
function theme(){const c=COLORS[center()]||COLORS.home;['--center-color','--accent','--page-accent','--fleet-accent','--live-page-accent'].forEach(v=>{document.documentElement.style.setProperty(v,c[0]);document.body.style.setProperty(v,c[0])});['--center-rgb','--accent-rgb','--page-accent-rgb','--fleet-rgb','--live-page-rgb'].forEach(v=>{document.documentElement.style.setProperty(v,c[1]);document.body.style.setProperty(v,c[1])});const t=$('#headerPageTitle');if(t)t.textContent=c[2];const v=$('#appVersionLabel');if(v)v.textContent='B7 FI COMMAND CENTER v1.0.3';$$('.main-nav .nav-btn').forEach(b=>{const m={home:'home',toolcenter:'tool',shipping:'shipping',priorities:'priority',statuscenter:'status',meetingcenter:'meeting',actions:'action',referencecenter:'reference',searchcenter:'search'};b.classList.toggle('active',m[b.dataset.view]===center())})}
function make(label,fn,cls=''){const b=document.createElement('button');b.type='button';b.className='btn '+cls;b.textContent=label;b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();fn&&fn()});return b}
function screenshot(){try{if(typeof window.enterScreenshot==='function')return window.enterScreenshot()}catch(e){}document.body.classList.add('screenshot-mode');const x=$('#screenshotExit');if(x)x.style.display='block'}
function report(){if(typeof window.print==='function')window.print()}
function ensureActionLabel(){/* v0.70: Action Status label is rendered atomically by the ticker owner. */}
function ensureFooter(){const f=$('footer.v57-footer');if(!f)return;if(!f.querySelector('.v66-footer-left')){f.innerHTML=`<div class="v66-footer-left"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button><strong id="appVersionLabel">B7 FI COMMAND CENTER v1.0.3</strong></div><div class="v66-footer-center"><img src="assets/kla-plus-official.png" alt="KLA+" class="v66-footer-kla"></div><div class="v66-footer-right"><div><b>COMMAND CENTER</b> <span id="opsSync">Local Production Mode · SharePoint live sync pending</span></div><div>Building 7 · Final Integration · Operations</div></div>`}const a=$('#administrationCenterFooter');if(a)a.onclick=()=>window.setView('admincenter')}
function ensureFleet(){if(window.B7AlertEngine817)return;const bar=$('#operationsBar');if(!bar)return;if(!bar.querySelector('.v65-fleet-label')){const ticker=$('#opsTickerText')?.textContent||'Loading fleet status…',tasks=$('#opsTaskCount')?.textContent||'0 open actions',presence=$('#opsPresence')?.textContent||'Context: fleet overview';bar.innerHTML=`<div class="v65-fleet-label"><b>FLEET STATUS</b></div><div class="ops-ticker v65-fleet-ticker"><span id="opsTickerText">${ticker}</span></div><div class="ops-summary v65-fleet-summary"><span id="opsTaskCount">${tasks}</span><span class="ops-divider">•</span><span id="opsPresence">${presence}</span></div>`}}
function normalizeToolbar(){const bar=$('#floatingActions');if(!bar)return;bar.style.display='flex';bar.style.pointerEvents='auto';
  if(center()==='home'){ $$(':scope > button',bar).forEach(b=>{if(/^OVERVIEW$/i.test((b.textContent||'').trim())) b.remove()}); }
  if(center()==='search')$$(':scope > button',bar).forEach(b=>{if(/^ALL RESULTS$/i.test((b.textContent||'').trim()))b.remove()});
  if(!document.body.classList.contains('v61-focused-editor')){
    let shot=$$(':scope > button',bar).find(b=>/^SCREENSHOT$/i.test((b.textContent||'').trim()));if(!shot){shot=make('SCREENSHOT',screenshot,'v67-page-action');bar.appendChild(shot)}
    let rep=$$(':scope > button',bar).find(b=>/^REPORT$/i.test((b.textContent||'').trim()));if(!rep){rep=make('REPORT',report,'v67-page-action');bar.appendChild(rep)}
  }
  const all=$$(':scope > button',bar);all.forEach(b=>{b.disabled=false;b.style.pointerEvents='auto';b.style.textTransform='uppercase';b.classList.remove('v67-page-nav','v67-page-action','v67-first-action');if(b.dataset.v57tab)b.classList.add('v67-page-nav');else b.classList.add('v67-page-action')});
  const nav=all.filter(b=>b.dataset.v57tab),acts=all.filter(b=>!b.dataset.v57tab);const shot=acts.find(b=>/^SCREENSHOT$/i.test((b.textContent||'').trim())),rep=acts.find(b=>/^REPORT$/i.test((b.textContent||'').trim())),other=acts.filter(b=>b!==shot&&b!==rep);
  const desired=[...nav,...other,shot,rep].filter(Boolean);const current=$$(':scope > button',bar);if(desired.length===current.length&&desired.some((b,i)=>b!==current[i]))desired.forEach(b=>bar.appendChild(b));
  const first=other[0]||shot||rep;if(first)first.classList.add('v67-first-action');
  if(document.body.classList.contains('v61-focused-editor')){const a=$$(':scope > button',bar),cancel=a.find(b=>/^CANCEL$/i.test(b.textContent||'')),save=a.find(b=>/^SAVE CHANGES$/i.test(b.textContent||''));if(cancel&&save){cancel.classList.add('v67-first-action');if(cancel.nextElementSibling!==save){bar.append(cancel,save)}}}
}
function fixMeeting(){if(center()!=='meeting'||document.body.classList.contains('v61-focused-editor'))return;const bar=$('#floatingActions');if(!bar)return;const bodyStart=$('#app .start-now51');const source=$$('#app button').find(b=>/START MEETING NOW/i.test(b.textContent||''));let start=$$(':scope > button',bar).find(b=>/START (NEW )?MEETING/i.test(b.textContent||''));if(!start&&source){start=make('START NEW MEETING',()=>source.click(),'v67-page-action');bar.appendChild(start)}if(start)start.textContent='START NEW MEETING';if(bodyStart)bodyStart.remove()}
function fixReference(){if(center()!=='reference'||document.body.classList.contains('v61-focused-editor'))return;const bar=$('#floatingActions');if(!bar)return;$$(':scope > button',bar).forEach(b=>{const t=(b.textContent||'').trim();if(!b.dataset.v57tab&&!/ADD REFERENCE NOTE|SCREENSHOT|REPORT/i.test(t))b.remove()});const src=$$('#app button').find(b=>/ADD REFERENCE NOTE/i.test(b.textContent||''));if(src&&!$$(':scope > button',bar).some(b=>/ADD REFERENCE NOTE/i.test(b.textContent||''))){bar.appendChild(make('ADD REFERENCE NOTE',()=>src.click(),'v67-page-action'));src.style.display='none'}}
function fixStatus(){/* v0.70: preserve original button handlers; shared toolbar normalizer only reorders existing controls. */}
function stabilize(){theme();ensureActionLabel();ensureFleet();ensureFooter();fixMeeting();fixReference();fixStatus();normalizeToolbar();$$('.main-nav .nav-btn,#floatingActions button').forEach(b=>b.style.textTransform='uppercase')}
const priorSet=window.setView;window.setView=function(v){const r=priorSet(v);setTimeout(stabilize,0);setTimeout(stabilize,50);return r};
$$('.main-nav .nav-btn').forEach(b=>b.onclick=()=>window.setView(b.dataset.view));
/* v0.70: no Action Status DOM mutation observer; ticker owns the complete bar atomically. */
setTimeout(stabilize,260);
})();


/* ===== SOURCE: js/patch-v0700.js ===== */
/* B7 FI Command Center v1.0.3 — Framework Lock */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const viewToCenter={home:'operations',toolcenter:'tool',shipping:'shipping',priorities:'priority',statuscenter:'status',meetingcenter:'meeting',actions:'action',referencecenter:'reference',searchcenter:'search',admincenter:'admin'};
const centerToView={operations:'home',tool:'toolcenter',shipping:'shipping',priority:'priorities',status:'statuscenter',meeting:'meetingcenter',action:'actions',reference:'referencecenter',search:'searchcenter',admin:'admincenter'};
let localObjectUrl='';
function label(b){return (b?.textContent||'').trim().replace(/^\+\s*/,'').toUpperCase()}
function isActionLabel(t){return /^(EDIT|UPDATE|ADD|START|SCREENSHOT|REPORT|CANCEL|SAVE|OPEN|REFRESH|REPLACE|CHANGE|CLOSE)/.test(t)}
function fleetKind(){const t=($('#opsTickerText')?.textContent||'').toLowerCase();if(/blocked|critical|behind\s+(?:[4-9]|\d{2,})/.test(t))return 'critical';if(/behind|overdue/.test(t))return 'attention';if(/at risk|risk/.test(t))return 'reminder';if(/ahead/.test(t))return 'information';if(/on schedule|complete|shipped/.test(t))return 'good';return 'normal'}
function paintFleet(){const l=$('.v65-fleet-label');if(!l)return;l.dataset.status=fleetKind();if(!$('.v70-fleet-lamp',l))l.insertAdjacentHTML('afterbegin','<span class="v70-fleet-lamp" aria-hidden="true"></span>');}
function ensureVersion(){const v=$('#appVersionLabel');if(v)v.textContent='B7 FI COMMAND CENTER v1.0.3';const r=$('.v66-footer-right');if(r){$$('b',r).forEach(b=>{if(/COMMAND CENTER/i.test(b.textContent||''))b.remove()})}}
function removeBodyDuplicates(){
 const c=document.body.dataset.center||'';
 if(c==='meeting')$$('#app .start-now51').forEach(x=>x.remove());
 if(c==='reference')$$('#app button').forEach(b=>{if(/^ADD REFERENCE NOTE$/i.test(label(b)))b.style.display='none'});
 if(c==='status')$$('#app button').forEach(b=>{if(/RESET TOOL TYPE\s*\/\s*SERIAL ORDER/i.test(b.textContent||''))b.remove()});
}
function toolbarRules(){
 const bar=$('#floatingActions');if(!bar)return;
 let buttons=$$(':scope > button',bar);
 // Never allow legacy Operations fillers.
 buttons.forEach(b=>{if(/^(OVERVIEW|PAGE ACTIONS)$/i.test(label(b)))b.remove()});
 buttons=$$(':scope > button',bar);
 const c=document.body.dataset.center||'';
 // Reference Center has exactly two local destinations. Keep existing handlers by renaming/removing only.
 if(c==='reference'){
   buttons.forEach(b=>{
     let t=label(b);
     if(t==='FI KNOWLEDGE BASE')b.textContent='FI KNOWLEDGE';
     t=label(b);
     const keep=/^(FI KNOWLEDGE|REFERENCE FILES|ADD REFERENCE NOTE|SCREENSHOT|REPORT)$/.test(t);
     if(!keep)b.remove();
   });
   buttons=$$(':scope > button',bar);
   const refFiles=buttons.find(b=>label(b)==='REFERENCE FILES');
   const filesActive=!!refFiles?.classList.contains('primary');
   buttons.forEach(b=>{if(filesActive&&label(b)==='ADD REFERENCE NOTE')b.remove()});
 }
 if(c==='search')buttons.forEach(b=>{if(label(b)==='ALL RESULTS')b.remove()});
 if(c==='home')buttons.forEach(b=>{if(label(b)!=='SCREENSHOT'&&label(b)!=='REPORT')b.remove()});
 buttons=$$(':scope > button',bar);
 // Classify without replacing nodes so original click handlers remain intact.
 buttons.forEach(b=>{b.classList.remove('v70-page-nav','v70-page-action','v70-first-action');b.disabled=false;b.style.pointerEvents='auto';let t=label(b);let nav=!!b.dataset.v57tab;
   if(c==='tool'&&/^(CY26Q3 TOOLS|TOOL ARCHIVE)$/.test(t))nav=true;
   if(c==='priority'&&/^(WEEKDAY|WEEKEND)$/.test(t))nav=true;
   if(c==='status'&&/^(WEEKDAY MORNING STATUS|MORNING STATUS|LEADS EXTRA STATUS|WEEKEND MORNING STATUS)$/.test(t))nav=true;
   if(c==='reference'&&/^(FI KNOWLEDGE|REFERENCE FILES)$/.test(t))nav=true;
   if(c==='action'&&/^(ALL(?:\s+\d+)?|CRITICAL(?:\s+\d+)?|ATTENTION(?:\s+\d+)?|REMINDERS?(?:\s+\d+)?|INFORMATION(?:\s+\d+)?)$/.test(t))nav=true;
   if(isActionLabel(t)&&!/^OPEN\s/.test(t))nav=false;
   b.classList.add(nav?'v70-page-nav':'v70-page-action');
 });
 const nav=buttons.filter(b=>b.classList.contains('v70-page-nav'));
 const acts=buttons.filter(b=>b.classList.contains('v70-page-action'));
 // Keep screenshot/report final; all other actions immediately before them.
 const shot=acts.find(b=>label(b)==='SCREENSHOT'), rep=acts.find(b=>label(b)==='REPORT');
 const other=acts.filter(b=>b!==shot&&b!==rep);
 [...nav,...other,shot,rep].filter(Boolean).forEach(b=>bar.appendChild(b));
 const first=other[0]||shot||rep;if(first)first.classList.add('v70-first-action');
}
function universalReference(){
 if((document.body.dataset.center||'')!=='reference')return;
 const bar=$('#floatingActions');if(!bar)return;
 const files=$$(':scope > button',bar).find(b=>label(b)==='REFERENCE FILES');
 if(!files||!files.classList.contains('primary'))return;
 const app=$('#app');if(!app||app.dataset.v70Universal==='1')return;app.dataset.v70Universal='1';
 app.innerHTML=`<section class="v70-file-access"><div class="v70-file-card"><div class="v70-file-title">FILE ACCESS</div><div class="v70-file-sub">Open one reference file from a URL or this computer.</div><div class="v70-url-row"><input id="v70FileUrl" type="text" placeholder="Paste file, SharePoint, or network URL…" autocomplete="off"><button id="v70OpenUrl" class="btn primary">OPEN URL</button></div><div class="v70-or">OR</div><label class="btn primary v70-local-btn">SELECT LOCAL FILE<input id="v70LocalFile" type="file" hidden></label><div id="v70Current" class="v70-current" hidden><span class="v70-current-label">CURRENT FILE</span><strong id="v70CurrentName"></strong><div><button id="v70OpenCurrent" class="btn">OPEN / VIEW</button><button id="v70ChangeFile" class="btn">CHANGE FILE</button><button id="v70CloseFile" class="btn">CLOSE</button></div><div id="v70Preview" class="v70-preview"><div class="v70-preview-note">Select a local file or enter a URL.</div></div></div></div></section>`;
 const url=$('#v70FileUrl'), inp=$('#v70LocalFile'), cur=$('#v70Current'), nm=$('#v70CurrentName'), prev=$('#v70Preview');let target='';
 function show(name,u){target=u;nm.textContent=name;cur.hidden=false}
 function previewLocal(f,u){prev.innerHTML='';const ext=(f.name.split('.').pop()||'').toLowerCase();if(f.type.startsWith('image/')){const im=document.createElement('img');im.src=u;prev.appendChild(im);return}if(f.type==='application/pdf'||ext==='pdf'){const fr=document.createElement('iframe');fr.src=u;fr.title=f.name;prev.appendChild(fr);return}if(f.type.startsWith('text/')||['txt','csv','log','json','xml','md'].includes(ext)){const rd=new FileReader();rd.onload=()=>{const pre=document.createElement('pre');pre.textContent=String(rd.result||'');prev.replaceChildren(pre)};rd.readAsText(f);return}prev.innerHTML='<div class="v70-preview-note">Inline preview is not available for this file type in the static browser build. Use OPEN / VIEW to open the original file.</div>'}
 $('#v70OpenUrl').onclick=()=>{let u=url.value.trim();if(!u)return;if(!/^[a-z][a-z0-9+.-]*:/i.test(u)&&!u.startsWith('\\\\'))u='https://'+u;show(u,u);prev.innerHTML='<div class="v70-preview-note">URL loaded. Browser/SharePoint security may require OPEN / VIEW for the original file.</div>'};
 inp.onchange=()=>{const f=inp.files&&inp.files[0];if(!f)return;if(localObjectUrl)URL.revokeObjectURL(localObjectUrl);localObjectUrl=URL.createObjectURL(f);show(f.name,localObjectUrl);previewLocal(f,localObjectUrl)};
 $('#v70OpenCurrent').onclick=()=>target&&window.open(target,'_blank','noopener');$('#v70ChangeFile').onclick=()=>inp.click();$('#v70CloseFile').onclick=()=>{if(localObjectUrl){URL.revokeObjectURL(localObjectUrl);localObjectUrl=''}target='';inp.value='';url.value='';cur.hidden=true;prev.innerHTML=''};
}
function syncUrl(view){try{const u=new URL(location.href);const c=viewToCenter[view]||'operations';u.searchParams.set('center',c);history.replaceState({center:c},'',u)}catch(e){}}
function restoreUrl(){try{const c=new URL(location.href).searchParams.get('center');const v=centerToView[c];if(v&&typeof window.setView==='function')window.setView(v)}catch(e){}}
function stabilize(){toolbarRules();removeBodyDuplicates();paintFleet();ensureVersion();universalReference()}
// Wrap setView once: URL becomes refresh-safe and framework normalization follows every Center change.
const prior=window.setView;if(typeof prior==='function'){window.setView=function(v){const r=prior(v);syncUrl(v);setTimeout(stabilize,0);setTimeout(stabilize,80);return r}}
// Main navigation always uses the wrapped router.
$$('.main-nav .nav-btn').forEach(b=>{b.onclick=()=>window.setView(b.dataset.view)});
// v1.0.1 performance: legacy continuous observers/painter removed.
setTimeout(()=>{restoreUrl();stabilize()},360);
})();


/* ===== SOURCE: js/patch-v0710.js ===== */
/* B7 FI Command Center v1.0.3 — independent status colors + geometry stabilization */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
function text(el){return (el?.textContent||'').trim()}
function actionStatus(){
  const bar=$('#topActionBar'); if(!bar)return 'normal';
  const beacon=$('.v70-action-beacon',bar);
  const s=(beacon?.dataset.status||'').toLowerCase();
  if(['red','orange','yellow','blue','green'].includes(s))return s;
  const cls=[...($('.top-action-current',bar)?.classList||[])];
  return ['red','orange','yellow','blue','green'].find(x=>cls.includes(x))||'normal';
}
function fleetStatus(){
  const t=text($('#opsTickerText')).toLowerCase();
  if(/blocked|critical|stop ship|cannot ship|behind\s+(?:[4-9]|\d{2,})/.test(t))return 'critical';
  if(/behind|overdue|late/.test(t))return 'attention';
  if(/at risk|risk|due soon/.test(t))return 'reminder';
  if(/ahead/.test(t))return 'information';
  if(/on schedule|on track|complete|completed|shipped|ready/.test(t))return 'good';
  return 'normal';
}
function stabilizeStatus(){
  const a=$('#topActionBar'); if(a)a.dataset.status=actionStatus();
  const f=$('#operationsBar'); if(f){
    const s=fleetStatus(); f.dataset.status=s;
    const l=$('.v65-fleet-label',f); if(l){l.dataset.status=s;if(!$('.v70-fleet-lamp',l))l.insertAdjacentHTML('afterbegin','<span class="v70-fleet-lamp" aria-hidden="true"></span>')}
  }
}
function fixToolbar(){
  const bar=$('#floatingActions'); if(!bar)return;
  const buttons=$$(':scope > button',bar);
  const nav=buttons.filter(b=>b.classList.contains('v70-page-nav'));
  const acts=buttons.filter(b=>b.classList.contains('v70-page-action'));
  buttons.forEach(b=>{b.style.marginLeft='';b.style.marginRight=''});
  nav.forEach(b=>bar.appendChild(b));
  const shot=acts.find(b=>/SCREENSHOT/i.test(text(b))), rep=acts.find(b=>/^REPORT$/i.test(text(b)));
  const other=acts.filter(b=>b!==shot&&b!==rep);
  [...other,shot,rep].filter(Boolean).forEach(b=>bar.appendChild(b));
  const first=other[0]||shot||rep;
  $$('.v70-first-action',bar).forEach(b=>b.classList.remove('v70-first-action'));
  if(first)first.classList.add('v70-first-action');
}
function version(){const v=$('#appVersionLabel');if(v)v.textContent='B7 FI COMMAND CENTER v1.0.3'}
function stabilize(){stabilizeStatus();fixToolbar();version()}
// v1.0.1 performance: continuous framework observers/poller removed.
setTimeout(stabilize,120);setTimeout(stabilize,500);
})();


/* ===== SOURCE: js/patch-v0720.js ===== */
/* B7 FI Command Center v1.0.3 — unified status beacons + locked page navigation */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const names={red:'CRITICAL',critical:'CRITICAL',orange:'ATTENTION',attention:'ATTENTION',yellow:'REMINDER',reminder:'REMINDER',blue:'INFORMATION',information:'INFORMATION',green:'ON TRACK',good:'ON TRACK',normal:'NORMAL'};
function txt(el){return (el?.textContent||'').trim()}
function actionStatus(){
  const bar=$('#topActionBar'); if(!bar)return 'normal';
  const b=$('.v70-action-beacon',bar); const raw=(b?.dataset.status||'').toLowerCase();
  if(['red','orange','yellow','blue','green'].includes(raw))return raw;
  const cur=$('.top-action-current',bar);return ['red','orange','yellow','blue','green'].find(s=>cur?.classList.contains(s))||'normal';
}
function fleetStatus(){
  const t=txt($('#opsTickerText')).toLowerCase();
  if(/blocked|critical|stop ship|cannot ship|behind\s+(?:[4-9]|\d{2,})/.test(t))return 'critical';
  if(/behind|overdue|late/.test(t))return 'attention';
  if(/at risk|risk|due soon/.test(t))return 'reminder';
  if(/ahead/.test(t))return 'information';
  if(/on schedule|on track|complete|completed|shipped|ready/.test(t))return 'good';
  return 'normal';
}
function actionAge(){
  const old=txt($('.top-action-label','#topActionBar'));
  const m=old.match(/(?:DAY\s+\d+|OVERDUE\s+\d+\s+DAYS?)/i);return m?m[0].toUpperCase():'';
}
function beaconHTML(kind,status,lampClass){
  return `<span class="${lampClass}" aria-hidden="true"></span><span class="v72-beacon-title">${kind}</span><span class="v72-beacon-status">${names[status]||'NORMAL'}</span>`;
}
let busy=false;
function paint(){
  if(busy)return;busy=true;
  try{
    const a=$('#topActionBar');
    if(a){
      const s=actionStatus();if(a.dataset.status!==s)a.dataset.status=s;
      const b=$('.v70-action-beacon',a);
      if(b){if(b.dataset.status!==s)b.dataset.status=s;const desired=names[s]||'NORMAL';if(!b.querySelector('.v72-beacon-status')||txt(b.querySelector('.v72-beacon-status'))!==desired)b.innerHTML=beaconHTML('LEAD ALERTS',s,'v70-beacon-lamp')}
      const nav=$('.v70-action-nav',a);
      if(nav){
        const age=actionAge();
        let base=txt(nav).replace(/^(?:DAY\s+\d+|OVERDUE\s+\d+\s+DAYS?)\s*·\s*/i,'');
        if(age)nav.textContent=`${age} · ${base}`;
      }
    }
    const f=$('#operationsBar');
    if(f){
      const s=fleetStatus();if(f.dataset.status!==s)f.dataset.status=s;
      const b=$('.v65-fleet-label',f);
      if(b){if(b.dataset.status!==s)b.dataset.status=s;const desired=names[s]||'NORMAL';if(!b.querySelector('.v72-beacon-status')||txt(b.querySelector('.v72-beacon-status'))!==desired)b.innerHTML=beaconHTML('SYSTEM STATUS',s,'v70-fleet-lamp')}
    }
  }finally{busy=false}
}
function toolbar(){
  const bar=$('#floatingActions');if(!bar)return;
  const buttons=$$(':scope > button',bar);
  const nav=buttons.filter(b=>b.classList.contains('v70-page-nav')||b.dataset.v57tab);
  const actions=buttons.filter(b=>!nav.includes(b));
  buttons.forEach(b=>{b.classList.toggle('v70-page-nav',nav.includes(b));b.classList.toggle('v70-page-action',actions.includes(b));b.classList.remove('v70-first-action');b.style.marginTop='';b.style.marginBottom=''});
  nav.forEach(b=>bar.appendChild(b));actions.forEach(b=>bar.appendChild(b));if(actions[0])actions[0].classList.add('v70-first-action');
}
function version(){const v=$('#appVersionLabel');if(v)v.textContent='B7 FI COMMAND CENTER v1.0.3'}
function run(){paint();toolbar();version()}
// v1.0.1 performance: no continuous status observer/painter.
setTimeout(run,80);setTimeout(run,300);setTimeout(run,900);
})();


/* ===== SOURCE: js/patch-v0730.js ===== */
/* B7 FI Command Center v1.0.3 — deterministic status rails + compact page navigation */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const LABEL={red:'CRITICAL',critical:'CRITICAL',orange:'ATTENTION',attention:'ATTENTION',yellow:'REMINDER',reminder:'REMINDER',blue:'INFORMATION',information:'INFORMATION',green:'ON TRACK',good:'ON TRACK',normal:'NORMAL'};
function text(el){return (el?.textContent||'').trim()}
function normalizeStatus(s){s=String(s||'').toLowerCase();return ({red:'red',critical:'red',orange:'orange',attention:'orange',yellow:'yellow',reminder:'yellow',blue:'blue',information:'blue',green:'green',good:'green',normal:'normal'})[s]||'normal'}
function actionStatus(){const bar=$('#topActionBar');if(!bar)return 'normal';const beacon=$('.v70-action-beacon',bar);const raw=(beacon?.dataset.status||'').toLowerCase();if(raw)return normalizeStatus(raw);const cur=$('.top-action-current',bar);for(const s of ['red','orange','yellow','blue','green'])if(cur?.classList.contains(s))return s;return 'normal'}
function fleetStatus(){const t=text($('#opsTickerText')).toLowerCase();if(/blocked|critical|stop ship|cannot ship|behind\s+(?:[4-9]|\d{2,})/.test(t))return 'red';if(/behind|overdue|late/.test(t))return 'orange';if(/at risk|risk|due soon/.test(t))return 'yellow';if(/ahead/.test(t))return 'blue';if(/on schedule|on track|complete|completed|shipped|ready/.test(t))return 'green';return 'normal'}
function beacon(kind,status,lamp){return `<span class="${lamp}" aria-hidden="true"></span><span class="v72-beacon-title">${kind}</span><span class="v72-beacon-status">${LABEL[status]||'NORMAL'}</span>`}
function ensureSweeps(bar){if(!bar)return;if(!bar.querySelector('.v73-sweep-top'))bar.insertAdjacentHTML('beforeend','<i class="v73-sweep v73-sweep-top" aria-hidden="true"></i><i class="v73-sweep v73-sweep-bottom" aria-hidden="true"></i>')}
function fleetCount(){
  // Fleet messages are represented by current tool/status records. Prefer the current fleet list when exposed;
  // fall back to the existing action count so the rail always has a concise total rather than verbose context.
  const candidates=[window.filteredFleetMessages,window.fleetMessages,window.fleetAlerts,window.currentFleetMessages];
  for(const c of candidates){if(Array.isArray(c))return c.length}
  const task=text($('#opsTaskCount')).match(/\d+/);return task?Number(task[0]):0;
}
let painting=false;
function paint(){
  if(painting)return;painting=true;
  try{
    const a=$('#topActionBar');
    if(a){
      const s=actionStatus();if(a.dataset.status!==s)a.dataset.status=s;
      const b=$('.v70-action-beacon',a);if(b){if(b.dataset.status!==s)b.dataset.status=s;const wanted=LABEL[s]||'NORMAL';if(!b.querySelector('.v72-beacon-title')||text(b.querySelector('.v72-beacon-status'))!==wanted)b.innerHTML=beacon('LEAD ALERTS',s,'v70-beacon-lamp')}
      ensureSweeps(a);
    }
    const f=$('#operationsBar');
    if(f){
      const s=fleetStatus();if(f.dataset.status!==s)f.dataset.status=s;
      const b=$('.v65-fleet-label',f);if(b){if(b.dataset.status!==s)b.dataset.status=s;const wanted=LABEL[s]||'NORMAL';if(!b.querySelector('.v72-beacon-title')||text(b.querySelector('.v72-beacon-status'))!==wanted)b.innerHTML=beacon('SYSTEM STATUS',s,'v70-fleet-lamp')}
      const sum=$('.v65-fleet-summary',f);if(sum){const n=fleetCount();const phrase=`${n} FLEET MESSAGE${n===1?'':'S'}`;if(text(sum)!==phrase)sum.innerHTML=`<span class="v73-fleet-count">${phrase}</span>`}
      ensureSweeps(f);
    }
  }finally{painting=false}
}
function toolbar(){const bar=$('#floatingActions');if(!bar)return;const buttons=$$(':scope > button',bar);const nav=buttons.filter(b=>b.classList.contains('v70-page-nav')||b.dataset.v57tab);const actions=buttons.filter(b=>!nav.includes(b));buttons.forEach(b=>{b.classList.toggle('v70-page-nav',nav.includes(b));b.classList.toggle('v70-page-action',actions.includes(b));b.classList.remove('v70-first-action');b.style.marginTop='';b.style.marginBottom=''});nav.forEach(b=>bar.appendChild(b));actions.forEach(b=>bar.appendChild(b));if(actions[0])actions[0].classList.add('v70-first-action')}
function version(){const v=$('#appVersionLabel');if(v)v.textContent='B7 FI COMMAND CENTER v1.0.3'}
function run(){paint();toolbar();version()}
// v1.0.1 performance: no continuous status observer/painter.
setTimeout(run,80);setTimeout(run,300);setTimeout(run,900);
})();


/* ===== SOURCE: js/patch-v0740.js ===== */
/* B7 FI Command Center v1.0.3 — stable top status stack hotfix
   IMPORTANT: no MutationObserver, no recurring re-parent loop, no polling timer.
   The header/status/footer shell is persistent in this SPA, so these changes are applied once.
*/
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);

function moveFleetTopOnce(){
  const stack=$('.header-status-stack');
  const action=$('#topActionBar');
  const fleet=$('#operationsBar');
  const toolbar=$('#floatingActions');
  if(!stack||!action||!fleet||!toolbar)return;
  if(fleet.parentElement!==stack || fleet.previousElementSibling!==action){
    stack.insertBefore(fleet,toolbar);
  }
}

function buildFooterOnce(){
  const f=$('footer.v57-footer');
  if(!f)return;
  if(f.dataset.v74Footer!=='1'){
    f.dataset.v74Footer='1';
    f.innerHTML=`
      <div class="v74-footer-admin"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div>
      <strong id="appVersionLabel" class="v74-footer-version">B7 FI COMMAND CENTER v1.0.3</strong>
      <div class="v74-footer-brand"><img src="assets/kla-plus-official.png" alt="KLA+"></div>
      <div class="v74-footer-system"><div class="v74-footer-live"><span class="v74-footer-dot" aria-hidden="true"></span><span>Local Production Mode</span></div><span class="v74-footer-sync">SharePoint live sync pending</span></div>
      <div class="v74-footer-location">Building 7 · Final Integration · Operations</div>`;
  }
  const a=$('#administrationCenterFooter');
  if(a && !a.dataset.v74Bound){
    a.dataset.v74Bound='1';
    a.addEventListener('click',()=>{
      const nav=document.querySelector('[data-view="admincenter"]');
      if(nav){nav.click();return;}
      if(typeof window.setView==='function')window.setView('admincenter');
    });
  }
  const v=$('#appVersionLabel');
  if(v)v.textContent='B7 FI COMMAND CENTER v1.0.1';
}

function centerFleetMessageOnce(){
  const ticker=$('.v65-fleet-ticker');
  const text=$('#opsTickerText');
  if(ticker){
    ticker.style.display='flex';
    ticker.style.alignItems='center';
    ticker.style.justifyContent='center';
    ticker.style.textAlign='center';
  }
  if(text){
    text.style.textAlign='center';
    text.style.margin='0';
    text.style.padding='0';
  }
}

function applyStableShell(){
  moveFleetTopOnce();
  buildFooterOnce();
  centerFleetMessageOnce();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',applyStableShell,{once:true});
}else{
  applyStableShell();
}
// Small bounded retries only for scripts that finish initial rendering after DOM ready.
setTimeout(applyStableShell,120);
setTimeout(applyStableShell,500);
})();


/* ===== SOURCE: js/patch-v0750.js ===== */
/* B7 FI Command Center v1.0.3 — stable shell polish
   No MutationObserver. No recurring timers. Only bounded startup passes.
*/
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);

function ensurePerimeter(bar){
  if(!bar || bar.querySelector('.v75-perimeter-tracer')) return;
  const tracer=document.createElement('i');
  tracer.className='v75-perimeter-tracer';
  tracer.setAttribute('aria-hidden','true');
  bar.appendChild(tracer);
}

function ensureStatusFrames(){
  ensurePerimeter($('#topActionBar'));
  ensurePerimeter($('#operationsBar'));
}

function ensureFooter(){
  const f=$('footer.v57-footer');
  if(!f)return;
  if(f.dataset.v75Footer!=='1'){
    f.dataset.v75Footer='1';
    f.innerHTML=`
      <div class="v74-footer-admin"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div>
      <strong id="appVersionLabel" class="v74-footer-version">B7 FI COMMAND CENTER v1.0.3</strong>
      <div class="v74-footer-brand"><img src="assets/kla-plus-official.png" alt="KLA+"></div>
      <div class="v74-footer-system"><div class="v74-footer-live"><span class="v74-footer-dot" aria-hidden="true"></span><span>Local Production Mode</span></div><span class="v74-footer-sync">SharePoint live sync pending</span></div>
      <div class="v74-footer-location">Building 7 · Final Integration · Operations</div>`;
  }
  const btn=$('#administrationCenterFooter');
  if(btn && !btn.dataset.v75Bound){
    btn.dataset.v75Bound='1';
    btn.addEventListener('click',()=>{
      const nav=document.querySelector('[data-view="admincenter"],[data-view="admin"]');
      if(nav){nav.click();return;}
      if(typeof window.setView==='function')window.setView('admincenter');
    });
  }
  const version=$('#appVersionLabel');
  if(version)version.textContent='B7 FI COMMAND CENTER v1.0.1';
}

function run(){ensureStatusFrames();ensureFooter();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});
else run();
setTimeout(run,120);
setTimeout(run,600);
})();


/* ===== SOURCE: js/patch-v0760.js ===== */
/* B7 FI Command Center v1.0.3 — stable shared shell/status/footer polish.
   No MutationObserver. No recurring interval. Pure CSS motion only.
*/
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);

function ensureTwinTracers(bar){
  if(!bar)return;
  bar.querySelectorAll('.v76-perimeter-tracer').forEach((n,i)=>{ if(i>1)n.remove(); });
  if(!bar.querySelector('.v76-tracer-a')){
    const a=document.createElement('i');a.className='v76-perimeter-tracer v76-tracer-a';a.setAttribute('aria-hidden','true');bar.appendChild(a);
  }
  if(!bar.querySelector('.v76-tracer-b')){
    const b=document.createElement('i');b.className='v76-perimeter-tracer v76-tracer-b';b.setAttribute('aria-hidden','true');bar.appendChild(b);
  }
}

function ensureFooter(){
  const f=$('footer.v57-footer');
  if(!f)return;
  // Rebuild only when the approved five-region footer is missing.
  if(!f.querySelector('.v74-footer-brand') || !f.querySelector('.v74-footer-system')){
    f.innerHTML=`
      <div class="v74-footer-admin"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div>
      <strong id="appVersionLabel" class="v74-footer-version">B7 FI COMMAND CENTER v1.0.3</strong>
      <div class="v74-footer-brand"><img src="assets/kla-plus-official.png" alt="KLA+"></div>
      <div class="v74-footer-system"><div class="v74-footer-live"><span class="v74-footer-dot" aria-hidden="true"></span><span>Local Production Mode</span></div><span class="v74-footer-sync">SharePoint live sync pending</span></div>
      <div class="v74-footer-location">Building 7 · Final Integration · Operations</div>`;
  }
  const version=$('#appVersionLabel');if(version)version.textContent='B7 FI COMMAND CENTER v1.0.3';
  const btn=$('#administrationCenterFooter');
  if(btn && !btn.dataset.v76Bound){
    btn.dataset.v76Bound='1';
    btn.addEventListener('click',()=>{
      const nav=document.querySelector('[data-view="admincenter"],[data-view="admin"]');
      if(nav){nav.click();return;}
      if(typeof window.setView==='function')window.setView('admincenter');
    });
  }
}

function normalizeStatusGeometry(){
  const fleet=$('#operationsBar');
  const stack=$('.header-status-stack');
  const action=$('#topActionBar');
  const toolbar=$('#floatingActions');
  if(stack&&action&&fleet&&toolbar&&fleet.parentElement!==stack)stack.insertBefore(fleet,toolbar);
  const ft=$('.v65-fleet-ticker');
  const txt=$('#opsTickerText');
  if(ft){ft.style.border='0';ft.style.boxShadow='none';}
  if(txt){txt.style.border='0';txt.style.boxShadow='none';txt.style.background='transparent';}
}

function run(){
  normalizeStatusGeometry();
  ensureTwinTracers($('#topActionBar'));
  ensureTwinTracers($('#operationsBar'));
  ensureFooter();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
// Bounded startup retries only; older startup patches finish shortly after DOM ready.
setTimeout(run,180);
setTimeout(run,760);
})();


/* ===== SOURCE: js/patch-v0770.js ===== */
/* B7 FI Command Center v1.0.3 — bounded shell/status finishing patch.
   No MutationObserver. No recurring interval.
*/
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);
function text(el){return (el?.textContent||'').trim()}
function fleetCount(){
  const candidates=[window.filteredFleetMessages,window.fleetMessages,window.fleetAlerts,window.currentFleetMessages];
  for(const c of candidates)if(Array.isArray(c)&&c.length)return c.length;
  const ticker=text($('#opsTickerText'));
  return ticker && !/loading fleet status/i.test(ticker) ? 1 : 0;
}
function finish(){
  const f=$('#operationsBar'), stack=$('.header-status-stack'), toolbar=$('#floatingActions');
  if(f&&stack&&toolbar&&f.parentElement!==stack)stack.insertBefore(f,toolbar);
  const sum=$('.v65-fleet-summary',f);
  if(sum)sum.setAttribute('data-v77-count',String(Math.max(1,fleetCount())));
  const version=$('#appVersionLabel');if(version)version.textContent='B7 FI COMMAND CENTER v1.0.3';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',finish,{once:true});else finish();
setTimeout(finish,220);
setTimeout(finish,850);
})();


/* ===== SOURCE: js/patch-v0780.js ===== */
/* B7 FI Command Center v1.0.3 — bounded shell/status/footer finishing patch.
   No MutationObserver. No recurring interval. Animation is CSS-only.
*/
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);

function text(el){return (el?.textContent||'').trim()}
function fleetCount(){
  const pools=[window.filteredFleetMessages,window.fleetMessages,window.fleetAlerts,window.currentFleetMessages];
  for(const p of pools) if(Array.isArray(p) && p.length) return p.length;
  const t=text($('#opsTickerText'));
  return t && !/loading fleet status/i.test(t) ? 1 : 0;
}
function ensureTracer(bar,cls){
  if(!bar || bar.querySelector('.'+cls)) return;
  const i=document.createElement('i');
  i.className='v78-perimeter-tracer '+cls;
  i.setAttribute('aria-hidden','true');
  bar.appendChild(i);
}
function ensureTracers(){
  for(const bar of [$('#topActionBar'),$('#operationsBar')]){
    if(!bar)continue;
    ensureTracer(bar,'v78-tracer-cw');
    ensureTracer(bar,'v78-tracer-ccw');
  }
}
function ensureFooter(){
  const f=$('footer.v57-footer');
  const app=$('main#app');
  if(!f||!app)return;
  // Footer is structurally after page content, not inside the header/status stack.
  if(f.previousElementSibling!==app) app.insertAdjacentElement('afterend',f);
  if(!f.querySelector('.v74-footer-brand') || !f.querySelector('.v74-footer-system')){
    f.innerHTML=`
      <div class="v74-footer-admin"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div>
      <strong id="appVersionLabel" class="v74-footer-version">B7 FI COMMAND CENTER v1.0.3</strong>
      <div class="v74-footer-brand"><img src="assets/kla-plus-official.png" alt="KLA+"></div>
      <div class="v74-footer-system"><div class="v74-footer-live"><span class="v74-footer-dot" aria-hidden="true"></span><span>Local Production Mode</span></div><span class="v74-footer-sync">SharePoint live sync pending</span></div>
      <div class="v74-footer-location">Building 7 · Final Integration · Operations</div>`;
  }
  const version=$('#appVersionLabel'); if(version) version.textContent='B7 FI COMMAND CENTER v1.0.3';
  const btn=$('#administrationCenterFooter');
  if(btn && !btn.dataset.v78Bound){
    btn.dataset.v78Bound='1';
    btn.addEventListener('click',()=>{
      const nav=document.querySelector('[data-view="admincenter"],[data-view="admin"]');
      if(nav){nav.click();return;}
      if(typeof window.setView==='function') window.setView('admincenter');
    });
  }
}
function normalizeStack(){
  const stack=$('.header-status-stack'),fleet=$('#operationsBar'),toolbar=$('#floatingActions');
  if(stack&&fleet&&toolbar&&fleet.parentElement!==stack) stack.insertBefore(fleet,toolbar);
  const sum=$('.v65-fleet-summary',fleet);
  if(sum) sum.setAttribute('data-v78-count',String(Math.max(1,fleetCount())));
}
function run(){normalizeStack();ensureTracers();ensureFooter()}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
// Bounded startup retries only for legacy startup renderers.
setTimeout(run,180);
setTimeout(run,760);
})();


/* ===== SOURCE: js/patch-v0790.js ===== */
/* B7 FI Command Center v1.0.3 — framework lock candidate.
   Bounded startup normalization only; no MutationObserver and no recurring timer.
*/
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);

function txt(el){return (el&&el.textContent||'').trim();}
function fleetCount(){
  const pools=[window.filteredFleetMessages,window.fleetMessages,window.fleetAlerts,window.currentFleetMessages];
  for(const p of pools){ if(Array.isArray(p) && p.length) return p.length; }
  const t=txt($('#opsTickerText'));
  return t && !/loading (fleet|system) status/i.test(t) ? 1 : 0;
}
function renameStatusLabels(){
  const a=$('#topActionBar .v70-action-beacon');
  if(a){
    const title=a.querySelector('.v72-beacon-title') || a.querySelector('b,strong');
    if(title) title.textContent='LEAD ALERTS';
  }
  const f=$('#operationsBar .v65-fleet-label');
  if(f){
    const title=f.querySelector('.v72-beacon-title') || f.querySelector('b,strong');
    if(title) title.textContent='SYSTEM STATUS';
  }
}
function normalizeFleetCounter(){
  const s=$('#operationsBar .v65-fleet-summary');
  if(s) s.setAttribute('data-v79-count',String(Math.max(1,fleetCount())));
}
function buildFooter(){
  const footer=$('footer.v57-footer');
  const app=$('main#app');
  if(!footer||!app)return;
  if(footer.previousElementSibling!==app) app.insertAdjacentElement('afterend',footer);
  footer.innerHTML=`
    <div class="v79-footer-left">
      <button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button>
    </div>
    <div class="v79-footer-center"><img src="assets/kla-plus-official.png" alt="KLA+"></div>
    <div class="v79-footer-right">
      <div class="v79-footer-mode"><span class="v79-footer-dot" aria-hidden="true"></span><span>Local Production Mode</span></div>
      <div id="appVersionLabel" class="v79-footer-version">B7 FI COMMAND CENTER v1.0.3</div>
    </div>`;
  const btn=$('#administrationCenterFooter');
  if(btn && !btn.dataset.v79Bound){
    btn.dataset.v79Bound='1';
    btn.addEventListener('click',()=>{
      const nav=document.querySelector('[data-view="admincenter"],[data-view="admin"]');
      if(nav){nav.click();return;}
      if(typeof window.setView==='function') window.setView('admincenter');
    });
  }
}
function ensureStack(){
  const stack=$('.header-status-stack'), fleet=$('#operationsBar'), toolbar=$('#floatingActions');
  if(stack&&fleet&&toolbar&&fleet.parentElement!==stack) stack.insertBefore(fleet,toolbar);
}
function run(){ensureStack();renameStatusLabels();normalizeFleetCounter();buildFooter();}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
// Legacy renderers complete asynchronously during startup; bounded retries only.
setTimeout(run,180);
setTimeout(run,760);
setTimeout(run,1600);
})();


/* ===== SOURCE: js/patch-v0800.js ===== */
/* B7 FI Command Center v1.0.3 — final framework polish. No observers or recurring timers. */
(function(){
'use strict'; window.VERSION=window.B7_APP_VERSION||'1.0.3'; const $=(s,r=document)=>r.querySelector(s);
function footer(){const f=$('footer.v57-footer'),app=$('main#app');if(!f||!app)return;if(f.previousElementSibling!==app)app.insertAdjacentElement('afterend',f);f.innerHTML=`<div class="v80-footer-left"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div><div class="v80-footer-center"><img src="assets/kla-plus-official.png" alt="KLA+"></div><div class="v80-footer-right"><div class="v80-footer-mode">Local Production Mode · SharePoint live sync pending</div><div id="appVersionLabel" class="v80-footer-version">B7 FI COMMAND CENTER V1.0.3</div></div>`;const b=$('#administrationCenterFooter');if(b&&!b.dataset.v80){b.dataset.v80='1';b.onclick=()=>{const n=document.querySelector('[data-view="admincenter"],[data-view="admin"]');if(n)n.click();else if(typeof window.setView==='function')window.setView('admincenter')}}}
function labels(){const a=$('#topActionBar .v72-beacon-title'),s=$('#operationsBar .v72-beacon-title');if(a)a.textContent='LEAD ALERTS';if(s)s.textContent='SYSTEM STATUS'}
function liveCard(){document.querySelectorAll('.v57-live-card').forEach(b=>{const title=b.querySelector('span');if(!title)return;if(/^WALLBOARD$/i.test(title.textContent.trim())){title.textContent='LIVE STATUS CENTER';const strong=b.querySelector('strong');const open=b.querySelector('b');if(strong)strong.textContent='Live B7 FI operational status display';if(open)open.textContent='OPEN LIVE STATUS CENTER →';}})}
function run(){footer();labels();liveCard()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
setTimeout(run,180);setTimeout(run,760);setTimeout(run,1600);
document.addEventListener('click',e=>{if(e.target.closest('.nav-btn'))setTimeout(liveCard,40)});
})();


/* ===== SOURCE: js/patch-v0801.js ===== */
/* B7 FI Command Center v1.0.3 — performance/stability hotfix + real Live Status Center. */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);
let liveTimer=null, liveIndex=0, livePaused=false;
function safe(v,f='—'){return v===undefined||v===null||String(v).trim()===''?f:String(v)}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function getTools(){try{return (typeof tools!=='undefined'&&Array.isArray(tools))?tools:[]}catch(e){return []}}
function activeTools(){return getTools().filter(t=>!/^archive$/i.test(String(t.quarterStatus||t.status||'')))}
function toolProgress(t){
 const candidates=[t.progress,t.fiProgress,t.testingProgress,t.percentComplete,t.completion];
 for(const v of candidates){const n=Number(v);if(Number.isFinite(n))return Math.max(0,Math.min(100,n<=1?n*100:n))}
 return 0;
}
function toolImage(t){
 const key=String(t.toolType||t.model||t.type||'').trim();
 const map=window.B7_PRODUCT_IMAGES||{};
 return map[key]||t.productImage||t.image||'assets/kla-plus-official.png';
}
function fields(t){
 return [
  ['UTID',t.utid||t.id],['Tool / Model',t.toolType||t.model||t.type],['Customer',t.customer],
  ['Sales Order',t.salesOrder||t.so],['Current Checklist',t.currentChecklist||t.checklist],['Ship Date',t.shipDate],
  ['Driver',t.driver||t.assignedDriver],['Cleanroom',t.cleanroom||t.location],['Phase',t.quarterStatus||t.status]
 ];
}
function footer(){
 const f=$('footer.v57-footer'),app=$('main#app');if(!f||!app)return;
 if(f.previousElementSibling!==app)app.insertAdjacentElement('afterend',f);
 f.innerHTML='<div class="v80-footer-left"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div><div class="v80-footer-center"><img src="assets/kla-plus-official.png" alt="KLA+"></div><div class="v80-footer-right"><div class="v80-footer-mode">Local Production Mode · SharePoint live sync pending</div><div id="appVersionLabel" class="v80-footer-version">B7 FI COMMAND CENTER V1.0.3</div></div>';
 const b=$('#administrationCenterFooter');if(b)b.onclick=()=>window.setView&&window.setView('admincenter');
}
function stopLiveTimer(){if(liveTimer){clearTimeout(liveTimer);liveTimer=null}}
function leaveLive(){stopLiveTimer();document.body.classList.remove('v801-live-status');livePaused=false}
function scheduleLive(){stopLiveTimer();if(livePaused||!document.body.classList.contains('v801-live-status'))return;liveTimer=setTimeout(()=>{const list=activeTools();if(list.length){liveIndex=(liveIndex+1)%list.length;drawLiveTool()}scheduleLive()},12000)}
function metricCounts(list){
 const c={shipped:0,infi:0,packing:0,waiting:0};
 list.forEach(t=>{const s=String(t.quarterStatus||t.status||'').toLowerCase();if(s.includes('shipped'))c.shipped++;else if(s.includes('packing'))c.packing++;else if(s.includes('in fi')||s==='fi')c.infi++;else if(s.includes('waiting'))c.waiting++});return c;
}
function drawLiveTool(){
 const host=$('#v801ToolHost');if(!host)return;const list=activeTools();
 const count=$('#v801Counter');if(count)count.textContent=list.length?`${liveIndex+1} OF ${list.length}`:'0 TOOLS';
 if(!list.length){host.innerHTML='<div class="v801-tool-body"><div class="v801-tool-kicker">SYSTEM STATUS</div><h2>No active tools</h2><div class="v801-tool-sub">Add or activate tools in Tool Center to populate the Live Status carousel.</div></div>';return}
 liveIndex=(liveIndex+list.length)%list.length;const t=list[liveIndex],p=toolProgress(t);const title=safe(t.utid||t.id,'SYSTEM');const subtitle=[t.toolType||t.model||t.type,t.customer].filter(Boolean).join(' · ');
 host.innerHTML=`<div class="v801-tool-slide"><div class="v801-tool-visual"><img src="${esc(toolImage(t))}" alt="${esc(safe(t.toolType||t.model||'KLA system'))}"></div><div class="v801-tool-body"><div class="v801-tool-kicker">ACTIVE B7 FI SYSTEM</div><h2>${esc(title)}</h2><div class="v801-tool-sub">${esc(subtitle||'B7 Final Integration')}</div><div class="v801-tool-grid">${fields(t).map(([k,v])=>`<div class="v801-tool-field"><span>${esc(k)}</span><b>${esc(safe(v))}</b></div>`).join('')}</div><div class="v801-progress"><div class="v801-progress-top"><span>FI TESTING PROGRESS</span><b>${Math.round(p)}%</b></div><div class="v801-progress-track"><div class="v801-progress-fill" style="width:${p}%"></div></div></div></div></div>`;
 const img=host.querySelector('img');if(img)img.onerror=()=>{img.onerror=null;img.src='assets/kla-plus-official.png'};
}
function renderLiveStatus(){
 leaveLive();document.body.classList.add('v801-live-status');window.scrollTo(0,0);const app=$('main#app');if(!app)return;
 const list=activeTools(),c=metricCounts(list);liveIndex=Math.min(liveIndex,Math.max(0,list.length-1));
 app.innerHTML=`<section class="v801-live"><div class="v801-live-top"><img class="v801-live-brand" src="assets/kla-plus-official.png" alt="KLA+"><button id="v801Exit" class="v801-live-exit">← COMMAND CENTER</button></div><div class="v801-live-title"><h1>B7 FINAL INTEGRATION — LIVE STATUS</h1><p>Read-only operational display</p></div><div class="v801-live-metrics"><div class="v801-live-metric"><span>Active Tools</span><b>${list.length}</b></div><div class="v801-live-metric"><span>In FI</span><b>${c.infi}</b></div><div class="v801-live-metric"><span>Packing</span><b>${c.packing}</b></div><div class="v801-live-metric"><span>Waiting</span><b>${c.waiting}</b></div><div class="v801-live-metric"><span>Shipped</span><b>${c.shipped}</b></div></div><div class="v801-carousel"><div class="v801-carousel-head"><strong>TOOLS CAROUSEL</strong><div class="v801-carousel-controls"><button id="v801Prev" title="Previous tool">◀</button><button id="v801Pause" title="Pause rotation">PAUSE</button><button id="v801Next" title="Next tool">▶</button></div></div><div id="v801ToolHost"></div><div class="v801-carousel-foot"><span><i class="v801-live-dot"></i>LIVE LOCAL DATA</span><b id="v801Counter"></b></div></div></section>`;
 $('#v801Exit').onclick=()=>{leaveLive();oldSetView('home')};
 $('#v801Prev').onclick=()=>{const n=activeTools().length;if(n){liveIndex=(liveIndex-1+n)%n;drawLiveTool()}scheduleLive()};
 $('#v801Next').onclick=()=>{const n=activeTools().length;if(n){liveIndex=(liveIndex+1)%n;drawLiveTool()}scheduleLive()};
 $('#v801Pause').onclick=e=>{livePaused=!livePaused;e.currentTarget.textContent=livePaused?'RESUME':'PAUSE';if(livePaused)stopLiveTimer();else scheduleLive()};
 drawLiveTool();scheduleLive();
}
const oldSetView=window.setView;
window.setView=function(v){if(v==='livestatus'||v==='live-status'){renderLiveStatus();return}leaveLive();const r=oldSetView?oldSetView(v):undefined;requestAnimationFrame(footer);return r};
/* Convert the Operations card into a real Live Status route, even when legacy renderers rebuild it. */
document.addEventListener('click',e=>{const card=e.target.closest('.v57-live-card');if(!card)return;const text=(card.textContent||'').toUpperCase();if(card.dataset.dest==='wallboard'&&text.includes('LIVE STATUS CENTER')){e.preventDefault();e.stopImmediatePropagation();window.setView('livestatus')}},true);
/* Pause costly decorative animation when the tab is not visible. */
document.addEventListener('visibilitychange',()=>document.body.classList.toggle('v801-tab-hidden',document.hidden));
function startup(){footer();document.title='B7 FI Command Center v1.0.3'}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
requestAnimationFrame(startup);
})();


/* ===== SOURCE: js/patch-v0803.js ===== */
/* B7 FI Command Center v1.0.3 — Live Status independent tool card + multi-progress display. */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);
let liveTimer=null, liveIndex=0, livePaused=false, modalWasPaused=false;
let statusHome=null;
const oldSetView=window.setView;
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function safe(v,f='—'){return v===undefined||v===null||String(v).trim()===''?f:String(v)}
function toolsList(){try{return (typeof tools!=='undefined'&&Array.isArray(tools))?tools:[]}catch(e){return []}}
function activeTools(){return toolsList().filter(t=>!/^archive$/i.test(String(t.quarterStatus||t.status||'')))}
function progress(t){
 try{if(typeof routeProgress==='function')return Math.max(0,Math.min(100,Number(routeProgress(t))||0))}catch(e){}
 const candidates=[t.progress,t.fiProgress,t.testingProgress,t.percentComplete,t.completion];
 for(const v of candidates){const n=Number(v);if(Number.isFinite(n))return Math.max(0,Math.min(100,n<=1?n*100:n))}return 0;
}
function liveProgressInfo(t){
 const clamp=n=>Math.max(0,Math.min(100,Number(n)||0));
 let fi=clamp(progress(t));
 let lead=0;
 try{if(typeof adminProgress==='function')lead=clamp(adminProgress(t))}catch(e){}
 let micro={pct:0,set:false,label:'TARGET NOT SET'};
 try{if(typeof microScheduleInfo==='function'){
   const m=microScheduleInfo(t)||{};
   micro={pct:clamp(m.plannedPct),set:!!m.set,label:safe(m.label,'TARGET NOT SET')};
 }}catch(e){}
 let packing=0,packingRelevant=false;
 const status=String(t.quarterStatus||t.status||'').toLowerCase();
 try{if(typeof packingProgress==='function')packing=clamp(packingProgress(t))}catch(e){}
 try{if(typeof packingActive==='function'&&packingActive(t))packingRelevant=true}catch(e){}
 if(status.includes('packing')||status.includes('shipped')||packing>0)packingRelevant=true;
 if(status.includes('shipped'))packing=100;
 return {fi,lead,micro,packing,packingRelevant};
}
function progressRow(label,value,tone='fi',detail='',stateText=''){
 const numeric=Number.isFinite(Number(value));
 const pct=numeric?Math.max(0,Math.min(100,Number(value))):0;
 const valueText=stateText|| (numeric?`${Math.round(pct)}%`:'NOT STARTED');
 return `<div class="v805-progress-row ${esc(tone)}"><div class="v805-progress-label"><span>${esc(label)}${detail?` <em>· ${esc(detail)}</em>`:''}</span><b>${esc(valueText)}</b></div><div class="v805-progress-track"><i style="width:${pct}%"></i></div></div>`;
}
function sourcePct805(status){const map={'Not Started':0,'Preparing':15,'Pre-Source In Progress':35,'Ready for CA':55,'With CA Team':72,'Source Complete':90,'Returned to FI':100};return map[status]??0}
function scheduleBadge805(t){
 const h=Array.isArray(t.changeHistory)?t.changeHistory:[];
 const x=h.find(r=>/ship|quarter/i.test(String(r.field||''))&&/pull|push/i.test(String(r.type||'')));
 if(!x)return '';
 const type=String(x.type||'').toUpperCase();
 const cls=type.includes('PULL')?'pull':'push';
 return `<span class="v807-schedule-badge ${cls}">${cls==='pull'?'↑':'↓'} ${esc(type)}</span>`;
}
function requirements805(t){
 const srcReq=safe(t.sourceRequired,'TBD'),strReq=safe(t.strRequired,'TBD');
 const srcYes=srcReq==='Yes',strYes=strReq==='Yes';
 const srcState=srcYes?safe(t.sourceStatus,'Not Started'):(srcReq==='No'?'NOT REQUIRED':'TBD');
 const strState=strYes?safe(t.strStatus,'Not Started'):(strReq==='No'?'NOT REQUIRED':'TBD');
 return `<div class="v807-requirements"><div class="v807-req-title">SPECIAL REQUIREMENTS</div><div class="v807-req-grid"><div class="v807-req source ${srcYes?'active':''}"><span>CUSTOMER SOURCE</span><b>${esc(srcState)}</b>${srcYes?`<div class="v807-req-track"><i style="width:${sourcePct805(t.sourceStatus)}%"></i></div>`:''}</div><div class="v807-req str ${strYes?'active':''}"><span>STR</span><b>${esc(strState)}</b>${strYes&&t.strDue?`<em>DUE ${esc(fmtDate(t.strDue))}</em>`:''}</div></div></div>`;
}
function imageFor(t){const key=String(t.toolType||t.model||t.type||'').trim(),map=window.B7_PRODUCT_IMAGES||{};return map[key]||t.productImage||t.image||'assets/kla-plus-official.png'}
function fmtDate(v){try{return typeof fmt==='function'?fmt(v):safe(v)}catch(e){return safe(v)}}
function metricCounts(list){const c={shipped:0,infi:0,packing:0,waiting:0};list.forEach(t=>{const s=String(t.quarterStatus||t.status||'').toLowerCase();if(s.includes('shipped'))c.shipped++;else if(s.includes('packing'))c.packing++;else if(s.includes('in fi')||s==='fi')c.infi++;else if(s.includes('waiting'))c.waiting++});return c}
function fields(t){return [['UTID',t.utid||t.id],['Tool / Model',t.toolType||t.model||t.type],['Customer',t.customer],['Sales Order',t.salesOrder||t.so],['Current Checklist',t.currentChecklist||t.checklist],['Ship Date',t.shipDate||t.ship],['Driver',t.driver||t.assignedDriver],['Cleanroom',t.cleanroom||t.room||t.location],['Phase',t.quarterStatus||t.status]]}
function stopTimer(){if(liveTimer){clearTimeout(liveTimer);liveTimer=null}}
function schedule(){stopTimer();if(livePaused||(!document.body.classList.contains('v802-live-status')&&!document.body.classList.contains('v825-operations-dashboard'))||$('#v802ToolModal'))return;liveTimer=setTimeout(()=>{const list=activeTools();if(list.length){liveIndex=(liveIndex+1)%list.length;drawTool()}schedule()},12000)}
function statusBarsToLive(){
 const mount=$('#v802StatusMount'),top=$('#topActionBar'),sys=$('#operationsBar'),home=$('.sticky-header .header-status-stack');
 if(!mount||!top||!sys)return;
 if(!statusHome&&home)statusHome=home;
 mount.append(top,sys);
 const leadTitle=top.querySelector('.v72-beacon-title')||top.querySelector('.v70-action-beacon b,.v70-action-beacon strong');
 const systemTitle=sys.querySelector('.v72-beacon-title')||sys.querySelector('.v65-fleet-label b,.v65-fleet-label strong');
 if(leadTitle)leadTitle.textContent='LEAD ALERTS';
 if(systemTitle)systemTitle.textContent='SYSTEM STATUS';
}
function statusBarsHome(){
 if(!statusHome)statusHome=$('.sticky-header .header-status-stack');
 const top=$('#topActionBar'),sys=$('#operationsBar'),toolbar=$('#floatingActions');
 if(statusHome&&top&&sys){statusHome.insertBefore(top,toolbar||null);statusHome.insertBefore(sys,toolbar||null)}
}
function closeModal(){const m=$('#v802ToolModal');if(!m)return;m.remove();livePaused=modalWasPaused;const p=$('#v802Pause');if(p)p.textContent=livePaused?'RESUME':'PAUSE';if(!livePaused)schedule()}
function readOnlyWorkflow(t){
 let route='',lead='';
 try{if(typeof routeWorkflow==='function')route=routeWorkflow(t,false)}catch(e){}
 try{if(typeof leadWorkflow==='function')lead=leadWorkflow(t,false)}catch(e){}
 return {route,lead};
}
function openToolModal(t){
 if(!t)return;modalWasPaused=livePaused;livePaused=true;stopTimer();
 const old=$('#v802ToolModal');if(old)old.remove();
 const p=progress(t),wf=readOnlyWorkflow(t);
 let rc={done:'—',total:'—'},lc={done:'—',total:'—'};
 try{if(typeof routeCounts==='function')rc=routeCounts(t)}catch(e){}
 try{if(typeof leadCounts==='function')lc=leadCounts(t)}catch(e){}
 const ncs=Array.isArray(t.ncs)?t.ncs:[];
 const modal=document.createElement('div');modal.id='v802ToolModal';modal.className='v802-tool-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label',`Tool ${safe(t.id||t.utid)} detail`);
 modal.innerHTML=`<div class="v802-tool-modal-card"><button type="button" class="v802-modal-close" aria-label="Close tool detail">×</button><div class="v802-modal-scroll"><div class="report-screen v802-readonly-detail"><div class="v802-detail-head"><div><span>TOOL DETAIL · READ ONLY</span><h2>${esc(safe(t.id||t.utid,'SYSTEM'))} · ${esc(safe(t.model||t.toolType))}</h2><p>${esc([t.codename,t.customer,t.room||t.cleanroom].filter(Boolean).join(' · ')||'B7 Final Integration')}</p></div><div class="v802-readonly-badge">DISPLAY ONLY</div></div><div class="metric-grid"><div class="metric"><span>MFG Ship Date</span><strong>${esc(fmtDate(t.ship||t.shipDate))}</strong></div><div class="metric"><span>Current Checklist</span><strong>${esc(safe(t.checklist||t.currentChecklist))}</strong></div><div class="metric"><span>Tool Progress</span><strong>${Math.round(p)}%</strong><small>${esc(String(rc.done))}/${esc(String(rc.total))} complete</small></div><div class="metric"><span>Lead / Admin</span><strong>${esc(String(lc.done))}/${esc(String(lc.total))}</strong><small>complete / applicable</small></div><div class="metric"><span>Tool Status</span><strong>${esc(safe(t.quarterStatus||t.status))}</strong></div></div><div class="tool-status-grid"><div class="tool-status-block"><h3>Tool Information</h3>${[['Product Family',t.family],['Code Name',t.codename],['Model',t.model||t.toolType],['UTID',t.id||t.utid],['Sales Order',t.so||t.salesOrder],['Customer',t.customer],['Cleanroom',t.room||t.cleanroom],['Bay',t.bay],['Assignment',t.driver||t.assignedDriver],['SW Version',t.sw],['FI Process',t.process],['Lamp Hours',t.lamp]].map(([k,v])=>`<div class="kv"><span>${esc(k)}</span><strong>${esc(safe(v))}</strong></div>`).join('')}</div><div class="tool-status-block"><h3>FI Status / Issues</h3>${[['Current Checklist',t.checklist||t.currentChecklist],['Latest Status',t.activity],['POA',t.poa],['Escalation Meeting',t.escalationMeeting],['Waivers',t.waivers],['Open NCs',ncs.map(n=>`${safe(n.id,'')} ${safe(n.state,'')}`.trim()).filter(Boolean).join(', ')||'None']].map(([k,v])=>`<div class="kv"><span>${esc(k)}</span><strong>${esc(safe(v))}</strong></div>`).join('')}</div><div class="tool-status-block"><h3>Shipping Schedule</h3>${[['Schedule',t.schedule?`${safe(t.schedule.publish,'')} / ${safe(t.schedule.status,'')}`:'—'],['Subsystems',t.schedule&&fmtDate(t.schedule.subsystems)],['Cable Kit',t.schedule&&fmtDate(t.schedule.cables)],['Accessories',t.schedule&&fmtDate(t.schedule.accessories)],['MST',t.schedule&&fmtDate(t.schedule.mst)],['IS',t.schedule&&fmtDate(t.schedule.is)],['Notes',t.schedule&&t.schedule.notes]].map(([k,v])=>`<div class="kv"><span>${esc(k)}</span><strong>${esc(safe(v))}</strong></div>`).join('')}</div></div>${wf.route||wf.lead?`<div class="progress-board">${wf.route?`<div class="progress-panel"><h3>FI Checklist Route</h3>${wf.route}</div>`:''}${wf.lead?`<div class="progress-panel"><h3>Lead / Admin Workflow</h3>${wf.lead}</div>`:''}</div>`:''}</div></div></div>`;
 document.body.appendChild(modal);
 modal.querySelector('.v802-modal-close').onclick=closeModal;
 modal.addEventListener('mousedown',e=>{if(e.target===modal)closeModal()});
 modal.querySelector('.v802-modal-close').focus();
}
function drawTool(){
 const host=$('#v802ToolHost'),list=activeTools(),counter=$('#v802Counter');if(!host)return;
 if(counter)counter.textContent=list.length?`${liveIndex+1} OF ${list.length}`:'0 TOOLS';
 if(!list.length){host.innerHTML='<div class="v802-empty">No active tools. Add or activate tools in Tool Center to populate Live Status.</div>';return}
 liveIndex=(liveIndex+list.length)%list.length;
 const t=list[liveIndex],title=safe(t.utid||t.id,'SYSTEM'),subtitle=[t.toolType||t.model||t.type,t.customer].filter(Boolean).join(' · '),pi=liveProgressInfo(t);
 const progressHtml=[
   progressRow('FI TESTING',pi.fi,'fi'),
   progressRow('LEAD / ADMIN',pi.lead,'lead'),
   progressRow('MICRO SCHEDULE',pi.micro.set?pi.micro.pct:NaN,'micro',pi.micro.set?pi.micro.label:'TARGET NOT SET',pi.micro.set?'':'TARGET NOT SET'),
   progressRow('PACKING / SHIPPING',pi.packing,'packing','',pi.packingRelevant?(String(t.quarterStatus||t.status||'').toLowerCase().includes('shipped')?'SHIPPED · 100%':`${Math.round(pi.packing)}%`):'NOT STARTED')
 ].join('');
 host.innerHTML=`<button type="button" class="v802-tool-slide" aria-label="Open read-only detail for tool ${esc(title)}"><div class="v802-tool-visual"><img src="${esc(imageFor(t))}" alt="${esc(safe(t.toolType||t.model||'KLA system'))}"></div><div class="v802-tool-body"><div class="v805-tool-top"><div class="v805-tool-identity"><div class="v802-tool-kicker">ACTIVE B7 FI SYSTEM</div><h2>${esc(title)}</h2><div class="v802-tool-sub">${esc(subtitle||'B7 Final Integration')}</div>${scheduleBadge805(t)}</div><div class="v805-progress-stack">${progressHtml}</div></div>${requirements805(t)}<div class="v802-tool-grid">${fields(t).map(([k,v])=>`<div class="v802-tool-field"><span>${esc(k)}</span><b>${esc(k==='Ship Date'?fmtDate(v):safe(v))}</b></div>`).join('')}</div><div class="v802-open-hint">CLICK SYSTEM FOR READ-ONLY TOOL DETAIL</div></div></button>`;
 const img=host.querySelector('img');if(img)img.onerror=()=>{img.onerror=null;img.src='assets/kla-plus-official.png'};
 host.querySelector('.v802-tool-slide').onclick=()=>openToolModal(t);
 try{document.dispatchEvent(new CustomEvent('b7fi:live-tool-change',{detail:{tool:t,index:liveIndex,total:list.length}}))}catch(e){}
}
function renderLive(){
 document.body.classList.remove('v801-live-status');document.body.classList.add('v802-live-status');stopTimer();window.scrollTo(0,0);
 const app=$('main#app');if(!app)return;const list=activeTools(),c=metricCounts(list);liveIndex=Math.min(liveIndex,Math.max(0,list.length-1));
 app.innerHTML=`<section class="v802-live"><div class="v803-live-shell"><div class="v802-live-top"><img class="v802-live-brand" src="assets/kla-plus-official.png" alt="KLA+"><button id="v802Exit" class="v802-live-exit">← RETURN TO B7 FI COMMAND CENTER</button></div><div id="v802StatusMount" class="header-status-stack v802-live-status-stack"></div><div class="v802-live-metrics"><div class="v802-live-metric"><span>Active Tools</span><b>${list.length}</b></div><div class="v802-live-metric"><span>In FI</span><b>${c.infi}</b></div><div class="v802-live-metric"><span>Packing</span><b>${c.packing}</b></div><div class="v802-live-metric"><span>Waiting</span><b>${c.waiting}</b></div><div class="v802-live-metric"><span>Shipped</span><b>${c.shipped}</b></div></div><div class="v802-carousel"><div id="v802ToolHost"></div><div class="v802-carousel-foot"><span><i class="v802-live-dot"></i>LIVE LOCAL DATA</span><div class="v802-carousel-controls"><button id="v802Prev" title="Previous tool" aria-label="Previous tool">◀</button><button id="v802Pause" title="Pause rotation">PAUSE</button><button id="v802Next" title="Next tool" aria-label="Next tool">▶</button></div><b id="v802Counter"></b></div></div></div></section>`;
 statusBarsToLive();
 $('#v802Exit').onclick=()=>window.setView('home');
 $('#v802Prev').onclick=()=>{const n=activeTools().length;if(n){liveIndex=(liveIndex-1+n)%n;drawTool()}schedule()};
 $('#v802Next').onclick=()=>{const n=activeTools().length;if(n){liveIndex=(liveIndex+1)%n;drawTool()}schedule()};
 $('#v802Pause').onclick=e=>{livePaused=!livePaused;e.currentTarget.textContent=livePaused?'RESUME':'PAUSE';if(livePaused)stopTimer();else schedule()};
 drawTool();schedule();
}
function leaveLive(){if(!document.body.classList.contains('v802-live-status'))return;stopTimer();closeModal();statusBarsHome();document.body.classList.remove('v802-live-status');livePaused=false}
window.setView=function(v){
 if(v==='livestatus'||v==='live-status'){renderLive();return}
 leaveLive();const r=oldSetView?oldSetView(v):undefined;requestAnimationFrame(()=>{const label=$('#appVersionLabel');if(label)label.textContent='B7 FI COMMAND CENTER V1.0.3'});return r;
};
/* Ensure the Operations Live Status card routes to the dedicated display even if a legacy handler is still attached. */
document.addEventListener('click',e=>{const card=e.target.closest('.v57-live-card');if(!card)return;const text=(card.textContent||'').toUpperCase();if(text.includes('LIVE STATUS CENTER')){e.preventDefault();e.stopImmediatePropagation();window.setView('livestatus')}},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#v802ToolModal'))closeModal()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopTimer();else if(document.body.classList.contains('v802-live-status')&&!livePaused)schedule()});
window.B7LiveStatusCore={
 activeTools,metricCounts,drawTool,schedule,stopTimer,openToolModal,renderLive,
 currentTool:()=>{const list=activeTools();return list.length?list[(liveIndex+list.length)%list.length]:null},
 currentIndex:()=>liveIndex,
 previous:()=>{const n=activeTools().length;if(n){liveIndex=(liveIndex-1+n)%n;drawTool()}schedule()},
 next:()=>{const n=activeTools().length;if(n){liveIndex=(liveIndex+1)%n;drawTool()}schedule()},
 togglePause:()=>{livePaused=!livePaused;if(livePaused)stopTimer();else schedule();return livePaused},
 setPaused:v=>{livePaused=!!v;if(livePaused)stopTimer();else schedule();return livePaused},
 isPaused:()=>livePaused
};
function startup(){const label=$('#appVersionLabel');if(label)label.textContent='B7 FI COMMAND CENTER V1.0.3';document.title='B7 FI Command Center v1.0.3'}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0804.js ===== */
/* B7 FI Command Center v1.0.3 — active-quarter identity + Live Status spacing polish. */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);
const QUARTER_CENTERS={toolcenter:'TOOL CENTER',shipping:'SHIPPING CENTER',priorities:'PRIORITY CENTER',statuscenter:'STATUS CENTER'};
function currentQuarter(){
  /* One shared quarter identity. Prefer an explicit app setting when one is added,
     otherwise infer the dominant/current tool quarter and finally fall back to CY26Q3. */
  if(window.B7_ACTIVE_QUARTER)return String(window.B7_ACTIVE_QUARTER);
  try{
    if(window.state&&state.config&&state.config.activeQuarter)return String(state.config.activeQuarter);
  }catch(e){}
  try{
    const list=(typeof tools!=='undefined'&&Array.isArray(tools))?tools:[];
    const counts={};
    list.forEach(t=>{const q=String(t.quarter||'').trim();if(/^CY\d{2}Q[1-4]$/i.test(q)&&!/^archive$/i.test(String(t.quarterStatus||t.status||'')))counts[q]=(counts[q]||0)+1});
    const best=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];if(best)return best[0];
  }catch(e){}
  return 'CY26Q3';
}
window.getB7ActiveQuarter=currentQuarter;
function viewName(){
 const b=document.body;
 const raw=(b.dataset.center||b.dataset.theme||'').toLowerCase();
 const map={tool:'toolcenter',shipping:'shipping',priority:'priorities',priorities:'priorities',status:'statuscenter'};
 return map[raw]||raw;
}
function decorateQuarterTitle(v){
 const title=$('#headerPageTitle');if(!title)return;
 const key=QUARTER_CENTERS[v]?v:viewName();
 if(QUARTER_CENTERS[key])title.textContent=`${QUARTER_CENTERS[key]} — ${currentQuarter()}`;
}
function version(){const l=$('#appVersionLabel');if(l)l.textContent='B7 FI COMMAND CENTER V1.0.3';document.title='B7 FI Command Center v1.0.3'}
/* Wrap the newest setView last so quarter-aware titles survive older theme renderers. */
const previousSetView=window.setView;
window.setView=function(v){
 const r=previousSetView?previousSetView(v):undefined;
 if(v!=='livestatus'&&v!=='live-status')requestAnimationFrame(()=>{decorateQuarterTitle(v);version()});
 return r;
};
/* Live Status is rendered by v1.0.1. Inject the quarter into its top rail after render. */
document.addEventListener('click',()=>{requestAnimationFrame(()=>{
 if(!document.body.classList.contains('v802-live-status'))return;
 const top=$('.v803-live-shell .v802-live-top');if(!top)return;
 let q=$('#v804LiveQuarter');if(!q){q=document.createElement('div');q.id='v804LiveQuarter';q.className='v804-live-quarter';top.prepend(q)}q.textContent=currentQuarter();
})},true);
/* Also cover programmatic Live Status entry. */
const liveObserver=new MutationObserver(()=>{
 if(!document.body.classList.contains('v802-live-status'))return;
 const top=$('.v803-live-shell .v802-live-top');if(!top)return;
 let q=$('#v804LiveQuarter');if(!q){q=document.createElement('div');q.id='v804LiveQuarter';q.className='v804-live-quarter';top.prepend(q)}q.textContent=currentQuarter();
 liveObserver.disconnect();
});
function armLiveObserver(){try{liveObserver.observe(document.body,{childList:true,subtree:true})}catch(e){}}
const wrapped=window.setView;
window.setView=function(v){if(v==='livestatus'||v==='live-status')armLiveObserver();return wrapped(v)};
function startup(){version();decorateQuarterTitle(viewName())}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0806.js ===== */
/* B7 FI Command Center v1.0.3 — Live Status lock + persistent footer/version guard.
   Bounded updates only: no MutationObserver and no recurring interval. */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s);
function syncVersion(){
  const el=$('#appVersionLabel');
  if(el)el.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
  document.title=`B7 FI Command Center v${VERSION}`;
}
function rebuildFooter(){
  if(document.body.classList.contains('v802-live-status'))return;
  const footer=$('footer.v57-footer'),app=$('main#app');
  if(!footer||!app)return;
  if(footer.previousElementSibling!==app)app.insertAdjacentElement('afterend',footer);
  footer.innerHTML=`<div class="v80-footer-left"><button id="administrationCenterFooter" class="v57-admin-footer-btn">ADMINISTRATION CENTER</button></div><div class="v80-footer-center"><img src="assets/kla-plus-official.png" alt="KLA+"></div><div class="v80-footer-right"><div class="v80-footer-mode">Local Production Mode · SharePoint live sync pending</div><div id="appVersionLabel" class="v80-footer-version">B7 FI COMMAND CENTER V${VERSION}</div></div>`;
  const b=$('#administrationCenterFooter');
  if(b)b.onclick=()=>{const n=document.querySelector('[data-view="admincenter"],[data-view="admin"]');if(n)n.click();else if(typeof window.setView==='function')window.setView('admincenter')};
}
function normalizeLive(){
  if(!document.body.classList.contains('v802-live-status'))return;
  const mount=$('#v802StatusMount');
  if(mount){mount.style.removeProperty('height');mount.style.removeProperty('min-height');}
  const lead=$('#topActionBar .v72-beacon-title')||$('#topActionBar .v70-action-beacon b')||$('#topActionBar .v70-action-beacon strong');
  const sys=$('#operationsBar .v72-beacon-title')||$('#operationsBar .v65-fleet-label b')||$('#operationsBar .v65-fleet-label strong');
  if(lead)lead.textContent='LEAD ALERTS';
  if(sys)sys.textContent='SYSTEM STATUS';
}
function settle(){syncVersion();rebuildFooter();normalizeLive()}
const previousSetView=window.setView;
window.setView=function(v){
  const r=previousSetView?previousSetView(v):undefined;
  [0,60,220,700].forEach(ms=>setTimeout(settle,ms));
  return r;
};
/* Navigation clicks can trigger legacy renderers outside setView; bounded correction only. */
document.addEventListener('click',e=>{
  if(e.target.closest('.nav-btn,.v57-live-card,#v802Exit'))[0,80,300].forEach(ms=>setTimeout(settle,ms));
},true);
function startup(){settle();setTimeout(settle,180);setTimeout(settle,760)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0808.js ===== */
/* B7 FI Command Center v1.0.3 — standalone Live Status viewer boot.
   Viewer-only entry uses the exact same Live Status renderer as the Command Center,
   but boots it ONCE and removes only the Return control. No delayed rerender/re-parent pass. */
(function(){
'use strict';
const viewerOnly=document.body && document.body.dataset.liveViewerOnly==='true';
if(!viewerOnly)return;

function viewerBoot(){
  document.body.classList.add('v808-viewer-only');
  document.title='B7 FI Live Status';
  /* Call the FINAL setView wrapper after every script has loaded. This renders the
     shared Lead Alerts + System Status stack once and prevents a second render from
     deleting the already re-parented status bars. */
  if(typeof window.setView==='function' && !document.body.classList.contains('v802-live-status')){
    window.setView('livestatus');
  }
  requestAnimationFrame(()=>{
    const exit=document.getElementById('v802Exit');
    if(exit)exit.remove();
  });
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',viewerBoot,{once:true});
else queueMicrotask(viewerBoot);
})();


/* ===== SOURCE: js/patch-v0809.js ===== */
/* B7 FI Command Center v1.0.3 — shared status naming + Live viewer parity + automatic active-quarter titles.
   Bounded reconciliation only: no MutationObserver, no setInterval, no recurring polling. */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const QUARTER_TITLES={
  toolcenter:'TOOL CENTER',
  shipping:'SHIPPING CENTER',
  priorities:'PRIORITY CENTER',
  statuscenter:'STATUS CENTER'
};

function autoQuarter(){
  /* Calendar-year quarters are the normal automatic source.  A future Administration
     manual override can set B7_ACTIVE_QUARTER or state.config.activeQuarterOverride. */
  try{
    const explicit=String(window.B7_ACTIVE_QUARTER||'').trim().toUpperCase();
    if(/^CY\d{2}Q[1-4]$/.test(explicit))return explicit;
  }catch(e){}
  try{
    const override=String(window.state?.config?.activeQuarterOverride||'').trim().toUpperCase();
    if(/^CY\d{2}Q[1-4]$/.test(override))return override;
  }catch(e){}
  const d=new Date();
  const yy=String(d.getFullYear()).slice(-2);
  const q=Math.floor(d.getMonth()/3)+1;
  return `CY${yy}Q${q}`;
}
window.getB7ActiveQuarter=autoQuarter;

function syncVersion(){
  const label=$('#appVersionLabel');
  if(label)label.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
  if(!document.body.dataset.liveViewerOnly)document.title=`B7 FI Command Center v${VERSION}`;
}

function replaceExactText(root,from,to){
  if(!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let n;
  while((n=walker.nextNode())){
    if(String(n.nodeValue||'').trim().toUpperCase()===from)n.nodeValue=n.nodeValue.replace(/\S(?:.*\S)?/,to);
  }
}
function normalizeStatusNames(){
  const lead=$('#topActionBar'),system=$('#operationsBar');
  if(lead){
    const preferred=lead.querySelector('.v72-beacon-title,.v70-action-beacon b,.v70-action-beacon strong,.v66-action-status-label strong,.v69-action-status-label strong');
    if(preferred)preferred.textContent='LEAD ALERTS';
    replaceExactText(lead,'ACTION STATUS','LEAD ALERTS');
  }
  if(system){
    const preferred=system.querySelector('.v72-beacon-title,.v65-fleet-label b,.v65-fleet-label strong,.ops-ticker-label');
    if(preferred)preferred.textContent='SYSTEM STATUS';
    replaceExactText(system,'FLEET STATUS','SYSTEM STATUS');
  }
}

function ensureLiveStatusPair(){
  if(!document.body.classList.contains('v802-live-status'))return;
  const mount=$('#v802StatusMount'),lead=$('#topActionBar'),system=$('#operationsBar');
  if(!mount)return;
  /* Live Status and viewer-only Live Status must have the same two shared bars,
     in the same order. Re-parent only when needed. */
  if(lead&&lead.parentElement!==mount)mount.appendChild(lead);
  if(system&&system.parentElement!==mount)mount.appendChild(system);
  if(lead&&system&&lead.nextElementSibling!==system)mount.insertBefore(lead,system);
  normalizeStatusNames();
  const q=$('#v804LiveQuarter');if(q)q.textContent=autoQuarter();
}

function applyQuarterTitle(view){
  if(document.body.classList.contains('v802-live-status')){
    const q=$('#v804LiveQuarter');if(q)q.textContent=autoQuarter();
    return;
  }
  const title=$('#headerPageTitle');if(!title)return;
  let key=String(view||'').toLowerCase();
  const aliases={tool:'toolcenter',priority:'priorities',status:'statuscenter'};
  key=aliases[key]||key;
  if(!QUARTER_TITLES[key]){
    /* Infer the current Center from the active nav when legacy renderers omit view. */
    const active=$('.main-nav .nav-btn.active');
    const inferred=String(active?.dataset?.view||'').toLowerCase();
    key=aliases[inferred]||inferred;
  }
  if(QUARTER_TITLES[key])title.textContent=`${QUARTER_TITLES[key]} — ${autoQuarter()}`;
}

function reconcile(view){
  syncVersion();
  normalizeStatusNames();
  ensureLiveStatusPair();
  applyQuarterTitle(view);
}
function boundedReconcile(view){
  requestAnimationFrame(()=>reconcile(view));
  [90,320,900].forEach(ms=>setTimeout(()=>reconcile(view),ms));
}

const previousSetView=window.setView;
window.setView=function(v){
  const result=previousSetView?previousSetView(v):undefined;
  boundedReconcile(v);
  return result;
};

/* Older ticker renderers can rebuild the label during a user navigation or ticker click.
   Correct only after those explicit interactions; no continuous observer/polling. */
document.addEventListener('click',e=>{
  if(e.target.closest('.nav-btn,.v57-live-card,#v802Exit,#topActionBar,#operationsBar'))boundedReconcile(e.target.closest('.nav-btn')?.dataset?.view||'');
},true);

function startup(){boundedReconcile('')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0815.js ===== */
/* B7 FI Command Center v1.0.3 — Action Center save/edit controls for status-bar testing. */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=(v)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
function toast(msg){
  let t=$('#v815Toast'); if(!t){t=document.createElement('div');t.id='v815Toast';t.className='v815-toast';document.body.appendChild(t)}
  t.textContent=msg;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),1800);
}
function saveCard(card){
  if(!card||!card.dataset.auto51)return false;
  const k=card.dataset.auto51;
  state.actionDisplay=state.actionDisplay||{};
  const d=state.actionDisplay[k]||(state.actionDisplay[k]={});
  d.assignee=card.querySelector('.ac-owner51')?.value.trim()||'';
  d.show=(card.querySelector('.ac-show51')?.value||'on')==='on';
  d.seconds=Number(card.querySelector('.ac-sec51')?.value)||8;
  d.order=Number(card.querySelector('.ac-order51')?.value)||999;
  d.pin=!!card.querySelector('.ac-pin51')?.checked;
  d.ack=!!card.querySelector('.ac-ack51')?.checked;
  const mode=card.querySelector('.ac-until-mode51')?.value||'while-open';
  const custom=card.querySelector('.ac-until51')?.value||'';
  d.displayUntil=mode==='while-open'?'while-open':mode==='today'?today():(custom||'while-open');
  state.actionDisplay[k]=d;
  card.classList.toggle('v815-disabled',!d.show);
  return true;
}
function saveAllCards(){
  let n=0;$$('.auto-action51[data-auto51]').forEach(c=>{if(saveCard(c))n++});
  if(typeof save==='function')save();
  toast(`${n} action${n===1?'':'s'} saved · Lead Alerts updated`);
  /* A short Action-Center re-render is enough; the existing ticker reads actionDisplay on its next rotation. */
  setTimeout(()=>{if(document.body.dataset.center==='action'&&window.B7Renderers58?.actionCenter){window.B7Renderers58.actionCenter();setTimeout(enhance,0)}},80);
}
function addTaskModal(){
  $('#v61TaskModal')?.remove();
  const toolOptions=(typeof tools!=='undefined'?tools:[]).map(t=>`<option value="${esc(t.id)}">${esc(t.id)} · ${esc(t.model||t.codename||'')}</option>`).join('');
  document.body.insertAdjacentHTML('beforeend',`<div id="v61TaskModal" class="v61-modal v815-modal"><div class="v61-modal-card v815-modal-card">
    <div class="v815-modal-head"><div><h3>ADD TASK</h3><p>Create the action and configure exactly how it appears in Lead Alerts.</p></div><button type="button" class="v815-x" id="v815TaskX" aria-label="Close">×</button></div>
    <div class="v815-form-grid">
      <label>Tool<select id="v815Tool"><option value="">General / No Tool</option>${toolOptions}</select></label>
      <label>Category<select id="v815Sev"><option value="yellow">Reminder</option><option value="orange">Attention</option><option value="red">Critical</option><option value="blue">Information</option></select></label>
      <label class="v815-span2">Task / Message<input id="v815Text" placeholder="Task / follow-up / information"></label>
      <label>Assigned Lead<input id="v815Owner" placeholder="Optional"></label>
      <label>Show on Lead Alerts<select id="v815Show"><option value="on">ON</option><option value="off">OFF</option></select></label>
      <label>Display Time<select id="v815Seconds">${[5,8,10,15,20,30,60].map(x=>`<option value="${x}" ${x===10?'selected':''}>${x} sec</option>`).join('')}</select></label>
      <label>Display Order<input id="v815Order" type="number" min="1" value="999"></label>
      <label>Show Until<select id="v815UntilMode"><option value="while-open">While Open</option><option value="today">Today</option><option value="custom">Custom Date</option></select></label>
      <label>Custom End<input id="v815Until" type="date"></label>
      <label class="v815-check"><input id="v815Pin" type="checkbox"> Pin for extra visibility</label>
      <label class="v815-check"><input id="v815Ack" type="checkbox"> Acknowledged / Working</label>
    </div>
    <div class="actions v815-modal-actions"><button class="btn" id="v815Cancel">CANCEL</button><button class="btn primary" id="v815Add">ADD & SAVE TASK</button></div>
  </div></div>`);
  const close=()=>$('#v61TaskModal')?.remove();
  $('#v815TaskX').onclick=close;$('#v815Cancel').onclick=close;
  $('#v61TaskModal').addEventListener('click',e=>{if(e.target.id==='v61TaskModal')close()});
  $('#v815Add').onclick=()=>{
    const text=$('#v815Text').value.trim();if(!text){$('#v815Text').focus();return}
    state.manualReminders=Array.isArray(state.manualReminders)?state.manualReminders:[];
    state.actionDisplay=state.actionDisplay||{};state.actionFirstSeen=state.actionFirstSeen||{};
    const id='mr'+Date.now();
    const item={id,toolId:$('#v815Tool').value,severity:$('#v815Sev').value,text,manual:true,complete:false,createdAt:new Date().toISOString()};
    state.manualReminders.unshift(item);
    const mode=$('#v815UntilMode').value, custom=$('#v815Until').value;
    state.actionDisplay['manual:'+id]={
      show:$('#v815Show').value==='on',seconds:Number($('#v815Seconds').value)||10,order:Number($('#v815Order').value)||999,
      assignee:$('#v815Owner').value.trim(),pin:$('#v815Pin').checked,ack:$('#v815Ack').checked,
      displayUntil:mode==='while-open'?'while-open':mode==='today'?today():(custom||'while-open')
    };
    state.actionFirstSeen['manual:'+id]=item.createdAt;
    if(typeof save==='function')save();close();
    if(typeof setView==='function')setView('actions');
    toast('Task added and saved');
  };
}
function enhance(){
  if(document.body.dataset.center!=='action')return;
  $('#appVersionLabel') && ($('#appVersionLabel').textContent=`B7 FI COMMAND CENTER V${VERSION}`);
  $$('.auto-controls51').forEach(ctrl=>{
    const card=ctrl.closest('.auto-action51');
    const showLabel=ctrl.querySelector('.ac-show51')?.closest('label');if(showLabel&&showLabel.firstChild)showLabel.firstChild.textContent='Lead Alerts';
    const btn=ctrl.querySelector('.ac-save51');if(btn){btn.textContent='SAVE CHANGES';btn.classList.add('v815-save');btn.onclick=(e)=>{e.preventDefault();saveCard(card);if(typeof save==='function')save();toast('Action changes saved');setTimeout(()=>{if(window.B7Renderers58?.actionCenter){window.B7Renderers58.actionCenter();setTimeout(enhance,0)}},60)}}
    const d=state.actionDisplay?.[card?.dataset.auto51];if(card&&d)card.classList.toggle('v815-disabled',d.show===false);
  });
  const bar=$('#floatingActions');if(bar){
    const add=$$('button',bar).find(b=>/^ADD TASK$/i.test(b.textContent.trim()));if(add)add.onclick=addTaskModal;
    if(!$('#v815SaveAll')){const b=document.createElement('button');b.id='v815SaveAll';b.className='btn primary v815-save-all';b.textContent='SAVE ALL CHANGES';b.onclick=saveAllCards;add?.after(b)}
  }
}
/* Wrap the authoritative Action Center renderer so controls are enhanced every time it opens. */
if(window.B7Renderers58?.actionCenter){
  const old=window.B7Renderers58.actionCenter;
  window.B7Renderers58.actionCenter=function(){const out=old.apply(this,arguments);setTimeout(enhance,0);return out};
}
const oldSet=window.setView;if(typeof oldSet==='function')window.setView=function(v){const out=oldSet.apply(this,arguments);if(v==='actions')setTimeout(enhance,20);return out};
setTimeout(enhance,120);
})();


/* ===== SOURCE: js/patch-v0819.js ===== */
/* B7 FI Command Center v1.0.3 — single-source Alert Engine + dirty-save Action Center */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=document.body?.dataset?.liveViewerOnly==='true';
const STATUS={red:{key:'critical',label:'CRITICAL'},orange:{key:'attention',label:'ATTENTION'},yellow:{key:'reminder',label:'REMINDER'},blue:{key:'information',label:'INFORMATION'},green:{key:'normal',label:'NORMAL'}};
let leadTimer=null,systemTimer=null,popupTimer=null,leadIndex=0,systemIndex=0,lastLeadKey='',lastSystemKey='';
let actionSnapshots=new WeakMap();
const todayISO=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
function setVersion(){document.title=viewerOnly?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function actionKey(a){return String(a?.id||`auto:${a?.toolId||'general'}:${String(a?.text||'').replace(/\s+/g,' ').slice(0,180)}`)}
function ensureState(){window.state=window.state||{};state.actionDisplay=state.actionDisplay||{};state.actionFirstSeen=state.actionFirstSeen||{};state.manualReminders=Array.isArray(state.manualReminders)?state.manualReminders:[];state.actionHistory=Array.isArray(state.actionHistory)?state.actionHistory:[]}
function migrateManual(){ensureState();state.manualReminders.forEach(r=>{const full='manual:'+r.id,bare=String(r.id);if(!state.actionDisplay[full]&&state.actionDisplay[bare]){state.actionDisplay[full]=state.actionDisplay[bare];delete state.actionDisplay[bare]}if(!state.actionFirstSeen[full]&&state.actionFirstSeen[bare]){state.actionFirstSeen[full]=state.actionFirstSeen[bare];delete state.actionFirstSeen[bare]}})}
function ctl(k,a){ensureState();migrateManual();let d=state.actionDisplay[k];if(!d){d=state.actionDisplay[k]={show:true,seconds:a?.severity==='red'?15:a?.severity==='orange'?10:a?.severity==='blue'?6:8,order:999,assignee:'',pin:false,ack:false,displayUntil:'while-open'}}return d}
function ageDays(k){const x=state.actionFirstSeen?.[k];return x?Math.max(0,Math.floor((Date.now()-new Date(x).getTime())/86400000)):0}
function severity(a,k,d){if(d.forceSeverity)return d.forceSeverity;let s=a?.severity||'yellow';const manual=String(k).startsWith('manual:')||a?.source==='manual'||a?.manual;if(manual)return s;const age=ageDays(k);if(s==='yellow'&&age>=2)s='red';else if(s==='yellow'&&age>=1)s='orange';else if(s==='orange'&&age>=1)s='red';return s}
function rawAlerts(){try{return typeof window.v3Alerts==='function'?(window.v3Alerts()||[]):[]}catch(e){return[]}}
function activeLeadQueue(){
  migrateManual();
  return rawAlerts().map(a=>{const k=actionKey(a),d=ctl(k,a);return {...a,_k:k,_d:d,_sev:severity(a,k,d)}}).filter(a=>{
    const d=a._d;if(a.complete||d.show===false)return false;
    if(d.displayUntil&&d.displayUntil!=='while-open'&&/^\d{4}-\d{2}-\d{2}$/.test(d.displayUntil)&&todayISO()>d.displayUntil)return false;
    return true;
  }).sort((a,b)=>(Number(b._d.pin)-Number(a._d.pin))||((Number(a._d.order)||999)-(Number(b._d.order)||999))||(({red:0,orange:1,yellow:2,blue:3}[a._sev]??4)-({red:0,orange:1,yellow:2,blue:3}[b._sev]??4)));
}
function systemQueue(){let list=[];try{list=typeof window.fleetStatusEntries==='function'?(window.fleetStatusEntries()||[]):[]}catch(e){}return list.map(x=>{const t=String(x.text||'');let s='blue',m=t.match(/BEHIND\s+(\d+)\s+CHECKLIST/i);if(/BLOCKING|CRITICAL/i.test(t)||(m&&Number(m[1])>=4))s='red';else if(m)s='orange';else if(/TARGET NOT SET|AT RISK|OVERDUE/i.test(t))s='yellow';else if(/ON SCHEDULE|SHIPPED|COMPLETE/i.test(t))s='green';else if(/AHEAD/i.test(t))s='blue';return {...x,_sev:s}})}
function ensureBar(id,title){let bar=document.getElementById(id);if(!bar){bar=document.createElement('div');bar.id=id;bar.className=id==='topActionBar'?'top-action-bar':'operations-bar'}
  const good=bar.querySelector('.v819-status-left')&&bar.querySelector('.v819-status-message')&&bar.querySelector('.v819-status-count');
  if(!good){bar.replaceChildren();const left=document.createElement('div');left.className='v819-status-left';left.innerHTML=`<span class="v819-status-lamp" aria-hidden="true"></span><div class="v819-status-copy"><strong class="v819-status-title"></strong><span class="v819-status-severity">NORMAL</span></div>`;const msg=document.createElement('button');msg.type='button';msg.className='v819-status-message';const count=document.createElement('div');count.className='v819-status-count';bar.append(left,msg,count)}
  bar.querySelector('.v819-status-title').textContent=title;return bar;
}
function paint(bar,title,sev,message,count,onClick){if(!bar)return;bar=ensureBar(bar.id,title);const info=STATUS[sev]||STATUS.green;bar.dataset.v819Severity=info.key;bar.dataset.status=info.key;bar.querySelector('.v819-status-severity').textContent=info.label;const msg=bar.querySelector('.v819-status-message');msg.textContent=String(message||'');msg.disabled=!onClick;msg.onclick=onClick||null;bar.querySelector('.v819-status-count').textContent=String(count||'')}
function mountLive(){if(!document.body.classList.contains('v802-live-status'))return;const mount=$('#v802StatusMount');if(!mount)return;const lead=ensureBar('topActionBar','LEAD ALERTS'),sys=ensureBar('operationsBar','SYSTEM STATUS');if(lead.parentElement!==mount)mount.appendChild(lead);if(sys.parentElement!==mount)mount.appendChild(sys);if(lead.nextElementSibling!==sys)mount.insertBefore(lead,sys);if(viewerOnly)$('#v802Exit')?.remove()}
function homeBars(){const stack=$('.sticky-header .header-status-stack');if(!stack||document.body.classList.contains('v802-live-status'))return;const lead=ensureBar('topActionBar','LEAD ALERTS'),sys=ensureBar('operationsBar','SYSTEM STATUS');if(lead.parentElement!==stack)stack.prepend(lead);if(sys.parentElement!==stack)lead.after(sys)}
function renderLead(reset=false){clearTimeout(leadTimer);const q=activeLeadQueue();if(reset)leadIndex=0;const bar=ensureBar('topActionBar','LEAD ALERTS');if(!q.length){leadIndex=0;paint(bar,'LEAD ALERTS','green','NO ACTIVE LEAD ALERTS','0 OPEN');syncDiag(q);schedulePopup();return}
  leadIndex=((leadIndex%q.length)+q.length)%q.length;const a=q[leadIndex],d=a._d;lastLeadKey=a._k;const owner=d.assignee&&!String(a.text||'').includes('Owner ')?` · Owner ${d.assignee}`:'';paint(bar,'LEAD ALERTS',a._sev,`${a.text||''}${owner}`,`← OPEN ${leadIndex+1} OF ${q.length}`,()=>typeof window.actionTarget==='function'&&window.actionTarget(a));syncDiag(q);schedulePopup();leadTimer=setTimeout(()=>{const next=activeLeadQueue();if(!next.length){renderLead(true);return}const p=next.findIndex(x=>x._k===lastLeadKey);leadIndex=((p<0?leadIndex:p)+1)%next.length;renderLead(false)},Math.max(3,Math.min(60,Number(d.seconds)||8))*1000)}
function renderSystem(reset=false){clearTimeout(systemTimer);const q=systemQueue();if(reset)systemIndex=0;const bar=ensureBar('operationsBar','SYSTEM STATUS');if(!q.length){systemIndex=0;paint(bar,'SYSTEM STATUS','green','ALL ACTIVE SYSTEMS NORMAL','0 OPEN');return}systemIndex=((systemIndex%q.length)+q.length)%q.length;const a=q[systemIndex];lastSystemKey=`${a.toolId||''}|${a.text||''}`;paint(bar,'SYSTEM STATUS',a._sev,a.text||'SYSTEM STATUS AVAILABLE',`← OPEN ${systemIndex+1} OF ${q.length}`,()=>a.toolId&&typeof window.toolStatus==='function'&&window.toolStatus(a.toolId));systemTimer=setTimeout(()=>{const next=systemQueue();if(!next.length){renderSystem(true);return}const p=next.findIndex(x=>`${x.toolId||''}|${x.text||''}`===lastSystemKey);systemIndex=((p<0?systemIndex:p)+1)%next.length;renderSystem(false)},8000)}
function refresh(reset=true){mountLive();homeBars();renderLead(reset);renderSystem(reset);setVersion()}
/* Legacy ticker guards look specifically for this name. Point them to the v1.0.1 engine. */
window.B7AlertEngine817={refresh,refreshLead:renderLead,refreshSystem:renderSystem,leadQueue:activeLeadQueue,systemQueue};window.B7AlertEngine819=window.B7AlertEngine817;window.renderTopActionBar=function(){renderLead(false)};window.updateOperationsBar=function(){renderSystem(false)};
function toast(text){let t=$('#v819Toast');if(!t){t=document.createElement('div');t.id='v819Toast';t.className='v819-toast';document.body.appendChild(t)}t.textContent=text;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2000)}
function cardKey(card){return String(card?.dataset?.auto51||'')}
function manualCard(card){return cardKey(card).startsWith('manual:')}
function serialize(card){return JSON.stringify({assignee:card.querySelector('.ac-owner51')?.value.trim()||'',show:(card.querySelector('.ac-show51')?.value||'on')==='on',seconds:Number(card.querySelector('.ac-sec51')?.value)||8,order:Number(card.querySelector('.ac-order51')?.value)||999,pin:!!card.querySelector('.ac-pin51')?.checked,ack:!!card.querySelector('.ac-ack51')?.checked,mode:card.querySelector('.ac-until-mode51')?.value||'while-open',custom:card.querySelector('.ac-until51')?.value||''})}
function persistCard(card){const k=cardKey(card);if(!k)return false;const v=JSON.parse(serialize(card)),d=ctl(k,{});Object.assign(d,{assignee:v.assignee,show:v.show,seconds:v.seconds,order:v.order,pin:v.pin,ack:v.ack,displayUntil:v.mode==='while-open'?'while-open':v.mode==='today'?todayISO():(v.custom||'while-open')});state.actionDisplay[k]=d;card.classList.toggle('v819-alert-off',!d.show);card.classList.remove('v819-dirty');actionSnapshots.set(card,serialize(card));return true}
function saveStore(){try{if(typeof window.save==='function')window.save()}catch(e){}refresh(true)}
function deleteManual(card){if(!manualCard(card))return;const id=cardKey(card).slice(7);if(!confirm('Permanently delete this manually-created alert/task? This cannot be undone.'))return;state.manualReminders=state.manualReminders.filter(r=>String(r.id)!==id);delete state.actionDisplay[cardKey(card)];delete state.actionDisplay[id];delete state.actionFirstSeen?.[cardKey(card)];saveStore();rerenderActions();toast('Manual alert deleted')}
function resolveManual(card){if(!manualCard(card))return;const id=cardKey(card).slice(7),r=state.manualReminders.find(x=>String(x.id)===id);if(!r)return;const note=prompt('Optional resolution note:','');if(note===null)return;state.actionHistory.unshift({...JSON.parse(JSON.stringify(r)),historyId:'hist'+Date.now(),resolvedAt:new Date().toISOString(),resolutionNote:note});r.complete=true;r.resolvedAt=new Date().toISOString();saveStore();rerenderActions();toast('Manual alert resolved and moved to history')}
function actionRow(card){const controls=card.querySelector('.auto-controls51');if(!controls)return;let row=controls.querySelector('.v819-card-actions');if(!row){row=document.createElement('div');row.className='v819-card-actions';controls.appendChild(row)}row.replaceChildren();const note=document.createElement('span');note.className='v819-card-note';note.textContent=manualCard(card)?'MANUAL · USER CONTROLLED':'AUTO · CLEARS ONLY FROM TOOL / WORKFLOW';row.appendChild(note);const dirty=document.createElement('span');dirty.className='v819-dirty-badge';dirty.textContent='UNSAVED CHANGES';row.appendChild(dirty);const save=document.createElement('button');save.type='button';save.className='btn small primary v819-save';save.textContent='SAVE CHANGES';save.onclick=e=>{e.preventDefault();if(!card.classList.contains('v819-dirty')){toast('No changes to save');return}persistCard(card);saveStore();toast('Saved 1 changed alert')};row.appendChild(save);if(manualCard(card)){const res=document.createElement('button');res.type='button';res.className='btn small v819-resolve';res.textContent='RESOLVE';res.onclick=e=>{e.preventDefault();if(card.classList.contains('v819-dirty'))persistCard(card);resolveManual(card)};row.appendChild(res);const del=document.createElement('button');del.type='button';del.className='btn small v819-delete';del.textContent='DELETE';del.onclick=e=>{e.preventDefault();deleteManual(card)};row.appendChild(del)}}
function syncCard(card){const k=cardKey(card);if(!k)return;const a=rawAlerts().find(x=>actionKey(x)===k)||{},d=ctl(k,a);const show=card.querySelector('.ac-show51');if(show)show.value=d.show===false?'off':'on';const owner=card.querySelector('.ac-owner51');if(owner)owner.value=d.assignee||'';const sec=card.querySelector('.ac-sec51');if(sec&&[...sec.options].some(o=>Number(o.value)===Number(d.seconds)))sec.value=String(d.seconds);const order=card.querySelector('.ac-order51');if(order)order.value=Number(d.order)||999;const pin=card.querySelector('.ac-pin51');if(pin)pin.checked=!!d.pin;const ack=card.querySelector('.ac-ack51');if(ack)ack.checked=!!d.ack;const mode=card.querySelector('.ac-until-mode51'),custom=card.querySelector('.ac-until51');if(mode){if(d.displayUntil==='while-open')mode.value='while-open';else if(d.displayUntil===todayISO())mode.value='today';else mode.value='custom'}if(custom)custom.value=/^\d{4}-/.test(d.displayUntil||'')?d.displayUntil:'';card.classList.toggle('v819-alert-off',d.show===false);card.classList.remove('v819-dirty');actionSnapshots.set(card,serialize(card));actionRow(card)}
function syncDiag(q=activeLeadQueue()){let host=$('#v819QueueDiag');if(!host){const summary=$('.action-summary-grid');if(summary){host=document.createElement('div');host.id='v819QueueDiag';host.className='v819-queue-diag';summary.insertAdjacentElement('afterend',host)}}if(!host)return;const c={red:0,orange:0,yellow:0,blue:0};q.forEach(x=>c[x._sev]=(c[x._sev]||0)+1);host.innerHTML=`<strong>ACTIVE LEAD ALERTS: ${q.length}</strong> · Critical ${c.red||0} · Attention ${c.orange||0} · Reminder ${c.yellow||0} · Information ${c.blue||0}`}
function enhanceActions(){if(document.body.dataset.center!=='action')return;migrateManual();$$('.auto-action51[data-auto51]').forEach(card=>syncCard(card));const app=$('#app');if(app&&!app.dataset.v819DirtyBound){app.dataset.v819DirtyBound='1';const mark=e=>{const card=e.target.closest('.auto-action51[data-auto51]');if(!card||!e.target.closest('.auto-controls51'))return;const snap=actionSnapshots.get(card);if(snap!==undefined)card.classList.toggle('v819-dirty',serialize(card)!==snap)};app.addEventListener('input',mark);app.addEventListener('change',mark)}syncDiag();const saveAll=$('#v815SaveAll');if(saveAll){saveAll.textContent='SAVE ALL CHANGES';saveAll.onclick=e=>{e.preventDefault();const dirty=$$('.auto-action51.v819-dirty[data-auto51]');if(!dirty.length){toast('No changes to save');return}dirty.forEach(persistCard);saveStore();toast(`Saved ${dirty.length} changed alert${dirty.length===1?'':'s'}`)}}}
function rerenderActions(){if(window.B7Renderers58?.actionCenter){window.B7Renderers58.actionCenter();setTimeout(enhanceActions,0)}else if(typeof window.setView==='function')window.setView('actions')}
/* Critical popup is driven by the SAME active queue as Lead Alerts. */
function closePopup(){$('#v819Critical')?.remove()}
function criticalEligible(){if(viewerOnly||document.body.classList.contains('v802-live-status'))return null;const now=Date.now();return activeLeadQueue().find(a=>a._sev==='red'&&!a._d.ack&&(!a._d.snoozeUntil||Number(a._d.snoozeUntil)<=now))||null}
function showPopup(a){if(!a||$('#v819Critical'))return;document.body.insertAdjacentHTML('beforeend',`<div id="v819Critical" class="v819-critical-backdrop"><section class="v819-critical-modal" role="alertdialog" aria-modal="true"><div class="v819-critical-head"><span class="v819-status-lamp"></span><div><strong>LEAD ALERTS</strong><br><span>CRITICAL — REQUIRES ATTENTION</span></div></div><div class="v819-critical-body"></div><div class="v819-critical-actions"><button class="btn primary" data-v819-ack>ACKNOWLEDGE & WORKING</button><button class="btn" data-v819-open>OPEN ACTION CENTER</button><button class="btn" data-v819-later>REMIND ME LATER</button></div></section></div>`);$('#v819Critical .v819-critical-body').textContent=a.text||'Critical alert';$('[data-v819-ack]').onclick=()=>{a._d.ack=true;a._d.acknowledgedAt=new Date().toISOString();state.actionDisplay[a._k]=a._d;saveStore();closePopup()};$('[data-v819-open]').onclick=()=>{closePopup();window.setView?.('actions')};$('[data-v819-later]').onclick=()=>{a._d.snoozeUntil=Date.now()+30*60*1000;state.actionDisplay[a._k]=a._d;try{window.save?.()}catch(e){}closePopup();schedulePopup()}}
function schedulePopup(){clearTimeout(popupTimer);closePopup();const a=criticalEligible();if(!a)return;popupTimer=setTimeout(()=>{const current=criticalEligible();if(current&&current._k===a._k)showPopup(current)},30000)}
const priorSetView=window.setView;if(typeof priorSetView==='function')window.setView=function(v){const out=priorSetView.apply(this,arguments);setTimeout(()=>{mountLive();homeBars();refresh(true);if(v==='actions')enhanceActions();setVersion()},0);setTimeout(()=>{if(v==='actions')enhanceActions();setVersion()},80);return out};
function boot(){migrateManual();setVersion();mountLive();homeBars();refresh(true);enhanceActions();setTimeout(()=>{mountLive();homeBars();refresh(false);enhanceActions();setVersion()},120)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('storage',()=>{migrateManual();refresh(true);if(document.body.dataset.center==='action')enhanceActions()});
})();


/* ===== SOURCE: js/patch-v0820.js ===== */
/* B7 FI Command Center v1.0.3 — independent permanent status shell + Action Center stabilization */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
let leadTimer=null,systemTimer=null,leadIndex=0,systemIndex=0,lastLead='',lastSystem='';
let cardSnapshots=new WeakMap();
const colors={red:'critical',orange:'attention',yellow:'reminder',blue:'information',green:'normal'};
const labels={critical:'CRITICAL',attention:'ATTENTION',reminder:'REMINDER',information:'INFORMATION',normal:'NORMAL'};
function nowISO(){return new Date().toISOString()}
function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function ensureState(){window.state=window.state||{};state.actionDisplay=state.actionDisplay||{};state.actionFirstSeen=state.actionFirstSeen||{};state.manualReminders=Array.isArray(state.manualReminders)?state.manualReminders:[];state.actionHistory=Array.isArray(state.actionHistory)?state.actionHistory:[]}
function keyOf(a){return String(a?.id||`auto:${a?.toolId||'general'}:${String(a?.text||'').replace(/\s+/g,' ').slice(0,180)}`)}
function defaultCtl(a){return {show:true,seconds:a?.severity==='red'?15:a?.severity==='orange'?10:a?.severity==='blue'?6:8,order:999,assignee:'',pin:false,ack:false,displayUntil:'while-open'}}
function ctl(k,a){ensureState();return state.actionDisplay[k]||(state.actionDisplay[k]=defaultCtl(a))}
function ageDays(k){const x=state.actionFirstSeen?.[k];if(!x)return 0;return Math.max(0,Math.floor((Date.now()-new Date(x).getTime())/86400000))}
function sev(a,k,d){if(d.forceSeverity)return d.forceSeverity;let s=a?.severity||'yellow';const manual=String(k).startsWith('manual:')||a?.source==='manual'||a?.manual;if(manual)return s;const age=ageDays(k);if(s==='yellow'&&age>=2)s='red';else if(s==='yellow'&&age>=1)s='orange';else if(s==='orange'&&age>=1)s='red';return s}
function rawAlerts(){try{return typeof window.v3Alerts==='function'?(window.v3Alerts()||[]):[]}catch(e){return[]}}
function leadQueue(){ensureState();return rawAlerts().map(a=>{const k=keyOf(a),d=ctl(k,a);return {...a,_k:k,_d:d,_sev:sev(a,k,d)}}).filter(a=>{const d=a._d;if(a.complete||d.show===false)return false;if(d.displayUntil&&d.displayUntil!=='while-open'&&/^\d{4}-\d{2}-\d{2}$/.test(d.displayUntil)&&today()>d.displayUntil)return false;return true}).sort((a,b)=>(Number(b._d.pin)-Number(a._d.pin))||((Number(a._d.order)||999)-(Number(b._d.order)||999))||(({red:0,orange:1,yellow:2,blue:3}[a._sev]??4)-({red:0,orange:1,yellow:2,blue:3}[b._sev]??4)))}
function systemQueue(){let list=[];try{list=typeof window.fleetStatusEntries==='function'?(window.fleetStatusEntries()||[]):[]}catch(e){}return list.map(x=>{const t=String(x.text||'');let s='blue',m=t.match(/BEHIND\s+(\d+)\s+CHECKLIST/i);if(/BLOCKING|CRITICAL/i.test(t)||(m&&Number(m[1])>=4))s='red';else if(m)s='orange';else if(/TARGET NOT SET|AT RISK|OVERDUE/i.test(t))s='yellow';else if(/ON SCHEDULE|SHIPPED|COMPLETE/i.test(t))s='green';else if(/AHEAD/i.test(t))s='blue';return {...x,_sev:s}})}
function shell(){let stack=$('#b7StatusStack');if(stack)return stack;stack=document.createElement('div');stack.id='b7StatusStack';stack.className='b7s-stack';stack.innerHTML=`<div id="b7LeadAlertsBar" class="b7s-bar" data-severity="normal"><div class="b7s-left"><span class="b7s-lamp"></span><div class="b7s-copy"><strong class="b7s-title">LEAD ALERTS</strong><span class="b7s-severity">NORMAL</span></div></div><div class="b7s-message"><span>NO ACTIVE LEAD ALERTS</span></div><div class="b7s-count">0 OPEN</div></div><div id="b7SystemStatusBar" class="b7s-bar" data-severity="normal"><div class="b7s-left"><span class="b7s-lamp"></span><div class="b7s-copy"><strong class="b7s-title">SYSTEM STATUS</strong><span class="b7s-severity">NORMAL</span></div></div><div class="b7s-message"><span>ALL ACTIVE SYSTEMS NORMAL</span></div><div class="b7s-count">0 OPEN</div></div>`;return stack}
function mount(){const s=shell();if(document.body.classList.contains('v802-live-status')){const m=$('#v802StatusMount');if(m&&s.parentElement!==m)m.appendChild(s);if(viewerOnly())$('#v802Exit')?.remove()}else{const nav=$('.sticky-header>.main-nav');const header=$('.sticky-header');if(nav&&header){if(s.parentElement!==header||s.previousElementSibling!==nav)nav.insertAdjacentElement('afterend',s)}}return s}
function setBar(id,severity,message,count){const b=$('#'+id);if(!b)return;const sk=colors[severity]||'normal';b.dataset.severity=sk;b.querySelector('.b7s-severity').textContent=labels[sk]||'NORMAL';b.querySelector('.b7s-message span').textContent=String(message||'');b.querySelector('.b7s-count').textContent=String(count||'')}
function renderLead(reset=false){clearTimeout(leadTimer);mount();const q=leadQueue();if(reset)leadIndex=0;if(!q.length){leadIndex=0;lastLead='';setBar('b7LeadAlertsBar','green','NO ACTIVE LEAD ALERTS','0 OPEN');syncDiag(q);return}leadIndex=((leadIndex%q.length)+q.length)%q.length;const a=q[leadIndex];lastLead=a._k;setBar('b7LeadAlertsBar',a._sev,a.text||'LEAD ALERT',`← OPEN ${leadIndex+1} OF ${q.length}`);syncDiag(q);const ms=Math.max(3,Math.min(60,Number(a._d.seconds)||8))*1000;leadTimer=setTimeout(()=>{const n=leadQueue();if(!n.length){renderLead(true);return}const p=n.findIndex(x=>x._k===lastLead);leadIndex=((p<0?leadIndex:p)+1)%n.length;renderLead(false)},ms)}
function renderSystem(reset=false){clearTimeout(systemTimer);mount();const q=systemQueue();if(reset)systemIndex=0;if(!q.length){systemIndex=0;lastSystem='';setBar('b7SystemStatusBar','green','ALL ACTIVE SYSTEMS NORMAL','0 OPEN');return}systemIndex=((systemIndex%q.length)+q.length)%q.length;const a=q[systemIndex];lastSystem=`${a.toolId||''}|${a.text||''}`;setBar('b7SystemStatusBar',a._sev,a.text||'SYSTEM STATUS',`← OPEN ${systemIndex+1} OF ${q.length}`);systemTimer=setTimeout(()=>{const n=systemQueue();if(!n.length){renderSystem(true);return}const p=n.findIndex(x=>`${x.toolId||''}|${x.text||''}`===lastSystem);systemIndex=((p<0?systemIndex:p)+1)%n.length;renderSystem(false)},8000)}
function refreshAll(reset=true){mount();renderLead(reset);renderSystem(reset);setVersion();enhanceActions()}
window.B7StatusEngine820={refreshAll,renderLead,renderSystem,leadQueue,systemQueue,mount};

function setVersion(){window.VERSION=VERSION;document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function toast(t){let x=$('#b7xToast');if(!x){x=document.createElement('div');x.id='b7xToast';document.body.appendChild(x)}x.textContent=t;x.classList.add('show');clearTimeout(x._t);x._t=setTimeout(()=>x.classList.remove('show'),2200)}
function cardKey(card){return String(card?.dataset?.auto51||'')}
function isManual(card){const k=cardKey(card);return k.startsWith('manual:')||/\bMANUAL\b/i.test(card.querySelector('.auto-open51 small')?.textContent||'')}
function serialized(card){return JSON.stringify({assignee:card.querySelector('.ac-owner51')?.value.trim()||'',show:(card.querySelector('.ac-show51')?.value||'on')==='on',seconds:Number(card.querySelector('.ac-sec51')?.value)||8,order:Number(card.querySelector('.ac-order51')?.value)||999,pin:!!card.querySelector('.ac-pin51')?.checked,ack:!!card.querySelector('.ac-ack51')?.checked,mode:card.querySelector('.ac-until-mode51')?.value||'while-open',custom:card.querySelector('.ac-until51')?.value||''})}
function persist(card){const k=cardKey(card);if(!k)return false;ensureState();const v=JSON.parse(serialized(card)),d=state.actionDisplay[k]||defaultCtl({});Object.assign(d,{assignee:v.assignee,show:v.show,seconds:v.seconds,order:v.order,pin:v.pin,ack:v.ack,displayUntil:v.mode==='while-open'?'while-open':v.mode==='today'?today():(v.custom||'while-open')});state.actionDisplay[k]=d;card.classList.toggle('b7x-off',!d.show);card.classList.remove('b7x-dirty');cardSnapshots.set(card,serialized(card));return true}
function saveNow(){try{window.save?.()}catch(e){}renderLead(true);renderSystem(false);syncDiag()}
function deleteManual(card){if(!isManual(card))return;const k=cardKey(card),id=k.startsWith('manual:')?k.slice(7):k;if(!confirm('Permanently delete this manually-created alert/task? This cannot be undone.'))return;state.manualReminders=(state.manualReminders||[]).filter(r=>String(r.id)!==String(id));delete state.actionDisplay?.[k];delete state.actionDisplay?.[id];delete state.actionFirstSeen?.[k];try{window.save?.()}catch(e){}toast('Manual alert deleted');rerenderActions();renderLead(true)}
function resolveManual(card){if(!isManual(card))return;const k=cardKey(card),id=k.startsWith('manual:')?k.slice(7):k,r=(state.manualReminders||[]).find(x=>String(x.id)===String(id));if(!r)return;const note=prompt('Optional resolution note:','');if(note===null)return;state.actionHistory=Array.isArray(state.actionHistory)?state.actionHistory:[];state.actionHistory.unshift({...JSON.parse(JSON.stringify(r)),historyId:'hist'+Date.now(),resolvedAt:nowISO(),resolutionNote:note});r.complete=true;r.resolvedAt=nowISO();try{window.save?.()}catch(e){}toast('Manual alert resolved and moved to history');rerenderActions();renderLead(true)}
function actionButtons(card){card.querySelector('.b7x-card-actions')?.remove();const controls=card.querySelector('.auto-controls51');if(!controls)return;const row=document.createElement('div');row.className='b7x-card-actions';row.innerHTML=`<span class="b7x-card-note">${isManual(card)?'MANUAL · USER CONTROLLED':'AUTO · CLEARS ONLY FROM TOOL / WORKFLOW'}</span><span class="b7x-dirty-note">UNSAVED CHANGES</span>`;const save=document.createElement('button');save.className='btn small primary b7x-save';save.type='button';save.textContent='SAVE CHANGES';save.onclick=e=>{e.preventDefault();if(!card.classList.contains('b7x-dirty')){toast('No changes to save');return}persist(card);saveNow();toast('Saved 1 changed alert')};row.appendChild(save);if(isManual(card)){const res=document.createElement('button');res.className='btn small b7x-resolve';res.type='button';res.textContent='RESOLVE';res.onclick=e=>{e.preventDefault();if(card.classList.contains('b7x-dirty'))persist(card);resolveManual(card)};row.appendChild(res);const del=document.createElement('button');del.className='btn small b7x-delete';del.type='button';del.textContent='DELETE';del.onclick=e=>{e.preventDefault();deleteManual(card)};row.appendChild(del)}controls.appendChild(row)}
function syncDiag(q=leadQueue()){let host=$('#b7xQueueDiag');if(!host){const summary=$('.action-summary-grid');if(summary){host=document.createElement('div');host.id='b7xQueueDiag';summary.insertAdjacentElement('afterend',host)}}if(!host)return;const c={red:0,orange:0,yellow:0,blue:0};q.forEach(x=>c[x._sev]=(c[x._sev]||0)+1);host.innerHTML=`<strong>ACTIVE LEAD ALERTS: ${q.length}</strong> · Critical ${c.red||0} · Attention ${c.orange||0} · Reminder ${c.yellow||0} · Information ${c.blue||0}`}
function enhanceActions(){if(document.body.dataset.center!=='action')return;ensureState();$$('.auto-action51[data-auto51]').forEach(card=>{card.querySelectorAll('.v819-card-actions').forEach(x=>x.remove());const d=state.actionDisplay[cardKey(card)]||defaultCtl({});const show=card.querySelector('.ac-show51');if(show)show.value=d.show===false?'off':'on';card.classList.toggle('b7x-off',d.show===false);actionButtons(card);cardSnapshots.set(card,serialized(card));card.classList.remove('b7x-dirty')});syncDiag();const saveAll=$('#v815SaveAll');if(saveAll){saveAll.textContent='SAVE ALL CHANGES';saveAll.onclick=e=>{e.preventDefault();const dirty=$$('.auto-action51.b7x-dirty[data-auto51]');if(!dirty.length){toast('No changes to save');return}dirty.forEach(persist);try{window.save?.()}catch(err){}renderLead(true);renderSystem(false);syncDiag();toast(`Saved ${dirty.length} changed alert${dirty.length===1?'':'s'}`)}}}
function rerenderActions(){if(window.B7Renderers58?.actionCenter){window.B7Renderers58.actionCenter();setTimeout(enhanceActions,0)}else if(typeof window.setView==='function'){window.setView('actions');setTimeout(enhanceActions,0)}}
if(!document.documentElement.dataset.b7xDirtyBound){document.documentElement.dataset.b7xDirtyBound='1';const dirty=e=>{const card=e.target.closest?.('.auto-action51[data-auto51]');if(!card||!e.target.closest('.auto-controls51'))return;const snap=cardSnapshots.get(card);if(snap!==undefined)card.classList.toggle('b7x-dirty',serialized(card)!==snap)};document.addEventListener('input',dirty);document.addEventListener('change',dirty);document.addEventListener('click',e=>{if(e.target.closest('#v815SaveAll,.b7x-save,.b7x-delete,.b7x-resolve'))setTimeout(()=>{renderLead(true);syncDiag()},80)})}

/* Wrap navigation after all legacy patches. The fixed shell is remounted after every view change. */
const oldSetView=window.setView;if(typeof oldSetView==='function')window.setView=function(v){const out=oldSetView.apply(this,arguments);[0,80,250].forEach(ms=>setTimeout(()=>{mount();renderLead(ms===0);renderSystem(ms===0);if(v==='actions')enhanceActions();setVersion()},ms));return out};
function boot(){ensureState();setVersion();[0,100,350,900].forEach(ms=>setTimeout(()=>{mount();renderLead(ms===0);renderSystem(ms===0);enhanceActions();setVersion()},ms))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('storage',()=>{refreshAll(true)});
})();


/* ===== SOURCE: js/patch-v0821.js ===== */
/* B7 FI Command Center v1.0.3 — status placement / duplicate-container cleanup only */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);

function version(){
  const viewer=document.body?.dataset?.liveViewerOnly==='true';
  document.title=viewer?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const label=$('#appVersionLabel');
  if(label) label.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}

function cleanLiveMount(){
  if(!document.body.classList.contains('v802-live-status')) return;
  const mount=$('#v802StatusMount');
  const stack=$('#b7StatusStack');
  if(!mount||!stack) return;
  if(stack.parentElement!==mount) mount.appendChild(stack);
  /* The mount is status-only. Remove stale generated/legacy children instead of letting
     them reserve two blank bar rows. The globally-retained legacy IDs may be recreated
     later by old code, so only remove nodes currently inside this live-only mount. */
  Array.from(mount.children).forEach(node=>{
    if(node!==stack) node.remove();
  });
  const exit=$('#v802Exit');
  if(document.body?.dataset?.liveViewerOnly==='true' && exit) exit.remove();
}

function cleanCommandMount(){
  if(document.body.classList.contains('v802-live-status')) return;
  const header=$('.sticky-header');
  const nav=$('.sticky-header>.main-nav');
  const stack=$('#b7StatusStack');
  if(!header||!nav||!stack) return;
  /* v1.0.1 framework: status is a direct sticky-header row immediately after main nav.
     This isolates it from the historical header-status-stack grid/spacer rules. */
  if(stack.parentElement!==header || stack.previousElementSibling!==nav){
    nav.insertAdjacentElement('afterend',stack);
  }
}

function place(){
  version();
  if(document.body.classList.contains('v802-live-status')) cleanLiveMount();
  else cleanCommandMount();
}

/* Wrap navigation once so every Center route restores the same status location. */
const prior=window.setView;
if(typeof prior==='function' && !prior.__v821){
  const wrapped=function(){
    const out=prior.apply(this,arguments);
    requestAnimationFrame(place);
    setTimeout(place,40);
    return out;
  };
  wrapped.__v821=true;
  window.setView=wrapped;
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{
  place();
  setTimeout(place,100);
},{once:true});
else { place(); setTimeout(place,100); }

/* Live Status is rebuilt when entering the view; give that render one bounded placement pass. */
document.addEventListener('click',e=>{
  if(e.target.closest('[data-view="livestatus"],[data-view="live-status"]')){
    setTimeout(place,80);
  }
});

window.B7StatusPlacement821={place,cleanLiveMount,cleanCommandMount};
})();


/* ===== SOURCE: js/patch-v0822.js ===== */
/* B7 FI Command Center v1.0.3 — placement, Live Status parity, Tool editor recovery */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);

function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function setVersion(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const label=$('#appVersionLabel');
  if(label) label.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}

/* Do not touch alert queues/content. Only enforce where the already-working
   permanent v1.0.1 status shell lives and remove legacy status placeholders. */
function placeStatus(){
  const stack=$('#b7StatusStack');
  if(!stack){setVersion();return}
  if(document.body.classList.contains('v802-live-status')){
    const mount=$('#v802StatusMount');
    if(mount && stack.parentElement!==mount) mount.appendChild(stack);
    if(mount){
      Array.from(mount.children).forEach(node=>{
        if(node!==stack){
          node.style.setProperty('display','none','important');
          node.style.setProperty('height','0','important');
          node.style.setProperty('min-height','0','important');
        }
      });
    }
    if(viewerOnly()) $('#v802Exit')?.remove();
  }else{
    const header=$('.sticky-header');
    const nav=$('.sticky-header>.main-nav');
    if(header && nav){
      if(stack.parentElement!==header || stack.previousElementSibling!==nav){
        nav.insertAdjacentElement('afterend',stack);
      }
    }
  }
  setVersion();
}

/* Restore the complete Tool editor navigation that an older focused-editor
   layer hides. The actual editor/checklist workflow remains the original
   working toolAdmin implementation; this only restores access to its tabs. */
function restoreToolEditor(){
  if(!document.body.classList.contains('v61-focused-editor') || document.body.dataset.center!=='tool') return;
  const tabs=$('#app .admin-tabs');
  if(tabs){
    tabs.style.setProperty('display','flex','important');
    tabs.style.setProperty('position','relative','important');
    tabs.style.setProperty('top','auto','important');
  }
}

function settle(){placeStatus();restoreToolEditor()}

/* Wrap navigation/tool editing only for bounded post-render placement. No
   observers and no recurring interval are introduced. */
const priorSetView=window.setView;
if(typeof priorSetView==='function' && !priorSetView.__v822){
  const wrapped=function(){
    const out=priorSetView.apply(this,arguments);
    requestAnimationFrame(settle);
    setTimeout(settle,60);
    return out;
  };
  wrapped.__v822=true;
  window.setView=wrapped;
}

const priorToolAdmin=window.toolAdmin;
if(typeof priorToolAdmin==='function' && !priorToolAdmin.__v822){
  const wrappedTool=function(){
    const out=priorToolAdmin.apply(this,arguments);
    requestAnimationFrame(settle);
    setTimeout(settle,50);
    return out;
  };
  wrappedTool.__v822=true;
  window.toolAdmin=wrappedTool;
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',()=>{settle();setTimeout(settle,120)},{once:true});
}else{
  settle();setTimeout(settle,120);
}

/* Live Status is built after routing; one bounded pass after opening it is
   enough to align the shared status component with the viewer shell. */
document.addEventListener('click',e=>{
  if(e.target.closest('[data-view="livestatus"],[data-view="live-status"],#v802Exit')){
    setTimeout(settle,90);
  }
});

window.B7StatusPlacement822={settle,placeStatus,restoreToolEditor};
})();


/* ===== SOURCE: js/patch-v0823.js ===== */
/* B7 FI Command Center v1.0.3 — final status placement/parity guard */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
function setVersion(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel'); if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function placeStatus(){
  const stack=$('#b7StatusStack'); if(!stack){setVersion();return;}
  if(document.body.classList.contains('v802-live-status')){
    const mount=$('#v802StatusMount');
    if(mount && stack.parentElement!==mount) mount.appendChild(stack);
    if(viewerOnly()) $('#v802Exit')?.remove();
  }else{
    const header=$('.sticky-header'), nav=$('.sticky-header>.main-nav');
    if(header&&nav&&(stack.parentElement!==header||stack.previousElementSibling!==nav)){
      nav.insertAdjacentElement('afterend',stack);
    }
  }
  setVersion();
}
function settle(){placeStatus();}
/* Bounded post-render correction only. Rotation itself now mounts to the same locations
   in patch-v0820, so no observer/interval is needed. */
const prior=window.setView;
if(typeof prior==='function'&&!prior.__v823){
  const wrapped=function(){const out=prior.apply(this,arguments);requestAnimationFrame(settle);setTimeout(settle,70);return out};
  wrapped.__v823=true;window.setView=wrapped;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{settle();setTimeout(settle,140)},{once:true});
else {settle();setTimeout(settle,140)}
document.addEventListener('click',e=>{if(e.target.closest('[data-view="livestatus"],[data-view="live-status"],#v802Exit'))setTimeout(settle,100)});
window.B7StatusPlacement823={settle,placeStatus};
})();


/* ===== SOURCE: js/patch-v0824.js ===== */
/* B7 FI Command Center v1.0.3 — final frame/layout guard */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
function normalize(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const label=$('#appVersionLabel'); if(label) label.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
  if(!document.body.classList.contains('v802-live-status')){
    const header=$('.sticky-header'), nav=$('.sticky-header>.main-nav'), stack=$('#b7StatusStack');
    if(header&&nav&&stack&&(stack.parentElement!==header||stack.previousElementSibling!==nav)) nav.insertAdjacentElement('afterend',stack);
    const hs=$('.sticky-header>.header-status-stack');
    if(hs){
      const legacyA=$('#topActionBar'),legacyS=$('#operationsBar');
      if(legacyA&&legacyA.parentElement!==hs) hs.prepend(legacyA);
      if(legacyS&&legacyS.parentElement!==hs) hs.insertBefore(legacyS,$('#floatingActions'));
    }
  }
}
const prior=window.setView;
if(typeof prior==='function'&&!prior.__v824){
  const wrapped=function(){const out=prior.apply(this,arguments);requestAnimationFrame(normalize);setTimeout(normalize,80);return out};
  wrapped.__v824=true;window.setView=wrapped;
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{normalize();setTimeout(normalize,140)},{once:true});
else {normalize();setTimeout(normalize,140)}
window.B7Frame824={normalize};
})();


/* ===== SOURCE: js/patch-v0825.js ===== */
/* B7 FI Command Center v1.0.3 — Operations Live Dashboard + shared viewer data sync.
   - Operations Center becomes the live operational dashboard (no redundant home cards).
   - Standalone live-status-view consumes the same canonical state as the Command Center.
   - Same-origin tabs synchronize through BroadcastChannel + storage events.
*/
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
const STATE_KEY='b7fi-v0210-state';
const SNAP_KEY='b7fi-live-status-snapshot-v1';
const CHANNEL='b7fi-live-sync-v1';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
const priorSetView=window.setView;
let bc=null;
let applying=false;

function setVersion(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel'); if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function clone(x){try{return JSON.parse(JSON.stringify(x))}catch(e){return null}}
function canonicalState(){
  try{
    if(typeof state!=='undefined'&&state&&Array.isArray(state.tools))return clone(state);
  }catch(e){}
  try{return JSON.parse(localStorage.getItem(STATE_KEY)||'null')}catch(e){return null}
}
function currentQueues(){
  try{
    const e=window.B7StatusEngine820;
    if(e)return {
      lead:(e.leadQueue?.()||[]).map(a=>({key:a._k||a.id||'',text:a.text||'',severity:a._sev||a.severity||'blue'})),
      system:(e.systemQueue?.()||[]).map(a=>({toolId:a.toolId||'',text:a.text||'',severity:a._sev||a.severity||'blue'}))
    };
  }catch(e){}
  return {lead:[],system:[]};
}
function buildSnapshot(){
  const st=canonicalState(); if(!st)return null;
  const q=currentQueues();
  return {schema:1,version:VERSION,updatedAt:new Date().toISOString(),state:st,leadQueue:q.lead,systemQueue:q.system};
}
function publishSnapshot(){
  if(viewerOnly()||applying)return;
  const snap=buildSnapshot(); if(!snap)return;
  try{localStorage.setItem(SNAP_KEY,JSON.stringify(snap))}catch(e){}
  try{bc?.postMessage({type:'snapshot',snapshot:snap})}catch(e){}
}
function readSnapshot(){try{return JSON.parse(localStorage.getItem(SNAP_KEY)||'null')}catch(e){return null}}
function applyCanonicalState(st){
  if(!st||!Array.isArray(st.tools))return false;
  applying=true;
  try{
    /* app-v0300 declares state/tools in the shared global lexical environment. */
    try{state=clone(st);tools=state.tools}catch(e){}
    try{localStorage.setItem(STATE_KEY,JSON.stringify(st))}catch(e){}
    return true;
  }finally{applying=false}
}
function refreshViewerFromShared(snapshot){
  if(!viewerOnly())return;
  const snap=snapshot||readSnapshot();
  let st=snap?.state||null;
  if(!st){try{st=JSON.parse(localStorage.getItem(STATE_KEY)||'null')}catch(e){}}
  if(!st){
    const lead=$('#b7LeadAlertsBar .b7s-message span'); if(lead)lead.textContent='COMMAND CENTER DATA UNAVAILABLE';
    const sys=$('#b7SystemStatusBar .b7s-message span'); if(sys)sys.textContent='COMMAND CENTER DATA UNAVAILABLE';
    return;
  }
  applyCanonicalState(st);
  try{window.B7StatusEngine820?.refreshAll?.(true)}catch(e){}
  try{window.B7LiveStatusCore?.drawTool?.()}catch(e){}
}
function initSync(){
  try{
    if('BroadcastChannel'in window){
      bc=new BroadcastChannel(CHANNEL);
      bc.onmessage=e=>{
        const d=e.data||{};
        if(d.type==='request'&&!viewerOnly())publishSnapshot();
        if(d.type==='snapshot'&&viewerOnly())refreshViewerFromShared(d.snapshot);
      };
    }
  }catch(e){}
  window.addEventListener('storage',e=>{
    if(viewerOnly()&&(e.key===STATE_KEY||e.key===SNAP_KEY))refreshViewerFromShared(e.key===SNAP_KEY?readSnapshot():null);
  });
  if(viewerOnly()){
    refreshViewerFromShared();
    try{bc?.postMessage({type:'request'})}catch(e){}
  }else publishSnapshot();
}

function activeQuarter(){
  try{if(typeof window.B7ActiveQuarter==='function')return window.B7ActiveQuarter()}catch(e){}
  const d=new Date(),q=Math.floor(d.getMonth()/3)+1;return `CY${String(d.getFullYear()).slice(-2)}Q${q}`;
}
function ensureOpsPageActions(){
  const bar=$('#floatingActions');if(!bar)return;
  bar.style.display='flex';
  bar.innerHTML='<span id="v825CurrentSystem" class="v825-current-system">CURRENT SYSTEM: —</span>'+
    '<button type="button" id="v825Screenshot" class="btn v825-page-action">SCREENSHOT</button>'+
    '<button type="button" id="v825Report" class="btn v825-page-action">REPORT</button>';
  $('#v825Screenshot').onclick=()=>{
    try{window.B7LiveStatusCore?.setPaused?.(true)}catch(e){}
    try{if(typeof window.enterScreenshot==='function')window.enterScreenshot();else{document.body.classList.add('screenshot-mode');const x=$('#screenshotExit');if(x)x.style.display='block'}}catch(e){}
  };
  $('#v825Report').onclick=()=>window.print();
  updateCurrentSystem();
}
function updateCurrentSystem(){
  const el=$('#v825CurrentSystem');if(!el)return;
  let t=null;try{t=window.B7LiveStatusCore?.currentTool?.()}catch(e){}
  const id=t?.utid||t?.id||'—';el.textContent=`CURRENT SYSTEM: ${id}`;
}
function operationsMarkup(){
  let list=[];try{list=window.B7LiveStatusCore?.activeTools?.()||[]}catch(e){}
  let c={infi:0,packing:0,waiting:0,shipped:0};try{c=window.B7LiveStatusCore?.metricCounts?.(list)||c}catch(e){}
  return `<section class="v825-operations-live" aria-label="Operations Center live status">
    <div class="v825-quarter-strip"><strong>${activeQuarter()}</strong><span>LIVE OPERATIONS</span></div>
    <div class="v802-live-metrics">
      <div class="v802-live-metric"><span>Active Tools</span><b>${list.length}</b></div>
      <div class="v802-live-metric"><span>In FI</span><b>${c.infi}</b></div>
      <div class="v802-live-metric"><span>Packing</span><b>${c.packing}</b></div>
      <div class="v802-live-metric"><span>Waiting</span><b>${c.waiting}</b></div>
      <div class="v802-live-metric"><span>Shipped</span><b>${c.shipped}</b></div>
    </div>
    <div class="v802-carousel v825-operations-carousel"><div id="v802ToolHost"></div>
      <div class="v802-carousel-foot"><span><i class="v802-live-dot"></i>LIVE LOCAL DATA</span>
        <div class="v802-carousel-controls"><button id="v802Prev" title="Previous tool" aria-label="Previous tool">◀</button><button id="v802Pause" title="Pause rotation">PAUSE</button><button id="v802Next" title="Next tool" aria-label="Next tool">▶</button></div><b id="v802Counter"></b>
      </div>
    </div>
  </section>`;
}
function wireOperationsCarousel(){
  const core=window.B7LiveStatusCore;if(!core)return;
  $('#v802Prev')?.addEventListener('click',()=>{core.previous?.();updateCurrentSystem()});
  $('#v802Next')?.addEventListener('click',()=>{core.next?.();updateCurrentSystem()});
  $('#v802Pause')?.addEventListener('click',e=>{const paused=core.togglePause?.();e.currentTarget.textContent=paused?'RESUME':'PAUSE'});
  core.drawTool?.();core.schedule?.();updateCurrentSystem();
}
function renderOperations(){
  /* Let the legacy route perform its normal Center bookkeeping, then replace only the page body. */
  try{priorSetView?.call(window,'home')}catch(e){}
  document.body.classList.remove('v802-live-status','v801-live-status');
  document.body.classList.add('v825-operations-dashboard');
  document.body.dataset.center='home';
  const title=$('#headerPageTitle');if(title)title.textContent='OPERATIONS CENTER';
  $$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='home'));
  try{window.B7StatusEngine820?.mount?.();window.B7StatusEngine820?.refreshAll?.(true)}catch(e){}
  const app=$('#app');if(app){app.innerHTML=operationsMarkup();app.dataset.rendered='true'}
  ensureOpsPageActions();wireOperationsCarousel();setVersion();publishSnapshot();
}
function leaveOperations(){
  if(!document.body.classList.contains('v825-operations-dashboard'))return;
  document.body.classList.remove('v825-operations-dashboard');
  try{window.B7LiveStatusCore?.stopTimer?.()}catch(e){}
}
window.setView=function(v){
  const key=String(v||'').toLowerCase();
  if(key==='home'||key==='operations'||key==='operationscenter'){renderOperations();return}
  leaveOperations();
  const out=priorSetView?priorSetView.call(window,v):undefined;
  setTimeout(()=>{setVersion();publishSnapshot()},0);
  return out;
};

document.addEventListener('b7fi:live-tool-change',()=>updateCurrentSystem());
/* Save is the one authoritative point for publishing changed data to viewer tabs. */
if(typeof window.save==='function'){
  const oldSave=window.save;
  window.save=function(){const r=oldSave.apply(this,arguments);queueMicrotask(()=>{publishSnapshot();if(viewerOnly())refreshViewerFromShared()});return r};
}
function startup(){
  setVersion();initSync();
  if(viewerOnly()){
    /* The viewer keeps the existing Live Status layout, but its data is always refreshed from the Command Center snapshot/state. */
    setTimeout(()=>refreshViewerFromShared(),60);
    setTimeout(()=>refreshViewerFromShared(),350);
  }else{
    setTimeout(()=>{if((document.body.dataset.center||'home')==='home')renderOperations();else publishSnapshot()},80);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0826.js ===== */
/* B7 FI Command Center v1.0.3 — Operations Center cleanup + contextual tool navigation.
   - Operations Center toolbar becomes contextual navigation, not generic Page Actions.
   - Current rotating system becomes a real navigation button that follows the carousel.
   - Remove visible alert queue diagnostics from normal Action Center use.
   - Put active quarter on the Active Tools card; remove redundant CYxxQx / LIVE OPERATIONS strip.
*/
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';

function setVersion(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function activeQuarter(){
  try{if(typeof window.B7ActiveQuarter==='function')return window.B7ActiveQuarter()}catch(e){}
  const d=new Date(),q=Math.floor(d.getMonth()/3)+1;return `CY${String(d.getFullYear()).slice(-2)}Q${q}`;
}
function currentTool(){try{return window.B7LiveStatusCore?.currentTool?.()||null}catch(e){return null}}
function currentId(){const t=currentTool();return t?.utid||t?.id||'—'}
function openCurrentTool(){
  const t=currentTool();if(!t)return;
  try{
    if(typeof window.B7LiveStatusCore?.openToolModal==='function'){
      window.B7LiveStatusCore.openToolModal(t);return;
    }
  }catch(e){}
  /* Fallback: go to Tool Center and select/edit this system if the legacy app exposes that route. */
  try{window.setView?.('toolcenter')}catch(e){}
}
function styleOperationsToolbar(){
  if(document.body.dataset.center!=='home')return;
  const bar=$('#floatingActions');if(!bar)return;
  bar.classList.add('v826-operations-toolbar');
  let btn=$('#v826OpenCurrentTool');
  if(!btn){
    btn=document.createElement('button');
    btn.type='button';btn.id='v826OpenCurrentTool';btn.className='btn v826-current-tool-btn';
    btn.addEventListener('click',openCurrentTool);
    bar.prepend(btn);
  }
  btn.textContent=`OPEN TOOL ${currentId()}`;
  /* Remove the old non-interactive label from v1.0.1 if it is still present. */
  $('#v825CurrentSystem')?.remove();
  /* Keep screenshot/report controls, but the toolbar is now contextual navigation, not PAGE ACTIONS. */
  const shot=$('#v825Screenshot'),report=$('#v825Report');
  if(shot)shot.classList.add('v826-context-action');
  if(report)report.classList.add('v826-context-action');
}
function updateOpsLabels(){
  if(document.body.dataset.center!=='home')return;
  styleOperationsToolbar();
  const metrics=$$('.v825-operations-live .v802-live-metric');
  if(metrics[0]){
    const s=metrics[0].querySelector('span');if(s)s.textContent=`${activeQuarter()} ACTIVE TOOLS`;
  }
  $('.v825-quarter-strip')?.remove();
}
function removeDiagnostics(){
  ['#v817QueueDiag','#v819QueueDiag','#b7xQueueDiag','.v819-queue-diag','.v817-queue-diag','.b7x-queue-diag'].forEach(sel=>$$ (sel).forEach(el=>el.remove()));
  /* Defensive cleanup for duplicated diagnostic rows inserted after the summary grid. */
  $$('.action-summary-grid + div').forEach(el=>{
    if(/ACTIVE LEAD ALERTS\s*:/i.test(el.textContent||''))el.remove();
  });
}
function afterRender(){
  setVersion();removeDiagnostics();
  if(document.body.dataset.center==='home')updateOpsLabels();
}

/* Keep the dynamic tool button synchronized with the rotating carousel. */
document.addEventListener('b7fi:live-tool-change',()=>{
  if(document.body.dataset.center==='home')styleOperationsToolbar();
});

/* Wrap the latest setView without replacing the v1.0.1 Operations implementation. */
const prevSetView=window.setView;
if(typeof prevSetView==='function'){
  window.setView=function(v){
    const r=prevSetView.apply(this,arguments);
    setTimeout(afterRender,0);setTimeout(afterRender,80);
    return r;
  };
}

/* Re-run after the Operations Center's own delayed startup render. */
function startup(){
  setVersion();
  setTimeout(afterRender,100);
  setTimeout(afterRender,450);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0827.js ===== */
/* B7 FI Command Center v1.0.3 — quarter-aware Operations + compact Live Status parity. */
(function(){
'use strict';
const VERSION='1.0.3',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
function quarter(){try{if(typeof window.B7ActiveQuarter==='function')return window.B7ActiveQuarter()}catch(e){} const d=new Date(),q=Math.floor(d.getMonth()/3)+1;return `CY${String(d.getFullYear()).slice(-2)}Q${q}`}
function setVersion(){window.VERSION=VERSION;document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function counts(){let list=[];try{list=window.B7LiveStatusCore?.activeTools?.()||[]}catch(e){};let c={infi:0,packing:0,waiting:0,shipped:0};try{c=window.B7LiveStatusCore?.metricCounts?.(list)||c}catch(e){};return {list,c,pct:list.length?Math.round((Number(c.shipped)||0)/list.length*100):0}}
function progress(){const {pct}=counts();return `<div class="v827-quarter-progress"><div><span>Current Quarter Shipping Progress</span><b>${pct}% Shipped</b></div><div class="v827-progress-track"><i style="width:${pct}%"></i></div></div>`}
function tuneMetrics(root=document){const metrics=$$('.v802-live-metrics .v802-live-metric',root);if(metrics[0]){const s=metrics[0].querySelector('span');if(s)s.textContent=`${quarter()} TOOLS`} const grid=root.querySelector?.('.v802-live-metrics');if(grid&&!grid.nextElementSibling?.classList?.contains('v827-quarter-progress'))grid.insertAdjacentHTML('afterend',progress())}
function tuneTool(root=document){$$('.v802-tool-kicker',root).forEach(x=>x.remove())}
function tuneControl(root=document){const foot=root.querySelector?.('.v802-carousel-foot');if(!foot||foot.querySelector('.v827-control-brand'))return;const controls=foot.querySelector('.v802-carousel-controls');if(controls){const brand=document.createElement('img');brand.className='v827-control-brand';brand.src='assets/kla-plus-official.png';brand.alt='KLA+';controls.before(brand)}}
function tuneLive(){if(!document.body.classList.contains('v802-live-status'))return;const shell=$('.v803-live-shell');if(!shell)return;$('.v802-live-top',shell)?.remove();tuneMetrics(shell);tuneTool(shell);tuneControl(shell)}
function tuneOperations(){if(document.body.dataset.center!=='home')return;const title=$('#headerPageTitle');if(title)title.textContent=`OPERATIONS CENTER — ${quarter()}`;const root=$('.v825-operations-live');if(!root)return;tuneMetrics(root);tuneTool(root)}
function apply(){setVersion();tuneLive();tuneOperations()}
const prev=window.setView;if(typeof prev==='function')window.setView=function(){const r=prev.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,100);return r};
document.addEventListener('b7fi:live-tool-change',()=>{setTimeout(()=>{tuneTool();tuneControl();},0)});
function startup(){setVersion();setTimeout(apply,120);setTimeout(apply,500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0828.js ===== */
/* B7 FI Command Center v1.0.3 — finalize Operations + standalone Live Status parity.
   - Standalone viewer receives the compact quarter/progress/control-rail design.
   - Operations toolbar positions are deterministic after refresh/render.
   - Operations carousel removes redundant KLA system image; footer/header already brand the Command Center.
   - Dedicated Live Status retains one KLA+ mark in the control rail only.
*/
(function(){
'use strict';
const VERSION='1.0.3',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
function quarter(){try{if(typeof window.B7ActiveQuarter==='function')return window.B7ActiveQuarter()}catch(e){}const d=new Date(),q=Math.floor(d.getMonth()/3)+1;return `CY${String(d.getFullYear()).slice(-2)}Q${q}`}
function setVersion(){window.VERSION=VERSION;document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function dataCounts(){let list=[];try{list=window.B7LiveStatusCore?.activeTools?.()||[]}catch(e){}let c={infi:0,packing:0,waiting:0,shipped:0};try{c=window.B7LiveStatusCore?.metricCounts?.(list)||c}catch(e){};const pct=list.length?Math.round((Number(c.shipped)||0)/list.length*100):0;return {list,c,pct}}
function progressMarkup(){const {pct}=dataCounts();return `<div class="v828-quarter-progress"><div class="v828-quarter-progress-head"><span>Current Quarter Shipping Progress</span><b>${pct}% Shipped</b></div><div class="v828-progress-track"><i style="width:${pct}%"></i></div></div>`}
function normalizeMetrics(root){const metrics=$$('.v802-live-metrics .v802-live-metric',root);if(metrics[0]){const label=metrics[0].querySelector('span');if(label)label.textContent=`${quarter()} TOOLS`}const grid=$('.v802-live-metrics',root);if(grid){const old=grid.nextElementSibling;if(old?.classList?.contains('v827-quarter-progress')||old?.classList?.contains('v828-quarter-progress'))old.remove();grid.insertAdjacentHTML('afterend',progressMarkup())}}
function removeKicker(root){$$('.v802-tool-kicker',root).forEach(n=>n.remove())}
function ensureViewerControlBrand(root){if(!viewerOnly()&&!document.body.classList.contains('v802-live-status'))return;const foot=$('.v802-carousel-foot',root);if(!foot)return;$$('.v827-control-brand,.v828-control-brand',foot).forEach(n=>n.remove());const controls=$('.v802-carousel-controls',foot);if(!controls)return;const img=document.createElement('img');img.className='v828-control-brand';img.src='assets/kla-plus-official.png';img.alt='KLA+';controls.before(img)}
function compactStandalone(){if(!document.body.classList.contains('v802-live-status'))return;const shell=$('.v803-live-shell');if(!shell)return;$('.v802-live-top',shell)?.remove();normalizeMetrics(shell);removeKicker(shell);ensureViewerControlBrand(shell)}
function lockOperationsToolbar(){if(document.body.dataset.center!=='home')return;const bar=$('#floatingActions');if(!bar)return;bar.classList.add('v828-ops-toolbar-lock');const open=$('#v826OpenCurrentTool');const shot=$('#v825Screenshot');const report=$('#v825Report');if(open){open.style.gridColumn='1';open.style.justifySelf='start'}if(shot){shot.style.gridColumn='2';shot.style.justifySelf='end'}if(report){report.style.gridColumn='3';report.style.justifySelf='end'}}
function finalizeOperations(){if(document.body.dataset.center!=='home')return;const title=$('#headerPageTitle');if(title)title.textContent=`OPERATIONS CENTER — ${quarter()}`;const root=$('.v825-operations-live');if(!root)return;normalizeMetrics(root);removeKicker(root);lockOperationsToolbar();document.body.classList.add('v828-operations-final')}
function apply(){setVersion();compactStandalone();finalizeOperations()}
const prior=window.setView;if(typeof prior==='function')window.setView=function(){const r=prior.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,120);return r};
document.addEventListener('b7fi:live-tool-change',()=>{setTimeout(()=>{if(document.body.dataset.center==='home')lockOperationsToolbar();if(document.body.classList.contains('v802-live-status')){removeKicker();ensureViewerControlBrand(document)}},0)});
function startup(){setVersion();setTimeout(apply,80);setTimeout(apply,350);setTimeout(apply,900)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0829.js ===== */
/* B7 FI Command Center v1.0.3 — Operations / Live Status final cleanup.
   - Exactly one Current Quarter Shipping Progress rail in each live view.
   - Standalone viewer removes redundant large KLA tool-card artwork.
   - Standalone bottom rail: KLA+ mathematically centered; carousel controls anchored right.
   - Preserve deterministic Operations toolbar and compact one-screen viewer behavior.
*/
(function(){
'use strict';
const VERSION='1.0.3',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
function quarter(){try{if(typeof window.B7ActiveQuarter==='function')return window.B7ActiveQuarter()}catch(e){}const d=new Date(),q=Math.floor(d.getMonth()/3)+1;return `CY${String(d.getFullYear()).slice(-2)}Q${q}`}
function counts(){let list=[];try{list=window.B7LiveStatusCore?.activeTools?.()||[]}catch(e){}let c={infi:0,packing:0,waiting:0,shipped:0};try{c=window.B7LiveStatusCore?.metricCounts?.(list)||c}catch(e){}return {list,c,pct:list.length?Math.round((Number(c.shipped)||0)/list.length*100):0}}
function progressMarkup(){const {pct}=counts();return `<div class="v829-quarter-progress"><div class="v829-quarter-progress-head"><span>Current Quarter Shipping Progress</span><b>${pct}% Shipped</b></div><div class="v829-progress-track"><i style="width:${pct}%"></i></div></div>`}
function setVersion(){window.VERSION=VERSION;document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function normalizeLiveSummary(root){if(!root)return;const metrics=$$('.v802-live-metrics .v802-live-metric',root);if(metrics[0]){const label=$('span',metrics[0]);if(label)label.textContent=`${quarter()} TOOLS`}
  // Remove every progress rail injected by the prior parity/finalization patches, then add exactly one.
  $$('.v827-quarter-progress,.v828-quarter-progress,.v829-quarter-progress',root).forEach(n=>n.remove());
  const grid=$('.v802-live-metrics',root);if(grid)grid.insertAdjacentHTML('afterend',progressMarkup());
}
function removeKicker(root){$$('.v802-tool-kicker',root||document).forEach(n=>n.remove())}
function ensureStandaloneBrand(root){if(!document.body.classList.contains('v802-live-status'))return;const foot=$('.v802-carousel-foot',root||document);if(!foot)return;$$('.v827-control-brand,.v828-control-brand,.v829-control-brand',foot).forEach(n=>n.remove());const brand=document.createElement('img');brand.className='v829-control-brand';brand.src='assets/kla-plus-official.png';brand.alt='KLA+';foot.appendChild(brand)}
function finalizeStandalone(){if(!document.body.classList.contains('v802-live-status'))return;const shell=$('.v803-live-shell');if(!shell)return;$('.v802-live-top',shell)?.remove();normalizeLiveSummary(shell);removeKicker(shell);ensureStandaloneBrand(shell);document.body.classList.add('v829-live-final')}
function lockOpsToolbar(){if(document.body.dataset.center!=='home')return;const bar=$('#floatingActions');if(!bar)return;bar.classList.add('v828-ops-toolbar-lock','v829-ops-toolbar-lock');const open=$('#v826OpenCurrentTool'),shot=$('#v825Screenshot'),report=$('#v825Report');if(open){open.style.gridColumn='1';open.style.justifySelf='start'}if(shot){shot.style.gridColumn='2';shot.style.justifySelf='end'}if(report){report.style.gridColumn='3';report.style.justifySelf='end'}}
function finalizeOperations(){if(document.body.dataset.center!=='home')return;const title=$('#headerPageTitle');if(title)title.textContent=`OPERATIONS CENTER — ${quarter()}`;const root=$('.v825-operations-live');if(!root)return;normalizeLiveSummary(root);removeKicker(root);lockOpsToolbar();document.body.classList.add('v828-operations-final','v829-operations-final')}
function apply(){setVersion();finalizeStandalone();finalizeOperations()}
const prior=window.setView;if(typeof prior==='function')window.setView=function(){const r=prior.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,120);return r};
document.addEventListener('b7fi:live-tool-change',()=>setTimeout(()=>{if(document.body.dataset.center==='home')lockOpsToolbar();if(document.body.classList.contains('v802-live-status')){removeKicker();ensureStandaloneBrand(document)}},0));
function startup(){setVersion();setTimeout(apply,60);setTimeout(apply,280);setTimeout(apply,700)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0830.js ===== */
/* B7 FI Command Center v1.0.3 — tool-photo bay + final live spacing support. */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function setVersion(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const label=$('#appVersionLabel');
  if(label) label.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function normalizePhotoBay(root=document){
  $$('.v802-tool-visual',root).forEach(visual=>{
    const img=$('img',visual);
    if(!img)return;
    const src=String(img.getAttribute('src')||img.src||'').toLowerCase();
    const fallback=src.includes('kla-plus-official.png');
    visual.classList.toggle('v830-photo-fallback',fallback);
    let ph=$('.v830-tool-photo-placeholder',visual);
    if(fallback){
      if(!ph){ph=document.createElement('div');ph.className='v830-tool-photo-placeholder';ph.textContent='TOOL PHOTO';visual.appendChild(ph)}
    }else if(ph){ph.remove()}
  });
}
function apply(){setVersion();normalizePhotoBay()}
const prior=window.setView;
if(typeof prior==='function') window.setView=function(){const r=prior.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,120);return r};
document.addEventListener('b7fi:live-tool-change',()=>setTimeout(()=>normalizePhotoBay(),0));
function startup(){apply();setTimeout(apply,80);setTimeout(apply,300)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0831.js ===== */
/* B7 FI Command Center v1.0.3 — final Live Status parity/version lock. */
(function(){'use strict';const VERSION=window.B7_APP_VERSION||'1.0.3';
function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function stamp(){window.VERSION=VERSION;document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=document.querySelector('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
const old=window.setView;if(typeof old==='function')window.setView=function(){const r=old.apply(this,arguments);setTimeout(stamp,0);setTimeout(stamp,150);return r};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{stamp();setTimeout(stamp,250)},{once:true});else{stamp();setTimeout(stamp,250)}
})();


/* ===== SOURCE: js/patch-v0832.js ===== */
/* B7 FI Command Center v1.0.3 — final Operations/Live Status edge + toolbar lock. */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s);
function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function stamp(){
  window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel'); if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function lockOperationsToolbar(){
  if(document.body?.dataset?.center!=='home')return;
  const bar=$('#floatingActions'); if(!bar)return;
  bar.classList.add('v832-page-nav-lock');
  const open=$('#v826OpenCurrentTool',bar), shot=$('#v825Screenshot',bar), report=$('#v825Report',bar);
  if(open){open.style.setProperty('order','1','important');open.style.setProperty('margin-right','auto','important');open.style.setProperty('margin-left','0','important')}
  if(shot){shot.style.setProperty('order','90','important');shot.style.setProperty('margin-left','0','important')}
  if(report){report.style.setProperty('order','91','important');report.style.setProperty('margin-left','0','important')}
}
function apply(){stamp();lockOperationsToolbar()}
const prior=window.setView;
if(typeof prior==='function')window.setView=function(){const r=prior.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,120);return r};
document.addEventListener('b7fi:live-tool-change',()=>setTimeout(lockOperationsToolbar,0));
function startup(){apply();setTimeout(apply,100);setTimeout(apply,350)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0833.js ===== */
/* B7 FI Command Center v1.0.3 — single-version boot + Tool Center page-navigation standardization. */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const label=b=>(b?.textContent||'').trim().replace(/\s+/g,' ').toUpperCase();
function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function stamp(){
  window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
  const wanted=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  if(document.title!==wanted)document.title=wanted;
  const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function quarter(){
  const q=$$('#floatingActions button').map(label).map(t=>(t.match(/CY\d{2}Q[1-4]/)||[])[0]).find(Boolean);
  if(q)return q;
  const h=$('#headerPageTitle');const m=(h?.textContent||'').match(/CY\d{2}Q[1-4]/i);return m?m[0].toUpperCase():'CY26Q3';
}
function ensureButton(bar,text,kind,handler,id){
  let b=$$(':scope > button',bar).find(x=>label(x)===text.toUpperCase());
  if(!b){b=document.createElement('button');b.type='button';b.className='btn';b.textContent=text;if(id)b.id=id;b.onclick=handler;bar.appendChild(b)}
  b.dataset.v833Kind=kind;return b;
}
function isToolCenter(){return (document.body?.dataset?.center||'')==='tool'}
function detectToolState(bar){
  const labs=$$(':scope > button',bar).map(label);const appText=($('#app')?.textContent||'').toUpperCase();
  if(labs.some(x=>x==='SAVE TOOL'||x==='DELETE TOOL')||/EDITING TOOL/.test(appText))return 'edit-tool';
  if(labs.some(x=>x==='SAVE CHANGES')&&/SHIPPING COUNTDOWN ADMIN|PLAN CHANGE WORKFLOW/.test(appText))return 'countdown-edit';
  if(/TOOL STATUS/.test(appText)||labs.some(x=>x==='EDIT THIS TOOL'||x==='CUSTOMER REQUIREMENTS'))return 'tool-detail';
  if(labs.some(x=>x==='TOOL ARCHIVE'&&$$(':scope > button',bar).find(b=>label(b)==='TOOL ARCHIVE')?.classList.contains('primary'))||/NO ARCHIVED TOOLS|TOOL ARCHIVE/.test(appText)&&!labs.some(x=>/^CY\d{2}Q[1-4] TOOLS$/.test(x)&&$$(':scope > button',bar).find(b=>label(b)===x)?.classList.contains('primary')))return 'archive';
  return 'tool-list';
}
function screenshot(){try{if(typeof window.enterScreenshot==='function')return window.enterScreenshot()}catch(e){}window.print()}
function report(){window.print()}
function toolIdFromPage(){const h=$('#headerPageTitle');return ((h?.textContent||'').match(/\b\d{6,8}\b/)||[])[0]||((($('#app')?.textContent||'').match(/EDITING TOOL\s*(\d{6,8})/i)||[])[1]||'')}
function normalizeToolToolbar(){
  if(!isToolCenter())return;
  const bar=$('#floatingActions');if(!bar)return;
  bar.classList.add('v833-tool-toolbar');
  const state=detectToolState(bar),q=quarter();
  // Clean legacy labels but retain their bound handlers.
  $$(':scope > button',bar).forEach(b=>{if(label(b)==='SCREENSHOT MODE')b.textContent='SCREENSHOT';b.dataset.v833Kind=''});
  let buttons=$$(':scope > button',bar);
  if(state==='tool-list'||state==='archive'){
    // Main Tool Center destinations are always the fixed left group.
    buttons.forEach(b=>{if(new RegExp(`^${q} TOOLS$`).test(label(b))||label(b)==='TOOL ARCHIVE')b.dataset.v833Kind='nav'});
    ensureButton(bar,'SCREENSHOT','action',screenshot,'v833ToolScreenshot');
    ensureButton(bar,'REPORT','action',report,'v833ToolReport');
  }else if(state==='countdown-edit'){
    ensureButton(bar,`← BACK TO ${q} TOOLS`,'nav',()=>window.setView?.('countdown'),'v833BackCountdown');
  }else if(state==='tool-detail'){
    let back=buttons.find(b=>/BACK TO TOOLS|BACK TO .*TOOLS/.test(label(b)));
    if(back){back.textContent=`← BACK TO ${q} TOOLS`;back.dataset.v833Kind='nav'}
    else ensureButton(bar,`← BACK TO ${q} TOOLS`,'nav',()=>window.setView?.('systems'),'v833BackTools');
    ensureButton(bar,'SCREENSHOT','action',screenshot,'v833ToolScreenshot');
    ensureButton(bar,'REPORT','action',report,'v833ToolReport');
  }else if(state==='edit-tool'){
    const id=toolIdFromPage();
    if(id)ensureButton(bar,`← BACK TO TOOL ${id}`,'nav',()=>{try{window.toolStatus?.(id)}catch(e){}},'v833BackTool');
  }
  buttons=$$(':scope > button',bar);
  // Classify every control by meaning. Navigation always left; every page action always right.
  buttons.forEach(b=>{
    const t=label(b);b.classList.remove('v833-page-nav','v833-page-action','v833-first-action');
    let nav=b.dataset.v833Kind==='nav'||/^← BACK TO /.test(t)||/^CY\d{2}Q[1-4] TOOLS$/.test(t)||t==='TOOL ARCHIVE';
    if(/^(EDIT|SAVE|DELETE|CANCEL|SCREENSHOT|REPORT|CUSTOMER REQUIREMENTS|ADD|UPDATE)/.test(t))nav=false;
    b.classList.add(nav?'v833-page-nav':'v833-page-action');
  });
  const all=$$(':scope > button',bar),nav=all.filter(b=>b.classList.contains('v833-page-nav')),acts=all.filter(b=>b.classList.contains('v833-page-action'));
  const shot=acts.find(b=>label(b)==='SCREENSHOT'),rep=acts.find(b=>label(b)==='REPORT');
  const other=acts.filter(b=>b!==shot&&b!==rep);
  [...nav,...other,shot,rep].filter(Boolean).forEach(b=>bar.appendChild(b));
  const first=other[0]||shot||rep;if(first)first.classList.add('v833-first-action');
  // Normalize Tool Center title for quarter-scoped list/archive/countdown screens.
  const h=$('#headerPageTitle');if(h&&(state==='tool-list'||state==='archive'||state==='countdown-edit'))h.textContent=`TOOL CENTER — ${q}`;
  if(h&&state==='edit-tool'){const id=toolIdFromPage();if(id)h.textContent=`TOOL ${id} — EDIT`}
}
function apply(){stamp();normalizeToolToolbar()}
// Wrap the final router; v1.0.1 always normalizes after all legacy renderers have completed.
const prior=window.setView;if(typeof prior==='function')window.setView=function(){const r=prior.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,90);return r};
// Tool subpages can rerender the toolbar without setView. Observe child replacement only;
// class/style changes do not retrigger this observer, avoiding the historical observer loops.
const startObserver=()=>{const bar=$('#floatingActions');if(!bar||bar.dataset.v833Observed)return;bar.dataset.v833Observed='1';let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;apply()})}).observe(bar,{childList:true})};
function startup(){apply();startObserver();setTimeout(apply,100);setTimeout(apply,320)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0834.js ===== */
/* B7 FI Command Center v1.0.3 — conditional Customer Source / STR mini progress bars on shared live tool cards. */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function stamp(){
  window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function normRequired(v){const s=String(v??'TBD').trim().toLowerCase();if(s==='yes'||s==='required')return'yes';if(s==='no'||s==='not required'||s==='n/a'||s==='na')return'no';return'tbd'}
function sourcePct(status){
  const s=String(status||'Not Started').trim().toLowerCase();
  const map={
    'not started':0,'preparing':15,'pre-source in progress':35,'ready for ca':55,
    'with ca team':72,'source complete':90,'returned to fi':100,'complete':100,'completed':100
  };return map[s]??0;
}
function strPct(status){
  const s=String(status||'Not Started').trim().toLowerCase();
  const map={
    'not started':0,'requirements pending':10,'requirements received':25,'testing':55,
    'submitted to ca':75,'customer approval pending':90,'complete':100,'completed':100
  };return map[s]??0;
}
function displayState(required,status){
  const req=normRequired(required);
  if(req==='no')return{req,state:'NOT REQUIRED',pct:null,active:false};
  if(req==='tbd')return{req,state:'TBD',pct:null,active:false};
  const st=String(status||'Not Started').trim()||'Not Started';
  return{req,state:st.toUpperCase(),pct:0,active:true};
}
function miniRow(label,required,status,pctFn,tone){
  const d=displayState(required,status);if(d.active)d.pct=pctFn(status);
  return `<div class="v834-mini-req ${tone} ${d.active?'active':'inactive'}"><div class="v834-mini-req-head"><span>${esc(label)}</span><b>${esc(d.state)}${d.active?` · ${Math.round(d.pct)}%`:''}</b></div>${d.active?`<div class="v834-mini-req-track"><i style="width:${Math.max(0,Math.min(100,d.pct))}%"></i></div>`:''}</div>`;
}
function renderRequirements(t){
  return `<div class="v834-mini-requirements" aria-label="Conditional special requirements">${miniRow('CUSTOMER SOURCE',t?.sourceRequired,t?.sourceStatus,sourcePct,'source')}${miniRow('STR',t?.strRequired,t?.strStatus,strPct,'str')}</div>`;
}
function applyTool(t){
  const host=$('#v802ToolHost');if(!host||!t)return;
  const identity=$('.v805-tool-identity',host);if(!identity)return;
  $$('.v834-mini-requirements',host).forEach(x=>x.remove());
  const old=$('.v807-requirements',host);if(old)old.remove();
  identity.insertAdjacentHTML('beforeend',renderRequirements(t));
}
function currentTool(){try{return window.B7LiveStatusCore?.currentTool?.()||null}catch(e){return null}}
function apply(){stamp();const t=currentTool();if(t)applyTool(t)}
document.addEventListener('b7fi:live-tool-change',e=>{const t=e.detail?.tool||currentTool();requestAnimationFrame(()=>{stamp();if(t)applyTool(t)})});
const prior=window.setView;if(typeof prior==='function')window.setView=function(){const r=prior.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,100);return r};
function startup(){stamp();setTimeout(apply,80);setTimeout(apply,320)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0835.js ===== */
/* B7 FI Command Center v1.0.3 — live-card plan-change indicator + Operations editable tool navigation.
   - Shows latest ship-plan exception next to UTID/model only when a change exists.
   - Pull In / Push Out / ship-date-only changes derive from countdown plan-change history.
   - Operations carousel opens the actual Tool Detail page; standalone Live Status remains read-only.
*/
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const viewerOnly=()=>document.body?.dataset?.liveViewerOnly==='true';
function stamp(){
  window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
  document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function currentTool(){try{return window.B7LiveStatusCore?.currentTool?.()||null}catch(e){return null}}
function fmtDate(v){
  if(!v)return''; const s=String(v).trim();
  const m=s.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!m)return s;
  try{return new Date(Number(m[1]),Number(m[2])-1,Number(m[3])).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}catch(e){return s}
}
function splitPlanValue(v){
  const a=String(v||'').split('·').map(x=>x.trim());return{date:a[0]||'',quarter:a[1]||''};
}
function quarterFromShip(v){
  const m=String(v||'').match(/^(\d{4})-(\d{2})/);if(!m)return'';
  return `CY${String(m[1]).slice(-2)}Q${Math.floor((Number(m[2])-1)/3)+1}`;
}
function latestPlanChange(t){
  if(!t)return null;
  const hist=Array.isArray(t.changeHistory)?t.changeHistory:[];
  const h=hist.find(x=>/MFG Ship\s*\/\s*Quarter|Ship Date|Quarter/i.test(String(x.field||'')) && String(x.oldValue??'')!==String(x.newValue??''));
  if(h){
    const old=splitPlanValue(h.oldValue), neu=splitPlanValue(h.newValue);
    const type=String(h.type||'').toUpperCase();
    if(type.includes('PULL'))return{kind:'pull',title:`PULLED INTO ${neu.quarter||t.quarter||quarterFromShip(t.ship)||'CURRENT QUARTER'}`,detail:[old.quarter,neu.quarter].filter(Boolean).join(' → ')||`${fmtDate(old.date)} → ${fmtDate(neu.date)}`};
    if(type.includes('PUSH'))return{kind:'push',title:`PUSHED OUT${neu.quarter?` TO ${neu.quarter}`:''}`,detail:[old.quarter,neu.quarter].filter(Boolean).join(' → ')||`${fmtDate(old.date)} → ${fmtDate(neu.date)}`};
    if(old.date&&neu.date&&old.date!==neu.date)return{kind:'date',title:'SHIP DATE CHANGED',detail:`${fmtDate(old.date)} → ${fmtDate(neu.date)}`};
    if(old.quarter&&neu.quarter&&old.quarter!==neu.quarter)return{kind:'date',title:'QUARTER CHANGED',detail:`${old.quarter} → ${neu.quarter}`};
  }
  const origShip=t.originalShip||'', curShip=t.ship||t.shipDate||'';
  const oq=t.originalQuarter||quarterFromShip(origShip), cq=t.quarter||quarterFromShip(curShip);
  if(oq&&cq&&oq!==cq){
    return{kind:'date',title:'PLAN CHANGED',detail:`${oq} → ${cq}`};
  }
  if(origShip&&curShip&&origShip!==curShip)return{kind:'date',title:'SHIP DATE CHANGED',detail:`${fmtDate(origShip)} → ${fmtDate(curShip)}`};
  return null;
}
function renderPlan(t){
  const p=latestPlanChange(t);if(!p)return'';
  return `<div class="v835-plan-change ${esc(p.kind)}"><span>PLAN CHANGE</span><b>${esc(p.title)}</b><small>${esc(p.detail)}</small></div>`;
}
function applyPlan(t){
  const host=$('#v802ToolHost');if(!host||!t)return;
  const identity=$('.v805-tool-identity',host);if(!identity)return;
  $$('.v835-plan-change',identity).forEach(x=>x.remove());
  const html=renderPlan(t);if(html)identity.insertAdjacentHTML('afterbegin',html);
}
function openOperationsTool(t){
  if(!t)return;const id=t.id||t.utid;if(!id)return;
  try{if(typeof toolStatus==='function'){toolStatus(String(id));return}}catch(e){}
  try{window.toolStatus?.(String(id));return}catch(e){}
  try{window.setView?.('toolcenter')}catch(e){}
}
function bindCard(t){
  const host=$('#v802ToolHost');const slide=$('.v802-tool-slide',host);if(!slide||!t)return;
  const hint=$('.v802-open-hint',slide);
  if(viewerOnly()){
    if(hint)hint.textContent='CLICK SYSTEM FOR READ-ONLY TOOL DETAIL';
    return; // preserve the existing read-only modal handler
  }
  if(document.body.dataset.center==='home'||document.body.classList.contains('v825-operations-dashboard')){
    if(hint)hint.textContent='CLICK SYSTEM TO OPEN TOOL DETAIL';
    slide.setAttribute('aria-label',`Open tool ${t.id||t.utid||''} detail`);
    slide.onclick=e=>{e.preventDefault();openOperationsTool(t)};
  }
}
function apply(t=currentTool()){stamp();if(!t)return;applyPlan(t);bindCard(t)}
document.addEventListener('b7fi:live-tool-change',e=>{const t=e.detail?.tool||currentTool();requestAnimationFrame(()=>apply(t))});
const priorSetView=window.setView;if(typeof priorSetView==='function')window.setView=function(){const r=priorSetView.apply(this,arguments);setTimeout(()=>apply(),0);setTimeout(()=>apply(),120);return r};
function startup(){stamp();setTimeout(()=>apply(),100);setTimeout(()=>apply(),360)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();


/* ===== SOURCE: js/patch-v0836.js ===== */
/* B7 FI Command Center v1.0.3 — canonical tool record + route persistence + center-to-tool editing */
(function(){
'use strict';
const VERSION='1.0.3', $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const x=$('#appVersionLabel');if(x)x.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function qFromDate(v){const m=String(v||'').match(/^(\d{4})-(\d{2})/);return m?`CY${m[1].slice(-2)}Q${Math.floor((+m[2]-1)/3)+1}`:''}
function remember(route){try{sessionStorage.setItem('b7.route',JSON.stringify(route));history.replaceState(route,'',location.pathname+'#'+encodeURIComponent(JSON.stringify(route)))}catch(e){}}
function parseRoute(){try{if(location.hash.length>2)return JSON.parse(decodeURIComponent(location.hash.slice(1)));return JSON.parse(sessionStorage.getItem('b7.route')||'null')}catch(e){return null}}
const _setView=window.setView; if(typeof _setView==='function') window.setView=function(v){remember({kind:'view',view:v});return _setView.apply(this,arguments)};
const _toolStatus=window.toolStatus; if(typeof _toolStatus==='function') window.toolStatus=function(id){remember({kind:'tool',id:String(id)});const r=_toolStatus.apply(this,arguments);document.body.dataset.theme='systems';return r};
const _toolAdmin=window.toolAdmin; if(typeof _toolAdmin==='function') window.toolAdmin=function(id,requestedTab){remember({kind:'editTool',id:id?String(id):'',tab:requestedTab||'basic'});const r=_toolAdmin.call(this,id);setTimeout(()=>enhanceToolEditor(id,requestedTab),0);return r};
function enhanceToolEditor(id,requestedTab){
  document.body.dataset.theme='systems';
  const t=(window.tools||[]).find(x=>String(x.id)===String(id||''));
  const tabs=$$('.admin-tab[data-tab]');
  if(requestedTab){const b=tabs.find(x=>x.dataset.tab===requestedTab);if(b)b.click()}
  if(!id)return;
  const info=tabs.find(x=>x.dataset.tab==='basic');if(info)info.textContent='Tool Information / Plan';
  function inject(){const body=$('#taBody');if(!body||!$('#ta-ship')||$('#v836Plan'))return;const ship=$('#ta-ship').value;const cur=t||(window.tools||[]).find(x=>String(x.id)===String(id));const oq=cur?.originalQuarter||cur?.quarter||qFromDate(cur?.originalShip||ship);const cq=cur?.quarter||qFromDate(ship);body.insertAdjacentHTML('beforeend',`<section id="v836Plan" class="panel v836-plan-editor"><h3>Quarter / Ship Plan</h3><p class="helper">This Tool record is the source of truth. Changes here feed Tool Countdown, Shipping Center, Operations and Live Status.</p><div class="form-grid"><div class="form-group"><label>Current Quarter</label><input id="v836Quarter" value="${esc(cq)}"></div><div class="form-group"><label>Plan Change Type</label><select id="v836Change"><option>No Change</option><option>Ship Date Change</option><option>Pull In</option><option>Push Out</option></select></div><div class="form-group"><label>Original Quarter</label><input value="${esc(oq)}" disabled></div><div class="form-group wide"><label>Plan Change Reason / Notes</label><textarea id="v836Reason"></textarea></div></div></section>`)}
  inject();tabs.forEach(b=>b.addEventListener('click',()=>setTimeout(inject,0)));
  const toolbar=$('#floatingActions'); if(toolbar)toolbar.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!/save tool/i.test(b.textContent))return;const vals={ship:$('#ta-ship')?.value||'',quarter:$('#v836Quarter')?.value||'',type:$('#v836Change')?.value||'No Change',reason:$('#v836Reason')?.value||''};setTimeout(()=>{const x=(window.tools||[]).find(z=>String(z.id)===String(id));if(!x)return;const oldShip=x.ship||'',oldQ=x.quarter||qFromDate(oldShip);if(vals.quarter)x.quarter=vals.quarter;if(vals.type!=='No Change'&&(oldShip!==vals.ship||oldQ!==vals.quarter)){x.originalShip=x.originalShip||oldShip;x.originalQuarter=x.originalQuarter||oldQ;x.changeHistory=x.changeHistory||[];x.changeHistory.unshift({field:'MFG Ship / Quarter',oldValue:`${oldShip} · ${oldQ}`,newValue:`${vals.ship} · ${vals.quarter}`,type:vals.type,reason:vals.reason,changedAt:new Date().toISOString()});}try{window.save?.()}catch(e){}},0)},true)
}
/* Countdown is a fast, read-only quarter list. Tool-specific changes go to the canonical Tool editor. */
window.countdown=function(){
  const list=(window.pageTools?window.pageTools('countdown'):(window.tools||[])).slice().sort((a,b)=>String(a.ship||'9').localeCompare(String(b.ship||'9')));
  try{window.setHeaderContext?.('TOOL CENTER',window.quarterLabel?.()||'CURRENT QUARTER')}catch(e){}
  window.app.innerHTML=`<div class="report-screen"><div class="panel"><div class="subsection-title"><div><h2>${esc(window.quarterLabel?.()||'CURRENT QUARTER')} TOOL COUNTDOWN</h2><p class="helper">Fast quarter view. Click any tool to open its master Tool page.</p></div></div><div class="table-wrap"><table class="report-table v836-countdown"><thead><tr><th>UTID</th><th>Tool / Model</th><th>Customer</th><th>Sales Order</th><th>MFG Ship Date</th><th>Quarter</th><th>Plan Change</th><th>Status</th></tr></thead><tbody>${list.map(t=>{const h=(t.changeHistory||[])[0];return `<tr data-v836-tool="${esc(t.id)}"><td><b>${esc(t.id)}</b></td><td>${esc(t.codename)} · ${esc(t.model)}</td><td>${esc(t.customer)}</td><td>${esc(t.so)}</td><td>${esc(t.ship||'—')}</td><td>${esc(t.quarter||qFromDate(t.ship)||'—')}</td><td>${h?`<span class="badge info">${esc(h.type||'CHANGED')}</span>`:'—'}</td><td>${esc(t.quarterStatus)}</td></tr>`}).join('')}</tbody></table></div></div></div>`;
  $$('[data-v836-tool]').forEach(r=>r.onclick=()=>window.toolStatus(r.dataset.v836Tool));
  try{window.actions?.([{label:'CY26Q3 Tools',fn:()=>window.setView('systems')},{label:'Tool Archive',fn:()=>window.setView('archive')},{label:'Add Tool',primary:true,fn:()=>window.toolAdmin()}],false)}catch(e){}
};
/* Shipping Center is generated from Tool records; Edit Schedule selects a tool then deep-links to its Shipping tab. */
const _shipping=window.shipping; window.shipping=function(){const r=_shipping.apply(this,arguments);setTimeout(()=>{try{window.actions?.([{label:'CY26Q3 Shipping',primary:true,fn:()=>window.setView('shipping')},{label:'Edit Tool Schedule',fn:()=>openSchedulePicker()},{label:'Screenshot',fn:()=>window.enterScreenshotMode?.()},{label:'Report',fn:()=>window.print?.()}],false)}catch(e){}},0);return r};
function openSchedulePicker(){const old=$('#v836Picker');if(old)old.remove();const list=(window.tools||[]).filter(t=>t.quarterStatus!=='Archive');document.body.insertAdjacentHTML('beforeend',`<div id="v836Picker" class="v836-modal"><div class="panel"><h2>Edit Tool Shipping Schedule</h2><p class="helper">Choose a tool. Its master Tool editor will open directly to Shipping.</p><select id="v836Pick">${list.map(t=>`<option value="${esc(t.id)}">${esc(t.id)} — ${esc(t.codename)} ${esc(t.model)} — ${esc(t.customer)}</option>`).join('')}</select><div class="actions"><button id="v836Cancel" class="btn">Cancel</button><button id="v836Open" class="btn primary">Open Tool Schedule</button></div></div></div>`);$('#v836Cancel').onclick=()=>$('#v836Picker').remove();$('#v836Open').onclick=()=>{const id=$('#v836Pick').value;$('#v836Picker').remove();window.toolAdmin(id,'shipping')}}
/* Morning quick-edit: add the three occasionally-changing master fields to the existing Morning admin grid. */
const _admin=window.admin;if(typeof _admin==='function')window.admin=function(section){const r=_admin.apply(this,arguments);if(section==='meeting')setTimeout(enhanceMorning,0);return r};
function enhanceMorning(){const table=$('.morning-v3-table');if(!table||table.dataset.v836)return;table.dataset.v836='1';const hr=table.tHead?.rows?.[0];if(hr){['Ship Date','Sales Order','Customer'].forEach(x=>{const th=document.createElement('th');th.textContent=x;hr.insertBefore(th,hr.lastElementChild)})}$$('tbody tr[data-m3]',table).forEach(row=>{const t=(window.tools||[]).find(x=>String(x.id)===row.dataset.m3);const nc=row.lastElementChild;[['date','m3-ship',t?.ship||''],['text','m3-so',t?.so||''],['text','m3-customer',t?.customer||'']].forEach(([type,cls,val])=>{const td=document.createElement('td');td.innerHTML=`<input type="${type}" class="${cls}" value="${esc(val)}">`;row.insertBefore(td,nc)})});const saveBtn=$('#m3Save');if(saveBtn)saveBtn.addEventListener('click',()=>{const vals=$$('tbody tr[data-m3]',table).map(r=>({id:r.dataset.m3,ship:r.querySelector('.m3-ship')?.value||'',so:r.querySelector('.m3-so')?.value||'',customer:r.querySelector('.m3-customer')?.value||''}));setTimeout(()=>{vals.forEach(v=>{const t=(window.tools||[]).find(x=>String(x.id)===v.id);if(t){t.ship=v.ship;t.so=v.so;t.customer=v.customer}});try{window.save?.()}catch(e){}},0)},true)}
function restore(){stamp();const r=parseRoute();if(!r)return;if(r.kind==='tool'&&r.id)return window.toolStatus(r.id);if(r.kind==='editTool')return window.toolAdmin(r.id||undefined,r.tab||'basic');if(r.kind==='view'&&r.view)return _setView.call(window,r.view)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(restore,80),{once:true});else setTimeout(restore,80);
stamp();
})();


/* ===== SOURCE: js/patch-v0837.js ===== */
/* B7 FI Command Center v1.0.3 — Tool Center canonical landing/detail workflow cleanup.
   Goals:
   - Restore Tool Center as the live-card/current-quarter dashboard.
   - Keep Tool Countdown as a separate quick-list page.
   - Make every tool link resolve to the same purple Tool Center detail page.
   - Make Tool Detail toolbar functional and deterministic.
   - Preserve the complete Tool editor as the source-of-truth editor.
   - Keep nav on the left and page actions on the right without legacy toolbar reordering.
*/
(function(){
'use strict';
const VERSION='1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const priorSetView=window.setView;
const priorToolStatus=window.toolStatus;
const priorToolAdmin=window.toolAdmin;
const quickCountdown=window.countdown;

window.B7_APP_VERSION=VERSION; window.VERSION=VERSION;
function stamp(){
  document.title=`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel'); if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function qLabel(){
  try{if(typeof quarterLabel==='function')return quarterLabel()}catch(e){}
  const counts={}; try{(tools||[]).forEach(t=>{if(t.quarter)counts[t.quarter]=(counts[t.quarter]||0)+1})}catch(e){}
  return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0]||'CY26Q3';
}
function remember(route){
  try{sessionStorage.setItem('b7.route',JSON.stringify(route));history.replaceState(route,'',location.pathname+'#'+encodeURIComponent(JSON.stringify(route)))}catch(e){}
}
function toolTheme(title){
  const b=document.body;
  /* toolfinal intentionally bypasses the old v1.0.1 toolbar observer. */
  b.dataset.center='toolfinal'; b.dataset.theme='toolcenter';
  document.documentElement.style.setProperty('--page-accent','#8b5cf6');
  document.documentElement.style.setProperty('--page-accent-rgb','139,92,246');
  document.documentElement.style.setProperty('--center-color','#8b5cf6');
  document.documentElement.style.setProperty('--center-rgb','139,92,246');
  b.style.setProperty('--page-accent','#8b5cf6');b.style.setProperty('--page-accent-rgb','139,92,246');
  $$('.main-nav .nav-btn').forEach(x=>x.classList.toggle('active',x.dataset.view==='toolcenter'));
  const h=$('#headerPageTitle');if(h)h.textContent=title||`TOOL CENTER — ${qLabel()}`;
}
function shot(){try{if(typeof window.enterScreenshotMode==='function')return window.enterScreenshotMode()}catch(e){}try{if(typeof window.enterScreenshot==='function')return window.enterScreenshot()}catch(e){}window.print()}
function report(){window.print()}
function btn(label,fn,primary=false,danger=false){const b=document.createElement('button');b.type='button';b.className=`btn${primary?' primary':''}${danger?' danger':''}`;b.textContent=label;b.onclick=fn;return b}
function toolbar(left,right){
  const bar=$('#floatingActions');if(!bar)return;
  bar.className='floating-actions page-toolbar v837-page-toolbar';bar.innerHTML='';
  const l=document.createElement('div'),r=document.createElement('div');l.className='v837-toolbar-left';r.className='v837-toolbar-right';
  left.filter(Boolean).forEach(x=>l.appendChild(x));right.filter(Boolean).forEach(x=>r.appendChild(x));bar.append(l,r);
}
function statusFor(t){return String(t?.quarterStatus||'Waiting for FI')}
function progress(t){try{return typeof routeProgress==='function'?routeProgress(t):0}catch(e){return 0}}
function adminPct(t){try{return typeof adminProgress==='function'?adminProgress(t):0}catch(e){return 0}}
function micro(t){try{return typeof microScheduleInfo==='function'?microScheduleInfo(t):null}catch(e){return null}}
function fmtDate(v){try{return typeof fmt==='function'?fmt(v):(v||'—')}catch(e){return v||'—'}}
function qStateLocal(t){const s=statusFor(t).toLowerCase();return s.includes('ship')?'shipped':s.includes('waiting')?'waiting':'infi'}
function toolCard(t){
  const rp=progress(t),ap=adminPct(t),mi=micro(t),st=statusFor(t),cls=qStateLocal(t);
  const statusLabel=st==='Waiting for FI'?'WAITING FOR FI':st.toUpperCase();
  return `<article class="system-card v3-system-card v837-tool-card ${cls==='shipped'?'shipped-card':cls==='waiting'?'waiting-card':'infi-card'}" data-v837-tool="${esc(t.id)}" tabindex="0" role="button">
    <div class="system-head"><div><div class="system-id v3-system-id">${esc(t.id)}</div><div><span class="model-badge">${esc(t.model||'—')}</span> <span class="gray">${esc(t.customer||'—')}</span></div></div><span class="state-chip ${cls}">${esc(statusLabel)}</span></div>
    <div class="progress-row"><div class="progress-label"><span>ACTUAL FI PROGRESS</span><b>${rp}%</b></div><div class="track"><div class="fill" style="width:${rp}%"></div></div><div class="card-progress-meta"><span>${esc(t.checklist||'—')}</span><span>${esc(t.driver||'Unassigned')}</span></div></div>
    <div class="progress-row micro-progress ${esc(mi?.className||'unset')}"><div class="progress-label"><span>MICRO SCHEDULE</span><b>${mi?.set?mi.plannedPct+'%':'—'}</b></div><div class="track"><div class="fill micro" style="width:${mi?.set?mi.plannedPct:0}%"></div></div><div class="card-progress-meta"><span>${esc(mi?.set?(mi.target||'Target set'):'Target not set')}</span><span>${esc(mi?.label||'')}</span></div></div>
    <div class="progress-row"><div class="progress-label"><span>LEAD / ADMIN</span><b>${ap}%</b></div><div class="track"><div class="fill admin" style="width:${ap}%"></div></div><div class="card-progress-meta"><span>${esc(t.room||'—')}${t.bay?' / '+esc(t.bay):''}</span><span>MFG ${esc(fmtDate(t.ship))}</span></div></div>
  </article>`;
}
function renderToolDashboard(){
  remember({kind:'view',view:'toolcenter'});toolTheme(`TOOL CENTER — ${qLabel()}`);
  let list=[];try{list=typeof pageTools==='function'?pageTools('countdown'):(tools||[]).filter(t=>t.quarterStatus!=='Archive')}catch(e){list=[]}
  const q=qLabel(),waiting=list.filter(t=>statusFor(t)==='Waiting for FI').length,infi=list.filter(t=>statusFor(t)==='In FI').length,packing=list.filter(t=>statusFor(t)==='Packing and Shipping').length,shipped=list.filter(t=>statusFor(t)==='Shipped').length;
  const groups={};list.forEach(t=>(groups[t.codename||'Other']??=[]).push(t));
  const pct=list.length?Math.round(shipped/list.length*100):0;
  const app=$('#app');if(!app)return;
  app.innerHTML=`<div class="report-screen v837-tool-dashboard">
    <div class="v837-summary-grid">
      <div class="metric"><span>${esc(q)} TOOLS</span><strong>${list.length}</strong></div>
      <div class="metric"><span>WAITING FI</span><strong>${waiting}</strong></div>
      <div class="metric"><span>IN FI</span><strong>${infi}</strong></div>
      <div class="metric"><span>SHIPPED</span><strong>${shipped}</strong></div>
    </div>
    <div class="quarter-progress v837-quarter-progress"><div class="progress-label"><span>Current Quarter Shipping Progress</span><b>${pct}% Shipped</b></div><div class="track"><div class="fill" style="width:${pct}%;background:var(--good)"></div></div></div>
    <div class="v837-tool-groups">${Object.entries(groups).sort((a,b)=>a[0].localeCompare(b[0])).map(([name,arr])=>{const w=arr.filter(t=>statusFor(t)==='Waiting for FI').length,i=arr.filter(t=>statusFor(t)==='In FI').length,p=arr.filter(t=>statusFor(t)==='Packing and Shipping').length,s=arr.filter(t=>statusFor(t)==='Shipped').length;return `<section class="tool-section v3-tool-section"><div class="tool-section-head"><h2 class="tool-section-title">${esc(name)}</h2><div class="family-counts"><div><span>TOTAL</span><b>${arr.length}</b></div><div class="family-waiting"><span>WAITING FI</span><b>${w}</b></div><div class="family-infi"><span>IN FI</span><b>${i}</b></div><div class="family-packing"><span>PACKING</span><b>${p}</b></div><div class="family-shipped"><span>SHIPPED</span><b>${s}</b></div></div></div><div class="system-grid v3-system-grid">${arr.slice().sort((a,b)=>String(a.ship||'9').localeCompare(String(b.ship||'9'))).map(toolCard).join('')}</div></section>`}).join('')}</div>
  </div>`;
  $$('[data-v837-tool]').forEach(c=>{const go=()=>window.toolStatus(c.dataset.v837Tool);c.onclick=go;c.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}}});
  toolbar([
    btn(`${q} TOOLS`,renderToolDashboard,true),
    btn('TOOL COUNTDOWN',renderQuickCountdown),
    btn('TOOL ARCHIVE',()=>window.setView('archive'))
  ],[
    btn('ADD TOOL',()=>window.toolAdmin(),true),btn('SCREENSHOT',shot),btn('REPORT',report)
  ]);
}
function renderQuickCountdown(){
  remember({kind:'view',view:'countdown'});
  if(typeof quickCountdown==='function')quickCountdown();
  toolTheme(`TOOL CENTER — ${qLabel()}`);
  toolbar([
    btn(`${qLabel()} TOOLS`,renderToolDashboard),btn('TOOL COUNTDOWN',renderQuickCountdown,true),btn('TOOL ARCHIVE',()=>window.setView('archive'))
  ],[btn('ADD TOOL',()=>window.toolAdmin(),true),btn('SCREENSHOT',shot),btn('REPORT',report)]);
}
function finalizeArchive(){
  toolTheme(`TOOL CENTER — ${qLabel()}`);
  toolbar([
    btn(`${qLabel()} TOOLS`,renderToolDashboard),btn('TOOL COUNTDOWN',renderQuickCountdown),btn('TOOL ARCHIVE',()=>window.setView('archive'),true)
  ],[btn('ADD TOOL',()=>window.toolAdmin(),true),btn('SCREENSHOT',shot),btn('REPORT',report)]);
}
function finalizeDetail(id){
  const t=(typeof tools!=='undefined'?tools:[]).find(x=>String(x.id)===String(id));
  toolTheme(`TOOL ${id}`);remember({kind:'tool',id:String(id)});
  toolbar([
    btn(`← BACK TO ${qLabel()} TOOLS`,renderToolDashboard)
  ],[
    btn('EDIT THIS TOOL',()=>window.toolAdmin(id),true),
    btn('CUSTOMER REQUIREMENTS',()=>{try{window.setView('customer')}catch(e){window.toolAdmin(id)}}),
    btn('SCREENSHOT',shot),btn('REPORT',report)
  ]);
  /* Any detail-page links rendered by older layers should always re-enter the canonical tool route. */
  if(t){$$('[data-tool],[data-open-countdown-tool]').forEach(x=>{const tid=x.dataset.tool||x.dataset.openCountdownTool;if(tid)x.onclick=()=>window.toolStatus(tid)})}
}
function finalizeEditor(id){
  toolTheme(id?`TOOL ${id} — EDIT`:'ADD TOOL');remember({kind:'editTool',id:id?String(id):'',tab:'basic'});
  const bar=$('#floatingActions');if(!bar)return;
  /* Keep the core Save/Delete buttons themselves so their closure-bound save handlers remain intact. */
  const old=$$('button',bar);const save=old.find(b=>/SAVE TOOL/i.test(b.textContent));const del=old.find(b=>/DELETE TOOL/i.test(b.textContent));
  toolbar([
    id?btn(`← BACK TO TOOL ${id}`,()=>window.toolStatus(id)):btn(`← BACK TO ${qLabel()} TOOLS`,renderToolDashboard)
  ],[
    id?null:btn('CANCEL',renderToolDashboard),save||null,del||null
  ]);
}
window.toolStatus=function(id){
  const r=typeof priorToolStatus==='function'?priorToolStatus.apply(this,arguments):undefined;
  finalizeDetail(String(id));setTimeout(()=>finalizeDetail(String(id)),60);return r;
};
window.toolAdmin=function(id,tab){
  const r=typeof priorToolAdmin==='function'?priorToolAdmin.apply(this,arguments):undefined;
  setTimeout(()=>finalizeEditor(id?String(id):''),20);setTimeout(()=>finalizeEditor(id?String(id):''),120);return r;
};
window.setView=function(v){
  if(v==='toolcenter'||v==='systems'){renderToolDashboard();return}
  if(v==='countdown'){renderQuickCountdown();return}
  const r=typeof priorSetView==='function'?priorSetView.apply(this,arguments):undefined;
  if(v==='archive')setTimeout(finalizeArchive,20);
  return r;
};
/* Main nav should always enter the live-card Tool Center dashboard. */
const toolNav=$('.main-nav .nav-btn[data-view="toolcenter"]');if(toolNav)toolNav.onclick=()=>renderToolDashboard();
function restoreFinal(){
  stamp();let route=null;try{route=location.hash.length>2?JSON.parse(decodeURIComponent(location.hash.slice(1))):JSON.parse(sessionStorage.getItem('b7.route')||'null')}catch(e){}
  if(route?.kind==='view'&&route.view==='toolcenter')renderToolDashboard();
  else if(route?.kind==='view'&&route.view==='countdown')renderQuickCountdown();
  else if(route?.kind==='tool'&&route.id)window.toolStatus(route.id);
  else if(route?.kind==='editTool')window.toolAdmin(route.id||undefined,route.tab||'basic');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(restoreFinal,220),{once:true});else setTimeout(restoreFinal,220);
stamp();
})();


/* ===== SOURCE: js/patch-v0838.js ===== */
/* B7 FI Command Center v1.0.3 — single master Tool page + canonical tool routing.
   - One purple Tool page is the canonical editable record for a Tool.
   - Tool Detail and Tool Edit are collapsed into one vertically scrolling page.
   - No secondary tab navigation; the global Page Navigation bar is the only toolbar.
   - Custom-field definition/management remains in Administration Center.
   - Operations/Tool Center/Shipping/Status links all resolve to this master Tool page.
   - Live Status Only remains read-only and is intentionally not changed by this patch.
*/
(function(){
'use strict';
const VERSION='1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const idSafe=s=>String(s||'').replace(/[^A-Za-z0-9_-]/g,'_');
window.B7_APP_VERSION=VERSION; window.VERSION=VERSION;
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function qFromDate(v){const m=String(v||'').match(/^(\d{4})-(\d{2})/);return m?`CY${m[1].slice(-2)}Q${Math.floor((+m[2]-1)/3)+1}`:''}
function currentQuarter(){try{return typeof quarterLabel==='function'?quarterLabel():'CY26Q3'}catch(e){return'CY26Q3'}}
function getTools(){try{return tools||[]}catch(e){return[]}}
function toolById(id){return getTools().find(t=>String(t.id)===String(id))}
function remember(route){try{sessionStorage.setItem('b7.route',JSON.stringify(route));history.replaceState(route,'',location.pathname+'#'+encodeURIComponent(JSON.stringify(route)))}catch(e){}}
function purple(title){document.body.dataset.center='toolfinal';document.body.dataset.theme='toolcenter';document.documentElement.style.setProperty('--page-accent','#8b5cf6');document.documentElement.style.setProperty('--page-accent-rgb','139,92,246');document.documentElement.style.setProperty('--center-color','#8b5cf6');document.documentElement.style.setProperty('--center-rgb','139,92,246');$$('.main-nav .nav-btn').forEach(x=>x.classList.toggle('active',x.dataset.view==='toolcenter'));const h=$('#headerPageTitle');if(h)h.textContent=title}
function btn(label,fn,primary=false,danger=false){const b=document.createElement('button');b.type='button';b.className=`btn${primary?' primary':''}${danger?' danger':''}`;b.textContent=label;b.onclick=fn;return b}
function toolbar(left,right){const bar=$('#floatingActions');if(!bar)return;bar.className='floating-actions page-toolbar v838-page-toolbar';bar.innerHTML='';const l=document.createElement('div'),r=document.createElement('div');l.className='v838-toolbar-left';r.className='v838-toolbar-right';left.filter(Boolean).forEach(x=>l.appendChild(x));right.filter(Boolean).forEach(x=>r.appendChild(x));bar.append(l,r)}
function shot(){try{if(typeof enterScreenshotMode==='function')return enterScreenshotMode()}catch(e){}window.print()}
function report(){window.print()}
function select(options,value){return options.map(x=>`<option value="${esc(x)}" ${String(x)===String(value)?'selected':''}>${esc(x)}</option>`).join('')}
function input(label,id,value,type='text',extra=''){return `<div class="form-group"><label>${esc(label)}</label><input id="${id}" type="${type}" value="${esc(value??'')}" ${extra}></div>`}
function textarea(label,id,value,wide=true){return `<div class="form-group${wide?' wide':''}"><label>${esc(label)}</label><textarea id="${id}">${esc(value??'')}</textarea></div>`}
function routeHtml(t){try{return routeWorkflow(t,true)}catch(e){return'<p class="gray">Checklist route unavailable.</p>'}}
function leadHtml(t){try{return leadWorkflow(t,true)}catch(e){return'<p class="gray">Lead / Admin workflow unavailable.</p>'}}
function routePct(t){try{return routeProgress(t)}catch(e){return 0}}
function leadPct(t){try{return adminProgress(t)}catch(e){return 0}}
function routeOpts(t){try{return routeOptions(t)}catch(e){return''}}
function leadMasterOpts(t){try{let a=activeLeadTasks().filter(x=>x.countProgress!==false);return `<option value="">Not Set</option>`+a.map(x=>`<option value="${esc(x.id)}" ${x.id===t.currentLeadAdminTask?'selected':''}>${esc(x.label)}</option>`).join('')}catch(e){return '<option value="">Not Set</option>'}}
function codeOpts(t){try{return codenameOptions(t.codename)}catch(e){return`<option>${esc(t.codename||'Panamera')}</option>`}}
function modelOpts(t){try{return modelOptions(t.codename,t.model)}catch(e){return`<option>${esc(t.model||'')}</option>`}}
function quarterOpts(v){try{return quarterOptions(v)}catch(e){return select(['CY26Q1','CY26Q2','CY26Q3','CY26Q4','CY27Q1','CY27Q2','CY27Q3','CY27Q4'],v)}}
function mstIsApplicable(t){try{return mstApplicable(t)}catch(e){return['Regera','Celestiq'].includes(t.codename)}}
function normalizeTool(t){try{return normalize(t)}catch(e){return t}}
function newTool(){try{return normalizeTool(defaultTool())}catch(e){return {id:'',family:'29XX',codename:'Panamera',model:'2935',quarter:currentQuarter(),customer:'N/A',so:'N/A',ship:'',quarterStatus:'Waiting for FI',room:'CR1',bay:'',driver:'Unassigned',sw:'',process:'Full Process',lamp:0,notes:'',activity:'',checklist:'FI_130_010',checklistStates:{},escalationMeeting:'N/A',poa:'N/A',fiStatus:'Progressing',waivers:'',ncs:[],leadAdmin:{},schedule:{publish:'N/A',status:'N/A',subsystems:'',cables:'',accessories:'',mst:'N/A',is:'',notes:''},sourceRequired:'TBD',sourceStatus:'Not Started',sourceHandoff:'',sourceStart:'',sourceComplete:'',strRequired:'TBD',strStatus:'Not Started',strDue:'',strNotes:'',changeHistory:[]}}}
function ncRows(t){return (t.ncs||[]).map((n,i)=>`<div class="nc-card v838-nc-row" data-nc-index="${i}"><div class="form-grid">${input('NC #',`v838-nc-id-${i}`,n.id)}${input('Description',`v838-nc-desc-${i}`,n.desc)}<div class="form-group"><label>Status</label><select id="v838-nc-state-${i}">${select(['Open','Troubleshooting','Escalated','POA In Progress','Waiver Pending','Closed','Waived'],n.state||'Open')}</select></div>${input('Escalation Days',`v838-nc-days-${i}`,n.days||0,'number')}</div><label class="v838-check"><input id="v838-nc-block-${i}" type="checkbox" ${n.blocking?'checked':''}> Blocking FI progression</label><button type="button" class="btn danger small v838-remove-nc" data-i="${i}">Remove</button></div>`).join('')||'<p class="gray">No critical NCs tracked.</p>'}
function historyHtml(t){const a=(t.changeHistory||[]).slice(0,12);return a.length?`<div class="v838-history">${a.map(h=>`<div><b>${esc(h.type||h.field||'CHANGE')}</b><span>${esc(h.oldValue||'—')} → ${esc(h.newValue||'—')}</span><small>${esc(h.reason||'')}${h.changedAt?` · ${esc(new Date(h.changedAt).toLocaleString())}`:''}</small></div>`).join('')}</div>`:'<p class="gray">No plan changes recorded.</p>'}
function collect(t,original){
  const val=id=>$(id)?.value??'';
  const oldShip=original?.ship||'', oldQ=original?.quarter||qFromDate(oldShip)||'';
  t.family='29XX';t.codename=val('#tm-code');t.model=val('#tm-model');t.id=val('#tm-id').trim();t.so=val('#tm-so');t.customer=val('#tm-customer');t.room=val('#tm-room');t.bay=val('#tm-bay');t.quarterStatus=val('#tm-status');t.driver=val('#tm-driver');t.ship=val('#tm-ship');t.sw=val('#tm-sw');t.process=val('#tm-process');t.lamp=Number(val('#tm-lamp'))||0;t.notes=val('#tm-notes');t.activity=val('#tm-activity');t.quarter=val('#tm-quarter')||qFromDate(t.ship)||currentQuarter();
  t.checklist=val('#tm-check')||t.checklist;t.microTargetChecklist=val('#tm-micro');t.currentLeadAdminTask=val('#tm-lead-current');t.escalationMeeting=val('#tm-escalation')||'N/A';t.poa=val('#tm-poa')||'N/A';t.fiStatus=val('#tm-fistatus')||'Progressing';t.waivers=val('#tm-waivers');t.checklistStates=t.checklistStates||{};$$('[data-check-code]').forEach(x=>t.checklistStates[x.dataset.checkCode]=x.value);
  t.leadAdmin=t.leadAdmin||{};$$('[data-task-id]').forEach(x=>t.leadAdmin[x.dataset.taskId]=x.value);
  t.sourceRequired=val('#tm-source-required')||'TBD';t.sourceStatus=val('#tm-source-status')||'Not Started';t.sourceHandoff=val('#tm-source-handoff');t.sourceStart=val('#tm-source-start');t.sourceComplete=val('#tm-source-complete');t.strRequired=val('#tm-str-required')||'TBD';t.strStatus=val('#tm-str-status')||'Not Started';t.strDue=val('#tm-str-due');t.strNotes=val('#tm-str-notes');
  t.schedule=t.schedule||{};t.schedule.publish=val('#tm-sch-pub')||'N/A';t.schedule.status=val('#tm-sch-status')||'N/A';t.schedule.subsystems=val('#tm-sch-sub');t.schedule.cables=val('#tm-sch-cables');t.schedule.accessories=val('#tm-sch-acc');t.schedule.mst=mstIsApplicable(t)?val('#tm-sch-mst'):'N/A';t.schedule.is=val('#tm-sch-is');t.schedule.notes=val('#tm-sch-notes');
  t.ncs=$$('.v838-nc-row').map((r,i)=>({id:val(`#v838-nc-id-${i}`),desc:val(`#v838-nc-desc-${i}`),state:val(`#v838-nc-state-${i}`)||'Open',days:Number(val(`#v838-nc-days-${i}`))||0,blocking:$(`#v838-nc-block-${i}`)?.checked||false})).filter(n=>n.id||n.desc);
  const selected=val('#tm-plan-type')||'No Change', reason=val('#tm-plan-reason').trim();
  if(original){let type=selected;const shipChanged=oldShip!==t.ship,qChanged=oldQ!==t.quarter;if(type==='No Change'&&(shipChanged||qChanged)){if(qChanged){let oi=-1,ni=-1;try{oi=QUARTERS.indexOf(oldQ);ni=QUARTERS.indexOf(t.quarter)}catch(e){}type=(oi>=0&&ni>=0&&ni<oi)?'Pull In':(oi>=0&&ni>oi)?'Push Out':'Quarter Change'}else type='Ship Date Change'}if(shipChanged||qChanged){t.originalShip=t.originalShip||oldShip;t.originalQuarter=t.originalQuarter||oldQ;t.changeHistory=t.changeHistory||[];t.changeHistory.unshift({field:'MFG Ship / Quarter',oldValue:`${oldShip} · ${oldQ}`,newValue:`${t.ship} · ${t.quarter}`,type,reason,changedAt:new Date().toISOString()});if(type==='Pull In'){t.pullIn=t.ship;t.pulledInFrom=oldQ;t.pushOut='';t.nextQuarter=''}else if(type==='Push Out'){t.pushOut=t.ship;t.nextQuarter=t.quarter;t.pullIn='';t.pulledInFrom=''}}}
  else {t.originalShip=t.ship;t.originalQuarter=t.quarter}
  return t;
}
function renderMaster(id,requestedSection){
  const original=id?toolById(id):null, t=original?JSON.parse(JSON.stringify(original)):newTool();
  t.changeHistory=t.changeHistory||[];t.ncs=t.ncs||[];t.leadAdmin=t.leadAdmin||{};t.checklistStates=t.checklistStates||{};t.schedule=t.schedule||{publish:'N/A',status:'N/A',subsystems:'',cables:'',accessories:'',mst:'N/A',is:'',notes:''};
  purple(id?`TOOL ${id}`:'ADD TOOL');remember({kind:'masterTool',id:id?String(id):'',section:requestedSection||''});
  const appEl=$('#app');if(!appEl)return;
  appEl.innerHTML=`<div class="report-screen v838-master-tool"><section class="v838-master-head"><div><span>${original?'MASTER TOOL RECORD':'NEW TOOL RECORD'}</span><h2>${esc(id||'ADD TOOL')}</h2><small>${esc(t.codename||'')} · ${esc(t.model||'')} · ${esc(t.customer||'')}</small></div><div><b>${esc(t.quarterStatus||'Waiting for FI')}</b><small>${esc(t.ship||'Ship date not set')}</small></div></section>
  <section class="panel v838-section" id="tool-section-overview"><h3>Tool Information / Plan</h3><div class="form-grid"><div class="form-group"><label>Product Family</label><input value="29XX" disabled></div><div class="form-group"><label>Code Name</label><select id="tm-code">${codeOpts(t)}</select></div><div class="form-group"><label>Model</label><select id="tm-model">${modelOpts(t)}</select></div>${input('UTID','tm-id',t.id)}${input('Sales Order','tm-so',t.so)}${input('Customer','tm-customer',t.customer)}<div class="form-group"><label>Cleanroom</label><select id="tm-room">${select(['CR1','CR2','CR3'],t.room||'CR1')}</select></div>${input('Cleanroom Bay','tm-bay',t.bay)}<div class="form-group"><label>Tool Status</label><select id="tm-status">${select(['Waiting for FI','In FI','Shipped','Archive'],t.quarterStatus||'Waiting for FI')}</select></div>${input('Tool Assignment','tm-driver',t.driver)}${input('MFG Ship Date','tm-ship',t.ship,'date')} ${input('SW Version','tm-sw',t.sw)}<div class="form-group"><label>FI Process</label><select id="tm-process">${select(['Full Process','Reduced Process'],t.process||'Full Process')}</select></div>${input('Lamp Hours','tm-lamp',t.lamp,'number')}${textarea('Notes','tm-notes',t.notes)}${textarea('Latest Status','tm-activity',t.activity)}</div>
  <div class="v838-subsection"><h4>Quarter / Ship Plan</h4><p class="helper">This record is the source of truth for Tool Countdown, Shipping Center, Operations Center and Live Status.</p><div class="form-grid"><div class="form-group"><label>Current Quarter</label><select id="tm-quarter">${quarterOpts(t.quarter||qFromDate(t.ship)||currentQuarter())}</select></div><div class="form-group"><label>Plan Change Type</label><select id="tm-plan-type">${select(['No Change','Ship Date Change','Pull In','Push Out'], 'No Change')}</select></div>${input('Original MFG Ship Date','tm-original-ship',t.originalShip||t.ship,'date','disabled')}${input('Original Quarter','tm-original-quarter',t.originalQuarter||t.quarter||qFromDate(t.ship),'text','disabled')}${textarea('Plan Change Reason / Notes','tm-plan-reason','')}</div></div></section>
  <section class="panel v838-section" id="tool-section-fi"><div class="subsection-title"><h3>FI Testing / Micro Schedule</h3><div class="metric-inline">FI ${routePct(t)}%</div></div><div class="form-grid"><div class="form-group"><label>Current FI Checklist</label><select id="tm-check">${routeOpts(t)}</select><small>Authoritative FI position used throughout Command Center.</small></div><div class="form-group"><label>Micro Schedule Target</label><select id="tm-micro"><option value="">Target Not Set</option>${routeOpts({...t,checklist:t.microTargetChecklist||''})}</select><small>Where FI should be according to the micro schedule.</small></div><div class="form-group"><label>Escalation Meeting</label><select id="tm-escalation">${select(['N/A','Yes'],t.escalationMeeting||'N/A')}</select></div><div class="form-group"><label>POA</label><select id="tm-poa">${select(['N/A','Completed latest POA','Performing latest POA'],t.poa||'N/A')}</select></div><div class="form-group"><label>FI Status</label><select id="tm-fistatus">${select(['Progressing','Performing POA','Line Down'],t.fiStatus||'Progressing')}</select></div>${textarea('Waivers','tm-waivers',t.waivers)}</div><h4>Ordered FI Checklist Route</h4>${routeHtml(t)}</section>
  <section class="panel v838-section" id="tool-section-lead"><div class="subsection-title"><h3>Lead / Admin</h3><div class="metric-inline">${leadPct(t)}%</div></div><div class="form-grid"><div class="form-group wide"><label>Current Lead / Admin Task</label><select id="tm-lead-current">${leadMasterOpts(t)}</select><small>Authoritative Lead/Admin position used by the Command Center. Detailed task statuses below are supporting lead tracking only.</small></div></div>${leadHtml(t)}</section>
  <section class="panel v838-section" id="tool-section-customer"><h3>Customer Requirements</h3><div class="form-grid"><div class="form-group"><label>Customer Source Required</label><select id="tm-source-required">${select(['TBD','Yes','No'],t.sourceRequired||'TBD')}</select></div><div class="form-group"><label>Source Status</label><select id="tm-source-status">${select(['Not Started','Preparing','Pre-Source In Progress','Ready for CA','With CA Team','Source Complete','Returned to FI'],t.sourceStatus||'Not Started')}</select></div>${input('CA Handoff','tm-source-handoff',t.sourceHandoff,'date')}${input('Source Start','tm-source-start',t.sourceStart,'date')}${input('Source Complete','tm-source-complete',t.sourceComplete,'date')}<div class="form-group"><label>STR Required</label><select id="tm-str-required">${select(['TBD','Yes','No'],t.strRequired||'TBD')}</select></div><div class="form-group"><label>STR Status</label><select id="tm-str-status">${select(['Not Started','Requirements Pending','Requirements Received','Testing','Submitted to CA','Customer Approval Pending','Complete'],t.strStatus||'Not Started')}</select></div>${input('STR Due Before','tm-str-due',t.strDue,'date')}${textarea('STR Notes','tm-str-notes',t.strNotes)}</div></section>
  <section class="panel v838-section" id="tool-section-shipping"><h3>Shipping / Packing</h3><p class="helper">Shipping Center reads these values automatically. Edit the Tool here; Shipping Center is the multi-tool display.</p><div class="form-grid"><div class="form-group"><label>Publish Status</label><select id="tm-sch-pub">${select(['N/A','Draft','Published','Complete'],t.schedule.publish||'N/A')}</select></div><div class="form-group"><label>Ship Schedule</label><select id="tm-sch-status">${select(['N/A','Not Started','In Progress','Updated','Completed'],t.schedule.status||'N/A')}</select></div>${input('Subsystems Handoff','tm-sch-sub',t.schedule.subsystems,'date')}${input('Cable Kit Handoff','tm-sch-cables',t.schedule.cables,'date')}${input('Accessories Handoff','tm-sch-acc',t.schedule.accessories,'date')}${mstIsApplicable(t)?input('MST Install','tm-sch-mst',t.schedule.mst==='N/A'?'':t.schedule.mst,'date'):`<div class="form-group"><label>MST Install</label><input value="N/A — Not required for ${esc(t.codename)}" disabled><input id="tm-sch-mst" type="hidden" value="N/A"></div>`}${input('IS Handoff','tm-sch-is',t.schedule.is,'date')}${textarea('Shipping Notes','tm-sch-notes',t.schedule.notes)}</div></section>
  <section class="panel v838-section" id="tool-section-ncs"><div class="subsection-title"><h3>NCs / Escalations</h3><button type="button" id="v838AddNc" class="btn">+ Add NC</button></div><div id="v838NcList">${ncRows(t)}</div></section>
  <section class="panel v838-section" id="tool-section-history"><h3>Tool Plan Change History</h3>${historyHtml(t)}</section>
  <section class="panel v838-admin-note"><b>Custom Fields</b><span>Field definitions and configuration are managed in Administration Center.</span></section></div>`;
  const code=$('#tm-code');if(code)code.onchange=()=>{const m=$('#tm-model');if(m){try{m.innerHTML=modelOptions(code.value,'')}catch(e){}}};
  function bindNc(){ $$('.v838-remove-nc').forEach(b=>b.onclick=()=>{collect(t,original);t.ncs.splice(Number(b.dataset.i),1);renderMasterDraft(t,original,requestedSection)}); }
  $('#v838AddNc').onclick=()=>{collect(t,original);t.ncs.push({id:'',desc:'',state:'Open',days:0,blocking:false});renderMasterDraft(t,original,'ncs')};bindNc();
  function saveMaster(){collect(t,original);if(!t.id)return alert('UTID is required.');const arr=getTools();if(!original&&arr.some(x=>String(x.id)===String(t.id)))return alert('That UTID already exists.');if(t.quarterStatus==='Archive'&&!t.archiveDate)t.archiveDate=new Date().toISOString().slice(0,10);const normalized=normalizeTool(t);if(original){const idx=arr.findIndex(x=>String(x.id)===String(original.id));if(idx>=0)arr[idx]=normalized}else arr.push(normalized);try{save()}catch(e){console.error(e)};renderMaster(t.id)}
  function deleteMaster(){if(!original)return;if(!confirm(`Delete Tool ${original.id}?`))return;try{tools=tools.filter(x=>String(x.id)!==String(original.id));save()}catch(e){return alert('Could not delete tool.')}try{setView('toolcenter')}catch(e){}}
  toolbar([btn(`← BACK TO ${currentQuarter()} TOOLS`,()=>{try{setView('toolcenter')}catch(e){}})], [btn('SAVE TOOL',saveMaster,true),original?btn('DELETE TOOL',deleteMaster,false,true):null,btn('SCREENSHOT',shot),btn('REPORT',report)]);
  if(requestedSection){setTimeout(()=>document.getElementById(`tool-section-${requestedSection}`)?.scrollIntoView({block:'start'}),40)}
}
function renderMasterDraft(t,original,section){
  /* Preserve draft data by temporarily presenting it as the source object without saving. */
  const tempId=t.id||'__NEW__';const arr=getTools(),existingIndex=arr.findIndex(x=>String(x.id)===String(tempId));let inserted=false,backup=null;
  if(existingIndex>=0){backup=arr[existingIndex];arr[existingIndex]=t}else{arr.push(t);inserted=true}
  renderMaster(t.id||'',section);
  if(inserted)arr.pop();else arr[existingIndex]=backup;
}
/* Canonical route: overwrite BOTH the lexical global function binding and window property.
   Older Operations code calls toolStatus directly, so window-only overrides are insufficient. */
window.toolStatus=renderMaster;window.toolAdmin=renderMaster;
try{toolStatus=renderMaster}catch(e){}
try{toolAdmin=renderMaster}catch(e){}
/* Shipping deep links target the shipping section of the same master Tool page. */
window.B7OpenMasterTool=function(id,section){renderMaster(id,section)};
/* Any later legacy click handler can still call the canonical functions above. */
function restore(){stamp();let r=null;try{r=location.hash.length>2?JSON.parse(decodeURIComponent(location.hash.slice(1))):JSON.parse(sessionStorage.getItem('b7.route')||'null')}catch(e){}if(r?.kind==='masterTool')renderMaster(r.id||undefined,r.section||'')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(restore,320),{once:true});else setTimeout(restore,320);
stamp();
})();


/* ===== SOURCE: js/patch-v0839.js ===== */
/* B7 FI Command Center v1.0.3 — authoritative Center theme + Tool plan-change UX cleanup.
   - One authoritative Center theme is re-applied after every Center navigation.
   - Tool Center can no longer inherit Status/Shipping/etc. accent colors.
   - Quarter / Ship Plan clearly separates current values from NEW values.
   - New ship date / quarter are applied to the master Tool record on Save.
   - Empty Tool Plan Change History is hidden.
   - Custom Fields placeholder is removed from the Tool page; configuration belongs in Administration.
*/
(function(){
'use strict';
const VERSION='1.0.3';
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


/* ===== SOURCE: js/patch-v0840.js ===== */
/* B7 FI Command Center v1.0.3 — Final Tool Center navigation/workflow lock.
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
const VERSION='1.0.3';
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


/* ===== SOURCE: js/patch-v0841.js ===== */
/* B7 FI Command Center v1.0.3 — Tool live-card state parity + save acknowledgement.
   - Tool Center live cards consume the same master-tool exception state used by Operations/Live Status.
   - Adds compact badges for plan changes, Customer Source, STR, and Packing without replacing lifecycle state.
   - Master Tool editor provides explicit Unsaved / Saving / Saved / No changes feedback.
   - Latest saved plan change is shown read-only in the editor so the Plan Change Type dropdown remains a NEW action.
*/
(function(){
'use strict';
const VERSION='1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
window.B7_APP_VERSION=VERSION; window.VERSION=VERSION;

function stamp(){
  document.title=`B7 FI Command Center v${VERSION}`;
  const v=$('#appVersionLabel'); if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`;
}
function getTools(){try{return tools||[]}catch(e){return[]}}
function byId(id){return getTools().find(t=>String(t.id)===String(id))}
function latestPlan(t){
  const h=Array.isArray(t?.changeHistory)&&t.changeHistory.length?t.changeHistory[0]:null;
  const type=String(h?.type||'').toLowerCase();
  if(type.includes('pull'))return {kind:'pull',label:'↑ PULL IN',detail:h};
  if(type.includes('push'))return {kind:'push',label:'↓ PUSH OUT',detail:h};
  if(type.includes('ship date'))return {kind:'date',label:'DATE CHANGED',detail:h};
  if(type.includes('quarter'))return {kind:'date',label:'PLAN CHANGED',detail:h};
  if(t?.pushOut)return {kind:'push',label:'↓ PUSH OUT',detail:null};
  if(t?.pullIn)return {kind:'pull',label:'↑ PULL IN',detail:null};
  return null;
}
function packingActive(t){
  const qs=String(t?.quarterStatus||'').toLowerCase();
  const ps=String(t?.schedule?.status||'').toLowerCase();
  return qs.includes('packing') || ['in progress','updated','packing','active'].some(x=>ps.includes(x));
}
function sourceActive(t){return String(t?.sourceRequired||'').toLowerCase()==='yes'}
function strActive(t){return String(t?.strRequired||'').toLowerCase()==='yes'}
function badgeHtml(t){
  const out=[],p=latestPlan(t);
  if(p){
    let title='';
    if(p.detail)title=`${p.detail.oldValue||''} → ${p.detail.newValue||''}${p.detail.reason?' · '+p.detail.reason:''}`;
    out.push(`<span class="v841-state-badge plan ${p.kind}" title="${esc(title)}">${esc(p.label)}</span>`);
  }
  if(sourceActive(t))out.push(`<span class="v841-state-badge source" title="Customer Source: ${esc(t.sourceStatus||'Not Started')}">SOURCE</span>`);
  if(strActive(t))out.push(`<span class="v841-state-badge str" title="STR: ${esc(t.strStatus||'Not Started')}">STR</span>`);
  if(packingActive(t))out.push(`<span class="v841-state-badge packing" title="Packing / Shipping: ${esc(t.schedule?.status||t.quarterStatus||'Active')}">PACKING</span>`);
  return out.length?`<div class="v841-card-badges" aria-label="Tool exceptions and special workflows">${out.join('')}</div>`:'';
}
function enhanceToolCards(){
  $$('[data-v837-tool]').forEach(card=>{
    const id=card.dataset.v837Tool,t=byId(id); if(!t)return;
    card.querySelector('.v841-card-badges')?.remove();
    const head=card.querySelector('.system-head'); if(head)head.insertAdjacentHTML('afterend',badgeHtml(t));
  });
}

function toast(text,kind='saved'){
  let n=$('#v841Toast'); if(!n){n=document.createElement('div');n.id='v841Toast';document.body.appendChild(n)}
  n.className=`v841-toast ${kind}`;n.textContent=text;n.classList.add('show');
  clearTimeout(n._hide);n._hide=setTimeout(()=>n.classList.remove('show'),2600);
}
function saveState(text,kind){
  let el=$('#v841SaveState');
  if(!el){
    const right=$('.v840-toolbar-right,.v838-toolbar-right,.v837-toolbar-right'); if(!right)return;
    el=document.createElement('span');el.id='v841SaveState';right.prepend(el);
  }
  el.className=`v841-save-state ${kind||''}`;el.textContent=text;
}
function toolIdFromHeader(){const m=String($('#headerPageTitle')?.textContent||'').match(/TOOL\s+(\d+)/i);return m?m[1]:''}
function installSaveUx(){
  const master=$('.v838-master-tool');
  const edit=/—\s*EDIT/i.test($('#headerPageTitle')?.textContent||'') || /ADD TOOL/i.test($('#headerPageTitle')?.textContent||'');
  if(!master||!edit||master.dataset.v841SaveUx==='1')return;
  master.dataset.v841SaveUx='1'; let dirty=false;
  saveState('SAVED','saved');
  const mark=e=>{
    if(e?.target?.matches('input,select,textarea')){dirty=true;master.dataset.v841Dirty='1';saveState('UNSAVED CHANGES','dirty')}
  };
  master.addEventListener('input',mark,true);master.addEventListener('change',mark,true);
  document.addEventListener('click',function saveGate(e){
    if(!master.isConnected){document.removeEventListener('click',saveGate,true);return}
    const b=e.target.closest('button');if(!b||!/^SAVE TOOL$/i.test((b.textContent||'').trim()))return;
    if(!dirty){e.preventDefault();e.stopImmediatePropagation();saveState('NO CHANGES TO SAVE','neutral');toast('No changes to save','neutral');return}
    saveState('SAVING…','saving');
    try{sessionStorage.setItem('b7.v841.saveNotice',JSON.stringify({id:toolIdFromHeader(),at:Date.now()}))}catch(_){ }
  },true);
}
function showSavedNotice(){
  let n=null;try{n=JSON.parse(sessionStorage.getItem('b7.v841.saveNotice')||'null')}catch(e){}
  if(!n)return;
  if(Date.now()-Number(n.at||0)>4000){try{sessionStorage.removeItem('b7.v841.saveNotice')}catch(e){};return}
  try{sessionStorage.removeItem('b7.v841.saveNotice')}catch(e){}
  toast(`Saved Tool ${n.id||''}`.trim(),'saved');
}
function enhanceLatestPlan(){
  const master=$('.v838-master-tool');if(!master)return;
  const id=toolIdFromHeader(),t=byId(id),p=latestPlan(t);
  $('#v841LatestPlan')?.remove();
  if(!p)return;
  const plan=$('#tm-plan-type')?.closest('.v838-subsection'); if(!plan)return;
  const h=p.detail||{};
  const box=document.createElement('div');box.id='v841LatestPlan';box.className=`v841-latest-plan ${p.kind}`;
  box.innerHTML=`<span>LATEST PLAN CHANGE</span><b>${esc(p.label.replace(/[↑↓]/g,'').trim())}</b><small>${esc(h.oldValue||'')} ${h.oldValue||h.newValue?'→':''} ${esc(h.newValue||'')}${h.reason?` · ${esc(h.reason)}`:''}</small>`;
  const helper=plan.querySelector('.helper'); if(helper)helper.after(box);else plan.prepend(box);
}
function enhance(){stamp();enhanceToolCards();installSaveUx();enhanceLatestPlan();showSavedNotice()}

/* Wrap final Tool Center dashboard and tool routes after v1.0.1 so cards/save state are enhanced after every render. */
const priorSetView=window.setView, priorStatus=window.toolStatus, priorAdmin=window.toolAdmin;
if(typeof priorSetView==='function'){
  window.setView=function(){const out=priorSetView.apply(this,arguments);[0,30,100].forEach(ms=>setTimeout(enhance,ms));return out};
  try{setView=window.setView}catch(e){}
}
if(typeof priorStatus==='function'){
  window.toolStatus=function(){const out=priorStatus.apply(this,arguments);[0,30,100].forEach(ms=>setTimeout(enhance,ms));return out};
  try{toolStatus=window.toolStatus}catch(e){}
}
if(typeof priorAdmin==='function'){
  window.toolAdmin=function(){const out=priorAdmin.apply(this,arguments);[0,30,120].forEach(ms=>setTimeout(enhance,ms));return out};
  try{toolAdmin=window.toolAdmin}catch(e){}
}

function boot(){[0,120,360].forEach(ms=>setTimeout(enhance,ms))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();


/* ===== SOURCE: js/patch-v0842.js ===== */
/* B7 FI Command Center v1.0.3 — Standard/Mini Tool Card system.
   Tool Center mini cards are photo-less compact versions of the Live Status card.
   All six workflow positions are always reserved and read the same master tool record.
*/
(function(){'use strict';
const VERSION='1.0.3',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function getTools(){try{return tools||[]}catch(e){return[]}} function byId(id){return getTools().find(t=>String(t.id)===String(id))}
function pct(fn,t){try{return Math.max(0,Math.min(100,Math.round(fn(t)||0)))}catch(e){return 0}}
function fi(t){try{return pct(routeProgress,t)}catch(e){return 0}} function admin(t){try{return pct(adminProgress,t)}catch(e){return 0}}
function micro(t){try{return typeof microScheduleInfo==='function'?microScheduleInfo(t):null}catch(e){return null}}
function pack(t){try{return typeof packingProgress==='function'?pct(packingProgress,t):0}catch(e){return 0}}
function fmtD(v){try{return typeof fmt==='function'?fmt(v):(v||'—')}catch(e){return v||'—'}}
function reqNorm(v){const s=String(v??'TBD').trim().toLowerCase();if(s==='yes'||s==='required')return'yes';if(s==='no'||s==='not required'||s==='n/a'||s==='na')return'no';return'tbd'}
function sourcePct(s){return ({'not started':0,'preparing':15,'pre-source in progress':35,'ready for ca':55,'with ca team':72,'source complete':90,'returned to fi':100,'complete':100,'completed':100})[String(s||'not started').toLowerCase()]??0}
function strPct(s){return ({'not started':0,'requirements pending':10,'requirements received':25,'testing':55,'submitted to ca':75,'customer approval pending':90,'complete':100,'completed':100})[String(s||'not started').toLowerCase()]??0}
function req(t,type){const required=reqNorm(t[type+'Required']),status=String(t[type+'Status']||'Not Started');if(required==='no')return{label:'NOT REQUIRED',pct:0,on:false};if(required==='tbd')return{label:'TBD',pct:0,on:false};const p=type==='source'?sourcePct(status):strPct(status);return{label:`${status.toUpperCase()} · ${p}%`,pct:p,on:true}}
function latestPlan(t){const h=Array.isArray(t?.changeHistory)&&t.changeHistory.length?t.changeHistory[0]:null,type=String(h?.type||'').toLowerCase();if(type.includes('pull')||t?.pullIn)return{cls:'pull',txt:'↑ PULL IN'};if(type.includes('push')||t?.pushOut)return{cls:'push',txt:'↓ PUSH OUT'};if(type.includes('ship date'))return{cls:'date',txt:'SHIP DATE CHANGED'};return null}
function row(label,value,p,cls='',active=true,meta=''){return `<div class="v842-progress ${cls} ${active?'active':'inactive'}"><div class="v842-progress-head"><span>${esc(label)}</span><b>${esc(value)}</b></div><div class="v842-track"><i style="width:${active?p:0}%"></i></div>${meta?`<small>${esc(meta)}</small>`:''}</div>`}
function status(t){try{return typeof statusFor==='function'?statusFor(t):(t.quarterStatus||'In FI')}catch(e){return t.quarterStatus||'In FI'}}
function render(card,t){const fp=fi(t),ap=admin(t),mi=micro(t),pp=pack(t),sr=req(t,'source'),str=req(t,'str'),pl=latestPlan(t),st=status(t);let packStarted=pp>0||/packing|shipped/i.test(String(t.quarterStatus||''));
 const model=t.model||t.toolType||'—',customer=t.customer||'—',so=t.so||t.salesOrder||'—',driver=t.driver||t.assignedDriver||'Unassigned',room=t.room||t.cleanroom||'—';
 card.classList.add('v842-mini-tool-card');
 card.innerHTML=`<div class="v842-head"><div><div class="v842-utid">${esc(t.id||t.utid)}</div><div class="v842-sub"><b>${esc(model)}</b> · ${esc(customer)}</div></div><span class="v842-status">${esc(String(st).toUpperCase())}</span></div>${pl?`<div class="v842-plan ${pl.cls}">${esc(pl.txt)}</div>`:'<div class="v842-plan-placeholder">NO PLAN CHANGE</div>'}<div class="v842-progress-grid">${row('FI TESTING',fp?fp+'%':'NOT STARTED',fp,'fi',fp>0,t.checklist||t.currentChecklist||'')}${row('LEAD / ADMIN',ap?ap+'%':'NOT STARTED',ap,'admin',ap>0)}${row('MICRO SCHEDULE',mi?.set?(mi.plannedPct+'%'):'TARGET NOT SET',mi?.set?mi.plannedPct:0,'micro',!!mi?.set,mi?.set?(mi.label||mi.target||''):'')}${row('PACKING / SHIPPING',packStarted?(pp+'%'):'NOT STARTED',pp,'packing',packStarted,t.schedule?.status||'')}${row('CUSTOMER SOURCE',sr.label,sr.pct,'source',sr.on)}${row('STR',str.label,str.pct,'str',str.on)}</div><div class="v842-fields"><div><span>SALES ORDER</span><b>${esc(so)}</b></div><div><span>SHIP DATE</span><b>${esc(fmtD(t.ship||t.shipDate))}</b></div><div><span>DRIVER</span><b>${esc(driver)}</b></div><div><span>CLEANROOM</span><b>${esc(room)}${t.bay?' / '+esc(t.bay):''}</b></div></div>`;
}
function enhance(){stamp();$$('[data-v837-tool]').forEach(c=>{const t=byId(c.dataset.v837Tool);if(t)render(c,t)})}
const prior=window.setView;if(typeof prior==='function'){window.setView=function(){const r=prior.apply(this,arguments);[0,40,120].forEach(ms=>setTimeout(enhance,ms));return r};try{setView=window.setView}catch(e){}}
function boot(){[0,150,400].forEach(ms=>setTimeout(enhance,ms))}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();


/* ===== SOURCE: js/patch-v0843.js ===== */
/* B7 FI Command Center v1.0.3 — Tool Center Mini Card refinement.
   Four-across desktop density, Model/Customer in the core field grid,
   and Tool Status badge/left accent use the same fleet-status color language.
*/
(function(){'use strict';
const VERSION='1.0.3',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function statusClass(text){const s=String(text||'').toLowerCase();if(s.includes('ship'))return'v843-shipped';if(s.includes('pack'))return'v843-packing';if(s.includes('wait'))return'v843-waiting';return'v843-infi'}
function refine(){stamp();$$('.v842-mini-tool-card').forEach(card=>{
  const st=card.querySelector('.v842-status')?.textContent||'';
  card.classList.remove('v843-waiting','v843-infi','v843-packing','v843-shipped');card.classList.add(statusClass(st));
  const sub=card.querySelector('.v842-sub');
  const fields=card.querySelector('.v842-fields');
  if(sub&&fields&&!fields.querySelector('[data-v843="model"]')){
    const parts=sub.textContent.split('·').map(x=>x.trim());
    const model=parts[0]||'—',customer=parts.slice(1).join(' · ')||'—';
    const a=document.createElement('div');a.dataset.v843='model';a.innerHTML=`<span>MODEL</span><b></b>`;a.querySelector('b').textContent=model;
    const b=document.createElement('div');b.dataset.v843='customer';b.innerHTML=`<span>CUSTOMER</span><b></b>`;b.querySelector('b').textContent=customer;
    fields.prepend(b);fields.prepend(a);sub.remove();
  }
})}
const prior=window.setView;if(typeof prior==='function'){window.setView=function(){const r=prior.apply(this,arguments);[0,40,120,250].forEach(ms=>setTimeout(refine,ms));return r};try{setView=window.setView}catch(e){}}
function boot(){[0,150,400,800].forEach(ms=>setTimeout(refine,ms))}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();


/* ===== SOURCE: js/patch-v0844.js ===== */
/* B7 FI Command Center v1.0.3
   - Repairs v1.0.1 load regression via clean index references.
   - Completes Tool Center summary placeholders: Waiting, In FI, Packing, Shipped,
     Pulled Into current quarter, Pushed Out.
   - Zero-count workflow/change cards remain present but visually disabled.
   - Keeps v1.0.1 Mini Tool Card density/status coloring active.
*/
(function(){'use strict';
const VERSION='1.0.3',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function allTools(){try{return Array.isArray(tools)?tools:[]}catch(e){return[]}}
function currentQuarter(){
  const h=$('#headerPageTitle')?.textContent||'';
  const m=h.match(/CY\d{2}Q[1-4]/i);if(m)return m[0].toUpperCase();
  try{if(typeof quarterLabel==='function')return String(quarterLabel()).toUpperCase()}catch(e){}
  const counts={};allTools().forEach(t=>{const q=String(t.quarter||'').toUpperCase();if(q)counts[q]=(counts[q]||0)+1});
  return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0]||'CY26Q3';
}
function status(t){let s='';try{s=typeof statusFor==='function'?statusFor(t):t.quarterStatus}catch(e){s=t.quarterStatus}return String(s||'Waiting for FI')}
function isPacking(t){const s=status(t).toLowerCase();if(s.includes('pack'))return true;const sch=String(t?.schedule?.status||'').toLowerCase();return sch.includes('pack')&&!sch.includes('not started')&&!sch.includes('n/a')}
function latestHistory(t){return Array.isArray(t?.changeHistory)&&t.changeHistory.length?t.changeHistory[0]:null}
function historyType(t){const h=latestHistory(t);return String(h?.type||'').toLowerCase()}
function qVal(obj,key){return String(obj?.[key]||'').toUpperCase()}
function isPulledInto(t,q){
  const h=latestHistory(t),type=historyType(t);
  if(type.includes('pull')){
    const nq=qVal(h,'newQuarter')||qVal(h?.new,'quarter')||String(t.quarter||'').toUpperCase();
    return !nq||nq===q;
  }
  return !!t?.pullIn && String(t.quarter||'').toUpperCase()===q;
}
function isPushedOut(t,q){
  const h=latestHistory(t),type=historyType(t);
  if(type.includes('push')){
    const oq=qVal(h,'oldQuarter')||qVal(h?.old,'quarter')||String(t.originalQuarter||'').toUpperCase();
    return !oq||oq===q;
  }
  return !!t?.pushOut || (!!t?.nextQuarter && String(t.nextQuarter).toUpperCase()!==q);
}
function metric(label,value,cls,always=false){const active=always||Number(value)>0;return `<div class="metric ${cls} ${active?'v844-active':'v844-inactive'}"><span>${label}</span><strong>${value}</strong></div>`}
function enhanceSummary(){
  stamp();const dash=$('.v837-tool-dashboard');if(!dash)return;
  const grid=$('.v837-summary-grid',dash);if(!grid)return;
  const q=currentQuarter();let list=[];
  try{list=typeof pageTools==='function'?pageTools('countdown'):allTools().filter(t=>String(t.quarterStatus||'')!=='Archive')}catch(e){list=allTools()}
  const waiting=list.filter(t=>status(t)==='Waiting for FI').length;
  const infi=list.filter(t=>status(t)==='In FI').length;
  const packing=list.filter(isPacking).length;
  const shipped=list.filter(t=>status(t)==='Shipped').length;
  const pulled=allTools().filter(t=>isPulledInto(t,q)).length;
  const pushed=allTools().filter(t=>isPushedOut(t,q)).length;
  grid.classList.add('v844-summary-grid');
  grid.innerHTML=
    metric(`${q} TOOLS`,list.length,'v844-total',true)+
    metric('WAITING FI',waiting,'v844-waiting')+
    metric('IN FI',infi,'v844-infi')+
    metric('PACKING',packing,'v844-packing')+
    metric('SHIPPED',shipped,'v844-shipped')+
    metric(`PULLED INTO ${q}`,pulled,'v844-pulled')+
    metric('PUSHED OUT',pushed,'v844-pushed');
}
function statusClass(text){const s=String(text||'').toLowerCase();if(s.includes('ship'))return'v843-shipped';if(s.includes('pack'))return'v843-packing';if(s.includes('wait'))return'v843-waiting';return'v843-infi'}
function repairCards(){
  $$('.v842-mini-tool-card').forEach(card=>{
    const st=card.querySelector('.v842-status')?.textContent||'';
    card.classList.remove('v843-waiting','v843-infi','v843-packing','v843-shipped');card.classList.add(statusClass(st));
    const sub=card.querySelector('.v842-sub'),fields=card.querySelector('.v842-fields');
    if(sub&&fields&&!fields.querySelector('[data-v843="model"]')){
      const parts=sub.textContent.split('·').map(x=>x.trim()),model=parts[0]||'—',customer=parts.slice(1).join(' · ')||'—';
      const a=document.createElement('div');a.dataset.v843='model';a.innerHTML='<span>MODEL</span><b></b>';a.querySelector('b').textContent=model;
      const b=document.createElement('div');b.dataset.v843='customer';b.innerHTML='<span>CUSTOMER</span><b></b>';b.querySelector('b').textContent=customer;
      fields.prepend(b);fields.prepend(a);sub.remove();
    }
  });
}
function refine(){stamp();enhanceSummary();repairCards()}
const prior=window.setView;if(typeof prior==='function'){
  window.setView=function(){const r=prior.apply(this,arguments);[0,40,120,260].forEach(ms=>setTimeout(refine,ms));return r};try{setView=window.setView}catch(e){}
}
function boot(){[0,120,320,700].forEach(ms=>setTimeout(refine,ms))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();


/* ===== SOURCE: js/patch-v0845.js ===== */
/* B7 FI Command Center v1.0.3 — current plan state + reversible plan changes.
   - Adds PLANNED <quarter> metric derived from current active plan state.
   - Pull In / Push Out counters count only currently-active deltas vs original plan.
   - Adds REVERSE LATEST PLAN CHANGE on the Master Tool editor.
   - Reversal restores the immediately previous ship date/quarter, preserves audit history,
     and removes/reverts live badges and counters automatically.
   - Brings the same quarter summary metrics to Operations / standalone Live Status.
*/
(function(){'use strict';
const VERSION='1.0.3',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function stamp(){document.title=(document.body?.dataset?.liveViewerOnly==='true'?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`);const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function allTools(){try{return Array.isArray(tools)?tools:[]}catch(e){return[]}}
function qFromDate(v){const m=String(v||'').match(/^(\d{4})-(\d{2})/);return m?`CY${m[1].slice(-2)}Q${Math.floor((+m[2]-1)/3)+1}`:''}
function quarter(){try{if(typeof quarterLabel==='function')return String(quarterLabel()).toUpperCase()}catch(e){};try{if(typeof window.B7ActiveQuarter==='function')return String(window.B7ActiveQuarter()).toUpperCase()}catch(e){};return'CY26Q3'}
function splitValue(v){const a=String(v||'').split('·').map(x=>x.trim());return{ship:a[0]||'',quarter:a[1]||''}}
function baseline(t){return{ship:t?.originalShip||t?.ship||t?.shipDate||'',quarter:String(t?.originalQuarter||qFromDate(t?.originalShip)||t?.quarter||qFromDate(t?.ship||t?.shipDate)||'').toUpperCase()}}
function current(t){return{ship:t?.ship||t?.shipDate||'',quarter:String(t?.quarter||qFromDate(t?.ship||t?.shipDate)||'').toUpperCase()}}
function quarterIndex(q){const m=String(q||'').match(/^CY(\d{2})Q([1-4])$/i);return m?Number(m[1])*4+Number(m[2]):-1}
function planDelta(t){const b=baseline(t),c=current(t);if(b.quarter&&c.quarter&&b.quarter!==c.quarter){const bi=quarterIndex(b.quarter),ci=quarterIndex(c.quarter);return{kind:ci<bi?'pull':'push',old:b,new:c}}if(b.ship&&c.ship&&b.ship!==c.ship)return{kind:'date',old:b,new:c};return null}
function activePlanHistory(t){const hist=Array.isArray(t?.changeHistory)?t.changeHistory:[];return hist.find(h=>!h?.reversedAt&&!/^Reversal$/i.test(String(h?.type||''))&&/MFG Ship\s*\/\s*Quarter|Ship Date|Quarter/i.test(String(h?.field||''))&&String(h?.oldValue??'')!==String(h?.newValue??''))||null}
function planInfo(t){const d=planDelta(t);if(!d)return null;const h=activePlanHistory(t);if(d.kind==='pull')return{kind:'pull',label:'↑ PULL IN',title:`PULLED INTO ${d.new.quarter}`,detail:`${d.old.quarter} → ${d.new.quarter}`,history:h};if(d.kind==='push')return{kind:'push',label:'↓ PUSH OUT',title:`PUSHED OUT TO ${d.new.quarter}`,detail:`${d.old.quarter} → ${d.new.quarter}`,history:h};return{kind:'date',label:'SHIP DATE CHANGED',title:'SHIP DATE CHANGED',detail:`${d.old.ship} → ${d.new.ship}`,history:h}}
function isPulled(t,q){const d=planDelta(t);return !!d&&d.kind==='pull'&&d.new.quarter===q}
function isPushed(t,q){const d=planDelta(t);return !!d&&d.kind==='push'&&d.old.quarter===q}
function baselineCount(q){return allTools().filter(t=>String(t.quarterStatus||'')!=='Archive'&&baseline(t).quarter===q).length}
function plannedCount(q){return baselineCount(q)+allTools().filter(t=>isPulled(t,q)).length-allTools().filter(t=>isPushed(t,q)).length}
function metric(label,value,cls,always=false,activeOverride){const active=activeOverride!=null?activeOverride:(always||Number(value)>0);return `<div class="metric v845-metric ${cls} ${active?'v845-active':'v845-inactive'}"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`}
function status(t){try{return typeof statusFor==='function'?String(statusFor(t)):String(t?.quarterStatus||'Waiting for FI')}catch(e){return String(t?.quarterStatus||'Waiting for FI')}}
function isPacking(t){const s=status(t).toLowerCase(),ss=String(t?.schedule?.status||'').toLowerCase();return s.includes('pack')||(ss&&!/n\/a|not started|complete/.test(ss)&&/(progress|pack|active|updated)/.test(ss))}
function summaryData(q){const list=allTools().filter(t=>String(t.quarterStatus||'')!=='Archive'&&baseline(t).quarter===q);const waiting=list.filter(t=>status(t)==='Waiting for FI').length,infi=list.filter(t=>status(t)==='In FI').length,packing=list.filter(isPacking).length,shipped=list.filter(t=>status(t)==='Shipped').length,pulled=allTools().filter(t=>isPulled(t,q)).length,pushed=allTools().filter(t=>isPushed(t,q)).length,base=baselineCount(q),planned=plannedCount(q);return{q,list,waiting,infi,packing,shipped,pulled,pushed,base,planned}}
function summaryHtml(d){return metric(`${d.q} TOOLS`,d.base,'v845-total',true)+metric(`PLANNED ${d.q} TOOLS`,d.planned,'v845-planned',false,d.planned!==d.base)+metric('WAITING FI',d.waiting,'v845-waiting')+metric('IN FI',d.infi,'v845-infi')+metric('PACKING',d.packing,'v845-packing')+metric('SHIPPED',d.shipped,'v845-shipped')+metric(`PULLED INTO ${d.q}`,d.pulled,'v845-pulled')+metric('PUSHED OUT',d.pushed,'v845-pushed')}
function enhanceToolCenterSummary(){const dash=$('.v837-tool-dashboard'),grid=dash&&$('.v837-summary-grid',dash);if(!grid)return;const d=summaryData(quarter());grid.classList.add('v845-summary-grid');grid.innerHTML=summaryHtml(d)}
function enhanceLiveSummary(){const q=quarter(),d=summaryData(q);$$('.v802-live-metrics').forEach(grid=>{grid.classList.add('v845-live-summary');grid.innerHTML=summaryHtml(d)})}
function enhanceFullPlanBadge(){const t=(()=>{try{return window.B7LiveStatusCore?.currentTool?.()||null}catch(e){return null}})();const host=$('#v802ToolHost');if(!host||!t)return;$$('.v835-plan-change',host).forEach(x=>x.remove());const p=planInfo(t);if(!p)return;const identity=$('.v805-tool-identity',host);if(identity)identity.insertAdjacentHTML('afterbegin',`<div class="v835-plan-change ${esc(p.kind)}"><span>PLAN CHANGE</span><b>${esc(p.title)}</b><small>${esc(p.detail)}</small></div>`)}
function enhanceMiniPlanBadges(){$$('.v842-mini-tool-card').forEach(card=>{const id=card.closest('[data-v837-tool]')?.dataset.v837Tool||card.dataset.v837Tool;const t=allTools().find(x=>String(x.id)===String(id));if(!t)return;const p=planInfo(t),slot=$('.v842-plan,.v842-plan-placeholder',card);if(slot){slot.className=p?`v842-plan ${p.kind}`:'v842-plan-placeholder';slot.textContent=p?p.label:'NO PLAN CHANGE';slot.style.display=p?'':'none'}})}
function editorId(){const m=String($('#headerPageTitle')?.textContent||'').match(/TOOL\s+(\d+)/i);return m?m[1]:''}
function toolById(id){return allTools().find(t=>String(t.id)===String(id))}
function renderLatestPlanBox(){const master=$('.v838-master-tool');if(!master)return;const id=editorId(),t=toolById(id),p=t&&planInfo(t);$('#v845LatestPlan')?.remove();if(!p)return;const plan=$('#tm-plan-type')?.closest('.v838-subsection');if(!plan)return;$('#v841LatestPlan')?.remove();const box=document.createElement('div');box.id='v845LatestPlan';box.className=`v845-latest-plan ${p.kind}`;box.innerHTML=`<div><span>CURRENT ACTIVE PLAN CHANGE</span><b>${esc(p.title)}</b><small>${esc(p.detail)}</small></div><button type="button" id="v845ReversePlan" class="btn danger">REVERSE LATEST PLAN CHANGE</button>`;const helper=plan.querySelector('.helper');if(helper)helper.after(box);else plan.prepend(box);$('#v845ReversePlan').onclick=()=>reverseLatest(id)}
function reverseLatest(id){const t=toolById(id);if(!t)return;const h=activePlanHistory(t);if(!h)return alert('There is no active plan change to reverse.');const old=splitValue(h.oldValue),cur=current(t);if(!confirm(`Reverse latest plan change for Tool ${id}?\n\nRestore ${old.ship||'previous ship date'} · ${old.quarter||'previous quarter'}?`))return;
  const before=`${cur.ship} · ${cur.quarter}`;if(old.ship)t.ship=old.ship;if(old.quarter)t.quarter=old.quarter;h.reversedAt=new Date().toISOString();h.reversedBy='Plan Reversal';t.changeHistory=t.changeHistory||[];t.changeHistory.unshift({field:'Plan Reversal',oldValue:before,newValue:`${t.ship} · ${t.quarter}`,type:'Reversal',reason:`Reversed ${h.type||'plan change'}`,changedAt:new Date().toISOString()});
  // Rebuild legacy convenience flags from the new current delta.
  t.pullIn='';t.pulledInFrom='';t.pushOut='';t.nextQuarter='';const d=planDelta(t);if(d?.kind==='pull'){t.pullIn=t.ship;t.pulledInFrom=d.old.quarter}else if(d?.kind==='push'){t.pushOut=t.ship;t.nextQuarter=t.quarter}
  try{save()}catch(e){console.error(e);return alert('Could not save the reversal.')}try{sessionStorage.setItem('b7.v841.saveNotice',JSON.stringify({id,at:Date.now()}))}catch(e){};try{window.toolAdmin(id)}catch(e){location.reload()}}
function enhanceEditor(){renderLatestPlanBox()}
function refresh(){stamp();enhanceToolCenterSummary();enhanceLiveSummary();enhanceFullPlanBadge();enhanceMiniPlanBadges();enhanceEditor()}
const prior=window.setView;if(typeof prior==='function'){window.setView=function(){const r=prior.apply(this,arguments);[0,50,150,320].forEach(ms=>setTimeout(refresh,ms));return r};try{setView=window.setView}catch(e){}}
if(typeof window.toolAdmin==='function'){const p=window.toolAdmin;window.toolAdmin=function(){const r=p.apply(this,arguments);[0,40,140].forEach(ms=>setTimeout(refresh,ms));return r};try{toolAdmin=window.toolAdmin}catch(e){}}
if(typeof window.toolStatus==='function'){const p=window.toolStatus;window.toolStatus=function(){const r=p.apply(this,arguments);[0,40,140].forEach(ms=>setTimeout(refresh,ms));return r};try{toolStatus=window.toolStatus}catch(e){}}
document.addEventListener('b7fi:live-tool-change',()=>setTimeout(refresh,0));
function boot(){[0,100,300,700].forEach(ms=>setTimeout(refresh,ms))}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();


/* ===== SOURCE: js/patch-v0846.js ===== */
/* B7 FI Command Center v1.0.3 — Tool Center navigation + archive + lifecycle finalization.
   - Tool Center toolbar: navigation left, actions right.
   - Tool Archive gets a dedicated, working route (not Tool Countdown).
   - Canonical tool lifecycle: Waiting to be Handed to FI, In FI, Packing and Shipping, Shipped, Archive.
   - Archive is a lifecycle status, never delete.
   - Tool Center summary uses fixed placeholders and current lifecycle state.
*/
(function(){'use strict';
const VERSION='1.0.3',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function allTools(){try{return Array.isArray(tools)?tools:[]}catch(e){return[]}}
function q(){try{return String(quarterLabel()).toUpperCase()}catch(e){return'CY26Q3'}}
function btn(label,fn,primary=false,danger=false){const b=document.createElement('button');b.type='button';b.className=`btn${primary?' primary':''}${danger?' danger':''}`;b.textContent=label;b.onclick=fn;return b}
function shot(){try{return window.enterScreenshotMode?.()}catch(e){}window.print()}
function report(){window.print()}
function setToolTheme(title){document.body.dataset.center='toolfinal';document.body.dataset.theme='toolcenter';document.documentElement.style.setProperty('--page-accent','#8b5cf6');document.documentElement.style.setProperty('--page-accent-rgb','139,92,246');const h=$('#headerPageTitle');if(h)h.textContent=title;$$('.main-nav .nav-btn').forEach(x=>x.classList.toggle('active',x.dataset.view==='toolcenter'))}
function toolbar(active='tools',mode='list',toolId=''){
 const bar=$('#floatingActions');if(!bar)return;bar.className='floating-actions page-toolbar v837-page-toolbar v846-toolbar';bar.innerHTML='';
 const l=document.createElement('div'),r=document.createElement('div');l.className='v837-toolbar-left v846-nav-left';r.className='v837-toolbar-right v846-actions-right';
 l.append(btn(`${q()} TOOLS`,()=>window.setView('toolcenter'),active==='tools'));l.append(btn('TOOL COUNTDOWN',()=>window.setView('countdown'),active==='countdown'));l.append(btn('TOOL ARCHIVE',renderArchive,active==='archive'));
 if(mode==='detail'){r.append(btn('EDIT TOOL',()=>window.toolAdmin(toolId),true),btn('SCREENSHOT',shot),btn('REPORT',report));}
 else if(mode==='archive'){r.append(btn('SCREENSHOT',shot),btn('REPORT',report));}
 else {r.append(btn('ADD TOOL',()=>window.toolAdmin(),true),btn('SCREENSHOT',shot),btn('REPORT',report));}
 bar.append(l,r);
}
function fmt(v){try{return window.fmt?window.fmt(v):(v||'—')}catch(e){return v||'—'}}
function renderArchive(){
 setToolTheme('TOOL ARCHIVE');
 const list=allTools().filter(t=>String(t.quarterStatus)==='Archive').sort((a,b)=>String(b.archiveDate||b.ship||'').localeCompare(String(a.archiveDate||a.ship||'')));
 const app=$('#app');if(!app)return;
 app.innerHTML=`<div class="report-screen v846-archive"><section class="panel"><div class="subsection-title"><div><h2>TOOL ARCHIVE</h2><p class="helper">Archived tools are retained as historical records. Click any tool to open its Tool page.</p></div><strong>${list.length} ARCHIVED</strong></div><div class="table-wrap"><table class="report-table"><thead><tr><th>UTID</th><th>Tool / Model</th><th>Customer</th><th>Sales Order</th><th>Ship Date</th><th>Quarter</th><th>Archived</th></tr></thead><tbody>${list.map(t=>`<tr class="v846-archive-row" data-v846-tool="${esc(t.id)}"><td><b>${esc(t.id)}</b></td><td>${esc(t.codename||'—')} · ${esc(t.model||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(t.so||'—')}</td><td>${esc(fmt(t.ship))}</td><td>${esc(t.quarter||'—')}</td><td>${esc(fmt(t.archiveDate))}</td></tr>`).join('')||'<tr><td colspan="7" class="gray">No archived tools yet.</td></tr>'}</tbody></table></div></section></div>`;
 $$('[data-v846-tool]').forEach(x=>x.onclick=()=>window.toolStatus(x.dataset.v846Tool));toolbar('archive','archive');try{sessionStorage.setItem('b7.route',JSON.stringify({kind:'view',view:'archive'}))}catch(e){}
}
function lifecycleStatus(t){let s=String(t?.quarterStatus||'Waiting for FI');if(s==='Waiting to be Handed to FI')s='Waiting for FI';if(s==='Packing'||s==='Packing / Shipping')s='Packing and Shipping';return s}
function currentSummary(){
 const quarter=q(),active=allTools().filter(t=>lifecycleStatus(t)!=='Archive'&&String(t.originalQuarter||t.quarter||'').toUpperCase()===quarter);
 const count=s=>active.filter(t=>lifecycleStatus(t)===s).length;
 return {waiting:count('Waiting for FI'),infi:count('In FI'),packing:count('Packing and Shipping'),shipped:count('Shipped')};
}
function repairSummary(){const grid=$('.v845-summary-grid,.v837-summary-grid');if(!grid)return;const s=currentSummary();const cards=$$('.v845-metric',grid);cards.forEach(c=>{const lab=c.querySelector('span')?.textContent?.trim();const val=c.querySelector('strong');if(!val)return;if(lab==='WAITING FI')val.textContent=s.waiting;if(lab==='IN FI')val.textContent=s.infi;if(lab==='PACKING')val.textContent=s.packing;if(lab==='SHIPPED')val.textContent=s.shipped});}
function repairStatusSelect(){const sel=$('#tm-status');if(!sel)return;let cur=sel.value;if(cur==='Packing'||cur==='Packing / Shipping')cur='Packing and Shipping';const opts=[['Waiting for FI','Waiting to be Handed to FI'],['In FI','In FI'],['Packing and Shipping','Packing and Shipping'],['Shipped','Shipped'],['Archive','Archive']];sel.innerHTML=opts.map(([v,l])=>`<option value="${v}" ${v===cur?'selected':''}>${l}</option>`).join('');}
function repairMiniStatus(){ $$('.v842-mini-tool-card').forEach(card=>{const id=card.closest('[data-v837-tool]')?.dataset.v837Tool;const t=allTools().find(x=>String(x.id)===String(id));if(!t)return;const s=lifecycleStatus(t),badge=$('.v842-status',card);if(badge)badge.textContent=s==='Waiting for FI'?'WAITING FOR FI':s.toUpperCase();card.classList.toggle('v843-packing',s==='Packing and Shipping')}) }
function enforceToolbar(){const title=String($('#headerPageTitle')?.textContent||'');if(!/TOOL CENTER|TOOL ARCHIVE|TOOL \d+/.test(title))return;if(/TOOL ARCHIVE/.test(title))toolbar('archive','archive');else if(/TOOL \d+/.test(title)){const m=title.match(/TOOL\s+(\d+)/);toolbar('tools','detail',m?.[1]||'')}else if(/COUNTDOWN/.test($('#app')?.textContent||''))toolbar('countdown');else toolbar('tools');}
const priorSetView=window.setView;if(typeof priorSetView==='function'){window.setView=function(v){if(v==='archive'){renderArchive();return}const r=priorSetView.apply(this,arguments);[0,50,160].forEach(ms=>setTimeout(()=>{repairSummary();enforceToolbar()},ms));return r};try{setView=window.setView}catch(e){}}
const priorToolAdmin=window.toolAdmin;if(typeof priorToolAdmin==='function'){window.toolAdmin=function(){const r=priorToolAdmin.apply(this,arguments);[0,50,150].forEach(ms=>setTimeout(()=>{repairStatusSelect();enforceToolbar()},ms));return r};try{toolAdmin=window.toolAdmin}catch(e){}}
const priorToolStatus=window.toolStatus;if(typeof priorToolStatus==='function'){window.toolStatus=function(id){const r=priorToolStatus.apply(this,arguments);[0,50,150].forEach(ms=>setTimeout(()=>{enforceToolbar();repairMiniStatus()},ms));return r};try{toolStatus=window.toolStatus}catch(e){}}
function refresh(){stamp();repairStatusSelect();repairSummary();repairMiniStatus();enforceToolbar()}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if((b.textContent||'').trim().toUpperCase()==='TOOL ARCHIVE'){e.preventDefault();e.stopImmediatePropagation();renderArchive()}},true);
function boot(){[0,100,300,700].forEach(ms=>setTimeout(refresh,ms))}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();


/* ===== SOURCE: js/patch-v0847.js ===== */
/* B7 FI Command Center v1.0.3 — Tool Center finalization / actionable alerts.
   - Restores the shared compact 8-box quarter summary on Tool Center + Live Status.
   - Structurally enforces Tool Center page-navigation left / page-actions right.
   - Makes Lead Alerts and System Status messages clickable in the editable Command Center.
   - Lead alerts route through their source target; System Status opens the affected Tool.
   - Standalone Live Status remains read-only/non-navigating.
*/
(function(){'use strict';
const VERSION='1.0.3',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function stamp(){document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function toolContext(){const h=String($('#headerPageTitle')?.textContent||'').toUpperCase();return document.body?.dataset?.center==='toolfinal'||document.body?.dataset?.theme==='toolcenter'||/TOOL CENTER|TOOL ARCHIVE|^TOOL\s+\d+/.test(h)}
const leftRx=/^(CY\d{2}Q[1-4]\s+TOOLS|TOOL COUNTDOWN|TOOL ARCHIVE|←\s*BACK\b|BACK TO\b)/i;
function normalizeToolToolbar(){
  if(!toolContext())return;const bar=$('#floatingActions');if(!bar)return;
  bar.classList.add('v847-tool-toolbar');
  let left=bar.querySelector('.v847-toolbar-left,.v846-nav-left,.v837-toolbar-left');
  let right=bar.querySelector('.v847-toolbar-right,.v846-actions-right,.v837-toolbar-right');
  if(!left){left=document.createElement('div');left.className='v847-toolbar-left';bar.prepend(left)}else left.classList.add('v847-toolbar-left');
  if(!right){right=document.createElement('div');right.className='v847-toolbar-right';bar.append(right)}else right.classList.add('v847-toolbar-right');
  const buttons=$$('button',bar);
  buttons.forEach(b=>{const text=String(b.textContent||'').trim();const target=leftRx.test(text)?left:right;if(b.parentElement!==target)target.appendChild(b)});
  if(left.parentElement!==bar)bar.prepend(left);if(right.parentElement!==bar)bar.append(right);
  if(left.nextElementSibling!==right){bar.appendChild(right)}
}
function norm(s){return String(s||'').replace(/\s+/g,' ').trim().toUpperCase()}
function engine(){return window.B7StatusEngine820||window.B7AlertEngine817||null}
function findDisplayed(queue,text){const d=norm(text);return (queue||[]).find(a=>{const t=norm(a?.text);return t&&(d===t||d.startsWith(t)||d.includes(t))})||null}
function goLead(el){
  const e=engine(),q=typeof e?.leadQueue==='function'?e.leadQueue():[];const a=findDisplayed(q,el.textContent);if(!a){if(typeof window.setView==='function')window.setView('actions');return}
  if(typeof window.actionTarget==='function'){window.actionTarget(a);return}
  if(a.toolId&&typeof window.toolStatus==='function'){window.toolStatus(a.toolId);return}
  if(a.view&&typeof window.setView==='function')window.setView(a.view);else if(typeof window.setView==='function')window.setView('actions');
}
function goSystem(el){
  const e=engine(),q=typeof e?.systemQueue==='function'?e.systemQueue():[];const a=findDisplayed(q,el.textContent);if(a?.toolId&&typeof window.toolStatus==='function'){window.toolStatus(a.toolId);return}
  const m=String(el.textContent||'').match(/TOOL\s+(\d+)/i);if(m&&typeof window.toolStatus==='function'){window.toolStatus(m[1]);return}
  if(typeof window.setView==='function')window.setView('toolcenter');
}
function decorateAlerts(){
  if(viewerOnly())return;
  const lead=$('#b7LeadAlertsBar .b7s-message,#topActionBar .v817-status-message');
  const sys=$('#b7SystemStatusBar .b7s-message,#operationsBar .v817-status-message');
  [[lead,'Open the source of this lead alert'],[sys,'Open the affected tool']].forEach(([el,title])=>{if(!el)return;el.setAttribute('role','button');el.setAttribute('tabindex','0');el.setAttribute('title',title);el.setAttribute('aria-label',`${title}: ${String(el.textContent||'').trim()}`)})
}
function activateAlert(el){if(viewerOnly())return;const bar=el.closest('#b7LeadAlertsBar,#topActionBar,#b7SystemStatusBar,#operationsBar');if(!bar)return;if(bar.id==='b7LeadAlertsBar'||bar.id==='topActionBar')goLead(el);else goSystem(el)}
document.addEventListener('click',ev=>{const el=ev.target.closest('.b7s-message,.v817-status-message');if(!el||viewerOnly())return;ev.preventDefault();ev.stopPropagation();activateAlert(el)},true);
document.addEventListener('keydown',ev=>{if(ev.key!=='Enter'&&ev.key!==' ')return;const el=ev.target.closest('.b7s-message,.v817-status-message');if(!el||viewerOnly())return;ev.preventDefault();activateAlert(el)},true);
function refresh(){stamp();normalizeToolToolbar();decorateAlerts()}
const priorSetView=window.setView;if(typeof priorSetView==='function'){window.setView=function(){const r=priorSetView.apply(this,arguments);[0,40,120,260].forEach(ms=>setTimeout(refresh,ms));return r};try{setView=window.setView}catch(e){}}
const priorToolStatus=window.toolStatus;if(typeof priorToolStatus==='function'){window.toolStatus=function(){const r=priorToolStatus.apply(this,arguments);[0,40,120].forEach(ms=>setTimeout(refresh,ms));return r};try{toolStatus=window.toolStatus}catch(e){}}
const priorToolAdmin=window.toolAdmin;if(typeof priorToolAdmin==='function'){window.toolAdmin=function(){const r=priorToolAdmin.apply(this,arguments);[0,40,120].forEach(ms=>setTimeout(refresh,ms));return r};try{toolAdmin=window.toolAdmin}catch(e){}}
function boot(){[0,100,300,700].forEach(ms=>setTimeout(refresh,ms))}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();


/* ===== SOURCE: js/patch-v0849.js ===== */
/* B7 FI Command Center v1.0.3 — shared summary polish + canonical tool identity.
   - Tool Center and Live Status use the same compact 8-box summary presentation.
   - Summary labels and values are centered; values are larger for faster scanning.
   - Full Live Status/Operations cards use UTID -> Code Name -> Model identity.
   - Code Name is added to the structured field boxes without removing any existing field.
   - Tool Center Mini Cards use the same UTID -> Code Name -> Model identity and add Code Name to their field grid.
   - Presentation-only patch: does not alter master tool data or working alert navigation.
*/
(function(){'use strict';
const VERSION='1.0.3',$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function stamp(){document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function allTools(){try{return Array.isArray(tools)?tools:[]}catch(e){return[]}}
function byId(id){return allTools().find(t=>String(t.id||t.utid)===String(id))}
function safe(v,f='—'){return v===undefined||v===null||String(v).trim()===''?f:String(v)}
function fmtD(v){try{return typeof fmt==='function'?fmt(v):safe(v)}catch(e){return safe(v)}}
function modelOf(t){return safe(t?.model||t?.toolType||t?.type)}
function codeOf(t){return safe(t?.codename||t?.codeName||t?.toolCode||t?.productCode,'—')}
function fieldPairs(t){return [
  ['UTID',t?.utid||t?.id],
  ['MODEL',modelOf(t)],
  ['CODE NAME',codeOf(t)],
  ['CUSTOMER',t?.customer],
  ['SALES ORDER',t?.salesOrder||t?.so],
  ['CURRENT CHECKLIST',t?.currentChecklist||t?.checklist],
  ['SHIP DATE',t?.shipDate||t?.ship],
  ['DRIVER',t?.driver||t?.assignedDriver],
  ['CLEANROOM',t?.cleanroom||t?.room||t?.location],
  ['PHASE',t?.quarterStatus||t?.status]
]}
function enhanceSummary(){
  $$('.v845-summary-grid,.v845-live-summary,.v837-summary-grid.v844-summary-grid').forEach(g=>g.classList.add('v849-summary'));
}
function enhanceFullCard(t){
  const host=$('#v802ToolHost');if(!host||!t)return;
  const identity=$('.v805-tool-identity',host);
  if(identity){
    const kicker=$('.v802-tool-kicker',identity);if(kicker)kicker.style.display='none';
    const h=$('h2',identity);if(h)h.textContent=safe(t.utid||t.id,'SYSTEM');
    let sub=$('.v802-tool-sub',identity);
    if(sub){sub.innerHTML=`<span class="v849-code-name">${esc(codeOf(t))}</span><span class="v849-model-name">${esc(modelOf(t))}</span>`;}
  }
  const grid=$('.v802-tool-grid',host);
  if(grid){
    grid.classList.add('v849-full-fields');
    grid.innerHTML=fieldPairs(t).map(([k,v])=>`<div class="v802-tool-field"><span>${esc(k)}</span><b>${esc(k==='SHIP DATE'?fmtD(v):safe(v))}</b></div>`).join('');
  }
}
function miniId(card){return card.closest('[data-v837-tool]')?.dataset.v837Tool||card.dataset.v837Tool||''}
function enhanceMiniCard(card,t){
  if(!card||!t)return;
  const head=$('.v842-head',card);if(head){
    const left=head.firstElementChild;
    if(left){
      let ident=$('.v849-mini-identity',left);
      if(!ident){ident=document.createElement('div');ident.className='v849-mini-identity';left.appendChild(ident)}
      ident.innerHTML=`<span class="v849-mini-code">${esc(codeOf(t))}</span><span class="v849-mini-model">${esc(modelOf(t))}</span>`;
    }
  }
  const fields=$('.v842-fields',card);if(fields){
    const current=[
      ['CODE NAME',codeOf(t)],
      ['MODEL',modelOf(t)],
      ['CUSTOMER',t.customer],
      ['SALES ORDER',t.salesOrder||t.so],
      ['SHIP DATE',t.shipDate||t.ship],
      ['DRIVER',t.driver||t.assignedDriver],
      ['CLEANROOM',t.cleanroom||t.room||t.location]
    ];
    fields.classList.add('v849-mini-fields');
    fields.innerHTML=current.map(([k,v])=>`<div><span>${esc(k)}</span><b>${esc(k==='SHIP DATE'?fmtD(v):safe(v))}</b></div>`).join('');
  }
}
function enhanceMiniCards(){
  $$('.v842-mini-tool-card').forEach(card=>{const t=byId(miniId(card));if(t)enhanceMiniCard(card,t)});
}
function currentLiveTool(){
  try{const t=window.B7LiveStatusCore?.currentTool?.();if(t)return t}catch(e){}
  const id=String($('#v802ToolHost .v805-tool-identity h2')?.textContent||'').trim();return id?byId(id):null;
}
function refresh(){stamp();enhanceSummary();enhanceMiniCards();const t=currentLiveTool();if(t)enhanceFullCard(t)}

document.addEventListener('b7fi:live-tool-change',ev=>{setTimeout(()=>{enhanceFullCard(ev.detail?.tool||currentLiveTool());enhanceSummary()},0)});
const priorSetView=window.setView;if(typeof priorSetView==='function'){window.setView=function(){const r=priorSetView.apply(this,arguments);[0,50,150,320].forEach(ms=>setTimeout(refresh,ms));return r};try{setView=window.setView}catch(e){}}
const priorToolStatus=window.toolStatus;if(typeof priorToolStatus==='function'){window.toolStatus=function(){const r=priorToolStatus.apply(this,arguments);[0,40,120].forEach(ms=>setTimeout(refresh,ms));return r};try{toolStatus=window.toolStatus}catch(e){}}
const priorToolAdmin=window.toolAdmin;if(typeof priorToolAdmin==='function'){window.toolAdmin=function(){const r=priorToolAdmin.apply(this,arguments);[0,40,120].forEach(ms=>setTimeout(refresh,ms));return r};try{toolAdmin=window.toolAdmin}catch(e){}}
function boot(){[0,120,350,800].forEach(ms=>setTimeout(refresh,ms))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();


/* ===== SOURCE: js/patch-v0850.js ===== */
/* B7 FI Command Center v1.0.3 — Tool Center workflow lock + shared status language.
   - Final Tool Center page-toolbar convention: navigation left, actions right, no center/duplicates.
   - Tool Center workflows: quarter setup (Add Tool), active Tool editing, quarter-close bulk archive.
   - One Master Tool record remains the source of truth; saves emit a universal tool-record update event.
   - Tool Center + Operations/Live Status use the same 8 KPI boxes and status-color borders.
   - Restores OPERATIONS CENTER — <quarter> title.
   - Repairs Meeting Center top-navigation routing through the mature Meeting renderer.
*/
(function(){'use strict';
const VERSION='1.0.3';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;

function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function q(){try{return String(window.getB7ActiveQuarter?.()||window.quarterLabel?.()||'CY26Q3').toUpperCase()}catch(e){return'CY26Q3'}}
function stamp(){document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function allTools(){try{return Array.isArray(window.tools)?window.tools:(Array.isArray(tools)?tools:[])}catch(e){return[]}}
function lifecycle(t){let s=String(t?.quarterStatus||'Waiting for FI');if(s==='Waiting to be Handed to FI')s='Waiting for FI';if(s==='Packing'||s==='Packing / Shipping')s='Packing and Shipping';return s}
function shot(){try{if(typeof window.enterScreenshotMode==='function')return window.enterScreenshotMode()}catch(e){}window.print()}
function report(){window.print()}
function button(label,fn,primary=false,danger=false){const b=document.createElement('button');b.type='button';b.className=`btn${primary?' primary':''}${danger?' danger':''}`;b.textContent=label;b.onclick=fn;return b}
function setToolTheme(title){
  document.body.dataset.center='toolfinal';document.body.dataset.theme='toolcenter';
  document.documentElement.style.setProperty('--page-accent','#8b5cf6');document.documentElement.style.setProperty('--page-accent-rgb','139,92,246');
  const h=$('#headerPageTitle');if(h)h.textContent=title;
  $$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='toolcenter'));
}
function navButtons(active){return [
  button(`${q()} TOOLS`,()=>window.setView?.('toolcenter'),active==='tools'),
  button('TOOL COUNTDOWN',()=>window.setView?.('countdown'),active==='countdown'),
  button('TOOL ARCHIVE',()=>window.setView?.('archive'),active==='archive')
]}
function routeKind(){
  const title=String($('#headerPageTitle')?.textContent||'').trim().toUpperCase();
  const text=String($('#app')?.textContent||'').toUpperCase();
  if(/^ADD TOOL\b/.test(title)||/NEW TOOL RECORD/.test(text))return {kind:'add',active:'tools'};
  if(/—\s*EDIT\b/.test(title)||/EDITING TOOL/.test(text))return {kind:'edit',active:'tools',id:(title.match(/TOOL\s+(\w+)/)||[])[1]||''};
  if(/^TOOL\s+\w+/.test(title)&&!/CENTER/.test(title))return {kind:'detail',active:'tools',id:(title.match(/TOOL\s+(\w+)/)||[])[1]||''};
  if(/TOOL ARCHIVE/.test(title)||/\bTOOL ARCHIVE\b/.test(text))return {kind:'archive',active:'archive'};
  if(/TOOL COUNTDOWN/.test(text))return {kind:'countdown',active:'countdown'};
  if(/TOOL CENTER/.test(title)||document.body?.dataset?.theme==='toolcenter')return {kind:'tools',active:'tools'};
  return null;
}
function existingAction(label){return $$('#floatingActions button').find(b=>String(b.textContent||'').trim().toUpperCase()===label)}
function bulkArchive(){
  const eligible=allTools().filter(t=>lifecycle(t)==='Shipped'&&lifecycle(t)!=='Archive');
  if(!eligible.length){alert('There are no Shipped tools ready to archive.');return}
  const ids=eligible.map(t=>t.id||t.utid).join(', ');
  if(!confirm(`Archive ${eligible.length} shipped tool${eligible.length===1?'':'s'}?\n\n${ids}\n\nThe Tool records and history will be retained in Tool Archive.`))return;
  const today=new Date().toISOString().slice(0,10);
  eligible.forEach(t=>{t.quarterStatus='Archive';t.archiveDate=t.archiveDate||today});
  try{window.save?.()}catch(e){try{save()}catch(_){} }
  document.dispatchEvent(new CustomEvent('b7fi:tool-records-updated',{detail:{reason:'bulk-archive',ids:eligible.map(t=>t.id)}}));
  window.setView?.('archive');
}
function rebuildToolToolbar(){
  if(viewerOnly())return;
  const ctx=routeKind();if(!ctx)return;
  const bar=$('#floatingActions');if(!bar)return;
  /* Preserve bound Save/Delete/Cancel elements before clearing the toolbar. */
  const preserved={save:existingAction('SAVE TOOL'),del:existingAction('DELETE TOOL'),cancel:existingAction('CANCEL')};
  bar.className='floating-actions page-toolbar v850-tool-toolbar';bar.innerHTML='';
  const left=document.createElement('div'),right=document.createElement('div');left.className='v850-tool-nav';right.className='v850-tool-actions';
  navButtons(ctx.active).forEach(b=>left.appendChild(b));
  if(ctx.kind==='tools'||ctx.kind==='countdown'){
    right.append(button('ADD TOOL',()=>window.toolAdmin?.(),true),button('SCREENSHOT',shot),button('REPORT',report));
  }else if(ctx.kind==='archive'){
    right.append(button('ARCHIVE TOOLS',bulkArchive,true),button('SCREENSHOT',shot),button('REPORT',report));
  }else if(ctx.kind==='detail'){
    right.append(button('EDIT TOOL',()=>window.toolAdmin?.(ctx.id),true),button('SCREENSHOT',shot),button('REPORT',report));
  }else if(ctx.kind==='add'||ctx.kind==='edit'){
    const cancel=preserved.cancel||button('CANCEL',()=>ctx.kind==='edit'?window.toolStatus?.(ctx.id):window.setView?.('toolcenter'));
    right.append(cancel);
    if(preserved.save)right.append(preserved.save);
    if(ctx.kind==='edit'&&preserved.del)right.append(preserved.del);
  }
  bar.append(left,right);
}

const KPI_CLASS={
  'CY26Q3 TOOLS':'total','PLANNED CY26Q3 TOOLS':'planned','WAITING FI':'waiting','IN FI':'infi','PACKING':'packing','SHIPPED':'shipped',
  'PULLED INTO CY26Q3':'pullin','PUSHED OUT':'pushout'
};
function kpiKind(label){label=String(label||'').trim().toUpperCase();if(/^CY\d{2}Q[1-4] TOOLS$/.test(label))return'total';if(/^PLANNED CY\d{2}Q[1-4] TOOLS$/.test(label))return'planned';if(/^PULLED INTO CY\d{2}Q[1-4]$/.test(label))return'pullin';return KPI_CLASS[label]||''}
function styleSummaries(){
  $$('.v849-summary,.v845-summary-grid,.v845-live-summary,.v837-summary-grid.v844-summary-grid').forEach(grid=>{
    grid.classList.add('v850-summary');
    $$('.metric,.v845-metric',grid).forEach(card=>{
      const label=$('span',card)?.textContent||'',kind=kpiKind(label),value=Number(String($('strong',card)?.textContent||'0').replace(/[^0-9.-]/g,''))||0;
      [...card.classList].filter(x=>x.startsWith('v850-kpi-')).forEach(x=>card.classList.remove(x));
      if(kind)card.classList.add(`v850-kpi-${kind}`);
      const conditional=['planned','packing','pullin','pushout'].includes(kind);
      let active=value>0;
      if(kind==='planned'){
        const totalCard=$$('.metric,.v845-metric',grid).find(c=>kpiKind($('span',c)?.textContent)==='total');
        const total=Number(String($('strong',totalCard)?.textContent||'0').replace(/[^0-9.-]/g,''))||0;active=value!==total;
      }
      card.classList.toggle('v850-kpi-muted',conditional&&!active);
    });
  });
}

function setCenterTitle(view){
  if(viewerOnly())return;
  const h=$('#headerPageTitle');if(!h)return;
  const map={home:`OPERATIONS CENTER — ${q()}`,toolcenter:`TOOL CENTER — ${q()}`,systems:`TOOL CENTER — ${q()}`,shipping:`SHIPPING CENTER — ${q()}`,priorities:`PRIORITY CENTER — ${q()}`,statuscenter:`STATUS CENTER — ${q()}`,meetingcenter:'MEETING CENTER',actions:'ACTION CENTER',referencecenter:'REFERENCE CENTER',searchcenter:'SEARCH CENTER'};
  if(map[view]&&!/^TOOL\s+\w+/i.test(h.textContent||''))h.textContent=map[view];
}
function openMeeting(){
  try{if(typeof window.B7Renderers58?.meetingCenter==='function'){window.B7Renderers58.meetingCenter();}}
  catch(e){return window.setView?.('statuscenter')}
  document.body.dataset.theme='meeting';document.body.dataset.center='meeting';
  $$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='meetingcenter'));
  const h=$('#headerPageTitle');if(h)h.textContent='MEETING CENTER';
}

/* One-source-of-truth save event. All views continue to read the same tools[] master records. */
const priorSave=window.save;
if(typeof priorSave==='function'&&!priorSave.__v850){
  const wrapped=function(){const out=priorSave.apply(this,arguments);try{document.dispatchEvent(new CustomEvent('b7fi:tool-records-updated',{detail:{reason:'save',at:Date.now()}}))}catch(e){}return out};wrapped.__v850=true;window.save=wrapped;try{save=wrapped}catch(e){}
}

document.addEventListener('b7fi:tool-records-updated',()=>{[0,80,220].forEach(ms=>setTimeout(()=>{styleSummaries();rebuildToolToolbar()},ms))});
/* Meeting Center gets an explicit route so later legacy wrappers cannot send it to Status Center. */
document.addEventListener('click',e=>{const b=e.target.closest('.main-nav .nav-btn[data-view="meetingcenter"]');if(!b||viewerOnly())return;e.preventDefault();e.stopImmediatePropagation();openMeeting()},true);

const priorSetView=window.setView;
if(typeof priorSetView==='function'){
  window.setView=function(v){
    if(v==='meetingcenter'&&!viewerOnly()){openMeeting();return}
    const out=priorSetView.apply(this,arguments);
    [0,50,160,420,900].forEach(ms=>setTimeout(()=>{setCenterTitle(v);styleSummaries();rebuildToolToolbar()},ms));
    return out;
  };try{setView=window.setView}catch(e){}
}
const priorToolStatus=window.toolStatus;if(typeof priorToolStatus==='function'){window.toolStatus=function(){const out=priorToolStatus.apply(this,arguments);[0,70,220,500].forEach(ms=>setTimeout(()=>{styleSummaries();rebuildToolToolbar()},ms));return out};try{toolStatus=window.toolStatus}catch(e){}}
const priorToolAdmin=window.toolAdmin;if(typeof priorToolAdmin==='function'){window.toolAdmin=function(){const out=priorToolAdmin.apply(this,arguments);[0,70,220,500].forEach(ms=>setTimeout(()=>{styleSummaries();rebuildToolToolbar()},ms));return out};try{toolAdmin=window.toolAdmin}catch(e){}}

function boot(){
  stamp();
  const active=$('.main-nav .nav-btn.active')?.dataset.view||'home';
  [0,120,350,800,1400].forEach(ms=>setTimeout(()=>{setCenterTitle(active);styleSummaries();rebuildToolToolbar()},ms));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();


/* ===== SOURCE: js/patch-v0851.js ===== */
/* B7 FI Command Center v1.0.3 — Tool Center framework finalization.
   - Countdown removes helper description.
   - Archive becomes a clean historical list.
   - ARCHIVE TOOL opens a deliberate archive-selection mode.
   - Archive mode uses CANCEL / SAVE with explicit save acknowledgement.
   - Archive is a master-record lifecycle change; all active views update from the same tools[] records.
*/
(function(){'use strict';
const VERSION='1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function q(){try{return String(window.getB7ActiveQuarter?.()||window.quarterLabel?.()||'CY26Q3').toUpperCase()}catch(e){return'CY26Q3'}}
function allTools(){try{return Array.isArray(window.tools)?window.tools:(Array.isArray(tools)?tools:[])}catch(e){return[]}}
function saveAll(){try{window.save?.()}catch(e){try{save()}catch(_){}}}
function shot(){try{if(typeof window.enterScreenshotMode==='function')return window.enterScreenshotMode()}catch(e){}window.print()}
function btn(label,fn,primary=false){const b=document.createElement('button');b.type='button';b.className='btn'+(primary?' primary':'');b.textContent=label;b.onclick=fn;return b}
function setTheme(title){document.body.dataset.center='toolfinal';document.body.dataset.theme='toolcenter';const h=$('#headerPageTitle');if(h)h.textContent=title;$$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='toolcenter'))}
function nav(active){return [btn(`${q()} TOOLS`,()=>window.setView?.('toolcenter'),active==='tools'),btn('TOOL COUNTDOWN',()=>window.setView?.('countdown'),active==='countdown'),btn('TOOL ARCHIVE',renderArchive,active==='archive')]}
function toolbar(active,mode='normal'){
 const bar=$('#floatingActions');if(!bar)return;bar.className='floating-actions page-toolbar v850-tool-toolbar v851-tool-toolbar';bar.innerHTML='';
 const left=document.createElement('div'),right=document.createElement('div');left.className='v850-tool-nav';right.className='v850-tool-actions';nav(active).forEach(x=>left.append(x));
 if(mode==='archive-edit'){right.append(btn('CANCEL',renderArchive),btn('SAVE',saveArchive,true));}
 else if(active==='archive'){right.append(btn('ARCHIVE TOOL',renderArchiveMode,true),btn('SCREENSHOT',shot),btn('REPORT',()=>window.print()));}
 else {right.append(btn('ADD TOOL',()=>window.toolAdmin?.(),true),btn('SCREENSHOT',shot),btn('REPORT',()=>window.print()));}
 bar.append(left,right);
}
function activeTools(){return allTools().filter(t=>String(t.quarterStatus||'')!=='Archive')}
function archivedTools(){return allTools().filter(t=>String(t.quarterStatus||'')==='Archive')}
function fmt(v){if(!v)return'—';try{const d=new Date(v+'T00:00:00');return isNaN(d)?v:d.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}catch(e){return v}}
function openTool(id){if(typeof window.toolStatus==='function')window.toolStatus(id)}
function archiveTable(list){return `<div class="table-wrap"><table class="report-table v851-archive-table"><thead><tr><th>UTID</th><th>CODE NAME</th><th>MODEL</th><th>CUSTOMER</th><th>SALES ORDER</th><th>SHIP DATE</th><th>QUARTER</th><th>ARCHIVED</th></tr></thead><tbody>${list.map(t=>`<tr class="v851-open-tool" data-id="${esc(t.id)}"><td><b>${esc(t.id)}</b></td><td>${esc(t.codename||'—')}</td><td>${esc(t.model||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(t.so||'—')}</td><td>${esc(fmt(t.ship))}</td><td>${esc(t.quarter||'—')}</td><td>${esc(fmt(t.archiveDate))}</td></tr>`).join('')||'<tr><td colspan="8" class="gray v851-empty">No archived tools.</td></tr>'}</tbody></table></div>`}
function renderArchive(){setTheme('TOOL ARCHIVE');const app=$('#app');if(!app)return;const list=archivedTools();app.innerHTML=`<div class="report-screen v851-archive"><section class="panel v851-flat-panel">${archiveTable(list)}</section></div>`;toolbar('archive');$$('.v851-open-tool',app).forEach(r=>r.onclick=()=>openTool(r.dataset.id));}
function renderArchiveMode(){setTheme('TOOL ARCHIVE — SELECT TOOL');const app=$('#app');if(!app)return;const list=activeTools();app.innerHTML=`<div class="report-screen v851-archive-mode"><section class="panel v851-flat-panel"><div class="table-wrap"><table class="report-table"><thead><tr><th>UTID</th><th>CODE NAME</th><th>MODEL</th><th>CUSTOMER</th><th>CURRENT STATUS</th><th>FI STATUS</th></tr></thead><tbody>${list.map(t=>`<tr><td><b>${esc(t.id)}</b></td><td>${esc(t.codename||'—')}</td><td>${esc(t.model||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(t.quarterStatus||'Waiting for FI')}</td><td><select class="v851-archive-select" data-id="${esc(t.id)}"><option value="">${esc(t.quarterStatus||'Waiting for FI')}</option><option value="Archive">Archive</option></select></td></tr>`).join('')||'<tr><td colspan="6" class="gray v851-empty">No active tools available to archive.</td></tr>'}</tbody></table></div><div id="v851ArchiveNotice" class="v851-save-notice" aria-live="polite"></div></section></div>`;toolbar('archive','archive-edit');}
function saveArchive(){const selected=$$('.v851-archive-select').filter(s=>s.value==='Archive');if(!selected.length){const n=$('#v851ArchiveNotice');if(n){n.textContent='No changes to save.';n.className='v851-save-notice show neutral'}return}
 const ids=selected.map(s=>s.dataset.id),today=new Date().toISOString().slice(0,10);allTools().forEach(t=>{if(ids.includes(String(t.id))){t.quarterStatus='Archive';t.archiveDate=today}});saveAll();
 try{document.dispatchEvent(new CustomEvent('b7fi:tool-records-updated',{detail:{reason:'archive',ids}}))}catch(e){}
 renderArchive();setTimeout(()=>{const app=$('#app');if(!app)return;const note=document.createElement('div');note.className='v851-global-ack';note.textContent=ids.length===1?`✓ Tool ${ids[0]} moved to Archive`:`✓ ${ids.length} tools moved to Archive`;app.prepend(note);setTimeout(()=>note.remove(),4200)},20);
}
function cleanCountdown(){const app=$('#app');if(!app)return;const text=String(app.textContent||'').toUpperCase();if(!text.includes('TOOL COUNTDOWN'))return;setTheme(`TOOL CENTER — ${q()}`);toolbar('countdown');$$('.helper',app).forEach(p=>{if(/Fast quarter view/i.test(p.textContent||''))p.remove()});}
/* Override archive route after legacy renderers. */
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const tx=String(b.textContent||'').trim().toUpperCase();if(tx==='TOOL ARCHIVE'){e.preventDefault();e.stopImmediatePropagation();renderArchive()}},true);
const priorSetView=window.setView;if(typeof priorSetView==='function'){window.setView=function(v){if(v==='archive'){renderArchive();return}const out=priorSetView.apply(this,arguments);if(v==='countdown')[0,60,180,500].forEach(ms=>setTimeout(cleanCountdown,ms));return out};try{setView=window.setView}catch(e){}}
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function boot(){stamp();const app=$('#app');if(app&&/TOOL COUNTDOWN/i.test(app.textContent||''))cleanCountdown();if(app&&/TOOL ARCHIVE/i.test(app.textContent||''))renderArchive()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();


/* ===== SOURCE: js/patch-v0852.js ===== */
/* B7 FI Command Center v1.0.3 — Tool Center + Administration stabilization.
   - Restores Administration Home access to full Data & Backup / Entra-SharePoint tools.
   - Keeps Tool Center page navigation fixed left and page actions fixed right.
   - Tool Countdown removes redundant in-page title/description.
   - Tool Archive is a clean list with ARCHIVE TOOL -> CANCEL / SAVE workflow.
   - Archive changes the master tool lifecycle record and preserves history/data.
*/
(function(){'use strict';
const VERSION='1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function q(){try{return String(window.getB7ActiveQuarter?.()||window.quarterLabel?.()||'CY26Q3').toUpperCase()}catch(e){return'CY26Q3'}}
function toolsAll(){try{return Array.isArray(window.tools)?window.tools:(Array.isArray(tools)?tools:[])}catch(e){return[]}}
function saveMaster(){try{return window.save?.()}catch(e){try{return save()}catch(_){}}}
function fmt(v){if(!v)return'—';try{const d=new Date(String(v).slice(0,10)+'T00:00:00');return isNaN(d)?String(v):d.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}catch(e){return String(v)}}
function btn(label,fn,primary=false){const b=document.createElement('button');b.type='button';b.className='btn'+(primary?' primary':'');b.textContent=label;b.onclick=fn;return b}
function shot(){try{if(typeof window.enterScreenshotMode==='function')return window.enterScreenshotMode()}catch(e){}window.print()}
function report(){window.print()}
function setTheme(title,kind='tool'){
 document.body.dataset.center=kind==='admin'?'admin':'toolfinal';document.body.dataset.theme=kind==='admin'?'admin':'toolcenter';
 const accent=kind==='admin'?'#a6afbc':'#8b5cf6',rgb=kind==='admin'?'166,175,188':'139,92,246';
 document.documentElement.style.setProperty('--page-accent',accent);document.documentElement.style.setProperty('--page-accent-rgb',rgb);
 const h=$('#headerPageTitle');if(h)h.textContent=title;
 $$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',kind==='tool'&&b.dataset.view==='toolcenter'));
}
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function toolNav(active){return [
 btn(`${q()} TOOLS`,()=>window.setView?.('toolcenter'),active==='tools'),
 btn('TOOL COUNTDOWN',()=>window.setView?.('countdown'),active==='countdown'),
 btn('TOOL ARCHIVE',renderArchive,active==='archive')
]}
function toolToolbar(active,mode='normal'){
 const bar=$('#floatingActions');if(!bar)return;bar.className='floating-actions page-toolbar v852-toolbar';bar.innerHTML='';
 const left=document.createElement('div'),right=document.createElement('div');left.className='v852-nav-left';right.className='v852-actions-right';toolNav(active).forEach(b=>left.append(b));
 if(mode==='archive-edit')right.append(btn('CANCEL',renderArchive),btn('SAVE',saveArchive,true));
 else if(active==='archive')right.append(btn('ARCHIVE TOOL',renderArchiveMode,true),btn('SCREENSHOT',shot),btn('REPORT',report));
 else right.append(btn('ADD TOOL',()=>window.toolAdmin?.(),true),btn('SCREENSHOT',shot),btn('REPORT',report));
 bar.append(left,right);
}
function activeTools(){return toolsAll().filter(t=>String(t.quarterStatus||'').toLowerCase()!=='archive')}
function archivedTools(){return toolsAll().filter(t=>String(t.quarterStatus||'').toLowerCase()==='archive')}
function openTool(id){if(typeof window.toolStatus==='function')window.toolStatus(id)}
function archiveRows(list){return list.map(t=>`<tr class="v852-open-tool" data-id="${esc(t.id||t.utid)}"><td><b>${esc(t.id||t.utid)}</b></td><td>${esc(t.codename||t.codeName||'—')}</td><td>${esc(t.model||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(t.so||t.salesOrder||'—')}</td><td>${esc(fmt(t.ship||t.shipDate))}</td><td>${esc(t.quarter||'—')}</td><td>${esc(fmt(t.archiveDate))}</td></tr>`).join('')}
function renderArchive(){
 setTheme('TOOL ARCHIVE');const app=$('#app');if(!app)return;const list=archivedTools();
 app.innerHTML=`<div class="v852-simple-page"><div class="table-wrap"><table class="report-table v852-archive-table"><thead><tr><th>UTID</th><th>CODE NAME</th><th>MODEL</th><th>CUSTOMER</th><th>SALES ORDER</th><th>SHIP DATE</th><th>QUARTER</th><th>ARCHIVED</th></tr></thead><tbody>${archiveRows(list)||'<tr><td colspan="8" class="gray">No archived tools.</td></tr>'}</tbody></table></div></div>`;
 toolToolbar('archive');$$('.v852-open-tool',app).forEach(r=>r.onclick=()=>openTool(r.dataset.id));
}
function renderArchiveMode(){
 setTheme('TOOL ARCHIVE');const app=$('#app');if(!app)return;const list=activeTools();
 app.innerHTML=`<div class="v852-simple-page"><div class="table-wrap"><table class="report-table"><thead><tr><th>UTID</th><th>CODE NAME</th><th>MODEL</th><th>CUSTOMER</th><th>CURRENT STATUS</th><th>NEW STATUS</th></tr></thead><tbody>${list.map(t=>`<tr><td><b>${esc(t.id||t.utid)}</b></td><td>${esc(t.codename||t.codeName||'—')}</td><td>${esc(t.model||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(t.quarterStatus||'Waiting to be Handed to FI')}</td><td><select class="v852-archive-select" data-id="${esc(t.id||t.utid)}"><option value="">No Change</option><option value="Archive">Archive</option></select></td></tr>`).join('')||'<tr><td colspan="6" class="gray">No active tools available to archive.</td></tr>'}</tbody></table></div><div id="v852Notice" class="v852-notice" aria-live="polite"></div></div>`;
 toolToolbar('archive','archive-edit');
}
function saveArchive(){
 const ids=$$('.v852-archive-select').filter(s=>s.value==='Archive').map(s=>String(s.dataset.id));
 if(!ids.length){const n=$('#v852Notice');if(n){n.textContent='No changes to save.';n.classList.add('show')}return}
 const today=new Date().toISOString().slice(0,10);toolsAll().forEach(t=>{if(ids.includes(String(t.id||t.utid))){t.quarterStatus='Archive';t.archiveDate=today;t.status='Archive'}});saveMaster();
 try{document.dispatchEvent(new CustomEvent('b7fi:tool-records-updated',{detail:{reason:'archive',ids}}))}catch(e){}
 renderArchive();const note=document.createElement('div');note.className='v852-ack';note.textContent=ids.length===1?`✓ Tool ${ids[0]} moved to Archive`:`✓ ${ids.length} tools moved to Archive`;$('#app')?.prepend(note);setTimeout(()=>note.remove(),4200);
}
function cleanCountdown(){
 const app=$('#app');if(!app||!/TOOL COUNTDOWN/i.test(app.textContent||''))return;setTheme(`TOOL CENTER — ${q()}`);
 /* Remove redundant content title/helper only; keep table and page shell. */
 $$('h1,h2,h3',app).forEach(h=>{if(new RegExp(`^${q()}\\s+TOOL COUNTDOWN$`,'i').test((h.textContent||'').trim())||/^TOOL COUNTDOWN$/i.test((h.textContent||'').trim()))h.remove()});
 $$('.helper,p.gray,p',app).forEach(p=>{if(/Fast quarter view|Click any tool to open its master Tool page/i.test(p.textContent||''))p.remove()});
 toolToolbar('countdown');
}
function adminToolbar(active='home'){
 const bar=$('#floatingActions');if(!bar)return;bar.className='floating-actions page-toolbar v852-toolbar';bar.innerHTML='';
 const left=document.createElement('div'),right=document.createElement('div');left.className='v852-nav-left';right.className='v852-actions-right';
 left.append(btn('ADMIN HOME',renderAdminHome,active==='home'),btn('DATA & BACKUP',renderAdminData,active==='data'));
 right.append(btn('SCREENSHOT',shot),btn('REPORT',report));bar.append(left,right);
}
function renderAdminHome(){
 setTheme('ADMINISTRATION CENTER','admin');const app=$('#app');if(!app)return;
 app.innerHTML=`<div class="v852-admin-home">
   <section class="panel v852-admin-hero"><div><span class="eyebrow">DATA PROTECTION & INTEGRATION</span><h2>Administration Center</h2><p class="gray">Protect Command Center data before archive/delete tests and manage Entra / SharePoint connection settings.</p></div></section>
   <div class="v852-admin-grid">
    <button class="v852-admin-card" id="v852Backup"><b>DATA & BACKUP</b><span>Export full backup · Restore backup · Migration CSV</span><em>OPEN DATA & BACKUP →</em></button>
    <button class="v852-admin-card" id="v852Entra"><b>ENTRA / SHAREPOINT</b><span>Tenant ID · Client/Application ID · SharePoint readiness</span><em>OPEN ENTRA SETTINGS →</em></button>
    <button class="v852-admin-card" id="v852Legacy"><b>ADMINISTRATION TOOLS</b><span>Tool admin · priorities · shipping · configuration</span><em>OPEN ADMIN TOOLS →</em></button>
   </div></div>`;
 adminToolbar('home');$('#v852Backup').onclick=renderAdminData;$('#v852Entra').onclick=renderAdminData;$('#v852Legacy').onclick=renderLegacyAdmin;
}
function renderAdminData(){
 setTheme('ADMINISTRATION CENTER','admin');
 try{if(typeof window.sharedData==='function')window.sharedData();else if(typeof sharedData==='function')sharedData();else throw new Error('Data & Backup renderer unavailable');}
 catch(e){const app=$('#app');if(app)app.innerHTML=`<div class="panel"><h2>Data & Backup</h2><p class="gray">${esc(e.message)}</p></div>`}
 adminToolbar('data');
}
function renderLegacyAdmin(){
 setTheme('ADMINISTRATION CENTER','admin');
 try{if(typeof window.admin==='function')window.admin('home');else if(typeof admin==='function')admin('home');}
 catch(e){const app=$('#app');if(app)app.innerHTML=`<div class="panel"><h2>Administration Tools</h2><p class="gray">${esc(e.message)}</p></div>`}
 adminToolbar('home');
}
/* Capture Tool Center subnavigation so late legacy handlers cannot replace these pages. */
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const text=String(b.textContent||'').trim().toUpperCase();
 if(text==='TOOL ARCHIVE'){e.preventDefault();e.stopImmediatePropagation();renderArchive();return}
 if(text==='TOOL COUNTDOWN'){setTimeout(cleanCountdown,0);setTimeout(cleanCountdown,100);return}
},true);
/* Footer Administration button is authoritative. */
document.addEventListener('click',e=>{const b=e.target.closest('#administrationCenterFooter');if(!b)return;e.preventDefault();e.stopImmediatePropagation();renderAdminHome()},true);
const priorSetView=window.setView;
if(typeof priorSetView==='function'){
 window.setView=function(v){
   if(v==='archive'){renderArchive();return}
   if(v==='admincenter'||v==='admin'){renderAdminHome();return}
   if(v==='shared'){renderAdminData();return}
   const out=priorSetView.apply(this,arguments);
   if(v==='countdown')[0,60,180,500].forEach(ms=>setTimeout(cleanCountdown,ms));
   return out;
 };try{setView=window.setView}catch(e){}
}
function boot(){stamp();const app=$('#app');if(app&&/TOOL COUNTDOWN/i.test(app.textContent||''))cleanCountdown()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();


/* ===== SOURCE: js/patch-v0854.js ===== */
/* B7 FI Command Center v1.0.3 — Centralized Page Navigation Framework
   One authoritative secondary toolbar. Left = destinations, right = actions.
   Removes the v1.0.1 delayed toolbar recovery layer that caused jumpy controls.
*/
(function(){'use strict';
const VERSION='1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;
function q(){try{return String(window.getB7ActiveQuarter?.()||window.quarterLabel?.()||'CY26Q3').toUpperCase()}catch(e){return'CY26Q3'}}
function allTools(){try{return Array.isArray(window.tools)?window.tools:(Array.isArray(tools)?tools:[])}catch(e){return[]}}
function shot(){try{if(typeof window.enterScreenshotMode==='function')return window.enterScreenshotMode()}catch(e){}try{if(typeof window.enterScreenshot==='function')return window.enterScreenshot()}catch(e){}window.print()}
function report(){try{if(typeof window.openReport530==='function')return window.openReport530()}catch(e){}window.print()}
function B(label,fn,primary=false,danger=false){const b=document.createElement('button');b.type='button';b.className='btn'+(primary?' primary':'')+(danger?' danger':'');b.textContent=label;b.onclick=fn;return b}
function toolbar(left=[],right=[]){const bar=$('#floatingActions');if(!bar)return;bar.className='floating-actions page-toolbar v854-toolbar';bar.innerHTML='';const l=document.createElement('div'),r=document.createElement('div');l.className='v854-nav-left';r.className='v854-actions-right';left.filter(Boolean).forEach(x=>l.appendChild(x));right.filter(Boolean).forEach(x=>r.appendChild(x));bar.append(l,r)}
function stamp(){document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function callAdmin(section){try{if(typeof window.admin==='function')return window.admin(section);if(typeof admin==='function')return admin(section)}catch(e){}}
function toolsNav(active){return [B(`${q()} TOOLS`,()=>window.setView('toolcenter'),active==='tools'),B('TOOL COUNTDOWN',()=>window.setView('countdown'),active==='countdown'),B('TOOL ARCHIVE',()=>window.setView('archive'),active==='archive')]}
function toolTheme(title){document.body.dataset.center='toolfinal';document.body.dataset.theme='toolcenter';document.documentElement.style.setProperty('--page-accent','#8b5cf6');document.documentElement.style.setProperty('--page-accent-rgb','139,92,246');const h=$('#headerPageTitle');if(h)h.textContent=title;$$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='toolcenter'))}
function activeTools(){return allTools().filter(t=>String(t.quarterStatus||t.status||'').toLowerCase()!=='archive')}
function archivedTools(){return allTools().filter(t=>String(t.quarterStatus||t.status||'').toLowerCase()==='archive')}
function fmt(v){if(!v)return'—';try{const d=new Date(String(v).slice(0,10)+'T00:00:00');return isNaN(d)?String(v):d.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}catch(e){return String(v)}}
function saveMaster(){try{return window.save?.()}catch(e){try{return save()}catch(_){}}}
function openTool(id){if(typeof window.toolStatus==='function')window.toolStatus(String(id))}

/* Tool Archive: one bulk workflow, one master record. */
function renderArchive(){toolTheme('TOOL ARCHIVE');const app=$('#app');if(!app)return;const list=archivedTools();app.innerHTML=`<div class="v854-simple"><div class="table-wrap"><table class="report-table"><thead><tr><th>UTID</th><th>CODE NAME</th><th>MODEL</th><th>CUSTOMER</th><th>SALES ORDER</th><th>SHIP DATE</th><th>QUARTER</th><th>ARCHIVED</th></tr></thead><tbody>${list.map(t=>`<tr data-v854-tool="${esc(t.id||t.utid)}"><td><b>${esc(t.id||t.utid)}</b></td><td>${esc(t.codename||t.codeName||'—')}</td><td>${esc(t.model||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(t.so||t.salesOrder||'—')}</td><td>${esc(fmt(t.ship||t.shipDate))}</td><td>${esc(t.quarter||'—')}</td><td>${esc(fmt(t.archiveDate))}</td></tr>`).join('')||'<tr><td colspan="8" class="gray">No archived tools.</td></tr>'}</tbody></table></div></div>`;toolbar(toolsNav('archive'),[B('ARCHIVE TOOL',renderArchiveMode,true),B('SCREENSHOT',shot),B('REPORT',report)]);$$('[data-v854-tool]',app).forEach(r=>r.onclick=()=>openTool(r.dataset.v854Tool))}
function renderArchiveMode(){toolTheme('TOOL ARCHIVE');const app=$('#app');if(!app)return;const list=activeTools();app.innerHTML=`<div class="v854-simple"><div class="table-wrap"><table class="report-table"><thead><tr><th>UTID</th><th>CODE NAME</th><th>MODEL</th><th>CUSTOMER</th><th>CURRENT STATUS</th><th>NEW STATUS</th></tr></thead><tbody>${list.map(t=>`<tr><td><b>${esc(t.id||t.utid)}</b></td><td>${esc(t.codename||t.codeName||'—')}</td><td>${esc(t.model||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(t.quarterStatus||t.status||'Waiting to be Handed to FI')}</td><td><select class="v854-archive" data-id="${esc(t.id||t.utid)}"><option value="">No Change</option><option value="Archive">Archive</option></select></td></tr>`).join('')||'<tr><td colspan="6" class="gray">No active tools available to archive.</td></tr>'}</tbody></table></div><div id="v854ArchiveNotice" class="v854-notice"></div></div>`;toolbar(toolsNav('archive'),[B('CANCEL',renderArchive),B('SAVE',saveArchive,true)])}
function saveArchive(){const ids=$$('.v854-archive').filter(x=>x.value==='Archive').map(x=>String(x.dataset.id));if(!ids.length){const n=$('#v854ArchiveNotice');if(n)n.textContent='No changes to save.';return}const today=new Date().toISOString().slice(0,10);allTools().forEach(t=>{if(ids.includes(String(t.id||t.utid))){t.quarterStatus='Archive';t.status='Archive';t.archiveDate=t.archiveDate||today}});saveMaster();try{document.dispatchEvent(new CustomEvent('b7fi:tool-records-updated',{detail:{reason:'archive',ids}}))}catch(e){}renderArchive();const n=document.createElement('div');n.className='v854-ack';n.textContent=ids.length===1?`✓ Tool ${ids[0]} moved to Archive`:`✓ ${ids.length} tools moved to Archive`;$('#app')?.prepend(n);setTimeout(()=>n.remove(),3500)}

/* Generic edit mode: move legacy save/cancel behavior into the page toolbar. */
function bodyButton(re){return $$('#app button').find(b=>re.test(String(b.textContent||'').trim()))}
function editToolbar(left,saveRe,cancelFn,saveLabel='SAVE'){const saveBtn=bodyButton(saveRe);if(saveBtn)saveBtn.style.display='none';toolbar(left,[B('CANCEL',cancelFn),B(saveLabel,()=>{if(saveBtn)saveBtn.click()},true)])}

/* Priority Center */
function renderPriority(kind='weekday'){if(kind==='weekend'){try{if(typeof weekend==='function')weekend();else priorSetView('weekend')}catch(e){priorSetView('weekend')}}else{try{if(typeof daily==='function')daily();else priorSetView('priorities')}catch(e){priorSetView('priorities')}}const left=[B('WEEKDAY PRIORITIES',()=>renderPriority('weekday'),kind==='weekday'),B('WEEKEND PRIORITIES',()=>renderPriority('weekend'),kind==='weekend')];toolbar(left,[B(kind==='weekday'?'EDIT WEEKDAY PRIORITIES':'EDIT WEEKEND PRIORITIES',()=>editPriority(kind),true),B('SCREENSHOT',shot),B('REPORT',report)])}
function editPriority(kind){callAdmin(kind==='weekday'?'daily':'weekend');requestAnimationFrame(()=>editToolbar([B('WEEKDAY PRIORITIES',()=>renderPriority('weekday'),kind==='weekday'),B('WEEKEND PRIORITIES',()=>renderPriority('weekend'),kind==='weekend')],/^Save .*Priorit/i,()=>renderPriority(kind)))}

/* Shipping Center: generated view, actions only. */
function renderShipping(){priorSetView('shipping');toolbar([],[B('EDIT SHIP SCHEDULE',renderShipChooser,true),B('SCREENSHOT',shot),B('REPORT',report)])}
function renderShipChooser(){const app=$('#app');if(!app)return;const list=activeTools().slice().sort((a,b)=>String(a.ship||'9999').localeCompare(String(b.ship||'9999')));app.innerHTML=`<div class="v854-simple"><div class="panel"><h2>EDIT SHIP SCHEDULE</h2><p class="gray">Choose the tool whose master shipping schedule you want to edit.</p><div class="table-wrap"><table class="report-table"><thead><tr><th></th><th>UTID</th><th>CODE NAME</th><th>MODEL</th><th>CUSTOMER</th><th>SHIP DATE</th><th>SHIPPING STATUS</th></tr></thead><tbody>${list.map((t,i)=>`<tr><td><input type="radio" name="v854ShipTool" value="${esc(t.id||t.utid)}" ${i===0?'checked':''}></td><td><b>${esc(t.id||t.utid)}</b></td><td>${esc(t.codename||'—')}</td><td>${esc(t.model||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(fmt(t.ship||t.shipDate))}</td><td>${esc(t.schedule?.status||t.quarterStatus||'—')}</td></tr>`).join('')||'<tr><td colspan="7" class="gray">No active tools.</td></tr>'}</tbody></table></div></div></div>`;toolbar([],[B('CANCEL',renderShipping),B('EDIT SELECTED TOOL',()=>{const id=$('input[name="v854ShipTool"]:checked')?.value;if(id)window.toolAdmin?.(id)},true)])}

/* Status Center */
function statusLeft(active){return [B('WEEKDAY MORNING STATUS',()=>renderStatus('weekday'),active==='weekday'),B('LEADS EXTRA STATUS',()=>renderStatus('extra'),active==='extra'),B('WEEKEND MORNING STATUS',()=>renderStatus('weekend'),active==='weekend')]}
function renderStatus(kind='weekday'){if(kind==='weekday')priorSetView('statuscenter');else if(kind==='extra')priorSetView('leads');else renderWeekend(false);toolbar(statusLeft(kind),[B(kind==='weekday'?'EDIT WEEKDAY MORNING STATUS':kind==='extra'?'EDIT LEADS EXTRA STATUS':'EDIT WEEKEND MORNING STATUS',()=>editStatus(kind),true),B('SCREENSHOT',shot),B('REPORT',report)])}
function editStatus(kind){if(kind==='weekday'){callAdmin('meeting');requestAnimationFrame(()=>editToolbar(statusLeft(kind),/^Save Morning/i,()=>renderStatus(kind)))}else if(kind==='extra'){renderStatus('extra');requestAnimationFrame(()=>{const x=bodyButton(/^Edit Leads Extra Status$/i);if(x)x.click();requestAnimationFrame(()=>editToolbar(statusLeft(kind),/^Save/i,()=>renderStatus(kind)))})}else renderWeekend(true)}
function renderWeekend(edit){document.body.dataset.center='status';document.body.dataset.theme='status';const h=$('#headerPageTitle');if(h)h.textContent=`STATUS CENTER — ${q()}`;let st;try{st=window.state||state}catch(e){st={}};st.weekendMorningStatus=st.weekendMorningStatus||{lead:'',date:'',notes:'',updatedAt:''};const w=st.weekendMorningStatus,app=$('#app');if(!app)return;const list=activeTools().filter(t=>t.weekendPriority).sort((a,b)=>(a.weekendPriority||999)-(b.weekendPriority||999));const rows=list.map(t=>`<tr><td>${esc(t.weekendPriority||'')}</td><td><b>${esc(t.id||t.utid)}</b></td><td>${esc(t.codename||'—')}</td><td>${esc(t.customer||'—')}</td><td>${esc(fmt(t.ship||t.shipDate))}</td><td>${esc(t.weekendAssignment||t.driver||'')}</td><td>${esc(t.weekendNotes||'')}</td></tr>`).join('')||'<tr><td colspan="7">No weekend priorities assigned.</td></tr>';if(edit){app.innerHTML=`<div class="v854-simple"><div class="form-grid"><label>Weekend Lead<input id="v854WLead" value="${esc(w.lead)}"></label><label>Date<input id="v854WDate" type="date" value="${esc(w.date)}"></label></div><label>Weekend Status Notes<textarea id="v854WNotes" rows="7">${esc(w.notes)}</textarea></label><div class="table-wrap"><table class="report-table"><thead><tr><th>Priority</th><th>UTID</th><th>Code Name</th><th>Customer</th><th>Ship Date</th><th>Assignment</th><th>Notes</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;toolbar(statusLeft('weekend'),[B('CANCEL',()=>renderWeekend(false)),B('SAVE',()=>{w.lead=$('#v854WLead')?.value.trim()||'';w.date=$('#v854WDate')?.value||'';w.notes=$('#v854WNotes')?.value||'';w.updatedAt=new Date().toISOString();saveMaster();renderWeekend(false)},true)])}else{app.innerHTML=`<div class="v854-simple"><div class="panel"><b>${esc(w.date||'Weekend Morning Status')}</b> · Weekend Lead: ${esc(w.lead||'Not assigned')}${w.notes?`<p>${esc(w.notes).replace(/\n/g,'<br>')}</p>`:''}</div><div class="table-wrap"><table class="report-table"><thead><tr><th>Priority</th><th>UTID</th><th>Code Name</th><th>Customer</th><th>Ship Date</th><th>Assignment</th><th>Notes</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;toolbar(statusLeft('weekend'),[B('EDIT WEEKEND MORNING STATUS',()=>renderWeekend(true),true),B('SCREENSHOT',shot),B('REPORT',report)])}}

/* Meeting Center: meeting types in toolbar; body is history. */
const meetingTypes=['MORNING STATUS','LEADS MEETING','ORB MEETING','FE OPTIONS MEETING','CELL MEETING'];let meetingType='MORNING STATUS';
function renderMeeting(type=meetingType){meetingType=type;priorSetView('meetingcenter');requestAnimationFrame(()=>{const start=$('.start-now51'),grid=$('.meeting-template-grid51');if(start)start.style.display='none';if(grid)grid.style.display='none';const history=$$('#app .meeting-record51');history.forEach(d=>{const s=(d.querySelector('summary')?.textContent||'').toUpperCase();d.style.display=s.includes(type.replace('MORNING STATUS','MORNING'))?'':'none'});toolbar(meetingTypes.map(x=>B(x,()=>renderMeeting(x),x===type)),[B(`START ${type}`,()=>startMeeting(type),true),B('SCREENSHOT',shot),B('REPORT',report)])})}
function startMeeting(type){const hidden=$$('.meeting-template51').find(b=>(b.textContent||'').toUpperCase().includes(type.replace('MORNING STATUS','MORNING')));if(hidden)hidden.click();else{const input=$('#adhocTitle51'),go=$('#adhocStart51');if(input&&go){input.value=type;go.click()}}requestAnimationFrame(()=>{const saveBtn=$('#saveMeet51');if(saveBtn)saveBtn.style.display='none';toolbar(meetingTypes.map(x=>B(x,()=>renderMeeting(x),x===type)),[B('CANCEL',()=>renderMeeting(type)),B('SAVE',()=>saveBtn?.click(),true)])})}

/* Action Center: generated page, actions only. */
function renderAction(){priorSetView('actions');toolbar([],[B('ADD ALERT',renderAddAlert,true),B('SCREENSHOT',shot),B('REPORT',report)])}
function renderAddAlert(){const app=$('#app');if(!app)return;app.innerHTML=`<div class="v854-simple"><div class="panel"><h2>ADD ALERT</h2><div class="form-grid"><label>Type<select id="v854AlertType"><option>Lead Alert</option><option>System Status Alert</option><option>Task</option><option>Reminder</option></select></label><label>Related Tool<select id="v854AlertTool"><option value="">General</option>${activeTools().map(t=>`<option value="${esc(t.id||t.utid)}">${esc(t.id||t.utid)} · ${esc(t.codename||'')}</option>`).join('')}</select></label><label class="wide">Message<input id="v854AlertMsg" placeholder="Alert / task / reminder text"></label><label>Owner<input id="v854AlertOwner"></label><label>Due Date<input id="v854AlertDue" type="date"></label></div></div></div>`;toolbar([],[B('CANCEL',renderAction),B('SAVE',saveAlert,true)])}
function saveAlert(){const msg=$('#v854AlertMsg')?.value.trim();if(!msg)return alert('Message is required.');let st;try{st=window.state||state}catch(e){st={}};st.workspaceTasks=Array.isArray(st.workspaceTasks)?st.workspaceTasks:[];const type=$('#v854AlertType')?.value||'Lead Alert';st.workspaceTasks.unshift({id:'manual-'+Date.now(),title:msg,toolId:$('#v854AlertTool')?.value||'',assignee:$('#v854AlertOwner')?.value.trim()||'',due:$('#v854AlertDue')?.value||'',status:'Open',priority:type==='System Status Alert'?'Critical':'Normal',source:`Manual ${type}`,createdAt:new Date().toISOString(),showTicker:true,alertType:type});saveMaster();renderAction()}

/* Reference Center */
function refLeft(active){return [B('FI KNOWLEDGE',()=>renderReference('knowledge'),active==='knowledge'),B('REFERENCE FILES',()=>renderReference('files'),active==='files')]}
function renderReference(kind='knowledge'){if(kind==='knowledge'){priorSetView('referencecenter');toolbar(refLeft('knowledge'),[B('ADD REFERENCE NOTE',()=>{const x=bodyButton(/ADD REFERENCE NOTE/i);if(x)x.click()},true),B('SCREENSHOT',shot),B('REPORT',report)])}else renderReferenceFiles()}
function renderReferenceFiles(){document.body.dataset.center='reference';document.body.dataset.theme='reference';const h=$('#headerPageTitle');if(h)h.textContent='REFERENCE CENTER';const app=$('#app');if(!app)return;app.innerHTML=`<div class="v854-file-page"><div class="v854-file-meta" id="v854FileMeta">No reference file loaded.</div><div class="v854-file-viewer" id="v854FileViewer"><div class="gray">Use LOAD FILE to open a local file or shared/network URL.</div></div><input id="v854LocalFile" type="file" hidden></div>`;toolbar(refLeft('files'),[B('LOAD FILE',openFileLoader,true),B('SCREENSHOT',shot),B('REPORT',report)])}
function openFileLoader(){const mode=prompt('Load reference file:\n1 = Local file\n2 = Shared/network URL','1');if(mode==='1'){$('#v854LocalFile')?.click()}else if(mode==='2'){const url=prompt('Paste the shared/network file URL:','');if(url)showFileUrl(url)}const inp=$('#v854LocalFile');if(inp&&!inp.dataset.wired){inp.dataset.wired='1';inp.onchange=()=>{const f=inp.files?.[0];if(!f)return;const url=URL.createObjectURL(f);$('#v854FileMeta').textContent=`Loaded: ${f.name} · Local file`;showFileUrl(url,f.name)}}}
function showFileUrl(url,name='Shared / network file'){const meta=$('#v854FileMeta'),viewer=$('#v854FileViewer');if(meta)meta.textContent=`Loaded: ${name}`;if(viewer)viewer.innerHTML=`<iframe title="Reference File Viewer" src="${esc(url)}"></iframe>`}

/* Search Center: body search only; toolbar actions only. */
function renderSearch(){priorSetView('searchcenter');toolbar([],[B('SCREENSHOT',shot),B('REPORT',report)])}

const priorSetView=window.setView;
window.setView=function(v){window.scrollTo(0,0);if(v==='archive')return renderArchive();if(v==='shipping')return renderShipping();if(v==='priorities')return renderPriority('weekday');if(v==='weekend')return renderPriority('weekend');if(v==='statuscenter')return renderStatus('weekday');if(v==='leads')return renderStatus('extra');if(v==='meetingcenter')return renderMeeting();if(v==='actions')return renderAction();if(v==='referencecenter')return renderReference('knowledge');if(v==='references')return renderReference('files');if(v==='searchcenter')return renderSearch();const out=priorSetView.apply(this,arguments);if(v==='toolcenter'||v==='systems')requestAnimationFrame(()=>toolbar(toolsNav('tools'),[B('ADD TOOL',()=>window.toolAdmin?.(),true),B('SCREENSHOT',shot),B('REPORT',report)]));if(v==='countdown')requestAnimationFrame(()=>toolbar(toolsNav('countdown'),[B('ADD TOOL',()=>window.toolAdmin?.(),true),B('SCREENSHOT',shot),B('REPORT',report)]));return out};try{setView=window.setView}catch(e){}

/* Canonical Tool Detail / Tool Edit actions. */
const priorToolStatus=window.toolStatus;if(typeof priorToolStatus==='function'){window.toolStatus=function(id){const out=priorToolStatus.apply(this,arguments);requestAnimationFrame(()=>{toolTheme(`TOOL ${id}`);toolbar(toolsNav('tools'),[B('EDIT TOOL',()=>window.toolAdmin?.(id),true),B('SCREENSHOT',shot),B('REPORT',report)])});return out};try{toolStatus=window.toolStatus}catch(e){}}
const priorToolAdmin=window.toolAdmin;if(typeof priorToolAdmin==='function'){window.toolAdmin=function(id){const out=priorToolAdmin.apply(this,arguments);requestAnimationFrame(()=>{const buttons=$$('#floatingActions button'),saveB=buttons.find(b=>/^SAVE TOOL$/i.test((b.textContent||'').trim())),delB=buttons.find(b=>/^DELETE TOOL$/i.test((b.textContent||'').trim()));const saveFn=saveB?.onclick?saveB.onclick.bind(saveB):null,delFn=delB?.onclick?delB.onclick.bind(delB):null;toolTheme(id?`TOOL ${id} — EDIT`:'ADD TOOL');toolbar(toolsNav('tools'),[B('CANCEL',()=>id?window.toolStatus(id):window.setView('toolcenter')),B('SAVE TOOL',()=>saveFn?.(),true),id?B('DELETE TOOL',()=>delFn?.(),false,true):null].filter(Boolean))});return out};try{toolAdmin=window.toolAdmin}catch(e){}}

function boot(){stamp();$$('.main-nav .nav-btn').forEach(b=>b.onclick=()=>window.setView(b.dataset.view));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();


/* ===== SOURCE: js/patch-v0861.js ===== */
/* B7 FI Command Center v1.0.3 — Operations responsiveness hotfix.
   Fixes v1.0.1 render loop while retaining Operations family summaries,
   lifecycle colors and automatic product photos.
   Lead Alerts/System Status logic is intentionally untouched.
*/
(function(){'use strict';
const VERSION=window.B7_APP_VERSION||'1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
window.VERSION=window.B7_APP_VERSION||VERSION;
const PHOTO={zephyr:'assets/tool-zephyr.png',regera:'assets/tool-regera-celestiq.png',celestiq:'assets/tool-regera-celestiq.png',macan:'assets/tool-29xx-family.png',boxster:'assets/tool-29xx-family.png',panamera:'assets/tool-29xx-family.png',vanquish:'assets/tool-29xx-family.png',targa:'assets/tool-29xx-family.png',taycan:'assets/tool-29xx-family.png'};
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function toolsList(){try{return Array.isArray(window.tools)?window.tools:[]}catch(e){return[]}}
function activeTools(){try{const x=window.B7LiveStatusCore?.activeTools?.();if(Array.isArray(x))return x}catch(e){}return toolsList().filter(t=>!/^archive$/i.test(String(t.quarterStatus||t.status||'')))}
function currentTool(){try{return window.B7LiveStatusCore?.currentTool?.()||null}catch(e){return null}}
function family(t){return String(t?.codename||t?.codeName||t?.toolType||t?.type||t?.model||'Other').trim()||'Other'}
function familyKey(t){const s=family(t).toLowerCase();for(const k of Object.keys(PHOTO))if(s.includes(k))return k;return ''}
function photoFor(t){return PHOTO[familyKey(t)]||''}
function state(t){const s=String(t?.quarterStatus||t?.status||'').toLowerCase();if(s.includes('ship'))return'shipped';if(s.includes('pack'))return'packing';if(s.includes('waiting'))return'waiting';if(s.includes('in fi')||s==='fi')return'infi';return'other'}
function counts(list){const c={total:list.length,waiting:0,infi:0,packing:0,shipped:0};list.forEach(t=>{const k=state(t);if(k in c)c[k]++});return c}
function familyOrder(name){const order=['Zephyr','Regera','Celestiq','Targa','Panamera','Boxster','Macan','Vanquish','Taycan'];const i=order.findIndex(x=>x.toLowerCase()===String(name).toLowerCase());return i<0?99:i}
function groups(){const g={};activeTools().forEach(t=>{const f=family(t);(g[f]??=[]).push(t)});return Object.entries(g).sort((a,b)=>familyOrder(a[0])-familyOrder(b[0])||a[0].localeCompare(b[0]))}
function card(label,value,kind){return `<div class="v861-family-kpi v861-kpi-${kind}"><span>${esc(label)}</span><b>${value}</b></div>`}
function familyMarkup(){const list=activeTools(), entries=groups();return `<section class="v861-family-section" aria-label="Tool family live countdown"><div class="v861-family-header"><strong>TOOL FAMILY LIVE STATUS</strong><span>${list.length} CURRENT TOOLS</span></div><div class="v861-family-list">${entries.map(([name,items])=>{const c=counts(items);return `<article class="v861-family-row"><h3>${esc(name)}</h3><div class="v861-family-kpis">${card('TOTAL',c.total,'total')}${card('WAITING FI',c.waiting,'waiting')}${card('IN FI',c.infi,'infi')}${card('PACKING',c.packing,'packing')}${card('SHIPPED',c.shipped,'shipped')}</div></article>`}).join('')||'<div class="v861-family-empty">No active tools for this quarter.</div>'}</div></section>`}
function operationsRoot(){return $('.v825-operations-live')||$('.v803-live-shell')||$('.v802-live')}
function onOperations(){return document.body.classList.contains('v825-operations-dashboard')||document.body.classList.contains('v802-live-status')||document.body.dataset.center==='home'}
function installFamilySection(){if(!onOperations())return;const root=operationsRoot();if(!root)return;const old=$('.v861-family-section',root);const html=familyMarkup();if(old){if(old.dataset.snapshot===html)return;const wrap=document.createElement('div');wrap.innerHTML=html;const n=wrap.firstElementChild;n.dataset.snapshot=html;old.replaceWith(n)}else{const carousel=$('.v802-carousel',root);if(carousel){carousel.insertAdjacentHTML('beforebegin',html);const n=$('.v861-family-section',root);if(n)n.dataset.snapshot=html}}}
function colorSummaryBoxes(){if(!onOperations())return;const roots=$$('.v825-operations-live .v802-live-metrics,.v825-operations-live .v849-summary,.v825-operations-live .v845-summary-grid,.v803-live-shell .v802-live-metrics,.v802-live>.v802-live-metrics');roots.forEach(root=>Array.from(root.children).forEach(el=>{const label=String(el.querySelector('span')?.textContent||'').trim().toUpperCase();let k='neutral';if(/TOOLS|ACTIVE/.test(label)&&!/PLANNED/.test(label))k='total';if(/WAITING/.test(label))k='waiting';if(/^IN FI$/.test(label))k='infi';if(/PACKING/.test(label))k='packing';if(/SHIPPED/.test(label))k='shipped';const cls='v861-kpi-'+k;if(!el.classList.contains(cls)){el.classList.remove('v861-kpi-total','v861-kpi-waiting','v861-kpi-infi','v861-kpi-packing','v861-kpi-shipped','v861-kpi-neutral');el.classList.add(cls)}}))}
function installPhoto(tArg){if(!onOperations())return;const t=tArg||currentTool();if(!t)return;$$('.v802-tool-visual').forEach(v=>{const src=photoFor(t);if(!src)return;let img=$('img',v);if(!img){img=document.createElement('img');v.prepend(img)}if(img.getAttribute('src')!==src){img.src=src;img.alt=`${family(t)} product`;img.onerror=()=>{img.onerror=null;img.removeAttribute('src');v.classList.add('v830-photo-fallback')}}v.classList.remove('v830-photo-fallback');$('.v830-tool-photo-placeholder',v)?.remove()})}
function addAliasToCard(tArg){if(!onOperations())return;const t=tArg||currentTool();const body=$('.v802-tool-body');if(!body)return;$('.v861-alias',body)?.remove();if(!t?.alias)return;const h=$('h2',body);if(h)h.insertAdjacentHTML('afterend',`<div class="v861-alias">ALIAS · ${esc(t.alias)}</div>`)}
function stamp(){document.title=document.body?.dataset?.liveViewerOnly==='true'?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const x=$('#appVersionLabel');if(x)x.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
let refreshTimer=0;
function refresh(t){clearTimeout(refreshTimer);refreshTimer=setTimeout(()=>{stamp();if(!onOperations())return;installFamilySection();colorSummaryBoxes();installPhoto(t);addAliasToCard(t)},30)}
const priorSetView=window.setView;if(typeof priorSetView==='function'){window.setView=function(){const r=priorSetView.apply(this,arguments);refresh();setTimeout(refresh,180);return r};try{setView=window.setView}catch(e){}}
document.addEventListener('b7fi:live-tool-change',e=>refresh(e.detail?.tool));
document.addEventListener('b7fi:tool-records-updated',()=>refresh());
function boot(){stamp();refresh();setTimeout(refresh,350);setTimeout(refresh,900)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();


window.MutationObserver = __B7_NATIVE_MO;

/* ===== B7 FI COMMAND CENTER v1.0.3 — SINGLE SHELL / ROUTER AUTHORITY ===== */
(function(){'use strict';
const VERSION='1.0.3';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const META={
 home:['OPERATIONS CENTER','#2477ad','36,119,173'],
 toolcenter:['UPDATE CENTER','#8e5ae8','142,90,232'],systems:['UPDATE CENTER','#8e5ae8','142,90,232'],countdown:['UPDATE CENTER','#8e5ae8','142,90,232'],archive:['UPDATE CENTER','#8e5ae8','142,90,232'],
 shipping:['SHIPPING CENTER','#27ae60','39,174,96'],
 priorities:['PRIORITY CENTER','#d4a72c','212,167,44'],weekend:['PRIORITY CENTER','#d4a72c','212,167,44'],
 statuscenter:['STATUS CENTER','#f28c28','242,140,40'],leads:['STATUS CENTER','#f28c28','242,140,40'],
 meetingcenter:['MEETING CENTER','#19b9d1','25,185,209'],
 actions:['ACTION CENTER','#ef4b4b','239,75,75'],
 referencecenter:['REFERENCE CENTER','#e94a9a','233,74,154'],references:['REFERENCE CENTER','#e94a9a','233,74,154'],
 searchcenter:['SEARCH CENTER','#536dfe','83,109,254']
};
const CENTER={home:'home',toolcenter:'tool',systems:'tool',countdown:'tool',archive:'tool',shipping:'shipping',priorities:'priority',weekend:'priority',statuscenter:'status',leads:'status',meetingcenter:'meeting',actions:'action',referencecenter:'reference',references:'reference',searchcenter:'search'};
function quarter(){try{return String(window.getB7ActiveQuarter?.()||window.quarterLabel?.()||'CY26Q3').toUpperCase()}catch(e){return'CY26Q3'}}
function stamp(){window.B7_APP_VERSION=VERSION;window.VERSION=VERSION;document.title=`B7 FI Command Center v${VERSION}`;const v=$('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
function applyTheme(view){const m=META[view]||META.home,c=CENTER[view]||'home';document.body.dataset.center=c;document.body.dataset.theme=c==='tool'?'toolcenter':c;document.documentElement.style.setProperty('--page-accent',m[1]);document.documentElement.style.setProperty('--page-accent-rgb',m[2]);document.documentElement.style.setProperty('--center-color',m[1]);document.documentElement.style.setProperty('--center-rgb',m[2]);const h=$('#headerPageTitle');if(h)h.textContent=m[0]+(['home','toolcenter','systems','countdown','shipping','priorities','weekend','statuscenter','leads'].includes(view)?` — ${quarter()}`:'');$$('.main-nav .nav-btn').forEach(b=>b.classList.toggle('active',CENTER[b.dataset.view]===c));stamp()}
function trimUpdate(){if(document.body.dataset.center!=='tool')return;$$('.v837-tool-dashboard>.v837-summary-grid,.v837-tool-dashboard>.v845-summary-grid,.v837-tool-dashboard>.v837-quarter-progress,.v837-tool-dashboard>.quarter-progress').forEach(x=>x.remove())}
function addPackingFamilyBox(){if(document.body.dataset.center!=='tool')return;$$('.v837-tool-groups .tool-section').forEach(sec=>{const counts=$('.family-counts',sec);if(!counts||$('.family-packing',counts))return;const ids=$$('[data-v837-tool]',sec).map(x=>x.dataset.v837Tool);let list=[];try{list=Array.isArray(window.tools)?window.tools:(typeof tools!=='undefined'?tools:[])}catch(e){}const p=list.filter(t=>ids.includes(String(t.id||t.utid))&&String(t.quarterStatus||t.status)==='Packing and Shipping').length;const box=document.createElement('div');box.className='family-packing';box.innerHTML=`<span>PACKING</span><b>${p}</b>`;const shipped=$('.family-shipped',counts);if(shipped)counts.insertBefore(box,shipped);else counts.appendChild(box)})}
function decorateFlow(){if(document.body.dataset.center!=='home')return;$$('.v861-family-row').forEach(row=>{const h=$('h3',row),k=$('.v861-family-kpis',row);if(h&&!h.nextElementSibling?.classList?.contains('v103-flow-arrow')){const a=document.createElement('span');a.className='v103-flow-arrow';a.setAttribute('aria-hidden','true');h.after(a)}if(k&&!k.querySelector('.v103-flow-arrow')){const cards=Array.from(k.children).filter(x=>x.classList.contains('v861-family-kpi'));cards.slice(0,-1).forEach(card=>{const a=document.createElement('span');a.className='v103-flow-arrow';a.setAttribute('aria-hidden','true');card.after(a)})}})}
function finalize(view){requestAnimationFrame(()=>{applyTheme(view);trimUpdate();addPackingFamilyBox();decorateFlow();document.body.classList.remove('b7-booting')})}
const core=window.setView;
window.setView=function(view){const v=String(view||'home');let out;try{out=core?.call(this,v)}catch(e){console.error('B7 route',e)}finalize(v);return out};try{setView=window.setView}catch(e){}
function bindMainNav(){const nav=$('.main-nav');if(!nav)return;$$('.nav-btn',nav).forEach(old=>{const n=old.cloneNode(true);old.replaceWith(n);n.onclick=e=>{e.preventDefault();e.stopPropagation();window.setView(n.dataset.view)}})}
function boot(){stamp();bindMainNav();const active=$('.main-nav .nav-btn.active')?.dataset.view||'home';finalize(active)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
document.addEventListener('b7fi:tool-records-updated',()=>finalize(document.querySelector('.main-nav .nav-btn.active')?.dataset.view||'home'));
})();
