<?php

// Definition der Verbindungsparameter für die Datenbank
$host     = '217n0c.myd.infomaniak.com';     // Hostserver, auf dem die DB läuft.
// «localhost» bedeutet: die selbe Serveradresse, auf dem auch die Seiten gespeichert sind

$dbname = '217n0c_im3';   // Name der Datenbank
$username = '217n0c_list';   // Name des DB-Users
$password = 'ERPA_HT8dW84';  // Passwort des DB-Users


// DSN (Datenquellenname) für PDO
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4"; // siehe https://en.wikipedia.org/wiki/Data_source_name

// Optionen für PDO
$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Aktiviert die Ausnahmebehandlung für Datenbankfehler
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Legt den Standard-Abrufmodus auf assoziatives Array fest
  PDO::ATTR_EMULATE_PREPARES   => false // Deaktiviert die Emulation vorbereiteter Anweisungen, für bessere Leistung
];
?>