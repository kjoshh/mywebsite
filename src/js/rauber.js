import gsap from 'gsap';
import { initializeVimeoPlayerNoAudio } from './vimeo-helper-no-audio.js';
import './browser-detect.js';
import './applystuff.js';
import { initializeFirstSlider } from './slider.js';
import { initializeSecondSlider } from './rauber-second-slider.js';
document.addEventListener('DOMContentLoaded', function () {
  initializeVimeoPlayerNoAudio('lovememvid', 'closevid');

  const myVideo = document.getElementById('lovememvid');
  console.log('myVideo:', myVideo);
  const onloadDiv = document.getElementById('onloaddiv');
  const naviga = document.getElementById('naviga');
  gsap.to(onloadDiv, {
    height: '0%',
    duration: 1,
    ease: 'power4.inOut',
    onComplete: () => {
      onloadDiv.style.display = 'none';
    },
  });
  document.body.style.overflow = 'hidden';
  window.scrollTo({
    top: 0,
    behavior: 'auto',
  });
  setTimeout(() => {
    document.body.style.overflow = 'auto';
  }, 3000);
  const imageUrls = Array.from(
    {
      length: 99,
    },
    (_, i) => ({
      thumb: `images/Rauber/rauber-thumb/rauber-thumb-${i + 1}.jpg`,
      full: `images/Rauber/rauber-full/rauber-full-${i + 1}.jpg`,
    })
  );
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  const shuffledIndices = Array.from(
    {
      length: imageUrls.length,
    },
    (_, i) => i
  );
  shuffleArray(shuffledIndices);
  let imagesLoadedCount = 0;
  const imgElements = document.querySelectorAll('.rauber-img');
  shuffledIndices.forEach((shuffledIndex) => {
    const imgData = imageUrls[shuffledIndex];
    const img = new Image();
    img.src = imgData.thumb;
    img.onload = () => {
      const targetImg = imgElements[shuffledIndex];
      if (targetImg) {
        targetImg.src = img.src;
        targetImg.dataset.full = imgData.full;

        gsap.fromTo(
          targetImg,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.15,
            ease: 'power2.inOut',
          }
        );
      }

      imagesLoadedCount++;
      const preloader = document.getElementById('preloader');
      const progressText = document.getElementById('progress-text');
      progressText.textContent = `loading... ${imagesLoadedCount} / 99`;

      if (imagesLoadedCount === imgElements.length) {
        gsap.to(progressText, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        });
        setTimeout(() => {
          gsap.to(preloader, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          });
          setTimeout(() => {
            preloader.remove();

            naviga.style.display = 'flex';
            gsap.fromTo(
              naviga,
              {
                opacity: 0,
                y: 40,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.inOut',
              }
            );
          }, 400);
        }, 400);
      }
    };
  });
  const loDiv = document.getElementById('lodiv');
  const openLo = document.getElementById('openlo');
  const closeLo = document.getElementById('closelo');
  const textDiv = document.getElementById('textdiv');
  const openText = document.getElementById('opentext');
  const closeText = document.getElementById('closetext');
  const baume = document.getElementById('baume');
  const weg = document.getElementById('weg');
  const tiere = document.getElementById('tiere');
  const rauberSchrift = document.getElementById('rauberschrift');
  const arrowDown = document.getElementById('arrowdown');
  const wipDiv = document.getElementById('wipdiv');
  const openWip = document.getElementById('openwip');
  const closeWip = document.getElementById('closewip');
  const buchDiv = document.getElementById('buchdiv');
  const openBook = document.getElementById('openbook');
  const closeBook = document.getElementById('closebook');
  const vidDiv = document.getElementById('viddiv');
  const openVid = document.getElementById('openvid');
  const closeVid = document.getElementById('closevid');
  const mainInterface = document.getElementById('naviga');
  const secondInterface = document.getElementById('navigalast');

  const backStuff = document.querySelector('.blurbackstuff');
  openLo.addEventListener('click', () => {
    initializeSecondSlider();
    gsap.to(loDiv, {
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
  closeLo.addEventListener('click', () => {
    mainInterface.style.display = 'flex';
    secondInterface.style.display = 'flex';
    gsap.to(backStuff, {
      opacity: 0,
      duration: 0.65,
      ease: 'power4.inOut',
      onComplete: () => {
        backStuff.style.display = 'none';
      },
    });
    gsap.to(loDiv, {
      y: '101vh',
      duration: 0.65,
      ease: 'power3.inOut',
    });
    gsap.to([mainInterface, secondInterface], {
      opacity: 1,
      duration: 0.25,
      ease: 'power3.inOut',
    });
  });
  let bounceAnimation;
  openText.addEventListener('click', () => {
    gsap.set([baume, weg, tiere, rauberSchrift, arrowDown], {
      opacity: 0,
    });

    const tl = gsap.timeline();

    setTimeout(() => {
      tl.to(baume, {
        duration: 0.65,
        opacity: 1,
        ease: 'power3.inOut',
      })
        .to(
          weg,
          {
            duration: 0.65,
            opacity: 1,
            ease: 'power3.inOut',
          },
          '-=0.2'
        )
        .fromTo(
          tiere,
          {
            opacity: 0,
            y: -30,
            scale: 0.85,
          },
          {
            duration: 0.65,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power3.inOut',
          },
          '-=0.2'
        )
        .fromTo(
          rauberSchrift,
          {
            opacity: 0,
            y: 20,
          },
          {
            duration: 0.65,
            opacity: 1,
            y: 0,
            ease: 'power3.inOut',
          },
          '-=0.2'
        )
        .fromTo(
          arrowDown,
          {
            opacity: 0,
            y: 10,
          },
          {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: 'sine.inOut',
          },
          '-=0.2'
        )
        .add(() => {
          bounceAnimation = gsap.to(arrowDown, {
            y: 10,
            duration: 1,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        });
    }, 650);

    backStuff.style.display = 'block';
    gsap.to(backStuff, {
      opacity: 1,
      duration: 0.65,
      ease: 'power4.inOut',
    });
    gsap.to(textDiv, {
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
  closeText.addEventListener('click', () => {
    if (bounceAnimation) {
      bounceAnimation.kill();
      bounceAnimation = null;
    }

    mainInterface.style.display = 'flex';
    secondInterface.style.display = 'flex';

    gsap.to(backStuff, {
      opacity: 0,
      duration: 0.65,
      ease: 'power4.inOut',
      onComplete: () => {
        backStuff.style.display = 'none';
      },
    });
    gsap.to(textDiv, {
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
  openWip.addEventListener('click', () => {
    gsap.to(wipDiv, {
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
  closeWip.addEventListener('click', () => {
    mainInterface.style.display = 'flex';
    secondInterface.style.display = 'flex';
    gsap.to(wipDiv, {
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
  openBook.addEventListener('click', () => {
    initializeFirstSlider();
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

  openVid.addEventListener('click', () => {
    gsap.to(vidDiv, {
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
  closeVid.addEventListener('click', () => {
    mainInterface.style.display = 'flex';
    secondInterface.style.display = 'flex';
    gsap.to(vidDiv, {
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
  const cross = document.getElementById('cross');

  if (!cross) {
    console.warn("Element with ID 'cross' not found.");
    return;
  }
  cross.addEventListener('click', function (e) {
    e.preventDefault();
    const href = '/';
    sessionStorage.setItem('isInternalNavigation', 'true');
    console.log('Internal navigation state set in session s.');
    fetch(href, {
      mode: 'no-cors',
    })
      .then(() => console.log('Page preloaded:', href))
      .catch(() => console.warn('Failed to preload page:', href));
    cross.style.pointerEvents = 'none';
    onloadDiv.style.display = 'block';
    gsap.set(onloadDiv, {
      top: 'auto',
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

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const interfaceElement = document.getElementById('naviga');
  let currentImages = [];
  let currentIndex = 0;

  const counterElement = document.createElement('div');
  counterElement.style.position = 'fixed';
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
  function updateCounter() {
    counterElement.textContent = `${currentIndex + 1} / ${
      currentImages.length
    }`;
    counterElement.style.display = 'block';
    gsap.to(counterElement, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.in',
    });
  }

  function handleKeyDown(event) {
    if (lightbox.style.display === 'flex') {
      switch (event.key) {
        case 'ArrowRight':
          showNextImage();
          break;
        case 'ArrowLeft':
          showPreviousImage();
          break;
        case 'Escape':
          closeLightbox();
          break;
        default:
          break;
      }
    }
  }
  document.querySelectorAll('.image-container img').forEach((img) => {
    img.addEventListener('mouseover', (e) => {
      const highResSrc = e.target.src.replace(
        '/rauber-thumb/rauber-thumb-',
        '/rauber-full/rauber-full-'
      );

      const backgroundImage = new Image();
      backgroundImage.src = highResSrc;

      backgroundImage.onload = () => {
        const clonedImage = e.target.cloneNode(true);
        clonedImage.src = highResSrc;
        clonedImage.style.position = 'absolute';
        clonedImage.style.top = '-9999px';
        clonedImage.style.left = '-9999px';
        clonedImage.style.width = 'auto';
        clonedImage.style.height = 'auto';
        clonedImage.style.visibility = 'hidden';
        clonedImage.style.pointerEvents = 'none';

        document.body.appendChild(clonedImage);
      };
    });

    img.addEventListener('click', (e) => {
      e.target.style.visibility = 'hidden';
      const container = e.target.closest('.image-container');

      currentImages = Array.from(container.querySelectorAll('img'));

      const highResSrc = e.target.src.replace(
        '/rauber-thumb/rauber-thumb-',
        '/rauber-full/rauber-full-'
      );

      currentIndex = currentImages
        .map((img) =>
          img.src.replace(
            '/rauber-thumb/rauber-thumb-',
            '/rauber-full/rauber-full-'
          )
        )
        .indexOf(highResSrc);

      updateCounter();

      lightboxImage.src = highResSrc;

      gsap.to(interfaceElement, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          interfaceElement.style.display = 'none';
        },
      });

      const clonedImage = e.target.cloneNode(true);
      clonedImage.src = highResSrc;
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

  function closeLightbox() {
    const rect = lightboxImage.getBoundingClientRect();

    const clonedImage = lightboxImage.cloneNode(true);

    const highResSrc = lightboxImage.src.replace(
      '/rauber-thumb/rauber-Thumb-',
      '/rauber-full/rauber-full-'
    );
    clonedImage.src = highResSrc;

    document.body.appendChild(clonedImage);

    clonedImage.style.position = 'fixed';
    clonedImage.style.top = `${rect.top}px`;
    clonedImage.style.left = `${rect.left}px`;
    clonedImage.style.width = `${rect.width}px`;
    clonedImage.style.height = `${rect.height}px`;
    clonedImage.style.zIndex =
      '999999999999999999999999999999999999999999999999991';
    clonedImage.style.objectFit = 'contain';

    const originalImage = Array.from(
      document.querySelectorAll('.image-container img')
    ).find(
      (img) =>
        img.src.replace(
          '/rauber-thumb/rauber-thumb-',
          '/rauber-full/rauber-full-'
        ) === highResSrc
    );
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
        originalImage.style.opacity = '1';
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

    interfaceElement.style.display = 'flex';
    gsap.to(interfaceElement, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.in',
    });

    lightbox.style.display = 'none';

    document.removeEventListener('keydown', handleKeyDown);
  }
  function showNextImage() {
    if (currentImages.length > 0) {
      currentImages[currentIndex].style.visibility = 'visible';

      gsap.to(currentImages[currentIndex], {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.inOut',
      });

      currentIndex = (currentIndex + 1) % currentImages.length;
      gsap.to(currentImages[currentIndex], {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          currentImages[currentIndex].style.visibility = 'hidden';
        },
      });

      updateCounter();

      const currentHighResSrc = currentImages[currentIndex].src.replace(
        '/rauber-thumb/rauber-thumb-',
        '/rauber-full/rauber-full-'
      );

      lightboxImage.src = currentHighResSrc;

      const clonedNextImage = document.createElement('img');
      clonedNextImage.src = currentImages[
        (currentIndex + 1) % currentImages.length
      ].src.replace('/rauber-thumb/rauber-thumb-', '/rauber-full/rauber-full-');
      document.body.appendChild(clonedNextImage);

      gsap.to(clonedNextImage, {
        top: '50%',
        left: '50%',
        width: '80%',
        height: '80%',
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(clonedNextImage, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          document.body.removeChild(clonedNextImage);
        },
      });
    }
  }
  function showPreviousImage() {
    if (currentImages.length > 0) {
      currentImages[currentIndex].style.visibility = 'visible';

      gsap.to(currentImages[currentIndex], {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.inOut',
      });

      currentIndex =
        (currentIndex - 1 + currentImages.length) % currentImages.length;
      gsap.to(currentImages[currentIndex], {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          currentImages[currentIndex].style.visibility = 'hidden';
        },
      });
      updateCounter();

      const currentHighResSrc = currentImages[currentIndex].src.replace(
        '/rauber-thumb/rauber-thumb-',
        '/rauber-full/rauber-full-'
      );
      lightboxImage.src = currentHighResSrc;
      const clonedPrevImage = document.createElement('img');
      clonedPrevImage.src = currentImages[
        (currentIndex - 1 + currentImages.length) % currentImages.length
      ].src.replace('/rauber-thumb/rauber-thumb-', '/rauber-full/rauber-full-');
      document.body.appendChild(clonedPrevImage);
      gsap.to(clonedPrevImage, {
        top: '50%',
        left: '50%',
        width: '80%',
        height: '80%',
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(clonedPrevImage, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          document.body.removeChild(clonedPrevImage);
        },
      });
    }
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
      return;
    }
    const lightboxImage = lightbox.querySelector('img');
    const rect = lightboxImage.getBoundingClientRect();

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

    const clickX = e.clientX - rect.left - xOffset;
    const clickY = e.clientY - rect.top - yOffset;

    if (
      clickX >= 0 &&
      clickX <= visibleWidth &&
      clickY >= 0 &&
      clickY <= visibleHeight
    ) {
      if (clickX > visibleWidth / 2) {
        showNextImage();
      } else {
        showPreviousImage();
      }
    } else {
      closeLightbox();
    }
  });
});
