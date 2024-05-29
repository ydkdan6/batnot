<?php
session_start();

include 'db_connect.php';

// Hard-coded admin credentials
$admin_username = "admin";
$admin_password = "password123";

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $admin_user = $_POST["username"];
    $admin_pass = $_POST["password"];

    // Check credentials
    if ($admin_user === $admin_username && $admin_pass === $admin_password) {
        $_SESSION["admin_logged_in"] = true;
        header("Location: admin.php");
        exit();
    } else {
        $error = "Invalid username or password";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .login-form {
            width: 300px;
            margin: 0 auto;
            padding-top: 100px;
        }
        .login-form form {
            border: 1px solid #ccc;
            padding: 20px;
            background: #f9f9f9;
        }
        .login-form h2 {
            margin-bottom: 20px;
        }
        .login-form input[type="text"], .login-form input[type="password"] {
            width: calc(100% - 22px);
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
        }
        .login-form input[type="submit"] {
            width: 100%;
            padding: 10px;
            background: #5cb85c;
            border: none;
            color: white;
            font-size: 16px;
        }
        .error {
            color: red;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="login-form">
        <form method="post" action="">
            <h2>Admin Login</h2>
            <?php if (isset($error)) { echo "<p class='error'>$error</p>"; } ?>
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="submit" value="Login">
        </form>
    </div>
</body>
</html>
