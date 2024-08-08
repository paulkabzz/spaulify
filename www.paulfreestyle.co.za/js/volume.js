const elements = {
    volumeSlider: document.getElementById("volumeSlider"),
    progress: document.getElementsByTagName("progress")[0]
}

elements.progress.value = 1;

/**
 * This function updates the volume of the audio player and the progress bar.
 * It listens for changes in the volume slider and updates the audio volume and progress bar accordingly.
 *
 * @param {HTMLElement} volumeSlider - The HTML element representing the volume slider.
 * @param {HTMLProgressElement} progress - The HTML progress element representing the progress bar.
 * @param {HTMLAudioElement} mainAudio - The HTML audio element representing the main audio player.
 *
 * @returns {void}
 */
function updateVolumeAndProgress(volumeSlider, progress, mainAudio) {
  volumeSlider.addEventListener("input", function () {
    progress.value = this.value;
    mainAudio.volume = this.value;
  });
}

volumeSlider.addEventListener(
  "input",
  updateVolumeAndProgress(elements.volumeSlider, elements.progress, mainAudio)
);
