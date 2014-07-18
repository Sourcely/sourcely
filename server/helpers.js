'use strict';

var queryHelper  = require('./mongoHelper/queryArticles.js');

var sendLandingPage = function(req, res) {
  res.sendfile('public/webClient/index.html');
};

var sendTechArticles = function(req, res) {
  queryHelper.techArticles().then(function(data) {
    res.send(data);
  });
};

var sendWelcome = function(req, res) {
  res.sendfile('public/webClient/components/auth/templates/welcome.html');
};

module.exports = {
  sendLandingPage: sendLandingPage,
  sendTechArticles: sendTechArticles,
  sendWelcome: sendWelcome
};
