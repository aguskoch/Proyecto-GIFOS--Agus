//*************************Apply toggle between Dark and Light Mode****************************************
const btnSwitch = document.querySelector (".switch");
btnSwitch.addEventListener ("click", functionDarkMode);

function functionDarkMode (){
    document.body.classList.toggle ("dark");

    //Saving the mode on LocalStorage
    if(document.body.classList.contains("dark")){
        localStorage.setItem("dark-mode", "true");
    } else{
        localStorage.setItem("dark-mode", "false");
    }
}

//We obtain the mode that the User has - light or dark
if(localStorage.getItem("dark-mode") === "true"){
    document.body.classList.add ("dark");
} else {
    document.body.classList.remove ("dark");
}