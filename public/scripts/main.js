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
      './sounds/nyan.mp3',
      './sounds/allStar.mp3',
      './sounds/heMan.mp3',
      './sounds/sax.mp3',
      './sounds/friday.mp3',
      './sounds/coffin.mp3',
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
    this.$addArtist = document.querySelector('.add-artist');
    this.$addPlaylist = document.querySelector('.add-playlist');
    this.$shuffle = document.querySelector('.shuffle');
    this.$restart = document.querySelector('.restart-song');
    // test
    this.$playlists = document.querySelectorAll('.playlist');
  },
  playSound(soundPath) {
    this.sound = new Audio(soundPath);
    this.sound.play();
    this.sound.onended = () => {
      this.$next.click();
    };
  },
  getDuration() {
    this.duration = this.sound.duration;
    console.log(this.duration);
  },
  registerListeners() {
    this.$playlists.forEach((playlist) => {
      playlist.addEventListener(
        'click',
        (e) => {
          const { id } = e.target.parentNode.dataset;
          console.log(id);
        },
        false
      );
    });

    if (this.$playlistDelete) {
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
    }

    if (this.$playlistDelete) {
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
    }

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
              this.sound.onended = () => {
                this.$next.click();
              };
            }
            button.innerHTML = `<i class="fa-solid fa-pause"></i>`;
            document.querySelector(
              '.controller-play'
            ).innerHTML = `<i class="fa-solid fa-pause"></i>`;
          } else {
            this.songTime = this.sound.currentTime;
            this.sound.volume = 0;
            this.sound.onended = () => {};
            button.innerHTML = `<i class="fa-solid fa-play"></i>`;
            document.querySelectorAll('.play').forEach((pause) => {
              pause.innerHTML = `<i class="fa-solid fa-play"></i>`;
            });
          }
          this.getDuration();
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
        if (this.sound) {
          this.sound.volume = 0;
          this.sound.onended = () => {};
        }
        if (!this.shuffle) {
          this.currentSong < this.songs.length - 1
            ? (this.currentSong += 1)
            : (this.currentSong = 0);
          this.playSound(this.songs[this.currentSong]);
          this.sound.volume = this.volume;
        } else {
          this.playSound(
            this.songs[Math.floor(Math.random() * this.songs.length - 1)]
          );
          this.sound.volume = this.volume;
        }
        this.getDuration();
      },
      false
    );

    this.$previous.addEventListener(
      'click',
      () => {
        if (this.sound) {
          this.sound.volume = 0;
          this.sound.onended = () => {};
        }
        if (!this.shuffle) {
          this.currentSong > 0
            ? (this.currentSong -= 1)
            : (this.currentSong = this.songs.length - 1);
          this.playSound(this.songs[this.currentSong]);
          this.sound.volume = this.volume;
        } else {
          this.playSound(
            this.songs[Math.floor(Math.random() * this.songs.length)]
          );
          this.sound.volume = this.volume;
        }
        this.getDuration();
      },
      false
    );

    this.$restart.addEventListener(
      'click',
      () => {
        if (this.sound) {
          this.sound.currentTime = 0;
        }
      },
      false
    );

    this.$shuffle.addEventListener(
      'click',
      () => {
        this.shuffle === true ? (this.shuffle = false) : (this.shuffle = true);
        this.$shuffle.classList.toggle('active');
      },
      false
    );

    if (this.$addArtist) {
      this.$addArtist.addEventListener(
        'click',
        async () => {
          const name = document.getElementById('add-artist').value;
          await fetch(`http://localhost:3000/api/artist`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ name: `${name}` }),
          });
          console.log('before');
          document.location.reload();
        },
        false
      );
    }

    if (this.$addPlaylist) {
      this.$addPlaylist.addEventListener(
        'click',
        async () => {
          const name = document.getElementById('add-playlist').value;
          await fetch(`http://localhost:3000/api/playlist`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ name: `${name}` }),
          });
          console.log('before');
          document.location.reload();
        },
        false
      );
    }
  },
};

app.init();
