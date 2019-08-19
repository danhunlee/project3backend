const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltRounds = 10;
var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findAll({
      include: [db.Post]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Event]
    }).then(function(dbUser) {
      dbUser.addEvent(req.body.EventId);
      dbUser.addUser(req.body.UserId);
      res.json(dbUser);
    });
  });

  //find all joined users
  app.get("/api/joinedUser/:id", function(req, res) {
    db.JoinedEvent.findAll({
      where:
      {
        eventId: req.params.id
      },
      include: [db.User]
    }).then(function(dbEvents) {
      res.json(dbEvents)

    })
})
  app.get("/api/users/join/:id", function(req, res)
  {
    db.JoinedEvent.findAll({
      where: {
        eventId: req.params.id
      }
    }).then(function(dbUser)
    {
      return res.json(dbUser);
    });
  });
 
  app.post("/api/users/join/:token/:id", function(req, res)
  {
    //parse token to get id
    var decoded = jwt.verify(req.params.token, 'secret');
    //check if we have already joined
    db.JoinedEvent.findOne({
      where: {
        userId: decoded.userId,
        eventId: req.params.id
      }
    }).then(function(dbUser)
    {
      if(dbUser)//if user found
      {
        return false;
      }
      else
      {
        db.JoinedEvent.create({
          eventId: req.params.id,
          userId: decoded.userId
        })
        .then(function(dbPopulateEvent)
        {
    
          res.json(dbPopulateEvent);
        });
      }
    })

  });

  app.post("/api/createaccount", function(req, res) {
    var hashpass = bcrypt.hashSync(req.body.password, saltRounds);
    db.User.create(
      {
        userName: req.body.userName,
        password: hashpass,
        realName: req.body.realName,
        userGender: req.body.userGender,
        userIntro: req.body.userIntro,
        favoriteGames: req.body.favoriteGames,
        userImage: req.body.userImage

      }).then(function(dbUser) {
        
        console.log(dbUser.id);
      const token = jwt.sign({
        userId: dbUser.id,
      }, 'secret', { expiresIn: '24h' });
         res.json(token);
    
    });
  });

  app.post("/api/login", function (req, res) {
    
    db.User.findAll({
      where: {
        userName: req.body.userName,
      }
    }).then(function(dbUser) {
      console.log(req.body.userName);

      console.log(dbUser);
        if (dbUser.length > 0)//if we found results
      {
        //result returns array so loop
        for(let i = 0; i < dbUser.length; i++) {

        
          bcrypt.compare(req.body.password, dbUser[i].password, function (err, bres) {
            if (bres) {//if account is found
              const token = jwt.sign({
                userId: dbUser[i].id
                // username: result[i].username,
              }, 'secret', { expiresIn: '1h' });
              console.log("success");
              return res.json(token);
            }
            else {//if password does not match
              console.log(bres);
              console.log(dbUser[i].password);
  
  
              console.log("false");
              return res.json(false);
            }
          });
        }
      }
      else
      {
        console.log(dbUser)
        console.log("nothingfound")
        //found nothing in db and create account
        res.json(false);
      }
    });

  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

    // PUT route for updating userProfile
    app.put("/api/updateProfile/:id", function(req, res) {
      var decoded = jwt.verify(req.params.id, 'secret');

      db.User.update(
        req.body,
        {
          where: {
            id: decoded.userId
          }
        }).then(function(dbUser) {
          res.json(dbUser);
        });
    });

      // Get route for retrieving a single gameEvent
  app.get("/api/getProfile/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    var decoded = jwt.verify(req.params.id, 'secret');
    db.User.findOne({
      where: {
        id: decoded.userId
      },
      // include: [db.User]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
