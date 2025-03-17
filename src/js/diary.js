import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('device-check-overlay');
  const message = document.getElementById('device-check-message');
  const whyLink = document.getElementById('browser-check-why-link');
  const mobileWhyLink = document.getElementById('mobile-check-why-link');
  const explanation = document.getElementById('browser-check-explanation');
  const mobileExplanation = document.getElementById('mobile-check-explanation');
  const content = document.getElementById('device-check-content');

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  function isDesktopSafari() {
    const userAgent = navigator.userAgent;
    return (
      userAgent.indexOf('Safari') > -1 &&
      userAgent.indexOf('Chrome') == -1 &&
      !isMobileDevice()
    );
  }

  if (isMobileDevice()) {
    console.log('ismobileeee');
    message.textContent =
      'oh no, you are using a phone :( you need a larger device, like a laptop in order to enter this page. also pls dont use safariiii';
    overlay.classList.remove('hidden');
    mobileWhyLink.classList.remove('hidden');
    content.classList.add('mobile');
  } else if (isDesktopSafari()) {
    console.log('issafariiiiii');
    message.textContent =
      'oh no, you are using safari :( you need a different browser like chrome in order to enter this page.';
    overlay.classList.remove('hidden');
    whyLink.classList.remove('hidden');
  } else {
    console.log('isnohtinginging');

    overlay.classList.add('hidden');
  }

  whyLink.addEventListener('click', function (event) {
    event.preventDefault();
    explanation.classList.toggle('show');
  });
  mobileWhyLink.addEventListener('click', function (event) {
    event.preventDefault();
    mobileExplanation.classList.toggle('show');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const crossi = document.getElementById('cross');
  const headerImg = document.getElementById('header-img');
  const yearNavvv = document.getElementById('year-navigation');
  const links = document.querySelectorAll('a');
  const hoverButtons = document.querySelectorAll('.crosslink');
  const interfaceElement = document.getElementById('interface');

  interfaceElement.style.display = 'flex';

  gsap.set(hoverButtons, {
    opacity: 0.75,
  });

  hoverButtons.forEach((button) => {
    const hoverIn = () => {
      gsap.to(button, {
        duration: 0.3,
        opacity: 1,
        ease: 'power1.out',
      });
    };

    const hoverOut = () => {
      gsap.to(button, {
        duration: 0.3,
        opacity: 0.75,
        ease: 'power1.out',
      });
    };

    button.addEventListener('mouseenter', hoverIn);
    button.addEventListener('mouseleave', hoverOut);
  });

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const href = this.getAttribute('href');
      const monthSectionnn = document.querySelectorAll('.year-section');
      const imgContainer = document.querySelectorAll('.image-container');

      const isHashLink = href.startsWith('#');
      const isJavaScriptLink = href.startsWith('javascript:');
      const hasTargetBlank = this.getAttribute('target') === '_blank';
      const isDownloadLink = this.hasAttribute('download');

      if (isHashLink || isJavaScriptLink || hasTargetBlank || isDownloadLink) {
        return;
      }

      event.preventDefault();
      const destination = this.href;

      gsap.to([headerImg, yearNavvv, monthSectionnn], {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: 'power4.inOut',
        onComplete: () => {
          window.location.href = destination;
        },
      });

      gsap.to(crossi, {
        y: 0,
        opacity: 0,
        duration: 0.15,
        ease: 'power3.inOut',
        onComplete: () => {
          links.forEach((btn) => {
            btn.style.display = 'none';
          });
          if (crossi) {
            crossi.style.display = 'none';
          }
        },
      });
    });
  });

  const allImages = document.querySelectorAll('img');
  allImages.forEach((img) => {
    if (
      img.id !== 'lightbox-image' &&
      img.id !== 'header-img' &&
      img.id !== 'cross'
    ) {
      if (img.src && !img.dataset.src) {
        img.dataset.src = img.src;
        img.removeAttribute('src');
        img.classList.add('lazy-image');
      }
    }
  });

  const ease = 'power4.inOut';
  const yearLink = document.querySelectorAll('.year-link');
  const yearNav = document.querySelector('.header-diary');

  gsap.set(yearNav, {
    opacity: 0,
    y: 20,
  });

  gsap.set(crossi, {
    opacity: 0,
    y: 15,
  });

  gsap.to(yearNav, {
    opacity: 1,
    y: 0,
    duration: 1,

    ease: 'power3.out',
  });

  gsap.to(crossi, {
    opacity: 1,
    y: 0,

    duration: 0.3,
    ease: 'power2.out',
  });

  gsap.set(yearLink, {
    opacity: 0,
    y: 5,
  });

  gsap.to(yearLink, {
    opacity: 1,
    y: 0,
    duration: 0.2,
    delay: 0.25,
    stagger: 0.075,
    ease: 'power2.out',
  });

  document.querySelectorAll('.year-link').forEach((year) => {
    year.addEventListener('click', () => {
      gsap.to(year, {
        y: -1.5,
        duration: 0.1,
        yoyo: true, 
        repeat: 1, 
        ease: 'power1.out',
      });

      
      document
        .querySelectorAll('.year-link')
        .forEach((link) => link.classList.remove('active'));
      year.classList.add('active');

      
      document
        .querySelectorAll('.year-section')
        .forEach((section) => (section.style.display = 'none'));

      
      const yearSection = document.querySelector(
        `#section-${year.dataset.year}`
      );
      if (yearSection) yearSection.style.display = 'block';

      const visibleMonthLinks = yearSection.querySelectorAll('.month-link');
      if (visibleMonthLinks.length > 0) {
        
        gsap.set(visibleMonthLinks, {
          opacity: 0,
          y: 2.5,
        });

        
        gsap.to(visibleMonthLinks, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          stagger: 0.04,
          ease: 'power2.out',
        });
      }
    });
  });

  
  const loaderPath = document.querySelector('#svg-loader .cls-1');
  const loaderContainer = document.getElementById('svg-loader');

  loaderPath.style.display = 'block';

  
  const pathLength = loaderPath.getTotalLength();

  
  loaderPath.style.strokeDasharray = pathLength;
  loaderPath.style.strokeDashoffset = pathLength;

  
  loaderPath.dataset.pathLength = pathLength;

  function showLoader() {
    
    resetLoader();

    
    loaderContainer.style.display = 'block';
    loaderContainer.style.opacity = '1'; 

    
    gsap.to(loaderPath, {
      strokeDashoffset: 0,
      duration: 10, 
      ease: 'power1.out',
    });
  }

  function updateLoader(progressPercentage) {
    const newDashOffset = pathLength * (1 - progressPercentage / 100);
    gsap.to(loaderPath, {
      strokeDashoffset: newDashOffset,
      duration: 0.5, 
      ease: 'power1.out',
      overwrite: true,
    });

    
    loaderContainer.setAttribute('aria-valuenow', progressPercentage);
  }

  function hideLoader() {
    gsap.to(loaderContainer, {
      opacity: 0, 
      duration: 0.2, 
      ease: 'power1.in',
      onComplete: () => {
        loaderContainer.style.display = 'none'; 

        
        resetLoader();
      },
    });
  }

  function resetLoader() {
    gsap.set(loaderPath, {
      strokeDashoffset: pathLength,
    });
  }

  
  async function loadImagesSequentially(images, onImageLoad) {
    const total = images.length;
    let loaded = 0;

    
    showLoader();

    for (let i = 0; i < total; i++) {
      const img = images[i];
      const dataSrc = img.dataset.src;
      if (!dataSrc) continue;

      
      img.src = dataSrc;
      img.removeAttribute('data-src');

      
      await new Promise((resolve, reject) => {
        img.onload = () => {
          loaded++;
          const progress = (loaded / total) * 100;

          
          updateLoader(progress);

          
          if (onImageLoad) onImageLoad(img, i, total);
          resolve();
        };

        img.onerror = () => {
          console.error('Failed to load image:', dataSrc);
          loaded++;
          const progress = (loaded / total) * 100;

          
          updateLoader(progress);

          
          if (onImageLoad) onImageLoad(img, i, total);
          resolve(); 
        };
      });
    }

    setTimeout(() => {
      
      hideLoader();
    }, 400);
  }

  
  document.querySelectorAll('.month-link').forEach((month) => {
    month.addEventListener('click', async () => {
      
      gsap.to(month, {
        y: -1.5,
        duration: 0.1,
        yoyo: true, 
        repeat: 1, 
        ease: 'power1.out',
      });

      
      document.querySelectorAll('.month-section').forEach((sec) => {
        sec.style.display = 'none';
      });

      document
        .querySelectorAll('.month-link')
        .forEach((link) => link.classList.remove('active'));
      month.classList.add('active');

      
      const monthSection = document.querySelector(
        `#month-${month.dataset.year}-${month.dataset.month}`
      );
      if (!monthSection) return; 

      if (monthSection.dataset.loaded === 'true') {
        
        monthSection.style.display = 'block';

        
        const alreadyImages = monthSection.querySelectorAll('img'); images
        gsap.to(alreadyImages, {
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
        });
        return;
      }

      
      
      monthSection.dataset.loaded = 'true';

      
      const monthImages = Array.from(
        monthSection.querySelectorAll('img.lazy-image')
      );

      if (!monthImages.length) {
        return;
      }

      
      monthSection.style.display = 'block';

      
      gsap.set(monthImages, {
        opacity: 0,
      });

      
      const onImageLoad = (img, index, total) => {
        gsap.to(img, {
          opacity: 1,
          duration: 0.5,
          delay: index * 0.05,
        });
        img.classList.remove('lazy-image'); loading
      };

      
      await loadImagesSequentially(monthImages, onImageLoad);
    });
  });

  
  const imgContainers = document.querySelectorAll('.image-container');
  let firstClick = true;

  document.querySelectorAll('.month-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (firstClick) {
        yearNav.classList.add('first-click-active');
        gsap.to(imgContainers, {
          opacity: 1,
          duration: 0.3,
          delay: 0.7,
          ease: 'power1.in',
        });
        firstClick = false;
      }
    });
  });
});


