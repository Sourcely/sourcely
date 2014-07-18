'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userModel = module.exports = mongoose.model('User', new Schema({
  username: String,
  passwordHash: String,
  readObjects: Array
}, {strict: false}), 'clusterCollection');
