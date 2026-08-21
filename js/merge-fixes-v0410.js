/* B7 FI Command Center v0.41.0 — Unified QA Corrections */
(function(){
  const VERSION='0.41.0';

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
  function countdownCard41(t,q,pushed=false){
    const oq=t.originalQuarter||quarterFromDate(t.originalShip)||'';const cq=currentQuarterMembership(t);const moved=(t.originalShip&&t.originalShip!==t.ship)||(oq&&cq&&oq!==cq);
    return `<div class="countdown-card ${qState(t)} ${pushed?'pushed-card':''}">
      <div class="cc-head"><div><div class="cc-id">${esc(t.id)}</div><b>${esc(t.model)}</b><div class="gray">${esc(t.customer)}</div></div>${movementLabel(t,q)}</div>
      <div class="cc-meta"><div><span>MFG Ship Date</span><b>${fmt(t.ship)}</b>${moved?`<small class="ship-move">${fmt(t.originalShip)} → ${fmt(t.ship)}</small>`:''}</div><div><span>Status</span><b>${esc(t.quarterStatus)}</b></div></div>
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
  setTimeout(()=>{try{render()}catch(e){console.error('v0.41.0 rerender',e)}},0);
})();
