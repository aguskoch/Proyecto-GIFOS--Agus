let start = 12
let showing = 0
let favoritesButtonMore = document.getElementById("favorites-button")
favoritesButtonMore.addEventListener("click", () => obtainFavorites())
let favoritesLink = document.getElementById("favorites-link")
favoritesLink.addEventListener("click", () => obtainFavorites())



let sessionStorageLength = sessionStorage.length
let sessionStorageGIF = []
for(let y = 0; y < sessionStorageLength; y++){
    let infoDiv = sessionStorage.getItem(sessionStorage.key(y))
    if (infoDiv.includes("GIF")){
       sessionStorageGIF.push(infoDiv)
    }
} 
function obtainFavorites(){  
    let favoritesResults = document.getElementById("favorites-images")
    let favArray = JSON.parse(sessionStorage.getItem("fav"))
    for (let i = 0; i < favArray.length; i++){
        console.log(favArray)
        const divGif = document.createElement("div");
            divGif.setAttribute("class", "gif-wrapper")
            const gifInfo =
                    `<div class="gif-buttons">
                        <button class="save-fav"> <i class="far fa-heart"></i> </button>
                        <button class="download"><i class="fas fa-download"></i></button>
                        <button class="expand"><i class="fas fa-expand-alt"></i></button>
                    </div>
                    <div class="information">
                        <img class="gifTrending" alt="gif" src=${favArray[i].image}>
                        <h4 class="gif-username">${favArray[i].username}</h4>
                        <p class="gif-title">${favArray[i].title}</p>
                    </div>`
            console.log([i].image)
            divGif.innerHTML = gifInfo
            favoritesResults.appendChild(divGif)
    }

    updatePopups()
}
obtainFavorites()

