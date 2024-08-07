let volumeSlider = document.getElementById("volumeSlider");
let progress = document.getElementsByTagName('progress')[0]
    progress.value = 1;

 // create an instance of the Audio object

volumeSlider.addEventListener("input", function() {
        iconArea = document.querySelector('.icon');

    progress.value = this.value;
    mainAudio.volume = this.value;
});

