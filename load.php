<?php

require_once('config.php');
$transformdata = include('transform.php');

$dataArray = json_decode($transformdata, true);

try {
    $pdo = new PDO($dsn, $username, $password, $options);

    $stmt = $pdo->prepare("INSERT INTO uv_index (ort, uv_index) VALUES (?, ?)");

    foreach ($dataArray as $data) {
        $stmt->execute([
          $data['ort'],
          $data['uv_index'],
        ]);
    }

    echo "Daten wurden erfolgreich in die Datenbank eingefügt!";
} catch (PDOException $e) {
    die($e->getMessage());
}

?>