export async function getQueue(track,artist){
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
          console.log(response);
          apiResponse= response
        })
        .catch(e => {
          console.log(e);
            const error_response=APIException(e);
            if(error_response==='token'){
                getRecommendations();
            }
        });
        if(apiResponse!={}){
            return apiResponse
        }
}