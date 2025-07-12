const songs = [
  {
    name: "Agar_Tum_Saath_ho.mp3",
    title: "Hindi Song",
    artist: "Arjit Singh"
  },
  {
    name: "Sapphire.mp3",
    title: "English Song",
    artist: "Ed Sheeran"
  },
  
];

let songIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const durationEl = document.getElementById("duration");
const currentTimeEl = document.getElementById("current-time");
const volumeSlider = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `Music/${song.name}`;
}

function playSong() {
  isPlaying = true;
  playBtn.textContent = "⏸️";
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.textContent = "▶️";
  audio.pause();
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});


audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(song);
    playSong();
  });
  playlist.appendChild(li);
});


audio.addEventListener("ended", () => {
  nextBtn.click();
});

loadSong(songs[songIndex]);
