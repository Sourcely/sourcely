app.controller('categories', ['$scope', '$http', 'techFactory', function($scope, $http, techFactory){
  $scope.categories = ["games", "technology"];
  techFactory.retrieveTechArticles();
}]);

app.controller('games', ['$scope', '$http', function($scope, $http){
  $scope.category = { name: "games", articles: [
                      {title: "man is trapped in oculus vr, believes real life is the virutal reality", author: "polygon"},
                      {title: "something about minecraft", author: "ign"}
                    ]};
}]);

app.controller('technology', ['$scope', '$http', 'techFactory', function($scope, $http, techFactory){
  $scope.category = {name:"Technology", articles: techFactory.getTechArticles()};
  if($scope.category.articles === undefined) {
    $http({ method:'GET',
            url:'http://localhost:3000/technology'
         }).success(function(data,status,headers,config){
           $scope.category.articles = data;
           console.log(data);
         }).error(function(err,status,headers,config){
           console.log("error: ", err);
         });
  } else {
    console.log("correct place");
  }
}]);
