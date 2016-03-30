var db = require('../db');

module.exports = {

  getUserInfo: function(req, res) {
    var userId = parseInt(req.params.userID);
    //get a user from the database specified by id
    return db.models.User.find({
      where: {
        id: userId
      }
    }).then(function(data) {
      //get all challenges associated with the specific user
      return db.models.Challenge.findAll({
        where: {
          UserId: userId
        }
      });
    }).then(function(challenges) {
      //send the associated challenges to the client
      res.send(200, challenges);
    }).catch(function(err) {
      res.send(404, 'error getting info');
    })
  },

  getAllUsers: function(req, res) {
    return db.models.User.findAll().then(function(data) {
      res.send(200, data);
    });
  }

};