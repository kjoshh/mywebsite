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

  // Generate the image URLs
  const imageUrls = Array.from(
    {
      length: 88,
    },
    (_, i) => ({
      thumb: `images/Fuck-Me/fuck-me-thumb/fuck-me-thumb-${i + 1}.jpg`,
      full: `images/Fuck-Me/fuck-me-full/fuck-me-full-${i + 1}.jpg`,
    })
  );
  // Shuffle function to randomize the indices
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  // Shuffle the image URLs
  const shuffledIndices = Array.from(
    {
      length: imageUrls.length,
    },
    (_, i) => i
  );
  shuffleArray(shuffledIndices);
  // Create a preloader element
  const preloader = document.createElement('div');
  preloader.id = 'preloader';
  preloader.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.65); /* Slightly transparent overlay */
    color: white;
    display: flex;
    font-family: Neueeigene;
    letter-spacing: -1.5;
    align-items: flex-end;
    justify-content: right;
    font-size: 20px;
    z-index: 9999;
    transition: opacity 1.5s ease; /* Overlay fade-out */
    `;
  preloader.innerHTML = `<span id="progress-text" style=" margin:2.5vmin; transition: opacity 0.3s ease;">loading... 0/88</span>`;
  document.body.appendChild(preloader);
  // Track loaded images
  let imagesLoadedCount = 0;
  // Select all image elements (the imgfuck-me elements)
  const imgElements = document.querySelectorAll('.fuck-me-img');
  // Load images in random order and assign them to the image elements based on the original index
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
      const progressText = document.getElementById('progress-text');

      progressText.textContent = `loading... ${imagesLoadedCount}/88`;
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
            onComplete: () => {
              preloader.style.display = 'none';
            },
          });
        }, 400); // Delay after text fade-out
      }
    };
  });
  //   const navigalast = document.getElementById("navigalast");
  function typeWriterEffect(element, text, speed = 35) {
    element.innerHTML = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        if (text.substring(i, i + 4) === '<br>') {
          element.innerHTML += '<br>';
          i += 4;
        } else {
          element.innerHTML += text.charAt(i);
          i++;
        }
        setTimeout(type, speed);
      }
    }
    type();
  }
  // const secretSection = document.getElementById("secretSection");
  const passwordInput = document.getElementById('passwordInput');
  const checkPasswordBtn = document.getElementById('checkPasswordBtn');
  const firsthint = document.getElementById('firsthint');
  const secondhint = document.getElementById('secondhint');
  const contatainer = document.querySelector('.password-container');
  const checkimg = document.getElementById('checkimg');
  const hintLink = document.getElementById('hintLink');
  const hintText = document.getElementById('hinttext');
  function checkPassword() {
    gsap.to(checkimg, {
      scale: 0.96,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
    const enteredPassword = passwordInput.value;
    if (enteredPassword === 'bad lives') {
      const onloadDiv = document.querySelector('.onload-div');
      const naviga = document.getElementById('naviga');
      const wholeplayer = document.getElementById('wholeplayer');
      gsap.to(contatainer, {
        opacity: 0,
        y: -15,
        duration: 1,
        ease: 'power3.inOut',
      });
      gsap.to(onloadDiv, {
        height: '0%',
        duration: 1,
        delay: 0.5,
        ease: 'power4.inOut',
        onComplete: () => {
          onloadDiv.style.display = 'none';
          naviga.style.display = 'flex';
          gsap.fromTo(
            [naviga, wholeplayer],
            {
              opacity: 0,
              y: 17,
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
    } else {
      alert('That is not the correct password.');
    }
  }
  checkPasswordBtn.addEventListener('click', checkPassword);
  passwordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      checkPassword();
    }
  });
  hintLink.addEventListener('click', (event) => {
    event.preventDefault();
    if (hintText.classList.contains('hidden')) {
      hintText.classList.remove('hidden');
      firsthint.classList.add('hidden');
      secondhint.classList.remove('hidden');
      const hintContent = `Nothing works<br>
      Nothing works for everyone<br>
      Good stories are _________`;
      typeWriterEffect(hintText, hintContent, 50);
    } else {
      hintText.classList.add('hidden');
      firsthint.classList.remove('hidden');
      secondhint.classList.add('hidden');
    }
  });
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
        '/fuck-me-thumb/fuck-me-thumb-',
        '/fuck-me-full/fuck-me-full-'
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
        '/fuck-me-thumb/fuck-me-thumb-',
        '/fuck-me-full/fuck-me-full-'
      );
      // Get the index of the clicked high-res image
      currentIndex = currentImages
        .map((img) =>
          img.src.replace(
            '/fuck-me-thumb/fuck-me-thumb-',
            '/fuck-me-full/fuck-me-full-'
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
      '/fuck-me-thumb/fuck-me-Thumb-',
      '/fuck-me-full/fuck-me-full-'
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
          '/fuck-me-thumb/fuck-me-thumb-',
          '/fuck-me-full/fuck-me-full-'
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
        '/fuck-me-thumb/fuck-me-thumb-',
        '/fuck-me-full/fuck-me-full-'
      );
      // Set the high-res image to the lightbox
      lightboxImage.src = currentHighResSrc;
      // Clone the next image with high-res and animate (if needed)
      const clonedNextImage = document.createElement('img');
      clonedNextImage.src = currentImages[
        (currentIndex + 1) % currentImages.length
      ].src.replace(
        '/fuck-me-thumb/fuck-me-thumb-',
        '/fuck-me-full/fuck-me-full-'
      );
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
        '/fuck-me-thumb/fuck-me-thumb-',
        '/fuck-me-full/fuck-me-full-'
      );
      // Set the high-res image to the lightbox
      lightboxImage.src = currentHighResSrc;
      // Clone the previous image with high-res and animate (if needed)
      const clonedPrevImage = document.createElement('img');
      clonedPrevImage.src = currentImages[
        (currentIndex - 1 + currentImages.length) % currentImages.length
      ].src.replace(
        '/fuck-me-thumb/fuck-me-thumb-',
        '/fuck-me-full/fuck-me-full-'
      );
      document.body.appendChild(clonedPrevImage);
      // Optional animation code for the cloned image...
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

  //   const passwordmain = document.querySelector(".passwordmain");
  //   const submitform = document.querySelector(".submitform");
  const navigalast = document.getElementById('navigalast');
  const pwembed = document.getElementById('pwembed');
  const textDiv = document.getElementById('textdiv');
  const openText = document.getElementById('opentext');
  const closeText = document.getElementById('closetext');
  const textInside = document.getElementById('textinside');
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
  gsap.set(textInside, {
    opacity: 0,
    y: 25,
  });
  gsap.fromTo(
    [pwembed, navigalast],
    {
      opacity: 0,
      y: 15,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.inOut',
    }
  );
  openText.addEventListener('click', () => {
    backStuff.style.display = 'block';
    gsap.to(textDiv, {
      y: '0vh',
      duration: 0.65,
      ease: 'power4.inOut',
    });
    gsap.to(textInside, {
      opacity: 1,
      y: 0,
      delay: 0.35,
      duration: 0.3,
      ease: 'power3.inOut',
    });
    gsap.to(backStuff, {
      opacity: 1,
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
    mainInterface.style.display = 'flex';
    secondInterface.style.display = 'flex';
    gsap.to(textInside, {
      opacity: 0,
      y: 25,
      duration: 0.3,
      ease: 'power3.inOut',
    });
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
      ease: 'power3.inOut',
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

  const handyTrigger = document.querySelector('#handytrigger');
  const handyFinal = document.querySelector('#handyyo');
  if (handyTrigger && handyFinal) {
    handyTrigger.addEventListener('mouseover', function () {
      handyFinal.style.display = 'block';
      gsap.to(handyTrigger, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      });
      gsap.to(handyFinal, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.inOut',
      });
    });
    handyTrigger.addEventListener('mouseout', function () {
      handyFinal.style.display = 'block';
      gsap.to(handyTrigger, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.inOut',
      });
      gsap.to(handyFinal, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          handyFinal.style.display = 'none';
        },
      });
    });
  }
  const cross = document.getElementById('cross');
  //   const navigalast = document.getElementById("navigalast");
  //   const pwembed = document.getElementById("pwembed");
  const onloadDiv = document.querySelector('.onload-div');
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
    if (pwembed) {
      gsap.to(pwembed, {
        opacity: 0,
        y: -15,
        duration: 1,
        ease: 'power3.inOut',
        onComplete: () => {
          window.location.href = href;
        },
      });
    }
    const naviga = document.getElementById('naviga');
    const wholeplayer = document.getElementById('wholeplayer');
    gsap.to([naviga, wholeplayer], {
      opacity: 0,
      y: -17,
      duration: 0.5,
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
  // Utility function to get mouse position relative to the window
  function getMousePos(ev) {
    return {
      x: ev.clientX,
      y: ev.clientY,
    };
  }
  // Utility function for linear interpolation (lerp)
  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }
  let mouse = {
    x: 0,
    y: 0,
  };

  window.addEventListener('mousemove', (ev) => (mouse = getMousePos(ev)));
  class Cursor {
    constructor() {
      // Grab the image with the ID #handyyo
      this.image = document.querySelector('#handyyo');
      this.cursorConfigs = {
        x: {
          previous: 0,
          current: 0,
          amt: 0.2,
        },
        y: {
          previous: 0,
          current: 0,
          amt: 0.2,
        },
      };
      // Initialize mouse movement listener
      window.addEventListener('mousemove', this.onMouseMoveEv.bind(this));
    }
    onMouseMoveEv() {
      // Update current mouse position
      this.cursorConfigs.x.current = mouse.x;
      this.cursorConfigs.y.current = mouse.y;
      // Start the animation loop
      requestAnimationFrame(() => this.render());
    }
    render() {
      // Apply lerp to smooth the mouse movement
      for (const key in this.cursorConfigs) {
        this.cursorConfigs[key].previous = lerp(
          this.cursorConfigs[key].previous,
          this.cursorConfigs[key].current,
          this.cursorConfigs[key].amt
        );
      }
      // Check if the image exists
      if (this.image) {
        const imgWidth = this.image.offsetWidth;
        const imgHeight = this.image.offsetHeight;
        // Use GSAP to animate the image's position, adjusting for its width and height
        gsap.to(this.image, {
          duration: 0.2, // Smooth transition duration
          x: this.cursorConfigs.x.previous - imgWidth / 2, // Offset by half the image's width
          y: this.cursorConfigs.y.previous - imgHeight / 2, // Offset by half the image's height
          ease: 'power3.out', // Easing for smooth motion
        });
      }
      // Keep the animation going
      requestAnimationFrame(() => this.render());
    }
  }
  // Initialize the Cursor class
  const cursor = new Cursor();

  import('lottie-web')
    .then((module) => {
      const vidDiv = document.querySelector('.videobackinout');

      const bodymovin = module.default;
      const naviga = document.getElementById('naviga');
      const loveMeTracklist = [
        {
          name: 'Beach Life-In-Death',
          artist: 'Car Seat Headrest',
          path: 'audio/Car+Seat+Headrest+-+_Beach+Life-In-Death_+(Official+Audio).mp3',
        },
        {
          name: 'Missing Pieces',
          artist: 'Voxtrot',
          path: 'audio/MissingPiecesVoxtrot.mp3',
        },
      ];

      const player1 = new AudioPlayer(
        '.music-player-container',
        loveMeTracklist,
        bodymovin
      );

      initializeVideoStateManager(player1);

      // Call initializeFirstSlider when the openbook button is clicked
      const triggerElement1 = document.getElementById('openbook');
      triggerElement1.addEventListener('click', () => {
        initializeFirstSlider();
      });

      // Get the openvid and closeVid elements
      const openVid = document.getElementById('openvid');
      const closeVid = document.getElementById('closevid');

      // Attach the event listener to the openvid
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
});

export {};
