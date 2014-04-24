// var Promise  = require('bluebird');
// var fs       = Promise.promisifyAll(require('fs'));
// var mkdirp   = Promise.promisify(require('mkdirp'));
var Path     = require('path');
var Bookshelf = require('bookshelf');
var _ = require('lodash');
// var _        = require('underscore');

var sendLandingPage = function(req, res) {
  res.sendfile('public/webClient/index.html');
};

module.exports = {
  sendLandingPage: sendLandingPage
};
