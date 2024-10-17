document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('date-picker').classList.add('datepicker');
    document.getElementById('date-picker').addEventListener('change', function() {
        
        if (this.value) {
            this.classList.add('datepicker-selected');
            this.classList.remove('datepicker');
        } else {
            this.classList.add('datepicker');
            this.classList.remove('datepicker-selected');
        }
    });

});


document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('numberSelect').classList.add('numberSelect');
    document.getElementById('numberSelect').addEventListener('change', function() {
        
        if (this.value) {
            this.classList.add('numberSelect-selected');
            this.classList.remove('numberSelect');
        } else {
            this.classList.add('numberSelect');
            this.classList.remove('numberSelect-selected');
        }
    });

});


// Datum auswählen
//Funktion, um das heutige Datum im Format 'YYYY-MM-DD' zu ermitteln
function setMaxDateForDatePicker() {
    const today = new Date().toISOString().split('T')[0]; // Erhalte das heutige Datum
    const dateInput = document.getElementById('date-picker'); // Wähle das Datumseingabefeld aus
    dateInput.setAttribute('max', today); // Setze das 'max'-Attribut auf das heutige Datum

  }
  
  // Wenn das DOM geladen ist, führe die Funktion aus
  document.addEventListener('DOMContentLoaded', setMaxDateForDatePicker);

// Event-Listener für das Dropdown-Feld hinzufügen
document.getElementById('numberSelect').addEventListener('change', function() {
    const selectedValue = this.value; // Hole den ausgewählten Wert
    document.getElementById('selectedHours').innerText = `${selectedValue} Stund`; // Zeige die Auswahl an
});

    function selectField(element) {
      // Entferne die 'selected' Klasse von allen Feldern
      const fields = document.querySelectorAll('.grid-item');
      fields.forEach(field => field.classList.remove('selected'));
  
      // Füge die 'selected' Klasse zu dem angeklickten Feld hinzu
      element.classList.add('selected');
  }

console.log("home.js");

document.getElementById('myort').addEventListener('submit', async function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    // ort
    const gridItems = document.querySelectorAll('.grid-item.selected');
    let selectedLocation = '';
    if (gridItems.length > 0) {
        selectedLocation = gridItems[0].outerText;
    } else {
        alert("Bitte wähle einen Ort aus.");
        return;
    }

    // Datum
    const selectedDate = document.getElementById('date-picker').value;
    if (!selectedDate) {
        alert("Bitte wähle ein Datum aus.");
        return;
    }

    
    
    // Baue die URL mit dem ausgewählten Ort zusammen
    const url = "https://im3.lisastrebel.ch/unload.php?ort="+encodeURIComponent(selectedLocation)+"&erstellt="+encodeURIComponent(selectedDate);
    console.log(url);
    
    // Rufe die Daten ab und aktualisiere den Chart
    let averageUvIndex = 0;
    averageUvIndex = await getApiData(url);

    berechneSchutzzeit(averageUvIndex); // Führt die Schutzzeit-Berechnung aus
});

const gridItems = document.querySelectorAll('.grid-item'); // Get all elements with class "grid-item"
let selectedValue = '';

gridItems.forEach(item => {
    if (item.classList.contains('selected')) { // Check if the element has class "selected"
        selectedValue = item.value; // Get the value of the selected element
    }
});

console.log(selectedValue);


// Funktion, um die Daten von der API abzurufen und den Chart zu aktualisieren
async function getApiData(url) {

    let averageUvIndex = 0;
    return fetch(url)
    .then((response) => response.json())
    .then((myData) => {
        console.log("API Response:", myData); // Überprüfe die Struktur der zurückgegebenen Daten

        // Überprüfe, ob UV-Daten vorhanden sind
        if (!myData.uv_data || myData.uv_data.length === 0) {
            console.error("Keine UV-Daten für den ausgewählten Ort gefunden.");
            return;
        }

        // Führe die UV-Datenverarbeitung aus
        const uvIndex = myData.uv_data.map((item) => item.uv_index);
        const erstellt = myData.uv_data.map((item) => item.erstellt);
        console.log("UV-Index:", uvIndex);
        
        chart.data.labels = erstellt;
        chart.data.datasets[0].data = uvIndex;
        chart.data.datasets[0].label = myData.uv_data[0].ort; // Stelle sicher, dass dies korrekt ist
        
        chart.update();

        // Zeige den durchschnittlichen UV-Index an
        averageUvIndex = myData.average_uv_index;
        console.log(averageUvIndex);
        let averageUvIndexDisplay = averageUvIndex !== null ? averageUvIndex.toFixed(2) : "Nicht verfügbar";
        console.log(averageUvIndexDisplay);

        // return averageUvIndexDisplay;

        return averageUvIndex;
        // Hier kannst du die Schutzzeit berechnen, indem du die Werte von der Schutzzeit-PHP-Datei abfragst
        // Führe den Fetch für die Schutzzeit durch
        // fetch(`schutzzeit.php?hauttyp=${selectedHauttyp}&lsf=${selectedUvSchutz}&uvIndex=${myData.uv_data[0].ort}`)
        //     .then(response => response.json())
        //     .then(schutzData => {
        //         // Hier verarbeite die Schutzzeit-Daten
        //         console.log("Schutzzeit Daten:", schutzData);
        //         // Füge Logik hinzu, um die Schutzzeit anzuzeigen
        //     });
    })
    .catch((error) => {
        console.error("Fehler beim Abrufen der Daten: ", error);
    });


}

