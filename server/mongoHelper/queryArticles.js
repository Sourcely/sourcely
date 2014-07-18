'use strict';

var Promise  = require('bluebird'),
    clusters = require('../configMongo.js').connection,
    mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    articleModel = require('../mongoModels/articleModel.js')

var articleCluster = mongoose.model('Article');

var techArticles = function() {
  var startTime = Date.now();
  console.log('started!');  
  return new Promise(function (resolve, reject) {
    console.log("on the hunt for new articles");
    articleCluster.find({"category":"tech"},
      function(err, data) {
        console.log('ended! and took: ', (Date.now()-startTime)/1000, 'seconds');
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
              var tempCluster = articles[cluster]
              articles[cluster] = {'sources': tempCluster}
              articles[cluster]['mostRecentUpdate'] = tempTime;
            }
          }
          console.log('ended! and took: ', (Date.now()-startTime)/1000, 'seconds');
          resolve(articles);
        }
      });
  });
}

module.exports = {
  techArticles: techArticles
};
