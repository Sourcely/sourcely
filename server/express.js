var path          = require('path');
var express       = require('express');
var jwt           = require('jwt-simple');
var decode        = require('jwt-express-decode');

module.exports = function(app){
	var fullpath = path.join(__dirname, '../public');
  // var params = {
  //   // secret: process.env.JWT_SECRET,
  //   secret: "SECRETSAUCE",
  //   header: 'token',
  //   req: 'token'
  // };

  // var whitelist = ['/signup', '/login'];

  // app.use('/api', jwt.decode(params, whitelist));

  app.use(express.logger('dev'));
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.methodOverride());
  app.use(express.static(fullpath));
  app.use(app.router);
}