// Chart-Initialisierung
const ctx = document.getElementById("myChart").getContext("2d");

let chart = new Chart(ctx, {
    type: "line", // oder "bar" falls du Balkendiagramm willst
    data: {
        labels: [], // Leere Labels, bis die Daten kommen
        datasets: [
            {
                label: "UV-Index", // Das Label für den UV-Index
                data: [], // Leere Daten, bis die Daten kommen
                borderColor: 'rgba(75, 192, 192, 1)', // Beispielhafter Rand für die Linie
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Transparenter Hintergrund
                borderWidth: 1,
                fill: true // Die Fläche unter der Linie füllen
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true // Die Y-Achse bei 0 beginnen
            }
        }
    }
});

let selectedHauttyp = null; // Globale Variable zur Speicherung des Hauttyps
let selectedUvSchutz = null; // Globale Variable zur Speicherung des UV-Schutzes

function selectSkinType(button) {
    // Entfernt die 'selected'-Klasse von allen Hauttyp-Buttons
    document.querySelectorAll('.box1').forEach(btn => btn.classList.remove('selected'));

    // Fügt die 'selected'-Klasse zum geklickten Button hinzu
    button.classList.add('selected');

    // Speichert den ausgewählten Hauttyp (extrahiert die Zahl aus dem Text des Buttons)
    const skinTypeText = button.querySelector('span').textContent.trim();
    selectedHauttyp = skinTypeText.match(/\d+/)[0]; // Extrahiert die Nummer vom Hauttyp (z.B. '1' für Hauttyp 1)
    
    console.log("Ausgewählter Hauttyp:", selectedHauttyp); // Zu Debugging-Zwecken
}

function selectUvSchutz(button) {
    // Entfernt die 'selected'-Klasse von allen UV-Schutz-Buttons
    document.querySelectorAll('.uvSchutzbox').forEach(btn => btn.classList.remove('selected'));
    
    // Fügt die 'selected'-Klasse zum geklickten Button hinzu
    button.classList.add('selected');

    // Speichert den ausgewählten UV-Schutz (30 oder 50 oder 0 für gar nöd)
    const uvSchutzText = button.nextElementSibling.textContent.trim(); // Holt den Text neben dem Button (z.B. Sonnenschutz 30)
    
    if (uvSchutzText.includes('30')) {
        selectedUvSchutz = 30;
    } else if (uvSchutzText.includes('50')) {
        selectedUvSchutz = 50;
    } else {
        selectedUvSchutz = 0; // gar nöd
    }

    console.log("Ausgewählter UV-Schutz:", selectedUvSchutz); // Zu Debugging-Zwecken
}

// Schutzzeit-Berechnung und Ergebnisanzeige
function berechneSchutzzeit(averageUvIndex) {
    console.log("Berechne Schutzzeit...");
    // Prüft, ob ein Hauttyp ausgewählt wurde
    if (!selectedHauttyp) {
        alert("Bitte wähle einen Hauttyp aus.");
        return;
    }

    // Prüft, ob ein UV-Schutz ausgewählt wurde
    if (selectedUvSchutz === null) {
        alert("Bitte wähle eine Sonnenschutzstufe aus.");
        return;
    }

    console.log("averageUvIndex in berechneSchutzzeit:", averageUvIndex);

    // Sendet eine GET-Anfrage mit dem ausgewählten Hauttyp und UV-Schutz
    fetch(`https://im3.lisastrebel.ch/unload2.php?hauttyp=${selectedHauttyp}&lsf=${selectedUvSchutz}&uvindex=${averageUvIndex}`)
    .then(response => response.json())
    .then(data => {
        console.log("Server Response:", data); // Fügt dies hinzu, um die Antwort zu überprüfen
        if (data.error) {
            document.getElementById('result').innerHTML = `<p style="color: red;">Fehler: ${data.error}</p>`;
        } else {
            if (data.length > 0) {
                let resultHtml = "<ul>";
                console.log(data);
                data.forEach(item => {
                    const totalMinutes = item.geschuetzt; // Angenommen, 'geschuetzt' ist die Zeit in Minuten
                    const hours = Math.floor(totalMinutes / 60); // Ganze Stunden
                    const minutes = totalMinutes % 60; // Verbleibende Minuten

                    // Ausgabe im Format "X Stunden Y Minuten"
                    resultHtml += `${hours} Stunden ${minutes} Minuten`;
                });
                resultHtml += "</ul>";
                document.getElementById('result').innerHTML = resultHtml;
            } else {
                document.getElementById('result').innerHTML = "<p>Keine Ergebnisse gefunden.</p>";
            }

            console.log("dürfen:", data[0].geschuetzt);

            let wirklich = document.getElementById('numberSelect').value * 60;

            console.log("wirklich:", wirklich); 
            if (data[0].geschuetzt > wirklich) {
                document.getElementById('resultattext').innerText = `Wow, dass hesch du super gmacht!`;
            } else {    
                document.getElementById('resultattext').innerText = `Ouh...nöchstmal besser meh Sunnecreme bruche :/`;
            }

        }
    })

    .catch(error => {
        console.log("Fetch Error:", error); // Fehler in der Anfrage anzeigen
        document.getElementById('result').innerHTML = `<p style="color: red;">Fehler: ${error.message}</p>`;
    });
}