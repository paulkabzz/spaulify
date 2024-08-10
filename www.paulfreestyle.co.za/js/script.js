const wrapper = document.querySelector('.wrapper'),
    musicImg = document.querySelectorAll('.album-img'),
    musicName = document.querySelectorAll('.name'),
    artist = document.querySelectorAll('.artist'),
    playPauseButton = document.querySelectorAll('.play-pause'),
    prev = document.querySelector('#prev'),
    next = document.querySelector('#next'),
    repeatButton = document.querySelector('#repeat'),
    shuffleButton = document.querySelector('#shuffle'),
    mainAudio = document.querySelector('#main-audio'),
    progressArea = document.querySelector('.progress-area'),
    progressBar = document.querySelector('.progress-bar'),
    searchresult = document.querySelectorAll('.searchresult'),
    artistImg = document.querySelectorAll('.artisimg'),
    lyrics = document.querySelector('.lyric-text'),
    smallPlayButton = document.querySelector('.small-play'),
    header = document.querySelector('.header'),
    axc = document.querySelector('.axc'),
    headerOverlay = document.querySelector('.header-overlay'),
    headerBtn = document.querySelector('.header-btn');
let ft = document.querySelector('.feature');

// const likeButton = document.getElementById('like-button');
const SONGS_DIR = '../assets/songs/',
      ARTISTS_DIR = '../assets/images/artists/',
      ALBUMS_DIR = '../assets/images/album/';

let musicIndex,
    songName,
    isPaused = true,
    isRepeat = false,
    isShuffle = false,
    playedIndices = [];

let likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || []; // Load liked songs from localStorage

window.onload = () => {
    // get the index of the song based on the location.hash
    let songName = window.location.hash.substr(1);
  
    if (!songName) {
      musicIndex = 0;
      songName = musicArray[0].name.toLowerCase();
      window.location.hash = songName;
    } else {
      musicIndex = musicArray.findIndex(song => song.name.toLowerCase() === songName.replace(/%20/g, ' '));
      window.location.hash = musicArray[musicIndex].name.toLowerCase();
    }
  
    // load the last played song from local storage if available
    const lastPlayedSongName = localStorage.getItem('lastPlayedSongName');
    if (lastPlayedSongName) {
      const lastPlayedSongIndex = musicArray.findIndex(song => song.name.toLowerCase() === lastPlayedSongName.toLowerCase());
      if (lastPlayedSongIndex !== -1) {
        musicIndex = lastPlayedSongIndex;
        songName = musicArray[lastPlayedSongIndex].name.toLowerCase();
      }
    }
      
    loadMusic(musicIndex);
    updateQueue();
};
      
//Load the song at the ith index
function loadMusic (i) {
    if (!musicArray[i]) {
      console.error(`There's no song at index: ${i}`)
    }

    updateLikeButton(musicArray[i].name);

    document.title = musicArray[i].name + ' - ' + musicArray[i].artist;
    musicName.forEach(name => name.textContent = musicArray[i].name);
    artist.forEach(artist => artist.textContent = musicArray[i].artist);
    artistImg.forEach(img => img.src = `${ARTISTS_DIR}${musicArray[i].artistImg}`);
    musicImg.forEach(img => img.src = `${ALBUMS_DIR}${musicArray[i].img}`);
    ft.textContent = musicArray[i].ft;

    document.getElementById('player-image').src = `${ALBUMS_DIR}${musicArray[i].img}`;

    //Add a <br /> tag at every line break
    lyrics.innerHTML = musicArray[i].lyrics.split('\n').join('<br /><br />');

    //The source/url of the current song
    mainAudio.src = `${SONGS_DIR}${musicArray[i].source}`;

    //Change the url directory according to the current song name
    window.location.hash = musicArray[i].name.toLowerCase();

    // save the current song name in local storage
    localStorage.setItem('lastPlayedSongName', musicArray[i].name.toLowerCase());

    var image = new Image();
    image.src = `${ALBUMS_DIR}${musicArray[i].img}`;
    image.addEventListener("load", function () {
        var colorThief = new ColorThief();
        var dominantColor = colorThief.getColor(image);
        document.body.style.backgroundColor = `rgb(${dominantColor})`;

        if (dominantColor[0] < 40 && dominantColor[1] < 40 && dominantColor[2] < 40) {
            header.style.backgroundColor = 'rgb(50 118 168 / 0.5)';
            headerOverlay.style.backgroundColor = 'rgb(0 0 0 / 0.45)';
        }
        else {
            header.style.backgroundColor = 'rgb(0 0 0 / 0.45)';
        };

        const updateHeaderStyle = (dominantColor) => {
          const darkColorThreshold = 40;
          const isDarkColor = dominantColor.every(value => value < darkColorThreshold);
          const scrollY = window.scrollY;
          
          if (scrollY > 390) {
              header.style.backgroundColor = `rgb(${dominantColor})`;
              if (isDarkColor) {
                  header.style.backgroundColor = 'rgb(50 118 168)';
              }
              headerBtn.classList.add('active');
              headerOverlay.style.backgroundColor = 'rgb(0 0 0 / 0.45)';
          } else {
              if (isDarkColor) {
                  header.style.backgroundColor = 'rgb(50 118 168 / 0.5)';
              } else {
                  header.style.backgroundColor = 'rgb(0 0 0 / 0.45)';
              }
              headerOverlay.style.backgroundColor = scrollY < 390 ? 'transparent' : 'rgb(0 0 0 / 0.45)';
              headerBtn.classList.remove('active');
          }
      };
      
      window.onscroll = () => updateHeaderStyle(dominantColor);
      
    });

    // Update the queue after loading the song
    updateQueue();
};

