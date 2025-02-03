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
