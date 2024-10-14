console.log("uv-index.js");

document.getElementById('myort').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite
    
    const selectedLocation = document.getElementById('selectort').value;
    
    // Baue die URL mit dem ausgewählten Ort zusammen
    const url = `https://im3.lisastrebel.ch/uv-index_api.php?ort=${selectedLocation}`;
    
    // Rufe die Daten ab und aktualisiere den Chart
    getApiData(url);
});

// Funktion, um die Daten von der API abzurufen und den Chart zu aktualisieren
function getApiData(url) {
    fetch(url)
    .then((response) => response.json())
    .then((myData) => {
        console.log("API Response:", myData); // Überprüfe die Struktur der zurückgegebenen Daten

        // Wenn die Daten leer sind, logge eine Fehlermeldung
        if (myData.length === 0) {
            console.error("Keine Daten für den ausgewählten Ort gefunden.");
            return; // Beende die Funktion, wenn keine Daten vorhanden sind
        }

        // Führe die Datenverarbeitung nur aus, wenn Daten vorhanden sind
        const uvIndex = myData.map((item) => item.uv_index);
        const erstellt = myData.map((item) => item.erstellt);
        console.log("UV-Index:", uvIndex);
        
        chart.data.labels = erstellt;
        chart.data.datasets[0].data = uvIndex;
        chart.data.datasets[0].label = myData[0].ort;
        
        chart.update();
    })
    .catch((error) => {
        console.error("Fehler beim Abrufen der Daten: ", error);
            console.log(myData);
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