// Update the like button based on whether the song is liked
function updateLikeButton(songName) {
    const likeButton = document.querySelector('#like-button');
    if (!likeButton) return;
    
    if (likedSongs.includes(songName.toLowerCase())) {
        likeButton.classList.add('liked');
        document.querySelector('.like-img').src = "../assets/images/ui/liked.png";
    } else {
        likeButton.classList.remove('liked');
        document.querySelector('.like-img').src = "../assets/images/ui/like.png";    }
}

// Toggle the like status of a song
function toggleLike(songName) {
    const songNameLower = songName.toLowerCase();
    if (likedSongs.includes(songNameLower)) {
        likedSongs = likedSongs.filter(song => song !== songNameLower);
    } else {
        likedSongs.push(songNameLower);
    }
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    updateLikeButton(songName);
}

document.querySelector('#like-button').onclick = () => {
    toggleLike(musicArray[musicIndex].name);
};


window.addEventListener('unload', () => {
    const currentTime = mainAudio.currentTime;
    localStorage.setItem('currentTime', currentTime);
});

window.addEventListener('load', () => {
    // Load the current time of the song from local storage if available
    const currentTime = localStorage.getItem('currentTime');
    if (currentTime) {
    mainAudio.currentTime = currentTime;
    // updateTime({ target: mainAudio });
}
});

function playMusic () {
    wrapper.classList.add('paused');
    playPauseButton.forEach(button => button.innerHTML = '<i class="fa-solid fa-circle-pause"></i>');
    smallPlayButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    mainAudio.play();
};

function pauseMusic () {
    wrapper.classList.remove('paused');
    playPauseButton.forEach(button => button.innerHTML = '<i class="fa-solid fa-circle-play"></i>');
    smallPlayButton.innerHTML = '<i class="fa-solid fa-solid fa-play"></i>';
    mainAudio.pause();
};

function updateQueue() {
    const queueList = document.querySelector('.queue-list');
    queueList.innerHTML = ''; // Clear the existing list

    const currentSongContainer = document.querySelector('.current-song');
    currentSongContainer.innerHTML = ''; // Clear the existing content

    const currentSong = musicArray[musicIndex];
    const currentImage = document.createElement('img');
    const currentContainer = document.createElement('div');
    currentContainer.classList.add('song-details-container');
    const currentSongName = document.createElement('p');
    currentSongName.style.fontSize = '14px';
    const currentArtist = document.createElement('p');
    currentArtist.style.fontSize = '12px';
    currentArtist.style.color = '#aaa';

    currentImage.src = `${ALBUMS_DIR}${currentSong.img}`;

    currentSongName.textContent = currentSong.name;
    currentArtist.textContent = currentSong.artist;

    currentContainer.appendChild(currentSongName);
    currentContainer.appendChild(currentArtist);

    currentImage.classList.add('que-item-image');
    currentSongContainer.appendChild(currentContainer);
    currentSongContainer.appendChild(currentImage);

    // Calculate the next 10 songs in the queue
    for (let i = 1; i <= musicArray.length; i++) {
        let nextIndex = (musicIndex + i) % musicArray.length;
        const song = musicArray[nextIndex];

        // Create a list item for each song in the queue
        const listItem = document.createElement('li');
        const image = document.createElement('img');
        const container = document.createElement('div');
        container.classList.add('song-details-container');
        const songName = document.createElement('p');
        songName.style.fontSize = '14px';

        const artist = document.createElement('p');
        artist.style.fontSize = '12px';
        artist.style.color = '#aaa';
        songName.textContent = song.name;
        artist.textContent = song.artist;

        container.appendChild(songName);
        container.appendChild(artist);

        image.src = `${ALBUMS_DIR}${song.img}`;
        image.classList.add('que-item-image');
        listItem.classList.add('queue-item');
        listItem.appendChild(container);
        listItem.appendChild(image);

        // Add click event listener to play the clicked song
        listItem.addEventListener('click', () => {
            musicIndex = nextIndex;
            loadMusic(musicIndex);
            playMusic();
        });

        queueList.appendChild(listItem);
    }
}


