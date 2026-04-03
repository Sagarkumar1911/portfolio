<?php
// getProjects.php
header("Access-Control-Allow-Origin: *"); // Allow requests from Angular (localhost:4200)
header("Content-Type: application/json; charset=UTF-8");

include_once 'db.php';

// Check if an 'id' parameter was passed in the URL (e.g., getProjects.php?id=1)
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    // If an ID is provided, fetch only that specific project
    // intval() ensures the ID is a safe integer
    $sql = "SELECT id, title, category, description, image, github_link, live_link FROM projects WHERE id = $id";
} else {
    // If no ID is provided, fetch all projects
    $sql = "SELECT id, title, category, description, image, github_link, live_link FROM projects";
}

$result = $conn->query($sql);

$projects = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $projects[] = $row;
    }
}

echo json_encode($projects);

$conn->close();
?>
