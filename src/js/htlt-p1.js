import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import './browser-detect.js';
import './applystuff.js';
document.addEventListener('DOMContentLoaded', function () {
  const divoverpre = document.querySelector('.divoverpre');
  const div28 = document.querySelector('.div-block-28.a');
  const text18 = document.querySelector('.text-block-18');
  const div14 = document.querySelector('.div-block-14');
  const naviga = document.querySelector('#naviga');
  const interfaceLskknlkcn = document.querySelector('.interface.lskknlkcn');
  divoverpre.style.display = 'none';
  gsap.set(naviga, {
    opacity: 0,
    y: 10,
  });
  gsap.set(interfaceLskknlkcn, {
    opacity: 0,
    y: 10,
    display: 'flex',
  });

  gsap.to([naviga, interfaceLskknlkcn], {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power2.inOut',
  });
  gsap.to(text18, {
    opacity: 1,
    duration: 0.1,
    ease: 'power1.inOut',
  });
  gsap.to(div14, {
    opacity: 1,
    duration: 1,
    delay: 0.25,
    ease: 'power4.inOut',
  });
  setTimeout(() => {
    divoverpre.style.display = 'flex';
    gsap.to(div28, {
      opacity: 1,
      duration: 1,
      ease: 'power4.inOut',
    });
    gsap.to(divoverpre, {
      opacity: 1,
      duration: 1,
      delay: 0.1,
      y: 0,
      ease: 'power4.inOut',
    });
  }, 7500);
  document.fonts
    .load("1em 'Neueeigene'")
    .then(function () {
      setTimeout(function () {
        document.querySelectorAll('.hidden-text').forEach((el) => {
          el.style.opacity = '1';
        });
      }, 100);
    })
    .catch(function () {});

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  let iframe6 = document.querySelector('#vimeo-video1');
  let iframe7 = document.querySelector('#vimeo-video2');
  let iframe8 = document.querySelector('#vimeo-video3');

  let player6 = new Vimeo.Player(iframe6);
  let player7 = new Vimeo.Player(iframe7);
  let player8 = new Vimeo.Player(iframe8);

  player6.pause();
  player7.pause();
  player8.pause();

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item._1',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onEnter: () => {
      player6.play();
      player7.play();
      player8.play();
    },
  });

  let iframe1 = document.querySelector('#vimeo-video1');
  let player1 = new Vimeo.Player(iframe1);

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item._5',
    start: '-100% 50%',
    end: '1200 50%',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      if (progress <= 0.2) {
        player1.setVolume(progress / 0.2);
      } else if (progress < 0.5) {
        player1.setVolume(1);
      } else {
        player1.setVolume((1 - progress) / 0.5);
      }
    },
    onEnter: () => {
      player1.setMuted(false);
    },
    onLeave: () => {
      player1.setMuted(true);
      player1.setVolume(0);
    },
    onEnterBack: () => {
      player1.setMuted(false);
    },
    onLeaveBack: () => {
      player1.setMuted(true);
      player1.setVolume(0);
    },
  });

  //scroll move controll for all items
  function createScrollAnimation(index) {
    gsap.to(`.home-scroll_img-item._${index}`, {
      ease: 'none',
      x: -window.innerHeight * 3,
      scrollTrigger: {
        trigger: `.home-scroll_text-item._${index}`,
        start: 'top 300%',
        end: 'top -300%',
        scrub: 1,
      },
    });
  }

  for (let i = 1; i <= 9; i++) {
    createScrollAnimation(i);
  }

  const clickAudio = document.getElementById('click-audio');
  const hoverAudio = document.getElementById('hover-audio');

  const linkClasses = [
    {
      className: 'imageeoifnc',
      clickAudio: clickAudio,
      hoverAudio: hoverAudio,
    },
    { className: 'divoverpre', clickAudio: clickAudio, hoverAudio: null },
  ];

  function handleClick(linkInfo) {
    linkInfo.clickAudio.currentTime = 0;
    linkInfo.clickAudio.play();
  }

  function handleMouseOver(linkInfo) {
    if (linkInfo.hoverAudio) {
      linkInfo.hoverAudio.play();
    }
  }

  function handleMouseLeave(linkInfo) {
    if (linkInfo.hoverAudio) {
      linkInfo.hoverAudio.pause();
      linkInfo.hoverAudio.currentTime = 0;
    }
  }

  linkClasses.forEach((linkInfo) => {
    const link = document.querySelector(`.${linkInfo.className}`);
    if (link) {
      if (linkInfo.clickAudio) {
        link.addEventListener('click', () => handleClick(linkInfo));
      }

      if (linkInfo.hoverAudio) {
        link.addEventListener('mouseover', () => handleMouseOver(linkInfo));

        link.addEventListener('mouseleave', () => handleMouseLeave(linkInfo));
      }
    }
  });

  const newpinleipzig = document.querySelector('.newpinleipzig');
  gsap.set(newpinleipzig, { autoAlpha: 0 });

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item._1',
    start: 'top 155%',
    end: 'top 155%',
    // scrub: true,
    onEnter: () => gsap.to(newpinleipzig, { autoAlpha: 1 }),
    onEnterBack: () => gsap.to(newpinleipzig, { autoAlpha: 0 }),
  });

  const leipzigtarget = document.querySelector('.leipzig.pin.target._11');

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item._1',
    start: 'top 155%',
    end: 'top 155%',
    // scrub: true,
    onEnter: () => gsap.to(leipzigtarget, { opacity: 0 }),
    onEnterBack: () => gsap.to(leipzigtarget, { opacity: 1 }),
  });
  function checkScrollPosition() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
  }

  window.addEventListener('scroll', checkScrollPosition);

  function createMotionPathAnimation(triggerClass, start, end, id = '') {
    gsap.to('.newpinleipzig', {
      motionPath: {
        path: '#wegpfadid',
        align: '#wegpfadid',
        alignOrigin: [0.5, 0.98],
        start: start,
        end: end,
      },
      scrollTrigger: {
        trigger: triggerClass,
        start: '-50% 95%',
        end: 'center 95%',
        scrub: true,
        id: id,
        immediateRender: false,
      },
    });
  }

  createMotionPathAnimation('.home-scroll_text-item._1', 0, 0.0085);
  createMotionPathAnimation('.home-scroll_text-item._2', 0.0085, 0.0165);
  createMotionPathAnimation(
    '.home-scroll_text-item._4',
    0.0165,
    0.0265,
    'third'
  );
  createMotionPathAnimation(
    '.home-scroll_text-item._5',
    0.0265,
    0.0332,
    'fourth'
  );
  createMotionPathAnimation(
    '.home-scroll_text-item._6',
    0.0332,
    0.0375,
    'fifth'
  );
  createMotionPathAnimation('.home-scroll_text-item._7', 0.0375, 0.0535);
  createMotionPathAnimation('.home-scroll_text-item._8', 0.0535, 0.0565);
  createMotionPathAnimation('.home-scroll_text-item._9', 0.0565, 0.0635);
  createMotionPathAnimation('.home-scroll_text-item._10', 0.0635, 0.0665);
  createMotionPathAnimation('.home-scroll_text-item._15', 0.0665, 0.0765);

  function animateCounter(target, start, end, trigger, scrub, markerId) {
    let obj = { value: start };
    gsap.to(obj, {
      value: end,
      scrollTrigger: {
        trigger: trigger,
        start: '-50% 95%',
        end: 'center 95%',
        scrub: scrub,
        id: markerId,
        onEnter: () => updateCounter(target, obj, start),
        onLeaveBack: () => updateCounter(target, obj, start),
      },
      onUpdate: function () {
        document.querySelector(target).textContent = Math.floor(obj.value);
      },
    });
  }

  function updateCounter(target, obj, value) {
    obj.value = value;
    document.querySelector(target).textContent = Math.floor(obj.value);
  }

  const animations = [
    {
      target: '.tagecount',
      start: 0,
      end: 3,
      trigger: '.home-scroll_text-item._1',
      scrub: 1,
      markerId: 'tage',
    },
    {
      target: '.kmcount',
      start: 0,
      end: 46,
      trigger: '.home-scroll_text-item._1',
      scrub: 1,
      markerId: 'km',
    },
    {
      target: '.coordi-1',
      start: 5130814,
      end: 5108788,
      trigger: '.home-scroll_text-item._1',
      scrub: 1,
      markerId: 'coordi-1',
    },
    {
      target: '.coordi-2',
      start: 1237803,
      end: 1251922,
      trigger: '.home-scroll_text-item._1',
      scrub: 1,
      markerId: 'coordi-2',
    },
    {
      target: '.tagecount',
      start: 3,
      end: 4,
      trigger: '.home-scroll_text-item._2',
      scrub: 1,
      markerId: 'tage',
    },
    {
      target: '.kmcount',
      start: 46,
      end: 56,
      trigger: '.home-scroll_text-item._2',
      scrub: 1,
      markerId: 'km',
    },
    {
      target: '.coordi-1',
      start: 5108788,
      end: 5106648,
      trigger: '.home-scroll_text-item._2',
      scrub: 1,
      markerId: 'coordi-1',
    },
    {
      target: '.coordi-2',
      start: 1251922,
      end: 1263877,
      trigger: '.home-scroll_text-item._2',
      scrub: 1,
      markerId: 'coordi-2',
    },
    {
      target: '.tagecount',
      start: 4,
      end: 4,
      trigger: '.home-scroll_text-item._3',
      scrub: 1,
      markerId: 'tage',
    },
    {
      target: '.kmcount',
      start: 56,
      end: 58,
      trigger: '.home-scroll_text-item._3',
      scrub: 1,
      markerId: 'km',
    },
    {
      target: '.coordi-1',
      start: 5106648,
      end: 5100364,
      trigger: '.home-scroll_text-item._3',
      scrub: 1,
      markerId: 'coordi-1',
    },
    {
      target: '.coordi-2',
      start: 1263877,
      end: 1264062,
      trigger: '.home-scroll_text-item._3',
      scrub: 1,
      markerId: 'coordi-2',
    },
    {
      target: '.tagecount',
      start: 4,
      end: 4,
      trigger: '.home-scroll_text-item._4',
      scrub: 1,
      markerId: 'tage',
    },
    {
      target: '.kmcount',
      start: 56,
      end: 68,
      trigger: '.home-scroll_text-item._4',
      scrub: 1,
      markerId: 'km',
    },
    {
      target: '.coordi-1',
      start: 5100364,
      end: 5093187,
      trigger: '.home-scroll_text-item._4',
      scrub: 1,
      markerId: 'coordi-1',
    },
    {
      target: '.coordi-2',
      start: 1264062,
      end: 1271301,
      trigger: '.home-scroll_text-item._4',
      scrub: 1,
      markerId: 'coordi-2',
    },
    {
      target: '.tagecount',
      start: 4,
      end: 4,
      trigger: '.home-scroll_text-item._5',
      scrub: 1,
      markerId: 'tage',
    },
    {
      target: '.kmcount',
      start: 68,
      end: 77,
      trigger: '.home-scroll_text-item._5',
      scrub: 1,
      markerId: 'km',
    },
    {
      target: '.coordi-1',
      start: 5093187,
      end: 5092404,
      trigger: '.home-scroll_text-item._5',
      scrub: 1,
      markerId: 'coordi-1',
    },
    {
      target: '.coordi-2',
      start: 1271301,
      end: 1277728,
      trigger: '.home-scroll_text-item._5',
      scrub: 1,
      markerId: 'coordi-2',
    },
    {
      target: '.tagecount',
      start: 4,
      end: 4,
      trigger: '.home-scroll_text-item._6',
      scrub: 1,
      markerId: 'tage',
    },
    {
      target: '.kmcount',
      start: 77,
      end: 85,
      trigger: '.home-scroll_text-item._6',
      scrub: 1,
      markerId: 'km',
    },
    {
      target: '.coordi-1',
      start: 5092404,
      end: 5088827,
      trigger: '.home-scroll_text-item._6',
      scrub: 1,
      markerId: 'coordi-1',
    },
    {
      target: '.coordi-2',
      start: 1277728,
      end: 1283811,
      trigger: '.home-scroll_text-item._6',
      scrub: 1,
      markerId: 'coordi-2',
    },
    {
      target: '.tagecount',
      start: 4,
      end: 6,
      trigger: '.home-scroll_text-item._7',
      scrub: 1,
      markerId: 'tage',
    },
    {
      target: '.kmcount',
      start: 85,
      end: 121,
      trigger: '.home-scroll_text-item._7',
      scrub: 1,
      markerId: 'km',
    },
    {
      target: '.coordi-1',
      start: 5088827,
      end: 5082190,
      trigger: '.home-scroll_text-item._7',
      scrub: 1,
      markerId: 'coordi-1',
    },
    {
      target: '.coordi-2',
      start: 1283811,
      end: 1313869,
      trigger: '.home-scroll_text-item._7',
      scrub: 1,
      markerId: 'coordi-2',
    },
    {
      target: '.tagecount',
      start: 6,
      end: 6,
      trigger: '.home-scroll_text-item._8',
      scrub: 1,
      markerId: 'tage',
    },
    {
      target: '.kmcount',
      start: 121,
      end: 135,
      trigger: '.home-scroll_text-item._8',
      scrub: 1,
      markerId: 'km',
    },
    {
      target: '.coordi-1',
      start: 5082190,
      end: 5083194,
      trigger: '.home-scroll_text-item._8',
      scrub: 1,
      markerId: 'coordi-1',
    },
    {
      target: '.coordi-2',
      start: 1313869,
      end: 1333356,
      trigger: '.home-scroll_text-item._8',
      scrub: 1,
      markerId: 'coordi-2',
    },
    {
      target: '.tagecount',
      start: 6,
      end: 7,
      trigger: '.home-scroll_text-item._9',
      scrub: 1,
      markerId: 'tage',
    },
    {
      target: '.kmcount',
      start: 135,
      end: 148,
      trigger: '.home-scroll_text-item._9',
      scrub: 1,
      markerId: 'km',
    },
    {
      target: '.coordi-1',
      start: 5083194,
      end: 5080267,
      trigger: '.home-scroll_text-item._9',
      scrub: 1,
      markerId: 'coordi-1',
    },
    {
      target: '.coordi-2',
      start: 1333356,
      end: 1349375,
      trigger: '.home-scroll_text-item._9',
      scrub: 1,
      markerId: 'coordi-2',
    },
    {
      target: '.tagecount',
      start: 7,
      end: 7,
      trigger: '.home-scroll_text-item._10',
      scrub: 1,
      markerId: 'tage',
    },
    {
      target: '.kmcount',
      start: 148,
      end: 157,
      trigger: '.home-scroll_text-item._10',
      scrub: 1,
      markerId: 'km',
    },
    {
      target: '.coordi-1',
      start: 5080267,
      end: 5079368,
      trigger: '.home-scroll_text-item._10',
      scrub: 1,
      markerId: 'coordi-1',
    },
    {
      target: '.coordi-2',
      start: 1349375,
      end: 1351676,
      trigger: '.home-scroll_text-item._10',
      scrub: 1,
      markerId: 'coordi-2',
    },
    {
      target: '.tagecount',
      start: 7,
      end: 7,
      trigger: '.home-scroll_text-item._11',
      scrub: 1,
      markerId: 'tage',
    },
    {
      target: '.kmcount',
      start: 157,
      end: 158,
      trigger: '.home-scroll_text-item._11',
      scrub: 1,
      markerId: 'km',
    },
    {
      target: '.coordi-1',
      start: 5079368,
      end: 5077831,
      trigger: '.home-scroll_text-item._11',
      scrub: 1,
      markerId: 'coordi-1',
    },
    {
      target: '.coordi-2',
      start: 1351676,
      end: 1353448,
      trigger: '.home-scroll_text-item._11',
      scrub: 1,
      markerId: 'coordi-2',
    },
  ];

  animations.forEach((animation) => {
    const animationConfig = { ...animation };

    animateCounter(
      animationConfig.target,
      animationConfig.start,
      animationConfig.end,
      animationConfig.trigger,
      animationConfig.scrub,
      animationConfig.markerId
    );
  });

  const tl0 = gsap.timeline({
    scrollTrigger: {
      trigger: '.home-scroll_text-item._11',
      start: 'top 100%',
      end: 'top -325%',
      scrub: 1,
    },
  });

  tl0.fromTo(
    '.home-scroll_img-item._11',
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.5,
    }
  );

  tl0.from('.home-scroll_img._12.first', {
    width: 0,
    duration: 1,
  });

  tl0
    .to('.home-scroll_img-item._11', {
      opacity: 0,
      duration: 0.5,
    })
    .to(
      '.home-scroll_img._12.new',
      {
        opacity: 0,
        duration: 0.5,
      },
      '<'
    );

  const element = document.querySelector('.home-scroll_img-item._10');
  const elementWidth = element.offsetWidth;
  const centerX = (window.innerWidth - elementWidth) / 2;

  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: '.home-scroll_text-item._10',
      start: 'top 275%',
      end: 'top -325%',
      scrub: 1,
    },
  });

  tl1.to('.home-scroll_img-item._10', {
    x: centerX,
  });

  tl1.to('.home-scroll_img-item._10', {
    opacity: 0,
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.home-scroll_text-item._14',
      start: 'top 100%',
      end: 'bottom -25%',
      scrub: 1,
    },
  });

  tl2
    .fromTo(
      '.home-scroll_img-item._14',
      {
        opacity: 0,
      },
      {
        opacity: 1,
      }
    )
    .to('.home-scroll_img-item._14', {
      x: -window.innerWidth * 1.2,
      ease: 'power3.in',
    });

  ScrollTrigger.refresh();

  gsap.to('.home-scroll_img-item._15', {
    ease: 'none',
    x: -window.innerHeight * 0,

    scrollTrigger: {
      trigger: '.home-scroll_text-item._15',
      start: 'top 225%',
      end: 'top -0%',
      scrub: 1,
    },
  });

  let iframe2 = document.querySelector('#vimeo-video2');
  let player2 = new Vimeo.Player(iframe2);

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item._10',
    start: '-100% 50%',
    end: '1500 50%',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      if (progress <= 0.2) {
        player2.setVolume(progress / 0.2);
      } else if (progress < 0.5) {
        player2.setVolume(1);
      } else {
        player2.setVolume((1 - progress) / 0.5);
      }
    },
    onEnter: () => {
      player2.setMuted(false);
    },
    onLeave: () => {
      player2.setMuted(true);
      player2.setVolume(0);
    },
    onEnterBack: () => {
      player2.setMuted(false);
    },
    onLeaveBack: () => {
      player2.setMuted(true);
      player2.setVolume(0);
    },
  });

  let iframe3 = document.querySelector('#vimeo-video3');
  let player3 = new Vimeo.Player(iframe3);
  ScrollTrigger.create({
    trigger: '.home-scroll_text-item._14',
    start: '-100% 50%',
    end: '1200 50%',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      if (progress <= 0.2) {
        player3.setVolume(progress / 0.2);
      } else if (progress < 0.5) {
        player3.setVolume(1);
      } else {
        player3.setVolume((1 - progress) / 0.5);
      }
    },
    onEnter: () => {
      player3.setMuted(false);
    },
    onLeave: () => {
      player3.setMuted(true);
      player3.setVolume(0);
    },
    onEnterBack: () => {
      player3.setMuted(false);
    },
    onLeaveBack: () => {
      player3.setMuted(true);
      player3.setVolume(0);
    },
  });

  let winterAudio = document.querySelector('#winter');
  let preloader = document.querySelector('.divoverpre');
  let myButton = document.getElementById('my-buttonp1');

  preloader.addEventListener('click', () => {
    gsap.to(preloader, {
      duration: 0.5,
      opacity: 0,
      display: 'none',
      onComplete: () => {
        winterAudio.play();
        winterAudio.volume = 0;

        gsap.to(winterAudio, {
          duration: 2,
          volume: 0.5,
          ease: 'power1.inOut',
          onComplete: () => {
            winterAudio.volume = 0.5;
          },
        });
      },
    });
  });

  myButton.addEventListener('click', () => {
    gsap.to(winterAudio, {
      duration: 2,
      volume: 0,
      ease: 'power1.inOut',
      onComplete: () => {
        winterAudio.pause();
        winterAudio.currentTime = 0;
      },
    });
  });

  let audio2 = document.querySelector('#nachtg');

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item._11',
    start: 'top 100%',
    end: 'bottom -0%',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      if (progress <= 0.3) {
        audio2.volume = Math.max(0, Math.min(progress / 0.3, 1));
      } else if (progress > 0.3 && progress < 0.6) {
        audio2.volume = 1;
      } else if (progress >= 0.6) {
        audio2.volume = Math.max(0, Math.min((1 - progress) / 0.3, 1));
      }
    },
    onEnter: () => {
      audio2.play();
    },
    onLeave: () => {
      audio2.pause();
      audio2.volume = 0;
    },
    onEnterBack: () => {
      audio2.play();
    },
    onLeaveBack: () => {
      audio2.pause();
      audio2.volume = 0;
    },
  });

  let audio = document.querySelector('#vogelg');

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item._14',
    start: 'top 125%',
    end: 'bottom -125%',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      if (progress <= 0.2) {
        audio.volume = Math.max(0, Math.min(progress / 0.2, 1));
      } else if (progress > 0.2 && progress < 0.4) {
        audio.volume = 1;
      } else if (progress >= 0.4) {
        audio.volume = Math.max(0, Math.min((1 - progress) / 0.3, 1));
      }
    },
    onEnter: () => {
      audio.play();
    },
    onLeave: () => {
      audio.pause();
      audio.volume = 0;
    },
    onEnterBack: () => {
      audio.play();
    },
    onLeaveBack: () => {
      audio.pause();
      audio.volume = 0;
    },
  });

  let audio3 = document.querySelector('#schritte1');

  ScrollTrigger.create({
    trigger: '.wrappermain',
    start: 'bottom 75%',
    end: 'bottom -600%',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      if (progress <= 0.2) {
        audio3.volume = Math.max(0, Math.min(progress / 0.2, 1));
      } else if (progress > 0.2 && progress < 0.6) {
        audio3.volume = 1;
      } else if (progress >= 0.6) {
        audio3.volume = Math.max(0, Math.min((1 - progress) / 0.2, 1));
      }
    },
    onEnter: () => {
      audio3.play();
    },
    onLeave: () => {
      audio3.pause();
      audio3.volume = 0;
    },
    onEnterBack: () => {
      audio3.play();
    },
    onLeaveBack: () => {
      audio3.pause();
      audio3.volume = 0;
    },
  });

  let audio6 = document.querySelector('#schritte1');

  ScrollTrigger.create({
    trigger: '.wrappermain',
    start: 'bottom -690%',
    end: 'bottom -1150%',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      if (progress <= 0.2) {
        audio6.volume = Math.max(0, Math.min(progress / 0.2, 1));
      } else if (progress > 0.2 && progress < 0.6) {
        audio6.volume = 1;
      } else if (progress >= 0.6) {
        audio6.volume = Math.max(0, Math.min((1 - progress) / 0.2, 1));
      }
    },
    onEnter: () => {
      audio6.play();
    },
    onLeave: () => {
      audio6.pause();
      audio6.volume = 0;
    },
    onEnterBack: () => {
      audio6.play();
    },
    onLeaveBack: () => {
      audio6.pause();
      audio6.volume = 0;
    },
  });

  document
    .getElementById('my-buttonp1')
    .addEventListener('click', function (event) {
      event.preventDefault();

      setTimeout(function () {
        window.location.href = '/how-to-leave-town-p2';
      }, 1275);
    });

  function popupAndReloadOnResize() {
    window.addEventListener('resize', function () {
      const popup = document.getElementById('resize-popup');
      const countdownElement = document.getElementById('downcount');

      popup.style.display = 'block';

      let countdown = 3;

      const countdownInterval = setInterval(function () {
        countdownElement.textContent = countdown;
        countdown--;

        if (countdown < 0) {
          clearInterval(countdownInterval);

          location.reload();
        }
      }, 1000);
    });
  }

  popupAndReloadOnResize();

  window.onload = function () {
    window.scrollTo(0, 0);

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    document.body.style.overflow = 'hidden';

    const closeModalDiv = document.getElementById('closeModal');
    closeModalDiv.onclick = function () {
      document.body.style.overflow = 'auto';
    };
  };
  document.addEventListener('scroll', () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop <= 0) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    if (scrollTop + clientHeight >= scrollHeight) {
      document.documentElement.scrollTop = scrollHeight - clientHeight;
      document.body.scrollTop = scrollHeight - clientHeight;
    }
  });
});
