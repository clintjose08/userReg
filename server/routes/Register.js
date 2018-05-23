const register = require('express').Router();
var fs = require('fs');

// Gets data from uli
// Writes it into two files - loginCredentials & userData
// INPUT ---->
// req.body.data = {
//      "UserName":"Gow",
//      "Password":"qwerty",
//      "Name":"Gowtham",
//      "Mobile":"9988776655",
//      "Email":"gowtham@gmail.com"}

register.post("/registration/submit", function(req, res){
  //console.log("Reg:", req.body);
  var temp = JSON.parse(req.body.data);

  fs.readFile("./loginCredentials.json", 'utf8', function (err, loginData) {

    var login = JSON.parse(loginData);

    login.userCredentials.push({'UserName':temp.UserName,'Password':temp.Password,'SessionId':""});

    fs.writeFile("./loginCredentials.json", JSON.stringify(login), function(err) {

        fs.readFile("./userData.json", 'utf8', function (err, data) {

            var fileData  = JSON.parse(data);

            var obj = {"UserName":temp.UserName,"Name":temp.Name,"Mobile":temp.Mobile,"Email":temp.Email};

            fileData.user.push(obj);

            fs.writeFile("./userData.json", JSON.stringify(fileData), function(err) {

                  if(!err)
                  res.send('Success');
                  else {
                    res.send("Error");
                  }
            })
        })
  })

})

});

module.exports = register;
