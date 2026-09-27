(()=>{
  const siteRoot=new URL('.',document.currentScript.src);
  const quests=['fill-the-mold','fixer','tech-hustle','pawn-up','lost-in-puppetland','emn-xr','she-said-maybe','new-murabba','atlantis'];
  const key='yagmur-portfolio-explored-v1';
  let explored=[];
  try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))explored=saved.filter(v=>quests.includes(v))}catch{}
  const current=document.body.dataset.quest;
  if(current&&quests.includes(current)&&!explored.includes(current)){
    explored.push(current);
    try{localStorage.setItem(key,JSON.stringify(explored))}catch{}
  }
  const count=document.getElementById('quest-count');
  const meter=document.getElementById('meter-fill');
  if(count)count.textContent=`${explored.length} / ${quests.length}`;
  if(meter)meter.style.width=`${explored.length/quests.length*100}%`;
  if(current){const status=document.getElementById('clear-state');if(status)status.textContent='QUEST EXPLORED ✓'}
  document.querySelectorAll('[data-stage],[data-quest].project').forEach(el=>{
    const slug=el.dataset.stage||el.dataset.quest;
    if(explored.includes(slug))el.classList.add('visited');
  });
  document.addEventListener('keydown',event=>{
    if(event.altKey||event.ctrlKey||event.metaKey||event.repeat)return;
    if(/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName)||document.activeElement?.isContentEditable)return;
    if(document.body.classList.contains('home')&&['1','2','3'].includes(event.key)){
      location.href=new URL(`projects/${quests[Number(event.key)-1]}/`,siteRoot).href;
    }
  });
})();
