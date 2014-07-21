'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    clusters = require('../configMongo.js').connection;

var articleModel = module.exports = mongoose.model('Article', new Schema({
  collectionID: Number,
  title: String,
  link: String,
  date: String,
  category: String,
  description: String,
  epochTime: Number,
  source: String
}), 'clusterCollection');
