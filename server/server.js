'use strict';

require('newrelic');

var express  = require('express'),
    helper   = require('./helpers'),
    app      = express(),
    mongoose = require('mongoose');

require('./configMongo');
require('./express')(app);
require('./routes')(app);
require('./mongoHelper/queryArticles');
require('./mongoHelper/queryUsers');
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log('Magic happens on port ' + app.get('port'));
});
