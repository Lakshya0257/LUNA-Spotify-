<template>
    <div v-if="api_done" class="body" id="content">
      <div class="artist-row">
        <Transition name="cards">
          <div class="artist">
          <img
            src="https://images2.alphacoders.com/109/thumb-1920-1092063.jpg"
            alt=""
          />
          <div class="blur"></div>
          <div class="info">
            <p>Liked Songs</p>
          </div>
        </div>
        </Transition>
        <div class="artist">
          <img
            src="https://thumbs.dreamstime.com/b/girl-listening-to-music-headphones-dark-colorful-background-cute-child-enjoying-happy-dance-looking-camera-smile-147034797.jpg"
            alt=""
          />
          <div class="blur"></div>
          <div class="info">
            <p>Daily Mix</p>
          </div>
        </div>
        <div class="artist">
          <img
            src="https://media.istockphoto.com/photos/young-woman-enjoying-music-picture-id628528054?k=6&m=628528054&s=170667a&w=0&h=XOOdGkVIukxG59x19Wec-ouspD6VaI1bSfpFbejbkbY="
            alt=""
          />
          <div class="blur"></div>
          <div class="info">
            <p>Shuffle Play</p>
          </div>
        </div>
        <div class="artist" style="margin-right: 0;">
          <img
            src="https://i.pinimg.com/originals/14/a9/b7/14a9b7955593932d33e034dd632929f3.jpg"
            alt=""
          />
          <div class="blur"></div>
          <div class="info">
            <p>Playlists</p>
          </div>
        </div>
      </div>

      <div class="second_row">
        <div class="genre">
          <h1>For You</h1>
          <!-- <div
            class="category"
            v-for="genre in api_data['data']['genre']['For you']|| []"
          >
            <p>{{ genre['title'] }}</p>
          </div> -->
          <h1>
            <br />
            Moods & moments
          </h1>
          <!-- <div
            class="category"
            v-for="genre in api_data['data']['genre']['Moods & moments']|| []"
          >
            <p>{{ genre['title'] }}</p>
          </div> -->
        </div>
        <div class="quick-picks">
          <h1>Quick Picks</h1>
          <div class="songs">
            <div
              class="recommended-song-row"
              v-for="quick_pick in api_data['data']['tracks']|| []"
              @click="playSong(quick_pick)"
            >
              <div class="song">
                <img
                  :src="
                    quick_pick.album.images[0].url
                  "
                  alt=""
                />
                <div class="song-info">
                  <h1>{{ quick_pick['name'] }}</h1>
                  <p>{{ quick_pick['artists'][0]['name'] }}</p>
                </div>
              </div>
              <i class="fa-regular fa-heart"></i>
            </div>
          </div>
        </div>
        <div class="artists">
          <!-- <img
            class="artist_img"
            v-for="artist in api_data['data']['artists'] || []"
            :src="artist.thumbnails[0].url"
            alt=""
          /> -->
        </div>
      </div>
      <!-- <MusicRow v-for="data in api_data['data']['homeData']" :row_heading="data.title" :contents="data.contents" /> -->
      
    </div>
</template>


<script>
import axios from 'axios';
import MusicRow from './music/MusicRow.vue';
import { getRecommendations} from '../../spotify/home/recommended_songs'
export default{
    data(){
        return{
            api_data: {
      },
      api_done:false,
        }
    },
    components:{
        MusicRow
    },
    async created(){
      this.api_data= await getRecommendations();
      console.log(this.api_data);
      this.api_done=true;
    },
    methods:{
        playSong(videoUrl){
            this.$emit('playSong',videoUrl);
        }
    }
}
</script>