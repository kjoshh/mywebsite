import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import './browser-detect.js';
import './applystuff.js';
document.addEventListener('DOMContentLoaded', function () {
  const newpinleipzig = document.querySelector('.newpinleipzig');

  document
    .getElementById('thisbuttonyop4')
    .addEventListener('click', function () {
      setTimeout(() => {
        newpinleipzig.style.visibility = 'visible';
      }, 3100);
      setTimeout(() => {
        const vh = window.innerHeight;
        const scrollAmount = vh * 3.4;

        window.scrollTo({
          top: scrollAmount,
          behavior: 'smooth',
        });
      }, 2500);
    });

  document
    .getElementById('butbutp3')
    .addEventListener('click', function (event) {
      event.preventDefault();

      setTimeout(function () {
        window.location.href = '/how-to-leave-town-p5';
      }, 2000);
    });

  const clickAudio = document.getElementById('click-audio');
  const hoverAudio = document.getElementById('hover-audio');

  const linkClasses = [
    {
      className: 'link-6.yoyo',
      clickAudio: clickAudio,
      hoverAudio: hoverAudio,
    },
    {
      className: 'text.p3._2.p4',
      clickAudio: clickAudio,
      hoverAudio: hoverAudio,
    },
    {
      className: 'play-select1.linkisound.p3._2.p4',
      clickAudio: clickAudio,
      hoverAudio: hoverAudio,
    },
    {
      className: 'imageeoifnc',
      clickAudio: clickAudio,
      hoverAudio: hoverAudio,
    },
  ];

  linkClasses.forEach((linkInfo) => {
    const link = document.querySelector(`.${linkInfo.className}`);
    if (link) {
      if (linkInfo.clickAudio) {
        link.addEventListener('click', function (event) {
          linkInfo.clickAudio.currentTime = 0;
          linkInfo.clickAudio.play();
        });
      }

      if (linkInfo.hoverAudio) {
        link.addEventListener('mouseover', function () {
          linkInfo.hoverAudio.play();
        });

        link.addEventListener('mouseleave', function () {
          linkInfo.hoverAudio.pause();
          linkInfo.hoverAudio.currentTime = 0;
        });
      }
    }
  });

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.256,
      end: 0.262,
    },

    scrollTrigger: {
      trigger: '.home-scroll_text-item.p4p1',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: true,
    },
  });

  const animationSteps = [
    { start: 0.262, end: 0.264, trigger: '.home-scroll_text-item.p4p2' },
    { start: 0.264, end: 0.27, trigger: '.home-scroll_text-item.p4p3' },
    { start: 0.27, end: 0.311, trigger: '.home-scroll_text-item.p4p4' },
    { start: 0.311, end: 0.328, trigger: '.home-scroll_text-item.p4p5' },
    { start: 0.328, end: 0.3335, trigger: '.home-scroll_text-item.p4p6' },
    { start: 0.3335, end: 0.355, trigger: '.home-scroll_text-item.p4p7' },
    { start: 0.355, end: 0.398, trigger: '.home-scroll_text-item.p4p8' },
    { start: 0.398, end: 0.419, trigger: '.home-scroll_text-item.p4p9' },
    { start: 0.419, end: 0.4265, trigger: '.home-scroll_text-item.p4p10' },
    { start: 0.4265, end: 0.4285, trigger: '.home-scroll_text-item.p4p11' },
    { start: 0.4285, end: 0.434, trigger: '.home-scroll_text-item.p4p13' },
    { start: 0.434, end: 0.4465, trigger: '.home-scroll_text-item.p4p15' },
    { start: 0.4465, end: 0.459, trigger: '.home-scroll_text-item.p4p16' },
  ];

  animationSteps.forEach((step) => {
    gsap.to('.newpinleipzig', {
      motionPath: {
        path: '#wegpfadid',
        align: '#wegpfadid',
        alignOrigin: [0.5, 0.98],
        start: step.start,
        end: step.end,
      },
      scrollTrigger: {
        trigger: step.trigger,
        start: '-50% 30%',
        end: 'center 30%',
        scrub: true,
        immediateRender: false,
      },
    });
  });

  document.querySelector('.tagecount').textContent = 25;
  document.querySelector('.kmcount').textContent = 635;
  document.querySelector('.coordi-1').textContent = 4851172;
  document.querySelector('.coordi-2').textContent = 1657423;
  function animateCounter(
    target,
    start,
    end,
    trigger,
    startTrigger,
    endTrigger,
    scrub,
    markerId
  ) {
    let obj = { value: start };
    gsap.to(obj, {
      value: end,
      scrollTrigger: {
        trigger: trigger,
        start: startTrigger,
        end: endTrigger,
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

  animateCounter(
    '.tagecount',
    25,
    26,
    '.home-scroll_text-item.p4p1',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    635,
    646,
    '.home-scroll_text-item.p4p1',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4851172,
    4847784,
    '.home-scroll_text-item.p4p1',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1657423,
    1664845,
    '.home-scroll_text-item.p4p1',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.kmcount',
    646,
    652,
    '.home-scroll_text-item.p4p2',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4847784,
    4834302,
    '.home-scroll_text-item.p4p2',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1664845,
    1685355,
    '.home-scroll_text-item.p4p2',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.kmcount',
    652,
    675,
    '.home-scroll_text-item.p4p3',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4834302,
    4828420,
    '.home-scroll_text-item.p4p3',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1685355,
    1689533,
    '.home-scroll_text-item.p4p3',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    26,
    30,
    '.home-scroll_text-item.p4p4',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    675,
    778,
    '.home-scroll_text-item.p4p4',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4828420,
    4788928,
    '.home-scroll_text-item.p4p4',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1689533,
    1744875,
    '.home-scroll_text-item.p4p4',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    30,
    32,
    '.home-scroll_text-item.p4p5',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    778,
    854,
    '.home-scroll_text-item.p4p5',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4788928,
    4788698,
    '.home-scroll_text-item.p4p5',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1744875,
    1748559,
    '.home-scroll_text-item.p4p5',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    32,
    33,
    '.home-scroll_text-item.p4p6',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    854,
    886,
    '.home-scroll_text-item.p4p6',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4788698,
    4742381,
    '.home-scroll_text-item.p4p6',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1748559,
    1776011,
    '.home-scroll_text-item.p4p6',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    33,
    34,
    '.home-scroll_text-item.p4p7',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    886,
    935,
    '.home-scroll_text-item.p4p7',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4742381,
    4716483,
    '.home-scroll_text-item.p4p7',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1776011,
    1793326,
    '.home-scroll_text-item.p4p7',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    34,
    36,
    '.home-scroll_text-item.p4p8',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    935,
    988,
    '.home-scroll_text-item.p4p8',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4716483,
    4693346,
    '.home-scroll_text-item.p4p8',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1793326,
    1818054,
    '.home-scroll_text-item.p4p8',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    36,
    37,
    '.home-scroll_text-item.p4p9',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    988,
    1017,
    '.home-scroll_text-item.p4p9',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4693346,
    4671317,
    '.home-scroll_text-item.p4p9',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1818054,
    1863136,
    '.home-scroll_text-item.p4p9',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    37,
    39,
    '.home-scroll_text-item.p4p10',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1017,
    1035,
    '.home-scroll_text-item.p4p10',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4671317,
    4649872,
    '.home-scroll_text-item.p4p10',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1863136,
    1891543,
    '.home-scroll_text-item.p4p10',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    39,
    39,
    '.home-scroll_text-item.p4p11',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1035,
    1080,
    '.home-scroll_text-item.p4p11',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4649872,
    4646456,
    '.home-scroll_text-item.p4p11',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1891543,
    1916808,
    '.home-scroll_text-item.p4p11',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    39,
    40,
    '.home-scroll_text-item.p4p12',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1080,
    1095,
    '.home-scroll_text-item.p4p12',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4646456,
    4640182,
    '.home-scroll_text-item.p4p12',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1916808,
    1933911,
    '.home-scroll_text-item.p4p12',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    40,
    40,
    '.home-scroll_text-item.p4p13',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1095,
    1096,
    '.home-scroll_text-item.p4p13',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4640182,
    4635026,
    '.home-scroll_text-item.p4p13',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1933911,
    1945374,
    '.home-scroll_text-item.p4p13',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    40,
    41,
    '.home-scroll_text-item.p4p14',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1096,
    1105,
    '.home-scroll_text-item.p4p14',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4635026,
    4634702,
    '.home-scroll_text-item.p4p14',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1945374,
    1946307,
    '.home-scroll_text-item.p4p14',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    41,
    41,
    '.home-scroll_text-item.p4p15',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1105,
    1120,
    '.home-scroll_text-item.p4p15',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4634702,
    4626244,
    '.home-scroll_text-item.p4p15',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1946307,
    1965196,
    '.home-scroll_text-item.p4p15',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    41,
    41,
    '.home-scroll_text-item.p4p16',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1120,
    1122,
    '.home-scroll_text-item.p4p16',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4626244,
    4616938,
    '.home-scroll_text-item.p4p16',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    1965196,
    1979709,
    '.home-scroll_text-item.p4p16',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  //images

  function initializePlayer() {}

  const imageTriggers = [
    '.home-scroll_img-item.p4p1',
    '.home-scroll_img-item.p4p2',
    '.home-scroll_img-item.p4p3',
    '.home-scroll_img-item.p4p4',
    '.home-scroll_img-item.p4p5',
    '.home-scroll_img-item.p4p6',
    '.home-scroll_img-item.p4p7',
    '.home-scroll_img-item.p4p8',
    '.home-scroll_img-item.p4p9',
    '.home-scroll_img-item.p4p10',
    '.home-scroll_img-item.p4p11',
    '.home-scroll_img-item.p4p12',
    '.home-scroll_img-item.p4p13',
    '.home-scroll_img-item.p4p14',
    '.home-scroll_img-item.p4p15',
  ];

  imageTriggers.forEach((selector) => {
    gsap.to(selector, {
      ease: 'none',
      x: -window.innerHeight * 3,
      scrollTrigger: {
        trigger: selector.replace('img-item', 'text-item'),
        start: 'top 300%',
        end: 'top -300%',
        scrub: 1,
        markers: false,
      },
    });
  });

  gsap.to('.home-scroll_img-item.p4p16', {
    ease: 'none',
    x: window.innerHeight * 0.1,
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p4p16',
      start: 'top 225%',
      end: 'top -0%',
      scrub: 1,
    },
  });

  let winterAudio = document.querySelector('#winter');
  let preloader = document.querySelector('#thisbuttonyop4');
  let myButton = document.getElementById('my-buttonp4');

  preloader.addEventListener('click', () => {
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

    initializePlayer();
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

  let iframe40 = document.querySelector('#vimeo-video40');
  let player40 = new Vimeo.Player(iframe40);

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item.p4p1',
    start: '-100% 50%',
    end: '1200 50%',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      let volume;
      if (progress <= 0.2) {
        volume = progress / 0.2;
      } else if (progress < 0.5) {
        volume = 1;
      } else {
        volume = (1 - progress) / 0.5;
      }

      volume = Math.max(0, Math.min(1, volume));

      player40.setVolume(volume);
    },
    onEnter: () => {
      player40.setMuted(false);
    },
    onLeave: () => {
      player40.setMuted(true);
      player40.setVolume(0);
    },
    onEnterBack: () => {
      player40.setMuted(false);
    },
    onLeaveBack: () => {
      player40.setMuted(true);
      player40.setVolume(0);
    },
  });

  let iframe42 = document.querySelector('#vimeo-video42');
  let player42 = new Vimeo.Player(iframe42);

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item.p4p10',
    start: '-100% 50%',
    end: '1200 50%',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      let volume;
      if (progress <= 0.2) {
        volume = progress / 0.2;
      } else if (progress < 0.5) {
        volume = 1;
      } else {
        volume = (1 - progress) / 0.5;
      }

      volume = Math.max(0, Math.min(1, volume));

      player42.setVolume(volume);
    },
    onEnter: () => {
      player42.setMuted(false);
    },
    onLeave: () => {
      player42.setMuted(true);
      player42.setVolume(0);
    },
    onEnterBack: () => {
      player42.setMuted(false);
    },
    onLeaveBack: () => {
      player42.setMuted(true);
      player42.setVolume(0);
    },
  });

  let audio1112 = document.querySelector('#schritte1');

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item.p4p4',
    start: 'top bottom',
    end: '659% bottom',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      let volume;
      if (progress <= 0.05) {
        volume = progress / 0.05;
      } else if (progress > 0.2 && progress < 0.85) {
        volume = 1;
      } else if (progress >= 0.85) {
        volume = (1 - progress) / 0.1;
      } else {
        volume = 0;
      }

      volume = Math.max(0, Math.min(1, volume));

      audio1112.volume = volume;
    },
    onEnter: () => {
      audio1112.play();
    },
    onLeave: () => {
      audio1112.pause();
      audio1112.volume = 0;
    },
    onEnterBack: () => {
      audio1112.play();
    },
    onLeaveBack: () => {
      audio1112.pause();
      audio1112.volume = 0;
    },
  });

  let audio11 = document.querySelector('#schritte1');

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item.p4p4',
    start: '700% bottom',
    end: '1659% bottom',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      let volume;
      if (progress <= 0.05) {
        volume = progress / 0.05;
      } else if (progress > 0.2 && progress < 0.85) {
        volume = 1;
      } else if (progress >= 0.85) {
        volume = (1 - progress) / 0.1;
      } else {
        volume = 0;
      }

      volume = Math.max(0, Math.min(1, volume));

      audio11.volume = volume;
    },
    onEnter: () => {
      audio11.play();
    },
    onLeave: () => {
      audio11.pause();
      audio11.volume = 0;
    },
    onEnterBack: () => {
      audio11.play();
    },
    onLeaveBack: () => {
      audio11.pause();
      audio11.volume = 0;
    },
  });

  document
    .getElementById('my-buttonp4')
    .addEventListener('click', function (event) {
      event.preventDefault();

      setTimeout(function () {
        window.location.href = '/how-to-leave-town-p5';
      }, 2250);
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

    const closeModalDiv = document.getElementById('thisbuttonyop4');
    closeModalDiv.onclick = function () {
      document.body.style.overflow = 'auto';
      const fixedcontent = document.querySelector('outerwrapper.p3');
      gsap.set(fixedcontent, {
        opacity: 0,
      });
    };
  };
  document.querySelectorAll('s').forEach(function (strikethrough) {
    const delElement = document.createElement('del');
    delElement.innerHTML = strikethrough.innerHTML;
    strikethrough.replaceWith(delElement);
  });

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
