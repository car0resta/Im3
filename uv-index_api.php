<?php

if (isset($_GET['ort'])) {
    $ort = $_GET['ort']; // Ort kommt aus dem Formular (über GET)
} else {
    $ort = 'Wallis'; // Standardwert, wenn kein Ort ausgewählt wurde
}

require_once 'config.php';

header('Content-Type: application/json');

try {
    $pdo = new PDO($dsn, $username, $password, $options);

    // Verwende den dynamischen Ort in der SQL-Abfrage
    $sql = "SELECT * FROM `uv_index` WHERE ort = ? AND erstellt BETWEEN '2024-10-10 08:00:00' AND '2024-10-10 20:00:00'";
    
    // Bereite die Abfrage vor
    $stmt = $pdo->prepare($sql);
    
    // Führe die Abfrage aus und übergebe den Ort
    $stmt->execute([$ort]);
    
    // Hole die Ergebnisse
    $uvAbfrage = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Ausgabe als JSON
    echo json_encode($uvAbfrage);

} catch (PDOException $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
