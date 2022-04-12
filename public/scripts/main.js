const app = {
  init() {
    this.cacheElements();
    this.registerListeners();
    this.songId = 0;
    this.songTime = 0;
    this.volume = 1;
  },
  cacheElements() {
    this.$artistEdit = document.querySelectorAll('.artist-edit');
    this.$artistDelete = document.querySelectorAll('.artist-delete');
    this.$playlistEdit = document.querySelectorAll('.playlist-edit');
    this.$playlistDelete = document.querySelectorAll('.playlist-delete');
    this.$play = document.querySelectorAll('.play');
    this.$pause = document.querySelectorAll('.pause');
    this.$soundSlider = document.querySelector('.soundSlider');
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
          const id =
            e.target.parentNode.parentNode.dataset.id ||
            e.target.parentNode.parentNode.parentNode.dataset.id;
          if (this.songId !== id) {
            this.songId = id;
            this.playSound('./sounds/rickroll.mp3');
          } else {
            this.sound.currentTime = this.songTime;
            this.sound.play();
            this.sound.volume = this.volume;
          }
        },
        false
      );
    });

    this.$pause.forEach((button) => {
      button.addEventListener(
        'click',
        async () => {
          this.songTime = this.sound.currentTime;
          this.sound.volume = 0;
        },
        false
      );
    });

    this.$soundSlider.addEventListener('input', () => {
      this.volume = this.$soundSlider.value;
      this.sound.volume = this.volume;
    });
  },
};

app.init();
