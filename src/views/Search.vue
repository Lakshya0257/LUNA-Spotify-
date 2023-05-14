<template>
  <div class="result body" v-if="data">
    <div class="content-header">
      <div>
        <h1>Songs</h1>
      </div>
      <button>See More >></button>
    </div>
    <div class="albums-container">
      <div class="album" v-for="song in search.data.tracks.items" @click="playSong(song)">
        <div class="album-cover">
          <img
            :src="song.album.images[0]['url']"
            alt=""
          />
        </div>
        <p>{{ song.name }}</p>
      </div>
    </div>
    <div class="content-header">
      <div>
        <h1>Albums</h1>
      </div>
      <button>See More >></button>
    </div>
    <div class="albums-container">
      <div class="album" v-for="album in search.data.albums.items">
        <div class="album-cover">
          <img
            :src="album.images[0].url"
            alt=""
          />
        </div>
        <p>{{ album['name'] }}</p>
      </div>
    </div>
    <div class="content-header">
      <div>
        <h1>Community Playlist</h1>
      </div>
      <button>See More >></button>
    </div>
    <div class="albums-container">
      <div class="album" v-for="playlist in search.data.playlists.items">
        <div class="album-cover">
          <img
            :src="playlist.images[0].url"
            alt=""
          />
        </div>
        <p>{{ playlist['name'] }}</p>
      </div>
    </div>
    <div class="content-header">
      <div>
        <h1>Artists</h1>
      </div>
      <button>See More >></button>
    </div>
    <div class="albums-container">
      <div class="album" v-for="artist in search.data.artists.items">
        <div class="artist">
          <img
          :src="artist.images[0]?.url ?? 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'"
            alt=""
          />
        </div>
        <p>{{ artist['name'] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { userSearch } from '../../spotify/search/search';
export default{
    props:['searchData'],
    data(){
        return{
            id:'',
            search:{},
            data:false
        }
    },
    async created(){
        this.id=this.$route.params.id;
        this.search=await userSearch();
        this.data=true
    },
    async beforeRouteUpdate(to, from, next) {
    console.log('Component re-rendered');
    this.data=false;
    this.id=this.$route.params.id;
        this.search=await userSearch();
        this.data=true
    next();
  },
    methods:{
      playSong(videoUrl){
          sessionStorage.setItem('songStatus', 'play');
            this.$emit('playSong',videoUrl);
        }
    }
}
</script>

<style scoped>
.albums-container{
    padding-left: 1vw;
    width: 100%;
    height: 250px;
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 20px;
}

.result{
    overflow-x: hidden;
}


.albums-container .album-cover,.albums-container .artist{
    width: 200px;
    height: 200px;
    cursor: pointer;
    transition: width .5s,height .5s;
}


.album-cover img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
}
.artist img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.album{
   
    height: 100%;
    margin-right: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.album p{
    margin-top: 5px;
    color: white;
    font-size: 13px;
}

.album-cover:hover{
    background-color: rgba(82, 82, 82, 0.462);
    border-radius: 5px;
    width: 220px;
    height: 220px;
}

.content-header{
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content-header div{
    display: flex;
    flex-direction: column;
}

.content-header button{
    color:rgb(0, 205, 0);
}
</style>
