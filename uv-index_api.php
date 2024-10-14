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



/*
if (isset($_GET['ort'])) {
    $ort = $_GET['ort'];
  }

require_once 'config.php';

header('Content-Type: application/json');

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $sql = "SELECT * FROM `uv_index` WHERE ort = 'Wallis' AND erstellt BETWEEN '2024-10-10 08:00:00' AND '2024-10-10 20:00:00'";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $uvAbfrage = $stmt->fetchAll();
    echo json_encode($uvAbfrage);
    
} catch (PDOException $e) {
    echo json_encode(array('error' => $e->getMessage()));
}


if (isset($_GET['geschlecht'])) {
  $geschlecht = $_GET['geschlecht'];
} else {
  $geschlecht = mt_rand(1, 2);
}

if (isset($_GET['jahr'])) {
  $jahr = $_GET['jahr'];
} else {
  $jahr = mt_rand(1987, 2022);
}

if (isset($_GET['limit'])) {
  $limit = $_GET['limit'];
} else {
  $limit = 10;
}

require_once 'config.php';

header('Content-Type: application/json');

try {
  $pdo = new PDO($dsn, $username, $password, $options);
  $sql = "SELECT * FROM `Vornamen` WHERE geschlecht = ? and jahr = ? ORDER BY `anzahl` DESC LIMIT ?";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$geschlecht, $jahr, $limit]);
  $namensListe = $stmt->fetchAll();
  echo json_encode($namensListe);
} catch (PDOException $e) {
  echo json_encode(['error' => $e->getMessage()]);
} /*