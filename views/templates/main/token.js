const redirectUri = 'http://localhost:8080/logged';
const clientId = '33dc8ba580774d068c2d72fc9fb0db2d';
const url = 'https://accounts.spotify.com/api/token'
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');
let tokenExpiresIn;

const verifyTokenExpirationAndRefresh = async () => {
  const currentTime = new Date().getTime() / 1000;
  if(tokenExpiresIn > currentTime) return; 
  await getRefreshToken();
}

const getRefreshToken = async () => {
   // refresh token that has been previously stored
   const refreshToken = localStorage.getItem('refresh_token');
   const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId
      }),
    }
    const response = await fetch(url, payload);
    const body = await response.json();
    if(response.ok){
        localStorage.setItem('access_token', body.access_token);
        localStorage.setItem('refresh_token', body.refresh_token);
    } else {
      window.location.href = HOST_URL;
      return;
    }
    return true;
}
const getToken = async () => {
  let codeVerifier = localStorage.getItem('code_verifier');

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  }

  const response = await fetch(url, payload);
  const body = await response.json();
  if(response.ok){
      localStorage.setItem('access_token', body.access_token);
      localStorage.setItem('refresh_token', body.refresh_token);
      tokenExpiresIn = body.expires_in + new Date().getTime() / 1000;
      return response;
  } /*else {
      console.log(body)
      raiseError(body.error_description + ", trying to get a new one.");
      const retryAttempt = await getRefreshToken()
      document.getElementById('loading').innerHTML = ""
  }*/
}
getToken()