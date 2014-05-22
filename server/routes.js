var helper = require('./helpers');

module.exports = function(app){
  app.get('/', helper.sendLandingPage);
  app.get('/technology', helper.sendTechArticles);
  app.get('/welcome', helper.sendWelcome);
  app.get('/login', helper.sendLogin);
  app.get('/signup', helper.sendSignUp);
  app.post('/signup', helper.signupUser);
  app.post('/login', helper.login);
};
