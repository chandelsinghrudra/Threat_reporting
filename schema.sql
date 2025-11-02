CREATE DATABASE IF NOT EXISTS threat_report_db;
USE threat_report_db;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    location VARCHAR(100)
);

CREATE TABLE threats (
    threat_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    category VARCHAR(50),
    description TEXT,
    location VARCHAR(100),
    number VARCHAR(20),
    report_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    priority INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
