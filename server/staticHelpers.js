'use strict';

var queryHelper  = require('./Articles/queryArticles.js');

var sendLandingPage = function(req, res) {
  res.sendfile('public/webClient/index.html');
};

var sendWelcome = function(req, res) {
  res.sendfile('public/webClient/components/reader/templates/welcome.html');
};

module.exports = {
  sendLandingPage: sendLandingPage,
  sendTechArticles: sendTechArticles,
  sendWelcome: sendWelcome
};
