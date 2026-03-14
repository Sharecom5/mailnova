<?php
require_once '../config/db.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->user_id) && !empty($data->campaign_name) && !empty($data->subject) && !empty($data->html_content)) {
    
    $user_id = intval($data->user_id);
    $campaign_name = htmlspecialchars(strip_tags($data->campaign_name));
    $subject = htmlspecialchars(strip_tags($data->subject));
    $html_content = $data->html_content; 
    $design_json = isset($data->design_json) ? $data->design_json : null;

    if (!empty($data->id)) {
        // Update existing campaign
        $campaign_id = intval($data->id);
        // Verify ownership
        $check_query = "SELECT id FROM campaigns WHERE id = ? AND user_id = ?";
        $check_stmt = $conn->prepare($check_query);
        $check_stmt->execute([$campaign_id, $user_id]);
        if ($check_stmt->fetch()) {
            $query = "UPDATE campaigns SET campaign_name = ?, subject = ?, html_content = ?, design_json = ? WHERE id = ?";
            $stmt = $conn->prepare($query);
            if($stmt->execute([$campaign_name, $subject, $html_content, $design_json, $campaign_id])) {
                http_response_code(200);
                echo json_encode(["message" => "Campaign updated.", "id" => $campaign_id]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Unable to update campaign."]);
            }
        } else {
            http_response_code(403);
            echo json_encode(["message" => "Unauthorized access to edit this campaign."]);
        }
    } else {
        // Create new campaign
        $query = "INSERT INTO campaigns (user_id, campaign_name, subject, html_content, design_json) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);

        if($stmt->execute([$user_id, $campaign_name, $subject, $html_content, $design_json])) {
            http_response_code(201);
            echo json_encode(["message" => "Campaign created.", "id" => $conn->lastInsertId()]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to create campaign."]);
        }
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data."]);
}
?>
