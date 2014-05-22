// var fs       = Promise.promisifyAll(require('fs'));
// var mkdirp   = Promise.promisify(require('mkdirp'));
var queryHelper  = require('./mongoHelper/queryHelper.js')
var Path         = require('path');
var http         = require('http');
// var _        = require('underscore');

var sendLandingPage = function(req, res) {
  res.sendfile('public/webClient/index.html');
};

var sendTechArticles = function(req, res) {
  queryHelper.techArticles().then(function(data) {
    res.send(data);
  });
};

var sendWelcome = function(req, res) {
  res.sendfile('public/webClient/welcome.html');
};

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
    }else{
      //user does not exist, create a new user
    }
  })
};

var login = function(req, res){
  console.log(req.body)
};

module.exports = {
  sendLandingPage: sendLandingPage,
  sendTechArticles: sendTechArticles,
  sendWelcome: sendWelcome,
  sendLogin: sendLogin,
  sendSignUp: sendSignUp,
  signupUser: signupUser,
  login: login
};
