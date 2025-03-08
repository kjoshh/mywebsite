import gsap from 'gsap';
import { initializeVimeoPlayer } from './vimeo-helper.js';
import './browser-detect.js';
import './applystuff.js';
import AudioPlayer from './audio.js';
import { initializeFirstSlider } from './slider.js';
import {
  initializeVideoStateManager,
  handleVideoStateChange,
} from './video-state-manager.js';

document.addEventListener('DOMContentLoaded', function () {
  initializeVimeoPlayer('lovememvid', 'closevid');

  const onloadDiv = document.getElementById('onloaddiv');
  const buchDiv = document.getElementById('buchdiv');
  const openBook = document.getElementById('openbook');
  const closeBook = document.getElementById('closebook');
  const vidDiv = document.getElementById('viddiv');
  const openVid = document.getElementById('openvid');
  // const closeVid = document.getElementById("videoclose");
  const mainInterface = document.getElementById('naviga');
  const secondInterface = document.getElementById('navigalast');
  //   const texttti = document.querySelector(".preloader-text");
  gsap.to(onloadDiv, {
    opacity: 0,
    // height: "0%",
    duration: 1,
    ease: 'power4.inOut',
    onComplete: () => {
      onloadDiv.style.display = 'none';
    },
  });
  openBook.addEventListener('click', () => {
    gsap.to(buchDiv, {
      y: '0vh',
      duration: 0.65,
      ease: 'power4.inOut',
    });
    gsap.to([mainInterface, secondInterface], {
      opacity: 0,
      duration: 0.25,
      ease: 'power3.inOut',
      onComplete: () => {
        mainInterface.style.display = 'none';
        secondInterface.style.display = 'none';
      },
    });
  });
  closeBook.addEventListener('click', () => {
    mainInterface.style.display = 'flex';
    secondInterface.style.display = 'flex';
    gsap.to(buchDiv, {
      y: '101vh',
      duration: 0.65,
      ease: 'power4.inOut',
    });
    gsap.to([mainInterface, secondInterface], {
      opacity: 1,
      duration: 0.25,
      ease: 'power3.inOut',
    });
  });

  const images = document.querySelectorAll('.imageetry');
  const wrapimmmm = document.querySelector('.wrapimmmm');
  const counter = document.getElementById('counter');
  const loadingBar = document.querySelector('.loading-bar');
  const counterText = counter.querySelector('.counter-text');
  const interfaceElement = document.querySelector('.interface.asli');
  const audioElement = document.querySelector('.audiowrappppp');
  const counterWrapper = document.querySelector('.counter-wrapper');
  const preloader = document.getElementById('preloader');
  const totalImages = images.length;
  let loadedImages = 0; // Counter for loaded images
  let preloaderTimeout; // Declare preloaderTimeout here
  let preloaderStartTime = Date.now(); // Track the time when images start loading
  const typewriterEffect = (element, text, delay, callback) => {
    let index = text.length;
    const deleteLetter = () => {
      if (index > 0) {
        element.textContent = text.substring(0, --index);
        setTimeout(deleteLetter, delay);
      } else if (callback) {
        setTimeout(callback, delay);
      }
    };
    deleteLetter();
  };
  let isGoVisible = false; // Erst false, bis "GO" erscheint
  const updatePreloader = () => {
    // Ensure the preloader text element exists
    const textElement = document.querySelector('.preloader-text');
    const secondtextElement = document.querySelector('.preloader-text-two');
    const divi = document.querySelector('.preloader-text-two');
    const divi1 = document.getElementById('divi1');
    const divi2 = document.getElementById('divi2');
    textElement.textContent = `preloading ${loadedImages}/${totalImages} images...`;
    if (loadedImages === totalImages) {
      setTimeout(() => {
        gsap.to(textElement, {
          y: -25,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            textElement.style.opacity = '0';
            divi1.style.display = 'none';
            divi2.style.display = 'none';
          },
        });
        gsap.to(secondtextElement, {
          y: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        });
        setTimeout(() => {
          isGoVisible = true; // Hier aktivieren wir das Mousemove-Event erst nach "GO"
        }, 250);
      }, 250);
      setTimeout(() => {
        gsap.to([counterWrapper], {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      }, 1800);
    }
  };
  const handleImageLoad = () => {
    loadedImages++;
    updatePreloader();
  };
  images.forEach((image) => {
    image.addEventListener('load', handleImageLoad);
  });
  images.forEach((image) => {
    if (image.complete) {
      handleImageLoad();
    }
  });
  const updateCounterload = () => {
    const progress = globalIndex / images.length;
    gsap.to(counterText, {
      textContent: globalIndex,
      duration: 0.2,
      snap: {
        textContent: 1,
      },
    });
    const newPosition = progress * 90;
    gsap.to(counter, {
      left: `${newPosition}vw`,
      duration: 0.5,
      ease: 'power2.out',
    });
  };
  let globalIndex = 0;
  let last = {
    x: 0,
    y: 0,
  };
  let isZoomed = false; // Track zoom state
  let zoomedImage = null; // Store the zoomed image
  let originalPosition = {
    left: 0,
    top: 0,
  };
  let originalWidth = 0;
  let originalHeight = 0;
  let originalZIndex = 0;
  const activate = (image, x, y) => {
    // Set the size of the image
    const size = 300;
    image.style.width = `${size}px`;
    image.style.height = `${size}px`;
    image.style.position = 'absolute';
    image.style.cursor = 'default';
    image.style.pointerEvents = 'none';
    // Center the image around the mouse position
    image.style.left = `${x - size / 2}px`; // Subtract half the size of the image
    image.style.top = `${y - size / 2}px`; // Subtract half the size of the image
    image.style.zIndex = globalIndex;
    image.style.display = 'block';
    last = {
      x,
      y,
    };
    if (globalIndex === images.length - 1) {
      setTimeout(() => {
        arrangeImagesInDynamicGrid();
      }, 500);
    }
    globalIndex++;
    updateCounter();
  };
  const distanceFromLast = (x, y) => Math.hypot(x - last.x, y - last.y);
  const updateCounter = () => {
    const progress = globalIndex / images.length;
    gsap.to(counterText, {
      textContent: globalIndex,
      duration: 0.2,
      snap: {
        textContent: 1,
      },
    });
    gsap.to(loadingBar, {
      width: `${progress * 90}vw`,
      duration: 0.5,
      ease: 'power2.out',
    });
    const newPosition = progress * 90;
    gsap.to(counter, {
      left: `${newPosition}vw`,
      duration: 0.5,
      ease: 'power2.out',
    });
  };
  const arrangeImagesInDynamicGrid = () => {
    const gridColumns = 9;
    const imageWidth = 11.11111111;
    const imageHeights = Array(gridColumns).fill(0);
    images.forEach((image, index) => {
      const columnIndex = index % gridColumns;
      const leftPosition = `${columnIndex * imageWidth}vw`;
      const topPosition = `${imageHeights[columnIndex]}px`;
      const aspectRatio = image.naturalHeight / image.naturalWidth;
      const fixedHeight = (window.innerWidth * imageWidth * aspectRatio) / 100;
      imageHeights[columnIndex] += fixedHeight;
      gsap.to(image, {
        left: leftPosition,
        top: topPosition,
        width: '11.11111111vw',
        height: `${fixedHeight}px`,
        duration: 1.5,
        ease: 'expo.inOut',
        onComplete: () => {
          // Include both elements in gsap.set to set display to block
          gsap.set([interfaceElement, audioElement], {
            display: 'block',
          });
          // Animate opacity for both elements
          gsap.to([interfaceElement, audioElement], {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          });
        },
      });
      setTimeout(() => {
        image.style.cursor = 'default';
        image.style.pointerEvents = 'auto';
        gsap.to([counterWrapper], {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            preloader.style.display = 'none';
          },
        });
      }, 1000);
    });
  };
  const handleOnMove = (e) => {
    if (!isGoVisible || globalIndex >= images.length) return; // Stoppt Event, wenn "GO" noch nicht erschienen ist
    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / 25) {
      activate(images[globalIndex], e.clientX, e.clientY);
    }
  };
  const addListeners = () => {
    window.addEventListener('mousemove', handleOnMove);
  };
  const removeListeners = () => {
    window.removeEventListener('mousemove', handleOnMove);
  };
  wrapimmmm.addEventListener('mouseenter', addListeners);
  wrapimmmm.addEventListener('mouseleave', removeListeners);
  window.addEventListener('load', () => {
    const rect = wrapimmmm.getBoundingClientRect();
    if (
      rect.left <= window.innerWidth / 2 &&
      rect.right >= window.innerWidth / 2 &&
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      addListeners();
    }
  });
  const textnewwElements = document.querySelectorAll('.textneww');
  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  const enableScroll = () => {
    document.body.style.overflow = '';
  };
  textnewwElements.forEach((element) => {
    element.addEventListener('click', () => {
      disableScroll();
    });
  });
  const closeButtons = document.querySelectorAll('.crosssyofuckme, .crossfm');
  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      enableScroll();
    });
  });
  // ============= 7) Lightbox Functionality (unchanged) =============
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const interfaceElementtttt = document.getElementById('naviga');
  const secondmainInterface = document.getElementById('navigalast');
  let currentImages = [];
  let currentIndex = 0;
  // Existing counterElement styles
  const counterElement = document.createElement('div');
  counterElement.style.position = 'fixed'; // Changed from "absolute" to "fixed"
  counterElement.style.bottom = '20px';
  counterElement.style.right = '20px';
  counterElement.style.color = '#ffffffd6';
  counterElement.style.letterSpacing = '-1.5px';
  counterElement.style.textStroke = '-0.25px';
  counterElement.style.fontSize = '15px';
  counterElement.style.fontFamily = 'Neueeigene';
  counterElement.style.zIndex = '1002';
  counterElement.style.backgroundColor = '#000000e6';
  counterElement.style.paddingTop = '3.5px';
  counterElement.style.paddingBottom = '1.5px';
  counterElement.style.paddingLeft = '8px';
  counterElement.style.paddingRight = '8px';
  counterElement.style.opacity = '0';
  counterElement.style.borderRadius = '5px';
  counterElement.style.display = 'none';
  document.body.appendChild(counterElement);
  function updateCounterlb() {
    counterElement.textContent = `${currentIndex + 1} / ${
      currentImages.length
    }`;
    counterElement.style.display = 'block';
    gsap.to(counterElement, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.in',
    });
    gsap.to([interfaceElementtttt, secondmainInterface], {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        interfaceElementtttt.style.display = 'none';
        secondmainInterface.style.display = 'none';
      },
    });
  }
  // JavaScript
  // Function to handle keyboard events
  function handleKeyDown(event) {
    // Check if the lightbox is currently displayed
    if (lightbox.style.display === 'flex') {
      switch (event.key) {
        case 'ArrowRight':
          // Navigate to the next image
          showNextImage();
          break;
        case 'ArrowLeft':
          // Navigate to the previous image
          showPreviousImage();
          break;
        case 'Escape':
          // Close the lightbox
          closeLightbox();
          break;
        default:
          break;
      }
    }
  }
  // Click image -> open lightbox
  document.querySelectorAll('.image-container img').forEach((img) => {
    img.addEventListener('click', (e) => {
      e.target.style.visibility = 'hidden';
      const lightboxOverlay = document.querySelector('.lightbox-overlay');
      lightboxOverlay.style.display = 'block';
      const container = e.target.closest('.image-container');
      currentImages = Array.from(container.querySelectorAll('img'));
      currentIndex = currentImages.indexOf(e.target);
      updateCounterlb();
      const clonedImage = e.target.cloneNode(true);
      const rect = e.target.getBoundingClientRect();
      clonedImage.style.position = 'fixed';
      clonedImage.style.top = `${rect.top}px`;
      clonedImage.style.left = `${rect.left}px`;
      clonedImage.style.width = `${rect.width}px`;
      clonedImage.style.height = `${rect.height}px`;
      clonedImage.style.zIndex =
        '99999999999999999999999999999999999999999999999999';
      clonedImage.style.transition = 'none';
      clonedImage.style.objectFit = 'contain';
      clonedImage.style.visibility = 'hidden';
      clonedImage.style.pointerEvents = 'none';
      document.body.appendChild(clonedImage);
      lightboxImage.src = e.target.src;
      requestAnimationFrame(() => {
        clonedImage.style.visibility = 'visible';
        gsap.to(clonedImage, {
          top: `${(window.innerHeight - window.innerHeight * 0.9) / 2}px`,
          left: `${(window.innerWidth - window.innerWidth * 0.9) / 2}px`,
          width: '90%',
          height: '90%',
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            lightbox.style.display = 'flex';
            lightbox.style.opacity = '1';
            document.body.removeChild(clonedImage);
            document.addEventListener('keydown', handleKeyDown);
          },
        });
      });
    });
  });
  // Close Lightbox
  function closeLightbox() {
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    lightboxOverlay.style.display = 'none';
    const rect = lightboxImage.getBoundingClientRect();
    const clonedImage = lightboxImage.cloneNode(true);
    document.body.appendChild(clonedImage);
    clonedImage.style.position = 'fixed';
    clonedImage.style.top = `${rect.top}px`;
    clonedImage.style.left = `${rect.left}px`;
    clonedImage.style.width = `${rect.width}px`;
    clonedImage.style.height = `${rect.height}px`;
    clonedImage.style.zIndex =
      '999999999999999999999999999999999999999999999999991';
    clonedImage.style.objectFit = 'contain';
    const originalImage = currentImages[currentIndex];
    const originalRect = originalImage.getBoundingClientRect();
    gsap.to(clonedImage, {
      top: `${originalRect.top}px`,
      left: `${originalRect.left}px`,
      width: `${originalRect.width}px`,
      height: `${originalRect.height}px`,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        document.body.removeChild(clonedImage);
        gsap.to(counterElement, {
          opacity: 0,
          duration: 0.5,
        });
        originalImage.style.visibility = 'visible';
      },
    });
    gsap.to(counterElement, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        counterElement.style.display = 'none';
      },
    });
    interfaceElementtttt.style.display = 'flex';
    secondmainInterface.style.display = 'flex';
    gsap.to([interfaceElementtttt, secondmainInterface], {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.in',
    });
    lightbox.style.display = 'none';
    document.removeEventListener('keydown', handleKeyDown);
  }
  // Next/Prev
  function showNextImage() {
    if (currentImages.length > 0) {
      currentImages[currentIndex].style.visibility = 'visible';
      currentIndex = (currentIndex + 1) % currentImages.length;
      currentImages[currentIndex].style.visibility = 'hidden';
      updateCounterlb();
      lightboxImage.src = currentImages[currentIndex].src;
    }
  }
  function showPreviousImage() {
    if (currentImages.length > 0) {
      currentImages[currentIndex].style.visibility = 'visible';
      currentIndex =
        (currentIndex - 1 + currentImages.length) % currentImages.length;
      currentImages[currentIndex].style.visibility = 'hidden';
      updateCounterlb();
      lightboxImage.src = currentImages[currentIndex].src;
    }
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      //Handle Click to close on the parent, in the case of an overlay
      closeLightbox();
      return;
    }
    const lightboxImage = lightbox.querySelector('img'); // Get the lightbox image
    const rect = lightboxImage.getBoundingClientRect();

    // Calculate visible image dimensions and offsets
    const imageWidth = rect.width;
    const imageHeight = rect.height;
    const naturalWidth = lightboxImage.naturalWidth;
    const naturalHeight = lightboxImage.naturalHeight;

    const widthRatio = imageWidth / naturalWidth;
    const heightRatio = imageHeight / naturalHeight;

    let visibleWidth = imageWidth;
    let visibleHeight = imageHeight;
    let xOffset = 0;
    let yOffset = 0;

    if (widthRatio < heightRatio) {
      visibleHeight = naturalHeight * widthRatio;
      yOffset = (imageHeight - visibleHeight) / 2;
    } else {
      visibleWidth = naturalWidth * heightRatio;
      xOffset = (imageWidth - visibleWidth) / 2;
    }

    // Calculate click positions relative to the image, accounting for scaling and offset
    const clickX = e.clientX - rect.left - xOffset;
    const clickY = e.clientY - rect.top - yOffset;

    // Check if the click is within the visible image
    if (
      clickX >= 0 &&
      clickX <= visibleWidth &&
      clickY >= 0 &&
      clickY <= visibleHeight
    ) {
      // Determine which half of the visible image was clicked
      if (clickX > visibleWidth / 2) {
        showNextImage(); // Clicked on the right half
      } else {
        showPreviousImage(); // Clicked on the left half
      }
    } else {
      closeLightbox(); // Clicked outside the visible image
    }
  });

  // Add event listener to the overlay
  const overlay = document.querySelector('.lightbox-overlay');
  overlay.addEventListener('click', closeLightbox);

  const triggerElement1 = document.getElementById('openbook');
  triggerElement1.addEventListener('click', () => {
    initializeFirstSlider();
  });
  const cross = document.getElementById('cross');
  //   const navigalast = document.getElementById("navigalast");
  //   const onloadDiv = document.querySelector(".onload-div");
  if (!cross) {
    console.warn("Element with ID 'cross' not found.");
    return;
  }
  cross.addEventListener('click', function (e) {
    e.preventDefault();
    const href = '/';
    sessionStorage.setItem('isInternalNavigation', 'true');
    console.log('Internal navigation state set in sessionStorage.');
    fetch(href, {
      mode: 'no-cors',
    })
      .then(() => console.log('Page preloaded:', href))
      .catch(() => console.warn('Failed to preload page:', href));
    cross.style.pointerEvents = 'none';
    onloadDiv.style.display = 'block';
    gsap.set(onloadDiv, {
      top: 'auto',
      opacity: 1,
      height: '0%',
      bottom: 0,
    });
    gsap.to(cross, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.inOut',
      onComplete: () => {
        cross.style.display = 'none';
      },
    });
    const naviga = document.getElementById('naviga');
    gsap.to(naviga, {
      opacity: 0,
      y: -17,
      duration: 0.5,
      ease: 'power3.inOut',
    });
    gsap.to(onloadDiv, {
      height: '100%',
      duration: 1,
      ease: 'power4.inOut',
      onComplete: () => {
        window.location.href = href;
      },
    });
  });
  if (sessionStorage.getItem('isInternalNavigation') === 'true') {
    console.log('Page loaded via internal navigation.');
  }
});

