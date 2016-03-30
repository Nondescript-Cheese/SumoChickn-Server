var db = require('../db');

module.exports = {

  login: function(req, res) {
    var loginUser = req.body.username;
    //query database to find the specified user
    return db.models.User.findOrCreate({
      where: {
        username: loginUser
      }
    }).then(function(data) {
      //get data from querying and send it to the client
      data = data[0].dataValues
      res.json(200, data);
    }).catch(function(err) {
      res.send(404, 'error logging in');
    });
  }

};


