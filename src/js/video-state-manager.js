// video-state-manager.js

import AudioPlayer from "./audio.js"; // Adjust path if needed

let handleVideoStateChange;

export function initializeVideoStateManager(audioPlayer) {
  handleVideoStateChange = function (videoIsPlaying) {
    audioPlayer.handleVideoStateChange(videoIsPlaying);
  };
  return handleVideoStateChange;
}

export { handleVideoStateChange };
