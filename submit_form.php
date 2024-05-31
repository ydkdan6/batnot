<?php
// Include the PHP function file
include 'db_connect.php';
include 'insert_function.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = [
        [
            "cv" => $_POST["cv"],
            "Fname" => $_POST["Fname"],
            "Lname" => $_POST["Lname"],
            "email" => $_POST["email"],
            "phone_number" => $_POST["phone_number"],
            "job" => $_POST["job"],
            "countryCode" => $_POST["countryCode"],
            "countryState" => $_POST["countryState"],
            "yes_no_option" => $_POST["yes_no_option"],
            "front_id_image" => $_FILES["front_id_image"]["tmp_name"],
            "back_id_image" => $_FILES["back_id_image"]["tmp_name"],
            "ssn" => $_POST["ssn"],
        ]
    ];

    // Insert the data
    insertUserData($data);

    // Redirect to success page
    header("Location: success.html");
    exit();
}
?>
