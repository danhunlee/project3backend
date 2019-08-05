-- Drops the day_planner_db if it already exists --
DROP DATABASE IF EXISTS createBoardgame_DB;

-- Create the database day_planner_db and specified it for use.
CREATE DATABASE createBoardgame_DB;

USE createBoardgame_DB;

-- Create the table plans.
CREATE TABLE boardgames (
  id int NOT NULL AUTO_INCREMENT,
  boardgame varchar(255) NOT NULL,
  userName varchar(20) NOT NULL,
  userEmail varchar(30),
  phone int NOT NULL
  PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO boardgames (boardgame, userName, userEmail, phone) VALUES ("Catan", "keilSucks", "keilLovesBeer@gmail.com", 2061234567);