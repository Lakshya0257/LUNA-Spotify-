import axios from 'axios';
import { APIException } from '../../error_handler/error_handler';
export function getTrackLink(trackHref){
    console.log(trackHref);
    const token=localStorage.getItem('access_token');
    const authHeader = {
        'Authorization': `Bearer ${token}`
    };
    axios.get(trackHref, {
        headers: authHeader
    })
    .then(response => {
        console.log(response);
        const playbackUrl = response.data.preview_url; // Get the `preview_url` field, which contains the playback URL for the track
        console.log(playbackUrl); // Log the playback URL to the console
    })
    .catch(error => {
        console.log(error);
        const error_response=APIException(error);
            if(error_response==='token'){
                getTrackLink(trackHref);
            }
    });
}