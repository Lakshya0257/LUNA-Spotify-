<template>
  <main>
    <HomepageContent @playSong="fetchSong"/>
    <Transition name="player">
      <MusicPlayer v-if="musicPlaying" :muiscUrl="muiscUrl" :songData="song_data" ref="player_component" :queue_data="queue_data" :song_index="song_index" @nextSong="fetchNextSong"/>
    </Transition>
  </main>

</template>







<script>
import MusicRow from '../components/music/MusicRow.vue';
import HomepageContent from '../components/HomepageContent.vue';
import MusicPlayer from '../components/music_player/MusicPlayer.vue';
import axios from 'axios';
import { getPlayer ,playSong} from '../../spotify/play_track/player';

export default {
  data() {
    return {
      
      musicPlaying: false,
      muiscUrl:'',
      song_data:{},
      queue_data:{},
      song_index:1
    };
  },
  components: {
    MusicRow,
    MusicPlayer,
    HomepageContent
  },
  methods:{
    fetchSong:async function(videoUrl){
      // const player=getPlayer();
      // if(this.musicPlaying){
      //   await this.$refs.player_component.forceStop();
      //   this.musicPlaying=false;
      // }
      console.log('waiting')
      console.log(videoUrl['uri']);
      playSong(videoUrl['uri']);
      this.song_data=videoUrl;
      this.musicPlaying=true;

      // const x=videoUrl.external_urls.spotify;
      // this.muiscUrl=x.replace('https://open.spotify.com', 'https://open.spotify.com/embed').replace('/track/', '/embed/track/');
      // console.log(y);
      // getTrackLink(videoUrl);
    },
    fetchQueue(videoId){
      axios
      .get(`http://127.0.0.1:5000/queue?videoId=${videoId}`)
      .then(response => {
        this.queue_data=response.data.tracks;
        console.log(this.queue_data);
      })
      .catch(error => {
        console.error(error);
      });
    },

    async fetchNextSong(){
      this.musicPlaying=false;
      console.log('waiting')
      try {
        axios
          .get(`http://127.0.0.1:5000/getSong?videoId=${this.queue_data[this.song_index].videoId}`)
          .then(async data => {
            console.log('done')
            this.song_data=data;
            console.log(data);
            this.song_index++;
            this.musicPlaying=true;
          })
          .catch(error => {
            console.error(error);
            if (error.response && error.response.status === 403) {
              console.log('Something went wrong! Trying again..');
              fetchSong(videoId);
            }
          });
      } catch {
        error => {
          console.error(error);
          if (error.response && error.response.status === 403) {
            console.log('Something went wrong! Trying again..');
            fetchSong(videoId);
          }
        };
      }
    },
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
  background-color: rgba(128, 128, 128, 0.163);
  border: solid 1px rgb(50, 50, 50);
  border-radius: 12px;
}

.second_row .genre h1 {
  width: 100%;
  display: block;
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
