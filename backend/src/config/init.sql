-- Disable foreign key checks for reset
SET FOREIGN_KEY_CHECKS = 0;

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS nextswim;
USE nextswim;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  level INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GOALS TABLE
CREATE TABLE IF NOT EXISTS goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- AQUATIC RESOURCES TABLE
CREATE TABLE IF NOT EXISTS aquatic_resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  resource_type VARCHAR(100),
  difficulty_level INT,
  description TEXT,
  url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------
-- TEST DATA
-- ----------------------------------------------------

INSERT INTO users (email, password_hash, level)
VALUES
  ('alex@example.com', '$2b$10$hashedpassword1', 1),
  ('jamie@example.com', '$2b$10$hashedpassword2', 2),
  ('taylor@example.com', '$2b$10$hashedpassword3', 3);

INSERT INTO goals (user_id, title, description, is_completed)
VALUES
  (1,'Learn basic water safety','Understand pool rules and basic water safety concepts.',FALSE),
  (2,'Improve freestyle technique','Practice proper breathing and arm movement.',FALSE),
  (3,'Pass lifeguard rescue assessment','Successfully complete advanced rescue scenarios.',TRUE);

-- AQUATIC RESOURCES DATA
INSERT INTO aquatic_resources
(title, resource_type, difficulty_level, description, url)
VALUES
('Freestyle Stroke Basics', 'Video', 1, 'Beginner breakdown of freestyle body position, kick, and breathing.', 'https://www.youtube.com/watch?v=5HLW2AI1Ink'),
('Freestyle Catch and Pull Technique', 'Article', 3, 'Detailed explanation of the freestyle catch phase and underwater pull.', 'https://www.usaswimming.org/coaches/popular-resources/freestyle-technique'),
('Backstroke Fundamentals', 'Video', 1, 'Introductory backstroke lesson focusing on body alignment and rotation.', 'https://www.youtube.com/watch?v=7Lk8ZzD9k1E'),
('Breaststroke Timing Explained', 'Video', 2, 'Explains proper breaststroke timing and glide.', 'https://www.youtube.com/watch?v=EElzlIMjk_c'),
('Butterfly Stroke for Beginners', 'Article', 3, 'Step-by-step butterfly progression for newer swimmers.', 'https://www.swimming.org/learn-to-swim/butterfly-stroke/');

-- (You can add the rest of your resource inserts similarly)