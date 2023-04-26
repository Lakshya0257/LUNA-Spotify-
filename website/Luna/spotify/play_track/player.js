import { createApp } from 'vue'
window.addEventListener('beforeunload', event => {
  player.disconnect();
});

let songpPlaying=false;



let player=null;
let deviceId=null;
export const getPlayer = () => {
    return player;
};


export const playerPause=()=>{
  player.pause();
  songpPlaying=false;
}

export const playerPlay=()=>{
  player.resume();
  songpPlaying=true;
}

export const playSong=(uri)=>{
  player.activateElement();
  console.log(uri);
    if (player) {
      console.log('playing')
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
          songpPlaying=true;
          player.addListener('player_state_changed', ({
            position,
            duration,
            track_window: { current_track }
          }) => {
            updateTime();
            console.log('Currently Playing', current_track);
            console.log('Position in Song', position);
            console.log('Duration of Song', duration);
          });
          // setInterval(() => {
          //   updateTime();
          // }, 500);
      } else {
        console.error('Player is not available.');
      }
}


const updateTime=()=>{    
    player.getCurrentState().then(state => {
        if (state && state.position && state.duration) {
          let progressBar=document.getElementById('progressBar');
          const currentPosition = state.position;
          const duration = state.duration;
          const progressPercentage = (currentPosition / duration) * 100;
          progressBar.value = progressPercentage;
          progressBar.style.background =
          'linear-gradient(to right, green, ' +
          (currentPosition / duration) * 100 +
          '%, grey ' +
          (currentPosition / duration) * 100 +
          '%)';

          let currentTime=document.getElementById('currentTime');
          let endingTime=document.getElementById('finalTime');
          let minutes = Math.floor(currentPosition / 60000);
          let seconds = Math.floor((currentPosition % 60000) / 1000); 
        currentTime.innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
          let endingMinutes = Math.floor(duration / 60000);
          let endingSeconds = Math.floor((duration % 60000) / 1000); 
        endingTime.innerHTML = endingMinutes + ':' + (endingSeconds < 10 ? '0' : '') + endingSeconds;
        }
        if(songpPlaying){
          requestAnimationFrame(() => updateTime());
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
          });
          player.connect();
        }; 
          };
          document.body.appendChild(script);
         
    }
}