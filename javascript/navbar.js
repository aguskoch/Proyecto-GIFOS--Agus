function boxShadow() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("header").classList.add('floating-nav');
    } else {
        document.getElementById("header").classList.remove('floating-nav');
    }
}
window.addEventListener('scroll', boxShadow);

