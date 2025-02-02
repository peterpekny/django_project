// window.onload = function() {
//     // Skryje loader, keď je stránka načítaná
//     document.getElementById("loader").style.display = "none";

//     // Zobrazí obsah stránky
//     document.getElementById("content").style.display = "block";
//   };



// window.onload = function() {
//     let img = new Image();
//     img.src = "images/backGroundImage-1400pix.webp";

//     img.onload = function() {
//       // Keď je obrázok načítaný, nastaví sa ako pozadie
//       document.body.style.backgroundImage = `url('${img.src}')`;
//       // Skryje loader a zobrazí obsah
//       document.getElementById("loader").style.display = "none";
//       document.getElementById("content").style.display = "block";
//     };
//   };

//////////////
// Toto fungovalo fajn, len fonty nefungovaly
//
// window.onload = function () {
//     // Funkcia na určenie správneho obrázka podľa šírky obrazovky
//     function getBackgroundImage() {
//         let screenWidth = window.innerWidth;
//         let imageUrl;

//         if (screenWidth >= 2400) {
//             imageUrl = "images/backGroundImage-2400pix.webp";
//         } else if (screenWidth >= 2000) {
//             imageUrl = "images/backGroundImage-2400pix.webp"; // rovnaký obraz ako pre vyššie rozlíšenie
//         } else if (screenWidth >= 1456) {
//             imageUrl = "images/backGroundImage-2000pix.webp";
//         } else {
//             // Môžeš pridať nižšie rozlíšenie, ak chceš
//             imageUrl = "images/backGroundImage-1400pix.webp";
//         }

//         return imageUrl;
//     }

//     // Načítanie pozadia
//     let img = new Image();
//     img.src = getBackgroundImage();

//     img.onload = function () {
//         // Keď je obrázok načítaný, nastaví sa ako pozadie
//         document.body.style.backgroundImage = `url('${img.src}')`;

//         // Ak máš špecifické podmienky pre opakovanie pozadia pri vyššom rozlíšení
//         if (window.innerWidth >= 2400) {
//             document.body.style.backgroundRepeat = 'repeat-x';
//         }

//         // Skrytie loaderu a zobrazenie obsahu stránky
//         document.getElementById("loader").style.display = "none";
//         document.getElementById("loader-background").style.display = "none";
//         document.getElementById("loading-text-1").style.display = "none";
//         // vysivietime celu stranku
//         document.getElementById("content").style.display = "block";
//     };
// };



window.onload = function () {
    // Funkcia na určenie správneho obrázka podľa šírky obrazovky
    function getBackgroundImage() {
        let screenWidth = window.innerWidth;
        let imageUrl;

        if (screenWidth >= 2400) {
            imageUrl = "/static/peter_pekny_page/images/backGroundImage-2400pix.webp";
        } else if (screenWidth >= 2000) {
            imageUrl = "/static/peter_pekny_page/images/backGroundImage-2400pix.webp";
        } else if (screenWidth >= 1456) {
            imageUrl = "/static/peter_pekny_page/images/backGroundImage-2000pix.webp";
        } else {
            imageUrl = "/static/peter_pekny_page/images/backGroundImage-1400pix.webp";
        }

        return imageUrl;
    }

    // Načítanie obrázka pozadia
    let img = new Image();
    img.src = getBackgroundImage();

    // Funkcia na explicitné načítanie požadovaných fontov
    function loadFonts() {
        const fontList = [
            new FontFace('FontName1', 'url(/static/peter_pekny_page/styles/MyFonts/Beckman-FREE.otf)'),
            new FontFace('FontName2', 'url(/static/peter_pekny_page/styles/MyFonts/montserrat/Montserrat-Regular.ttf)'),
            new FontFace('FontName3', 'url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/webfonts/fa-brands-400.woff2)'),
            new FontFace('FontName4', 'url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/webfonts/fa-solid-900.woff2)')
         
        ];

        // Pridáme fonty do dokumentu a načítame ich
        return Promise.all(
            fontList.map(font => {
                document.fonts.add(font);
                return font.load();
            })
        );
    }

    // Definujeme funkciu, ktorá sa spustí po načítaní obrázka a fontov
    function onResourcesLoaded() {
        // Nastavenie pozadia
        document.body.style.backgroundImage = `url('${img.src}')`;

        // Ak máš špecifické podmienky pre opakovanie pozadia pri vyššom rozlíšení
        if (window.innerWidth >= 2400) {
            document.body.style.backgroundRepeat = 'repeat-x';
        }

        // Skrytie loaderu a zobrazenie obsahu stránky
        document.getElementById("loader").style.display = "none";
        document.getElementById("loader-background").style.display = "none";
        document.getElementById("loading-text-1").style.display = "none";
        document.getElementById("content").style.display = "block";
    }

    // Počkáme na načítanie obrázka a explicitné načítanie fontov
    Promise.all([
        new Promise((resolve) => {
            img.onload = resolve; // Spustí sa po načítaní obrázka
        }),
        loadFonts() // Explicitne načítame fonty
    ]).then(onResourcesLoaded);
};