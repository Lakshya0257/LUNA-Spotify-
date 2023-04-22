import axios from 'axios';
import { Buffer } from 'buffer';
import {REDIRECT_URI, CLIENT_ID, CLIENT_SECRET} from '../../config'


export function generateAccessToken(){
    const params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', localStorage.getItem('refresh_token'));
      params.append('scope', 'web-playback streaming app-remote-control user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-read-email user-read-private user-follow-read user-follow-modify user-top-read user-read-playback-position user-read-recently-played user-read-playback-state user-modify-playback-state user-read-currently-playing');


      axios
        .post('https://accounts.spotify.com/api/token', params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
          }
        })
        .then(response => {
          console.log('bye');
            console.log(response.data.access_token);
          localStorage.setItem('access_token', response.data.access_token);
          return 'token'
        })
        .catch(e => {
          console.log('bye');
          console.log(e);
        });
}