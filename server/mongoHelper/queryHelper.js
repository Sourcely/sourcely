var Promise  = require('bluebird');
var clusters = require('../configMongo.js').connection;
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var articleModel = mongoose.model('Article', new Schema({collectionID: Number, title: String,link: String, date: String, category: String, description: String, epochTime: Number}), 'clusterCollection');
var articleCluster = mongoose.model('Article');
//this will return every article in the database
<<<<<<< HEAD
var articlesByCategory = function(categoryString){
    return articleCluster.find({"category":categoryString}, function(err, data) { console.log(data)});
};
module.exports = {
    articlesByCategory: articlesByCategory
};

articlesByCategory("tech")
=======
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
>>>>>>> 663d0551b63c32a0c8631e56d622fd999e988ef9
