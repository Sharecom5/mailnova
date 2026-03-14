<?php
require_once dirname(__DIR__) . '/config/db.php';
// Require AWS SDK (assumes installed via Composer in backend directory)
if (file_exists(dirname(__DIR__) . '/vendor/autoload.php')) {
    require_once dirname(__DIR__) . '/vendor/autoload.php';
}

use Aws\Ses\SesClient;
use Aws\Exception\AwsException;

// Configure AWS credentials in environment variables or hardcoded (for MVP demo only)
$sesClient = new SesClient([
    'version' => 'latest',
    'region'  => getenv('AWS_REGION') ?: 'us-east-1',
    'credentials' => [
        'key'    => getenv('AWS_ACCESS_KEY_ID') ?: 'YOUR_AWS_ACCESS_KEY_ID',
        'secret' => getenv('AWS_SECRET_ACCESS_KEY') ?: 'YOUR_AWS_SECRET_ACCESS_KEY',
    ]
]);

$sender_email = getenv('SENDER_EMAIL') ?: 'noreply@mailnova.com';

// Process:
// SELECT 100 pending emails from email_queue
$query = "SELECT q.id as queue_id, q.campaign_id, q.subscriber_id, q.email, 
          c.subject, c.html_content 
          FROM email_queue q
          JOIN campaigns c ON q.campaign_id = c.id
          WHERE q.status = 'pending'
          LIMIT 100";
$stmt = $conn->prepare($query);
$stmt->execute();
$emails = $stmt->fetchAll();

if (count($emails) == 0) {
    echo "No pending emails.\n";
    exit;
}

// Mark as processing
$queue_ids = array_column($emails, 'queue_id');
$inQuery = implode(',', array_fill(0, count($queue_ids), '?'));
$update_processing = $conn->prepare("UPDATE email_queue SET status = 'processing' WHERE id IN ($inQuery)");
$update_processing->execute($queue_ids);

foreach ($emails as $email_job) {
    // Add unsubscribe link
    $unsubscribe_link = "https://mailnova.com/api/unsubscribe.php?id=" . $email_job['subscriber_id'];
    $html_content = $email_job['html_content'];
    if (strpos($html_content, '{unsubscribe_url}') !== false) {
        $html_content = str_replace('{unsubscribe_url}', $unsubscribe_link, $html_content);
    } else {
        $html_content .= "<br><br><p style='font-size:12px; color:#666;'>To unsubscribe, <a href='{$unsubscribe_link}'>click here</a>.</p>";
    }

    $text_content = strip_tags(str_replace("<br>", "\n", $html_content));
    $text_content .= "\n\nUnsubscribe link: {$unsubscribe_link}";

    $status = 'failed';
    try {
        $result = $sesClient->sendEmail([
            'Destination' => [
                'ToAddresses' => [$email_job['email']],
            ],
            'ReplyToAddresses' => [$sender_email],
            'Source' => $sender_email,
            'Message' => [
                'Body' => [
                    'Html' => [
                        'Charset' => 'UTF-8',
                        'Data' => $html_content,
                    ],
                    'Text' => [
                        'Charset' => 'UTF-8',
                        'Data' => $text_content,
                    ],
                ],
                'Subject' => [
                    'Charset' => 'UTF-8',
                    'Data' => $email_job['subject'],
                ],
            ],
        ]);
        $status = 'sent';
    } catch (AwsException $e) {
        error_log($e->getMessage());
        $status = 'failed';
    }

    // Update queue status
    $update = $conn->prepare("UPDATE email_queue SET status = ?, sent_at = CURRENT_TIMESTAMP WHERE id = ?");
    $update->execute([$status, $email_job['queue_id']]);

    // Add log
    $log = $conn->prepare("INSERT INTO email_logs (campaign_id, email, status) VALUES (?, ?, ?)");
    $log->execute([$email_job['campaign_id'], $email_job['email'], $status]);
}

// Update campaign status if all sent
foreach (array_unique(array_column($emails, 'campaign_id')) as $camp_id) {
    $check_pending = $conn->prepare("SELECT id FROM email_queue WHERE campaign_id = ? AND status IN ('pending', 'processing')");
    $check_pending->execute([$camp_id]);
    if ($check_pending->rowCount() == 0) {
        $conn->prepare("UPDATE campaigns SET status = 'sent' WHERE id = ?")->execute([$camp_id]);
    }
}

echo "Processed " . count($emails) . " emails.\n";
?>
