// Datum auswählen
//Funktion, um das heutige Datum im Format 'YYYY-MM-DD' zu ermitteln
function setMaxDateForDatePicker() {
    const today = new Date().toISOString().split('T')[0]; // Erhalte das heutige Datum
    const dateInput = document.getElementById('date-picker'); // Wähle das Datumseingabefeld aus
    dateInput.setAttribute('max', today); // Setze das 'max'-Attribut auf das heutige Datum
  }
  
  // Wenn das DOM geladen ist, führe die Funktion aus
  document.addEventListener('DOMContentLoaded', setMaxDateForDatePicker);


// Anzahl Stunden auswählen
  function validateInput() {
    const input = document.getElementById('numberInput').value;
    const number = parseInt(input, 10);

    if (isNaN(number) || number < 1 || number > 24) {
        alert("Bitte geben Sie eine gültige Zahl zwischen 1 und 24 ein.");
        return false; // Formular wird nicht abgesendet
    }
  }
    return true; // Formular wird abgesendet


    function selectField(element) {
      // Entferne die 'selected' Klasse von allen Feldern
      const fields = document.querySelectorAll('.grid-item');
      fields.forEach(field => field.classList.remove('selected'));
  
      // Füge die 'selected' Klasse zu dem angeklickten Feld hinzu
      element.classList.add('selected');
  }