// import axios from 'axios'

const URL = "http://localhost:3000/";

function play() {
    var urlInput = document.getElementById('url');
    const params = {url: urlInput.value}
    console.log(urlInput.value);
    //get request to the function 
    axios.get(URL + '/scrape', params)
    .then(data=>console.log(data))
    .catch(err=>console.log(err))

}