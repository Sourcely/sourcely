var helper = require('./helpers');
var usersHelper = require('./usersHelpers')
module.exports = function(app){
  app.get('/technology', helper.sendTechArticles);
  app.get('/welcome', helper.sendWelcome);
  app.get('/login', usersHelper.sendLogin);
  app.get('/signup', usersHelper.sendSignUp);
  app.post('/signup', usersHelper.signupUser);
  app.post('/login', usersHelper.login);
  app.post('/markread', helper.markCollectionRead);
  app.get('*', helper.sendLandingPage);
};


