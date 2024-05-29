const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dfinito'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle form submission
app.post('/submit_form', upload.fields([{ name: 'front_id_image' }, { name: 'back_id_image' }]), (req, res) => {
    const {
        Fname,
        Lname,
        email,
        phone_number,
        countryCode,
        countryState,
        yes_no_option
    } = req.body;

    // Check if files were uploaded correctly
    if (!req.files || !req.files.front_id_image || !req.files.back_id_image) {
        return res.status(400).send('Both front and back ID images are required.');
    }

    const frontIdImage = fs.readFileSync(req.files.front_id_image[0].path);
    const backIdImage = fs.readFileSync(req.files.back_id_image[0].path);

    const sql = "INSERT INTO UserDetails (Fname, Lname, email, phone_number, countryCode, countryState, yes_no_option, front_id_image, back_id_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [first_name, last_name, email, phone_number, country, state, yes_no_option, frontIdImage, backIdImage], (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.stack);
            return res.status(500).send('Error inserting data');
        }
       
                // Send HTML response with JavaScript for alert and redirection
                res.send(`
                <script>
                    alert('Details Sent successfully');
                    window.location.href = 'index.html';
                </script>
            `);

            
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
