const update = require('express').Router();
var fs = require('fs');
var _ = require('lodash');

// Recieves the new object with all data and will be saved in userData files
// As of now, password Field won't be updated
// INPUT ---->
// req.body.data = {
//      "UserName":"uname",
//      "Password":"pass",
//      "Name":"Name",
//      "Mobile":"00000",
//      "Email":"mail@mail.com"}

update.post("/profile/edit", function(req, res){

  var temp = JSON.parse(req.body.data);

  fs.readFile("./userData.json", 'utf8', function (err, data) {

            var fileData  = JSON.parse(data);

            var obj = {"UserName":temp.UserName,"Name":temp.Name,"Mobile":temp.Mobile,"Email":temp.Email};

            var index = _.findIndex(fileData.user, {"UserName": temp.UserName})

            fileData.user[index] = obj;

            fs.writeFile("./userData.json", JSON.stringify(fileData), function(err) {

                  if(!err)
                  res.send('Success');
                  else {
                    res.send("Error");
                  }
            })
    })
});

module.exports = update;
