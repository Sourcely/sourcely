var path    = require('path');
var express = require('express');
//var bodyParser = require('body-parser');

module.exports = function(app){
	var fullpath = path.join(__dirname, '../public');
    app.use(express.logger('dev'));
    app.use(express.urlencoded());
    app.use(express.json());
    //app.use(bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(fullpath));
    app.use(app.router);
}
