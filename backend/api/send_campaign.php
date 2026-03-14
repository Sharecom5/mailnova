<?php
require_once '../config/db.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->user_id) && !empty($data->campaign_id)) {
    $user_id = intval($data->user_id);
    $campaign_id = intval($data->campaign_id);

    // Verify campaign belongs to user
    $check_camp = $conn->prepare("SELECT id FROM campaigns WHERE id = ? AND user_id = ? AND status = 'draft'");
    $check_camp->execute([$campaign_id, $user_id]);

    if($check_camp->rowCount() == 0) {
        http_response_code(400);
        echo json_encode(["message" => "Campaign not found or already sent."]);
        exit;
    }

    // Update campaign status
    $stmt = $conn->prepare("UPDATE campaigns SET status = 'sending' WHERE id = ?");
    $stmt->execute([$campaign_id]);

    // Insert subscribers into queue
    $query = "INSERT INTO email_queue (campaign_id, subscriber_id, email)
              SELECT ?, id, email FROM subscribers 
              WHERE user_id = ? AND status = 'subscribed'";
    
    $queue_stmt = $conn->prepare($query);
    if($queue_stmt->execute([$campaign_id, $user_id])) {
        http_response_code(200);
        echo json_encode(["message" => "Campaign scheduled for sending."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Error queuing campaign."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data."]);
}
?>
