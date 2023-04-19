import { createApp } from 'vue'; // Import createApp function from Vue

export default {
  install(app) { // Use app instead of Vue as the argument
    window.onSpotifyWebPlaybackSDKReady = () => { // Define the event handler for when SDK is ready
      const player = new Spotify.Player({
        name: 'LUNA',
        getOAuthToken: (callback) => {
          const token = localStorage.getItem('access_token');
          const accessToken = token;
          callback(accessToken);
        }
      });
      player.connect().then((success) => {
        if (success) {
          console.log('Connected to Spotify Web Playback SDK');
        } else {
          console.error('Failed to connect to Spotify Web Playback SDK');
        }
      }).catch((error) => {
        console.error('Error connecting to Spotify Web Playback SDK', error);
      });

      app.config.globalProperties.$spotifyWebPlayback = player; // Register the Spotify Web Playback SDK instance as a global Vue plugin
    };

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
  }
}
