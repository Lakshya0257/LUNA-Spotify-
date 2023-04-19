import { generateAccessToken } from '../spotify/token/refresh_auth_token'

export function APIException(err){
    if(err.response.status===401){
        console.log('Token expired. Regenerating Token...');
        if(generateAccessToken()==='token'){
            return 'token'
        }
    }
}