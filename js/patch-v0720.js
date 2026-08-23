/* B7 FI Command Center v0.72.0 — shared status/navigation framework stabilization */
(function(){
'use strict';
window.VERSION='0.72.0';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const clean=s=>(s||'').replace(/\s+/g,' ').trim();
const buttonLabel=b=>clean(b?.textContent).replace(/^\+\s*/,'').toUpperCase();

function actionStatus(){
  const bar=$('#topActionBar');
  if(!bar)return 'normal';
  const beacon=$('.v70-action-beacon',bar);
  const ds=(beacon?.dataset.status||'').toLowerCase();
  if(['red','orange','yellow','blue','green'].includes(ds))return ds;
  const cur=$('.top-action-current',bar);
  return ['red','orange','yellow','blue','green'].find(s=>cur?.classList.contains(s))||'normal';
}
function fleetStatus(){
  const t=clean($('#opsTickerText')?.textContent).toLowerCase();
  if(!t||/loading fleet status/.test(t))return 'normal';
  if(/blocked|critical|stop ship|cannot ship|do not ship|hold ship|ship hold|behind\s+(?:[4-9]|\d{2,})/.test(t))return 'critical';
  if(/behind|overdue|late|missed|delay/.test(t))return 'attention';
  if(/at risk|risk|due soon|watch|pending approval/.test(t))return 'reminder';
  if(/ahead|informational|notice|update/.test(t))return 'information';
  if(/on schedule|on track|complete|completed|shipped|ready|clear|no blockers/.test(t))return 'good';
  return 'normal';
}
function fleetClassLabel(s){
  return ({critical:'CRITICAL',attention:'ATTENTION',reminder:'REMINDER',information:'INFORMATION',good:'ON TRACK',normal:'NORMAL'})[s]||'NORMAL';
}
function stabilizeStatus(){
  const a=$('#topActionBar');
  if(a){
    const s=actionStatus();
    if(a.dataset.status!==s)a.dataset.status=s;
    const al='Action Status: '+s;if(a.getAttribute('aria-label')!==al)a.setAttribute('aria-label',al);
  }
  const f=$('#operationsBar');
  if(f){
    const s=fleetStatus();
    if(f.dataset.status!==s)f.dataset.status=s;
    const fl='Fleet Status: '+fleetClassLabel(s);if(f.getAttribute('aria-label')!==fl)f.setAttribute('aria-label',fl);
    const label=$('.v65-fleet-label',f);
    if(label){
      if(label.dataset.status!==s)label.dataset.status=s;
      let lamp=$('.v70-fleet-lamp',label);
      if(!lamp){lamp=document.createElement('span');lamp.className='v70-fleet-lamp';lamp.setAttribute('aria-hidden','true');label.prepend(lamp)}
      let cls=$('.v72-fleet-class',label);
      if(!cls){cls=document.createElement('span');cls.className='v72-fleet-class';label.appendChild(cls)}
      const ct=fleetClassLabel(s);if(cls.textContent!==ct)cls.textContent=ct;
    }
  }
}
function normalizeToolbar(){
  const bar=$('#floatingActions');
  if(!bar)return;
  const buttons=$$(':scope > button',bar);
  if(!buttons.length)return;
  const nav=buttons.filter(b=>b.classList.contains('v70-page-nav'));
  const actions=buttons.filter(b=>b.classList.contains('v70-page-action'));
  const desired=[...nav,...actions];
  const sameOrder=desired.length===buttons.length&&desired.every((b,i)=>buttons[i]===b);
  if(!sameOrder)desired.forEach(b=>bar.appendChild(b));
  buttons.forEach(b=>{const should=actions.length&&b===actions[0];if(b.classList.contains('v72-first-action')!==!!should)b.classList.toggle('v72-first-action',!!should)});
}
function normalizeContentStart(){
  const app=$('#app');
  if(!app)return;
  app.style.marginTop='0px';
  const first=app.firstElementChild;
  if(first)first.style.marginTop='0px';
}
function version(){
  const el=$('#appVersionLabel');
  if(el)el.textContent='B7 FI COMMAND CENTER v0.72.0';
}
let busy=false;
function stabilize(){
  if(busy)return; busy=true;
  requestAnimationFrame(()=>{
    stabilizeStatus();
    normalizeToolbar();
    normalizeContentStart();
    version();
    busy=false;
  });
}
const top=$('#topActionBar');
if(top)new MutationObserver(stabilize).observe(top,{childList:true,subtree:true,attributes:true,attributeFilter:['class','data-status']});
const fleet=$('#operationsBar');
if(fleet)new MutationObserver(stabilize).observe(fleet,{childList:true,subtree:true,characterData:true});
const toolbar=$('#floatingActions');
if(toolbar)new MutationObserver(stabilize).observe(toolbar,{childList:true,subtree:false});
const app=$('#app');
if(app)new MutationObserver(stabilize).observe(app,{childList:true,subtree:false});
setTimeout(stabilize,80);
setTimeout(stabilize,350);
setTimeout(stabilize,900);
setInterval(stabilizeStatus,1800);
})();
