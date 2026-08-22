/* B7 FI Command Center v0.50.0 — Home + Report Center + Meeting Actions + Exceptions QA */
(function(){
const VERSION='0.50.0';
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