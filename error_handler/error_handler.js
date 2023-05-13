import { generateAccessToken } from '../spotify/token/refresh_auth_token';

export async function APIException(err) {
  if (err.response.status === 401) {
    console.log('Token expired. Regenerating Token...');
    if ((await generateAccessToken()) === 'token') {
      console.log('success 1');
      return 'token';
    }
  } else if (err.response.status === 404) {
    console.log('Resource not found.');
    // Handle 404 error
    return 'not_found';
  } else if (err.response.status === 400) {
    console.log('Bad request.');
    // Handle 400 error
    return 'bad_request';
  } else if (err.response.status === 403) {
    console.log('Forbidden access.');
    // Handle 403 error
    return 'forbidden';
  } else if (err.response.status === 429) {
    console.log('Too many requests. Please try again later.');
    // Handle 429 error
    return 'too_many_requests';
  } else if (err.response.status === 500) {
    console.log('Internal server error.');
    // Handle 500 error
    return 'internal_server_error';
  }
  // Handle other status codes here
  else {
    console.log('Unhandled error:', err.response.status);
    return 'unknown_error';
  }
}
