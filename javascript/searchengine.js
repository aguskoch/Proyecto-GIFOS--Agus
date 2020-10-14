//*********************Search Bar Functionality********************************* */
import showPopup from "./fullscreentag.js"
import downloadGif from "./download.js"
const urlGifs = 'https://api.giphy.com/v1/gifs/search?';
const apiKey = 'api_key=Xfw2Rr8bA07WpNCqwtJws7z9j7zgOMwz';



const text = document.getElementById("search-word")
const textSticky = document.getElementById("search-word-sticky")
textSticky.addEventListener("keyup", searchGif)
text.addEventListener("keyup", searchGif)

async function searchGif(e){
    if(e.key === "Enter"){
        const searchW = document.getElementById("search-word").value
        const searchWS = document.getElementById("search-word-sticky").value
        searchGifWord(searchW)  
        searchGifWord(searchWS)
    }

}

let showing = 0
let showingSeeMore = false
let searchTerm 
export default async function searchGifWord(searchT, start = 0){
    const responseG = await fetch(urlGifs+"q="+searchT+"&"+apiKey)
    const jsonG = await responseG.json()
    searchTerm = searchT
    let dataG = jsonG.data
    showSearchGif(dataG.slice(start, start+12), start == 0)
    showing = start + 12
}

function seeMore(){
    searchGifWord(searchTerm,showing)
}

const gifResult = document.getElementById("gif-results");
const seeMoreBtn = document.querySelector(".seeMore")

function showSearchGif (dataG, erase = true){
    if (erase) {
        gifResult.innerHTML = ""
    } 
    if (dataG.length == 0){
        const noGif = document.createElement("div")
        noGif.setAttribute("class", "noGif")
        const noContent = 
        `<h1 class="hs"> ${searchTerm}
        <img src="assets/icon-busqueda-sin-resultado.svg" class="noContent-image" alt="icon-sincontenido">
        <h2 class="secondTab hs" id="noGifo"> Intenta con otra búsqueda. </h2>` 
        noGif.innerHTML = noContent
        gifResult.appendChild(noGif)
    } else{
        const div = document.createElement("div")
        div.setAttribute("class", "nameGif")
        const name = document.createElement("h1")
        name.setAttribute("class", "hs")
        name.innerText = searchTerm
        div.appendChild(name)
        gifResult.appendChild(div)

        for(let e = 0; e < dataG.length; e++){
            const divGif = document.createElement("div");
            divGif.setAttribute("class", "gif-wrapper")
            divGif.setAttribute("id", `${dataG[e].id}`)
            const gifInfo =
                    `<div class="gif-buttons">     
                        <button class="save-fav"> <img class="heart" alt="icon"></button>
                        <button class="download"><img src="./assets/icon-download.svg" class="download-btn" alt="icon"></button>
                        <button class="expand"><img src="./assets/icon-max.svg" class="expand-btn" alt="icon"></button>
                    </div>
                    <div class="information">
                        <img class="gifTrending" alt="gif" src=${dataG[e].images.original.url}>
                        <h4 class="gif-username">${dataG[e].username}</h4>
                        <p class="gif-title">${dataG[e].title}</p>
                    </div>`
            divGif.innerHTML = gifInfo
            gifResult.appendChild(divGif)
            let wrapper = document.getElementById(`${dataG[e].id}`)
            wrapper.getElementsByClassName("heart")[0].addEventListener('click', () => saveFavorites(wrapper))
            wrapper.getElementsByClassName("download")[0].addEventListener('click', () => downloadGif(wrapper))
            wrapper.getElementsByClassName("expand")[0].addEventListener('click', () =>  showPopup(wrapper))
        }
        if(showingSeeMore === false){
            const divSearch = document.createElement("button")
            divSearch.setAttribute("id", "gifMoreBtn")
            divSearch.innerText = "VER MÁS"
            seeMoreBtn.appendChild(divSearch)
            const moreBtn = document.getElementById("gifMoreBtn")
            moreBtn.addEventListener("click", seeMore)
            showingSeeMore = true
        }
    } 
}

const lupelight = document.getElementById("lupe-light")
const lupedark = document.getElementById("lupe-dark")
const lupeSticky = document.getElementById("lupe-sticky")
const searchInput = document.getElementById("search-word");
const suggestionsPanel = document.getElementById('suggestions');

function fnAutoComplete(){
    searchInput.addEventListener('keyup', async (event) =>{
    let sug = await getAutoComplete(searchInput.value);
    lupelight.classList.add("search-active")
    lupedark.classList.add("search-active")
    const view = `
      <ul class="suggestions">
          ${sug.data.map(item => `
              <li class="option-list"><i class="fa fa-search suggest"></i>${item.name}</li>
          `).join('')}
      </ul>
      `;
    if(sug.data.length !== 0){
        suggestionsPanel.innerHTML = view
    }else{
        suggestionsPanel.innerHTML = ''
    }

    let optionList = document.getElementsByClassName("option-list");
    for (let j = 0; j < optionList.length; j++){
        optionList[j].addEventListener("click", () => suggestion(optionList[j]))
    }

    function suggestion(optionList){
        const text = optionList.innerText
        searchGifWord(text)
    }

    if(searchInput.value == ""){
    lupelight.classList.remove("search-active")
    lupedark.classList.remove("search-active")
    lupeSticky.classList.remove("search-active")
    }
})
}
fnAutoComplete()

async function getAutoComplete(text){
    const url = 'https://api.giphy.com/v1/gifs/search/tags?api_key=Xfw2Rr8bA07WpNCqwtJws7z9j7zgOMwz&q='+text;
    const response = await fetch(url);
    const data = await response.json();
    return data
}

lupelight.addEventListener("click", deletesearch)
lupedark.addEventListener("click", deletesearch)
function deletesearch(){
    if(lupelight.classList.contains("search-active") || lupedark.classList.contains("search-active")){
        searchInput.value = ""
        suggestionsPanel.innerHTML = ""
        lupelight.classList.remove("search-active")
        lupedark.classList.remove("search-active")
    }
}