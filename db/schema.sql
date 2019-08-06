-- Drops the day_planner_db if it already exists --
DROP DATABASE IF EXISTS createBoardgame_DB;

-- Create the database day_planner_db and specified it for use.
CREATE DATABASE createBoardgame_DB;

USE createBoardgame_DB;

CREATE TABLE user (
    id INTEGER NOT NULL AUTO_INCREMENT,
    userName VARCHAR(250) NOT NULL,     
    userEmail varchar(30),
    playerUserNames varchar(50) NOT NULL,
    userGames varchar(10000), 
    password VARCHAR(250) NOT NULL,
    PRIMARY KEY(id)
);

-- Create the table plans.
CREATE TABLE createBoardgames (
  id int NOT NULL AUTO_INCREMENT,
  boardgame varchar(255) NOT NULL,
  descriptEvent varchar(500) NOT NULL,
  geoLocation varchar(50) NOT NULL,
  location varchar(50) NOT NULL,
  picture varchar(100) NOT NULL,
  maxOfPlayers int NOT NULL,
  phone int NOT NULL,
  userName_id int NOT NULL,
  playerUserNames_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userName_id) REFERENCES user(id),
  FOREIGN KEY (playerUserNames_id) REFERENCES user(id)
);

CREATE TABLE playerHistory (
  id int NOT NULL AUTO_INCREMENT,
  gamesPlayed varchar(255) NOT NULL,
  numOfWin varchar(20) NOT NULL,
  numOfLoss varchar(30),
  geoLocation varchar(50),
  userName_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userName_id) REFERENCES user(id)
);

CREATE TABLE Games (
    id int NOT NULL AUTO_INCREMENT,
    nameOfGame varchar(100) NOT NULL,
    descriptOfGame varchar(100) NOT NULL,
    maxOfPlayers int NOT NULL,
    totalAmountPlayed int NOT NULL,
    PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO boardgames (boardgame, userName, userEmail, phone) VALUES ("Catan", "keilSucks", "keilLovesBeer@gmail.com", 2061234567);
-- INSERT INTO playerHistory (gamesPlayed, numOfWin, numOfLoss, geoLocation, boardgame_id) VALUES ("Dominion", 3, 1, "Bellevue", boardgames(id));

-- topGames
-- SELECT GROUP_CONCAT(DISTINCT boardgames) 
-- FROM boardgame;