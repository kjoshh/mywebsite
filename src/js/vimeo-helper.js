import { handleVideoStateChange } from '../../src/js/video-state-manager.js';

function initializeVimeoPlayer(iframeId, closeButtonId) {
  const videoIframe = document.getElementById(iframeId);
  const videoCloseButton = document.getElementById(closeButtonId);

  if (videoIframe) {
    function postMessageToVimeo(action, value) {
      const data = { method: action };
      if (value !== undefined) {
        data.value = value;
      }
      videoIframe.contentWindow.postMessage(
        JSON.stringify(data),
        'https://player.vimeo.com'
      );
    }

    if (videoCloseButton) {
      videoCloseButton.addEventListener('click', function () {
        handleVideoStateChange(false);
        postMessageToVimeo('pause');
      });
    } else {
      console.error(`Error: #${closeButtonId} button not found.`);
    }
  } else {
    console.error(`Error: #${iframeId} iframe not found.`);
  }
}

export { initializeVimeoPlayer };
