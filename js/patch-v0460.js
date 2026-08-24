/* B7 FI Command Center v0.80.33 — Framework + Weekend Operations Polish */
(function(){
  const VERSION=window.B7_APP_VERSION||'0.80.33';

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
  setTimeout(()=>{try{render();refreshTopActions46(false)}catch(e){console.error('v0.46.0 render',e)}},0);
})();