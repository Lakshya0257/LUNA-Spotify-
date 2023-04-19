import {REDIRECT_URI, CLIENT_ID, CLIENT_SECRET} from '../../config'

var state = generateRandomString(16);
var scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state';


export function userLogin(){
  localStorage.setItem('access_token', 'null');
      window.location =
        'https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
          response_type: 'code',
          client_id: CLIENT_ID,
          scope: scope,
          redirect_uri: REDIRECT_URI,
          state: state
});
}

function generateRandomString(length) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}