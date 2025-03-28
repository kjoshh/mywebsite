import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import './browser-detect.js';
import './applystuff.js';
document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  const targetValue = 100;
  const duration = 3000;
  const delay = 500;

  function cubicBezier(t) {
    const [p0, p1, p2, p3] = [0.292, 0.638, 0.544, 0.246];
    const u = 1 - t;
    return 3 * u * u * t * p0 + 3 * u * t * t * p2 + t * t * t;
  }

  function animateCountUp(element, target, duration) {
    const loaderImg = document.querySelector('.loader-img.innen');

    const tl = gsap.timeline({
      delay: 0.5,
      defaults: {
        duration: 3,
        ease: [0.292, 0.638, 0.544, 0.246],
      },
    });

    tl.to(loaderImg, {
      width: '550px',
    }).to(
      element,
      {
        textContent: targetValue,
        snap: { textContent: 1 },
        modifiers: {
          textContent: (value) => Math.round(value),
        },
      },
      '<'
    );

    return tl;
  }

  setTimeout(() => {
    animateCountUp(document.getElementById('countyo'), targetValue, duration);
  }, delay);

  window.onload = function () {
    window.scrollTo(0, 0);

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  };

  document
    .getElementById('playRemaining')
    .addEventListener('click', function () {
      setTimeout(() => {
        const vh = window.innerHeight;
        const scrollAmount = vh * 10.7;

        window.scrollTo({
          top: scrollAmount,
          behavior: 'smooth',
        });
      }, 2500);
    });

  function checkScrollPosition() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
  }

  window.addEventListener('scroll', checkScrollPosition);

  const clickAudio = document.getElementById('click-audio');
  const hoverAudio = document.getElementById('hover-audio');

  const linkClasses = [
    {
      className: 'text-block-10.a',
      clickAudio: clickAudio,
      hoverAudio: hoverAudio,
    },
    {
      className: 'text-block-10.t',
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
        link.addEventListener('click', () => linkInfo.clickAudio.play());
      }
      if (linkInfo.hoverAudio) {
        link.addEventListener('mouseover', () => {
          if (linkInfo.hoverAudio.paused) linkInfo.hoverAudio.play();
        });
        link.addEventListener('mouseleave', () => {
          linkInfo.hoverAudio.pause();
          linkInfo.hoverAudio.currentTime = 0;
        });
      }
    }
  });

  console.clear();

  function initializePlayer() {}

  let winterAudio = document.querySelector('#winter');
  let preloader = document.querySelector('#playRemaining');
  let myButton = document.getElementById('my-buttonp6');

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

  const video = document.querySelector('.video-background');
  const playRemainingButton = document.getElementById('playRemaining');
  let maxVideoTime = 0;
  let scrollTriggerInstance;

  gsap.registerPlugin(ScrollTrigger);

  video.addEventListener('loadedmetadata', () => {
    maxVideoTime = video.duration * 0.66;

    scrollTriggerInstance = gsap.timeline({
      scrollTrigger: {
        trigger: '#container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const scrollPercentage = self.progress * 100;

          if (scrollPercentage >= 66) {
            if (document.body.style.overflow !== 'hidden') {
              document.body.style.overflow = 'hidden';
            }

            if (video.currentTime < maxVideoTime) {
              video.currentTime = maxVideoTime;
            }
            video.pause();

            if (scrollTriggerInstance) {
              scrollTriggerInstance.scrollTrigger.disable();
            }
          } else {
            video.currentTime = video.duration * self.progress;
          }
        },
      },
    });
  });

  playRemainingButton.addEventListener('click', () => {
    document.body.style.overflow = 'auto';
    const newpinleipzig = document.querySelector('.newpinleipzig');
    setTimeout(() => {
      newpinleipzig.style.visibility = 'visible';
    }, 3500);
    video.currentTime = maxVideoTime;
    video.play();

    ScrollTrigger.refresh();
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.572,
      end: 0.575,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p4',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: true,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.575,
      end: 0.582,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p5',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: true,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.582,
      end: 0.598,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p6',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.598,
      end: 0.607,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p7',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.607,
      end: 0.6085,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p8',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.6085,
      end: 0.611,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p9',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.611,
      end: 0.6125,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p10',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.6125,
      end: 0.614,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p11',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.614,
      end: 0.6225,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p12',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.6225,
      end: 0.6245,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p13',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.6245,
      end: 0.6255,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p14',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.6255,
      end: 0.6305,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p15',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.6305,
      end: 0.6345,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p16',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.6345,
      end: 0.6355,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p17',
      start: '-50% 95%',
      end: 'center 95%',
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to('.newpinleipzig', {
    motionPath: {
      path: '#wegpfadid',
      align: '#wegpfadid',
      alignOrigin: [0.5, 0.98],
      start: 0.6355,
      end: 0.6365,
    },
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p18',
      start: '-50% 95%',
      end: 'center -175%',
      scrub: true,
      immediateRender: false,
    },
  });

  document.querySelector('.tagecount').textContent = 51;
  document.querySelector('.kmcount').textContent = 1431;
  document.querySelector('.coordi-1').textContent = 4417776;
  document.querySelector('.coordi-2').textContent = 2151041;

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
    51,
    51,
    '.home-scroll_text-item.p6p4',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1431,
    1435,
    '.home-scroll_text-item.p6p4',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4417776,
    4462992,
    '.home-scroll_text-item.p6p4',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2102801,
    2151042,
    '.home-scroll_text-item.p6p4',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    51,
    52,
    '.home-scroll_text-item.p6p5',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1435,
    1438,
    '.home-scroll_text-item.p6p5',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4462991,
    4452059,
    '.home-scroll_text-item.p6p5',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2151041,
    2160557,
    '.home-scroll_text-item.p6p5',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    52,
    53,
    '.home-scroll_text-item.p6p6',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1438,
    1488,
    '.home-scroll_text-item.p6p6',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4452059,
    4431186,
    '.home-scroll_text-item.p6p6',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2160557,
    2177248,
    '.home-scroll_text-item.p6p6',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    53,
    53,
    '.home-scroll_text-item.p6p7',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1488,
    1503,
    '.home-scroll_text-item.p6p7',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4431186,
    4423596,
    '.home-scroll_text-item.p6p7',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2177248,
    2186418,
    '.home-scroll_text-item.p6p7',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    53,
    54,
    '.home-scroll_text-item.p6p8',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1503,
    1518,
    '.home-scroll_text-item.p6p8',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4423596,
    4422262,
    '.home-scroll_text-item.p6p8',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2186418,
    2195223,
    '.home-scroll_text-item.p6p8',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    54,
    54,
    '.home-scroll_text-item.p6p9',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1518,
    1523,
    '.home-scroll_text-item.p6p9',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4422262,
    4417772,
    '.home-scroll_text-item.p6p9',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2195223,
    2202808,
    '.home-scroll_text-item.p6p9',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    54,
    54,
    '.home-scroll_text-item.p6p10',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1523,
    1528,
    '.home-scroll_text-item.p6p10',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4417772,
    4414740,
    '.home-scroll_text-item.p6p10',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2202808,
    2203566,
    '.home-scroll_text-item.p6p10',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    54,
    54,
    '.home-scroll_text-item.p6p11',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1528,
    1534,
    '.home-scroll_text-item.p6p11',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4414740,
    4414055,
    '.home-scroll_text-item.p6p11',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2203566,
    2206165,
    '.home-scroll_text-item.p6p11',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    54,
    54,
    '.home-scroll_text-item.p6p12',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1534,
    1545,
    '.home-scroll_text-item.p6p12',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4414055,
    4409089,
    '.home-scroll_text-item.p6p12',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2206165,
    2209011,
    '.home-scroll_text-item.p6p12',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    54,
    55,
    '.home-scroll_text-item.p6p13',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1545,
    1553,
    '.home-scroll_text-item.p6p13',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4409089,
    4398062,
    '.home-scroll_text-item.p6p13',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2209011,
    2216546,
    '.home-scroll_text-item.p6p13',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    55,
    55,
    '.home-scroll_text-item.p6p14',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1553,
    1555,
    '.home-scroll_text-item.p6p14',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4398062,
    4397161,
    '.home-scroll_text-item.p6p14',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2216546,
    2215832,
    '.home-scroll_text-item.p6p14',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    55,
    55,
    '.home-scroll_text-item.p6p15',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1555,
    1563,
    '.home-scroll_text-item.p6p15',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4397161,
    4389126,
    '.home-scroll_text-item.p6p15',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2215832,
    2219894,
    '.home-scroll_text-item.p6p15',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    55,
    55,
    '.home-scroll_text-item.p6p16',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1563,
    1565,
    '.home-scroll_text-item.p6p16',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4389126,
    4386051,
    '.home-scroll_text-item.p6p16',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2219894,
    2233041,
    '.home-scroll_text-item.p6p16',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    55,
    56,
    '.home-scroll_text-item.p6p17',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1565,
    1573,
    '.home-scroll_text-item.p6p17',
    '-50% 95%',
    'center 95%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4386051,
    4388015,
    '.home-scroll_text-item.p6p17',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2233041,
    2231544,
    '.home-scroll_text-item.p6p17',
    '-50% 95%',
    'center 95%',
    1,
    'coordi-2'
  );

  animateCounter(
    '.tagecount',
    56,
    56,
    '.home-scroll_text-item.p6p18',
    '-50% 95%',
    'center 95%',
    1,
    'tage'
  );
  animateCounter(
    '.kmcount',
    1573,
    1594,
    '.home-scroll_text-item.p6p18',
    '-50% 95%',
    'center -175%',
    1,
    'km'
  );
  animateCounter(
    '.coordi-1',
    4388015,
    4319833,
    '.home-scroll_text-item.p6p18',
    '-50% 95%',
    'center -175%',
    1,
    'coordi-1'
  );
  animateCounter(
    '.coordi-2',
    2231544,
    2301539,
    '.home-scroll_text-item.p6p18',
    '-50% 95%',
    'center -175%',
    1,
    'coordi-2'
  );

  for (let i = 5; i <= 17; i++) {
    gsap.to(`.home-scroll_img-item.p6p${i}`, {
      ease: 'none',
      x: -window.innerHeight * 3,
      scrollTrigger: {
        trigger: `.home-scroll_text-item.p6p${i}`,
        start: 'top 300%',
        end: 'top -300%',
        scrub: 1,
      },
    });
  }

  gsap.to('.home-scroll_img-item.p6p18', {
    ease: 'none',
    x: -window.innerWidth * 0,
    scrollTrigger: {
      trigger: '.home-scroll_text-item.p6p18',
      start: 'top 225%',
      end: 'bottom 50%',
      scrub: 1,
    },
  });

  let audio11 = document.querySelector('#schritte1');

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item.p6p9',
    start: '20% center',
    end: 'bottom -3100%',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      if (progress <= 0.05) {
        audio11.volume = progress / 0.05;
      } else if (progress > 0.05 && progress < 0.85) {
        audio11.volume = 1;
      } else if (progress >= 0.85) {
        audio11.volume = (1 - progress) / 0.1;
      }
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

  let iframe61 = document.querySelector('#vimeo-video61');
  let player61 = new Vimeo.Player(iframe61);

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item.p6p8',
    start: '-100% 50%',
    end: '1200 50%',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      if (progress <= 0.2) {
        player61.setVolume(progress / 0.2);
      } else if (progress > 0.2 && progress < 0.5) {
        player61.setVolume(1);
      } else if (progress >= 0.5) {
        player61.setVolume((1 - progress) / 0.5);
      }
    },
    onEnter: () => {
      player61.setMuted(false);
    },
    onLeave: () => {
      player61.setMuted(true);
      player61.setVolume(0);
    },
    onEnterBack: () => {
      player61.setMuted(false);
    },
    onLeaveBack: () => {
      player61.setMuted(true);
      player61.setVolume(0);
    },
  });

  let iframe62 = document.querySelector('#vimeo-video62');
  let player62 = new Vimeo.Player(iframe62);

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item.p6p9',
    start: '-100% 50%',
    end: '1200 50%',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      if (progress <= 0.2) {
        player62.setVolume(progress / 0.2);
      } else if (progress > 0.2 && progress < 0.5) {
        player62.setVolume(1);
      } else if (progress >= 0.5) {
        player62.setVolume((1 - progress) / 0.5);
      }
    },
    onEnter: () => {
      player62.setMuted(false);
    },
    onLeave: () => {
      player62.setMuted(true);
      player62.setVolume(0);
    },
    onEnterBack: () => {
      player62.setMuted(false);
    },
    onLeaveBack: () => {
      player62.setMuted(true);
      player62.setVolume(0);
    },
  });

  let iframe63 = document.querySelector('#vimeo-video63');
  let player63 = new Vimeo.Player(iframe63);

  ScrollTrigger.create({
    trigger: '.home-scroll_text-item.p6p16',
    start: '-100% 50%',
    end: '1200 50%',
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress;

      if (progress <= 0.2) {
        player63.setVolume(progress / 0.2);
      } else if (progress > 0.2 && progress < 0.5) {
        player63.setVolume(1);
      } else if (progress >= 0.5) {
        player63.setVolume((1 - progress) / 0.5);
      }
    },
    onEnter: () => {
      player63.setMuted(false);
    },
    onLeave: () => {
      player63.setMuted(true);
      player63.setVolume(0);
    },
    onEnterBack: () => {
      player63.setMuted(false);
    },
    onLeaveBack: () => {
      player63.setMuted(true);
      player63.setVolume(0);
    },
  });

  document
    .getElementById('my-buttonp6')
    .addEventListener('click', function (event) {
      event.preventDefault();

      setTimeout(function () {
        window.location.href = '/how-to-leave-town-p7';
      }, 1750);
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

  const refreshText = document.getElementById('refreshText');

  refreshText.addEventListener('click', () => {
    location.reload();
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
