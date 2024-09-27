const intro = document.querySelector('.intro');
const video = intro.querySelector('video');
const text = intro.querySelector('h1');
const section = document.querySelector('section');
const end = section.querySelector('h1');

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
  duration: 2000,
  triggerElement: intro,
  triggerHook: 0
}).setPin(intro).addTo(controller);

let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on('update', e => {
  scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  video.currentTime = scrollpos;
}, 33.3);

var controller2 = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: "onEnter",
    duration: "200%"
  }
});

new ScrollMagic.Scene({
  triggerElement: "#parallax1"
})
  .setTween("#parallax1 > div", { y: "80%", ease: Linear.easeNone })
  .addTo(controller2);

new ScrollMagic.Scene({
  triggerElement: "#parallax2"
})
  .setTween("#parallax2 > div", { y: "80%", ease: Linear.easeNone })
  .addTo(controller2);