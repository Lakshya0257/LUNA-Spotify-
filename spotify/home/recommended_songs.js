import axios from 'axios';
import { APIException } from '../../error_handler/error_handler';

export async function getRecommendations(){
    const token=localStorage.getItem('access_token');
    let errorResponse;
    const authHeader = {
        'Authorization': `Bearer ${token}`
    };
    const params={
        limit:30,
        time_range:'medium_term',
    };
    let apiResponse={};
      await axios
        .get('https://api.spotify.com/v1/me/top/tracks', {
          headers: authHeader,
          params:params
        })
        .then(response => {
          console.log(response);
          apiResponse= response
        })
        .catch(async e => {
          console.log(e);
            errorResponse=await APIException(e);
        });
        if(Object.keys(apiResponse).length !== 0){
            return apiResponse
        }else if(errorResponse==='token'){
          console.log("pppppp");
          return await getRecommendations();
        }
}