var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = require('./routes');
var db = require('./db');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', router);

db.sync().then(function() {
  app.listen(3000, function() {
    console.log('listening on 3000');
  });
});

