<template>
    <div class='side-bar'>
        <h1 id="viewId">Popular Songs</h1>
        <div class="popular_songs">
          
          <!-- {%for album in quick_picks%}
          {% set videoId = album["videoId"] %}
          <div class="recommended-song-row" onclick="playSong('{{ videoId|escape }}')">
            <div class="song">
              <img
              src="{{album['thumbnails'][album['thumbnails']|length-1]['url']}}"
              alt=""
            />
            <div class="song-info">
              <h1>{{album["title"]}}</h1>
            </div>
            </div>
          </div>
          {% endfor %} -->
        </div>
        <div class="now-playing">
          <img src="https://images.genius.com/bf004d7c1ba188cb06c28e8966788a6d.1000x1000x1.jpg" alt="" id="side-image">
        </div>
      </div>
</template>


<script>
</script>

<style>
.side-bar{
    position: fixed;
    right: 0;
    bottom: 0;
    top: 8vh;
    background-color: rgb(21, 21, 21);
    width: 18vw;
    padding-top: 20px;
    
    z-index: 50;
    border-radius: 10px;
}

.side-bar h1{
    margin-bottom: 20px;
    margin-left: 5%;
}

.side-bar .popular_songs{
    padding-left: 5%;
    display: flex;
    flex: 2;
    width: 100%;
    height: 60%;
    flex-direction: column;
    overflow-y: auto;
}

.side-bar .now-playing{
    display: flex;
    flex: 1;
    width: 100%;
    height: 40%;
    position: relative;
    justify-content: center;
    align-items: center;
}

.now-playing img{
    width: 90%;
    height: 75%;
    position: absolute;
    /* bottom: 10%; */
    top: 2%;
    object-fit: cover;
    /* top: 5%; */
    border-radius: 15px;
}

@media (max-width:1200px){
    .side-bar{
      display: none;
    }
  }
</style>