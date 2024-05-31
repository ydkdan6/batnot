<?php
// Database connection settings

include 'db_connect.php';

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "telus";

// Function to insert data
function insertUserData($data) {
    global $servername, $username, $password, $dbname;

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO user_data (cv, Fname, last_name, email, phone_number, job, countryCode, countryState, yes_no_option, front_id_image, back_id_image, ssn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssssss",$cv, $fname, $last_name, $email, $phone_number, $job, $countryCode, $countryState, $yes_no_option, $front_id_image, $back_id_image, $ssn);

    // Insert each record
    foreach ($data as $record) {
        $cv = $record["cv"];
        $fname = $record["Fname"];
        $last_name = $record["Lname"];
        $email = $record["email"];
        $phone_number = $record["phone_number"];
        $job = $record["job"];
        $countryCode = $record["countryCode"];
        $countryState = $record["countryState"];
        $yes_no_option = $record["yes_no_option"];
        $front_id_image = file_get_contents($record["front_id_image"]);
        $back_id_image = file_get_contents($record["back_id_image"]);
        $ssn = $record["ssn"];

        $stmt->send_long_data(7, $front_id_image); // 7 is the zero-based index of the front_id_image parameter
        $stmt->send_long_data(8, $back_id_image);  // 8 is the zero-based index of the back_id_image parameter

        $stmt->execute();
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
