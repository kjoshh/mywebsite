import gsap from 'gsap';
import './browser-detect.js';
import './applystuff.js';
document.addEventListener('DOMContentLoaded', function () {
  const cross = document.getElementById('cross');
  const onloadDiv = document.querySelector('.onload-div');
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
      height: '0%',
      opacity: 1,
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
    const openmap = document.getElementById('openmap');
    gsap.to(naviga, {
      opacity: 0,
      y: -17,
      duration: 0.5,
      ease: 'power3.inOut',
    });
    gsap.to(openmap, {
      opacity: 0,
      duration: 0.25,
      ease: 'power3.inOut',
    });
    gsap.to(onloadDiv, {
      height: '100%',
      duration: 1,
      delay: 0.25,
      ease: 'power4.inOut',
      onComplete: () => {
        window.location.href = href;
      },
    });
  });
  if (sessionStorage.getItem('isInternalNavigation') === 'true') {
    console.log('Page loaded via internal navigation.');
  }
  const openMap = document.getElementById('openmap');
  const mapDiv = document.getElementById('mapdiv');
  const closeMap = document.getElementById('closemap');
  const mainInterface = document.getElementById('naviga');
  const secondmainInterface = document.getElementById('navigalast');
  const backStuff = document.querySelector('.blurbackstuff');
  gsap.to(onloadDiv, {
    opacity: 0,

    duration: 0.75,
    ease: 'power4.inOut',
    onComplete: () => {
      onloadDiv.style.display = 'none';
      gsap.to(secondmainInterface, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.inOut',
      });
    },
  });
  openMap.addEventListener('click', () => {
    backStuff.style.display = 'block';
    gsap.to(backStuff, {
      opacity: 1,
      duration: 0.65,
      ease: 'power4.inOut',
    });
    gsap.to(mapDiv, {
      y: '0vh',
      duration: 0.65,
      ease: 'power4.inOut',
    });
    gsap.to([mainInterface, secondmainInterface], {
      opacity: 0,
      duration: 0.25,
      ease: 'power3.inOut',
      onComplete: () => {
        mainInterface.style.display = 'none';
        secondmainInterface.style.display = 'none';
      },
    });
  });
  closeMap.addEventListener('click', () => {
    mainInterface.style.display = 'flex';
    secondmainInterface.style.display = 'flex';
    gsap.to(backStuff, {
      opacity: 0,
      duration: 0.65,
      ease: 'power4.inOut',
      onComplete: () => {
        backStuff.style.display = 'none';
      },
    });
    gsap.to(mapDiv, {
      y: '101vh',
      duration: 0.65,
      ease: 'power3.inOut',
    });
    gsap.to([mainInterface, secondmainInterface], {
      opacity: 1,
      duration: 0.25,
      ease: 'power3.inOut',
    });
  });

  const imageUrls = Array.from(
    {
      length: 63,
    },
    (_, i) => ({
      thumb: `images/Nje/nje-full/nje-full-${i + 2}.jpg`,
      full: `images/Nje/nje--full/nje-full-${i + 2}.jpg`,
    })
  );

  console.log(imageUrls);

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

  const preloader = document.getElementById('preloadernje');
  gsap.to(preloader, {
    opacity: 1,
    duration: 1,
    ease: 'power2.in',
  });
  let imagesLoadedCount = 0;

  const imgElements = document.querySelectorAll('.nje-img');

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
      const progressText = document.getElementById('progress-text');
      const naviga = document.getElementById('naviga');
      progressText.textContent = `loading... ${imagesLoadedCount}/63`;

      if (imagesLoadedCount === imgElements.length) {
        gsap.to(progressText, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        });
        setTimeout(() => {
          gsap.to(preloader, {
            opacity: 0,
            delay: 0.5,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
              preloader.style.display = 'none';
              naviga.style.display = 'flex';
              gsap.fromTo(
                naviga,
                {
                  y: 20,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  ease: 'power3.inOut',
                }
              );
            },
          });
        }, 400);
      }
    };
  });

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
        '/nje-thumb/nje-thumb-',
        '/nje-full/nje-full-'
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
        '/nje-thumb/nje-thumb-',
        '/nje-full/nje-full-'
      );

      currentIndex = currentImages
        .map((img) =>
          img.src.replace('/nje-thumb/nje-thumb-', '/nje-full/nje-full-')
        )
        .indexOf(highResSrc);

      updateCounter();

      lightboxImage.src = highResSrc;

      gsap.to([interfaceElement, secondmainInterface], {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          interfaceElement.style.display = 'none';
          secondmainInterface.style.display = 'none';
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
      '/nje-thumb/nje-Thumb-',
      '/nje-full/nje-full-'
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
        img.src.replace('/nje-thumb/nje-thumb-', '/nje-full/nje-full-') ===
        highResSrc
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

    secondmainInterface.style.display = 'flex';
    interfaceElement.style.display = 'flex';
    gsap.to([interfaceElement, secondmainInterface], {
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
        '/nje-thumb/nje-thumb-',
        '/nje-full/nje-full-'
      );

      lightboxImage.src = currentHighResSrc;

      const clonedNextImage = document.createElement('img');
      clonedNextImage.src = currentImages[
        (currentIndex + 1) % currentImages.length
      ].src.replace('/nje-thumb/nje-thumb-', '/nje-full/nje-full-');
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
        '/nje-thumb/nje-thumb-',
        '/nje-full/nje-full-'
      );

      lightboxImage.src = currentHighResSrc;

      const clonedPrevImage = document.createElement('img');
      clonedPrevImage.src = currentImages[
        (currentIndex - 1 + currentImages.length) % currentImages.length
      ].src.replace('/nje-thumb/nje-thumb-', '/nje-full/nje-full-');
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
