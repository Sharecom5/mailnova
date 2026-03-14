<?php
require_once 'config/db.php';

$subscriber_id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($subscriber_id) {
    $stmt = $conn->prepare("UPDATE subscribers SET status = 'unsubscribed' WHERE id = ?");
    if($stmt->execute([$subscriber_id])) {
        echo "<h1>You have been unsubscribed.</h1><p>You will no longer receive emails from this list.</p>";
    } else {
        echo "<h1>Error processing your request.</h1>";
    }
} else {
    echo "<h1>Invalid link.</h1>";
}
?>
