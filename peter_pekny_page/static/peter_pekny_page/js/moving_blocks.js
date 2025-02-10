// Script: looking for h1 element with sibling calss = "hiding_content"
// -------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const headings = document.querySelectorAll("h1");

    headings.forEach((heading) => {
        heading.addEventListener("click", function () {
            // Skontrolujeme, či nasledujúci element obsahuje triedu "hiding_content"
            let content = this.parentNode.nextElementSibling;
            //console.log(content);

            if (content && content.classList.contains("hiding_content")) {
                // Skontrolujeme, či je blok už otvorený
                if (content.classList.contains("open")) {
                    // Zatvoríme ho, ak je otvorený
                    content.style.maxHeight = "0";
                } else {
                    // Otvoríme ho a nastavíme maximálnu výšku
                    content.style.maxHeight = content.scrollHeight + "px";
                }
                content.classList.toggle("open"); // Pridáme alebo odstránime triedu 'open'
            }
        });
    });
});

// Function for upper navigation - looking for element with ID and togle first one
// -------------------------------------------------------------------------------
function openSection(sectionId) {
    let section = document.getElementById(sectionId);
    //console.log(section);
    if (section && section.classList.contains("hiding_content")) {
        // Skontrolujeme, či je blok už otvorený
        if (section.classList.contains("open")) {
            // Zatvoríme ho, ak je otvorený
            section.style.maxHeight = "0";
        } else {
            // Otvoríme ho a nastavíme maximálnu výšku
            section.style.maxHeight = section.scrollHeight + "px";
        }
        section.classList.toggle("open"); // Pridáme alebo odstránime triedu 'open'
    }
}

// Function for upper navigation - open banch of elements (getElementsByName = looking for elements with name="")
// --------------------------------------------------------------------------------------------------------------
function openSections(sectionsName) {
    let allCurriculumSections = document.getElementsByName(sectionsName);
    //console.log(allCurriculumSections[0]);      

    for (let i = 0; i < allCurriculumSections.length; i++) {
        //console.log(allCurriculumSections[i]);

        if (allCurriculumSections[i] && allCurriculumSections[i].classList.contains("hiding_content")) {
            // Skontrolujeme, či je blok už otvorený
            if (allCurriculumSections[i].classList.contains("open")) {
                // Zatvoríme ho, ak je otvorený
                allCurriculumSections[i].style.maxHeight = "0";
            } else {
                // Otvoríme ho a nastavíme maximálnu výšku
                allCurriculumSections[i].style.maxHeight = allCurriculumSections[i].scrollHeight + "px";
            }
            allCurriculumSections[i].classList.toggle("open"); // Pridáme alebo odstránime triedu 'open'
        }
    }
}



// Po načítaní stránky nájde všetky kategórie (h2).
// Pri kliknutí na h2 sa otvoria/zatvoria články pod ním.
// Spočíta sa výška otvorených článkov a prispôsobí sa veľkosť hlavného kontajnera (project_content), aby sa obsah správne zobrazoval.
// Zabezpečí plynulé animácie otvárania/zatvárania článkov pomocou max-height.

// Po načítaní stránky sa tento kód spustí
document.addEventListener("DOMContentLoaded", function () { 

    // Vyhľadáme všetky nadpisy h2 (kategórie článkov)
    const headings = document.querySelectorAll("h2");

    // Nájdeme hlavný kontajner, do ktorého sa budú články rozširovať
    const project_content = document.getElementById("project_content");

    // Premenná na sledovanie celkovej výšky obsahu
    let project_content_maxHeight = 0; 

    // Prejdeme všetky h2 nadpisy a pridáme im klikaciu funkciu
    headings.forEach((heading) => {
        heading.addEventListener("click", function () {
            
            // Nájdeme rodičovský kontajner aktuálnej kategórie
            let categoryContainer = this.closest(".category");

            // Nájdeme všetky články (hiding_content) v tejto kategórii
            let articles = categoryContainer.querySelectorAll(".hiding_content");

            // Zistíme aktuálnu výšku hlavného kontajnera (project_content)
            let categoryMenuSize = parseFloat(project_content.style.maxHeight) || 0;  

            // Premenná na spočítanie výšky otvorených článkov
            let addedHeight = 0;  

            // Prejdeme všetky články v danej kategórii a otvoríme/zatvoríme ich
            articles.forEach((content) => {
                if (content.classList.contains("open")) {
                    // Ak je článok otvorený, zatvoríme ho
                    content.style.maxHeight = "0";
                    content.classList.remove("open");
                    addedHeight -= content.scrollHeight; 
                } else {
                    // Ak je článok zatvorený, otvoríme ho a nastavíme výšku
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.classList.add("open");
                    addedHeight += content.scrollHeight; 
                }
            });

            // Aktualizujeme celkovú výšku hlavného kontajnera, aby obsah nepretŕčal
            project_content_maxHeight += addedHeight;
            project_content.style.maxHeight = (project_content_maxHeight + categoryMenuSize) + "px";
        });
    });
});
