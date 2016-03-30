var db = require('../db');

module.exports = {

  voteOnProof: function(req, res) {
    var points;
    var challengeToBeReturned;
    var voteChoice = parseInt(req.params.vote);
    var challengeId = parseInt(req.params.id);
    //find the specified challenge
    return db.models.Challenge.find({
      where: {
        id: challengeId
      }
    }).then(function(data) {
      points = data.points;
      //if the end user votes no
      if(voteChoice === 0) {
        //increment the challenge voteCountNo property
        return data.updateAttributes({
          voteCountNo: ++data.voteCountNo
        }).then(function(challengeWithNoVotes) {
          challengeToBeReturned = challengeWithNoVotes;
          if(challengeWithNoVotes.voteCountNo === 2) {
            //if 2 people vote no, find the associated user
            return db.models.User.find({
              where: {
                id: challengeWithNoVotes.UserId
              }
            }).then(function(user) {
              //update the user's wussPoints
              var total = user.wussPoints + Math.ceil(points / 5);
              return user.updateAttributes({
                wussPoints: total
              });
            }).then(function(updatedPoints) {
              //send updated challenge with points and vote results to the client
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