//*********************Search Bar Functionality********************************* */
const urlGifs = 'https://api.giphy.com/v1/gifs/search?';


const lupe = document.getElementById("lupe")
const lupeSticky = document.getElementById("lupe-sticky")
lupe.addEventListener("click", searchGif)
lupeSticky.addEventListener("click", searchGif)

async function searchGif(){
    const searchW = document.getElementById("search-word").value
    const searchWS = document.getElementById("search-word-sticky").value
    searchGifWord(searchW)
    searchGifWord(searchWS)

}

let showing = 0
let searchTerm 
async function searchGifWord(searchT, start = 0){
    const responseG = await fetch(urlGifs+"q="+searchT+"&"+apiKey)//+"&offset="+showing)
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
            const gifInfo =
                    `<div class="gif-buttons">     
                        <button class="save-fav"> <img src="./assets/icon-fav-hover.svg" id="heart" class="heart" alt="icon"></button>
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
            
        }
        if(showing < 12){
            const divSearch = document.createElement("button")
            divSearch.setAttribute("id", "gifMoreBtn")
            divSearch.innerText = "VER MÁS"
            seeMoreBtn.appendChild(divSearch)
            const moreBtn = document.getElementById("gifMoreBtn")
            moreBtn.addEventListener("click", seeMore)
        }
    } 
    updatePopups(dataG)
    favorites(dataG)
    download(dataG)
}


const searchInput = document.getElementById("search-word");
const suggestionsPanel = document.getElementById('suggestions');

function fnAutoComplete(){
    searchInput.addEventListener('keyup', async (event) =>{
    let sug = await getAutoComplete(searchInput.value);
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
        console.log(optionList)
        optionList[j].addEventListener("click", () => suggestion(optionList[j]))
    }

    function suggestion(optionList){
        const text = optionList.innerText
        searchGifWord(text)
    }
})
}
fnAutoComplete()

async function getAutoComplete(text){
    console.log(text)
    const url = 'https://api.giphy.com/v1/gifs/search/tags?api_key=Xfw2Rr8bA07WpNCqwtJws7z9j7zgOMwz&q='+text;
    const response = await fetch(url);
    const data = await response.json();
    return data
}
