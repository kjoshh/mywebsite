import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', function () {
  const realLinks = document.querySelectorAll('.link');

  const interfi2 = document.querySelector('.outsidebutton');
  const menuovvv = document.getElementById('menuoverlay');
  const xwrap = document.querySelector('._100wrap');
  const fixedWrap = document.querySelector('.fixed-100');
  const texts = document.querySelectorAll('.linkwrap');

  function resetAnimation() {
    fixedWrap.style.display = 'none';
    if (interfi2) interfi2.style.opacity = '1';
    if (menuovvv) menuovvv.style.height = '22.5px';
    xwrap.style.height = '100vh';
    xwrap.style.top = 'auto';
    xwrap.style.bottom = '0';

    gsap.set(texts, { opacity: 1, y: 0 });
    gsap.set(interfi2, { y: 0, opacity: 1, height: 'auto' });
    gsap.set(menuovvv, { height: '22.5px' });
    gsap.set(xwrap, { height: '100vh', top: 'auto', bottom: '0' });
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      resetAnimation();
    }
  });

  realLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const href = this.getAttribute('href');
      const isHashLink = href.startsWith('#');
      const isJavaScriptLink = href.startsWith('javascript:');
      const hasTargetBlank = this.getAttribute('target') === '_blank';
      const isDownloadLink = this.hasAttribute('download');
      const allLinks = document.querySelectorAll('a');

      if (isHashLink || isJavaScriptLink || hasTargetBlank || isDownloadLink) {
        return;
      }

      event.preventDefault();
      fixedWrap.style.display = 'block';

      const xhr = new XMLHttpRequest();
      xhr.open('GET', href);
      xhr.onload = function () {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xhr.responseText, 'text/html');

        doc.querySelectorAll('script[src]').forEach((script) => {
          const request = new XMLHttpRequest();
          request.open('GET', script.src);
          request.send();
        });

        doc.querySelectorAll('link[rel="stylesheet"]').forEach((stylesheet) => {
          const request = new XMLHttpRequest();
          request.open('GET', stylesheet.href);
          request.send();

          fetch(stylesheet.href)
            .then((response) => response.text())
            .then((css) => {
              const urlPattern = /url\(['"]?([^'"()]+)['"]?\)/g;
              let match;
              while ((match = urlPattern.exec(css)) !== null) {
                const imageUrl = match[1];
                if (!imageUrl.includes('/Archive/')) {
                  fetch(imageUrl);
                }
              }
            });
        });

        doc
          .querySelectorAll('img[src]:not(.lazy-image):not([data-src])')
          .forEach((img) => {
            if (img.src.includes('/Archive/')) {
              return;
            }

            const request = new XMLHttpRequest();
            request.open('GET', img.src);
            request.send();
          });
      };
      xhr.send();

      gsap.to(texts, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.05,
        ease: 'power3.inOut',
      });

      gsap.to(interfi2, {
        y: -10,
        opacity: 0,
        height: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: 'power3.inOut',
      });

      gsap.to(menuovvv, {
        height: '0px',
        duration: 0.15,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.to(xwrap, {
            height: 0,
            top: 0,
            bottom: 'auto',
            duration: 1,
            ease: 'power4.inOut',
            onComplete: () => {
              window.location.href = href;
            },
          });
        },
      });

      allLinks.forEach(function (lnk) {
        lnk.classList.add('disabled');
      });
    });
  });
});
