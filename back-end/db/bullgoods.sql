-- Create database if not exists
CREATE DATABASE IF NOT EXISTS bullgoods;
USE bullgoods;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  student_id VARCHAR(20) UNIQUE,
  phone_number VARCHAR(15),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user',
  is_seller BOOLEAN DEFAULT FALSE,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
