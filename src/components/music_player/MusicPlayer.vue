<template>
  <div class="music_player">
    <div class="song-info" @click="playerPage()">
      <img
        :src="thumbnail"
        alt=""
        id="song-image"
      />
      <div>
        <h1 id="song-name">{{ name }}</h1>
        <p id="song-artist">{{ artist }}</p>
      </div>
    </div>

    <div class="main-controls">
      <div>
        <i class="fa-solid fa-backward" @click="previous()"></i>
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
        <i class="fa-solid fa-forward" @click="next()"></i>
      </div>
    </div>
    <div class="timeline">
      <p class="current-time" id="currentTime">00:00</p>
      <input
        type="range"
        value="0"
        ref="progressBar"
        id="progressBar" min="0" max="100"
        @change="seekSong()" @mousedown="forceUpdate(false)" @mouseup="forceUpdate(true)"
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
import { ref } from 'vue';
import { playerPlay , playerPause, seekPlayerSong, forceTimeUpdation, jumptoprevious, jumptonext} from '../../../spotify/play_track/player';
import eventBus from '../../../event_bus/event_bus';
export default {
  props: {
    songData:{
      type:Object,
      required:true
    },
  },
  setup(props){
    const thumbnail=ref(props.songData.album.images[0].url);
    const name=ref(props.songData.name);
    const artist=ref(props.songData.artists[0].name);

    eventBus.on('nextSong',(data)=>{
      thumbnail.value=data.album.images[0].url;
      name.value=data.name;
      artist.value=data.artists[0].name;
      // props.songData=data;
    });

    return{
      thumbnail,
      name,
      artist
    };
  },
  data() {
    return {
      songStatus: true,
    };
  },
  mounted() {
    const status=sessionStorage.getItem('songStatus');
    if(status==='pause'){
      this.songStatus=false;
    }else if(status==='play'){
      this.songStatus=true;
    }
  },
  methods: {
    async next(){
      jumptonext();
    },
    async previous(){
      jumptoprevious();
    },
    async playerPage(){
      // await store.dispatch('setData', this.songData);
      this.$router.push({
        name: "player"
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
  }
};
</script>

<style scoped>
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
