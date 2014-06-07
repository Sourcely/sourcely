var queryHelper  = require('./mongoHelper/queryUsers.js')
var bcrypt       = require('bcrypt-nodejs');
var Path         = require('path');
var http         = require('http');
var jwt          = require('jwt-simple');

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
      res.send(401, "user already exists");
    }else{
      //user does not exist, create a new user
      if(req.body.username && req.body.password){
        queryHelper.createUser(req.body.username, req.body.password);
        var formattedData = {authorized: true, username: req.body.username, readArticles: []};
        var token = jwt.sign(formattedData, secret, { expiresInMinutes: 60*5 } );
        res.json({ token: token });
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
          var token = jwt.sign(formattedData, secret, { expiresInMinutes: 60*5 } );
          res.json({ token: token });                
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
  queryHelper.findUser(req.body.username).then(function(data){

    if(data){
      bcrypt.compare(req.body.password, data[0].passwordHash, function(err, result) {
        if (result) {
          var formattedData = {authorized: true, username: data[0]['username'], readArticles: data[0]['readObjects']};
          res.send(formattedData);        
        } else {
          res.send(401, "not authenticated");
        }
      })
    }else{
      res.send(401, "not authenticated");
    }
  })
  if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
    res.send(401, 'Wrong user or password');
    return;
  }

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });

  res.json({ token: token });
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
