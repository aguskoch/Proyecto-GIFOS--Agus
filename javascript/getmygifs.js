const urlget = "https://api.giphy.com/v1/gifs?"
const apiKey = 'api_key=Xfw2Rr8bA07WpNCqwtJws7z9j7zgOMwz';
import showPopup from "./fullscreentag.js"
import downloadGif from "./download.js"

let mygifsBtnMore = document.getElementById("misgifos-button")
mygifsBtnMore.addEventListener("click", () => seeMore())
let mygifsArray = JSON.parse(localStorage.getItem("mygifs"))
let myGifsLink = document.getElementById("misgifos-link")
myGifsLink.addEventListener("click", () => getGifs())
async function getGifs(){
    if (mygifsArray == null){
        const mygifsimages = document.getElementById("misgifos-images")
        const noMyGif =

        `<div>
            <img src="assets/icon-mis-gifos-sin-contenido.svg" class="noContent-image" alt="icon-misgifos-sincontenido" id="misgifos-icon-noContent">
            <h2 class="secondTab hs"> ¡Anímate a crear tu primer GIFO! </h2>
        </div>`
    
        mygifsimages.innerHTML = noMyGif
    } else{
        let mygifsToString = Array.prototype.map.call(mygifsArray, s => s.id).toString();
        const response = await fetch(urlget+apiKey+"&ids="+mygifsToString);
        const json = await response.json();
        data = json.data
        renderGifs()
    }
    
}
getGifs()

let data
let showing = 0
function renderGifs(){
    console.log(data)
    let dataCount = data.slice(showing, showing+12)
    const mygifsimages = document.getElementById("misgifos-images")
    for(let e = 0; e < dataCount.length; e++){ 
        const divGif = document.createElement("div");
        divGif.setAttribute("class", "gif-wrapper")
        divGif.setAttribute("id", `${dataCount[e].id}`)
        const gifInfo =
                `<div class="gif-buttons">     
                    <button class="save-fav"> <img class="heart" id=${dataCount[e].id} alt="icon"></button>
                    <button class="download"><img src="./assets/icon-download.svg" class="download-btn" alt="icon"></button>
                    <button class="expand"><img src="./assets/icon-max.svg" class="expand-btn" alt="icon"></button>
                </div>
                <div class="information">
                    <img class="gifTrending" alt="gif" src=${dataCount[e].images.original.url}>
                    <h4 class="gif-username">${dataCount[e].username}</h4>
                    <p class="gif-title">${dataCount[e].title}</p>
                </div>`
        divGif.innerHTML = gifInfo
        mygifsimages.appendChild(divGif)
        let wrapper = document.getElementById(`${dataCount[e].id}`)
        wrapper.getElementsByClassName("heart")[0].addEventListener('click', () => saveFavorites(wrapper))
        wrapper.getElementsByClassName("download")[0].addEventListener('click', () => downloadGif(wrapper))
        wrapper.getElementsByClassName("expand")[0].addEventListener('click', () =>  showPopup(wrapper))
        
    }
    showing = showing + 12
}

function seeMore(){
    renderGifs(showing)
}