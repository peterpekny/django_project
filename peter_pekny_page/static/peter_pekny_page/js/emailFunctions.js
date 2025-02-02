// EmailJS authorization token
(function () {
    emailjs.init("g1sD3cjBmIDwCeixQ");
})();

// Submit email form for modal window formular - listener and function
// document.getElementById('email-form').addEventListener('submit', function (event) {
//     event.preventDefault();

//     // Zneaktivujeme tlačidlo submit a nastavíme ho na sivé
//     const submitButton = document.getElementById('modal-form-submit');
//     submitButton.disabled = true;
//     submitButton.style.backgroundColor = '#ccc'; // Nastavíme sivú farbu
//     submitButton.style.cursor = 'not-allowed'; // Nastavíme zmenu kurzora

//     emailjs.sendForm('service_cu5rybq', 'template_tyrxoyq', this)
//         .then(function () {
//             alert('My Email server return 200, so Email sent successfully :)\n \nThank you!\nI will reply soon.');

//             // Zavretie modálneho okna
//             const modal = document.getElementById('emailModal');
//             modal.style.display = 'none';
//             modal.classList.remove('show');

//             // Tlačidlo zostane deaktivované, keďže sa email odoslal úspešne

//         }, function (error) {
//             alert('Error in sending email: ' + JSON.stringify(error));

//             // Ak nastane chyba, znovu aktivujeme tlačidlo a vrátime mu pôvodnú farbu
//             submitButton.disabled = false;
//             submitButton.style.backgroundColor = ''; // Vrátime pôvodnú farbu
//             submitButton.style.cursor = 'pointer'; // Vrátime pôvodný kurzor
//         });
// });



document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submit-email-modal');
    // Nastavíme text a pridáme animované bodky
    //submitButton.innerHTML = 'Sending<span class="sending-text"><span>.</span><span>.</span><span>.</span></span>';
    submitButton.innerHTML = '';
    submitButton.classList.add('sending_email_text');
    submitButton.disabled = true; // Vysediví tlačidlo
    submitButton.style.backgroundColor = '#ccc'; // Nastavíme sivú farbu
    submitButton.style.color = '#ffffff'; // Nastavíme bielu farbu
    submitButton.style.cursor = 'not-allowed'; // Nastavíme zmenu kurzora
    
    emailjs.sendForm('service_cu5rybq', 'template_tyrxoyq', this)
        .then(function() {
            // Po odoslaní emailu necháme tlačidlo vysedivené a s textom "Sent"
            submitButton.classList.remove('sending_email_text');
            submitButton.innerHTML = 'Email was sent';
            // trosku neskor spravime alert kvoli prepisaniu butonu na sent
            setTimeout(() => alert('My email server return 200, so email was sent successfully :)\n \nThank you!\nI will reply soon.'), 1500)
            
            const modal = document.getElementById('emailModal');
            setTimeout(() => modal.style.display = 'none' , 1300); // Skryje modálne okno
            setTimeout(() => modal.classList.remove('show'), 1300); // Odstránenie triedy na skrytie modálneho okna


        }, function(error) {
            // Ak nastane chyba, tlačidlo dame do error stavu
            submitButton.classList.remove('sending_email_text')
            submitButton.innerHTML = 'There was a problem sending the email. Please try reloading the page and submitting the form again. Or feel free to call me and let me know about that. :)';
            submitButton.disabled = true;
            // a vypisme chybu - trosku neskor  
            setTimeout(() => alert('Upsii .. Error in sending email: ' + JSON.stringify(error)), 1000);
        });
});














// Submit email form for page formular - listener and function
document.getElementById('page-email-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Zneaktivujeme tlačidlo submit a nastavíme ho na sivé
    const submitButton = document.getElementById('page-form-submit');
    submitButton.disabled = true;
    submitButton.style.backgroundColor = '#ccc'; // Nastavíme sivú farbu
    submitButton.style.cursor = 'not-allowed'; // Nastavíme zmenu kurzora

    emailjs.sendForm('service_cu5rybq', 'template_tyrxoyq', this)
        .then(function () {
            alert('My Email server return 200, so Email sent successfully :)\n \nThank you!\nI will reply soon.');

            // Zavretie modálneho okna
            const modal = document.getElementById('emailModal');
            modal.style.display = 'none';
            modal.classList.remove('show');

            // Tlačidlo zostane deaktivované, keďže sa email odoslal úspešne

        }, function (error) {
            alert('Error in sending email: ' + JSON.stringify(error));

            // Ak nastane chyba, znovu aktivujeme tlačidlo a vrátime mu pôvodnú farbu
            submitButton.disabled = false;
            submitButton.style.backgroundColor = ''; // Vrátime pôvodnú farbu
            submitButton.style.cursor = 'pointer'; // Vrátime pôvodný kurzor
        });
});