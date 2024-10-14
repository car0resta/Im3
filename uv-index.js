
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

const apiUrl = "https://im3.lisastrebel.ch/uv-index_api.php";
let chart = null;
let ort = "";
let uvIndex = null;
let erstellt = "";

getApiData(apiUrl);

const ctx = document.getElementById("myChart");

chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: uvIndex,
    datasets: [
      {
        label: ort,
        data: anzahl,
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

function getApiData(url) {
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((myData) => {
      console.log(myData);

      // vornamen = myData.map((item) => item.vorname);
      chart.data.labels = myData.map((item) => item.ort);
      // anzahl = myData.map((item) => item.anzahl);
      chart.data.datasets[0].data = myData.map((item) => item.uvIndex);
      // jahr = myData[0].jahr;
      chart.data.datasets[0].label = myData[0].erstellt;

      chart.update();
    });
}

function addData(chart, label, newData) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(newData);
  });
  chart.update();
}

let form = document.getElementById("myort");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let ort = document.getElementById("ort").value;
  /* let anzahl = document.getElementById("anzahl").value; */

  /* let url = `https://im3.im-abc.ch/vorname_api.php?jahr=${jahr}&geschlecht=${geschlecht}&anzahl=${anzahl}`; */
  let url = `https://im3.lisastrebel.ch/uv-index_api.php?ort=${ort}`;

  getApiData(url);
});

// Abrufen der Jahre und in Select einbauen

const apiUrlJahre = "https://im3.lisastrebel.ch/uv-index_api.php?ort";

fetch(apiUrlJahre)
  .then((response) => response.json())
  .then((jahrData) => {
    console.log(erstelltData);
    let jahrSelect = document.getElementById("erstellt");
    erstelltData.forEach((item) => {
      let option = document.createElement("option");
      option.text = item.erstellt;
      option.value = item.erstellt;
      jahrSelect.add(option);
    });
  });
