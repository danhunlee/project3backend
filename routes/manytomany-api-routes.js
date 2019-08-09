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
  app.post("/api/manytomany", function(req, res) {
    db.Many.create(req.body).then(function(dbMany) {
        dbMany.addUser(1);
        res.json(dbMany);
    });
  });


};
