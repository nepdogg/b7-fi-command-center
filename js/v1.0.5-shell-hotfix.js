/* B7 FI Command Center v1.0.5 — visible version + shell guard.
   Does not change operational data, alerts, tool logic, meetings, actions,
   shipping logic, reference data, or search data. */
(function(){
  'use strict';

  const VERSION = '1.0.5';
  const BUILD = '20260825-NIGHT';
  const TITLE = `B7 FI Command Center v${VERSION}`;

  function enforceVersion(){
    if(document.title !== TITLE) document.title = TITLE;

    const label = document.getElementById('appVersionLabel');
    if(label){
      const desired = `B7 FI COMMAND CENTER V${VERSION} · BUILD ${BUILD}`;
      if(label.textContent !== desired) label.textContent = desired;
      label.setAttribute('data-version-authority','v1.0.5');
    }

    document.documentElement.setAttribute('data-b7-version', VERSION);
    document.documentElement.setAttribute('data-b7-build', BUILD);
  }

  function enforceShell(){
    const shell = document.querySelector('body > .sticky-header');
    const app = document.querySelector('body > main#app');
    const footer = document.querySelector('body > footer.v57-footer');

    [shell,app,footer].forEach(el=>{
      if(!el) return;
      el.style.setProperty('width','100%','important');
      el.style.setProperty('max-width','none','important');
      el.style.setProperty('margin-left','0','important');
      el.style.setProperty('margin-right','0','important');
    });

    if(shell && !document.body.classList.contains('wallboard-mode') &&
       !document.body.classList.contains('v802-live-status')){
      shell.style.setProperty('position','sticky','important');
      shell.style.setProperty('top','0','important');
      shell.style.setProperty('z-index','4000','important');
    }
  }

  function stabilize(){
    enforceVersion();
    enforceShell();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', stabilize, {once:true});
  }else{
    stabilize();
  }

  window.addEventListener('load', stabilize);
  window.addEventListener('hashchange', ()=>requestAnimationFrame(stabilize));
  window.addEventListener('popstate', ()=>requestAnimationFrame(stabilize));

  /* The app re-renders center chrome during navigation. Re-assert only shell/version
     properties, never business data. */
  const observer = new MutationObserver(()=>{
    requestAnimationFrame(stabilize);
  });

  const beginObserve = ()=>{
    observer.observe(document.body,{
      subtree:true,
      childList:true,
      attributes:true,
      attributeFilter:['class','data-center']
    });
    stabilize();
  };

  if(document.body) beginObserve();
  else document.addEventListener('DOMContentLoaded', beginObserve, {once:true});

  window.B7_BUILD_INFO = Object.freeze({
    version: VERSION,
    build: BUILD,
    purpose: 'Global shell stabilization'
  });
})();
