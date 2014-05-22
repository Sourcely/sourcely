'use strict';

var express = require('express');
var helper  = require('./helpers');
var app     = express();
var mongoose = require('mongoose');

require('./configMongo')
require('./express')(app);
require('./routes')(app);
require('./mongoHelper/queryHelper');
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log('Magic happens on port ' + app.get('port'));
});
