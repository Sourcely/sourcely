var path    = require('path');
var express = require('express');

module.exports = function(app){
	var fullpath = path.join(__dirname, '../public');
	app.use(express.static(fullpath));
	app.use(express.logger('dev'));
	app.use(express.urlencoded());
	app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.json());
	app.use(app.router);
}
