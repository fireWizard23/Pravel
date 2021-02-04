let navMenu = document.querySelector('.nav-menu');
let navLinks = document.querySelector('.nav-links');
let menuHasAppeared = false;
let menuHasClosed = false


document.addEventListener('click', e => {
    if (e.target.classList.contains('nav-menu') || e.target.classList.contains('nav-links')) {
        navLinks.classList.add('clicked');
    } else {
        navLinks.classList.remove('clicked')
    }
})






