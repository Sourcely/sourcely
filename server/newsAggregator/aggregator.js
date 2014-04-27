var SQL = require('server/config');
var NYT = require('./sourceApiConverter/NYTimes').NYTAPI;
var help = require('./helpers');

NYT.get();
