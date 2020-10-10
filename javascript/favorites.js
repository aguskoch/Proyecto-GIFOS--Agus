function favorites(){
    const gifWrappers = document.getElementsByClassName('gif-wrapper');

    for (let i = 0 ; i < gifWrappers.length; i++) {
        let saveFav = gifWrappers[i].getElementsByClassName("save-fav");  
        if(saveFav.length != 0){
            saveFav[0].addEventListener('click', () => saveFavorites(gifWrappers[i]))
        }
        
    }

}
favorites()


let array = []
if(sessionStorage.getItem("fav") != null){
    array = JSON.parse(localStorage.getItem("fav"))
}  
function saveFavorites(gifWrapper){
    let heart = gifWrapper.getElementsByClassName("heart")[0]
    heart.classList.add("heart-active")
    console.log(heart)
    let title = gifWrapper.getElementsByClassName("gif-title")[0].innerText
    let image = gifWrapper.getElementsByClassName("gifTrending")[0].src
    let username = gifWrapper.getElementsByClassName("gif-username")[0].innerText
    let id = heart.id
    var jsonObject = {}
    jsonObject.title = title
    jsonObject.image = image
    jsonObject.username = username
    jsonObject.id = id
    if(!array.some(o =>{
        return jsonObject.id == o.id
    })){
        array.push(jsonObject)     
        let jsonString = JSON.stringify(array)
        localStorage.setItem("fav", jsonString)
    } 
    

}

