/* B7 FI Command Center v0.52.2 — Global Frame + Color System Fix */
(function(){
'use strict';
window.VERSION='0.52.2';
const PAGE_COLORS_522={
home:['#C69A2B','198,154,43'],countdown:['#F0B429','240,180,41'],shipping:['#20C7D9','32,199,217'],
customer:['#8F6FF1','143,111,241'],daily:['#35C56F','53,197,111'],meeting:['#F39B3D','243,155,61'],
meetingcenter:['#4A90E2','74,144,226'],leads:['#D76CE8','215,108,232'],weekend:['#9A6BEA','154,107,234'],
workspace:['#5778E8','87,120,232'],systems:['#5E9CB7','94,156,183'],actions:['#F06449','240,100,73'],
wallboard:['#91C943','145,201,67'],knowledge:['#42C7A0','66,199,160'],references:['#20BFB3','32,191,179'],
archive:['#8792A3','135,146,163'],shared:['#5B6FE6','91,111,230'],admin:['#A4AFBE','164,175,190']};
function theme522(){return document.body.dataset.theme||window.view||'home'}
function frame522(){
 const p=PAGE_COLORS_522[theme522()]||PAGE_COLORS_522.home;
 ['--accent','--live-page-accent','--fleet-accent'].forEach(k=>document.body.style.setProperty(k,p[0]));
 ['--accent-rgb','--live-page-rgb','--fleet-rgb'].forEach(k=>document.body.style.setProperty(k,p[1]));
 const ver=document.getElementById('appVersionLabel'); if(ver) ver.textContent='B7 FI Command Center v0.52.2';
 const ops=document.getElementById('operationsBar'),foot=document.querySelector('body > footer');
 if(ops&&foot&&ops.nextElementSibling!==foot) ops.insertAdjacentElement('afterend',foot);
}
new MutationObserver(()=>setTimeout(frame522,0)).observe(document.body,{attributes:true,attributeFilter:['data-theme']});
if(typeof setView==='function'){const old=setView;setView=function(v){old(v);setTimeout(frame522,0)};document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>setView(b.dataset.view))}
if(typeof render==='function'){const old=render;render=function(){old();setTimeout(frame522,0)}}
setTimeout(frame522,60);setTimeout(frame522,250);
})();