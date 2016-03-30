var db = require('../db');

module.exports = {
  voteOnProof: function(req, res) {
    var points;
    var voteChoice = parseInt(req.params.vote);
    var challengeId = parseInt(req.params.id);
    return db.models.Challenge.find({
      where: {
        id: challengeId
      }
    }).then(function(data) {
      var total;
      points = data.points;
      if(voteChoice === 0) {
        return data.updateAttributes({
          voteCountNo: data.voteCountNo++
        }).then(function(challengeWithNoVotes) {
          if(challengeWithNoVotes.voteCountNo === 2) {
            points = challengeWithNoVotes.points;
            return db.models.User.find({
              where: {
                id: challengeWithNoVotes.UserId
              }
            }).then(function(user) {
              total = user.wussPoints + points;
              return user.updateAttributes({
                wussPoints: total
              });
            }).then(function(updatedPoints) {
              res.send(200, updatedPoints);
            });
          }
        });
      } else {
        return data.updateAttributes({
          voteCountYes: data.voteCountYes++
        }).then(function(challengeWithYesVotes) {
          if(challengeWithYesVotes.voteCountYes === 2) {
            points = challengeWithYesVotes.points;
            return db.modesl.User.find({
              where: {
                id: challengeWithYesVotes.UserId
              }
            }).then(function(user) {
              total = points + user.beastPoints;
              return db.models.User.updateAttributes({
                beastPoints: total
              });
            }).then(function(updatedPoints) {
              res.send(200, updatedPoints);
            });
          }
        });
      }
    }).catch(function(err) {
      res.send(404, 'error');
    });
  }
}