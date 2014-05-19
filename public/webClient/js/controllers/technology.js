app.controller('technology', ['$scope', '$http', 'techFactory', function($scope, $http, techFactory){
  $scope.category = {name:"Technology", articles: techFactory.getTechArticles()};
  if($scope.category.articles === undefined) {
    $http({ method:'GET',
            url:'/technology'
         }).success(function(data,status,headers,config){
           var timeSortedArticles = [];
           for(var articleCluster in data){
            var tempArticle=[];
            for (var key in data[articleCluster]){
              tempArticle.push(data[articleCluster][key])
            }
            timeSortedArticles.push(tempArticle)
           }
           timeSortedArticles.sort(function(a,b){
            return b[1]-a[1];
           });
           $scope.category.articles = timeSortedArticles;
         }).error(function(err,status,headers,config){
           console.log("error: ", err);
         });
  } else {
    console.log("correct place");
  }
}]);
