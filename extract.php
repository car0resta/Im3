<?php

// API URL
$api_url = "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=46.55,46.49,46.88,46.38&longitude=7.37,9.83,8.64,7.62&current=uv_index&timezone=Europe%2FBerlin&forecast_days=1";

// cURL-Sitzung initialisieren
$ch = curl_init();

// cURL-Optionen setzen
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Optional, falls SSL-Überprüfung Probleme macht

// Anfrage ausführen
$response = curl_exec($ch);

// Überprüfen, ob die Anfrage erfolgreich war
if (curl_errno($ch)) {
    die('cURL-Fehler: ' . curl_error($ch));
}

// cURL-Sitzung schließen
curl_close($ch);

// Prüfen, ob eine gültige Antwort vorliegt
if ($response === false) {
    die('Fehler beim Abrufen der API-Daten.');
}

// JSON-Daten weiterverarbeiten
$data = json_decode($response, true);

return $data;

?>