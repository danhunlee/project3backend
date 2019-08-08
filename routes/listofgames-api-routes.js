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
  app.post("/api/listofgames", function(req, res) {
    db.ListOfGames.create(req.body).then(function(dbListOfGames) {
        res.json(dbListOfGames);
    });
  });


};
