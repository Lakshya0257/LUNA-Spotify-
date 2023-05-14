<template>
  <main>
    <Header />
    <NavBar />
    <!-- <SideBar /> -->
    <RouterView  @playSong="fetchSong" />
    <Transition name="player">
      <MusicPlayer
        v-if="musicPlaying"
        :songData="song_data"
        ref="player_component"
      />
    </Transition>
  </main>
</template>

<script>
import Header from '../components/basic_layout/Header.vue';
import NavBar from '../components/basic_layout/NavBar.vue';
import SideBar from '../components/basic_layout/SideBar.vue';
import MusicRow from '../components/music/MusicRow.vue';
import HomepageContent from '../components/HomepageContent.vue';
import MusicPlayer from '../components/music_player/MusicPlayer.vue';
import {
  getPlayer,
  playSong,
  getCurrentSong
} from '../../spotify/play_track/player';

export default {
  data() {
    return {
      musicPlaying: false,
      song_data: {}
    };
  },
  components: {
    MusicRow,
    MusicPlayer,
    HomepageContent,
    Header,
    NavBar,
    SideBar
  },
  methods: {
    async fetchSong(songData) {
      this.musicPlaying = false;
      console.log(songData);
      console.log(songData['uri']);
      await playSong(songData, 'onUserClick');
      this.song_data = songData;
      this.musicPlaying = true;
    }
  },
  mounted() {
    let currentSong = getCurrentSong();
    console.log('currentSongddd');
    console.log(currentSong);
    if (Object.keys(currentSong).length !== 0) {
      this.song_data = currentSong;
      this.musicPlaying = true;
    }
  }
};
</script>

<style>
.player-enter-active,
.player-leave-active {
  transition: opacity 0.5s ease;
}

.player-enter-from,
.player-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.second_row {
  width: 100%;
  height: 500px;
  display: flex;
}

.second_row .genre {
  display: flex;
  /* height: 100%; */
  flex-wrap: wrap;
  flex: 1;
  justify-content: start;
  align-items: center;
  overflow-y: auto;
}

.second_row .genre .category {
  height: 19px;
  padding: 10px 12px;
  margin-right: 10px;
  margin-bottom: 2vh;
  background-color: rgba(128, 128, 128, 0.163);
  border: solid 1px rgb(50, 50, 50);
  border-radius: 12px;
}

.second_row .genre h1 {
  width: 100%;
  display: block;
  margin-bottom: 15px;
}

.second_row .genre .category p {
  font-size: 17px;
}

.second_row .quick-picks {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 2;
  padding-left: 15px;
}

.second_row .quick-picks .songs {
  width: 95%;
  height: 100%;
  overflow-y: auto;
  background-color: rgba(128, 128, 128, 0.163);
  padding-left: 5%;
  padding-top: 5%;
  border-radius: 20px;
}

.second_row .quick-picks h1 {
  margin-bottom: 15px;
}

.second_row .artists {
  padding-left: 5%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
  row-gap: 5%;
  column-gap: 5%;
  flex: 1;
  overflow-y: auto;
}

.second_row .artists .artist_img {
  width: 100%;
  height: 8vw;
  background-color: aqua;
  object-fit: cover;
  border-radius: 20px;
}

.recommended-song-row {
  display: flex;
  width: 95%;
  cursor: pointer;
  height: 50px;
  justify-content: space-between;
  margin-bottom: 15px;
}

.recommended-song-row .song {
  display: flex;
}

.recommended-song-row .song-info {
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.recommended-song-row img {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  object-fit: cover;
}

.song-info h1 {
  font-size: 0.8rem;
  display: flex;
}

.song-info p {
  display: flex;
  font-size: 0.8rem;
}
</style>
