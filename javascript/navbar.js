function boxShadow() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("header").classList.add('floating-nav');
    } else {
        document.getElementById("header").classList.remove('floating-nav');
    }
}
window.addEventListener('scroll', boxShadow);


function showSearch(input) {
   var input = window.matchMedia("(min-width: 800px)");

   if ((input.matches) && (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)){
       document.getElementById("sticky-search-bar-id").style.display= "flex";
   } else {
       document.getElementById("sticky-search-bar-id").style.display= "none";
   }
 }
 window.addEventListener('scroll', showSearch);