const clusterContainer = document.getElementById('clusters-container')
const createElement = (type, text, className, child) => {
  const element = document.createElement(type)
  element.innerText = text
  element.className = className
  return element
}
const BASE_URL = `http://localhost:8080`
const createCreatePlaylistButton = (songIds, playlistName) => {
  const btn = createElement('button', 'Create this', 'playlist-btn');
  btn.addEventListener('click', async () => {
    try {
      loadingStart()
      const response = await fetch(`${BASE_URL}/playlist`, {
        method: "POST",
        body: JSON.stringify({ song_ids: songIds, playlist_name: playlistName }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('access_token'),
        }
      })
      if(!response.ok){
        throw await response.json()
      }
    } catch (error) {
      console.log(error);
      raiseError(error)
    } finally {
      loadingEnd()
    }    
  })
  return btn
}
const createClustersElements = (clustersData) => {
  clusterContainer.innerHTML = ""
  clustersData.forEach((cluster, index) => {
    const summary = createElement('summary', `Cluster ${index + 1}: ${cluster.name}`, 'cluster-summary')
    const details = createElement('details', null, 'cluster-details')
    if(index === 0) details.open = true
    details.appendChild(summary)
    const list = createElement('ul', null, 'cluster-list')
    const songIds = [];
    cluster.musics.forEach((item) => {
      const listItem = createElement('li', item.name, 'cluster-list-item')
      list.appendChild(listItem)
      songIds.push(item.id)
    })
    details.appendChild(createCreatePlaylistButton(songIds, cluster.name))
    details.appendChild(list)
    clusterContainer.appendChild(details)
  });
}
