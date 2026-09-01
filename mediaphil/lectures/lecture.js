/* 매체철학 2026-2 · 주차별 강의자료 공통 스크립트 */
(function(){
  var sidebar = document.getElementById('sidebar');
  var scrim   = document.getElementById('scrim');
  var burger  = document.getElementById('burger');
  var bar     = document.getElementById('bar');
  var totop   = document.getElementById('totop');
  var links   = Array.prototype.slice.call(document.querySelectorAll('#nav a'));
  var secs    = links.map(function(a){ return document.getElementById(a.getAttribute('href').slice(1)); });

  /* 모바일 드로어 */
  function close(){ sidebar.classList.remove('open'); scrim.classList.remove('on'); }
  burger.addEventListener('click', function(){
    sidebar.classList.toggle('open');
    scrim.classList.toggle('on', sidebar.classList.contains('open'));
  });
  scrim.addEventListener('click', close);
  links.forEach(function(a){ a.addEventListener('click', function(){ if(innerWidth<=980) close(); }); });
  addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });

  /* 진행바 · 맨위로 */
  function onScroll(){
    var h = document.documentElement.scrollHeight - innerHeight;
    var y = scrollY;
    bar.style.width = (h>0 ? (y/h*100) : 0) + '%';
    totop.classList.toggle('on', y > 500);
  }
  addEventListener('scroll', onScroll, {passive:true});
  addEventListener('resize', onScroll);
  onScroll();
  totop.addEventListener('click', function(){ scrollTo({top:0, behavior:'smooth'}); });

  /* 스크롤 스파이 */
  var ticking = false;
  function spy(){
    var y = scrollY + innerHeight*0.28;
    var idx = 0;
    for (var i=0;i<secs.length;i++){
      if (secs[i] && secs[i].offsetTop <= y) idx = i;
    }
    links.forEach(function(a,i){ a.classList.toggle('active', i===idx); });
    if (innerWidth > 980){
      var a = links[idx];
      var top = a.offsetTop, bot = top + a.offsetHeight;
      if (top < sidebar.scrollTop || bot > sidebar.scrollTop + sidebar.clientHeight){
        sidebar.scrollTop = top - sidebar.clientHeight/2;
      }
    }
    ticking = false;
  }
  addEventListener('scroll', function(){
    if(!ticking){ ticking = true; requestAnimationFrame(spy); }
  }, {passive:true});
  spy();
})();
