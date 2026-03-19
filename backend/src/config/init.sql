CREATE DATABASE IF NOT EXISTS nextswim;
USE nextswim;

-- Drop tables if they exist
-- DROP TABLE IF EXISTS user_resources;
-- DROP TABLE IF EXISTS goals;
-- DROP TABLE IF EXISTS aquatic_resources;
-- DROP TABLE IF EXISTS users;

-- USERS TABLE
-- CREATE TABLE users (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   password_hash VARCHAR(255) NOT NULL,
--   level INT DEFAULT 1,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- select * from aquatic_resources;

-- GOALS TABLE
-- CREATE TABLE goals (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   user_id INT NOT NULL,
--   title VARCHAR(255) NOT NULL,
--   description TEXT,
--   is_completed BOOLEAN DEFAULT FALSE,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- AQUATIC RESOURCES TABLE
CREATE TABLE aquatic_resources (
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

-- INSERT INTO users (email, password_hash, level)
-- VALUES
--   ('alex@example.com', '$2b$10$hashedpassword1', 1),
--   ('jamie@example.com', '$2b$10$hashedpassword2', 2),
--   ('taylor@example.com', '$2b$10$hashedpassword3', 3);


-- INSERT INTO goals (user_id, title, description, is_completed)
-- VALUES
--   (1,'Learn basic water safety','Understand pool rules and basic water safety concepts.',FALSE),
--   (2,'Improve freestyle technique','Practice proper breathing and arm movement.',FALSE),
--   (3,'Pass lifeguard rescue assessment','Successfully complete advanced rescue scenarios.',TRUE);


-- ----------------------------------------------------
-- AQUATIC RESOURCES DATA (FIXED TYPES)
-- ----------------------------------------------------

INSERT INTO aquatic_resources
(title, resource_type, difficulty_level, description, url)
VALUES

-- STROKE TECHNIQUE
('Freestyle Stroke Basics','stroke',1,'Beginner breakdown of freestyle body position, kick, and breathing.','https://www.youtube.com/watch?v=5HLW2AI1Ink'),
('Freestyle Catch and Pull Technique','stroke',3,'Detailed explanation of the freestyle catch phase and underwater pull.','https://www.usaswimming.org/coaches/popular-resources/freestyle-technique'),
('Backstroke Fundamentals','stroke',1,'Introductory backstroke lesson focusing on body alignment and rotation.','https://www.youtube.com/watch?v=7Lk8ZzD9k1E'),
('Breaststroke Timing Explained','stroke',2,'Explains proper breaststroke timing and glide.','https://www.youtube.com/watch?v=EElzlIMjk_c'),
('Butterfly Stroke for Beginners','stroke',3,'Step-by-step butterfly progression for newer swimmers.','https://www.swimming.org/learn-to-swim/butterfly-stroke/'),
('Improving Flip Turns','stroke',3,'Technique tips for faster and more controlled flip turns.','https://www.youtube.com/watch?v=QmKzRzP9E2A'),
('Underwater Dolphin Kick Drills','stroke',4,'Advanced dolphin kick drills used by competitive swimmers.','https://www.youtube.com/watch?v=8xF1Yv3YkFc'),
('Common Stroke Mistakes','stroke',2,'Overview of frequent technique errors across all four strokes.','https://www.swimmingworldmagazine.com/news/common-swimming-mistakes/'),

-- WATER SAFETY
('Red Cross Water Safety Basics','safety',1,'Foundational water safety principles from the American Red Cross.','https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/water-safety.html'),
('Reach or Throw, Don’t Go','safety',1,'Teaches safe rescue principles without endangering yourself.','https://www.youtube.com/watch?v=K6KZ8zA3k7E'),
('Cold Water Shock Awareness','safety',2,'Explains the dangers and physiological response to cold water immersion.','https://www.rlss.org.uk/cold-water-shock'),
('Rip Current Safety','safety',1,'How to identify and escape rip currents safely.','https://www.weather.gov/safety/ripcurrent'),
('Pool Safety for Children','safety',1,'Guidelines for preventing childhood drowning.','https://www.cdc.gov/drowning/prevention/index.html'),
('Open Water Swimming Safety','safety',3,'Safety considerations for lakes, rivers, and oceans.','https://www.youtube.com/watch?v=Fz6p6tZ6ZkU'),

-- BREATHING / CONTROL
('Learning to Breathe While Swimming','breathing',1,'Addresses common breathing challenges for new swimmers.','https://www.swimoutlet.com/blogs/guides/how-to-breathe-while-swimming'),
('Breathing Exercises for Calm','breathing',1,'Simple breathing exercises to control panic and stress.','https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/deep-breathing/art-20044268'),
('How to Relax While Swimming','breathing',1,'Breathing and relaxation techniques for anxious swimmers.','https://www.youtube.com/watch?v=4U7y2zZpF8M'),
('Mindfulness for Aquatic Anxiety','breathing',2,'How mindfulness techniques can help reduce water-related anxiety.','https://www.psychologytoday.com/us/blog/mindfulness-in-frantic-world/201907/mindfulness-anxiety'),

-- TRAINING DRILLS
('Treading Water Techniques','training',2,'Eggbeater and scissor kick methods for treading water.','https://www.youtube.com/watch?v=J7yXkYzYz6E'),
('Kickboard Drills for Beginners','training',1,'Simple kickboard drills to build leg strength and confidence.','https://www.swimming.org/learn-to-swim/kickboard-drills/'),
('Improving Endurance in Swimming','training',3,'Training concepts for building swim endurance.','https://www.swimmingworldmagazine.com/news/how-to-improve-swimming-endurance/'),
('In-Service Lifeguard Training Drills','training',3,'Ideas for effective ongoing lifeguard training.','https://www.aquaticsintl.com/facilities/in-service-training-drills_o'),

-- EXTRA (PUT INTO TRAINING OR FUN CATEGORY)
('Scanning Techniques for Lifeguards','training',2,'Explains systematic scanning strategies to prevent missed victims.','https://www.aquaticsintl.com/facilities/scanning-techniques_o'),
('Recognizing Active vs Passive Drowning','safety',2,'Key differences between active and passive drowning victims.','https://www.lifeguardtraining.com/blogs/news/active-vs-passive-drowning'),
('Lifeguard Rescue Tube Use','training',2,'Demonstrates proper rescue tube handling and victim approach.','https://www.youtube.com/watch?v=R4sF8u7f9kA'),
('CPR for the Professional Rescuer Overview','safety',2,'Overview of CPR standards used by professional rescuers.','https://www.redcross.org/take-a-class/cpr'),

-- WATER CONFIDENCE (MAP TO BREATHING)
('Overcoming Fear of Water','breathing',1,'Practical steps to reduce anxiety and build water confidence.','https://www.swimming.org/learn-to-swim/fear-of-water/'),
('Adult Learn-to-Swim Guide','breathing',1,'Encouragement and guidance for adults learning to swim.','https://www.usaswimming.org/learn-to-swim/adult-learn-to-swim'),

-- BOOKS (PUT INTO TRAINING)
('Total Immersion Swimming','training',3,'Popular book focused on efficient, low-effort swimming technique.','https://www.totalimmersion.net/'),
('Swimming Anatomy','training',4,'In-depth look at the muscles used in swimming.','https://us.humankinetics.com/products/swimming-anatomy'),
('The Complete Guide to Swimming','training',2,'Comprehensive guide covering strokes, safety, and training.','https://www.dk.com/us/book/9781465459753-the-complete-guide-to-swimming/'),
('USA Swimming Skills Resource Library','training',2,'Collection of skill development resources from USA Swimming.','https://www.usaswimming.org/coaches/resource-library'),
('Swim England Learn to Swim Framework','training',2,'Structured swim progression framework used in the UK.','https://www.swimming.org/learn-to-swim/learn-to-swim-framework/');