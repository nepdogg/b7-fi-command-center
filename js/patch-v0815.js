/* B7 FI Command Center v0.80.15 — Action Center save/edit controls for status-bar testing. */
(function(){
'use strict';
const VERSION='0.80.19';
window.VERSION=VERSION;
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=(v)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
function toast(msg){
  let t=$('#v815Toast'); if(!t){t=document.createElement('div');t.id='v815Toast';t.className='v815-toast';document.body.appendChild(t)}
  t.textContent=msg;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),1800);
}
function saveCard(card){
  if(!card||!card.dataset.auto51)return false;
  const k=card.dataset.auto51;
  state.actionDisplay=state.actionDisplay||{};
  const d=state.actionDisplay[k]||(state.actionDisplay[k]={});
  d.assignee=card.querySelector('.ac-owner51')?.value.trim()||'';
  d.show=(card.querySelector('.ac-show51')?.value||'on')==='on';
  d.seconds=Number(card.querySelector('.ac-sec51')?.value)||8;
  d.order=Number(card.querySelector('.ac-order51')?.value)||999;
  d.pin=!!card.querySelector('.ac-pin51')?.checked;
  d.ack=!!card.querySelector('.ac-ack51')?.checked;
  const mode=card.querySelector('.ac-until-mode51')?.value||'while-open';
  const custom=card.querySelector('.ac-until51')?.value||'';
  d.displayUntil=mode==='while-open'?'while-open':mode==='today'?today():(custom||'while-open');
  state.actionDisplay[k]=d;
  card.classList.toggle('v815-disabled',!d.show);
  return true;
}
function saveAllCards(){
  let n=0;$$('.auto-action51[data-auto51]').forEach(c=>{if(saveCard(c))n++});
  if(typeof save==='function')save();
  toast(`${n} action${n===1?'':'s'} saved · Lead Alerts updated`);
  /* A short Action-Center re-render is enough; the existing ticker reads actionDisplay on its next rotation. */
  setTimeout(()=>{if(document.body.dataset.center==='action'&&window.B7Renderers58?.actionCenter){window.B7Renderers58.actionCenter();setTimeout(enhance,0)}},80);
}
function addTaskModal(){
  $('#v61TaskModal')?.remove();
  const toolOptions=(typeof tools!=='undefined'?tools:[]).map(t=>`<option value="${esc(t.id)}">${esc(t.id)} · ${esc(t.model||t.codename||'')}</option>`).join('');
  document.body.insertAdjacentHTML('beforeend',`<div id="v61TaskModal" class="v61-modal v815-modal"><div class="v61-modal-card v815-modal-card">
    <div class="v815-modal-head"><div><h3>ADD TASK</h3><p>Create the action and configure exactly how it appears in Lead Alerts.</p></div><button type="button" class="v815-x" id="v815TaskX" aria-label="Close">×</button></div>
    <div class="v815-form-grid">
      <label>Tool<select id="v815Tool"><option value="">General / No Tool</option>${toolOptions}</select></label>
      <label>Category<select id="v815Sev"><option value="yellow">Reminder</option><option value="orange">Attention</option><option value="red">Critical</option><option value="blue">Information</option></select></label>
      <label class="v815-span2">Task / Message<input id="v815Text" placeholder="Task / follow-up / information"></label>
      <label>Assigned Lead<input id="v815Owner" placeholder="Optional"></label>
      <label>Show on Lead Alerts<select id="v815Show"><option value="on">ON</option><option value="off">OFF</option></select></label>
      <label>Display Time<select id="v815Seconds">${[5,8,10,15,20,30,60].map(x=>`<option value="${x}" ${x===10?'selected':''}>${x} sec</option>`).join('')}</select></label>
      <label>Display Order<input id="v815Order" type="number" min="1" value="999"></label>
      <label>Show Until<select id="v815UntilMode"><option value="while-open">While Open</option><option value="today">Today</option><option value="custom">Custom Date</option></select></label>
      <label>Custom End<input id="v815Until" type="date"></label>
      <label class="v815-check"><input id="v815Pin" type="checkbox"> Pin for extra visibility</label>
      <label class="v815-check"><input id="v815Ack" type="checkbox"> Acknowledged / Working</label>
    </div>
    <div class="actions v815-modal-actions"><button class="btn" id="v815Cancel">CANCEL</button><button class="btn primary" id="v815Add">ADD & SAVE TASK</button></div>
  </div></div>`);
  const close=()=>$('#v61TaskModal')?.remove();
  $('#v815TaskX').onclick=close;$('#v815Cancel').onclick=close;
  $('#v61TaskModal').addEventListener('click',e=>{if(e.target.id==='v61TaskModal')close()});
  $('#v815Add').onclick=()=>{
    const text=$('#v815Text').value.trim();if(!text){$('#v815Text').focus();return}
    state.manualReminders=Array.isArray(state.manualReminders)?state.manualReminders:[];
    state.actionDisplay=state.actionDisplay||{};state.actionFirstSeen=state.actionFirstSeen||{};
    const id='mr'+Date.now();
    const item={id,toolId:$('#v815Tool').value,severity:$('#v815Sev').value,text,manual:true,complete:false,createdAt:new Date().toISOString()};
    state.manualReminders.unshift(item);
    const mode=$('#v815UntilMode').value, custom=$('#v815Until').value;
    state.actionDisplay['manual:'+id]={
      show:$('#v815Show').value==='on',seconds:Number($('#v815Seconds').value)||10,order:Number($('#v815Order').value)||999,
      assignee:$('#v815Owner').value.trim(),pin:$('#v815Pin').checked,ack:$('#v815Ack').checked,
      displayUntil:mode==='while-open'?'while-open':mode==='today'?today():(custom||'while-open')
    };
    state.actionFirstSeen['manual:'+id]=item.createdAt;
    if(typeof save==='function')save();close();
    if(typeof setView==='function')setView('actions');
    toast('Task added and saved');
  };
}
function enhance(){
  if(document.body.dataset.center!=='action')return;
  $('#appVersionLabel') && ($('#appVersionLabel').textContent=`B7 FI COMMAND CENTER V${VERSION}`);
  $$('.auto-controls51').forEach(ctrl=>{
    const card=ctrl.closest('.auto-action51');
    const showLabel=ctrl.querySelector('.ac-show51')?.closest('label');if(showLabel&&showLabel.firstChild)showLabel.firstChild.textContent='Lead Alerts';
    const btn=ctrl.querySelector('.ac-save51');if(btn){btn.textContent='SAVE CHANGES';btn.classList.add('v815-save');btn.onclick=(e)=>{e.preventDefault();saveCard(card);if(typeof save==='function')save();toast('Action changes saved');setTimeout(()=>{if(window.B7Renderers58?.actionCenter){window.B7Renderers58.actionCenter();setTimeout(enhance,0)}},60)}}
    const d=state.actionDisplay?.[card?.dataset.auto51];if(card&&d)card.classList.toggle('v815-disabled',d.show===false);
  });
  const bar=$('#floatingActions');if(bar){
    const add=$$('button',bar).find(b=>/^ADD TASK$/i.test(b.textContent.trim()));if(add)add.onclick=addTaskModal;
    if(!$('#v815SaveAll')){const b=document.createElement('button');b.id='v815SaveAll';b.className='btn primary v815-save-all';b.textContent='SAVE ALL CHANGES';b.onclick=saveAllCards;add?.after(b)}
  }
}
/* Wrap the authoritative Action Center renderer so controls are enhanced every time it opens. */
if(window.B7Renderers58?.actionCenter){
  const old=window.B7Renderers58.actionCenter;
  window.B7Renderers58.actionCenter=function(){const out=old.apply(this,arguments);setTimeout(enhance,0);return out};
}
const oldSet=window.setView;if(typeof oldSet==='function')window.setView=function(v){const out=oldSet.apply(this,arguments);if(v==='actions')setTimeout(enhance,20);return out};
setTimeout(enhance,120);
})();
