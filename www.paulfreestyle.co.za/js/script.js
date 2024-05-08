try {
  const wrapper = document.querySelector(".wrapper"),
    musicImg = document.querySelectorAll(".album-img"),
    musicName = document.querySelectorAll(".name"),
    artist = document.querySelectorAll(".artist"),
    playPauseButton = document.querySelectorAll(".play-pause"),
    prev = document.querySelector("#prev"),
    next = document.querySelector("#next"),
    mainAudio = document.querySelector("#main-audio"),
    progressArea = document.querySelector(".progress-area"), 
    progressBar = document.querySelector(".progress-bar"),
    searchresult = document.querySelectorAll(".searchresult"),
    artistImg = document.querySelectorAll(".artisimg"),
    lyrics = document.querySelector(".lyric-text"),
    smallPlayButton = document.querySelector(".small-play"),
    header = document.querySelector(".header"),
    axc = document.querySelector(".axc"),
    headerOverlay = document.querySelector(".header-overlay"),
    headerBtn = document.querySelector(".header-btn");
  let ft = document.querySelector(".feature");

  const SONGS_DIR = "../assets/songs/",
    ARTISTS_DIR = "../assets/images/artists/",
    ALBUMS_DIR = "../assets/images/album/";

  let musicIndex,
    songName,
    isPaused = true;

  window.onload = () => {
    // get the index of the song based on the location.hash
    let songName = window.location.hash.substr(1);

    if (!songName) {
      musicIndex = 0;
      songName = musicArray[0].name.toLowerCase();
      window.location.hash = songName;
    } else {
      musicIndex = musicArray.findIndex(
        (song) => song.name.toLowerCase() === songName.replace(/%20/g, " ")
      );
      window.location.hash = musicArray[musicIndex].name.toLowerCase();
    }

    // load the last played song from local storage if available
    const lastPlayedSongName = localStorage.getItem("lastPlayedSongName");
    if (lastPlayedSongName) {
      const lastPlayedSongIndex = musicArray.findIndex(
        (song) => song.name.toLowerCase() === lastPlayedSongName.toLowerCase()
      );
      if (lastPlayedSongIndex !== -1) {
        musicIndex = lastPlayedSongIndex;
        songName = musicArray[lastPlayedSongIndex].name.toLowerCase();
      }
    }

    loadMusic(musicIndex);
  };

  //Load the song at the ith index
  const loadMusic = (i) => {
    if (!musicArray[i]) {
      console.error(`There's no song at index: ${i}`);
    }

    document.title = musicArray[i].name + " - " + musicArray[i].artist;
    musicName.forEach((name) => (name.textContent = musicArray[i].name));
    artist.forEach((artist) => (artist.textContent = musicArray[i].artist));
    artistImg.forEach(
      (img) => (img.src = `${ARTISTS_DIR}${musicArray[i].artistImg}`)
    );
    musicImg.forEach((img) => (img.src = `${ALBUMS_DIR}${musicArray[i].img}`));
    ft.textContent = musicArray[i].ft;

    //Add a <br /> tag at every line break
    lyrics.innerHTML = musicArray[i].lyrics.split("\n").join("<br /><br />");

    //The source/url of the current song
    mainAudio.src = `${SONGS_DIR}${musicArray[i].source}`;

    //Change the url directory according to the current song name
    window.location.hash = musicArray[i].name.toLowerCase();

    // save the current song name in local storage
    localStorage.setItem(
      "lastPlayedSongName",
      musicArray[i].name.toLowerCase()
    );

    var image = new Image();
    image.src = `${ALBUMS_DIR}${musicArray[i].img}`;
    image.addEventListener("load", function () {
      var colorThief = new ColorThief();
      var dominantColor = colorThief.getColor(image);
      document.body.style.backgroundColor = `rgb(${dominantColor})`;

      if (
        dominantColor[0] < 40 &&
        dominantColor[1] < 40 &&
        dominantColor[2] < 40
      ) {
        header.style.backgroundColor = "rgb(50 118 168 / 0.5)";
        headerOverlay.style.backgroundColor = "rgb(0 0 0 / 0.45)";
      } else {
        header.style.backgroundColor = "rgb(0 0 0 / 0.45)";
      }

      window.onscroll = () => {
        if (window.scrollY > 390) {
          header.style.backgroundColor = `rgb(${dominantColor})`;
          if (
            dominantColor[0] < 40 &&
            dominantColor[1] < 40 &&
            dominantColor[2] < 40
          )
            header.style.backgroundColor = "rgb(50 118 168)";
          headerBtn.classList.add("active");
          headerOverlay.style.backgroundColor = "rgb(0 0 0 / 0.45)";
        } else if (
          window.scrollY < 390 &&
          dominantColor[0] < 40 &&
          dominantColor[1] < 40 &&
          dominantColor[2] < 40
        ) {
          header.style.backgroundColor = "rgb(50 118 168 / 0.5)";
          headerBtn.classList.remove("active");
        } else {
          header.style.backgroundColor = "rgb(0 0 0 / 0.45)";
          headerOverlay.style.backgroundColor = "transparent";
          headerBtn.classList.remove("active");
        }
      };
    });
  };

  window.addEventListener("unload", () => {
    const currentTime = mainAudio.currentTime;
    localStorage.setItem("currentTime", currentTime);
  });

  window.addEventListener("load", () => {
    // Load the current time of the song from local storage if available
    const currentTime = localStorage.getItem("currentTime");
    if (currentTime) {
      mainAudio.currentTime = currentTime;
      // updateTime({ target: mainAudio });
    }
  });

  const playMusic = () => {
    wrapper.classList.add("paused");
    playPauseButton.forEach(
      (button) =>
        (button.innerHTML = '<i class="fa-solid fa-circle-pause"></i>')
    );
    smallPlayButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    mainAudio.play();
  };

  const pauseMusic = () => {
    wrapper.classList.remove("paused");
    playPauseButton.forEach(
      (button) => (button.innerHTML = '<i class="fa-solid fa-circle-play"></i>')
    );
    smallPlayButton.innerHTML = '<i class="fa-solid fa-solid fa-play"></i>';
    mainAudio.pause();
  };

  const prevSong = () => {
    musicIndex--;
    // if (mainAudio.currentTime < 0.5) musicIndex.currentTime = 0;
    musicIndex < 0
      ? (musicIndex = musicArray.length - 1)
      : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
  };

  const nextSong = () => {
    musicIndex++;
    musicIndex > musicArray.length - 1
      ? (musicIndex = 0)
      : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
  };

  playPauseButton.forEach((button) => {
    button.onclick = () => {
      const isMusicPlay = wrapper.classList.contains("paused");
      isMusicPlay ? pauseMusic() : playMusic();
    };
  });

  //Go to next song
  smallPlayButton.onclick = () => {
    const isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
  };

  prev.onclick = () => {
    prevSong();
  };

  next.onclick = () => {
    nextSong();
  };

  //Get current song time and update progress bar
  mainAudio.ontimeupdate = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    let progressWidth = (currentTime / duration) * 100;

    progressBar.style.width = progressWidth + "%";

    let musicCurrentTime = document.querySelector(".current-time"),
      songDuration = document.querySelector(".max-duration"),
      dura = document.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", () => {
      let mainAdDuration = mainAudio.duration;
      let totalMinutes = Math.floor(mainAdDuration / 60);
      let totalSeconds = Math.floor(mainAdDuration % 60);

      if (totalSeconds < 10) {
        totalSeconds = `0${totalSeconds}`;
      }

      songDuration.textContent = `${totalMinutes}:${totalSeconds}`;
      dura.textContent = `${totalMinutes}:${totalSeconds}`;
    });
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    musicCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`;
  };

  //seek when the progress bar is clicked and it should go to that specific time of the song
  progressArea.onclick = (e) => {
    let progressWidth = progressArea.clientWidth;

    let clikedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clikedOffsetX / progressWidth) * songDuration;
    playMusic();
  };

  //When the song ends, proceed to the next
  mainAudio.onended = () => {
    nextSong();
  };
} catch (error) {
  console.error(error.message);
}
