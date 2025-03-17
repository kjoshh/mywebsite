import AudioPlayer from './audio.js';

let handleVideoStateChange;

export function initializeVideoStateManager(audioPlayer) {
  handleVideoStateChange = function (videoIsPlaying) {
    audioPlayer.handleVideoStateChange(videoIsPlaying);
  };
  return handleVideoStateChange;
}

export { handleVideoStateChange };
