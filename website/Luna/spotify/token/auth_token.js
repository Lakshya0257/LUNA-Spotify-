import {REDIRECT_URI, CLIENT_ID, CLIENT_SECRET} from '../../config'
import axios from 'axios';

export function generateAccessToken(){
  console.log('trying');
    const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('code', localStorage.getItem('code'));
      // params.append('client_id', CLIENT_ID);
      // params.append('client_secret', CLIENT_SECRET);
      params.append('redirect_uri', REDIRECT_URI);
      params.append('scope', 'web-playback streaming app-remote-control user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-read-email user-read-private user-follow-read user-follow-modify user-top-read user-read-playback-position user-read-recently-played user-read-playback-state user-modify-playback-state user-read-currently-playing');
      axios 
        .post('https://accounts.spotify.com/api/token', params, {
          headers: {
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => {
          console.log('hii');
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('refresh_token', response.data.refresh_token);
        //   let spotifyApi = new SpotifyWebApi();
        // spotifyApi.setAccessToken(response.data.access_token);
        // this.$spotify = spotifyApi;
        })
        .catch(e => {
          console.log('Error');
          console.log(e);
        });
}