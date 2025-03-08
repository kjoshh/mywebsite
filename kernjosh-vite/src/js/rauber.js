import gsap from 'gsap';
import { initializeVimeoPlayerNoAudio } from './vimeo-helper-no-audio.js'; // Adjust path if needed
import './browser-detect.js';
import './applystuff.js';
import { initializeFirstSlider } from './slider.js';
import { initializeSecondSlider } from './rauber-second-slider.js';
document.addEventListener('DOMContentLoaded', function () {
  initializeVimeoPlayerNoAudio('lovememvid', 'closevid');

  const myVideo = document.getElementById('lovememvid');
  console.log('myVideo:', myVideo); // ADD THIS LINE
  const onloadDiv = document.getElementById('onloaddiv');
  const naviga = document.getElementById('naviga');
  gsap.to(onloadDiv, {
    // opacity: 0,
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
    document.body.style.overflow = 'auto'; // Unlock scrolling
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
    img.src = imgData.thumb; // Load only the thumbnail
    img.onload = () => {
      const targetImg = imgElements[shuffledIndex];
      if (targetImg) {
        targetImg.src = img.src; // Assign the thumbnail
        targetImg.dataset.full = imgData.full; // Store full image in data attribute
        // Use GSAP to animate opacity and scale
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
      // Update preloader count
      imagesLoadedCount++;
      const preloader = document.getElementById('preloader');
      const progressText = document.getElementById('progress-text');
      progressText.textContent = `loading... ${imagesLoadedCount} / 99`;
      // Hide preloader when all images are loaded
      if (imagesLoadedCount === imgElements.length) {
        // Step 1: Fade out the text
        gsap.to(progressText, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        });
        setTimeout(() => {
          // Step 2: Fade out the overlay
          gsap.to(preloader, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          });
          setTimeout(() => {
            preloader.remove(); // Remove preloader after fade-out
            // Step 3: Fade in the #naviga element
            naviga.style.display = 'flex'; // Ensure it's visible for the animation
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
          }, 400); // Wait for overlay fade-out to complete
        }, 400); // Delay after text fade-out
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
  //   const grainiwrapppp = document.getElementById("grainiwrapppp");
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
  let bounceAnimation; // Store the bouncing animation reference
  openText.addEventListener('click', () => {
    // Set all elements to opacity 0 initially
    gsap.set([baume, weg, tiere, rauberSchrift, arrowDown], {
      opacity: 0,
    });
    // Timeline for entrance animations
    const tl = gsap.timeline();
    // Start animations after a delay (650ms)
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
        ) // Overlap by 0.3s
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
          // Bounce animation starts after the arrow appears
          bounceAnimation = gsap.to(arrowDown, {
            y: 10,
            duration: 1,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        });
    }, 650);
    // Show and animate other elements
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
    // Kill the bouncing animation if active
    if (bounceAnimation) {
      bounceAnimation.kill();
      bounceAnimation = null; // Clear the reference
    }
    // Show interfaces again
    mainInterface.style.display = 'flex';
    secondInterface.style.display = 'flex';
    // Exit animations
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
    // handleVideoStateChange(true); // This will call the dummy function
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
    // handleVideoStateChange(false); //
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
  // Select all elements with the .textneww class
  const textnewwElements = document.querySelectorAll('.textneww');
  // Function to disable scrolling
  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  // Function to enable scrolling
  const enableScroll = () => {
    document.body.style.overflow = '';
  };
  // Add click event listener to all .textneww elements
  textnewwElements.forEach((element) => {
    element.addEventListener('click', () => {
      // Display the associated popup (assuming the popup logic is implemented)
      disableScroll();
    });
  });
  // Close popups when .crosssyofuckme or .crossfm elements are clicked
  const closeButtons = document.querySelectorAll('.crosssyofuckme, .crossfm');
  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Hide the popup (assuming the popup logic is implemented)
      enableScroll();
    });
  });
  const cross = document.getElementById('cross');
  //   const navigalast = document.getElementById("navigalast");

  if (!cross) {
    console.warn("Element with ID 'cross' not found.");
    return;
  }
  cross.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent immediate navigation
    const href = '/'; // Real URL
    sessionStorage.setItem('isInternalNavigation', 'true');
    console.log('Internal navigation state set in sessionStorage.');
    fetch(href, {
      mode: 'no-cors',
    })
      .then(() => console.log('Page preloaded:', href))
      .catch(() => console.warn('Failed to preload page:', href));
    cross.style.pointerEvents = 'none'; // Prevent multiple clicks
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
  // ============= 7) Lightbox Functionality (unchanged) =============
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const interfaceElement = document.getElementById('naviga');
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
  document.querySelectorAll('.image-container img').forEach((img) => {
    // Preload high-res image on hover
    img.addEventListener('mouseover', (e) => {
      const highResSrc = e.target.src.replace(
        '/rauber-thumb/rauber-thumb-',
        '/rauber-full/rauber-full-'
      );
      // Create a new image element to load the high-res image in the background
      const backgroundImage = new Image();
      backgroundImage.src = highResSrc; // Start loading the high-res image
      // Wait for the image to load fully before doing anything
      backgroundImage.onload = () => {
        // Clone the high-res image and add it to the DOM
        const clonedImage = e.target.cloneNode(true);
        clonedImage.src = highResSrc; // Make sure it's the high-res version
        clonedImage.style.position = 'absolute';
        clonedImage.style.top = '-9999px'; // Hide it off-screen
        clonedImage.style.left = '-9999px';
        clonedImage.style.width = 'auto';
        clonedImage.style.height = 'auto';
        clonedImage.style.visibility = 'hidden'; // Make sure it's hidden initially
        clonedImage.style.pointerEvents = 'none'; // Prevent interaction
        // Append the cloned image to the body, but keep it hidden
        document.body.appendChild(clonedImage);
      };
    });
    // Click event to open the lightbox and show the image
    img.addEventListener('click', (e) => {
      e.target.style.visibility = 'hidden'; // Hide the clicked thumbnail
      const container = e.target.closest('.image-container');
      // Populate currentImages with image elements inside the same container
      currentImages = Array.from(container.querySelectorAll('img'));
      // Get the high-res URL for the clicked image
      const highResSrc = e.target.src.replace(
        '/rauber-thumb/rauber-thumb-',
        '/rauber-full/rauber-full-'
      );
      // Get the index of the clicked high-res image
      currentIndex = currentImages
        .map((img) =>
          img.src.replace(
            '/rauber-thumb/rauber-thumb-',
            '/rauber-full/rauber-full-'
          )
        )
        .indexOf(highResSrc);
      // Update the counter
      updateCounter();
      // Set the lightbox image to the high-res image
      lightboxImage.src = highResSrc;
      // Hide interfaceElement
      gsap.to(interfaceElement, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          interfaceElement.style.display = 'none';
        },
      });
      // Clone the clicked image and animate it
      const clonedImage = e.target.cloneNode(true);
      clonedImage.src = highResSrc; // Ensure it's high-res
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
  // Close Lightbox
  function closeLightbox() {
    // Get the rect of the lightbox image
    const rect = lightboxImage.getBoundingClientRect();
    // Clone the lightbox image, and ensure it has the high-res path
    const clonedImage = lightboxImage.cloneNode(true);
    // Replace the thumbnail path with the high-res path
    const highResSrc = lightboxImage.src.replace(
      '/rauber-thumb/rauber-Thumb-',
      '/rauber-full/rauber-full-'
    );
    clonedImage.src = highResSrc; // Ensure cloned image is high-res
    // Append the cloned image to the body
    document.body.appendChild(clonedImage);
    // Set styles for cloned image (position, dimensions, etc.)
    clonedImage.style.position = 'fixed';
    clonedImage.style.top = `${rect.top}px`;
    clonedImage.style.left = `${rect.left}px`;
    clonedImage.style.width = `${rect.width}px`;
    clonedImage.style.height = `${rect.height}px`;
    clonedImage.style.zIndex =
      '999999999999999999999999999999999999999999999999991';
    clonedImage.style.objectFit = 'contain';
    // Find the corresponding image element in the container (not just the URL)
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
    // Animate the cloned image
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
    // Fade out the counter element
    gsap.to(counterElement, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        counterElement.style.display = 'none';
      },
    });
    // Show the interface element again
    interfaceElement.style.display = 'flex';
    gsap.to(interfaceElement, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.in',
    });
    // Hide the lightbox
    lightbox.style.display = 'none';
    // Remove the keydown event listener
    document.removeEventListener('keydown', handleKeyDown);
  }
  function showNextImage() {
    if (currentImages.length > 0) {
      // Fade out the current image (with a smooth transition)
      // Ensure the next image is visible before fading in
      currentImages[currentIndex].style.visibility = 'visible';
      // Fade in the next image
      gsap.to(currentImages[currentIndex], {
        opacity: 1,
        duration: 0.2, // Adjust the duration as needed
        ease: 'power2.inOut',
      });
      // Move to the next image
      currentIndex = (currentIndex + 1) % currentImages.length;
      gsap.to(currentImages[currentIndex], {
        opacity: 0,
        duration: 0.2, // Adjust the duration as needed
        ease: 'power2.inOut',
        onComplete: () => {
          // After fading out, hide it and reset visibility
          currentImages[currentIndex].style.visibility = 'hidden';
        },
      });
      // Update the counter
      updateCounter();
      // Get the high-res URL for the current image
      const currentHighResSrc = currentImages[currentIndex].src.replace(
        '/rauber-thumb/rauber-thumb-',
        '/rauber-full/rauber-full-'
      );
      // Set the high-res image to the lightbox
      lightboxImage.src = currentHighResSrc;
      // Clone the next image with high-res and animate (if needed)
      const clonedNextImage = document.createElement('img');
      clonedNextImage.src = currentImages[
        (currentIndex + 1) % currentImages.length
      ].src.replace('/rauber-thumb/rauber-thumb-', '/rauber-full/rauber-full-');
      document.body.appendChild(clonedNextImage);
      // Optional animation code for the cloned image...
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
      // Move to the previous image
      currentImages[currentIndex].style.visibility = 'visible';
      // Fade in the next image
      gsap.to(currentImages[currentIndex], {
        opacity: 1,
        duration: 0.2, // Adjust the duration as needed
        ease: 'power2.inOut',
      });
      // Move to the next image
      currentIndex =
        (currentIndex - 1 + currentImages.length) % currentImages.length;
      gsap.to(currentImages[currentIndex], {
        opacity: 0,
        duration: 0.2, // Adjust the duration as needed
        ease: 'power2.inOut',
        onComplete: () => {
          // After fading out, hide it and reset visibility
          currentImages[currentIndex].style.visibility = 'hidden';
        },
      });
      updateCounter();
      // Get the high-res URL for the current image
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
});
