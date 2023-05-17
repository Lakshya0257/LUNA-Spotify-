<template>
  <div class="background">
    <div class="circle"></div>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </div>
  <div class="glass"></div>
  <RouterView ></RouterView>
</template>

<script>

import Header from './components/basic_layout/Header.vue';
import NavBar from './components/basic_layout/NavBar.vue';
import SideBar from './components/basic_layout/SideBar.vue';

import { userLogin } from '../spotify/auth/auth'
import { generateAccessToken } from '../spotify/token/auth_token'

    
export default {
  components: {
    Header,
    NavBar,
    SideBar
  },
  created() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    localStorage.setItem('code',code);
    if (localStorage.getItem('code') === 'null') {
      userLogin();
    }

    if (localStorage.getItem('access_token') === 'null') {
      console.log('running...');
      generateAccessToken();
    }
  },
  methods: {
  }
};
</script>


<style lang="css">
@import '@/assets/global.css';
.circle {
  z-index: -10;
  position: fixed;
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  background-color: rgb(166, 0, 255);
}
.circle2 {
  z-index: -10;
  position: fixed;
  width: 25vw;
  height: 25vw;
  bottom: 10vh;
  left: 10vw;
  border-radius: 50%;
  background-color: rgb(255, 0, 251);
}
.circle3 {
  z-index: -10;
  position: fixed;
  width: 20vw;
  height: 20vw;
  right: 25vw;
  top: 20vh;
  border-radius: 50%;
  background-color: rgb(0, 225, 255);
}
.circle1 {
  z-index: -10;
  position: fixed;
  width: 25vw;
  height: 25vw;
  border-radius: 50%;
  /* top: 15vh; */
  /* left: 30vw; */
  right: 0;
  bottom: 0;
  background-color: rgb(76, 0, 255);
}

.glass {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -9;
  /* From https://css.glass */
  background: rgba(0, 0, 0, 0.825);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgb(0, 0, 0,0.1);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
}
</style>
