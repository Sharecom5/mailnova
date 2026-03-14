<?php
require_once '../config/db.php';

$user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(["message" => "Missing user_id"]);
    exit;
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["message" => "No file uploaded or upload error."]);
    exit;
}

$fileType = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
if (strtolower($fileType) !== 'csv') {
    http_response_code(400);
    echo json_encode(["message" => "Only CSV files are allowed."]);
    exit;
}

$handle = fopen($_FILES['file']['tmp_name'], "r");
if ($handle !== FALSE) {
    $header = fgetcsv($handle, 1000, ",");
    // Find column index for email and name
    $emailIndex = -1;
    $nameIndex = -1;
    
    foreach ($header as $index => $colName) {
        $cleanCol = strtolower(trim($colName));
        if ($cleanCol === 'email') $emailIndex = $index;
        if ($cleanCol === 'name') $nameIndex = $index;
    }

    if ($emailIndex === -1) {
        // Fallback: assume first column is email if no header found
        // or just error out. Let's assume error.
        http_response_code(400);
        echo json_encode(["message" => "CSV must contain an 'email' column."]);
        fclose($handle);
        exit;
    }

    $count = 0;
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        if (!isset($data[$emailIndex])) continue;
        
        $email = htmlspecialchars(strip_tags(trim($data[$emailIndex])));
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) continue;

        $name = ($nameIndex !== -1 && isset($data[$nameIndex])) ? htmlspecialchars(strip_tags(trim($data[$nameIndex]))) : '';

        // Prevent duplicate per user
        $check = $conn->prepare("SELECT id FROM subscribers WHERE user_id = ? AND email = ?");
        $check->execute([$user_id, $email]);
        if($check->rowCount() > 0) continue;

        $stmt = $conn->prepare("INSERT INTO subscribers (user_id, email, name) VALUES (?, ?, ?)");
        if ($stmt->execute([$user_id, $email, $name])) {
            $count++;
        }
    }
    fclose($handle);
    
    http_response_code(200);
    echo json_encode(["message" => "Uploaded $count subscribers successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Error reading file."]);
}
?>
