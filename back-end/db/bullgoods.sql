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

-- Products table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url TEXT,
  seller_id VARCHAR(20) NOT NULL,
  seller_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES users(student_id)
);

-- Admin login table
CREATE TABLE IF NOT EXISTS adminlogin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  adminEmail VARCHAR(100) NOT NULL UNIQUE,
  adminPassword VARCHAR(255) NOT NULL
);

INSERT INTO adminlogin (adminEmail, adminPassword)
VALUES ('bullgoods@admin.com', 'admin123')
ON DUPLICATE KEY UPDATE adminPassword = VALUES(adminPassword);
