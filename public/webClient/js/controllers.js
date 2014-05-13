app.controller('technology', ['$scope', '$http', 'techFactory', function($scope, $http, techFactory){
  $scope.category = {name:"Technology", articles: techFactory.getTechArticles()};
  if($scope.category.articles === undefined) {
    $http({ method:'GET',
            url:'/technology'
         }).success(function(data,status,headers,config){
           console.log(data);
           $scope.category.articles = data;
         }).error(function(err,status,headers,config){
           console.log("error: ", err);
         });
  } else {
    console.log("correct place");
  }
}])
