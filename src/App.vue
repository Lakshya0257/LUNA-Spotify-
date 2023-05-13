<template>
  <div class="background">
    <div class="circle"></div>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </div>
  <div class="glass"></div>
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
  created() {
    // window.location.hash.substring(1).split('&').reduce((initial,item)=>{
    //   let parts=item.split('=');
    //   initial[parts[0]]=decodeURIComponent(parts[1]);
    //   console.log(initial);
    //   localStorage.setItem('access_token',initial)
    // });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    // const accessToken = new URLSearchParams(new URL(window.location).hash.substring(1)).get('access_token');
    localStorage.setItem('code',code)
// console.log(accessToken);
    if (localStorage.getItem('code') === 'null') {
      userLogin();
    }

    if (localStorage.getItem('access_token') === 'null') {
      console.log('running...');
      generateAccessToken();
    }
    
    // spotifyWebSDKInstance();
//     const script = document.createElement("script");
//     script.src = "https://sdk.scdn.co/spotify-player.js";
//     script.async = true;
//     document.body.appendChild(script);
//     let token=localStorage.getItem('access_token');
//     script.onload=()=>{
      

// // Play selected song
// const play_song = async (uri) => {
//     console.log("Changing song");
//     let request_answer = await fetch(
//       "https://api.spotify.com/v1/me/player/play",
//       {
//         method: "PUT",
//         body: JSON.stringify({
//           uris: [uri],
//         }),
//         headers: new Headers({
//           Authorization: "Bearer " + token,
//         }),
//       }
//     ).then((data) => console.log(data));
//   };
//       window.onSpotifyWebPlaybackSDKReady = () => {

// // Define the Spotify Connect device, getOAuthToken has an actual token 
// // hardcoded for the sake of simplicity
// // var player = new Spotify.Player({
// //   name: 'A Spotify Web SDK Player',
// //   getOAuthToken: callback => {
// //     callback(localStorage.getItem('access_token'));
// //   },
// //   volume: 1
// // });

// const token = localStorage.getItem('access_token');
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

// // Called when connected to the player created beforehand successfully
// // player.addListener('ready', ({ device_id }) => {
// //   console.log('Ready with Device ID', device_id);

// //   const play = ({
// //     spotify_uri,
// //     playerInstance: {
// //       _options: {
// //         getOAuthToken,
// //         id
// //       }
// //     }
// //   }) => {
// //     getOAuthToken(access_token => {
// //       fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
// //         method: 'PUT',
// //         body: JSON.stringify({ uris: [spotify_uri] }),
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${access_token}`
// //         },
// //       });
// //     });
// //   };

// //   play({
// //     playerInstance: player,
// //     spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
// //   });
// // });

// // // Connect to the player created beforehand, this is equivalent to 
// // // creating a new device which will be visible for Spotify Connect
// // player.connect();
// };
    // }



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
