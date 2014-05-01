'use strict';

var express = require('express');
var helper  = require('./helpers');
var app     = express();
var mongoose = require('mongoose');

app.listen(process.env.PORT || 3000);

require('./configMongo')
require('./routes')(app);
require('./express')(app);
require('./mongoHelper/queryHelper')
