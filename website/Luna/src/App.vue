<template>
  <Header />
  <NavBar />
  <SideBar />
  <RouterView></RouterView>
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
  async created() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    localStorage.setItem('code', code);
    if (localStorage.getItem('code') === 'null') {
      userLogin();
    }

    if (localStorage.getItem('access_token') === 'null') {
      generateAccessToken();
    }
    // spotifyWebSDKInstance();
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload=()=>{
      window.onSpotifyWebPlaybackSDKReady = () => {

// Define the Spotify Connect device, getOAuthToken has an actual token 
// hardcoded for the sake of simplicity
var player = new Spotify.Player({
  name: 'A Spotify Web SDK Player',
  getOAuthToken: callback => {
    callback('BQAiew7NvYsa8VPm5Fd_v4Cr7XkTcQeLnWsQJOtde82OyMgV-gePzVv1M7D5q_Ex-aPzF5G7gc6GPS8WABoELw2yqiMGRJ8ZGfWamJJiGUizRQv6DpVp-8iBO2z8wQd3JGOs9eHN6KZpsRXTWkc7Fpdo2ldTcpvYYkjyASgxGqtIB5_QKhEk7UEdPmPtp119YpOkiU2UiJ3LKf54b6ZQ-Z8');
  },
  volume: 1
});

// Called when connected to the player created beforehand successfully
player.addListener('ready', ({ device_id }) => {
  console.log('Ready with Device ID', device_id);

  const play = ({
    spotify_uri,
    playerInstance: {
      _options: {
        getOAuthToken,
        id
      }
    }
  }) => {
    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });
    });
  };

  play({
    playerInstance: player,
    spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
  });
});

// Connect to the player created beforehand, this is equivalent to 
// creating a new device which will be visible for Spotify Connect
player.connect();
};
    }



//     script.onload=()=>{
//       window.onSpotifyWebPlaybackSDKReady = () => {
//   const token = '[My access token]';
//   const player = new Spotify.Player({
//     name: 'Web Playback SDK Quick Start Player',
//     getOAuthToken: cb => { cb(token); },
//     volume: 0.5
//   });


//   player.addListener('ready', ({ device_id }) => {
//     console.log('Ready with Device ID', device_id);
//   });

//   // Not Ready
//   player.addListener('not_ready', ({ device_id }) => {
//     console.log('Device ID has gone offline', device_id);
//   });
//   player.addListener('initialization_error', ({ message }) => {
//       console.error(message);
//   });

//   player.addListener('authentication_error', ({ message }) => {
//       console.error(message);
//   });

//   player.addListener('account_error', ({ message }) => {
//       console.error(message);
//   });

//   player.connect();
// }
//     }

    

    
  },
  methods: {
  }
};
</script>


<style lang="css">
@import '@/assets/global.css';
</style>
