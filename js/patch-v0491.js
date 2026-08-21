/* B7 FI Command Center v0.49.1 — Header / Page Actions Final Layout Fix */
(function(){
  const VERSION='0.49.1';

  function normalizeHeader491(){
    const stack=document.querySelector('.header-status-stack');
    const bar=document.getElementById('topActionBar');
    const toolbar=document.querySelector('.header-status-stack .page-toolbar');
    if(stack){
      stack.style.removeProperty('height');
      stack.style.removeProperty('max-height');
      stack.style.removeProperty('min-height');
    }
    if(bar){
      bar.style.removeProperty('top');
      bar.style.removeProperty('bottom');
      bar.style.removeProperty('transform');
      bar.style.removeProperty('margin-bottom');
    }
    if(toolbar){
      ['top','bottom','transform','margin-top','margin-bottom','position'].forEach(k=>toolbar.style.removeProperty(k));
    }
  }

  const oldRender491=render;
  render=function(){
    oldRender491();
    setTimeout(normalizeHeader491,0);
  };

  const oldActions491=actions;
  actions=function(){
    const r=oldActions491.apply(this,arguments);
    setTimeout(normalizeHeader491,0);
    return r;
  };

  document.title=`B7 FI Command Center v${VERSION}`;
  const ver=document.getElementById('appVersionLabel');
  if(ver)ver.textContent=`B7 FI Command Center v${VERSION}`;
  setTimeout(normalizeHeader491,0);
})();