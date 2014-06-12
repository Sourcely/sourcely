var queryHelper   = require('./mongoHelper/queryUsers.js');
var articleHelper = require('./mongoHelper/queryArticles.js');
var bcrypt        = require('bcrypt-nodejs');
var Path          = require('path');
var http          = require('http');
var jwt           = require('jwt-simple');


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
      console.log('user exists');
      res.send(401, "user already exists");
    }else{
      //user does not exist, create a new user      
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
<<<<<<< HEAD
  queryHelper.findUser(req.body.username).then(function(data){
    if(data){
       bcrypt.compare(req.body.password,data[0].passwordHash, function(err, equal){
        if(equal){
          var formattedData = {authorized: true, username: data[0]['username'], readArticles: data[0]['readObjects']};
          res.send(formattedData);
        }else{
          res.send(false);
        }
       });
=======
  queryHelper.findUser(req.body.username).then(function(data){    
    if(data){      
      bcrypt.compare(req.body.password, data[0].passwordHash, function(err, result) {        
        if (result) {          
          var formattedData = {username: req.body.username, userId: data[0]['_id']};
          var token = jwt.encode(formattedData, 'secretsauce');          
          var sendData = {token: token, readArticles: data[0]['readObjects'], username: req.body.username};                    
          res.json(sendData);                
        } else {
          res.send(401, "Incorrect Password");
        }
      })
>>>>>>> e413477da293ff6c87183f7f26ea401743346be5
    }else{
      res.send(401, "User Doesn't Exist");
    }
  })
};

var authenticate = function(req, res) {  
  var authObj = jwt.decode(req.headers.authorization, 'secretsauce');
  queryHelper.findUserId(authObj.userId).then(function(data){
    if(data){
      // var allArticles;
      // articleHelper.techArticles().then(function(articlesData) {
        // allArticles = articlesData;
        var formattedData = {username: data[0]['username'], userId: data[0]['_id']};
        var token = jwt.encode(formattedData, 'secretsauce');
        // var sendData = {token: token, readArticles: data[0]['readObjects'], allArticles: allArticles, username: data[0]['username']};
        var sendData = {token: token, readArticles: data[0]['readObjects'], username: data[0]['username']};        
        res.json(sendData);
      // });
    } else {
      console.log('couldnt find user');
      res.send(401, "sorry dude");
    }
  });
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
  authenticate: authenticate,
  markCollectionRead: markCollectionRead
};
