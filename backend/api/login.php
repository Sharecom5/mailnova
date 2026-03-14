<?php
require_once '../config/db.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email) && !empty($data->password)) {
    $email = htmlspecialchars(strip_tags($data->email));
    $query = "SELECT id, name, password FROM users WHERE email=? LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if($user && password_verify($data->password, $user['password'])) {
        http_response_code(200);
        // In a real app we'd issue a JWT. Returning simple session details here for MVP.
        echo json_encode([
            "message" => "Login successful.",
            "user_id" => $user['id'],
            "name" => $user['name']
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Login failed. Incorrect credentials."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data."]);
}
?>
