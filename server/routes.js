'use strict';

var helpers        = require('./staticHelpers.js'),
    articleQuery   = require('./Articles/queryArticles.js'),
    usersHelpers   = require('./Users/helpers');

module.exports = function(app){
  app.get('/articles', articleQuery.sendTechArticles);
  app.get('/welcome', helpers.sendWelcome);
  app.post('/signup', usersHelpers.signupUser);
  app.post('/login', usersHelpers.login);
  app.post('/api/authenticate', usersHelpers.authenticate);
  app.post('/api/markread', usersHelpers.markCollectionRead);
  app.get('*', helpers.sendLandingPage);
};
