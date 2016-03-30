var db = require('../db');

module.exports = {

 postChallenge: function(req, res) {
   var challenge = req.body;
   return db.models.User.find({
     where: {
       username: challenge.userChallenged
     }
   }).then(function(data) {
     return db.models.Challenge.create({
       challengeText: challenge.challengeText,
       points: challenge.points,
       createdBy: challenge.createdBy,
       userChallenged: challenge.userChallenged,
       UserId: data.id
     });
   }).then(function(data) {
     res.send(200, data);
   }).catch(function(err) {
     res.send(404, 'error');
   });
 },

 updateChallengeStatus: function(req, res) {
   var challengeId = parseInt(req.params.id);
   var complete;
   // var points;
   return db.models.Challenge.find({
     where: {
       id: challengeId
     }
   }).then(function(data) {
     complete = !data.completed;
     return data.updateAttributes({
       completed: !data.completed,
       closedDate: new Date()
     });
   }).then(function(result) {
    res.send(200, result);
   }).catch(function(err) {
     res.send(404, 'error');
   });
 },

 updatePhoto: function(req, res) {
   var challengeId = parseInt(req.params.id);
   var photoUrl = req.body.url;
   return db.models.Challenge.find({
     where: {
       id: challengeId
     }
   }).then(function(data) {
     return data.updateAttributes({
       proofUrl: photoUrl
     });
   }).then(function(updated) {
     res.send(200, updated);
   }).catch(function(err) {
     res.send(404, 'error');
   });
 },

 getPhoto: function(req, res) {
   var challengeId = parseInt(req.params.id);
   return db.models.Challenge.find({
     where: {
       id: challengeId
     }
   }).then(function(data) {
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

