import axios from "axios";

export async function getQueue(track,artist){
  console.log('getting queue');
    const token=localStorage.getItem('access_token');
    const authHeader = {
        'Authorization': `Bearer ${token}`
    };
    const params={
        limit:30,
        seed_tracks:track,
        seed_artist:artist
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