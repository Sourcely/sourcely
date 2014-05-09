'use strict';

var express = require('express');
var helper  = require('./helpers');
var app     = express();
var mongoose = require('mongoose');
var http = require('http');

require('./configMongo')
require('./routes')(app);
require('./express')(app);
require('./mongoHelper/queryHelper')

http.createServer(app).listen(app.get('port'), function(){
  console.log('Magic happens on port ' + app.get('port'));
});
