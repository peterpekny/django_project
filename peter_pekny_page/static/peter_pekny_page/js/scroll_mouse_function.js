let lastScrollTop = 0;
const navbar = document.querySelector('header'); // Vyberieme navigačnú lištu

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    //console.log('LastScrolTop je: ' + lastScrollTop);
    //console.log('ScrollTop je: ' + scrollTop);
    
    if (scrollTop > lastScrollTop) {
        // Posúvaš sa nadol - pridaj triedu na skrytie
        navbar.classList.add('hidden');
    } else {
        // Posúvaš sa nahor - odstráň triedu na zobrazenie
        navbar.classList.remove('hidden');
    }

    //console.log(lastScrollTop);

    lastScrollTop = scrollTop;
});


// Zobrazenie tlačidla pri skrolovaní nadol
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    let scrollTopButton = document.getElementById("scroll-Top");

    if (document.body.scrollTop > 270 || document.documentElement.scrollTop > 250) {
        scrollTopButton.classList.add("show"); // Pridá triedu "show" a zobrazí tlačidlo
    } else {
        scrollTopButton.classList.remove("show"); // Odstráni triedu "show" a skryje tlačidlo
    }
}


// Po kliknutí posun na začiatok stránky
document.getElementById("scroll-Top").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Plinulý prechod
    });
});