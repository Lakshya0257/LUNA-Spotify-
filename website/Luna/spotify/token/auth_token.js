import {REDIRECT_URI, CLIENT_ID, CLIENT_SECRET} from '../../config'
import axios from 'axios';

export function generateAccessToken(){
    const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('code', localStorage.getItem('code'));
      params.append('client_id', CLIENT_ID);
      params.append('client_secret', CLIENT_SECRET);
      params.append('redirect_uri', REDIRECT_URI);
      params.append('scope', 'user-read-playback-state user-modify-playback-state');

      axios
        .post('https://accounts.spotify.com/api/token', params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('refresh_token', response.data.refresh_token);
        //   let spotifyApi = new SpotifyWebApi();
        // spotifyApi.setAccessToken(response.data.access_token);
        // this.$spotify = spotifyApi;
        })
        .catch(e => {
          console.log(e);
        });
}