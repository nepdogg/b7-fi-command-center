/* B7 FI Command Center v0.80.33 — Action Center Manual Reminder Control */
(function(){
  const VERSION=window.B7_APP_VERSION||'0.80.33';
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