<?php
require_once '../config/db.php';

try {
    $tables = $conn->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    $result = ["tables" => $tables];
    
    foreach ($tables as $table) {
        $cols = $conn->query("DESCRIBE $table")->fetchAll();
        $result["columns"][$table] = $cols;
    }
    
    echo json_encode($result);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
