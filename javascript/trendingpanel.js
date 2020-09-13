//**************************Trending Carousel Desktop************************* */

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
                <button> <i class="far fa-heart"></i> </button>
                <button><i class="fas fa-download"></i></button>
                <button class="expand"><i class="fas fa-expand-alt"></i></button>
              </div>
              <img class="gifTrending" src=${dataP[p].images.original.url} alt="gif">
              <h4 class="gif-username">${dataP[p].username}</h4>
              <p class="gif-title">${dataP[p].title}</p>`
    gifT.innerHTML = gifInfoT
    track.appendChild(gifT)
    
  } 
  updatePopups(dataP)
} 



const btnFwCarrousel = document.getElementById("btn-fw-carrousel");
btnFwCarrousel.addEventListener("click", () => Move(1))
const btnBwCarrousel2 = document.getElementById("btn-bw-carrousel");
btnBwCarrousel2.addEventListener("click", () => Move(2))


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



//*******************************Trending Carousel Mobile************************** */

const trackMobile = document.querySelector(".slick-track");
const carouselMobile= document.querySelector(".carousel")
let initialPosition = null;
let moving = false;
let transform = 0;

if(screen.innerWidth <=800){
  const gestureStart = (e) => {
    initialPosition = e.pageX;
    moving = true;
    const transformMatrix = window.getComputedStyle(track).getPropertyValue('transform');
    if (transformMatrix !== 'none') {
      transform = parseInt(transformMatrix.split(',')[4].trim());
    }
  }
  const gestureMove = (e) => {
    if (moving) {
      const currentPosition = e.pageX;
      const diff = currentPosition - initialPosition;
      trackMobile.style.transform = `translateX(${transform + diff}px)`;  
    }
  };
  
  const gestureEnd = (e) => {
    moving = false;
  }

  if (window.PointerEvent) {
    window.addEventListener('pointerdown', gestureStart);
  
    window.addEventListener('pointermove', gestureMove);
  
    window.addEventListener('pointerup', gestureEnd);  
  }else{
    window.addEventListener('touchdown', gestureStart);
  
    window.addEventListener('touchmove', gestureMove);
  
    window.addEventListener('touchup', gestureEnd);  
  
  }

}






