<?php
session_start();

// Check if admin is logged in
if (!isset($_SESSION["admin_logged_in"]) || $_SESSION["admin_logged_in"] !== true) {
    header("Location: login.php");
    exit();
}

include 'db_connect.php';

// Fetch data
$sql = "SELECT id, Fname, last_name, email, phone_number, countryCode, countryState, yes_no_option, front_id_image, back_id_image FROM user_data";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Page</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
    </style>
</head>
<body>
    <h1>Admin Page - User Data</h1>
    <table>
        <tr>
            <th>User ID</th>
            <th>User CV</th>
            <th>User First Name</th>
            <th>User Last Name</th>
            <th>User Email</th>
            <th>User Phone Number</th>
            <th>User Selected Job</th>
            <th>User Country Code</th>
            <th>User Country State</th>
            <th>Are you legally able to work in the country that you are applying to</th>
            <th>User Front ID Image</th>
            <th>User Back ID Image</th>
            <th>User SSN</th>
        </tr>
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["id"] . "</td>";
                echo "<td>" . $row["cv"] . "</td>";
                echo "<td>" . $row["Fname"] . "</td>";
                echo "<td>" . $row["last_name"] . "</td>";
                echo "<td>" . $row["email"] . "</td>";
                echo "<td>" . $row["phone_number"] . "</td>";
                echo "<td>" . $row["job"] . "</td>";
                echo "<td>" . $row["countryCode"] . "</td>";
                echo "<td>" . $row["countryState"] . "</td>";
                echo "<td>" . $row["yes_no_option"] . "</td>";
                echo "<td><img src='data:image/jpeg;base64," . base64_encode($row['front_id_image']) . "' width='100' height='100'/></td>";
                echo "<td><img src='data:image/jpeg;base64," . base64_encode($row['back_id_image']) . "' width='100' height='100'/></td>";
                echo "<td>" . $row["ssn"] . "</td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='10'>No data found</td></tr>";
        }
        ?>
    </table>
</body>
</html>

<?php
$conn->close();
?>
