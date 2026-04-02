<?php
// getProjects.php
header("Access-Control-Allow-Origin: *"); // Allow requests from Angular (localhost:4200)
header("Content-Type: application/json; charset=UTF-8");

include_once 'db.php';

$sql = "SELECT id, title, category, description, image, github_link, live_link FROM projects";
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
