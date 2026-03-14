<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$upload_dir = '../uploads/';
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

$response = ['data' => []];

if (isset($_FILES['files']) && !empty($_FILES['files']['name'][0])) {
    $files = $_FILES['files'];

    for ($i = 0; $i < count($files['name']); $i++) {
        $file_name = time() . '_' . basename($files['name'][$i]);
        $target_file = $upload_dir . $file_name;
        
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        $valid_extensions = array('jpg', 'jpeg', 'png', 'gif', 'svg', 'webp');

        if (in_array($imageFileType, $valid_extensions)) {
            if (move_uploaded_file($files['tmp_name'][$i], $target_file)) {
                
                $scheme = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
                $host = $_SERVER['HTTP_HOST'];
                // Assuming backend is at /backend
                $base_url = $scheme . '://' . $host . '/mailnova/backend/uploads/';
                
                // GrapesJS expects data array with src
                $response['data'][] = $base_url . $file_name;
            }
        }
    }
} else {
    // maybe $_FILES['file'] ? GrapesJS uses files[] by default
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $file_name = time() . '_' . basename($file['name']);
        $target_file = $upload_dir . $file_name;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        $valid_extensions = array('jpg', 'jpeg', 'png', 'gif', 'svg', 'webp');
        if (in_array($imageFileType, $valid_extensions)) {
            if (move_uploaded_file($file['tmp_name'], $target_file)) {
                $scheme = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
                $host = $_SERVER['HTTP_HOST'];
                $base_url = $scheme . '://' . $host . '/mailnova/backend/uploads/';
                $response['data'][] = $base_url . $file_name;
            }
        }
    }
}

echo json_encode($response);
?>
