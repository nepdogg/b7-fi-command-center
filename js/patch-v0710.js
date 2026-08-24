/* B7 FI Command Center v0.80.33 — independent status colors + geometry stabilization */
(function(){
'use strict';
window.VERSION=window.B7_APP_VERSION||'0.80.33';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
function text(el){return (el?.textContent||'').trim()}
function actionStatus(){
  const bar=$('#topActionBar'); if(!bar)return 'normal';
  const beacon=$('.v70-action-beacon',bar);
  const s=(beacon?.dataset.status||'').toLowerCase();
  if(['red','orange','yellow','blue','green'].includes(s))return s;
  const cls=[...($('.top-action-current',bar)?.classList||[])];
  return ['red','orange','yellow','blue','green'].find(x=>cls.includes(x))||'normal';
}
function fleetStatus(){
  const t=text($('#opsTickerText')).toLowerCase();
  if(/blocked|critical|stop ship|cannot ship|behind\s+(?:[4-9]|\d{2,})/.test(t))return 'critical';
  if(/behind|overdue|late/.test(t))return 'attention';
  if(/at risk|risk|due soon/.test(t))return 'reminder';
  if(/ahead/.test(t))return 'information';
  if(/on schedule|on track|complete|completed|shipped|ready/.test(t))return 'good';
  return 'normal';
}
function stabilizeStatus(){
  const a=$('#topActionBar'); if(a)a.dataset.status=actionStatus();
  const f=$('#operationsBar'); if(f){
    const s=fleetStatus(); f.dataset.status=s;
    const l=$('.v65-fleet-label',f); if(l){l.dataset.status=s;if(!$('.v70-fleet-lamp',l))l.insertAdjacentHTML('afterbegin','<span class="v70-fleet-lamp" aria-hidden="true"></span>')}
  }
}
function fixToolbar(){
  const bar=$('#floatingActions'); if(!bar)return;
  const buttons=$$(':scope > button',bar);
  const nav=buttons.filter(b=>b.classList.contains('v70-page-nav'));
  const acts=buttons.filter(b=>b.classList.contains('v70-page-action'));
  buttons.forEach(b=>{b.style.marginLeft='';b.style.marginRight=''});
  nav.forEach(b=>bar.appendChild(b));
  const shot=acts.find(b=>/SCREENSHOT/i.test(text(b))), rep=acts.find(b=>/^REPORT$/i.test(text(b)));
  const other=acts.filter(b=>b!==shot&&b!==rep);
  [...other,shot,rep].filter(Boolean).forEach(b=>bar.appendChild(b));
  const first=other[0]||shot||rep;
  $$('.v70-first-action',bar).forEach(b=>b.classList.remove('v70-first-action'));
  if(first)first.classList.add('v70-first-action');
}
function version(){const v=$('#appVersionLabel');if(v)v.textContent='B7 FI COMMAND CENTER v0.79.0'}
function stabilize(){stabilizeStatus();fixToolbar();version()}
// v0.80.1 performance: continuous framework observers/poller removed.
setTimeout(stabilize,120);setTimeout(stabilize,500);
})();
