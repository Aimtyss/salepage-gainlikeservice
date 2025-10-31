let header = document.querySelector('.header');
let navbar = document.querySelector('.header .flex .navbar');
let menuBtn = document.querySelector('#menu-btn');

menuBtn.onclick = () =>{
   menuBtn.classList.toggle('fa-xmark');
   navbar.classList.toggle('active');
}

window.onscroll = () =>{
   menuBtn.classList.remove('fa-xmark');
   navbar.classList.remove('active');

   if(window.scrollY > 0){
      header.classList.add('active');
   }else{
      header.classList.remove('active');
   }

}

let slides = document.querySelectorAll('.reviews .row .slider-container .slide');
let index = 0;

function next(){
   slides[index].classList.remove('active');
   index = (index + 1) % slides.length;
   slides[index].classList.add('active');
}

function prev(){
   slides[index].classList.remove('active');
   index = (index - 1 + slides.length) % slides.length;
   slides[index].classList.add('active');
}

(() => {
  const root = document.getElementById('slider');
  const track = root.querySelector('.track');
  const slides = [...root.querySelectorAll('.slide')];
  const btnPrev = root.querySelector('[data-prev]');
  const btnNext = root.querySelector('[data-next]');
  const dotsWrap = root.querySelector('.dots');

  // สร้างจุดสถานะ
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.type = 'button';
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', `สไลด์ที่ ${i+1}`);
    d.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(d);
  });

  let index = 0;
  let auto = null;
  const interval = 3500; // ms
  let isHover = false;

  const setTransform = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    [...dotsWrap.children].forEach((d,i)=> d.classList.toggle('active', i===index));
  };

  const goTo = (i, user=false) => {
    index = (i + slides.length) % slides.length;
    setTransform();
    if (user) restartAuto();
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);

  // Auto slide + pause on hover
  const startAuto = () => auto = setInterval(() => { if (!isHover) next(); }, interval);
  const stopAuto  = () => { clearInterval(auto); auto=null; };
  const restartAuto = () => { stopAuto(); startAuto(); };

  root.addEventListener('mouseenter', () => { isHover = true; });
  root.addEventListener('mouseleave', () => { isHover = false; });

  // Swipe (touch / pointer)
  let startX = 0, dx = 0, swiping = false;
  root.addEventListener('pointerdown', e => {
    swiping = true; startX = e.clientX; dx = 0; track.style.transition = 'none';
  });
  window.addEventListener('pointermove', e => {
    if (!swiping) return;
    dx = e.clientX - startX;
    track.style.transform = `translateX(calc(-${index*100}% + ${dx}px))`;
  });
  window.addEventListener('pointerup', () => {
    if (!swiping) return;
    track.style.transition = ''; // คืน transition
    const threshold = root.clientWidth * 0.15;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    else setTransform();
    swiping = false; dx = 0; restartAuto();
  });

  // ป้องกันลากภาพแล้วเผลอเปิดลิงก์
  root.querySelectorAll('a').forEach(a=>{
    let moved=false;
    a.addEventListener('pointerdown',()=>{ moved=false; });
    a.addEventListener('pointermove',()=>{ moved=true; });
    a.addEventListener('click',e=>{ if(moved) e.preventDefault(); });
  });

  // เริ่มทำงาน
  setTransform();
  startAuto();
})();
