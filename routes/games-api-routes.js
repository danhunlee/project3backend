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
  app.post("/api/games", function(req, res) {
    db.Games.create(req.body).then(function(dbGames) {
        res.json(dbGames);
    });
  });

  // GET route for querying games
  app.get("/api/games", function(req, res) {
    var query = {};
    if (req.query.gameName) {
      query.gameName = req.query.gameName;
    }

    db.Games.findAll({
      where: query,
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
