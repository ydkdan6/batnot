CREATE TABLE user_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Fname VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    job VARCHAR(20),
    countryCode VARCHAR(5),
    countryState VARCHAR(50),
    yes_no_option VARCHAR(3),
    front_id_image LONGBLOB,
    back_id_image LONGBLOB,
    cv BLOB,
    ssn VARCHAR(20)
);
