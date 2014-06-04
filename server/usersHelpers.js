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
      res.send(false)
    }else{
      //user does not exist, create a new user
      if(req.body.username && req.body.password){
        queryHelper.createUser(req.body.username, req.body.password);
        var formattedData = {authorized: true, username: req.body.username, readArticles: "put read articles here"};
        res.send(formattedData);
      }
    }
  })
};

var login = function(req, res){
  console.log(req.body)
  queryHelper.findUser(req.body.username).then(function(data){
    if(data){
        if(data[0].passwordHash === req.body.password){
          //res.json({readArticles:data[0].readObjects});
          var formattedData = {authorized: true, username: data[0]['username'], readArticles: "put read articles here"};
          res.send(formattedData);
        }else{
          res.send(false);
        }
    }else{
      //user does not exist, create a new user
      res.send(false);
    }
  })
};

var markCollectionRead = function(req, res) {
  queryHelper.updateUserReadArticles(req.body.clusterId, req.body.username);  
};

module.exports = {
  sendLogin: sendLogin,
  sendSignUp: sendSignUp,
  signupUser: signupUser,
  login: login,
  markCollectionRead: markCollectionRead
};
