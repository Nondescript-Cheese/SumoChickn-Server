var auth = require('./authController.js');
var users = require('./usersController.js');
var challenges = require('./challengesController.js');
var proof = require('./proofController.js');

module.exports = {
  auth: auth,
  users: users,
  challenges: challenges,
  proof: proof
};