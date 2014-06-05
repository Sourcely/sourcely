app.controller('reader', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){

  $scope.openLink = function (articleUrl, collectionID) {
    document.getElementById('articleIFrame').src = articleUrl;
    var collection = {clusterId: collectionID, username: $rootScope.accountName};
    if($rootScope.loggedIn){
      $http.post('/markread', collection).success( function(data){
        if($rootScope.readArticles.indexOf(collection.clusterId)===-1){
          $rootScope.readArticles.push(collection.clusterId); 
          console.log($rootScope.readArticles); 
        }
      });
    }
  };  
  
}]);
