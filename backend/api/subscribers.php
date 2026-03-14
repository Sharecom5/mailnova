<?php
require_once '../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(["message" => "Missing user_id"]);
    exit;
}

if ($method === 'GET') {
    // List subscribers
    $query = "SELECT id, email, name, status, created_at FROM subscribers WHERE user_id = ? ORDER BY id DESC";
    $stmt = $conn->prepare($query);
    $stmt->execute([$user_id]);
    $subscribers = $stmt->fetchAll();
    echo json_encode($subscribers);
} elseif ($method === 'POST') {
    // Add single subscriber manually
    $data = json_decode(file_get_contents("php://input"));
    if(!empty($data->email)) {
        $email = htmlspecialchars(strip_tags($data->email));
        $name = isset($data->name) ? htmlspecialchars(strip_tags($data->name)) : '';
        
        // Prevent duplicate
        $check = $conn->prepare("SELECT id FROM subscribers WHERE user_id = ? AND email = ?");
        $check->execute([$user_id, $email]);
        if($check->rowCount() > 0) {
            http_response_code(400);
            echo json_encode(["message" => "Subscriber already exists."]);
            exit;
        }

        $query = "INSERT INTO subscribers (user_id, email, name) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($query);
        if($stmt->execute([$user_id, $email, $name])) {
            http_response_code(201);
            echo json_encode(["message" => "Subscriber added.", "id" => $conn->lastInsertId()]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to add subscriber."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Incomplete data."]);
    }
}
?>
