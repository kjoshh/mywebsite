// src/js/howtoleavetown.js
import gsap from 'gsap';
import './browser-detect.js'; // Import for side effects
import './applystuff.js'; // Import for side effects
import { initializeFirstSlider } from './slider.js'; // Import the function

// --- Load Base Animations and Functionality ---
document.addEventListener('DOMContentLoaded', function () {
  const loaderText = document.querySelectorAll('.linkwrap');
  const loaderImg = document.querySelectorAll('.bookim');
  const textBlock = document.querySelector('#text-block');
  const backRound = document.querySelector('._100wrap');
  const grainiwrapppp = document.getElementById('grainiwrapppp');
  const menuoverlay = document.getElementById('menuoverlay');
  const interfaceElement = document.getElementById('interface');
  const links = document.querySelectorAll('a');

  interfaceElement.style.display = 'flex';
  textBlock.style.display = 'none';
  console.log('gogogogogo');
  // set stuff
  gsap.set(loaderText, {
    y: 10,
  });
  gsap.set(interfaceElement, {
    y: 20,
  });

  // animate stuff
  textBlock.style.display = 'flex';
  gsap.to(loaderImg, {
    height: '100vh',
    duration: 1,
    ease: 'power4.inOut',
  });

  gsap.to([loaderText, interfaceElement], {
    y: 0,
    opacity: 1,
    delay: 1.1,
    stagger: 0.1,
    duration: 0.2,
    ease: 'power3.inOut',
  });

  gsap.to(menuoverlay, {
    opacity: 1,
    duration: 0.25,
    onComplete: () => {
      // Create the pulse animation
      gsap.to(menuoverlay, {
        opacity: 0.5,
        width: '500px',
        duration: 1.2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    },
  });

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const href = this.getAttribute('href');
      const isHashLink = href.startsWith('#');
      const isJavaScriptLink = href.startsWith('javascript:');
      const hasTargetBlank = this.getAttribute('target') === '_blank';
      const isDownloadLink = this.hasAttribute('download');

      if (isHashLink || isJavaScriptLink || hasTargetBlank || isDownloadLink) {
        return;
      }

      const destination = this.href;
      event.preventDefault();

      gsap.to([loaderText, interfaceElement], {
        y: -15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.2,
        ease: 'power3.inOut',
      });

      gsap.to(loaderImg, {
        height: 0,
        top: 0,
        bottom: 'auto',
        duration: 1,
        ease: 'power4.inOut',
        onComplete: () => {
          window.location.href = destination;
        },
      });
    });
  });

  const triggerElement2 = document.getElementById('openbook');
  const stopTrigger = document.querySelector('#closebook');
  const buchDiv = document.querySelector('.buchhh');

  triggerElement2.addEventListener('click', () => {
    initializeFirstSlider();
    window.isPaused = true;

    gsap.to(buchDiv, {
      y: '0vh',
      duration: 0.65,
      ease: 'power4.out',
    });

    gsap.to(interfaceElement, {
      opacity: 0,
      duration: 0.25,
      ease: 'power3.inOut',
      onComplete: () => {
        interfaceElement.style.display = 'none';
      },
    });
  });

  stopTrigger.addEventListener('click', () => {
    interfaceElement.style.display = 'flex';
    window.isPaused = false;

    gsap.to(buchDiv, {
      y: '101vh',
      duration: 0.65,
      ease: 'power3.in',
    });

    gsap.to(interfaceElement, {
      opacity: 1,
      duration: 0.25,
      ease: 'power3.inOut',
    });
  });

  const storyLink = document.getElementById('story-link');
  storyLink.addEventListener('click', () => {
    gsap.to(backRound, {
      backgroundColor: '#e4e1d9',
      duration: 0.75,
      ease: 'power3.inOut',
    });

    gsap.to(grainiwrapppp, {
      opacity: 0,
      duration: 0.75,
      ease: 'power3.inOut',
    });
  });
});

