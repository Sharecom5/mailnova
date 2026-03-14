<?php
require_once '../config/db.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->name) && !empty($data->email) && !empty($data->password)) {
    $name = htmlspecialchars(strip_tags($data->name));
    $email = htmlspecialchars(strip_tags($data->email));
    $password = password_hash($data->password, PASSWORD_BCRYPT);

    $check_email = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check_email->execute([$email]);
    if($check_email->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["message" => "Email already exists."]);
        exit;
    }

    $query = "INSERT INTO users SET name=:name, email=:email, password=:password";
    $stmt = $conn->prepare($query);

    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $password);

    if($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "User was created.", "user_id" => $conn->lastInsertId()]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to create user."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data."]);
}
?>
