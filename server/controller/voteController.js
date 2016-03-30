var db = require('../db');

module.exports = {

  voteOnProof: function(req, res) {
    var points;
    var challengeToBeReturned;
    var voteChoice = parseInt(req.params.vote);
    var challengeId = parseInt(req.params.id);
    return db.models.Challenge.find({
      where: {
        id: challengeId
      }
    }).then(function(data) {
      points = data.points;
      if(voteChoice === 0) {
        return data.updateAttributes({
          voteCountNo: ++data.voteCountNo
        }).then(function(challengeWithNoVotes) {
          challengeToBeReturned = challengeWithNoVotes;
          if(challengeWithNoVotes.voteCountNo === 2) {
            return db.models.User.find({
              where: {
                id: challengeWithNoVotes.UserId
              }
            }).then(function(user) {
              var total = user.wussPoints + Math.ceil(points / 5);
              return user.updateAttributes({
                wussPoints: total
              });
            }).then(function(updatedPoints) {
              res.send(200, challengeToBeReturned);
            });
          } else {
            res.send(200, challengeWithNoVotes);
          }
        });
      } else {
        return data.updateAttributes({
          voteCountYes: ++data.voteCountYes
        }).then(function(challengeWithYesVotes) {
          challengeToBeReturned = challengeWithYesVotes;
          if(challengeWithYesVotes.voteCountYes === 2) {
            return db.models.User.find({
              where: {
                id: challengeWithYesVotes.UserId
              }
            }).then(function(user) {
              var total = points + user.beastPoints;
              return user.updateAttributes({
                beastPoints: total
              });
            }).then(function(updatedPoints) {
              res.send(200, challengeToBeReturned);
            });
          } else {
            res.send(200, challengeWithYesVotes);
          }
        });
      }
    }).catch(function(err) {
      res.send(404, 'error');
    });
  }
  
};