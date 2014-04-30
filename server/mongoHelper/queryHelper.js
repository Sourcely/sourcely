var clusters = require('../configMongo.js').connection;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleModel = mongoose.model('Article', new Schema({collectionID: Number, title: String,link: String, date: String, category: String, description: String}), 'clusterCollection');
var articleCluster = mongoose.model('Article');
//this will return every article in the database
console.log(articleCluster.find({"category":"tech"}, function(err, data) { console.log(err, data, data.length); }));