function prevSong () {
    if (isRepeat) {
        loadMusic(musicIndex);
    } else {
        if (mainAudio.currentTime > 5) {
            mainAudio.currentTime = 0;
        } else {
            musicIndex--;
            musicIndex < 0 ? musicIndex = musicArray.length - 1 : musicIndex = musicIndex;
            loadMusic(musicIndex);
        }
    }
    playMusic();
};

function nextSong () {
    if (isRepeat) {
        isRepeat = !isRepeat;
        musicIndex++;
        musicIndex > musicArray.length - 1 ? musicIndex = 0 : musicIndex = musicIndex;
        loadMusic(musicIndex);
        document.querySelector(".repeat-image").src = "../assets/images/ui/not-repeat.png";

    } else if (isShuffle) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * musicArray.length);
        } while (newIndex === musicIndex || playedIndices.includes(newIndex));
        playedIndices.push(newIndex);
        if (playedIndices.length === musicArray.length) {
            playedIndices = [];
        }
        musicIndex = newIndex;
        loadMusic(musicIndex);
    } else {
        musicIndex++;
        musicIndex > musicArray.length - 1 ? musicIndex = 0 : musicIndex = musicIndex;
        loadMusic(musicIndex);
    }
    playMusic();
};

repeatButton.onclick = () => {
    isRepeat = !isRepeat;
    repeatButton.classList.toggle('active', isRepeat);
    document.querySelector(".repeat-image").src = isRepeat ? "../assets/images/ui/repeated.png" : "../assets/images/ui/not-repeat.png";
};

shuffleButton.onclick = () => {
    isShuffle = !isShuffle;
    playedIndices = [];
    shuffleButton.classList.toggle('active', isShuffle);
    document.querySelector(".shuffle-image").src = isShuffle ? "../assets/images/ui/shuffle.png" : "../assets/images/ui/not-shuffle.png";

};

playPauseButton.forEach(button => {
    button.onclick = () => {
    const isMusicPlay = wrapper.classList.contains('paused');
    isMusicPlay ? pauseMusic() : playMusic();
};

});

//Go to next song
smallPlayButton.onclick = () => {
    const isMusicPlay = wrapper.classList.contains('paused');
    isMusicPlay ? pauseMusic() : playMusic();
};

prev.onclick = () => {
    prevSong();
};

next.onclick = () => {
    nextSong();
};

//Get current song time and update progress bar
mainAudio.ontimeupdate = e => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    let progressWidth = (currentTime / duration) * 100;

    progressBar.style.width = progressWidth + '%';

    let musicCurrentTime = document.querySelector('.current-time'),
        songDuration = document.querySelector('.max-duration'),
        dura = document.querySelector('.duration');

    mainAudio.addEventListener('loadeddata', () => {
        let mainAdDuration = mainAudio.duration;
        let totalMinutes = Math.floor(mainAdDuration / 60);
        let totalSeconds = Math.floor(mainAdDuration % 60);

        if (totalSeconds < 10) {
            totalSeconds = `0${totalSeconds}`;
        };

        songDuration.textContent = `${totalMinutes}:${totalSeconds}`;
        dura.textContent = `${totalMinutes}:${totalSeconds}`;

    });
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    };
    musicCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`;
};

//seek when the progress bar is clicked and it should go to that specific time of the song
progressArea.onclick = e => {
    let progressWidth = progressArea.clientWidth;

    let clikedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clikedOffsetX / progressWidth) * songDuration;
    playMusic();
};

//When the song ends, proceed to the next
mainAudio.onended = () => {
    if (isRepeat === false) {
        nextSong()
    } else {
        mainAudio.currentTime = 0;
        mainAudio.play();
    };
};
