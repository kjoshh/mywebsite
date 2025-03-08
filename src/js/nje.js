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
    // height: "0%",
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
  // Generate the image URLs
  const imageUrls = Array.from(
    {
      length: 63,
    },
    (_, i) => ({
      thumb: `images/Nje/nje-full/nje-full-${i + 2}.jpg`,
      full: `images/Nje/nje--full/nje-full-${i + 2}.jpg`,
    })
  );

  // Your code to handle these URLs here
  console.log(imageUrls);
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
        opacity:0;
        display: flex;
        font-family: Neueeigene;
        letter-spacing: -1.5;
        align-items: flex-end;
        justify-content: right;
        font-size: 20px;
        z-index: 9999;
        transition: opacity 1.5s ease; /* Overlay fade-out */
      `;
  preloader.innerHTML = `<span id="progress-text" style=" margin:2.5vmin; transition: opacity 0.3s ease;">loading... 0/63</span>`;
  document.body.appendChild(preloader);
  gsap.to(preloader, {
    opacity: 1,
    duration: 1,
    ease: 'power4.inOut',
  });
  // Track loaded images
  let imagesLoadedCount = 0;
  // Select all image elements (the imgfuck-me elements)
  const imgElements = document.querySelectorAll('.nje-img');
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
      const naviga = document.getElementById('naviga');
      progressText.textContent = `loading... ${imagesLoadedCount}/63`;
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
        }, 400); // Delay after text fade-out
      }
    };
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
        '/nje-thumb/nje-thumb-',
        '/nje-full/nje-full-'
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
        '/nje-thumb/nje-thumb-',
        '/nje-full/nje-full-'
      );
      // Get the index of the clicked high-res image
      currentIndex = currentImages
        .map((img) =>
          img.src.replace('/nje-thumb/nje-thumb-', '/nje-full/nje-full-')
        )
        .indexOf(highResSrc);
      // Update the counter
      updateCounter();
      // Set the lightbox image to the high-res image
      lightboxImage.src = highResSrc;
      // Hide interfaceElement
      gsap.to([interfaceElement, secondmainInterface], {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          interfaceElement.style.display = 'none';
          secondmainInterface.style.display = 'none';
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
      '/nje-thumb/nje-Thumb-',
      '/nje-full/nje-full-'
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
        img.src.replace('/nje-thumb/nje-thumb-', '/nje-full/nje-full-') ===
        highResSrc
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
    secondmainInterface.style.display = 'flex';
    interfaceElement.style.display = 'flex';
    gsap.to([interfaceElement, secondmainInterface], {
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
        '/nje-thumb/nje-thumb-',
        '/nje-full/nje-full-'
      );
      // Set the high-res image to the lightbox
      lightboxImage.src = currentHighResSrc;
      // Clone the next image with high-res and animate (if needed)
      const clonedNextImage = document.createElement('img');
      clonedNextImage.src = currentImages[
        (currentIndex + 1) % currentImages.length
      ].src.replace('/nje-thumb/nje-thumb-', '/nje-full/nje-full-');
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
        '/nje-thumb/nje-thumb-',
        '/nje-full/nje-full-'
      );
      // Set the high-res image to the lightbox
      lightboxImage.src = currentHighResSrc;
      // Clone the previous image with high-res and animate (if needed)
      const clonedPrevImage = document.createElement('img');
      clonedPrevImage.src = currentImages[
        (currentIndex - 1 + currentImages.length) % currentImages.length
      ].src.replace('/nje-thumb/nje-thumb-', '/nje-full/nje-full-');
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
});
