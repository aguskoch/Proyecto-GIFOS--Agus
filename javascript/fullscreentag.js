function updatePopups(dataG){
    const fullscreen = document.querySelector(".full-screen")
    const cross = document.getElementsByClassName ("contract")
    const popup = document.getElementsByClassName('expand');
    console.log(popup)

    for (let i = 0 ; i < popup.length; i++) {
        popup[i].addEventListener('click' , showPopup)
    }

    function showPopup(dataG){  
        fullscreen.classList.remove('hidden');
        const gifusernamefullscreen = document.getElementsByClassName ("gif-username-full-screen")
        for (let e = 0; e < gifusernamefullscreen.length; e++){
            gifusernamefullscreen =+ dataG[e].username;
        }
    }

    for (let o = 0; o < cross.length; o++){
        cross[o].addEventListener("click", closePopup)
    }
    function closePopup(){
        fullscreen.classList.add('hidden');
    }
}
updatePopups()
