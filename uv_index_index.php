<?php
require_once 'config.php';

header('Content-Type: application/json');

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $sql = "SELECT uv_index FROM `uv_index` WHERE ort = 'Wallis' AND erstellt BETWEEN '2024-10-10 08:00:00' AND '2024-10-10 20:00:00'";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $nurIndex = $stmt->fetchAll();
    echo json_encode($nurIndex);
    
} catch (PDOException $e) {
    echo json_encode(array('error' => $e->getMessage()));
}