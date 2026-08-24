/* B7 FI Command Center v0.80.33 — Knowledge Base + Framework Fix */
(function(){
  const VERSION=window.B7_APP_VERSION||'0.80.33';

  function ensureKnowledge49(){
    state.knowledgeNotes=Array.isArray(state.knowledgeNotes)?state.knowledgeNotes:[];
  }
  ensureKnowledge49();

  const KB_CATS=['Favorites','Part Numbers','Procedures','Wafer Information','Tool / Model Notes','Troubleshooting','Contacts','Shipping / Packing','Software / Versions','Customer Notes','General Reference'];

  function kbFiltered49(){
    ensureKnowledge49();
    const q=(document.getElementById('kbSearch49')?.value||'').trim().toLowerCase();
    const cat=document.getElementById('kbCategory49')?.value||'All Categories';
    return state.knowledgeNotes
      .filter(n=>cat==='All Categories' || (cat==='Favorites'?n.favorite:n.category===cat))
      .filter(n=>{
        if(!q)return true;
        return [n.title,n.category,n.tags,n.partNumber,n.toolModel,n.value,n.notes]
          .some(v=>String(v||'').toLowerCase().includes(q));
      })
      .sort((a,b)=>(Number(!!b.favorite)-Number(!!a.favorite)) ||
        String(a.category||'').localeCompare(String(b.category||'')) ||
        String(a.title||'').localeCompare(String(b.title||'')));
  }

  function kbCard49(n){
    return `<article class="kb-card49 ${n.favorite?'favorite':''}" data-kbid="${esc(n.id)}">
      <div class="kb-card-head49">
        <div>
          <span class="kb-cat49">${esc(n.category||'General Reference')}</span>
          <h3>${esc(n.title||'Untitled Reference')}</h3>
        </div>
        <button class="kb-fav49 ${n.favorite?'on':''}" title="Favorite">${n.favorite?'★':'☆'}</button>
      </div>
      <div class="kb-quick49">
        ${n.partNumber?`<div><span>PART NUMBER</span><b>${esc(n.partNumber)}</b></div>`:''}
        ${n.toolModel?`<div><span>TOOL / MODEL</span><b>${esc(n.toolModel)}</b></div>`:''}
        ${n.value?`<div><span>QUICK VALUE</span><b>${esc(n.value)}</b></div>`:''}
      </div>
      ${n.notes?`<div class="kb-notes49">${esc(n.notes).replace(/\n/g,'<br>')}</div>`:''}
      ${n.tags?`<div class="kb-tags49">${esc(n.tags)}</div>`:''}
      <div class="kb-card-actions49">
        <button class="btn small kb-copy49">Copy</button>
        <button class="btn small kb-edit49">Edit</button>
        <button class="btn small danger kb-delete49">Delete</button>
      </div>
    </article>`;
  }

  function kbEditor49(note=null){
    const n=note||{id:'',title:'',category:'General Reference',tags:'',partNumber:'',toolModel:'',value:'',notes:'',favorite:false};
    return `<section class="panel kb-editor49">
      <div class="subsection-title">
        <div><h3>${note?'Edit Reference Note':'Add Reference Note'}</h3><p class="helper">Store information you repeatedly need so it is searchable instead of buried in the legacy Word document.</p></div>
        <button id="kbCancel49" class="btn">Cancel</button>
      </div>
      <div class="kb-form49">
        <div class="form-group wide"><label>Title</label><input id="kbTitle49" value="${esc(n.title)}" placeholder="Example: B60 wafer part number"></div>
        <div class="form-group"><label>Category</label><select id="kbCatEdit49">${KB_CATS.filter(x=>x!=='Favorites').map(x=>`<option ${n.category===x?'selected':''}>${esc(x)}</option>`).join('')}</select></div>
        <div class="form-group"><label>Part Number (optional)</label><input id="kbPart49" value="${esc(n.partNumber)}"></div>
        <div class="form-group"><label>Tool / Model (optional)</label><input id="kbModel49" value="${esc(n.toolModel)}" placeholder="29XX, R915, 2955..."></div>
        <div class="form-group"><label>Quick Value / Reference</label><input id="kbValue49" value="${esc(n.value)}" placeholder="Short value you need quickly"></div>
        <div class="form-group wide"><label>Keywords / Tags</label><input id="kbTags49" value="${esc(n.tags)}" placeholder="lamp, wafer, packing, R915..."></div>
        <div class="form-group wide"><label>Detailed Notes / Instructions</label><textarea id="kbNotes49" class="kb-details49">${esc(n.notes)}</textarea></div>
        <label class="kb-favorite-check49"><input id="kbFavorite49" type="checkbox" ${n.favorite?'checked':''}> Favorite / Frequently Used</label>
      </div>
      <div class="actions"><button id="kbSave49" class="btn primary">${note?'Save Changes':'Add to Knowledge Base'}</button></div>
    </section>`;
  }

  function renderKnowledgeCards49(){
    const host=document.getElementById('kbCards49');
    if(!host)return;
    const items=kbFiltered49();
    host.innerHTML=items.length?items.map(kbCard49).join(''):`<div class="notice">No matching reference notes. Use + Add Reference Note to create one.</div>`;
    host.querySelectorAll('[data-kbid]').forEach(card=>{
      const n=state.knowledgeNotes.find(x=>x.id===card.dataset.kbid);
      if(!n)return;
      card.querySelector('.kb-fav49').onclick=()=>{n.favorite=!n.favorite;save();renderKnowledgeCards49()};
      card.querySelector('.kb-edit49').onclick=()=>openKbEditor49(n.id);
      card.querySelector('.kb-delete49').onclick=()=>{if(confirm(`Delete "${n.title}"?`)){state.knowledgeNotes=state.knowledgeNotes.filter(x=>x.id!==n.id);save();renderKnowledgeCards49()}};
      card.querySelector('.kb-copy49').onclick=async()=>{
        const txt=[n.title,n.partNumber&&`Part Number: ${n.partNumber}`,n.toolModel&&`Tool/Model: ${n.toolModel}`,n.value&&`Reference: ${n.value}`,n.notes].filter(Boolean).join('\n');
        try{await navigator.clipboard.writeText(txt);card.querySelector('.kb-copy49').textContent='Copied';setTimeout(()=>card.querySelector('.kb-copy49')&&(card.querySelector('.kb-copy49').textContent='Copy'),900)}
        catch(e){prompt('Copy reference:',txt)}
      };
    });
  }

  function openKbEditor49(id=''){
    const n=id?state.knowledgeNotes.find(x=>x.id===id):null;
    const host=document.getElementById('kbEditorHost49');
    if(!host)return;
    host.innerHTML=kbEditor49(n||null);
    host.scrollIntoView({behavior:'smooth',block:'start'});
    document.getElementById('kbCancel49').onclick=()=>{host.innerHTML=''};
    document.getElementById('kbSave49').onclick=()=>{
      const title=document.getElementById('kbTitle49').value.trim();
      if(!title)return alert('Title is required.');
      const obj={
        id:n?.id||('kb'+Date.now()),
        title,
        category:document.getElementById('kbCatEdit49').value,
        partNumber:document.getElementById('kbPart49').value.trim(),
        toolModel:document.getElementById('kbModel49').value.trim(),
        value:document.getElementById('kbValue49').value.trim(),
        tags:document.getElementById('kbTags49').value.trim(),
        notes:document.getElementById('kbNotes49').value.trim(),
        favorite:document.getElementById('kbFavorite49').checked,
        updatedAt:new Date().toISOString(),
        createdAt:n?.createdAt||new Date().toISOString()
      };
      if(n)state.knowledgeNotes[state.knowledgeNotes.findIndex(x=>x.id===n.id)]=obj;
      else state.knowledgeNotes.unshift(obj);
      save();host.innerHTML='';renderKnowledgeCards49();
    };
  }

  function knowledgePage49(){
    ensureKnowledge49();
    view='knowledge';
    document.body.dataset.theme='knowledge';
    setHeaderContext('FI KNOWLEDGE BASE','Special Notes · Quick Reference');
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='knowledge'));
    app.innerHTML=`<div class="report-screen knowledge-page49">
      ${reportHeader('FI KNOWLEDGE BASE / SPECIAL NOTES','Searchable permanent reference for part numbers, procedures, recurring information and FI knowledge.')}
      <section class="panel kb-toolbar49">
        <div class="kb-search49">
          <input id="kbSearch49" type="search" placeholder="Search title, part number, model, notes or tags...">
          <select id="kbCategory49"><option>All Categories</option>${KB_CATS.map(x=>`<option>${esc(x)}</option>`).join('')}</select>
          <button id="kbAdd49" class="btn primary">+ Add Reference Note</button>
        </div>
        <div class="kb-summary49"><span><b>${state.knowledgeNotes.length}</b> saved notes</span><span><b>${state.knowledgeNotes.filter(x=>x.favorite).length}</b> favorites</span><span>Legacy Word document remains available in Reference Files.</span></div>
      </section>
      <div id="kbEditorHost49"></div>
      <section class="panel">
        <div id="kbCards49" class="kb-grid49"></div>
      </section>
    </div>`;
    document.getElementById('kbSearch49').oninput=renderKnowledgeCards49;
    document.getElementById('kbCategory49').onchange=renderKnowledgeCards49;
    document.getElementById('kbAdd49').onclick=()=>openKbEditor49('');
    renderKnowledgeCards49();
    actions([{label:'Reference Files',fn:()=>setView('references')},{label:'Lead Workspace',fn:()=>setView('workspace')},{label:'Administration',fn:()=>setView('admin')}],false);
    syncFramework49();
  }

  const oldSetView49=setView;
  setView=function(v){
    if(v==='knowledge'){window.scrollTo(0,0);knowledgePage49();return}
    oldSetView49(v);
    setTimeout(syncFramework49,0);
  };

  function bindNav49(){
    document.querySelectorAll('.nav-btn').forEach(b=>{
      if(b.dataset.view==='knowledge')b.onclick=()=>setView('knowledge');
    });
  }

  /* Make the bottom bar always inherit the currently computed page accent.
     This avoids stale hard-coded page mappings. */
  function syncFramework49(){
    const body=getComputedStyle(document.body);
    const accent=(body.getPropertyValue('--accent')||'#e4b84d').trim();
    const rgb=(body.getPropertyValue('--accent-rgb')||'228,184,77').trim();
    document.documentElement.style.setProperty('--live-page-accent',accent);
    document.documentElement.style.setProperty('--live-page-rgb',rgb);
    document.body.style.setProperty('--fleet-accent',accent);
    document.body.style.setProperty('--fleet-rgb',rgb);

    const op=document.getElementById('operationsBar');
    if(op){
      op.style.setProperty('border-top-color',accent,'important');
      op.style.setProperty('border-bottom-color',accent,'important');
    }

    /* Remove old persistent blue box from Shared Data / other inactive nav controls. */
    document.querySelectorAll('.main-nav .nav-btn:not(.active)').forEach(b=>{
      b.style.removeProperty('outline');
      b.style.removeProperty('box-shadow');
    });
  }

  /* Preserve all normal render behavior, then re-sync framework visuals. */
  const oldRender49=render;
  render=function(){
    oldRender49();
    setTimeout(()=>{bindNav49();syncFramework49()},0);
  };

  /* Morning Status: Knowledge Base belongs in the main nav, not duplicated in Page Actions. */
  const oldMorning49=morning;
  morning=function(){
    oldMorning49();
    document.querySelectorAll('.page-toolbar button').forEach(b=>{
      if(b.textContent.trim().toLowerCase()==='fi knowledge base')b.remove();
    });
    syncFramework49();
  };

  document.title=`B7 FI Command Center v${VERSION}`;
  const ver=document.getElementById('appVersionLabel');
  if(ver)ver.textContent=`B7 FI Command Center v${VERSION}`;
  setTimeout(()=>{bindNav49();syncFramework49()},0);
})();