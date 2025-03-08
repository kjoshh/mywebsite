// src/js/diary.js
import gsap from 'gsap'; // Import GSAP

// --- Browser Detection ---
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
    // If it's not a mobile device and not desktop Safari, hide the overlay
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

// --- Main Diary Functionality ---
document.addEventListener('DOMContentLoaded', () => {
  // Select all <a> elements
  const crossi = document.getElementById('cross');
  const headerImg = document.getElementById('header-img');
  const yearNavvv = document.getElementById('year-navigation');
  const links = document.querySelectorAll('a');
  const hoverButtons = document.querySelectorAll('.crosslink');
  const interfaceElement = document.getElementById('interface');

  interfaceElement.style.display = 'flex';

  // Set initial opacity using GSAP
  gsap.set(hoverButtons, {
    opacity: 0.75,
  });

  // Iterate over each button to attach event listeners
  hoverButtons.forEach((button) => {
    // Define the hover-in animation
    const hoverIn = () => {
      gsap.to(button, {
        duration: 0.3, // Duration of the animation in seconds
        opacity: 1, // Target opacity on hover
        ease: 'power1.out', // Easing function for smooth transition
      });
    };

    // Define the hover-out animation
    const hoverOut = () => {
      gsap.to(button, {
        duration: 0.3,
        opacity: 0.75, // Revert to original opacity when not hovered
        ease: 'power1.out',
      });
    };

    // Attach event listeners for mouseenter and mouseleave
    button.addEventListener('mouseenter', hoverIn);
    button.addEventListener('mouseleave', hoverOut);
  });

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const href = this.getAttribute('href');
      const monthSectionnn = document.querySelectorAll('.year-section');
      const imgContainer = document.querySelectorAll('.image-container');

      // Check if href is a valid URL and not a hash link or JavaScript link
      const isHashLink = href.startsWith('#');
      const isJavaScriptLink = href.startsWith('javascript:');
      const hasTargetBlank = this.getAttribute('target') === '_blank';
      const isDownloadLink = this.hasAttribute('download');

      // If it's a hash link, JavaScript link, download link, or opens in a new tab, do not apply the transition
      if (isHashLink || isJavaScriptLink || hasTargetBlank || isDownloadLink) {
        return; // Allow default behavior
      }

      // Prevent default navigation
      event.preventDefault();
      const destination = this.href; // Absolute URL

      // triggerBlock.style.display = "block";
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
          // Hide the links and 'crossi' after the animation
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

  // ============= 1) Convert <img src="..."> to lazy approach (except #lightbox-image) ==========
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

  // ============= 2) GSAP transitions for .header-diary and .year-links, etc. =============
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
    // delay: 0.2,
    ease: 'power3.out',
  });

  gsap.to(crossi, {
    opacity: 1,
    y: 0,
    // delay: 0.2,
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

  // ============= 3) Year Link Logic: Hide all sections, show clicked year =============
  document.querySelectorAll('.year-link').forEach((year) => {
    year.addEventListener('click', () => {
      // Animate only the visible active month links
      // 1. Animate only this clicked year link itself
      gsap.to(year, {
        y: -1.5,
        duration: 0.1,
        yoyo: true, // go back to original
        repeat: 1, // do it twice
        ease: 'power1.out',
      });

      // Remove active class from all year links
      document
        .querySelectorAll('.year-link')
        .forEach((link) => link.classList.remove('active'));
      year.classList.add('active');

      // Hide all year sections
      document
        .querySelectorAll('.year-section')
        .forEach((section) => (section.style.display = 'none'));

      // Show the selected year's section
      const yearSection = document.querySelector(
        `#section-${year.dataset.year}`
      );
      if (yearSection) yearSection.style.display = 'block';

      const visibleMonthLinks = yearSection.querySelectorAll('.month-link');
      if (visibleMonthLinks.length > 0) {
        // Set initial animation state
        gsap.set(visibleMonthLinks, {
          opacity: 0,
          y: 2.5,
        });

        // Animate active month links
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

  // ============= 4) Sequential Image Loading Function =============
  const loaderPath = document.querySelector('#svg-loader .cls-1');
  const loaderContainer = document.getElementById('svg-loader');

  loaderPath.style.display = 'block';

  // Calculate the total length of the path
  const pathLength = loaderPath.getTotalLength();

  // Set the dasharray and dashoffset to the path length
  loaderPath.style.strokeDasharray = pathLength;
  loaderPath.style.strokeDashoffset = pathLength;

  // Store the path length for later use
  loaderPath.dataset.pathLength = pathLength;

  function showLoader() {
    // Reset the loader to start from the beginning
    resetLoader();

    // Show the loader container
    loaderContainer.style.display = 'block';
    loaderContainer.style.opacity = '1'; // Ensure it's fully visible

    // Animate the strokeDashoffset from pathLength to 0 (fills the loader)
    gsap.to(loaderPath, {
      strokeDashoffset: 0,
      duration: 10, // Duration of the loader animation
      ease: 'power1.out',
    });
  }

  function updateLoader(progressPercentage) {
    const newDashOffset = pathLength * (1 - progressPercentage / 100);
    gsap.to(loaderPath, {
      strokeDashoffset: newDashOffset,
      duration: 0.5, // Smooth transition for each update
      ease: 'power1.out',
      overwrite: true,
    });

    // Update ARIA attribute for accessibility
    loaderContainer.setAttribute('aria-valuenow', progressPercentage);
  }

  function hideLoader() {
    gsap.to(loaderContainer, {
      opacity: 0, // Fade out to invisible
      duration: 0.2, // Duration of the fade-out
      ease: 'power1.in',
      onComplete: () => {
        loaderContainer.style.display = 'none'; // Hide the loader container

        // Reset the loader for the next loading cycle
        resetLoader();
      },
    });
  }

  function resetLoader() {
    gsap.set(loaderPath, {
      strokeDashoffset: pathLength,
    });
  }

  // Example Function to Simulate Image Loading
  async function loadImagesSequentially(images, onImageLoad) {
    const total = images.length;
    let loaded = 0;

    // Show the loader when loading starts
    showLoader();

    for (let i = 0; i < total; i++) {
      const img = images[i];
      const dataSrc = img.dataset.src;
      if (!dataSrc) continue;

      // Start loading the image
      img.src = dataSrc;
      img.removeAttribute('data-src');

      // Wait for the image to load
      await new Promise((resolve, reject) => {
        img.onload = () => {
          loaded++;
          const progress = (loaded / total) * 100;

          // Update loader progress
          updateLoader(progress);

          // Callback after image is loaded
          if (onImageLoad) onImageLoad(img, i, total);
          resolve();
        };

        img.onerror = () => {
          console.error('Failed to load image:', dataSrc);
          loaded++;
          const progress = (loaded / total) * 100;

          // Update loader progress even if image fails to load
          updateLoader(progress);

          // Callback after image fails to load
          if (onImageLoad) onImageLoad(img, i, total);
          resolve(); // Resolve to continue the sequence
        };
      });
    }

    setTimeout(() => {
      // After all images have loaded, hide the loader with fade-out
      hideLoader();
    }, 400);
  }

  // ============= 5) Month Link Click Logic (Sequential Loading) =============
  document.querySelectorAll('.month-link').forEach((month) => {
    month.addEventListener('click', async () => {
      // Make the event handler async
      gsap.to(month, {
        y: -1.5,
        duration: 0.1,
        yoyo: true, // go back to original
        repeat: 1, // do it twice
        ease: 'power1.out',
      });

      // Hide all month sections
      document.querySelectorAll('.month-section').forEach((sec) => {
        sec.style.display = 'none';
      });

      document
        .querySelectorAll('.month-link')
        .forEach((link) => link.classList.remove('active'));
      month.classList.add('active');

      // Show the clicked month
      const monthSection = document.querySelector(
        `#month-${month.dataset.year}-${month.dataset.month}`
      );
      if (!monthSection) return; // Check if this month was already loaded

      if (monthSection.dataset.loaded === 'true') {
        // Ensure the month section is visible
        monthSection.style.display = 'block';

        // Immediately show images with fade-in
        const alreadyImages = monthSection.querySelectorAll('img'); // Select all images
        gsap.to(alreadyImages, {
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
        });
        return;
      }

      // If not loaded, proceed with loading logic
      // Mark it as loaded to skip next time
      monthSection.dataset.loaded = 'true';

      // Collect images in this month
      const monthImages = Array.from(
        monthSection.querySelectorAll('img.lazy-image')
      );

      if (!monthImages.length) {
        return;
      }

      // Show the clicked month
      monthSection.style.display = 'block';

      // Hide images initially and prepare for animation
      gsap.set(monthImages, {
        opacity: 0,
      });

      // Define a callback to fade in each image as it's loaded
      const onImageLoad = (img, index, total) => {
        gsap.to(img, {
          opacity: 1,
          duration: 0.5,
          delay: index * 0.05,
        });
        img.classList.remove('lazy-image'); // Remove the lazy-image class after loading
      };

      // Start sequential loading
      await loadImagesSequentially(monthImages, onImageLoad);
    });
  });

  // ============= 6) First Click logic, etc. =============
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

// --- Back Navigation ---
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

// ============= 7) Lightbox Functionality =============
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const interfaceElement = document.getElementById('interface');
const yearNavigation = document.getElementById('year-navigation');
const monthNavigation = document.querySelectorAll('.month-navigation');
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

function updateCounter() {
  counterElement.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  counterElement.style.display = 'block';
  gsap.to(counterElement, {
    opacity: 1,
    duration: 0.5,
    ease: 'power2.in',
  });
}

// Function to handle keyboard events
function handleKeyDown(event) {
  // Check if the lightbox is currently displayed
  if (lightbox.style.display === 'flex') {
    switch (event.key) {
      case 'ArrowRight': // Navigate to the next image
        showNextImage();
        break;
      case 'ArrowLeft': // Navigate to the previous image
        showPreviousImage();
        break;
      case 'Escape': // Close the lightbox
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

    // Clone & animate
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

// Close Lightbox
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

// Next/Prev function
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

// --- Back Navigation ---

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
