// Funktion, um das heutige Datum im Format 'YYYY-MM-DD' zu ermitteln
function setMaxDateForDatePicker() {
    const today = new Date().toISOString().split('T')[0]; // Erhalte das heutige Datum
    const dateInput = document.getElementById('date-picker'); // Wähle das Datumseingabefeld aus
    dateInput.setAttribute('max', today); // Setze das 'max'-Attribut auf das heutige Datum
  }
  
  // Wenn das DOM geladen ist, führe die Funktion aus
  document.addEventListener('DOMContentLoaded', setMaxDateForDatePicker);