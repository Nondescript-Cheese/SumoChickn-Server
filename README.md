# SumoChickn Server Package

> Server files 

## Team

  - __Product Owner__: [Hamzah Chaudhary](https://github.com/hamzahc1)
  - __Scrum Master__: [Michael Cheung](https://github.com/m6cheung)
  - __Development Team Members__: [Steffen Baumgarten](https://github.com/SteffenBerlin)

## Table of Contents

1. [Dependencies](#dependencies)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Server Information](#server-information)
      1. [Server Design](#server-design)
      1. [Database Design](#database-design)
1. [Contributing](#contributing)

## Dependencies

###Server Dependencies
- node 2.x.x or higher
- express 4.13.4
- morgan 1.7.0
- mysql 2.10.2
- sequelize 3.20.0
- body-parser 1.15.0

## Tech Stack

[Node](https://nodejs.org/)

[Express](http://expressjs.com/)

[MySQL](www.mysql)

[Sequelize](www.sequelizejs.com)

##Development

##Installing Dependencies

Inside of the root directory:

```sh
npm install
```

###Server Information

This repo contains the Back-end for the mobile application [SumoChickn](https://github.com/Nondescript-Cheese/challengr). 
It utilizes a mySQL database along with a Node/Express server to store all the data necessary for the application to run.

####Server Design

1. __/getInitialData/:userId__ GET

  Request Params = {userId: integer}

  Gets the initial data of all challenges associated with the specified user.

1. __/getAllUsers__ GET

  Gets the information of all users in the database

1. __/login__ POST

  Request Body = {username: string}

  Logs the user in with their facebook account as well as save their facebook name to the database.

1. __/submitChallenge__ POST

  Request Body: {challengeText: string, points: integer, createdBy: string, userChallenged: string, UserId: integer}

  Sends a challenge to a specified user through the UserId property.

1. __/toggleChallenge/:id__ PUT

  Request Params: {id: integer}

  Toggles a challenge from incomplete to complete

1. __/addPhoto/:id__ PUT
  
  Request Params: {id: integer}

  Update the proofUrl property on the database with the url of the photo captured.

1. __/getPhoto/:id__ GET

  Request Params: {id: integer}

  Gets the photo from a specific challenge through the challenge id.

1. __/getClosedChallenges/:from/:to__ GET

  Request Params: {from: integer, to: integer}

  Gets the number of completed challenges from the database start from 'from' up to and including 'to'

1. __/voteOnproof/:id/:vote__ PUT

  Request params: {id: integer, vote: integer}

  Updates the yes-vote or no-vote property of the challenge. If a vote of 0 is passed, the no-vote property is incremented, otherwise if a vote of 1 is passed, the yes-vote property will increment.


####Database Design

To simplify database querying and initialization, Sequelize was used with the mySQL database. There are 4 tables in the database, the schema is as follows:

1. __User__
  * id - The user's unique id
  * name - String
  * beastPoints - Integer
  * wussPoints - Integer

1. __Challenge__
  * id - The challenge's unique id
  * challengeText - String
  * points - Integer
  * createdBy - String
  * complete - Boolean
  * expired - Boolean
  * userChallenged - String
  * proofUrl - String
  * voteCountYes - Integer
  * voteCountNo - Integer
  * closedDate - Date

1. __Tribe__
  * id - The Tribe's unique id
  * tribeName - The name of the tribe

1. __User_Tribe__
  * id_User - The user's id
  * id_Tribe - The tribe's id

#### Schema Design

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.















