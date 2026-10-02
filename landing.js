const reveals=[...document.querySelectorAll('.reveal')];
const glow=document.querySelector('.cursor-glow');
let motionStarted=false;

window.addEventListener('pointermove',event=>{if(glow)glow.style.transform=`translate3d(${event.clientX-130}px,${event.clientY-130}px,0)`},{passive:true});
document.querySelector('#menuButton')?.addEventListener('click',event=>{const nav=document.querySelector('.site-nav');nav.classList.toggle('menu-open');event.currentTarget.textContent=nav.classList.contains('menu-open')?'×':'☰';event.currentTarget.setAttribute('aria-expanded',nav.classList.contains('menu-open'));});
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>document.querySelector('.site-nav')?.classList.remove('menu-open')));

function nativeMotion(){
  if(!('IntersectionObserver' in window)){reveals.forEach(item=>item.classList.add('is-visible'));return;}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.14});
  reveals.forEach(item=>observer.observe(item));
}
function libraryMotion(){
  if(motionStarted)return;
  if(!window.gsap){nativeMotion();return;}
  motionStarted=true;
  const gsap=window.gsap;
  const ScrollTrigger=window.ScrollTrigger;
  if(ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){nativeMotion();return;}
  if(window.Lenis){
    const lenis=new window.Lenis({lerp:.085,smoothWheel:true,syncTouch:true});
    const raf=time=>{lenis.raf(time);requestAnimationFrame(raf)};
    requestAnimationFrame(raf);
    if(ScrollTrigger)lenis.on('scroll',ScrollTrigger.update);
  }
  gsap.timeline({defaults:{ease:'power3.out'}})
    .from('.announcement',{y:-20,opacity:0,duration:.55})
    .from('.site-nav',{y:-20,opacity:0,duration:.7},'-=.25')
    .from('.hero-copy > *',{y:34,opacity:0,stagger:.1,duration:.72},'-=.35')
    .from('.hero-feature',{y:36,opacity:0,scale:.96,duration:.8},'-=.55');
  gsap.utils.toArray('.reveal').forEach((element,index)=>{
    if(element.closest('.hero'))return;
    const reveal={y:45,opacity:0};
    const show={y:0,opacity:1,duration:.9,delay:(index%3)*.06,ease:'power3.out'};
    if(ScrollTrigger)show.scrollTrigger={trigger:element,start:'top 84%',once:true};
    gsap.fromTo(element,reveal,show);
  });
  if(ScrollTrigger){
    gsap.to('.hero-backdrop img',{yPercent:-9,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
    gsap.to('.spotlight-image img',{yPercent:-5,ease:'none',scrollTrigger:{trigger:'.spotlight',start:'top bottom',end:'bottom top',scrub:true}});
    ScrollTrigger.refresh();
  }
}
function startMotion(){
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',startMotion,{once:true});return;}
  libraryMotion();
  if(!motionStarted&&window.gsap===undefined){let attempts=0;const retry=()=>{if(motionStarted||window.gsap||attempts++>8){if(!motionStarted)nativeMotion();return;}libraryMotion();setTimeout(retry,250)};setTimeout(retry,250)}
}
startMotion();