function updatePopups(){
    const fullscreen = document.querySelector(".full-screen")
    const cross = document.getElementById ("cross-full-screen")
    const popup = document.getElementsByClassName('expand');
    console.log(popup)

    for (var i = 0 ; i < popup.length; i++) {
        popup[i].addEventListener('click' , showPopup)
    }

    function closePopup(){
        fullscreen.classList.add('hidden');
    }

    function showPopup(){  
        fullscreen.classList.remove('hidden');
    }
}
updatePopups()
