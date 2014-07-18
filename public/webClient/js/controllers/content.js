angular.module('webClient').controller('content', ['$scope', '$http', '$rootScope', 'toggleUnread', '$window', function($scope, $http, $rootScope, toggleUnread, $window){

  $rootScope.category = {name:"Technology", articles: undefined};

  $scope.readingUnread = toggleUnread(false);

  $scope.toggleNew = function(){
    var readArticlesArray = $rootScope.readArticles
    for(var i = 0; i < readArticlesArray.length; i++){
          $rootScope.readArticlesObject[readArticlesArray[i]] = true;
    }
    $scope.readingUnread = toggleUnread(true);
  };

  if($rootScope.category.articles === undefined || $window.localStorage.token === undefined) {
    console.log("querying new articles")
    $http({ method:'GET',
        url:'/articles'
     }).success(function(data,status,headers,config){
      console.log("got new articles")
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
       $rootScope.category.articles = timeSortedArticles;
     }).error(function(err,status,headers,config){
       console.log("error: ", err);
     });
  }

}]);
