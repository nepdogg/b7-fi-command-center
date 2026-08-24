/* B7 FI Command Center v0.80.33 — unified status beacons + locked page navigation */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'0.80.33';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const names={red:'CRITICAL',critical:'CRITICAL',orange:'ATTENTION',attention:'ATTENTION',yellow:'REMINDER',reminder:'REMINDER',blue:'INFORMATION',information:'INFORMATION',green:'ON TRACK',good:'ON TRACK',normal:'NORMAL'};
function txt(el){return (el?.textContent||'').trim()}
function actionStatus(){
  const bar=$('#topActionBar'); if(!bar)return 'normal';
  const b=$('.v70-action-beacon',bar); const raw=(b?.dataset.status||'').toLowerCase();
  if(['red','orange','yellow','blue','green'].includes(raw))return raw;
  const cur=$('.top-action-current',bar);return ['red','orange','yellow','blue','green'].find(s=>cur?.classList.contains(s))||'normal';
}
function fleetStatus(){
  const t=txt($('#opsTickerText')).toLowerCase();
  if(/blocked|critical|stop ship|cannot ship|behind\s+(?:[4-9]|\d{2,})/.test(t))return 'critical';
  if(/behind|overdue|late/.test(t))return 'attention';
  if(/at risk|risk|due soon/.test(t))return 'reminder';
  if(/ahead/.test(t))return 'information';
  if(/on schedule|on track|complete|completed|shipped|ready/.test(t))return 'good';
  return 'normal';
}
function actionAge(){
  const old=txt($('.top-action-label','#topActionBar'));
  const m=old.match(/(?:DAY\s+\d+|OVERDUE\s+\d+\s+DAYS?)/i);return m?m[0].toUpperCase():'';
}
function beaconHTML(kind,status,lampClass){
  return `<span class="${lampClass}" aria-hidden="true"></span><span class="v72-beacon-title">${kind}</span><span class="v72-beacon-status">${names[status]||'NORMAL'}</span>`;
}
let busy=false;
function paint(){
  if(busy)return;busy=true;
  try{
    const a=$('#topActionBar');
    if(a){
      const s=actionStatus();if(a.dataset.status!==s)a.dataset.status=s;
      const b=$('.v70-action-beacon',a);
      if(b){if(b.dataset.status!==s)b.dataset.status=s;const desired=names[s]||'NORMAL';if(!b.querySelector('.v72-beacon-status')||txt(b.querySelector('.v72-beacon-status'))!==desired)b.innerHTML=beaconHTML('LEAD ALERTS',s,'v70-beacon-lamp')}
      const nav=$('.v70-action-nav',a);
      if(nav){
        const age=actionAge();
        let base=txt(nav).replace(/^(?:DAY\s+\d+|OVERDUE\s+\d+\s+DAYS?)\s*·\s*/i,'');
        if(age)nav.textContent=`${age} · ${base}`;
      }
    }
    const f=$('#operationsBar');
    if(f){
      const s=fleetStatus();if(f.dataset.status!==s)f.dataset.status=s;
      const b=$('.v65-fleet-label',f);
      if(b){if(b.dataset.status!==s)b.dataset.status=s;const desired=names[s]||'NORMAL';if(!b.querySelector('.v72-beacon-status')||txt(b.querySelector('.v72-beacon-status'))!==desired)b.innerHTML=beaconHTML('SYSTEM STATUS',s,'v70-fleet-lamp')}
    }
  }finally{busy=false}
}
function toolbar(){
  const bar=$('#floatingActions');if(!bar)return;
  const buttons=$$(':scope > button',bar);
  const nav=buttons.filter(b=>b.classList.contains('v70-page-nav')||b.dataset.v57tab);
  const actions=buttons.filter(b=>!nav.includes(b));
  buttons.forEach(b=>{b.classList.toggle('v70-page-nav',nav.includes(b));b.classList.toggle('v70-page-action',actions.includes(b));b.classList.remove('v70-first-action');b.style.marginTop='';b.style.marginBottom=''});
  nav.forEach(b=>bar.appendChild(b));actions.forEach(b=>bar.appendChild(b));if(actions[0])actions[0].classList.add('v70-first-action');
}
function version(){const v=$('#appVersionLabel');if(v)v.textContent='B7 FI COMMAND CENTER v0.80.1'}
function run(){paint();toolbar();version()}
// v0.80.1 performance: no continuous status observer/painter.
setTimeout(run,80);setTimeout(run,300);setTimeout(run,900);
})();
