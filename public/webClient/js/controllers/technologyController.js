app.controller('technologyController', ['$scope', '$http', 'techFactory', '$rootScope', function($scope, $http, techFactory, $rootScope){

  $scope.category = {name:"Technology", articles: []};
  $scope.categoryHolder = {name:"Technology", articles: techFactory.getTechArticles()}; 
  $rootScope.readingNew = true;
  $scope.toggleNew = function(){
    var readArticlesArray = $rootScope.readArticles
    for(var i = 0; i < readArticlesArray.length; i++){
          $rootScope.readArticlesObject[readArticlesArray[i]] = true;
    }
    $rootScope.readingNew = !$rootScope.readingNew;
  };
  $scope.logger = function(a,b){
    console.log(a);
    console.log(b);
  }
  var counter = 20;
  var total;
  
  $scope.lazyLoader = function() {
      if(total >= counter + 10){
        for (var i = counter; i < counter+10; i++) {
            // console.log($scope.categoryHolder.articles[i])
            $scope.category.articles.push($scope.categoryHolder.articles[i]);
        };
        counter += 10;
      }
  };

  if($scope.categoryHolder.articles === undefined) {
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
          console.log($rootScope.readArticlesObject);
           $scope.categoryHolder.articles = timeSortedArticles;
           total = timeSortedArticles.length
           for (var i = 0; i < 20; i++) {
            $scope.category.articles.push($scope.categoryHolder.articles[i]);
           }
           // console.log($scope.category.articles);
         }).error(function(err,status,headers,config){
           console.log("error: ", err);
         });
  } else {
    console.log("correct place");
  }

}]);
