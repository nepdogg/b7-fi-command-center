/* B7 FI Command Center v0.45.0 — Status + Workflow Polish */
(function(){
  const VERSION='0.45.0';

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
  setTimeout(()=>{try{render()}catch(e){console.error('v0.45.0 render',e)}},0);
})();