var helper        = require('./helpers');
var usersHelper   = require('./usersHelpers');

module.exports = function(app){
  app.get('/technology', helper.sendTechArticles);
  app.get('/welcome', helper.sendWelcome);
  app.post('/api/signup', usersHelper.signupUser);
  app.post('/api/login', usersHelper.login);
  app.post('/api/authenticate', usersHelper.authenticate);
  app.post('/api/markread', usersHelper.markCollectionRead);
  app.get('*', helper.sendLandingPage);
};


