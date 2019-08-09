-- Drops the boardGame_DB if it exists currently --
DROP DATABASE IF EXISTS boardGame_DB;
-- Creates the "boardGame_DB" database --
CREATE DATABASE boardGame_DB;

-- USE boardGame_DB;

-- -- CREATE TABLE listOfGames (
-- --   id int NOT NULL AUTO_INCREMENT,
-- --   gameTitle varchar(255) NOT NULL,
-- --   picture varchar(100) NOT NULL,
-- --   PRIMARY KEY (id)
-- -- );
-- CREATE TABLE users (
--   id int NOT NULL AUTO_INCREMENT,
--   userName varchar(50) NOT NULL,
--   password varchar(60) NOT NULL,
--   PRIMARY KEY (id)
-- );
-- CREATE TABLE createBoardgames (
--   id int NOT NULL AUTO_INCREMENT,
--   eventTitle varchar(255) NOT NULL,
--   description varchar(500) NOT NULL,
--   location varchar(50) NOT NULL,
--   maxOfPlayers int NOT NULL,
--   phone int NOT NULL,
--   listOfGames_id int NOT NULL,
--   -- date DATETIME NOT NULL,
--   -- room varchar(30),
--   PRIMARY KEY (id)
--   -- FOREIGN KEY (listOfGames_id) REFERENCES listOfGames(id)
-- );
-- CREATE TABLE users_createBoardgames (
--   id int NOT NULL AUTO_INCREMENT,
--   users_id int NOT NULL,
--   createBoardgames_id int NOT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (users_id) REFERENCES users (id),
--   FOREIGN KEY (createBoardgames_id) REFERENCES createBoardgames (id)
-- );





