'use strict';

var queryHelper   = require('./mongoHelper/queryUsers.js'),
    articleHelper = require('./mongoHelper/queryArticles.js'),
    bcrypt        = require('bcrypt-nodejs'),
    Path          = require('path'),
    http          = require('http'),
    jwt           = require('jwt-simple');


var signupUser = function(req, res){
  queryHelper.findUser(req.body.username).then(function(data){
    if(data){      
      console.log('user exists');
      res.send(401, "user already exists");
    }else{      
      if(req.body.username && req.body.password){
        console.log('create user');
        queryHelper.createUser(req.body.username, req.body.password).then(function(data) {
          res.json(data);
        });
      }
    }
  })
};

var login = function(req, res){
  queryHelper.findUser(req.body.username).then(function(data){    
    if(data){      
      bcrypt.compare(req.body.password, data[0].passwordHash, function(err, result) {        
        if (result) {
          var formattedData = {username: req.body.username, userId: data[0]['_id'], authorized: true, tokenDate: Date.now()};
          var token = jwt.encode(formattedData, process.env.SECRET);
          var sendData = {token: token, readArticles: data[0]['readObjects'], username: req.body.username};
          res.json(sendData);
        } else {
          res.send(401, "Incorrect Password");
        }
      })
    }else{
      res.send(401, "User Doesn't Exist");
    }
  })
};

var authenticate = function(req, res) {    
  queryHelper.findUserId(req.user.userId).then(function(data){
    if(data){
      //generate token + refreshes expiration date
      var formattedData = {username: data[0]['username'], userId: data[0]['_id'], authorized: true, tokenDate: Date.now()};
      var token = jwt.encode(formattedData, process.env.SECRET);
      var sendData = {token: token, readArticles: data[0]['readObjects'], username: data[0]['username']};
      res.json(sendData);
    } else {
      console.log('couldnt find user');
      res.send(401, "sorry dude");
    }
  });
};

var markCollectionRead = function(req, res) {
  res.send(true);
  queryHelper.updateUserReadArticles(req.body.clusterId, req.body.username);
};

module.exports = {
  signupUser: signupUser,
  login: login,
  authenticate: authenticate,
  markCollectionRead: markCollectionRead
};
