<template>
  <div class="music_player">
    <div class="song-info" onclick="musicPlayer(event)">
      <img
        :src="songData.album.images[0].url"
        alt=""
        id="song-image"
      />
      <div>
        <h1>{{ songData.name }}</h1>
        <p>{{ songData.artists[0].name }}</p>
      </div>
    </div>

    <div class="main-controls">
      <div>
        <!-- <i class="fa-regular fa-heart"></i> -->
        <i class="fa-solid fa-backward" onclick="jumpToPrevious()"></i>
        <div class="play">
          <i
            v-if="!songStatus"
            @click="playPause()"
            class="fa-solid fa-play"
            id="playButton"
          ></i>
          <i
            v-if="songStatus"
            @click="playPause()"
            class="fa-solid fa-pause"
            id="playButton"
          ></i>
        </div>
        <i class="fa-solid fa-forward" onclick="jumpToNext()"></i>
        <!-- <i class="fa-solid fa-repeat"></i> -->
      </div>
    </div>
    <div class="timeline">
      <p class="current-time" id="currentTime">00:00</p>
      <input
        type="range"
        value="0"
        ref="progressBar"
        id="progressBar" min="0" max="100"
        @input="handleProgressInput"
        @mousedown="removeEvent"
        @mouseup="addEvent"
      />
      <p class="ending-time" id="finalTime">00:00</p>
    </div>

    <div class="side-controls">
      <i class="fa-regular fa-heart"></i>
      <i class="fa-solid fa-repeat"></i>
    </div>
  </div>
</template>


<script>
import { playerPlay , playerPause} from '../../../spotify/play_track/player';
export default {
  props: ['songData','queue_data','muiscUrl'],
  data() {
    return {
      songStatus: true,
      endingTime: '00:00',
      currentTime: '00:00',
      
    };
  },
  mounted() {    
  },
  methods: {
    forceStop() {
      if (this.songStatus) {
        console.log('running');
        this.songStatus = false;
      }
    },

    updateEndingTime() {
      const progressBarValue = this.$refs.progressBar;
      const song = this.$refs.song;
      progressBarValue.max = song.duration;
      let minutes = Math.floor(song.duration / 60);
      let seconds = Math.round(song.duration - minutes * 60);
      this.endingTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    },

    addEvent() {
      this.$refs.song.addEventListener('timeupdate', this.updateTime);
    },
    removeEvent() {
      this.$refs.song.removeEventListener('timeupdate', this.updateTime);
    },

    handleProgressInput() {
      const song = this.$refs.song;
      const progressBarValue = this.$refs.progressBar;
      song.currentTime = progressBarValue.value;
      let minutes = Math.floor(song.currentTime / 60);
      let seconds = Math.round(song.currentTime - minutes * 60);
      this.currentTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      progressBarValue.style.background =
        'linear-gradient(to right, green, ' +
        (song.currentTime / song.duration) * 100 +
        '%, grey ' +
        (song.currentTime / song.duration) * 100 +
        '%)';
    },

    playPause() {
      const song = this.$refs.song;
      if (this.songStatus) {
        playerPause();
        this.songStatus = !this.songStatus;
        sessionStorage.setItem('songStatus', 'pause');
      } else {
        playerPlay();
        this.songStatus = !this.songStatus;
        sessionStorage.setItem('songStatus', 'play');
      }
    },
  }
};
</script>

<style>
.music_player {
  display: flex;
  z-index: 6;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  padding-left: 2vw;
  height: 70px;
  align-items: center;
  background-color: rgb(28, 28, 28);
}

.music_player i {
  cursor: pointer;
  margin-left: 30px;
  margin-right: 30px;
  width: 10px;
}

.side-controls {
  margin-right: 20vw;
}

.music_player div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.music_player .play {
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background-color: rgb(0, 205, 0);
}

.timeline {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
}

.timeline input {
  width: 100%;
}

.timeline .current-time {
  position: absolute;
  bottom: 10px;
  left: 0;
  font-size: 12px;
}

.timeline .ending-time {
  position: absolute;
  bottom: 10px;
  right: 0;
  font-size: 12px;
}

.music_player .song-info {
  cursor: pointer;
  display: flex;
  width: 40vw;
  /* margin-left: 10vw; */
  justify-content: center;
  align-items: center;
}

.song-info img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
  margin-right: 15px;
}

.song-info div {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.music_player .main-controls {
  margin-left: 20px;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

#progressBar {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 2px;
  background: grey;
  cursor: pointer;
}

#progressBar::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: rgb(0, 205, 0);
}
</style>
