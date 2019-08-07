// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/games.html"));
  });

  // createGames route loads createGames.html
  app.get("/createGames", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/createGames.html"));
  });

  // games route loads games.html
  app.get("/games", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/games.html"));
  });

  // users route loads user-manager.html
  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user-manager.html"));
  });

};
