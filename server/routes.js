var helper = require('./helpers');

module.exports = function(app){

  app.get('/', helper.sendLandingPage);

};
