// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for saving a new listofgames
  app.post("/api/saveGame", function(req, res) {
    db.Games.create(req.body).then(function(dbGames) {
        res.json(dbGames);
    });
  });

  // GET route for querying games
  app.get("/api/getGames", function(req, res) {
  console.log("games")
    db.Games.findAll().then(function(dbGames) {
        res.json(dbGames);
    });
  });
  
    // DELETE route for deleting gameEvents
    app.delete("/api/deleteGame/:id", function(req, res) {
      db.Games.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbGames) {
        res.json(dbGames);
      });
    });

  // GET route for getting games by id
  app.get("/api/games/:id", function(req, res) {  
    db.Games.findOne({
      where: {
        id: req.params.id
      },
    }).then(function(dbGame) {
      res.json(dbGame);
    });
  });
  
};
