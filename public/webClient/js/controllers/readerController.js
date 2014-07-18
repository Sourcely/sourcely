app.controller('reader', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
  $scope.openLink = function (articleUrl, collectionID) {
    document.getElementById('articleIFrame').src = articleUrl;
    var collection = {clusterId: collectionID, username: $rootScope.accountName};
    console.log(collectionID);
    if($rootScope.loggedIn){
      $http.post('/api/markread', collection).success(function(){
            if($rootScope.readArticles.indexOf(collection.clusterId)===-1){
                $rootScope.readArticles.push(collection.clusterId);
            }
      }).error(function(data, status, headers, config) {
        console.log("error: ", data);
      });
    }
  };  
}]);
