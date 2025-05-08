const db = require("../config/db");

const createUserTable = () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM('admin', 'customer') NOT NULL,
            verification_code VARCHAR(10) NOT NULL,
            is_verified BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error("Failed to create 'users' table:", err.message);
        } else {
            console.log("'Users table is ready in the database.");
        }
    });
};

module.exports = { createUserTable };
