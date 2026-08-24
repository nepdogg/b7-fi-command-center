/* B7 FI Command Center v0.80.33 — final Live Status parity/version lock. */
(function(){'use strict';const VERSION=window.B7_APP_VERSION||'0.80.33';
function viewerOnly(){return document.body?.dataset?.liveViewerOnly==='true'}
function stamp(){window.VERSION=VERSION;document.title=viewerOnly()?`B7 FI Live Status v${VERSION}`:`B7 FI Command Center v${VERSION}`;const v=document.querySelector('#appVersionLabel');if(v)v.textContent=`B7 FI COMMAND CENTER V${VERSION}`}
const old=window.setView;if(typeof old==='function')window.setView=function(){const r=old.apply(this,arguments);setTimeout(stamp,0);setTimeout(stamp,150);return r};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{stamp();setTimeout(stamp,250)},{once:true});else{stamp();setTimeout(stamp,250)}
})();
