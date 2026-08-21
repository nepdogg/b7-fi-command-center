/* B7 FI Command Center v0.48.0 — Navigation + Statusbar QA */
(function(){
  const VERSION='0.48.0';
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