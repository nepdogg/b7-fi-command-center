/* B7 FI Command Center v0.73.0 — deterministic status rails + compact page navigation */
(function(){
'use strict';
window.VERSION='0.73.0';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const LABEL={red:'CRITICAL',critical:'CRITICAL',orange:'ATTENTION',attention:'ATTENTION',yellow:'REMINDER',reminder:'REMINDER',blue:'INFORMATION',information:'INFORMATION',green:'ON TRACK',good:'ON TRACK',normal:'NORMAL'};
function text(el){return (el?.textContent||'').trim()}
function normalizeStatus(s){s=String(s||'').toLowerCase();return ({red:'red',critical:'red',orange:'orange',attention:'orange',yellow:'yellow',reminder:'yellow',blue:'blue',information:'blue',green:'green',good:'green',normal:'normal'})[s]||'normal'}
function actionStatus(){const bar=$('#topActionBar');if(!bar)return 'normal';const beacon=$('.v70-action-beacon',bar);const raw=(beacon?.dataset.status||'').toLowerCase();if(raw)return normalizeStatus(raw);const cur=$('.top-action-current',bar);for(const s of ['red','orange','yellow','blue','green'])if(cur?.classList.contains(s))return s;return 'normal'}
function fleetStatus(){const t=text($('#opsTickerText')).toLowerCase();if(/blocked|critical|stop ship|cannot ship|behind\s+(?:[4-9]|\d{2,})/.test(t))return 'red';if(/behind|overdue|late/.test(t))return 'orange';if(/at risk|risk|due soon/.test(t))return 'yellow';if(/ahead/.test(t))return 'blue';if(/on schedule|on track|complete|completed|shipped|ready/.test(t))return 'green';return 'normal'}
function beacon(kind,status,lamp){return `<span class="${lamp}" aria-hidden="true"></span><span class="v72-beacon-title">${kind}</span><span class="v72-beacon-status">${LABEL[status]||'NORMAL'}</span>`}
function ensureSweeps(bar){if(!bar)return;if(!bar.querySelector('.v73-sweep-top'))bar.insertAdjacentHTML('beforeend','<i class="v73-sweep v73-sweep-top" aria-hidden="true"></i><i class="v73-sweep v73-sweep-bottom" aria-hidden="true"></i>')}
function fleetCount(){
  // Fleet messages are represented by current tool/status records. Prefer the current fleet list when exposed;
  // fall back to the existing action count so the rail always has a concise total rather than verbose context.
  const candidates=[window.filteredFleetMessages,window.fleetMessages,window.fleetAlerts,window.currentFleetMessages];
  for(const c of candidates){if(Array.isArray(c))return c.length}
  const task=text($('#opsTaskCount')).match(/\d+/);return task?Number(task[0]):0;
}
let painting=false;
function paint(){
  if(painting)return;painting=true;
  try{
    const a=$('#topActionBar');
    if(a){
      const s=actionStatus();if(a.dataset.status!==s)a.dataset.status=s;
      const b=$('.v70-action-beacon',a);if(b){if(b.dataset.status!==s)b.dataset.status=s;const wanted=LABEL[s]||'NORMAL';if(!b.querySelector('.v72-beacon-title')||text(b.querySelector('.v72-beacon-status'))!==wanted)b.innerHTML=beacon('LEAD ALERTS',s,'v70-beacon-lamp')}
      ensureSweeps(a);
    }
    const f=$('#operationsBar');
    if(f){
      const s=fleetStatus();if(f.dataset.status!==s)f.dataset.status=s;
      const b=$('.v65-fleet-label',f);if(b){if(b.dataset.status!==s)b.dataset.status=s;const wanted=LABEL[s]||'NORMAL';if(!b.querySelector('.v72-beacon-title')||text(b.querySelector('.v72-beacon-status'))!==wanted)b.innerHTML=beacon('SYSTEM STATUS',s,'v70-fleet-lamp')}
      const sum=$('.v65-fleet-summary',f);if(sum){const n=fleetCount();const phrase=`${n} FLEET MESSAGE${n===1?'':'S'}`;if(text(sum)!==phrase)sum.innerHTML=`<span class="v73-fleet-count">${phrase}</span>`}
      ensureSweeps(f);
    }
  }finally{painting=false}
}
function toolbar(){const bar=$('#floatingActions');if(!bar)return;const buttons=$$(':scope > button',bar);const nav=buttons.filter(b=>b.classList.contains('v70-page-nav')||b.dataset.v57tab);const actions=buttons.filter(b=>!nav.includes(b));buttons.forEach(b=>{b.classList.toggle('v70-page-nav',nav.includes(b));b.classList.toggle('v70-page-action',actions.includes(b));b.classList.remove('v70-first-action');b.style.marginTop='';b.style.marginBottom=''});nav.forEach(b=>bar.appendChild(b));actions.forEach(b=>bar.appendChild(b));if(actions[0])actions[0].classList.add('v70-first-action')}
function version(){const v=$('#appVersionLabel');if(v)v.textContent='B7 FI COMMAND CENTER v0.79.0'}
function run(){paint();toolbar();version()}
const obs=new MutationObserver(()=>requestAnimationFrame(run));
['#topActionBar','#operationsBar'].forEach(sel=>{const el=$(sel);if(el)obs.observe(el,{childList:true,subtree:true,characterData:true})});
setTimeout(run,80);setTimeout(run,300);setTimeout(run,900);setInterval(paint,1600);
})();
