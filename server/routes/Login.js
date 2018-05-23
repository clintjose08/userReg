const login = require('express').Router();
var fs = require('fs');
var _ = require('lodash');
var passwordhash = require('password-hash');

// Logs in after checking username and password from loginCredentials file
// Creates a Session Id using username and Sets it in loginCredentials file
// INPUTS ---->
// req.query.uname = 'uname'
// req.query.pass = 'pass'

login.get("/login/submit", function(req, res){
  //console.log("Reg:", req.body);
  fs.readFile("./loginCredentials.json", 'utf8', function (err, data) {

      var fileData  = JSON.parse(data);

      var userDetails = _.find(fileData.userCredentials, { "UserName": req.query.uname});

      if(userDetails.Password == req.query.pass)
      {
          var sessionId = passwordhash.generate(req.query.uname);

          userDetails.SessionId = sessionId;

          var index = _.findIndex(fileData.userCredentials, { "UserName": req.query.uname});

          fileData.userCredentials[index] = userDetails;

          fs.writeFile("./loginCredentials.json", JSON.stringify(fileData), function(err) {
            if(!err)
            {
              res.send('Login Success');
            }
            else {
              res.send('Login Failed');
            }
          });
      }
      else {
        res.send('Login Failed');
      }
      // console.log(userDetails);



  })

});

module.exports = login;
