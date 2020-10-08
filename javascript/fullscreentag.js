//***************************************FullScreen Tag ************************************************* */
import {downloadGif} from "./download.js"
let downloadHandler = null
export default function updatePopups(){
    const fullscreen = document.querySelector(".full-screen")
    const cross = document.getElementsByClassName ("contract")
    const gifWrappers = document.getElementsByClassName('gif-wrapper');

    
    let input = window.matchMedia("(min-width: 800px)")
    if(input.matches){
        for (let i = 0 ; i < gifWrappers.length; i++) {
            let popup = gifWrappers[i].getElementsByClassName("expand");         
            popup[0].addEventListener('click', () => showPopup(gifWrappers[i]))
        }
    }
    else{
        for (let i = 0 ; i < gifWrappers.length; i++) {
            let popup = gifWrappers[i]
            popup.addEventListener('click', () => showPopup(gifWrappers[i]))
        }
    }

    function showPopup(gifWrapper){  
        fullscreen.classList.remove('hidden');
        //Get image from Gif-Wrapper
        let image = gifWrapper.getElementsByClassName("gifTrending")[0].currentSrc
        let gifTrendingfullscreen = document.getElementsByClassName ("gifTrending-fullscreen")[0]
        gifTrendingfullscreen.src = image;

        //Get title from Gif-Wrapper
        let title = gifWrapper.getElementsByClassName("gif-title")[0].innerText
        let gifTitleFullScreen = document.getElementsByClassName ("gif-title-full-screen")[0]
        gifTitleFullScreen.innerText = title

        //Get Username from Gif-Wrapper
        let username = gifWrapper.getElementsByClassName("gif-username")[0].innerText
        let gifUsernameFullScreen = document.getElementsByClassName ("gif-username-full-screen")[0]
        gifUsernameFullScreen.innerText = username

        let saveFav = document.getElementsByClassName("save-fav-full-screen");
        saveFav[0].addEventListener('click', () => saveFavorites(gifWrapper))

        let download = document.getElementsByClassName("download-full-screen");
        if (downloadHandler != null){
            download[0].removeEventListener("click", downloadHandler)
        }
        downloadHandler = () => downloadGif(gifWrapper)
        download[0].addEventListener('click', downloadHandler)


    }

    for (let o = 0; o < cross.length; o++){
        cross[o].addEventListener("click", closePopup)
    }
    function closePopup(){
        fullscreen.classList.add('hidden');
    }

}
updatePopups()

