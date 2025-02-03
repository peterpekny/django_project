<?php
// submit_score.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//if (isset($_GET['player']) && isset($_GET['score'])) {
//    $player = $_GET['player'];
//    $score = $_GET['score'];
//    echo "Hráč: $player, Skóre: $score";
//    // Tu môžeš testovať aj pripojenie k databáze a zápis údajov
//} else {
//    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
//}


// Pripojenie k databáze
$servername = "localhost";
$username = "boomer_user";
$password = "TotoJeSakraSilneHeslo!123**";
$dbname = "boomer_game";

$conn = new mysqli($servername, $username, $password, $dbname);

// Skontrolujeme spojenie
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Skontrolujeme, či je POST požiadavka
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Prečítame JSON údaje
    $data = json_decode(file_get_contents('php://input'), true);
    $player = $conn->real_escape_string($data['player']);
    $score = intval($data['score']);

    // Vložíme skóre do databázy
    $sql = "INSERT INTO scores (player_name, score) VALUES ('$player', '$score')";

    if ($conn->query($sql) === TRUE) {
        // Po úspešnom vložení vymažeme nadbytočné záznamy
        $conn->query("DELETE FROM scores WHERE id NOT IN (
            SELECT id FROM (
                SELECT id FROM scores ORDER BY score DESC, created_at DESC LIMIT 7
            ) temp
        )");

        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $conn->error]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}

$conn->close();
?>