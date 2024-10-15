<?php

if (isset($_GET['ort'])) {
    $ort = $_GET['ort']; // Ort kommt aus dem Formular (über GET)
} else {
    $ort = 'Wallis'; // Standardwert, wenn kein Ort ausgewählt wurde
}
if (isset($_GET['erstellt'])) {
    $datum = $_GET['erstellt']; // Datum kommt aus dem Formular (über GET)
} else {
    $datum = '2024-10-10'; // Standardwert, wenn kein Datum ausgewählt wurde
}

require_once 'config.php';

header('Content-Type: application/json');

try {
    $pdo = new PDO($dsn, $username, $password, $options);

    // Verwende den dynamischen Ort in der SQL-Abfrage
    $sql = "SELECT * FROM `uv_index` WHERE ort = :ort AND erstellt BETWEEN :startdate AND :enddate";
    
$startDatum = $datum." 08:%";
$endDatum = $datum." 21:%";


    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':ort', $ort);
    $stmt->bindParam(':startdate', $startDatum);
    $stmt->bindParam(':enddate', $endDatum);
    
    $stmt->execute();
    
    $uvAbfrage = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($uvAbfrage);

} catch (PDOException $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
