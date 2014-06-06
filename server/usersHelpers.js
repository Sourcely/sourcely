var queryHelper  = require('./mongoHelper/queryUsers.js')
var bcrypt       = require('bcrypt-nodejs');
var Path         = require('path');
var http         = require('http');

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
        var formattedData = {authorized: true, username: req.body.username, readArticles: []};
        res.send(formattedData);
      }
    }
  })
};

var login = function(req, res){
  queryHelper.findUser(req.body.username).then(function(data){

    if(data){
      bcrypt.compare(req.body.password, data[0].passwordHash, function(err, result) {
        if (result) {
          var formattedData = {authorized: true, username: data[0]['username'], readArticles: data[0]['readObjects']};
          res.send(formattedData);        
        } else {
          res.send(false);
        }
      })
    }else{
      res.send(false);
    }
  })
};

var markCollectionRead = function(req, res) {
  queryHelper.updateUserReadArticles(req.body.clusterId, req.body.username);
  res.send(true);
};

module.exports = {
  sendLogin: sendLogin,
  sendSignUp: sendSignUp,
  signupUser: signupUser,
  login: login,
  markCollectionRead: markCollectionRead
};