import('lottie-web')
  .then((module) => {
    const vidDiv = document.querySelector('.videobackinout');

    const bodymovin = module.default;
    const naviga = document.getElementById('naviga');
    const loveMeTracklist = [
      {
        name: 'Crockpot',
        artist: 'Slothtrust',
        path: 'audio/Crockpot.mp3',
      },
      {
        name: 'Dog Song 2',
        artist: 'Voxtrot',
        path: 'audio/Dog_Song_2.mp3',
      },
      {
        name: 'Dont Bother Me',
        artist: 'Scott and Charl...',
        path: 'audio/Dont_Bother_Me.mp3',
      },
    ];

    const player1 = new AudioPlayer(
      '.music-player-container',
      loveMeTracklist,
      bodymovin
    );

    // Assign handleVideoStateChange to the actual function
    // handleVideoStateChange = function (videoIsPlaying) {
    //   player1.handleVideoStateChange(videoIsPlaying);
    // };
    initializeVideoStateManager(player1);

    // Call initializeFirstSlider when the openbook button is clicked
    const triggerElement1 = document.getElementById('openbook');
    triggerElement1.addEventListener('click', () => {
      initializeFirstSlider();
    });

    // Get the openVid and closeVid elements
    const openVid = document.getElementById('openvid');
    const closeVid = document.getElementById('closevid');

    // Attach the event listener to the openVid
    openVid.addEventListener('click', () => {
      handleVideoStateChange(true); // Call the local function
      gsap.to(vidDiv, {
        y: '0vh',
        duration: 0.65,
        ease: 'power4.out',
      });
      gsap.to(naviga, {
        opacity: 0,
        duration: 0.25,
        ease: 'power3.inOut',
        onComplete: () => {
          naviga.style.display = 'none';
        },
      });
    });

    // Attach the event listener to the closeVid button
    closeVid.addEventListener('click', () => {
      handleVideoStateChange(false); // Call the local function
      naviga.style.display = 'flex';
      gsap.to(vidDiv, {
        y: '101vh',
        duration: 0.65,
        ease: 'power3.in',
      });
      gsap.to(naviga, {
        opacity: 1,
        duration: 0.25,
        ease: 'power3.inOut',
      });
    });
  })
  .catch((error) => {
    console.error('Error loading lottie-web library:', error);
  });

export {}; // Add an empty export statement
