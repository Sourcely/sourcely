var http = require('http');
var SQLQueries = require('../models/queries');
var MySql = require('../config').SQLServer;

var NYTAPI = {
    get: function(){
        var url = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1?api-key=81afa6603d8d887b9d384d1c9c74cad9:17:69292365';
        http.get(url, function(res){
            var dataChunks = '';
            res.on('data', function(chunk){
                dataChunks += chunk;
            }).on('end', function(){
                var data = JSON.parse(dataChunks);
                for(var i = 0; i<1; i++) {
                    var source = data.results[i].source;
                    var sourceUrl = data.results[i].url;
                    var date = new Date();
                    var category = data.results[i].section;
                    new Book({'categories': category})
                      .fetch()
                      .then(function(model) {
                        if(model.get('category_id')){
                            SQLQueries.createSource(source,sourceUrl, date, model.get('category_id'));
                        }else{
                            SQLQueries.createCategory();
                        };
                      });
                }
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        })
    })
    }
};

module.exports = {
  NYTAPI: NYTAPI
};