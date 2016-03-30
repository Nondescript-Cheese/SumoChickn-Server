var db = require('../db');

module.exports = {

 postChallenge: function(req, res) {
   var challenge = req.body;
   //query database to find the user that the challenge is issued to
   return db.models.User.find({
     where: {
       username: challenge.userChallenged
     }
   }).then(function(data) {
    //create the challenge and associate it to the user
     return db.models.Challenge.create({
       challengeText: challenge.challengeText,
       points: challenge.points,
       createdBy: challenge.createdBy,
       userChallenged: challenge.userChallenged,
       UserId: data.id
     });
   }).then(function(data) {
    //send the returned information to the client
     res.send(200, data);
   }).catch(function(err) {
     res.send(404, 'error');
   });
 },

 updateChallengeStatus: function(req, res) {
   var challengeId = parseInt(req.params.id);
   var complete;
   //find the challenge to be updated
   return db.models.Challenge.find({
     where: {
       id: challengeId
     }
   }).then(function(data) {
     complete = !data.completed;
     //update the challenge's completed property to be true(challenge complete)
     //also update the closedDate property of the challenge to be the current date.
     return data.updateAttributes({
       completed: !data.completed,
       closedDate: new Date()
     });
   }).then(function(result) {
    //send updated challenge to the client
    res.send(200, result);
   }).catch(function(err) {
     res.send(404, 'error');
   });
 },

 updatePhoto: function(req, res) {
   var challengeId = parseInt(req.params.id);
   var photoUrl = req.body.url;
   //find the challenge the end user wants to post a photo to
   return db.models.Challenge.find({
     where: {
       id: challengeId
     }
   }).then(function(data) {
    //update the challenge's proofUrl property to be the link to the photo
     return data.updateAttributes({
       proofUrl: photoUrl
     });
   }).then(function(updated) {
    //send updated challenge to the client
     res.send(200, updated);
   }).catch(function(err) {
     res.send(404, 'error');
   });
 },

 getPhoto: function(req, res) {
   var challengeId = parseInt(req.params.id);
   //find the challenge associated with the photo
   return db.models.Challenge.find({
     where: {
       id: challengeId
     }
   }).then(function(data) {
    //send the challenges proof-photo url back to the client
     res.send(200, data.proofUrl);
   }).catch(function(err) {
     res.send(404, 'error');
   });
 },

 getClosedChallenges: function(req, res) {
    var challengeFrom = parseInt(req.params.from)-1;
    var challengeTo = parseInt(req.params.to);
    return db.models.Challenge.findAll({
      where: {
        completed: true
      }
    }).then(function(data) {
      return data.sort(function(a,b) {
        //sort by date from earliest to latest
        return Date.parse(a.closedDate) - Date.parse(b.closedDate) 
      });
    }).then(function(sortedData) {
      return sortedData.slice(challengeFrom, challengeTo);
    }).then(function(slicedData) {
      res.send(200, slicedData);
    }).catch(function(err) {
      res.send(404, 'error');
    })
  }

};

