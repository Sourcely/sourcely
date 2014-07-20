'use strict';

var Promise  = require('bluebird'),
    clusters = require('../configMongo.js').connection,
    mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    articleModel = require('./articleModel.js')

var articleCluster = mongoose.model('Article');

var techArticles = function() {
  var startTime = Date.now();
  return new Promise(function (resolve, reject) {
    articleCluster.find({"category":"tech"},
      function(err, data) {
        if(err){
          console.log(err);
        }else{
          var newData = {};
          for(var i = 0; i<data.length; i++){
            if(newData[data[i].collectionID]) {
              newData[data[i].collectionID].push(data[i]);
            } else {
              newData[data[i].collectionID] = [data[i]];
            }
          }
          var articles = newData;
          for(var cluster in articles){
            var tempTime = 0;
            for(var i = 0; i < articles[cluster].length; i++){
              var articleTime = articles[cluster][i]['epochTime'];
              if(articleTime > tempTime){
                tempTime = articleTime;
              }
            }
            var tempCluster = articles[cluster]
            articles[cluster] = {'sources': tempCluster}
            articles[cluster]['mostRecentUpdate'] = tempTime;
          }
          resolve(articles);
        }
      });
  });
}

var sendTechArticles = function(req, res) {
  techArticles().then(function(data) {
    res.send(data);
  });
};

module.exports = {
  sendTechArticles: sendTechArticles
};
