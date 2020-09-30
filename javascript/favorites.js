
function favorites(){
    const fullscreen = document.querySelector(".full-screen")
    const gifWrappers = document.getElementsByClassName('gif-wrapper');
    //console.log(gifWrappers)

    for (let i = 0 ; i < gifWrappers.length; i++) {
        let saveFav = gifWrappers[i].getElementsByClassName("save-fav");     
        saveFav[0].addEventListener('click', () => saveFavorites(gifWrappers[i]))
    }

}
favorites()


let array = []
if(sessionStorage.getItem("fav") != null){
    array = JSON.parse(sessionStorage.getItem("fav"))
}

function saveFavorites(gifWrapper){
    let heart = gifWrapper.getElementsByClassName("heart")[0]
    heart.classList.add("heart-active")
    let title = gifWrapper.getElementsByClassName("gif-title")[0].innerText
    let image = gifWrapper.getElementsByClassName("gifTrending")[0].src
    let username = gifWrapper.getElementsByClassName("gif-username")[0].innerText
    var jsonObject = {}
    jsonObject.title = title
    jsonObject.image = image
    jsonObject.username = username
    if(!array.some(o =>{
        return jsonObject.image == o.image
    })){
        array.push(jsonObject)     
        let jsonString = JSON.stringify(array)
        sessionStorage.setItem("fav", jsonString)
    } 
    

}

