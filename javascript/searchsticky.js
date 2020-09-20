function showSearch(input) {
    var input = window.matchMedia("(min-width: 800px)");
 
    if ((input.matches) && (window.scrollTop > 50 || document.documentElement.scrollTop > 50)){
        document.getElementById("sticky-search-bar-id").style.display= "flex"
        document.getElementById("sticky-search-bar-id").style.flexDirection= "row";
 
     } else {
        document.getElementById("sticky-search-bar-id").style.display= "none";
    }
 }
 window.addEventListener('scroll', showSearch);