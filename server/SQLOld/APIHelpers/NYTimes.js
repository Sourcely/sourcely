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
                var stack = [];
                for(var i = 0; i<data.results.length; i++) {
                    var source = data.results[i].source;
                    var sourceUrl = data.results[i].url;
                    var date = new Date();
                    var category = data.results[i].section;
                    var title = data.results[i].title;
                    var abstract = data.results[i].abstract;
                    stack[i] = [source,sourceUrl, date, category, title, abstract];
//for creating foreign keys and relationships
/*                    new Book({'categories': category})
                      .fetch()
                      .then(function(model) {
                        if(model.get('category_id')){
                            SQLQueries.createSource(source,sourceUrl, date, model.get('category_id'));
                        }else{
                            SQLQueries.createCategory();
                        };
                      });
*/                
                };
                var callerFunc = function(array){
                    var temp = array.shift();
                    SQLQueries.createSource(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5])
                    if(array.length > 0){
                        setTimeout(function(){callerFunc(array)}, 250);
                    }
                };
                callerFunc(stack);
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        })
    })
    }
};

module.exports = {
  NYTAPI: NYTAPI
};