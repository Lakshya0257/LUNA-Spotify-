import axios from 'axios';
import { APIException } from '../../error_handler/error_handler';

export async function userSearch(){
    const value=document.getElementById('search-input').value;
    const token=localStorage.getItem('access_token');
    const authHeader = {
        'Authorization': `Bearer ${token}`
    };
    const params={
        limit:30,
        q:value,
        market:'ES',
        offset:5,
        type:'album,track,playlist,artist'
    };
    let apiResponse={};
      await axios
        .get('https://api.spotify.com/v1/search', {
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
                return await userSearch();
            }
        });
        if(Object.keys(apiResponse).length !== 0){
            return apiResponse
        }
}