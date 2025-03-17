import Typed from 'typed.js';

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

  function isNotChromeOrFirefox() {
    const userAgent = navigator.userAgent;
    const isChrome = userAgent.indexOf('Chrome') > -1;
    const isFirefox = userAgent.indexOf('Firefox') > -1;
    return !isChrome && !isFirefox;
  }

  if (isMobileDevice()) {
    console.log('ismobileeee');
    const mobileBrowserText =
      'oh no, you are using a phone :( you need a larger device, like a laptop with chrome in order to enter this page';
    overlay.classList.remove('hidden');
    content.classList.add('mobile');
    message.textContent = mobileBrowserText;
    setTimeout(() => {
      mobileWhyLink.classList.remove('hidden');
      setTimeout(() => {
        mobileWhyLink.style.opacity = '1';
      }, 200);
    }, 10);
  } else if (isNotChromeOrFirefox()) {
    console.log('isnotchromeorfirefox');
    const browserText =
      'oh no, you are using safari :( you need chrome or firefox in order to enter this page.';
    overlay.classList.remove('hidden');
    whyLink.classList.remove('hidden');

    new Typed('#device-check-message', {
      strings: [browserText],
      typeSpeed: 25,
      backSpeed: 25,
      loop: false,
      showCursor: false,
    });

    setTimeout(() => {
      whyLink.classList.remove('hidden');
      setTimeout(() => {
        whyLink.style.opacity = '1';
      }, 200);
    }, 3700);
  } else {
    console.log('isnohtinginging');

    overlay.classList.add('hidden');
  }

  whyLink.addEventListener('click', function (event) {
    const browserExplanation = document.querySelector(
      '.browser-check-explanation-text'
    );
    const browserdevicecheckoverlay = document.getElementById(
      'browser-check-explanation'
    );
    event.preventDefault();
    browserdevicecheckoverlay.classList.toggle('show');
    visibility;

    if (browserdevicecheckoverlay.classList.contains('show')) {
      const bexplanationText = browserExplanation.textContent;
      console.log('Explanation text:', bexplanationText);
      browserExplanation.innerHTML = '';

      new Typed(browserExplanation, {
        strings: [bexplanationText],
        typeSpeed: 25,
        backSpeed: 25,
        loop: false,
        showCursor: false,
      });
    } else {
      browserExplanation.innerHTML = '';
    }
  });

  mobileWhyLink.addEventListener('click', function (event) {
    const devicecheckoverlay = document.getElementById(
      'mobile-check-explanation'
    );
    event.preventDefault();
    devicecheckoverlay.classList.toggle('show');
  });
});
