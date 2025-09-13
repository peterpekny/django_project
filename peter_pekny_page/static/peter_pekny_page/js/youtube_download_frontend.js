        document.getElementById("youtube-form").onsubmit = async function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            fetch("/", {method: "POST", body: formData})
                .then(resp => resp.json())
                .then(data => console.log(data));

            let checkCount = 0;
            const maxChecks = 20;

            const interval = setInterval(async () => {
                try {
                    const resp = await fetch("/youtube-progress/");
                    const prog = await resp.json();

                    // Aktualizácia progress baru
                    const percent = prog.percent ? prog.percent.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,'').replace('%','') : 0;
                    document.getElementById("progress-inner").style.width = percent + "%";
                    document.getElementById("progress-text").innerText =
                        `Stiahnuté: ${prog.percent || '0%'} | Rýchlosť: ${prog.speed || ''} | ETA: ${prog.eta || ''}`;

                    if (prog.done) {
                        checkCount++;
                        const file = prog.filepath || '';

                        // Spustíme len ak je to finálny .mp4, nie fXXX.mp4 alebo fXXX.webm
                        const baseName = file.split("\\").pop();
                        const forbiddenPattern = /\.(f\d{3}\.(mp4|webm))$/i;

                        if (file.endsWith(".mp4") && !forbiddenPattern.test(baseName)) {
                            clearInterval(interval);
                            document.getElementById("progress-text").innerText = "✅ Hotovo: " + file;

                            // Trigger download
                            const link = document.createElement('a');
                            link.href = "/" + file.replace("\\","/");
                            link.download = baseName;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        } else if (checkCount >= maxChecks) {
                            clearInterval(interval);
                            document.getElementById("progress-text").innerText = "❌ Finálny súbor .mp4 sa nenašiel.";
                        }
                    }

                } catch(e) {
                    console.error("Chyba pri získavaní progressu:", e);
                }
            }, 1000);
        };
