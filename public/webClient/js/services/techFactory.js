angular.module('webClient').factory('techFactory', ['$http', function($http){
    var techArticles;
    var service = {};
    service.retrieveTechArticles = function() {
      $http({ method:'GET',
              url:'http://localhost:3000/tech'
           }).success(function(data,status,headers,config){
             techArticles = data;
           }).error(function(err,status,headers,config){
             console.log("error: ", err);
           });
    };
    service.getTechArticles = function() {
      return techArticles;
    }
    return service;
  }]);
