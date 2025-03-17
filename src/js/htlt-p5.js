import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import "./browser-detect.js";
import "./applystuff.js";
document.addEventListener("DOMContentLoaded", function () {
  
  const targetValue = 100;
  const duration = 2900; 
  const delay = 500; 

  
  function cubicBezier(t) {
    const [p0, p1, p2, p3] = [0.292, 0.638, 0.544, 0.246];
    const u = 1 - t;
    return 3 * u * u * t * p0 + 3 * u * t * t * p2 + t * t * t;
  }

  
  function animateCountUp(element, target, duration, easingFunc) {
    const startTime = performance.now();

    function updateValue(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1); 
      const easedProgress = easingFunc(progress); 
      const currentValue = Math.floor(target * easedProgress);

      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateValue); 
      }
    }

    requestAnimationFrame(updateValue);
  }

  
  setTimeout(() => {
    animateCountUp(
      document.getElementById("countyo"),
      targetValue,
      duration,
      cubicBezier
    );
  }, delay);

  document
    .getElementById("thisbuttonyo")
    .addEventListener("click", function () {
      
      setTimeout(() => {
        const vh = window.innerHeight; 
        const scrollAmount = vh * 3.4; 

        window.scrollTo({
          top: scrollAmount,
          behavior: "smooth",
        });
      }, 1500);
    });

  
  const clickAudio = document.getElementById("click-audio");
  const hoverAudio = document.getElementById("hover-audio");

  
  const linkClasses = [
    {
      className: "turnaround.linkisound.p5",
      clickAudio: clickAudio,
      hoverAudio: hoverAudio,
    },
    {
      className: "turnaround.linkisound.p5.t",
      clickAudio: clickAudio,
      hoverAudio: hoverAudio,
    },
    {
      className: "turnaround.linkisound.p5.e",
      clickAudio: clickAudio,
      hoverAudio: hoverAudio,
    },
    {
      className: "imageeoifnc",
      clickAudio: clickAudio,
      hoverAudio: hoverAudio,
    },
  ];

  linkClasses.forEach((linkInfo) => {
    const link = document.querySelector(`.${linkInfo.className}`);
    if (link) {
      
      if (linkInfo.clickAudio) {
        link.addEventListener("click", function (event) {
          linkInfo.clickAudio.currentTime = 0; 
          linkInfo.clickAudio.play(); 
        });
      }

      
      if (linkInfo.hoverAudio) {
        link.addEventListener("mouseover", function () {
          linkInfo.hoverAudio.play();
        });

        
        link.addEventListener("mouseleave", function () {
          linkInfo.hoverAudio.pause();
          linkInfo.hoverAudio.currentTime = 0; 
        });
      }
    }
  });

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.461,
      end: 0.4675,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p1",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: true,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.4675,
      end: 0.4685,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p2",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: true,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.4685,
      end: 0.477,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p3",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.477,
      end: 0.489,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p4",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.489,
      end: 0.508,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p5",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.508,
      end: 0.509,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p6",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.509,
      end: 0.513,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p7",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.513,
      end: 0.516,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p8",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.516,
      end: 0.5195,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p9",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.5195,
      end: 0.5245,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p10",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.5245,
      end: 0.5265,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p11",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.5265,
      end: 0.5315,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p12",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.5315,
      end: 0.5585,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p13",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.5585,
      end: 0.56,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p14",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.56,
      end: 0.561,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p15",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.561,
      end: 0.5625,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p16",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.564,
      end: 0.5665,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p17",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.5665,
      end: 0.5695,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p17",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.5695,
      end: 0.572,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p18",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  gsap.to(".newpinleipzig", {
    motionPath: {
      path: "#wegpfadid",
      align: "#wegpfadid",
      alignOrigin: [0.5, 0.98],
      start: 0.572,
      end: 0.575,
    },
    scrollTrigger: {
      trigger: ".home-scroll_text-item.p5p19",
      start: "-50% 95%",
      end: "center 95%",
      scrub: true,
      immediateRender: false,
    },
  });

  
  document.querySelector(".tagecount").textContent = 41;
  document.querySelector(".kmcount").textContent = 1129;
  document.querySelector(".coordi-1").textContent = 4614254;
  document.querySelector(".coordi-2").textContent = 1984536;

  function animateCounter(
    target,
    start,
    end,
    trigger,
    startTrigger,
    endTrigger,
    scrub,
    markerId,
    immediateRender
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
        immediateRender: immediateRender, 
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
    ".tagecount",
    41,
    41,
    ".home-scroll_text-item.p5p1",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    true 
  );
  animateCounter(
    ".kmcount",
    1129,
    1145,
    ".home-scroll_text-item.p5p1",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    true 
  );
  animateCounter(
    ".coordi-1",
    4614254,
    4614235,
    ".home-scroll_text-item.p5p1",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    true 
  );
  animateCounter(
    ".coordi-2",
    1984536,
    1984571,
    ".home-scroll_text-item.p5p1",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    true 
  );

  animateCounter(
    ".tagecount",
    41,
    42,
    ".home-scroll_text-item.p5p2.dot",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    true 
  );
  animateCounter(
    ".kmcount",
    1145,
    1164,
    ".home-scroll_text-item.p5p2.dot",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    true 
  );
  animateCounter(
    ".coordi-1",
    4614235,
    4613912,
    ".home-scroll_text-item.p5p2.dot",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    true 
  );
  animateCounter(
    ".coordi-2",
    1984571,
    1984847,
    ".home-scroll_text-item.p5p2.dot",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    true 
  );

  animateCounter(
    ".tagecount",
    42,
    43,
    ".home-scroll_text-item.p5p3",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false 
  );
  animateCounter(
    ".kmcount",
    1164,
    1179,
    ".home-scroll_text-item.p5p3",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4613912,
    4601317,
    ".home-scroll_text-item.p5p3",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    1984847,
    2002504,
    ".home-scroll_text-item.p5p3",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    43,
    44,
    ".home-scroll_text-item.p5p4",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1179,
    1204,
    ".home-scroll_text-item.p5p4",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4601317,
    4607813,
    ".home-scroll_text-item.p5p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2002504,
    1989342,
    ".home-scroll_text-item.p5p4",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    44,
    46,
    ".home-scroll_text-item.p5p5",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1204,
    1254,
    ".home-scroll_text-item.p5p5",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4607813,
    4567823,
    ".home-scroll_text-item.p5p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    1989342,
    2019617,
    ".home-scroll_text-item.p5p5",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    46,
    46,
    ".home-scroll_text-item.p5p6",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1254,
    1259,
    ".home-scroll_text-item.p5p6",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4567823,
    4547518,
    ".home-scroll_text-item.p5p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2019617,
    2041388,
    ".home-scroll_text-item.p5p6",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    46,
    47,
    ".home-scroll_text-item.p5p7",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1259,
    1285,
    ".home-scroll_text-item.p5p7",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4567823,
    4533304,
    ".home-scroll_text-item.p5p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2019617,
    2050429,
    ".home-scroll_text-item.p5p7",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    47,
    47,
    ".home-scroll_text-item.p5p8",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1285,
    1290,
    ".home-scroll_text-item.p5p8",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4533304,
    4524903,
    ".home-scroll_text-item.p5p8",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2050242,
    2059974,
    ".home-scroll_text-item.p5p8",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    47,
    47,
    ".home-scroll_text-item.p5p9",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1290,
    1295,
    ".home-scroll_text-item.p5p9",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4524903,
    4526973,
    ".home-scroll_text-item.p5p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2059974,
    2056912,
    ".home-scroll_text-item.p5p9",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    47,
    48,
    ".home-scroll_text-item.p5p10",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1295,
    1318,
    ".home-scroll_text-item.p5p10",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4526973,
    4511585,
    ".home-scroll_text-item.p5p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2056912,
    2074834,
    ".home-scroll_text-item.p5p10",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    48,
    48,
    ".home-scroll_text-item.p5p11",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1318,
    1331,
    ".home-scroll_text-item.p5p11",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4511585,
    4568683,
    ".home-scroll_text-item.p5p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2074834,
    2086305,
    ".home-scroll_text-item.p5p11",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    48,
    48,
    ".home-scroll_text-item.p5p12",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1331,
    1345,
    ".home-scroll_text-item.p5p12",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4568683,
    4500486,
    ".home-scroll_text-item.p5p12",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2086305,
    2093393,
    ".home-scroll_text-item.p5p12",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    48,
    50,
    ".home-scroll_text-item.p5p13",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1345,
    1385,
    ".home-scroll_text-item.p5p13",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4500486,
    4488438,
    ".home-scroll_text-item.p5p13",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2093393,
    2117456,
    ".home-scroll_text-item.p5p13",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    50,
    50,
    ".home-scroll_text-item.p5p14",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1385,
    1395,
    ".home-scroll_text-item.p5p14",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4488438,
    4485353,
    ".home-scroll_text-item.p5p14",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2117456,
    2124676,
    ".home-scroll_text-item.p5p14",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    50,
    50,
    ".home-scroll_text-item.p5p15",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1395,
    1398,
    ".home-scroll_text-item.p5p15",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4485353,
    4480873,
    ".home-scroll_text-item.p5p15",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2124676,
    2133611,
    ".home-scroll_text-item.p5p15",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    50,
    51,
    ".home-scroll_text-item.p5p16",
    "-50% 95%",
    "center 95%",
    1,
    "tage",
    false
  );
  animateCounter(
    ".kmcount",
    1398,
    1405,
    ".home-scroll_text-item.p5p16",
    "-50% 95%",
    "center 95%",
    1,
    "km",
    false
  );
  animateCounter(
    ".coordi-1",
    4480873,
    4479512,
    ".home-scroll_text-item.p5p16",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1",
    false
  );
  animateCounter(
    ".coordi-2",
    2133611,
    2135206,
    ".home-scroll_text-item.p5p16",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2",
    false
  );

  animateCounter(
    ".tagecount",
    51,
    51,
    ".home-scroll_text-item.p5p17",
    "-50% 95%",
    "center 95%",
    1,
    "tage"
  );
  animateCounter(
    ".kmcount",
    1410,
    1416,
    ".home-scroll_text-item.p5p17",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4485635,
    4475089,
    ".home-scroll_text-item.p5p17",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2130147,
    2139523,
    ".home-scroll_text-item.p5p17",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".kmcount",
    1416,
    1426,
    ".home-scroll_text-item.p5p18",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4475089,
    4471352,
    ".home-scroll_text-item.p5p18",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2139523,
    2144736,
    ".home-scroll_text-item.p5p18",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  animateCounter(
    ".kmcount",
    1426,
    1431,
    ".home-scroll_text-item.p5p19",
    "-50% 95%",
    "center 95%",
    1,
    "km"
  );
  animateCounter(
    ".coordi-1",
    4471352,
    4417776,
    ".home-scroll_text-item.p5p19",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-1"
  );
  animateCounter(
    ".coordi-2",
    2144736,
    2102801,
    ".home-scroll_text-item.p5p19",
    "-50% 95%",
    "center 95%",
    1,
    "coordi-2"
  );

  
  
  
  function initializePlayer() {
    
    
  }

  
  for (let i = 1; i <= 19; i++) {
    let xValue = i === 19 ? window.innerHeight * 0.1 : -window.innerHeight * 3; 

    gsap.to(`.home-scroll_img-item.p5p${i}`, {
      ease: "none",
      x: xValue,
      scrollTrigger: {
        trigger: `.home-scroll_text-item.p5p${i}`,
        start: i === 19 ? "top 225%" : "top 300%",
        end: i === 19 ? "top -0%" : "top -300%",
        scrub: 1,
      },
    });
  }

  
  let winterAudio = document.querySelector("#winter");
  let preloader = document.querySelector("#thisbuttonyo");
  let myButton = document.getElementById("my-buttonp5"); 

  
  preloader.addEventListener("click", () => {
    
    winterAudio.volume = 0; 
    winterAudio.play();

    
    gsap.to(winterAudio, {
      duration: 2, 
      volume: 0.5, 
      ease: "power1.inOut",
      onComplete: () => {
        winterAudio.volume = 0.5; 
      },
    });

    
    initializePlayer();
  });

  
  myButton.addEventListener("click", () => {
    
    gsap.to(winterAudio, {
      duration: 2, 
      volume: 0, 
      ease: "power1.inOut",
      onComplete: () => {
        winterAudio.pause(); 
        winterAudio.currentTime = 0; 
      },
    });
  });

  
  let iframe40 = document.querySelector("#vimeo-video50");
  let player40 = new Vimeo.Player(iframe40);

  ScrollTrigger.create({
    trigger: ".home-scroll_text-item.p5p4",
    start: "-100% 50%",
    end: "1200 50%",
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress; 

      if (progress <= 0.2) {
        player40.setVolume(progress / 0.2); 
      } else if (progress > 0.2 && progress < 0.5) {
        player40.setVolume(1); 
      } else if (progress >= 0.5) {
        player40.setVolume((1 - progress) / 0.5); 
      }
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

  
  let audio11 = document.querySelector("#schritte1");

  ScrollTrigger.create({
    trigger: ".home-scroll_text-item.p5p4",
    start: "20% center",
    end: "bottom -3100%", 
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

  document
    .getElementById("my-buttonp5")
    .addEventListener("click", function (event) {
      
      event.preventDefault();

      
      setTimeout(function () {
        window.location.href = "/how-to-leave-town-p6";
      }, 2250);
    });

  
  function popupAndReloadOnResize() {
    window.addEventListener("resize", function () {
      
      const popup = document.getElementById("resize-popup");
      const countdownElement = document.getElementById("downcount");

      
      popup.style.display = "block";

      
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

    
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    
    document.body.style.overflow = "hidden";

    
    const closeModalDiv = document.getElementById("thisbuttonyo");
    closeModalDiv.onclick = function () {
      document.body.style.overflow = "auto"; 
      
    };
  };
  
  document.addEventListener("scroll", () => {
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
