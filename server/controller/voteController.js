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
        }).then(function(noVotes) {
          if(noVotes.voteCountNo === 2) {
            total = noVotes.wussPoints + points;
            noVotes.updateAttributes({
              wussPoints: total
            }).then(function(updatedPoints) {
              res.send(200, updatedPoints);
            });
          }
        });
      } else {
        return data.updateAttributes({
          voteCountYes: data.voteCountYes++
        }).then(function(yesVotes) {
          if(yesVotes.voteCounYes === 2) {
            yesVotes.updateAttributes({

            })
          }
        })
      }
    }).catch(function(err) {
      res.send(404, 'error');
    })
  }
}