// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var tableData = require("../data/tableData");
var connection = require("../config/connection");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltRounds = 10;

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.post("/createaccount", function (req, res) {
    var hashpass = bcrypt.hashSync(req.body.password, saltRounds);
    const queryString = `INSERT INTO user (username, password) VALUES (?, ?)`
    connection.query(queryString, [req.body.username, hashpass], function (err, result) {

      const token = jwt.sign({
        userId: result.insertId,
      }, 'secret', { expiresIn: '1h' });
      if (err) {
        throw err;
      }
      else {
        return res.json(token);
      }
    });
  });

app.put("/login", function (req, res) {
  let loginchecker = "SELECT * FROM user WHERE username= ?"
  connection.query(loginchecker, [req.body.username], function (err, result) {
    if (err) throw err;
    if (result.length > 0)//if we found results
    {
      //result returns array so loop
      for (let i = 0; i < result.length; i++) {
        bcrypt.compare(req.body.password, result[i].password, function (err, bres) {
          if (bres) {//if account is found
            const token = jwt.sign({
              userId: result[i]._id
              // username: result[i].username,
            }, 'secret', { expiresIn: '1h' });
            return res.json(token);
          }
          else {//if password does not match
            console.log(bres);
            console.log(result[i].password);


            console.log("false");
            return res.json(false);
          }
        });
      }

    }
    else
    {
      console.log(result)
      console.log("nothingfound")
      //found nothing in db and create account
      return res.json(false);
    }
  });
});

//   if (err) {
//     throw err;
//   }
//   else if(result)
//   {
//     console.log("Adfadsf", result.length);
//   }
//   else
//   {
//     console.log("nothing in here");
//   }
// });



//  "INSERT INTO loginUser ?, ?  Values ", req.username, hashpass;


app.get("/api/tables", function (req, res) {
  res.json(tableData);
});

// API POST Requests
// Below code handles when a user submits a form and thus submits data to the server.
// In each of the below cases, when a user submits form data (a JSON object)
// ...the JSON is pushed to the appropriate JavaScript array
// (ex. User fills out a reservation request... this data is then sent to the server...
// Then the server saves the data to the tableData array)
// ---------------------------------------------------------------------------

app.post("/api/tables", function (req, res) {
  // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
  // It will do this by sending out the value "true" have a table
  // req.body is available since we're using the body parsing middleware
  if (tableData.length < 10) {
    tableData.push(req.body);
    res.json(true);
  }
  else {
    waitListData.push(req.body);
    res.json(false);
  }
});

// ---------------------------------------------------------------------------
// I added this below code so you could clear out the table while working with the functionality.
// Don"t worry about it!

app.post("/api/clear", function (req, res) {
  // Empty out the arrays of data
  tableData.length = 0;
  waitListData.length = 0;

  res.json({ ok: true });
});
}

