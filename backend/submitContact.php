<?php
// submitContact.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'db.php';

// Auto-create contacts table if it doesn't exist
$tableSetup = "CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
$conn->query($tableSetup);

// Get posted data
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->email) && !empty($data->message)) {
    
    $name = $conn->real_escape_string($data->name);
    $email = $conn->real_escape_string($data->email);
    $message = $conn->real_escape_string($data->message);
    
    $query = "INSERT INTO contacts (name, email, message) VALUES ('$name', '$email', '$message')";
    
    if ($conn->query($query)) {
        http_response_code(201);
        echo json_encode(array("message" => "Contact saved successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to save contact. " . $conn->error));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
}

$conn->close();
?>
