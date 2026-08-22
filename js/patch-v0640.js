/* B7 FI Command Center v0.64.0 — Monday field-test shell stabilization + Search Center */
(function(){
'use strict';
window.VERSION='0.64.0';
const SEARCH_COLOR='#4F6BFF', SEARCH_RGB='79,107,255';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

function setVars(color,rgb){
  ['--center-color','--accent','--page-accent','--fleet-accent','--live-page-accent'].forEach(v=>{document.documentElement.style.setProperty(v,color);document.body.style.setProperty(v,color)});
  ['--center-rgb','--accent-rgb','--page-accent-rgb','--fleet-rgb','--live-page-rgb'].forEach(v=>{document.documentElement.style.setProperty(v,rgb);document.body.style.setProperty(v,rgb)});
}
function setVersion(){const v=$('#appVersionLabel');if(v)v.textContent='B7 FI Command Center v0.64.0'}
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
new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;shell()})}).observe(document.body,{subtree:true,childList:true});
setTimeout(shell,180);
})();
