var auth = require('./authController.js');
var users = require('./usersController.js');
var challenges = require('./challengesController.js');
var vote = require('./voteController.js');

module.exports = {
  auth: auth,
  users: users,
  challenges: challenges,
  vote: vote
};