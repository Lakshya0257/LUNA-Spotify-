import { getQueue } from './queue';
import eventBus from '../../event_bus/event_bus';

//disconnecting player before user reload the page
window.addEventListener('beforeunload', event => {
  player.disconnect();
});


//All the variable declarations.
let songPlaying = false;
let queueData = {};
let index = 0;
const timeoutIds = [];
let player = null;
let deviceId = null;

//Initializing player
export const getPlayer = () => {
  return player;
};





//Player play-pause functions.
//Just import it anywhere and call to play and pause the song
export const playerPause = () => {
  player.pause();
  songPlaying = false;
};
export const playerPlay = () => {
  player.resume();
  songPlaying = true;
};



// Clear all setTimeout functions
function terminateUpdatetime() {
  timeoutIds.forEach(id => clearTimeout(id));
}


//playing song
export const playSong = async (data, via) => {
  terminateUpdatetime();

  //Checking if song is played by user or autoplayed via queue.
  if (via === 'onUserClick') {
    index = 0;
  } else if (via === 'autoplay') {
    eventBus.emit('nextSong', data);
    index = index + 1;
  }


  const uri = data['uri'];
  player.activateElement();
  if (player) {
    console.log('playing');
    const token = localStorage.getItem('access_token');
    // Call the player's methods to play the song
    const play = ({
      spotify_uri,
      playerInstance: {
        _options: { getOAuthToken, id }
      }
    }) => {
      getOAuthToken(access_token => {
        fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
          {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );
      });
    };
    play({
      playerInstance: player,
      spotify_uri: uri
    });

    //Listener for updating song progress
    player.addListener(
      'player_state_changed',
      ({ position, duration, track_window: { current_track } }) => {
        if (position === 0) {
          songPlaying = true;
          updateTime();
        }
      }
    );

    //getting queue if user has played the song
    if (via === 'onUserClick') {
      queueData = await getQueue(data['id'], data['artists'][0]['id']);
      console.log('Queue');
      console.log(queueData);
    }
  } else {
    console.error('Player is not available.');
  }
};



//Update time function
//Responsible for updating the sequence and progress of the song.
//Also responsible for auto playback.
const updateTime = async () => {
  let progressBar = document.getElementById('progressBar');
  await player
    .getCurrentState()
    .then(state => {
      if (songPlaying) {
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

        let currentTime = document.getElementById('currentTime');
        let endingTime = document.getElementById('finalTime');
        let minutes = Math.floor(currentPosition / 60000);
        let seconds = Math.floor((currentPosition % 60000) / 1000);
        currentTime.innerHTML =
          minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        let endingMinutes = Math.floor(duration / 60000);
        let endingSeconds = Math.floor((duration % 60000) / 1000);
        endingTime.innerHTML =
          endingMinutes + ':' + (endingSeconds < 10 ? '0' : '') + endingSeconds;
      }
    })
    .catch(error => console.error(error));
  if (progressBar.value == 100 && songPlaying) {
    songPlaying = false;
    progressBar.value = 0;
    console.log('playing-next');
    playerPause();
    playSong(queueData['data']['tracks'][index], 'autoplay');
  } else if (songPlaying) {
    const timeoutId = setTimeout(() => {
      updateTime();
    }, 1000);
    timeoutIds.push(timeoutId);
  }
};



//Initializing the spotify player.
//This is the main entry point where user will create an auto instance of spotify SDK.
//Must Remember- It requires an premium account for working. Free trial accounts are not acceptable.

export default {
  install: (Vue, options) => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.onload = () => {
      let token = localStorage.getItem('access_token');
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
          deviceId = device_id;
        });
        player.connect();
      };
    };
    document.body.appendChild(script);
  }
};
