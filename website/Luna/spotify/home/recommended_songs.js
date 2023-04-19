import axios from 'axios';
import { APIException } from '../../error_handler/error_handler';

export async function getRecommendations(){
    const token=localStorage.getItem('access_token');
    const authHeader = {
        'Authorization': `Bearer ${token}`
    };
    const params={
        limit:10,
        market:'ES',
        seed_artists:'4NHQUGzhtTLFvgF5SZesLK',
        seed_genres:'classical,country',
        seed_tracks:'0c6xIDDpzE81m2q797ordA'
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