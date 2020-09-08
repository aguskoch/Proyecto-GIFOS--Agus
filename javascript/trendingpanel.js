const url = 'https://api.giphy.com/v1/gifs/trending?';
const apiKey = 'api_key=tvATh5CFvKA1cSqBhf3l9c1nBIDYdsV9&fmt=json';

let giphyTrending1 = document.getElementById("gifTrending1");
let giphyTrending2 = document.getElementById("gifTrending2");
let giphyTrending3 = document.getElementById("gifTrending3");
let urls = "";

async function getUrls(){
  const response = await fetch(url+apiKey);
  const json = await response.json();
  //console.log(json)
  return json.data.map(image => image.images.original.url);
}
getUrls().then(images => {
  urls = images;
  giphyTrending1.src = images[0];
  giphyTrending2.src = images[1];
  giphyTrending3.src = images[2];
})


const btnFwCarrousel = document.getElementById("btn-fw-carrousel");
btnFwCarrousel.addEventListener("click", cyclingCF)

let count = 0;
function cyclingCF(){
  count+=3
  if(count>=24){
    count = 0;
  }
  //giphyTrending1.classList.toggle('transparent');
  giphyTrending1.src = urls[count];
  giphyTrending2.src = urls[count+1];
  giphyTrending3.src = urls[count+2];

  //giphyTrending1.classList.toggle('opaque');
}


const btnBwCarrousel2 = document.getElementById("btn-bw-carrousel");
btnBwCarrousel2.addEventListener("click", cyclingCB)
function cyclingCB(){
  count-=3
  if(count<0){
    count = 21;
  }
  giphyTrending1.src = urls[count];
  giphyTrending2.src = urls[count+1];
  giphyTrending3.src = urls[count+2];

}


