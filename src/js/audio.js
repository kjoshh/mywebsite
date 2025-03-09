// audio.js
class AudioPlayer {
  constructor(containerSelector, trackList, bodymovin) {
    this.musicPlayer = document.querySelector(containerSelector);
    console.log("musicPlayer:", this.musicPlayer); // Check this value

    if (!this.musicPlayer) {
      console.error("Error: .music-player-container not found in the DOM.");
      return; // Stop initialization if the container is not found
    }

    this.togglePlayer = this.musicPlayer.querySelector(".toggle-player");

    this.containerSelector = containerSelector;
    this.trackList = trackList;
    this.bodymovin = bodymovin; // Store bodymovin

    // Initialize the player after the DOM is loaded
    this.initializePlayer();
  }

  initializePlayer() {
    this.musicPlayer = document.querySelector(this.containerSelector);
    if (!this.musicPlayer) {
      console.error("Error: .music-player-container not found in the DOM.");
      return; // Stop initialization if the container is not found
    }

    this.togglePlayer = this.musicPlayer.querySelector(".toggle-player");
    this.trackInfo = this.musicPlayer.querySelector(".track-info");
    this.trackName = this.musicPlayer.querySelector(".track-name");
    this.trackArtist = this.musicPlayer.querySelector(".track-artist");
    this.trackNav = this.musicPlayer.querySelector(".track-nav");
    this.playPauseBtn = this.musicPlayer.querySelector(".playpause-track");
    this.nextBtn = this.musicPlayer.querySelector(".next-track");
    this.prevBtn = this.musicPlayer.querySelector(".prev-track");
    this.soundBars = this.musicPlayer.querySelector(".sound-bars");

    // Check if all required elements are found
    if (
      !this.togglePlayer ||
      !this.trackInfo ||
      !this.trackName ||
      !this.trackArtist ||
      !this.trackNav ||
      !this.playPauseBtn ||
      !this.nextBtn ||
      !this.prevBtn ||
      !this.soundBars
    ) {
      console.error("Error: One or more audio player elements not found.");
      return; // Stop initialization if any element is missing
    }

    this.trackIndex = 0;
    this.isPlaying = false;
    this.isHidden = true;
    this.wasPlayingBeforeNext = false;
    this.currentTrack = document.createElement("audio");
    this.currentTrack.id = "audio-player";

    this.soundBarsLottie = this.bodymovin.loadAnimation({
      container: this.soundBars,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: "/audio-ani.json",
    });

    this.loadTrack(this.trackIndex);

    this.togglePlayer.addEventListener("click", () =>
      this.togglePlayerVisibility()
    );
    // Add event listeners to the buttons
    this.playPauseBtn.addEventListener("click", () => this.playPauseTrack());
    this.nextBtn.addEventListener("click", () => this.nextTrack());
    this.prevBtn.addEventListener("click", () => this.prevTrack());
  }

  togglePlayerVisibility() {
    this.isHidden = !this.isHidden;
    if (this.isHidden) {
      this.musicPlayer.classList.add("hide");
    } else {
      this.musicPlayer.classList.remove("hide");
    }
  }

  loadTrack(trackIndex) {
    this.currentTrack.src = this.trackList[trackIndex].path;
    this.currentTrack.load();
    this.trackName.textContent = this.trackList[trackIndex].name;
    this.trackArtist.textContent = this.trackList[trackIndex].artist;
  }

  playPauseTrack() {
    if (!this.isPlaying) {
      this.playTrack();
    } else {
      this.pauseTrack();
    }
  }

  playTrack() {
    this.currentTrack.play();
    this.isPlaying = true;
    this.playPauseBtn.querySelector("img").src = "images/pauseaudio.png";
    this.soundBarsLottie.playSegments([0, 30], true);
  }

  pauseTrack() {
    this.currentTrack.pause();
    this.isPlaying = false;
    this.playPauseBtn.querySelector("img").src = "images/playaudio.png";
    this.soundBarsLottie.stop();
  }

  nextTrack() {
    if (this.trackIndex < this.trackList.length - 1) {
      this.trackIndex += 1;
    } else {
      this.trackIndex = 0;
    }
    this.loadTrack(this.trackIndex);
    this.playTrack();
  }

  prevTrack() {
    if (this.trackIndex > 0) {
      this.trackIndex -= 1;
    } else {
      this.trackIndex = this.trackList.length - 1;
    }
    this.loadTrack(this.trackIndex);
    this.playTrack();
  }

  openSpotify() {
    window.open(
      "https://open.spotify.com/playlist/0ZZLX7n3iG6qFlkl5KKHsG?si=b9bc0f6c47ea4f03",
      "_blank"
    );
  }

  handleVideoStateChange(videoIsPlaying) {
    if (videoIsPlaying) {
      if (this.isPlaying) {
        this.wasPlayingBeforeVideoStart = true;
        this.pauseTrack();
      } else {
        this.wasPlayingBeforeVideoStart = false;
      }
    } else {
      if (this.wasPlayingBeforeVideoStart) {
        this.playTrack();
      }
    }
  }
}

export default AudioPlayer;
