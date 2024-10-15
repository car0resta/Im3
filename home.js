// Datum auswählen
//Funktion, um das heutige Datum im Format 'YYYY-MM-DD' zu ermitteln
function setMaxDateForDatePicker() {
    const today = new Date().toISOString().split('T')[0]; // Erhalte das heutige Datum
    const dateInput = document.getElementById('date-picker'); // Wähle das Datumseingabefeld aus
    dateInput.setAttribute('max', today); // Setze das 'max'-Attribut auf das heutige Datum
  }
  
  // Wenn das DOM geladen ist, führe die Funktion aus
  document.addEventListener('DOMContentLoaded', setMaxDateForDatePicker);


  let testdiv = document.querySelector('#test');
    console.log(testdiv);   
// Event-Listener für das Dropdown-Feld hinzufügen
let numberSelect = document.querySelector('#numberSelect');
console.log(numberSelect);
numberSelect.addEventListener('change', validateSelection);

function validateSelection() {
    const selectElement = document.getElementById('numberSelect');
    const selectedValue = selectElement.value;

    if (selectedValue >= 1 && selectedValue <= 24) {
        // Gültige Zahl: Hintergrundfarbe auf Grün setzen
        selectElement.style.backgroundColor = '#F4E225';
        selectElement.style.color = '#044389';
    } else {
        // Ungültige Auswahl: Hintergrundfarbe auf Rot setzen (falls notwendig)
        selectElement.style.backgroundColor = 'lightcoral';
    }
}



// // Anzahl Stunden auswählen
//   function validateInput() {
//     const input = document.getElementById('numberInput').value;
//     const number = parseInt(input, 10);

//     if (isNaN(number) || number < 1 || number > 24) {
//         inputElement.style.backgroundColor = 'lightcoral';
//         alert("Bitte geben Sie eine gültige Zahl zwischen 1 und 24 ein.");
//         return false; // Formular wird nicht abgesendet
//     }
//     else {
//       // Gültige Zahl: Setze die Hintergrundfarbe auf Grün
//       inputElement.style.backgroundColor = 'lightgreen';
//       return true; // Formular kann abgesendet werden
//   }}



    function selectField(element) {
      // Entferne die 'selected' Klasse von allen Feldern
      const fields = document.querySelectorAll('.grid-item');
      fields.forEach(field => field.classList.remove('selected'));
  
      // Füge die 'selected' Klasse zu dem angeklickten Feld hinzu
      element.classList.add('selected');
  }

console.log("home.js");

document.getElementById('myort').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    // ort
    const gridItems = document.querySelectorAll('.grid-item.selected');
    let selectedLocation = '';
    if (gridItems.length > 0) {
        selectedLocation = gridItems[0].outerText;
    }

    // Datum
    const selectedDate = document.getElementById('date-picker').value;
    
    // Baue die URL mit dem ausgewählten Ort zusammen
    const url = "https://im3.lisastrebel.ch/unload.php?ort="+encodeURIComponent(selectedLocation)+"&erstellt="+encodeURIComponent(selectedDate);
    console.log(url);
    
    // Rufe die Daten ab und aktualisiere den Chart
    getApiData(url);
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

//Wie guet hesch dich ihgrämt Uswahl
function selectSkinType(button) {
    // Remove 'selected' class from all skin type buttons
    document.querySelectorAll('.box1').forEach(btn => btn.classList.remove('selected'));
    
    // Add 'selected' class to the clicked skin type button
    button.classList.add('selected');
}

function selectUvSchutz(button) {
    // Remove 'selected' class from all UV protection buttons
    document.querySelectorAll('.uvSchutzbox').forEach(btn => btn.classList.remove('selected'));
    
    // Add 'selected' class to the clicked UV protection button
    button.classList.add('selected');
}
