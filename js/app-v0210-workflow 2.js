/*
 * B7 FI Operations v0.21.0 Workflow Reality Update
 * -------------------------------------------------
 * This file intentionally layers new workflow behavior on top of v0.20.1.
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
  app.innerHTML=`<div class="panel"><div class="workspace-tabs"><button class="btn ${tab==='tasks'?'primary':''}" data-worktab="tasks">Action Center</button><button class="btn ${tab==='reference'?'primary':''}" data-worktab="reference">Reference</button></div>${tab==='tasks'?`<h3>Lead Workspace / Action Center</h3><p class="helper">One shared task engine for manager requests, Morning Meeting actions, Tool follow-ups and lead work. Priority controls both sorting and visual urgency.</p><div class="workspace-quick v21-task-create"><input id="ws-new-title" placeholder="Task"><input id="ws-new-assignee" placeholder="Assigned lead"><select id="ws-new-tool"><option value="">General / No Tool</option>${current().map(t=>`<option value="${esc(t.id)}">${esc(t.id)} · ${esc(t.codename)}</option>`).join('')}</select><select id="ws-new-priority">${priorityOptions21('Normal')}</select><input id="ws-new-due" type="date"><button id="ws-add" class="btn primary">+ Add Task</button></div><div class="workspace-list v21-task-list">${state.workspaceTasks.map(task=>`<div class="workspace-task v21-task ${V0210_PRIORITY_CLASS[task.priority]||'normal'} ${task.status==='Completed'?'complete':''}" data-wstask="${esc(task.id)}"><div class="task-priority-rail"></div><select class="ws-priority">${priorityOptions21(task.priority)}</select><select class="ws-status">${statusOptions21(task.status)}</select><div class="task-main"><b>${esc(task.title)}</b><div class="gray">${task.toolId?`Tool ${esc(task.toolId)}`:'General'}${task.assignee?` · ${esc(task.assignee)}`:''}${task.source?` · ${esc(task.source)}`:''}</div></div><input class="ws-assignee" value="${esc(task.assignee)}" placeholder="Lead"><input class="ws-due" type="date" value="${esc(task.due)}"><label class="ticker-check"><input class="ws-ticker" type="checkbox" ${task.showTicker?'checked':''}> Ticker</label><input class="ws-ticker-order" type="number" min="1" value="${task.tickerOrder||1}" title="Ticker order"><select class="ws-ticker-seconds"><option value="5" ${task.tickerSeconds===5?'selected':''}>5s</option><option value="8" ${task.tickerSeconds===8?'selected':''}>8s</option><option value="10" ${task.tickerSeconds===10?'selected':''}>10s</option><option value="15" ${task.tickerSeconds===15?'selected':''}>15s</option><option value="30" ${task.tickerSeconds===30?'selected':''}>30s</option></select><button class="btn small danger ws-delete">Delete</button></div>`).join('')||'<div class="notice">No action-center tasks yet.</div>'}</div>`:`<h3>Reference</h3><p class="helper">Reference content remains unchanged from v0.20.1.</p><div class="notice">Use the existing Reference tab in the prior build while this workflow test focuses on operational actions.</div>`}</div>`;
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
