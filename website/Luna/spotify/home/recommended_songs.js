import axios from 'axios';
import { APIException } from '../../error_handler/error_handler';

export async function getRecommendations(){
    const token=localStorage.getItem('access_token');
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