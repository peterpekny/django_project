// Funkcia pre nacitanie vysledkou s tabulky score
// volame to hned po nacitani..
function loadScores() {
    fetch('https://peter.pekny.online/php/get_scores.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            // Vytvoríme tabuľku alebo zoznam a naplníme ho výsledkami vrátane pozície
            let scoreTable = '<table><tr><th>Position</th><th>Player name</th><th>Score</th></tr>';
            data.forEach(score => {
                scoreTable += `<tr><td>${score.pozicia}</td><td>${score.player_name}</td><td>${score.score}</td></tr>`;
            });
            scoreTable += '</table>';
            document.getElementById('score-list').innerHTML = scoreTable; // Zobrazíme tabuľku v elemente s id="score-list"
        })
        .catch(error => {
            console.error('Error fetching scores:', error);
        });
}

// Funkciu volam po zapisani tabulky vysledkou s aktualnymi datami
//
function loadScoresAfter() {
    fetch('https://peter.pekny.online/php/get_scores.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            // Vytvoríme tabuľku alebo zoznam a naplníme ho výsledkami
            let scoreTable = '<table><tr><th>Position</th><th>Player name</th><th>Score</th></tr>';
            data.forEach(score => {
                scoreTable += `<tr><td>${score.pozicia}</td><td>${score.player_name}</td><td>${score.score}</td></tr>`;
            });
            scoreTable += '</table>';
            document.getElementById('score-list-after').innerHTML = scoreTable; // Zobrazíme tabuľku v elemente s id="score-list"
        })
        .catch(error => {
            console.error('Error fetching scores:', error);
        });

    document.getElementById('score-list-after').style.display = 'flex';
}


// Spustíme načítanie vysledkov pre tabulku do hry po načítaní stránky
window.addEventListener('DOMContentLoaded', loadScores);
