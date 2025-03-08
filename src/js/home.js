// index.js

// Function to check if the user is on a mobile device
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Function to check if the user is on desktop Safari
function isDesktopSafari() {
  const userAgent = navigator.userAgent;
  return (
    userAgent.indexOf('Safari') > -1 &&
    userAgent.indexOf('Chrome') === -1 &&
    !isMobileDevice()
  );
}

if (isMobileDevice()) {
  console.log('Loading mobile detection script...');
  import('./mobile-detect.js')
    .then((module) => {
      console.log('Mobile detection script loaded.');
    })
    .catch((err) => {
      console.error('Error loading mobile detection script:', err);
    });
} else if (isDesktopSafari()) {
  console.log('Loading browser detection script...');
  import('./browser-detect.js')
    .then((module) => {
      console.log('Browser detection script loaded.');
    })
    .catch((err) => {
      console.error('Error loading browser detection script:', err);
    });
}
