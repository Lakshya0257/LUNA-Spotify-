import axios from "axios";

export async function getQueue(track,artist){
  console.log('getting queue');
    const token=localStorage.getItem('access_token');
    const authHeader = {
        'Authorization': `Bearer ${token}`
    };

    let acousticness;
    let danceability;
    let energy;
    let instrumentalness;
    let liveness;
    let loudness;
    let speechiness;


    await axios
        .get(`https://api.spotify.com/v1/audio-features/${track}`, {
          headers: authHeader,
        })
        .then(response => {
          acousticness=response.data.acousticness;
          danceability=response.data.danceability;
          energy=response.data.energy;
          instrumentalness=response.data.instrumentalness;
          liveness=response.data.liveness;
          loudness=response.data.loudness;
          speechiness=response.data.speechiness;
        })
        .catch(async e => {
          console.log(e);
            const error_response=await APIException(e);
            if(error_response==='token'){
                getQueue();
            }
        });

    const params={
        limit:30,
        seed_tracks:track,
        seed_artist:artist,
        target_acousticness:acousticness,
        target_danceability:danceability,
        target_energy:energy,
        target_instrumentalness:instrumentalness,
        target_liveness:liveness,
        target_loudness:loudness,
        target_speechiness:speechiness

    };
    let apiResponse={};
      await axios
        .get('https://api.spotify.com/v1/recommendations', {
          headers: authHeader,
          params:params
        })
        .then(response => {
          console.log(`Queue: ${response}`);
          apiResponse= response
        })
        .catch(async e => {
          console.log(e);
            const error_response=await APIException(e);
            if(error_response==='token'){
                getQueue();
            }
        });
        if(apiResponse!={}){
            return apiResponse
        }
}