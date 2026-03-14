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
    $campaign_id = isset($_GET['id']) ? intval($_GET['id']) : null;
    if ($campaign_id) {
        $query = "SELECT * FROM campaigns WHERE id = ? AND user_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute([$campaign_id, $user_id]);
        $campaign = $stmt->fetch();
        if ($campaign) {
            echo json_encode($campaign);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Campaign not found."]);
        }
    } else {
        $query = "SELECT id, campaign_name, subject, status, created_at FROM campaigns WHERE user_id = ? ORDER BY id DESC";
        $stmt = $conn->prepare($query);
        $stmt->execute([$user_id]);
        $campaigns = $stmt->fetchAll();
        echo json_encode($campaigns);
    }
}
?>
