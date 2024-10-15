<?php

if (isset($_GET['hauttyp'])) {
    $hauttyp = $_GET['hauttyp']; // Hauttyp kommt aus dem Formular (über GET)
} else {
    $hauttyp = 1; // Standardwert, wenn kein Hauttyp ausgewählt wurde
}

if (isset($_GET['lsf'])) {
    $lsf = $_GET['lsf']; // LSF kommt aus dem Formular (über GET)
} else {
    $lsf = 0; // Standardwert, wenn kein LSF ausgewählt wurde
}

require_once 'config.php';

header('Content-Type: application/json');

try {
    $pdo = new PDO($dsn, $username, $password, $options);

    // Verwende den dynamischen Ort in der SQL-Abfrage
    $sql = "SELECT * FROM `sonnenschutz` WHERE hauttyp = :hauttyp AND lsf = :lsf";

    $stmt = $pdo->prepare($sql);
    
    $stmt->bindParam(':hauttyp', $hauttyp);
    $stmt->bindParam(':lsf', $lsf);
    
    $stmt->execute();
    
    $schutzZeit = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($schutzZeit);

} catch (PDOException $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
