let monitorTerminalState;

document.addEventListener('DOMContentLoaded', function () {
  const hoverDelay = 750;
  const hoverStayDuration = 120;

  let hoverEffectActive = false;
  let userHoverDisabled = false;
  let hoverEventHandler;
  let throttledHoverEventHandler;
  let links = [];
  let isHovering = false;
  let lastHoveredLink = null;
  const hoveredLinksQueue = [];

  let backgroundImage = null;

  const linkOffsets = [0, 25.3, 50.6, 74.75, 100.1, 124, 149.3];

  const imageClasses = [
    'archive',
    'htlt',
    'loveme',
    'fuckme',
    'rauberrrrrrr',
    'hasli',
    'nje',
  ];
  const imageElements = {};

  function updateLinksCache() {
    links = document.querySelectorAll('.link');
  }

  function initializeHoverScript() {
    if (!hoverEffectActive) return;

    updateLinksCache();

    backgroundImage = document.querySelector('.imglinkbg.arch');

    if (!backgroundImage) {
      console.error('image element with class .imglinkbg.arch not here');
      return;
    }

    imageClasses.forEach((className) => {
      imageElements[className] = document.querySelector(
        `.imgbghome.${className}`
      );
      if (!imageElements[className]) {
        console.error(
          `Image element with class .imgbghome.${className} not found!`
        );
      }
    });

    hoverEventHandler = (event) => {
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
            Math.pow(mouseX - linkCenterX, 2) +
            Math.pow(mouseY - linkCenterY, 2);

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

    document.addEventListener('mousemove', hoverEventHandler);
  }

  function processQueue() {
    if (!hoverEffectActive || isHovering || hoveredLinksQueue.length === 0) {
      return;
    }

    isHovering = true;
    const link = hoveredLinksQueue.shift();

    link.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

    const linkIndex = Array.from(links).indexOf(link);
    if (linkIndex !== -1 && linkIndex < linkOffsets.length) {
      const offsetY = linkOffsets[linkIndex];
      backgroundImage.style.transform = `translateY(${offsetY}px)`;
    }

    imageClasses.forEach((className, index) => {
      const imageElement = imageElements[className];
      const glitchLayerElements = document.querySelectorAll(
        `.imgbghome.${className}.glitch-layer`
      );

      if (imageElement) {
        if (index === linkIndex) {
          imageElement.style.opacity = 1;
          glitchLayerElements.forEach((layer) => {
            layer.style.opacity = 1;
          });
        } else {
          setTimeout(() => {
            imageElement.style.opacity = 0;
            glitchLayerElements.forEach((layer) => {
              layer.style.opacity = 0;
            });
          }, 50);
        }
      }
    });

    setTimeout(() => {
      link.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
      isHovering = false;
      processQueue();
    }, hoverStayDuration);
  }

  function stopHoverScript() {
    if (throttledHoverEventHandler) {
      document.removeEventListener('mousemove', throttledHoverEventHandler);
      throttledHoverEventHandler = null;
      hoverEventHandler = null;
    }
  }

  document.addEventListener('hoverEffectsReady', function () {
    hoverEffectActive = true;
    initializeHoverScript();
  });

  const anchorLinks = document.querySelectorAll('a');
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      stopHoverScript();
      hoverEffectActive = false;
      userHoverDisabled = true;

      setTimeout(() => {
        if (!window.terminalActive && userHoverDisabled) {
          hoverEffectActive = true;
          userHoverDisabled = false;
          initializeHoverScript();
        }
      }, hoverDelay);
    });
  });

  window.addEventListener('beforeunload', () => {
    clearInterval(monitorTerminalState);
  });

  const observer = new MutationObserver(updateLinksCache);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
});
