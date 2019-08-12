// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
const jwt = require("jsonwebtoken")

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the GameEvents
  app.get("/api/gameEvents", function(req, res) {
    var query = {};
    console.log(req.body);
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Event.findAll({
      where: query,
      include: [db.User, db.Games]
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // GET route for getting all of the GameEvents
  // FROM AARON
  // app.get("/api/gameEvents", function(req, res) {
  //   db.Event.findAll().then(function(dbEvent) {
  //     console.log("events")
  //     res.json(dbEvent);
  //   });
  // });

  // Get route for retrieving a single gameEvent
  app.get("/api/gameEvents/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Event.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // POST route for saving a new gameEvent
  app.post("/api/gameEvents", function(req, res) {
    var eventObj = req.body;
    eventObj.owner = jwt.decode(req.body.token).userId;
    console.log(eventObj);
    db.Event.create(eventObj)
    .then(function(dbEvent) {
        dbEvent.addUser(req.body.UserId);
        dbEvent.addGames(req.body.EventId);
        res.json(dbEvent);
    });
  });
  // app.post("/api/gameEvents/join", function(req, res) {
  //   db.Event.create(req.body)
  //   .then(function(dbEvent) {
  //       dbEvent.addUser(req.body.UserId);
  //       // dbEvent.addGames(req.body.GamesId);
  //       res.json(dbEvent);
  //   });
  // });

  // DELETE route for deleting gameEvents
  app.delete("/api/gameEvents/:id", function(req, res) {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // PUT route for updating gameEvents
  app.put("/api/gameEvents", function(req, res) {
    db.Event.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      });
  });

};
