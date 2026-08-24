/*
 * B7 FI Command Center v0.80.33 Unified Master Compatibility Layer
 * ---------------------------------------------------------------
 * Functional baseline: v0.21.1 Weekend Operations Test
 * Visual / framework baseline: v0.31.8 Consolidated Test Build
 */
(function(){
  // Extend the page-theme framework to the v0.21.1 Customer Requirements page.
  try{ if(typeof V0300_PAGE_META!=='undefined') V0300_PAGE_META.customer=['CUSTOMER REQUIREMENTS','customer']; }catch(e){}

  // Stop the older workflow-only ticker timer. The v0.31 framework owns both
  // persistent bars: Action Center on top and Fleet Status at the bottom.
  try{ if(typeof v21OpsTimer!=='undefined'&&v21OpsTimer){clearTimeout(v21OpsTimer);v21OpsTimer=null;} }catch(e){}

  // Keep the v0.31 Action Center architecture while enriching Lead Workspace
  // actions with v0.21.1 priority / assignment / due-date semantics.
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
      // Surface customer-dependent workflows from v0.21.1 when they require attention.
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

  // Restore v0.31.8's persistent-bar renderer. It uses the enriched v3Alerts
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

  // Rebind navigation because v0.21.1 added Customer Requirements while the
  // v0.31.8 framework added Action Center / Wallboard / Reference Files / Leads Extra Status.
  document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>setView(b.dataset.view));

  // Unified version label.
  window.B7_UNIFIED_VERSION='0.40.0';
  try{
    state.appVersion='0.40.0';
    const el=document.getElementById('appVersionLabel');if(el)el.textContent='B7 FI Command Center v0.80.33';
    document.title='B7 FI Command Center v0.80.33';
  }catch(e){}

  try{updateOperationsBar()}catch(e){}
  render();
})();
