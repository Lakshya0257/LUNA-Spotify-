<template>
    <div class="content-header">
    <div>
      <h1>{{row_heading}}</h1>
    </div>
    <button>See More >></button>
  </div>
  <div class="albums-container">
    
    <div class="album" v-for="content in contents">
      <div class="album-cover">
        <img :src="content.thumbnails[content.thumbnails.length-1].url" alt="">
      </div>
      <p>{{ content.title }}</p>
    </div>
  </div>
</template>

<script>
export default{
    props:["row_heading",'contents']
}
</script>

<style>
.content-header{
    margin-top:80px;
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

.albums-container{
    width: 100%;
    height: 250px;
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 20px;
}

.albums-container .album-cover{
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

.album{
    width: 220px;
    height: 220px;
    margin-right: 50px;
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
</style>