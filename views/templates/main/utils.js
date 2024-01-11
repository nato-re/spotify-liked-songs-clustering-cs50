const loadingStart = () => {
  button.innerText = "Loading..."
  loadingElement.innerHTML = '<div class="lds-ripple"><div></div><div></div></div>'
}
const loadingEnd = () => { document.getElementById('loading').innerHTML = ""}
const raiseError = (message) => {
    console.log(message)
    document.getElementById('error').innerHTML = message
    setTimeout(() => {document.getElementById('error').innerHTML = ""}, 5000)
}
