<template>
    <nav class="nav-bar">
        <h2>L</h2>
        <button class="nav-button" 
      @click="navigateTo('home')">
          <i class="fa-solid fa-house" :class="{ active: isActiveRoute('home') }"></i>
          
        </button>
        <button class="nav-button" 
      @click="navigateTo('home')">
          <i class="fa-solid fa-music" :class="{ active: isActiveRoute('undefined') }"></i>
          
        </button>
        <button class="nav-button" 
      @click="navigateTo('home')">
          <i class="fa-solid fa-record-vinyl" :class="{ active: isActiveRoute('undefined') }"></i>
          
        </button>
        <button class="nav-button" 
      @click="navigateTo('home')">
          <i class="fa-solid fa-icons" :class="{ active: isActiveRoute('undefined') }"></i>
          
        </button>
        <button class="nav-button" 
      @click="navigateTo('search')">
          <i class="fa-solid fa-magnifying-glass" :class="{ active: isActiveRoute('search') }"></i>
        </button>
        <button class="nav-button" 
      @click="navigateTo('home')">
          <i class="fa-regular fa-heart" :class="{ active: isActiveRoute('undefined') }"></i>
        </button>
      </nav>
</template>

<script>
import { mapState } from 'vuex'; // Optional, if you are using Vuex

export default {
  computed: {
    ...mapState(['currentRoute']), // Optional, if you are using Vuex
    
  },
  methods: {
    isActiveRoute(name) {
      return this.$route.name === name; // Replace 'currentRoute' with your actual route name
    },
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style>
.nav-bar{
    position: fixed;
    display: flex;
    align-items: center;
    flex-direction: column;
    bottom: 0;
    top: 0;
    left: 0;
    width: 100px;
    padding-top: 4vh;
    z-index: 5;
    background-color: rgba(16, 16, 16, 0.437);
}

.fa-solid.active {
  color: green;
}

.nav-bar h2{
    font-size: 25px;
    color: rgb(0, 221, 0);
    margin-bottom: 30px;
}
.nav-button{
    width: 35px;
    height: 35px;
    border-radius: 6px;
    transition: background-color .4s;
    margin-bottom: 30px;
}
.nav-button:hover{
    background-color: rgb(177, 177, 177);
}

.nav-heading{
    margin-bottom: 22px;
}

.nav-button i{
    font-size: 17px;
    margin-right: auto;
    margin-left: auto;
    color: grey;
    transition: color .3s;
}

.nav-button:hover i{
    color: white;
}
</style>