const cross = document.getElementById('cross');

cross.addEventListener('click', function (e) {
  e.preventDefault();

  const href = '/';

  sessionStorage.setItem('isInternalNavigation', 'true');

  fetch(href, { mode: 'no-cors' })
    .then(() => console.log('Page preloaded:', href))
    .catch(() => console.warn('Failed to preload page:', href));

  cross.style.pointerEvents = 'none';
});

if (sessionStorage.getItem('isInternalNavigation') === 'true') {
}


const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const interfaceElement = document.getElementById('interface');
const yearNavigation = document.getElementById('year-navigation');
const monthNavigation = document.querySelectorAll('.month-navigation');
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
  counterElement.textContent = `${currentIndex + 1} / ${currentImages.length}`;
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
  img.addEventListener('click', (e) => {
    e.target.style.visibility = 'hidden';
    const container = e.target.closest('.image-container');
    currentImages = Array.from(container.querySelectorAll('img'));
    currentIndex = currentImages.indexOf(e.target);
    updateCounter();

    gsap.to([interfaceElement, yearNavigation, monthNavigation], {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        interfaceElement.style.display = 'none';
      },
    });

    
    const clonedImage = e.target.cloneNode(true);
    const rect = e.target.getBoundingClientRect();
    clonedImage.style.position = 'fixed';
    clonedImage.style.top = `${rect.top}px`;
    clonedImage.style.left = `${rect.left}px`;
    clonedImage.style.width = `${rect.width}px`;
    clonedImage.style.height = `${rect.height}px`;
    clonedImage.style.zIndex = '1000';
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


function closeLightbox() {
  const rect = lightboxImage.getBoundingClientRect();
  const clonedImage = lightboxImage.cloneNode(true);
  document.body.appendChild(clonedImage);

  clonedImage.style.position = 'fixed';
  clonedImage.style.top = `${rect.top}px`;
  clonedImage.style.left = `${rect.left}px`;
  clonedImage.style.width = `${rect.width}px`;
  clonedImage.style.height = `${rect.height}px`;
  clonedImage.style.zIndex = '1001';
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

  interfaceElement.style.display = 'flex';
  gsap.to([interfaceElement, yearNavigation, monthNavigation], {
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
    currentIndex = (currentIndex + 1) % currentImages.length;
    currentImages[currentIndex].style.visibility = 'hidden';
    updateCounter();
    lightboxImage.src = currentImages[currentIndex].src;
  }
}

function showPreviousImage() {
  if (currentImages.length > 0) {
    currentImages[currentIndex].style.visibility = 'visible';
    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
    currentImages[currentIndex].style.visibility = 'hidden';
    updateCounter();
    lightboxImage.src = currentImages[currentIndex].src;
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



cross.addEventListener('click', function (e) {
  e.preventDefault();

  const href = '/';

  sessionStorage.setItem('isInternalNavigation', 'true');

  fetch(href, { mode: 'no-cors' })
    .then(() => console.log('Page preloaded:', href))
    .catch(() => console.warn('Failed to preload page:', href));

  cross.style.pointerEvents = 'none';
});

if (sessionStorage.getItem('isInternalNavigation') === 'true') {
}
