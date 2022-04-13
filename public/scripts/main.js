/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
const app = {
  init() {
    this.cacheElements();
    this.registerListeners();
    this.songId = 0;
    this.songTime = 0;
    this.volume = 1;
    this.currentSong = 0;
    this.songs = [
      './sounds/rickRoll.mp3',
      './sounds/allStar.mp3',
      './sounds/heMan.mp3',
      './sounds/sax.mp3',
    ];
  },
  cacheElements() {
    this.$artistEdit = document.querySelectorAll('.artist-edit');
    this.$artistDelete = document.querySelectorAll('.artist-delete');
    this.$playlistEdit = document.querySelectorAll('.playlist-edit');
    this.$playlistDelete = document.querySelectorAll('.playlist-delete');
    this.$play = document.querySelectorAll('.play');
    this.$pause = document.querySelectorAll('.pause');
    this.$soundSlider = document.querySelector('.soundSlider');
    this.$next = document.querySelector('.next-song');
    this.$previous = document.querySelector('.previous-song');
  },
  playSound(soundPath) {
    this.sound = new Audio(soundPath);
    this.sound.play();
  },
  registerListeners() {
    this.$artistDelete.forEach((button) => {
      button.addEventListener(
        'click',
        async (e) => {
          const id =
            e.target.parentNode.parentNode.dataset.id ||
            e.target.parentNode.parentNode.parentNode.dataset.id;
          await fetch(`http://localhost:3000/api/artist/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
            },
          });
          document.location.reload();
        },
        false
      );
    });

    this.$playlistDelete.forEach((button) => {
      button.addEventListener(
        'click',
        async (e) => {
          const id =
            e.target.parentNode.parentNode.dataset.id ||
            e.target.parentNode.parentNode.parentNode.dataset.id;
          await fetch(`http://localhost:3000/api/playlist/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
            },
          });
          document.location.reload();
        },
        false
      );
    });

    this.$play.forEach((button) => {
      button.addEventListener(
        'click',
        async (e) => {
          if (button.innerHTML !== `<i class="fa-solid fa-pause"></i>`) {
            this.sound ? (this.sound.volume = 0) : '';
            const id =
              e.target.parentNode.parentNode.dataset.id ||
              e.target.parentNode.parentNode.parentNode.dataset.id;
            if (this.songId !== id) {
              this.songId = id;
              this.playSound('./sounds/rickRoll.mp3');
            } else {
              this.sound.currentTime = this.songTime;
              this.sound.play();
              this.sound.volume = this.volume;
            }
            button.innerHTML = `<i class="fa-solid fa-pause"></i>`;
            document.querySelector(
              '.controller-play'
            ).innerHTML = `<i class="fa-solid fa-pause"></i>`;
          } else {
            this.songTime = this.sound.currentTime;
            this.sound.volume = 0;
            button.innerHTML = `<i class="fa-solid fa-play"></i>`;
            document.querySelectorAll('.play').forEach((pause) => {
              pause.innerHTML = `<i class="fa-solid fa-play"></i>`;
            });
          }
        },
        false
      );
    });

    this.$soundSlider.addEventListener('input', () => {
      this.volume = this.$soundSlider.value;
      this.sound.volume = this.volume;
    });

    this.$next.addEventListener(
      'click',
      () => {
        this.sound.volume = 0;
        this.currentSong <= 3
          ? (this.currentSong += 1)
          : (this.currentSong -= 3);
        this.playSound(this.songs[this.currentSong]);
        this.sound.volume = this.volume;
      },
      false
    );

    this.$previous.addEventListener(
      'click',
      () => {
        this.sound.volume = 0;
        this.currentSong >= 0
          ? (this.currentSong -= 1)
          : (this.currentSong += 3);
        this.playSound(this.songs[this.currentSong]);
        this.sound.volume = this.volume;
      },
      false
    );
  },
};

app.init();
