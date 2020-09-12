//*********************Search Bar Functionality********************************* */
const urlGifs = 'https://api.giphy.com/v1/gifs/search?';


const lupe = document.getElementById("lupe")
const lupeSticky = document.getElementById("lupe-sticky")
lupe.addEventListener("click", searchGif)
lupeSticky.addEventListener("click", searchGif)

async function searchGif(){
    const searchW = document.getElementById("search-word").value
    const searchWS = document.getElementById("search-word-sticky").value
    console.log(searchW)
    searchGifWord(searchW)
    searchGifWord(searchWS)
}

let showing = 0
let searchTerm 
async function searchGifWord(searchT, start = 0){
    const responseG = await fetch(urlGifs+"q="+searchT+"&"+apiKey)
    const jsonG = await responseG.json()
    searchTerm = searchT
    //console.log(jsonG)
    let dataG = jsonG.data
    console.log(dataG)
    showSearchGif(dataG.slice(start, start+12), start == 0)
    showing = start + 12
}

function seeMore(){
    searchGifWord(searchTerm, showing)
}

const gifResult = document.getElementById("gif-results");
function showSearchGif (dataG, erase = true){
    if (erase) {
        gifResult.innerHTML = ""
    } 
    if (dataG.length == 0){
        const noGif = document.createElement("div");
        noGif.setAttribute("class", "noGif")
        const noContent = 
        `<h1 class="hs"> ${searchTerm}
        <img src="assets/icon-busqueda-sin-resultado.svg" class="noContent-image" alt="icon-sincontenido">
        <h2 class="secondTab hs" id="noGifo"> Intenta con otra búsqueda. </h2>` 
        noGif.innerHTML = noContent
        gifResult.appendChild(noGif)
    } else{  
        for(let e = 0; e < dataG.length; e++){
            const divGif = document.createElement("div");
            divGif.setAttribute("class", "gif-wrapper")
            const gifInfo =
                    `<div class="gif-buttons">
                        <button> <i class="far fa-heart"></i> </button>
                        <button><i class="fas fa-download"></i></button>
                        <button class="expand"><i class="fas fa-expand-alt"></i></button>
                    </div>
                    <div class="information">
                        <img class="gifTrending" alt="gif" src=${dataG[e].images.original.url}>
                        <h4 class="gif-username">${dataG[e].username}</h4>
                        <p class="gif-title">${dataG[e].title}</p>
                    </div>`
            divGif.innerHTML = gifInfo
            gifResult.appendChild(divGif)
            
        } 
    } 
    updatePopups(dataG)
}
