//**************************Trending Carousel *********************************** */

const url = 'https://api.giphy.com/v1/gifs/trending?';
const apiKey = 'api_key=Xfw2Rr8bA07WpNCqwtJws7z9j7zgOMwz';


async function getUrls(){
  const response = await fetch(url+apiKey);
  const json = await response.json();
  let dataP = json.data
  console.log(dataP)
  showTrendingPanel(dataP.slice(0,10))
}
getUrls()

function showTrendingPanel (dataP){
  for(let p = 0; p < dataP.length; p++){
    const gifT = document.createElement("div");
    gifT.setAttribute("class", "gif-wrapper")
    const gifInfoT =
            `<div class="gif-buttons">
                <button class="save-fav"> <img class="heart" id=${dataP[p].id} alt="icon"></button>
                <button class="download"><img src="./assets/icon-download.svg" class="download-btn" alt="icon"></button>
                <button class="expand"><img src="./assets/icon-max.svg" class="expand-btn" alt="icon"></button>
              </div>
              <img class="gifTrending" src=${dataP[p].images.original.url} alt="gif">
              <h4 class="gif-username">${dataP[p].username}</h4>
              <p class="gif-title">${dataP[p].title}</p>`
    gifT.innerHTML = gifInfoT
    track.appendChild(gifT)
    
  } 
  updatePopups(dataP)
  favorites(dataP)
  download()
} 



const btnFwCarrousel = document.getElementById("btn-fw-carrousel");
btnFwCarrousel.addEventListener("click", () => Move(2))
const btnBwCarrousel2 = document.getElementById("btn-bw-carrousel");
btnBwCarrousel2.addEventListener("click", () => Move(1))


function Move(value){
    const track = document.getElementById('track');
    const gifWrapperAll = document.querySelectorAll (".gif-wrapper")
    const slickList = document.getElementById('slick-list');
    const slickWidth = gifWrapperAll[0].offsetWidth;
    const listWidth = slickList.offsetWidth;
    const trackWidth = track.offsetWidth;

    track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);
    if(leftPosition < (trackWidth - listWidth) && value == 2) {
      track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    } else if(leftPosition > 0 && value == 1) {
      track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
}