// --- Hover Effects ---
document.addEventListener('DOMContentLoaded', function () {
  const hoverDelay = 750; // Delay before re-enabling hover after click (ms)
  const throttleLimit = 50; // Throttle limit for mousemove events (ms)
  const initialDelay = 1000; // Delay before starting hover (ms)
  let hoverEffectActive = false;
  let links = []; // Cache the links array
  let isHovering = false;
  let lastHoveredLink = null;
  const hoveredLinksQueue = []; // Queue of links to hover
  let backgroundImage = null;
  const linkOffsets = [0, 185]; // Example X offsets for two links
  const imageClasses = ['sdds', 'nerner'];
  const imageElements = {};

  function updateLinksCache() {
    links = document.querySelectorAll('.link.ofjnworfn, .link.h.top.intro');
  }

  function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  function initializeHoverScript() {
    if (!hoverEffectActive) return;

    updateLinksCache(); // Initial cache update

    backgroundImage = document.querySelector('.imglinkbg.arch.intro');
    if (!backgroundImage) {
      console.error(
        'Background image element with class .imglinkbg.arch.intro not found!'
      );
      return; // Exit if the element is not found
    }

    // Find the image elements
    imageClasses.forEach((className) => {
      imageElements[className] = document.querySelector(`.bookim.${className}`);
      if (!imageElements[className]) {
        console.error(
          `Image element with class .bookim.${className} not found!`
        );
      }
    });

    document.addEventListener('mousemove', hoverEventHandler);
  }

  const hoverEventHandler = (event) => {
    if (!hoverEffectActive) return;

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    let closestLink = null;
    let smallestDistanceSq = Infinity;

    links.forEach((link) => {
      try {
        const rect = link.getBoundingClientRect();
        const linkCenterX = (rect.left + rect.right) / 2;
        const linkCenterY = (rect.top + rect.bottom) / 2;
        const distanceSq =
          Math.pow(mouseX - linkCenterX, 2) + Math.pow(mouseY - linkCenterY, 2);

        if (distanceSq < smallestDistanceSq) {
          smallestDistanceSq = distanceSq;
          closestLink = link;
        }
      } catch (error) {
        console.error('Error getting bounding rect:', error);
      }
    });

    if (closestLink && closestLink !== lastHoveredLink) {
      hoveredLinksQueue.push(closestLink);
      lastHoveredLink = closestLink;
      processQueue();
    }
  };

  function processQueue() {
    if (!hoverEffectActive || isHovering || hoveredLinksQueue.length === 0) {
      return;
    }

    isHovering = true;
    const link = hoveredLinksQueue.shift();

    link.dispatchEvent(
      new MouseEvent('mouseover', {
        bubbles: true,
      })
    );

    const linkIndex = Array.from(links).indexOf(link);
    if (linkIndex !== -1 && linkIndex < linkOffsets.length) {
      const offsetX = linkOffsets[linkIndex];
      backgroundImage.style.transform = `translateX(${offsetX}px)`;
    }

    imageClasses.forEach((className, index) => {
      const imageElement = imageElements[className];
      if (imageElement) {
        if (index === linkIndex) {
          imageElement.style.opacity = 1;
        } else {
          setTimeout(() => {
            imageElement.style.opacity = 0;
          }, 50);
        }
      }
    });

    setTimeout(() => {
      link.dispatchEvent(
        new MouseEvent('mouseout', {
          bubbles: true,
        })
      );
      isHovering = false;
      processQueue();
    }, 80);
  }

  setTimeout(() => {
    hoverEffectActive = true;
    initializeHoverScript();
  }, initialDelay);

  const observer = new MutationObserver(updateLinksCache);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
});

// Call initializeFirstSlider when needed (e.g., on a button click)
const triggerElement1 = document.getElementById('openbook');
triggerElement1.addEventListener('click', () => {
  initializeFirstSlider();
});
const cross = document.getElementById('cross');
cross.addEventListener('click', function (e) {
  e.preventDefault();
  const href = '/';
  sessionStorage.setItem('isInternalNavigation', 'true');
  fetch(href, {
    mode: 'no-cors',
  })
    .then(() => console.log('Page preloaded:', href))
    .catch(() => console.warn('Failed to preload page:', href));
  cross.style.pointerEvents = 'none';
});
if (sessionStorage.getItem('isInternalNavigation') === 'true') {
}
