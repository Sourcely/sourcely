var clusters = require('../configMongo.js').connection;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleModel = mongoose.model('Article', new Schema({collectionID: Number, title: String,link: String, date: String, category: String, description: String, epochTime: Number}), 'clusterCollection');
var articleCluster = mongoose.model('Article');
//this will return every article in the database
var articlesByCategory = function(categoryString){
    return articleCluster.find({"category":categoryString}, function(err, data) { console.log(data)});
};
module.exports = {
    articlesByCategory: articlesByCategory
};

articlesByCategory("tech")