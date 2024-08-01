const intro = document.querySelector('.intro');
const video = intro.querySelector('video');
const text = intro.querySelector('h1');
const section = document.querySelector('section');
const end = section.querySelector('h1');

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
  duration: 4000,
  triggerElement: intro,
  triggerHook: 0  
}).addIndicators().setPin(intro).addTo(controller);

let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on('update', e => {
  scrollpos = e.scrollPos/1000;
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  video.currentTime = delay;
}, 33.3);

const itemHints = document.querySelector('.item-hints');
const itemHints2 = document.querySelector('.item-hints2');

// Initially hide the hints
itemHints.style.display = 'none';
itemHints2.style.display = 'none';

// Listen for the end event of the scene
scene.on('end', () => {
  itemHints.style.display = 'block';
  itemHints2.style.display = 'block';
});

// Listen for the leave event of the scene
scene.on('leave', () => {
  itemHints.style.display = 'none';
  itemHints2.style.display = 'none';
});