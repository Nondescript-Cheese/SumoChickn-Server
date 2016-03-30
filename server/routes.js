var controller = require('./controller');
var router = require('express').Router();

router.get('/getInitialData/:userID', controller.users.getUserInfo);

router.get('/getAllUsers', controller.users.getAllUsers);

router.post('/login', controller.auth.login);

router.post('/submitChallenge', controller.challenges.postChallenge);

router.put('/toggleChallenge/:id', controller.challenges.updateChallengeStatus);

router.put('/addPhoto/:id', controller.challenges.updatePhoto);

router.get('/getPhoto/:id', controller.challenges.getPhoto);

router.get('/getClosedChallenges/:from/:to', controller.challenges.getClosedChallenges);

router.put('/voteOnProof/:id/:vote', controller.vote.voteOnProof);


module.exports = router;