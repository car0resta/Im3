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
document.getElementById('numberSelect').addEventListener('change', validateSelection);

function validateSelection() {
    const selectElement = document.getElementById('numberSelect');
    const selectedValue = selectElement.value;

    if (selectedValue >= 1 && selectedValue <= 24) {
        // Gültige Zahl: Hintergrundfarbe auf Grün setzen
        selectElement.style.backgroundColor = 'lightgreen';
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

  // Alle Buttons mit der Klasse 'box1' auswählen
const buttons = document.querySelectorAll('.box1');

// Event-Listener für jeden Button hinzufügen
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Zuerst den 'selected'-Rahmen von allen Buttons entfernen
        buttons.forEach(btn => btn.classList.remove('selected'));
        
        // 'selected'-Klasse zum angeklickten Button hinzufügen
        button.classList.add('selected');
        console.log(button);
    });
});