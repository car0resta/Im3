document.getElementById('schutzForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Verhindert das Standard-Formularverhalten (Seiten-Neuladen)

    // Holt die Werte aus dem Formular
    const hauttyp = document.getElementById('hauttyp').value;
    const lsf = document.getElementById('lsf').value;

    // Sendet eine GET-Anfrage an das PHP-Skript
    fetch(`unload2.php?hauttyp=${hauttyp}&lsf=${lsf}`)
        .then(response => response.json()) // Wandelt die Antwort in JSON um
        .then(data => {
            // Prüft, ob ein Fehler zurückgegeben wurde
            if (data.error) {
                document.getElementById('result').innerHTML = `<p style="color: red;">Fehler: ${data.error}</p>`;
            } else {
                // Falls erfolgreich, zeigt die Schutzzeiten an
                if (data.length > 0) {
                    let resultHtml = "<ul>";
                    data.forEach(item => {
                        resultHtml += `<li>Sonnenschutzzeit: ${item.geschuetzt} Minuten</li>`;
                    });
                    resultHtml += "</ul>";
                    document.getElementById('result').innerHTML = resultHtml;
                } else {
                    document.getElementById('result').innerHTML = "<p>Keine Ergebnisse gefunden.</p>";
                }
            }
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<p style="color: red;">Fehler: ${error.message}</p>`;
        });
});
