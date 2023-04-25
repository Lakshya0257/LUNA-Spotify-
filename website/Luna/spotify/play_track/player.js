import { createApp } from 'vue';


let player=null;
let deviceId=null;
export const getPlayer = () => {
    return player;
};


export const playSong=(uri)=>{
    if (player) {
        const token=localStorage.getItem('access_token')
        // Call the player's methods to play the song
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
              fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                body: JSON.stringify({ uris: [spotify_uri] }),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
              });
            });
          };
          play({
            playerInstance: player,
            spotify_uri: uri,
          });
          setInterval(() => {
            updateTime();
          }, 1);
      } else {
        console.error('Player is not available.');
      }
}


const updateTime=()=>{
    let progressBar=document.getElementById('progressBar');
    let currentTime=document.getElementById('currentTime');
    player.getCurrentState().then(state => {
        if (state && state.position && state.duration) {
          const currentPosition = state.position;
          const duration = state.duration;
          let minutes = Math.floor(currentPosition / 60000);
          let seconds = Math.floor((currentPosition % 60000) / 1000); 
        currentTime.innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
          // Calculate the progress percentage
          const progressPercentage = (currentPosition / duration) * 100;
    
          // Update the progress bar input value
          progressBar.value = progressPercentage;
          progressBar.style.background =
          'linear-gradient(to right, green, ' +
          (currentPosition / duration) * 100 +
          '%, grey ' +
          (currentPosition / duration) * 100 +
          '%)';
        }
      }).catch(error => console.error(error));
}





export default{
    install:(Vue,options)=>{
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.onload = () => {
        let token=localStorage.getItem('access_token');
        window.onSpotifyWebPlaybackSDKReady = () => {
  
          // Define the Spotify Connect device, getOAuthToken has an actual token 
          // hardcoded for the sake of simplicity
          player = new Spotify.Player({
            name: 'A Spotify Web SDK Player',
            getOAuthToken: callback => {
              callback(token);
            },
            volume: 1
          });
          player.addListener('initialization_error', ({ message }) => {
            console.error(message);
        });
      
        player.addListener('authentication_error', ({ message }) => {
            console.error(message);
        });
      
        player.addListener('account_error', ({ message }) => {
            console.error(message);
        });
      
          // Called when connected to the player created beforehand successfully
          player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            deviceId=device_id;

      
            // const play = ({
            //   spotify_uri,
            //   playerInstance: {
            //     _options: {
            //       getOAuthToken,
            //       id
            //     }
            //   }
            // }) => {
            //   getOAuthToken(access_token => {
            //     fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
            //       method: 'PUT',
            //       body: JSON.stringify({ uris: [spotify_uri] }),
            //       headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`
            //       },
            //     });
            //   });
            // };
          });
          player.connect();
        }; 
          };
          document.head.appendChild(script); 
         
    }
}