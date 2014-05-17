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
    var articles = data;
    for(var cluster in articles){
        var tempTime = 0;
        for(var i = 0; i < articles[cluster].length; i++){
            var articleTime = articles[cluster][i]['epochTime'];
            if(articleTime > tempTime){
                tempTime = articleTime;
            }
        }
        articles[cluster]['mostRecentUpdate'] = tempTime;
    }
    res.send(articles);
  });
};

var sendWelcome = function(req, res) {
  res.sendfile('public/webClient/welcome.html');
};

module.exports = {
  sendLandingPage: sendLandingPage,
  sendTechArticles: sendTechArticles,
  sendWelcome: sendWelcome
};
