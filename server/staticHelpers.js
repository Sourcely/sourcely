'use strict';

var queryHelper  = require('./Articles/queryArticles.js');

var sendLandingPage = function(req, res) {
  res.sendfile('public/client/index.html');
};

var sendTechArticles = function() {
  queryHelper.sendTechArticles();
};

var sendWelcome = function(req, res) {
  res.sendfile('public/client/shellView/components/reader/welcome.html');
};

module.exports = {
  sendLandingPage: sendLandingPage,
  sendTechArticles: sendTechArticles,
  sendWelcome: sendWelcome
};
