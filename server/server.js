const express = require('express')
const app = express()

var Register=require('./routes/Register.js');
var Login=require('./routes/Login.js');
var Update = require('./routes/Update.js');

var bodyParser = require('body-parser');
var cookieparser = require('cookie-parser')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieparser());

var middlewareFunction = (req, res, next) => {
  //console.log(req.originalUrl);

  // Need to check Session Id only if it is Update Profile
  if(req.originalUrl == '/profile/edit')
  {
      var temp = JSON.parse(req.body.data);

      var fs = require('fs');
      var _ = require('lodash');

      fs.readFile("./loginCredentials.json", 'utf8', function (err, data) {

        var fileData  = JSON.parse(data);

        var userDetails = _.find(fileData.userCredentials, { "UserName": temp.UserName});

        // An Example session coming from client
        // "AppSession={sha1$637a8d31$1$85efc7f64da3f7136d1ed0f35398470e2ac4f3fa}"
        // -------------------------------------------------------------------------
        var webCookie = req.headers.cookie.split('AppSession={')[1];
        webCookie = webCookie.split('};')[0];
        var userCookie = userDetails.SessionId;

        console.log(webCookie + " " + userCookie);
        console.log("Cookie = ", req.headers.cookie);

        if(userCookie == webCookie){
          next();
        }
        else{
            res.send("Invalid Session");
        }
      });
  }
  else
  {
    next();
  }
}

app.use('/', (req, res, next) => {
  middlewareFunction(req, res, next);
}, Register, Login, Update);

// app.use('/profile', (req, res, next) => {
//   console.log("MiddleWare");
//   next();
// });

app.listen(3001, () => console.log('Example app listening on port 3001!'))
// {"UserName":"G1","Password":"qwerty","Name":"Jeevan","Mobile":"0987654321","Email":"jeevan@gmail.com"}
