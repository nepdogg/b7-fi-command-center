/* B7 FI Command Center v0.80.33 — single-version boot + Tool Center page-navigation standardization. */
(function(){
'use strict';
const VERSION=window.B7_APP_VERSION||'0.80.33';
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
// Wrap the final router; v0.80.33 always normalizes after all legacy renderers have completed.
const prior=window.setView;if(typeof prior==='function')window.setView=function(){const r=prior.apply(this,arguments);setTimeout(apply,0);setTimeout(apply,90);return r};
// Tool subpages can rerender the toolbar without setView. Observe child replacement only;
// class/style changes do not retrigger this observer, avoiding the historical observer loops.
const startObserver=()=>{const bar=$('#floatingActions');if(!bar||bar.dataset.v833Observed)return;bar.dataset.v833Observed='1';let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;apply()})}).observe(bar,{childList:true})};
function startup(){apply();startObserver();setTimeout(apply,100);setTimeout(apply,320)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
