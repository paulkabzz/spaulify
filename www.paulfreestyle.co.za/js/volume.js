let volumeSlider = document.getElementById("volumeSlider");
let progress = document.getElementsByTagName('progress')[0]
    progress.value = 1;

 // create an instance of the Audio object

volumeSlider.addEventListener("input", function() {
        iconArea = document.querySelector('.icon');

    if (this.value < 0.1) {
        iconArea.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    } else if (this.value <= 0.3) {
        iconArea.innerHTML = '<i class="fa-solid fa-volume-off"></i>';
    } else if (this.value  < 0.5) {
        iconArea.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
    } else if (this.value >= 0.5) {
        iconArea.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    };

    progress.value = this.value;
    mainAudio.volume = this.value;
});

