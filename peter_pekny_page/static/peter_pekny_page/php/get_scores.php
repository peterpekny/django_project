<?php
// get_scores.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$servername = "localhost";
$username = "boomer_user";
$password = "TotoJeSakraSilneHeslo!123**";
$dbname = "boomer_game";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "
    SELECT 
        @rank := @rank + 1 AS pozicia,
        player_name,
        score
    FROM 
        (SELECT player_name, score 
         FROM scores 
         ORDER BY score DESC, created_at DESC LIMIT 7) AS ranked_scores,
        (SELECT @rank := 0) AS r
";

$result = $conn->query($sql);

$scores = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $scores[] = $row;
    }
}

echo json_encode($scores);

$conn->close();
?>