const button = document.getElementById('submit');
const HOST_URL = "http://localhost:8080"
const numberOfClustersInput = document.getElementById('cluster-number')
const loadingElement = document.getElementById('loading')
let clustersData;

const getClusters = async () => {
  loadingStart()
  verifyTokenExpirationAndRefresh()
  //if(!tokenIsValid) await getRefreshToken()
  const response = await fetch(`${HOST_URL}/generate?clusters=${numberOfClustersInput.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('access_token'),
    }
  })
 const body = await response.json()
  if(!response.ok) {
      if(response.status == 401) {
        const success = await getRefreshToken()
        if(!success) raiseError(body.message);
      }
      loadingEnd()
  }
  document.getElementById('graph').innerHTML = body.figure
  clustersData = body.data
  createClustersElements(body.data)
  loadingEnd()
  button.innerText = "I want to do it again"
}
numberOfClustersInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    getClusters()
  }
})
button.addEventListener('click', getClusters)
