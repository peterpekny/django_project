// Keď používateľ stlačí tlačidlo Play
document.getElementById('play-button').addEventListener('click', function () {
    document.getElementById('intro-container').style.display = 'none'; // Skryjeme úvodnú obrazovku
    document.getElementById('game-container').style.display = 'flex'; // Zobrazíme hernú plochu
    spustiHru(); // Spustíme hru

});



function spustiHru() {

    //let velkost_X = 50;
    //let velkost_Y = 20;

    // Funkcia pre nastavenie velkost hracej plochy podla rozlisenia
    function nastavVelkostHraciehoPola() {
        let velkost_X, velkost_Y;

        if (window.innerWidth >= 992) {
            // Ak je rozlíšenie >= 992px, nastavíme väčšie pole
            velkost_X = 50;
            velkost_Y = 20;
        } else {
            // Ak je rozlíšenie menšie, môžeme nastaviť menšie pole
            velkost_X = 20;
            velkost_Y = 25;
        }
        console.log(window.innerWidth);
        console.log(`Velkost hracieho pola: ${velkost_Y}x${velkost_X}`);
        // Vratime velkost X,Y
        return { velkost_X, velkost_Y };
    }

    // Zavoláme funkciu na nastavenie veľkosti hracej plochy pri spustení hry
    let rozmeryHraciehoPola = nastavVelkostHraciehoPola();

    let velkost_X = rozmeryHraciehoPola.velkost_X;
    let velkost_Y = rozmeryHraciehoPola.velkost_Y;


    let backGround_value = '<span class="bunka sky">  </span>';
    let building_value = '<span class="bunka">██</span>';
    //let building_value = '<span class="bunka strecha"><svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><polygon points="0,0 0,12 12,12 12,0" fill="brown" /></svg></span>';
    let flagSymbol = '<span class="bunka">🖕</span>';
    let strecha = '<span class="bunka">/\\</span>';
    //let strecha = '<span class="bunka strecha"><svg width="14" height="12" xmlns="http://www.w3.org/2000/svg"><polygon points="6,0 0,12 12,12" fill="darkblue" /></svg></span>';
    //let plane = '🛸';
    let plane = 'X';
    //let plane = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><!-- Telo UFO --><ellipse cx="12" cy="8" rx="9" ry="3" fill="silver" /><!-- Vrchná časť UFO (kupola) --><ellipse cx="12" cy="5" rx="4" ry="2" fill="lightblue" /><!-- Svetlá UFO --><circle cx="5" cy="9" r="1" fill="yellow" /><circle cx="9" cy="10" r="1" fill="yellow" /><circle cx="12" cy="10" r="1" fill="yellow" /><circle cx="15" cy="10" r="1" fill="yellow" /><circle cx="19" cy="9" r="1" fill="yellow" /></svg>';
    let bombSymbol = '<span class="bunka font-12">💣</span>';
    let explosionSymbol = '<span class="bunka">🔥</span>';
    let min_building = 0;
    let max_building = 9;
    let pocetKrokovNastavbuStrechy = 10;
    let obmedzenie_bomb = 5;
    let cas_horenia = 11000;
    let cas_jedneho_kroku = 200;
    let planeX = velkost_X - plane.length;
    let planeY = 0;
    var audio2 = new Audio('/static/peter_pekny_page/audio/bomb2.mp3'); // bomb explosion
    var audio1 = new Audio('/static/peter_pekny_page/audio/bomb3.wav');
    var audio = new Audio('/static/peter_pekny_page/audio/drop_bomb_sounds_2.wav');  // bomb push
    var backgroundMusic = new Audio('/static/peter_pekny_page/audio/background_game_music.mp3'); // Background Music
    let gameOver = false;
    let victory = false;
    let score = 0;
    let playBoard = [];
    let bombs = [];
    let explosions = [];
    let krokovLietadla = 0;
    let gameInterval; // Deklarujeme interval ako globálnu premennú - potrebujeme to kvoli spravnemu ukonceniu hry
    // Pridáme všetky zvukové zdroje do poľa, aby sme mohli ovládať ich hlasitosť naraz
    let allSounds = [audio, audio1, audio2, backgroundMusic];

    // Pridaj premennú pre sledovanie stavu hry (pozastavená/aktívna)
    let paused = false;



    // Vygenerujeme pole pre PlayBoard
    for (let y = 0; y < velkost_Y; y++) {
        playBoard[y] = [];
        for (let x = 0; x < velkost_X; x++) {
            playBoard[y][x] = backGround_value;
        }
    }

    // PAUSE GAME Listener 
    const pauseButton = document.getElementById('pause-button');
    const pauseIcon = document.getElementById('pause-icon');

    // Pridáme event listener na kliknutie
    pauseButton.addEventListener('click', function () {
        paused = !paused; // Prepíname medzi stavom pozastavené/nepozastavené

        if (paused) {
            pauseIcon.classList.remove('fa-pause');
            pauseIcon.classList.add('fa-play'); // Zmeni ikonu na play, keď je hra pozastavená
        } else {
            pauseIcon.classList.remove('fa-play');
            pauseIcon.classList.add('fa-pause'); // Zmeni ikonu na pause, keď hra pokračuje
        }
    });


    // Pridajeme funkciu na prepínanie stavu mute/unmute
    let isMuted = false;  // Premenná pre sledovanie stavu mute
    const muteButton = document.getElementById('mute-button');
    const muteIcon = document.getElementById('mute-icon');

    muteButton.addEventListener('click', function () {
        isMuted = !isMuted;  // Prepneme stav medzi mute a unmute

        if (isMuted) {
            // Stíšiť všetky zvuky
            allSounds.forEach(sound => sound.volume = 0);
            muteIcon.classList.remove('fa-volume-up');
            muteIcon.classList.add('fa-volume-mute'); // Zmena ikony na mute
            muteIcon.classList.add('colorred');  // Zmena ikony  mute na red
        } else {
            // Obnoviť hlasitosť všetkých zvukov
            allSounds.forEach(sound => sound.volume = 1);  // Alebo nastav hlasitosť podľa potreby
            muteIcon.classList.remove('fa-volume-mute');
            muteIcon.classList.remove('colorred');
            muteIcon.classList.add('fa-volume-up');  // Zmena ikony na unmute
        }
    });



    function playBoardMusic(zadaj_status) {
        if (zadaj_status === 'start') {
            backgroundMusic.volume = 1;  // Začneme s plnou hlasitosťou
            backgroundMusic.play();
        } else if (zadaj_status === 'stop') {
            // Fade-out efekt
            let fadeOutInterval = setInterval(function () {
                if (backgroundMusic.volume > 0.1) {
                    backgroundMusic.volume -= 0.1;  // Znižuj hlasitosť
                } else {
                    backgroundMusic.volume = 0;  // Nastav hlasitosť na 0
                    backgroundMusic.pause();  // Zastav hudbu
                    backgroundMusic.currentTime = 0;  // Vráť sa na začiatok
                    clearInterval(fadeOutInterval);  // Zastav interval po fade-out
                }
            }, 200);  // Znižovanie hlasitosti každých 200 ms
        }
    }



    // Funkcia na generovanie náhodného čísla
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function updateBombCount() {
        let remainingBombs = obmedzenie_bomb - bombs.length;
        let bombIcons = '';
        for (let i = 0; i < remainingBombs; i++) {
            bombIcons += '💣';
        }
        document.getElementById('bomb-count').innerHTML = 'Cartrige load: ' + bombIcons;
    }

    function generateBuildings() {
        for (let x = 1; x < velkost_X - 1; x++) {
            let randomHeight = getRandomInt(min_building, max_building);
            if (randomHeight > 1) {
                playBoard[velkost_Y - randomHeight][x] = strecha;
                playBoard[velkost_Y - randomHeight - 1][x] = flagSymbol;
            }
            for (let y = velkost_Y - 1; y > velkost_Y - randomHeight; y--) {
                playBoard[y][x] = building_value;
            }
        }
    }

    function triggerVictoryAnimation() {
        // Skontroluj, či je Victory stav
        if (victory) {
            // Vyber lietadlo (prvý element s triedou 'plane')
            let planeElement = document.querySelector(".plane");  // Teraz vieme vybrať lietadlo
            if (planeElement) {
                planeElement.style.animation = "plane-fly-off 2s forwards"; // Spustíme animáciu odletu
            }

            // Počkajte na dokončenie animácie a potom vykonaj ďalšie kroky
            setTimeout(function () {
                renderBoard(); // Zobrazenie "Victory" obrazovky
            }, 2000); // 2 sekundy trvanie animácie
        }
    }


    function submitScore() {
        const playerName = document.getElementById('player-name').value;
        const playerScore = score;  // Použijeme skóre z premennej

        // Deaktivujeme tlačidlo pre odosielanie, aby sme zamedzili opakovanému odosielaniu
        const submitButton = document.querySelector('#submit-score-form button');
        submitButton.disabled = true;

        fetch('https://peter.pekny.online/php/submit_score.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ player: playerName, score: playerScore }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    document.getElementById('submit-message').innerText = 'Score was successfuly saved !';

                    loadScoresAfter();
                } else {
                    document.getElementById('submit-message').innerText = 'Issue occours, on score saving.';
                }
            })
            .catch((error) => {
                document.getElementById('submit-message').innerText = 'Connection issue.';
            });
    }


    function checkVictory() {
        for (let y = 0; y < velkost_Y; y++) {
            for (let x = 0; x < velkost_X; x++) {
                if (playBoard[y][x] === strecha) {
                    return false;
                }
            }
        }
        //playBoardMusic('stop');
        return true;
    }

    function renderBoard() {
        if (gameOver) {
            document.getElementById("board").innerHTML = '<div class="game-over">GAME OVER</div>';
            document.getElementById('bomb-count').style.display = 'none';
            document.getElementById('mute-button').style.display = 'none';
            document.getElementById('pause-icon').style.display = 'none';
            //document.getElementById('score').style.display = 'none';
            document.getElementById('popis').style.display = 'none'
            playBoardMusic('stop');
            clearInterval(gameInterval); // Zastavíme interval, aby hra nepokračovala

            // Pridáme tlačidlo na reštart hry
            document.getElementById("board").innerHTML += `
                                        <button id="restart-button" class="btn btn-outline-myColor mt-3">Restart Game</button>
                                    `;

            // Event listener pre reštart hry
            document.getElementById('restart-button').addEventListener('click', function () {
                restartGame(); // Funkcia na reštart hry
            });

            return;
        }
        if (victory) {
            //document.getElementById("board").innerHTML = '<div class="victory">Vyhral si, tvoje skóre bolo: ' + score + '</div>';

            document.getElementById("board").innerHTML = `
                                            <div class="victory">You WIN !!! .. your score was: ${score}</div>
                                            <form id="submit-score-form" class="submit-score-form">
                                                <input type="text" id="player-name" class="custom-input" placeholder="Add Your Name" maxlength="7" required>
                                                <button class="btn btn-outline-myColor mt-3" type="submit">Save score</button>
                                                <button id="restart-button" class="btn btn-outline-myColor mt-3">Restart Game</button>
                                            </form>
                                            <div id="submit-message"></div>
                                            
                                        `;

            document.getElementById('bomb-count').style.display = 'none';
            document.getElementById('mute-button').style.display = 'none';
            document.getElementById('pause-icon').style.display = 'none';
            document.getElementById('score').style.display = 'none';
            document.getElementById('popis').style.display = 'none'
            //triggerVictoryAnimation();  // Spustí animáciu lietadla
            playBoardMusic('stop');

            // Pridáme event listener na odoslanie formulára
            document.getElementById('submit-score-form').addEventListener('submit', function (event) {
                event.preventDefault();
                submitScore();
            });

            // Event listener pre reštart hry
            document.getElementById('restart-button').addEventListener('click', function () {
                restartGame(); // Funkcia na reštart hry
            });

            clearInterval(gameInterval); // Zastavíme interval, aby hra nepokračovala 

            return;

        }

        document.getElementById('bomb-count').style.display = 'block';

        let boardHtml = '';
        for (let y = 0; y < playBoard.length; y++) {
            for (let x = 0; x < playBoard[y].length; x++) {
                if (y === planeY && x >= planeX && x < planeX + plane.length) {
                    // Obalíme lietadlo do <span> s triedou 'plane'
                    //boardHtml += `<span class="plane">${plane[x - planeX]}</span>`;
                    boardHtml += `<img class="plane" src="static/peter_pekny_page/images/space-alien-kawaii-cartoon-character.webp" alt="">`;
                } else if (bombs.some(b => b.y === y && b.x === x)) {
                    boardHtml += bombSymbol;
                } else if (explosions.some(e => e.y === y && e.x === x)) {
                    boardHtml += explosionSymbol;
                } else {
                    boardHtml += playBoard[y][x];
                }
            }
            boardHtml += "<br>";
        }
        document.getElementById("board").innerHTML = boardHtml;
        document.getElementById("score").innerHTML = 'Score: ' + score;

        if (checkVictory()) {
            victory = true;
            renderBoard();
        }
    }

    function movePlane() {
        if (gameOver || victory) return;

        for (let x = 0; x < plane.length; x++) {
            if (planeY < velkost_Y && playBoard[planeY][planeX + x] !== backGround_value) {
                gameOver = true;
                renderBoard();
                return;
            }
        }

        if (planeY % 2 === 0) {
            planeX--;
            if (planeX < 0) {
                planeX = 0;
                planeY++;
            }
        } else {
            planeX++;
            if (planeX > velkost_X - plane.length) {
                planeX = velkost_X - plane.length;
                planeY++;
            }
        }
        if (planeY >= velkost_Y) {
            planeY = 0;
        }

        krokovLietadla++;
        if (krokovLietadla % pocetKrokovNastavbuStrechy === 0) {
            kontrolujABudujStrechy();
        }

        renderBoard();
    }

    function moveBombs() {
        if (gameOver || victory) return; // Ak je hra ukončená, ukončíme funkciu

        // posunieme bombu == popripade doratame bod
        bombs = bombs.filter(b => {
            b.y++;
            if (b.y >= velkost_Y) {
                score--; // Ak bomba opustí hraciu plochu bez explózie, odpočítame 1 bod
                return false; // Odstránime bombu zo zoznamu
            }

            if (playBoard[b.y][b.x] === strecha) {
                playBoard[b.y][b.x] = backGround_value;
                playBoard[b.y - 1][b.x] = backGround_value;
                explosions.push({ x: b.x, y: b.y });
                audio.play();
                score++;
                setTimeout(() => {
                    if (!gameOver && !victory) { // Kontrola stavu pred obnovením herného poľa
                        explosions = explosions.filter(e => e.x !== b.x || e.y !== b.y);
                        renderBoard();
                    }
                }, cas_horenia);
                return false;
            }

            if (playBoard[b.y][b.x] === building_value) {
                playBoard[b.y][b.x] = backGround_value;
                explosions.push({ x: b.x, y: b.y });
                audio.play();
                score++;
                setTimeout(() => {
                    if (!gameOver && !victory) { // Kontrola stavu pred obnovením herného poľa
                        explosions = explosions.filter(e => e.x !== b.x || e.y !== b.y);
                        renderBoard();
                    }
                }, cas_horenia);
                return false;
            }

            return true;
        });
    }


    // Skontroluje strechy a ak je dom velky 5poli doplni strechy
    // Spusta sa s funkcie movePlane
    function kontrolujABudujStrechy() {
        // check if the game is over
        if (gameOver || victory) return;

        for (let x = 1; x < velkost_X - 1; x++) {
            let vyskaBudovy = 0;
            let stlpecHorí = explosions.some(e => e.x === x);

            if (stlpecHorí) {
                continue;
            }

            for (let y = velkost_Y - 1; y >= 0; y--) {
                if (playBoard[y][x] === building_value) {
                    vyskaBudovy++;
                } else if (playBoard[y][x] === strecha) {
                    vyskaBudovy = 0;
                    break;
                }
            }

            if (vyskaBudovy > 5) {
                playBoard[velkost_Y - vyskaBudovy][x] = strecha;
                playBoard[velkost_Y - vyskaBudovy - 1][x] = flagSymbol;
            }
        }
    }

    function dropBomb() {
        // check if the game is over
        if (gameOver || victory) return;

        if (bombs.length < obmedzenie_bomb) {
            let bombX = planeX + Math.floor(plane.length / 2);
            let bombY = planeY + 1;
            bombs.push({ x: bombX, y: bombY });
            audio2.play();
        }
    }

    function restartGame() {
        // Resetujeme všetky potrebné premenné
        gameOver = false;
        victory = false;
        score = 0;
        krokovLietadla = 0;
        planeX = velkost_X - plane.length;
        planeY = 0;
        bombs = [];
        explosions = [];

        // Reset hracej plochy
        playBoard = [];
        for (let y = 0; y < velkost_Y; y++) {
            playBoard[y] = [];
            for (let x = 0; x < velkost_X; x++) {
                playBoard[y][x] = backGround_value;
            }
        }

        // dame prec tabulku
        document.getElementById('score-list').style.display = 'none';
        document.getElementById('score-list-after').style.display = 'none';
        document.getElementById('score').style.display = 'flex';

        // Vygenerovanie nových budov
        generateBuildings();

        // Spustíme znovu interval hry
        gameInterval = setInterval(() => {
            if (!paused) {  // Kontrolujeme, či hra nie je pozastavená
                movePlane();
                moveBombs();
                updateBombCount();
            }
        }, cas_jedneho_kroku);

        // Zobrazíme hernú plochu a spustíme hudbu
        renderBoard();
        playBoardMusic('start');
    }

    function ukazPole() {
        console.log('PlayBoard');
        console.log(playBoard);
        
        console.log('explosions: ');
        console.log(explosions);
        
        console.log('bombs: ');
        console.log(bombs);
    }

    window.addEventListener('keydown', function (event) {
        if (event.key === ' ' && !gameOver && !victory) {
            dropBomb();
        }
    });

    window.addEventListener('touchstart', function (event) {
        if (!gameOver && !victory) {
            dropBomb();
        }
    });

    window.addEventListener('keydown', function (event) {
        if (event.key === 'n') {
            ukazPole();
        }
    });


    generateBuildings();

    gameInterval = setInterval(() => {
        if (!paused) {  // Kontrolujeme, či hra nie je pozastavená
            movePlane();
            moveBombs();
            updateBombCount();
        }
    }, cas_jedneho_kroku);


    renderBoard();
    playBoardMusic('start'); // pojde nam muzika
}