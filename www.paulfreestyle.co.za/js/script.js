class MusicPlayer {
    constructor() {
        this.wrapper = document.querySelector('.wrapper');
        this.musicImg = document.querySelectorAll('.album-img');
        this.musicName = document.querySelectorAll('.name');
        this.artist = document.querySelectorAll('.artist');
        this.playPauseButton = document.querySelectorAll('.play-pause');
        this.prev = document.querySelector('#prev');
        this.next = document.querySelector('#next');
        this.mainAudio = document.querySelector('#main-audio');
        this.progressArea = document.querySelector('.progress-area');
        this.progressBar = document.querySelector('.progress-bar');
        this.lyrics = document.querySelector('.lyric-text');
        this.smallPlayButton = document.querySelector('.small-play');
        this.header = document.querySelector('.header');
        this.headerOverlay = document.querySelector('.header-overlay');
        this.headerBtn = document.querySelector('.header-btn');
        this.feature = document.querySelector('.feature');

        this.songsDir = '../assets/songs/';
        this.artistsDir = '../assets/images/artists/';
        this.albumsDir = '../assets/images/album/';
        this.musicIndex = 0;
        this.isPaused = true;

        this.bindEvents();
        this.loadMusic(this.musicIndex);
        this.loadSettings();
    }

    /**
 * Adds event listeners to the DOM elements.
 */
bindEvents() {
  window.addEventListener('load', () => this.onWindowLoad());
  window.addEventListener('unload', () => this.onWindowUnload());
  this.playPauseButton.forEach(button => button.onclick = () => this.togglePlayPause());
  this.smallPlayButton.onclick = () => this.togglePlayPause();
  this.prev.onclick = () => this.prevSong();
  this.next.onclick = () => this.nextSong();
  this.mainAudio.ontimeupdate = (e) => this.updateProgress(e);
  this.progressArea.onclick = (e) => this.setProgress(e);
  this.mainAudio.onended = () => this.nextSong();
}

    /**
 * Loads and plays the music at the given index from the musicArray.
 *
 * @param {number} index - The index of the music to be loaded.
 * @returns {void}
 */
loadMusic(index) {
    // Check if the music at the given index exists
    if (!this.musicArray[index]) {
        console.error(`There's no song at index: ${index}`);
        return;
    }

    // Get the music object at the given index
    const song = this.musicArray[index];

    // Update the document title with the song name and artist
    document.title = `${song.name} - ${song.artist}`;

    // Update the music name, artist, and image for each element
    this.musicName.forEach(name => name.textContent = song.name);
    this.artist.forEach(artist => artist.textContent = song.artist);
    this.musicImg.forEach(img => img.src = `${this.albumsDir}${song.img}`);

    // Update the featured artist text
    this.feature.textContent = song.ft;

    // Update the lyrics text with the song lyrics, splitting by newline characters
    this.lyrics.innerHTML = song.lyrics.split('\n').join('<br /><br />');

    // Update the main audio source with the song source
    this.mainAudio.src = `${this.songsDir}${song.source}`;

    // Store the last played song name in local storage
    localStorage.setItem('lastPlayedSongName', song.name.toLowerCase());

    // Load the dominant color of the album image
    this.loadDominantColor(`${this.albumsDir}${song.img}`);
}

    /**
 * Loads the dominant color of the album image using the ColorThief library.
 *
 * @param {string} imagePath - The path to the album image.
 * @returns {void}
 */
loadDominantColor(imagePath) {
    // Create a new Image object
    let image = new Image();

    // Set the source of the image
    image.src = imagePath;

    // Add an event listener for the 'load' event of the image
    image.onload = () => {
        // Create a new instance of ColorThief
        let colorThief = new ColorThief();

        // Get the dominant color of the image using ColorThief
        let dominantColor = colorThief.getColor(image);

        // Apply the dominant color to the music player
        this.applyDominantColor(dominantColor);
    };
}

    /**
 * Applies the dominant color to the music player elements.
 *
 * @param {Array<number>} color - The RGB color values of the dominant color.
 * @returns {void}
 */
applyDominantColor(color) {
    // Set the background color of the body to the dominant color
    document.body.style.backgroundColor = `rgb(${color})`;

    // Calculate the lightness of the dominant color
    let lightness = color.reduce((a, b) => a + b) / 3;

    // Apply different background colors to the header based on the lightness
    if (lightness < 40) {
        this.header.style.backgroundColor = 'rgb(50, 118, 168, 0.5)';
        this.headerOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
    } else {
        this.header.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
    }

    // Add an event listener for the 'scroll' event of the window
    window.onscroll = () => {
        // Change the header background color and add/remove 'active' class based on scroll position
        if (window.scrollY > 390) {
            this.header.style.backgroundColor = `rgb(${color})`;
            this.headerBtn.classList.add('active');
            this.headerOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
        } else {
            this.header.style.backgroundColor = lightness < 40? 'rgb(50, 118, 168, 0.5)' : 'rgba(0, 0, 0, 0.45)';
            this.headerBtn.classList.remove('active');
        }
    };
}

    /**
 * Event handler for the 'load' event of the window.
 * This method retrieves the last played song's current time from local storage,
 * sets the main audio's current time to the retrieved value,
 * and updates the progress bar accordingly.
 *
 * @returns {void}
 */
onWindowLoad() {
    // Retrieve the last played song's current time from local storage
    const currentTime = parseFloat(localStorage.getItem('currentTime')) || 0;

    // Set the main audio's current time to the retrieved value
    this.mainAudio.currentTime = currentTime;

    // Update the progress bar with the current time
    this.updateProgress({ target: this.mainAudio });
}

    /**
 * Event handler for the 'unload' event of the window.
 * This method stores the current time of the main audio in local storage.
 * When the user revisits the page, the stored time will be retrieved and used to set the audio's current time.
 *
 * @returns {void}
 */
onWindowUnload() {
    // Store the current time of the main audio in local storage
    localStorage.setItem('currentTime', this.mainAudio.currentTime);
}

    /**
 * Toggles the play/pause state of the music player.
 * If the music player is currently paused, it will play the music.
 * If the music player is currently playing, it will pause the music.
 *
 * @returns {void}
 */
togglePlayPause() {
    if (this.wrapper.classList.contains('paused')) {
        this.pauseMusic();
    } else {
        this.playMusic();
    }
}

    /**
 * Plays the music in the music player.
 * Adds 'paused' class to the wrapper, changes the play/pause button icons to pause,
 * and plays the main audio.
 *
 * @returns {void}
 */
playMusic() {
    this.wrapper.classList.add('paused');
    this.playPauseButton.forEach(button => button.innerHTML = '<i class="fa-solid fa-circle-pause"></i>');
    this.smallPlayButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    this.mainAudio.play();
}

    /**
 * Pauses the music in the music player.
 * Removes 'paused' class from the wrapper, changes the play/pause button icons to play,
 * and pauses the main audio.
 *
 * @returns {void}
 */
pauseMusic() {
    this.wrapper.classList.remove('paused');

    // Update the play/pause button icons to play for each button
    this.playPauseButton.forEach(button => button.innerHTML = '<i class="fa-solid fa-circle-play"></i>');

    // Update the small play/pause button icon to play
    this.smallPlayButton.innerHTML = '<i class="fa-solid fa-play"></i>';

    // Pause the main audio
    this.mainAudio.pause();
}

    /**
 * Plays the previous song in the music player.
 * Updates the musicIndex to the previous song in the musicArray,
 * loads the music at the new index, and plays the music.
 *
 * @returns {void}
 */
prevSong() {
    // Calculate the previous music index, wrapping around if necessary
    this.musicIndex = (this.musicIndex - 1 + this.musicArray.length) % this.musicArray.length;

    // Load the music at the new index
    this.loadMusic(this.musicIndex);

    // Play the music
    this.playMusic();
}

    /**
 * Plays the next song in the music player.
 * Updates the musicIndex to the next song in the musicArray,
 * loads the music at the new index, and plays the music.
 *
 * @returns {void}
 */
nextSong() {
    // Calculate the next music index, wrapping around if necessary
    this.musicIndex = (this.musicIndex + 1) % this.musicArray.length;

    // Load the music at the new index
    this.loadMusic(this.musicIndex);

    // Play the music
    this.playMusic();
}

    /**
 * Updates the progress bar and current time of the music player.
 *
 * @param {Event} e - The event object that triggered the function.
 * @returns {void}
 */
updateProgress(e) {
    // Extract the current time and duration from the event target
    const { currentTime, duration } = e.target;

    // Calculate the progress width based on the current time and duration
    let progressWidth = (currentTime / duration) * 100;

    // Update the width of the progress bar
    this.progressBar.style.width = `${progressWidth}%`;

    // Calculate the current time in minutes and seconds
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    // Format the current seconds to have a leading zero if necessary
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;

    // Update the current time text in the document
    let musicCurrentTime = document.querySelector('.current-time');
    musicCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`;
}

    /**
 * Sets the progress of the music player based on the user's click on the progress area.
 *
 * @param {MouseEvent} e - The mouse event that triggered the function.
 * @returns {void}
 */
setProgress(e) {
    // Calculate the width of the progress area
    const progressWidth = this.progressArea.clientWidth;

    // Get the horizontal offset of the mouse click relative to the progress area
    const clickedOffsetX = e.offsetX;

    // Get the duration of the current song
    const songDuration = this.mainAudio.duration;

    // Calculate the new current time based on the clicked position and the song duration
    this.mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;

    // Play the music after setting the new progress
    this.playMusic();
}
}
// Initialize the MusicPlayer instance when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
});
