// var Promise  = require('bluebird');
// var fs       = Promise.promisifyAll(require('fs'));
// var mkdirp   = Promise.promisify(require('mkdirp'));
var Path     = require('path');
// var waterline = require('waterline');
var _ = require('lodash');
// var _        = require('underscore');

var sendLandingPage = function(req, res) {
  res.sendfile('public/index.html');
};

module.exports = {
  sendLandingPage: sendLandingPage
};
