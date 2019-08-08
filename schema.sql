-- Drops the boardGame_DB if it exists currently --
DROP DATABASE IF EXISTS boardGame_DB;
-- Creates the "boardGame_DB" database --
CREATE DATABASE boardGame_DB;

USE boardGame_DB;

CREATE TABLE createBoardgames (
  id int NOT NULL AUTO_INCREMENT,
  gameTitle varchar(255) NOT NULL,
  gameDescript varchar(500) NOT NULL,
  geoLocation varchar(50) NOT NULL,
  -- location varchar(50) NOT NULL,
  picture varchar(100) NOT NULL,
  maxOfPlayers int NOT NULL,
  phone int NOT NULL,
--   userName_id int NOT NULL,
--   playerUserNames_id int NOT NULL,
  PRIMARY KEY (id)
--   FOREIGN KEY (userName_id) REFERENCES user(id),
--   FOREIGN KEY (playerUserNames_id) REFERENCES user(id)
);

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  userName varchar(50) NOT NULL,
  password varchar(60) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE listOfGames (
  id int NOT NULL AUTO_INCREMENT,
  gameTitle varchar(255) NOT NULL,
  gameDescript varchar(500) NOT NULL,
  maxOfPlayers int NOT NULL,
  picture varchar(100) NOT NULL,
  totalTimesPlayed int NOT NULL,
  PRIMARY KEY (id)
);