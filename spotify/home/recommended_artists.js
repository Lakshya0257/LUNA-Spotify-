import axios from 'axios';
import { APIException } from '../../error_handler/error_handler';

export async function getRecommendationsArtist(){
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
        .get('https://api.spotify.com/v1/me/top/artists', {
          headers: authHeader,
          params:params
        })
        .then(response => {
          console.log(response);
          apiResponse= response
        })
        .catch(async e => {
          console.log(e);
            const error_response=await APIException(e);
            if(error_response==='token'){
              console.log('success 2')
                return await getRecommendationsArtist();
            }
        });
        if(Object.keys(apiResponse).length !== 0){
            return apiResponse
        }
}