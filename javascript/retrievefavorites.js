let favoritesButtonMore = document.getElementById("favorites-button")
favoritesButtonMore.addEventListener("click", () => seeMore())
let favoritesLink = document.getElementById("favorites-link")
favoritesLink.addEventListener("click", () => obtainFavorites())

let start = 0
let showing = 0
function obtainFavorites(){  
    let favArray = JSON.parse(sessionStorage.getItem("fav"))
    let favCount = favArray.slice(start, start+12)
    let favoritesResults = document.getElementById("favorites-images")
    if (favCount == null){
        const noFav =

        `<div>
            <img src="assets/icon-fav-sin-contenido.svg" class="noContent-image" alt="icon-misgifos-sincontenido" id="misgifos-icon-noContent">
            <h2 class="secondTab hs"> "¡Guarda tu primer GIFO en Favoritos 
            para que se muestre aquí!" </h2>
        </div>`

        favoritesResults.innerHTML = noFav
    } else{
        for (let i = 0; i < favCount.length; i++){
            const divGif = document.createElement("div");
                divGif.setAttribute("class", "gif-wrapper")
                const gifInfo =
                        `<div class="gif-buttons">
                            <button class="trash-fav"> <img src="./assets/icon_trash.svg" class="fa-trash-alt" alt="icon"> </button>
                            <button class="download"><img src="./assets/icon-download.svg" class="download-btn" alt="icon"></button>
                            <button class="expand"><img src="./assets/icon-max.svg" class="expand-btn" alt="icon"></button>
                        </div>
                        <div class="information">
                            <img class="gifTrending" alt="gif" src=${favArray[i].image}>
                            <h4 class="gif-username">${favArray[i].username}</h4>
                            <p class="gif-title">${favArray[i].title}</p>
                        </div>`
                divGif.innerHTML = gifInfo
                favoritesResults.appendChild(divGif)
        }
    }
    updatePopups()
    showing = start + 12
}
obtainFavorites()

function seeMore(){
    obtainFavorites()
    console.log(showing)
    console.log(start)
}

function eliminatefavorites(){
    const fullscreen = document.querySelector(".full-screen")
    const gifWrappers = document.getElementsByClassName('gif-wrapper');
    //console.log(gifWrappers)

    for (let i = 0 ; i < gifWrappers.length; i++) {
        let trashFav = gifWrappers[i].getElementsByClassName("trash-fav");     
        trashFav[0].addEventListener('click', () => eliminateFav(gifWrappers[i]))
    }

}
eliminatefavorites()

function eliminateFav(gifWrapper){
    let favArray = JSON.parse(sessionStorage.getItem("fav"))
    console.log(favArray)

    for (let i = 0; i < favArray.length; i++){
        if(favArray[i].image == gifWrapper.getElementsByClassName("gifTrending")[0].src){
            favArray.splice(i,1)
            let jsonString = JSON.stringify(favArray)
            sessionStorage.setItem("fav", jsonString)
            break
        }   
    }
}