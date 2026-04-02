-- setup.sql
-- Run this script in phpMyAdmin or MySQL CLI to set up the database and mock data

CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    github_link VARCHAR(255),
    live_link VARCHAR(255)
);

INSERT INTO projects (title, category, description, image, github_link, live_link) VALUES
('AI Image Generator', 'Deep Learning', 'A generative adversarial network (GAN) model that creates photorealistic images from textual descriptions.', 'https://via.placeholder.com/400x300', 'https://github.com/example/ai-image-gen', '#'),
('E-Commerce Dashboard', 'Web Dev', 'A comprehensive admin dashboard built with React and Node.js for managing online retail stores.', 'https://via.placeholder.com/400x300', 'https://github.com/example/ecommerce-dashboard', '#'),
('Sentiment Analysis Tool', 'Deep Learning', 'NLP model using transformers to perform real-time sentiment analysis on Twitter data.', 'https://via.placeholder.com/400x300', 'https://github.com/example/sentiment-analysis', '#'),
('Portfolio CMS', 'Web Dev', 'Custom headless CMS built specifically for managing portfolio content and blog posts.', 'https://via.placeholder.com/400x300', 'https://github.com/example/portfolio-cms', '#');
