//browser-detect v3

import Typed from 'typed.js'; // Import Typed.js

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
    const mobileText =
      'oh no, you are using a phone :( you need a larger device, like a laptop with chrome in order to enter this page';
    overlay.classList.remove('hidden');
    content.classList.add('mobile');
    setTimeout(() => {
      mobileWhyLink.classList.remove('hidden');
      setTimeout(() => {
        mobileWhyLink.style.opacity = '1';
      }, 200);
    }, 4500);

    // Typewriter effect for mobile message
    new Typed('#device-check-message', {
      strings: [mobileText],
      typeSpeed: 25,
      backSpeed: 25,
      loop: false,
      showCursor: false, // Disable the cursor
    });
  } else if (isDesktopSafari()) {
    console.log('issafariiiiii');
    const browserText =
      'oh no, you are using safari :( you need a different browser like chrome in order to enter this page.';
    overlay.classList.remove('hidden');
    whyLink.classList.remove('hidden');
    setTimeout(() => {
      whyLink.classList.remove('hidden');
      setTimeout(() => {
        whyLink.style.opacity = '1';
      }, 200);
    }, 3700);

    // Typewriter effect for browser message
    new Typed('#device-check-message', {
      strings: [browserText],
      typeSpeed: 25,
      backSpeed: 25,
      loop: false,
      showCursor: false, // Disable the cursor
    });
  } else {
    console.log('isnohtinginging');
    // If it's not a mobile device and not desktop Safari, hide the overlay
    overlay.classList.add('hidden');
  }

  whyLink.addEventListener('click', function (event) {
    const browserExplanation = document.querySelector(
      '.browser-check-explanation-text'
    );
    const browserdevicecheckoverlay = document.getElementById(
      'browser-check-explanation'
    );
    event.preventDefault(); // Prevent the default link behavior
    browserdevicecheckoverlay.classList.toggle('show'); // Toggle the explanation visibility

    if (browserdevicecheckoverlay.classList.contains('show')) {
      const bexplanationText = browserExplanation.textContent; // Get the text content
      console.log('Explanation text:', bexplanationText); // Log the explanation text
      browserExplanation.innerHTML = ''; // Clear existing content

      // Ensure Typed is initialized after clearing content
      new Typed(browserExplanation, {
        strings: [bexplanationText],
        typeSpeed: 25,
        backSpeed: 25,
        loop: false,
        showCursor: false, // Disable the cursor
      });
    } else {
      browserExplanation.innerHTML = ''; // Clear content if hidden
    }
  });

  mobileWhyLink.addEventListener('click', function (event) {
    const mobileExplanation = document.querySelector(
      '.mobile-check-explanation-text'
    );
    const devicecheckoverlay = document.getElementById(
      'mobile-check-explanation'
    );
    const weirdbrowser = document.getElementById('weirdbrowservideo');
    event.preventDefault(); // Prevent the default link behavior
    devicecheckoverlay.classList.toggle('show'); // Toggle the explanation visibility

    // Add typewriter effect for mobile explanation text
    if (devicecheckoverlay.classList.contains('show')) {
      const explanationText = mobileExplanation.textContent; // Get the text content
      console.log('Explanation text:', explanationText); // Log the explanation text
      mobileExplanation.innerHTML = ''; // Clear existing content
      new Typed(mobileExplanation, {
        strings: [explanationText],
        typeSpeed: 25,
        backSpeed: 25,
        loop: false,
        showCursor: false, // Disable the cursor
      });
    } else {
      mobileExplanation.innerHTML = ''; // Clear content if hidden
    }
    setTimeout(() => {
      weirdbrowser.style.visibility = 'visible'; // Make the video visible

      weirdbrowser.play(); // Start playing the video
    }, 4000);
  });
});
