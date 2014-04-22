'use strict';

var express = require('express');
//var routes = require('./server/routes');
var http = require('http');
var path = require('path');
var app = express();
var mysql = require('mysql');
var waterline = require('waterline');
var _ = require('lodash');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

require('./server/models/database')

http.createServer(app).listen(app.get('port'), function () {
  console.log('the magic happens on port ' + app.get('port'));
});
