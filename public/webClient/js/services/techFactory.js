angular.module('webClient').factory('techFactory', ['$http', '$rootScope', function($http, $rootScope){
    var techArticles;
    var service = {};

    service.retrieveTechArticles = function(category) {
      
      $http({ method:'GET',
              url:'/technology'
           }).success(function(data,status,headers,config){                
             var timeSortedArticles = [];
             for(var articleCluster in data){
              var tempArticle=[];
              for (var key in data[articleCluster]){
                if(data[articleCluster][key][0]){
                  var articleCluster = data[articleCluster][key][0]['collectionID'];
                  $rootScope.readArticlesObject[articleCluster] = false;
                };
                tempArticle.push(data[articleCluster][key]);
              }
              timeSortedArticles.push(tempArticle);
             }
             timeSortedArticles.sort(function(a,b){
              return b[1]-a[1];
             });
             console.log(timeSortedArticles);
             category = timeSortedArticles;           
           }).error(function(err,status,headers,config){
             console.log("error: ", err);
           });
    };
    return service;
}]);
