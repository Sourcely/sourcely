//var fs       = Promise.promisifyAll(require('fs'));
//var mkdirp   = Promise.promisify(require('mkdirp'));
var queryHelper  = require('./mongoHelper/queryUsers.js')
var Path         = require('path');
var http         = require('http');
// var _        = require('underscore');

var sendLogin = function(req, res) {
  res.sendfile('public/webClient/templates/login.html')
};

var sendSignUp = function(req, res){
  res.sendfile('public/webClient/templates/signup.html')
};

var signupUser = function(req, res){
  queryHelper.findUser(req.body.username).then(function(data){
    if(data){
      //user exists already
      res.redirect('/signup')
    }else{
      //user does not exist, create a new user
      if(req.body.username && req.body.password){
        queryHelper.createUser(req.body.username, req.body.password);
        res.redirect('/')
      }
    }
  })
};

var login = function(req, res){
  queryHelper.findUser(req.body.username).then(function(data){
    console.log(data)
    if(data){
        if(data[0].passwordHash === req.body.password){
          //res.json({readArticles:data[0].readObjects});
          res.redirect('/');
        }else{
          res.redirect('/login');
        }
    }else{
      //user does not exist, create a new user
      res.redirect('/login');
    }
  })
};

module.exports = {
  sendLogin: sendLogin,
  sendSignUp: sendSignUp,
  signupUser: signupUser,
  login: login
};
