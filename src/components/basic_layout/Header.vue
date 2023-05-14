<template>
    <header class="header">
        <div class="middle-container">
          <i class="fa-solid fa-magnifying-glass" @click="search"></i>
          <input class="search" type="text" placeholder="Search for song, artist, lyrics..." id="search-input" />
        </div>
        <div class="end-container">
          <i class="fa-regular fa-bell"></i>
          <img class="profile-img" src="https://www.readersdigest.ca/wp-content/uploads/2019/11/cat-10-e1573844975155.jpg" alt="profile-img" />
          <p class="user-name">Lakshya</p>
        </div>
      </header>
</template>


<script>
import { userSearch } from '../../../spotify/search/search';
export default{

    //parsing data
    props:[],

    //variable declaration
    data(){
        return{

        }
    },

    //components
    components:{

    },

    //functions
    methods:{
        async search(){
            const value=document.getElementById('search-input').value;
            this.$router.push({
        name: "search",
        params: {
          id: value,
        },
      });
        }

    }
}
</script>


<style>
.header{
    display: flex;
    position: fixed;;
    padding-left: 20px;
    height: 6vh;
    padding-top: 1vh;
    left: 100px;
    right: 0;
    justify-content: space-between;
    align-items: center;
    z-index: 5;
    background-color: rgba(21, 21, 21, 0.678);

}
.middle-container{
    display: flex;
    background-color: rgb(21, 21, 21);
    border-radius: 20px;
    width: 100%;
    height: 80%;
    align-items: center;
    padding-left: 40px;
}
.end-container{
    align-items: center;
    display: flex;
    margin-right: 4vw;
    margin-left: 40px;
}
.middle-container i{
    margin-right: 20px;
    color: grey;
}
.search{
    min-width: 0px;
    max-width: 100%;
    height: 100%;
    width: 100%;
    background-color: transparent;
    border: none;
    color: white;
}
.profile-img{
    cursor: pointer;
    width: 35px;
    height: 35px;
    border-radius: 50%;
}
.end-container i{
    margin-right: 20px;
    cursor: pointer;
}
.user-name{
    margin-left: 10px;
    color: white;
}

</style> 