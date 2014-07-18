'use strict';

var path          = require('path'),
    express       = require('express'),
    jwt           = require('jwt-simple');

module.exports = function(app){
	var fullpath = path.join(__dirname, '../public');

  app.use(express.logger('dev'));
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.methodOverride());
  app.use(express.static(fullpath));
  app.use('/api', function(req, res, next) {
    var user = jwt.decode(req.headers.authorization, process.env.SECRET);
    req.user = user;
    var tokenAge = Math.abs(Date.now()-req.user.tokenDate)/1000/60/60;
    if(tokenAge<72) {
      next();
    } else {
      next(new Error('token expired'));
    }
  });
  app.use(app.router);
}
