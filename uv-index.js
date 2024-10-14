
// const apiURL = 'https://im3.lisastrebel.ch/uv-index_api.php';

// getAPIData(apiURL);
// let chart = null;
// let ort = "";
// let erstellt = "";
// let uv_index = null;

// function getAPIData (url) {

// fetch(url)
// .then ((response) => response.json())
// .then((myData) => {
//     console.log(myData);

//     let uv_index = myData.map((item) => item.uv_index);
//     let erstellt = myData.map((item) => item.erstellt);


// const ctx = document.getElementById('myChart');

//   new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: erstellt,
//       datasets: [{
//         label: 'UV-Index',
//         data: uv_index,
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });
// })
// }

// // 2. Event Listener für das Dropdown-Menü, um das Label zu ändern
// document.getElementById('selectort').addEventListener('change', function() {
//     // 3. Hole den ausgewählten Wert aus dem Dropdown
//     const selectedLocation = document.getElementById('selectort').value;
  
//     // 4. Setze das neue Label für das Dataset
//     myChart.data.datasets[0].label = selectedLocation;
  
//     // 5. Aktualisiere den Chart, damit das neue Label angezeigt wird
//     myChart.update();

// function addData(chart, label, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
// }

// let form = document.querySelector('myort');
// form.addEventListener('submit', function (e) {
//     event.preventDefault();

//     let ort = document.querySelector('input[name="ort"]').value;

//     let url = 'https://im3.lisastrebel.ch/uv-index_api.php?ort=${ort}';

// })

// // const apiUrlIndex = 'https://im3.lisastrebel.ch/uv_index_index.php?';

// // fetch(apiUrlIndex)
// // .then ((response) => response.json())
// // .then((indexData) => {
// //     console.log(indexData);
// //     let uv_index = indexData.map((item) => item.uv_index);
// //     indexData.forEach((item) => {
// //         let option = document.createElement('option');
// //     })
// })

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
            console.log(myData);

            // Stelle sicher, dass der Chart mit den neuen Daten aktualisiert wird
            if (myData.length > 0) {
                const uvIndex = myData.map((item) => item.uvIndex); // Die UV-Index-Werte
                const erstellt = myData.map((item) => item.erstellt); // Die Erstellungsdaten
                
                // Update den Chart
                chart.data.labels = erstellt; // Die X-Achsen-Beschriftungen
                chart.data.datasets[0].data = uvIndex; // Die Y-Achsen-Daten
                chart.data.datasets[0].label = myData[0].ort; // Das Label des Ortes
                
                chart.update(); // Aktualisiere den Chart
            } else {
                console.error("Keine Daten für den ausgewählten Ort gefunden.");
            }
        })
        .catch((error) => {
            console.error("Fehler beim Abrufen der Daten: ", error);
        });
}

// Chart-Initialisierung
const ctx = document.getElementById("myChart").getContext("2d");
let chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: [], // Leere Labels, bis die Daten kommen
        datasets: [
            {
                label: "UV-Index",
                data: [], // Leere Daten, bis die Daten kommen
                borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});
