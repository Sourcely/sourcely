var helpers        = require('./helpers');
var usersHelper   = require('./usersHelpers');

module.exports = function(app){
  app.get('/technology', helpers.sendTechArticles);
  app.get('/welcome', helpers.sendWelcome);
  app.post('/signup', usersHelper.signupUser);
  app.post('/login', usersHelper.login);
  app.post('/api/authenticate', usersHelper.authenticate);
  app.post('/markread', usersHelper.markCollectionRead);
  app.get('*', helpers.sendLandingPage);
};


