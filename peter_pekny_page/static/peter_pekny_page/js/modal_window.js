// Ovládanie modálneho okna
document.getElementById('openEmailForm').addEventListener('click', function (event) {
    event.preventDefault(); // Zabránime predvolenému správaniu odkazu
    const modal = document.getElementById('emailModal');
    modal.style.display = 'flex'; // Zobrazíme modal
    // Pridáme malú časovú pauzu na spustenie prechodu
    setTimeout(function () {
        modal.classList.add('show');
    }, 10);
});

// Zatvorenie modálneho okna
document.querySelector('.close-btn').addEventListener('click', function () {
    const modal = document.getElementById('emailModal');
    modal.classList.remove('show');
    // Počkáme na dokončenie prechodu pred skrytím modalu
    setTimeout(function () {
        modal.style.display = 'none';
    }, 500);
});

// Zatvorenie modálneho okna kliknutím mimo formulára
window.addEventListener('click', function (event) {
    const modal = document.getElementById('emailModal');
    if (event.target == modal) {
        modal.classList.remove('show');
        setTimeout(function () {
            modal.style.display = 'none';
        }, 500);
    }
});