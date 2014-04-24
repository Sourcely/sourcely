// var Promise  = require('bluebird');
// var fs       = Promise.promisifyAll(require('fs'));
// var mkdirp   = Promise.promisify(require('mkdirp'));
var Path     = require('path');
var Bookshelf = require('bookshelf');
var _ = require('lodash');
var http = require('http');
// var _        = require('underscore');

var sendLandingPage = function(req, res) {
  var index = Path.resolve(__dirname+'../public/index.html')
  res.sendfile(index);
};

module.exports = {
  sendLandingPage: sendLandingPage,
};
