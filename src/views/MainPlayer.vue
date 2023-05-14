<template>
  <div class="gradient">
    <div class="thumbnail">
      <div class="background-image">
        <img :src="img" alt="" />
      </div>
    </div>
    <div class="player">
      <div class="upper-info">
        <button @click="homepage()">
          <i class="fa-solid fa-house"></i>
        </button>
        <p>Now Playing</p>
        <h1>{{ name }}</h1>
        <div class="lower-info">
          <h1>{{ artist }}</h1>
          <p>Views: 6M</p>
        </div>
      </div>
      <div class="music_player">
        <div class="Playertimeline">
          <p class="current-time" id="currentTime">0:00</p>
          <input type="range" value="0" id="progressBar" @change="seekSong()" @mousedown="forceUpdate(false)" @mouseup="forceUpdate(true)"/>
          <p class="player-ending-time" id="finalTime">2:32</p>
        </div>
        <div class="player-main-controls">
          <!-- <i class="fa-regular fa-heart"></i> -->
          <i class="fa-solid fa-backward"></i>
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
          <i class="fa-solid fa-forward"></i>
          <!-- <i class="fa-solid fa-repeat"></i> -->
        </div>
      </div>
    </div>
  </div>
  <div class="lower-half">
    <h1>Recommended Queue</h1>
    <div class="queue">
      <div
        class="queue-song"
        v-for="(song, index) in queue.data.tracks"
        @click="fetchSong(song, index)"
      >
        <img :src="song.album.images[0].url" alt="" />
        <p>{{ song.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getPrebuiltQueue , seekPlayerSong, forceTimeUpdation} from '../../spotify/play_track/player';
import {
  playerPause,
  playerPlay,
  playSong
} from '../../spotify/play_track/player';
import event_bus from '../../event_bus/event_bus';
export default {
  data() {
    return {
      img: '',
      name: '',
      artist: '',
      queue: {},
      songStatus: true
    };
  },
  created() {
    this.img = this.$store.getters.getData.album.images[0].url;
    this.name = this.$store.getters.getData.name;
    this.artist = this.$store.getters.getData.artists[0].name;
    this.queue = getPrebuiltQueue();
    event_bus.on('nextSong', data => {
      this.img = data.album.images[0].url;
      this.name = data.name;
      this.artist = data.artists[0].name;
    });
  },
  mounted() {
    const status = sessionStorage.getItem('songStatus');
    if (status === 'pause') {
      this.songStatus = false;
    } else if (status === 'play') {
      this.songStatus = true;
    };
    event_bus.on('queueUpdate',data=>{
      console.log(data);
      console.log('Adding in queue');
      this.queue = { ...data };
    });
  },
  methods: {
    homepage() {
      this.$router.push({
        name: 'home'
      });
    },
    seekSong(){
      seekPlayerSong(document.getElementById('progressBar').value);

    },
    forceUpdate(value){
      forceTimeUpdation(value);
    },
    playPause() {
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
    async fetchSong(songData, index) {
      this.songStatus=true;
      this.img = songData.album.images[0].url;
      this.name = songData.name;
      this.artist = songData.artists[0].name;
      console.log(songData);
      console.log(songData['uri']);
      await playSong(songData, 'queueClick', index);
      // this.song_data = songData;
      // this.musicPlaying = true;
    }
  }
};
</script>

<style scoped>
.lower-half h1 {
  font-size: 1.7rem;
}

.queue .queue-song {
  /* margin-top: 10vh; */
  height: 100%;
  margin-right: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.queue-song img {
  width: 8vw;
  height: 8vw;
  object-fit: cover;
  border-radius: 5px;
}

.queue-song p {
  font-size: 1rem;
  margin-top: 3%;
  color: gray;
}

.background-image {
  height: 60%;
  width: 80%;
  display: flex;
}

.background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}
.gradient {
  width: 100%;
  height: 60%;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  z-index: 1;
  background: linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0));
}

.lower-half {
  position: fixed;
  top: 60%;
  background-color: black;
  padding-left: 3%;
  padding-right: 3%;
  padding-bottom: 2%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.queue {
  margin-top: 5vh;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow-x: auto;
  /* background-color: aqua; */
}

.thumbnail {
  display: flex;
  flex: 2;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.player {
  flex: 3;
  width: 100%;
  height: 100%;
  position: relative;
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

.Playertimeline {
  z-index: 10000;
  left: 0;
  right: 5%;
  display: flex;
  position: absolute;
  bottom: 20%;
}

.gradient .upper-info {
  line-height: 50px;
  position: absolute;
  top: 20%;
  left: 0;
}

.gradient .player-main-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gradient .player-main-controls div {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: rgb(0, 205, 0);
}

.gradient .player-main-controls i {
  margin-left: 25px;
  margin-right: 25px;
  font-size: 20px;
  cursor: pointer;
}

.Playertimeline .current-time {
  position: absolute;
  bottom: 10px;
  left: 0;
  font-size: 12px;
}

.Playertimeline .player-ending-time {
  position: absolute;
  bottom: 10px;
  right: 0;
  font-size: 12px;
}

.gradient .upper-info p {
  font-size: 1.4rem;
  color: rgb(66, 66, 66);
}

.gradient .upper-info h1 {
  font-size: 1.7rem;
}

.upper-info button i {
  font-size: 1.5rem;
  margin-bottom: 2%;
  color: rgb(0, 205, 0);
}
</style>
