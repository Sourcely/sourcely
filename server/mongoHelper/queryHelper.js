var Promise  = require('bluebird');
var clusters = require('../configMongo.js').connection;
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var articleModel = mongoose.model('Article', new Schema({collectionID: Number, title: String,link: String, date: String, category: String, description: String}), 'clusterCollection');
var articleCluster = mongoose.model('Article');
//this will return every article in the database
// articleCluster.find({"category":"tech"}, function(err, data) { return data; });
function techArticles() {
  return new Promise(function (resolve, reject) {
    articleCluster.find({"category":"tech"},
      function(err, data) {
        if(err){
          console.log(err);
        }else{
          resolve(data);
        }
      });
  });
}

module.exports = {
  techArticles: techArticles
};
