<?php
// addProject.php
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

// Get posted data
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->title) && !empty($data->category)) {
    
    $title = $conn->real_escape_string($data->title);
    $category = $conn->real_escape_string($data->category);
    $description = !empty($data->description) ? $conn->real_escape_string($data->description) : '';
    $image = !empty($data->image) ? $conn->real_escape_string($data->image) : '';
    $github_link = !empty($data->github_link) ? $conn->real_escape_string($data->github_link) : '#';
    $live_link = !empty($data->live_link) ? $conn->real_escape_string($data->live_link) : '#';
    
    $query = "INSERT INTO projects (title, category, description, image, github_link, live_link) 
              VALUES ('$title', '$category', '$description', '$image', '$github_link', '$live_link')";
    
    if ($conn->query($query)) {
        http_response_code(201);
        echo json_encode(array("message" => "Project added successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to add project. " . $conn->error));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data. Title and Category are required."));
}

$conn->close();
?>
