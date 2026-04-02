<?php
// db.php
$host = '127.0.0.1';
$user = 'root'; // default XAMPP username
$pass = '';     // default XAMPP password
$db   = 'portfolio_db';

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
